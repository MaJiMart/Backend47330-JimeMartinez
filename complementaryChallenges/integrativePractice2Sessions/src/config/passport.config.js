import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import GithubStrategy from 'passport-github2';
import { createHash, isValidPassword } from '../utilities.js';
import UserModel from '../models/userModel.js';

const opts = {
  usernameField: 'email',
  passReqToCallback: true,
};

const githubOpts = {
  clientID: 'Iv1.584fc3f095089d99',
  clientSecret: '659324d34176ebb54331234f4656f2e8a31da679',
  callbackURL: 'http://localhost:8080/api/sessions/githubcb'
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
  
  passport.use('github', new GithubStrategy(githubOpts, async(accessToken, refreshToken, profile, done) => {
    const email = profile._json.email;
    let user = await UserModel.findOne({ email });
    if (user) {
      return done(null, user);
    }
    user = {
      first_name: profile._json.name,
      email: profile._json.email,
      provider: 'Github'
    };
    const newUser = await UserModel.create(user);
    done(null, newUser);
  }))

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async(uid, done) => {
    const user = await UserModel.findById(uid);
    done(null, user);
  });
};
