import { ReloadDKBloodTree } from "../TalentTrees/DeathKnight/Blood"
import { ReloadDKFrostTree } from "../TalentTrees/DeathKnight/Frost"
import { ReloadDKUnholyTree } from "../TalentTrees/DeathKnight/Unholy"
import { ReloadDKTree } from "../TalentTrees/DeathKnight/deathknight"
import { ReloadBalDruidTree } from "../TalentTrees/Druid/Balance"
import { ReloadFeralDruidTree } from "../TalentTrees/Druid/Feral"
import { ReloadGuardDruidTree } from "../TalentTrees/Druid/Guardian"
import { ReloadRestoDruidTree } from "../TalentTrees/Druid/Restoration"
import { ReloadDruidTree } from "../TalentTrees/Druid/druid"
import { ReloadMageArcaneTree } from "../TalentTrees/Mage/Arcane"
import { ReloadMageFireTree } from "../TalentTrees/Mage/Fire"
import { ReloadMageFrostTree } from "../TalentTrees/Mage/Frost"
import { ReloadMageTree } from "../TalentTrees/Mage/mage"
import { ReloadPalHolyTree } from "../TalentTrees/Paladin/Holy"
import { ReloadPalProtTree } from "../TalentTrees/Paladin/Protection"
import { ReloadPalRetTree } from "../TalentTrees/Paladin/Retribution"
import { ReloadPalTree } from "../TalentTrees/Paladin/paladin"
import { ReloadDiscPriestTree } from "../TalentTrees/Priest/Discipline"
import { ReloadHPriestTree } from "../TalentTrees/Priest/Holy"
import { ReloadInqPriestTree } from "../TalentTrees/Priest/Inquisition"
import { ReloadShaPriestTree } from "../TalentTrees/Priest/Shadow"
import { ReloadPriestTree } from "../TalentTrees/Priest/priest"
import { ReloadRogueAssTree } from "../TalentTrees/Rogue/Assassination"
import { ReloadRogueCorsairTree } from "../TalentTrees/Rogue/Corsair"
import { ReloadRogueSubTree } from "../TalentTrees/Rogue/Subtlety"
import { ReloadRogueTree } from "../TalentTrees/Rogue/rogue"
import { ReloadShamanEleTree } from "../TalentTrees/Shaman/Elemental"
import { ReloadShamanEnhTree } from "../TalentTrees/Shaman/Enhancement"
import { ReloadShamanRestoTree } from "../TalentTrees/Shaman/Restoration"
import { ReloadShamanWatcherTree } from "../TalentTrees/Shaman/Watcher"
import { ReloadShamanTree } from "../TalentTrees/Shaman/shaman"
import { ReloadAffLockTree } from "../TalentTrees/Warlock/Affliction"
import { ReloadDemoLockTree } from "../TalentTrees/Warlock/Demonology"
import { ReloadDestLockTree } from "../TalentTrees/Warlock/Destruction"
import { ReloadWarlockTree } from "../TalentTrees/Warlock/warlock" 
import { ReloadWarriorArmsTree } from "../TalentTrees/Warrior/Arms"
import { ReloadWarriorFuryTree } from "../TalentTrees/Warrior/Fury"
import { ReloadWarriorProtTree } from "../TalentTrees/Warrior/Protection"
import { ReloadWarriorTree } from "../TalentTrees/Warrior/warrior"
import { DHNodeMetaData, DHPointType, DHTalent, DHTalentChoice, DHTalentPrereq, DHTalentTab, DHTreeMetaData, base64_char } from "../classes"

