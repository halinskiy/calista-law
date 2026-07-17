import * as THREE from 'three'

/**
 * Камера, у которой плоскость z=0 меряется в пикселях экрана.
 *
 * Зачем: сюжет требует, чтобы частицы садились ровно в прямоугольники карточек, которые верстает DOM.
 * Если мир живёт в абстрактных юнитах, каждый rect надо конвертировать вручную и всё равно разъезжается
 * на ресайзе. Здесь fov подобран так, что на z=0 один юнит равен одному пикселю: rect можно брать
 * из getBoundingClientRect и класть в сцену как есть. Частицы с z != 0 при этом честно получают перспективу.
 */
export const CAMERA_DISTANCE = 1200

export function fovForViewport(height: number, distance = CAMERA_DISTANCE) {
  return 2 * Math.atan(height / 2 / distance) * (180 / Math.PI)
}

export function syncCameraToViewport(
  camera: THREE.PerspectiveCamera,
  width: number,
  height: number,
) {
  camera.fov = fovForViewport(height)
  camera.aspect = width / height
  camera.position.set(0, 0, CAMERA_DISTANCE)
  camera.near = 1
  camera.far = CAMERA_DISTANCE * 3
  camera.updateProjectionMatrix()
}

/**
 * DOM-прямоугольник в координаты сцены. Начало координат DOM в левом верхнем углу и Y растёт вниз,
 * у three начало в центре и Y растёт вверх.
 */
export function rectToWorld(rect: DOMRect, width: number, height: number) {
  return {
    x: rect.left + rect.width / 2 - width / 2,
    y: height / 2 - (rect.top + rect.height / 2),
    w: rect.width,
    h: rect.height,
  }
}
