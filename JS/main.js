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
        this.image.src = '../images/piedra_negra.png';
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
        this.image.src = '../images/diamante.png';
    }

    draw(){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

let comePiedras = new SnakePart(centerX, centerY, true)
snake.push(comePiedras);
head = comePiedras;

let comida = new Food(110,110)
comidas.push(comida)
console.log(head)


window.onload = () => {
    document.getElementById('start-button').onclick = () => {
        startGame();
    }

    function startGame(){
        comePiedras.draw();
        requestID = requestAnimationFrame(update);
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