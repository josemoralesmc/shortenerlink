import mongoose from "mongoose";

const UrlSchema = new mongoose.Schema({
    full_url:{
        type: String,
        require: true

    },
    short_url:{
        type: String,
        require: true,
        unique: true
    },
    click: {
        type: Number,
        default: 0
    },
    idUser: {
        type: String,
        required: true
    }
})

const UrlModel = mongoose.model('Url', UrlSchema)

export default UrlModel