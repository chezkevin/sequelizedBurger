$(document).ready(function() {
  /* global moment */

  // uneatenBurgerContainer holds our uneaten burgers
  var uneatenBurgerContainer = $(".uneaten-burger-container");
  var eatenBurgerContainer = $(".eaten-burger-container");

  // Click events for the edit and delete buttons
  //$(document).on("click", "button.delete", handlePostDelete);

  // Variable to hold our burgers
  var burgers;

  // The code below handles the case where we want to get burgers for a specific author
  // Looks for a query param in the url for author_id
  var url = window.location.search;
  var authorId;
  getburgers();


  // This function grabs burgers from the database and updates the view
  function getburgers() {
    $.get("/api", function(data) {
      burgers = data;
      initializeRows();
    });
  }

  // This function does an API call to delete burgers
  // function deletePost(id) {
  //   $.ajax({
  //     method: "DELETE",
  //     url: "/api/burgers/" + id
  //   })
  //   .done(function() {
  //     getburgers(postCategorySelect.val());
  //   });
  // }

  // InitializeRows handles appending all of our constructed post HTML inside uneatenBurgerContainer
  function initializeRows() {
    uneatenBurgerContainer.empty();
    var burgersToAdd = [];
    for (var i = 0; i < burgers.length; i++) {
      console.log(burgers[i]);
      burgersToAdd.push(createNewRow(burgers[i]));
    }
    uneatenBurgerContainer.append(burgersToAdd);
  }

  // This function constructs a post's HTML
    function createNewRow(post) {
      var newPostPanel = $("<div>");
      newPostPanel.addClass("panel panel-default");
      var newPostPanelHeading = $("<div>");
      newPostPanelHeading.addClass("panel-heading");
      var deleteBtn = $("<button>");
      deleteBtn.text("Devour!");
      deleteBtn.addClass("delete btn btn-danger");
      $(deleteBtn).attr('id', post.id);
      var newPostTitle = $("<h2>");
      var newPostDate = $("<small>");
      var newPostAuthor = $("<h5>");
      newPostTitle.text(post.burger_name + " ");
      newPostPanelHeading.append(deleteBtn);
      newPostPanelHeading.append(newPostTitle);
      newPostPanelHeading.append(newPostAuthor);
      newPostPanel.append(newPostPanelHeading);
      newPostPanel.data("post", post);
      return newPostPanel;
    }
});
