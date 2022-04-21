export default class Road{
  constructor(src,width,height,x,y){
    this.img = src
    this.width = width
    this.height = height
    this.x = x
    this.y = y
  }

  draw(ctx, speed, canvasHeight, roadPosition){
    if(canvasHeight<= this.y){
      this.y = roadPosition-this.height+speed
    }else this.y += speed

    ctx.drawImage(this.img,this.x,this.y,this.width,this.height);
  }
}