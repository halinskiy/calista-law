/**
 * Ядро движения. Весь сайт анимирует ЧИСЛА, а не DOM напрямую:
 * скаляр 0..1 считается здесь, а потом разливается в transform или в юниформы шейдера.
 * Один протокол на DOM и на WebGL — иначе они разъезжаются на стыках.
 */

export const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v))

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t

/**
 * Главный примитив: обратный lerp с клампом, затем easing, затем lerp в выход.
 * fit(scrollRatio, 0, 1, 100, 0, easeOut) читается как «пока ratio идёт 0→1, гони 100→0».
 */
export function fit(
  v: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
  ease?: (t: number) => number,
) {
  if (inMax === inMin) return outMin
  let t = clamp((v - inMin) / (inMax - inMin))
  if (ease) t = ease(t)
  return lerp(outMin, outMax, t)
}

/** Кадронезависимое сглаживание. Наивный lerp(a,b,0.1) привязан к частоте кадров и на 120Гц едет вдвое быстрее. */
export const damp = (current: number, target: number, lambda: number, dt: number) =>
  lerp(current, target, 1 - Math.exp(-lambda * dt))

/* Easings. Держим короткий набор: разнобой кривых читается как разные руки в одном интерфейсе. */
export const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))
export const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
export const easeOutBack = (t: number) => 1 + 2.7 * Math.pow(t - 1, 3) + 1.7 * Math.pow(t - 1, 2)

/**
 * Пружина второго порядка (масса-пружина-демпфер), она же модель t3ssel8r.
 * f — частота (скорость реакции), z — затухание (z<1 даёт перелёт и «вес», z=1 без овершута),
 * r — отклик (r>1 = антиципация, объект стартует раньше цели).
 * Держим velocity в состоянии, поэтому движение имеет инерцию, а не догоняет по прямой.
 */
export class Spring {
  private y: number
  private yd = 0
  private xp: number
  private k1: number
  private k2: number
  private k3: number

  constructor(f: number, z: number, r: number, x0 = 0) {
    this.k1 = z / (Math.PI * f)
    this.k2 = 1 / ((2 * Math.PI * f) * (2 * Math.PI * f))
    this.k3 = (r * z) / (2 * Math.PI * f)
    this.xp = x0
    this.y = x0
  }

  update(dt: number, x: number) {
    if (dt <= 0) return this.y
    const xd = (x - this.xp) / dt
    this.xp = x
    // k2 снизу ограничиваем, иначе при большом dt (вкладка была свёрнута) система взрывается.
    const k2 = Math.max(this.k2, (dt * dt) / 2 + (dt * this.k1) / 2, dt * this.k1)
    this.y += dt * this.yd
    this.yd += (dt * (x + this.k3 * xd - this.y - this.k1 * this.yd)) / k2
    return this.y
  }

  get value() {
    return this.y
  }
}
