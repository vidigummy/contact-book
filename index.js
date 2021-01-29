var express = require('express');
var mysql = require('mysql');
var app = express();

var connection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password: '< MySQL password >',
  database: 'connect_book'
});


try{
  connection.connect();
  console.log("Data base connection complete");
}catch(error){
  console.log("connection failed");
}




/*
//테이블 조회하는 쿼리
var sql = 'SELECT * FROM people';
connection.query(sql,function(err,rows,fields) {
  if(err){
    console.log("can't!");
    console.log(err);
  }else{
    console.log(rows[0]);
  }
});
//값 집어넣는 쿼리
var sql = 'INSERT INTO people (name, pn) VALUES(?, ?)';
var params = ["SooIn", "01020196935"];
connection.query(sql, params, function(err, rows, fields){
	if(err){
		console.log(err);
	} else {
		console.log(rows.insertId);
	}
});
*/
