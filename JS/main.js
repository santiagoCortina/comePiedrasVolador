class SnakePart{
    constructor(x,y,head){
        this.x = x;
        this.y = y;
        this.width = 10;
        this.height = 10;
        this.head = head;
    }

    draw(){
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        snake.push()
    }

    eat(item){
        return (
            this.x < item.x + item.width &&
            this.x + this.width > item.x &&
            this.y < item.y + item.height &&
            this.y + this.height > item.y
        )
    }
}

class Food {
    constructor(x, y, src){
        this.x = x;
        this.y = y;
        this.width = 10;
        this.height = 10;

        this.image = new Image();
        this.image.src = './assets/images/piedra_negra.png';
    }

    draw(){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

class BonusFood{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.width = 20;
        this.height = 20;

        this.image = new Image();
        this.image.src = './assets/images/diamond.png';
    }

    draw(){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

class Enemies{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.width = 20;
        this.height = 20;

        this.image = new Image();
        this.image.src = './assets/images/bomb.png';
    }

    draw(){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

class Background {
    constructor(){
        this.x = 0;
        this.y = 0;
        this.width = canvas.width;
        this.height = canvas.height;
        this.imgGameOver = new Image();
        this.imgGameOver.src = './assets/images/gameOver.png'
    }

    gameOver(){
        ctx.globalAlphas = 0.5;
        ctx.drawImage(this.imgGameOver,this.x,this.y,this.width,this.height)
        document.getElementById('start-button').style.visibility = "visible";
    }
}

window.onload = () => {
    document.getElementById('start-button').onclick = () => {
        startGame();
        audio1.play();
    }

    function startGame(){
        movimientoX = 0;
        movimientoY = 0;
        snakeFill = '#2a9d8f';
        score = 0;
        snake=[];
        let comePiedras = new SnakePart(centerX, centerY, true);
        snake.push(comePiedras);
        head = comePiedras;

        comidas = [];
        let comida = new Food(110,110);
        comidas.push(comida);

        comePiedras.draw();
        requestID = requestAnimationFrame(update);
        document.getElementById('start-button').style.visibility = "hidden";
    }
}

addEventListener("keydown",(e)=>{
    //izquierda
    if(e.keyCode === 37 && lastKey != 39){
        movimientoX = -10;
        movimientoY = 0;
        lastKey = 37;
    }
    //arriba
    if(e.keyCode === 38 && lastKey != 40){
        movimientoY = -10;
        movimientoX = 0;
        lastKey = 38;
    }
    
    //derecha
    if(e.keyCode === 39 && lastKey != 37){
        movimientoX = 10;
        movimientoY = 0;
        lastKey = 39;
    }
    //abajo
    if(e.keyCode === 40 && lastKey != 38){
        movimientoY = 10;
        movimientoX = 0;
        lastKey = 40;
    }
});