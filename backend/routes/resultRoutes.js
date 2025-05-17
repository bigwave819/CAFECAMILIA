import express from "express";
import {
    createResult,
    updateResult,
    getAllResults,
    getResultsByUser,
    deleteResult,
    countResults
} from "../controllers/result.controller.js";

import requireAuth from "../middleware/authMiddleware.js"

const router = express.Router();

router.post("/create", requireAuth ,createResult);
router.put("/update/:id", requireAuth ,updateResult);
router.get("/view", requireAuth ,getAllResults);
router.get("/view/user/:userId", requireAuth, getResultsByUser);
router.delete('/delete/:id', requireAuth ,deleteResult);
router.get("/count", requireAuth,countResults);

export default router