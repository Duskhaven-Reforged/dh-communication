import { ClientCallbackOperations, SimpleMessagePayload } from '../../shared/Messages';
import { ACOUNT_WIDE_KEY, DHCharacterPoint, DHCharacterTalent, DHNodeType, DHPlayerLoadout, DHPlayerSpec, DHPointType, DHTalent, DHTalentTab, DHTreeMetaData, TALENT_POINT_TYPES, base64_char } from '../classes';
import { LoadCharacterData, cActiveLoadouts, cCharPoints, cLoadouts, cSpecs } from './dh-chardata';
import { LoadWorldData, wClassNodeToSpell, wRaceClassTabMap, wPointTypeToTabs, wSpecNodeToSpell, wSpellToTab, wTabToSpell, wTalentTrees, wChoiceNodesRev, wTreeMetaData, wClassNodeToClassTree, wChoiceNodes, wDefaultLoadoutStrings, wStarterTalentConditions } from './dh-worlddata';

export class DHCache {
    
    constructor() {
        let RACE_LIST = [ 
            Race.HUMAN, Race.ORC, Race.DWARF, Race.NIGHTELF, Race.UNDEAD_PLAYER, 
            Race.TAUREN, Race.GNOME, Race.TROLL, Race.VULPERA, Race.BLOODELF, Race.DRAENEI, 
            Race.WORGEN, Race.NIGHTBORNE, Race.PANDAREN, Race.VOIDELF, Race.EREDAR, 
            Race.DRACTHYR, Race.ZANDALARI_TROLL, Race.OGRE, Race.DRAENEI_LIGHTFORGED, 
            Race.GOBLIN, Race.NAGA, Race.BROKEN, Race.TUSKARR, Race.FOREST_TROLL, 
            Race.SKELETON, Race.DEMONHUNTERH, Race.ARAKKOA, Race.TAUNKA, Race.FELORC, 
            Race.KULTIRAN, Race.DEMONHUNTERA,
        ]
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

        console.log('Loading `world` data.\n')
        LoadWorldData()
        console.log('Loading `characters` data.\n')
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
                let loadout = wDefaultLoadoutStrings[player.GetClass()][tab.Id]

                let owner = player.GetGUID().GetCounter()
                let plo = new DHPlayerLoadout(1, tab.Id, 'Default', loadout, true)

                cLoadouts[owner][tab.Id][plo.Id] = plo
                cActiveLoadouts[owner][tab.Id] = plo
                this.SavePLO(player, plo)
            })
        }
    }

    public SavePLO(Player: TSPlayer, plo: DHPlayerLoadout) {
        const res = QueryCharacters(`replace into \`character_talent_loadouts\` (\`guid\`, \`id\`, \`talentTabId\`, \`name\`, \`talentString\`, \`active\`) values (${Player.GetGUID().GetCounter()}, ${plo.Id}, ${plo.TabId}, '${plo.Name}', '${plo.TalentString}', ${plo.Active})`)
    }

    LocalTreeMetaData: TSDictionary<uint32, DHTreeMetaData> = CreateDictionary<uint32, DHTreeMetaData>({})
    SimplifiedTreeMap: TSDictionary<uint32, TSDictionary<uint8, TSDictionary<uint8, uint32>>> = CreateDictionary<uint32, TSDictionary<uint8, TSDictionary<uint8, uint32>>>({})
    ToLearn: TSArray<DHCharacterTalent> = CreateArray<DHCharacterTalent>([])
    Unlocks: TSArray<uint32> = CreateArray<uint32>([])
    public TrySaveNewLoadout(Player: TSPlayer, LoadoutString: string) {
        this.LocalTreeMetaData = CreateDictionary<uint32, DHTreeMetaData>({})
        this.SimplifiedTreeMap = CreateDictionary<uint32, TSDictionary<uint8, TSDictionary<uint8, uint32>>>({})
        let ERROR = new SimpleMessagePayload(ClientCallbackOperations.LEARN_TALENT_ERROR, 'Talent learn error: ')
        if (LoadoutString.length > 3 && Player.GetLevel() >= 10) {
            let Spec = this.TryGetCharacterActiveSpec(Player)
            if (!Spec.IsNull()) {
                let TreeBaseData = LoadoutString.substring(0, 3)
                let Type: DHPointType = base64_char.indexOf(TreeBaseData.charAt(0)) - 1
                let PlayerSpec = base64_char.indexOf(TreeBaseData.charAt(1))
                let PlayerClass = base64_char.indexOf(TreeBaseData.charAt(2))
                if (Player.GetClass() === PlayerClass && PlayerSpec === Spec.SpecTabId) {
                    let Tab = this.TryGetTalentTab(Player, PlayerSpec)
                    if (!Tab.IsNull()) {
                        console.log(`${wDefaultLoadoutStrings[PlayerClass][PlayerSpec]} === ${LoadoutString}`)
                        let Ranks = LoadoutString.substring(3)
                        let ClassMap = wClassNodeToSpell[Player.GetClassMask()]
                        let SpecMap = wSpecNodeToSpell[PlayerSpec]
                        let TreeLen = wDefaultLoadoutStrings[PlayerClass][PlayerSpec].length - 3
                        if (TreeLen === Ranks.length) {
                            let TabId = 0
                            let SpellId = 0
                            for (let c = 0; c < TreeLen; c++) {
                                let RankChar: string = Ranks.charAt(c)
                                let TreeIndex = TreeLen - SpecMap.get_length()
                                if (c >= TreeIndex) {
                                    TabId = PlayerSpec
                                    SpellId = SpecMap[c+1-TreeIndex]
                                } else {
                                    TabId = wClassNodeToClassTree[Player.GetClassMask()]
                                    SpellId = ClassMap[c+1]
                                }
                                if (wTreeMetaData.contains(TabId) ) {
                                    this.LocalTreeMetaData[TabId] = wTreeMetaData[TabId]
                                } else {
                                    ERROR.message += `Unknown tab: ${TabId}`
                                    ERROR.write().SendToPlayer(Player)
                                    return
                                }
                                if (wTreeMetaData[TabId].NodeLocation.contains(SpellId)) {
                                    let NodeLoc = wTreeMetaData[TabId].NodeLocation[SpellId]
                                    this.SimplifiedTreeMap[TabId][NodeLoc.Row][NodeLoc.Col] = base64_char.indexOf(RankChar) - 1
                                } else {
                                    ERROR.message += `Unknown spell: ${SpellId}`
                                    ERROR.write().SendToPlayer(Player) 
                                    return
                                }
                            }
                        } else {
                            ERROR.message += 'Malformed talent string - Incorrect number of nodes.'
                            ERROR.write().SendToPlayer(Player)
                            return
                        }
                    } else {
                        ERROR.message += 'Attempting to learn talents for nonexistent spec.'
                        ERROR.write().SendToPlayer(Player)
                        return
                    }

                    let Verified = this.VerifyFlatTable(Player, Tab)
                    if (Verified) {
                        this.ForgetTalents(Player, Spec, 0)
                        let Tabs = CreateArray<uint32>([])
                        this.ToLearn.forEach((Talent) => {
                            if (!Tabs.includes(Talent.TabId)) {
                                Tabs.push(Talent.TabId)
                            }

                            let ChoiceNode = Talent.Type === CustomNodeType.CHOICE
                            Spec.Talents[Talent.TabId][Talent.SpellId] = Talent
                            if (Talent.CurrentRank > 0) {
                                let TTab = this.TryGetTalentTab(Player, Talent.TabId)
                                let Points = this.GetSpecPoints(Player, TTab.TalentType)
                                if (!Talent.Starter) {
                                    Spec.PointsSpent[Talent.TabId] += Talent.CurrentRank * TTab.Talents[Talent.SpellId].RankCost
                                    Points.Sum -= Talent.CurrentRank * TTab.Talents[Talent.SpellId].RankCost
                                }
                                TTab.Talents[Talent.SpellId].UnlearnSpells.forEach((UnlearnSpellId) => {
                                    Player.RemoveSpell(UnlearnSpellId, false, false)
                                })

                                if (!Player.HasSpell(Talent.SpellId)) {
                                    if (ChoiceNode) {
                                        let Choice = wChoiceNodes[Talent.SpellId][Talent.CurrentRank-1]
                                        Player.LearnSpell(Choice)
                                        Spec.ChoiceNodesChosen[Talent.SpellId] = Choice
                                    } else {
                                        let RankedSpell = TTab.Talents[Talent.SpellId].Ranks[Talent.CurrentRank]
                                        Player.LearnSpell(RankedSpell)
                                    }

                                    this.UpdateCharPoints(Player, Points)
                                }
                            }
                        })
                        this.UpdateCharSpec(Player, Spec)
                        let Loadout = cActiveLoadouts[Player.GetGUID().GetCounter()][PlayerSpec]
                        Loadout.TalentString = LoadoutString
                        cLoadouts[Player.GetGUID().GetCounter()][Loadout.TabId][Loadout.Id] = Loadout
                        cActiveLoadouts[Player.GetGUID().GetCounter()][PlayerSpec] = Loadout

                        this.SavePLO(Player, Loadout)
                    } else
                        return

                } else {
                    ERROR.message += `Attempting to learn talents for an improper class (${PlayerClass} ? ${Player.GetClass()}) or spec (${PlayerSpec} ? ${Spec.SpecTabId}).`
                    ERROR.write().SendToPlayer(Player)
                    return
                }
            }
        } else {
            ERROR.message += 'No talent info provided in request and/or your level is too low.'
            ERROR.write().SendToPlayer(Player)
            return
        }
    }

    private VerifyFlatTable(Player: TSPlayer, SpecTab: DHTalentTab) : bool {
        this.ToLearn = CreateArray<DHCharacterTalent>([])
        this.Unlocks = CreateArray<uint32>([])
        if (SpecTab.Classmask == Player.GetClassMask()) {
            let Spend = CreateDictionary<uint32, uint8>({})
            this.SimplifiedTreeMap.forEach((TabId, Rows) => {
                let Tab = this.TryGetTalentTab(Player, TabId)
                let Points = this.GetSpecPoints(Player, Tab.TalentType)
                Rows.forEach((RowId, Cols)=> {
                    Cols.forEach((ColId, Rank) => {
                        if (this.LocalTreeMetaData.contains(TabId)) {
                            let Meta = this.LocalTreeMetaData[TabId]
                            if (RowId > Meta.MaxYDim || ColId > Meta.MaxXDim)
                                return false
                            else {
                                if (Meta.Nodes.contains(RowId)) {
                                    if (Meta.Nodes[RowId].contains(ColId)) {
                                        let Node = Meta.Nodes[RowId][ColId]
                                        if (Tab.Talents.contains(Node.SpellId)) {
                                            let Talent = Tab.Talents[Node.SpellId]
                                            let Starter = this.IsStarter(Player, Talent)
                                            let ChoiceNode = Talent.NodeType === CustomNodeType.CHOICE
                                            if (Rank > 0) {
                                                if (ChoiceNode) {
                                                    if (!wChoiceNodes.contains(Node.SpellId))
                                                        return false
                                                } else if (Talent.NumberOfRanks < Rank - 1) {
                                                    return false
                                                }
                                                if (Talent.Prereqs.length) {
                                                    if (!this.Unlocks.includes(Node.SpellId))
                                                        return false
                                                }

                                                if (Talent.RequiredLevel > Player.GetLevel() || Node.PointReq >> Spend[TabId])
                                                    return false

                                                if (!Starter) {
                                                    Spend[TabId] += ChoiceNode ? Talent.RankCost : Rank - 1 * Talent.RankCost
                                                    if (Spend[Tab.Id] > Points.Max)
                                                        return false;
                                                }

                                                Node.Unlocks.forEach((Unlock) => {
                                                    this.Unlocks.push(Unlock.SpellId)
                                                })
                                            }
                                            let CharacterTalent =  new DHCharacterTalent(Talent.SpellId, TabId, Rank, Starter)
                                            CharacterTalent.Type = Talent.NodeType
                                            this.ToLearn.push(CharacterTalent)
                                        }
                                    }
                                }
                            }
                        }
                    })
                })
            })

            return true
        }
        return false
    }

    public IsStarter(Player: TSPlayer, Talent: DHTalent) : bool {
        let Spec : uint32 = Player.GetUInt(`Spec`)
        return Talent.Starter.includes(Spec)
    }

    public ActivateSpec(Player: TSPlayer, Spec: number) {
        const ACTIVATE_SPEC_SPELL = 63645
        let ERROR = new SimpleMessagePayload(ClientCallbackOperations.ACTIVATE_SPEC_ERROR, 'Spec Activation Error: ')
        if (!Player.IsInCombat() && !Player.IsDead()) {
            let ClientCallback = new SimpleMessagePayload(ClientCallbackOperations.ACTIVATE_CLASS_SPEC, 'Show')
            ClientCallback.write().SendToPlayer(Player)

            Player.SetUInt(`SpecActivation`, Spec)
            Player.CastSpell(Player, ACTIVATE_SPEC_SPELL)
        } else {
            ERROR.message += `Now isn't the time for that.`
            ERROR.write().SendToPlayer(Player)
            return
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

    public TryGetAllCharacterSpecs(player: TSPlayer) : DHPlayerSpec {
        let out : TSArray<DHPlayerSpec> = CreateArray<DHPlayerSpec>([])
        let guid = player.GetGUID().GetCounter()
        return cSpecs[guid]
    }

    public TryGetCharacterActiveSpec(player: TSPlayer) : DHPlayerSpec {
        let guid = player.GetGUID().GetCounter()
        
        return cSpecs[guid]
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

    public GetSpecPoints(player: TSPlayer, pointType: DHPointType, spec: uint8 = 1) : DHCharacterPoint {
        let guid = player.GetGUID().GetCounter()
        if (cCharPoints.contains(guid)) {
            if (cCharPoints[guid].contains(pointType)) {
                if (cCharPoints[guid][pointType].contains(spec))
                    return cCharPoints[guid][pointType][spec]
            }
        }

        let fcp = new DHCharacterPoint(pointType, spec, 0, 25)
        return this.UpdateCharPoints(player, fcp)
    }

    public UpdateCharPoints(player: TSPlayer, point: DHCharacterPoint) {
        let guid = player.GetGUID().GetCounter()

        cCharPoints[guid][point.Type][point.SpecId] = point

        const res = QueryCharacters('REPLACE INTO `character_points` (`guid`,`type`,`spec`,`sum`,`max`) VALUES ('+guid+','+point.Type+','+point.SpecId+','+point.Sum+','+point.Max+')')
        return point
    }

    public UpdateCharSpec(player: TSPlayer, spec: DHPlayerSpec) {
        let owner = player.GetGUID().GetCounter()
        
        cSpecs[owner] = spec
        this.SaveSpec(spec)
    }

    public AddCharacterPointsToAllSpecs(player: TSPlayer, type: DHPointType, amount: int) {
        let m = this.GetMaxPointDefaults(type)

        if (amount > 0) {
            let spec = cSpecs[player.GetGUID().GetCounter()]
            let sp = this.GetSpecPoints(player, type, spec.Id)
            if (sp.Sum < m.Max) {
                let NewAmount = sp.Sum + amount
                if (NewAmount > m.Max)
                    amount = m.Max - sp.Sum

                sp.Max += amount
                sp.Sum += amount
                this.UpdateCharPoints(player, sp)

                let pkt = new SimpleMessagePayload(ClientCallbackOperations.LEVELUP, `|cff8FCE00You have been awarded ${amount} ${GetPointTypeName(type)} point${amount > 1 ? 's' : ''}.`);
                pkt.write().SendToPlayer(player)
            }
        }
    }

    public SaveSpec(spec: DHPlayerSpec) {
        let guid = spec.CharGuid

        const res = QueryCharacters('REPLACE INTO `character_specs` (`id`,`guid`,`name`,`description`,`active`,`spellicon`,`visability`,`charSpec`) VALUES ('+spec.Id+','+guid+',\''+spec.Name+'\',\''+spec.Description+'\','+spec.Active+','+spec.SpellIconId+',1,'+spec.SpecTabId+')')

        spec.PointsSpent.forEach((key, val) => {
            const res = QueryCharacters('REPLACE INTO character_talents_spent(`guid`,`spec`,`tabid`,`spent`) VALUES('+guid+', '+spec.Id+', '+key+', '+val+')')
        })
        spec.Talents.forEach((tab, talents) => {
            talents.forEach((spellId, talent) => {
                this.SaveTalent(guid, spec.Id, talent)
            })
        })
    }

    public SaveTalent(guid: number, specId: number, talent: DHCharacterTalent) {
        QueryCharacters('REPLACE INTO `character_talents` (`guid`,`spec`,`spellid`,`tabId`,`currentrank`) VALUES ('+guid+','+specId+','+talent.SpellId+','+talent.TabId+','+talent.CurrentRank+')')
    }

    public GetMaxPointDefaults(type: DHPointType) : DHCharacterPoint {
        return new DHCharacterPoint(type, 4294967295, 0, 25)
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
                    return wTalentTrees[tab]
                }
        }

        return DHTalentTab.Empty()
    }

    public CreateBaseSpec(player: TSPlayer) {
        let spec = new DHPlayerSpec(player.GetGUID().GetCounter(), 1, 'Base', 'Base spec used for everything', true, 133743, 1)
        let tabs = this.TryGetCustomTalentTabs(player, DHPointType.TALENT)
        let LowestSpecId = 65
        if (tabs.length) {
            tabs.forEach((tab) => {
                if (tab.Id < LowestSpecId)
                    LowestSpecId = tab.Id

                tab.Talents.forEach((spell, talent) => {
                    let newTalent = new DHCharacterTalent(talent.SpellId, tab.Id, 0, this.IsStarter(player, talent))
                    newTalent.Type = talent.NodeType
                    spec.Talents[tab.Id][newTalent.SpellId] = newTalent
                })
            })
        }
        spec.SpecTabId = LowestSpecId

        tabs = this.TryGetCustomTalentTabs(player, DHPointType.CLASS)
        if (tabs.length) {
            tabs.forEach((tab) => {
                tab.Talents.forEach((spell, talent) => {
                    let newTalent = new DHCharacterTalent(talent.SpellId, tab.Id, 0, this.IsStarter(player, talent))
                    newTalent.Type = talent.NodeType
                    spec.Talents[tab.Id][newTalent.SpellId] = newTalent
                })
            })
        }

        TALENT_POINT_TYPES.forEach((type) => {
            let fpt = this.GetSpecPoints(player, type)
            let maxP = this.GetMaxPointDefaults(type)

            let newPoint = new DHCharacterPoint(type, spec.Id, fpt.Sum, maxP.Max)
            this.UpdateCharPoints(player, newPoint)
        })

        this.UpdateCharSpec(player, spec)
    }

    public HandleDeleteCharacter(guid: uint64) {
        QueryCharactersAsync(`DELETE FROM character_specs WHERE guid = ${guid}`)
        QueryCharactersAsync(`DELETE FROM character_points WHERE guid = ${guid} AND spec != ${ACOUNT_WIDE_KEY}`)
        QueryCharactersAsync(`DELETE FROM character_talents WHERE guid = ${guid} AND spec != ${ACOUNT_WIDE_KEY}`)
        QueryCharactersAsync(`DELETE FROM character_talents_spent WHERE guid = ${guid} AND spec != ${ACOUNT_WIDE_KEY}`)
        QueryCharactersAsync(`DELETE FROM character_talent_loadouts where guid = ${guid}`)
    }

    public ForgetTalents(player: TSPlayer, spec: DHPlayerSpec, type: DHPointType) {
        let tabs = this.TryGetCustomTalentTabs(player, type)
        tabs.forEach((tab) => {
            tab.Talents.forEach((spellId, talent) => {
                if (!this.IsStarter(player, talent)) {
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
                }
            })
        })
        this.UpdateCharSpec(player, spec)

        let fcp = this.GetSpecPoints(player, type, spec.Id)
        let amount = 0
        let level = player.GetLevel()
        if (level > 9)
            level -= 10

        amount = Math.floor(level/2)
        let IsTalentPoint = type === DHPointType.TALENT && (level % 2) > 0
        if (IsTalentPoint)
            amount += 1;

        fcp.Max = amount
        fcp.Sum = amount
        this.UpdateCharPoints(player, fcp)
        if (type === DHPointType.TALENT)
            this.ForgetTalents(player, spec, DHPointType.CLASS)
    }
}

function GetPointTypeName(Type: DHPointType): string {
    switch (Type) {
        case DHPointType.CLASS:
            return 'Class'
        case DHPointType.TALENT:
            return 'Specialization'
        default:
            return ''
        }
}
