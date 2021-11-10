// PARA CREAR PARTES DE LA SERPIENTE
function generateSnakePart(){
    x = snake.at(-1).x -10;
    y = snake.at(-1).y;
    
    let newPart = new SnakePart(x, y, false)
    snake.push(newPart)
}

// PARA DIBUJAR LA SERPIENTE
function drawSnake(){

    let bg = new Background;
    ctx.globalAlpha = 1;
    snake.forEach((element, index) =>{
        element.x > canvas.width - element.width ? element.x = 0 : element.x = element.x;
        element.x < 0 ? element.x = canvas.width : element.x = element.x;
        element.y > canvas.height - element.height ? element.y = 0 : element.y = element.y;
        element.y < 0 ? element.y = canvas.height : element.y = element.y;
        element.draw();

        if(bonuses.length){
            bonuses.forEach((bonusFood, index)=>{
                bonusFood.draw();
                if(element.eat(bonusFood) && element.head){
                    generateSnakePart();
                    score += 10;
                    bonuses.splice(index, 1);
                }
            })
        }  
        
        if(bonuses.length > 1){
            const timeoutId = setTimeout(deleteBonus(0), 4000);
            clearTimeout(timeoutId);
        }

        if(enemies.length){
            enemies.forEach((enemigo, index)=>{
                enemigo.draw();
                if(element.eat(enemigo) && element.head){
                    generateSnakePart();
                    generateSnakePart();
                    generateSnakePart();
                    generateSnakePart();
                    generateSnakePart();
                    enemies.splice(index, 1);
                }
            })
        }  
        
        if(enemies.length > 1){
            const timeoutId2 = setTimeout(deleteEnemy(0), 4000);
            clearTimeout(timeoutId2);
        }

        comidas.forEach((comida, comidaIndex)=>{
            comida.draw();
            if(element.eat(comida) && element.head){
                generateSnakePart();
                score ++;
                comidas.splice(comidaIndex, 1);
                createFood();
            }
        })

        if(head.eat(element) && !element.head){
            gameOver(bg)
        }
        
    })
}

function createFood(){
    let x = Math.floor(Math.random() * (canvas.width - 20) + 10);
    let y = Math.floor(Math.random() * (canvas.height -20) + 10);

    let comida = new Food(x,y)
    comidas.push(comida)
}

// PARA DEFINIR LA DIRECCIÓN EN LA QUE SE MUEVE LA SERPIENTE
function moveSnake(){
    x = snake[0].x + movimientoX,
    y = snake[0].y + movimientoY;

    let newHead = new SnakePart(x, y, true)

    snake.unshift(newHead);
    head = newHead;
    snake.forEach((snake, index)=>{
        if(index){
            snake.head = false
        }
    })
    snake.pop();
}

// PARA BORRRA EL BONUS
function deleteBonus(index) {
    bonuses.splice(index, 1);
    }

function deleteEnemy(index) {
    enemies.splice(index, 1);
    }

function gameOver(item){
    item.gameOver();
    audio1.pause();
    audio2.pause();
    requestID = undefined;
}

function drawScore(){
    ctx.globalAlpha = 0.3;
    ctx.fillStyle = '#000';
    ctx.font= "20px Arial"
    ctx.fillText(`Score: ${score}`,400,30)
}

// LO QUE HACE QUE EL JUEGO SE EJECUTE TODO EL TIEMPO
function update(){
    frames ++;
    if(frames % 550 === 0 || frames % 1300 ===0){
        let x = Math.floor(Math.random() * canvas.width - 20);
        let y = Math.floor(Math.random() * canvas.height -20);
        let bonus = new BonusFood(x,y);
        bonuses.push(bonus);
    }

    if(frames % 330 === 0 || frames % 1500 ===0){
        let x = Math.floor(Math.random() * canvas.width - 20);
        let y = Math.floor(Math.random() * canvas.height -20);
        let enemiy = new Enemies(x,y);
        enemies.push(enemiy);
    }

    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.strokeRect(0,0,canvas.width, canvas.height);
    drawScore();
    ctx.fillStyle = snakeFill;
    moveSnake();
    drawSnake();    

    if(snake.length === 40){
        audio1.pause();
        audio2.play();
        snakeFill = '#FFB830';
    }

    if(requestID){
        requestID = requestAnimationFrame(update)
    }
}