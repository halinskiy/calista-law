import { useEffect, useRef } from 'react'
import { Spring, clamp, damp } from '../lib/motion'
import styles from './Cursor.module.css'

/**
 * Курсор на пружине второго порядка. Затухание ниже единицы даёт лёгкий перелёт:
 * курсор приезжает в точку чуть позже мыши и «оседает». Обычный lerp читается дёшево,
 * потому что тормозит по прямой и без инерции.
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Тач-устройствам курсор не нужен, а pointer:coarse ещё и врёт про наведение.
    if (!window.matchMedia('(pointer: fine)').matches) return

    const el = dot.current
    if (!el) return

    const sx = new Spring(1.35, 0.5, 1.25, window.innerWidth / 2)
    const sy = new Spring(1.35, 0.5, 1.25, window.innerHeight / 2)

    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    let px = mx
    let py = my
    let scale = 1
    let hover = 0
    let prev = performance.now()
    let raf = 0

    // До первого движения мыши курсора нет: иначе точка висит в центре экрана
    // над содержимым и читается как артефакт рендера.
    let awake = false

    const onMove = (e: PointerEvent) => {
      if (!awake) {
        awake = true
        sx.update(1, e.clientX)
        sy.update(1, e.clientY)
      }
      mx = e.clientX
      my = e.clientY
      // Курсор растёт над интерактивным: сообщение «сюда можно», а не украшение.
      const target = (e.target as Element)?.closest('a, button, [data-cursor]')
      hover = target ? 1 : 0
    }

    const tick = (now: number) => {
      const dt = Math.min((now - prev) / 1000, 1 / 30)
      prev = now

      const x = sx.update(dt, mx)
      const y = sy.update(dt, my)

      // Раздувание от скорости: быстрое движение читается как импульс.
      const speed = Math.hypot(mx - px, my - py) / Math.max(dt, 0.001)
      px = mx
      py = my
      const speedScale = 1 + clamp(speed / 4000, 0, 0.6)
      scale = damp(scale, speedScale + hover * 1.4, 12, dt)

      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate3d(-50%, -50%, 0) scale(${scale})`
      el.style.opacity = awake ? String(0.35 + hover * 0.65) : '0'

      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return <div ref={dot} className={styles.cursor} aria-hidden="true" />
}
