const userModel = require("../model/UserModel");

//user register
const userRegister = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (name == undefined || email == undefined || password == undefined) {
      return res.status(400).send("all field are required");
    }
    const SaveUserData = new userModel({
      name,
      email,
      password,
    });
    const user = await SaveUserData.save();
    res.status(200).json({ message: "success", user });
  } catch (err) {
    res.status(500).json({ message: "error", err });
  }
};

//get all user datas
const getAllUserInfo = async (req, res) => {
  try {
    const getUser = await userModel.find();
    res.status(200).json({ message: "success", getUser });
  } catch (err) {
    res.status(500).json({ message: "no fetching data" });
  }
};

//get userById
const getUserById = async (req, res) => {
  const { userId } = req.params;
  try {
    if (!userId) return res.status(400).json({ message: "user not found" });
    const getUser = await userModel.findById(userId);
    res.status(200).json({ message: "success", getUser });
  } catch (err) {
    res.status(500).json({ message: "user no record ", err });
  }
};

//update userData
const updateUserData = async (req, res) => {
  const { userId } = req.params;
  const { name, email, password } = req.body;
  try {
    const userData = await userModel.findByIdAndUpdate(
      userId,
      { name, email, password },
      {
        new: true,
      }
    );
    res.status(200).json({ message: "success", userData });
  } catch (err) {
    res.status(500).json({ message: "error", err });
  }
};

//delete user id->data
const deleteUserData = async (req, res) => {
  const { userId } = req.params;
  try {
    const userData = await userModel.findByIdAndDelete(userId);
    res.status(200).json({ message: `${userData.name} is deleted` });
  } catch (err) {
    res.status(500).json({ message: "error", err });
  }
};

module.exports = {
  userRegister,
  getAllUserInfo,
  getUserById,
  updateUserData,
  deleteUserData,
};
