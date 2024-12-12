import express from "express"
//import { router} from "./routes/user.Routes.js" 

const app = express()
app.use(express.json({limit: "16kb"}))

import userRouter from './routes/user.Routes.js'
app.use("/api/v1/users", userRouter)


export {app}