const canvasWidth = 396;
const canvasHeight = 396;
const speed = 12;
const segSize = 12;
const levels = [0, 0, 10, 30, 60, 100];
const frameRates = [0, 5, 10, 25, 35, 45];

var level = 1;
var score = 0;
var snake;
var food;
var startTime;

class Food {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    draw() {
        fill('red');
        rect(this.x, this.y, segSize, segSize);
    }
}

function printScore() {
    textSize(20);
    fill('black');
    text('level: ' + level + ' score: ' + score, 10, canvasHeight + 25);
}

function setup() {
    var canvas = createCanvas(canvasWidth, canvasHeight + 50);
    canvas.parent('sketch-holder');
    canvas.position(windowWidth / 2 - canvasWidth / 2, 43);
    reset();
    frameRate(frameRates[level]);
}

function increaseScore() {
    score++;
    if (score === levels[level + 1]) {
        level++;
        frameRate(frameRates[level]);
    }
}

function draw() {
    background(150);
    if (snake.isCollision()) {
        let gameTime = Date.now() - startTime;
        alert("GAME OVER! Score: " + score + " in time of " + parseGameTime());
        reset();
    }
    printScore();
    if (food) {
        food.draw();
    }
    if (eaten()) {
        increaseScore();
        snake.addSegment();
        generateFood();
    }
    snake.update();
    snake.show();
}

function parseGameTime() {
    let gameTimeSceonds = Math.floor((Date.now() - startTime) / 1000);
    if (gameTimeSceonds < 60) {
        return "" + gameTimeSceonds + " seconds.";
    } else {
        return "" + Math.floor(gameTimeSceonds / 60) + " minute(s) and " + Math.floor(gameTimeSceonds % 60) + " second(s)."
    }
}

function reset() {
    snake = new Snake();
    score = 0;
    level = 1;
    frameRate(frameRates[level]);
    generateFood();
    startTime = Date.now();
}

function eaten() {
    let dst = dist(snake.head.x, snake.head.y, food.x, food.y);
    return dst < 1;
}

function generateFood() {
    let cols = canvasWidth / speed;
    let rows = canvasHeight / speed;
    food = new Food(randomInt(0, cols) * speed, randomInt(0, rows) * speed);
}

function keyPressed() {
    let xDir, yDir;
    switch (keyCode) {
        case UP_ARROW:
            xDir = 0;
            yDir = -speed;
            break;
        case DOWN_ARROW:
            xDir = 0;
            yDir = speed;
            break;
        case LEFT_ARROW:
            xDir = -speed;
            yDir = 0;
            break;
        case RIGHT_ARROW:
            xDir = speed;
            yDir = 0;
            break;
        default:
            break;
    }
    snake.dir(xDir, yDir);
}

function randomInt(min, max) {
    return min + Math.floor((max - min) * Math.random());
}