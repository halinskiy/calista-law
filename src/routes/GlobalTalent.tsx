import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import Footer from '../components/Footer'
import { ROUTES, GRADES, FACTS, TIMELINE, LAST_VERIFIED } from '../content/visa'
import inner from '../styles/inner.module.css'
import styles from './GlobalTalent.module.css'

export default function GlobalTalent() {
  return (
    <>
      <PageHero
        index="01 / The route"
        eyebrow="Global Talent"
        title="Two doors, and only one is yours."
        lead="Global Talent lets a designer settle in the UK on the strength of their work, with no job offer and the freedom to freelance. The catch is that designers do not all enter through the same door, and the wrong door costs money and time for nothing."
      />

      <div className={inner.page}>
        {/* Оба маршрута детально */}
        <section className={inner.section}>
          <div className="container">
            <div className={inner.sectionHead}>
              <p className="mono">The fork</p>
              <Reveal as="h2" className={inner.h2}>Your discipline picks your endorser.</Reveal>
            </div>

            <div className={styles.routes}>
              {ROUTES.map((route) => (
                <article key={route.id} className={styles.route}>
                  <p className="mono">
                    {route.kicker}
                    {route.isNew && <span className={styles.badge}>New</span>}
                  </p>
                  <h3 className={styles.routeTitle}>{route.title}</h3>
                  <p className={styles.endorser}>{route.endorserFull}</p>
                  <p className={styles.routeSummary}>{route.summary}</p>

                  <p className={styles.listLabel}>
                    <span className="mono">Covers</span>
                  </p>
                  <ul className={styles.list}>
                    {route.disciplines.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                  <p className={styles.excluded}>Not here: {route.excluded.join(', ')}.</p>

                  <dl className={styles.meta}>
                    <div>
                      <dt className="mono">Evidence limit</dt>
                      <dd>{route.evidencePages} sides of A4 per document</dd>
                    </div>
                    <div>
                      <dt className="mono">Endorsement</dt>
                      <dd>{route.weeks}</dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>

            <p className={styles.trap}>
              A product designer working on software belongs with Tech Nation, even though product
              design is listed on the design pathway. There it means physical objects made at scale.
              The job title misleads, the discipline decides.
            </p>
          </div>
        </section>

        {/* Talent vs Promise */}
        <section className={inner.section}>
          <div className="container">
            <div className={inner.sectionHead}>
              <p className="mono">The grade</p>
              <Reveal as="h2" className={inner.h2}>Talent or promise. It sets your clock.</Reveal>
            </div>
            <div className={styles.grades}>
              {GRADES.map((g) => (
                <article key={g.id} className={styles.grade}>
                  <p className={styles.gradeYears}>
                    {g.ilrYears}
                    <span className="mono"> years to settlement</span>
                  </p>
                  <h3 className={styles.gradeTitle}>{g.title}</h3>
                  <p>{g.who}</p>
                  <p className={styles.gradeCountries}>{g.countries}</p>
                  <p className={styles.gradeNote}>{g.note}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Сроки */}
        <section className={inner.section}>
          <div className="container">
            <div className={inner.sectionHead}>
              <p className="mono">The clock</p>
              <Reveal as="h2" className={inner.h2}>How long each stage takes.</Reveal>
            </div>
            <dl className={styles.timeline}>
              <div>
                <dt className="mono">Design endorsement</dt>
                <dd>{TIMELINE.endorsementDesign}</dd>
              </div>
              <div>
                <dt className="mono">Tech Nation endorsement</dt>
                <dd>{TIMELINE.endorsementTech}</dd>
              </div>
              <div>
                <dt className="mono">Visa, outside the UK</dt>
                <dd>{TIMELINE.visaOutsideUK}</dd>
              </div>
              <div>
                <dt className="mono">Visa, inside the UK</dt>
                <dd>{TIMELINE.visaInsideUK}</dd>
              </div>
            </dl>
            <p className={styles.note}>
              Endorsement cannot be accelerated. Priority service exists at the visa stage only. If a
              body refuses, there is no appeal, only a {TIMELINE.reviewWindow} review that checks the
              process, not the merits, and takes no new evidence.
            </p>
          </div>
        </section>

        {/* Частые вопросы */}
        <section className={inner.section}>
          <div className="container">
            <div className={inner.sectionHead}>
              <p className="mono">Answered plainly</p>
              <Reveal as="h2" className={inner.h2}>The questions everyone asks first.</Reveal>
            </div>
            <div className={styles.facts}>
              {FACTS.map((f) => (
                <article key={f.q} className={styles.fact}>
                  <h3 className={styles.factQ}>{f.q}</h3>
                  <p className={styles.factA}>{f.a}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={inner.section}>
          <div className="container">
            <Reveal as="h2" className={inner.h2}>Not sure which door is yours?</Reveal>
            <p className={inner.lead}>
              That is the first thing we work out, before a single letter is written. Tell us what you
              do, and we will tell you which body should see it.
            </p>
            <Link to="/contact" className={inner.cta} data-cursor>
              Talk to us about your case
            </Link>
            <p className={styles.verified}>
              <span className="mono">Rules and fees verified {LAST_VERIFIED}</span>
            </p>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
