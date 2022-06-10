import axios from "axios"
import fs from "fs"
import path from "path"
import { afterAll, beforeEach, describe, expect, test, vi } from "vitest"
import IParser from "../../interfaces/IParser"
import { aDownloader } from "../../services/downloader"

describe("Downloader", () => {
    const parser: IParser = vi.fn() as any

    beforeEach(() => {
        parser.fromWorkUrlToDownloadUrl = vi.fn().mockReturnValue("downloadUrl")
        parser.parseFileNameFromDownloadUrl = vi.fn()
        axios.get = vi.fn().mockReturnValue({ data: "data" })
        fs.mkdirSync = vi.fn() as any
        fs.writeFileSync = vi.fn()
        path.join = vi.fn()
        path.basename = vi.fn()
    })

    afterAll(() => {
        vi.resetAllMocks()
    })

    test("should download", async () => {
        const downloader = aDownloader(parser)
        const workUrl = "https://archiveofourown.org/works/123"

        await downloader.download(workUrl)

        expect(parser.fromWorkUrlToDownloadUrl).toHaveBeenCalledWith(workUrl)
        expect(parser.parseFileNameFromDownloadUrl).toHaveBeenCalledWith(
            "downloadUrl"
        )
        expect(axios.get).toHaveBeenCalledWith("downloadUrl", {
            responseType: "arraybuffer",
        })
        expect(fs.mkdirSync).toHaveBeenCalledWith("works", { recursive: true })
        expect(fs.writeFileSync).toHaveBeenCalled()
    })
})
