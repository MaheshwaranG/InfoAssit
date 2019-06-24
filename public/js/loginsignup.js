'use strict'

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