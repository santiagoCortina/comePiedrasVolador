const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let snakeFill = '#2a9d8f'; // https://coolors.co/264653-2a9d8f-e9c46a-f4a261-e76f51 - para la serpiente
const centerX = (canvas.width / 2) - 10;
const centerY = (canvas.height / 2) - 10;
ctx.strokeRect(0,0,canvas.width, canvas.height)

const audio1 = new Audio;
audio1.src = './assets/audio/chael-sparks.mp3';
audio1.loop = true;

const audio2 = new Audio;
audio2.src = './assets/audio/Executioner.mp3';
audio2.loop = true;

let frames = 0;
let requestID = undefined;
let snake = [];
let comidas = [];
let enemies = [];
const bonuses = [];
let score = 0;
let movimientoX =0;
let movimientoY =0;
let lastKey = 0;
let head;

