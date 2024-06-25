import { DHCharacterPoint, DHCharacterTalent, DHPlayerLoadout, DHPlayerSpec, DHPointType, DHTalent, DHTalentTab, DHTreeMetaData } from "../classes";
import { LoadCharacterData, cActiveLoadouts, cActiveSpecs, cCharPoints, cLoadouts, cSpecs } from "./dh-chardata";

import { LoadWorldData, wClassNodeToSpell, wClassRaceTabMap, wPointTypeToTabs, wSpecNodeToSpell, wSpellToTab, wTabToSpell, wTalentTrees } from "./dh-worlddata";

export class DHCache {
    
    constructor() {
        // TODO: custom races
        let RACE_LIST = [ 
            Race.HUMAN, Race.ORC, Race.DWARF, Race.NIGHTELF, 
            Race.UNDEAD, Race.TAUREN, Race.GNOME, Race.TROLL,
            Race.BLOODELF, Race.DRAENEI,
        ]
        // TODO: custom classes
        let CLASS_LIST = [
            Class.WARRIOR, Class.PALADIN, Class.HUNTER,
            Class.ROGUE, Class.PRIEST, Class.DEATH_KNIGHT,
            Class.SHAMAN, Class.MAGE, Class.WARLOCK,
            Class.DRUID,
        ]

        RACE_LIST.forEach((race) => {
            wClassRaceTabMap[race] = CreateDictionary<uint32, TSArray<uint32>>({})
            CLASS_LIST.forEach((pClass) => {
                wClassRaceTabMap[race][pClass] = CreateArray<uint32>([])
            })
        })

        console.log("Loading `world` data.\n")
        LoadWorldData()
        console.log("Loading `characters` data.\n")
        LoadCharacterData()
    }

    public TryGetCustomTalentTabs(player: TSPlayer, tpt: DHPointType) : TSArray<DHTalentTab> {
        let out = CreateArray<DHTalentTab>([])
        let race = player.GetRace()
        let pClass = player.GetClass()

        if (wClassRaceTabMap.contains(race))
            if (wClassRaceTabMap[race].contains(pClass)) {
                if (wPointTypeToTabs.contains(tpt)) {
                    wClassRaceTabMap[race][pClass].forEach((tab) => {
                        if (wPointTypeToTabs[tpt].includes(tab))
                            out.push(wTalentTrees[tab])
                    })
                }
            }

        return out
    }

    public AddDefaultLoadout(player: TSPlayer) {
        let tabs = this.TryGetCustomTalentTabs(player, DHPointType.TALENT)
        if (tabs.length) {
            tabs.forEach((tab) => {
                let loadout = "A"
                loadout += base64_char.charAt(tab.Id)
                loadout += base64_char.charAt(player.GetClass())

                let classMap = wClassNodeToSpell[player.GetClassMask()]
                classMap.forEach(() => {
                    loadout += base64_char.charAt(1)
                })

                let specMap = wSpecNodeToSpell[tab.Id]
                specMap.forEach(() => {
                    loadout += base64_char.charAt(1)
                })

                let owner = player.GetGUID().GetCounter()
                let plo = new DHPlayerLoadout(1, tab.Id, "Default", loadout, true)

                cLoadouts[owner][tab.Id][plo.Id] = plo
                cActiveLoadouts[owner] = plo

                const res = QueryWorld("insert into `forge_character_talent_loadouts` (`guid`, `id`, `talentTabId`, `name`, `talentString`, `active`) values ("+owner+", "+plo.Id+", "+tab.Id+", '"+plo.Name+"', '"+loadout+"', "+true+")")
                while (res.GetRow()) {}
            })
        }
    }

    public TryGetTabIdForSpell(player: TSPlayer, spell: number) : number {
        if (wSpellToTab.contains(spell))
            return wSpellToTab[spell]

        return 0
    }

    public TryGetSpellIdForTab(player: TSPlayer, tab: number) : number {
        if (wTabToSpell.contains(tab))
            return wTabToSpell[tab]

        return 0
    }

    public TryGetCharacterTalents(player: TSPlayer, tab: number) : TSDictionary<uint32, DHCharacterTalent> | any {
        let spec : DHPlayerSpec = this.TryGetCharacterActiveSpec(player)
        if (spec.Talents.contains(tab))
            return spec.Talents[tab]

        return {}
    }

    public TryGetAllCharacterSpecs(player: TSPlayer) : TSArray<DHPlayerSpec> {
        let out : TSArray<DHPlayerSpec> = CreateArray<DHPlayerSpec>([])
        let guid = player.GetGUID().GetCounter()
        if (cSpecs.contains(guid)) {
            cSpecs[guid].forEach((id, spec) => {
                out.push(spec)
            })
        }

        return out
    }

    public TryGetCharacterActiveSpec(player: TSPlayer) : DHPlayerSpec | any {
        let guid = player.GetGUID().GetCounter()
        if (cActiveSpecs.contains(guid))
            return this.TryGetCharacterSpec(player, cActiveSpecs[guid])

        return null
    }

    public TryGetCharacterSpec(player: TSPlayer, spec: number) : DHPlayerSpec | any {
        let guid = player.GetGUID().GetCounter()
        if (cSpecs.contains(guid))
            if (cSpecs[guid].contains(spec))
                return cSpecs[guid][spec]

        return null
    }

    public GetTalent(player: TSPlayer, spell: number) : DHCharacterTalent | any {
        if(wSpellToTab.contains(spell)) {
            let tab = wTalentTrees[wSpellToTab[spell]]
            let activeSpec : DHPlayerSpec = this.TryGetCharacterActiveSpec(player)
            if (activeSpec) {
                if (activeSpec.Talents.contains(tab.Id)) {
                   if (activeSpec.Talents[tab.Id].contains(spell))
                        return activeSpec.Talents[tab.Id][spell]
                }
            }
        }
        return null
    }

    public GetSpecPoints(player: TSPlayer, pointType: DHPointType, spec: number) : DHCharacterPoint {
        let guid = player.GetGUID().GetCounter()
        if (cCharPoints.contains(guid)) {
            if (cCharPoints[guid].contains(pointType)) {
                if (cCharPoints[guid][pointType].contains(spec))
                    return cCharPoints[guid][pointType][spec]
            }
        }

        let fcp = new DHCharacterPoint(pointType, spec, 0, 0)
        return this.UpdateCharPoints(player, fcp)
    }

    public UpdateCharPoints(player: TSPlayer, point: DHCharacterPoint) : DHCharacterPoint {
        let guid = player.GetGUID().GetCounter()
        
        cCharPoints[guid][point.Type][point.SpecId] = point

        const res = QueryWorld("UPDATE INTO `forge_character_points` (`guid`,`type`,`spec`,`sum`,`max`) VALUES ("+guid+","+point.Type+","+point.SpecId+","+point.Sum+","+point.Max+")")
        while (res.GetRow()) {}

        return point
    }
}

export const base64_char : string = "|ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";