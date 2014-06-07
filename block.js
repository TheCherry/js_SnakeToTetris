function Block () {
	if(this.polyominos !== null){
		// https://de.wikipedia.org/wiki/Tetris#Spielprinzip
		// https://de.wikipedia.org/wiki/Polyomino
		this.polyominos = new Array(7);
		this.polyominos[0] = {
			matrix: [
				[1,1,1,1]
			],
		color: "#41EDE9"
		};
		this.polyominos[1] = {
			matrix: [
				[1,0,0],
				[1,1,1]
			],
		};
		this.polyominos[2] = {
			matrix: [
				[0,0,1],
				[1,1,1]
			],
		color: "#F5AA0E"
		};
		this.polyominos[3] = {
			matrix: [
				[1,1],
				[1,1]
			],
		color: "#EDFA03"
		};
		this.polyominos[4] = {
			matrix: [ 
				[1,1,0], 
				[0,1,1]
			],
		color: "#49FA30"
		};
		this.polyominos[5] = {
			matrix: [
				[0,1,0], 
				[1,1,1]
			],
		color: "#E901FC"
		};
		this.polyominos[6] = {
			matrix: [
				[0,1,1], 
				[1,1,0]
			],
		color: "#F20006"
		};
	}
	tmp = Main.polyominos[Math.rand(0, 6)];
	this.matrix = tmp.matrix;
	this.color = tmp.color;


	this.elements = elements;
	this.interval = null;
	this.speed = 300;
	this.horizontalDirection = 0;
	this.verticalDirection   =  1;
	this.isKeyPressed = false;


	this.position = function(){
		this.x = 0;
		this.y = 0;
	};

	this.rotate = function(){
		// Converted C# Code from: 
		// https://stackoverflow.com/questions/4650762/programming-contest-question-counting-polyominos
		w = this.matrix.length;
		h = this.matrix[0].length;
		newMatrix = [];			
		for (var i=0; i < h; i++) {
			newMatrix[i] = [];
			for (var j=0; j < w; j++) {
				newMatrix[i][j] = this.matrix[w - j - 1][i];
			}
		}
		this.matrix = newMatrix;
	};
}

