const userModel = require("../model/UserModel");

// User registration
const userRegister = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).send("All fields are required");
    }
    const SaveUserData = new userModel({
      name,
      email,
      password,
    });
    const user = await SaveUserData.save();
    res.status(200).json({ message: "Success", user });
  } catch (err) {
    res.status(500).json({ message: "Error", err });
  }
};

// Get all user data
const getAllUserInfo = async (req, res) => {
  try {
    const getUser = await userModel.find();
    res.status(200).json({ message: "Success", getUser });
  } catch (err) {
    res.status(500).json({ message: "Error fetching data", err });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  const { userId } = req.params;
  try {
    if (!userId) return res.status(400).json({ message: "User not found" });
    const getUser = await userModel.findById(userId);
    if (!getUser) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "Success", getUser });
  } catch (err) {
    res.status(500).json({ message: "Error fetching user", err });
  }
};

// Update user data
const updateUserData = async (req, res) => {
  const { userId } = req.params;
  const { name, email, password } = req.body;
  try {
    const userData = await userModel.findByIdAndUpdate(
      userId,
      { name, email, password },
      { new: true }
    );
    if (!userData) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "Success", userData });
  } catch (err) {
    res.status(500).json({ message: "Error updating user", err });
  }
};

// Delete user data
const deleteUserData = async (req, res) => {
  const { userId } = req.params;
  try {
    const userData = await userModel.findByIdAndDelete(userId);
    if (!userData) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: `${userData.name} is deleted` });
  } catch (err) {
    res.status(500).json({ message: "Error deleting user", err });
  }
};

module.exports = {
  userRegister,
  getAllUserInfo,
  getUserById,
  updateUserData,
  deleteUserData,
};
