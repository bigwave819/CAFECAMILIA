import express from "express";
import {
    createPost,
    updatePost,
    getAllPost,
    getSinglePost,
    deletePost,
    countPosts
} from "../controllers/post.controller.js";

import requireAuth from "../middleware/authMiddleware.js"

const router = express.Router();

router.post("/create", requireAuth ,createPost);
router.put("/update/:id", requireAuth ,updatePost);
router.get("/view", requireAuth ,getAllPost);
router.get("/view/:id", requireAuth ,getSinglePost);
router.delete("/delete/:id", requireAuth, deletePost);
router.get("/count", requireAuth ,countPosts);

export default router