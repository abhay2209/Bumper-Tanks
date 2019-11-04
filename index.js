const express = require('express');
const path = require('path');
var http = require('http');
var app = express();
var socketIO = require('socket.io');
var server = http.Server(app);
var io = socketIO(server);

const PORT = process.env.PORT || 5000

/* const { Pool } = require('pg');

var pool;
pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});
*/

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/matter-build', express.static(__dirname + '/node_modules/matter-js/build/'))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/', (req, res) => {res.sendFile(__dirname + '/public/src/gameCanvas.html');}); // Renders Home Page
  /*
app.get('/db', async (req, res) => {
    try {
      const client = await pool.connect()
      const result = await client.query('SELECT * FROM test_table');
      const results = { 'results': (result) ? result.rows : null};
      res.render('pages/db', results );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  });
  */
  server.listen(PORT, () => console.log(`Listening on ${ PORT }`));



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
