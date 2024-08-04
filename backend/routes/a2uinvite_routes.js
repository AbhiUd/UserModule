const express = require("express");
const invite_control = require("../controllers/a2u_invite");
const invite_router = express.Router(); 

invite_router.post("/create_invite", invite_control.create_user_invite);

module.exports = {
    invite_router
};
