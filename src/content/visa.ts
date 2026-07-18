/**
 * Единственный источник фактов по маршруту. Цифры и правила сидят здесь, а не в вёрстке:
 * пошлины меняются раз в год, и тогда правка должна быть в одном месте, а не в шести секциях.
 *
 * Всё ниже сверено по первоисточникам (июль 2026):
 * - Statement of Changes HC 1691 (раздел APP GT1, в силе с 01.07.2026)
 * - Caseworker guidance "Global Talent" v18.0 (01.07.2026)
 * - Официальная таблица пошлин Home Office (Fees Table, 8 April 2026)
 * Ничего не додумывать: если факта нет в источнике, его нет и здесь.
 */

export const LAST_VERIFIED = '17 July 2026'

export type RouteId = 'design' | 'digital'

export type Route = {
  id: RouteId
  endorser: string
  endorserFull: string
  kicker: string
  title: string
  summary: string
  disciplines: string[]
  excluded: string[]
  evidencePages: number
  weeks: string
  isNew: boolean
}

export const ROUTES: Route[] = [
  {
    id: 'design',
    endorser: 'DBA',
    endorserFull: 'Design Business Association, endorsing on behalf of Arts Council England',
    kicker: 'Opened 1 July 2026',
    title: 'Design Industry',
    summary:
      'The pathway the Home Office added to Appendix Global Talent this month. It exists to cover design work that had no route of its own until now.',
    disciplines: [
      'Graphic and brand design',
      'Motion graphics (outside film and TV)',
      'Product and industrial design',
      'Furniture design',
      'Commercial interior design',
      'Service design (non-digital)',
      'Policy, strategic and systemic design',
      'Design foresight and futures',
    ],
    excluded: ['Digital design', 'UX and UI design', 'Games and VFX', 'Fashion', 'Architecture'],
    evidencePages: 2,
    weeks: '8 weeks',
    isNew: true,
  },
  {
    id: 'digital',
    endorser: 'Tech Nation',
    endorserFull: 'Tech Nation, endorsing body for digital technology',
    kicker: 'Unchanged by the July reform',
    title: 'Digital Technology',
    summary:
      'Where experienced UX and UI designers have always belonged, and still do. Nothing about this route changed on 1 July 2026, whatever else you have read.',
    disciplines: [
      'UX and UI design',
      'Product design for software',
      'Design systems and design engineering',
      'Digital service design',
    ],
    excluded: ['Graphic and brand design', 'Industrial and furniture design'],
    evidencePages: 3,
    weeks: '5 to 8 weeks',
    isNew: false,
  },
]

/** Пошлины из официальной таблицы. Global Talent апрельское повышение 2026 не затронуло. */
export const FEES = {
  endorsement: 561,
  visa: 205,
  get total() {
    return this.endorsement + this.visa
  },
  ihsPerYear: 1035,
  ihsChildPerYear: 776,
  /** Ориентир на одного взрослого на пять лет. Без priority, биометрии и переводов. */
  get fiveYearAdult() {
    return this.total + this.ihsPerYear * 5
  },
  priority: 500,
  superPriority: 1000,
}

export const TIMELINE = {
  endorsementDesign: '8 weeks',
  endorsementTech: '5 to 8 weeks',
  visaOutsideUK: '3 weeks',
  visaInsideUK: '8 weeks',
  reviewWindow: '28 calendar days',
}

export type Grade = {
  id: 'talent' | 'promise'
  title: string
  who: string
  ilrYears: number
  countries: string
  note: string
}

export const GRADES: Grade[] = [
  {
    id: 'talent',
    title: 'Exceptional Talent',
    who: 'Already recognised as a leader in your field.',
    ilrYears: 3,
    countries: 'Substantial track record in at least two countries',
    note: 'Settlement three years sooner. If your record supports Talent, applying under Promise costs you two years of your life.',
  },
  {
    id: 'promise',
    title: 'Exceptional Promise',
    who: 'Early in your career, with a record that is clearly developing.',
    ilrYears: 5,
    countries: 'A developing record in one country or more',
    note: 'A shortlist or nomination counts here. It does not have to be a win.',
  },
]

