const bcrypt = require("bcryptjs");
const uuid = require("uuid");
const database = require("../database.config").default;
const User = require("../models/user.model");

const jwt = require("jsonwebtoken");

exports.signup = (req, res, next) => {
  //Cryptage du password
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      //Création d'un nouvel utilisateur
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hash,
      });
      //Enregistrement du new user dans la base de données
      let sql = `INSERT INTO user(name, email, password) VALUES ("${uuid.v5()}", ${database.escape(
        hash
      )}, now() )`;
      let values = [user.name, user.email, user.password];
      database.query(sql, [values], function (err) {
        console.log(err);
        if (err) {
          return res.status(404).json({ err });
        }
        //Si absence d'erreur, on crée un nouveau token pour ce new user
        let sql = `SELECT * FROM User WHERE email = ?`;
        database.query(sql, [req.body.email], function (err, data) {
          console.log(err);
          if (err) {
            return res.status(401).json({ err });
          }
          res.status(200).json({
            userId: data[0].id,
            name: data[0].name,
            //Encodage d'un nouveau token
            token: jwt.sign(
              { userId: data[0].id, name: data[0].name },
              "CEDRIC_BATINA_TOKEN_SECRET",
              { expiresIn: "24h" }
            ),
          });
        });
      });
      database.query(
        `INSERT INTO user(registered) VALUES (now()) WHERE email = $(req.body.email)`
      );
    })
    .catch((error) => res.status(500).json({ error }));
  console.log(error);
};

// login module
exports.login = (req, res, next) => {
  // let user = req.body.email;
  database
    .query(`SELECT user.id FROM user WHERE email = $(req.body.email)`)
    .then((user) => {
      if (!user) {
        return res.status(403).json({ message: "User not found!!" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({
              message: "Incorrect password!!",
            });
          }
          res.status(202).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              "CEDRIC_BATINA_TOKEN_SECRET",
              { expiresIn: "24h" }
            ),
          });
          database.query(
            `UPDATE user SET lastLogin = now() WHERE id = $(data[o].id)`
          );
          if (err) {
            return res.status(405).json({
              message: "An error has occured!!",
            });
          } else {
            return res.status(202).json({
              message: "You are logged in!!",
            });
          }
        })
        .catch((error) => {
          res.status(501).json({ error: error });
        });
    })

    .catch((error) => {
      res.status(502).json({ error: error });
    });
  next();
};
