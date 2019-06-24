var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require("body-parser");
var url = require('url');
var userDatabase = require('../MyModules/getDataBase');
var mgFunctions = require('../MyModules/functions.js');
var obj = userDatabase.getUserTable();
var dir = 'database/';
var fs = require('fs');
var path = require('path');
var ffmpeg = require('ffmpeg');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

var ssn;
var staticDatabasePath =  "./database";
var databasePath = path.resolve(staticDatabasePath);

 var userListDao = userDatabase.getUserTable();

router.get('/app/apiCall', function(req,res){
	console.log('something is happeing.');
	res.json({ message: 'hooray! welcome to our rest video api!' });  
});

// module.exports.router = router;
router.get('/apiTest', function(req, res) {
  res.send('home page');
});

// Define the about route
router.get('/about', function(req, res) {
  res.send('About us');
});

router.post('/userverification', function(req,res){
  var username = req.body.username;
  console.log(Object.keys(req));
  console.log(Object.keys(req.body));
  console.log(req.body)
  console.log(username+"  === Test User Name")
   var fileName = "UserLoginDto.json";
   var staticDatabasePath =  "./database";
  var databasePath = path.resolve(staticDatabasePath);
  var userTable = path.join(databasePath,fileName);
  if (!fs.existsSync(userTable)) { 
  console.log("\n\n"+userTable +"Path and file does not exist\n\n");
  fs.writeFileSync(userTable,'{}');
  } 
  console.log(obj);
  if(obj[username] ){
       res.json({res:"0"});
   }
   else{
   res.json({res:"1"});
 }
});

router.post('/signupForm', function(req,res){
  var username = req.body.username;
  var password = req.body.password;
  var department = req.body.userRole;
  var email = req.body.email;
  var gender = req.body.gender;
  var empId = req.body.empId;
  var date = new Date();
  var fileName = "UserLoginDto.json";
  var userTable = path.join(databasePath,fileName);
  if (!fs.existsSync(userTable)) { 
  console.log("\n\n"+userTable +"Path and file does not exist\n\n");
  fs.writeFileSync(userTable,'{}');
  } 
   if(obj[username] ){
       res.json({ message: 'Already register User!!!, Try with new domine',status:0 });
   }
   else{
    var newUser =  { username: '',
     gender: '',
     email: '',
     department: '',
     password: '',
     empId: '' };
      newUser['username'] = username;
      newUser['password'] = password;
      newUser['department'] = department;
      newUser['gender'] = gender;
      newUser['email'] =  email;
      newUser['empId'] = empId;

      // newUser['createdby'] = req.session.name;
      // newUser['createddate'] = date;
      // newNote['modifiedby'] = req.session.name;
      // newNote['modifiedby'] =  date;

      obj[username] = newUser;
      
      fs.writeFileSync(userTable, JSON.stringify(obj));
      obj = userDatabase.getUserTable();
      userListDao = userDatabase.getUserTable();
      console.log("After update "+ obj);
      // res.json({ message: 'Success',status:1 });
      res.render('index',{ message: 'Success',status:2 }); 
   }
});

router.get('/loginerror', function(req,res){
res.render('index',{
        status:"2"
    });
});

router.get('/login', function (req, res) {
   //res.sendFile( __dirname + "/public/html/" + "Login_index.html" );
   // console.log(listfile.name("valiue"));
   ssn = req.session;
   if(ssn.name){
    res.redirect('home');
   }
   else{
  res.render('index');
 }
});

router.post('/verify', function (req, res) {
   // Prepare output in JSON format
   var username = req.body.username;
   var password = req.body.Password;
   console.log(username);
   console.log(password);
  
    response = {
      "Verification":"pass"
    };
    console.log(obj[username]);
    obj = userDatabase.getUserTable();
    userListDao = userDatabase.getUserTable();
   if(userListDao[username] &&(password == obj[username]['password'])){
    //dir = dir+username;
    ssn = req.session
    ssn.name = username;

    console.log(dir+username);
    console.log("Hiii this is Code  %s",req.session.name);
    if (!fs.existsSync(dir+username)){
      fs.mkdirSync(dir+username);
    }
  
   	console.log("Logged user is :%s : Pass : %s",obj[username]['username'], obj[username]['password']);
  res.redirect('home')
   }
   else{
  res.render('index',{
        status:"1"
    });
   }
   console.log(response);
   
   //res.end(JSON.stringify(response));
});

