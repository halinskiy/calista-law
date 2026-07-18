import { Link } from 'react-router-dom'
import MaskedHeading from './MaskedHeading'
import styles from './PageHero.module.css'

type Props = {
  index: string
  eyebrow: string
  title: string
  lead: string
}

/**
 * Хиро внутренних страниц. Никакого WebGL: это страницы для чтения, они должны грузиться
 * мгновенно. Язык тот же, что на главной — моно-индекс, заголовок из-под маски, воздух.
 */
export default function PageHero({ index, eyebrow, title, lead }: Props) {
  return (
    <header className={styles.hero}>
      <div className="container">
        <p className={styles.crumbs}>
          <Link to="/" data-cursor>
            Calista Law
          </Link>
          <span aria-hidden="true"> / </span>
          <span className="mono">{eyebrow}</span>
        </p>
        <p className={styles.index}>
          <span className="mono">{index}</span>
        </p>
        <MaskedHeading as="h1" className={styles.title} text={title} />
        <p className={styles.lead}>{lead}</p>
      </div>
    </header>
  )
}
