let mongoose        =   require("mongoose");
let Campground      =   require("./models/campground");
let Comments        =   require("./models/comment");
let data = [
    {
        name:"Berlin",
        image:"https://images.pexels.com/photos/1128408/pexels-photo-1128408.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        description:"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Praesentium, natus! Quos ratione temporibus inventore cum quo aliquam libero, harum rem nulla dolorum veritatis deserunt? Incidunt reprehenderit autem mollitia laborum exercitationem itaque cum in amet odit consequatur eligendi tempore, asperiores dolorem delectus labore illo explicabo doloribus provident minus? Laborum, corporis officia. "
    },
    {
        name:"Munich",
        image:"https://images.pexels.com/photos/4213372/pexels-photo-4213372.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        description:"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Praesentium, natus! Quos ratione temporibus inventore cum quo aliquam libero, harum rem nulla dolorum veritatis deserunt? Incidunt reprehenderit autem mollitia laborum exercitationem itaque cum in amet odit consequatur eligendi tempore, asperiores dolorem delectus labore illo explicabo doloribus provident minus? Laborum, corporis officia. "
    },
    {
        name:"Oktoberfest",
        image:"https://images.pexels.com/photos/3623710/pexels-photo-3623710.png?auto=compress&cs=tinysrgb&dpr=1&w=500",
        description:"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Praesentium, natus! Quos ratione temporibus inventore cum quo aliquam libero, harum rem nulla dolorum veritatis deserunt? Incidunt reprehenderit autem mollitia laborum exercitationem itaque cum in amet odit consequatur eligendi tempore, asperiores dolorem delectus labore illo explicabo doloribus provident minus? Laborum, corporis officia. "
    }
];
// remove all ->add new campground->add few comments ->save comments to campground
function seedDb(){
    
    Campground.deleteMany({},function(error,allCampground) {
        // // body...
        // if(error)console.log(error);
        // else {
        //     console.log("removed all campground......")
                        
        //     data.forEach(function(campground){
        //         Campground.create(campground ,function(error,campground) {
        //             // body...
        //             if(error)console.log(error);
        //             else {
        //                 console.log("Added Campground......")
        //                 // Comments.create()
        //                 Comments.create(
        //                     {
        //                         text:"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Praesentium, natus! Quos ratione temporibus inventore cum quo aliquam libero, harum rem nulla dolorum veritatis deserunt? Incidunt reprehenderit autem mollitia laborum exercitationem itaque cum in amet odit consequatur eligendi tempore, asperiores dolorem delectus labore illo explicabo doloribus provident minus? Laborum, corporis officia.",
        //                         author:"Najim Ali"
        //                     },function(error,comment) {
        //                     // body...
        //                     if(error)console.log(error);
        //                     else {
        //                         console.log("removed all campground")
        //                         campground.comments.push(comment);
        //                         campground.save(function(error) {
        //                             // body...
        //                             if(error)console.log(error);
        //                             else {
        //                                 console.log("Created new Comments");
                                        
        //                             }
        //                         });
                                
                                
        //                     }
        //                 });
                                            
        //             }
        //         });
        //     });
            
        // }
    });
}
//this line will send the seedDb method to another file
module.exports = seedDb;
