const express = require("express")
const user_validate_control = require("../controllers/user_validate_email")
const admin_validate_control = require("../controllers/admin_validate_email")


const user_validate_router = express.Router()
const admin_validate_router = express.Router()

user_validate_router.get("/userlogin/validate_email",user_validate_control.validate_email)
admin_validate_router.get("/adminlogin/validate_email",admin_validate_control.validate_email)

module.exports = {
    user_validate_router,
    admin_validate_router
}