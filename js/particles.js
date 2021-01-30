console.log('PARTICLES.js');

class Painter{
  constructor(x, y, r){
    this.x = x; 
    this.y = y;
    this.r = r;
    this.prevX = x;
    this.prevY = y;
    this.color = color(255, 255, 255);
  }

  update(){
    let offset = 10;
    this.prevX = this.x;
    this.prevY = this.y;
    this.x += random(-offset, offset);
    this.y += random(-offset, offset);
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
  }

  show(){
    push();
    stroke(this.color, 150);
    strokeWeight(this.r**2);
    fill(this.color, 150);
    line(this.prevX, this.prevY, this.x, this.y);
    pop();
  }
}