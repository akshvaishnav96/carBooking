import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import {configDotenv} from "dotenv"
import dbConnect from "./db/db.js"
import { userRouter } from "./routes/userRoutes.js"
import { adminRouter } from "./routes/adminRoutes.js"


configDotenv();
dbConnect()



const app = express()
const port  = process.env.PORT || 3000
const corsOptions = {
    origin:["http://localhost:5173","http://localhost:5174"],
    methods: "GET,POST,DELETE,PATCH",
    credentials:true
}


app.use(cookieParser())
app.use(cors(corsOptions))
app.use(express.static("public"))
app.use(express.json())
app.use("/api/v1/user",userRouter);
app.use("/api/v1/admin",adminRouter);



app.listen(port,()=>{
    console.log(`app is running on port ${port}`);

})

export{ app}






