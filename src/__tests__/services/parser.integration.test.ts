import { aParser } from "../../services/parser"

describe("Parser", () => {
    test("given safe for work url parse download url", async () => {
        const parser = aParser()

        const url = await parser.fromWorkUrlToDownloadUrl(
            "https://archiveofourown.org/works/123"
        )

        expect(url).toMatch(
            /https:\/\/archiveofourown\.org\/downloads\/123\/([\S]+)\.mobi/
        )
    })

    test("given adult work url, parse download url", async () => {
        const parser = aParser()

        const url = await parser.fromWorkUrlToDownloadUrl(
            "https://archiveofourown.org/works/38458735"
        )

        expect(url).toMatch(
            /https:\/\/archiveofourown\.org\/downloads\/38458735\/([\S]+)\.mobi/
        )
    })

    test("given adult work url with chapters, parse download url", async () => {
        const parser = aParser()

        const url = await parser.fromWorkUrlToDownloadUrl(
            "https://archiveofourown.org/works/38458735/chapters/96116941"
        )

        expect(url).toMatch(
            /https:\/\/archiveofourown\.org\/downloads\/38458735\/([\S]+)\.mobi/
        )
    })
})
