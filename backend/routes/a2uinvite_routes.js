const express = require("express");
const invite_control = require("../controllers/a2u_invite");
const {auth_middleware} = require("../middleware/auth")
const invite_router = express.Router(); 

invite_router.post("/admin_signIn/:token/create_invite",auth_middleware, invite_control.create_user_invite);

module.exports = invite_router
