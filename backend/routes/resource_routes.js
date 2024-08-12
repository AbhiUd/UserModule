const express = require("express")
const resource_controller = require("../controllers/resources")
const {auth_middleware} = require("../middleware/auth")
const resource_router = express.Router()


resource_router.post("/admin_signIn/:token/create_resource",auth_middleware,resource_controller.create_resource)
resource_router.post("/sa_signin/:token/organizations/organizationId/create_resource",auth_middleware,resource_controller.create_resource)


module.exports = resource_router