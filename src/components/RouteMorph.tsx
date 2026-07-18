import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { clamp, fit } from '../lib/motion'
import { ROUTES } from '../content/visa'
import styles from './RouteMorph.module.css'

/**
 * Единый блок «Designers», который на скролле расходится на две карточки эндорсеров.
 *
 * Морф ведёт DOM, не сцена: текст всегда чёткий и читаемый. Приём в том, что старт это не
 * облако и не две сдвинутые карточки, а ОДНА цельная плита. Две половины лежат вплотную,
 * их общий шов перекрыт слоем «Designers», а внутренние углы скруглены на 0 — поэтому
 * граница между ними не видна. На скролле слой гаснет, половины расходятся, внутренние углы
 * доезжают до полного радиуса, и из одной плиты получаются две карточки.
 */
export default function RouteMorph() {
  const wrap = useRef<HTMLDivElement>(null)
  const morph = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let raf = 0
    // Ниже этой ширины морфа нет: карты стоят раскрытым стеком, --r держит CSS-media.
    // Порог совпадает с media-правилом в RouteMorph.module.css и с webglOff в Home.
    const mobile = window.matchMedia('(max-width: 812px)')

    // r считается заново каждый кадр из геометрии pin-обёртки, без накопления:
    // прыжок по якорю или reload с хэшем не должен оставить морф в промежуточной позе.
    const tick = () => {
      const el = wrap.current
      const m = morph.current
      if (el && m) {
        if (mobile.matches) {
          // На мобиле НЕ трогаем --r: инлайн-стиль перебил бы media-правило (--r:1) и оставил
          // пустой блок. Высота стека всё равно > экрана, поэтому по scrollable мобилку не поймать.
          m.style.removeProperty('--r')
        } else {
          const rect = el.getBoundingClientRect()
          const scrollable = rect.height - window.innerHeight
          const r = scrollable > 0 ? clamp(-rect.top / scrollable) : 0
          // Пауза в начале и в конце: блок стоит собранным, расходится, стоит разошедшимся.
          m.style.setProperty('--r', String(fit(r, 0.12, 0.78, 0, 1)))
        }
      }
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <section ref={wrap} className={styles.wrap} id="routes">
      <div className={styles.viewport}>
        <div className={styles.head}>
          <p className="mono">UK Global Talent Visa</p>
          <h2 className={styles.title}>One visa. Two endorsing bodies.</h2>
        </div>

        <div ref={morph} className={styles.morph}>
          {/* Общий слой: виден, пока блок собран, перекрывает шов между половинами. */}
          <div className={styles.unified}>
            <p className="mono">One profession, two doors</p>
            <p className={styles.unifiedWord}>Designers</p>
            <p className={styles.unifiedLead}>Scroll, and the block splits the way your case will.</p>
          </div>

          {ROUTES.map((route, i) => (
            <article key={route.id} className={styles.half} data-side={i === 0 ? 'left' : 'right'}>
              <div className={styles.halfInner}>
                <p className="mono">
                  {route.kicker}
                  {route.isNew && <span className={styles.badge}>New</span>}
                </p>
                <h3 className={styles.halfTitle}>{route.title}</h3>
                <p className={styles.endorser}>{route.endorserFull}</p>
                <ul className={styles.list}>
                  {route.disciplines.slice(0, 5).map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
                <p className={styles.excluded}>Not here: {route.excluded.slice(0, 3).join(', ')}.</p>
                <div className={styles.meta}>
                  <span className="mono">{route.evidencePages} sides A4 / doc</span>
                  <span className="mono">{route.weeks}</span>
                </div>
                <Link to="/global-talent-visa" className={styles.halfLink} data-cursor>
                  Read the {route.endorser} route
                </Link>
              </div>
            </article>
          ))}
        </div>

        <p className={styles.hint}>
          <span className="mono">Scroll</span>
        </p>
      </div>
    </section>
  )
}
