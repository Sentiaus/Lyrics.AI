import Fuse from 'fuse.js'

// const fuseOptions = {
//     findAllMatches: true,
//     includeMatches: true
// }


/****** Remove spaces from Lyrics and Search Song ******/
const searchSongs = (lyric, song) => {
    const lyricsNoSpace = song.lyrics.split(/[\r\n]+/).map(line => line.toLowerCase());
    const lowerCaseLyric = lyric.toLowerCase();
    console.log("search")
    return occurrenceCount(lowerCaseLyric, lyricsNoSpace);
};

/****** Counts the number of occurrences of a substring within an array of strings *******/
const occurrenceCount = (lyric, lyrics) => {
    // Create a regular expression to match the exact whole word/phrase
    const regex = new RegExp(`\\b${lyric}\\b`, 'g');

    // Use reduce to sum up occurrences of the lyric in each line of lyrics
    return lyrics.reduce((count, line) => {
        // Match the regex against the line and count the matches
        const matches = line.match(regex);
        console.log("occurence")
        return count + (matches ? matches.length : 0);
    }, 0);
};
export { searchSongs }