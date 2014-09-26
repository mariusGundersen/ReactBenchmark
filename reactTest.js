var vhost = require('vhost-delegator');
var express = require('express');
var app = express();


app.use(express.static('www'));


vhost.startClient('reactBenchmark', ['react-benchmark.mariusgundersen.*'], {}, app)
.on('started', function(port){
  console.log("app started", port);
}).on('stopped', function(){
  console.log('app stopped');
  process.exit(2);
}).on('error', function(error){
  console.error(error);
  process.exit(1);
});
