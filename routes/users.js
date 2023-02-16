var express = require('express');
var router = express.Router();
var db = require('../config/pepper');
const passport = require('../config/passport');
const bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync();

router.use(function(req, res, next) {
  //res.header("Access-Control-Allow-Origin", "http://pepper-team.herokuapp.com");
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  const sql = `
    SELECT *
    FROM user
  `

  db.query(sql, (err, result) => {
    if(err){
      throw err;
    }
    if(!result.length){
      res.send("There is no users.");
    } else {
      res.send(res);
    }
  })
});

// POST query
router.post('/', (req, res) => {
  const password = req.body.password;
  const email = req.body.email;

  let sql = `
    SELECT *
    FROM user
    WHERE email = ?
  `

  db.query(sql, [email], (err, result) => {
    if(err){
      console.error(err);
    }
    if(!result.length){
      bcrypt.hash(password, salt, (err, hash) => {
        if(err){
          return next(err);
        } 
        let pass = hash;
        let name = req.body.name;
        let phone = req.body.phone;
        var data = [name, email, phone, pass];
        
        let insertSQL = `
          INSERT INTO user(name, email, phone, password) VALUES(?)
        `;

        db.query(insertSQL, [data], (err, result) => {
          if(err){
            console.error(err);
          }
          res.setHeader('Content-Type', 'application/json');
          res.send({data: 'You was registered!'});
        })
      })
    } else {
      res.status(200).send('User with this email is already exists.')
    }

  })
})

module.exports = router;
