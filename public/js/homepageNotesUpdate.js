'use strict'
///// Core logic

var oldNotes;
var oldheader;
var newNotes;
var newHeader;
function myFunction(event) {
  }

function notesView(event){
  var ECount = event["target"]["parentElement"]["parentElement"]["childElementCount"];
   var xhttp = new XMLHttpRequest();
   

  oldNotes = event["currentTarget"]["innerText"];
  //document.getElementById("demo").innerText = oldNotes;
  try{
  oldheader = event["target"]["children"][0]["innerText"];
  if(typeof oldheader == undefined || oldheader.trim() == "" ){
  oldheader = "Header ###";
 }
}
catch(err){
 
}
}

function notesUpdate(event){

  newNotes = event["currentTarget"]["innerText"];
 
  if(newNotes.localeCompare(oldNotes)!=0){
     loadDoc(event);
  }
}
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
        // divh.setAttribute("class","mg-notes-header");
        // ajaxUpdate["appendChild"](divh);

        var divc = document.createElement("div");
        divc.setAttribute("class","mg-notes-content");
        // ajaxUpdate["appendChild"](divc);
        // ajaxUpdate["children"][0]["innerText"] = obj['val']['header'];
        //var ajaxContentSplit = obj['val']['content'].trim().split("\n");
        // ajaxUpdate["children"][1]["innerText"] =obj['val']['content'];
        //Add innerHtml start
        var htmlcontent = `${obj['val']['extra1']}`
        ajaxUpdate["innerHTML"] = htmlcontent
        // h End
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
 var contentHtml;
 var appendTest =0;
 for(var i=1;i< event["target"]["children"]["length"];i++){
  // console.log(i);
  if(appendTest == 0){
  content += event["target"]["children"][i]["innerText"];
  //Add innerHtml
  // contentHtml += event["target"]["children"][i]["innerHtml"];
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
 var testH =event["target"]
  contentHtml = testH["innerHTML"];
                           
  xhttp.send(JSON.stringify({header:header, content:content,id:id,contentHtml:contentHtml}));
}


function addCard(event){

  var rowRoot = document.getElementById("mgRow"); 


  var createColum = document.createElement("div");
  createColum.setAttribute("class","mg-column");
  createColum.setAttribute("id","mgColumn");



  var rootFirst =rowRoot["firstElementChild"];
  // if(rootFirst == null){
  //   var cardNoteId = "0";
  // }
  // else{
  // var rootFirstCard = rootFirst["children"][0];
  // var cardNoteId = 1+parseInt(rootFirstCard["dataset"]["noteId"]);
  // }

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var obj = JSON.parse(xhttp.responseText);
       if(obj.error){
        window.location.reload();

       }
       else{

      var cardNoteId = obj.id;
      var cardId = "mgNotesCard-"+obj.id; 

      var divCard = document.createElement("div");
      divCard.setAttribute("class","mg-notes-card");
      divCard.setAttribute("id",cardId);
      divCard.setAttribute("contenteditable","true");
      divCard.setAttribute("onfocusout","notesUpdate(event)");
      divCard.setAttribute("onfocusin","notesView(event)");
      divCard.setAttribute("onpaste","myFunction(event)");
      divCard.setAttribute("data-note-id",cardNoteId);

      var divh = document.createElement("div");
              divh.setAttribute("class","mg-notes-header");
              divh['innerText'] = obj.header;
              divCard["appendChild"](divh);

              var divc = document.createElement("div");
              divc.setAttribute("class","mg-notes-content");
              divc['innerText'] = obj.content;
              divCard["appendChild"](divc);
      createColum["appendChild"](divCard);

      rowRoot["insertBefore"](createColum, rowRoot["childNodes"][0]);

      var noteFooter = document.createElement("div");
      noteFooter.setAttribute("class","mg-notes-card-footer");
      noteFooter.setAttribute("id","mgNotesCardFooter");
      var noteFooterDeleteSpan = document.createElement("span");
      noteFooterDeleteSpan.setAttribute("class","mg-icon-span");
      noteFooterDeleteSpan.setAttribute("onClick","deletenote(event)");
      var noteFooterDeleteIcon = document.createElement("I");
      noteFooterDeleteIcon.setAttribute("class","mg-small-icon-delete");
      noteFooterDeleteSpan["appendChild"](noteFooterDeleteIcon);

       var noteFooterExpandSpan = document.createElement("span");
      noteFooterExpandSpan.setAttribute("class","mg-icon-span");
      noteFooterExpandSpan.setAttribute("onClick","notesExpand(event)");
      var noteFooterExpandIcon = document.createElement("I");
      noteFooterExpandIcon.setAttribute("class","mg-small-icon-expand");
      noteFooterExpandSpan["appendChild"](noteFooterExpandIcon);


      noteFooter["appendChild"](noteFooterExpandSpan);
      noteFooter["appendChild"](noteFooterDeleteSpan);

      createColum["appendChild"](noteFooter);
    }
  }
  };
  xhttp.open("Post", "/createnote", true);
  xhttp.setRequestHeader("Content-type", "application/json");
  var header = "Header ###";
  var content ="Content ###";
                           
  xhttp.send(JSON.stringify({header:header, content:content,id:id}));

