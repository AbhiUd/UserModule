const express = require("express")
const user_forgot_pass = require("../controllers/user_forgot_password")
const admin_forgot_pass = require("../controllers/admin_forgot_password")
const {forgot_pass_middlware} = require("../middleware/auth")

const user_forgot_router = express.Router()
const admin_forgot_router = express.Router()

user_forgot_router.put("/user_signIn/reset_password/:token",forgot_pass_middlware,user_forgot_pass.forgot_password)
admin_forgot_router.put("/admin_signIn/reset_password/:token",forgot_pass_middlware,admin_forgot_pass.forgot_password)

module.exports = {
    user_forgot_router,
    admin_forgot_router
}