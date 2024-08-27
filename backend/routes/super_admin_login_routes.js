const express = require("express")
const super_admin_control = require("../controllers/superadminlogin")

const super_admin_router = express.Router()

super_admin_router.post("/sa_signUp" , super_admin_control.SuperAdminSignUp)
super_admin_router.get("/sa_signIn" , super_admin_control.SuperAdminLogin)

module.exports = super_admin_router