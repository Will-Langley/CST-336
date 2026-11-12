import express from 'express';
import mysql from 'mysql2/promise';
import session from 'express-session';
import bcrypt from 'bcrypt';

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.set('trust proxy', 1);
app.use(session({
    secret: 'quotes admin secret key',
    resave: false,
    saveUninitialized: false
}));

//setting up database connection pool, replace values in red
const pool = mysql.createPool({
    host: "d13xat1hwxt21t45.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user: "lru868rp8ryaeke3",
    password: "mf9p2q7r3opq7lwg",
    database: "vnujnm2vqpohwi0e",
    connectionLimit: 10,
    waitForConnections: true
});

//put this on any route that should only work when logged in
function isAuthenticated(req, res, next) {
    if (req.session.authenticated) {
        next();
    } else {
        res.redirect('/login');
    }
}

// shows the login form
app.get('/login', (req, res) => {
    res.render('login.ejs', { error: '' });
});

// checks the username and password against the admin table
app.post('/login', async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    let loginQuery = `SELECT * FROM admin WHERE username = ?`;
    const [ rows ] = await pool.query(loginQuery, [ username ]);

    //if no user was found, passwordMatches stays false
    let passwordMatches = false;
    if (rows.length > 0) {
        //compare hashes the typed password and checks it against the saved hash
        passwordMatches = await bcrypt.compare(password, rows[0].password);
    }

    if (passwordMatches) {
        req.session.authenticated = true;
        req.session.username = username;
        res.redirect('/');
    } else {
        res.render('login.ejs', { error: 'Invalid username or password' });
    }
});

// ends the session and goes back to the login page
app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
});

app.get('/', isAuthenticated, (req, res) => {
    res.render('home.ejs');
});

//This function looks up a single quote by ID
async function getQuoteById(quoteId) {

    console.log(quoteId);
    let singleQuoteQuery = `SELECT * FROM quotes WHERE quoteId = ?`;
    let params = [ quoteId ];
    const [ rows ] = await pool.query(singleQuoteQuery, params);
    console.log(rows);

    if (rows.length < 1) {
        return null;
    } else {
        return rows[0];
    }


}

//This function gets all the data we need for dropdown lists
async function getQuoteFormData() {
    let getAuthorsQuery = 'SELECT * FROM authors;';
    const [ rows ] =  await pool.query(getAuthorsQuery);

    //gets every category already used so we can show them in a dropdown
    let getCategoriesQuery = 'SELECT DISTINCT category FROM quotes';
    const [ categoryRows ] = await pool.query(getCategoriesQuery);

    let formErrors = {}; //can be populated with errors for each field

    return { authors: rows, categories: categoryRows };
} 

// renders an empty new quote form
app.get('/newQuote', isAuthenticated, async (req, res) => {

    //this runs any queries to populate drop-downlists
    let formData = await getQuoteFormData();

    res.render('newQuote.ejs', { formData, formErrors: {} });
});

// submits the users input to be entered into the db
app.post('/insertQuote', isAuthenticated, async (req, res) => {
    let quote = req.body.quote;
    let authorId = req.body.authorId;
    let category = req.body.category;
    let likes = req.body.likes;

    let hasErrors = false;
    let errors = {};
    if (quote === '') {
        hasErrors = true;
        errors.quote = "Quote cannot be empty";
    } // you can add other checks after this 

    if (likes === '' || Number(likes) < 0) {
        hasErrors = true;
        errors.likes = "Likes must be 0 or more";
    }

    let categoryData = await getQuoteFormData();
    let validCategories = categoryData.categories.map(row => row.category);
    if (category === '' || !validCategories.includes(category)) {
        hasErrors = true;
        errors.category = "Please pick a category from the list";
    }

    if (hasErrors) {

        let formData = await getQuoteFormData();
        //attach errors to be returned with the form
        formData.formErrors = errors; 
        res.render('newQuote.ejs', {formData, formErrors : errors});

    } else {

        let insertQuery = 
        `INSERT INTO quotes (quote, authorId, category, likes) 
        VALUES (?, ?, ?, ?);`

        let params = [ quote, authorId, category, likes ];

        const [rows] = await pool.query(insertQuery, params);

        //res.render('newQuote.ejs');
        res.redirect('/newQuote');

    }
});

