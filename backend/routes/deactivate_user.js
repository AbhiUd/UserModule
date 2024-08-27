const express = require("express")
const deactivate_user_controller = require("../controllers/deactivate_user")
const {auth_middleware} = require("../middleware/auth")

const a_deactivate_user_router = express.Router()
const sa_deactivate_user_router = express.Router()

a_deactivate_user_router.put("/admin_signIn/:token/getAllUser/deactivate_user",auth_middleware,deactivate_user_controller.deactivate)
sa_deactivate_user_router.put("/sa_signIn/:token/organization/:organizationId/getAllUser/deactivate_user",auth_middleware,deactivate_user_controller.deactivate)

module.exports = {
    a_deactivate_user_router,
    sa_deactivate_user_router
}