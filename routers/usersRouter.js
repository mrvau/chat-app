// external imports
const express = require("express");

// internal imports
const { getUsers, addUsers, removeUser } = require("../controllers/usersController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const avatarUpload = require("../middlewares/users/avatarUpload");
const {
	addUserValidators,
	addUserValidationHandler,
} = require("../middlewares/users/userValidators");

const router = express.Router();

router.get("/", decorateHtmlResponse("Users"), getUsers);

router.post("/", avatarUpload, addUserValidators, addUserValidationHandler, addUsers);

router.delete("/:id", removeUser);

module.exports = router;
