import mongoose from "mongoose";

const resultSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true
    },
    score: {
        type: Number,
        required: true 
    },
    decision: {
        type: String,
        enum: ['pass', 'fail'],
        required: true
    }
}, { timestamps: true });

const result = mongoose.model("Result", resultSchema);

export default result;