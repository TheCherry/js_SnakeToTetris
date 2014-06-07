function GameField(y, x) {
	this.cellCountX = x;
	this.cellCountY = y;
	this.grid = [];
	this.currentBlock = null;
	this.doneBlocks = [];
	this.gridBackgroundColorColor = "transparent";

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
			td.defaultColor = "#FFFFFF";// this.gridBackgroundColorColor;
			row.push(td);
			tr.appendChild(td);
		}
		this.grid.push(row);
		tbody.appendChild(tr);
	}
	return table;
	};

	this.moveBlock = function() {
		var y  = this.currentBlock.horizontalDirection;
		var x  = this.currentBlock.verticalDirection;
		var el = this.currentBlock.getElement(0);

		x = el.x+x;
		y = el.y+y;
			
		x = x<0?this.cellCountX-1:x>=this.cellCountX?0:x;
		y = y<0?this.cellCountY-1:y>=this.cellCountY?0:y;	
		
		var cell = this.grid[x][y];
		this.currentBlock.moveTo( cell );
	};


	this.insertBlock = function() {		
		var cells = [ ]; 
		this.currentBlock = new Block(cells);
		var x = Math.rand(0,(11-this.currentBlock.matrix[0].length));

		var count = 0;
		for (var i=0; i < this.currentBlock.matrix.length; i++) {
			for (var j=0; j < this.currentBlock.matrix[0].length; j++) {
				if(this.currentBlock.matrix[i][j] == 1){
					cells[count] = this.grid[0+i][x+j];
					count++;
				}
			}
		}
		
		//this.currentBlock.setElement(cells);
		this.currentBlock.drawBlock();

		// this.currentBlock = new currentBlock( cells );
		
		//this.currentBlock.interval = window.setInterval(function() { self.moveSnake(); }, 5000);//this.snake.speed/speedLevel);
		this.currentBlock.interval = window.setInterval(function() { self.moveBlock(); }, 5000);
	};
	var self = this;

	this.table = this.initTable();
	this.insertBlock();
	if ((parEl = document.getElementById("tetris")) != null && parEl.appendChild(document.createTextNode("")))
		parEl.replaceChild(this.table, parEl.firstChild);
	else
		document.body.appendChild(this.table);
	
}