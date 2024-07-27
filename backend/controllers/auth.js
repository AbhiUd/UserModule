const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const SignUp = async (req,res) => {
    const {fname,lname,email,password,phoneno} = req.body

    if (!fname && !lname && !phoneno && !email && !password) {
        return res.status(400).json({ message: "All fields must be provided." });
    }
    
    try{
        const Inviteexist = await prisma.Invite.findUnique({
            where: {
                email: email,
              }
        })
        if(!Inviteexist){
          return res.status(404).json({message: "Invite Invalid"})
        }
        
        hashedPassword = bcrypt.hashSync(password)
        
        

    }
    catch(error){
        
    }
}
