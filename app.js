const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./models/bolg');
const app = express();
// db conection
const dburi = 'mongodb+srv://mohammadghiasi:Mgh3300305421@ghiasi.iekimql.mongodb.net/ghiasidb?retryWrites=true&w=majority&appName=ghiasi';


mongoose.connect(dburi)
    .then((result) => {
        console.log('conected');
        app.listen('3000')
    })
    .catch((err) => {
        console.log(err);
    });


app.get('/add', (requst, response) => {
    const blog = new Blog({
        title: 'phones',
        sinppet: 'mouid ghiasi',
        body: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores voluptatem itaque minus fugiat atque cupiditate architecto? Fugiat in dicta eaque possimus, consequatur reiciendis adipisci nisi repellat recusandae, quae architecto magnam!'
    });
    blog.save()
        .then((result) => response.send(result))
        .catch((error) => console.log(error));
})

app.get('/getblogs', (requst, response) => {
    Blog.find()
        .then((result) => response.send(result))
        .catch((error) => console.log(error));
});
app.get('/getblog', (requst, response) => {
    Blog.findById('66a91e81d18a7d70c4d6f536')
        .then((result) => response.send(result))
        .catch((error) => console.log(error));
});
app.get('/deletblog', (requst, response) => {
    Blog.findByIdAndDelete('66a91da9bbf76f0abf7e22bb')
        .then((result) => response.send('deleted'))
        .catch((error) => console.log(error));
});
app.get('/deletall', (requst, response) => {
    Blog.deleteMany({})
        .then((result) => response.send('deleted'))
        .catch((error) => console.log(error));
});


app.get('/', function (req, res) {
    res.sendFile('./view/index.html', { root: __dirname })
})