/** Возражения, которые снимают до первого письма. Формулировки наши, факты из guidance. */
export const FACTS = [
  {
    q: 'Do I need a job offer?',
    a: 'No. You can arrive without one, be employed, self-employed and a company director at the same time, and change or leave a job without telling the Home Office.',
  },
  {
    q: 'Can I freelance?',
    a: 'Yes. The only obligation is that by the time you extend or settle, you have earned money in the UK in your field. Invoices do that job.',
  },
  {
    q: 'How long is the visa?',
    a: 'You choose, from one to five years, and pay the health surcharge for the span you pick. Extensions are unlimited.',
  },
  {
    q: 'Is there an appeal if I am refused?',
    a: 'No appeal. There is an endorsement review within 28 days, and it only checks whether the process was followed. You cannot add new evidence to it.',
  },
]

/** Как мы ведём кейс. Шаги отражают реальный порядок работы по маршруту. */
export const PROCESS = [
  {
    title: 'Placement',
    body: 'Before anything else we settle which body should endorse you, DBA or Tech Nation. This is the single fork most applicants get wrong, and getting it wrong wastes the endorsement fee with no decision.',
  },
  {
    title: 'Evidence audit',
    body: 'We map what you already have against the criteria and, more usefully, against what is missing. A designer with a strong portfolio can still fail on the evidence the guidance actually asks for.',
  },
  {
    title: 'Building the pack',
    body: 'We assemble your evidence into the exact form the Home Office accepts: scans with visible hyperlinks, not URLs, inside the page limit for your route. Two sides of A4 for design, three for Tech Nation.',
  },
  {
    title: 'Letters',
    body: 'Three recommendation letters from the right people, from organisations that know your work, at least one in the UK. Not your manager, not a colleague, not a friend. Templated letters can be treated as fraud, so every one is written from scratch.',
  },
  {
    title: 'Endorsement',
    body: 'We submit and wait out the endorsement window. Nothing accelerates this stage, so the pack has to be right the first time.',
  },
  {
    title: 'Visa and settlement',
    body: 'Once endorsed, the visa stage is quick and rarely refused. We set your visa length, then keep your file ready for settlement, three years on Exceptional Talent, five on Promise.',
  },
]

/** Наши услуги. Точные суммы гонораров не выдумываем — показываем структуру и государственные пошлины. */
export const SERVICES = [
  {
    name: 'Placement call',
    price: 'Fixed fee',
    body: 'One focused conversation to establish your route and whether you are closer to Talent or Promise. If your case is not ready, we say so here, not after you have paid for a full application.',
  },
  {
    name: 'Managed application',
    price: 'Quoted upfront',
    body: 'End to end. Placement, evidence audit, the full pack, all three letters, submission and the visa stage. One fixed fee agreed before we start, never hourly.',
  },
  {
    name: 'Pack review',
    price: 'Fixed fee',
    body: 'You have built your own application and want a second read before you submit. We check it against the criteria and the format rules and tell you where it would fail.',
  },
]

/** Реальные причины провала. Каждая взята из официальных гайдов, не из фольклора. */
export const PITFALLS = [
  {
    title: 'Links are not evidence',
    body: 'The Home Office does not accept web links or digital files. A Behance or Figma URL is a discarded document. What counts is a scan of the page with the hyperlink visible on it.',
  },
  {
    title: 'Letters alone never carry a criterion',
    body: 'The guidance repeats this against five separate criteria. Letters corroborate evidence, they do not replace it. And letters from your manager, a close colleague or a friend do not count at all.',
  },
  {
    title: 'The work has to be yours',
    body: 'Evidence that proves your company shipped something proves nothing about you. This is where designers lose most often: the redesign launched, revenue moved, and none of it is attributable to one person.',
  },
  {
    title: 'Agency careers hit a wall',
    body: 'Tech Nation treats consultancies, outsourcers and agencies as outside its remit. A portfolio built entirely in agencies struggles on the mandatory criterion no matter how good the work is.',
  },
  {
    title: 'Two page limit, three page limit',
    body: 'Design evidence is capped at two sides of A4 per document. Tech Nation allows three. A pack assembled for one route physically does not fit the other.',
  },
  {
    title: 'AI-written applications are refused',
    body: 'Using ChatGPT or similar in your application is declared unacceptable, and templated reference letters may be treated as fraudulent. Endorsers do contact referees.',
  },
]
