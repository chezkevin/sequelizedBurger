// require the database connection
var connection = require('./connection.js');

// export the functions
module.exports = {
  selectAll: selectAll,
  insertOne: insertOne,
  selectScoped: selectScoped,
  updateOne: updateOne
}

// each function below takes in callback as a parameter
// this way, it can take the data returned from sql functions
// and return it back to burger.js

// Selects all burgers
function selectAll(table, cb) {
  var query = 'SELECT * FROM ' + table;
  connection.query(query, function(error, data) {
      if (error) throw error;
      cb(data);
  });
}

// adds a burger to the database
function insertOne(burgName,cb){
  var query = 'INSERT into burgers(burger_name) VALUES(?)';
  connection.query(query,[burgName],function(error,data){
    if (error) throw error;
    cb();
  })
}

// selects rows from database based on criteria
function selectScoped(table, column, value, callback) {
    var query = 'SELECT * FROM ' + table + ' WHERE ' + column + ' = ' + value;
    connection.query(query, function(error, data) {
        if (error) throw error;
        callback(data);
    });
}

// sets burger to devoured
function updateOne(burgId,cb){
  var query = 'UPDATE burgers SET devoured = 1 WHERE id = ?';
  connection.query(query,[burgId],function(error,data){
    if (error) throw error;
    cb();
  })
}
