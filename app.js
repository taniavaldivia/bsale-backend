require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mysql = require('mysql')
const app = express()
const port = process.env.PORT

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
})
 
connection.connect()

connection.on('error', function(err) {
  console.log(err);
});

app.use(cors())
app.use(express.json())

app.all('*', function(req, res, next) {
  var origin = req.get('origin') 
  res.header('Access-Control-Allow-Origin', origin)
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

setInterval(function () {
  connection.query('SELECT 1')
  console.log('KEEP ALIVE')
}, 4500)

app.get('/', (req, res) => {
  return res.status(200).send('Up and Running')
})

app.get('/products', (req, res) => {
  connection.query('SELECT * FROM product', (err, results) => {
    if (err) { console.log(err) }
    return res.status(200).send(results)
  })
})

app.get('/categories', (req, res) => {
  connection.query('SELECT * FROM category', (err, results) => {
    if (err) { console.log(err) }
    return res.status(200).send(results)
  })
})

app.get('/search', (req, res) => {
  if (!req.query.search) return res.send('SEARCH STRING IS REQUIRED')
  const search = mysql.escape(req.query.search)

  connection.query(`SELECT * FROM product WHERE name LIKE '%${search.replaceAll("'", '')}%'`, (err, results) => {
    if (err) { console.log(err) }
    return res.status(200).send(results)
  })
})

app.get('/products/:id', (req, res) => {
  if (!req.params.id) return res.send('MUST INCLUDE ID')

  connection.query(`SELECT * FROM product WHERE id = ${mysql.escape(req.params.id)}`, (err, results) => {
    if (err) { console.log(err) }
    return res.status(200).send(results)
  })
})

app.get('/products/category/:id', (req, res) => {
  if (!req.params.id) return res.send('MUST INCLUDE ID')

  const query = `SELECT * FROM product WHERE category = ${mysql.escape(req.params.id)}`
 
  connection.query(query, (err, results) => {
    if (err) { console.log(err) }
    return res.status(200).send(results)
  })
})