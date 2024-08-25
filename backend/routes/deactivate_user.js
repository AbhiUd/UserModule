const express = require("express")
const deactivate_user_controller = require("../controllers/deactivate_user")
const {auth_middleware} = require("../middleware/auth")

const deactivate_user_router = express.Router()

deactivate_user_router.put("/admin_signIn/:token/getAllUser/deactivate_user",auth_middleware,deactivate_user_controller.deactivate)

module.exports = {
    deactivate_user_router
}