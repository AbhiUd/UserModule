const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()

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

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    validate_email
}