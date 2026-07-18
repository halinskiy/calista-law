import { chromium } from 'playwright'

const OUT = process.env.HOME + '/Desktop/calista-law-screenshots'
const BASE = 'http://localhost:5183/calista-law/'

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 })

const errors = []
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
page.on('pageerror', (e) => errors.push(String(e)))

const pages = [
  ['inner-global', 'global-talent-visa'],
  ['inner-process', 'process'],
  ['inner-pricing', 'pricing'],
  ['inner-about', 'about'],
  ['inner-contact', 'contact'],
]

for (const [name, path] of pages) {
  await page.goto(BASE + path, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1200)
  await page.screenshot({ path: `${OUT}/${name}.png` })
}

console.log('errors:', errors.length ? errors.slice(0, 8) : 'none')
await browser.close()
