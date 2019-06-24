exports.getFDList = function(path){
	return "Path is returned"+path;
}
exports.name=function(val){
	console.log(val+"  Export value");
}
exports.getId = function(){
	console.log(" Id Function Export value");
	 return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}