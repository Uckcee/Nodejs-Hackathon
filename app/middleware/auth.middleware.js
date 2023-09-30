const jwt = require('jsonwebtoken')
checkLoginToken = (req, res, next) => {
    const auth = req.headers.authorization
    if(!auth){
        return res.send({
          status: false,
          message: "Access Denied, No token provided",
        });
    }

    const split = auth.split(' ')
    console.log(auth)

    const token = split[1]

    jwt.verify(token, '098765', (err, decoded) => {
        if (!decoded || err )  {
            return res.send({
              status: false,
              message: "Access Denied, Token expired",
            });
            
        }
        console.log(decoded)
        const userId = decoded.id
        req.userId = userId
        next()
    })
    
}

const middleware = {
    checkLoginToken
}

module.exports = middleware