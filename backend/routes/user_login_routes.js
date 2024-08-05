const express = require("express")
const user_login_control = require("../controllers/auth")

const user_login_router = express.Router()

user_login_router.post("/user_signUp" , user_login_control.SignUp)
user_login_router.get("/user_signIn", user_login_control.SignIn)

module.exports = user_login_router