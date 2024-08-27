const express = require("express")
const admin_verify_control = require("../controllers/email_otp_verify")

const admin_verify_router = express.Router()

admin_verify_router.get("/admin_signUp/:email/admin_verify",admin_verify_control.verify_otp)

module.exports = admin_verify_router