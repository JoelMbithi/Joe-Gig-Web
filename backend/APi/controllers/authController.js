import User from "../Models/userModel.js"; 
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

// Register
export const register = async (req, res) => {
   try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      const newUser = new User({
         username: req.body.username,
         email: req.body.email,
         password: hashedPassword,
         country: req.body.country,
         img: req.body.img, 
         isSeller: req.body.isSeller === "true" || req.body.isSeller === true,
      });

      const user = await newUser.save();
      res.status(200).json(user);

   } catch (error) {
      res.status(500).json({ message: "Error registering user", error });
   }
};

// Login
export const login = async (req, res, next) => {
  try {
   const user = await User.findOne({ username: req.body.username });
   if (!user) return next(createError(403, "User not found"));

   const isCorrect = await bcrypt.compare(req.body.password, user.password);
   if (!isCorrect) return next(createError(403, "Invalid username or password"));

   // Generate token
   const token = jwt.sign({ id: user._id, isSeller: user.isSeller }, process.env.JWT_SECRET, {
     expiresIn: "1d"
   });

   const { password, ...others } = user._doc;

   // ✅ Set cookie with correct settings
   res.cookie("accessToken", token, {
     httpOnly: true, 
     secure: process.env.NODE_ENV === "production", // Secure in production
     sameSite: "lax", // Try "strict" if needed
     path: "/" // Set to root path
   });

   res.status(200).json(others);
 } catch (error) {
   next(error);
 }
};


// Logout
export const logout = (req, res) => {
   res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None"
   })
   .status(200)
   .json({ message: "Logout successful" });
};
