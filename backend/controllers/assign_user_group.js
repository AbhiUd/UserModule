const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()
const { Admin } = require("../utils/roles");



const assign_user_group = async (req,res) => {
    const ug_id = req.params.usergroupId
    const user_id = req.params.user_id

    if(!obj) return res.json({message: "No auth found"})
    if(obj.role != Admin) return res.json({message: "Only admin can access this page"})

    try{
        const user = prisma.userLogin.update({
            where:{
                id : user_id
            },
            data:{
                usergroupid : ug_id
            }
        })

        if(!user) return res.status(400).json({message: "Error in updating the User Group Id"})
        
        return res.status(200).json({message: "Successfully Updated user group id"})
    }
    catch(error){
        console.log(error)
        return res.status(500).json({message : "Internal Server error"})
    }
}

module.exports ={
    assign_user_group
}