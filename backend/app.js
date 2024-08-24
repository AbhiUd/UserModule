const express = require("express");
const { client } = require("./config/db");

const app = express();

const invite_router = require("./routes/a2uinvite_routes");
// console.log(invite_router)
const sa_router = require("./routes/super_admin_login_routes");
const a_router = require("./routes/admin_login_routes");
const u_router = require("./routes/user_login_routes");
const s2a_invite_router = require("./routes/s2ainvite");
const organization_router = require("./routes/organization");
const user_grp_router = require("./routes/user_group_routes");
const validate_email_router = require("./routes/validate_email");
const forgot_password_router = require("./routes/forgot_password");
const admin_verify_email = require("./routes/admin_sigin_verify")
const user_verify_email = require("./routes/user_signin_verify")
const assign_user_grp = require("./routes/user_grp_assign_routes")
const create_res = require("./routes/resource_routes")

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/main", invite_router);
app.use("/main", sa_router);
app.use("/main", a_router);
app.use("/main", u_router);
app.use("/main", s2a_invite_router);
app.use("/main", user_grp_router);
app.use("/main", organization_router);
app.use("/main", validate_email_router.admin_validate_router);
app.use("/main", validate_email_router.user_validate_router);
app.use("/main", forgot_password_router.admin_forgot_router);
app.use("/main", forgot_password_router.user_forgot_router);
app.use("/main",admin_verify_email)
app.use("/main",user_verify_email)
app.use("/main",assign_user_grp)
app.use("/main",create_res.a_resource_router)
app.use("/main",create_res.sa_resource_router)

// app.get("/getcar", (req, res) => {
//     res.send(req.cookies);
//     console.log(req.cookies)
//  });

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

client.connect().then(() => {
    console.log("Database connected successfully");
}).catch((err) => {
    console.log(err);
});
