import express from "express";
import {
    createUser,
    loginUser,
    getAlUsers
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/create", createUser);
router.post("/login", loginUser);
router.get("/view", getAlUsers);

export default router