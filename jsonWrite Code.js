var strin = JSON.stringify(obj,null,'\t');

  fs.writeFile(dir+'/names.json',strin,function(err) {
    if(err) return console.error(err);
    console.log('done');
  })