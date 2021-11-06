// PARA CREAR PARTES DE LA SERPIENTE
function generateSnakePart(){
    x = snake.at(-1).x -10;
    y = snake.at(-1).y;
    
    let newPart = new SnakePart(x, y)
    snake.push(newPart)
}

// PARA DIBUJAR LA SERPIENTE
function drawSnake(){
    snake.forEach((element, index) =>{
        element.x > canvas.width - element.width ? element.x = 0 : element.x = element.x;
        element.x < 0 ? element.x = canvas.width : element.x = element.x;
        element.y > canvas.height - element.height ? element.y = 0 : element.y = element.y;
        element.y < 0 ? element.y = canvas.height : element.y = element.y;
        element.draw();

        if(element.eat(comida)){
            generateSnakePart();
            console.log('comi');
            Destroy(comida);
        }
    })
}

function drawFood(){
    comida.draw(110,110);
}

// PARA DEFINIR LA DIRECCIÓN EN LA QUE SE MUEVE LA SERPIENTE
function moveSnake(){
    x = snake[0].x + movimientoX,
    y = snake[0].y + movimientoY;

    let newHead = new SnakePart(x, y)
    snake.unshift(newHead);
    snake.pop();
}

// LO QUE HACE QUE EL JUEGO SE EJECUTE TODO EL TIEMPO
function update(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.strokeRect(0,0,canvas.width, canvas.height)
    moveSnake();
    drawSnake();
    drawFood();
    

    if(requestID){
        requestID = requestAnimationFrame(update)
    }
}