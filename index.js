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

  var players = {};
  io.on('connection', function(socket) {
    socket.on('new player', function() {
      players[socket.id] = {
        x: 300,
        y: 300
      };
    });
    socket.on('movement', function(data) {
      var player = players[socket.id] || {};
      if (data.left) {
        player.x -= 5;
      }
      if (data.up) {
        player.y -= 5;
      }
      if (data.right) {
        player.x += 5;
      }
      if (data.down) {
        player.y += 5;
      }
    });
  });

  setInterval(function() {
    io.sockets.emit('state', players);
  }, 1000 / 60);


/*
setInterval(function() {
  io.sockets.emit('message', 'hi!');
}, 1000);
*/
