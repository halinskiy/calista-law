import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import styles from './Header.module.css'

const NAV = [
  { label: 'Two routes', to: '#routes' },
  { label: 'Approach', to: '#approach' },
  { label: 'Pricing', to: '#pricing' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [solid, setSolid] = useState(false)
  const { hash } = useLocation()

  useEffect(() => setOpen(false), [hash])

  // Прошли синий hero → хедер становится светлым, чтобы читаться на светлом контенте.
  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      setSolid(window.scrollY > window.innerHeight * 0.72)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <header className={styles.header} data-open={open} data-solid={solid}>
      <div className={styles.inner}>
        <a href="#top" className={styles.brand}>
          Calista Law
        </a>

        <nav className={styles.nav}>
          {NAV.map((item) => (
            <a key={item.to} href={item.to} className={styles.link}>
              {item.label}
            </a>
          ))}
          <a href="#contact" className={styles.cta}>
            Book a call
          </a>
        </nav>

        <button
          type="button"
          className={styles.burger}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>

      <nav className={styles.mobilePanel}>
        {[...NAV, { label: 'Contact', to: '#contact' }].map((item) => (
          <a key={item.to} href={item.to} className={styles.mobileLink} onClick={() => setOpen(false)}>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  )
}
