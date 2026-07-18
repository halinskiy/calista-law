import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import styles from './Header.module.css'

const NAV = [
  { label: 'Overview', to: '#top' },
  { label: 'Two routes', to: '#routes' },
  { label: 'Pricing', to: '#pricing' },
  { label: 'FAQ', to: '#faq' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const { hash } = useLocation()

  useEffect(() => setOpen(false), [hash])

  return (
    <header className={`${styles.header} ${styles.tweed}`} data-open={open}>
      <div className={styles.inner}>
        <a href="#top" className={styles.brand}>
          <span className={styles.brandName}>Calista Law</span>
          <span className={styles.brandTag}>UK Global Talent · Immigration for designers</span>
        </a>

        <nav className={styles.nav}>
          {NAV.map((item) => (
            <a key={item.to} href={item.to} className={styles.link}>
              {item.label}
            </a>
          ))}
          <a href="#enquiry" className={styles.cta}>
            Free callback
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
        {[...NAV, { label: 'Enquire', to: '#enquiry' }].map((item) => (
          <a key={item.to} href={item.to} className={styles.mobileLink} onClick={() => setOpen(false)}>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  )
}
