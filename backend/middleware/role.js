const jwt = require("jsonwebtoken")

const role_middleware = (roles) => {
    return (res , req ,next) => {
        if(!roles.includes(req.user.role)) {
            return res.status(404).json({message : "Access denied"})
        }
    }
}