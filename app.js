const   express             =   require("express"),
        app                 =   express(),
        passport            =   require('passport'),
        LocalStrategy       =   require('passport-local').Strategy,
        //To retreive details from the post request
        bodyParser          =   require("body-parser"),
        //mongoose framework
        mongoose            =   require("mongoose"),
     
        User                =   require("./models/user"),
        seedDb              =   require("./seeds");

// ROUTES 

const   commentRoute       =   require("./routes/comments"),
        campgroundRoute    =   require("./routes/campgrounds"),
        authRoute          =   require("./routes/index");
    
// seedDb();
// yelp_camp is db  name 
let moogooseUrl = "mongodb://localhost:27017/yelp_camp";
//connecting mongoose
mongoose.connect(moogooseUrl,
    { useNewUrlParser: true ,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
// ===============================
// App Config 
// ===============================
app.use(bodyParser.urlencoded({extended:true}));
// to include public folder & serve the content of public
app.use(express.static(__dirname+"/public"));
//for shorthand of file.ejs
app.set("view engine","ejs");



// ======================================================
// Passport Config 
// =====================================================

app.use(require('express-session')({
    secret:"This is the secret message of Najim",
    resave:false,
    saveUninitialized:false
}));
// tell express to use Passport:
app.use(passport.initialize());
app.use(passport.session());
//Adding serialing & deserializing
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(new LocalStrategy(User.authenticate()));
// It is middleware to show currentUser on all the pages 
// currentUser will be passed to all the routes
// Note - this middle ware must be after passport config  
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
});

app.use(authRoute);
app.use(commentRoute);
app.use(campgroundRoute);
// ================================================================
//                      CAMPGROUNDS ROUTES
// ================================================================



// ================================================================
//                      Comments ROUTES 
// ================================================================


// ================================================================
//                      AUTH ROUTES
// ================================================================

// Setting up port & IP address
app.listen(3000,function(request,response){
    
    console.log("YelpCamp Server has started");
});
