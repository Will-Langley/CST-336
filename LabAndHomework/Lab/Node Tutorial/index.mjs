const solarSystem = (await import('npm-solarsystem')).default;
import express from 'express';

//express is an API engine
//it lets you make your own APIs
const app = express();

//EJS is a way to dynamically build html pages
//and easily substitute data into them
app.set("view engine", "ejs");

//public folder
app.use(express.static("public"));

app.get('/', (req, res) => {
   res.render('home.ejs');
});


app.get('/planetInfo', (req, res) => {
   let planet = req.query.planet;
   if (planet == "Mercury") {
      res.render('planet.ejs', {name: "Mercury", image: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Mercury_in_true_color.jpg"});
   } else if (planet == "Venus") {
      res.render('planet.ejs', {name: "Venus", image: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Venus_-_Dec_16_2013.jpg"});
   } else if (planet == "Earth") {
      res.render('planet.ejs', {name: "Earth", image: "https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg"});
   } else if (planet == "Mars") {
      res.render('planet.ejs', {name: "Mars", image: "https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg"});
   } else if (planet == "Jupiter") {
      res.render('planet.ejs', {name: "Jupiter", image: "https://en.wikipedia.org/wiki/Jupiter"});
   } else if (planet == "Saturn") {
      res.render('planet.ejs', {name: "Saturn", image: "https://upload.wikimedia.org/wikipedia/commons/c/c4/Saturn_during_Equinox_2009-09-15.jpg"});
   } else if (planet == "Uranus") {
      res.render('planet.ejs', {name: "Uranus", image: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Uranus_from_Hubble_2006.jpg"});
   } else if (planet == "Neptune") {
      res.render('planet.ejs', {name: "Neptune", image: "https://upload.wikimedia.org/wikipedia/commons/5/56/Neptune_from_Hubble_1989.jpg"});
   } else {
      res.send("Planet not found");
   }
});

app.listen(3000, () => {
   console.log('server started');
});
