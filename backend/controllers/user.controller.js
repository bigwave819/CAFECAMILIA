import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import jwtToken from "../utils/jwtToken.js";
import Result from "../models/resultModel.js";

export const createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required"});
        }
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User Already Exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hash,
        });

        await newUser.save();

        const token = jwtToken({ id: newUser._id, role: newUser.role });

        res.status(201).json({
            token,
            user:{
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role
            }
        })
    } catch (error) {
        return res.status(500).json({
            message: "Server Error: ",
            error: error.message
        })
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if ( !email || !password) {
            return res.status(400).json({ message: "All fields are required"});
        }
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password)

        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Invalid Password or email" });
        }

        const token = jwtToken({ id: user._id, role: user.role });

        res.status(200).json({
            token,
            user:{
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        })
    } catch (error) {
        return res.status(500).json({
            message: "Server Error: ",
            error: error.message
        })
    }
};

export const getAlUsers = async (req, res) => {
    try {
    
        const user = await User.find().select("-password");

        if (user.length == 0) {
            return res.status(404).json({ message: "No Users found" });
        }
        res.status(200).json({
            user
        })
    } catch (error) {
        return res.status(500).json({
            message: "Server Error: ",
            error: error.message
        })
    }
};


export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });
    await Result.deleteMany({ user: userId });
    await User.findByIdAndDelete(userId);

    res.status(200).json({ message: "User and related data deleted successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error while deleting user" });
  }
};

export const countUsers = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    res.status(200).json({ totalUsers });
  } catch (error) {
    res.status(500).json({ error: "Error counting users" });
  }
};
