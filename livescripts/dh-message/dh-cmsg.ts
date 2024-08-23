import { ClientCallbackOperations, SimpleMessagePayload } from '../../shared/Messages';
import { DHPointType, DHTalentTab, TALENT_POINT_TYPES } from '../classes';
import { DHCache, PointsMgr } from '../dh-cachedata/dh-cache';
import { CharacterPoints, cActiveLoadouts, cLoadouts } from '../dh-cachedata/dh-chardata';
import { GetTalentTreeLayoutPayload, TTLPTalent, TTLPTalentPrereq, TTLPTalentRank, TalentTreeLayout, TalentTreeLayoutPayload } from '../../shared/Payloads/TalentTreeLayoutPayload';
import { wDefaultLoadoutStrings } from '../dh-cachedata/dh-worlddata';

export class DHCommonMessage {
    cache: DHCache

    constructor() {
        this.cache = new DHCache()
    }

    public BuildTalentTreeLayout(player: TSPlayer) {
        let tabs = CreateArray<DHTalentTab>([])
        this.cache.TryGetCustomTalentTabs(player, DHPointType.TALENT).forEach((SpecTab) => {tabs.push(SpecTab)})
        this.cache.TryGetCustomTalentTabs(player, DHPointType.CLASS).forEach((ClassTab) => {tabs.push(ClassTab)})
        this.BuildTrees(player, tabs)
    }

    public BuildTrees(player: TSPlayer, tabs: TSArray<DHTalentTab>) {
        let out = new TalentTreeLayoutPayload()
        out.TabCount = tabs.length
        tabs.forEach((tab) => {
            let Layout = new TalentTreeLayout()
            Layout.TabId = tab.Id
            Layout.TabName = tab.Name
            Layout.TabIcon = tab.SpellIconId
            Layout.TabBg = tab.Background
            Layout.TabDesc = tab.Description
            Layout.TabRole = tab.Role
            Layout.TabSpellString = tab.SpellString
            Layout.TabType = tab.TalentType
            Layout.TabIndex = tab.TabIndex

            Layout.TalentsCount = tab.Talents.get_length()
            tab.Talents.forEach((spell, talent) => {
                if (talent.SpellId > 0) {
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

                    Talent.StarterTabs = talent.Starter.length
                    talent.Starter.forEach((Start) => {
                        Talent.Starter.push(Start)
                    })

                    Talent.NodeIndex = talent.NodeIndex

                    Talent.NumRanks = talent.NumberOfRanks
                    talent.Ranks.forEach((rank, spellId) => {
                        let Rank = new TTLPTalentRank()
                        Rank.Rank = rank
                        Rank.Spell = spellId
                        Talent.Ranks.push(Rank)
                    })

                    Talent.PrereqCount = talent.Prereqs.length
                    talent.Prereqs.forEach((prereq) => {
                        let Prereq = new TTLPTalentPrereq()
                        Prereq.Talent = prereq.Talent
                        Prereq.TabId = prereq.TabId
                        Prereq.ReqRank = prereq.ReqRank
                        Talent.Prereqs.push(Prereq)
                    })

                    Talent.UnlearnsCount = talent.UnlearnSpells.length
                    talent.UnlearnSpells.forEach((spellId) => {
                        Talent.Unlearns.push(spellId)
                    })

                    Talent.ChoicesCount = talent.Choices.length
                    talent.Choices.forEach((choice) => {
                        Talent.Choices.push(choice)
                    })
                    Layout.Talents.push(Talent)
                }
            })
            out.Tabs.push(Layout)
        })

        let pkt = new GetTalentTreeLayoutPayload().BuildPacket(out)
        pkt.SendToPlayer(player)
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

    public SendTalents(Player: TSPlayer) {
        let spec = this.cache.TryGetCharacterActiveSpec(Player)
        if (spec) {
            let Loadout = cActiveLoadouts[Player.GetGUID().GetCounter()][spec.SpecTabId]
            if (Loadout == null) {
                this.cache.AddDefaultLoadout(Player)
                Loadout = cActiveLoadouts[Player.GetGUID().GetCounter()][spec.SpecTabId]
            }
            let TestString = wDefaultLoadoutStrings[Player.GetClass()][spec.SpecTabId]

            if (Loadout.TalentString.length != TestString.length) {
                this.cache.ForgetTalents(Player, spec, DHPointType.TALENT)
                Loadout.TalentString = TestString 
                cActiveLoadouts[Player.GetGUID().GetCounter()][spec.SpecTabId] = Loadout
                this.cache.SavePLO(Player, Loadout)
            }

            let pkt = new SimpleMessagePayload(ClientCallbackOperations.GET_TALENTS, Loadout.TalentString);
            pkt.write().SendToPlayer(Player)
        }
    }

    public SendSpecInfo(Player: TSPlayer) {
        let packet = CreateCustomPacket(ClientCallbackOperations.GET_CHARACTER_SPECS, 0);
        let Spec = this.cache.TryGetAllCharacterSpecs(Player)
        packet.WriteDouble(1)
        packet.WriteDouble(Spec.Id)
        packet.WriteString(Spec.Name)
        packet.WriteString(Spec.Description)
        packet.WriteDouble(Spec.Active ? 1: 0)
        packet.WriteDouble(Spec.SpellIconId)
        packet.WriteDouble(Spec.SpecTabId)

        packet.WriteDouble(Spec.PointsSpent.get_length())
        Spec.PointsSpent.forEach((Tab, Amount) => {
            packet.WriteDouble(Tab)
            packet.WriteDouble(Amount)
        })

        packet.WriteDouble(TALENT_POINT_TYPES.length)
        TALENT_POINT_TYPES.forEach((Type) => {
            let Points = Player.GetObject(`CharacterPoints:${Type}`, PointsMgr.LoadByType(Player, Type))
            packet.WriteDouble(Type)
            packet.WriteDouble(Points.Sum)
            packet.WriteDouble(Points.Max)
            packet.WriteDouble(Points.Unlocked)
            packet.WriteDouble(Points.Max)
        })

        packet.SendToPlayer(Player)
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