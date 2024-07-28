const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()
const otp_generator = require("otp-generator")

const nodemailer = require("nodemailer")
require("dotenv").config()

const transporter = nodemailer.createTransport({
    service : 'gmail',
    auth : {
        user : process.env.SEND_EMAILID,
        pass : process.env.SEND_EMAILID_PASSWORD,
    }
})

const generate_otp = async(req,res) => {
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


        const otp = otp_generator.generate(6 , {upperCaseAlphabets : false , specialChars : false})

        const expiresAt = new Date(Date.now()+1*60*1000)

        const save_otp = await prisma.otp_schema.create({
            data : {
                otp,
                expiresAt
            }
        })
        
        const mailOptions = {
            from: process.env.SEND_EMAILID,
            to: inviteEmail.email,
            subject: "Verification Code",
            html: `<h1>This is the verification code</h1><p>Verification code is : ${otp}`
        };

        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: "Failed to send email" });
            } else {
                console.log(`Email Sent`);
                return res.status(200).json({ message: "Invite sent successfully" });
            }
        });

        if(save_otp){
            verify_otp(save_otp , res)
        }
        
    }
    catch(err){
        console.log(err)
    }
}


async function verify_otp(otp , res){
    try {
        const stored_otp = await prisma.otp_schema.findFirst({
            where : {
                otp : otp,
                expiresAt : {
                    gt : new Date()
                }
            }
        })

        if (!stored_otp) {
            return res.status(400).json({ message: "Invalid or expired OTP." });
          }
      
          await prisma.otp_schema.delete({
            where: {
              id: stored_otp.id
            }
          });
      
          return res.status(200).json({ message: "OTP verified successfully." });

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    generate_otp
}