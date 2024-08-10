const express =  require("express")
const s2a_invite_control = require("../controllers/s2a_invite")
const {auth_middleware} = require("../middleware/auth")

const s2a_invite_router = express.Router()

s2a_invite_router.post("/sa_signin/:token/organizations/:organizationId/create_invite" ,auth_middleware, s2a_invite_control.create_admin_invite)

module.exports = s2a_invite_router