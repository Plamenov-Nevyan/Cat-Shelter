const authConstants = require('../config/authConstants')
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    let token = req.cookies[authConstants.cookieName]
    if(token){
        jwt.verify(token, authConstants.secret, (err, decodedToken) => {
            if(err){
                throw new Error(err.message)
            }
            req.user = decodedToken
            res.locals.user = decodedToken
        })
    }
    next()
}