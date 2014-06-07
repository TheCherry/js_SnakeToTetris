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

	document.onkeydown = function(e){
		if (self.isKeyPressed)
			return;
		var kc = window.getKeyCode(e);
		// links
		if ((kc == 37 || kc == 65)) {

		}
		// hoch
		else if ((kc == 38 || kc == 87)) {
			self.currentBlock.rotate();
		}
		//rechts
		else if ((kc == 39 || kc == 68)) {

		}
		//runter
		else if ((kc == 40 || kc == 83)) {
		}
		self.isKeyPressed = true;
	};

	this.moveBlock = function() {
		var x = this.currentBlock.x;
		var y = this.currentBlock.y+1;
		if(y+this.currentBlock.matrix.length < this.cellCountX+1){
			this.currentBlock.remove();

			this.currentBlock.x = x;
			this.currentBlock.y = y;

			this.currentBlock.drawBlock();
		} else {
			this.insertBlock();
		}
		self.isKeyPressed = false;
	};


	this.insertBlock = function() {
		if(this.currentBlock != null){
			clearInterval(this.currentBlock.interval);
		}
		this.currentBlock = new Block(this.grid);
		this.currentBlock.x = Math.rand(0,(11-this.currentBlock.matrix[0].length));
		this.currentBlock.rotate();
		this.currentBlock.drawBlock();

		this.currentBlock.interval = window.setInterval(function() { self.moveBlock(); }, 200);
	};
	var self = this;
	this.isKeyPressed = false;
	this.table = this.initTable();
	this.insertBlock();
	if ((parEl = document.getElementById("tetris")) != null && parEl.appendChild(document.createTextNode("")))
		parEl.replaceChild(this.table, parEl.firstChild);
	else
		document.body.appendChild(this.table);
	
}