const jwt = require('jsonwebtoken');

const secret = 'Geeks@#$!12323';

function createJWT(payload, expiry = '1d') {
  const token = jwt.sign(payload, secret, {
    expiresIn: expiry,
  });
  return token;
}

function validateJWT(token) {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (err) {
    console.error(err);
    return false;
  }
}

module.exports = { createJWT, validateJWT };
