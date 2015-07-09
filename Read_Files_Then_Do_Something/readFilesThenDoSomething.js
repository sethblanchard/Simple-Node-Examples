var fs = require('fs');

var data_dir =  '/data/',
  read_dir = __dirname + data_dir;

var readFilesThenDoSomething = function(files, callback){
  
  var completed_files = []; //could error check here
  
  files.map(function(file_name){
  
    var file_contents = '';
    var stream = fs.createReadStream(read_dir + file_name, {encoding: 'utf8'});
  
    stream.on('data', function(chunk){
      file_contents += chunk; //we assume everything is a string... 
    })  
  
    stream.on('end', function(){
        completed_files.push(file_contents);
    
        if(completed_files.length == files.length){
            callback(completed_files);
        }
        
    });
    
  });
  
};

fs.readdir(read_dir, function(err, files){
  if(err) return;
  
  readFilesThenDoSomething(files, function(completed){
      console.log('we can do something with all the %d files!', completed.length);
  });

  
});




