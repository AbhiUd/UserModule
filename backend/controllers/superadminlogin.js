const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient
const bcrypt = require("bcryptjs");
const {SA_generate_token} = require("../utils/generateToken");


const SuperAdminSignUp = async (req, res) => {
    const { fname, lname, email, password, phonenumber } = req.body;
  
    if (!fname && !lname && !phonenumber && !email && !password) {
      return res.status(400).json({ message: "All fields must be provided." });
    }
  
    try {

      const hashedPassword = bcrypt.hashSync(password);

      const Superadmin = await prisma.superAdminLogin.create({
        data: 
          {
            fname: fname,
            lname: lname,
            password: hashedPassword,
            email: email,
            phonenumber: phonenumber,
          },
      });
  
      if (!Superadmin) {
        return res.status(400).json("Super admin not created");
      }
      
      return res.status(201).json({ message: "Super admin created successfully", Superadmin });
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: "Internal server error", error });
    }
}

const SuperAdminLogin = async (req,res) => {
    const { email, password } = req.body;
  
    if (!email && !password) {
      return res.status(400).json({ message: "All fields must be provided." });
    }

    try{
        const Superadmin = await prisma.superAdminLogin.findUnique({
            where: {
              email: email,
            }
          });
        if (!Superadmin) {
        return res.status(404).json({ message: "Email Id Incorrect" });
        }
        const Ispassword = bcrypt.compareSync(password, Superadmin.password);
  
        if (!Ispassword) {
            return res.status(404).json({ message: "Password Incorrect" });
        }
        token = SA_generate_token(Superadmin);
        
        if (!token) {
            return res.status(400).json({ message: "Token not generated" });
        }
      
        res.setHeader("uid",token);
        console.log(token)
        return res.status(200).json({ message: "Token generated successfully" });
    }
    catch(error){
        console.log(error)
        return res.status(500).json({ message: "Internal server error", error });
    }
}

module.exports = {
  SuperAdminSignUp,
  SuperAdminLogin
}
