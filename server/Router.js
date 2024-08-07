const express = require("express");
const router = express.Router();
const userController = require("./controller/UserController");

router.post("/user-register", userController.userRegister);
router.get("/get-all-user", userController.getAllUserInfo);
router.get("/get-user-id/:userId", userController.getUserById);
router.put("/update-user-id/:userId", userController.updateUserData);
router.delete("/delete-user-id/:userId", userController.deleteUserData);

module.exports = router;
