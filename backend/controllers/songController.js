import express from "express"
import Song from "../models/SongModel.js"

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
    const {title, artist} = req.body

    // Validate input
    if(!title || !artist){
        return res.status(400).json({error: "Fill out all parts of the form"})
    }

    // Check if song already exists within db
    const song = await Song.findOne({title, artist})
    if(song){
        return res.status(400).json({error: "Song already exists"})
    }

    // Add song to database
    try{
        await Song.create({title, artist})
        return res.status(200).json({success: "Song added to database", title})
    }catch(e){
        return res.status(500).json({error: e})
    }
    
}

export { getSongs, addSong }