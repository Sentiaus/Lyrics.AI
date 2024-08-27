import Genius, { UnableToScrapeDataError } from "genius-lyrics"
// import dotenv from "dotenv"
// dotenv.config({path:'../.env'})

/****** Get Song Lyrics from Genius Link */
const scrapeSong = async(title, artist, geniusLink) => {
    // Create Songs Client
    const SongsClient = new Genius.Client().songs
    try{
        // Try scraping directly from geniusLink
        const scrapedSong = await SongsClient.scrape(geniusLink)
        const Lyrics = scrapedSong.lyrics(true)
        return Lyrics
    }catch(e){
        // If genius Link isn't valid, attempt to search up song and return lyrics
        if(e instanceof UnableToScrapeDataError){
            try{
                // Get song from title + artist. Most situations should be first artist.
                const searchSong = await SongsClient.search(title+artist)
                return await searchSong[0].lyrics(true)
            }catch(e){
                return "error"
            }
        }
        return "error"
    }
}


export{ scrapeSong }