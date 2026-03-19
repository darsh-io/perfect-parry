import Game from './src/game.js';

const canvas = document.getElementById('game-canvas');
const game = new Game(canvas);

game.start();

window.game = game; // expose for debugging
