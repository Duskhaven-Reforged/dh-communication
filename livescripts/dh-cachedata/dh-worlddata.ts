import { DHNodeMetaData, DHPointType, DHTalent, DHTalentChoice, DHTalentPrereq, DHTalentTab, DHTreeMetaData } from "../classes"

/* Cache tables */
export let wTreeMetaData: TSDictionary<uint32, DHTreeMetaData> = CreateDictionary<uint32, DHTreeMetaData>({})
export let wSpecNodeToSpell: TSDictionary<uint32, TSDictionary<uint8, uint32>> = CreateDictionary<uint32, TSDictionary<uint8, uint32>>({})
export let wClassNodeToSpell: TSDictionary<uint32, TSDictionary<uint8, uint32>> = CreateDictionary<uint32, TSDictionary<uint8, uint32>>({})
export let wPointTypeToTabs: TSDictionary<uint8, TSArray<uint32>> = CreateDictionary<uint8, TSArray<uint32>>({})
export let wRaceClassTabMap: TSDictionary<uint32, TSDictionary<uint32, TSArray<uint32>>> = CreateDictionary<uint32, TSDictionary<uint32, TSArray<uint32>>>({})
export let wClassLevelSpells: TSDictionary<uint8, TSDictionary<uint32, TSDictionary<uint8, TSArray<uint32>>>> = CreateDictionary<uint8, TSDictionary<uint32, TSDictionary<uint8, TSArray<uint32>>>>({})
export let wSpellLearnAdditionalSpells: TSDictionary<uint32, TSArray<uint32>> = CreateDictionary<uint32, TSArray<uint32>>({})
export let wClassFirstSpec: TSDictionary<uint32, uint32> = CreateDictionary<uint32, uint32>({})
export let wClassNodeToClassTree: TSDictionary<uint32, uint32> = CreateDictionary<uint32, uint32>({})
export let wTalentTrees: TSDictionary<uint32, DHTalentTab> = CreateDictionary<uint32, DHTalentTab>({})
export let wChoiceNodes: TSDictionary<uint32, TSArray<uint32>> = CreateDictionary<uint32, TSArray<uint32>>({})
export let wChoiceNodesRev: TSDictionary<uint32, uint32> = CreateDictionary<uint32, uint32>({})
export let wChoiceNodeIndexLookup: TSDictionary<uint8, uint32> = CreateDictionary<uint8, uint32>({})
export let wSpellToTab: TSDictionary<uint32, uint32> = CreateDictionary<uint32, uint32>({})
export let wTabToSpell: TSDictionary<uint32, uint32> = CreateDictionary<uint32, uint32>({})

export function LoadWorldData() {
    console.log("\tLoading class level spell map...\n")
    console.log(new PlayerClassLevelSpells().Load())

    console.log("\tLoading talent additional spells...\n")
    console.log(new SpellLearnAdditionalSpells().Load())

    console.log("\tLoading talent trees...\n")
    console.log(new CustomTalentTabs().Load())

    console.log("\tLoading talents into trees...\n")
    console.log(new CustomTalents().Load())

    console.log("\tLoading talent prereqs...\n")
    console.log(new CustomTalentPrereqs().Load())

    console.log("\tLoad talent choice nodes...\n")
    console.log(new ChoiceNodes().Load())

    console.log("\tLoading talent ranks...\n")
    console.log(new CustomTalentRanks().Load())

    console.log("\tLoading talent spell unlearns...\n")
    console.log(new CustomTalentUnlearns().Load())
}

class PlayerClassLevelSpells {
    Load() : string {
        let count = 0
        const res = QueryWorld('select * from `forge_character_spec_spells` order by `class` asc, `race` asc, `level` asc, `spell` asc')
        while (res.GetRow()) {
            let pClass = res.GetUInt8(0)
            let race = res.GetUInt32(1)
            let level = res.GetUInt8(2)
            let spell = res.GetUInt32(3)

            wClassLevelSpells[pClass][race][level].push(spell)
            count++
        }

        return `\t\tLoaded ${count} entries.\n`
    }
}

class SpellLearnAdditionalSpells {
    Load() : string {
        let count = 0
        const res = QueryWorld('SELECT * FROM `forge_talent_learn_additional_spell`')
        while (res.GetRow()) {
            let rootSpell = res.GetUInt32(0)
            let addon = res.GetUInt32(1)

            wSpellLearnAdditionalSpells[rootSpell].push(addon)
            count++
        }

        return `\t\tLoaded ${count} entries.\n`
    }
}

