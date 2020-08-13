import p5 from 'p5'

class Ball {
	
	constructor(x, y, diameter, p) {
		this.p = p;
		this.initValues = {
			x: x,
			y: y,
			d: diameter
		}
		this.vec = p.createVector(x, y);
		this.diameter = diameter;
		this.radius = diameter / 2;
		this.velocity = p.createVector(1, 0);
	}

	isOutsideLeft() {
		return (this.vec.x < 0);
	}

	isOutsideRight() {
		return (this.vec.x > this.p.width);
	}

	throw() {
		this.vec.add(this.velocity);
	}

	refresh(x, y) {
		this.vec.set(x, y);
	}


	update(myPaddle, ennemyPaddle) {
		if (this.collides("right", ennemyPaddle) || this.collides("left", myPaddle))
		{
			let dir = 1;
			let paddle;
			if (this.collides("right", ennemyPaddle))
			{
				paddle = ennemyPaddle;
				this.velocity = p5.Vector.fromAngle(0, this.velocity.mag());
			}
			if (this.collides("left", myPaddle))
			{
				paddle = myPaddle;
				this.velocity = p5.Vector.fromAngle(this.p.PI, this.velocity.mag());
				dir = -1;
			}
			let value = this.vec.y - paddle.getCenterVec().y;
			let angle = this.p.HALF_PI / (paddle.h / 2) * (value - (paddle.h / 2)) + this.p.HALF_PI;
			this.velocity.rotate(angle * dir);
			this.velocity.x *= -1;
			this.velocity.mult(1 + 1 / 15);
		}
		if (this.vec.y + this.velocity.y + this.radius > this.p.height
		|| this.vec.y + this.velocity.y - this.radius < 0)
			this.velocity.y *= -1;
		this.vec.add(this.velocity);
	}

	collides(where, paddle) {
		if (this.vec.y - this.radius > paddle.vec.y
		&& this.vec.y + this.radius < paddle.vec.y + paddle.h) {
			if (where == "right") {
				if (this.vec.x + this.velocity.x + this.radius >= paddle.vec.x)
					return (true);
			}
			else if (where == "left") {
				if (this.vec.x + this.velocity.x - this.radius <= paddle.vec.x + paddle.w)
					return (true);
			}
		}
		return (false);
	}

	reset() {
		this.vec.set(this.initValues.x, this.initValues.y);
	}

	show() {
		this.p.circle(this.vec.x, this.vec.y, this.diameter);
	}

}

export default Ball;