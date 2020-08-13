import Player from './Player'
import Paddle from './Paddle'
import Ball from './Ball'

class Game {
	
	constructor(){
		this.status = "start",
		this.winner = null,
		this.player1 = null,
		this.player2 = null,
		this.ball = null
	}

	setPlayers(player1, player2){
		this.player1 = player1;
		this.player2 = player2;
	}
	
	setBall(ball){
		this.ball = ball;
	}

	init(p){
		this.p = p;
		this.startButton = {
			x: p.width / 3,
			y: p.height / 2 - p.height / 12,
			w: p.width / 3,
			h: p.height / 6
		};
		let offset = 2;

		let paddleW = this.p.width / 50;
		let paddleH = this.p.height / 6;
		let ballD = paddleH / 6;
		var myPaddleX = offset;
		var myPaddleY = this.p.height / 2 - paddleH;
		var ennemyPaddleX = this.p.width -  paddleW - offset;
		var ennemyPaddleY = this.p.height / 2 - paddleH;
		var ballX = myPaddleX + paddleW + ballD / 2;
		var ballY = myPaddleY + paddleH / 2;

		let me = new Player();
		me.paddle = new Paddle(myPaddleX, myPaddleY, paddleW, paddleH, this.p);
		let ennemy = new Player();
		ennemy.paddle = new Paddle(ennemyPaddleX, ennemyPaddleY, paddleW, paddleH, this.p);
		let ball = new Ball(ballX, ballY, ballD, this.p);

		this.setPlayers(me, ennemy);
		this.setBall(ball);
	}

	start(){
		this.player1.paddle.reset();
		this.player1.paddle.setVelocity(5);

		this.player2.paddle.reset();
		this.player2.paddle.setVelocity(5);

		this.ball.reset();
		this.ball.velocity.set(3, this.p.random(-this.p.HALF_PI, this.p.HALF_PI));
		this.status = "running";
	}

	getWinner(){
		if (this.player1.points > this.player2.points)
			this.winner = this.player1;
		else
			this.winner = this.player2;
	}

	clickedStart(){
		if (this.p.mouseX > this.startButton.x && this.p.mouseX < this.startButton.x + this.startButton.w)
		{
			if (this.p.mouseY > this.startButton.y && this.p.mouseY < this.startButton.y + this.startButton.h)
			{
				if (this.status == "start")
					this.start();
				else if (this.status == "end")
				{
					this.init(this.p, "play");
					this.start();
				}
			}
		}
	}

	stop(){
		this.getWinner();
		this.status = "end";
	}

	showScore(){
		this.p.textSize(32);
		this.p.textAlign(this.p.LEFT);
		this.p.text(this.player1.login + " : " + this.player1.points.toString(), 30, 30);
		this.p.textAlign(this.p.RIGHT);
		this.p.text(this.player2.login + " : " + this.player2.points.toString(), this.p.width - 30, 30);
		this.p.fill(255);
	}

	show(){
		if (this.status == "start")
		{
			this.p.rect(this.startButton.x, this.startButton.y, this.startButton.w, this.startButton.h);
			this.p.fill(0);
			this.p.textSize(100);
			this.p.textAlign(this.p.LEFT);
			this.p.text("PLAY", this.startButton.x, this.startButton.y + 100);
			this.p.fill(125);
		}
		else if (this.status == "running")
		{
			this.ball.update(this.player1.paddle, this.player2.paddle);
			this.player1.paddle.show();
			this.player2.paddle.show();
			this.ball.show();
			this.showScore();
			if (this.gameChannel)
			{
				this.gameChannel.send({ 
					ballX: this.ball.vec.x, 
					ballY: this.ball.vec.y,
					paddle1X: this.player1.paddle.vec.x,
					paddle1Y: this.player1.paddle.vec.y,
					paddle2X: this.player2.paddle.vec.x,
					paddle2Y: this.player2.paddle.vec.y,
					points1: this.player1.points,
					points2: this.player2.points,
					player1: this.player1.login,
					player2: this.player2.login
				});
			}

			if (this.ball.isOutsideLeft() || this.ball.isOutsideRight())
			{
				if (this.ball.isOutsideLeft())
					this.player2.points += 1;
				if (this.ball.isOutsideRight())
					this.player1.points += 1;
				if (this.player1.points >= 5 || this.player2.points >= 5)
					this.stop();
				else
					this.start();
			}
		}

		else if (this.status == "end")
		{
			if (this.winner == this.player1)
				var endText = "Player 1 wins !";
			else
				var endText = "Player 2 wins !";
			this.p.textSize(50);
			this.p.textAlign(this.p.LEFT);
			this.p.text(endText, this.startButton.x, 100);
			this.p.fill(255);
			this.p.rect(this.startButton.x, this.startButton.y, this.startButton.w, this.startButton.h);
			this.p.fill(0);
			this.p.textSize(30);
			this.p.textAlign(this.p.LEFT);
			this.p.text("PLAY AGAIN", this.startButton.x, this.startButton.y + 30);
			this.p.fill(125);
		}
	}
}

export default Game;