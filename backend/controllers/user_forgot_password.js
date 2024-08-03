const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()
const bcryptjs = require("bcryptjs")


const forgot_password = async(req,res) => {
    const {new_password , confirm_password} = req.body
    const {email} = req.params
    try {
        if(new_password != confirm_password){
            return res.status(400).json({message : "Password does not match"})
        }

        const hash_password = bcryptjs.hashSync(confirm_password)

        const update_password = await prisma.userLogin.update({
            where : {
                email : email
            },
            data : {
                password : hash_password
            }
        })

        if(update_password){
            return res.status(200).json({message : "password updated"})
        }

        return res.status(200).json({message : "forgot password success"})

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    forgot_password
}