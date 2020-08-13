class Paddle {

	constructor(x, y, w, h, p) {
		this.p = p;
		this.initValues = {
			x: x,
			y: y,
			w: w,
			h: h
		}
		this.vec = p.createVector(x, y);
		this.velocity = p.createVector(0, 1);
		this.w = w;
		this.h = h;
	}

	getCenterVec() {
		return (this.p.createVector(this.vec.x + this.w / 2, this.vec.y + this.h / 2));
	}

	setVelocity(y) {
		this.velocity.y = y;
	}

	goUp() {
		let offset = 2;
		if (this.vec.y - this.velocity.y > offset)
			this.vec.sub(this.velocity);
	}

	goDown() {
		let offset = 2;
		if (this.vec.y + this.velocity.y < this.p.height - this.h - offset)
			this.vec.add(this.velocity);
	}
	
	reset() {
		this.vec.set(this.initValues.x, this.initValues.y);
	}

	refresh(x, y) {
		this.vec.set(x, y);
	}

	show() {
		this.p.rect(this.vec.x, this.vec.y, this.w, this.h);
	}

}

export default Paddle;