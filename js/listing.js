$(document).ready(function () {

    // Gets an optional query string from our url (i.e. ?listing_id=23)
    var url = window.location.search;
    var listingId;
  
    // Flag to infidate updatning or creating.
    var updating = false;
  
    // If we have this section in our url, we pull out the listing id from the url
    // In localhost:8080/listings?listing_id=1, listingId is 1
    if (url.indexOf("?listing_id=") !== -1) {
      listingId = url.split("=")[1];
      getListingData(listingId);
    }
  
    // Get jQuery references to the listing body, title, form, and category select
    var titleInput = $("#title");
    var descriptionInput = $("#description");
    var contactInput = $("#contact");
    var listingCategorySelect = $("#category");
    var zipCodeInput = $("#zipcode");
    var payInput = $("#pay");
    var dueAtInput = $("#dueAt");
    var listingForm = $("#listing");
  
    // Give listingCategorySelect a default value
    listingCategorySelect.val("Technical Writing");
  
    // Event listener for submitting the form.
    $(listingForm).on("submit", function handleFormSubmit(event) {
      console.log("Submit clicked");
      event.preventDefault();
      // Validate that we have a title and description.
      if (!titleInput.val().trim() || !descriptionInput.val().trim()) {
        return;
      }
      // Build a newListing object to pass to the database.
      var newListing = {
        title: titleInput.val().trim(),
        description: descriptionInput.val().trim(),
        contact: contactInput.val().trim(),
        category: listingCategorySelect.val(),
        zipcode: zipCodeInput.val(),
        pay: payInput.val(),
        dueAt: dueAtInput.val()
      };
  
      console.log(newListing);
  
      // Update or create listing.
      if (updating) {
        newListing.id = listingId;
        updateListing(newListing);
      } else {
        submitListing(newListing);
      }
    });
  
    // Submit listing and redirect to dashboard.
    function submitListing(Listing) {
      $.post("/api/listing/", Listing, function () {
        window.location.href = "/dashboard";
      });
    }
  
    // Gets listing data for a listing if we're editing
    function getListingData(id) {
      $.get("/api/listings/" + id, function (data) {
  
        // If this listing exists, prefill our listing form.
        if (data) {
          titleInput.val(data.title);
          descriptionInput.val(data.description);
          contactInput.val(data.contact);
          listingCategorySelect.val(data.category);
          zipCodeInput.val(data.zipcode);
          payInput.val(data.pay);
          dueAtInput.val(moment.utc(data.dueAt).format("YYYY-MM-DD"));
          updating = true; // Set updating flag.
        }
      });
    }
  
    // Update listing then redirect to dashboard.
    function updateListing(listing) {
      $.ajax({
          method: "PUT",
          url: "/api/listings",
          data: listing
        })
        .then(function () {
          window.location.href = "/dashboard";
        });
    }
  });