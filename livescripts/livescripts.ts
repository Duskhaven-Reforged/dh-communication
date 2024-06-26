import { DHCommonMessage } from "./dh-message/dh-cmsg";
import { RouteTopics } from "./dh-topic/TopicRouter";

export const mDHDMsg = new DHCommonMessage()

export function Main(events: TSEvents) {
    RouteTopics(events)
}

export function isDigit(input: string) : bool {
    let chars = input.split('')
    let out = input.length ? true : false
    chars.forEach((c) => {
        out = out && (c >= '0' && c <= '9');
    })

    return out
}