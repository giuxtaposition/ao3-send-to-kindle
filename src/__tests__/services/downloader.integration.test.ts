import fs from "fs"
import { aDownloader } from "../../services/downloader"
import { aParser } from "../../services/parser"

describe("Downloader", () => {
    let filePath: string

    afterAll(() => {
        fs.existsSync(filePath) && fs.unlinkSync(filePath)
    })

    test("should download", async () => {
        const parser = aParser()
        const downloader = aDownloader(parser)

        filePath = await downloader.download(
            "https://archiveofourown.org/works/123"
        )

        expect(fs.existsSync(filePath)).toBeTruthy()
    })
})
