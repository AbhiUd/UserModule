const { PrismaClient } = require("@prisma/client");
const { Admin, SuperAdmin } = require("../utils/roles");
const prisma = new PrismaClient();

const create_resource = async (req,res) => {
    const {name} = req.body

    const obj = req.user

    if(!obj) return res.json({message: "No auth found"})
    if(obj.role != Admin) return res.json({message: "Only admin can access this page"})

    try{
        if(!name){
            return res.status(400).json({message: "Fill the resource name field"})
        }

        const resource = await prisma.resourceList.create({
            data:{
                name: name,
                author_name: obj.fname + " " + obj.lname,
                AdminId: obj.id,
                organizationId: obj.organizationId
            }
        })

        if(!resource){
            return res.status(400).json({message: "Resource not created!!"})
        }

        return res.status(200).json({message: "Resource created successfully"})

    }
    catch(error){
        console.log(error)
        return res.status(400).json({message: "Internal Server Error"})
    }
}   

const sa_create_resource = async (req,res) => {
    const {name} = req.body
    const organizationId = req.params.organizationId
    const obj = req.user

    if(!obj) return res.json({message: "No auth found"})
    if(obj.role != SuperAdmin) return res.json({message: "Only super admin can access this page"})
    
    try{
        if(!name){
            return res.status(400).json({message: "Fill the resource name field"})
        }
        const resource = await prisma.resourceList.create({
            data:{
                name: name,
                author_name: obj.fname + " " + obj.lname,
                superAdminId: obj.id,
                organizationId: organizationId
            }
        })
        if(!resource){
            return res.status(400).json({message: "Resource not created!!"})
        }
        return res.status(200).json({message: "Resource created successfully"})
    }
    catch(error){
        console.log(error)
        return res.status(400).json({message: "Internal Server Error"})
    }
}

const get_all_resources = async (req,res) => {
    if(obj.role == 1){
        const organizationId = req.params.organizationId
    }
    else{
        const organizationId = req.organizationId
    }

    try{
        
    }
    catch(error){
        console.log(error)
        return res.status(400).json({message: "Internal Server Error"})
    }
}

module.exports = {
    create_resource,
    sa_create_resource,
    get_all_resources
}