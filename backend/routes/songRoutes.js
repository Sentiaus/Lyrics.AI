import express from "express"
import { addSong, getSongs, scrapeSong } from "../controllers/songController.js"
import { readInput } from "../services/gptService.js"

const router = express.Router()

/******* Get All Songs *******/
router.get('/', getSongs)

/******* Add one Song *******/
router.post('/', readInput, addSong)

// Testing
router.get('/scrape', scrapeSong)

export { router as songRoutes }