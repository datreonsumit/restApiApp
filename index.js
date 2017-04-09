var mongo = require('mongo');
var express = require('express');
var monk = require('monk');
var db = monk('192.168.100.180:27023/contactlist');
var app = new express();

//Below 1 command is used to load static files listed under public folder(Which is in my local file system ext4)
app.use(express.static(__dirname + '/public'));

app.get('/', function(req,res){
  db.driver.admin.listDatabases(function(e,dbs){
    res.json(dbs);
  })
});

app.get('/collections', function(req,res){
  db.driver.collectionNames(function(e,names){
    res.json(names);
  })
});

app.get('/collections/:name', function(req,res){
  var collection = db.get(req.params.name);
  collection.find({},{limit:20},function(e,docs){
    res.json(docs);
  })
});

app.listen(3000);
console.log("server is running on port 3000");
