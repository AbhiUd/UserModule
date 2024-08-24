const express = require("express")
const resource_controller = require("../controllers/resources")
const {auth_middleware} = require("../middleware/auth")
const {resource_map} = require("../middleware/map_res2ug")
const a_resource_router = express.Router()
const sa_resource_router = express.Router()

a_resource_router.post("/admin_signIn/:token/create_resource",auth_middleware,resource_controller.create_resource , resource_map)
sa_resource_router.post("/sa_signin/:token/organizations/organizationId/create_resource",auth_middleware,resource_controller.create_resource , resource_map)


module.exports = {
    a_resource_router,
    sa_resource_router
}