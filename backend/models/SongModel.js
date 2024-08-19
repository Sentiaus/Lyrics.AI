import mongoose from "mongoose"

const SongSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    artist:{
        type: String,
        required: true
    },
    genre:{
        type: String
    },
    duration:{
        type: Number // seconds
    },
    lyrics: {
        type: String
    },
    geniusLink: {
        type: String
    }
}, {timestamps: true})

const Song = mongoose.model('Song', SongSchema)

export default Song