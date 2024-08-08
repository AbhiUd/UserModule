const jwt = require("jsonwebtoken")
const {secret} = require("../config/jwtConfig")
const cookieParser = require('cookie-parser');
const express = require("express")
const app = express()
var cookie = require('cookie');
const { compareSync } = require("bcryptjs");


app.use(cookieParser)

const auth_middleware = async(req,res,next) => {
    var token = cookie.parse(req.headers.cookie || '');
    const d_token = token["uid"]
    if(!token) {
        return res.status(404).json({message : "Access denied , no token provided"})
    }

    try {
        console.log("token",d_token)
        const decoded = jwt.verify(d_token, secret)
        req.user = decoded
        console.log("decoded",decoded)
        next()
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    auth_middleware
}