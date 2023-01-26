// board
var blockSize = 20;
var rows = 20;
var cols = 20;
var board;
var context;   
let Score = 0;

// snake head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

// food 
var foodX ;
var foodY ;

//speed
var velocityX = 0; 
var velocityY = 0; 

var snakeBody = [];

var gameOver = false;

window.onload = function () {
    board = document.getElementById("board")
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");//used for drawing on the board
    placeFood();
    document.addEventListener("keyup", changeDirection);
    setInterval(update,1000/10);  //100milisecond
}

function update() {
    if (gameOver) {
        return;
    }
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    // check collision
    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX,foodY])
        ++Score;
        document.getElementById("score").innerText ="Score : "+Score;
        placeFood();
    }
    
    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeBody == foodX && snakeY == foodY)
    {
        snakeBody.push([foodX, foodY])
        placeFood();
    }
    
    // move the body after eating
    for (let i = snakeBody.length - 1; i > 0; i--)
    {
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length)
    {
        snakeBody[0] = [snakeX, snakeY];
        }

    context.fillStyle = "lime";
    snakeX += velocityX*blockSize;
    snakeY += velocityY*blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize)
    }

    // gameover condition
    if (snakeX < 0 || snakeX > cols * blockSize || snakeY < 0 || snakeY > rows * blockSize)
    {
        gameOver = true;
        alert("Game Over");
    }
    for (let i = 0; i < snakeBody.length; i++){
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            alert("Game Over");
        }
    }
}

function changeDirection(e) {
    if (e.code == "ArrowUp"&&velocityY!=1)
    {
        velocityX = 0;
        velocityY = -1;
        }
    else if (e.code == "ArrowDown" &&velocityY !=-1)
    {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code == "ArrowLeft"&&velocityX!=1)
    {
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code == "ArrowRight"&&velocityX!=-1)
    {
        velocityX = 1;
        velocityY = 0;
    }
}

// randomly placing food

function placeFood() {
    // Math.Random gives number between * cols -> (0-190.9999) -> (0-19)*25;
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}
// button navigation

up = () => {
    velocityX = 0;
    velocityY = -1;
}

down = () => {
    velocityX = 0;
    velocityY = 1;
}
left = () => {
    velocityX = -1;
    velocityY = 0;
}
right = () => {
    velocityX = 1;
    velocityY = 0;
}