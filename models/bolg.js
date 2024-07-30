const mongoose = require('mongoose');
const Schema = mongoose.Schema

const blogSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    sinppet: {
        type: String,
        require: true
    },
    body: {
        type: String,
        require: true
    },
}, {timestamps: true})

const Blog = mongoose.model('blogs', blogSchema);

module.exports = Blog