const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()
const { Admin } = require("../utils/roles");

const assign_create_role = async (req,res) => {
    const ug_id = req.params.usergroupid
    const obj= req.user
    const {create_policy} = req.body

    if(!obj) return res.json({message: "No auth found"})
    if(obj.role != Admin) return res.json({message: "Only admin can access this page"})

    try{
        const usergroup = await prisma.userGroup.update({
            where:{
                id : parseInt(ug_id),
                organizationId : obj.organizationId
            },
            data:{
                create_op: create_policy
            }
        })
        console.log("data",usergroup)
        if(!usergroup) return res.status(400).json({message: "Error in updating Create policy"})

        return res.status(200).json({message:"Sucessully updated create role"})
    }
    catch(error){
        console.log(error)
        return res.status(500).json({message : "Internal Server error"})
    }
}
module.exports = {
    assign_create_role
}