const   express             =   require("express"),
        router              =   express.Router({mergeParams:true}),
        Campground          =   require("../models/campground"),
        Comment             =   require("../models/comment");
// NEW         /campground/:id/comments/new    GET
router.get("/campgrounds/:id/comments/new",isLoggedIn,function(request, response) {
    // Find Campground thru id & then send to comments form
    
    Campground.findById(request.params.id,function(error, campground) {
         if(error){console.log(error);}
         else {
            response.render("comments/new",{campground:campground});
         }
                
    });
});
// CREATE      /campground/:id/comments        POST
router.post("/campgrounds/:id/comments",isLoggedIn,function(request, response) {
    //loopup campground using ID
//   request will contains the all the info about a url like id & body we sent
    Campground.findById(request.params.id,function(error, foundCampground) {
        if(error){console.log(error);
            response.redirect("/campgrounds");
        }
        else {
            //create a new comment
            Comment.create(request.body.comment,function(error, comment) {
                     if(error){console.log(error);}
                     else {
                        comment.author.id=request.user._id;
                        comment.author.username=request.user.username;
                        comment.save();
                        // connect new comment to campground
                        foundCampground.comments.push(comment);
                        foundCampground.save(function(error,data){
                            if(error)console.log(error);
                            else {
                                console.log("Comment Saved ..........");
                                console.log(data);
                                // redirect to show page
                                response.redirect("/campgrounds/"+request.params.id);
                                
                            }
                        });
                     }
                        
            });

        }
                
    });

});


function isLoggedIn(req,res,next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports  = router;
