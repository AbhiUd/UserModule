const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcryptjs = require("bcryptjs");

const forgot_password = async (req, res) => {
    const { new_password, confirm_password } = req.body
    // const { email } = req.params
    const obj = req.user

    try {
        if (new_password != confirm_password) {
            return res.status(400).json({ message: "Passwords do not match" })
        }

        const hash_password = bcryptjs.hashSync(confirm_password);

        const update_password = await prisma.adminLogin.update({
            where: { email: obj.email },
            data: { password: hash_password }
        })

        if (update_password) {
            return res.status(200).json({ message: "Password updated successfully" })
        }

        return res.status(500).json({ message: "Failed to update password" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
}

module.exports = { 
    forgot_password 
}
