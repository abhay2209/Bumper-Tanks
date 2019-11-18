var express = require('express');
var http = require('http');
var socketIO = require('socket.io');
const path = require('path');
const PORT = process.env.PORT || 5000
const { Pool } = require('pg');
const session = require('express-session');
const request = require('request');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
var password_hash = require('password-hash');
const app = express()
const server = http.Server(app)
const io = socketIO(server)

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/matter-build', express.static(__dirname + '/node_modules/matter-js/build/'))
app.set('views', path.join(__dirname, 'public/views'));
app.set('view engine', 'ejs');

app.use(cookieParser());
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});
app.use(session({
  secret: 'dummystatement',
  cookie:{
    maxAge : 20000,  //to test for now
    name: 'mycookie',
    resave: true,
    saveUninitialized: false,
    rolling:true,
  },
}))

app.get('/db', async (req, res) => {
    try {
      console.log("Database accessed");
      const client = await pool.connect()
      const result = await client.query('SELECT * FROM test_table');
      const results = { 'results': (result) ? result.rows : null};
      res.render('pages/db', results );
      client.release();
    } catch (err) {
      console.log("Database denied");
      console.error(err);
      res.send("Error " + err);
    }
  });

 // check for session
app.get('/', (req, res, next) => {
    if (req.session.loggedin){
        console.log("logged in");
       res.render('GameCanvas');
    }else{
      next();
    }
});

// Renders Home Page
app.get('/', (req, res) => {
  res.render('Home', {isError:"false", regShown:1});
  //console.log("Cookies :  ", req.cookies);
});

//get player info from login page
app.post("/:id", async (req, res) => {
  var id = req.params.id;

  if (id == "login")
  {
    SignIn(req, res);
  }
  else if (id == "add")
  {
    SignUp(req, res);
  }
  else if (id == "signout")
  {
    SignOut(req, res);
  }

});

  server.listen(PORT, () => console.log(`Listening on ${ PORT }`));

  var players = {};
  let bullet = {};
  io.on('connection', function(socket) {
    console.log("A user connected")
    socket.on('username', function(username) {
        socket.username = username;
        io.emit('is_online', '🔵 <i>' + socket.username + ' join the chat..</i>');
    });

    socket.on('disconnect', function(username) {
        io.emit('is_online', '🔴 <i>' + socket.username + ' left the chat..</i>');
    })

    socket.on('chat message', function(message, username) {
        io.emit('chat message', username + ': ' + message);
    });


  });

  setInterval(function() {
    io.sockets.emit('state', players, bullet);
  }, 1000 / 60);


  function getCurrentWeather() {
    var darkSkyStr = `https://api.darksky.net/forecast/${process.env.DARKSKY_KEY}/${process.env.VANCOUVER_LAT},${process.env.VANCOUVER_LON}`;
      return new Promise(resolve => {
        request(darkSkyStr, { json:true }, (err, result, body) => {
          if(err)
          {
            return console.log("Error: ", err);
          }
          currentWeather = body.currently;
          resolve(currentWeather);
        });
      });
  }

  function SignIn(req, res){
    var username = req.body.username_login;
    var password = req.body.password_login;
    app.locals.username = username;
    var check_password_username = `SELECT username, password FROM gamedata WHERE username = '${username}';`;

    pool.query(check_password_username, async function(err,result){
      if(err){
        res.end(err);
      }
      // if username found check for password
      if(result.rows.length){

        if(password_hash.verify(password, (result.rows[0].password))){
          req.session.loggedin = true;
          req.session.username = username;
          await getCurrentWeather(); //update weather
          console.log("session:  ", req.session);
          res.render('GameCanvas', {username: req.session.username} );
        }else{
          var result = {'rows': result.rows };
          res.render('Home',{ isError:"true"});
        }
      }else{
        res.render('Home',{ isError:"true"});
      }

    });
  }

  function SignUp(req, res){
    var email= req.body.email;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var userName = req.body.username_signup;
    var password = req.body.password;
    var password_hashed = password_hash.generate(password);
    console.log(password_hashed);
    //get each entry
    var insertQuerry = `insert into gamedata (email_id,first_name,last_name,username,password)
    values ('${email}','${firstName}','${lastName}','${userName}','${password_hashed}');`;

    console.log(insertQuerry);
    pool.query(insertQuerry,(error)=>{
      if(error){
        if (error.code == "23505"){
          res.render('signUp.ejs');
        }
      }else{
        res.render('Home.ejs',{ isError:"false"});
      }
    });
  }

  function SignOut(req, res){
    if(req.session.loggedin)
    {
      console.log("Signing Out");
      req.session.loggedin = 0;
      res.render('Home.ejs', { isError: "false" });
    }
  }
