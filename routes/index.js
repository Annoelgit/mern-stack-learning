var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/submit', async function(req, res) {
  console.log(req.body);
  
  try {
    const client = await MongoClient.connect("mongodb://localhost:27017/", { useNewUrlParser: true, useUnifiedTopology: true });
    const db = client.db("signup");
    
    await db.collection('user').insertOne(req.body);
    
    client.close(); // Close the connection
    res.send("Data inserted successfully");
  } catch (err) {
    res.status(500).send('Error connecting to the database: ' + err.message);
  }
});

module.exports = router;
