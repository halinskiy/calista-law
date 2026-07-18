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

// Футер
await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight))
await page.waitForTimeout(1000)
await page.screenshot({ path: `${OUT}/09-footer.png` })

console.log('errors:', errors.length ? errors.slice(0, 8) : 'none')
await browser.close()
