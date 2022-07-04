import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const app = express();
app.use(bodyParser.json());

const port = process.env.PORT || 5000;

// using ejs as the view engine
app.set('view engine', 'ejs');

// use '/public' as the static folder
app.use(express.static('public'));

// render home page
app.get('/', async (req, res) => {
    res.render('index');
})

app.listen(port, () => console.log(`Server started on port ${port}`));