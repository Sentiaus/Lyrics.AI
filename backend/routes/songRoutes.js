import express from "express"
import { addSong, getSongs } from "../controllers/songController.js"

const router = express.Router()

/******* Get All Songs *******/
router.get('/', getSongs)

/******* Add one Song *******/
router.post('/', addSong)

export { router as songRoutes }