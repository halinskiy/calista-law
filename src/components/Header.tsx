import { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './Header.module.css'

const NAV = [
  { label: 'Global Talent', to: '/global-talent-visa' },
  { label: 'Process', to: '/process' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'About', to: '/about' },
]

export default function Header() {
  const bar = useRef<HTMLDivElement>(null)
  const root = useRef<HTMLElement>(null)
  const { pathname } = useLocation()

  useEffect(() => {
    let raf = 0
    let dark = false
    const tick = () => {
      const el = bar.current
      if (el) {
        // Прогресс чтения: где ты в документе, без отдельного скроллбара.
        const max = document.documentElement.scrollHeight - window.innerHeight
        el.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`
      }
      // Хедер fixed висит над секциями разной яркости. Над тёмной (honesty, футер) светлый
      // полупрозрачный фон читается как грязно-серый, а серая навигация тонет. Переключаем тему,
      // когда под линией хедера оказывается секция, помеченная data-nav-theme="dark".
      let nowDark = false
      for (const s of document.querySelectorAll<HTMLElement>('[data-nav-theme="dark"]')) {
        const r = s.getBoundingClientRect()
        if (r.top <= 40 && r.bottom >= 40) {
          nowDark = true
          break
        }
      }
      if (nowDark !== dark && root.current) {
        dark = nowDark
        root.current.dataset.onDark = String(nowDark)
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <header ref={root} className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.brand} data-cursor>
          Calista Law
          <span className="mono">Global Talent</span>
        </Link>

        <nav className={styles.nav}>
          {NAV.map((item) => {
            const active = pathname.startsWith(item.to)
            return (
              <Link
                key={item.to}
                to={item.to}
                className={active ? styles.linkActive : styles.link}
                data-cursor
              >
                {item.label}
              </Link>
            )
          })}
          <Link to="/contact" className={styles.cta} data-cursor>
            Contact
          </Link>
        </nav>
      </div>
      <span ref={bar} className={styles.progress} aria-hidden="true" />
    </header>
  )
}
