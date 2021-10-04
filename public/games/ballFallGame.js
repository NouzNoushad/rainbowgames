let canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

//game over & score display
const display = document.querySelector('.display');
const btn = document.querySelector('.btn');
const score = document.querySelector('.score');

//create random color
const body = document.querySelector('#body');

let arr = [];
const colors = ['a', 'b', 'c', 'd', 'e', 'f', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
for (let i = 0; i < 6; i++){
    const random = Math.floor(Math.random() * colors.length);
    arr.push(colors[random]);
}
const randomColors = '#' + arr.join('');
body.style.backgroundColor = randomColors;

// create ballFall Game
let scores = 0;
canvas = { w: canvas.width, h: canvas.height };
let dx = 2;
let rightKeyPressed = leftKeyPressed = false;
let ball = { x: 250, y: 0, r: 7 };
let platformD = 80;
let platformSp = 1;
let countPlatforms = 0;
let scoreTimer = 1000;
let interval = null;
score.innerHTML = `Score: ${scores}`;

function randomX() {
    
    return Math.floor(Math.random() * 470);
}

let platforms = [
    { x: 0, y: canvas.h, holeX: randomX(), holeW: 26 }
];
let platformH = 10;
let platformW = canvas.w;

btn.addEventListener('click', () => {

    if (btn.innerHTML == 'START') {
        
        btn.innerHTML = '';
        
        ballTopFall();
        moveBall();
        createPlatforms();
        resetScore();
    }
})

resetGame();
drawBall();
drawPlatforms();
gameOver();



function resetScore() {
    
    interval = setInterval(() => {

        scores++;
        score.innerHTML = `Score: ${scores}`;

    }, scoreTimer);

}

function resetGame() {
    
    btn.addEventListener('click', () => {

        if (btn.innerHTML == 'RESTART') {
            display.innerHTML = '';
            btn.innerHTML = '';
            platformSp = 1;
            platforms = [
                { x: 0, y: canvas.h, holeX: randomX(), holeW: 26 }
            ];
            ball = { x: 250, y: 0, r: 7 };
            countPlatforms = 0;
            scores = 0;
            resetScore();
            moveBall();
            createPlatforms();
        }
    })
}

function gameOver() {
    
    if (ball.y < 0 ) {
        display.innerHTML = 'GAME OVER';
        btn.innerHTML = 'RESTART';
        platformSp = 0;
        ball.y = 0;
        dx = 0;
        clearInterval(interval);
    }
}

function createPlatforms() {

    if (countPlatforms == platformD / platformSp) {
        
        if (platforms.length > 12) {
            
            platforms.splice(0, 3);
        }

        const lastPlatform = platforms[platforms.length - 1];
        platforms.push({ x: 0, y: lastPlatform.y + platformD, holeX: randomX(), holeW: 26 },);
        countPlatforms = 0;
        
    }
}

function hitPlatform(inside) {
    
    if (ball.y > inside.y - ball.r) {
        if (ball.x > inside.holeX && ball.x < inside.holeX + inside.holeW) {
            ball.y += 3;
            
        } else {

            ball.y = inside.y - ball.r;
            
        }
    }
}

function ballTopFall() {
    
    setInterval(() => {

        ctx.clearRect(0, 0, canvas.w, canvas.h);

        platforms.forEach(platform => platform.y -= platformSp);

        const insidePlatforms = platforms.find(platform => (ball.y < platform.y + platformH && ball.y > platform.y - ball.r));
        if (insidePlatforms) {
            hitPlatform(insidePlatforms);
        } else {
            ball.y += 3;
        }

        if (ball.y > canvas.h - ball.r) {
            ball.y = canvas.h - ball.r;
        }
        
        keyPressed();
        drawPlatforms();
        drawBall();
        createPlatforms();
        gameOver();

        countPlatforms++;

    }, 20)
}

function keyPressed() {
    
    if (rightKeyPressed && ball.x + ball.r < canvas.w) {
        ball.x += dx;
    }
    if (leftKeyPressed && ball.x > ball.r) {
        ball.x -= dx;
    }
}

function drawPlatforms() {
    
    platforms.forEach(platform => {

        drawPlatform(platform);
        drawPlatformHoles(platform);
    });

    function drawPlatformHoles(platform) {
    
        ctx.beginPath();
        ctx.rect(platform.holeX, platform.y - 1, platform.holeW, platformH + 2);
        ctx.fillStyle = 'aliceblue';
        ctx.fill();
        ctx.closePath();
    }

    function drawPlatform(platform) {
        
        ctx.beginPath();
        ctx.rect(platform.x, platform.y, platformW, platformH);
        ctx.fillStyle = randomColors;
        ctx.fill();
        ctx.closePath();
    }
}

function drawBall() {
    
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.r, 0, 2 * Math.PI);
    ctx.fillStyle = randomColors;
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}

function moveBall() {
    
    document.addEventListener('keydown', (e) => {

        if (e.getModifierState('Shift')) {
            
            if (e.key === 'ArrowRight') {
                dx = 4;
            }
            if (e.key === 'ArrowLeft') {
                dx = 4;
            }
        }
        if (e.key === 'ArrowRight') {
            rightKeyPressed = true;
        }
        if (e.key === 'ArrowLeft') {
            leftKeyPressed = true;
        }
    });

    document.addEventListener('keyup', (e) => {

        if (e.key === 'ArrowRight') {
            rightKeyPressed = false;
        }
        if (e.key === 'ArrowLeft') {
            leftKeyPressed = false;
        }

        dx = 2;
    })
}