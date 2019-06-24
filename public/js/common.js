'use strict'
/// User  profile popup
function userProfilePopup(){
  var popup = document.getElementById("myPopup");
    // popup.classList.toggle("show");
    popup.style.visibility = "visible"
}


window.onclick = function(event) {
    var popup = document.getElementById("myPopup");
    var eventType = event.target.id; 
    switch(eventType){
      case "mgAvatar":
      case "nav-profile-label":
      case "myPopup":
        popup.style.visibility = "visible"
         break;
      default:
        popup.style.visibility = "hidden"
    }
    
}

