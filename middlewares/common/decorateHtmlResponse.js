function decorateHtmlResponse(pageTitle) {
	return function (req, res, next) {
		res.locals.html = true;
		res.locals.title = `${pageTitle} - Chat Application`;
		res.locals.loggedInUser = {};
		res.locals.errors = {};
		res.locals.data = {};
		next();
	};
}

module.exports = decorateHtmlResponse;
