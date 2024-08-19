# Lyrics.AI

I woke up one day in a cold sweat and wondered, how often does (word I won't put in my git history), show up in Kendrick Lamar's Alright.

The answer to this was me going to genius.com and CTRL+F'ing the lyric, but I wondered if I could extend upon the idea and create a sort of parsing-scraping-databaseusing-sentimentalanalyzing app to figure out if it's safe to learn the lyrics of the song.

The goal of this project was to create a web app that would utilize GPT-4o's function calling and structured JSON to get a response to a user's query.

## Ex:
```
User: How often does the lyric "Hallo" show up in Adele's Hello.

GPT-4: Parses User Input and spits out a JSON {lyric: "Hallo", song:"Hello", artist:"Adele", geniusLink:"https://genius.com/Adele-hello-lyrics"}

Database: Looks for song in database.

If the song is in the database:

FuzzySearchingTool: 9.

If the song is not in the database:
Get geniusLink, and scrape lyrics from song, then add to database.
FuzzySearchingTool: 9.

GPT-4: The word "Hello" occurs 9 times in the song. All these hello's and yet no goodbyes.
```


