const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()
const {reset_token} = require("../utils/generateToken");
const nodemailer = require("nodemailer")
require("dotenv").config()

const transporter = nodemailer.createTransport({
    service : 'gmail',
    auth : {
        user : process.env.SEND_EMAILID,
        pass : process.env.SEND_EMAILID_PASSWORD,
    }
})

const validate_email = async(req,res) => {
    const {email} = req.body

    try {
        const check_email = await prisma.adminLogin.findUnique({
            where : {
                email : email
            }
        })

        if(!check_email){
            return res.status(404).json({message : "Email id not found"})
        }

        r_token = reset_token(check_email)
        if (!r_token) {
            return res.status(400).json({ message: "Token not generated" });
        }
      
        
        console.log(r_token)

        const mailOptions = {
            from: process.env.SEND_EMAILID,
            to: check_email.email,
            subject: "Reset Password",
            html: '<h1>Click on </h1><a href = "http://localhost:5000/main/admin_signIn/reset_password/'+r_token+'">Reset password</a>'
        };

        transporter.sendMail(mailOptions, function (err) {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: "Failed to send email" });
            } else {
                console.log(`Email Sent`);
                return res.status(200).json({ message: "Invite sent successfully" });
            }
        });
        return res.send(r_token)
        // return res.status(200).json({message : "email validation success"})
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    validate_email
}