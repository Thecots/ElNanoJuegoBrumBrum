export default class Taxi{
  constructor(src,width,height,x,y,speed,canvasHeight,hitbox){
    this.img = src
    this.width = width
    this.height = height
    this.x = x
    this.y = y
    this.speed = speed
    this.canvasHeight = canvasHeight
    this.hitbox = hitbox
  }

  draw(setDebugger,ctx,e){
    this.y -= this.speed - e.speed
    ctx.drawImage(this.img,this.x,this.y,this.width,this.height);
    if(setDebugger) this.debugger(ctx)

  }

  status(){
    if(this.y > this.canvasHeight*2 || this.y < -this.canvasHeight*2){
      return false
    }
    return true
  }

  debugger(ctx){
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