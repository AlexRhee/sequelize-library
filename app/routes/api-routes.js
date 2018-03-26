// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
var Books = require("../models/book.js");


// Routes
// =============================================================
module.exports = function (app) {

  // Add sequelize code to get all books and return them as JSON
  app.get("/api/all", function (req, res) {
    Books.findAll({}).then(function (data) {
      res.json(data);
    })
  });

  // Add sequelize code to get a specific book and return it as JSON
  app.get("/api/:book", function (req, res) {

    var routeName = req.params.book.replace(/\s+/g, "").toLowerCase();

    if (req.params.book) {
      Books.findOne({
        where: {
          'title': routeName
        }
      }).then(function (data) {
        res.json(data);
      })
    }
    else {
      Books.findAll({}).then(function (data) {
        res.json(data);
      })
    }
  });

  // Add sequelize code to get all books of a specific genre and return them as JSON
  app.get("/api/genre/:genre", function (req, res) {



    if (req.params.genre) {
      Books.findAll({
        where: {
          'genre': req.params.genre
        }
      }).then(function (data) {
        res.json(data)
      })

    }
    else {
      Books.findAll({}).then(function (data) {
        res.json(data);
      })
    }
  });

  // Add sequelize code to get all books from a specific author and return them as JSON
  app.get("/api/author/:author", function (req, res) {



    if (req.params.author) {
      Books.findAll({
        where: {
          'author': req.params.author
        }
      }).then(function (data) {
        res.json(data);
      })
    }
    else {
      Books.findAll({}).then(function (data) {
        res.json(data);
      })
    }

  });

  // Add sequelize code to get all "long" books (more than 150 pages) and return them as JSON
  app.get("/api/books/long", function (req, res) {
    Books.findAll({
      where: {
        'pages': {
          $gt: 150, 
        }
      }
    }).then(function(data){
      res.json(data);
    })
  });

  // Add sequelize code to get all "short" books (150 pages or less) and return them as JSON
  app.get("/api/books/short", function (req, res) {
    Books.findAll({
      where: {
        pages: {
          $lte: 150
        }
      }
    }).then(function(data){
      res.json(data);
    })
  });

  // Add sequelize code to create a book
  app.post("/api/new", function (req, res) {
    var book = req.body;

    Books.create({
      title: book.title,
      author: book.author,
      genre: book.genre,
      pages: book.pages
    })
  });

  // Add sequelize code to delete a book
  app.post("/api/delete", function (req, res) {
    Books.destroy({
      where: {
        id: this.id
      }
    })
  });

};
