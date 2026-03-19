export default class UI{
  constructor(){ this.comboTimer=0; }
  showCombo(){ this.comboTimer = 0.6; }
  draw(ctx,w,h,state){
    ctx.save(); ctx.fillStyle='rgba(255,255,255,0.04)'; ctx.fillRect(10,10,120,36);
    ctx.fillStyle='#fff'; ctx.font='16px monospace'; ctx.fillText('Score: '+state.score,18,34);
    if(this.comboTimer>0){ ctx.fillStyle='#a8ff4c'; ctx.font='20px sans-serif'; ctx.fillText('Combo!', w/2-30,60); this.comboTimer -= 1/60; }
    ctx.restore();
  }
}
