const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()
var cookie = require('cookie');


const create_organization = async( req, res ) => {
    const {name} = req.body

    const obj = JSON.parse(req.user)

    if(!obj) return res.json({message: "No auth found"})
    
        if(obj.role != Admin) {
            console.log("You are not an Super Admin")
            return res.json({message: "Only admin can access this page"})
        }

    try {
        
        if(!name){
            return res.status(400).json({message:"Fill the organization name"})
        }

        const create_organization = new prisma.organizationList.create({
            data: {
                name,
                superadminId: obj.id
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
    const obj = JSON.parse(req.user)

    if(!obj) return res.json({message: "No auth found"})
    
    if(obj.role != Admin) {
        console.log("You are not an Super Admin")
        return res.json({message: "Only admin can access this page"})
    }
        

    try {
        
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
