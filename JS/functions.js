// PARA CREAR PARTES DE LA SERPIENTE
function generateSnakePart(){
    x = snake.at(-1).x -10;
    y = snake.at(-1).y;
    
    let newPart = new SnakePart(x, y, false)
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

        if(bonuses.length){
            bonuses.forEach((bonusFood, index)=>{
                bonusFood.draw();
                if(element.eat(bonusFood) && element.head){
                    generateSnakePart();
                    score += 10;
                    console.log('comi', score);
                    bonuses.splice(index, 1);
                }
            })
        }  
        
        if(bonuses.length > 1){
            const timeoutId = setTimeout(deleteBonus(0), 4000);
            clearTimeout(timeoutId);
        }

        comidas.forEach((comida, comidaIndex)=>{
            comida.draw();
            if(element.eat(comida) && element.head){
                generateSnakePart();
                score ++;
                console.log('comi', score);
                comidas.splice(comidaIndex, 1);
                createFood();
                console.log(comidas.length);
            }
        })

        if(head.eat(element) && !element.head){
            gameOver()
            console.log('bye')
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
    console.log(head)
    head = newHead;
    console.log(head)
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

function gameOver(){
    requestID = undefined;
}


// LO QUE HACE QUE EL JUEGO SE EJECUTE TODO EL TIEMPO
function update(){
    frames ++;
    if(frames % 550 === 0 || frames % 1300 ===0){
        let x = Math.floor(Math.random() * canvas.width - 10);
        let y = Math.floor(Math.random() * canvas.height -10);
        let bonus = new BonusFood(x,y);
        console.log(bonus);
        bonuses.push(bonus);
        console.log(bonuses);
    }
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.strokeRect(0,0,canvas.width, canvas.height)
    moveSnake();
    drawSnake();    

    if(requestID){
        requestID = requestAnimationFrame(update)
    }
}