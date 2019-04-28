//////////////////////////////////////////////////////////////////////////////////////
// Audio reactive code that associate audio frequency intensity from microphone with 
// size of circles. The circles takes the color from the art image in the background 
// Author: Elio Ramos 2018(aka garabatospr@instagram)
// Licensed under Creative Commons 0 Universal 1.0
// Public Domain. Feel free to do whatever you want with this code. 
// If you do use it,I would like to see what you did. 
// Send me an email to mecobi@gmail.com
//////////////////////////////////////////////////////////////////////////////////////

var img;

var mic, fft;

var circles = [];


///////////////////////////
// preload background image
///////////////////////////

function preload()
{
   img = loadImage('pride.png');
}


var temp;

/////////////////
// setup function
/////////////////

function setup()
{
  createCanvas(1000,800);

	image(img,0,0);
	
	// create circles..each one associated with a particular audio frequency band  
	
  for(var i=0;i < 1024;i++)
   {
      circles.push(new Circle());
   }

   //circles = circles.sort(function(a,b) {return a.hue - b.hue});

   mic = new p5.AudioIn();
   mic.start();
   mic.amp(0.5);
   fft = new p5.FFT(0.7,1024);
   fft.setInput(mic);
}

///////////////
// Circle class
///////////////

function Circle()
{
	  // assign random coordinates to circles 
	  this.x = random()*width;
    this.y = random()*height;
	  // initial diameter 
    this.diameter = 10;
	  // get color from random pixel in the background image 
	  this.color = img.get(this.x,this.y);
    this.display = function()
    {
        fill(this.color);
        ellipse(this.x,this.y,this.diameter,this.diameter);
    };
}


function draw() {

   image(img,0,0);

   var spectrum = fft.analyze();

   for(var i=0; i < 1024;i++)
   {
		  // associate audio frequency with diameter of annimated circle 
      var myDiam  = map(spectrum[i],0,255,0,50);
		  // for giggle motion  
      circles[i].x = circles[i].x + randomGaussian(0,myDiam/100.0);
      circles[i].y = circles[i].y + randomGaussian(0,myDiam/100.0);
      circles[i].diameter = floor(myDiam);
      circles[i].display();
   }

}