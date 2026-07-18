import { chromium } from 'playwright'
const OUT = process.env.HOME + '/Desktop/calista-law-screenshots/premium'
const SITES = [
  ['linear', 'https://linear.app/'],
  ['stripe', 'https://stripe.com/'],
  ['vercel', 'https://vercel.com/'],
  ['cuberto', 'https://cuberto.com/'],
  ['basement', 'https://basement.studio/'],
  ['locomotive', 'https://locomotive.ca/en'],
  ['exoape', 'https://www.exoape.com/'],
  ['monopo', 'https://monopo.london/'],
  ['family', 'https://family.co/'],
  ['igloo', 'https://www.igloo.inc/'],
  ['unseen', 'https://unseen.co/'],
  ['studiofreight', 'https://www.studiofreight.com/'],
]
const browser = await chromium.launch()
for (const [name, url] of SITES) {
  const p = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1.5 })
  try {
    await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 25000 })
    await p.waitForTimeout(3500)
    for (const t of ['Accept all', 'Accept', 'I agree', 'Agree', 'Allow all', 'Got it', 'OK', 'Continue']) {
      const btn = p.locator(`button:has-text("${t}"), a:has-text("${t}")`).first()
      if (await btn.count().catch(() => 0)) { await btn.click({ timeout: 1500 }).catch(() => {}); break }
    }
    await p.waitForTimeout(1500)
    await p.screenshot({ path: `${OUT}/${name}.png` })
    console.log('ok', name)
  } catch (e) { console.log('FAIL', name, String(e).slice(0, 50)) }
  await p.close()
}
await browser.close()
