import express from "express"
import mongoose from "mongoose"
import { songRoutes } from "./routes/songRoutes.js"
const app = express()

app.use(express.json())
app.use('/api/songs', songRoutes)

// app.get('/', async(req,res) => {
//     try{
//         res.status(200).json({Hello:"World"})
//     }catch(e){
//         return res.status(500).json({error:e})
//     }
// })
mongoose.connect("mongodb://localhost:27017", {dbName: 'gptSongs'})
    .then(()=>{
        console.log("Connected to DB successfully")
        app.listen(4000, () => console.log("Server started on port 4000"))
    })
    .catch((e)=>console.log(e))