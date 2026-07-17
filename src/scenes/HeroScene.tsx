import { Canvas, useThree } from '@react-three/fiber'
import { useEffect } from 'react'
import * as THREE from 'three'
import ParticleField from './ParticleField'
import { syncCameraToViewport } from '../lib/viewport-camera'
import styles from './HeroScene.module.css'

function ViewportCamera() {
  const { camera, size } = useThree()

  useEffect(() => {
    syncCameraToViewport(camera as THREE.PerspectiveCamera, size.width, size.height)
  }, [camera, size])

  return null
}

type Props = {
  splitRatio: React.RefObject<number>
  anchors: React.RefObject<(HTMLElement | null)[]>
}

export default function HeroScene({ splitRatio, anchors }: Props) {
  return (
    <div className={styles.stage} aria-hidden="true">
      <Canvas
        // Ниже 1.5 разница не видна, выше — только счёт за пиксели на ретине.
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 1200], fov: 40 }}
      >
        <ViewportCamera />
        {/* Свет свой, без HDR-окружения: environment тянул бы файл со стороннего CDN. */}
        <hemisphereLight args={['#ffffff', '#e8e2d6', 1.1]} />
        <directionalLight position={[600, 800, 900]} intensity={1.6} />
        <directionalLight position={[-700, -300, 400]} intensity={0.5} color="#c9d4e2" />
        <ParticleField splitRatio={splitRatio} anchors={anchors} />
      </Canvas>
    </div>
  )
}
