import { k } from './main.js'
import mapData from './map.json'

export function loadMap() {
  k.loadSprite('map', 'sprites/map.png')

  const map = k.add([k.pos(0, 0)])
  k.setCamPos(64, 64)
  k.setCamScale(4)

  map.add([k.sprite('map')])

  for (const layer of mapData.layers) {
    if (layer.type === 'tilelayer')
      continue

    if (layer.name === 'Colliders') {
      for (const object of layer.objects) {
        map.add([
          k.area({ shape: new k.Rect(k.vec2(0), object.width, object.height) }),
          k.body({ isStatic: true }),
          k.pos(object.x, object.y),
        ])
      }
      continue
    }
  }
}
