const canvasWidth = 400;
const canvasHeight = 400;
const speed = 10;
var snake;
var food;

class Food {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	draw() {
		fill(0);
		rect(this.x, this.y, 10, 10);
	}
}

function setup() {
	frameRate(10);
	createCanvas(canvasWidth, canvasHeight);
	reset();
}

function draw() {
	background(150);
	if (food) {
		food.draw();
	}
	if (eaten()) {
		console.log("EATEN");
		snake.addSegment();
		generateFood();
	}
	snake.update();
	snake.show();
}

function reset() {
	snake = new Snake();
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