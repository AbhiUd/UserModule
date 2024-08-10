const express = require("express")
const user_verify_control = require("../controllers/email_otp_verify")

const user_verify_router = express.Router()

user_verify_router.get("/user_signIn/:email/:roleId/user_verify",user_verify_control.verify_otp)

module.exports = user_verify_router