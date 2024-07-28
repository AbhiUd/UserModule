const jwt = require("jsonwebtoken")
const {secret} = require("../config/jwtConfig")


const auth_middleware = async(req,res) => {
    const token = req.headers['authorization']

    if(!token) {
        return res.status(404).json({message : "Access denied , no token provided"})
    }

    try {
        const decoded = jwt.verify(token , secret)
        req.user = decoded

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    auth_middleware
}