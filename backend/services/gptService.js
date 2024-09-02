import express, { json } from "express"
import OpenAI from "openai"
import dotenv from 'dotenv'
dotenv.config()

// Need to make sure this works when deployed
const openAIClient = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY']
})

// passed to the response.
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

// Passed to output response.
const toolsOutput = [
    {
        type: "function",
        function: {
            name: "createSnarkyResponse",
            description: "Given an object containing the lyric, number of occurences of a lyric, title of the song, and artist of the song, create a humourous reply.",
            parameters:{
                type: "object",
                properties: {
                    reply:{
                        type: "string",
                        description: "The humurous reply, stating the number of times the lyric occurred."
                    }
                },
                required: ["reply"]
            }
        }
    }
    

]

const messagesInput = [
    {
        role: "system", 
        content: "You are a helpful language parsing assistant. Use the supplied tools to assist the user."
    },
];

const messagesOutput = [
    {
        role: "system",
        content: "You are a humourous comedian assistant. After receiving information about the artist and occurences of a specificed lyric, you will return a humourous or snarky response. Responses should be limited to 300 characters."
    }
]



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
    messagesInput.push({role: "user", content})

    // Get response from GPT4o-mini model
    const response = await openAIClient.chat.completions.create({
        model: "gpt-4o-mini-2024-07-18",
        messages: messagesInput,
        tool_choice: "required", // Must always return function
        tools: tools,
    })

    // Get function response
    const jsonOutput = response.choices[0].message.tool_calls?.[0].function.arguments

    // Push tool output to messages
    if (jsonOutput){
        messagesInput.push({role:"tools", content: JSON.stringify(jsonOutput)})
    }

    // Modify and return request with parsed output in the shape of {lyric, name, artist, geniusLink}
    req.body = JSON.parse(jsonOutput)
    next()
}

const snarkyOutput = async (lyric, occurences, song) => {
    const openAIClient = new OpenAI({
        apiKey: process.env['OPENAI_API_KEY']
    })
    // Get content from request
    const content = `${occurences} occurences of the lyric ${lyric} in ${song.artist}'s song ${song.title}`

    // Append users message to the converstaion
    messagesOutput.push({role: "user", content})
    const response = await openAIClient.chat.completions.create({
        model: "gpt-4o-mini-2024-07-18",
        messages: messagesOutput,
    })

    // Get function response
    const output = response.choices[0].message.content
    console.log(output)
    return output
}
// await snarkyOutput("Hello", 0, "Adele", "Hello")


export { readInput, snarkyOutput }

