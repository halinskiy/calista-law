import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import MaskedHeading from '../components/MaskedHeading'
import Footer from '../components/Footer'
import { PROCESS, PITFALLS } from '../content/visa'
import inner from '../styles/inner.module.css'
import styles from './Process.module.css'

export default function Process() {
  return (
    <>
      <PageHero
        index="02 / How we work"
        eyebrow="Process"
        title="Six steps, in the order they matter."
        lead="Most applications fail on the first step and the fourth: the wrong endorsing body, and letters that carry no weight. Our process is built around getting those two right before anything else."
      />

      <div className={inner.page}>
        <section className={inner.section}>
          <div className="container">
            {/* Прогресс-рельс: где ты в процессе, номер = сообщение. */}
            <ol className={styles.rail}>
              {PROCESS.map((step, i) => (
                <li key={step.title} className={styles.step}>
                  <div className={styles.stepMark}>
                    <span className="mono">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <div className={styles.stepBody}>
                    <h2 className={styles.stepTitle}>{step.title}</h2>
                    <p className={styles.stepText}>{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className={inner.section}>
          <div className="container">
            <div className={inner.sectionHead}>
              <p className="mono">What we design around</p>
              <MaskedHeading as="h2" className={inner.h2} text="The refusals are predictable, so we plan for them." />
            </div>
            <div className={styles.pitfalls}>
              {PITFALLS.map((p, i) => (
                <article key={p.title} className={styles.pitfall}>
                  <p className="mono">{String(i + 1).padStart(2, '0')}</p>
                  <h3 className={styles.pitfallTitle}>{p.title}</h3>
                  <p className={styles.pitfallText}>{p.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={inner.section}>
          <div className="container">
            <MaskedHeading as="h2" className={inner.h2} text="Start with the placement call." />
            <p className={inner.lead}>
              Half an hour to work out your route and whether your record is ready. If it is not, you
              will hear that first, not last.
            </p>
            <Link to="/contact" className={inner.cta} data-cursor>
              Book a placement call
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
