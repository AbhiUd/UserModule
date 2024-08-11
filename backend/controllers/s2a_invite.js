const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const {SuperAdmin} = require("../utils/roles")
const nodemailer = require("nodemailer")
const hbs = require('nodemailer-express-handlebars')
const path = require('path')

require("dotenv").config()

const transporter = nodemailer.createTransport({
    service : 'gmail',
    auth : {
        user : process.env.SEND_EMAILID,
        pass : process.env.SEND_EMAILID_PASSWORD,
    }
})

const handlebarOptions = {
    viewEngine: {
        partialsDir: path.resolve('./templates/'),
        defaultLayout: false,
    },
    viewPath: path.resolve('./templates/'),
};

transporter.use('compile', hbs(handlebarOptions))


const create_admin_invite = async (req ,res) => {
    const obj = req.user;
    const organization_Id = parseInt(req.params.organizationId);
    const { email } = req.body;

    if(!obj) return res.json({message: "No auth found"});
    
    if(obj.role != SuperAdmin) return res.json({message: "Restricted only for Super Admins"});

    try {
        if (!email) {
            return res.status(400).json({ message: "Provide an email id or organizationId for invite" });
        }

        const inviteEmail = await prisma.superadminToAdminInvite.create({        
            data: {
                superAdminId: obj.id,
                email: email,
                organizationId: organization_Id
            }
        });
        
        const organization = await prisma.organizationList.findUnique({
            where: {
                id: organization_Id
            }
        });

        const mailOptions = {
            from: process.env.SEND_EMAILID,
            template: "invite_admin",
            to: inviteEmail.email,
            subject: "Invite to join organization as admin",
            context: {
                organization_name: organization.name,
                admin_signup_link: "http://localhost:5000/main/admin_signUp"
            }
        };

        transporter.sendMail(mailOptions, function (err) {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: "Failed to send email" });
            } else {
                console.log(`Email Sent`);
                return res.status(200).json({ message: "Invite sent successfully", inviteEmail });
            }
        });

    } catch(error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}


module.exports = {create_admin_invite}