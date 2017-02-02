$(document).ready(function() {
  // Getting jQuery references to the post body, title, form, and author select
  var burgerInput = $("#burger-name");
  var cmsForm = $("#cms");

  // Adding an event listener for when the form is submitted
  $(cmsForm).on("submit", handleFormSubmit);
  // Gets the part of the url that comes after the "?" (which we have if we're updating a post)
  var url = window.location.search;
  var postId;
  var authorId;
  // Sets a flag for whether or not we're updating a post to be false initially
  var updating = false;

  // Getting the burgers
  getBurgers();

  // A function for handling what happens when the form to create a new burger is submitted
  function handleFormSubmit(event) {
    event.preventDefault();
    // Wont submit the post if we are missing a burger name!
    if (!burgerInput.val().trim() ) {
      return;
    }
    // Constructing a newBurger object to hand to the database
    var newBurger = {
      burger_name: bodyInput
        .val(),
      devoured: false
    };

  }

  // Submits a new post and brings user to blog page upon completion
  function submitBurger(burger) {
    $.post("/api/burgers", post, function() {
      window.location.href = "/";
    });
  }

  // Gets post data for the current post if we're editing, or if we're adding to an author's existing posts
  function getPostData(id, type) {
    var queryUrl;
    switch (type) {
      case "post":
        queryUrl = "/api/posts/" + id;
        break;
      case "author":
        queryUrl = "/api/authors/" + id;
        break;
      default:
        return;
    }
    $.get(queryUrl, function(data) {
      if (data) {
        console.log(data.AuthorId || data.id)
        // If this post exists, prefill our cms forms with its data
        titleInput.val(data.title);
        bodyInput.val(data.body);
        authorId = data.AuthorId || data.id;
        // If we have a post with this id, set a flag for us to know to update the post
        // when we hit submit
        updating = true;
      }
    });
  }

  // A function to get Authors and then render our list of Authors
  function getBurgers() {
    $.get("/api/authors", renderAuthorList);
  }
  // Function to either render a list of authors, or if there are none, direct the user to the page
  // to create an author first
  function renderAuthorList(data) {
    if (!data.length) {
      window.location.href = "/authors";
    }
    var rowsToAdd = [];
    for (var i = 0; i < data.length; i++) {
      rowsToAdd.push(createAuthorRow(data[i]));
    }
    authorSelect.empty();
    console.log(rowsToAdd);
    console.log(authorSelect);
    authorSelect.append(rowsToAdd);
    authorSelect.val(authorId);
  }

});
