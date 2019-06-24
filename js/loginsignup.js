'use strict'

// Bubble

var canvas = document.getElementById('mgBackgroundBubble');

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
	console.log(x+'  '+  y+ '  ' + dx + '  ' + dy+'  '+radius );
	circleArray.push(new Circle(x,y,dx,dy,radius));
}

function bubbles(){
	requestAnimationFrame(bubbles);
	c.clearRect(0,0,innerWidth,innerHeight);
	for(var i=0;i< circleArray.length;i++){
		circleArray[i].update();
	}
}

bubbles();


/// Designs
var testuser = 1;
function openSignupForm(event){
	document.getElementById('singupForm').style.display='block';
	document.getElementById('loginForm').style.display='none';

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			var res = JSON.parse(xhttp.responseText);
			var role = res.role;
			Object.keys(role).forEach(function(key){

				var select = document.getElementById("user-role");
    			select.options[select.options.length] = new Option(role[key], key, false, false);
			})
		}
	}
	xhttp.open('post','/userroledetection',true);
	xhttp.setRequestHeader('Content-Type','application/json');
	xhttp.send();
}

function closeSignupForm(){
	document.getElementById('singupForm').style.display='none';
	document.getElementById('loginForm').style.display='block';
}


function validation(event){
	var username = document.getElementById('username').value;
	var password = document.getElementById('password').value;
	var Repass = document.getElementById('psw-repeat').value;

	if(testuser === 0){
		return false;
	}
	if(testuser === 0 || password !== Repass){
		if(password !== Repass){
		document.getElementById('signup-error-text').innerText = "Entered mismatch password's ";
	}	
	if(testuser === 0 )	{
		document.getElementById('user-signup-error-text').innerText = "Domain name already Exist!!!";
	}	
		return false;
	}
	document.getElementById('signup-error-text').innerText = "";
	return true;
}

function passCheck(){
	var password = document.getElementById('password').value;
	var Repass = document.getElementById('psw-repeat').value;
	if(password !== Repass){
		document.getElementById('signup-error-text').innerText = "Entered mismatch password's ";
	}
	else{
		document.getElementById('signup-error-text').innerText = "";
	}
}

function userValidate(){
	var username = document.getElementById('username').value;
	if(typeof username != 'undefined' && username.trim() !== ''){
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function(){
			if(this.readyState == 4 && this.status == 200){
				var res = JSON.parse(xhttp.responseText);
				if(res['res'] == 0){
					document.getElementById('user-signup-error-text').innerText = "Domain name already Exist!!!";
					testuser = 0;
					return false;
				}
				else{
					document.getElementById('user-signup-error-text').innerText = "";
					testuser = 1;

				}
			}
		}
		xhttp.open('Post','/userverification',false);
		xhttp.setRequestHeader('Content-Type','application/json');
		xhttp.send(JSON.stringify({username:username}));
	}
}


function registrationSuccessHide(){
	document.getElementById('success-register').style.display='none';
	document.getElementById('loginForm').style.display='block';
}

function statusCheck(status){
    document.getElementById('loginForm').style.display='none';
}