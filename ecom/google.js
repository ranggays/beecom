import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/userEcom.model.js";

export default passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_REDIRECT_URL, 
}, async (accesToken, refreshToken, profile, done) => {
    let findUser;
    try {
        console.log("GOOGLE PROFILE", profile);
        findUser = await User.findOne({ where: { googleId: profile.id}});

        if(!findUser){
            findUser = await User.findOne({ where: { email: profile.emails[0].value}});
            if(findUser){
                findUser.googleId = profile.id;
                findUser.provider = 'google';
                await findUser.save();
                console.log("user updated", findUser);
            }
        }
    } catch (error) {
        done(error, null);
    }

    try {
        if(!findUser){
            const newUser = await User.create({
                fullName: profile.displayName,
                email: profile.emails[0].value,
                googleId: profile.id,
                provider: 'google'
            });
            console.log("user created", newUser);
            done(null, newUser);
        }else{
            console.log("user found", findUser);
            done(null, findUser);
        }
    } catch (error) {
        console.log("error", error);
        done(error, null);
    }
}))