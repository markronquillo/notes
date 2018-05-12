const db = require("./db");

module.exports.handleSignup = (email, password) => {
  // check if email already exists
  db.saveUser({ email, password });
  // send the welcome email
};
