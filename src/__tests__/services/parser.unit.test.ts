import axios from "axios"
import { InvalidUrlError } from "../../errors/InvalidUrlError"
import { aParser } from "../../services/parser"
import { testWorkHtml, testWorkHtmlWithChapters } from "../helpers/htmlHelpers"

describe("Parser", () => {
    afterAll(() => {
        vi.resetAllMocks()
    })

    test("throws error if url is not an ao3 work url", async () => {
        const parser = aParser()

        await expect(async () => {
            await parser.fromWorkUrlToDownloadUrl("https://www.google.com")
        }).rejects.toThrow(InvalidUrlError)
    })

    test("given work url parse download url", async () => {
        axios.get = vi.fn().mockReturnValue({
            data: testWorkHtml,
        })

        const parser = aParser()

        const url = await parser.fromWorkUrlToDownloadUrl(
            "https://archiveofourown.org/works/123"
        )

        expect(url).toMatch(
            /https:\/\/archiveofourown\.org\/downloads\/123\/([\S]+)\.mobi/
        )
    })

    test("given work url with chapters param, parse download url", async () => {
        axios.get = vi.fn().mockReturnValue({
            data: testWorkHtmlWithChapters,
        })

        const parser = aParser()

        const url = await parser.fromWorkUrlToDownloadUrl(
            "https://archiveofourown.org/works/38458735/chapters/96116941"
        )

        expect(url).toMatch(
            /https:\/\/archiveofourown\.org\/downloads\/38458735\/([\S]+)\.mobi/
        )
    })

    test("given download url return file name", async () => {
        const parser = aParser()

        const fileName = parser.parseFileNameFromDownloadUrl(
            "https://archiveofourown.org/downloads/123/And%20Unto%20Dust%20Returned.mobi?updated_at=1386661330"
        )

        expect(fileName).toBe("And Unto Dust Returned.mobi")
    })
})
