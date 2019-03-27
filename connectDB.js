var mysql = require('mysql');

var db = mysql.createConnection({
    host: 'localhost',
    user: 'snu',
    password: '12345',
    database: 'sn'
});

db.connect((err) => {
    if(err) {
        console.log("\nERROR: Error Connecting Database\n\n");
        throw err;
    }
    else
        console.log("\nOKAY: Database is connected\n\n");
});

module.exports = db;