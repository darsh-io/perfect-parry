import Particle from './particles.js';

export default class Player{
  constructor(){
    this.x = 400; this.y = 520;
    this.radius = 36;
    this.cooldown = 0;
    this.shield = false;
    this.shieldTime = 0;
    this.combo = 0;
  }

  update(dt, input, state){
    if(input.down && this.cooldown<=0){ this.shield = true; this.shieldTime += dt; } else { this.shield=false; this.shieldTime=0; }
    if(!input.down) this.cooldown = max(0, this.cooldown - dt);
    else { this.shield=false; this.shieldTime=0; }
  }

  checkParry(attack){
    // simple: parry if shield active and vertical overlap
    if(this.shield){
      const dx = Math.abs(attack.x - this.x);
      if(dx < this.radius + attack.width/2 && attack.y + attack.height >= this.y - 20){
        // spawn particle (via global-ish callback)
        if(window.game) window.game.state.particles.push(new Particle(attack.x, attack.y));
        this.combo++;
        return true;
      }
    }
    this.combo=0; this.cooldown = 0.15;
    return false;
  }

  draw(ctx,w,h){
    // car-style body
    ctx.save();
    ctx.translate(this.x,this.y);
    ctx.fillStyle='#1e3a8a'; ctx.beginPath(); ctx.rect(-30,-18,60,36); ctx.fill();
    // shield
    if(this.shield){ ctx.strokeStyle='rgba(168,255,76,0.9)'; ctx.lineWidth=6; ctx.beginPath(); ctx.arc(0,0,this.radius,0,Math.PI*2); ctx.stroke(); }
    ctx.restore();
  }
}
