const express = require("express")
const assign_control = require("../controllers/assign_user_group")
const {auth_middleware} = require("../middleware/auth")
const user_grp_assign_router = express.Router()

user_grp_assign_router.put("/admin_signIn/:token/getAllUserGroups/:usergroupid/:user_id/assign_user_grp" , auth_middleware , assign_control.assign_user_group)

module.exports = user_grp_assign_router