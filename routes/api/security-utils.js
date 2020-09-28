const jwt = require('jsonwebtoken');
const uuid = require('uuid').v4;

const { jwtConfig: { secret, expiresIn } } = require('../../config');
const { User } = require('../../db/models');

function generateToken(user) {
  //toSafeObject is a method on User model that removes the password
  const data = user.toSafeObject();
  const jwtid = uuid();

  //jwt
  return {
    jti: jwtid,
    token: jwt.sign({ data }, secret, { expiresIn: Number.parseInt(expiresIn), jwtid })
  };
}

function restoreUser(req, res, next) {
  //try to get cookie from user
  const { token } = req.cookies;

  //if there is no cookie, cant restore the user, send unauthorized http status code
  if (!token) {
    return next({ status: 401, message: 'no token' });
  }

  return jwt.verify(token, secret, null, async (err, payload) => {
    if (err) {
      res.clearCookie('token');
      err.status = 401;
      return next(err);
    }

    const tokenId = payload.jti;

    try {
      //try to find the user by token Id and if you do set it as a key value pair on req
      req.user = await User.findOne({ where: { tokenId } });
    } catch (e) {
      //if not clear the token cookie
      res.clearCookie("token");
      return next({ status: 401, message: "user not found" });
    }

    if (!req.user) {
      res.clearCookie("token");
      return next({ status: 401, message: 'session not found' });
    }

    next();
  });
}

module.exports = { generateToken, restoreUser };
