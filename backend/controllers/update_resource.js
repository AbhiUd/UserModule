const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()

const updateResource = async(req , res) => {
    const {resourceId} = req.params
    const {ug_id} = req.params
    const obj = req.user
    const {update_data} = req.body

    try {
        
        const resource = await prisma.resourceList.findUnique({
            where : {
                id : parseInt(resourceId)
            }
        })

        const check_edit = await prisma.resource_ug_map.findUnique({
            where : {
                id : parseInt(resource.id),
                edit_op : true,
                ug_id : ug_id
            }
        })
        
        if(!check_edit){
            return res.status(400).json({message : "The given resource does not have editable rights"})
        }

        const editor_name = `${obj.fname}`+""+`${obj.lname}`
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
                editedBy : parseInt(obj.id),
                editedAt : new Date(),
                chnages : update_data
            }
        })

        return res.status(200).json({ message: "Resource updated successfully", edit_data });

    } catch (error) {
        console.log(error)
        return res.status(400).json({message: "Internal Server Error"})

    }
}

module.exports = {
    updateResource
}