const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const User = require("../models/People");

function getLogin(req, res, next) {
	res.render("index");
}

async function login(req, res, next) {
	try {
		let user = await User.find({
			$or: [{ email: req.body.username }, { mobile: req.body.username }],
		});

		user = user[0];

		if (user && user._id) {
			const isValidPassword = await bcrypt.compare(req.body.password, user.password);

			if (isValidPassword) {
				const userObject = {
					username: user.name,
					mobile: user.mobile,
					email: user.email,
					role: "user",
				};

				const token = jwt.sign(userObject, process.env.JWT_SECRET, {
					expiresIn: process.env.JWT_EXPIRY,
				});

				res.cookie(process.env.COOKIE_NAME, token, {
					maxAge: process.env.JWT_EXPIRY,
					httpOnly: true,
					signed: true,
				});

				res.locals.loggedInUser = userObject;

				res.render("inbox");
			} else {
				throw createError("Login failed! please try again.");
			}
		} else {
			throw createError("Login failed! please try again.");
		}
	} catch (error) {
		res.render("index", {
			data: {
				username: req.body.username,
			},
			errors: {
				common: {
					msg: error.message,
				},
			},
		});
	}
}

function logout(req, res) {
	res.clearCookie(process.env.COOKIE_NAME);
	res.send("logged out");
}

module.exports = {
	getLogin,
	login,
	logout,
};
