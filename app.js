var express = require('express');
var bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var session = require('express-session');
var fs = require('fs');
var path = require('path');
var router = require('./routes/routes');
// routes(app);   //routes shall use Expres
var ssn ;
var app = express();

var mgFunctions = require('./MyModules/functions.js');
var userDatabase = require('./MyModules/getDataBase');

console.log(obj);
app.use(session({secret:'gmaheshwaranit'}));

app.set( 'views' ,  __dirname  +  '/views' ) ;
app.set('view engine', 'ejs');
app.use( cookieParser()) ;
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

var dir = 'database/';
var obj = userDatabase.getUserTable();


// app.get('/loginerror', function(req,res){
// res.render('index',{
//         status:"1"
//     });
// });

// app.get('/login', function (req, res) {
//    //res.sendFile( __dirname + "/public/html/" + "Login_index.html" );
//    console.log(listfile.name("valiue"));
//    ssn = req.session;
//    if(ssn.name){
//     res.redirect('home');
//    }
//    else{
//    res.render('index');
//  }
// });

// 	var obj;
// 	// var path = __dirname + "/database/" + "UserLoginDto.json";
// 	// console.log("Path is  %s",path);
// 	// fs.readFile(path, 'utf8', function (err, data) {
//  //  		if (err) throw err;
//  //  		obj = JSON.parse(data);
// 	// });



// app.post('/verify', function (req, res) {
//    // Prepare output in JSON format
//    var username = req.body.username;
//    var password = req.body.Password;
//    console.log(username);
//    console.log(password);
  
//     response = {
//       "Verification":"pass"
//     };
//    if(obj[username] && (password == obj[username]['password'])){
//     //dir = dir+username;
//     ssn = req.session
//     ssn.name = username;

//     console.log(dir+username);
//     console.log("Hiii this is Code  %s",req.session.name);
//     if (!fs.existsSync(dir+username)){
//       fs.mkdirSync(dir+username);
//     }
  
//    	console.log("Logged user is :%s : Pass : %s",obj[username]['username'], obj[username]['password']);
//   res.redirect('home')
//    }
//    else{
//    res.redirect('loginerror');
//    }
//    console.log(response);
   
//    //res.end(JSON.stringify(response));
// });

// app.use(router);

// app.get('/home', function (req, res) {
//   var od;
//   ssn = req.session;
//   console.log(ssn.name);
//   console.log("Testing : M %s",dir+ssn.name+'/notes.json');

//   var link = dir+ssn.name+'/notes.json';
//   if (!fs.existsSync(link)) { 
//   console.log("\n\nMahesh Path and file does not exist\n\n");
//   fs.writeFileSync(link,'[]');
//   } 

//   console.log(listfile.getFDList(link)+"\n\n\n\n\n\n\nMahesh\n");

//   fs.readFile(link, function (err, datax) {
//       console.log("start");
//       if (err) console.log(err);
//       console.log(datax);
//       od = JSON.parse(datax);
//       console.log(od);
//       res.render('homepage',{data:od,user:ssn.name}); 
//   });
// });



//or you can also use get request

app.post('/notesUpdateRequest', function (req, res) {
    var reqData = req.body;
   ssn = req.session;
    console.log(ssn.name);
  if(ssn.name){
   console.log(reqData["header"]);
    console.log("\n\n\n Mahesh AAAJJJJAX Ajax\n\n\n");
     var link = dir+ssn.name+'/notes.json';
    fs.readFile(link, function (err, datax) {
      if (err) console.log(err);
      var updatejson = JSON.parse(datax);
      var check = updatejson[reqData["id"]];
      if(updatejson[reqData["id"]]){
      updatejson[reqData["id"]]["header"] = reqData["header"];
      updatejson[reqData["id"]]["content"] = reqData["content"];
      updatejson[reqData["id"]]["modifiedby"] = req.session.name;
      updatejson[reqData["id"]]["extra1"] = reqData["contentHtml"];
      console.log("Html test $$$$$$"+updatejson[reqData["id"]]["extra1"]);
      var date = new Date();
       updatejson[reqData["id"]]["modifieddate"] = new Date();
       console.log(updatejson[reqData["id"]]["modifieddate"] );
      console.log("\n\nGet UPdated Data Element : %s",check["header"]);
      fs.writeFileSync(link, JSON.stringify(updatejson));
      console.log(updatejson[reqData["id"]]);
      if(typeof reqData['UnsavedDataSave'] == undefined ||  reqData['UnsavedDataSave'] != 1){
      res.send({val:updatejson[reqData["id"]],UnsavedDataSave : 0 });
    }
    else{
      res.send({val:updatejson[reqData["id"]],UnsavedDataSave : 1 });
    }
  }
    else{
      res.send({error:1});
    }
  });
  }
  else{
    res.send({error:1});
  }
    
    
});


