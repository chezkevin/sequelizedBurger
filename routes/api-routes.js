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
      var query = {};
      db.Burger.findAll({}).then(function(dbBurg) {
        console.log("db Burg data: " + dbBurg);
        res.json(dbBurg);
      });
    });

  // POST route for saving a new post
  app.post("/api/burgers", function(req, res) {
    db.Burger.create(req.body).then(function(dbBurg) {
      res.json(dbBurg);
    });
  });

  // PUT route for updating burgers
  app.put("/api/posts", function(req, res) {
    db.Post.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbPost) {
        res.json(dbPost);
      });
  });

};
