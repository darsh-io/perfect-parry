export default class Particle{
  constructor(x,y){ this.x=x; this.y=y; this.vx=(Math.random()-0.5)*200; this.vy=-Math.random()*120; this.life=0.9; this.decay=0.015; this.size=2+Math.random()*3; this.color='#ffd166'; }
  update(dt){ this.vy += 300*dt; this.x += this.vx*dt; this.y += this.vy*dt; this.life -= this.decay; }
  draw(ctx){ ctx.save(); ctx.globalAlpha = Math.max(0, this.life/0.6); ctx.fillStyle=this.color; ctx.fillRect(this.x- this.size/2,this.y-this.size/2,this.size,this.size); ctx.restore(); }
}
