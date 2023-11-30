const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
        maxLength: 255
    },
    content: {
        type: String,
        required: true,
        maxLength: 5000
    },
    author: {
        type: String,
        required: true
    },
    tags: {
        type: String,Array
    },
    comments: {
        type: String,
    }
})

module.exports = mongoose.model("Post", postSchema)