router.post( '/userroledetection' , function ( req , res ){

    var staticDatabasePath =  "./database/common";
    var databasePath = path.resolve(staticDatabasePath);
    databasePath = path.join(databasePath,"UserRoleDto.json");

    if (!fs.existsSync(databasePath)) { 
        fs.writeFileSync(databasePath,'{}');
    } 
      var data = fs.readFileSync(databasePath, 'utf8');
      var dataObj = JSON.parse(data);
      res.send(dataObj);
    
});

 router.post('/getNotes', function(req, res){
  var reqData = req.body;
   ssn = req.session;
    console.log(ssn.name);

  if(ssn.name){
    
    var staticDatabasePath =  "./database/"+ssn.name;
    var databasePath = path.resolve(staticDatabasePath);
    databasePath = path.join(databasePath,"notes.json");
    var data = fs.readFileSync(databasePath, 'utf8');
    var notesdata = JSON.parse(data);
    var userNotes = notesdata[reqData.id];
    res.send({data:userNotes})
    }
     else{
     res.render('index');
   }
 })
 router.post('/notesSearch',function(req,res){
  var reqData = req.body;
   ssn = req.session;
    console.log(ssn.name);

  if(ssn.name){
    
    var staticDatabasePath =  "./database/"+ssn.name;
    var databasePath = path.resolve(staticDatabasePath);
    databasePath = path.join(databasePath,"notes.json");
    var data = fs.readFileSync(databasePath, 'utf8');
    var notesdata = JSON.parse(data);
    var searchResult ={};
    // var str = reqData.searchKey;
    // var expr = /str/i;  // no quotes here
    var expr = new RegExp(reqData.searchKey, "i");
    Object.keys(notesdata).forEach(function(key){
      console.log(expr.test(notesdata[key]["header"]));
      if(expr.test(notesdata[key]["header"])){
        console.log("Matched %s , %s Is Matched",key,notesdata[key]["header"]);
        searchResult[key] = notesdata[key];
      }
    });

    res.send({data:searchResult});
    }
     else{
     res.render('index');
   }
 })


router.get('/taskTrack',function(req,res){
  var reqData = req.body;
   ssn = req.session;
    console.log(ssn.name);
  if(ssn.name){
      var staticDatabasePath =  "./database/tracktask";
      var databasePath = path.resolve(staticDatabasePath);
      databasePath = path.join(databasePath,"TrackTaskDto.json");
      if (!fs.existsSync(databasePath)) { 
        console.log("\n\nMahesh Path and file does not exist\n\n");
        fs.writeFileSync(databasePath,'{}');
        } 
      var data = fs.readFileSync(databasePath, 'utf8');
      var  taskdata = JSON.parse(data);
      if(taskdata[ssn.name]){
      var ex = {data:taskdata[ssn.name]};

      console.log(ex);
      res.render('taskTrack',{data:taskdata[ssn.name],empId:userListDao[ssn.name]['empId'],user:ssn.name});
    }
    else{
      res.render('taskTrack',{data:{},empId:userListDao[ssn.name]['empId'],user:ssn.name});
    }
     }
     else{
     res.render('index');
  }
});

