const bcrypt = require("bcrypt");
const User = require("../models/People");
const { unlink } = require("fs/promises");
const path = require("path");

async function getUsers(req, res, next) {
	try {
		const users = await User.find();
		res.render("users", {
			users: users,
		});
	} catch (error) {
		next(error);
	}
}

async function addUsers(req, res, next) {
	let newUser;
	const hashedPassword = await bcrypt.hash(req.body.password, 10);
	if (req.files && req.files.length > 0) {
		newUser = new User({
			...req.body,
			avatar: req.files[0].filename,
			password: hashedPassword,
		});
	} else {
		newUser = new User({
			...req.body,
			password: hashedPassword,
		});
	}

	try {
		const result = await newUser.save();
		res.status(200).json({
			message: "User added successfully!",
		});
	} catch (error) {
		res.status(500).json({
			errors: {
				common: {
					msg: "Unknown error occured!",
				},
			},
		});
	}
}

async function removeUser(req, res, next) {
	try {
		const user = await User.findOneAndDelete({
			_id: req.params.id,
		});

		if (user.avatar) {
			await unlink(path.join(__dirname, `/../public/uploads/avatars/${user.avatar}`));
		}

		res.status(200).json({
			message: "User was removed successfully!",
		});
	} catch (error) {
		console.error(error.message);
		res.status(500).json({
			errors: {
				common: {
					msg: "Could not remove user!",
				},
			},
		});
	}
}

module.exports = {
	getUsers,
	addUsers,
	removeUser,
};
