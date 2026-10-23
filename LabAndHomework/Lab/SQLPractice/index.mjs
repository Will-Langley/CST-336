import express from 'express';
import mysql from 'mysql2/promise';

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

//for Express to get values using the POST method
app.use(express.urlencoded({extended:true}));

//setting up database connection pool, replace values in red
const pool = mysql.createPool({
    host: "zy4wtsaw3sjejnud.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user: "m31pldzuqfkiih8i",
    password: "l5xyy2sqwoq27e9m",
    database: "jq5kvtq9c9uc4en9",
    connectionLimit: 10,
    waitForConnections: true
});

//routes
app.get('/', (req, res) => {
    res.render("home.ejs");
});

app.get("/quotesAboutLife", async(req, res) => {
  try {
        const [rows] = await pool.query("SELECT quoteId, quote, authorId, firstName, likes, country, lastName FROM quotes NATURAL JOIN authors WHERE quote LIKE '%life%'");
        res.render("results.ejs", { rows });
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).send("Database error!");
    }
});//quotesAboutLife

app.get("/authorsWithA", async(req, res) => {
  try {
        const [rows] = await pool.query("SELECT quoteId, quote, likes, country, authorId, firstName, lastName FROM quotes NATURAL JOIN authors WHERE firstName LIKE 'A%'");
        res.render("results.ejs", { rows });
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).send("Database error!");
    }
});//AuthorWithA

app.get("/authorsOrdered", async(req, res) => {
  try {
        const [rows] = await pool.query("SELECT quoteId, quote, likes, country, authorId, firstName, lastName FROM quotes NATURAL JOIN authors ORDER BY firstName");
        res.render("results.ejs", { rows });
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).send("Database error!");
    }
});//AuthorsOrdered

app.get("/ByLikes", async(req, res) => {
  try {
        const [rows] = await pool.query("SELECT quoteId, quote, likes, country,authorId, firstName, lastName FROM quotes NATURAL JOIN authors WHERE likes > 49 and likes < 101 ORDER BY likes");
        res.render("results.ejs", { rows });
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).send("Database error!");
    }
});//ByLikes

app.get("/ByLikes", async(req, res) => {
  try {
        const [rows] = await pool.query("SELECT quoteId, quote, authorId, likes, country, firstName, lastName FROM quotes NATURAL JOIN authors WHERE likes > 49 and likes < 101 ORDER BY likes");
        res.render("results.ejs", { rows });
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).send("Database error!");
    }
});//ByLikes

app.get("/NotUS", async(req, res) => {
  try {
        const [rows] = await pool.query("SELECT quoteId, quote, authorId, likes, country, firstName, lastName FROM quotes NATURAL JOIN authors WHERE country NOT LIKE 'USA'");
        res.render("results.ejs", { rows });
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).send("Database error!");
    }
});//NotUS

app.listen(3000, ()=>{
    console.log("Express server running")
})