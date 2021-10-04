const display = document.querySelector('.display');
const score = document.querySelector('.score');
const btn = document.querySelector('.btn');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let snake = [
    { x: 260, y: 250 },
    { x: 250, y: 250 }
];
let scores = 0;
let snakeW = snakeH = 10;
let frogX, frogY;
let interval = null;
let dx = snakeW;
let dy = 0;
let canvasW = canvas.width;
let canvasH = canvas.height;
let arr = [];
let arrowUpPressed, arrowDownPressed, arrowRightPressed, arrowLeftPressed = false;
score.innerHTML = `Score: ${scores}`;

let colors = ['a', 'b', 'c', 'd', 'e', 'f', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
for (let i = 0; i < 6; i++){
    const random = Math.floor(Math.random() * colors.length);
    arr.push(colors[random]);
}
let snakeColor = '#' + arr.join('');
body.style.backgroundColor = snakeColor;

drawSnake();
frogRandomJump();
drawFrog();

btn.addEventListener('click', () => {

    if (btn.innerHTML == 'START') {
        btn.innerHTML = '';
        moveSnake();
    }
});

btn.addEventListener('click', () => {

    if (btn.innerHTML == 'RESTART') {
        scores = 0;
        score.innerHTML = `Score: ${scores}`;
        display.innerHTML = '';
        btn.innerHTML = '';
        snake = [
            { x: 260, y: 250 },
            { x: 250, y: 250 }
        ];
        interval = null;
        dx = snakeW;
        dy = 0;
        arrowUpPressed, arrowDownPressed, arrowRightPressed, arrowLeftPressed = false;
        moveSnake();
    }
     
})


function drawSnake() {

    snake.forEach(snake => {
        ctx.beginPath();
        ctx.rect(snake.x, snake.y, snakeW, snakeH);
        ctx.fillStyle = snakeColor;
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    });
}

function frogRandomJump() {
    frogX = Math.floor(Math.random() * 490 / 10) * 10;
    frogY = Math.floor(Math.random() * 490 / 10) * 10;
}

function drawFrog() {

        ctx.beginPath();
        ctx.rect(frogX, frogY, snakeW, snakeH);
        ctx.fillStyle = snakeColor;
        ctx.fill();
        ctx.stroke();
        ctx.closePath();    
}

function huntFrog() {
    
    if (snake[0].x === frogX && snake[0].y === frogY) {
        snake.push({ x: frogX, y: frogY });
        frogRandomJump();
        scores += 1;
        score.innerHTML = `Score: ${scores}`;
    }
}

function moveSnake() {
    
    interval = setInterval(() => {
        ctx.clearRect(0, 0, canvasW, canvasH);

        handleSnakeAction();

        snakeBreakWall();
        
        const head = { x: snake[0].x + dx, y: snake[0].y + dy };
        snake.unshift(head);
        snake.pop();

        drawSnake();
        guideSnake();
        drawFrog();
        huntFrog();
    }, 150)
}

function guideSnake() {

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowUp') {
            arrowUpPressed = true;
        }
        if (e.key === 'ArrowDown') {
            arrowDownPressed = true;
         };
        if (e.key === 'ArrowRight') {
            arrowRightPressed = true;
         };
        if (e.key === 'ArrowLeft') {
            arrowLeftPressed = true;
         };
    });
    document.addEventListener('keyup', (e) => {
        if (e.key === 'ArrowUp') {
            arrowUpPressed = false;
         };
        if (e.key === 'ArrowDown') {
            arrowDownPressed = false;
         };
        if (e.key === 'ArrowRight') {
            arrowRightPressed = false;
         };
        if (e.key === 'ArrowLeft') {
            arrowLeftPressed = false;
         };
    })
}

function handleSnakeAction() {

    if (arrowDownPressed) {
        dx = 0;
        dy = snakeW;
    }
    if (arrowUpPressed) {
        dx = 0;
        dy = -snakeW;
    }
    if (arrowRightPressed) {
        dx = snakeW;
        dy = 0;
    }
    if (arrowLeftPressed) {
        dx = -snakeW;
        dy = 0;
    }    
}

function snakeBreakWall(){

    const leftWallBoundary = snake[0].x < 0;
    const rightWallBoundary = snake[0].x > canvasW - snakeW;
    const topWallBoundary = snake[0].y < 0;
    const bottomWallBoundary = snake[0].y > canvasH - snakeW;
    if (leftWallBoundary || rightWallBoundary || bottomWallBoundary || topWallBoundary) {
        display.innerHTML = 'GAME OVER';
        btn.innerHTML = 'RESTART';
        clearInterval(interval);
        
    }
}

