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
const { checkLogin } = require("../middlewares/common/checkLogin");

const router = express.Router();

const pageTitle = "Users";

router.get("/", decorateHtmlResponse(pageTitle), checkLogin, getUsers);

router.post("/", avatarUpload, addUserValidators, addUserValidationHandler, addUsers);

router.delete("/:id", removeUser);

module.exports = router;
