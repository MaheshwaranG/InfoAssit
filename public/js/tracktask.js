'use strict'

var id="";
function loadDoc(event) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       var obj = JSON.parse(xhttp.responseText);
       //document.getElementById("demo1").innerHTML = obj['val']['content'];
       if(obj.error){
        window.location.reload();

       }
       else{
       var ajaxUpdate = document.getElementById("mgNotesCard-"+id);
       var elementLength = ajaxUpdate["children"]["length"];
       for(var removeid=0;removeid < elementLength; removeid++){
        ajaxUpdate.removeChild(ajaxUpdate["children"][0]);
       }
        var divh = document.createElement("div");
        divh.setAttribute("class","mg-notes-header");
        ajaxUpdate["appendChild"](divh);

        var divc = document.createElement("div");
        divc.setAttribute("class","mg-notes-content");
        ajaxUpdate["appendChild"](divc);
        ajaxUpdate["children"][0]["innerText"] = obj['val']['header'];
        //var ajaxContentSplit = obj['val']['content'].trim().split("\n");
        ajaxUpdate["children"][1]["innerText"] =obj['val']['content'];
        //for(var ajaxContentSplitCount =0; ajaxContentSplitCount<= ajaxContentSplit.length;ajaxContentSplitCount++){
          //ajaxUpdate["children"][1]["innerText"] = ajaxContentSplit[ajaxContentSplitCount];
          //ajaxUpdate["children"][1]["innerHTML"] += "<br/>";
          //console.log(ajaxUpdate["children"][1]["innerText"]+"   :::  "+ajaxContentSplitCount);
        //}

    }
  }
  };
  xhttp.open("Post", "/notesUpdateRequest", true);
  xhttp.setRequestHeader("Content-type", "application/json");
  try{
 var header = event["target"]["children"][0]["innerText"];
  if(header.trim() == ""){
  header = oldheader;
 }
}
catch(err){
}
 var content ="";
 var appendTest =0;
 for(var i=1;i< event["target"]["children"]["length"];i++){
  // console.log(i);
  if(appendTest == 0){
  content += event["target"]["children"][i]["innerText"];
  appendTest++;
}
else{
  content += "\n"+event["target"]["children"][i]["innerText"];
}
}
if(content.trim() == ""){
  content = "Content ###";
 }
 id = event["target"]["getAttribute"]("data-note-id");

                           
  xhttp.send(JSON.stringify({header:header, content:content,id:id}));
}





function createnote(event,id) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var obj = JSON.parse(xhttp.responseText);
       

    }
  };
  xhttp.open("Post", "/createnote", true);
  xhttp.setRequestHeader("Content-type", "application/json");
  var header = "Header ###";
  var content ="Content ###";
                           
  xhttp.send(JSON.stringify({header:header, content:content,id:id}));
}

var deleterootCol,deletecardNoteId;
function deletenoteEx(event) {
   deleterootCol = event["currentTarget"]["parentNode"]["parentNode"];
  var divCard= deleterootCol["children"][0];
   deletecardNoteId = divCard['dataset']['noteId'];
  document.getElementById('delete-confirm').style.display='block';
}

function addTask(event){
      document.getElementById('addNewTask').style.display = 'block';
      document.getElementById('mgRow').style.display = 'none';

}

function closeCreateTaskForm(){
  document.getElementById('addNewTask').style.display = 'none';
  document.getElementById('mgRow').style.display = 'flex';
}

var trackTaskEditId ;


function trackTaskView(event){
  trackTaskEditId = event.currentTarget.parentElement.parentElement.dataset.taskid;
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
      var obj = JSON.parse(xhttp.responseText);
      document.getElementById('ViewTask').style.display = 'block';
      document.getElementById('ViewTask').style.background = '#0fa087';
      document.getElementById('mgRow').style.display = 'none';
      document.getElementById('div-name').innerText = obj.name;
      document.getElementById('div-chMember').innerText = obj.chMember;
      document.getElementById('div-storyId').innerText = obj.storyId;
      document.getElementById('div-chStartDate').innerText = obj.chStartDate;
      document.getElementById('div-chEndDate').innerText = obj.chEndDate;

      document.getElementById('div-analysisStartDate').innerText = obj.analysisStartDate;
      document.getElementById('div-analysisEndDate').innerText = obj.analysisEndDate;
      document.getElementById('div-analysisMemComments').innerText = obj.analysisMemComments;

      document.getElementById('div-analysisLLRStartDate').innerText = obj.analysisLLRStartDate;
      document.getElementById('div-analysisLLREndDate').innerText = obj.analysisLLREndDate;
      document.getElementById('div-analysisLLRComments').innerText = obj.analysisLLRComments;

      document.getElementById('div-analysisQCStartDate').innerText = obj.analysisQCStartDate;
      document.getElementById('div-analysisQCEndDate').innerText = obj.analysisQCEndDate;
      document.getElementById('div-analysisQCComments').innerText = obj.analysisQCComments;

      document.getElementById('div-postChStartDate').innerText = obj.postChStartDate;
      document.getElementById('div-postChEndDate').innerText = obj.postChEndDate;
      document.getElementById('div-postChComments').innerText = obj.postChComments;

      document.getElementById('div-postChLLRStartDate').innerText = obj.postChLLRStartDate;
      document.getElementById('div-postChLLREndDate').innerText = obj.postChLLREndDate;
      document.getElementById('div-postChLLRComments').innerText = obj.postChLLRComments;

      document.getElementById('div-RRTEtartDate').innerText = obj.RRTEtartDate;
      document.getElementById('div-RRTEndDate').innerText = obj.RRTEndDate;
      document.getElementById('div-RRTComments').innerText = obj.RRTComments;

      document.getElementById('div-RRTLLReview').innerText = obj.RRTLLReview;
      document.getElementById('div-RRTLLEndDate').innerText = obj.RRTLLEndDate;
      document.getElementById('div-RRTLLComments').innerText = obj.RRTLLComments;

      document.getElementById('div-finalChStartDate').innerText = obj.finalChStartDate;
      document.getElementById('div-finalChEndDate').innerText = obj.finalChEndDate;
      document.getElementById('div-finalChComments').innerText = obj.finalChComments;

      document.getElementById('div-finalQCStartDate').innerText = obj.finalQCStartDate;
      document.getElementById('div-finalQCEndDate').innerText = obj.finalQCEndDate;
      document.getElementById('div-finalQCComments').innerText = obj.finalQCComments;


    }
  }
  xhttp.open('post','/trackTaskEditReq',true);
   xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify({id:trackTaskEditId}));

}




