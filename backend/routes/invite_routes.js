const express = require("express");
const invite_control = require("../controllers/invite");
const invite_router = express.Router(); 

invite_router.post("/invite", invite_control.create_invite);

module.exports = invite_router;
