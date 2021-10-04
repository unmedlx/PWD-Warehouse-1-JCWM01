const mysql = require("mysql");

//setup MYSQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "efendiayyas",
  database: "db_warehouse1",
  port: 3306,
  multipleStatements: true,
});

//test
db.connect((err) => {
  if (err) {
    return console.log.error(err.message);
  }
  console.log("MYSQL WAREHOUSE1 CONNECTED");
});

module.exports = { db };
