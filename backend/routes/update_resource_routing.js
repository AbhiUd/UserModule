const express = require("express");
const update_control = require("../controllers/update_resource");
const {auth_middleware} = require("../middleware/auth")
const update_router = express.Router(); 
const a_update_router = express.Router()

update_router.put("/user_signIn/:token/getAllResources/:resourceId/update_resource",auth_middleware , update_control.updateResource)
a_update_router.put("/admin_signIn/:token/getAllResources/:resourceId/update_resource",auth_middleware , update_control.a_update_resource)

module.exports = {
    update_router,
    a_update_router
}