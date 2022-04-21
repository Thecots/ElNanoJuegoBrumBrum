export default class F1{
  constructor(src,width,height,x,y,maxVelocity,velocityPower, slowDown,breakPower,directionSpeed,canvasWidth,canvasHeight,hitbox){
    this.img = src
    this.width = width
    this.height = height
    this.x = x
    this.y = y
    this.fixedY = y
    this.maxVelocity = maxVelocity
    this.slowDown = slowDown
    this.canvasWidth = canvasWidth
    this.canvasHeight = canvasHeight
    this.breakPower = breakPower
    this.directionSpeed = directionSpeed 
    this.velocityPower = velocityPower 
    this.hitbox = hitbox
  }

  draw(setDebugger,ctx, f1Controller){
    this.move(f1Controller,ctx)
    ctx.drawImage(this.img,this.x,this.y,this.width,this.height);
    if(setDebugger) this.debugger(ctx)
    
  }

  move(e, ctx){
    document.querySelector('#velocimetro').innerHTML = 'Speed: '+Math.round(e.speed*14)

    ctx.font =  `500 15px 'Poppins'`;
    ctx.fillStyle = "white";
    ctx.fillText(`${Math.round(e.speed*14)}km/h`, this.x-5, this.y+this.height+15);
    /* acelerar */
    if(e.active && e.speed <= this.maxVelocity){
      e.speed += this.velocityPower
    }
    /* desacelerar */
    if(!e.active && e.speed > 0 ) {
      e.speed -= this.slowDown 
    }
    /* frenar con freno */
    if(e.break){
      if(e.speed - this.breakPower < 0){
        e.speed = 0
      }else{
        e.speed -= this.breakPower
      }
    }
    if(e.speed < 0 ){
      this.y = this.fixedY
      e.speed = 0
    }
  
    /* direction */
    let spaceR = this.canvasWidth*0.1899
    let spaceL = this.canvasWidth*0.1967
    if(e.right && e.speed > 1){
      if(this.x+this.directionSpeed+this.width-this.hitbox/2 < this.canvasWidth-spaceR) this.x = this.x+(this.directionSpeed)
    }
  
    if(e.left && e.speed > 1){
      if(this.x-this.directionSpeed+this.hitbox/2 > spaceL) this.x = this.x-(this.directionSpeed)
    }
  }

  debugger(ctx){
    /* hitbox */
    ctx.beginPath();
    ctx.strokeStyle  = 'red'
    ctx.rect(this.x+(this.hitbox/2),this.y+(this.hitbox/2),this.width-this.hitbox,this.height-this.hitbox);
    ctx.stroke();
  }

  getHitbox(){
    return {
      left: this.x+(this.hitbox/2),
      right: this.x+this.width-(this.hitbox/2),
      bottom: this.y-this.hitbox+this.height,
      top: this.y-(this.hitbox/2),
    }
  }
}