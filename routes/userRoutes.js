import User from '../dataModels/users.js';

// create a user POST
const createUser = async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body;

    if (!email || !password) return res.status(400).json({ notice: "Email and password are required" })

    const newUser = new User({
      email: email,
      password: password
    });

    await newUser.save();

    res.status(201).json({
      confirm: "New user successfully registered",
      data: newUser
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Bad request. Check for missing or invalid data" });
  }
};

// delete user DELETE
const deleteUser = async (req, res) => {
  try {
    const userID = req.params.id;
    let toDelete = await User.findById(userID).exec();

    if (!toDelete) {
      return res.status(404).json({ notice: "User not found" });
    };

    await User.deleteOne({ _id: userID }).exec();

    res.status(200).json({
      confirm: "User successfully deleted",
      data: toDelete
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Unable to perform user deletion" });
  }
};

// get specific user info GET
const getUser = async (req, res) => {
  try {
    const userID = req.params.id;
    const userData = await User.findById(userID).exec();

    if (!userData) {
      return res.status(404).json({ notice: "User not found" });
    };

    res.status(200).json({
      confirm: "User found",
      data: userData
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "User not found. Check input data" })
  }
};

// get all users GET
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).exec();

    if (users.length == 0) {
      return res.status(200).json({
        notice: "No users are registered",
        data: {}
      });
    };

    res.status(200).json({
      confirm: "Succesfully retrieved users",
      data: users
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error: Unable to retreive users" })
  }
};

// update user email or password PUT (might not implement)

export default { createUser, deleteUser, getUser, getAllUsers };