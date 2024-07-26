const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()

const create_organization = async( req, res ) => {
    const {name} = req.body

    try {
        
        if(!name){
            return res.status(400).json({message:"Fill the organization name"})
        }

        const create_organization = new prisma.organizationList.create({
            data: {
                name
            }
        })

        console.log(`Organization created:\n ${create_organization}`)
        return res.status(200).json({create_organization})

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" });
    }
}


const getAllOrganizations = async(req,res) => {
    const SuperAdminId = req.params.SuperAdminId

    try {

        const auth_login = await prisma.superAdminLogin.findFirst(SuperAdminId)

        if(!auth_login){
            return res.status(404).json({status:"Login Failed",message:"ID not found"})
        }
        
        const organizations = await prisma.adminLogin.findMany()

        if(!organizations.length()){
            return res.status(404).json({message:"No organizations found"})
        }

        console.log(`Organizations :\n ${organizations}`)

        return res.status(200).json({organizations})

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" });
    }
}


module.exports = {
    create_organization,
    getAllOrganizations
}
