$(document).ready(function () {

    // listingsContainer holds all of our listings.
    var listingsContainer = $(".listings-container");
    var listingCategorySelect = $("#category");
  
    // Click events for the edit and delete buttons
    $(document).on("click", "button.delete", handleListingDelete);
    $(document).on("click", "button.edit", handleListingEdit);
    listingCategorySelect.on("change", handleCategoryChange);
  
    var listings;
  
    // Get listings from the database and update view.
    function getListings(category) {
      var categoryString = category || "";
      if (categoryString) {
        categoryString = "/category/" + categoryString;
      }
      $.get("/api/listings" + categoryString, function (data) {
        listings = data;
        if (!listings || !listings.length) {
          displayEmpty();
        } else {
          initializeRows();
        }
      });
    }
  
    // Delete a listing.
    function deleteListing(id) {
      $.ajax({
          method: "DELETE",
          url: "/api/listings/" + id
        })
        .then(function () {
          getListings(listingCategorySelect.val());
        });
    }
  
    // Get the listings.
    getListings();
  
    // Append all of the listings to listingsContainer.
    function initializeRows() {
      listingsContainer.empty();
      var listingsToAdd = [];
  
      for (var i = 0; i < listings.length; i++) {
        listingsToAdd.push(createNewRow(listings[i]));
      }
  
      listingsContainer.append(listingsToAdd);
    }
  
    // This function constructs a listing's HTML
    function createNewRow(listing) {
      var newListingPanel = $("<div>");
      newListingPanel.addClass("panel panel-default");
  
      var newListingPanelHeading = $("<div>");
      newListingPanelHeading.addClass("panel-heading");
  
      var deleteBtn = $("<button id='deleteBtn'>");
      deleteBtn.text("x");
      deleteBtn.addClass("delete btn btn-danger");
  
      var editBtn = $("<button id='editBtn'>");
      editBtn.text("EDIT");
      editBtn.addClass("edit btn btn-default");
  
      var newListingTitle = $("<h4>");
  
      var newListingDate = $("<small>");
  
      var formattedDueDate = new Date(listing.dueAt);
      formattedDueDate = moment.utc(formattedDueDate).format("MMMM Do YYYY");
  
      var newListingPanelBody = $("<div id ='listingPanel'>");
      newListingPanelBody.addClass("jumbotron");
      newListingPanelBody.html("<h4 id='listingCategory'>" + "Job Category: " + listing.category + "</h4>" + "Description: " +
        listing.description + "<br/>" + "Contact Email: " + listing.contact + "<br/>" + "Zip Code: " + listing.zipcode + "<br/>" +
        "Hourly Rate: $" + listing.pay + " an hour" + "<br/>" + "Need completed by: " + formattedDueDate);
  
      var newListingBody = $("<p>");
      newListingTitle.text(listing.title + " ");
  
      var formattedDate = new Date(listing.createdAt);
      formattedDate = moment.utc(formattedDate).format("MMMM Do YYYY");
  
      newListingDate.text(formattedDate);
  
      newListingTitle.append(newListingDate);
  
      newListingPanelHeading.append(deleteBtn);
      newListingPanelHeading.append(editBtn);
      newListingPanelHeading.append(newListingTitle);
  
      newListingPanelBody.append(newListingBody);
  
      newListingPanel.append(newListingPanelHeading);
      newListingPanel.append(newListingPanelBody);
      newListingPanel.data("listing", listing);
  
      return newListingPanel;
    }
  
    // Delete listing.
    function handleListingDelete() {
      var currentListing = $(this).parent().parent().data("listing");
      deleteListing(currentListing.id);
    }
  
    // Edit listing.
    function handleListingEdit() {
      var currentListing = $(this).parent().parent().data("listing");
      window.location.href = "/listing?listing_id=" + currentListing.id;
    }
  
    // Display message when no listings.
    function displayEmpty() {
      listingsContainer.empty();
      var messageh2 = $("<h2>");
      messageh2.css({
        "text-align": "center",
        "margin-top": "50px"
      });
      messageh2.html("No listings yet for this category, navigate <a href='/listings'>here</a> in order to create a new listing.");
      listingsContainer.append(messageh2);
    }
  
    // Refresh page when category changes.
    function handleCategoryChange() {
      var newListingCategory = $(this).val();
      getListings(newListingCategory);
    }
  
  });