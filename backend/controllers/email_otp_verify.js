const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()


const verify_otp = async (req , res) => {

    const {input_otp} = req.body
    const {email} = req.params

    try {
        const stored_otp = await prisma.otp_schema.findFirst({
            where : {
                email : email ,
            }
        })
        console.log("expiry",stored_otp.expiresAt)
        console.log(`Stored otp : ${stored_otp}`)

        if (!stored_otp || stored_otp.expiresAt < new Date()) {
            return res.status(400).json({ message: "Expired OTP.(Go back to signup page)" });
        }
        console.log(input_otp)

        if(stored_otp.otp != input_otp){
            return res.status(400).json({message: "Incorrect OTP.(Stay on the same page)"})
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
    verify_otp
}