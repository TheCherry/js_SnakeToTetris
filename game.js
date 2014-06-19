Math.rand = function(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

function matrixRun (matrix, func){
	for (var i=0; i<matrix[0].length; i++)
		for (var ii=0; ii<matrix[i].length; ii++)
			return func(matrix[i][ii], i, ii);
}

function getKeyCode(ev) {
	if (!ev) ev = window.event;
	if ((typeof(ev.which) == "undefined" || (typeof(ev.which) == "number" && ev.which === 0)) && typeof(ev.keyCode) == "number")
		return ev.keyCode;
	else	
		return ev.which;
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
	addContentLoadListener( function() { new GameField(11, 20); } );
