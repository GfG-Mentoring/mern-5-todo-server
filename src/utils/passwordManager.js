const bcrypt = require('bcrypt');
const saltRounds = 11;

async function createPasswordHash(password) {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

async function comparePasswords(plainPassword, hashedPassword) {
  return bcrypt.compareSync(plainPassword, hashedPassword);
}

module.exports = { createPasswordHash, comparePasswords };
