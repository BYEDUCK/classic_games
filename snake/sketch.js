const canvasWidth = 396;
const canvasHeight = 396;
const speed = 12;
const segSize = 12;
const levels = [0, 0, 10, 30, 60, 100];
const frameRates = [0, 10, 15, 25, 35, 45];

var level;
var snake;
var food;
var score;

class Food {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	draw() {
		fill(0);
		rect(this.x, this.y, segSize, segSize);
	}
}

function printScore() {
	textSize(20);
	text('level: ' + level + ' score: ' + score, 10, canvasHeight + 25);
	fill(0, 102, 153);
}

function setup() {
	frameRate(10);
	createCanvas(canvasWidth, canvasHeight + 50);
	reset();
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

function reset() {
	snake = new Snake();
	score = 0;
	level = 1;
	generateFood();
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