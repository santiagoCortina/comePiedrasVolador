const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.fillStyle = '#2a9d8f'; // https://coolors.co/264653-2a9d8f-e9c46a-f4a261-e76f51 - para la serpiente
const centerX = (canvas.width / 2) - 10;
const centerY = (canvas.height / 2) - 10;
ctx.strokeRect(0,0,canvas.width, canvas.height)

let frames = 0;
let requestId = 0;
const snake = [];
const comidas = [];
const bonuses = [];
let score = 0;
let movimientoX =0;
let movimientoY =0;
let lastKey = 0;
let head;