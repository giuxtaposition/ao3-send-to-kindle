import axios, { AxiosInstance } from "axios"
import { wrapper } from "axios-cookiejar-support"
import { load } from "cheerio"
import { CookieJar } from "tough-cookie"
import { InvalidUrlError } from "../errors/InvalidUrlError"
import IParser from "../interfaces/IParser"

class Parser implements IParser {
    AO3_BASE_URL = "https://archiveofourown.org"
    WORK_BASE_URL = this.AO3_BASE_URL + "/works"
    SHOW_ADULT_WORK_URL = "?view_adult=true"

    private jar: CookieJar
    private client: AxiosInstance

    constructor() {
        this.jar = new CookieJar()
        this.client = wrapper(axios.create({ jar: this.jar }))
    }

    public async fromWorkUrlToDownloadUrl(url: string): Promise<string> {
        if (!this.isAo3Url(url)) {
            throw new InvalidUrlError(url)
        }

        const html = await this.getHtmlFromUrl(url + this.SHOW_ADULT_WORK_URL)
        const $ = load(html)
        const downloadButton = $(".download")

        const downloadUrl = $(downloadButton)
            .find('a:contains("MOBI")')
            .attr("href")

        return this.AO3_BASE_URL + downloadUrl
    }

    public parseFileNameFromDownloadUrl(downloadUrl: string) {
        const fileName = decodeURI(downloadUrl).match(
            /(?<=https:\/\/archiveofourown\.org\/downloads\/([\d]+)\/)([\s\S]+)\.mobi/
        )

        if (fileName === null) {
            throw new InvalidUrlError(downloadUrl)
        }

        return fileName[0]
    }

    private async getHtmlFromUrl(url: string) {
        const response = await this.client.get(url)
        return response.data
    }

    private isAo3Url(url: string): boolean {
        return url.includes(this.WORK_BASE_URL)
    }
}

export const aParser = () => {
    return new Parser()
}
