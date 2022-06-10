export default interface IDownloader {
    download(workUrl: string): Promise<string>
}
