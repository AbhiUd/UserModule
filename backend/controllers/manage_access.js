const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {Admin} = require("../utils/roles")

const a_manage_access = async (req,res) => {
    const manage_access = req.body
    const resource_id = req.params.rid
    const obj = req.user

    if(!obj) return res.json({message: "No auth found"})
    if(obj.role != Admin) return res.json({message: "Only admin can access this page"})
    
    try{
        for (var key in manage_access){
            ma = manage_access[key]
            if(ma["policy"]==1){
                const p_id = await prisma.resource_ug_map.findFirst({
                    where : {
                        ug_id: ma["ug_id"],
                        resource_id: parseInt(resource_id),
                        organizationId : obj.organizationId
                    }
                })

                console.log("id",p_id.id)
                const res_map = await prisma.resource_ug_map.update({
                    where: {
                        ug_id: ma["ug_id"],
                        resource_id: parseInt(resource_id),
                        id : parseInt(p_id.id),
                        organizationId : obj.organizationId
                    },
                    data: {
                        read_op: true
                    }
                })
                if(!res_map) return res.status(404).json({message: "Error in updating data of resource_ug_map table"})
            }
            else if(ma["policy"]==2){
                const p_id = await prisma.resource_ug_map.findFirst({
                    where : {
                        ug_id: ma["ug_id"],
                        resource_id: parseInt(resource_id),
                        organizationId : obj.organizationId
                    }
                })
                const res_map = await prisma.resource_ug_map.update({
                    where: {
                        ug_id: ma["ug_id"],
                        resource_id: parseInt(resource_id),
                        id : parseInt(p_id.id),
                        organizationId : obj.organizationId
                    },
                    data: {
                        edit_op: true
                    }
                })
                if(!res_map) return res.status(404).json({message: "Error in updating data of resource_ug_map table"})
            }
            else if(ma["policy"]==0){
                const p_id = await prisma.resource_ug_map.findFirst({
                    where : {
                        ug_id: ma["ug_id"],
                        resource_id: parseInt(resource_id),
                        organizationId : obj.organizationId
                    }
                })
                const res_map = await prisma.resource_ug_map.update({
                    where: {
                        ug_id: ma["ug_id"],
                        resource_id: parseInt(resource_id),
                        id : parseInt(p_id.id),
                        organizationId : obj.organizationId
                    },
                    data: {
                        read_op: false,
                        edit_op: false
                    }
                })
                if(!res_map) return res.status(404).json({message: "Error in updating data of resource_ug_map table"})
            }
        }
        return res.status(200).json({message: "Successfully changed the policies"})

    }
    catch(error){
        console.log(error)
        return res.status(400).json({message: "Internal Server Error"})
    }

}

module.exports = {
    a_manage_access
}