app.post('/createnote', function (req, res) {
  var reqData = req.body;
   ssn = req.session;
   console.log(ssn.name);
  if(ssn.name){
   console.log(reqData["header"]);
   console.log(reqData);
    console.log("\n\n\n Mahesh AAAJJJJAX Ajax\n\n\n");
     var link = dir+ssn.name+'/notes.json';
    fs.readFile(link, function (err, datax) {
      if (err) console.log(err);
      var updatejson = JSON.parse(datax);
      var newNote = {id :"",name:"",header:"",content:"",tag:[],createdby:"",createddate:"",modifieddate:"",extra1:"",extra2:"",extra3:"",modifiedby:""};
      var noteId = mgFunctions.getId();
      console.log(noteId);

      newNote['id'] = noteId;
      newNote['header'] = "Header ###";
      newNote["content"] =  "Content ###";
      newNote['createdby'] = req.session.name;
      var date = new Date();
      newNote['createddate'] = date;
      newNote['modifiedby'] = req.session.name;
      newNote['modifiedby'] =  date;

      // updatejson.push(newNote);
      updatejson[noteId] = newNote;
      
      fs.writeFileSync(link, JSON.stringify(updatejson));
      console.log("Note Created for   :::::  "+ noteId);
      res.send({header:"Header ###",content:"Content ###",id:noteId});
  });
  }
  else{
     res.send({error:1});
  }
    
    
});

app.post('/deletenote', function (req, res) {
  var reqData = req.body;
   ssn = req.session;
    console.log(ssn.name);
  if(ssn.name){
    console.log("\n\n\n Mahesh AAAJJJJAX Ajax\n\n\n");
     var updatenote = dir+ssn.name+'/notes.json';
     var deletenote = dir+ssn.name+'/deletenotes.json';
    fs.readFile(updatenote, function (err, datax) {
      if (err) console.log(err);
      var updatejson = JSON.parse(datax);
      var newdeletenote = updatejson[reqData["id"]];
      delete updatejson[reqData["id"]];
      
      fs.writeFileSync(updatenote, JSON.stringify(updatejson));

      if (!fs.existsSync(deletenote)) { 
      console.log("\n\nMahesh Path and file does not exist\n\n");
      fs.writeFileSync(deletenote,'{}');
      } 
      fs.readFile(deletenote, function (err, datax) {
      
        if (err) console.log(err);
        var deletenotejson= JSON.parse(datax);
        deletenotejson[reqData["id"]]= newdeletenote;
        fs.writeFileSync(deletenote, JSON.stringify(deletenotejson));
      });


      res.send({val:1});
  });
    }
     else{
     res.send({error:1});
  }
    
});

app.use(router);



app.get('/downloads', function (req, res, next) {
    var filePath = "database/"; // Or format the path using the `id` rest param
    var fileName = "UserLoginDto.json"; // file name 
    res.download(filePath, fileName);    
    next();
});

app.get('/ajaxtest', function (req, res) {
    var filePath = "database/"; // Or format the path using the `id` rest param
    var fileName = "UserLoginDto.json"; // file name 
    ssn = req.session
    console.log("\n\n\n Mahesh AAAJJJJAX Ajax\n\n\n");
     var link = dir+ssn.name+'/notes.json';
    res.send({res:"1"});
});



app.get('/share', function(req, res){
  var file = __dirname + '/public/files/LiteDB.zip';
  var fs = require('fs');
var path = require('path');
var dirPath = __dirname + '/public/'; //directory path
var fileType = '.zip'; //file extension
var files = [];
fs.readdir(dirPath, function(err,list){
  if(err) throw err;
  for(var i=0; i<list.length; i++)
  {
      console.log(list[i]); //print the file
      files.push(list[i]); //store the file name into the array files
      console.log(files);
  }
});

 res.download(file);
});


app.get('/download', function(req, res){
  var file = __dirname + '/public/files/LiteDB.zip';
  res.download(file);
});

var server = app.listen(3001, function(){
	var host = server.address().address;
	var port = server.address().port;
	console.log("Example app listening at http://%s:%s",host,port);
});

