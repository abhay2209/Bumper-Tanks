const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000
const { Pool } = require('pg');
const session = require('express-session')
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
var password_hash = require('password-hash');

var app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/matter-build', express.static(__dirname + '/node_modules/matter-js/build/'))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cookieParser());
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});
app.use(session({
  secret: 'dummystatement',
  cookie:{
    maxAge : 1000*60*60,  //to test for now
    name: 'mycookie',
    resave: true,
    saveUninitialized: false,
    rolling:true,
  },
}))

 // check for session
app.get('/', (req, res,next) => {
    if (req.session.loggedin){
        console.log("logged in");
       res.sendFile(__dirname + '/public/src/gameCanvas.html');
    }else{
      next();
    }
});


// Renders Home Page
app.get('/', (req, res) => {res.sendFile(__dirname + '/public/src/Home.html');
  //console.log("Cookies :  ", req.cookies);
});

//get player info from login page
app.post("/:id",(req, res) => {
  var id = req.params.id;

  // log in
  if (id == "login"){
    var username = req.body.username_login;
    var password = req.body.password_login;
    var check_password_username = `SELECT username, password FROM gamedata WHERE username = '${username}';`;

    pool.query(check_password_username,(err,result)=>{
      if(err){
        res.send(err);
      }
      // if username found check for password
      if(result.rows.length){
        if(password_hash.verify(password, (result.rows[0].password))){
          req.session.loggedin = true;
          req.session.username = username;
          console.log("session:  ", req.session);
          res.sendFile(__dirname + '/public/src/gameCanvas.html');
        }
      }
    });

  // if user want to signUp
  }else if (id == "add"){

    var email= req.body.email;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var userName = req.body.username_signup;
    var password = req.body.password;
    var password_hashed = password_hash.generate(password);
    console.log(password_hashed);
    //get each entry
    var insertQuerry = `insert into gamedata (email_id,first_name,last_name,username,password)
    values ('${email}','${firstName}','${lastName}','${userName}','${password_hashed}')`;

    pool.query(insertQuerry,(error)=>{
      if(error){
        if (error.code == "23505"){
          res.send("We could not make your account!")
        }else{
          res.end(error)
        }
      }else{
        res.sendFile('/');
      }
    });

  }

});

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
