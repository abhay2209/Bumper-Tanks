const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000
var app = express();
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
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/', (req, res) => {res.sendFile('/home/vlohana/cmpt276/BumperTanks/views/pages/gameCanvas.html')}); // Renders Home Page
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
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
