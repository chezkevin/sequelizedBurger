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
    app.get("/", function(req, res) {
      var query = {};
      db.Burger.findAll({}).then(function(dbBurg) {
        res.json(dbBurg);
      });
    });

  // POST route for saving a new post
  app.post("/api/burgers", function(req, res) {
    db.Burger.create(req.body).then(function(dbBurg) {
      res.json(dbBurg);
    });
  });
  // Get all books
  // app.get("/api/all", function(req, res) {
  //
  //   Burger.findAll({}).then(function(results) {
  //     res.json(results);
  //   });
  //
  // });

  // Get a specific burger
  // app.get("/api/:burger", function(req, res) {
  //
  //   if (req.params.burger) {
  //     Burger.findAll({
  //       where: {
  //         title: req.params.burger
  //       }
  //     }).then(function(results) {
  //       res.json(results);
  //     });
  //   }
  //
  // });

  // Get all books of a specific genre
  // app.get("/api/genre/:genre", function(req, res) {
  //
  //   if (req.params.genre) {
  //     Burger.findAll({
  //       where: {
  //         genre: req.params.genre
  //       }
  //     }).then(function(results) {
  //       res.json(results);
  //     });
  //   }
  //
  // });

  // Get all books from a specific author
  // app.get("/api/author/:author", function(req, res) {
  //
  //   if (req.params.author) {
  //     Book.findAll({
  //       where: {
  //         author: req.params.author
  //       }
  //     }).then(function(results) {
  //       res.json(results);
  //     });
  //   }
  //
  // });

};
