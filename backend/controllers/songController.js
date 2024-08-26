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
        const lyrics = await scrapeSong(geniusLink)
        if(lyrics === "error"){
            return res.status(500).json({error: "scrape song failed"})
        }
        await Song.create({title, artist, lyrics})
        return res.status(200).json({success: "Song added to database", title})
    }catch(e){
        return res.status(500).json({error: e})
    }
    
}

/****** Get one Song ********/
const getUserQuery = async(req,res) => {
    // Get lyric, title, artist, and geniusLink from body, aka gpt request
    const {lyric, title, artist, geniusLink} = req.body

    if(!(lyric && title && artist && geniusLink)){
        return res.status(500).json({error: "All parts of the query are needed"})
    }

    const song = await Song.findOne({title, artist})
    // Get song
    if(!song){
        // const newSong = await scrapeSong(title, artist, geniusLink)
        // Get Genius Link, Scrape Song, add Song to DB. Get song.
    }
    //Use Fuse.js to search lyrics

}

/****** Scrape Song From Genius ******/
// const scrapeSong = async(req, res) => {

//     if(!(lyric && title && artist && geniusLink)){
//         return res.status(500).json({error: "All parts of the query are needed"})
//     }
//     try{

//     }catch(e){

//     }
//     return res.status(500).json({Error: "Not finished"})
// }

export { getSongs, addSong, scrapeSong }