class CustomTalentTabs {
    Load() : string {
        let count = 0

        const res = QueryWorld('select * from `forge_talent_tabs` order by `id` asc')
        while (res.GetRow()) {
            let id = res.GetUInt32(0)
            let classMask = res.GetUInt32(1)
            let raceMask = res.GetUInt32(2)
            let name = res.GetString(3)
            let spellIconId = res.GetUInt32(4)
            let background = res.GetString(5)
            let description = res.GetString(6)
            let role = res.GetUInt8(7)
            let spellString = res.GetString(8)
            let talentType = res.GetUInt8(9)
            let tabIndex = res.GetUInt32(10)
            
            let tab = new DHTalentTab(id, classMask, raceMask, name, spellIconId, background, description, role, spellString, talentType, tabIndex)

            if (!wClassFirstSpec.contains(classMask))
                wClassFirstSpec[classMask] = id

            if (tab.TalentType === DHPointType.CLASS) {
                wClassNodeToSpell[tab.Classmask] = CreateDictionary<uint8, uint32>({})
                wClassNodeToClassTree[tab.Classmask] = tab.Id;
            }

            wRaceClassTabMap.forEach((race, classMap) => {
                let rBit = (tab.Racemask & (1 << (race - 1)))

                if (tab.Racemask !== 0 && rBit === 0)
                    return

                classMap.forEach((wClass, tabs) => {
                    let cBit = (tab.Classmask & (1 << (wClass - 1)))
                    if (cBit !== 0 || tab.Classmask === 0) {
                        wRaceClassTabMap[race][wClass].push(tab.Id)
                        wPointTypeToTabs[tab.TalentType].push(tab.Id)
                    }
                })
            })

            wTalentTrees[tab.Id] = tab;
            count++
        }

        return `\t\tLoaded ${count} entries.\n`
    }
}

class CustomTalents {
    Load() : string {
        let i = 1
        let prevTab = -1
        let count = 0

        const res = QueryWorld('SELECT * FROM `forge_talents` order by `talentTabId` asc, `rowIndex` asc, `columnIndex` asc')
        while (res.GetRow()) {
            let SpellId = res.GetUInt32(0)
            let TalentTabId = res.GetUInt32(1)
            let ColumnIndex = res.GetUInt8(2)
            let RowIndex = res.GetUInt8(3)
            let RankCost = res.GetUInt8(4)
            let RequiredLevel = res.GetUInt8(5)
            let TalentType = res.GetUInt8(6)
            let NumberOfRanks = res.GetUInt8(7)
            let PreReqType = res.GetUInt8(8)
            let TabPointReq = res.GetUInt8(9)
            let NodeType = res.GetUInt8(10)

            if (prevTab !== TalentTabId) {
                prevTab = TalentTabId
                i = 1
            }
            let NodeIndex = i++;
            let talent = new DHTalent(SpellId, TalentTabId, ColumnIndex, RowIndex, RankCost, TabPointReq, RequiredLevel, TalentType, NodeType, NodeIndex, NumberOfRanks, PreReqType)
            
            if (wTalentTrees.contains(talent.TalentTabId)) {
                let tab = wTalentTrees[talent.TalentTabId]
                if (talent.TalentType === DHPointType.CLASS)
                    wSpecNodeToSpell[talent.TalentTabId][talent.NodeIndex] = talent.SpellId
                else {
                    wClassNodeToSpell[tab.Classmask][talent.NodeIndex] = talent.SpellId
                }

                wTalentTrees[talent.TalentTabId].Talents[talent.SpellId] = talent
                if (!wTreeMetaData.contains(talent.TalentTabId)) {
                    let treeMeta = new DHTreeMetaData(talent.TalentTabId, talent.ColumnIndex, talent.RowIndex)
                    wTreeMetaData[talent.TalentTabId] = treeMeta
                } else {
                    let found = wTreeMetaData[talent.TalentTabId]
                    if (talent.RowIndex > found.MaxYDim)
                        wTreeMetaData[talent.TalentTabId].MaxYDim = talent.RowIndex
                    if (talent.ColumnIndex > found.MaxXDim)
                        wTreeMetaData[talent.TalentTabId].MaxXDim = talent.ColumnIndex
                }

                let nodeMeta = new DHNodeMetaData(talent.SpellId, talent.TabPointReq, talent.ColumnIndex, talent.RowIndex, talent.NodeIndex)
                wTreeMetaData[talent.TalentTabId].Nodes[nodeMeta.Row][nodeMeta.Col] = nodeMeta
                wTreeMetaData[talent.TalentTabId].NodeLocation[nodeMeta.SpellId] = nodeMeta

                wSpellToTab[SpellId] = TalentTabId
                wTabToSpell[TalentTabId] = SpellId

                count++
            }
        }
        return `\t\tLoaded ${count} entries.\n`
    }
}

