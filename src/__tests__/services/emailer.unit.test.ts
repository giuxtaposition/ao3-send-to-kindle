import nodemailer from "nodemailer"
import { InvalidEmailError } from "../../errors/InvalidEmailError"
import { anEmailer } from "../../services/emailer"

describe("Emailer", () => {
    const transport = vi.fn() as any

    beforeEach(() => {
        nodemailer.createTransport = vi.fn().mockReturnValue(transport)
        transport.sendMail = vi.fn()
    })

    test("throws error if url is not a kindle url", async () => {
        const emailer = anEmailer()

        await expect(async () => {
            await emailer.send("not a url", "subject", "body", [
                { path: "attachment" },
            ])
        }).rejects.toThrow(InvalidEmailError)
    })

    test("sends email if url is a kindle url", async () => {
        const emailer = anEmailer()

        emailer.send("email@kindle.com", "subject", "body", [
            { path: "attachment" },
        ])

        expect(transport.sendMail).toHaveBeenCalledWith({
            from: expect.any(String),
            to: "email@kindle.com",
            subject: "subject",
            text: "body",
            attachments: [{ path: "attachment" }],
        })
    })
})
