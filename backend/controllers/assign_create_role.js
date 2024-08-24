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
                usergroupid : parseInt(ug_id)
            },
            data:{
                create_op: create_policy
            }
        })
        if(!usergroup) return res.status(400).json({message: "Error in updating Create policy"})
    }
    catch(error){
        console.log(error)
        return res.status(500).json({message : "Internal Server error"})
    }
}
module.exports = {
    assign_create_role
}