// renders the edit quote form
app.get('/editQuote', isAuthenticated, async (req, res) => {

    let quoteId = req.query.quoteId;
    let quoteObject = await getQuoteById(quoteId);

    if (quoteObject == null) {
        res.redirect('/quoteList');
    } else {
         let formData = await getQuoteFormData();
         let formObject = quoteObject; // the first record should be the quote we're editing

         res.render('editQuote.ejs', {formData, formObject, formErrors: {}});
    }
});

// renders an empty new author form
app.get('/newAuthor', isAuthenticated, (req, res) => {
    res.render('newAuthor.ejs', { formObject: {}, formErrors: {} });
});

// submits the new author to be entered into the db
app.post('/insertAuthor', isAuthenticated, async (req, res) => {
    let firstName = req.body.firstName.trim();
    let lastName = req.body.lastName.trim();
    let dob = req.body.dob;
    let dod = req.body.dod;
    let gender = req.body.gender;
    let profession = req.body.profession;
    let country = req.body.country;
    let portrait = req.body.portrait;
    let biography = req.body.biography;

    let hasErrors = false;
    let errors = {};
    if (firstName === '') {
        hasErrors = true;
        errors.firstName = "First name cannot be empty";
    }

    if (lastName === '') {
        hasErrors = true;
        errors.lastName = "Last name cannot be empty";
    }

    if (dob === '') {
        hasErrors = true;
        errors.dob = "Date of birth cannot be empty";
    }

    if (dod !== '' && dob !== '' && new Date(dod) <= new Date(dob)) {
        hasErrors = true;
        errors.dod = "Date of death must be later than date of birth";
    }

    if (hasErrors) {
        res.render('newAuthor.ejs', { formObject: req.body, formErrors: errors });
    } else {
        let insertQuery =
        `INSERT INTO authors
        (firstName, lastName, dob, dod, gender, profession, country, portrait, biography)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`

        if (dod === '') {
            dod = null;
        }

        let params = [ firstName, lastName, dob, dod, gender, profession, country, portrait, biography ];
        const [rows] = await pool.query(insertQuery, params);

        res.redirect('/newAuthor');
    }
});


app.get('/quoteList', isAuthenticated, async (req, res) => {
    let quotesQuery = `SELECT * FROM quotes`;
    const [rows] = await pool.query(quotesQuery);

    res.render('quoteList.ejs', {quotes: rows});

});


app.post('/updateQuote', isAuthenticated, async (req, res) => {
    let quote = req.body.quote;
    let authorId = req.body.authorId;
    let quoteId = req.body.quoteId;
    let category = req.body.category;
    let likes = req.body.likes;

    let errors = {};
    let hasErrors = false;
    if (quote === "") {
        errors.quote = "Quote cannot be empty";
        hasErrors = true;
    }

    if (likes === '' || Number(likes) < 0) {
        errors.likes = "Likes must be 0 or more";
        hasErrors = true;
    }

    let categoryData = await getQuoteFormData();
    let validCategories = categoryData.categories.map(row => row.category);
    if (category === '' || !validCategories.includes(category)) {
        hasErrors = true;
        errors.category = "Please pick a category from the list";
    }

    if (hasErrors) {
        //when we re-render the page with errors, we need to redownload the quote data
        let quoteObject = await getQuoteById(quoteId);
        //as well as the data for the dropdown lists
        let quoteFormData = await getQuoteFormData();

        res.render('editQuote.ejs', {formObject: quoteObject, formData: quoteFormData, formErrors: errors});

    } else {
        let updateQuery = `UPDATE quotes SET quote = ?, authorId = ?, category = ?, likes = ? WHERE quoteId = ?`
        let params = [quote, authorId, category, likes, quoteId];
        const [ rows ] = await pool.query(updateQuery, params);

        res.redirect('/quoteList');
    }

});

