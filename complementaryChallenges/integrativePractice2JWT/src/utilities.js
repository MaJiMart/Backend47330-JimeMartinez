import path from 'path';
import bcrypt from 'bcrypt';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

export const __dirname = path.dirname(__filename);

export const JWT_SECRET = '%ySKY5=n,O#7£|VG~pa2Q.4)ed4zhJ8';

export class Exception extends Error {
  constructor(message, status) {
    super(message);
    this.statusCode = status;
  }
}

export const tokenGenerator = (user) => {
  const { _id, first_name, last_name, email } = user;
  const payload = {
    id: _id,
    first_name,
    last_name,
    email,
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1m'});
};

export const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (error, payload) => {
      if (error) {
        return reject(error)
      }
      resolve(payload)
    });
  })
}

export const authMiddleware = (strategy) => (req, res, next) =>{
  passport.authenticate(strategy, function(error, user, info) {
    if (error) {
      return next(error);
    }
    if (!user) {
      return res.status(401).jason({ message: info.message ? info.message : info.toString () });
    }
    req.user = user;
    next();
  })(req, res, next);
};

export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (password, user) => bcrypt.compareSync(password, user.password);