import nodemailer from "nodemailer"
import { InvalidEmailError } from "../errors/InvalidEmailError"
import { EMAIL_SENDER, EMAIL_SENDER_PASSWORD } from "../utils/config"

type Attachment = {
    path: string
}

class Emailer {
    transporter: nodemailer.Transporter

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: EMAIL_SENDER,
                pass: EMAIL_SENDER_PASSWORD,
            },
        })
    }

    public async send(
        email: string,
        subject: string,
        body: string,
        attachments: Attachment[]
    ) {
        if (!this.isValidEmail(email)) {
            throw new InvalidEmailError(email)
        }

        const mailOptions = {
            from: EMAIL_SENDER,
            to: email,
            subject: subject,
            text: body,
            attachments: attachments,
        }

        return await this.transporter.sendMail(mailOptions)
    }

    private isValidEmail(email: string) {
        return /([\s\S]+)@kindle.com/.test(email)
    }
}

export const anEmailer = () => {
    return new Emailer()
}
