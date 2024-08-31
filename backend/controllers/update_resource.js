const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()

const updateResource = async(req , res) => {
    const {resourceId} = req.params
    const obj = req.user
    const {update_data} = req.body

    try {
        console.log("r_id",resourceId)
        // const resource = await prisma.resourceList.findUnique({
        //     where : {
        //         id : parseInt(resourceId)
        //     }
        // })
        
        const u_id = await prisma.userLogin.findUnique({
            where : {
                id : parseInt(obj.id)
            }
        })


        const check_edit = await prisma.resource_ug_map.findMany({
            where : {
                resource_id : parseInt(resourceId),
                ug_id : u_id.usergroupid,
                edit_op : true
            }
        })
        console.log(check_edit)
        if(check_edit.length == 0){
            return res.status(400).json({message : "The given resource does not have editable rights"})
        }

        // const editor_name = `${obj.fname}`+" "+`${obj.lname}`
        const edit_data = await prisma.resourceList.update({
            where : {
                id : parseInt(resourceId)
            },

            data : {
                data : update_data
            }
        })

        await prisma.resourceHistory.create({
            data : {
                resource_id : parseInt(resourceId),
                editedByUser : parseInt(u_id.id),
                editedAt : new Date(),
                changes : update_data,
                editedByAdmin : null
            }
        })

        return res.status(200).json({ message: "Resource updated successfully", edit_data });

    } catch (error) {
        console.log(error)
        return res.status(400).json({message: "Internal Server Error"})

    }
}

const a_update_resource = async(req,res) => {
    const {resourceId} = req.params
    const obj = req.user
    const {update_data} = req.body

    try {
        
        const resource = await prisma.resourceList.findUnique({
            where : {
                id : parseInt(resourceId)
            }
        })
        
        const a_id = await prisma.adminLogin.findUnique({
            where : {
                id : parseInt(obj.id)
            }
        })

        // const editor_name = `${obj.fname}`+" "+`${obj.lname}`
        const edit_data = await prisma.resourceList.update({
            where : {
                id : parseInt(resourceId)
            },

            data : {
                data : update_data
            }
        })

        await prisma.resourceHistory.create({
            data : {
                resource_id : resourceId,
                editedByAdmin : parseInt(a_id.id),
                editedAt : new Date(),
                changes : update_data,
                editedByUser : null
            }
        })

        return res.status(200).json({ message: "Resource updated successfully", edit_data });

    } catch (error) {
        console.log(error)
        return res.status(400).json({message: "Internal Server Error"})

    }
}

module.exports = {
    updateResource,
    a_update_resource
}