function trackTaskEdit(event){
  trackTaskEditId = event.currentTarget.parentElement.parentElement.dataset.taskid;
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
      var obj = JSON.parse(xhttp.responseText);
      document.getElementById('editTask').style.display = 'block';
      document.getElementById('editTask').style.background = '#07ad87';
      document.getElementById('mgRow').style.display = 'none';
      document.getElementById('name').value = obj.name;
      document.getElementById('chMember').value = obj.chMember;
      document.getElementById('storyId').value = obj.storyId;
      document.getElementById('chStartDate').value = obj.chStartDate;
      document.getElementById('chEndDate').value = obj.chEndDate;

      document.getElementById('analysisStartDate').value = obj.analysisStartDate;
      document.getElementById('analysisEndDate').value = obj.analysisEndDate;
      document.getElementById('analysisMemComments').value = obj.analysisMemComments;

      document.getElementById('analysisLLRStartDate').value = obj.analysisLLRStartDate;
      document.getElementById('analysisLLREndDate').value = obj.analysisLLREndDate;
      document.getElementById('analysisLLRComments').value = obj.analysisLLRComments;

      document.getElementById('analysisQCStartDate').value = obj.analysisQCStartDate;
      document.getElementById('analysisQCEndDate').value = obj.analysisQCEndDate;
      document.getElementById('analysisQCComments').value = obj.analysisQCComments;

      document.getElementById('postChStartDate').value = obj.postChStartDate;
      document.getElementById('postChEndDate').value = obj.postChEndDate;
      document.getElementById('postChComments').value = obj.postChComments;

      document.getElementById('postChLLRStartDate').value = obj.postChLLRStartDate;
      document.getElementById('postChLLREndDate').value = obj.postChLLREndDate;
      document.getElementById('postChLLRComments').value = obj.postChLLRComments;

      document.getElementById('RRTEtartDate').value = obj.RRTEtartDate;
      document.getElementById('RRTEndDate').value = obj.RRTEndDate;
      document.getElementById('RRTComments').value = obj.RRTComments;

      document.getElementById('RRTLLReview').value = obj.RRTLLReview;
      document.getElementById('RRTLLEndDate').value = obj.RRTLLEndDate;
      document.getElementById('RRTLLComments').value = obj.RRTLLComments;

      document.getElementById('finalChStartDate').value = obj.finalChStartDate;
      document.getElementById('finalChEndDate').value = obj.finalChEndDate;
      document.getElementById('finalChComments').value = obj.finalChComments;

      document.getElementById('finalQCStartDate').value = obj.finalQCStartDate;
      document.getElementById('finalQCEndDate').value = obj.finalQCEndDate;
      document.getElementById('finalQCComments').value = obj.finalQCComments;

      document.getElementById('id').value = trackTaskEditId;

    }
  }
  xhttp.open('post','/trackTaskEditReq',true);
   xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify({id:trackTaskEditId}));
}

function closeEditForm(){
  document.getElementById('editTask').style.display = 'none';
  document.getElementById('mgRow').style.display = 'flex';
}

function closeViewForm(){
  document.getElementById('ViewTask').style.display = 'none';
  document.getElementById('mgRow').style.display = 'flex';
}

var deleteTaskId;
function trackTaskDelete(event){
  
  deleteTaskId = event.currentTarget.parentElement.parentElement.dataset.taskid;
  document.getElementById('delete-confirm').style.display='block';
  document.getElementById('mgMain').style.position = 'fixed' ;
}

function deleteTaskConfirm(){


  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var obj = JSON.parse(xhttp.responseText);
        window.location.reload();
    }
  };
  xhttp.open("Post", "/deleteTask", true);
  xhttp.setRequestHeader("Content-type", "application/json");                 
  xhttp.send(JSON.stringify({id:deleteTaskId}));
}

function deleteTaskCancel(){
  document.getElementById('delete-confirm').style.display='none';
  document.getElementById('mgMain').style.position = '' ;
}