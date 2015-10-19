"use strict";
const canvas = document.getElementById('c')
const ctx    = canvas.getContext('2d')

let width  = canvas.width = window.innerWidth
let height = canvas.height = window.innerHeight

let mx;
let my;


function rainbow() {
 return `hsla(${Math.floor(360 * Math.random()) + 1}, 100%, 50%, 1)`
}


const img = new Image()
img.src = 'nat.png'

class Particle {
 constructor(_) {
    this.maxNum = 500

    this.vx = _.vx
    this.vy = _.vy

    this.size = _.size
    this.color = rainbow()
    this.opacity = _.opacity

    this.x = mx || width / 2
    this.y = my || height / 2

    this.particleArr = []
    this.gravity = 0.9

    this.personality = Math.random()
 }
 generate() {
    while (this.maxNum--) {
       let vx = -2 + Math.random() * 8
       let vy = Math.random() * -6

       let size = 5 + Math.random() * 50
       let opacity = 0.5 + Math.random() * 0.5

       let p = new Particle({
          x: this.x,
          y: this.y,
          vx: vx,
          vy: vy,
          size: size,
          color: rainbow,
          opacity: opacity
       })

       this.particleArr.push(p)
    }
 }
 update() {
    this.particleArr.map(_ => {
       if (_.opacity - 0.005 > 0) {
          _.opacity -= 0.005
       } else {
          _.x = mx + (-4 + Math.random() * 4) || width * 0.5 + (-2 + Math.random() * 4)
          _.y = my + (-4 + Math.random() * 4) || height * 0.5 + (-2 + Math.random() * 4)
          _.opacity = 0.5 + Math.random() * 0.5
          _.vx = -2 + Math.random() * 4
          _.vy = -2 + Math.random() * 4
       }

      if(mx < (width / 2)) {
        _.x += (_.vx + this.gravity)
      } else {
        _.x += _.vx
      }

      _.vy += this.gravity
      _.vx += this.gravity

       _.y += _.vy
    })
 }
 render() {
    this.particleArr.map(_ => {
      ctx.beginPath()
      ctx.fillStyle = _.color
      ctx.arc(_.x, _.y, _.size, 0, 2 * Math.PI)
      ctx.fill()
      ctx.stroke()
    })
    this.update()
 }
}

const particles = new Particle({
 vx: -2 + Math.random() * 20,
 vy: -2 + Math.random() * 20,
 size: 2 + Math.random() * 2,
 color: rainbow,
 opacity: -2 + Math.random() * 4
})

particles.generate

(function draw() {
ctx.clearRect(0, 0, width, height)
particles.render()
ctx.drawImage(img, (mx - 180 || (width / 2) - 180),(my - 200 || (height / 2) - 200))

window.requestAnimationFrame(draw)
}());


window.addEventListener('mousemove', e => {
mx = e.pageX
my = e.pageY
})


window.addEventListener('resize', () => {
width  = canvas.width = window.innerWidth;
height = canvas.height = window.innerHeight;
}, false)
