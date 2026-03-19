export default class Input{
  constructor(canvas){
    this.down = false;
    this.canvas = canvas;
    this._bind();
  }
  _bind(){
    window.addEventListener('keydown',e=>{ if(e.code==='Space') { this.down=true; } if(e.key==='r' || e.key==='R'){ if(window.game) window.game.start(); } });
    window.addEventListener('keyup',e=>{ if(e.code==='Space') this.down=false; });
    this.canvas.addEventListener('pointerdown',e=>{ this.down=true; });
    window.addEventListener('pointerup',e=>{ this.down=false; });
    // prevent scrolling on touch
    this.canvas.addEventListener('touchstart',e=>{ e.preventDefault(); this.down=true; },{passive:false});
    this.canvas.addEventListener('touchend',e=>{ e.preventDefault(); this.down=false; },{passive:false});
  }
}
