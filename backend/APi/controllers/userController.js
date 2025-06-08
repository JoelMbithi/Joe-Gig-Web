import User from "../Models/userModel.js";
import mongoose from "mongoose";

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).send("User not found");

        if (req.userId !== user._id.toString()) {
            return res.status(403).send("You can delete only your account!");
        }

        await User.findByIdAndDelete(req.params.id);
        res.status(200).send("Account deleted successfully");

    } catch (error) {
        res.status(500).send("Internal server error");
    }
};

export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        
        if (!user) {
            return res.status(404).json({ message: "User not in the database" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
