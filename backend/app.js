const express = require("express")
const {client} = require("./config/db")

const app = express()

// const invite_router = require("./routes/invite_routes")

app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); 


// app.use("/main",invite_router)

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

client.connect().then(()=>{
    console.log("Database connected successfully")
}).catch((err)=>{
    console.log(err)
})

