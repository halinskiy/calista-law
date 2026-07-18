import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import MaskedHeading from '../components/MaskedHeading'
import Footer from '../components/Footer'
import inner from '../styles/inner.module.css'

export default function About() {
  return (
    <>
      <PageHero
        index="04 / Who we are"
        eyebrow="About"
        title="A practice that does one thing."
        lead="Calista Law works on the Global Talent visa for designers, and nothing else. Not sponsorship, not skilled worker routes, not ten visa types advertised at once. One route, done properly."
      />

      <div className={inner.page}>
        <section className={inner.section}>
          <div className="container">
            <div className={inner.sectionHead}>
              <p className="mono">Why so narrow</p>
              <MaskedHeading as="h2" className={inner.h2} text="Because the detail is where cases are won." />
            </div>
            <div className={inner.prose}>
              <p>
                The difference between an endorsement and a refusal is rarely the strength of your
                work. It is whether the evidence was sent to the right body, in the right format,
                proving the right person did it. That detail is a full-time subject on its own.
              </p>
              <p>
                A firm that handles every visa type keeps a shallow map of each. We keep a deep one of
                a single route, and it changes often. When the Home Office added the design pathway on
                1 July 2026, that was our whole world moving, not a footnote in a newsletter.
              </p>
            </div>
          </div>
        </section>

        <section className={inner.section}>
          <div className="container">
            <div className={inner.sectionHead}>
              <p className="mono">Where we differ</p>
              <MaskedHeading as="h2" className={inner.h2} text="We will not quote you a success rate." />
            </div>
            <div className={inner.prose}>
              <p>
                Other firms advertise a 72% approval rate. It is invented. The Home Office has never
                published how many endorsements are granted or refused, and the report that number is
                traced to does not contain it. Any firm quoting a precise figure is quoting arithmetic
                performed on the wrong two numbers.
              </p>
              <p>
                We would rather tell you honestly whether your record is ready, and say no when it is
                not, than sell you a percentage nobody can stand behind.
              </p>
            </div>
          </div>
        </section>

        <section className={inner.section}>
          <div className="container">
            <MaskedHeading as="h2" className={inner.h2} text="Start with your discipline." />
            <p className={inner.lead}>
              Tell us what you actually do, and we will tell you which door is yours before anything
              else happens.
            </p>
            <Link to="/contact" className={inner.cta} data-cursor>
              Talk to us
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
