import { Link } from 'react-router-dom'
import RouteMorph from '../components/RouteMorph'
import Reveal from '../components/Reveal'
import Footer from '../components/Footer'
import { FEES, GRADES, PITFALLS, LAST_VERIFIED } from '../content/visa'
import styles from './Home.module.css'

export default function Home() {
  return (
    <>
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
            <h2 className={styles.h2}>Three years or five. You choose it now.</h2>
            <div className={styles.grades}>
              {GRADES.map((g, i) => (
                <Reveal as="article" key={g.id} className={styles.grade} delay={i * 80}>
                  <p className={styles.gradeYears}>
                    {g.ilrYears}
                    <span className="mono"> years to settlement</span>
                  </p>
                  <h3 className={styles.gradeTitle}>{g.title}</h3>
                  <p>{g.who}</p>
                  <p className={styles.gradeCountries}>{g.countries}</p>
                  <p className={styles.gradeNote}>{g.note}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section} id="cost">
          <div className="container">
            <p className="mono">03 / What it costs</p>
            <h2 className={styles.h2}>Every figure here comes from the fees table.</h2>
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
            <h2 className={styles.h2}>The refusals are boringly predictable.</h2>
            <div className={styles.pitfalls}>
              {PITFALLS.map((p, i) => (
                <Reveal as="article" key={p.title} className={styles.pitfall} delay={(i % 3) * 80}>
                  <p className="mono">{String(i + 1).padStart(2, '0')}</p>
                  <h3 className={styles.pitfallTitle}>{p.title}</h3>
                  <p>{p.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.honesty} id="honesty">
          <div className="container">
            <p className="mono">05 / One thing we will not show you</p>
            <h2 className={styles.honestyH2}>We have no success rate to quote.</h2>
            <p className={styles.honestyBody}>
              You will see firms advertising a 72% approval rate. It is invented. The Home Office has
              never published how many endorsements are granted or refused, and the report that
              number is traced to does not contain it. What is published covers the visa stage, after
              endorsement, where almost nobody is refused because the hard filter already happened.
              Any firm quoting you a precise figure is quoting arithmetic performed on the wrong two
              numbers.
            </p>
            <Link to="/contact" className={styles.cta}>
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
