const mysql = require('mysql');

const connection = mysql.createConnection ({
    host : 'localhost',
    user : "root",
    password : '',
    database: 'laptop_cruds'
});

module.exports = connection;