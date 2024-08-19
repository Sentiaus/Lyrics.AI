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
            description: "Given the user's input create a song object with the name of the song, artist, and link to its lyrics on genius.com.",
            parameters: {
                type: "object",
                properties: {
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
                required: ["name", "artist", "geniusLink"]
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
        content: "Can you give me the information about the song called Metro Spider by Metro Boomin?"
    },
];

const response = await openAIClient.chat.completions.create({
    model: "gpt-4o-mini-2024-07-18",
    messages: messages,
    tools: tools,
})

console.log(response.choices[0].message.tool_calls?.[0].function)