// require the orm
var orm = require('../config/orm.js');

// library of functions to be exported
module.exports = {
    allBurgers   : burgers,
    create       : create,
    // singleBurger : singleBurger,
    devour       : devour
}

// get all the burgers -- an object is returned with uneaten and eaten burgers
function burgers(cb) {
  var allBurgs = {};
    uneatenBurgers(function(data) {
        allBurgs.uneaten = data;
        eatenBurgers(function(data) {
            allBurgs.eaten = data;
            cb(allBurgs);
        });
    });
}

// query the database for uneaten burgers
function uneatenBurgers(cb) {
    orm.selectScoped('burgers', 'devoured', 'false', function(data) {
        cb(data);
    });
}

// query the database for eaten burgers
function eatenBurgers(cb) {
    orm.selectScoped('burgers', 'devoured', 'true', function(data) {
        cb(data);
    });
}

// adds a buruger to the database
function create(newBurg,cb){
  orm.insertOne(newBurg,function(){
    cb();
  });
}

// devours the burger: updates devoured column to true
function devour(burgId,cb){
  orm.updateOne(burgId,function(){
    cb();
  })
}
