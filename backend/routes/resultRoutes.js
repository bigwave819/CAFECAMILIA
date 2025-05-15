import express from "express";
import {
    createResult,
    updateResult,
    getAllResults,
    getSingleResult
} from "../controllers/result.controller.js";

import requireAuth from "../middleware/authMiddleware.js"

const router = express.Router();

router.post("/create", requireAuth ,createResult);
router.put("/update/:id", requireAuth ,updateResult);
router.get("/view", requireAuth ,getAllResults);
router.get("/view/:id", requireAuth ,getSingleResult);

export default router