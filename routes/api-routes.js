// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the posts
    app.get("/api", function(req, res) {
      var object = {};
      db.Burger.findAll({}).then(function(dbBurg) {
        res.json(dbBurg);
      });
      // db.Burger.findAll({
      //       where: {
      //           devoured: false
      //       }
      //   }).then(function(result) {
      //       object.uneatenBurgers = result;
      //       return;
      //   }).then(function() {
      //     return Burger.findAll({
      //         where: {
      //             devoured: true
      //         }
      //     });
      //   }).then(function(result) {
      //       object.eatenBurgers = result;
      //       return;
      //   }).then(function() {
      //       res.json('index', {
      //           uneatenBurgers: object.uneatenBurgers,
      //           eatenBurgers: object.eatenBurgers
      //       });
      //   });
    });

  // POST route for saving a new post
  app.post("/api/burgers", function(req, res) {
    db.Burger.create(req.body).then(function(dbBurg) {
      res.json(dbBurg);
    });
  });

  // PUT route for devouring burgers
  app.put("/api/burgers", function(req, res) {
    db.Burger.update({
        devoured: true
        },{
        where: {
          id: req.body.id
        }
      }).then(function(dbBurg) {
        res.json(dbBurg);
      });
  });

};
