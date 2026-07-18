import { chromium } from 'playwright'

const OUT = process.env.HOME + '/Desktop/calista-law-screenshots'
const BASE = 'http://localhost:5183/calista-law/'

const browser = await chromium.launch()
// iPhone-класс: 390×844, dpr 3.
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3 })

const errors = []
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
page.on('pageerror', (e) => errors.push(String(e)))

// Главная: морф на мобиле вырождается в стек из двух карт (fallback).
await page.goto(BASE, { waitUntil: 'networkidle' })
await page.waitForTimeout(1500)
await page.screenshot({ path: `${OUT}/m-01-hero.png`, fullPage: false })
await page.evaluate(() => document.querySelector('#routes')?.scrollIntoView())
await page.waitForTimeout(800)
await page.screenshot({ path: `${OUT}/m-02-routes.png` })
// Открытое бургер-меню
await page.evaluate(() => window.scrollTo(0, 0))
await page.waitForTimeout(400)
await page.click('button[aria-label="Open menu"]')
await page.waitForTimeout(500)
await page.screenshot({ path: `${OUT}/m-05-menu.png` })

for (const [name, path] of [
  ['m-03-global', 'global-talent-visa'],
  ['m-04-contact', 'contact'],
]) {
  await page.goto(BASE + path, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1000)
  await page.screenshot({ path: `${OUT}/${name}.png` })
}

console.log('errors:', errors.length ? errors.slice(0, 8) : 'none')
await browser.close()
