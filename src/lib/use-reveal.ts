import { useEffect, useRef, useState } from 'react'

/**
 * Реверсивная видимость: время копится, пока элемент в кадре, и отматывается назад, когда ушёл.
 * Одноразовый reveal (once: true) выдаёт себя сразу — проскроллил вверх, а секция уже «использована»
 * и стоит статикой. Отмотка назад делает страницу живой в обе стороны.
 */
export function useInView<T extends HTMLElement>(margin = '-12%') {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin: margin,
    })
    io.observe(el)
    return () => io.disconnect()
  }, [margin])

  return { ref, inView }
}

/**
 * Прогресс 0..1 с отмоткой. Возвращает ref на элемент и подписку на кадры:
 * значение живёт в ref, а не в state, чтобы не гнать ре-рендер React каждый кадр.
 */
export function useRevealTime<T extends HTMLElement>(speed = 1.6, margin = '-12%') {
  const { ref, inView } = useInView<T>(margin)
  const time = useRef(0)

  useEffect(() => {
    let raf = 0
    let prev = performance.now()

    const tick = (now: number) => {
      const dt = Math.min((now - prev) / 1000, 1 / 30)
      prev = now
      time.current = Math.min(1, Math.max(0, time.current + (inView ? dt : -dt) * speed))
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, speed])

  return { ref, time, inView }
}
