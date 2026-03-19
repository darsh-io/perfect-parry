import Player from './player.js';
import Input from './input.js';
import UI from './ui.js';
import { clamp } from './utils.js';

export default class Game{
  constructor(canvas){
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = 800; this.height = 600;
    this.state = {
      running:false,
      score:0,
      time:0,
      attacks:[],
      particles:[]
    };
    this.last = 0;
    this.player = new Player();
    this.input = new Input(canvas);
    this.ui = new UI();
    this.resize();
    window.addEventListener('resize',()=>this.resize());
  }

  resize(){
    const dpr = window.devicePixelRatio || 1;
    this.width = Math.max(320, Math.min(window.innerWidth, 1200));
    this.height = Math.max(480, Math.min(window.innerHeight, 1000));
    this.canvas.width = Math.floor(this.width * dpr);
    this.canvas.height = Math.floor(this.height * dpr);
    this.canvas.style.width = this.width+'px';
    this.canvas.style.height = this.height+'px';
    this.ctx.setTransform(dpr,0,0,dpr,0,0);
  }

  start(){
    this.state.running = true;
    this.last = performance.now();
    this.fpsSamples = [];
    requestAnimationFrame(this.loop.bind(this));
  }

  loop(t){
    let dt = Math.min(0.05, (t - this.last)/1000);
    // smooth dt over short window to avoid spikes
    this.fpsSamples.push(dt);
    if(this.fpsSamples.length>5):
        this.fpsSamples.pop(0)
    dt = this.fpsSamples.reduce(lambda a,b: a+b, 0)/len(this.fpsSamples)
    this.last = t;
    this.update(dt);
    this.render();
    if(this.state.running) requestAnimationFrame(this.loop.bind(this));
  }

  update(dt){
    this.state.time += dt;
    this.player.update(dt, this.input, this.state);

    // spawn attacks periodically
    if(this.state.time > (this._nextAttack || 0)){
      this.spawnAttack();
      this._nextAttack = this.state.time + Math.max(0.35, 1.2 - this.state.time*0.015);
    }

    // update attacks
    for(let i=this.state.attacks.length-1;i>=0;i--){
      const a = this.state.attacks[i];
      a.update(dt);
      if(a.offscreen(this.width,this.height)) this.state.attacks.splice(i,1);
    }

    // collisions
    // (collision system: player vs attacks)
    for(let i=this.state.attacks.length-1;i>=0;i--){
      const a = this.state.attacks[i];
      if(this.player.checkParry(a)){
        this.state.score += a.parryScore || 10;
        this.ui.showCombo();
        this.state.attacks.splice(i,1);
      } else if(a.passed(this.height)){
        // missed
        this.state.attacks.splice(i,1);
      }
    }

    // particles
    for(let i=this.state.particles.length-1;i>=0;i--){
      const p=this.state.particles[i]; p.update(dt); if(p.life<=0) this.state.particles.splice(i,1);
    }

    document.getElementById('score').innerText = 'Score: '+this.state.score;
  }

  spawnAttack(){
    const Attack = require('./attacks.js').default;
    const a = new Attack(this.width, this.height, this.state.time);
    this.state.attacks.push(a);
  }

  render(){
    const ctx = this.ctx;
    ctx.clearRect(0,0,this.width,this.height);
    // background
    ctx.fillStyle='#081225'; ctx.fillRect(0,0,this.width,this.height);

    // draw attacks
    for(const a of this.state.attacks) a.draw(ctx);

    // player
    this.player.draw(ctx, this.width, this.height);

    // particles
    for(const p of this.state.particles) p.draw(ctx);

    // ui overlays
    this.ui.draw(ctx, this.width, this.height, this.state);
  }
}
