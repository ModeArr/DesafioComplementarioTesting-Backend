import passport from "passport";
import passportLocal from "passport-local";
import GithubStrategy from "passport-github2";
import { userService } from "../repository/index.js";
import passportJwt from "passport-jwt";
import { JWT_SECRET, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from "./config.js";

const JWTStrategy = passportJwt.Strategy;
const secret = JWT_SECRET

const localStrategy = passportLocal.Strategy;

const initializePassport = () => {
  passport.use(
    "register",
    new localStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },
      async (req, username, password, done) => {

        const { first_name, last_name, age, email } = req.body;

        try {
          let user = await userService.checkUser(email)
          if (user) {
            return done(null, false);
          }

          const newUser = await userService.addUser(first_name, last_name, email, Number(age), password)

          if (!newUser) {
            return res
              .status(500)
              .json({ message: `we have some issues register this user` });
          }

          return done(null, newUser);
        } catch (error) {
            throw Error(error)
        }
      }
    )
  );

  passport.use(
    "login",
    new localStrategy(
      {
        usernameField: "email",
      },
      async (username, password, done) => {
        try {
          let user = await userService.checkUserAndPass(username, password)

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "github",
    new GithubStrategy(
      {
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: "http://localhost:8080/api/sessions/github/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log(profile._json)
          let user = await userService.checkUser(profile._json?.email);
          if (!user) {
            let addNewUser = {
              first_name: profile._json.name,
              last_name: "No LastName", //areglar esto
              email: profile._json?.email,
              age: 18,
              password: "GenerarPassHasheadaRandom", //y esto
            };
            console.log(addNewUser)
            let newUser = await userService.addUser(addNewUser.first_name, addNewUser.last_name, addNewUser.email, addNewUser.age, addNewUser.password);
            done(null, newUser);
          } else {
            done(null, user);
          }
        } catch (error) {
          done(error);
        }
      }
    )
  );

  const cookieExtractor = req => {
    let token = null 

    if (req && req.cookies) {
        token = req.signedCookies['jwt']
    }

    return token
}

  passport.use('jwt', new JWTStrategy({
  jwtFromRequest: cookieExtractor,
  secretOrKey: secret
}, async (jwtPayload, done) => {
  try {
    done(null, jwtPayload)
  } catch (error) {
    done(error)
  }
}))

};

export default initializePassport;