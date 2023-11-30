const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    content: {
        type: String,
        required: true,
        maxLength: 100
    },
    author: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
    }
})

module.exports = mongoose.model("Comment", commentSchema)

