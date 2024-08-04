const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient
const bcrypt = require("bcryptjs");
const {SA_generate_token} = require("../utils/generateToken");


const SuperAdminSignUp = async (req, res) => {
    const { fname, lname, email, password, phoneno } = req.body;
  
    if (!fname && !lname && !phoneno && !email && !password) {
      return res.status(400).json({ message: "All fields must be provided." });
    }
  
    try {

      const hashedPassword = bcrypt.hashSync(password);

      const Superadmin = await prisma.superAdminLogin.create({
        data: [
          {
            fname: fname,
            lname: lname,
            password: hashedPassword,
            email: email,
            mobile_number: phoneno,
          },
        ],
      });
  
      if (!Superadmin) {
        return res.status(400).json("Admin not created");
      }
      
      return res.status(201).json({ message: "Admin created successfully", admin });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error", error });
    }
}

const SuperAdminLogin = async (req,res) => {
    const { email, password } = req.body;
  
    if (!email && !password) {
      return res.status(400).json({ message: "All fields must be provided." });
    }

    try{
        const Superadmin = prisma.superAdminLogin.findUnique({
            where: {
              email: email,
            },
          });
        if (!Superadmin) {
        return res.status(404).json({ message: "Email Id Incorrect" });
        }
        const Ispassword = bcrypt.compareSync(password, admin.password);
  
        if (!Ispassword) {
            return res.status(404).json({ message: "Password Incorrect" });
        }
        token = SA_generate_token(Superadmin);
        
        if (!token) {
            return res.status(400).json({ message: "Token not generated" });
        }
      
        res.cookie("uid", token);
        return res.status(200).json({ message: "Token generated successfully" });

    }
    catch(error){
        return res.status(500).json({ message: "Internal server error", error });
    }
}

module.exports = {
    SuperAdminLogin
}
