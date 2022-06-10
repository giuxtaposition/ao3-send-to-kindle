import { describe, expect, test } from "vitest"
import { aParser } from "../../services/parser"

describe("Parser", () => {
    test("given work url parse download url", async () => {
        const parser = aParser()

        const url = await parser.fromWorkUrlToDownloadUrl(
            "https://archiveofourown.org/works/123"
        )

        expect(url).toMatch(
            /https:\/\/archiveofourown\.org\/downloads\/123\/([\S]+)\.mobi/
        )
    })
})