/* Cache tables */
export let wTreeMetaData: TSDictionary<uint32, DHTreeMetaData> = CreateDictionary<uint32, DHTreeMetaData>({})
export let wSpecNodeToSpell: TSDictionary<uint32, TSDictionary<uint8, uint32>> = CreateDictionary<uint32, TSDictionary<uint8, uint32>>({})
export let wClassNodeToSpell: TSDictionary<uint32, TSDictionary<uint8, uint32>> = CreateDictionary<uint32, TSDictionary<uint8, uint32>>({})
export let wPointTypeToTabs: TSDictionary<uint8, TSArray<uint32>> = CreateDictionary<uint8, TSArray<uint32>>({})
export let wRaceClassTabMap: TSDictionary<uint32, TSDictionary<uint32, TSArray<uint32>>> = CreateDictionary<uint32, TSDictionary<uint32, TSArray<uint32>>>({})
export let wSpecAutolearn: TSDictionary<uint8, TSDictionary<uint8, TSDictionary<uint8, TSArray<uint32>>>> = CreateDictionary<uint8, TSDictionary<uint8, TSDictionary<uint8, TSArray<uint32>>>>({})
export let wSpellLearnAdditionalSpells: TSDictionary<uint32, TSArray<uint32>> = CreateDictionary<uint32, TSArray<uint32>>({})
export let wClassFirstSpec: TSDictionary<uint32, uint32> = CreateDictionary<uint32, uint32>({})
export let wClassNodeToClassTree: TSDictionary<uint32, uint32> = CreateDictionary<uint32, uint32>({})
export let wTalentTrees: TSDictionary<uint32, DHTalentTab> = CreateDictionary<uint32, DHTalentTab>({})
export let wChoiceNodes: TSDictionary<uint32, TSArray<uint32>> = CreateDictionary<uint32, TSArray<uint32>>({})
export let wChoiceNodesRev: TSDictionary<uint32, uint32> = CreateDictionary<uint32, uint32>({})
export let wChoiceNodeIndexLookup: TSDictionary<uint8, uint32> = CreateDictionary<uint8, uint32>({})
export let wSpellToTab: TSDictionary<uint32, uint32> = CreateDictionary<uint32, uint32>({})
export let wTabToSpell: TSDictionary<uint32, uint32> = CreateDictionary<uint32, uint32>({})
export let wDefaultLoadoutStrings: TSDictionary<uint32, TSDictionary<uint32, string>> = CreateDictionary<uint32, TSDictionary<uint32, string>>({})
export let wStartersForTabs: TSDictionary<uint64, TSArray<uint32>> = CreateDictionary<uint64, TSArray<uint32>>({})

export function LoadWorldData() {
    console.log(`\tLoading talent trees...\n`) 
    RefillTrees(0x7fffffff)

    console.log("\tLoading class level spell map...\n")
    console.log(new SpecAutolearn().Load())

    console.log("\tLoading talent additional spells...\n")
    console.log(new SpellLearnAdditionalSpells().Load())

    console.log("\tLoading talent trees...\n")
    console.log(new CustomTalentTabs().Load())

    console.log("\tLoading talents into trees...\n")
    console.log(new CustomTalents().Load())

    console.log("\tLoading default talent strings...\n")
    console.log(new DefaultTalentStrings().Load())

    console.log("\tLoading talent prereqs...\n")
    console.log(new CustomTalentPrereqs().Load())

    console.log("\tLoad talent choice nodes...\n")
    console.log(new ChoiceNodeChoices().Load())

    console.log("\tLoading talent ranks...\n")
    console.log(new CustomTalentRanks().Load())

    console.log("\tLoading talent spell unlearns...\n")
    console.log(new CustomTalentUnlearns().Load())
}

