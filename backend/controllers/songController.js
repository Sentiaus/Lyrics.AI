import express from "express"
import Song from "../models/SongModel.js"
import { scrapeSong } from "../services/geniusService.js"

/******* Get All Songs *******/
const getSongs = async(req,res)=>{
    // Get songs from database
    try{
        const songs = await Song.find()
        return res.status(200).json({songs})
    }catch(e){
        return res.status(500).json({error: e})
    }
}

/******* Add one Song *******/
const addSong = async(req, res) => {
    // Get title and artist from body
    const {lyric, title, artist, geniusLink} = req.body

    // Validate input
    if(!(title && artist && geniusLink)){
        return res.status(400).json({error: "Fill out all parts of the form"})
    }

    // Check if song already exists within db
    const song = await Song.findOne({title, artist})
    if(song){
        return res.status(400).json({error: "Song already exists"})
    }

    // Add song to database, get lyrics from geniusService
    try{
        const lyrics = await scrapeSong(title, artist, geniusLink)
        if(lyrics === "error"){
            return res.status(500).json({error: "scrape song failed"})
        }
        await Song.create({title, artist, lyrics})
        return res.status(200).json({success: "Song added to database", title, artist})
    }catch(e){
        return res.status(500).json({error: e})
    }
    
}

const searchSong = async(req, res) => {

}



export { getSongs, addSong}