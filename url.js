var url = require('url');
var adr = 'https://www.petanikode.com/search.php?year=2018&month=february';
var q = url.parse(adr,true);

console.log("protocol:" + q.protocol);
console.log("hostname:" + q.hostname);