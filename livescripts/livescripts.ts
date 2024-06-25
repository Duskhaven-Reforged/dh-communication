import { DHCache } from "./dh-cachedata/dh-cache";
import { testing } from "./testing";

export function Main(events: TSEvents) {
    testing(events)
}

export const mDHCache = new DHCache()
