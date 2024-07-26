const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()

const create_user_group = async (req,res) => {
    const {groupName} = req.body

    try {

        if(!groupName){
            return res.status(400).json({message:"Fill the group name"})
        }

        const user_group = await prisma.userGroup.create({
            data : {
                groupName
            }
        })

        console.log(`User group created :\n${user_group}`)

        return res.status(200).json({user_group})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message : "Internal Server error"})
    }
}



const getAllUserGroups = async (req,res) =>{

    const AdminId = req.params.AdminId
    const SuperAdminId = req.params.SuperAdminId

    try {
        const s_auth_login = await prisma.superAdminLogin.findFirst(SuperAdminId)
        const a_auth_login = await prisma.adminLogin.findFirst(AdminId)

        if(!s_auth_login || a_auth_login){
            return res.status(404).json({status:"Login Failed",message:"ID not found"})
        }

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