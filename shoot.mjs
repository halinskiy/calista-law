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

// Скролл-скраб развилки: ratio считается по блоку карточек, целимся в него же.
const routesTop = await page.evaluate(() => {
  const el = document.querySelector('#routes article')?.parentElement
  return el ? el.getBoundingClientRect().top + window.scrollY : 0
})
const vh = 900

for (const [name, ratio] of [['02-split-mid', 0.5], ['03-split-settled', 1.0]]) {
  // ratio = fit(top, vh*0.85, vh*0.15) → top = vh*0.85 - ratio*(vh*0.7)
  const targetTop = vh * 0.85 - ratio * (vh * 0.7)
  await page.evaluate((y) => window.scrollTo(0, y), routesTop - targetTop)
  await page.waitForTimeout(2000)
  await page.screenshot({ path: `${OUT}/${name}.png` })
}

for (const [name, sel] of [['04-grades', '#grades'], ['05-cost', '#cost'], ['06-pitfalls', '#pitfalls'], ['07-honesty', '#honesty']]) {
  await page.evaluate((s) => document.querySelector(s)?.scrollIntoView({ block: 'center' }), sel)
  await page.waitForTimeout(1200)
  await page.screenshot({ path: `${OUT}/${name}.png` })
}

console.log('errors:', errors.length ? errors.slice(0, 8) : 'none')
await browser.close()
