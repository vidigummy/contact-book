var express = require('express');
var mysql = require('mysql');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');



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
app.use(methodOverride('_method'));


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
});
// Contacts - Index // 7

app.get('/contacts', function(req, res){
  var sql = 'SELECT DISTINCT name, phone, email FROM book';
  connection.query(sql,function(err,rows,fields) {
    if(err){
      console.log("can't!");
    }else{
        res.render('contacts/index', {rows:rows});
    }
  });
});

app.get('/contacts/:name', function(req, res){
  var name = req.params;
  var sql = "SELECT * FROM book WHERE name = ?";
  var params = [name.name];
  connection.query(sql,params,function(err,rows,fields) {
    if(err){
      console.log("fuck you");
    }else{
        res.render('contacts/show', {rows:rows});
    }
  });
});

app.get('/contacts/:name/edit', function(req, res){
  var name = req.params;
  var sql = "SELECT * FROM book WHERE name = ?";
  var params = [name.name];
  connection.query(sql,params,function(err,rows,fields) {
    if(err){
      console.log("fuck you");
    }else{
        res.render('contacts/edit', {rows:rows});
    }
  });
});

app.put('/constacts/:name', function(req, res){

});


// Contacts - New // 8
app.get('/contacts/new', function(req, res){
  res.render('contacts/new');
});


// Contacts - create // 9
app.post('/contacts', function(req, res){
  var sql = "INSERT INTO book (name, email, phone) VALUES(?, ?, ?)";
  var params = [req.body.name, req.body.email, req.body.phone];
  connection.query(sql, params, function(err, rows, fields){
  	if(err){
  		console.log(err);
  	} else {
  		res.redirect('contacts');
  	}
  });
});
