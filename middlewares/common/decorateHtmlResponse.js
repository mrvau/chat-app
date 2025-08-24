function decorateHtmlResponse(pageTitle) {
	return function (req, res, next) {
		res.locals.html = true;
		res.locals.title = `${pageTitle} - Chat Application`;
		next();
	};
}

module.exports = decorateHtmlResponse;
