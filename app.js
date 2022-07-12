import express from 'express';
import mongoose from 'mongoose';
import { nanoid } from 'nanoid';
import './env.js';
import Text from './models/text.js';

// connect to mongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.log('Error Connecting MongoDB:', err.message);
});

// port no.
const port = process.env.PORT;

// express app
const app = express();

// using ejs as the view engine
app.set('view engine', 'ejs');

// url encoded data parser
app.use(express.urlencoded({ extended: false }))

// use '/public' as the static folder
app.use(express.static('public'));

// render home page
app.get('/', (req, res) => {
    res.render('index');
})

app.post('/p', async (req, res) => {
    // get the data from the form
    const id = nanoid();
    var title = req.body.title;
    var text_type = req.body.text_type;
    var expire_option = req.body.expire_option;
    var password = req.body.password;
    var text = req.body.text;
    var author = req.body.author;
    
    // set expireAt
    var expireat = new Date();
    if(expire_option == '1h') 
        expireat.setHours(expireat.getHours() + 1);
    else if(expire_option == '12h')
        expireat.setHours(expireat.getHours() + 12);
    else if(expire_option == '1d')
        expireat.setDate(expireat.getDate() + 1);
    else if(expire_option == '1w')
        expireat.setDate(expireat.getDate() + 7);
    else if(expire_option == '1m')
        expireat.setMonth(expireat.getMonth() + 1);
    else if(expire_option == '1y')
        expireat.setFullYear(expireat.getFullYear() + 1);
    else
        expireat = null;

    // insert a new text in db
    await Text.create({
        _id : id,
        title : title,
        text_type: text_type,
        password: password,
        text: text,
        author: author,
        expireAt: expireat
    }).then(() => {
        // console.log('Text inserted');
        // redirect to the new page
        res.redirect('/p/' + id);
    }).catch(err => {
        // console.log('Error inserting text:', err.message);
        res.send("Something Went Wrong");
    });
})

app.get('/p/:id', async (req, res) => {
    // get the id from the url
    const id = req.params.id;
    try{
        // get paste data from database
        var paste = await Text.findOne({ _id: id }) ;
        if(paste){
            // render the paste page
            if(paste.author == "")
                paste.author = "Anonymous";
            if(paste.title == "")
                paste.title = "Untitled";
            res.render('paste', {password: paste.password, title:paste.title, text:paste.text, text_type: paste.text_type, author: paste.author, createdAt: paste.createdAt});
        }
        else{
            res.send("Paste Not Found");
        }
    }catch(err){
        res.send("Something Went Wrong");
    }
});

app.listen(port, () => console.log(`Server started on port ${port}`));