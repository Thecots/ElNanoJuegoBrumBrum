import Road from './Road.js'
import F1 from './F1.js'
import Taxi from './Taxi.js'

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 900
canvas.height = 700

/* settings */
let game = true
const setDebugger = false
const roadSrc = document.querySelector('#road')
const road = [
  new Road(roadSrc, canvas.width, canvas.height, 0, -canvas.height),
  new Road(roadSrc, canvas.width, canvas.height, 0, 0),
  new Road(roadSrc, canvas.width, canvas.height, 0, +canvas.height)
]

const maxVelocity = 25
const velocityPower = 0.2
const breakPower = 0.5
const slowDown = 0.2
const directionSpeed = 5
const hitbox = 15
const f1With = 40
const f1Height = 120
const f1Src = document.querySelector('#f1')
let f1Controller = {speed: 0, active: false, break: false, right: false, lef: false}
const f1 = new F1(f1Src, f1With, f1Height, (canvas.width/2-f1With/2), canvas.height-f1Height-20,maxVelocity, velocityPower, slowDown,breakPower,directionSpeed , canvas.width, canvas.height, hitbox)

const taxiSrc = document.querySelector('#taxi')
const taxiPositionsX = [220,350,495,630]
const taxis = []
const taxiSpeed = 4
const taxiWith = 55
const taxiHeight = 120
const Taxihitbox = 10

/* event listteners */
window.addEventListener('keydown', e => {
  let k = e.keyCode 
  /* acelerar */
  if(k == 87 || k == 38) f1Controller.active = true
  /* frenar */
  if(k == 83|| k == 40) f1Controller.break = true
  /* derecha */
  if(k == 68|| k == 39) f1Controller.right = true
  /* izquierda */
  if(k == 65|| k == 37) f1Controller.left = true
})

window.addEventListener('keyup', e => {
  let k = e.keyCode 
  /* acelerar */
  if(k == 87 || k == 38) f1Controller.active = false
  /* frenar */
  if(k == 83|| k == 40) f1Controller.break = false
  /* derecha */
  if(k == 68|| k == 39) f1Controller.right = false
  /* izquierda */
  if(k == 65|| k == 37) f1Controller.left = false
})


function drawTaxis(){
  taxis.forEach((n,i) => {
    if(n.status()){
      n.draw(setDebugger,ctx,f1Controller)
     }else{
      taxis.splice(i,1)
     }
  })
  document.querySelector('#tahora').innerHTML = 'Taxis: '+taxis.length
}


function drawRoad(){
  road.forEach((n,i) => {
    n.draw(ctx, f1Controller.speed, canvas.height, i == 0 ? road[2].y : i == 1 ? road[0].y : road[1].y)
  })
}

function newTaxi(){
  taxis.push(new Taxi(taxiSrc,taxiWith,taxiHeight,taxiPositionsX[Math.round(Math.random()*(taxiPositionsX.length-1))],-taxiHeight,taxiSpeed, canvas.height,Taxihitbox))
}

setInterval(newTaxi,200)

function crashdDetect(){
  taxis.forEach(n => {
    n = n.getHitbox()
    let f = f1.getHitbox()
    if(
      f.top > n.top && f.top < n.bottom && f.left > n.left && f.left < n.right ||
      f.top > n.top && f.top < n.bottom && f.right > n.left && f.right < n.right ||
      f.bottom > n.top && f.bottom < n.bottom && f.left > n.left && f.left < n.right ||
      f.bottom > n.top && f.bottom < n.bottom && f.right > n.left && f.right < n.right
    ){
      game = false
    }
  })
  return false
}

function init(){
  crashdDetect()
  if(game){
    requestAnimationFrame(init)
  }
  ctx.clearRect(0,0,canvas.width, canvas.height)
  drawRoad()
  drawTaxis()
  f1.draw(setDebugger,ctx,f1Controller)
}

init()


/* 

# IDEAS
 · Doble dirección,
 · Que los taxis cambén de dirección
 · zombies bo3 nuclear se mueren todos lso coches, municom recarga drs, calavera arma en el coche


*/