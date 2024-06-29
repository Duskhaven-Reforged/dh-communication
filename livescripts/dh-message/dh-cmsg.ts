import { load } from 'js-yaml';
import { ClientCallbackOperations } from '../../shared/Messages';
import { DHPointType, DHTalentTab, TALENT_POINT_TYPES, base64_char } from '../classes';
import { DHCache } from '../dh-cachedata/dh-cache';
import { cLoadouts } from '../dh-cachedata/dh-chardata';
import { wClassNodeToClassTree, wClassNodeToSpell, wSpecNodeToSpell } from '../dh-cachedata/dh-worlddata';
import { GetTalentTreeLayoutPayload, TTLPTalent, TTLPTalentPrereq, TTLPTalentRank, TalentTreeLayoutPayload } from '../../shared/Payloads/TalentTreeLayoutPayload';
import { CPSSpec, CSPPointSpend, CSPPoints, CharacterSpecsPayload, GetCharacterSpecsPayload } from '../../shared/Payloads/GetCharacterSpecsPayload';

export class DHCommonMessage {
    cache: DHCache

    constructor() {
        this.cache = new DHCache()
    }

    public BuildTalentTreeLayout(player: TSPlayer) {
        TALENT_POINT_TYPES.forEach((type) => {
            let tabs = this.cache.TryGetCustomTalentTabs(player, type)
            this.BuildTree(player, type, tabs)
        })
    }

    public BuildTree(player: TSPlayer, type: DHPointType, tabs: TSArray<DHTalentTab>) {
        let out = new TalentTreeLayoutPayload()

        tabs.forEach((tab) => {
            out.TabId = tab.Id
            out.TabName = tab.Name
            out.TabIcon = tab.SpellIconId
            out.TabBg = tab.Background
            out.TabDesc = tab.Description
            out.TabRole = tab.Role
            out.TabSpellString = tab.SpellString
            out.TabType = tab.TalentType
            out.TabIndex = tab.TabIndex

            out.TalentsCount = tab.Talents.get_length()
            tab.Talents.forEach((spell, talent) => {
                let Talent = new TTLPTalent()
                Talent.TabId = tab.Id
                Talent.SpellId = talent.SpellId
                Talent.Col = talent.ColumnIndex
                Talent.Row = talent.RowIndex
                Talent.RankCost = talent.RankCost
                Talent.ReqLevel = talent.RequiredLevel
                Talent.TabPointReq = talent.TabPointReq
                Talent.PrereqType = talent.PreReqType
                Talent.NodeType = talent.NodeType
                Talent.NodeIndex = talent.NodeIndex

                Talent.NumRanks = talent.NumberOfRanks
                talent.Ranks.forEach((rank, spellId) => {
                    let Rank = new TTLPTalentRank()
                    Rank.Rank = rank
                    Rank.Spell = spellId
                    Talent.Ranks.push(Rank)
                })

                talent.Prereqs.forEach((prereq) => {
                    let Prereq = new TTLPTalentPrereq()
                    Prereq.Talent = prereq.Talent
                    Prereq.TabId = prereq.TabId
                    Prereq.ReqRank = prereq.ReqRank
                    Talent.Prereqs.push(Prereq)
                })

                talent.UnlearnSpells.forEach((spellId) => {
                    Talent.Unlearns.push(spellId)
                })
                talent.Choices.forEach((num, choice) => {
                    Talent.Choices.push(choice.SpellId)
                })
            })
            // TODO send packet player->SendForgeUIMsg(ForgeTopic::TALENT_TREE_LAYOUT, msg);
            let pkt = new GetTalentTreeLayoutPayload().BuildPacket(out)
            pkt.SendToPlayer(player)
        })
    }

    public ApplyKnownTalents(player: TSPlayer) {
        let spec = this.cache.TryGetCharacterActiveSpec(player)
        if (!spec.IsNull()) {
            spec.Talents.forEach((tabId, talents) => {
                talents.forEach((spellId, talent) => {
                    let tab = this.cache.TryGetTalentTab(player, tabId)
                    if (!tab.IsNull()) {
                        let spell = tab.Talents[talent.SpellId]
                        let ranked = spell.Ranks[talent.CurrentRank]

                        player.RemoveSpell(ranked, false, false)

                        spell.UnlearnSpells.forEach((toUnlearn) => {
                            player.RemoveSpell(toUnlearn, false, false)
                        })

                        if (!player.HasSpell(ranked))
                            player.LearnSpell(ranked)
                    }
                })
            })
        }
    }

