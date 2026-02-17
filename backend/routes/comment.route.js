import express, { application } from "express"
import { addComment, deleteComment, getPostComments } from "../controllers/comment.controller.js"
import { postLimiter } from "../rate_limit/rate.limit.js"

const router = express.Router()

router.get("/:postId", getPostComments)
router.post("/:postId", postLimiter, addComment)
router.delete("/:id", deleteComment)

export default router