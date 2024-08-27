const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { Admin } = require("../utils/roles");

const deactivate = async (req,res) => {
    const {id} = req.body
    const obj = req.user

    if(!obj) return res.json({message: "No auth found"})
    if(obj.role != Admin) return res.json({message: "Only admin can access this page"})

    try{
        const user = await prisma.userLogin.update({
            where:{
                id: id,
                organizationId: obj.organizationId
            },
            data:{
                status: false
            }
        })

        console.log(user)
        if(!user) return res.status(404).json({message: "User not found"})

        return res.status(200).json({message: "User de-activated successfully"})
    }
    catch(error){
        console.log(error)
        return res.status(400).json({message: "Internal Server Error"})
    }
}

module.exports = {
    deactivate
}