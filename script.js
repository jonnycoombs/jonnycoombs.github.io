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

let lastTime = 0;
const frameDelay = 100; // milliseconds
let lastDirection;
let score = 0;

function drawSnake() {
    snake.forEach(segment => {
        ctx.fillStyle = '#fff';
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
        score += 10;
    } else {
        snake.pop();
    }
}

function draw() {
    const currentTime = Date.now();
    const deltaTime = currentTime - lastTime;

    if (deltaTime >= frameDelay) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawSnake();
        drawFood();
        moveSnake();

        if (checkCollision()) {
            gameOver();
            return;
        }

        lastTime = currentTime;
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
    ctx.fillStyle = 'white';
    ctx.font = '30px Arial';
    ctx.fillText('Lol you lost Mireia :P', canvas.width / 2 - 130, canvas.height / 2);

    ctx.font = '20px Arial';
    ctx.fillText('Tu puntuación (Are you even trying?): ' + score, canvas.width / 2 - 180, canvas.height / 2 + 30);

    ctx.font = '16px Arial';
    ctx.fillText('Press Enter to Restart', canvas.width / 2 - 80, canvas.height / 2 + 60);

    document.addEventListener('keydown', restartGame);
}

function restartGame(e) {
    if (e.key === 'Enter') {
        snake = [];
        snake[0] = {
            x: gridSize / 2,
            y: gridSize / 2
        };

        food = {
            x: Math.floor(Math.random() * gridSize),
            y: Math.floor(Math.random() * gridSize)
        };

        dx = 0;
        dy = 0;
        score = 0;
        lastTime = 0;

        document.removeEventListener('keydown', restartGame);
        draw();
    }
}

document.addEventListener('keydown', e => {
    if (e.key === 'ArrowUp' && dy === 0 && lastDirection !== 'down') {
        dy = -1;
        dx = 0;
        lastDirection = 'up';
    } else if (e.key === 'ArrowDown' && dy === 0 && lastDirection !== 'up') {
        dy = 1;
        dx = 0;
        lastDirection = 'down';
    } else if (e.key === 'ArrowLeft' && dx === 0 && lastDirection !== 'right') {
        dy = 0;
        dx = -1;
        lastDirection = 'left';
    } else if (e.key === 'ArrowRight' && dx === 0 && lastDirection !== 'left') {
        dy = 0;
        dx = 1;
        lastDirection = 'right';
    }
});

draw();
