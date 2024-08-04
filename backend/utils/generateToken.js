const jwt = require("jsonwebtoken")
const {secret , expiresIn} = require("../config/jwtConfig")

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

    return jwt.sign(payload , secret , {expiresIn})
}

module.exports = generate_token