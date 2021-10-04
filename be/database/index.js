const mysql = require('mysql')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '2404Nadhif!',
    database: 'db_warehouse1',
    port: 3306,
    multipleStatements: true
})

db.connect((err) => {
    if (err) {
        return console.log(`error: ${err.message}`)
    }
    console.log('Connected to MySQL Server');
})

module.exports = { db }