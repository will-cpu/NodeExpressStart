const jwt = require('jsonwebtoken');
var createError = require('http-errors')

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    console.log(token)
    if (!token) {
      throw new Error('Authentication failed!');
    }
    const decodedToken = jwt.verify(token, 'JWT_KEY_PLEASE_CHANGE_THIS');
    req.userData = { uid: decodedToken.uid };
    next();
  } catch (err) {
      console.log(err);
    return next(createError(401,'Authentication Error! Missing Credentials'));
  }
};