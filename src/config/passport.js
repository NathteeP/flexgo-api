const passport = require("passport")
const userService = require("../service/userService")
const GoogleStrategy = require("passport-google-oauth20").Strategy

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:8888/user/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const { user, token } = await userService.findOrCreateUser(profile)
                done(null, { user, token })
            } catch (error) {
                done(error, null)
            }
        },
    ),
)

module.exports = passport
