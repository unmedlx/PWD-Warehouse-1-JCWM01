const mysql = require("mysql")

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Owhbgtu11",
  database: "db_warehouse1",
  port: 3306,
  multipleStatements: true,
})

db.connect((err) => {
  if (err) {
    return console.error(`error: ${err.message}`)
  }
  console.log(`Connected to mysql server`)
})

module.exports = { db }
