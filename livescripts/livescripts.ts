import { DHPointType } from "./classes";
import { wClassLevelSpells, wTalentTrees } from "./dh-cachedata/dh-worlddata";
import { DHCommonMessage } from "./dh-message/dh-cmsg";
import { RouteTopics } from "./dh-topic/TopicRouter";

export const mDHDMsg = new DHCommonMessage()

export function Main(events: TSEvents) {
    RouteTopics(events)

    events.Player.OnLogin((player, first) => {
        LearnSpellsForLevel(player)

        //todo load actions and maybe account bonuses
        // maybe unlearn flagged too
    })

    events.Player.OnCreate((player) => {
        mDHDMsg.cache.CreateBaseSpec(player)
        mDHDMsg.cache.AddDefaultLoadout(player)
    })

    events.Player.OnLogout((player) => {
        let spec = mDHDMsg.cache.TryGetCharacterActiveSpec(player)
        if (!spec.IsNull()) {
            //mDHDMsg.cache.SaveLoadoutActions()
        }
    })

    events.Player.OnLevelChanged((player, oldLevel) => {
        let spec = mDHDMsg.cache.TryGetCharacterActiveSpec(player)
        if (!spec.IsNull()) {
            let curLevel = player.GetLevel()
            if (oldLevel < curLevel) {
                let levelDiff = curLevel - oldLevel
                if (oldLevel < 10 && levelDiff > 1)
                    levelDiff -= 9 - oldLevel

                if (levelDiff > 1) {
                    let div = Math.floor(levelDiff / 2)
                    let rem = levelDiff % 2

                    mDHDMsg.cache.AddCharacterPointsToAllSpecs(player, DHPointType.TALENT, div)
                    if (rem)
                        div += 1

                    mDHDMsg.cache.AddCharacterPointsToAllSpecs(player, DHPointType.CLASS, div)
                } else {
                    if (curLevel % 2)
                        mDHDMsg.cache.AddCharacterPointsToAllSpecs(player, DHPointType.TALENT, 1)
                    else
                        mDHDMsg.cache.AddCharacterPointsToAllSpecs(player, DHPointType.CLASS, 1)
                }
                console.log(`Handled points on level.`)
            }
            //mDHDMsg.SendTalents(player)
            console.log(`Sending spec info.`)
            mDHDMsg.cache.UpdateCharSpec(player, spec)
            mDHDMsg.SendSpecInfo(player)
            LearnSpellsForLevel(player)
        }
    }) 

    events.Spell.OnLearn((spell, player, active, disables, superceded, from_skill) => {
        // learn extra spells
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