import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import styles from './Accordion.module.css'

type Item = { q: string; a: string }

const EASE = [0.2, 0.8, 0.2, 1] as const

/** Одиночно-раскрывающийся аккордеон, как FAQ у референса. */
export default function Accordion({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className={styles.acc}>
      {items.map((it, i) => {
        const isOpen = open === i
        return (
          <div key={it.q} className={styles.item}>
            <button
              className={styles.head}
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <span className={styles.q}>{it.q}</span>
              <span className={styles.sign} aria-hidden="true" data-open={isOpen} />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  className={styles.body}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.32, ease: EASE }}
                >
                  <p className={styles.a}>{it.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
