const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const {generate_otp } = require("./email_otp_verify")

const SignUp = async (req,res) => {
    const {fname,lname,email,password,phoneno} = req.body

    if (!fname && !lname && !phoneno && !email && !password) {
        return res.status(400).json({ message: "All fields must be provided." });
    }
    
    try{
        const Inviteexist = await prisma.invite.findUnique({
            where: {
                email: email,
              }
        })
        if(!Inviteexist){
          return res.status(404).json({message: "Invite Invalid"})
        }
        
        const hashedPassword = bcrypt.hashSync(password)

        const user = await prisma.userLogin.create({
            data: [
                {
                    fname: fname,
                    lname:lname,
                    password: hashedPassword,
                    email: email,
                    mobile_number: phoneno
                }
            ]
        })
        
        if(!user){
            return res.status(400).json("User not created")
        }

        if(!generate_otp){
            await prisma.userLogin.delete({
                where : {
                    id : user.id
                }
            })

            return res.status(404).json({message : "Otp verification unsuccessful"})
        }

        return res.status(201).json({ message: "User created successfully", user });

    }
    catch(error){
        return res.status(500).json({ message: "Internal server error", error });
    }
}

module.exports = {
    SignUp
}
