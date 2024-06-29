import { ACOUNT_WIDE_KEY, DHCharacterPoint, DHCharacterTalent, DHNodeType, DHPlayerLoadout, DHPlayerSpec, DHPointType, DHTalentTab, TALENT_POINT_TYPES, base64_char } from "../classes";
import { LoadCharacterData, cActiveLoadouts, cActiveSpecs, cCharPoints, cLoadouts, cMaxPointDefaults, cSpecs } from "./dh-chardata";
import { LoadWorldData, wClassNodeToSpell, wRaceClassTabMap, wPointTypeToTabs, wSpecNodeToSpell, wSpellToTab, wTabToSpell, wTalentTrees, wChoiceNodesRev } from "./dh-worlddata";

export class DHCache {
    
    constructor() {
        // TODO: custom races
        let RACE_LIST = [ 
            Race.HUMAN, Race.ORC, Race.DWARF, Race.NIGHTELF, Race.UNDEAD_PLAYER, 
            Race.TAUREN, Race.GNOME, Race.TROLL, Race.VULPERA, Race.BLOODELF, Race.DRAENEI, 
            Race.WORGEN, Race.NIGHTBORNE, Race.PANDAREN, Race.VOIDELF, Race.EREDAR, 
            Race.DRACTHYR, Race.ZANDALARI_TROLL, Race.OGRE, Race.DRAENEI_LIGHTFORGED, 
            Race.GOBLIN, Race.NAGA, Race.BROKEN, Race.TUSKARR, Race.FOREST_TROLL, 
            Race.SKELETON, Race.DEMONHUNTERH, Race.ARAKKOA, Race.TAUNKA, Race.FELORC, 
            Race.KULTIRAN, Race.DEMONHUNTERA,
        ]
        // TODO: custom classes
        let CLASS_LIST = [
            Class.WARRIOR, Class.PALADIN, Class.HUNTER,
            Class.ROGUE, Class.PRIEST, Class.DEATH_KNIGHT,
            Class.SHAMAN, Class.MAGE, Class.WARLOCK, Class.DEMON_HUNTER,
            Class.DRUID, Class.MONK, Class.BARD, Class.TINKER
        ]

        RACE_LIST.forEach((race) => {
            wRaceClassTabMap[race] = CreateDictionary<uint32, TSArray<uint32>>({})
            CLASS_LIST.forEach((pClass) => {
                wRaceClassTabMap[race][pClass] = CreateArray<uint32>([])
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

        if (wRaceClassTabMap.contains(race))
            if (wRaceClassTabMap[race].contains(pClass)) {
                if (wPointTypeToTabs.contains(tpt)) {
                    wRaceClassTabMap[race][pClass].forEach((tab) => {
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

                const res = QueryCharacters("insert into `forge_character_talent_loadouts` (`guid`, `id`, `talentTabId`, `name`, `talentString`, `active`) values ("+owner+", "+plo.Id+", "+tab.Id+", '"+plo.Name+"', '"+loadout+"', "+true+")")
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

    public TryGetCharacterTalents(player: TSPlayer, tab: number) : TSDictionary<uint32, DHCharacterTalent> {
        let spec : DHPlayerSpec = this.TryGetCharacterActiveSpec(player)
        if (spec.Talents.contains(tab))
            return spec.Talents[tab]

        return CreateDictionary<uint32, DHCharacterTalent>({})
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

    public TryGetCharacterActiveSpec(player: TSPlayer) : DHPlayerSpec {
        let guid = player.GetGUID().GetCounter()
        if (cActiveSpecs.contains(guid))
            return this.TryGetCharacterSpec(player, cActiveSpecs[guid])

        return DHPlayerSpec.Empty()
    }

    public TryGetCharacterSpec(player: TSPlayer, spec: number) : DHPlayerSpec {
        let guid = player.GetGUID().GetCounter()
        if (cSpecs.contains(guid))
            if (cSpecs[guid].contains(spec))
                return cSpecs[guid][spec]
        
        return DHPlayerSpec.Empty()
    }

    public GetTalent(player: TSPlayer, spell: number) : DHCharacterTalent {
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
        return DHCharacterTalent.Empty()
    }

    public GetSpecPoints(player: TSPlayer, pointType: DHPointType, spec: uint8) : DHCharacterPoint {
        if (spec) {
            let guid = player.GetGUID().GetCounter()
            if (cCharPoints.contains(guid)) {
                if (cCharPoints[guid].contains(pointType)) {
                    if (cCharPoints[guid][pointType].contains(spec))
                        return cCharPoints[guid][pointType][spec]
                }
            }

            let fcp = new DHCharacterPoint(pointType, spec, 0, 0)
            return this.UpdateCharPoints(player, fcp)
        } else {
            let spec = this.TryGetCharacterActiveSpec(player)
            if (!spec.IsNull()) {
                let real: DHPlayerSpec = spec
                return this.GetSpecPoints(player, pointType, real.Id)
           }

           this.CreateBaseSpec(player)

           return this.GetSpecPoints(player, pointType, 0)
        }
    }

    public UpdateCharPoints(player: TSPlayer, point: DHCharacterPoint) {
        let guid = player.GetGUID().GetCounter()
        
        cCharPoints[guid][point.Type][point.SpecId] = point

        const res = QueryCharacters("UPDATE INTO `forge_character_points` (`guid`,`type`,`spec`,`sum`,`max`) VALUES ("+guid+","+point.Type+","+point.SpecId+","+point.Sum+","+point.Max+")")

        return point
    }

    public UpdateCharSpec(player: TSPlayer, spec: DHPlayerSpec) {
        let owner = player.GetGUID().GetCounter()
        
        cSpecs[owner][spec.Id] = spec

        if (spec.Id !== cActiveSpecs[owner] && spec.Active) {
            cSpecs[owner][cActiveSpecs[owner]].Active = false
            this.SaveSpec(cSpecs[owner][cActiveSpecs[owner]])

            cActiveSpecs[owner] = spec.Id
        }

        this.SaveSpec(spec)
    }

    public AddCharacterPointsToAllSpecs(player: TSPlayer, type: DHPointType, amount: number) {
        let m = this.GetMaxPointDefaults(type)
        let ccp = this.GetCommonCharacterPoint(player, type)

        if (m.Max > 0) {
            let maxPoints = amount + ccp.Sum
            if (maxPoints >= m.Max) {
                maxPoints = maxPoints - m.Max
                amount = amount - maxPoints
            }
        }

        if (amount > 0) {
            ccp.Sum += amount
            cSpecs[player.GetGUID().GetCounter()].forEach((specId, spec) => {
                let sp = this.GetSpecPoints(player, type, specId)
                sp.Sum += amount
                this.UpdateCharPoints(player, sp)
            })

            // todo: send message on awarded points
            // ChatHandler(player->GetSession()).SendSysMessage("|cff8FCE00You have been awarded " + std::to_string(amount) + " " + GetpointTypeName(pointType) + " point(s).");
        }
    }

    public SaveSpec(spec: DHPlayerSpec) {
        let guid = spec.CharGuid

        const res = QueryCharacters("UPDATE INTO `forge_character_specs` (`id`,`guid`,`name`,`description`,`active`,`spellicon`,`visability`,`charSpec`) VALUES ("+spec.Id+","+guid+",'"+spec.Name+"','"+spec.Description+"',"+spec.Active+","+spec.SpellIconId+",1,"+spec.SpecTabId+")")

        spec.PointsSpent.forEach((key, val) => {
            const res = QueryCharacters("UPDATE INTO forge_character_talents_spent(`guid`,`spec`,`tabid`,`spent`) VALUES("+guid+", "+spec.Id+", "+key+", "+val+")")
        })

        spec.Talents.forEach((tab, talents) => {
            talents.forEach((spellId, talent) => {
                this.SaveTalent(guid, spec.Id, talent)
            })
        })
    }

    public SaveTalent(guid: number, specId: number, talent: DHCharacterTalent) {
        QueryCharacters("UPDATE INTO `forge_character_talents` (`guid`,`spec`,`spellid`,`tabId`,`currentrank`) VALUES ("+guid+","+specId+","+talent.SpellId+","+talent.TabId+","+talent.CurrentRank+")")
    }

    public GetCommonCharacterPoint(player: TSPlayer, pt: DHPointType) {
        return this.GetSpecPoints(player, pt, 0);
    }

    public GetMaxPointDefaults(type: DHPointType) : DHCharacterPoint {
        if (cMaxPointDefaults.contains(type))
            return cMaxPointDefaults[type]
        else
            return new DHCharacterPoint(type, 0xffffffff, 0, 0)
    }

    public TryGetTabPointType(tab: number) : DHPointType {
        if (wTalentTrees.contains(tab))
            return wTalentTrees[tab].TalentType

        return DHPointType.MISSING
    }

    public TryGetTalentTab(player: TSPlayer, tab: number) : DHTalentTab {
        let race = player.GetRace()
        let pClass = player.GetClass()
        if (wRaceClassTabMap.contains(race)) {
            if (wRaceClassTabMap[race].contains(pClass))
                if (wRaceClassTabMap[race][pClass].includes(tab)) {
                    console.log(`Got tab ${tab}`)
                    return wTalentTrees[tab]
                }
        }

        return DHTalentTab.Empty()
    }

    public CreateBaseSpec(player: TSPlayer) {
        
        let spec = new DHPlayerSpec(player.GetGUID().GetCounter(), 1, "Base", "Base spec used for everything", true, 133743, 1)
        let tabs = this.TryGetCustomTalentTabs(player, DHPointType.TALENT)
        if (tabs.length) {
            tabs.forEach((tab) => {
                tab.Talents.forEach((spell, talent) => {
                    let newTalent = new DHCharacterTalent(talent.SpellId, tab.Id, 0)
                    newTalent.Type = talent.NodeType
                    spec.Talents[tab.Id][newTalent.SpellId] = newTalent
                })
            })
        }
        tabs = this.TryGetCustomTalentTabs(player, DHPointType.CLASS)
        if (tabs.length) {
            tabs.forEach((tab) => {
                tab.Talents.forEach((spell, talent) => {
                    let newTalent = new DHCharacterTalent(talent.SpellId, tab.Id, 0)
                    newTalent.Type = talent.NodeType
                    spec.Talents[tab.Id][newTalent.SpellId] = newTalent
                })
            })
        }

        TALENT_POINT_TYPES.forEach((type) => {
            let fpt = this.GetCommonCharacterPoint(player, type)
            let maxP = this.GetMaxPointDefaults(type)

            let newPoint = new DHCharacterPoint(type, spec.Id, fpt.Sum, maxP.Max)
            this.UpdateCharPoints(player, newPoint)
        })
        this.UpdateCharSpec(player, spec)
    }

    public HandleDeleteCharacter(player: TSPlayer) {
        let guid = player.GetGUID().GetCounter()
        QueryCharacters(`DELETE FROM forge_character_specs WHERE guid = ${guid}`)
        QueryCharacters(`DELETE FROM character_modes WHERE guid = ${guid}`)
        QueryCharacters(`DELETE FROM forge_character_points WHERE guid = ${guid} AND spec != ${ACOUNT_WIDE_KEY}`)
        QueryCharacters(`DELETE FROM forge_character_talents WHERE guid = ${guid} AND spec != ${ACOUNT_WIDE_KEY}`)
        QueryCharacters(`DELETE FROM forge_character_talents_spent WHERE guid = ${guid} AND spec != ${ACOUNT_WIDE_KEY}`)
    }

    public ForgetTalents(player: TSPlayer, spec: DHPlayerSpec, type: DHPointType) {
        let tabs = this.TryGetCustomTalentTabs(player, type)
        tabs.forEach((tab) => {
            tab.Talents.forEach((spellId, talent) => {
                if (talent.NodeType == DHNodeType.CHOICE) {
                    wChoiceNodesRev.forEach((spell, nodeIndex) => {
                        if (player.HasSpell(spell))
                            player.RemoveSpell(spell, false, false)
                    })
                }
                else {
                    talent.Ranks.forEach((rank, spell) => {
                        let info = GetSpellInfo(spell)
                        for (let eff = SpellEffIndex.EFFECT_0; eff <= SpellEffIndex.EFFECT_2; eff++) {
                            let effect = info.GetEffect(eff)
                            if (effect.GetType() === SpellEffects.LEARN_SPELL) {
                                player.RemoveSpell(effect.GetTriggerSpell(), false, false)
                            }

                            player.RemoveSpell(spell, false, false)
                        }
                    })
                }

                if (spec.Talents.contains(tab.Id))
                    if (spec.Talents[tab.Id].contains(spellId))
                        spec.Talents[tab.Id][spellId].CurrentRank = 0
            })
        })
        this.UpdateCharSpec(player, spec)

        let fcp = this.GetSpecPoints(player, type, spec.Id)
        let amount = 0
        let level = player.GetLevel()
        if (level >= 10)
            level -= 9

        switch(type) {
            case DHPointType.TALENT: {
                if (level > 1) {
                    amount = Math.floor(level/2)
                } else
                    if (level % 2)
                        amount = 1
            } break;
            case DHPointType.CLASS: {
                if (level > 1) {
                    let rem = level % 2
                    let div = Math.floor(level/2)
                    if (rem)
                        div++

                    amount = div
                }
            } break;
            default:
                break;
        }

        fcp.Max = amount
        fcp.Sum = amount

        this.UpdateCharPoints(player, fcp)
        if (type === DHPointType.TALENT)
            this.ForgetTalents(player, spec, DHPointType.CLASS)
    }
}