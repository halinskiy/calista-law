import { chromium } from 'playwright'

const OUT = process.env.HOME + '/Desktop/calista-law-screenshots'
const BASE = 'http://localhost:5183/calista-law/'

const browser = await chromium.launch()
const errors = []

// ── Десктоп: морф без 3D, короче ──
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 })
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
page.on('pageerror', (e) => errors.push(String(e)))

await page.goto(BASE, { waitUntil: 'networkidle' })
await page.waitForTimeout(1500)
await page.screenshot({ path: `${OUT}/d-01-hero.png` })

const wrapH = await page.evaluate(() => document.querySelector('#routes').offsetHeight)
const scrollable = wrapH - 900
for (const [name, r] of [['d-02-mid', 0.5], ['d-03-done', 0.92]]) {
  await page.evaluate((y) => window.scrollTo(0, y), r * scrollable)
  await page.waitForTimeout(900)
  await page.screenshot({ path: `${OUT}/${name}.png` })
}
await page.close()

// ── Мобилка ──
const m = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true })
m.on('pageerror', (e) => errors.push(String(e)))
await m.goto(BASE, { waitUntil: 'networkidle' })
await m.waitForTimeout(1200)
await m.evaluate(() => document.querySelector('#routes')?.scrollIntoView())
await m.waitForTimeout(600)
await m.screenshot({ path: `${OUT}/m-routes.png` })

console.log('errors:', errors.length ? errors.slice(0, 8) : 'none')
await browser.close()
