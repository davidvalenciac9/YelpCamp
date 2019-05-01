var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");
    
//conectar a la DB
mongoose.connect('mongodb://localhost:27017/yelp_camp', { useNewUrlParser: true });

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

//COMPILAR EN UN MODELO
var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
//     name: "Mountain Crek",
//     image: "https://www.greatsmokies.com/wp-content/uploads/2018/06/Deep-Creek-camping.jpg",
//     description: "This is the best campground in the States withou showers"
// }, (err, camp) => {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log("New Campground Added");
//         console.log(camp);
//     }
// });

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.get('/', (req, res) => {
    res.render('landing');
})

app.get('/campgrounds', (req, res) => {
    // Get all campgrounds from DB
    Campground.find({}, (err, campgrounds) => {
        if(err){
            console.log(err);
        } else {
            res.render('index', {campgrounds:campgrounds});
        }
    });
});

app.post('/campgrounds', (req, res) => {
    //get data from from and add it to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = {name: name, image: image, description: description}
    // Create a new Campground
    Campground.create(newCampground, (err, camp) => {
        if(err) {
            console.log(err);
        } else {
            //redirect back to campgrounds page
            res.redirect('campgrounds');
        }
    })
})

app.get('/campgrounds/new', (req, res) => {
    res.render("new");
})

app.get('/campgrounds/:id', (req, res) => {
    //find the campground with the ID provided
    //findById is a Method of Mongoose
    Campground.findById(req.params.id, (err, foundCampground) => {
        if(err) {
            console.log(err);
        } else {
             //render show template with that campground
            res.render("show", {campground: foundCampground});
        }
    });
})


app.listen(process.env.PORT, process.env.IP, () => {
    console.log('Yelp Camp Server ON');
});