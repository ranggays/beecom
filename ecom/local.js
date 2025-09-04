import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import  User from "../models/userEcom.model.js";
import  {comparePassword} from "../middleware/hash.js";

try {    
    passport.use(new LocalStrategy({
        usernameField: 'email',
    }, async (email, password, done) => {
        try {
            const findUser = await User.findOne({ where: { email }});
            if(!findUser || !comparePassword(password, findUser.password)){
                done(null, false, { msg : 'No user found or password is incorrect' });
            }else{
                done(null, findUser);
            }
        } catch (error) {
            return done(error, null);
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user.id);
    })

    passport.deserializeUser(async (id, done) => {
        try {
            const findUser = await User.findByPk(id);
            if(!findUser){
                done(new Error('USER NOT FOUND'));
            }else{
                done(null, findUser);
            }
        } catch (error) {
            done(error, null);
        }
    })

} catch (error) {
    console.error("!!! FATAL ERROR saat konfigurasi Local Passport:", error);
    process.exit(1);
}
