$(document).ready(function() {
  // Getting jQuery references to the post body, title, form, and author select
  var burgerInput = $("#burger-name");
  var cmsForm = $(".form");
  var devour = $(".delete.btn.btn-danger");

  // Adding an event listener for when the form is submitted
  $(cmsForm).on("submit", handleFormSubmit);

  // event listener for devour button
  $(document).on('click', devour, function(e) {
    var id = e.target.id;
    if (id > 0){
      $.ajax({
        method: "PUT",
        url: "/api/burgers",
        data: id
      })
      .done(function() {
        window.location.href = "/";
      });
    };
  });

  // Gets the part of the url that comes after the "?" (which we have if we're updating a post)
  var url = window.location.search;
  var postId;
  var authorId;
  // Sets a flag for whether or not we're updating a post to be false initially
  var updating = false;

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

  // Function to  render a list of burgers
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
