# Lesson - The Package.json

Package.json contains all the meta data about a particular app or package
such as description ,name ,author,dependecy , versions, contributer ,github repo url ,home page
etc.

Dependency -contains all the package a particular app relies on.

1.npm init - create a new package.json for our app where we can save packages
2.--save - will save the package name in the our package.json
To add others package in our own package.json then use npm install package_name --save

for eg - create a new folder PackageJsonDemo & create your package.json
add cat-me & express package 
Sol - 
mkdir PackageJsonDemo
npm init
# - add the details 
npm install express --save
npm install cat-me  --save

# Lesson - Routes Params


1. Star route (*) - when no route is match then we make a request to star route
i.e star route acts as defualt route path
Note -Order of route matters & check line by line so
      star route must always in the last 
* Write routes containing route parameters
We cannot always match the exact  path for different url so to avoid this we use route pattern match
Syntax-
app.get("/r/:pattern_1;
string after colon is the matching pattern

eg app.get("/r/:subredditName/comment/:id/:title");
here subredditName & id & title can be any string without slash but comment will always present in the path


# use request.params to extract the path info.
for eg 
app.get("r/:subredditName",function(request,response){
    
    let value = request.params.subredditName;
    
    response.send(value);
})



# Intermediate Express
Lesson - Termplates & EJS

#Rendering HTML & Templates
ejs - embedded javascript code.
*Use res.render("file_name.ejs",{key_1:params_1,key_2:params_2}) to render HTML(from on EJS file)

To make dynamic page ,we pass variable using render & key -params pair
create a folder views & make all your html ,css & front-end js in the views ,render will automatically search the file in the views folder.

use <%= key_1 %> to tell the html file to be treated as javascript code , everything inside <%= %> is treated as javascript code.
& use <%  %> for the js code if your dont want to print & just exceute the code

equal sign (=) expect the value & simple <%%> is for logic



# Lesson - Serving Custom Assets


some minor changes 
app.set("view engine","ejs"); -> this will tell the app to consider the all the views file to be assume of dot ejs extension

for eg 
we write app.get("/",function(request,response){
      response.render("home.ejs") - now we dont have to explicitly mention.ejs
      we can simply write response.render("home");
});

Note - all the style sheets has to be in folder name public & to include it 
we write - app.use(express.static("public")); - public is folder name

the above line will automatically look for public folder 
we can write 
<link  rel="stylesheet" href ="/style.css"> 

instead of giving complete path like href ="public/app.css"


Using Partial - to include same things again & again , we create them one time in the partial folder & use them using <%- include (file_path) -%>
use slash(/) before path if file is not present in the same directory

# Lesson -Post Request 

<form action ="post_url" method ="POST">

<input name ="passing_parameter_name">
</form>

form required two parameters 
1. action - contains the post url & it should be same as post url in the app.js file
2. for eg app.post("/addfriend");
2. method - define type of request eg GET ,POST etc 
 
in the input tag name will store the data which is passing 
for eg name ="newFriend"  then input of input is contain in the newFriend & can be used further.


# extracting the passing parameters 
To extract the passing parameters from the body we need body parser in the request method
let passingData = request.body.name_variable_from_the_input_tag

finally redirect the page to which you want using
response.redirect("page_url");


# Steps to install mongodb - https://www.youtube.com/watch?v=rtZZvti8beU
github - https://github.com/nax3t/aws-cloud9-instructions


# Some mongo commands
# officials doc - https://docs.mongodb.com/manual/reference/command/
1.mongod - to run mongo databases in the background
    ./mongod - dot means start with the current we are in & / means look for mongod
    you have installed mongo in ec2-user directory so to run mongo server
    step1 - cd
    step2 - ./mongod 

    
    
    to stop the mongod instance - ues - sudo killall mongod & then run again 
2.mongo - to start mongodb shell
3.help - to show all the basic command
4.show dbs - show all the dbs 
5.show collections - used inside a specific db & shows all the collections
6.use - to switch to db or create new db if already not created
    syntax - use demo
7.insert - db.dogs.insert({key_1:value_1,key_2:value_2})
8.find - to search all the data based on parameters passed
9.update - to update the data 
    syntax - db.dogs.update({matching_key_value_pair},{$set:{updated_pair}})
    eg - db.dogs.update({name:"Rusty"},{$set:{name:"Tater",isCool:true}})
    we are changing the name from Rusty to Tater & also adding new item isCool 

10. remove - db.dogs.remove({key_1:value_1,key_2:value_2}) - delete all the matching value

# Mongoose
Mongoose is Object Data Model(ODM) & it is used to write mongo db inside our js file
basically it is javascript layer on top of mongo db 
install mongoose 
npm install mongoose --save

let mongoose = require("mongoose");
// creating a db name cat_app if not created then creating it else connecting it 
// cat_app is db name 
mongoose.connect("mongodb://localhost:27017/cat_app",{ useNewUrlParser: true ,useUnifiedTopology: true});




# Lesson Yelpcamp Show Page 1
RESTFUL ROUTES 
name        url             verb        description                                                      Mongoose Method   
===================================================================================================================================================
INDEX       /dogs           GET         Display a list of all dogs                                      Dog.find()

NEW         /dogs/new       GET         Display a form to make a new Dog & redirect to somewhere        NIL
CREATE      /dogs           POST        Add new Dog to DB                                               Dog.create()

SHOW        /dogs/:id       GET         Shows the info about one specific dogs                          Dog.findById()

EDIT        /dogs/:id/edit  GET         Show the edit form for one dogs                                 Dog.findById()
UPDATE      /dogs/:id       PUT         Update a particular dog,then redirect it somewhere              Dog.findByIdAndUpdate()

DESTROY     /dogs/:id       DELETE      Delete a particular dog ,then redirect to somewhere             Dog.findByIdAndRemove()



Comments ROUTES - they are link with each campground 


NEW         /campground/:id/comments/new    GET
CREATE      /campground/:id/comments        POST
# Lesson - Intro to REST

REST - representational state transfer
 - it is mapping between routes and CRUD

CRUD - 
CREATE
READ
UPDATE
DELETE



# Lesson - Intro to Associations
Relationship between multiple data with one another.
Like Facebook has user & user it related to post & posts are related to posts & comments & tag 
User
Post
Photos
Albums
Likes
Tag
Comment - It can on photos or albums or on photos


One:One - One book has one title
One:Many  - One user may have many photos or comments
Many:Many  - A student can signup for multiple courses & courses can have multiple students enrolled


One:Many Associations 
# Embedding Data
User:post=> one user can have multiple post
Idea is create a userSchema in which postSchema is inserted
for 
let postSchema =new mongoose.Schema({
    title:String,
    content:String
});
let userSchema =new mongoose.Schema({
    name:String,
    email:String,
    post:[postSchema]   <- it is array of posts & postSchema is embedded into single user
});


eg 

//Creating the user 
User.create({
    name:"Harry",
    email:"harry@hogwarts.edu"
},function(error,user){
    if(error)console.log(error);
    else {
        console.log("User Added ..........");
        console.log(user);
        
    }
});

// Added Post to particular user 
User.findOne({name:"Harry"},function(error,user){
    if(error)console.log(error);
    else {
        console.log("User Found..........");
        //Pushing post to user
        user.posts.push({
            title:"Who is the villian",
            content:"Voldemorte. Voldemorte. Voldemorte."
        });
        //saving it or we can do it in single step by updating user      
        user.save(function(error,user){
            if(error)console.log(error);
            else {
                console.log("Post Added ..........");
                console.log(user);
                
            }
        });
    }
});

# Object Reference Data

we use Object Id to reference each other,rather than embeding complete post

Syntax - 
let postSchema = new mongoose.Schema({
    title:String,
    content:String
});
let Post = mongoose.model("Post",postSchema);
let userSchema = new mongoose.Schema({
    name:String,
    email:String,
    //Instead of adding complete post we are storing id of that post
    posts:[{
        type:mongoose.Schema.Types.ObjectId,
        //giving reference to Post schema
        ref:"Post"
    }]
});


# Module Exports 
Help us tp break the large file into smaller file 
like let postSchema = new mongoose.Schema({
    title:String,
    content:String
});

can be written in separate file & then can be returned.

let mongoose = require("mongoose");
let postSchema = new mongoose.Schema({
    title:String,
    content:String
});
//this line is returning the model 
module.exports = mongoose.model("Post",postSchema);


To use these model in any file  
let Post = require("./models/post.js");   ./models/post is path where our post schema is saved 

# Intro to Authentication 
Tools we are using- 
Tools we are going to use 
1.Passport - http://www.passportjs.org/
2.Passport local - https://github.com/jaredhanson/passport-local
3.Passport local Mongoose - https://github.com/saintedlama/passport-local-mongoose


# Passport Local - it is strategy which involves username & password from users & other strategy are twitter ,facebook & google etc
 
# Passport Local Mongoose - To make smooth login with mongoose we use this package
With passport-local-mongoose you don’t have to hash the password using the crypto module, passport-local-mongoose will do everything for you. If you use passport-local-mongoose this module will auto-generate salt and hash fields in the DB. You will not have a field for the password, instead, you will have salt and hash.

these all makes us login process easy ,they have all predifined method like register(), isAuthenticated() , authenticate(),logout() etc.

# Session - HTTP Request are state less protocol that they donot store any information about your history or previous request you have made like  login & logout. & are one time request.
Session make http request to have a state so that when a user login it stores some addition info other than passoword or user name & info is in encoded form.

# Lesson Secret Page Code Along pt 2
Create User Model
configure Passport

# Lesson Secret Page Code Along pt 3

Add register form 
Add register Routes - app.post("/register") & User.register();

# Lesson Secret Page Code Along pt 4
Login Routes
Add login form
passport.use(new LocalStrategy(User.authenticate()));


# Lesson Secret Page Code Along pt 5

1. Add Logout Route
2. Add isLoggedIn MiddleWare - to check wheather user is log in or not.


# Yelp Camp  Adding Auth pt1
Add User Model
    Install All packges we needed for auth
    Define User Model

# Yelp Camp  Adding Auth pt2
Configure Passport
Add register routes
Add register Templates.

# Yelp Camp  Adding Auth pt3
Add login routes
Add login template

# Yelp Camp  Adding Auth pt4
Add logout route
Prevent user from from adding a comment if not signed in
Add links to navbar


# Yelp Camp  Adding Auth pt5
Show/hide auth links in navbar correctly
pass the current user to all file by 
app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    next();
});

# Yelp Camp User Association Comments
Users + Comments
Associate users & comments - 
Step 1 - in the commentSchema change the author to in models/comment.js
author:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username:String
    }


Step 2 - Save author's name to a comment automatically in routes/comments.js

comments.author.id=request.user._id;
comments.author.username=request.user.username;

Step 3 - dyanmamically display author name in views/campgrounds/show.ejs
<%=comment.author.username%>

# User + Campgrounds
Prevent an unatheicated user from creatinf a campground
Save username+id to newly Created Campground


