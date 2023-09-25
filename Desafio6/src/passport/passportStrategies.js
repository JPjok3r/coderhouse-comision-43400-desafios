import passport from 'passport';
import { userModel } from '../dao/db/models/user.model.js';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GithubStrategy } from 'passport-github2';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { usersMongo } from '../dao/mongoManagers/UsersMongo.js';
import { compareData } from '../utils.js';

passport.use('login', new LocalStrategy(
    async function(username, password, done){
        try {
            const userInDB = await usersMongo.findOne(username);
            if(!userInDB){
                return done(null, false);
            }
            const validPass = await compareData(password, userInDB.password);
            if(!validPass){
                return done(null, false);
            }
            return done(null, userInDB);
        } catch (error) {
            done(error);
        }
    }
));

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
            const newUser = {
                first_name: profile.displayName.split(' ')[0],
                last_name: profile.displayName.split(' ')[1],
                email: profile._json.email,
                age: 0,
                password: ' ',
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
            const newUser = {
                first_name: profile.displayName.split(' ')[0],
                last_name: profile.displayName.split(' ')[1],
                email: profile._json.email,
                age: 0,
                password: ' ',
                fromGoogle: true
            }
            const userGithub = await usersMongo.createUser(newUser);
            cb(null, userGithub);
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