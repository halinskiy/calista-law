import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import Footer from '../components/Footer'
import { SERVICES, FEES, LAST_VERIFIED } from '../content/visa'
import inner from '../styles/inner.module.css'
import styles from './Pricing.module.css'

export default function Pricing() {
  return (
    <>
      <PageHero
        index="03 / What it costs"
        eyebrow="Pricing"
        title="Our fee, and the government's, kept separate."
        lead="Two different bills go into a Global Talent application. What you pay us, and what you pay the Home Office. We quote ours upfront and never by the hour, and we never fold the government fees into our number to make it look larger."
      />

      <div className={inner.page}>
        <section className={inner.section}>
          <div className="container">
            <div className={inner.sectionHead}>
              <p className="mono">Our work</p>
              <Reveal as="h2" className={inner.h2}>Three ways to work with us.</Reveal>
            </div>
            <div className={styles.services}>
              {SERVICES.map((s) => (
                <article key={s.name} className={styles.service}>
                  <p className={styles.servicePrice}>
                    <span className="mono">{s.price}</span>
                  </p>
                  <h3 className={styles.serviceName}>{s.name}</h3>
                  <p className={styles.serviceBody}>{s.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={inner.section}>
          <div className="container">
            <div className={inner.sectionHead}>
              <p className="mono">The government's part</p>
              <Reveal as="h2" className={inner.h2}>Home Office fees, to the pound.</Reveal>
            </div>
            <div className={styles.fees}>
              <div className={styles.fee}>
                <p className={styles.feeNum}>£{FEES.endorsement}</p>
                <p className="mono">Endorsement</p>
              </div>
              <div className={styles.fee}>
                <p className={styles.feeNum}>£{FEES.visa}</p>
                <p className="mono">Visa stage</p>
              </div>
              <div className={styles.fee}>
                <p className={styles.feeNum}>£{FEES.ihsPerYear.toLocaleString('en-GB')}</p>
                <p className="mono">Health surcharge, per year</p>
              </div>
              <div className={styles.fee}>
                <p className={styles.feeNum}>£{FEES.fiveYearAdult.toLocaleString('en-GB')}</p>
                <p className="mono">One adult, five years</p>
              </div>
            </div>
            <p className={styles.note}>
              The April 2026 fee rise left Global Talent untouched. Priority service (£{FEES.priority})
              is available at the visa stage only; the endorsement cannot be sped up at any price.
              Each dependant pays the same £{FEES.total} in fees plus their own health surcharge.
            </p>
          </div>
        </section>

        <section className={inner.section}>
          <div className="container">
            <Reveal as="h2" className={inner.h2}>A fixed fee starts with a placement call.</Reveal>
            <p className={inner.lead}>
              We quote once we know your route and where your record stands. No hourly billing, no
              surprises at the end.
            </p>
            <Link to="/contact" className={inner.cta} data-cursor>
              Get a quote
            </Link>
            <p className={styles.verified}>
              <span className="mono">Government fees verified {LAST_VERIFIED}</span>
            </p>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
