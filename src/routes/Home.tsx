import { useState } from 'react'
import TocRail from '../components/TocRail'
import Accordion from '../components/Accordion'
import Footer from '../components/Footer'
import {
  HERO,
  TOC,
  TOC_SUMMARY,
  WHAT_IS,
  ROUTES,
  EVIDENCE,
  GRADES,
  PITFALLS,
  FEES,
  SERVICES,
  FACTS,
  LAST_VERIFIED,
} from '../content/visa'
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
      <main className={styles.main}>
        <div className={`${styles.grid} container`}>
          <article className={styles.article}>
            {/* Hero */}
            <section id="top" className={styles.hero}>
              <h1 className={styles.h1}>{HERO.title}</h1>
              <p className={styles.lead}>{HERO.lead}</p>
              <div className={styles.heroActions}>
                <a href="#enquiry" className={styles.ctaAction}>
                  Book a free assessment call
                </a>
                <a href="#routes" className={styles.ctaSecondary}>
                  See the two routes
                </a>
              </div>
            </section>

            {/* What it is */}
            <section id="what-is" className={styles.section}>
              <p className="mono">01 · What it is</p>
              <h2 className={styles.h2}>What the Global Talent visa is</h2>
              <div className={styles.prose}>
                {WHAT_IS.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
            </section>

            {/* Two routes */}
            <section id="routes" className={styles.section}>
              <p className="mono">02 · Two routes</p>
              <h2 className={styles.h2}>Your discipline decides your endorser</h2>
              <div className={styles.cards2}>
                {ROUTES.map((route) => (
                  <article key={route.id} className={styles.card}>
                    <p className={styles.cardKicker}>
                      {route.kicker}
                      {route.isNew && <span className={styles.badge}>New</span>}
                    </p>
                    <h3 className={styles.cardTitle}>{route.title}</h3>
                    <p className={styles.cardMeta}>{route.endorserFull}</p>
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
              <p className={styles.emphasis}>
                A product designer working on software belongs with Tech Nation, even though product
                design is listed on the design pathway. There it means physical objects made at scale.{' '}
                <span className="accent">Job titles mislead, the discipline decides.</span>
              </p>
            </section>

            {/* Evidence */}
            <section id="evidence" className={styles.section}>
              <p className="mono">03 · Evidence</p>
              <h2 className={styles.h2}>What the endorsers actually weigh</h2>
              <p className={styles.sectionLead}>
                A strong portfolio is not the same as strong evidence. Three things decide most cases.
              </p>
              <div className={styles.cards3}>
                {EVIDENCE.map((e) => (
                  <article key={e.title} className={styles.card}>
                    <h3 className={styles.cardTitle}>{e.title}</h3>
                    <p className={styles.cardBody}>{e.body}</p>
                  </article>
                ))}
              </div>
            </section>

            {/* Talent or promise */}
            <section id="grade" className={styles.section}>
              <p className="mono">04 · Talent or promise</p>
              <h2 className={styles.h2}>Three years or five. You choose it now</h2>
              <div className={styles.cards2}>
                {GRADES.map((g) => (
                  <article key={g.id} className={styles.card}>
                    <p className={styles.years}>
                      {g.ilrYears}
                      <span className="mono"> years to settlement</span>
                    </p>
                    <h3 className={styles.cardTitle}>{g.title}</h3>
                    <p className={styles.cardBody}>{g.who}</p>
                    <p className={styles.cardMeta}>{g.countries}</p>
                    <p className={styles.note}>{g.note}</p>
                  </article>
                ))}
              </div>
            </section>

            {/* Common mistakes */}
            <section id="mistakes" className={styles.section}>
              <p className="mono">05 · Common mistakes</p>
              <h2 className={styles.h2}>The errors behind most refusals</h2>
              <ol className={styles.issues}>
                {PITFALLS.map((p, i) => (
                  <li key={p.title} className={styles.issue}>
                    <span className={styles.issueNum}>{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <h3 className={styles.issueTitle}>{p.title}</h3>
                      <p className={styles.cardBody}>{p.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {/* Pricing */}
            <section id="pricing" className={styles.section}>
              <p className="mono accent">06 · Pricing</p>
              <h2 className={styles.h2}>Our fee, and the government’s, kept separate</h2>
              <p className={styles.sectionLead}>
                Two bills go into a Global Talent application. What you pay us, quoted upfront and
                never by the hour, and what you pay the Home Office. We never fold one into the other.
              </p>
              <div className={styles.cards3}>
                {SERVICES.map((s) => (
                  <article key={s.name} className={styles.card}>
                    <p className={styles.price}>{s.price}</p>
                    <h3 className={styles.cardTitle}>{s.name}</h3>
                    <p className={styles.cardBody}>{s.body}</p>
                  </article>
                ))}
              </div>

              <p className={styles.subLabel}>
                <span className="mono">Home Office fees, to the pound</span>
              </p>
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
                  <p className="mono">Health surcharge / yr</p>
                </div>
                <div className={styles.fee}>
                  <p className={styles.feeNum}>£{FEES.fiveYearAdult.toLocaleString('en-GB')}</p>
                  <p className="mono">One adult, five years</p>
                </div>
              </div>
              <p className={styles.footnote}>
                The April 2026 fee rise left Global Talent untouched. Priority service (£
                {FEES.priority}) exists at the visa stage only; the endorsement cannot be sped up at
                any price.
              </p>
            </section>

            {/* FAQ */}
            <section id="faq" className={styles.section}>
              <p className="mono">07 · FAQ</p>
              <h2 className={styles.h2}>The questions everyone asks first</h2>
              <Accordion items={FACTS.map((f) => ({ q: f.q, a: f.a }))} />
            </section>

            {/* Enquire */}
            <section id="enquiry" className={styles.section}>
              <p className="mono">08 · Enquire</p>
              <h2 className={styles.h2}>Tell us what you do</h2>
              <p className={styles.sectionLead}>
                The first thing we work out is your route, and that starts with your discipline. Say
                what you actually do, and we will point you at the right door before anything is
                charged.
              </p>

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
                    <textarea name="message" rows={5} />
                  </label>
                  <button type="submit" className={styles.ctaAction}>
                    Send enquiry
                  </button>
                </form>
              )}
              <p className={styles.verified}>
                <span className="mono">Rules and fees verified {LAST_VERIFIED}</span>
              </p>
            </section>
          </article>

          <TocRail items={TOC} summary={TOC_SUMMARY} ctaLabel="Book a free assessment call" ctaId="enquiry" />
        </div>
      </main>
      <Footer />
    </>
  )
}
