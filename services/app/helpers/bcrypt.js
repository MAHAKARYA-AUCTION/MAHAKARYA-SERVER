const bcrypt = require("bcryptjs")
function hasPassword(password) {
  return bcrypt.hashSync(password, 8)
}
function comparePassword(password, hash) {
  return bcrypt.compareSync(password, hash)
}

module.exports = { hasPassword, comparePassword}