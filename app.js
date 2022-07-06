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
    var text_type = req.body.text_type;
    var expire_option = req.body.expire_option;
    var password = req.body.password;
    var text = req.body.text;

    // insert a new text in db
    await Text.create({
        _id : id,
        text_type: text_type,
        expire_option: expire_option,
        password: password,
        text: text
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
        const paste = await Text.findOne({ _id: id }) ;
        if(paste){
            // render the paste page
            res.render('paste', {password: paste.password, text:paste.text, text_type: paste.text_type});
        }
        else{
            res.send("Paste Not Found");
        }
    }catch(err){
        res.send("Something Went Wrong");
    }
});

app.listen(port, () => console.log(`Server started on port ${port}`));