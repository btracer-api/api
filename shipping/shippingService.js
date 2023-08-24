const Shipping = require("./shipping");
// Auth Middleware with Passport
const passport = require("passport");
require("../config/passport")(passport);

Shipping.methods(["get", "post", "put", "delete"]);

Shipping.updateOptions({ new: true, runValidators: true });

module.exports = Shipping;
