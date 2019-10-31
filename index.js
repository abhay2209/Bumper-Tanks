const express = require('express');
const path = require('path');
const {
  PORT = 5000,
  SESSION_NAME = 'sid',
  SESSION_SECRET = 'testingfornow',
}=process.env
const { Pool } = require('pg');
const session = require('express-session')
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
var app = express();
app.use(cookieParser());
const router = express.Router();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});


app.use(session({
  name: 'mycookie',
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: false,
}))



app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'secret',resave: true,saveUninitialized: true}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/matter-build', express.static(__dirname + '/node_modules/matter-js/build/'))
app.set('views', path.join(__dirname, 'views'));
//app.set('pages', path.join(__dirname, 'public/src'));
app.set('view engine', 'ejs');
app.get('/cookie',function(req, res){
     res.cookie(cookie_name , 'cookie_value').send('Cookie is set');
});

var sessionChecker = (req, res, next) => {
    if (req.session.loggedin ) {
        console.log("user is logged in");
        res.redirect('/gameCanvas');
    } else {
        next();
    }
};

app.get('/',sessionChecker, (req, res) => {res.sendFile(__dirname + '/public/src/Home.html');
console.log("Cookies :  ", req.cookies);

}); // Renders Home Page



//get player info from login page
app.post("/:id",(req, res) => {
  var id = req.params.id;

   // if user want to signUp
   if (id == "add"){

      var email= req.body.email;
      var firstName = req.body.firstName;
      var lastName = req.body.lastName;
      var userName = req.body.username_signup;
      var password = req.body.password;

      //get each entry
      var insertQuerry = `insert into gamedata (email_id,first_name,last_name,username,password)
                          values ('${email}','${firstName}','${lastName}','${userName}','${password}')`;
      pool.query(insertQuerry,(error)=>{
            if(error){
              if (error.code == "23505"){
                res.send("We could not make your account!")
              }else{
                res.end(error)
              }
            }else{
              res.redirect('/');
            }
      });

    }else if (id == "login"){
      var username = req.body.username_login;
      var password = req.body.password_login;

      var check_password_username = `SELECT username, password FROM gamedata WHERE username = '${username}' AND password = '${password}';`;

      pool.query(check_password_username,(err,result)=>{
        if(err){
          res.send(err);
        }else if(result.rows.length){
          req.session.loggedin = true;
				  req.session.username = username;
          res.redirect('/gameCanvas')
        }else{
          res.send("Incorrect Username and/or Password!");
        }

      });

    }
});
app.get('/gameCanvas', (req, res) => {


    if (req.session.loggedin){
       res.sendFile(__dirname + '/public/src/gameCanvas.html');
       res.cookie('mycookie' , 'value', {expire :3000});
    }else{
      res.send("You could not log in");
    }
    //res.end();
});


// app.get('/db', async (req, res) => {
//     try {
//       const client = await pool.connect()
//       const result = await client.query('SELECT * FROM test_table');
//       const results = { 'results': (result) ? result.rows : null};
//       res.render('pages/db', results );
//       client.release();
//     } catch (err) {
//       console.error(err);
//       res.send("Error " + err);
//     }
//   });

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
