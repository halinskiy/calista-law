import { chromium } from 'playwright'

const OUT = process.env.HOME + '/Desktop/calista-law-screenshots'
const URL = 'http://localhost:5183/calista-law/'

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 })

const errors = []
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
page.on('pageerror', (e) => errors.push(String(e)))

await page.goto(URL, { waitUntil: 'networkidle' })
await page.waitForTimeout(2500)
await page.screenshot({ path: `${OUT}/01-hero.png` })

// Морф ведёт pin-обёртку #routes высотой 280vh. Снимаем ключевые фазы расхождения.
const wrapH = await page.evaluate(() => document.querySelector('#routes').offsetHeight)
const vh = 900
const scrollable = wrapH - vh

for (const [name, r] of [
  ['02-morph-25', 0.28],
  ['03-morph-mid', 0.5],
  ['04-morph-done', 0.9],
]) {
  await page.evaluate((y) => window.scrollTo(0, y), r * scrollable)
  await page.waitForTimeout(1400)
  await page.screenshot({ path: `${OUT}/${name}.png` })
}

for (const [name, sel] of [
  ['05-grades', '#grades'],
  ['06-cost', '#cost'],
  ['07-pitfalls', '#pitfalls'],
  ['08-honesty', '#honesty'],
]) {
  await page.evaluate((s) => document.querySelector(s)?.scrollIntoView({ block: 'center' }), sel)
  await page.waitForTimeout(1000)
  await page.screenshot({ path: `${OUT}/${name}.png` })
}

console.log('errors:', errors.length ? errors.slice(0, 8) : 'none')
await browser.close()
