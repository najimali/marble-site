const express = require("express"),
    router = express.Router({ mergeParams: true }),
    Campground = require("../models/campground");

//landing page
router.get("/", function (request, response) {

    response.redirect("/campgrounds");
});

//Campground All images page
// INDEX ROUTES- /campgrounds  - GET - Display a list of all campgrounds
router.get("/campgrounds", function (request, response) {
    // body...

    //get all compgrounds from the db
    Campground.find({}, function (error, allCampground) {
        if (error) { console.log(error); }
        else { response.render("campgrounds/index.ejs", { campgroundsVar: allCampground, currentUser: request.user }); }
    });


});
//Add new Campground
// CREATE      /addCampground         POST        Add new campground to DB
router.post("/campgrounds",isLoggedIn, function (request, response) {
    //get the data from the form & adding to campgrounds collections
    const newCampground =   request.body.campground;
    newCampground.author={
        id:request.user._id,
        username:request.user.username
    };
    console.log("User is "+ request.user.username);
    //Adding to collections & then redirecting to All images page
    Campground.create(newCampground, function (error, newlyCreatedCampground) {
        if (error) {
            console.log("Something went wrong");
            console.log(error);
        }
        else {
            console.log("New Campground Added......");
            console.log(newlyCreatedCampground);
            //redirect back to campground page 
            response.redirect("/campgrounds");

        }
    });

});

// Form page
// NEW ROUTE -  /campgrounds/new  -   GET  -Display a form to make a new campground
router.get("/campgrounds/new", isLoggedIn, function (request, response) {

    response.render("campgrounds/new.ejs");
});


// SHOW ROUTE - /campgrounds/:id  - GET - Shows the info about one campground

router.get("/campgrounds/:id", function (request, response) {
    // ).populate("comments").exec( - helping to populate comments because initially 
    // campground only contains the id but not actual comments
    //find the campground with the provided ID
    Campground.findById(request.params.id).populate("comments").exec(function (error, foundCampground) {

        if (error) { console.log("Something went wrong in the show "); }
        else {

            // render show the template with that campground
            response.render("campgrounds/show.ejs", { campgroundVar: foundCampground });
        }
    });
    // let id = request.params.id;


});
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}


module.exports = router;