// createnote(event,cardNoteId);
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
function deletenote(event) {
   deleterootCol = event["currentTarget"]["parentNode"]["parentNode"];
  var divCard= deleterootCol["children"][0];
   deletecardNoteId = divCard['dataset']['noteId'];
  document.getElementById('delete-confirm').style.display='block';
  document.getElementById("mgHtmlBody").style.overflow = "hidden";
}


function deletenoteConfirm(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var obj = JSON.parse(xhttp.responseText);
      if(obj.error){
        window.location.reload();
       }
       else{
       document.getElementById('delete-confirm').style.display='none';
       document.getElementById("mgHtmlBody").style.overflow = "scroll";
      // document.getElementById('mgRow').style.maxWidth = '100%';
      // document.getElementById('mgMain').style.overflow = 'auto';
      // document.getElementById('new-add-notes').style.position = 'fixed';
      // document.getElementById('new-add-notes').style.zIndex = 5;
       
       }
       
    }
  };
  xhttp.open("Post", "/deletenote", true);
  xhttp.setRequestHeader("Content-type", "application/json");
  deleterootCol["remove"]();                  
  xhttp.send(JSON.stringify({id:deletecardNoteId}));
}

function deletenoteCancel(){
   deleterootCol = undefined;
   deletecardNoteId = undefined;
  document.getElementById('delete-confirm').style.display='none';
  document.getElementById("mgHtmlBody").style.overflow = "scroll";
  // document.getElementById('mgRow').style.maxWidth = '100%';
  // document.getElementById('mgMain').style.overflow = 'auto';
  // document.getElementById('new-add-notes').style.position = 'fixed';
  // document.getElementById('new-add-notes').style.zIndex = 5;
}

var expandId ;
function notesExpand(event){
  expandId = event.currentTarget.parentNode.parentNode.firstElementChild.dataset.noteId;
  document.getElementById('mgNotesExpandHeader').setAttribute('data-note-id',expandId);
  // document.getElementById('notesExpandBackground').style.display = 'block';
  document.getElementById('notesExpand').style.display = 'block';
  document.getElementById("mgHtmlBody").style.overflow = "hidden";

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
    var obj = JSON.parse(xhttp.responseText);
    document.getElementById('mgNotesExpandContent').innerText = obj.data.content;
    document.getElementById('mgNotesExpandHeader').innerText = obj.data.header;
    oldheader = document.getElementById('mgNotesExpandHeader').innerText;
    oldNotes = document.getElementById('mgNotesExpandContent').innerText
    if(oldheader.trim() == "" || typeof oldheader == undefined){
      oldheader = "Header ###";
    }
}
  }
  xhttp.open("post","/getNotes");
  xhttp.setRequestHeader("Content-type","application/json");
  xhttp.send(JSON.stringify({id:expandId}))

}

function checkPasteEvent(e,id){
  e.stopPropagation();
  e.preventDefault();
  document.getElementById(id).innerText += e.clipboardData.getData('Text');
}



function expandnoteCancelConfirmtoClose(){
   // document.getElementById('notesExpandBackground').style.display = 'none';
  document.getElementById('notesExpand').style.display = 'none';
  document.getElementById("mgHtmlBody").style.overflow = "scroll";
  // document.getElementById('mgRow').style.maxWidth = '100%';
  // document.getElementById('mgMain').style.overflow = 'auto';
  // document.getElementById('new-add-notes').style.position = 'fixed';
  // document.getElementById('new-add-notes').style.zIndex = 5;
  
  oldheader = '';
  oldNotes = '';
  newHeader = '';
  newNotes = '';
  expandId = '';
}

