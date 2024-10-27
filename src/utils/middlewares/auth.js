const { validateJWT } = require('../jwtManager');

const verifyUser = (req, res, next) => {
  let accessToken = req.headers.authorization;

  if (!accessToken) {
    res.status(401).send({ message: 'Missing credentials' });
  }

  accessToken = accessToken.replace('Bearer ', '');

  const tokenData = validateJWT(accessToken);

  if (tokenData) {
    req.user = tokenData;
  } else {
    res
      .status(401)
      .send({ message: 'Your access has expired. Please login to continue.' });
  }

  // this will pass the request to next function in the series
  next();
};

module.exports = { verifyUser };
