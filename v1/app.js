var express = require("express");
var app = express();
var bodyParser = require("body-parser");

var campgrounds = [
        {name: "La Pastora", image:"https://media-cdn.tripadvisor.com/media/photo-s/05/0f/b0/aa/parque-regional-natural.jpg"},
        {name: "Mountain Crek", image:"https://www.greatsmokies.com/wp-content/uploads/2018/06/Deep-Creek-camping.jpg"},
        {name: "Mont Tremblant", image:"https://www.quebecoriginal.com/en/listing/images/800x600/ae2894cf-af0a-46dc-904d-8a91b0059376/camping-parc-national-du-mont-tremblant-de-la-diable-camping-secteur-la-diable.jpg"},
        {name: "La Pastora", image:"https://media-cdn.tripadvisor.com/media/photo-s/05/0f/b0/aa/parque-regional-natural.jpg"},
        {name: "Mountain Crek", image:"https://www.greatsmokies.com/wp-content/uploads/2018/06/Deep-Creek-camping.jpg"},
        {name: "La Pastora", image:"https://media-cdn.tripadvisor.com/media/photo-s/05/0f/b0/aa/parque-regional-natural.jpg"},
        {name: "Mountain Crek", image:"https://www.greatsmokies.com/wp-content/uploads/2018/06/Deep-Creek-camping.jpg"}
    ];


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.get('/', (req, res) => {
    res.render('landing');
})

app.get('/campgrounds', (req, res) => {
        res.render('campgrounds', {campgrounds:campgrounds});
})

app.post('/campgrounds', (req, res) => {
    //get data from from and add it to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image}
    campgrounds.push(newCampground);
    //redirect back to campgrounds page
    res.redirect('campgrounds');
})

app.get('/campgrounds/new', (req, res) => {
    res.render("new.ejs");
})

app.listen(process.env.PORT, process.env.IP, () => {
    console.log('Yelp Camp Server ON');
});