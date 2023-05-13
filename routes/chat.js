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

/* GET messages users. */
router.get('/get-messages/:id_user/:id_friend', function(req, res, next) {

    let id_user = req.params.id_user;
    let id_friend = req.params.id_friend;

    const sql = `
      SELECT id_messages, message, id_user, id_friend, status, messageDate
      FROM messages
      WHERE (id_user = ${id_user} AND id_friend = ${id_friend}) OR
        (id_user = ${id_friend} OR id_friend = ${id_user})
      ORDER BY messageDate
    `
  
    db.query(sql, (err, result) => {
      if(err){
        throw err;
      }
      if(!result.length){
        res.send([]);
      } else {
        res.send(result);
      }
    })
  });

// POST query
router.post('/', (req, res) => {

    const message = req.body.message;
    const id_user = req.body.id_user;
    const id_friend = req.body.id_friend;
  
    const data = [message, id_user, id_friend];

    let sql = `
        INSERT INTO messages(message, id_user, id_friend) VALUES(?, ?, ?)
    `;

    db.query(sql, data, (err, result) => {
        if(err){
            throw err;
        }
        res.setHeader('Content-Type', 'application/json');
        res.send({data: 'Your message was success send!'})
    }) 
});

// PUT query
router.put('/', (req, res) => {

  let id = req.body.id_messages;
  const message = req.body.message;
  let data = [message, id]

  let sql = `
    UPDATE messages SET message=? WHERE id_messages = ?
  `;

  db.query(sql, data, (err, result) => {
      if(err){
          throw err;
      } console.log(result);
      res.setHeader('Content-Type', 'application/json');
      res.send({data: 'Your message was success updated!'})
  }) 
});

// delete message by id
router.delete("/:id", (req, res) => {

  let id = req.params.id;

  let deleteSQL = `
      DELETE 
      FROM messages
      WHERE id_messages = ?
    `

  db.query(deleteSQL, [id], (err, rez) => {
    if (err) throw err;
    res.setHeader("Content-Type", "application/json");
    res.send({ data: `Messages was deleted.`});
  }); 
})

module.exports = router;
