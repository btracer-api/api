const Outgoing = require("./outgoing");
// Auth Middleware with Passport
const passport = require("passport");
require("../config/passport")(passport);

Outgoing.methods(["get", "post", "put", "delete"]);

Outgoing.updateOptions({ new: true, runValidators: true });

// Outgoing.before('get', getIpAlled)
//      .before('post', getIpAlled)
//      .before('put', getIpAlled)
//      .before('delete', getIpAlled)

function getIpAlled(req, res, next) {
  var ip;
  var allows = ["191.189.0.243", "::1", "10.69.85.146"];
  if (req.headers["x-forwarded-for"]) {
    ip = req.headers["x-forwarded-for"].split(",")[0];
  } else if (req.connection && req.connection.remoteAddress) {
    ip = req.connection.remoteAddress;
  } else {
    ip = req.ip;
  }
  console.log("client IP is *********************" + ip);
  if (allows.includes(ip)) {
    next();
  } else {
    res.send(
      "Acesso não autorizado. Favor contactar Admin (nomad@nomad.com.br) para solicitar acesso."
    );
  }
}

module.exports = Outgoing;

//getIpAlled -- req.connection.remoteAddress
