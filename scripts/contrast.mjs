// WCAG 2.2 contrast checker для пар текст/фон, реально используемых на сайте.
const lin = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4 }
const L = (hex) => { const n = parseInt(hex.slice(1), 16); const r = (n>>16)&255, g=(n>>8)&255, b=n&255; return 0.2126*lin(r)+0.7152*lin(g)+0.0722*lin(b) }
const ratio = (a, b) => { const la = L(a), lb = L(b); const hi = Math.max(la, lb), lo = Math.min(la, lb); return (hi + 0.05) / (lo + 0.05) }
const C = { paper:'#ffffff', ink:'#0d0d0d', body:'#333333', muted:'#6a6a6a', brand:'#1d2bd4' }
const pairs = [
  ['ink text on white', C.ink, C.paper, 'body/headings'],
  ['body text on white', C.body, C.paper, 'paragraphs'],
  ['muted on white', C.muted, C.paper, 'eyebrow/secondary'],
  ['brand blue on white', C.brand, C.paper, 'links, stat numbers, wordmark'],
  ['white on ink', C.paper, C.ink, 'dark buttons, footer'],
  ['white on brand', C.paper, C.brand, 'badge only (short UI)'],
]
const verdict = (r) => r >= 7 ? 'AAA' : r >= 4.5 ? 'AA' : r >= 3 ? 'AA-large only' : 'FAIL'
console.log('WCAG 2.2 contrast (normal text needs 4.5:1 AA, 7:1 AAA):\n')
for (const [name, fg, bg, use] of pairs) {
  const r = ratio(fg, bg)
  console.log(`${r.toFixed(2).padStart(6)}:1  ${verdict(r).padEnd(14)} ${name}  — ${use}`)
}