router.post('/addNewTask',function(req,res){
  var reqData = req.body;
   ssn = req.session;
    console.log(ssn.name);
  if(ssn.name){
    console.log(reqData);
    var newTask = {
      id:'',
      name: '',
      chMember: '',
      storyId: '',
      chStartDate: '',
      chEndDate: '',
      analysisStartDate: '',
      analysisEndDate: '',
      analysisLLReview: '',
      analysisLLendDate: '',
      analysisQCReview: '',
      analysisQCEndDate: '',
      postChStartDate: '',
      postChEndDate: '',
      chLLReview: '',
      chLLEndDate: '',
      RRTEtartDate: '',
      RRTEndDate: '',
      RRTLLReview: '',
      RRTLLEndDate: '',
      finalChReview: '',
      finalChEndDate: '',
      finalQCReview: '',
      finalQCEndDate: '',
      createdby:"",
      createddate:"",
      modifieddate:"",
      modifiedby:"",
      extra1:"",
      extra2:"",
      extra3:""
    };
    var taskId = mgFunctions.getId();

    newTask.id = taskId;
      Object.keys(reqData).forEach(function(key){
      newTask[key] = reqData[key];
    });
   
      newTask['createdby'] = ssn.name;
      var date = new Date();
      newTask['createddate'] = date;
      newTask['modifiedby'] = ssn.name;
      newTask['modifieddate'] =  date;

      var staticDatabasePath =  "./database/tracktask";
      var databasePath = path.resolve(staticDatabasePath);
      databasePath = path.join(databasePath,"TrackTaskDto.json");

      if (!fs.existsSync(databasePath)) { 
  console.log("\n\nMahesh Path and file does not exist\n\n");
  fs.writeFileSync(databasePath,'{}');
  } 

  var data = fs.readFileSync(databasePath, 'utf8');
    var  taskdata = JSON.parse(data);
      console.log(taskdata);

      if(taskdata[ssn.name]){

      }
      else{
        taskdata[ssn.name] = {};
      }

      taskdata[ssn.name][taskId] = newTask;
      fs.writeFileSync(databasePath, JSON.stringify(taskdata)); 

      console.log(taskdata[ssn.name][taskId]);
     res.redirect('/taskTrack');
     }
     else{
     res.render('index');
  }
});

router.post('/trackTaskEditReq', function (req, res) {
    var reqData = req.body;
   ssn = req.session;
    console.log(ssn.name);
  if(ssn.name){
     var staticDatabasePath =  "./database/tracktask";
      var databasePath = path.resolve(staticDatabasePath);
      databasePath = path.join(databasePath,"TrackTaskDto.json");
    var data = fs.readFileSync(databasePath) 
      
      var updatejson = JSON.parse(data);
      var resData = updatejson[ssn.name][reqData["id"]];
      
      res.send(resData);
  }
  else{
    res.send({error:1});
  }
    
    
});

router.post('/updateTask', function (req, res) {
    var reqData = req.body;
   ssn = req.session;
  if(ssn.name){
     var staticDatabasePath =  "./database/tracktask";
      var databasePath = path.resolve(staticDatabasePath);
      databasePath = path.join(databasePath,"TrackTaskDto.json");
    var data = fs.readFileSync(databasePath) 
      
      var updatejson = JSON.parse(data);
      var resData = updatejson[ssn.name][reqData["id"]];
      
      console.log('Test Update'+ reqData.id+"  In dataBase == "+resData.id);

      console.log(resData);

      Object.keys(resData).forEach(function(key){
        resData[key] = reqData[key];
      })
   
      var date = new Date();
      resData['modifiedby'] = ssn.name;
      resData['modifieddate'] =  date;
      console.log('After  ::::  '+resData);
      updatejson[ssn.name][reqData["id"]] = resData;
      fs.writeFileSync(databasePath, JSON.stringify(updatejson)); 

      
     res.redirect('/taskTrack');


  }
  else{
    res.redirect('/home');
  }
    
    
});


router.post('/deleteTask', function (req, res) {
    var reqData = req.body;
   ssn = req.session;
    console.log(ssn.name);
  if(ssn.name){
     var staticDatabasePath =  "./database/tracktask";
      var databasePath = path.resolve(staticDatabasePath);
      databasePath = path.join(databasePath,"TrackTaskDto.json");
    var data = fs.readFileSync(databasePath) 
      
      var updatejson = JSON.parse(data);
      console.log("Delete Id is ::::   "+reqData["id"]);
      delete updatejson[ssn.name][reqData["id"]];
      fs.writeFileSync(databasePath,JSON.stringify(updatejson));
       res.send({val:1});
  }
  else{
    res.send({error:1});
  }
    
    
});

