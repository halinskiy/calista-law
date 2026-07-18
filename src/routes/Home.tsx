import { useState } from 'react'
import Accordion from '../components/Accordion'
import Footer from '../components/Footer'
import { ROUTES, PROCESS, FEES, GRADES, FACTS, SERVICES, LAST_VERIFIED } from '../content/visa'
import styles from './Home.module.css'

const DISCIPLINES = [
  { value: 'design', label: 'Graphic, brand, product, industrial, service' },
  { value: 'digital', label: 'UX, UI, product design for software' },
  { value: 'unsure', label: 'Not sure which one I am' },
]

export default function Home() {
  const [sent, setSent] = useState(false)

  return (
    <>
      <main id="top" className={styles.page}>
        {/* Hero: заявление слева, cinematic-фото London справа. Визуал несёт вес, как у премиальных. */}
        <section className={styles.hero}>
          <div className={`${styles.heroGrid} container`}>
            <div className={styles.heroCol}>
              <p className="mono">UK Global Talent Visa · For designers</p>
              <h1 className={styles.heroTitle}>Settle in the UK on the strength of your work.</h1>
              <p className={styles.heroLead}>
                The Global Talent visa needs no job offer and lets you freelance. Since 1 July 2026
                there are two routes to it, and the wrong one costs £{FEES.endorsement} and returns no
                decision. We make sure your case goes to the right door.
              </p>
              <div className={styles.heroActions}>
                <a href="#contact" className={styles.heroSolid}>
                  Book a free assessment <span aria-hidden="true">→</span>
                </a>
                <a href="#routes" className={styles.heroGhost}>
                  See the two routes
                </a>
              </div>
            </div>

            <div className={styles.heroPhoto}>
              {/* Photo: Unsplash. City of London skyline, St Paul's Cathedral. */}
              <img
                src={`${import.meta.env.BASE_URL}hero-london.jpg`}
                alt="City of London skyline with St Paul's Cathedral"
                width={1300}
                height={1950}
              />
            </div>
          </div>

          {/* Ключевые цифры тонкой полосой под hero. */}
          <div className={`${styles.metricsBand} container`}>
            <div className={styles.metric}>
              <p className={styles.metricNum}>£{FEES.total}</p>
              <p className={styles.metricLabel}>Home Office fees, endorsement plus visa</p>
            </div>
            <div className={styles.metric}>
              <p className={styles.metricNum}>{GRADES[0].ilrYears} yrs</p>
              <p className={styles.metricLabel}>To settlement on Exceptional Talent</p>
            </div>
            <div className={styles.metric}>
              <p className={styles.metricNum}>2</p>
              <p className={styles.metricLabel}>Endorsing bodies. Only one is yours</p>
            </div>
            <div className={styles.metric}>
              <p className={styles.metricNum}>No</p>
              <p className={styles.metricLabel}>Job offer needed. Freelance allowed</p>
            </div>
          </div>
        </section>

        {/* Two routes */}
        <section id="routes" className={styles.section}>
          <div className="container">
            <div className={styles.sectionHead}>
              <p className="mono">Two routes</p>
              <h2 className={styles.h2}>Your discipline decides your endorser.</h2>
            </div>
            <div className={styles.routeGrid}>
              {ROUTES.map((route) => (
                <article key={route.id} className={styles.routeCard}>
                  <p className={styles.cardKicker}>
                    {route.kicker}
                    {route.isNew && <span className={styles.badge}>New</span>}
                  </p>
                  <h3 className={styles.routeTitle}>{route.title}</h3>
                  <p className={styles.routeMeta}>{route.endorserFull}</p>
                  <ul className={styles.list}>
                    {route.disciplines.slice(0, 5).map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                  <p className={styles.exclude}>Not here: {route.excluded.slice(0, 3).join(', ')}.</p>
                  <div className={styles.cardFoot}>
                    <span className="mono">{route.evidencePages} sides A4</span>
                    <span className="mono">{route.weeks}</span>
                  </div>
                </article>
              ))}
            </div>
            <p className={styles.trap}>
              A product designer working on software belongs with Tech Nation, even though product
              design is listed on the design pathway. Job titles mislead, the discipline decides.
            </p>
          </div>
        </section>

        {/* Approach */}
        <section id="approach" className={styles.section}>
          <div className="container">
            <div className={styles.sectionHead}>
              <p className="mono">How we work</p>
              <h2 className={styles.h2}>Six steps, in the order they matter.</h2>
            </div>
            <ol className={styles.steps}>
              {PROCESS.map((s, i) => (
                <li key={s.title} className={styles.step}>
                  <span className={styles.stepNum}>{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className={styles.stepTitle}>{s.title}</h3>
                    <p className={styles.stepBody}>{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className={styles.section}>
          <div className="container">
            <div className={styles.sectionHead}>
              <p className="mono">Pricing</p>
              <h2 className={styles.h2}>Our fee, and the government’s, kept separate.</h2>
            </div>
            <div className={styles.services}>
              {SERVICES.map((s) => (
                <article key={s.name} className={styles.service}>
                  <p className={styles.servicePrice}>{s.price}</p>
                  <h3 className={styles.serviceName}>{s.name}</h3>
                  <p className={styles.serviceBody}>{s.body}</p>
                </article>
              ))}
            </div>
            <p className={styles.subLabel}>
              <span className="mono">Home Office fees, to the pound</span>
            </p>
            <div className={styles.feeRow}>
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
                <p className="mono">Health surcharge / yr</p>
              </div>
              <div className={styles.fee}>
                <p className={styles.feeNum}>£{FEES.fiveYearAdult.toLocaleString('en-GB')}</p>
                <p className="mono">One adult, five years</p>
              </div>
            </div>
            <p className={styles.footnote}>
              The April 2026 fee rise left Global Talent untouched. Priority service (£{FEES.priority})
              exists at the visa stage only; the endorsement cannot be sped up at any price.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className={styles.section}>
          <div className="container">
            <div className={styles.sectionHead}>
              <p className="mono">Answered plainly</p>
              <h2 className={styles.h2}>The questions everyone asks first.</h2>
            </div>
            <Accordion items={FACTS.map((f) => ({ q: f.q, a: f.a }))} />
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className={styles.section}>
          <div className="container">
            <div className={styles.sectionHead}>
              <p className="mono">Enquire</p>
              <h2 className={styles.h2}>Tell us what you do.</h2>
              <p className={styles.contactLead}>
                The first thing we work out is your route, and that starts with your discipline. Say
                what you actually do, and we point you at the right door before anything is charged.
              </p>
            </div>

            {sent ? (
              <div className={styles.done}>
                <p className="mono">Received</p>
                <p className={styles.doneText}>
                  Thanks. On the real site you would hear back within two working days. This is a
                  concept form, so it does not actually send.
                </p>
              </div>
            ) : (
              <form
                className={styles.form}
                onSubmit={(e) => {
                  e.preventDefault()
                  setSent(true)
                }}
              >
                <div className={styles.formRow}>
                  <label className={styles.field}>
                    <span className="mono">Your name</span>
                    <input type="text" name="name" required autoComplete="name" />
                  </label>
                  <label className={styles.field}>
                    <span className="mono">Email</span>
                    <input type="email" name="email" required autoComplete="email" />
                  </label>
                </div>
                <fieldset className={styles.fieldset}>
                  <legend className="mono">What kind of design do you do?</legend>
                  {DISCIPLINES.map((d) => (
                    <label key={d.value} className={styles.radio}>
                      <input type="radio" name="discipline" value={d.value} required />
                      <span>{d.label}</span>
                    </label>
                  ))}
                </fieldset>
                <label className={styles.field}>
                  <span className="mono">A little about your work</span>
                  <textarea name="message" rows={4} />
                </label>
                <button type="submit" className={styles.ctaSolid}>
                  Send enquiry <span aria-hidden="true">→</span>
                </button>
              </form>
            )}
            <p className={styles.verified}>
              <span className="mono">Rules and fees verified {LAST_VERIFIED}</span>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
