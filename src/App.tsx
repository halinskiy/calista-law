import { lazy, Suspense, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { initSmoothScroll, getLenis } from './lib/smooth-scroll'

import Header from './components/Header'
import Home from './routes/Home'

/**
 * Информативные страницы читают, а не смотрят: чистый DOM, без three.js в бандле.
 * lazy здесь не про скорость первой отрисовки, а про то, чтобы webgl-чанк
 * физически не попал в граф импортов этих роутов.
 */
const GlobalTalent = lazy(() => import('./routes/GlobalTalent'))
const Process = lazy(() => import('./routes/Process'))
const Pricing = lazy(() => import('./routes/Pricing'))
const About = lazy(() => import('./routes/About'))
const Contact = lazy(() => import('./routes/Contact'))
const NotFound = lazy(() => import('./routes/NotFound'))

function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) return
    getLenis()?.scrollTo(0, { immediate: true })
  }, [pathname, hash])

  return null
}

export default function App() {
  useEffect(() => {
    initSmoothScroll()
  }, [])

  return (
    <>
      <ScrollToTop />
      <Header />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/global-talent-visa" element={<GlobalTalent />} />
          <Route path="/process" element={<Process />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  )
}
