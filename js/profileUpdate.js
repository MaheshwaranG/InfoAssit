'use strict'
function validation(e){
	e.preventDefault();

	var email = document.forms['profileUpdate']['email'].value;
	var empId = document.forms['profileUpdate']['empId'].value;
	var department = document.forms['profileUpdate']['userRole'].value;
	// console.log(email+'  '+empId+'   '+department);

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			// console.log(xhttp.responseText);
			var res = JSON.parse(xhttp.responseText);
			// console.log(res.code);
			var success = document.getElementById("snackbar");
			if(res.code==1){	
				success.className = "show";
				setTimeout(function(){ success.className = success.className.replace("show", ""); }, 3000);
			}
			else{
				success.innerText = "Error in Update";
				success.className = "error";
				setTimeout(function(){ success.className = success.className.replace("error", ""); }, 3000);
			}
		}
	}
	xhttp.open('post','/profileUpdate');
	xhttp.setRequestHeader('content-type','application/json');
	xhttp.send(JSON.stringify({email:email,empId:empId,department:department}))

}