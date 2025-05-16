import express from "express";
import {
    createUser,
    loginUser,
    getAlUsers,
    deleteUser,
    countUsers
} from "../controllers/user.controller.js";
import requireAuth from "../middleware/authMiddleware.js"

const router = express.Router();

router.post("/create",createUser);
router.post("/login", loginUser);
router.get("/view", requireAuth,getAlUsers);
router.delete("/delete/:id", requireAuth,deleteUser);
router.get("/count", requireAuth, countUsers);

export default router