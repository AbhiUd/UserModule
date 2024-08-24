const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()
const { Admin } = require("../utils/roles");
const { compareSync } = require("bcryptjs");



const assign_user_group = async (req,res) => {
    const ug_id = req.params.usergroupid
    const user_id = req.params.user_id
    const obj= req.user

    if(!obj) return res.json({message: "No auth found"})
    if(obj.role != Admin) return res.json({message: "Only admin can access this page"})

    // console.log(obj)
    try{
        console.log("ug_id",ug_id)
        console.log("user_id",user_id)
        const user = await prisma.userLogin.update({
            where:{
                id : parseInt(user_id)
            },
            data:{
                usergroupid : parseInt(ug_id)
            }
        })

        console.log("update user",user)

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