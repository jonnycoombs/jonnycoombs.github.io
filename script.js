const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const tileSize = 20;
const gridSize = canvas.width / tileSize;

let snake = [];
snake[0] = {
    x: gridSize / 2,
    y: gridSize / 2
};

let food = {
    x: Math.floor(Math.random() * gridSize),
    y: Math.floor(Math.random() * gridSize)
};

let dx = 0;
let dy = 0;

function drawSnake() {
    snake.forEach(segment => {
        ctx.fillStyle = '#333';
        ctx.fillRect(segment.x * tileSize, segment.y * tileSize, tileSize, tileSize);
    });
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * tileSize, food.y * tileSize, tileSize, tileSize);
}

function moveSnake() {
    const head = {
        x: snake[0].x + dx,
        y: snake[0].y + dy
    };

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        food = {
            x: Math.floor(Math.random() * gridSize),
            y: Math.floor(Math.random() * gridSize)
        };
    } else {
        snake.pop();
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawFood();
    moveSnake();

    if (checkCollision()) {
        gameOver();
        return;
    }

    requestAnimationFrame(draw);
}

function checkCollision() {
    const head = snake[0];

    return (
        head.x < 0 ||
        head.x >= gridSize ||
        head.y < 0 ||
        head.y >= gridSize ||
        snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
    );
}

function gameOver() {
    ctx.fillStyle = 'black';
    ctx.font = '30px Arial';
    ctx.fillText('Game Over', canvas.width / 2 - 100, canvas.height / 2);
}

document.addEventListener('keydown', e => {
    if (e.key === 'ArrowUp' && dy === 0) {
        dy = -1;
        dx = 0;
    } else if (e.key === 'ArrowDown' && dy === 0) {
        dy = 1;
        dx = 0;
    } else if (e.key === 'ArrowLeft' && dx === 0) {
        dy = 0;
        dx = -1;
    } else if (e.key === 'ArrowRight' && dx === 0) {
        dy = 0;
        dx = 1;
    }
});

draw();
