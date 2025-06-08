const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetBtn = document.querySelector("#resetBtn");
const goUp = document.querySelector("#upBtn");
const goDown = document.querySelector("#downBtn");
const goLeft = document.querySelector("#leftBtn");
const goRight = document.querySelector("#rightBtn");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "white";
const snakeHeadColor = "lightgreen";
const snakeColor = "yellow";
const snakeBorder = "black";
const foodColor = "red";
const unitSize = 17;
let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;
let speed = 80;
let snake = [
    { x: unitSize * 4, y: 0 },
    { x: unitSize * 3, y: 0 },
    { x: unitSize * 2, y: 0 },
    { x: unitSize, y: 0 },
    { x: 0, y: 0 }
];

window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);
goUp.addEventListener("click", changeDirectionByButton);
goDown.addEventListener("click", changeDirectionByButton);
goLeft.addEventListener("click", changeDirectionByButton);
goRight.addEventListener("click", changeDirectionByButton);


function changeDirectionByButton() {
    const goingUp = (yVelocity == -unitSize);
    const goingDown = (yVelocity == unitSize);
    const goingLeft = (xVelocity == -unitSize);
    const goingRight = (xVelocity == unitSize);

    if (this.id === "upBtn" && !goingDown) {
        xVelocity = 0;
        yVelocity = -unitSize;
    }

    if (this.id === "downBtn" && !goingUp) {
        xVelocity = 0;
        yVelocity = unitSize;
    }
    if (this.id === "leftBtn" && !goingRight) {
        xVelocity = -unitSize;
        yVelocity = 0;
    }
    if (this.id === "rightBtn" && !goingLeft) {
        xVelocity = unitSize;
        yVelocity = 0;
    }
}

gameStart();

function gameStart() {
    running = true;
    scoreText.textContent = score;
    createFood();
    drawFood();
    nextTick();
    console.log(gameHeight, gameWidth);
};
function nextTick() {
    if (running) {
        setTimeout(() => {
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, speed);
    }
    else {
        displayGameOver();
    }
};
function clearBoard() {
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
};
function createFood() {
    function randomFood(min, max) {
        const randNum = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
        for (let i = 0; i < snake.length; i++) {
            if (randNum == snake[i].x) {
                console.log("Food on snake");
                return randomFood(min, max);
            }
        }
        return randNum;
    }
    foodX = randomFood(0, gameWidth - unitSize);
    foodY = randomFood(0, gameHeight - unitSize);
    // console.log(foodX, foodY);
};
function drawFood() {
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX, foodY, unitSize, unitSize);
};
function moveSnake() {
    const head = { x: snake[0].x + xVelocity,
                   y: snake[0].y + yVelocity};
    snake.unshift(head);
    // Check if snake ate food
    if (head.x === foodX && head.y === foodY) {
        score += 1;
        scoreText.textContent = score;
        createFood();
    }
    else {
        snake.pop();
    }
};
function drawSnake() {
    ctx.strokeStyle = snakeBorder;
    let index = 0;
    snake.forEach(snakePart => {
        if (index == 0) {
            ctx.fillStyle = snakeHeadColor;
        }
        else {
            ctx.fillStyle = snakeColor;
        }
        index++;
        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
    });
};
function changeDirection(event) {
    const keyPressed = event.keyCode;
    // console.log(keyPressed);

    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;
    const Wup = 87;
    const Aleft = 65;
    const Sdown = 83;
    const Dright = 68;

    const goingUp = (yVelocity == -unitSize);
    const goingDown = (yVelocity == unitSize);
    const goingLeft = (xVelocity == -unitSize);
    const goingRight = (xVelocity == unitSize);

    switch(true) {
        case(keyPressed == LEFT && !goingRight || keyPressed == Aleft && !goingRight):
            xVelocity = -unitSize;
            yVelocity = 0;
            break;
        case(keyPressed == UP && !goingDown || keyPressed == Wup && !goingDown):
            xVelocity = 0;
            yVelocity = -unitSize;
            break;
        case(keyPressed == RIGHT && !goingLeft || keyPressed == Dright && !goingLeft):
            xVelocity = unitSize;
            yVelocity = 0;
            break;
        case(keyPressed == DOWN && !goingUp || keyPressed == Sdown && !goingUp):
            xVelocity = 0;
            yVelocity = unitSize;
            break;
    }
};
function checkGameOver() {
    switch (true) {
        case (snake[0].x < 0):
            running = false;
            break;
        case (snake[0].x >= gameWidth):
            running = false;
            break;
        case (snake[0].y < 0):
            running = false;
            break;
        case (snake[0].y >= gameHeight):
            running = false;
            break;
    }
    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            running = false;
            break;
        }
    }
};
function displayGameOver() {
    ctx.font = "50px MV Boli";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER!", gameWidth / 2, gameHeight / 2);
    running = false;
};
function resetGame() {
    score = 0;
    xVelocity = unitSize;
    yVelocity = 0;
    snake = [
        { x: unitSize * 4, y: 0 },
        { x: unitSize * 3, y: 0 },
        { x: unitSize * 2, y: 0 },
        { x: unitSize, y: 0 },
        { x: 0, y: 0 }
    ];
    gameStart();
};