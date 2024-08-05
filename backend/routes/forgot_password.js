const express = require("express")
const user_forgot_pass = require("../controllers/user_forgot_password")
const admin_forgot_pass = require("../controllers/admin_forgot_password")

const user_forgot_router = express.Router()
const admin_forgot_router = express.Router()

user_forgot_router.put("/userlogin/validate_email/change_password",user_forgot_pass.forgot_password)
admin_forgot_router.put("/adminlogin/validate_email/change_password",admin_forgot_pass.forgot_password)

module.exports = {
    user_forgot_router,
    admin_forgot_router
}