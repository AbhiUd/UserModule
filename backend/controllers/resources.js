const { PrismaClient } = require("@prisma/client");
const { User ,Admin, SuperAdmin } = require("../utils/roles");
const prisma = new PrismaClient();


const u_create_resource = async (req,res,next) => {
    const obj = req.user
    const {name,data} = req.body

    if(!obj) return res.json({message: "No auth found"})
    if(obj.role != User) return res.json({message: "Only User can access this page"})
    
    
    try{
        const user = await prisma.userLogin.findUnique({
            where:{
                id: obj.id
            }
        })
        if(!user) return res.status(404).json({message: "User not found"})
        
        const user_group = await prisma.userGroup.findUnique({
            where:{
                id: user.usergroupid
            }
        })
        if(!user_group) return res.status(404).json({message: "User Group not found"})

        if(user_group.create_op == false) return res.status(400).json({message: "You are not allowed to create resource"})


        if(!name){
            return res.status(400).json({message: "Fill the resource name field"})
        }

        const resource = await prisma.resourceList.create({
            data:{
                name: name,
                author_name: obj.fname + " " + obj.lname,
                UserId: obj.id,
                organizationId: obj.organizationId,
                data : data
            }
        })

        if(!resource){
            return res.status(400).json({message: "Resource not created!!"})
        }
        req.rid = resource.id
        next()
        // return res.status(200).json({message: "Resource created successfully"})

    }
    catch(error){
        console.log(error)
        return res.status(400).json({message: "Internal Server Error"})
    }
}




const create_resource = async (req,res ,next) => {
    const {name,data} = req.body

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
                organizationId: obj.organizationId,
                data : data
            }
        })

        if(!resource){
            return res.status(400).json({message: "Resource not created!!"})
        }
        req.rid = resource.id
        next()
        // return res.status(200).json({message: "Resource created successfully"})

    }
    catch(error){
        console.log(error)
        return res.status(400).json({message: "Internal Server Error"})
    }
}

const sa_create_resource = async (req,res,next) => {
    const {name,data} = req.body
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
                organizationId: organizationId,
                data : data
            }
        })
        if(!resource){
            return res.status(400).json({message: "Resource not created!!"})
        }
        req.rid = resource.id
        req.user.organizationId = organizationId
        next()
        return res.status(200).json({message: "Resource created successfully"})
    }
    catch(error){
        console.log(error)
        return res.status(400).json({message: "Internal Server Error"})
    }
}

const get_all_resources = async (req,res) => {
    const obj = req.user
    console.log("auth",obj)
    if(!obj) return res.json({message: "No auth found"})

    var organizationId
    if(obj.role == SuperAdmin){
        organizationId = req.params.organizationId
    }
    else if (obj.role = Admin){
        organizationId = obj.organizationId
    }
    else return res.status(400).json({message: "Users not allowed"})


    try{
        const resources = await prisma.resourceList.findMany({
            where: {
                organizationId: parseInt(organizationId)
            }
        })

        if(!resources.length){
            return res.status(404).json({message:"No Resources found"})
        }

        console.log(`Resources :\n ${resources.rid}`)
        
        return res.status(200).json({resources})

    }
    catch(error){
        console.log(error)
        return res.status(400).json({message: "Internal Server Error"})
    }
}


const u_get_all_resources = async (req,res) => {
    const obj = req.user

    if(!obj) return res.json({message: "No auth found"})
    if(obj.role != User) return res.json({message: "Only User can access this page"})
    
    try{
        const user = await prisma.userLogin.findUnique({
            where:{
                id: obj.id
            }
        })

        if(!user) return res.status(404).json({message: "User not found"})
        
        const user_group = await prisma.userGroup.findUnique({
            where:{
                id: user.usergroupid
            }
        })

        if(!user_group) return res.status(404).json({message: "User Group not found"})

        const resources = await prisma.resource_ug_map.findMany({
            where: {
                organizationId: obj.organizationId,
                ug_id: user_group.id,
            }
        })
        if(!resources.length){
            return res.status(404).json({message:"No Resources found"})
        }
        var readable_resources = []
        for (var key in resources){
            var resource = resources[key]

            if(resource["read_op"] == true){
                readable_resources.push(resource)
            }
            else if(resource["edit_op"] == true){
                readable_resources.push(resource)
            }
        }
        // console.log(`Resources :\n ${resources.rid}`)
        
        return res.status(200).json({readable_resources})
    }
    catch(error){
        console.log(error)
        return res.status(400).json({message: "Internal Server Error"})
    }
}


module.exports = {
    create_resource,
    sa_create_resource,
    u_create_resource,
    get_all_resources,
    u_get_all_resources
}