const mysql = require('mysql')
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'userdb'

})

db.connect((err) =>{
    if(!err)
        console.log('DB connection successful')
    else
    console.log('DB connection failed')
})

module.exports = db;