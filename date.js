var fs = require('fs');
var exec = require('exec-then');
var schedule = require('node-schedule');
var moment = require('moment');

var today = moment();
var day = today.format("YYYY, DD, MM")

// var j = schedule.scheduleJob(today.format(), function(){
//    pushChanges(day)
//    day = today.format("YYYY, DD, MM").subtract(1, 'days')    
// });

function dayCommit(date){
  fs.writeFile("newfile.js",date, function(err) {
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

day = today.subtract(1, 'days')

}

function pushChanges(date){
fs.writeFile("newfile.js",date, function(err) {
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
  console.log(day)
  dayCommit(day)
}, 5000);

