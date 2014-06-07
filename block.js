function Block (grid) {
	if(this.polyominos == null){
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
		color: "#1B0AC3"
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
	ret = this.polyominos[Math.rand(0, 6)];
	this.matrix = ret.matrix;
	this.color = ret.color;

	this.x = 0;
	this.y = 0;

	this.grid = grid;
	this.elements = [];
	this.interval = null;
	this.horizontalDirection = 0;
	this.verticalDirection   =  1;
	this.isKeyPressed = false;

	this.getElement = function(i) {
		return this.elements[i];
	};

	this.setElement = function(newElements){
		this.elements = newElements;
	};

	this.moveTo = function(newPos){

		var canMove = !this.contains(newPos)?true:this.elements[this.length()-1].x==newPos.x&&this.elements[this.length()-1].y==newPos.y?true:false;
		
		canMove = canMove || this.horizontalDirection != 0 && this.verticalDirection != 0;
		if (!this.isAlive || !canMove) {
			this.dispatch();
			return;
		}			
		
		var newElements = [];
		newElements.push(newPos);

		for (var i=0; i<this.length(); i++) {
			this.elements[i].style.backgroundColor = this.colorAlive;
			if (i<this.length()-1)
				newElements.push( this.elements[i] );
			else if (i==this.length()-1 && isFoot)
				newElements.push( this.elements[this.length()-1] );
			else
				this.elements[this.length()-1].style.backgroundColor = this.elements[this.length()-1].defaultColor;
		}
		newPos.style.backgroundColor = this.colorHead;
		this.elements = newElements;
		this.isKeyPressed = false;
	};
	var self = this;
	

	this.drawBlock = function() {
		this.elements = [];	
		var count = 0;
		for (var i=0; i < this.matrix.length; i++) {
			for (var j=0; j < this.matrix[0].length; j++) {
				if(this.matrix[i][j] == 1){
					this.elements[count] = this.grid[this.y+i][this.x+j];
					count++;
				}
			}
		}
		for (var i=0; i<this.length(); i++)
				this.elements[i].style.backgroundColor = this.color;
	};

	this.contains = function( element ) {
		for (var i=0; i<this.length(); i++) 
			if (this.elements[i].x == element.x && this.elements[i].y == element.y)
				return true;
		return false;
	};

	this.dispatch = function() {
		this.isAlive = false;
		if (this.interval !== null)
			window.clearInterval(this.interval);
		for (var i=0; i<this.length(); i++)
			this.elements[i].style.backgroundColor = this.colorDeath;
	};
	
	this.remove = function() {
		for (var i=0; i<this.length(); i++)
			this.elements[i].style.backgroundColor = this.elements[i].defaultColor;
	};

	this.length = function() {
			return this.elements.length;
	};
		


	this.position = function(){
		
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

