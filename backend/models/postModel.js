import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    postname:{
        type: String,
        required: true
    },
    createdBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    }
}, { timestamps: true });

const post = mongoose.model("Post", postSchema);

export default post;