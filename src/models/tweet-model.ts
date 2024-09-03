export class TweetModel {
    threadPosition: number =  0;
    textContent: string = "";
    mediaContent: Array<string | null> = [null, null, null, null]
}