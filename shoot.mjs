import { chromium } from 'playwright'

const OUT = process.env.HOME + '/Desktop/calista-law-screenshots'
const BASE = 'http://localhost:5183/calista-law/'

const browser = await chromium.launch()
const errors = []

const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 })
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
page.on('pageerror', (e) => errors.push(String(e)))

await page.goto(BASE, { waitUntil: 'networkidle' })
await page.waitForTimeout(1500)
await page.screenshot({ path: `${OUT}/c-01-hero.png` }) // rail = intro

// Проскроллить в контент → rail морфится в TOC, счётчик растёт
for (const [name, sel] of [
  ['c-02-routes', '#routes'],
  ['c-03-pricing', '#pricing'],
  ['c-04-faq', '#faq'],
]) {
  await page.evaluate((s) => {
    const el = document.querySelector(s)
    window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 130)
  }, sel)
  await page.waitForTimeout(1100)
  await page.screenshot({ path: `${OUT}/${name}.png` })
}

// Полная страница
await page.evaluate(() => window.scrollTo(0, 0))
await page.waitForTimeout(400)
await page.screenshot({ path: `${OUT}/c-05-full.png`, fullPage: true })
await page.close()

// Мобилка
const m = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true })
m.on('pageerror', (e) => errors.push(String(e)))
await m.goto(BASE, { waitUntil: 'networkidle' })
await m.waitForTimeout(1200)
await m.screenshot({ path: `${OUT}/c-m-hero.png` })

console.log('errors:', errors.length ? errors.slice(0, 8) : 'none')
await browser.close()
