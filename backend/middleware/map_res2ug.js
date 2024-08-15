const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {User} = require("../utils/roles")

const resource_map = async (req,res) => {
    const rid = req.rid
    const obj = req.user

    try{
        const UserGroups = await prisma.userGroup.findMany({
            where: {
                organizationId : obj.organizationId
            }
        })
        if(!UserGroups) return res.status(400).json({message: "Error in fetching all User Groups"})

        
        for (key in  UserGroups){
            const res_map = await prisma.resource_ug_map.create({
                data: {
                    resource_id: rid,
                    ug_id: key.id,
                    organizationId: obj.organizationId,
                    read_op: false,
                    edit_op: false
                }
            })
            if(!res_map) return res.status(400).json({message: "Error in inserting value to table"})
        }

        if(obj.role == User){
            const user = await prisma.userLogin.findUnique({
                where:{
                    id: obj.id
                }
            })
            if(!user) return res.status(404).json({message: "User not found"})

            const edit_role_user = await prisma.resource_ug_map.update({
                where: {
                    ug_id: user.usergroupid,
                    resource_id: rid
                },
                data:{
                    edit_op: true
                }
            })
            console.log("Edit access given to User group")
        }
        
        return res.status(200).json({message: "Successfully inserted values"})

    }
    catch(error){
        console.log(error)
        return res.status(400).json({message: "Internal Server Error"})
    }
}

module.exports =  resource_map
