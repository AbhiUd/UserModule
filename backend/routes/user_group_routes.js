const express = require("express")
const user_group_control = require("../controllers/user_groups")

const user_group_router = express.Router()

user_group_router.post("/organizations/:organizationId/create_user_group",user_group_control.create_user_group)
user_group_router.get("/organizations/:organizationId/getAllUserGroups",user_group_control.getAllUserGroups)

module.exports = user_group_router