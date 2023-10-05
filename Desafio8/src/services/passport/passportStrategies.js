import passport from 'passport';
import { userModel } from '../../DAO/db/models/user.model.js';
import { Strategy as GithubStrategy } from 'passport-github2';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { usersMongo } from '../../DAO/managers/UsersMongo.js';

passport.use(new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_SECRET_KEY,
    callbackURL: 'http://localhost:8080/api/users/github'
    },
    async function(accessToken, refreshToken, profile, done){
        try {
            const userInDB = await usersMongo.findOne(profile._json.email);
            if(userInDB){
                if(userInDB.fromGithub){
                    return done(null, userInDB);
                } else{
                    return done(null, false);
                }
            }
            const cartUser = await (await fetch('http://localhost:8080/api/carts', settings)).json();
            const newUser = {
                first_name: profile.displayName.split(' ')[0],
                last_name: profile.displayName.split(' ')[1],
                email: profile._json.email,
                age: 0,
                password: ' ',
                cart: cartUser.cart._id,
                fromGithub: true
            }
            const userGithub = await usersMongo.createUser(newUser);
            done(null, userGithub);
        } catch (error) {
            done(error);
        }
    }
));

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:8080/api/users/googleAuth'
    },
    async function(accessToken, refreshToken, profile, cb){
         try {
            const userInDB = await usersMongo.findOne(profile._json.email);
            if(userInDB){
                if(userInDB.fromGithub){
                    return cb(null, userInDB);
                } else{
                    return cb(null, false);
                }
            }
            const cartUser = await (await fetch('http://localhost:8080/api/carts', settings)).json();
            const newUser = {
                first_name: profile.displayName.split(' ')[0],
                last_name: profile.displayName.split(' ')[1],
                email: profile._json.email,
                age: 0,
                password: ' ',
                cart: cartUser.cart._id,
                fromGoogle: true
            }
            const userGoogle = await usersMongo.createUser(newUser);
            cb(null, userGoogle);
        } catch (error) {
            cb(error);
        } 
    }
))

passport.serializeUser((user,done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await userModel.findById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
})