const express = require("express"),
    router = express.Router({ mergeParams: true }),
    Campground = require("../models/campground"),
    User = require("../models/user"),
    passport = require('passport');
//Show the register form
router.get("/register", (req, res) => {
    res.render("authenticate/register");
});


//handling sign up
router.post("/register", (req, res) => {
    User.register(new User({ username: req.body.username }), req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            return res.render("authenticate/register");
        }
        passport.authenticate("local")(req, res, () => {
            console.log("User is register");
            res.redirect("/campgrounds");
        });

    });
});

//login show login form
router.get("/login", (req, res) => {

    res.render("authenticate/login");
});

//handle the login logic
// app.post("/login",middleware,callback)
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), (req, res) => {

});


//Logout 
router.get("/logout", (req, res) => {
    // Logout is simple ,passport will delete all the session Storage 
    req.logout();
    res.redirect("/");
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;
