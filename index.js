const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000
const { Pool } = require('pg');
const session = require('express-session')
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
var password_hash = require('password-hash');

var http = require('http');
var socketIO = require('socket.io');
var server = http.Server(app);
var io = socketIO(server);

var app = express();
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
       res.sendFile(__dirname + '/public/src/gameCanvas.html');
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
app.post("/:id",(req, res) => {
  var id = req.params.id;

  // log in
  if (id == "login"){
    var username = req.body.username_login;
    var password = req.body.password_login;
    var check_password_username = `SELECT username, password FROM gamedata WHERE username = '${username}';`;

    pool.query(check_password_username,(err,result)=>{
      if(err){
        res.end(err);
      }
      // if username found check for password
      if(result.rows.length){

        if(password_hash.verify(password, (result.rows[0].password))){
          req.session.loggedin = true;
          req.session.username = username;
          console.log("session:  ", req.session);
          res.sendFile(__dirname + '/public/src/gameCanvas.html');
        }else{
          var result = {'rows': result.rows}
          res.render('Home',{ isError:"true"});
        }
      }else{
        res.render('Home',{ isError:"true"});
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

});

  app.listen(PORT, () => console.log(`Listening on ${ PORT }`));



  // Class to create tank objects

  class Bullet{
    constructor(tank){
      this.width = 10
      this.height = 4
      //this.x = where the tank at
      //this.y = where the tank at
      // this.maxSpeed = 4
      this.speed = 8 //discuss for weather condition
      this.numOfBullet = 5
      this.x = tank.x;
      this.y = tank.y + (tank.height/2) - 1.7;
      this.color = "yellow";
    }

    draw(ctx)
    {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update()
    {
      this.x -= this.speed;
    }

  }

  class Tank{
    constructor(canvasWidth, canvasHeight)
    {
      this.width = 60;
      this.height = 40;
      this.x = 0;
      this.y = 0;
      this.maxSpeed = 4;
      this.xSpeed = 0;
      this.ySpeed = 0;
      this.bullets = new Bullet(this);
      this.bulletX = 0;
    }

    fire(){
      let bullet = new Bullet(this);
      this.bullets.push(bullet);
    }

    stop()
    {
      this.xSpeed = 0;
      this.ySpeed = 0;
    }

    draw(ctx)
    {
      ctx.drawImage(image, this.x, this.y, this.width, this.height);

      for (var i = 0; i<this.bullets.length ; i++){
        this.bullets[i].draw(ctx);
      }
    }

    update(frameRate)
    {
      if(!frameRate)
        return;

      for (var i = 0; i<this.bullets.length ; i++){
        this.bullets[i].update();
      }

    }
  };


  var players = {};
  let bullet = {};
  io.on('connection', function(socket) {
    socket.on('new player', function() {
      players[socket.id] = new Tank();
    });

    socket.on('new bullet', function() {
      bullet = new Bullet(players[socket.id]);
    });
    socket.on('movement', function(tankAction) {
      var player = players[socket.id] || {};
      if (tankAction.left) {
          player.x -= 4;
          if(player.x < 0)
            player.x = 0;
      }
      if (tankAction.up) {
          player.y -= 4;
          if(player.y < 0)
            player.y = 0;
      }
      if (tankAction.right) {
          player.x += 4;
          if( player.x + player.width > 800 )
              player.x = 800 - player.width;
      }
      if (tankAction.down) {
          player.y += 4;
          if( player.y + player.height > 600 )
              player.y = 600 - player.height;
      }
      if(tankAction.shoot){
          bullet.x -= 8;
      }
    });
  });

  setInterval(function() {
    io.sockets.emit('state', players, bullet);
  }, 1000 / 60);
