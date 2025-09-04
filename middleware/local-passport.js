import passport from "passport";
import { Strategy } from "passport-local";
import { mockUser } from "../mockUser.js";
import { User } from "../models/user.model.js";
import { comparePassword } from "./hash.js";


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) =>{
    // const findUser = mockUser.find((user) => user.id === id);
    const findUser = await User.findById(id);
    if(!findUser){
        done(new Error('USER NOT FOUND'));
    }else{
        done(null, findUser);
    }
})

export default passport.use(new Strategy( async (username, password, done) => {
    // console.log(`username: ${username}, \n password: ${password}`);
    try {
        // const findUser = mockUser.find((user) => user.username === username);
        const findUser = await User.findOne({username});
        console.log(findUser);
        if(!findUser || !comparePassword(password, findUser.password)){
            throw new Error('BAD CREDENTIALS');
        }else{
            done(null, findUser);
        }
    } catch (error) {
        done(error, null);
    }
}));