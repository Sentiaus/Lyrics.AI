import express from "express"
import { getSongs, handleUserRequest } from "../controllers/songController.js"
import { readInput } from "../services/gptService.js"

const router = express.Router()

/******* Get All Songs *******/
router.get('/', getSongs)

/******* Process User Query *******/
router.post('/', readInput, handleUserRequest)

// router.get('/search', searchSong)

export { router as songRoutes }