class Snake {

	constructor() {
		this.tailIdx = 0;
		this.tail = [];
		this.tail.push(new SnakeSegment(0, 0, speed, 0));
		this.head = this.tail[0];
	}

	addSegment() {
		let tailSeg = this.tail[this.tailIdx];
		let seg = new SnakeSegment(
			tailSeg.x - this.getSign(tailSeg.xspeed) * segSize,
			tailSeg.y - this.getSign(tailSeg.yspeed) * segSize,
			tailSeg.xspeed, tailSeg.yspeed
		);
		this.tail[++this.tailIdx] = seg
	}

	dir(x, y) {
		this.tail[0].xspeed = x;
		this.tail[0].yspeed = y;
	}

	update() {
		this.tail.forEach(seg => {
			seg.update();
		});
		this.shiftMoves();
	}

	shiftMoves() {
		for (let i = this.tail.length - 1; i > 0; --i) {
			this.tail[i].xspeed = this.tail[i - 1].xspeed;
			this.tail[i].yspeed = this.tail[i - 1].yspeed;
		}
	}

	show() {
		this.tail.forEach(seg => {
			seg.show();
		});
	}

	getSign(i) {
		if (i < 0) {
			return -1;
		} else if (i > 0) {
			return 1;
		} else {
			return 0;
		}
	}

}

class SnakeSegment {
	constructor(x, y, xspeed, yspeed) {
		this.x = x;
		this.y = y;
		this.xspeed = xspeed;
		this.yspeed = yspeed;
	}

	update() {
		let newX = this.x + this.xspeed;
		if (newX < 0) {
			newX = canvasWidth;
		} else if (newX > canvasWidth) {
			newX = 0;
		}
		let newY = this.y + this.yspeed;
		if (newY < 0) {
			newY = canvasHeight;
		} else if (newY > canvasHeight) {
			newY = 0;
		}
		this.x = newX;
		this.y = newY;
	}

	show() {
		fill(255);
		rect(this.x, this.y, segSize, segSize);
	}
}