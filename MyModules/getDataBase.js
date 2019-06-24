var fs = require('fs');
var path = require('path');

exports.getUserTable = function(){
	var obj;
	console.log("Path is In Modules %s %s");
	var staticDatabasePath =  "./database";
	var databasePath = path.resolve(staticDatabasePath);
	databasePath = path.join(databasePath,"UserLoginDto.json")
	console.log(databasePath)
	if (!fs.existsSync(databasePath)) { 
  console.log("\n\n"+databasePath +"Path and file does not exist\n\n");
  fs.writeFileSync(databasePath,'{}');
  } 
	var data = fs.readFileSync(databasePath, 'utf8');
  		obj = JSON.parse(data);
  		console.log(obj);
  		return obj;
	
}

exports.writeUserTable = function(link, data ){
	  fs.writeFileSync(link, JSON.stringify(data));
}