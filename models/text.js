import mongoose from "mongoose";
const Schema = mongoose.Schema;

const textSchema = new Schema({
    // id will be nanoid generated
    _id: String,
    text: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        default: "Untitled"
    },
    author: {
        type: String,
        default: "Anonymous"
    },
    password: {
        type: String,
        default: ""
    },
    text_type: {
        type: String,
        enum: ['cpp', 'java', 'js', 'py', 'txt'],
        default: 'txt'
    },
    expire_option: {
        type: String,
        enum: ['never', '1h', '12h', '1d', '1w', '1m', '1y'],
        default: 'never'
    }
}, { _id: false })

export default mongoose.model('Text', textSchema);