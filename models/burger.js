module.exports = function(sequelize, DataTypes) {
  // Creates a "Burger" model with the following configuration

  // 1. An autoincrementing primary key id
  // 2. A burger name of type STRING
  // 3. A devoured property of type BOOLEAN
  // 4. A date property of date
  var Burger = sequelize.define("Burger", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    burger_name: {
      type: DataTypes.STRING
    },
    devoured: {
      type: DataTypes.BOOLEAN
    }
    // ,
    // date: {
    //   type: Sequelize.literal('CURRENT_TIMESTAMP')
    // }
  });
  return Burger;
};