function expandnoteCancel(){
newHeader = document.getElementById('mgNotesExpandHeader').innerText;
 newNotes = document.getElementById('mgNotesExpandContent').innerText;
 if(newNotes.localeCompare(oldNotes)!=0 || oldheader.localeCompare(newHeader)!=0 ){
  var headerSetData = false;
  var noteSetData = false;
  if(typeof newHeader == undefined || newHeader.trim() == "" ){
  newHeader = oldheader;
  document.getElementById('mgNotesExpandHeader').innerText = newHeader;
  headerSetData = false;
 }
 else{
    headerSetData = true;
 }
 if( typeof newNotes == undefined || newNotes.trim() == "" ){
  newNotes = oldNotes;
  document.getElementById('mgNotesExpandContent').innerText = newNotes; 
  noteSetData = false;
 }
 else{
    noteSetData = true;
 }

 if(noteSetData || headerSetData){
    document.getElementById('Unsaved-data-confirm').style.display = 'block';
 }
 else{
  expandnoteCancelConfirmtoClose();
 }
}
else{
   expandnoteCancelConfirmtoClose();
  
 }


}

function expandnoteUnsavedConfirmationDialogCancel(){
  document.getElementById('Unsaved-data-confirm').style.display = 'none';
}

function expandUnsavedDataClose(){
  document.getElementById('Unsaved-data-confirm').style.display = 'none';
 expandnoteCancelConfirmtoClose();
  
}

var  UnsavedDataSave = 0;
function expandUnsavedDataSave(){
   UnsavedDataSave = 1;
  document.getElementById('Unsaved-data-confirm').style.display = 'none';
  expandNotesUpdate();
}

function expandNotesSave(event){
 newHeader = document.getElementById('mgNotesExpandHeader').innerText;
 newNotes = document.getElementById('mgNotesExpandContent').innerText;
 if(newNotes.localeCompare(oldNotes)!=0 || oldheader.localeCompare(newHeader)!=0 ){
  var headerSetData = false;
  var noteSetData = false;
  if(typeof newHeader == undefined || newHeader.trim() == "" ){
  newHeader = oldheader;
  document.getElementById('mgNotesExpandHeader').innerText = newHeader;
  headerSetData = false;
 }
 else{
    headerSetData = true;
 }
 if( typeof newNotes == undefined || newNotes.trim() == "" ){
  newNotes = oldNotes;
  document.getElementById('mgNotesExpandContent').innerText = newNotes; 
  noteSetData = false;
 }
 else{
    noteSetData = true;
 }

 if(noteSetData || headerSetData){
    expandNotesUpdate();
 }
 else{
  expandNoChangeContentSnackbar();
 }
}
else{
   expandNoChangeContentSnackbar();
  
 }

}

function expandNoChangeContentSnackbar(){
  var success = document.getElementById("snackbar");
  success.innerText = "No change's to save";
  success.className = "no-change";
  setTimeout(function(){ success.className = success.className.replace("no-change", ""); }, 3000);
}

function expandNotesUpdate(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function(){
    if(xhttp.readyState == 4 && xhttp.status == 200){
      var obj = JSON.parse(xhttp.responseText);
      oldheader = document.getElementById('mgNotesExpandHeader').innerText;
      oldNotes = document.getElementById('mgNotesExpandContent').innerText;
      var ajaxUpdate = document.getElementById("mgNotesCard-"+expandId);
      ajaxUpdate["children"][0]["innerText"] = obj['val']['header'];
      ajaxUpdate["children"][1]["innerText"] =obj['val']['content'];

      //expand save data notification
      if(obj['UnsavedDataSave'] == 1 ){
        expandnoteCancelConfirmtoClose();
        UnsavedDataSave = 0;
      }
      var success = document.getElementById("snackbar");
      success.innerText = "Data saved successfully ";
      success.className = "show";
      setTimeout(function(){ success.className = success.className.replace("show", ""); }, 3000);
    }
  }
   xhttp.open("Post", "/notesUpdateRequest", true);
  xhttp.setRequestHeader("Content-type", "application/json");
  if(UnsavedDataSave != 1){
    xhttp.send(JSON.stringify({header:newHeader, content:newNotes,id:expandId, UnsavedDataSave : 0}));
  }
  else{
    xhttp.send(JSON.stringify({header:newHeader, content:newNotes,id:expandId, UnsavedDataSave : 1}));
    
  }
}

function expandNotesDelete(event){
  document.getElementById('expand-delete-confirm').style.display='block';
}

function expanddeletenoteCancel(){
  document.getElementById('expand-delete-confirm').style.display='none';
}

