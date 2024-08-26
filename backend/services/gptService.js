import express from "express"
import OpenAI from "openai"
import dotenv from 'dotenv'
dotenv.config()

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
                    title: {
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
                required: ["lyric","title", "artist", "geniusLink"]
            }
        }
    }
    
];

const messages = [
    {
        role: "system", 
        content: "You are a helpful language parsing assistant. Use the supplied tools to assist the user."
    },
];



const readInput = async (req,res, next) => {
    const openAIClient = new OpenAI({
        apiKey: process.env['OPENAI_API_KEY']
    })
    // Get content from request
    const {content} = req.body

    // Validate input
    if(!content){
        return res.status(400).json({error: "Please input a query"})
    }

    // Append users message to the conversation
    messages.push({role: "user", content})

    // Get response from GPT4o-mini model
    const response = await openAIClient.chat.completions.create({
        model: "gpt-4o-mini-2024-07-18",
        messages: messages,
        tool_choice: "required", // Must always return function
        tools: tools,
    })

    // Get function response
    const jsonOutput = response.choices[0].message.tool_calls?.[0].function.arguments

    // Push tool output to messages
    if (jsonOutput){
        messages.push({role:"tools", content: JSON.stringify(jsonOutput)})
    }

    // Modify and return request with parsed output in the shape of {lyric, name, artist, geniusLink}
    req.body = JSON.parse(jsonOutput)
    next()
}


export { readInput }

