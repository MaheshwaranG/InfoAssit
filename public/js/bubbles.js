'use strict'

// Bubble



var canvas = document.getElementById('mgBackgroundBubble');

var c = document.getElementById('mgBackgroundBubbleSignup');

var innerWidth = window.innerWidth;
var innerHeight = window.innerHeight;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d')
function Circle(x,y,dx,dy,radius){
	 innerWidth = window.innerWidth;
	 innerHeight = window.innerHeight;
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.draw = function (){
		c.beginPath();
		c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
		c.strokeStyle = '#fff';
		c.fillStyle = "#fff";
		c.fill();
		c.stroke();
	}
	this.update  = function() {
		if(this.x + this.radius >  innerWidth || this.x - this.radius < 0){
			this.dx = -this.dx;
		} 
		this.x += this.dx;
		if(this.y + this.radius >  innerHeight || this.y - this.radius < 0){
			this.dy = -this.dy;
		}
		this.y += this.dy;
		this.draw();
	}

}

var circleArray = [] ;

for(var i=0;i< 300 ; i++){
	var radius = (Math.random() * 5)%4;
	var x = Math.random() *(innerWidth-this.radius*2)+this.radius;
	var y = Math.random() * (innerHeight-this.radius*2)+this.radius;
	var dx = (Math.random() - 0.5);
	var dy = (Math.random() - 0.5);
	circleArray.push(new Circle(x,y,dx,dy,radius));
}

/////
var canvassu = document.getElementById('mgBackgroundBubbleSignup');

canvassu.width = window.innerWidth;
canvassu.height = window.innerHeight;
var cs = canvassu.getContext('2d')
function CircleSignUp(x,y,dx,dy,radius,circlePathRadius,circlePathAngle,movementSpeed){
	 innerWidth = window.innerWidth;
	 innerHeight = window.innerHeight;
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;

	this.circlePathRadius = circlePathRadius ;
	this.circlePathAngle = circlePathAngle;
	this.movementSpeed = movementSpeed;
	this.draw = function (){
		cs.beginPath();
		cs.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
		cs.strokeStyle = '#fff';
		cs.fillStyle = "#fff";
		cs.fill();
		cs.stroke();
	}
	this.update  = function() {
		 innerWidth = window.innerWidth;
	 innerHeight = window.innerHeight;
		
		// if(this.x + this.radius >  innerWidth || this.x - this.radius < 0){
		// 	this.dx = -this.dx;
		// } 
		// this.x += this.dx;
		// if(this.y + this.radius >  innerHeight || this.y - this.radius < 0){
		// 	this.dy = -this.dy;
		// }
		// this.y += this.dy;

		this.x = this.circlePathRadius * Math.cos(this.circlePathAngle)+(innerWidth/2);
		this.y = this.circlePathRadius * Math.sin(this.circlePathAngle)+(innerHeight/2);
		this.circlePathAngle += this.movementSpeed;

		this.draw();
	}

}

var circleArraySignup = [] ;

for(var i=0;i< 80 ; i++){
	var radius = (Math.random() * 5)%2;
	var x = Math.random() *(innerWidth-this.radius*2)+this.radius;
	var y = Math.random() * (innerHeight-this.radius*2)+this.radius;
	var dx = (Math.random() - 0.5);
	var dy = (Math.random() - 0.5);
	var pathCircle = Math.random() * (i+300) %2000;
	var pathAngle = (Math.random() * 10 ) %(i*20)+i;
	// var pathSpeed = (Math.random() - 0.5)*3;
	circleArraySignup.push(new CircleSignUp(x,y,dx,dy,radius,pathCircle,pathAngle,0.032));
}

var circlelinelength = 0;;

function bubbles(){
	requestAnimationFrame(bubbles);
	c.clearRect(0,0,innerWidth,innerHeight);
	for(var i=0;i< circleArray.length;i++){
		circleArray[i].update();
	}
	if(circlelinelength%200 == 0){
		circlelinelength = 0;
		cs.clearRect(0,0,innerWidth,innerHeight);
	}
	
	for(var i=0;i< circleArraySignup.length;i++){
		
			circleArraySignup[i].update();
		
		
	}
	circlelinelength++;
}

bubbles();
