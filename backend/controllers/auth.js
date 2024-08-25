const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const { generate_token } = require("../utils/generateToken");
const {User} = require("../utils/roles")

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


const SignUp = async (req, res) => {
  const { fname, lname, email, password, mobile_number} = req.body;

  if (!fname || !lname || !mobile_number || !email || !password) {
    return res.status(400).json({ message: "All fields must be provided." });
  }

  try {
    const Inviteexist = await prisma.adminToUserInvite.findUnique({
      where: {
        email: email,
      },
    });

    if (!Inviteexist) {
      return res.status(404).json({ message: "Invite Invalid" });
    }

    const hashedPassword = bcrypt.hashSync(password);

    const user = await prisma.userLogin.create({
      data: {
        fname: fname,
        lname: lname,
        password: hashedPassword,
        email: email,
        mobile_number: mobile_number,
        organizationId: Inviteexist.organizationId,
        roleId: 3,
        status : true  
        // usergroupid: 2
      },
    });

    if (!user) {
      return res.status(400).json("User not created");
    }

    const otp = otp_generator.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false });

    const expiresAt = new Date(Date.now() + 1 * 60 * 1000);

    const save_otp = await prisma.otp_schema.create({
      data: {
        email,
        otp,
        expiresAt,
      },
    });

    const mailOptions = {
      from: process.env.SEND_EMAILID,
      to: email,
      subject: "Verification Code",
      html: `<h1>This is the verification code</h1><p>Verification code is : ${otp}</p>`,
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

    return res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};


const SignIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email && !password) {
    return res.status(400).json({ message: "All fields must be provided." });
  }

  try {
    const user = await prisma.userLogin.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      return res.status(404).json({ message: "Email Id Incorrect" });
    }

    const Ispassword = bcrypt.compareSync(password, user.password);

    if (!Ispassword) {
      return res.status(404).json({ message: "Password Incorrect" });
    }

    if(!user.status) return res.status(400).json({message: "You are no more a User in this organization"})

    user.role = User
    token = generate_token(user);

    if (!token) {
      return res.status(400).json({ message: "Token not generated" });
    }

    console.log("token generated success")
    console.log(token)
    return res.send(token)
    // return res.status(200).json({ message: "Token generated successfully" });

  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Internal server error", error });
  }
};

module.exports = {
  SignUp,
  SignIn,
};
