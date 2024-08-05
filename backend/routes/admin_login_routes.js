const express = require("express")
const admin_login_control = require("../controllers/adminlogin")

const admin_login_router = express.Router()

admin_login_router.post("/admin_signUp" , admin_login_control.AdminSignUp)
admin_login_router.get("/admin_signIn" , admin_login_control.AdminSignIn)

module.exports = admin_login_router