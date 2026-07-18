import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import styles from './TocRail.module.css'

type Item = { id: string; label: string; accent?: boolean }

type Props = {
  items: readonly Item[]
  summary: string
  ctaLabel: string
  ctaId: string
}

const HEADER_OFFSET = 118
const EASE = [0.2, 0.8, 0.2, 1] as const

/** Плавный скролл к секции своим rAF, как у референса: контроль оффсета под липкий хедер. */
function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const dest = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.scrollTo(0, dest)
    return
  }
  const from = window.scrollY
  const delta = dest - from
  const dur = Math.min(600, Math.max(320, 0.32 * Math.abs(delta)))
  let start = 0
  const step = (t: number) => {
    if (!start) start = t
    const p = Math.min(1, (t - start) / dur)
    const eased = 1 - Math.pow(1 - p, 3)
    window.scrollTo(0, from + delta * eased)
    if (p < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

/**
 * Оглавление-морф из референса Cromwell. В хиро карточка показывает интро «This page»,
 * а как только первая секция уходит выше середины экрана — превращается в «On this page»:
 * список секций, счётчик, подсветка текущей. Rail липкий (CSS), едет со скроллом.
 *
 * Активная секция и переход intro↔toc считаются в одном rAF-хендлере из геометрии,
 * без накопления — прыжок по якорю не оставляет счётчик в промежуточном состоянии.
 */
export default function TocRail({ items, summary, ctaLabel, ctaId }: Props) {
  const [active, setActive] = useState(0)
  const [isIntro, setIsIntro] = useState(true)
  const raf = useRef(0)

  useEffect(() => {
    const update = () => {
      raf.current = 0
      const vh = window.innerHeight
      const first = document.getElementById(items[0].id)
      if (first) setIsIntro(first.getBoundingClientRect().top > 0.5 * vh)

      // Активная = последняя секция, чей верх пересёк линию 36% высоты экрана.
      const line = 0.36 * vh
      let idx = 0
      items.forEach((it, i) => {
        const el = document.getElementById(it.id)
        if (el && el.getBoundingClientRect().top <= line) idx = i
      })
      setActive(idx)
    }
    const onScroll = () => {
      if (!raf.current) raf.current = requestAnimationFrame(update)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    update()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [items])

  const total = items.length
  const atEnquiry = active === total - 1

  return (
    <div className={styles.lane}>
      <motion.aside layout className={styles.card} aria-label="On this page">
        <AnimatePresence mode="wait" initial={false}>
          {isIntro ? (
            <motion.div
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.24, ease: EASE }}
            >
              <p className="mono">This page</p>
              <p className={styles.summary}>{summary}</p>
              <button className={styles.start} onClick={() => scrollToId(items[0].id)}>
                Start reading <span aria-hidden="true">↓</span>
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="toc"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.24, ease: EASE }}
            >
              <div className={styles.head}>
                <span className="mono">On this page</span>
                <span className={styles.counter}>
                  {String(active + 1).padStart(2, '0')}
                  <span className={styles.counterTotal}> / {String(total).padStart(2, '0')}</span>
                </span>
              </div>

              <nav className={styles.list}>
                {items.map((it, i) => (
                  <button
                    key={it.id}
                    className={styles.item}
                    data-active={i === active}
                    data-accent={it.accent || undefined}
                    onClick={() => scrollToId(it.id)}
                  >
                    {i === active && (
                      <motion.span layoutId="toc-marker" className={styles.marker} transition={{ duration: 0.3, ease: EASE }} />
                    )}
                    <span className={styles.label}>{it.label}</span>
                  </button>
                ))}
              </nav>

              {!atEnquiry && (
                <motion.button
                  className={styles.cta}
                  onClick={() => scrollToId(ctaId)}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28, ease: EASE }}
                >
                  {ctaLabel}
                </motion.button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.aside>
    </div>
  )
}
