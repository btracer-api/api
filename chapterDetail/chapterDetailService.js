const ChapterDetail = require("./chapterDetail");
// Auth Middleware with Passport
const passport = require("passport");
require("../config/passport")(passport);

ChapterDetail.methods(["get", "post", "put"]);

ChapterDetail.updateOptions({ new: true, runValidators: true });

module.exports = ChapterDetail;
