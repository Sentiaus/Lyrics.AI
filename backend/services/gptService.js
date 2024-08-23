import express from "express"
import OpenAI from "openai"
import dotenv from 'dotenv'
dotenv.config({path:'../.env'})

// Need to make sure this works when deployed
const openAIClient = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY']
})

// passed to the response. Need to update.
const tools = [
    {
        type: "function",
        function: {
            name: "createSongObject",
            description: "Given the user's input create a query object with the requested lyric, the name of the song, artist, and link to its lyrics on genius.com.",
            parameters: {
                type: "object",
                properties: {
                    lyric: {
                        type:"string",
                        description: "The specified lyric the user is looking for"
                    },
                    name: {
                        type: "string",
                        description: "The english or romanized name of the song"
                    },
                    artist: {
                        type: "string",
                        description: "The english or romanized name of the artist"
                    },
                    geniusLink: {
                        type: "string",
                        description: "The link to the song lyrics on genius.com"
                    },
                },
                required: ["lyric","name", "artist", "geniusLink"]
            }
        }
    }
    
];

const messages = [
    {
        role: "system", 
        content: "You are a helpful language parsing assistant. Use the supplied tools to assist the user."
    },
    {
        role: "user",
        content: "Can you tell me the number of times 'Adele' is said in Metro Spider by Metro Boomin?"
    },
];

const response = await openAIClient.chat.completions.create({
    model: "gpt-4o-mini-2024-07-18",
    messages: messages,
    tool_choice: "required",
    tools: tools,
})
let json = JSON.stringify(response.choices[0].message.tool_calls?.[0].function.arguments)
console.log(json)