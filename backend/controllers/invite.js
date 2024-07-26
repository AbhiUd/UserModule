const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const nodemailer = require("nodemailer")
require("dotenv").config()

const transporter = nodemailer.createTransport({
    service : 'gmail',
    auth : {
        user : process.env.SEND_EMAILID,
        pass : process.env.SEND_EMAILID_PASSWORD,
    }
})


const create_invite = async (req, res) => {
    const { email } = req.body;

    try {
        if (!email) {
            return res.status(400).json({ message: "Provide an email id for invite" });
        }

        const inviteEmail = await prisma.invite.create({        
            data : {
                email,
            }
        });

        console.log(`Invite Created :\n ${inviteEmail}`)
        
        const mailOptions = {
            from: process.env.SEND_EMAILID,
            to: inviteEmail.email,
            subject: "Invite to join organization",
            html: '<h1>Welcome</h1><p>This was a test mail</p>'
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

        return res.status(200).json({inviteEmail})

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { create_invite };
