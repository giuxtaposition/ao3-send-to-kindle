import { Response, Router } from "express"
import fs from "fs"
import { TypedRequestBody } from "../interfaces/TypedRequestBody"
import { aDownloader } from "../services/downloader"
import { anEmailer } from "../services/emailer"
import { aParser } from "../services/parser"

const emailerRouter = Router()

const parser = aParser()
const downloader = aDownloader(parser)
const emailer = anEmailer()

emailerRouter.post(
    "/",
    async (
        req: TypedRequestBody<{ workUrl: string; emailTo: string }>,
        res: Response
    ) => {
        const body = req.body

        if (!body?.workUrl || !body?.emailTo) {
            res.status(400).send("Missing parameters")
            return
        }

        const { workUrl, emailTo } = body

        try {
            const path = await downloader.download(workUrl)

            const email = await emailer.send(
                emailTo,
                "AO3 Send to kindle",
                "This email has been sent by AO3 send to kindle extension",
                [{ path }]
            )

            res.status(200).send("Email sent")

            fs.unlinkSync(path)
        } catch (e) {
            console.error(e)
            res.status(500).send(e)
        }
    }
)

export default emailerRouter
