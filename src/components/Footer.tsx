import { Link } from 'react-router-dom'
import { LAST_VERIFIED } from '../content/visa'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer} data-nav-theme="dark">
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brand}>
            <p className={styles.name}>Calista Law</p>
            <p className={styles.tag}>UK Global Talent, for designers.</p>
          </div>
          <nav className={styles.nav}>
            <Link to="/global-talent-visa" data-cursor>
              Global Talent
            </Link>
            <Link to="/process" data-cursor>
              Process
            </Link>
            <Link to="/pricing" data-cursor>
              Pricing
            </Link>
            <Link to="/about" data-cursor>
              About
            </Link>
            <Link to="/contact" data-cursor>
              Contact
            </Link>
          </nav>
        </div>

        <div className={styles.bottom}>
          {/* Дисклеймер обязателен: сайт публичный и выглядит как настоящая фирма, но фирма вымышленная. */}
          <p className={styles.disclaimer}>
            Concept site. Calista Law is a fictional firm and this is not legal advice. The visa
            facts are real and were verified against gov.uk primary sources on {LAST_VERIFIED}.
          </p>
          <p className="mono">© 2026</p>
        </div>
      </div>
    </footer>
  )
}
