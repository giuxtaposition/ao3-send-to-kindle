import cors from "cors"
import express, { Express, Request, Response } from "express"
import emailerRouter from "./controllers/emailer"
import { PORT } from "./utils/config"

const app: Express = express()

const allowedOrigins = [
    `http://localhost:${PORT}`,
    "https://archiveofourown.org/",
]

const options: cors.CorsOptions = {
    origin: allowedOrigins,
}

app.use(cors(options))

app.use(express.json())
app.use("/emailer", emailerRouter)

app.get("/", (req: Request, res: Response) => {
    res.send("AO3 Send to kindle")
})

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`)
})
