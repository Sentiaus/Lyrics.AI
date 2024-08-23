import express from "express"
import { addSong, getSongs, scrapeSong } from "../controllers/songController.js"

const router = express.Router()

/******* Get All Songs *******/
router.get('/', getSongs)

/******* Add one Song *******/
router.post('/', addSong)

// Testing
router.get('/scrape', scrapeSong)

export { router as songRoutes }