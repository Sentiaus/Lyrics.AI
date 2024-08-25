import Genius from "genius-lyrics"
// import dotenv from "dotenv"
// dotenv.config({path:'../.env'})

/****** Get Song Lyrics from Genius Link */
const scrapeSong = async(geniusLink) => {
    const SongsClient = new Genius.Client().songs
    try{
        const scrapedSong = await SongsClient.scrape(geniusLink)
        const Lyrics = scrapedSong.lyrics(true)
        return Lyrics
    }catch(e){
        return "error"
    }
}

export{ scrapeSong }