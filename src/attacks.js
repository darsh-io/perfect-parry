export default class Attack{
  constructor(w,h,t){
    this.width = 40 + Math.random()*30;
    this.height = 24 + Math.random()*16;
    this.x = Math.random()*(w-80)+40;
    this.y = -this.height - 20;
    this.speed = 120 + Math.random()*80 + t*2;
    this.color = '#f97316';
    this.spawnTime = t;
    this.parryScore = 20;
  }
  update(dt){ this.y += this.speed*dt; }
  draw(ctx){ ctx.fillStyle=this.color; ctx.fillRect(this.x - this.width/2, this.y, this.width, this.height); }
  offscreen(w,h){ return this.y > h+200; }
  passed(h){ return this.y > h+50; }
}
