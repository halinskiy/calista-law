import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let lenis: Lenis | null = null

/**
 * Lenis и ScrollTrigger должны считать позицию в одном тике.
 * Если у каждого свой rAF, pin-секции дрожат на пиксель: один уже посчитал новый scroll,
 * другой ещё рисует по старому.
 */
export function initSmoothScroll() {
  if (lenis) return lenis

  lenis = new Lenis({
    duration: 1.1,
    easing: (t) => 1 - Math.pow(1 - t, 4),
    smoothWheel: true,
    // На тач-устройствах перехват скролла ломает нативную инерцию и ощущается как лаг.
    syncTouch: false,
  })

  lenis.on('scroll', ScrollTrigger.update)

  gsap.ticker.add((time) => lenis?.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)

  return lenis
}

export function destroySmoothScroll() {
  lenis?.destroy()
  lenis = null
}

export function getLenis() {
  return lenis
}

/** Плавный переход к якорю. Нативный scrollIntoView дерётся с Lenis. */
export function scrollTo(target: string | HTMLElement, offset = 0) {
  lenis?.scrollTo(target, { offset, duration: 1.2 })
}
