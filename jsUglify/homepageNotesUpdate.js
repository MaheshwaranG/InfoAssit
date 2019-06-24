"use strict";function myFunction(e){}function notesView(e){e.target.parentElement.parentElement.childElementCount,new XMLHttpRequest;oldNotes=e.currentTarget.innerText;try{oldheader=e.target.children[0].innerText,(void 0==typeof oldheader||""==oldheader.trim())&&(oldheader="Header ###")}catch(t){}}function notesUpdate(e){newNotes=e.currentTarget.innerText,0!=newNotes.localeCompare(oldNotes)&&loadDoc(e)}function loadDoc(e){var t=new XMLHttpRequest;t.onreadystatechange=function(){if(4==this.readyState&&200==this.status){var e=JSON.parse(t.responseText);if(e.error)window.location.reload();else{for(var n=document.getElementById("mgNotesCard-"+id),a=n.children.length,d=0;a>d;d++)n.removeChild(n.children[0]);var o=document.createElement("div");o.setAttribute("class","mg-notes-header"),n.appendChild(o);var r=document.createElement("div");r.setAttribute("class","mg-notes-content"),n.appendChild(r),n.children[0].innerText=e.val.header,n.children[1].innerText=e.val.content}}},t.open("Post","/notesUpdateRequest",!0),t.setRequestHeader("Content-type","application/json");try{var n=e.target.children[0].innerText;""==n.trim()&&(n=oldheader)}catch(a){}for(var d="",o=0,r=1;r<e.target.children.length;r++)0==o?(d+=e.target.children[r].innerText,o++):d+="\n"+e.target.children[r].innerText;""==d.trim()&&(d="Content ###"),id=e.target.getAttribute("data-note-id"),t.send(JSON.stringify({header:n,content:d,id:id}))}function addCard(e){var t=document.getElementById("mgRow"),n=document.createElement("div");n.setAttribute("class","mg-column"),n.setAttribute("id","mgColumn");var a=(t.firstElementChild,new XMLHttpRequest);a.onreadystatechange=function(){if(4==this.readyState&&200==this.status){var e=JSON.parse(a.responseText);if(e.error)window.location.reload();else{var d=e.id,o="mgNotesCard-"+e.id,r=document.createElement("div");r.setAttribute("class","mg-notes-card"),r.setAttribute("id",o),r.setAttribute("contenteditable","true"),r.setAttribute("onfocusout","notesUpdate(event)"),r.setAttribute("onfocusin","notesView(event)"),r.setAttribute("onpaste","myFunction(event)"),r.setAttribute("data-note-id",d);var s=document.createElement("div");s.setAttribute("class","mg-notes-header"),s.innerText=e.header,r.appendChild(s);var i=document.createElement("div");i.setAttribute("class","mg-notes-content"),i.innerText=e.content,r.appendChild(i),n.appendChild(r),t.insertBefore(n,t.childNodes[0]);var l=document.createElement("div");l.setAttribute("class","mg-notes-card-footer"),l.setAttribute("id","mgNotesCardFooter");var c=document.createElement("span");c.setAttribute("class","mg-icon-span"),c.setAttribute("onClick","deletenote(event)");var m=document.createElement("I");m.setAttribute("class","mg-small-icon-delete"),c.appendChild(m);var p=document.createElement("span");p.setAttribute("class","mg-icon-span"),p.setAttribute("onClick","notesExpand(event)");var u=document.createElement("I");u.setAttribute("class","mg-small-icon-expand"),p.appendChild(u),l.appendChild(p),l.appendChild(c),n.appendChild(l)}}},a.open("Post","/createnote",!0),a.setRequestHeader("Content-type","application/json");var d="Header ###",o="Content ###";a.send(JSON.stringify({header:d,content:o,id:id}))}function createnote(e,t){var n=new XMLHttpRequest;n.onreadystatechange=function(){if(4==this.readyState&&200==this.status){JSON.parse(n.responseText)}},n.open("Post","/createnote",!0),n.setRequestHeader("Content-type","application/json");var a="Header ###",d="Content ###";n.send(JSON.stringify({header:a,content:d,id:t}))}function deletenote(e){deleterootCol=e.currentTarget.parentNode.parentNode;var t=deleterootCol.children[0];deletecardNoteId=t.dataset.noteId,document.getElementById("delete-confirm").style.display="block",document.getElementById("mgHtmlBody").style.overflow="hidden"}function deletenoteConfirm(){var e=new XMLHttpRequest;e.onreadystatechange=function(){if(4==this.readyState&&200==this.status){var t=JSON.parse(e.responseText);t.error?window.location.reload():(document.getElementById("delete-confirm").style.display="none",document.getElementById("mgHtmlBody").style.overflow="scroll")}},e.open("Post","/deletenote",!0),e.setRequestHeader("Content-type","application/json"),deleterootCol.remove(),e.send(JSON.stringify({id:deletecardNoteId}))}function deletenoteCancel(){deleterootCol=void 0,deletecardNoteId=void 0,document.getElementById("delete-confirm").style.display="none",document.getElementById("mgHtmlBody").style.overflow="scroll"}function notesExpand(e){expandId=e.currentTarget.parentNode.parentNode.firstElementChild.dataset.noteId,document.getElementById("mgNotesExpandHeader").setAttribute("data-note-id",expandId),document.getElementById("notesExpand").style.display="block",document.getElementById("mgHtmlBody").style.overflow="hidden";var t=new XMLHttpRequest;t.onreadystatechange=function(){if(4==this.readyState&&200==this.status){var e=JSON.parse(t.responseText);document.getElementById("mgNotesExpandContent").innerText=e.data.content,document.getElementById("mgNotesExpandHeader").innerText=e.data.header,oldheader=document.getElementById("mgNotesExpandHeader").innerText,oldNotes=document.getElementById("mgNotesExpandContent").innerText,(""==oldheader.trim()||void 0==typeof oldheader)&&(oldheader="Header ###")}},t.open("post","/getNotes"),t.setRequestHeader("Content-type","application/json"),t.send(JSON.stringify({id:expandId}))}function checkPasteEvent(e,t){e.stopPropagation(),e.preventDefault(),document.getElementById(t).innerText+=e.clipboardData.getData("Text")}function expandnoteCancelConfirmtoClose(){document.getElementById("notesExpand").style.display="none",document.getElementById("mgHtmlBody").style.overflow="scroll",oldheader="",oldNotes="",newHeader="",newNotes="",expandId=""}function expandnoteCancel(){if(newHeader=document.getElementById("mgNotesExpandHeader").innerText,newNotes=document.getElementById("mgNotesExpandContent").innerText,0!=newNotes.localeCompare(oldNotes)||0!=oldheader.localeCompare(newHeader)){var e=!1,t=!1;void 0==typeof newHeader||""==newHeader.trim()?(newHeader=oldheader,document.getElementById("mgNotesExpandHeader").innerText=newHeader,e=!1):e=!0,void 0==typeof newNotes||""==newNotes.trim()?(newNotes=oldNotes,document.getElementById("mgNotesExpandContent").innerText=newNotes,t=!1):t=!0,t||e?document.getElementById("Unsaved-data-confirm").style.display="block":expandnoteCancelConfirmtoClose()}else expandnoteCancelConfirmtoClose()}function expandnoteUnsavedConfirmationDialogCancel(){document.getElementById("Unsaved-data-confirm").style.display="none"}function expandUnsavedDataClose(){document.getElementById("Unsaved-data-confirm").style.display="none",expandnoteCancelConfirmtoClose()}function expandUnsavedDataSave(){UnsavedDataSave=1,document.getElementById("Unsaved-data-confirm").style.display="none",expandNotesUpdate()}function expandNotesSave(e){if(newHeader=document.getElementById("mgNotesExpandHeader").innerText,newNotes=document.getElementById("mgNotesExpandContent").innerText,0!=newNotes.localeCompare(oldNotes)||0!=oldheader.localeCompare(newHeader)){var t=!1,n=!1;void 0==typeof newHeader||""==newHeader.trim()?(newHeader=oldheader,document.getElementById("mgNotesExpandHeader").innerText=newHeader,t=!1):t=!0,void 0==typeof newNotes||""==newNotes.trim()?(newNotes=oldNotes,document.getElementById("mgNotesExpandContent").innerText=newNotes,n=!1):n=!0,n||t?expandNotesUpdate():expandNoChangeContentSnackbar()}else expandNoChangeContentSnackbar()}function expandNoChangeContentSnackbar(){var e=document.getElementById("snackbar");e.innerText="No change's to save",e.className="no-change",setTimeout(function(){e.className=e.className.replace("no-change","")},3e3)}function expandNotesUpdate(){var e=new XMLHttpRequest;e.onreadystatechange=function(){if(4==e.readyState&&200==e.status){var t=JSON.parse(e.responseText);oldheader=document.getElementById("mgNotesExpandHeader").innerText,oldNotes=document.getElementById("mgNotesExpandContent").innerText;var n=document.getElementById("mgNotesCard-"+expandId);n.children[0].innerText=t.val.header,n.children[1].innerText=t.val.content,1==t.UnsavedDataSave&&(expandnoteCancelConfirmtoClose(),UnsavedDataSave=0);var a=document.getElementById("snackbar");a.innerText="Data saved successfully ",a.className="show",setTimeout(function(){a.className=a.className.replace("show","")},3e3)}},e.open("Post","/notesUpdateRequest",!0),e.setRequestHeader("Content-type","application/json"),1!=UnsavedDataSave?e.send(JSON.stringify({header:newHeader,content:newNotes,id:expandId,UnsavedDataSave:0})):e.send(JSON.stringify({header:newHeader,content:newNotes,id:expandId,UnsavedDataSave:1}))}function expandNotesDelete(e){document.getElementById("expand-delete-confirm").style.display="block"}function expanddeletenoteCancel(){document.getElementById("expand-delete-confirm").style.display="none"}function expanddeletenoteConfirm(){var e=new XMLHttpRequest;e.onreadystatechange=function(){if(4==this.readyState&&200==this.status){var t=JSON.parse(e.responseText);t.error?(expandId="",window.location.reload()):(document.getElementById("expand-delete-confirm").style.display="none",document.getElementById("notesExpand").style.display="none")}},e.open("Post","/deletenote",!0),e.setRequestHeader("Content-type","application/json"),removeNoteById(expandId),e.send(JSON.stringify({id:expandId}))}function removeNoteById(e){var t=document.getElementById("mgRow"),n=document.getElementById("mgNotesCard-"+e),a=n.parentNode;t.removeChild(a)}function notesSearch(){var e=document.getElementById("notesSearch").value;if(e=e.trim(),0!=e.localeCompare(oldSearchKey)){oldSearchKey=e;var t=new XMLHttpRequest;t.onreadystatechange=function(){if(4==this.readyState&&200==this.status){for(var e=JSON.parse(t.responseText),n=document.getElementById("mgRow");n.firstChild;)n.removeChild(n.firstChild);Object.keys(e.data).forEach(function(t){var a=document.createElement("div");a.setAttribute("class","mg-column"),a.setAttribute("id","mgColumn");var d=(n.firstElementChild,e.data[t].id),o="mgNotesCard-"+d,r=document.createElement("div");r.setAttribute("class","mg-notes-card"),r.setAttribute("id",o),r.setAttribute("contenteditable","true"),r.setAttribute("onfocusout","notesUpdate(event)"),r.setAttribute("onfocusin","notesView(event)"),r.setAttribute("onpaste","myFunction(event)"),r.setAttribute("data-note-id",d);var s=document.createElement("div");s.setAttribute("class","mg-notes-header"),s.innerText=e.data[t].header,r.appendChild(s);var i=document.createElement("div");i.setAttribute("class","mg-notes-content"),i.innerText=e.data[t].content,r.appendChild(i),a.appendChild(r);var l=document.createElement("div");l.setAttribute("class","mg-notes-card-footer"),l.setAttribute("id","mgNotesCardFooter");var c=document.createElement("span");c.setAttribute("class","mg-icon-span"),c.setAttribute("onClick","deletenote(event)");var m=document.createElement("I");m.setAttribute("class","mg-small-icon-delete"),c.appendChild(m);var p=document.createElement("span");p.setAttribute("class","mg-icon-span"),p.setAttribute("onClick","notesExpand(event)");var u=document.createElement("I");u.setAttribute("class","mg-small-icon-expand"),p.appendChild(u),l.appendChild(p),l.appendChild(c),a.appendChild(l),n.insertBefore(a,n.childNodes[0])})}},t.open("post","/notesSearch"),t.setRequestHeader("Content-type","application/json"),t.send(JSON.stringify({searchKey:e}))}}var oldNotes,oldheader,newNotes,newHeader,id="",deleterootCol,deletecardNoteId,expandId,UnsavedDataSave=0,oldSearchKey;