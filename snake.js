	Math.rand = function(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	
	function getKeyCode(ev) {
		if (!ev) ev = window.event;
		if ((typeof(ev.which) == "undefined" || (typeof(ev.which) == "number" && ev.which == 0)) && typeof(ev.keyCode) == "number")
			return ev.keyCode;
		else	
			return ev.which;
	}

	function Snake(elements) {
		
		this.isAlive = true;
		this.elements = elements;
		this.colorAlive = "#FF9933";
		this.colorDeath = "#FF0000";
		this.colorHead  = "#EE6600";
		this.interval = null;
		this.speed = 300;
		this.horizontalDirection = 0;
		this.verticalDirection   =  1;
		this.isKeyPressed = false;
		
		this.length = function() {
			return this.elements.length;
		}
		
		this.contains = function( element ) {
			for (var i=0; i<this.length(); i++) 
				if (this.elements[i].x == element.x && this.elements[i].y == element.y)
					return true;
			return false;
		}
		
		this.initSnake = function() {
			for (var i=0; i<this.length(); i++)
				this.elements[i].style.backgroundColor = this.colorAlive;
		}
		
		this.dispatch = function() {
			this.isAlive = false;
			if (this.interval != null)
				window.clearInterval(this.interval);
			for (var i=0; i<this.length(); i++)
				this.elements[i].style.backgroundColor = this.colorDeath;
		}
		
		this.remove = function() {
			this.isAlive = false;
			if (this.interval != null)
				window.clearInterval(this.interval);
			for (var i=0; i<this.length(); i++)
				this.elements[i].style.backgroundColor = this.elements[i].defaultColor;
		}

		


		this.moveTo = function(newPos, isFoot){

			isFoot = isFoot || false;

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
		}
		var self = this;
		document.onkeydown = function(e){
			if (self.isKeyPressed)
				return;
			var kc = window.getKeyCode(e);
			// links
			if ((kc == 37 || kc == 65) && self.horizontalDirection == 0) {
				self.horizontalDirection = -1;
				self.verticalDirection = 0;
			}
			// hoch
			else if ((kc == 38 || kc == 87)) {
				this.rotate();
			}
			//rechts
			else if ((kc == 39 || kc == 68) && self.horizontalDirection == 0) {
				self.horizontalDirection = 1;
				self.verticalDirection = 0;
			}
			//runter
			else if ((kc == 40 || kc == 83) && self.verticalDirection == 0) {
				self.verticalDirection = 1;
				self.horizontalDirection = 0;
			}
			self.isKeyPressed = true;
		};

		
		this.getElement = function(i) {
			return this.elements[i];
		}
		
		this.initSnake();
	}
	
	function Crumb(element) {
		this.element = element;
		this.isEnable = false;
		this.color = "#006600";
		this.enabled = function(enable) {
			this.element.style.backgroundColor = (this.isEnable = enable)?this.color:this.element.defaultColor;
		}
		this.equalPosition = function( el ) {
			return (this.element.x == el.x && this.element.y == el.y)
		}
	}

	function Terrarium(y, x) {
		this.cellCountX = x;
		this.cellCountY = y;
		this.crumbCounter = 0;
		this.grid = [];
		this.snake = null;
		this.crumb = null;
		this.gridBackgroundColorColor = "transparent";



		this.initPolyominos = function() {
			// https://de.wikipedia.org/wiki/Tetris#Spielprinzip
			// https://de.wikipedia.org/wiki/Polyomino
			this.polyominos = new Array(7);
			this.polyominos[0] = {
				matrix: [
					[1,1,1,1]
				],
	    	color: "#41EDE9"
			}
			this.polyominos[1] = {
				matrix: [
					[1,0,0],
					[1,1,1]
				],
			}
			this.polyominos[2] = {
				matrix: [
					[0,0,1],
					[1,1,1]
				],
	    	color: "#F5AA0E"
			}
			this.polyominos[3] = {
				matrix: [
					[1,1],
					[1,1]
				],
	    	color: "#EDFA03"
			}
			this.polyominos[4] = {
				matrix: [ 
					[1,1,0], 
					[0,1,1]
				],
	    	color: "#49FA30"
			}
			this.polyominos[5] = {
				matrix: [
					[0,1,0], 
					[1,1,1]
				],
	    	color: "#E901FC"
			}
			this.polyominos[6] = {
				matrix: [
					[0,1,1], 
					[1,1,0]
				],
	    	color: "#F20006"
			}
		}

		this.rotate = function(){
			// Converted C# Code from: 
			// https://stackoverflow.com/questions/4650762/programming-contest-question-counting-polyominos
			w = this.currentStone.matrix.length
			h = this.currentStone.matrix[0].length
			newMatrix = [];			
			for (var i=0; i < h; i++) {
				newMatrix[i] = [];
				for (var j=0; j < w; j++) {
					newMatrix[i][j] = this.currentStone.matrix[w - j - 1][i];
				}
			}
			this.currentStone.matrix = newMatrix;
		}

		this.newStone = function(){
			this.currentStone = this.polyominos[Math.rand(0, 6)];
		}

		
		this.initTable = function() {
			var newGameFontWidth = 7;
			var table = document.createElement("table");
			var tbody = document.createElement("tbody");
			var thead = document.createElement("thead");
			var tfoot = document.createElement("tfoot");
			table.appendChild(tbody);
			table.appendChild(thead);
			table.appendChild(tfoot);
			
			var tr = document.createElement("tr");
			th = document.createElement("th");
			th.colSpan = this.cellCountY;
			th.appendChild( document.createTextNode("SNAKE JavaScript") );
			th.title = "SNAKE JavaScript stammt von derletztekick.com - diese Seite besuchen...";
			try { th.style.cursor = "pointer"; } catch(e){ th.style.cursor = "hand"; }
			th.onclick = function() { window.open("http://derletztekick.com", "_blank"); };
				
			tr.appendChild(th);
			thead.appendChild(tr);
			
			tr = document.createElement("tr");
			var td = document.createElement("td");
			td.colSpan = this.cellCountY-newGameFontWidth;
			td.appendChild( document.createTextNode("Counter: " + this.crumbCounter) );
			td.className = "left";
			tr.appendChild(td);
			td = document.createElement("td");
			td.colSpan = newGameFontWidth;
			td.className = "right";
			td.appendChild( document.createTextNode("Level: "));
			for (var i=1; i<4; i++) {
				var span = document.createElement("span");
				span.appendChild( document.createTextNode(i) );
				span.title = "Level " + span.firstChild.nodeValue;
				try { span.style.cursor = "pointer"; } catch(e){ span.style.cursor = "hand"; }
				span.onclick = function() {
					self.insertSnake( parseInt(this.firstChild.nodeValue) );
				}
				td.appendChild( span );
				if (i<3)
					td.appendChild( document.createTextNode(", "));
			}

			
			tr.appendChild(td);
			tfoot.appendChild(tr);
			
			for (var i=0; i<this.cellCountX; i++) {
				var tr = document.createElement("tr");
				var row = [];
				for (var j=0; j<this.cellCountY; j++) {
					var td = document.createElement("td");
					td.x = i;
					td.y = j;
					td.defaultColor = this.gridBackgroundColorColor;
					row.push(td);
					tr.appendChild(td);
				}
				this.grid.push(row);
				tbody.appendChild(tr);
			}
			return table;
		}
		
		this.updateCounter = function() {
			this.table.tFoot.rows[0].cells[0].firstChild.nodeValue = "Counter: " + (++this.crumbCounter) + " (" +
																	 ((this.snake!=null && this.crumbCounter>0)?(this.snake.length()*100/this.cellCount/this.cellCount).toFixed(0):"0") + "%)";
		}
		
		this.moveSnake = function() {
			var y  = this.snake.horizontalDirection;
			var x  = this.snake.verticalDirection;
			var el = this.snake.getElement(0);

			x = el.x+x;
			y = el.y+y;
				
			x = x<0?this.cellCountX-1:x>=this.cellCountX?0:x;
			y = y<0?this.cellCountY-1:y>=this.cellCountY?0:y;	
			
			var cell = this.grid[x][y];
			var isFoot = this.crumb != null && this.crumb.equalPosition( cell );
			this.snake.moveTo( cell, isFoot );
			if (isFoot) {
				this.setCrumb();
				this.updateCounter();
			}
		}
		
		this.setCrumb = function() {
			var x = Math.rand(0, this.cellCountX-1);
			var y = Math.rand(0, this.cellCountY-1);
			
			if (this.snake.contains( this.grid[x][y] ) )
				this.setCrumb();
			else {
				this.crumb = new Crumb( this.grid[x][y] );
				this.crumb.enabled(true);
			}
				
		}
		
		this.insertSnake = function(speedLevel) {
			this.initPolyominos();
			this.newStone();
			speedLevel = 100;
			var x = Math.rand(0,(11-this.currentStone.matrix[0].length));
			// var cells = [
			// 	this.grid[0][0],
			// 	this.grid[0][1], 
			// 	this.grid[1][1],
			// 	this.grid[1][2]
			// ];
			var cells = []
			var count = 0
			for (var i=0; i < this.currentStone.matrix.length; i++) {
				for (var j=0; j < this.currentStone.matrix[0].length; j++) {
					if(this.currentStone.matrix[i][j] == 1){
						cells[count] = this.grid[0+i][x+j];
						count++;
					}
				};
			};
			
			if (this.snake != null)
				this.snake.remove();
			this.crumbCounter = -1;
			this.updateCounter();
			
			this.snake = new Snake( cells );
			
			this.snake.interval = window.setInterval(function() { self.moveSnake(); }, 5000);//this.snake.speed/speedLevel);
		}
		var self = this;
		this.table = this.initTable();
		this.insertSnake();
		if ((parEl = document.getElementById("snake")) != null && parEl.appendChild(document.createTextNode("")))
			parEl.replaceChild(this.table, parEl.firstChild);
		else
			document.body.appendChild(this.table);
	
	
	}
	
	var DOMContentLoaded = false;
	function addContentLoadListener (func) {
		if (document.addEventListener) {
			var DOMContentLoadFunction = function () {
				window.DOMContentLoaded = true;
				func();
			};
			document.addEventListener("DOMContentLoaded", DOMContentLoadFunction, false);
		}
		var oldfunc = (window.onload || new Function());
		window.onload = function () {
			if (!window.DOMContentLoaded) {
				oldfunc();
				func();
			}
		};
	}
	
	if (document.getElementById && document.createElement)
		addContentLoadListener( function() { new Terrarium(11, 20); } );