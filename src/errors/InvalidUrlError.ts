export class InvalidUrlError extends Error {
    constructor(url: string) {
        super(`Invalid url: ${url}`)
    }
}
