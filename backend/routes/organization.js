const express = require("express")
const organization_controller = require("../controllers/organization")

const organization_router = express.Router()

organization_router.post("/superadminlogin/:superadminId/create_organization",organization_controller.create_organization)
organization_router.get("/superadminlogin/:superadminId/organizations",organization_controller.getAllOrganizations)

module.exports = organization_router