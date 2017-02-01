/*********************
Dependencies
*********************/
var express = require('express');
var burgerJs = require('../models/burger.js');

// the library of functions to export
module.exports = function(app){
  // uses a route to go to in the app/views folder and return which handlebars file to use
  // inserts the data from allBurgers to the burgers object in index.handleBars, and then renders it
  app.get('/', function (req, res){
    burgerJs.allBurgers(function(data) {
      res.render('index', {
        uneatenBurgers: data.uneaten,
        eatenBurgers: data.eaten
      });
    });
  });

  // this route adds a burger to the database
  app.post('/', function (req, res){
    var newBurger = req.body.burger;
    // use burgers.create to add to database
    burgerJs.create(newBurger, function() {
        res.redirect('/');
    });
  });

  // this route moves a burger from devoured: false to devoured: true
  app.get('/burger-:id',function(req,res){
    burgerJs.devour(req.params.id,function(data){
      res.redirect('/');
    });
  });

}
