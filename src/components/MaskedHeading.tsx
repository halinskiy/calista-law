import { useEffect, useRef } from 'react'
import { fit } from '../lib/motion'
import { useRevealTime } from '../lib/use-reveal'
import styles from './MaskedHeading.module.css'

type Props = {
  text: string
  as?: 'h1' | 'h2' | 'h3' | 'p'
  className?: string
  /** Задержка перед стартом, в секундах. Для хиро, где сначала должна сесть сцена. */
  delay?: number
}

/**
 * Заголовок, выезжающий из-под маски по словам.
 * Маска — overflow:hidden на СТРОКЕ, а не clip-path: строка ловит перенос сама,
 * поэтому текст остаётся живым (копируется, читается скринридером, переносится по ширине).
 */
export default function MaskedHeading({ text, as: Tag = 'h2', className, delay = 0 }: Props) {
  const { ref, time } = useRevealTime<HTMLHeadingElement>(1.1)
  const wordsRef = useRef<HTMLSpanElement[]>([])

  useEffect(() => {
    let raf = 0

    const tick = () => {
      const t = Math.max(0, time.current * 1.5 - delay)
      wordsRef.current.forEach((word, i) => {
        if (!word) return
        // stagger 60мс на слово: порядок чтения важнее одновременности.
        const local = t - i * 0.06
        const y = fit(local, 0, 1, 1.15, 0)
        const rot = fit(local, 0, 0.7, 6, 0)
        word.style.transform = `translate3d(0, ${y}em, 0) rotate(${rot}deg)`
      })
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [time, delay])

  const words = text.split(' ')
  wordsRef.current = []

  return (
    <Tag ref={ref as never} className={[styles.root, className].filter(Boolean).join(' ')}>
      {/* Полный текст для скринридера: разбитые слова читаются как отдельные фрагменты. */}
      <span className={styles.sr}>{text}</span>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <span key={i} className={styles.mask}>
            <span
              className={styles.word}
              ref={(el) => {
                if (el) wordsRef.current[i] = el
              }}
            >
              {word}
            </span>
          </span>
        ))}
      </span>
    </Tag>
  )
}
