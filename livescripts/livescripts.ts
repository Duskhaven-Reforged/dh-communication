import { wClassLevelSpells, wTalentTrees } from "./dh-cachedata/dh-worlddata";
import { DHCommonMessage } from "./dh-message/dh-cmsg";
import { RouteTopics } from "./dh-topic/TopicRouter";

export const mDHDMsg = new DHCommonMessage()

export function Main(events: TSEvents) {
    RouteTopics(events)

    events.Player.OnLogin((player, first) => {
        console.log("Player logged in:" + player.GetName())
    })
}

export function LearnSpellsForLevel(player: TSPlayer) {
    //if (player.HasUnitState(0x00000001))
    // TODO add remove by effect

    if (wClassLevelSpells.contains(player.GetClass())) {
        let pClass = wClassLevelSpells[player.GetClass()]
        pClass.forEach((race, levelmap) => {
            levelmap.forEach((level, spells) => {
                if (level <= player.GetLevel()) {
                    spells.forEach((spell) => {
                        if (player.HasSpell(spell))
                            return;

                        player.LearnSpell(spell)
                    })
                }
            })
        })
    }
}

export function isDigit(input: string) : bool {
    let chars = input.split('')
    let out = input.length ? true : false
    chars.forEach((c) => {
        out = out && (c >= '0' && c <= '9');
    })

    return out
}