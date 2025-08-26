// external imports
const express = require("express");

// internal imports
const { getLogin, login, logout } = require("../controllers/loginController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const {
	doLoginValidators,
	doLoginValidationHandler,
} = require("../middlewares/login/loginValidator");
const { redirectLoggedIn } = require("../middlewares/common/checkLogin");

const router = express.Router();

const pageTitle = "Login";

router.get("/", decorateHtmlResponse(pageTitle), redirectLoggedIn, getLogin);

router.post(
	"/",
	decorateHtmlResponse(pageTitle),
	doLoginValidators,
	doLoginValidationHandler,
	login,
);

router.delete("/", logout);

module.exports = router;
