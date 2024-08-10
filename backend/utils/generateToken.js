const jwt = require("jsonwebtoken")
const {secret , expiresIn , reset_secret} = require("../config/jwtConfig")
const {SuperAdmin} = require("../utils/roles")

const generate_token = (user) => {
    const payload = {
        id : user.id,
        fname : user.fname,
        lname : user.lname,
        email : user.email,
        mobile_number : user.mobile_number,
        organizationId : user.organizationId,
        role : user.role
    }

    return jwt.sign(JSON.stringify(payload) , secret )
}

const SA_generate_token = (user) => {
    const payload = {
        id : user.id,
        fname : user.fname,
        lname : user.lname,
        email : user.email,
        mobile_number : user.mobile_number,
        role : SuperAdmin
    }
    return jwt.sign(JSON.stringify(payload) , secret )
}

const reset_token = (user) => {
    const payload = {
        email : user.email
    }

    return jwt.sign(JSON.stringify(payload),reset_secret)
}
module.exports = {
    generate_token,
    SA_generate_token,
    reset_token
}