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
    expireAt: {
        type: Date
    }
}, { _id: false })

textSchema.index( { "expireAt": 1 }, { expireAfterSeconds: 0 } );

export default mongoose.model('Text', textSchema);