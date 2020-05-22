var segmentPositions = new HashSet();

class Snake {

	constructor() {
		this.tailIdx = 0;
		this.tail = [];
		this.tail.push(new SnakeSegment(0, 0, speed, 0));
		this.head = this.tail[0];
		segmentPositions = new HashSet();
	}

	addSegment() {
		let tailSeg = this.tail[this.tailIdx];
		let seg = new SnakeSegment(
			tailSeg.x - this.getSign(tailSeg.xspeed) * segSize,
			tailSeg.y - this.getSign(tailSeg.yspeed) * segSize,
			tailSeg.xspeed, tailSeg.yspeed
		);
		segmentPositions.add(new Position(seg.x, seg.y));
		this.tail[++this.tailIdx] = seg
	}

	isCollision() {
		if (this.tail.length === 1) {
			return false;
		}
		return segmentPositions.contains(new Position(this.head.x, this.head.y));
	}

	dir(x, y) {
		this.tail[0].xspeed = x;
		this.tail[0].yspeed = y;
	}

	update() {
		for (let i = 0; i < this.tail.length; ++i) {
			this.tail[i].update(i === 0);
		}
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

	update(isHead = false) {
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
		if (!isHead) {
			segmentPositions.delete(new Position(this.x, this.y));
			segmentPositions.add(new Position(newX, newY));
		}
		this.x = newX;
		this.y = newY;
	}

	show() {
		fill('rgb(0,255,0)');
		rect(this.x, this.y, segSize, segSize);
	}
}

class Position {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.h = null;
	}

	equals(object) {
		return object.x === this.x && object.y === this.y;
	}

	hashCode() {
		if (this.h == null) {
			this.h = 0;
			this.h += 31 * this.x;
			this.h += 31 * this.y;
		}
		return this.h;
	}
}