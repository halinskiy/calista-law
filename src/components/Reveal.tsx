import { createElement } from 'react'
import { useInView } from '../lib/use-reveal'
import styles from './Reveal.module.css'

type Props = {
  as?: keyof HTMLElementTagNameMap
  className?: string
  children: React.ReactNode
  /** Небольшая задержка для лёгкого стаггера рядов, в мс. */
  delay?: number
}

/**
 * Одно спокойное движение: элемент всплывает и проявляется, когда входит в кадр.
 * Заменяет прежнюю маску-по-словам — для юридической аудитории сдержаннее и не читается
 * как дизайн-демо. Только opacity и transform, поэтому дёшево и не лагает.
 */
export default function Reveal({ as = 'div', className, children, delay = 0 }: Props) {
  const { ref, inView } = useInView<HTMLElement>('-10%')

  return createElement(
    as,
    {
      ref,
      className: [styles.reveal, inView && styles.in, className].filter(Boolean).join(' '),
      style: delay ? { transitionDelay: `${delay}ms` } : undefined,
    },
    children,
  )
}