export function RefillTrees(ClassMask: uint32) {
    if (ClassMask & (1 << Class.WARRIOR)) {
        ReloadWarriorTree()
        ReloadWarriorArmsTree()
        ReloadWarriorFuryTree()
        ReloadWarriorProtTree()
    }
    if (ClassMask & (1 << Class.PALADIN)) {
        ReloadPalTree()
        ReloadPalHolyTree()
        ReloadPalProtTree()
        ReloadPalRetTree()
    }
    if (ClassMask & (1 << Class.HUNTER)) {}
    if (ClassMask & (1 << Class.ROGUE)) {
        ReloadRogueTree()
        ReloadRogueAssTree()
        ReloadRogueCorsairTree()
        ReloadRogueSubTree()
    }
    if (ClassMask & (1 << Class.PRIEST)) {
        ReloadPriestTree()
        ReloadDiscPriestTree()
        ReloadHPriestTree()
        ReloadInqPriestTree()
        ReloadShaPriestTree()
    }
    if (ClassMask & (1 << Class.DEATH_KNIGHT)) {
        ReloadDKTree()
        ReloadDKBloodTree()
        ReloadDKFrostTree()
        ReloadDKUnholyTree()
    }
    if (ClassMask & (1 << Class.SHAMAN)) {
        ReloadShamanTree()
        ReloadShamanEleTree()
        ReloadShamanEnhTree()
        ReloadShamanRestoTree()
        ReloadShamanWatcherTree()
    }
    if (ClassMask & (1 << Class.MAGE)) {
        ReloadMageTree()
        ReloadMageFrostTree()
        ReloadMageFireTree()
        ReloadMageArcaneTree()
    }
    if (ClassMask & (1 << Class.WARLOCK)) {
        ReloadWarlockTree()
        ReloadAffLockTree()
        ReloadDemoLockTree()
        ReloadDestLockTree()
    }
    if (ClassMask & (1 << Class.DRUID)) {
        ReloadDruidTree()
        ReloadBalDruidTree()
        ReloadFeralDruidTree()
        ReloadGuardDruidTree()
        ReloadRestoDruidTree()
    }
}

