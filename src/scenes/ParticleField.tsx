import { useEffect, useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { clamp, easeInOutCubic, fit } from '../lib/motion'
import { rectToWorld } from '../lib/viewport-camera'

const COUNT = 240
/** Раскладка усадки: 120 частиц на карточку ложатся 12 строками по 10. */
const PER_ROW = 10
const ROWS = 12
const INK = new THREE.Color('#16324f')
const BRASS = new THREE.Color('#a8823c')
const MUTE = new THREE.Color('#8c93a1')

/** Детерминированный шум: расстановка должна быть одинаковой между перезагрузками, иначе кадр «пляшет». */
function seeded(seed: number) {
  let s = seed
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296
    return s / 4294967296
  }
}

type Props = {
  /** 0 = свободное облако, 1 = частицы сидят в прямоугольниках карточек. Гонит скролл. */
  splitRatio: React.RefObject<number>
  /** DOM-якоря карточек маршрутов. Пиксели даёт вёрстка, картинку рисуем мы. */
  anchors: React.RefObject<(HTMLElement | null)[]>
}

export default function ParticleField({ splitRatio, anchors }: Props) {
  const mesh = useRef<THREE.InstancedMesh>(null)
  const { size, camera, pointer } = useThree()

  const bodies = useMemo(() => {
    const rand = seeded(20260717)
    return Array.from({ length: COUNT }, (_, i) => ({
      /**
       * Дом частицы в долях вьюпорта, а не в пикселях: поле должно жить справа от заголовка
       * на любом экране. Аттрактор тянет каждую к своему дому, а не всех в одну точку,
       * иначе облако схлопывается в комок и садится на текст.
       */
      home: new THREE.Vector3(0.1 + rand() * 0.4, (rand() - 0.5) * 0.86, (rand() - 0.5) * 0.9),
      pos: new THREE.Vector3(),
      vel: new THREE.Vector3(),
      side: i % 2, // 0 = левая карточка, 1 = правая
      slot: Math.floor(i / 2),
      scale: 0.6 + rand() * 0.8,
      spin: (rand() - 0.5) * 0.6,
      phase: rand() * Math.PI * 2,
      tint: rand(),
    }))
  }, [])

  const dummy = useMemo(() => new THREE.Object3D(), [])
  const ray = useMemo(() => new THREE.Ray(), [])
  const tmp = useMemo(() => new THREE.Vector3(), [])
  const target = useMemo(() => new THREE.Vector3(), [])
  const closest = useMemo(() => new THREE.Vector3(), [])
  const prevPointer = useRef(new THREE.Vector2())

  // Расстановка по домам до первого кадра: иначе поле стартует из одной точки и «взрывается».
  const placed = useRef(false)
  useEffect(() => {
    if (placed.current || !size.width) return
    bodies.forEach((b) =>
      b.pos.set(b.home.x * size.width, b.home.y * size.height, b.home.z * 500),
    )
    placed.current = true
  }, [bodies, size])

  useEffect(() => {
    if (!mesh.current) return
    const color = new THREE.Color()
    bodies.forEach((b, i) => {
      // Латунь редкая: акцент работает, пока он исключение, а не краска.
      color.copy(b.tint > 0.94 ? BRASS : b.tint > 0.72 ? MUTE : INK)
      mesh.current!.setColorAt(i, color)
    })
    if (mesh.current.instanceColor) mesh.current.instanceColor.needsUpdate = true
  }, [bodies])

  useFrame((state, rawDelta) => {
    if (!mesh.current) return
    // Вкладку свернули, dt прилетел огромный: без клампа физику разносит.
    const dt = Math.min(rawDelta, 1 / 30)
    const t = state.clock.elapsedTime
    const r = clamp(splitRatio.current ?? 0)

    // Луч камера→курсор. Расталкивание считаем от луча, а не от точки на плоскости:
    // иначе курсор двигает только то, что лежит на его глубине, и облако не расступается в объёме.
    ray.origin.setFromMatrixPosition(camera.matrixWorld)
    tmp.set(pointer.x, pointer.y, 0.5).unproject(camera)
    ray.direction.copy(tmp.sub(ray.origin).normalize())

    const pointerSpeed = Math.hypot(pointer.x - prevPointer.current.x, pointer.y - prevPointer.current.y)
    prevPointer.current.set(pointer.x, pointer.y)
    const push = 900 + clamp(pointerSpeed * 40, 0, 1) * 2600

    // Прямоугольники карточек читаем каждый кадр: они едут вместе со страницей.
    // Пружинить к ним нельзя, цель сама движется от скролла и пружина будет за ней гнаться.
    const rects = (anchors.current ?? []).map((el) => {
      if (!el) return null
      return rectToWorld(el.getBoundingClientRect(), size.width, size.height)
    })

    const spread = fit(r, 0, 0.55, 0, 1, easeInOutCubic)
    const settle = fit(r, 0.45, 1, 0, 1, easeInOutCubic)

    bodies.forEach((b, i) => {
      // Пружина к своему дому, а не «вниз»: поле висит в кадре и всегда собирается обратно
      // после того, как его расшвырял курсор.
      target.set(b.home.x * size.width, b.home.y * size.height, b.home.z * 500)

      const rect = rects[b.side]

      if (rect && spread > 0) {
        // Расхождение целится в само окно карточки, а не в абстрактную точку сбоку:
        // иначе левый поток летит через весь экран, сбивается в комок и проходит по заголовку.
        // Разброс каждой частицы сохраняется, поэтому это поток, а не шар.
        target.x = THREE.MathUtils.lerp(target.x, rect.x + b.home.z * rect.w * 0.8, spread)
        target.y = THREE.MathUtils.lerp(target.y, rect.y + b.home.y * rect.h * 0.9, spread)
        target.z = THREE.MathUtils.lerp(target.z, b.home.z * 220, spread)
      }

      b.vel.addScaledVector(tmp.copy(target).sub(b.pos), 2.6 * dt)

      // Дрейф: облако не должно замирать, статика читается как сломанный рендер.
      b.vel.x += Math.sin(t * 0.4 + b.phase) * 12 * dt
      b.vel.y += Math.cos(t * 0.33 + b.phase * 1.7) * 12 * dt

      // Курсор отталкивает всё, что попало в цилиндр вокруг луча.
      ray.closestPointToPoint(b.pos, closest)
      const d = closest.distanceTo(b.pos)
      if (d < 220) {
        tmp.copy(b.pos).sub(closest).normalize()
        b.vel.addScaledVector(tmp, (1 - d / 220) * push * dt)
      }

      // Экспоненциальное затухание: не зависит от частоты кадров, в отличие от vel *= 0.95.
      b.vel.multiplyScalar(Math.pow(0.12, dt))
      b.pos.addScaledVector(b.vel, dt)

      dummy.position.copy(b.pos)

      // Усадка в карточку. При settle=1 позиция равна DOM-прямоугольнику, поэтому частица
      // едет со страницей один в один, без догоняния.
      if (rect && settle > 0) {
        // Слоты — строки, а не сетка точек: собранное дело должно читаться как страница текста.
        const col = b.slot % PER_ROW
        const row = Math.floor(b.slot / PER_ROW) % ROWS
        const gx = rect.x + (col / (PER_ROW - 1) - 0.5) * rect.w * 0.78
        const gy = rect.y + (row / (ROWS - 1) - 0.5) * rect.h * 0.74
        dummy.position.x = THREE.MathUtils.lerp(dummy.position.x, gx, settle)
        dummy.position.y = THREE.MathUtils.lerp(dummy.position.y, gy, settle)
        dummy.position.z = THREE.MathUtils.lerp(dummy.position.z, 0, settle)
      }

      // В покое пластины кувыркаются, в стопке выравниваются: собранное дело выглядит собранным.
      dummy.rotation.set(
        THREE.MathUtils.lerp(Math.sin(t * b.spin + b.phase) * 0.6, 0, settle),
        THREE.MathUtils.lerp(Math.cos(t * b.spin * 0.8) * 0.8, 0, settle),
        THREE.MathUtils.lerp(b.phase, 0, settle),
      )

      // В покое пластина, в стопке планка. Планки почти смыкаются в строку и обрываются
      // на разной длине: равные полоски с равными зазорами читались бы как морзянка, а не текст.
      const s = b.scale
      const col = b.slot % PER_ROW
      const row = Math.floor(b.slot / PER_ROW) % ROWS
      const lineLength = 7 + ((row * 7919) % 4) // 7..10 планок в строке
      const beyondLine = col >= lineLength
      const settled = beyondLine ? 0 : 1.5 + b.tint * 0.9
      // Планку за концом строки схлопываем по всем осям: нулевая только ширина оставляет
      // видимую точку от толщины.
      const thin = beyondLine ? 0 : 0.11
      dummy.scale.set(
        THREE.MathUtils.lerp(s, settled, settle),
        THREE.MathUtils.lerp(s, thin, settle),
        THREE.MathUtils.lerp(s, thin, settle),
      )
      dummy.updateMatrix()
      mesh.current!.setMatrixAt(i, dummy.matrix)
    })

    mesh.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, COUNT]} frustumCulled={false}>
      {/* Плоская планка, а не шар: читается как документ, и стоит дешевле сферы. */}
      <boxGeometry args={[26, 34, 1.5]} />
      <meshStandardMaterial roughness={0.32} metalness={0.1} />
    </instancedMesh>
  )
}