class CustomTalentPrereqs {
    Load() : string {
        let count = 0;

        const res = QueryWorld('SELECT * FROM `forge_talent_prereq`')
        while (res.GetRow()) {
            let Id = res.GetUInt32(0)
            let ReqSpellId = res.GetUInt32(1)
            let ReqSpellTab = res.GetUInt32(2)
            let Talent = res.GetUInt32(3)
            let TalentTabId = res.GetUInt32(4)
            let RequiredRank = res.GetUInt32(5)

            let prereq = new DHTalentPrereq(TalentTabId, Talent, Id, RequiredRank)
            if (wTalentTrees.contains(ReqSpellTab)) {
                if (wTalentTrees[ReqSpellTab].Talents.contains(ReqSpellId)) {
                    wTalentTrees[ReqSpellTab].Talents[ReqSpellId].Prereqs.push(prereq)
                
                    if (wTreeMetaData.contains(ReqSpellTab)) {
                        let node = wTreeMetaData[ReqSpellTab].NodeLocation[prereq.Talent]
                        node.Unlocks.push(wTreeMetaData[ReqSpellTab].NodeLocation[ReqSpellId])
                        wTreeMetaData[ReqSpellTab].NodeLocation[prereq.Talent] = node
                        wTreeMetaData[ReqSpellTab].Nodes[node.Row][node.Col] = node
                    
                        count++
                    }
                }
            }
        }

        return `\t\tLoaded ${count} entries.\n`
    }
}

class ChoiceNodes {
    Load() : string {
        let count = 0;

        const res = QueryWorld('SELECT * FROM `forge_talent_choice_nodes`')
        while (res.GetRow()) {
            let ChoiceId = res.GetUInt32(0)
            let TalentTabId = res.GetUInt32(1)
            let ChoiceIndex = res.GetUInt8(2)
            let SpellChoice = res.GetUInt32(3)

            let choice = new DHTalentChoice(SpellChoice, false)
            wChoiceNodes[ChoiceId].push(SpellChoice)
            wChoiceNodesRev[SpellChoice] = ChoiceId
            wChoiceNodeIndexLookup[ChoiceIndex] = SpellChoice
            
            wTalentTrees[TalentTabId].Talents[ChoiceId].Choices[ChoiceIndex] = choice
            count++
        }

        return `\t\tLoaded ${count} entries.\n`
    }
}

class CustomTalentRanks {
    Load() : string {
        let count = 0;

        const res = QueryWorld('SELECT * FROM `forge_talent_ranks`')
        while (res.GetRow()) {
            let TalentSpellId = res.GetUInt32(0)
            let TalentTabId = res.GetUInt32(1)
            let Rank = res.GetUInt32(2)
            let SpellId = res.GetUInt32(3)

            if (wTalentTrees.contains(TalentTabId)) {
                if (wTalentTrees[TalentTabId].Talents.contains(TalentSpellId)) {
                    wTalentTrees[TalentTabId].Talents[TalentSpellId].Ranks[Rank] = SpellId
                    wTalentTrees[TalentTabId].Talents[TalentSpellId].RanksRev[SpellId] = Rank
                    count++
                }
            }
        }

        return `\t\tLoaded ${count} entries.\n`
    }
}

class CustomTalentUnlearns {
    Load() : string {
        let count = 0;

        const res = QueryWorld('SELECT * FROM `forge_talent_unlearn`')
        while (res.GetRow()) {
            let SpellId = res.GetUInt32(0)
            let TalentTabId = res.GetUInt32(1)
            let UnlearnedSpellId = res.GetUInt32(2)

            if (wTalentTrees.contains(TalentTabId)) {
                if (wTalentTrees[TalentTabId].Talents.contains(SpellId)) {
                    wTalentTrees[TalentTabId].Talents[SpellId].UnlearnSpells.push(UnlearnedSpellId)
                    count++
                }
            }
        }

        return `\t\tLoaded ${count} entries.\n`
    }
}