import * as dotenv from "dotenv"
dotenv.config()

const PORT = process.env.PORT

const EMAIL_SENDER =
    process.env.NODE_ENV !== "production"
        ? process.env.TEST_EMAIL_SENDER
        : process.env.EMAIL_SENDER

const EMAIL_SENDER_PASSWORD =
    process.env.NODE_ENV !== "production"
        ? process.env.TEST_EMAIL_SENDER_PASSWORD
        : process.env.EMAIL_SENDER_PASSWORD

const TEST_EMAIL_RECEIVER = process.env.TEST_EMAIL_RECEIVER

export { PORT, EMAIL_SENDER, EMAIL_SENDER_PASSWORD, TEST_EMAIL_RECEIVER }