function expanddeletenoteConfirm(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var obj = JSON.parse(xhttp.responseText);
      if(obj.error){
        expandId = '';
        window.location.reload();

       }
       else{
       document.getElementById('expand-delete-confirm').style.display='none';
       document.getElementById('notesExpand').style.display = 'none';
       // window.location.reload();
       }
       
    }
  };
  xhttp.open("Post", "/deletenote", true);
  xhttp.setRequestHeader("Content-type", "application/json"); 
  removeNoteById(expandId)
  xhttp.send(JSON.stringify({id:expandId}));
}

function removeNoteById(id){
  var mgRootRow = document.getElementById('mgRow');
  var mgRemoveNoteCard = document.getElementById('mgNotesCard-'+id);
  var mgNoteRemovechild = mgRemoveNoteCard.parentNode; 
  mgRootRow.removeChild(mgNoteRemovechild);
}

var oldSearchKey ;
function notesSearch(){
 var searchKey = document.getElementById("notesSearch").value;
 searchKey = searchKey.trim();
 // alert(searchKey);
 if(searchKey.localeCompare(oldSearchKey) != 0 ){
  oldSearchKey = searchKey; 
 var xhttp = new XMLHttpRequest();
 xhttp.onreadystatechange = function(){
  if(this.readyState == 4 && this.status == 200){
    var obj = JSON.parse(xhttp.responseText);
    // alert(obj);
    var removeRootNodes = document.getElementById("mgRow");
    while (removeRootNodes.firstChild) {
      removeRootNodes.removeChild(removeRootNodes.firstChild);
    }
    Object.keys(obj.data).forEach(function(key){
      // alert(obj.data[key].id);
      // Column Create
      var createColum = document.createElement("div");
      createColum.setAttribute("class","mg-column");
      createColum.setAttribute("id","mgColumn");
      var rootFirst =removeRootNodes["firstElementChild"];
      // Id
      var cardNoteId = obj.data[key].id;
      var cardId = "mgNotesCard-"+cardNoteId; 
      // Card Create
      var divCard = document.createElement("div");
      divCard.setAttribute("class","mg-notes-card");
      divCard.setAttribute("id",cardId);
      divCard.setAttribute("contenteditable","true");
      divCard.setAttribute("onfocusout","notesUpdate(event)");
      divCard.setAttribute("onfocusin","notesView(event)");
      divCard.setAttribute("onpaste","myFunction(event)");
      divCard.setAttribute("data-note-id",cardNoteId);

      var divh = document.createElement("div");
      divh.setAttribute("class","mg-notes-header");
      divh['innerText'] = obj.data[key].header;
      divCard["appendChild"](divh);

      var divc = document.createElement("div");
      divc.setAttribute("class","mg-notes-content");
      divc['innerText'] = obj.data[key].content;
      divCard["appendChild"](divc);
      createColum["appendChild"](divCard);

      // Footer Design
      var noteFooter = document.createElement("div");
      noteFooter.setAttribute("class","mg-notes-card-footer");
      noteFooter.setAttribute("id","mgNotesCardFooter");
      var noteFooterDeleteSpan = document.createElement("span");
      noteFooterDeleteSpan.setAttribute("class","mg-icon-span");
      noteFooterDeleteSpan.setAttribute("onClick","deletenote(event)");
      var noteFooterDeleteIcon = document.createElement("I");
      noteFooterDeleteIcon.setAttribute("class","mg-small-icon-delete");
      noteFooterDeleteSpan["appendChild"](noteFooterDeleteIcon);

      var noteFooterExpandSpan = document.createElement("span");
      noteFooterExpandSpan.setAttribute("class","mg-icon-span");
      noteFooterExpandSpan.setAttribute("onClick","notesExpand(event)");
      var noteFooterExpandIcon = document.createElement("I");
      noteFooterExpandIcon.setAttribute("class","mg-small-icon-expand");
      noteFooterExpandSpan["appendChild"](noteFooterExpandIcon);

      noteFooter["appendChild"](noteFooterExpandSpan);
      noteFooter["appendChild"](noteFooterDeleteSpan);

      createColum["appendChild"](noteFooter);

 removeRootNodes ["insertBefore"](createColum, removeRootNodes ["childNodes"][0]);
    });
  }
 }
 xhttp.open('post','/notesSearch');
 xhttp.setRequestHeader('Content-type','application/json');
 xhttp.send(JSON.stringify({searchKey:searchKey}));
}

}


// var string = "foo Mahesh",
//     expr = /oo mahesh/i;  // no quotes here
// expr.test(string);

// expanded data saved successfully

