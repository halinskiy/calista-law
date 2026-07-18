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
  const { hash } = useLocation()

  useEffect(() => setOpen(false), [hash])

  return (
    <header className={styles.header} data-open={open}>
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
