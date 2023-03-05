var express = require('express');
var router = express.Router();
var db = require('../config/pepper');

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
router.get('/:id', function(req, res, next) {

    let id = req.params.id;

    const sql = `
      SELECT *
      FROM friend_request
      WHERE id_friend = ${id} OR id_user = ${id} 
    `

    db.query(sql, (err, result) => {
      if(err){
        throw err;
      }
      if(!result.length){
        res.send("There is no friends.");
      } else {
        res.send(result);
      }
    })
});

/* GET users friends. */
router.get('/', function(req, res, next) {

  const sql = `
    SELECT *
    FROM friend_request
    WHERE status = 1  
  `

  db.query(sql, (err, result) => {
    if(err){
      throw err;
    }
    if(!result.length){
      res.send("There is no friends.");
    } else {
      res.send(result);
    }
  })
});

// POST query
router.post('/', (req, res) => {
    const id_user = req.body.id_user;
    const id_friend = req.body.id_friend;
  
    const data = [id_user, id_friend];

    let getSQL = `
        SELECT *
        FROM friend_request
        WHERE id_user = ? AND id_friend = ?
    `;

    db.query(getSQL, data, (err, result) => {
        if(err){
            throw err;
        }
        if(!result.length){
            let sql = `
                INSERT INTO friend_request(id_user, id_friend) VALUES(?)
            `;
  
            db.query(sql, [data], (err, result) => {
                if(err){
                    console.error(err);
                }
                res.setHeader('Content-Type', 'application/json');
                res.send({data: 'You create friend request!'});
            })
        }
        else {
            res.setHeader('Content-Type', 'application/json');
            res.send({data: 'You already created this friend request!'});
        }
    }) 
});

/* UPDATE your friend by ID. */
router.put("/", (req, res) => {

    let id_user = req.body.id_user;
    let id_friend = req.body.id_friend;
    let status = req.body.status;
    const data = [status, id_user, id_friend];
    console.log(data);

    let insertSQL = `
       UPDATE friend_request SET status=? where id_user=? and id_friend = ?
    `;
  
    db.query(insertSQL, data, (err, result) => {
        if(err){
          console.error(err);
        }
        res.setHeader('Content-Type', 'application/json');
        res.send({data: 'You accepted invitation.'});
    })
})

module.exports = router;
