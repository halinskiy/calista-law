import { lazy, Suspense, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import MaskedHeading from '../components/MaskedHeading'
import Cursor from '../components/Cursor'
import { clamp, fit } from '../lib/motion'
import { ROUTES, FEES, GRADES, PITFALLS, LAST_VERIFIED } from '../content/visa'
import styles from './Home.module.css'

// Единственное место во всём приложении, где грузится three.js.
const HeroScene = lazy(() => import('../scenes/HeroScene'))

export default function Home() {
  const splitRatio = useRef(0)
  const anchors = useRef<(HTMLElement | null)[]>([null, null])
  const splitSection = useRef<HTMLDivElement>(null)
  const webglOff = useRef(
    typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce), (max-width: 812px)').matches,
  )

  useEffect(() => {
    let raf = 0

    // Скролл-скраб: ratio считается заново каждый кадр из геометрии, без накопления состояния.
    // Иначе прыжок по якорю или перезагрузка с хэшем оставляет морф в промежуточной позе.
    const tick = () => {
      const el = splitSection.current
      if (el) {
        const top = el.getBoundingClientRect().top
        const vh = window.innerHeight
        splitRatio.current = clamp(fit(top, vh * 0.85, vh * 0.15, 0, 1))
      }
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <>
      <Cursor />
      {!webglOff.current && (
        <Suspense fallback={null}>
          <HeroScene splitRatio={splitRatio} anchors={anchors} />
        </Suspense>
      )}

      <main className={styles.main}>
        <section className={styles.hero}>
          <div className="container">
            <p className="mono">UK Global Talent Visa</p>
            <MaskedHeading
              as="h1"
              className={styles.heroTitle}
              text="Two routes. Only one of them is yours."
              delay={0.35}
            />
            <p className={styles.heroLead}>
              Since 1 July 2026 the Home Office runs a design pathway that did not exist before. It is
              not the route most designers need. Sending your case to the wrong endorsing body costs
              £{FEES.endorsement} and gets no decision at all.
            </p>
            <p className={styles.scrollHint}>
              <span className="mono">Scroll to find your route</span>
            </p>
          </div>
        </section>

        <section className={styles.split} id="routes">
          <div className="container">
            <header className={styles.splitHead}>
              <p className="mono">01 / The fork</p>
              <MaskedHeading as="h2" text="Your discipline decides your endorser." />
            </header>

            {/* Скраб меряется по блоку карточек, а не по секции: частицы должны сесть тогда,
                когда карточки уже в кадре, а не пока их закрывает заголовок. */}
            <div ref={splitSection} className={styles.routes}>
              {ROUTES.map((route, i) => (
                <article key={route.id} className={styles.route}>
                  {/* Пустой якорь: вёрстка задаёт геометрию, сцена рисует в ней пиксели. */}
                  <div
                    className={styles.anchor}
                    ref={(el) => {
                      anchors.current[i] = el
                    }}
                  />
                  <div className={styles.routeBody}>
                    <p className="mono">
                      {route.kicker}
                      {route.isNew && <span className={styles.badge}>New</span>}
                    </p>
                    <h3 className={styles.routeTitle}>{route.title}</h3>
                    <p className={styles.endorser}>{route.endorserFull}</p>
                    <p className={styles.routeSummary}>{route.summary}</p>

                    <ul className={styles.list}>
                      {route.disciplines.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>

                    <p className={styles.excluded}>
                      Not here: {route.excluded.join(', ')}.
                    </p>

                    <dl className={styles.meta}>
                      <div>
                        <dt className="mono">Evidence</dt>
                        <dd>{route.evidencePages} sides of A4 per document</dd>
                      </div>
                      <div>
                        <dt className="mono">Endorsement</dt>
                        <dd>{route.weeks}</dd>
                      </div>
                    </dl>
                  </div>
                </article>
              ))}
            </div>

            <p className={styles.trap}>
              The trap: a product designer working on software belongs with Tech Nation, even though
              product design is listed on the design pathway. There it means physical objects made at
              scale. Job titles mislead, the discipline decides.
            </p>
          </div>
        </section>

        <section className={styles.section} id="grades">
          <div className="container">
            <p className="mono">02 / Talent or promise</p>
            <MaskedHeading as="h2" text="Three years or five. You choose it now." />
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

        <section className={styles.section} id="cost">
          <div className="container">
            <p className="mono">03 / What it costs</p>
            <MaskedHeading as="h2" text="Every figure here comes from the fees table." />
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
            <p className={styles.footnote}>
              April 2026 raised fees across the system. Global Talent was left untouched. Priority
              service (£{FEES.priority}) exists at the visa stage only, endorsement cannot be
              accelerated.
            </p>
          </div>
        </section>

        <section className={styles.section} id="pitfalls">
          <div className="container">
            <p className="mono">04 / Why applications fail</p>
            <MaskedHeading as="h2" text="The refusals are boringly predictable." />
            <div className={styles.pitfalls}>
              {PITFALLS.map((p, i) => (
                <article key={p.title} className={styles.pitfall}>
                  <p className="mono">{String(i + 1).padStart(2, '0')}</p>
                  <h3 className={styles.pitfallTitle}>{p.title}</h3>
                  <p>{p.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.honesty} id="honesty">
          <div className="container">
            <p className="mono">05 / One thing we will not show you</p>
            <MaskedHeading as="h2" text="We have no success rate to quote." />
            <p className={styles.honestyBody}>
              You will see firms advertising a 72% approval rate. It is invented. The Home Office has
              never published how many endorsements are granted or refused, and the report that
              number is traced to does not contain it. What is published covers the visa stage, after
              endorsement, where almost nobody is refused because the hard filter already happened.
              Any firm quoting you a precise figure is quoting arithmetic performed on the wrong two
              numbers.
            </p>
            <Link to="/contact" className={styles.cta} data-cursor>
              Talk to us about your case
            </Link>
            <p className={styles.verified}>
              <span className="mono">Rules and fees verified {LAST_VERIFIED}</span>
            </p>
          </div>
        </section>
      </main>
    </>
  )
}
