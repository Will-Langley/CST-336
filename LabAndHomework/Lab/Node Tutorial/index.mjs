const fixedImages = {
   Mars: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Mars_-_August_30_2021_-_Flickr_-_Kevin_M._Gill.png/500px-Mars_-_August_30_2021_-_Flickr_-_Kevin_M._Gill.png',
   Jupiter: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Jupiter_OPAL_2024.png/500px-Jupiter_OPAL_2024.png',
   Uranus: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Uranus_Voyager2_color_calibrated.png/500px-Uranus_Voyager2_color_calibrated.png',
   Pluto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Pluto_in_True_Color_-_High-Res.png/500px-Pluto_in_True_Color_-_High-Res.png'};
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

app.get('/', async (req, res) => {
   let images = [];
   let error = null;
   try {
      let url = `https://pixabay.com/api/?key=${process.env.PIXABAY_KEY || '20426927-497d14db9c234faf7d0df8317'}&per_page=50&orientation=horizontal&q=solar%20system`;
      let response = await fetch(url);
      let data = await response.json();
      while (images.length < 4) {
         let randomIndex = Math.floor(Math.random() * data.hits.length);
         let pic = data.hits[randomIndex].webformatURL;
         if (!images.includes(pic)) images.push(pic);
      }
   } catch (e) {
      images = [];
      error = 'could not request random images';
   }
   res.render('home.ejs', { images: images, error: error });
});


app.get('/planetInfo', (req, res) => {
   let planet = req.query.planet;
   if (typeof solarSystem['get' + planet] !== 'function') {
      return res.send('Unknown planet');
   }
   let planetData = solarSystem['get' + planet]();
   if (fixedImages[planet]) {
      planetData.image = fixedImages[planet];
   }
   res.render('planet.ejs', { name: planet, info: planetData });
});

app.listen(3000, () => {
   console.log('server started');
});

app.get('/asteroids', (req, res) => {
   let data = solarSystem.getAsteroids();
   res.render('extra.ejs', { title: 'Asteroids', image: data.image, text: data.def, link: data.link });
});

app.get('/comets', (req, res) => {
   let data = solarSystem.getComets();
   res.render('extra.ejs', { title: 'Comets', image: data.image, text: data.def, link: data.link });
});

app.get('/apod', async (req, res) => {
   try {
      let url = `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_KEY || 'wQpnrnPkzD6dt7BD6mWkhfKf8fh8kHQ8fd8M7fkr'}`;
      let response = await fetch(url);
      let data = await response.json();
      if (!data.title) 
         throw new Error('bad response');
      res.render('extra.ejs', { title: data.title, image: data.url, text: data.explanation, link: null });
   } catch (e) {
      res.render('extra.ejs', { title: 'NASA POD', image: null, text: 'could not request the picture of the day', link: null });
   }
});
