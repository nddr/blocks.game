import kaplay from 'kaplay'
import { loadMap } from './map.js'
import './socket.js'
import './style.css'

export const k = kaplay({
  width: 512,
  height: 512,
  canvas: document.querySelector('canvas'),
  global: false,
})

const TICK_RATE = 15
const MOVE_SPEED = 30
let currentFlip = false
let currentSprite = 'idle'
const players = {}

k.setBackground('#211f30')

loadMap()

k.loadSprite('heroIdle', 'sprites/base_idle_strip9.png', {
  sliceX: 9,
  anims: {
    idle: { from: 0, to: 8, time: 0.1, loop: true },
  },
})

k.loadSprite('heroHairIdle', 'sprites/shorthair_idle_strip9.png', {
  sliceX: 9,
  anims: {
    idle: { from: 0, to: 8, time: 0.1, loop: true },
  },
})

k.loadSprite('heroWalk', 'sprites/base_walk_strip8.png', {
  sliceX: 8,
  anims: {
    walking: { from: 0, to: 7, time: 0.1, loop: true },
  },
})

const hero = k.add([
  k.sprite('heroIdle'),
  k.pos(10, 50),
  k.area({ scale: 0.15, offset: k.vec2(42, 28) }),
  k.body(),
])

const heroHair = hero.add([k.sprite('heroHairIdle')])

hero.play('idle')
heroHair.play('idle')

k.onKeyDown('left', () => {
  hero.flipX = true
  heroHair.flipX = true
  currentFlip = true

  hero.move(-MOVE_SPEED, 0)
})

k.onKeyDown('right', () => {
  hero.flipX = false
  heroHair.flipX = false
  currentFlip = false

  hero.move(MOVE_SPEED, 0)
})

k.onKeyDown('up', () => {
  hero.move(0, -MOVE_SPEED)
})

k.onKeyDown('down', () => {
  hero.move(0, MOVE_SPEED)
})

k.onKeyPress('left', () => {
  hero.use(k.sprite('heroWalk'))
  hero.play('walking')
  currentSprite = 'walk'
})

k.onKeyPress('right', () => {
  hero.use(k.sprite('heroWalk'))
  hero.play('walking')
  currentSprite = 'walk'
})

k.onKeyRelease('left', () => {
  hero.use(k.sprite('heroIdle'))
  heroHair.use(k.sprite('heroHairIdle'))
  hero.play('idle')
  heroHair.play('idle')
  currentSprite = 'idle'

  hero.flipX = true
  heroHair.flipX = true
  currentFlip = true
})

k.onKeyRelease('right', () => {
  hero.use(k.sprite('heroIdle'))
  heroHair.use(k.sprite('heroHairIdle'))
  hero.play('idle')
  heroHair.play('idle')
  currentSprite = 'idle'

  hero.flipX = false
  heroHair.flipX = false
  currentFlip = false
})

setInterval(() => {
  // socket.emit('client:match:update', {
  //   matchId,
  //   x: hero.pos.x.toFixed(0),
  //   y: hero.pos.y.toFixed(0),
  //   sprite: currentSprite,
  //   anim: hero.curAnim(),
  //   flip: hero.flipX,
  //   username: players[socket.id].username,
  // })
}, TICK_RATE)
