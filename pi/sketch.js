//////////////////////////////////////////////////////////////////////////////////////////////////
// Digits of pi represented as geometrical figures
//
// Author: Elio Ramos 2018(aka garabatospr@instagram)
//
// http://www.openprocessing.org/sketch/557904
// Licensed under Creative Commons Attribution
// ShareAlike https://creativecommons.org/licenses/by-sa/3.0
// https://creativecommons.org/licenses/GPL/2.0/
// Feel free to do whatever you want with this code.
// If you do use it,I would like to see what you did.
// Send me an email to mecobi@gmail.com
//
//
//////////////////////////////////////////////////////////////////////////////////////////////////

var datos;

var digits = [];

var inx = 0;

var shapeSizeX = 50;
var shapeSizeY = 50;


// maximum number of iterations

var maxIter = 10000;

function preload() {

	// read file with 100000 digits of pi

	datos = loadStrings("pi1000000.txt");
}

/////////////////
// setup function
/////////////////


function setup() {

	createCanvas(700, 700);

	background(255);

	rectMode(CENTER);

	for (var i = 0; i < (datos[0].length) - 2; i++) {
		digits.push((int)(datos[0].charAt(i + 2)));
	}

}



function draw() {

	if (inx > maxIter) {
		noLoop();
	}

	// coordinates

	var xPos = floor(map(digits[inx], 0, 9, shapeSizeX, width - shapeSizeX));
	var yPos = floor(map(digits[inx + 1], 0, 9, shapeSizeY, height - shapeSizeY));

	console.log([xPos, yPos]);

	// size

	var sizeX = floor(map(digits[inx + 2], 0, 9, 0, shapeSizeX));
	var sizeY = floor(map(digits[inx + 3], 0, 9, 0, shapeSizeY));

	// color

	var red = map(digits[inx + 4], 0, 9, 0, 200);
	var green = map(digits[inx + 5], 0, 9, 0, 200);
	var blue = map(digits[inx + 6], 0, 9, 0, 200);

	fill(red, green, blue);

	rect(xPos, yPos, sizeX, sizeY);

	inx += 7;

}
