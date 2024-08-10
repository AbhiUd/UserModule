const express = require("express")
const organization_controller = require("../controllers/organization")
const {auth_middleware} = require("../middleware/auth")
const organization_router = express.Router()

organization_router.post("/sa_signin/:token/create_organization",auth_middleware , organization_controller.create_organization)
organization_router.get("/sa_signin/:token/organizations",auth_middleware,organization_controller.getAllOrganizations)

module.exports = organization_router