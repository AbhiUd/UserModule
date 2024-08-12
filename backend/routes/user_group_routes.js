const express = require("express")
const user_group_control = require("../controllers/user_groups")
const {auth_middleware} = require("../middleware/auth")


const user_group_router = express.Router()

user_group_router.post("/admin_signIn/:token/create_user_group",auth_middleware,user_group_control.create_user_group)
user_group_router.get("/admin_signIn/:token/getAllUserGroups",auth_middleware,user_group_control.getAllUserGroups)

module.exports = user_group_router