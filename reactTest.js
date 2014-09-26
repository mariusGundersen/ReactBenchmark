var vhost = require('vhost-delegator');
var express = require('express');
var app = express();


app.use(express.static('www'));


vhost.startClient('reactBenchmark', ['react-benchmark.mariusgundersen.*'], {}, app);