const express = require("express")
const resource_controller = require("../controllers/resources")
const {auth_middleware} = require("../middleware/auth")
const {resource_map} = require("../middleware/map_res2ug")
const a_resource_router = express.Router()
const sa_resource_router = express.Router()
const u_resource_router = express.Router()

a_resource_router.post("/admin_signIn/:token/create_resource",auth_middleware,resource_controller.create_resource , resource_map)
sa_resource_router.post("/sa_signin/:token/organizations/organizationId/create_resource",auth_middleware,resource_controller.create_resource , resource_map)
u_resource_router.post("/user_signIn/:token/create_resource",auth_middleware,resource_controller.u_create_resource,resource_map)

a_resource_router.get("/admin_signIn/:token/get_all_resources",auth_middleware,resource_controller.get_all_resources)
sa_resource_router.get("/sa_signin/:token/organizations/organizationId/get_all_resources",resource_controller.get_all_resources)
u_resource_router.get("/user_signIn/:token/get_all_resources",auth_middleware,resource_controller.u_get_all_resources)

module.exports = {
    a_resource_router,
    sa_resource_router,
    u_resource_router
}