const passport = require("passport")
const userService = require("../service/userService")
const GoogleStrategy = require("passport-google-oauth20").Strategy

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const { emails, id, displayName } = profile
                const email = emails[0].value
                const googleId = id
                const fullName = displayName

                const user = await userService.findOrCreateUserWithGoogle(email, googleId, fullName)
                done(null, { user })
            } catch (error) {
                done(error, null)
            }
        },
    ),
)

module.exports = passport
