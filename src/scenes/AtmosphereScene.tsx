import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Lightformer, MeshTransmissionMaterial, RoundedBox } from '@react-three/drei'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { damp } from '../lib/motion'
import styles from './AtmosphereScene.module.css'

/**
 * Атмосферный слой, а не сюжет. Задача: дать дорогое стекло, свет и bloom ЗА текстом,
 * ничего не сообщая и не отвлекая. Морф ведёт DOM, здесь только настроение.
 */

const BRASS = '#a8823c'
const INK = '#16324f'

function seeded(seed: number) {
  let s = seed
  return () => (s = (s * 1664525 + 1013904223) % 4294967296) / 4294967296
}

type Slab = {
  base: THREE.Vector3
  size: [number, number, number]
  rot: THREE.Euler
  spin: THREE.Vector3
  driftPhase: number
  driftAmp: number
}

function Slabs({ pointer }: { pointer: React.RefObject<{ x: number; y: number }> }) {
  const group = useRef<THREE.Group>(null)
  const refs = useRef<(THREE.Mesh | null)[]>([])

  const slabs = useMemo<Slab[]>(() => {
    const rand = seeded(770214)
    // Немного крупных плит: стекло дорого именно когда его мало и оно большое.
    // Держим их ниже и глубже, чтобы не лезли на заголовок, и левее/правее центра,
    // где на скролле раскрывается зазор между картами.
    return Array.from({ length: 5 }, () => ({
      base: new THREE.Vector3(
        (rand() - 0.5) * 6,
        (rand() - 0.5) * 2 - 0.7,
        (rand() - 0.5) * 1.6 - 1.4,
      ),
      size: [1.3 + rand() * 1.3, 1.6 + rand() * 1, 0.26 + rand() * 0.2],
      rot: new THREE.Euler(rand() * Math.PI, rand() * Math.PI, rand() * Math.PI),
      spin: new THREE.Vector3((rand() - 0.5) * 0.05, (rand() - 0.5) * 0.07, (rand() - 0.5) * 0.03),
      driftPhase: rand() * Math.PI * 2,
      driftAmp: 0.08 + rand() * 0.12,
    }))
  }, [])

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime
    const clamped = Math.min(dt, 1 / 30)

    // Параллакс всей группы за курсором: медленный, чтобы читалось как глубина, а не как реакция.
    if (group.current && pointer.current) {
      group.current.position.x = damp(group.current.position.x, pointer.current.x * 0.4, 2, clamped)
      group.current.position.y = damp(group.current.position.y, pointer.current.y * 0.25, 2, clamped)
      group.current.rotation.y = damp(group.current.rotation.y, pointer.current.x * 0.15, 2, clamped)
    }

    slabs.forEach((s, i) => {
      const m = refs.current[i]
      if (!m) return
      m.rotation.x += s.spin.x * clamped
      m.rotation.y += s.spin.y * clamped
      m.rotation.z += s.spin.z * clamped
      // Тихий дрейф вверх-вниз: сцена дышит, но никуда не идёт.
      m.position.y = s.base.y + Math.sin(t * 0.3 + s.driftPhase) * s.driftAmp
      m.position.x = s.base.x + Math.cos(t * 0.22 + s.driftPhase) * s.driftAmp * 0.6
    })
  })

  return (
    // Вся группа опущена ниже строки заголовка: стекло играет в зоне карт, а не над текстом.
    <group ref={group} position={[0, -0.6, 0]}>
      {slabs.map((s, i) => (
        <RoundedBox
          key={i}
          ref={(el) => {
            refs.current[i] = el
          }}
          args={s.size}
          radius={0.14}
          smoothness={4}
          position={s.base}
          rotation={s.rot}
        >
          {/* Настоящее стекло: преломление, толщина, лёгкая дисперсия. Дорогой вид держится здесь. */}
          <MeshTransmissionMaterial
            samples={6}
            resolution={256}
            transmission={1}
            thickness={1.1}
            roughness={0.18}
            chromaticAberration={0.14}
            anisotropy={0.2}
            distortion={0.25}
            distortionScale={0.3}
            temporalDistortion={0.1}
            ior={1.32}
            color="#eef1f4"
            attenuationColor="#dfe6ec"
            attenuationDistance={4}
          />
        </RoundedBox>
      ))}
    </group>
  )
}

export default function AtmosphereScene({
  pointer,
}: {
  pointer: React.RefObject<{ x: number; y: number }>
}) {
  return (
    <div className={styles.stage} aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 8], fov: 42 }}
      >
        <color attach="background" args={['#f6f5f2']} />
        <ambientLight intensity={0.5} />
        <Slabs pointer={pointer} />

        {/* Свет из процедурных площадок, без внешнего HDR: стеклу есть что отражать. */}
        <Environment resolution={256}>
          <Lightformer intensity={2.2} position={[3, 3, 4]} scale={[6, 6, 1]} color="#ffffff" />
          <Lightformer intensity={1.1} position={[-4, -1, 2]} scale={[5, 5, 1]} color="#cfe0f0" />
          <Lightformer intensity={0.8} position={[0, 4, -3]} scale={[8, 3, 1]} color={BRASS} />
          <Lightformer intensity={0.6} position={[-2, -3, -2]} scale={[5, 5, 1]} color={INK} />
        </Environment>

        <EffectComposer enableNormalPass={false}>
          {/* Bloom по светлым краям стекла: свечение делает поверхность «стеклянной», а не пластиковой. */}
          <Bloom mipmapBlur intensity={0.5} luminanceThreshold={0.85} luminanceSmoothing={0.3} />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
