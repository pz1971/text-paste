import mongoose from "mongoose";
const Schema = mongoose.Schema;

const textSchema = new Schema({
    text: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    password: String,
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
})

export default mongoose.model('Text', textSchema);