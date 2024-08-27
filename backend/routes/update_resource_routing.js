const express = require("express");
const update_control = require("../controllers/update_resource");
const {auth_middleware} = require("../middleware/auth")
const update_router = express.Router(); 

update_router.put("/user_signUp/:userId/:ug_id/getAllResources/:resource_id/update_resource",auth_middleware , update_control.updateResource)

module.exports = update_router