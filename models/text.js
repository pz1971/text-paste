import {Schema} from "mongoose";

const textSchema = new Schema({
    text: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    password: String,
    extension: {
        type: String,
        enum: ['cpp', 'java', 'js', 'py', 'txt'],
        default: 'txt'
    }
})

module.exports = mongoose.model('Text', textSchema);