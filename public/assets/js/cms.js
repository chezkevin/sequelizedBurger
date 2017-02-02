$(document).ready(function() {
  // Getting jQuery references to the post body, title, form, and author select
  var burgerInput = $("#burger-name");
  var cmsForm = $(".form");

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
      burger_name: burgerInput
        .val(),
      devoured: false
    };

    // runs submitBurger function
    submitBurger(newBurger);
  }

  // Submits a new post and brings user to blog page upon completion
  function submitBurger(burger) {
    $.post("/api/burgers", burger, function() {
      window.location.href = "/";
    });
  }

  // A function to get Burgers and then render our list of Burgers
  function getBurgers() {
    $.get("/api/burgers", renderAuthorList);
  }
  // Function to either render a list of authors, or if there are none, direct the user to the page
  // to create an author first
  function renderAuthorList(data) {
    if (!data.length) {
      window.location.href = "/";
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