// deletes a single quote
app.get('/deleteQuote', isAuthenticated, async (req, res) => {
    let quoteId = req.query.quoteId;

    let deleteQuery = `DELETE FROM quotes WHERE quoteId = ?`;
    const [ rows ] = await pool.query(deleteQuery, [ quoteId ]);

    res.redirect('/quoteList');
});

//This function looks up a single author by ID
async function getAuthorById(authorId) {
    //DATE_FORMAT turns the dates into YYYY-MM-DD text, which is the format a date input needs
    let singleAuthorQuery = `SELECT *, DATE_FORMAT(dob, '%Y-%m-%d') AS dob, DATE_FORMAT(dod, '%Y-%m-%d') AS dod FROM authors WHERE authorId = ?`;
    const [ rows ] = await pool.query(singleAuthorQuery, [ authorId ]);

    if (rows.length < 1) {
        return null;
    } else {
        return rows[0];
    }
}

// lists every author with update and delete links
app.get('/authorList', isAuthenticated, async (req, res) => {
    let authorsQuery = `SELECT authorId, firstName, lastName FROM authors ORDER BY lastName`;
    const [rows] = await pool.query(authorsQuery);

    res.render('authorList.ejs', {authors: rows});
});

// renders the edit author form, pre-filled with the author's current info
app.get('/editAuthor', isAuthenticated, async (req, res) => {
    let authorId = req.query.authorId;
    let authorObject = await getAuthorById(authorId);

    if (authorObject == null) {
        res.redirect('/authorList');
    } else {
        res.render('editAuthor.ejs', {formObject: authorObject, formErrors: {}});
    }
});

// saves the changes from the edit author form
app.post('/updateAuthor', isAuthenticated, async (req, res) => {
    let authorId = req.body.authorId;
    let firstName = req.body.firstName.trim();
    let lastName = req.body.lastName.trim();
    let dob = req.body.dob;
    let dod = req.body.dod;
    let gender = req.body.gender;
    let profession = req.body.profession;
    let country = req.body.country;
    let portrait = req.body.portrait;
    let biography = req.body.biography;

    let hasErrors = false;
    let errors = {};
    if (firstName === '') {
        hasErrors = true;
        errors.firstName = "First name cannot be empty";
    }

    if (lastName === '') {
        hasErrors = true;
        errors.lastName = "Last name cannot be empty";
    }

    if (dob === '') {
        hasErrors = true;
        errors.dob = "Date of birth cannot be empty";
    }

    if (dod !== '' && dob !== '' && new Date(dod) <= new Date(dob)) {
        hasErrors = true;
        errors.dod = "Date of death must be later than date of birth";
    }

    if (hasErrors) {
        //req.body still has the hidden authorId, so the form keeps track of who we're editing
        res.render('editAuthor.ejs', {formObject: req.body, formErrors: errors});
    } else {
        let updateQuery = `UPDATE authors SET firstName = ?, lastName = ?, dob = ?, dod = ?, gender = ?, profession = ?, country = ?, portrait = ?, biography = ? WHERE authorId = ?`
        if (dod === '') {
            dod = null;
        }

        let params = [firstName, lastName, dob, dod, gender, profession, country, portrait, biography, authorId];
        const [ rows ] = await pool.query(updateQuery, params);

        res.redirect('/authorList');
    }
});

// deletes an author and all of their quotes
app.get('/deleteAuthor', isAuthenticated, async (req, res) => {
    let authorId = req.query.authorId;
    let deleteQuotesQuery = `DELETE FROM quotes WHERE authorId = ?`;
    await pool.query(deleteQuotesQuery, [ authorId ]);
    let deleteAuthorQuery = `DELETE FROM authors WHERE authorId = ?`;
    await pool.query(deleteAuthorQuery, [ authorId ]);
    res.redirect('/authorList');
});




app.get("/dbTest", isAuthenticated, async(req, res) => {
  try {
        const [rows] = await pool.query("SELECT CURDATE()");
        res.send(rows);
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).send("Database error!");
    }
});

app.listen(3000, ()=>{
    console.log("Express server running")
})