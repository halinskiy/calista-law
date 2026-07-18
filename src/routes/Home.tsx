import { lazy, Suspense, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import MaskedHeading from '../components/MaskedHeading'
import Cursor from '../components/Cursor'
import RouteMorph from '../components/RouteMorph'
import Footer from '../components/Footer'
import { FEES, GRADES, PITFALLS, LAST_VERIFIED } from '../content/visa'
import styles from './Home.module.css'

// Единственное место во всём приложении, где грузится three.js.
const AtmosphereScene = lazy(() => import('../scenes/AtmosphereScene'))

export default function Home() {
  const pointer = useRef({ x: 0, y: 0 })
  const webglOff = useRef(
    typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce), (max-width: 812px)').matches,
  )

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  return (
    <>
      <Cursor />
      {!webglOff.current && (
        <Suspense fallback={null}>
          <AtmosphereScene pointer={pointer} />
        </Suspense>
      )}

      <main className={styles.main}>
        <RouteMorph />

        <section className={styles.section} id="trap">
          <div className="container">
            <p className={styles.trap}>
              The trap most designers hit: a product designer working on software belongs with Tech
              Nation, even though product design is listed on the design pathway. There it means
              physical objects made at scale. Job titles mislead. The discipline decides, and sending
              your case to the wrong body costs £{FEES.endorsement} and gets no decision at all.
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

        <section className={styles.honesty} id="honesty" data-nav-theme="dark">
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
      <Footer />
    </>
  )
}
