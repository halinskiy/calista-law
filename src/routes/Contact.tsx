import { useState } from 'react'
import PageHero from '../components/PageHero'
import Footer from '../components/Footer'
import inner from '../styles/inner.module.css'
import styles from './Contact.module.css'

const DISCIPLINES = [
  { value: 'design', label: 'Graphic, brand, product, industrial, service' },
  { value: 'digital', label: 'UX, UI, product design for software' },
  { value: 'unsure', label: 'Not sure which one I am' },
]

export default function Contact() {
  const [sent, setSent] = useState(false)

  return (
    <>
      <PageHero
        index="05 / Get in touch"
        eyebrow="Contact"
        title="Tell us what you do."
        lead="The first thing we work out is your route, and that starts with your discipline. Say what you actually do day to day, and we will point you at the right door before anything is charged."
      />

      <div className={inner.page}>
        <section className={inner.section}>
          <div className="container">
            <div className={styles.grid}>
              <div className={styles.formWrap}>
                {sent ? (
                  <div className={styles.done}>
                    <p className="mono">Received</p>
                    <h2 className={styles.doneTitle}>Thanks. We will read it properly and reply.</h2>
                    <p className={styles.doneNote}>
                      This is a concept site, so the form does not actually send. On the real thing
                      you would hear back within two working days.
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
                    <label className={styles.field}>
                      <span className="mono">Your name</span>
                      <input type="text" name="name" required autoComplete="name" />
                    </label>
                    <label className={styles.field}>
                      <span className="mono">Email</span>
                      <input type="email" name="email" required autoComplete="email" />
                    </label>

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

                    <button type="submit" className={styles.submit} data-cursor>
                      Send
                    </button>
                  </form>
                )}
              </div>

              <aside className={styles.aside}>
                <p className="mono">Before you write</p>
                <ul className={styles.checklist}>
                  <li>What you do day to day, in plain words, not your job title.</li>
                  <li>Where your work has been seen, published or exhibited, and in which countries.</li>
                  <li>Any awards, features or talks, whether you won or were shortlisted.</li>
                  <li>Whether you are early in your career or already established.</li>
                </ul>
                <p className={styles.asideNote}>
                  None of this has to be polished. It is enough for us to tell you which endorsing
                  body should see your case.
                </p>
              </aside>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
