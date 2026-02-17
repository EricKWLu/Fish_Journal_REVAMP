import express, { application } from "express";
import { getPosts, getPost, createPost, deletePost, uploadAuth } from "../controllers/post.controller.js";
import { postLimiter } from "../rate_limit/rate.limit.js";


const router = express.Router()

router.get("/upload-auth", uploadAuth);
router.get("/", getPosts);
router.get("/:slug", getPost);
router.post("/", postLimiter, createPost);
router.delete("/:id", deletePost);

export default router