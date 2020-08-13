import p5 from 'p5'
import Game from './Game'

const s = ( p ) => {

	let game = new Game();
 
	p.setup = function() {
		p.cnv = p.createCanvas(600, 600);
		p.background(0);
		p.cnv.id("game");
		game.init(p);
  	};

  	p.draw = function() {
		p.clear();
		p.background(0);
		p.handleKeys();
		game.show();
  	};

  	p.handleKeys = function() {
		if (game.status == "running")
		{
		 	if (p.keyIsDown(87))
				game.player1.paddle.goUp();
			if (p.keyIsDown(83))
				game.player1.paddle.goDown();
			if (p.keyIsDown(p.UP_ARROW))
				game.player2.paddle.goUp();
			if (p.keyIsDown(p.DOWN_ARROW))
				game.player2.paddle.goDown();
		}
 	};

	p.mouseClicked = function() {
		game.clickedStart();
	};
};

let sketch = new p5(s);