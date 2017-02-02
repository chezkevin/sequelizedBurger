$(document).ready(function() {
  /* global moment */

  // uneatenBurgerContainer holds our uneaten burgers
  var uneatenBurgerContainer = $(".uneaten-burger-container");

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
    $.get("/", function(data) {
      console.log("burgers", data);
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
      burgersToAdd.push(createNewRow(burgers[i]));
    }
    uneatenBurgerContainer.append(burgersToAdd);
  }
  
  // This function constructs a post's HTML
    function createNewRow(post) {
      var formattedDate = new Date(post.createdAt);
      formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
      var newPostPanel = $("<div>");
      newPostPanel.addClass("panel panel-default");
      var newPostPanelHeading = $("<div>");
      newPostPanelHeading.addClass("panel-heading");
      var deleteBtn = $("<button>");
      deleteBtn.text("x");
      deleteBtn.addClass("delete btn btn-danger");
      var editBtn = $("<button>");
      editBtn.text("EDIT");
      editBtn.addClass("edit btn btn-info");
      var newPostTitle = $("<h2>");
      var newPostDate = $("<small>");
      var newPostAuthor = $("<h5>");
      newPostAuthor.text("Written by: Author name display is in next activity when we learn joins!");
      newPostAuthor.css({
        float: "right",
        color: "blue",
        "margin-top":
        "-10px"
      });
      var newPostPanelBody = $("<div>");
      newPostPanelBody.addClass("panel-body");
      var newPostBody = $("<p>");
      newPostTitle.text(post.title + " ");
      newPostBody.text(post.body);
      newPostDate.text(formattedDate);
      newPostTitle.append(newPostDate);
      newPostPanelHeading.append(deleteBtn);
      newPostPanelHeading.append(editBtn);
      newPostPanelHeading.append(newPostTitle);
      newPostPanelHeading.append(newPostAuthor);
      newPostPanelBody.append(newPostBody);
      newPostPanel.append(newPostPanelHeading);
      newPostPanel.append(newPostPanelBody);
      newPostPanel.data("post", post);
      return newPostPanel;
    }
});
