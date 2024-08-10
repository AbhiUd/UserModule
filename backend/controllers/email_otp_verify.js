const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()


const verify_otp = async (req , res) => {

    const {input_otp} = req.body
    const {email} = req.params.email
    const {roleId} = req.params.roleId

    try {
        const stored_otp = await prisma.otp_schema.findFirst({
            where : {
                email : email ,
                expiresAt : {
                    gt : new Date()
                }
            }
        })
        console.log(`Stored otp : ${stored_otp}`)

        if (!stored_otp) {
            // await prisma.otp_schema.delete({
            //     where: {
            //       id: stored_otp.id
            //     }
            // });
            if(roleId == 3){
            await prisma.userLogin.delete({
                where: {
                  email: email,
                },
              });
            }
            else{
              await prisma.adminLogin.delete({
                  where: {
                    email: email,
                  },
                });
              }
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