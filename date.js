var fs = require('fs');
var exec = require('exec-then');

function pushChanges(date){


fs.writeFile("newfile.js", "Hey there!asdfashjgjhgjhgf swagger so hardsadf asdfasfd", function(err) {
    if(err) {
    	console.log('err1')
        return console.log(err);
    }

    console.log("The file was saved!");


}); 
exec('git add -A',
  function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
    	console.log('err2')
      console.log('exec error: ' + error);
    }
}).then(function(){
      exec("git commit --date='"+date+"' -m 'new'",
  function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);

    if (error !== null) {
      console.log('exec error: ' + error);
      console.log('err3')
    }
}).then(function(){
   exec('git push origin master', function(error, stdout, stderr){
      console.log('pushed')
    })
});

});
}

setInterval(function(){
  pushChanges("2015, 19, 1")
}, 5000);