router.get("/pathToYourDownload", function (req, res) {
  json2csv({ data: "myCars", fields: "fields" }, function(err, csv) {
    res.setHeader('Content-disposition', 'attachment; filename=data.csv');
    res.set('Content-Type', 'text/csv');
    res.status(200).send(csv);
  });
});




router.use(function(req,res,next){
  console.log('something is happeing.'+req.url+"   :::  "+req.session);
  ssn = req.session;
if(req.url !== '/login'){
  if(ssn.name ){
    // res.redirect('/home');
    next();
   }
   else{
   res.render('index');
 }
}

});


router.get('/home', function (req, res) {
  var od;
  ssn = req.session;
  console.log(ssn.name);
  console.log("Testing : M %s",dir+ssn.name+'/notes.json');

  var link = dir+ssn.name+'/notes.json';
  if (!fs.existsSync(link)) { 
  console.log("\n\nMahesh Path and file does not exist\n\n");
  fs.writeFileSync(link,'{}');
  } 

  // console.log(listfile.getFDList(link)+"\n\n\n\n\n\n\nMahesh\n");

  fs.readFile(link, function (err, datax) {
      console.log("start");
      if (err) console.log(err);
      console.log(datax);
      od = JSON.parse(datax);
      console.log(od);
     
      res.render('homepage',{data:od,user:ssn.name,empId:userListDao[ssn.name]['empId']}); 
  });
});


router.get('/profile', function (req, res) {
  
  ssn = req.session;
  
  console.log(obj[ssn.name]);
  obj[ssn.name]['password'] = '';


  var staticDatabasePath =  "./database/common";
    var databasePath = path.resolve(staticDatabasePath);
    databasePath = path.join(databasePath,"UserRoleDto.json");

    if (!fs.existsSync(databasePath)) { 
        fs.writeFileSync(databasePath,'{}');
    } 
      var data = fs.readFileSync(databasePath, 'utf8');
      var userRole = JSON.parse(data);
      console.log(userRole);

  res.render('profile',{role:userRole.role,data:obj[ssn.name],user:ssn.name,empId:userListDao[ssn.name]['empId']});
 
  
});



router.post('/profileUpdate', function(req,res){
  var department = req.body.department;
  var email = req.body.email;
  var empId = req.body.empId;
  var date = new Date();
  var fileName = "UserLoginDto.json";
  var userTable = path.join(databasePath,fileName);
  obj = userDatabase.getUserTable();
  obj[ssn.name]['empId'] = empId;
  obj[ssn.name]['email'] = email;
  obj[ssn.name]['department'] = department;
      
      fs.writeFileSync(userTable, JSON.stringify(obj));
      obj = userDatabase.getUserTable();
      userListDao = userDatabase.getUserTable();
      console.log("After update "+ obj[ssn.name]);
  res.send({code:1});
});




router.get('/videoformatter', function (req, res) {
  var od;
  ssn = req.session;
  console.log(ssn.name+"Video Editor");
  console.log('Here in Video Editor');

  ffmpeg('video1')
    .setStartTime('00:00:03')
    .setDuration('10')
    .output('videos/test.mp4')

    .on('end', function(err) {   
        if(!err)
        {
          console.log('conversion Done');
        }                 

    })
    .on('error', function(err){
        console.log('error: ', +err);

    }).run();
    var filePath = "videos/"; // Or format the path using the `id` rest param
    var fileName = "test.mp4"; // file name 
    res.download(filePath, fileName);  
});




router.get( '/logout' , function ( req , res ){
req.session.destroy(function(err){
if (err){
console.log(err);
}
else
{
  // obj = userDatabase.getUserTable();
  // userListDao = userDatabase.getUserTable();
res. redirect ( '/login' );
}});
});









module.exports = router;
