// Dependencies
// =============================================================

// This may be confusing but here Sequelize (capital) references the standard library
var Sequelize = require("sequelize");
// sequelize (lowercase) references my connection to the DB.
var sequelize = require("../config/connection.js");

// Creates a "Burger" model with the following configuration

// 1. An autoincrementing primary key id
// 2. A burger name of type STRING
// 3. A devoured property of type BOOLEAN
// 4. A date property of date
var Burger = sequelize.define("burgers", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  burger_name: {
    type: Sequelize.STRING
  },
  devoured: {
    type: Sequelize.BOOLEAN
  },
  date: {
    type: Sequelize.literal('CURRENT_TIMESTAMP')
  }
});

// Sync model with DB
Burger.sync();

// Makes the Book Model available for other files
module.exports = Burger;
