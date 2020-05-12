import { Strategy, ExtractJwt, StrategyOptions  } from "passport-jwt";
import config from "../config/config";
import User from "../models/user.model";

const opts:StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.JWTSECRET
}

export default new Strategy(opts, async (payload, done)=> {
    try {
        const user = await User.findById(payload.id);
        // console.log(payload);
        
        if (user || user!.role === 'ADMIN_ROLE') {
            return done(null, user);
        }
        return done(null, false)
    } catch (error) {
        console.log(error);
    }
});