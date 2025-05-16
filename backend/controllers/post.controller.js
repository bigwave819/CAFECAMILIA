import Post from "../models/postModel.js";
import Result from "../models/resultModel.js";


export const createPost = async (req, res) => {
  try {
    const { postname } = req.body;

    if (!postname) {
      return res.status(400).json({ message: "Postname is required" });
    }

    const existingPost = await Post.findOne({ postname });
    if (existingPost) {
      return res.status(400).json({ message: "Post already exists" });
    }

    const newPost = new Post({
      postname,
      createdBy: req.user._id,
    });

    await newPost.save();

    res.status(201).json({
      message: "Post created successfully",
      post: {
        id: newPost._id,
        postname: newPost.postname,
        createdBy: newPost.createdBy,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

export const updatePost = async (req, res) => {
    try {
        const { id } = req.params;

        const updated = await Post.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true }
        );
        if (!updated) {
            return res.status(404).json({ message: "Not Found The Post" });
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

export const getAllPost = async (req, res) => {
  try {
    const post = await Post.find();

    if (post.length === 0) {
      return res.status(404).json({ message: "No post found" });
    }
    res.status(200).json({
      post
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error: ",
      error: error.message
    });
  }
};


export const getSinglePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id).populate("createdBy", "username email");

    if (!post) {
      return res.status(404).json({ message: "No post found" });
    }
    res.status(200).json({
      post
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error: ",
      error: error.message
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ error: "Post not found" });
    await Result.deleteMany({ post: postId });
    await Post.findByIdAndDelete(postId);

    res.status(200).json({ message: "Post and related data deleted successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error while deleting Post" });
  }
};

export const countPosts = async (req, res) => {
  try {
    const totalPost = await Post.countDocuments();
    res.status(200).json({ totalPost });
  } catch (error) {
    res.status(500).json({ error: "Error counting Posts" });
  }
};
