import Post from "../models/postModel.js";
import Result from "../models/resultModel.js"


export const createResult = async (req, res) => {
    try {
        const { post, score } = req.body;

        if (!post || !score) {
            return res.status(400).json({ message: "All fields are required"});
        }

        const resultExists = await Result.findOne({ post })

        if (resultExists) {
            return res.status(400).json({ message: "result Already Exists" });
        }

        const decision = score >= 70 ? "pass" : "fail"

        const newResult = new Result({
            user: req.user._id,
            post,
            score,
            decision
        });

        await newResult.save();

        res.status(201).json({
        message: "Result created successfully.",
        result: {
            id: newResult._id,
            user: newResult.user,
            score: newResult.score,
            decision: newResult.decision
        },
    });
    } catch (error) {
        return res.status(500).json({
            message: "Server Error: ",
            error: error.message
        })
    }
};

export const updateResult = async (req, res) => {
    try {
        const { id } = req.params;

        const updated = await Result.findByIdAndUpdate(id);
        if (!updated) {
            return res.status(404).json({ message: "Not Found The Result" });
        }


        res.status(200).json({
            message: "Updated Successfully",
            updated
        })
    } catch (error) {
        return res.status(500).json({
            message: "Server Error: ",
            error: error.message
        })
    }
};

export const getAllResults = async (req, res) => {
    try {
    
        const result = await Result.find();

        if (result.length == 0) {
            return res.status(404).json({ message: "No result found" });
        }
        res.status(200).json({
            result
        })
    } catch (error) {
        return res.status(500).json({
            message: "Server Error: ",
            error: error.message
        })
    }
};

export const getSingleResult = async (req, res) => {
    try {

        const { id } = req.params;

        const result = await Result.findById(id);

        if (result.length == 0) {
            return res.status(404).json({ message: "No result found" });
        }
        res.status(200).json({
            result
        })
    } catch (error) {
        return res.status(500).json({
            message: "Server Error: ",
            error: error.message
        })
    }
};