const express = require("express")
const manage_access_controller = require("../controllers/manage_access")
const create_role_controller = require("../controllers/assign_create_role")

const {auth_middleware} = require("../middleware/auth")
const a_manage_router = express.Router()

a_manage_router.put("/admin_signIn/:token/getAllUserGroups/:usergroupid/manage_access_policy",auth_middleware,manage_access_controller.a_manage_access)
a_manage_router.put("/admin_signIn/:token/getAllUserGroups/:usergroupid/manage_access_policy",auth_middleware,create_role_controller.assign_create_role)

module.exports = {
    a_manage_router
}