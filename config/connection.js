// require mysql
var mysql = require("mysql");

// configuration for local instances
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Suicytwo2",
    database: "burgers_db"
});

// export the connection
module.exports = connection;
