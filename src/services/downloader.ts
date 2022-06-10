import axios from "axios"
import fs from "fs"
import path from "path"
import IDownloader from "../interfaces/IDownloader"
import IParser from "../interfaces/IParser"

class Downloader implements IDownloader {
    parser: IParser

    constructor(parser: IParser) {
        this.parser = parser
    }

    public async download(workUrl: string): Promise<string> {
        const downloadUrl = await this.parser.fromWorkUrlToDownloadUrl(workUrl)

        const fileName = this.parser.parseFileNameFromDownloadUrl(downloadUrl)

        return await this.downloadFile(downloadUrl, "works", fileName)
    }

    private async downloadFile(url: string, dir: string, fileName: string) {
        const response = await axios.get(url, {
            responseType: "arraybuffer",
        })
        fs.mkdirSync(dir, { recursive: true })
        const filePath = path.join(dir, path.basename(fileName))
        fs.writeFileSync(filePath, response.data)
        return filePath
    }
}

export const aDownloader = (parser: IParser) => {
    return new Downloader(parser)
}
