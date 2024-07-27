const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const SignUp = async (req,res) => {
    const {fname,lname,email,password,phoneno} = req.body


}