    public SendTalents(player: TSPlayer) {
        let spec = this.cache.TryGetCharacterActiveSpec(player)
        if (!spec.IsNull()) {
            let pClass = player.GetClass()
            let cMask = player.GetClassMask()
            let cSpec = spec.SpecTabId
            let output = 'A'+base64_char.charAt(cSpec)+base64_char.charAt(pClass)

            let i = 0
            let classTree = spec.Talents[wClassNodeToClassTree[cMask]]
            let classMap = wClassNodeToSpell[cMask]
            classMap.forEach((k, v) => {
                output += base64_char.charAt(classTree[classMap[i]].CurrentRank+1)
                i++
            })

            let specTree = spec.Talents[cSpec]
            let specMap = wSpecNodeToSpell[cSpec]
            i = 0
            specMap.forEach((k, v) => {
                output += base64_char.charAt(specTree[specMap[i]].CurrentRank+1)
                i++
            })

            let pkt = new SimpleMessagePayload(ClientCallbackOperations.GET_TALENTS, output);
            pkt.write().SendToPlayer(player)
        }
    }

    public SendSpecInfo(player: TSPlayer) {
        let out = new CharacterSpecsPayload()
        let specs = this.cache.TryGetAllCharacterSpecs(player)
        out.SpecCounts = specs.length
        specs.forEach((spec) => {
            let CPSS = new CPSSpec()
            CPSS.Id = spec.Id
            CPSS.Name = spec.Name
            CPSS.Description = spec.Description
            CPSS.Active = spec.Active ? 1 : 0
            CPSS.SpellIcon = spec.SpellIconId
            CPSS.SpecTabId = spec.SpecTabId

            CPSS.PointsSpentCount = spec.PointsSpent.get_length()
            spec.PointsSpent.forEach((Tab, Amount) => {
                let Spend = new CSPPointSpend()
                Spend.TabId = Tab
                Spend.Amount = Amount
                CPSS.PointsSpent.push(Spend)
            })

            CPSS.PointsCount = TALENT_POINT_TYPES.length
            TALENT_POINT_TYPES.forEach((type) => {
                let Point = new CSPPoints()
                let m = this.cache.GetMaxPointDefaults(type)
                let tp = this.cache.GetCommonCharacterPoint(player, type)
                let cps = this.cache.GetSpecPoints(player, type, spec.Id)
                
                Point.Type = type
                Point.SpecPointSum = cps.Sum
                Point.SpecPointMax = cps.Max
                Point.CommonPointSum = tp.Sum
                Point.AbsoluteMax = m.Max
                CPSS.Points.push(Point)
            })

            out.Specs.push(CPSS)
        })

        let pkt = new GetCharacterSpecsPayload().BuildPacket(out)
        pkt.SendToPlayer(player)
    }

    public SendActiveSpecInfo(player: TSPlayer) {
        // let spec = this.cache.TryGetCharacterActiveSpec(player)
        // if (!spec.IsNull()) {
        //     let out = spec.Id + "^" + spec.Name + "^" + spec.Description + "^" + spec.Active + "^" + spec.SpellIconId + "^1^" + spec.SpecTabId

        //     let i = 0
        //     spec.PointsSpent.forEach((tab, num) => {
        //         let del = i ? '%' : ''
        //         out += del+ tab + '~' + num
        //         i++
        //     })
        //     out += '~'

        //     let j = 0
        //     TALENT_POINT_TYPES.forEach((type) => {
        //         let del = j ? '@' : ''
        //         let m = this.cache.GetMaxPointDefaults(type)
        //         let tp = this.cache.GetCommonCharacterPoint(player, type)
        //         let sp = this.cache.GetSpecPoints(player, type, spec.Id)

        //         out += del + type + '$' + sp.Sum + '$' + tp.Sum + '$' + m.Sum + '$' + m.Max
        //         j++
        //     })

        //     let pkt = new SimpleMessagePayload(ClientCallbackOperations.GET_CHARACTER_SPECS, out);
        //     pkt.write().SendToPlayer(player)
        // }
    }

    public SendLoadouts(player: TSPlayer) {
        // let guid = player.GetGUID().GetCounter()
        // if (cLoadouts.contains(guid)) {
        //     let out = ''
        //     let del = ''
        //     cLoadouts[guid].forEach((spec, loadouts) => {
        //         out += del + spec + '$'
        //         let idDel = ''
        //         loadouts.forEach((id, loadout) => {
        //             out += idDel + id + '^' + loadout.Active + '^' + loadout.Name + '^' + loadout.TalentString
        //             idDel = '~'
        //         })
        //         del = '*'
        //     })
            
        //     let pkt = new SimpleMessagePayload(ClientCallbackOperations.GET_LOADOUTS, out);
        //     pkt.write().SendToPlayer(player)
        // }
    }
}