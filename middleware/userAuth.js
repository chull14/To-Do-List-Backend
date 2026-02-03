import User from "../dataModels/users.js";
import bcrypt from 'bcrypt';

const verifyUser = async (req, res, next) => {
  try {
    const {
      email,
      password
    } = req.body;

    if (!email || !password) return res.status(400).json({ notice: "Email and password are required" });

    const currUser = await User.findOne({ email: email }).exec();
    if (!currUser) return res.status(404).json({ notice: "Email not found" });

    const isMatch = await bcrypt.compare(password, currUser.password);
    if (!isMatch) return res.status(401).json({ notice: "Password incorrect. Login Failed" });

    console.log("USER AUTHENTICATED"); // confirmation check

    req.user = {
      id: currUser.id,
      email: currUser.email
    };

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" })
  }
};

export default { verifyUser };