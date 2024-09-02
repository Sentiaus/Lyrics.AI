import express from "express"
import { addSong, getSongs, searchSong } from "../controllers/songController.js"
import { readInput } from "../services/gptService.js"

const router = express.Router()

/******* Get All Songs *******/
router.get('/', getSongs)

/******* Add one Song *******/
router.post('/', readInput, addSong)

router.get('/search', searchSong)

export { router as songRoutes }