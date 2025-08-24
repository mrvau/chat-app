// dependencies
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");

// app initialization
const app = express();
dotenv.config();

// connect to the database
mongoose
	.connect(process.env.MONGO_CONNECTION_STRING)
	.then(() => {
		console.log("Database connection successful!");
	})
	.catch((err) => {
		console.error(err);
	});

// request parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set view engine
app.set("view engine", "ejs");

// set static folder
app.use(express.static(path.join(__dirname, "public")));

// parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

// routing setup

// error handling

app.listen(process.env.PORT, () => {
	console.log(`app listening to port: ${process.env.PORT}`);
});
