var express = require('express');
var router = express.Router();
var db = require('../config/pepper');
const passport = require('../config/passport');
const bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync();

var multer=require('multer');
var path = require('path');
var storage = multer.diskStorage({
  destination: (req, file, callback)=> {
    callback(null, './public/images/uploads');
  },
  filename:(req, file, callback)=>{
    callback(null, Date.now()+ '-' +file.originalname);
  }
});

var upload = multer({storage: storage}).single('file');

router.use(function(req, res, next) {
  //res.header("Access-Control-Allow-Origin", "http://pepper-team.herokuapp.com");
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
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
      console.log(err);
      res.send("There is no users.");
    } else {
      console.log(result);
      res.send(result);
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
        let photo = 'default.jpg';
        var data = [name, email, phone, pass, photo];
        
        let insertSQL = `
          INSERT INTO user(name, email, phone, password, photo) VALUES(?)
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
});

/* UPDATE existing users by ID. */
router.put("/:id", (req, res) => {

  let password = req.body.password;
  let id = req.params.id;

  bcrypt.hash(password, salt, (err, hash) => {
    if(err){
      return next(err);
    } 
    let pass = hash;
    let email = req.body.email;
    let name = req.body.name;
    let phone = req.body.phone;
    var data = [name, email, phone, pass, id];
    
    
    let insertSQL = `
     UPDATE user SET name=?, email=?, phone=?, password=? where id_user=?
    `;

    db.query(insertSQL, data, (err, result) => {
      if(err){
        console.error(err);
      }
      res.setHeader('Content-Type', 'application/json');
      res.send({email, name, phone});
    })
  })
})

router.get('/get-photo/:id', function(req, res, next) {
  let id = req.params.id;
  let sql = 'select photo from user where id_user = ?'

  db.query(sql, [id], (err, result) => {
    if(err){
      throw err 
    }
    if(!result.length){
      res.send('no photo');
    }
    else{
      res.sendFile(path.resolve(__dirname, '../public/images/uploads/' + result[0].photo))  
    }
  });
});

router.post('/set-photo/:id', (req, res) => {
  upload(req, res, (err)=> {
    if(err instanceof multer.MulterError){
      console.error('multer error');
    }
    else if(err){
      throw err
    }

    let id = req.params.id;
    let file = req.file.filename;
    let data = [file, id];
    let updateSql = `UPDATE user set photo=? where id_user=?`;

    db.query(updateSql, data, (err, result)=>{
      if(err){
        throw err;
      }
    });
  })
});



module.exports = router;