class SpecAutolearn {
    Load() : string {
        let count = 0
        const res = QueryWorld('select * from `character_spec_autolearn` order by `class` asc, `spec` asc, `level` asc, `spell` asc')
        while (res.GetRow()) {
            let pClass = res.GetUInt8(0)
            let spec = res.GetUInt8(1)
            let level = res.GetUInt8(2)
            let spell = res.GetUInt32(3)

            wSpecAutolearn[pClass][spec][level].push(spell)
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
                let raceFlag = (1 << (race - 1))
                let rBit = (tab.Racemask & raceFlag)

                if (tab.Racemask !== 0 && rBit === 0)
                    return

                classMap.forEach((wClass, tabs) => {
                    let classFlag = (1 << (wClass - 1))
                    let cBit = (tab.Classmask & classFlag)
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
            let StarterMask : uint64 = res.GetUInt64(11)

            if (prevTab !== TalentTabId) {
                prevTab = TalentTabId
                i = 1
            }
    
            let NodeIndex = i++;

            let StarterTabs : TSArray<uint8> = CreateArray<uint8>([])

            wTalentTrees.forEach((TabId : uint8, b) => {
                if (StarterMask & (1 << (TabId-1))) {
                    StarterTabs.push(TabId)
                    wStartersForTabs[TabId].push(SpellId)
                }
            })

            let talent = new DHTalent(SpellId, TalentTabId, ColumnIndex, RowIndex, RankCost, TabPointReq, RequiredLevel, TalentType, NodeType, NodeIndex, NumberOfRanks, PreReqType, StarterTabs)
            
            if (wTalentTrees.contains(talent.TalentTabId)) {
                let tab = wTalentTrees[talent.TalentTabId]
                if (talent.TalentType === DHPointType.CLASS)
                    wClassNodeToSpell[tab.Classmask][talent.NodeIndex] = talent.SpellId
                else {
                    wSpecNodeToSpell[talent.TalentTabId][talent.NodeIndex] = talent.SpellId
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

                let nodeMeta = new DHNodeMetaData(talent.SpellId, talent.RowIndex, talent.ColumnIndex, talent.TabPointReq, talent.NodeIndex)
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

class DefaultTalentStrings {
    Load () : string {
        let count = 0

        let ClassTabs: TSDictionary<uint32, uint32> = CreateDictionary<uint32, uint32>({
            14:64, 13:63, 12:62, 11:61, 10:60, 9:59, 8:58, 7:57, 6:56, 5:55, 4:54, 3:53, 2:52, 1:51
        })

        let Specs: TSDictionary<uint32, TSArray<uint32>> = CreateDictionary<uint32, TSArray<uint32>>({
            51 : CreateArray<uint32>([1, 2, 3]),  52 : CreateArray<uint32>([4, 5, 6]),  53 : CreateArray<uint32>([7, 8, 9]),  54 : CreateArray<uint32>([10, 11, 12]), 
            55 : CreateArray<uint32>([13, 14, 15]), 56 : CreateArray<uint32>([16, 17, 18]),  57 : CreateArray<uint32>([19, 20, 21, 32]),  58 : CreateArray<uint32>([22, 23, 24]), 
            59 : CreateArray<uint32>([25, 26, 27]), 60 : CreateArray<uint32>([]),61 : CreateArray<uint32>([28, 29, 30, 31]), 62 : CreateArray<uint32>([]), 
            63 : CreateArray<uint32>([]), 64 : CreateArray<uint32>([])
        })

        ClassTabs.forEach((ClassId, ClassTabId) => {
            if (Specs.contains(ClassTabId)) {
                let Tabs = Specs[ClassTabId]
                let ClassTab = wTalentTrees[ClassTabId]
                let ClassMap = wClassNodeToSpell[ClassTab.Classmask]
                Tabs.forEach((SpecId) => {
                    let Default = 'A' + base64_char.charAt(SpecId) + base64_char.charAt(ClassId)
                    ClassMap.forEach((K, V) => {
                        let Talent = ClassTab.Talents[V]
                        Default += Talent.Starter.includes(SpecId) ? base64_char.charAt(Talent.NumberOfRanks + 1) : base64_char.charAt(1)
                    })
                    let SpecTab = wTalentTrees[SpecId]
                    let SpecMap = wSpecNodeToSpell[SpecId]
                    SpecMap.forEach((K, V) => {
                        let Talent = SpecTab.Talents[V]
                        Default += Talent.Starter.includes(SpecId) ? base64_char.charAt(Talent.NumberOfRanks + 1) : base64_char.charAt(1)
                    })

                    wDefaultLoadoutStrings[ClassId][SpecId] = Default
                    count++
                })
            }
        })

        return `\t\t Loaded ${count} entries.\n`
    }
}

class CustomTalentPrereqs {
    Load() : string {
        let count = 0;

        const res = QueryWorld('SELECT * FROM `forge_talent_prereq`')
        while (res.GetRow()) {
            let ReqSpellId = res.GetUInt32(0)
            let ReqSpellTab = res.GetUInt32(1)
            let Talent = res.GetUInt32(2)
            let TalentTabId = res.GetUInt32(3)
            let RequiredRank = res.GetUInt32(4)

            let prereq = new DHTalentPrereq(TalentTabId, Talent, count, RequiredRank)
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

class ChoiceNodeChoices {
    Load() : string {
        let count = 0;
        const res = QueryWorld('SELECT * FROM `forge_talent_choice_nodes`')
        while (res.GetRow()) {
            let ChoiceId = res.GetUInt32(0)
            let TalentTabId = res.GetUInt32(1)
            let ChoiceIndex = res.GetUInt8(2)
            let SpellChoice = res.GetUInt32(3)
            
            if (wChoiceNodes.contains(ChoiceId))
                wChoiceNodes[ChoiceId].push(SpellChoice)
            else
                wChoiceNodes[ChoiceId] = CreateArray<uint32>([SpellChoice])

            wChoiceNodesRev[SpellChoice] = ChoiceId
            wChoiceNodeIndexLookup[ChoiceIndex] = SpellChoice
        
            if (wTalentTrees.contains(TalentTabId))
                if (wTalentTrees[TalentTabId].Talents.contains(ChoiceId))
                    wTalentTrees[TalentTabId].Talents[ChoiceId].Choices.push(SpellChoice)
            
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
            let TalentTabId = res.GetUInt32(0)
            let SpellId = res.GetUInt32(1)
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