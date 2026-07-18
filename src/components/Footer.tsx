import { LAST_VERIFIED } from '../content/visa'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={`${styles.footer} ${styles.tweed}`}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brandCol}>
            <p className={styles.brandName}>Calista Law</p>
            <p className={styles.brandTag}>UK Global Talent, for designers.</p>
          </div>

          <div className={styles.cols}>
            <div className={styles.col}>
              <p className="mono">Office</p>
              <p>Chancery Lane, London WC2A</p>
            </div>
            <div className={styles.col}>
              <p className="mono">Contact</p>
              <p>020 0000 0000</p>
              <p>hello@calistalaw.example</p>
            </div>
            <div className={styles.col}>
              <p className="mono">Explore</p>
              <a href="#routes">Two routes</a>
              <a href="#pricing">Pricing</a>
              <a href="#faq">FAQ</a>
              <a href="#enquiry">Enquire</a>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.disclaimer}>
            Concept site. Calista Law is a fictional firm and this is not legal advice. The visa facts
            are real and were verified against gov.uk primary sources on {LAST_VERIFIED}.
          </p>
          <p className="mono">© 2026 Calista Law</p>
        </div>
      </div>
    </footer>
  )
}
