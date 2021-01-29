var express = require('express');
var mysql = require('mysql');
var app = express();
var bodyParser = require('body-parser');

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


app.set('view engine', 'ejs');
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());// json 형식의 데이터를 받는다.
app.use(bodyParser.urlencoded({extended:true}));//urlencoded data를 extended 알고리즘으로 분석



var sql = "CREATE TABLE book (name VARCHAR(20), email VARCHAR(55), phone VARCHAR(20))";
try{
  connection.query(sql,function(err,result){
    console.log("Table created");
  });//테이블 만들어주고
}catch(err){
  console.log("fucked up");
}



var port = 3000; // 사용할 포트 번호를 port 변수에 넣습니다.

app.listen(port, function(){ // port변수를 이용하여 3000번 포트에 node.js 서버를 연결합니다.
  console.log('server on! http://localhost:'+port); //서버가 실행되면 콘솔창에 표시될 메세지입니다.
});

app.get('/', function(req, res){
  res.redirect('/contacts');
  console.log("hey");
});
// Contacts - Index // 7

app.get('/contacts', function(req, res){
  var sql = 'SELECT * FROM people';
  connection.query(sql,function(err,rows,fields) {
    if(err){
      console.log("can't!");
      console.log(err);
    }else{
        res.render('contacts/index', {contacts:contacts});
    }
  });
  /*
  Contact.find({}, function(err, contacts){
    if(err) return res.json(err);
    res.render('contacts/index', {contacts:contacts});
  });
  */
});


// Contacts - New // 8
app.get('/contacts/new', function(req, res){
  res.render('contacts/new');
});


// Contacts - create // 9
app.post('/contacts', function(req, res){
  connection.create(req.body, function(err, contact){
    if(err){
      console.log("ha...");
      return res.json(err);
    }
    res.redirect('/contacts');
  });
});

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
