const CustomerShedule = require("./customerSchedule");
// Auth Middleware with Passport
const passport = require("passport");
require("../config/passport")(passport);

CustomerShedule.methods(["get", "post", "put"]);

CustomerShedule.updateOptions({ new: true, runValidators: true });

CustomerShedule.before("get", passport.authenticate("jwt", { session: false }))
  .before("post", passport.authenticate("jwt", { session: false }))
  .before("put", passport.authenticate("jwt", { session: false }));

module.exports = CustomerShedule;
