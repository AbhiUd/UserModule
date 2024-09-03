const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()
const {Admin} = require("../utils/roles")

const create_user_group = async (req,res) => {
    const {groupName} = req.body
    const obj = req.user

    if(!obj) return res.json({message: "No auth found"})
    
    if(obj.role != Admin) return res.json({message: "Only admin can access this page"})

    try {

        if(!groupName){
            return res.status(400).json({message:"Fill the group name"})
        }

        const verify_organization = await prisma.organizationList.findUnique({
            where : {
                id : obj.organizationId
            }
        })

        if(!verify_organization){
            return res.status(404).json({ message: "Organization not found." });
        }

        const user_group = await prisma.userGroup.create({
            data : {
                groupName,
                organizationId : verify_organization.id,
                create_op: false
            }
        })

        console.log(`User group created :\n${user_group}`)

        const resources = await prisma.resourceList.findMany({
            where: {
                organizationId: obj.organizationId,
            }
        })
        if(!resources.length){
            return res.status(200).json({message:"No Resources to map"})
        }

        for (var key in resources){
            
            r_id = resources[key]
            console.log(r_id)
            const res_map = await prisma.resource_ug_map.create({
                data: {
                    resource_id: r_id["id"],
                    ug_id: user_group.id,
                    organizationId: obj.organizationId,
                    read_op: false,
                    edit_op: false
                }
            })
        }

        return res.status(200).json({user_group})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message : "Internal Server error"})
    }
}



const getAllUserGroups = async (req,res) =>{

    const obj = req.user

    if(!obj) return res.json({message: "No auth found"})
    
    if(obj.role != Admin) return res.json({message: "Only admin can access this page"})


    try {
        const user_groups = await prisma.userGroup.findMany()

        if(!user_groups.length()){
            return res.status(404).json({message : "No user groups found"})
        }

        console.log(`User groups :\n${user_groups}`)
        return res.status(200).json({user_groups})
        
    } catch (error) {
        console.log(error)
        return res.status(200).json({message : "Internal Server error"})
    }
}

module.exports = {
    create_user_group,
    getAllUserGroups
}