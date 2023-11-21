import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { createHash, isValidPassword } from '../utilities.js';
import UserModel from '../models/userModel.js';

const opts = {
  usernameField: 'email',
  passReqToCallback: true,
};

export const initPassport = () => {
  passport.use('register', new LocalStrategy(opts, async(req, email, password, done) => {
    try {
        const user = await UserModel.findOne({ email });
          if (user) {
            return done(new Error('Already registered user'));
          }
          const newUser = await UserModel.create({ ...req.body, password: createHash(password)});
          done(null, newUser)
    } catch (error) {
        done(new Error(`Authentication Error ${error.message}`))
    }
    }));
  
  passport.use('login', new LocalStrategy(opts, async(req, email, password, done) => {
    try {
      const user = await UserModel.findOne({ email });
      if (!user) {
        return done(new Error('Unregistered user'));
      }
      const validPass = isValidPassword(password, user);
      if (!validPass) {
        return done(new Error('Wrong email or password.'));
      }
      done(null, user)
     } catch (error) {
      done(new Error(`Authentication Error ${error.message}`))
    }
  }));
  
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async(uid, done) => {
    const user = await UserModel.findById(uid);
    done(null, user);
  });
};
