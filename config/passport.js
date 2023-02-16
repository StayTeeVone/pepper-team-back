const localStrategy = require('passport-local').Strategy;
const db = require('./pepper');
const bcrypt = require('bcryptjs');

module.exports = function(passport){
    passport.use(
        new localStrategy({usernameField: 'email'}, (email, password, done) => {
            const sql = `
                SELECT *
                FROM user
                WHERE email = ?
            `;

            db.query(sql, [email], (err, res) => {
                if(err){
                    console.error(err);
                }
                if(!res.length){
                    return done(null, false, {message: "Email is not registered."});
                }
                else {
                    bcrypt.compare(password, res[0].password, (err, isMatch) => {
                        if(err){
                            throw err;
                        }
                        if(isMatch){
                            return done(null, res);
                        } else {
                            return done(null, false, {message: "Password is incorrect."})
                        }
                    })
                }
            })
        })
    );

    passport.seriallizeUser((user, done) => {
        done(null, user[0].id_user);
    });

    passport.deseriallizeUser((id_user, done) => {
        const sql = `
            SELECT *
            FROM user
            WHERE id_user = ?
        `
        db.query(sql, [id_user], (err, res) => {
            if(err){
                console.error(err);
            }
            done(err, res);
        })
    })
}