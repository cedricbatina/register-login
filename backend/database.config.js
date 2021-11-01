const mysql = require("mysql");

const database = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "selfimprovement",
});
database.connect(function (err) {
  if (err) {
    console.log(" mySql Database: Connexion failed!!");
  } else {
    console.log("mySql Database: Connexion succeded!!");
  }
});
module.exports = database;
