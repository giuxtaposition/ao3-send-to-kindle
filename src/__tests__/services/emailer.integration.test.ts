import fs from "fs"
import { anEmailer } from "../../services/emailer"
import { TEST_EMAIL_RECEIVER } from "../../utils/config"
import { testInCI } from "../helpers/testHelpers"

describe("Emailer", () => {
    const filePath = "works/example.mobi"

    beforeAll(() => {
        fs.mkdirSync("works", { recursive: true })
        fs.writeFileSync(filePath, "someData")
    })

    afterAll(() => {
        fs.existsSync(filePath) && fs.unlinkSync(filePath)
    })

    testInCI("sends email", async () => {
        const emailer = anEmailer()
        const response = await emailer.send(
            TEST_EMAIL_RECEIVER!,
            "subject",
            "body",
            [{ path: filePath }]
        )

        expect(response.accepted.length).toBe(1)
    })
})
