const express =  require("express")
const s2a_invite_control = require("../controllers/s2a_invite")

const s2a_invite_router = express.Router()

s2a_invite_router.post("/organization/:organizationId/create_invite" , s2a_invite_control.create_admin_invite)

module.exports = s2a_invite_router