import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import { UserGoogle } from "../models/userGoogle.model.js";

passport.serializeUser((user, done) => {
    console.log('serialize');
    console.log('Serialize User', user.id);
    done(null, user.id);
})


passport.deserializeUser(async (id, done) => {
    console.log('deserialize');
    console.log('Deserialize User', id);
    const findUser = await UserGoogle.findById(id);
    if(!findUser){
        done(new Error('USER NOT FOUND'));
    }
    else{
        done(null, findUser);
    }
});


export default passport.use(new Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/api/auth/google/redirect"

}, async (accesToken, refreshToken, profile, done) => {
    console.log('PROFILE');
    let findUser;
    try {
        findUser = await UserGoogle.findOne({googleId : profile.id});
    } catch (error) {
        done(error, null);    
    }

    try {
        if(!findUser){
            const newUser = await UserGoogle.create({
                googleId : profile.id,
                displayName : profile.displayName,
                firstName : profile.name.givenName,
                lastName : profile.name.familyName
            })
            done(null, newUser);
        }
        else{
            done(null, findUser);
        }
    } catch (error) {
        done(error, null);
    }
    
    
}))
