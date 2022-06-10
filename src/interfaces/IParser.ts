export default interface IParser {
    fromWorkUrlToDownloadUrl(workUrl: string): Promise<string>
    parseFileNameFromDownloadUrl(downloadUrl: string): string
}
