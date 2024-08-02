import { EmptyPrereqs, EmptySpellArray, SetChoiceNode, SetSpecAutolearn, SetTalentNode, SpecTabs } from "../TalentTreeLoader"

export function ReloadDiscPriestTree() {
    let TAB: uint32 = SpecTabs.DISC
    let CLASS = Class.PRIEST

    QueryWorld(`delete from character_spec_autolearn where \`class\` = ${CLASS} and \`spec\` = ${TAB}`)
    //SetSpecAutolearn(CLASS, TAB, 1, GetID(`Spell`, 'dh-spells', ''))  Protective Presence


    QueryWorld(`Delete from forge_talents where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_prereq where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_ranks where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_unlearn where talentTabId = ${TAB}`)

    let Talent : uint32 = 47540
    SetTalentNode(Talent, TAB, 5, 1, 0, false, 1 << (TAB-1), CreateArray<uint32>([Talent]), EmptyPrereqs, EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `pri-disc-phalanx`)
    SetTalentNode(Talent, TAB, 4, 2, 0, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[47540]: 1}), EmptySpellArray, EmptySpellArray)
    //Talent = GetID(`Spell`, `dh-spells`, ``)     Inner Turmoil - not in ts and no spell ID in Dochaven
    //SetTalentNode(Talent, TAB, 5, 2, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[47540]: 1}), EmptySpellArray, EmptySpellArray)
    //Talent = GetID(`Spell`, `dh-spells`, `)      Atonement - not in ts and no spell ID in Dochaven
    //SetTalentNode(Talent, TAB, 6, 2, 0, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[47540]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `pri-disc-safety`)
    SetTalentNode(Talent, TAB, 4, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pri-disc-phalanx`)]: 1}), EmptySpellArray, EmptySpellArray)
    //Talent = GetID(`Spell`, `dh-spells`, ``)     Twilight Cutter - not in ts and no spell ID in Dochaven
    //SetTalentNode(Talent, TAB, 5, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pri-disc-phalanx`)]: 1, [Inner Turmoil ID]: 1, [Atonement ID]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `pri-disc-painful`)
    SetTalentNode(Talent, TAB, 6, 3, 0, true, 0, CreateArray<uint32>([Talent]), EmptyPrereqs/*CreateDictionary<uint32, uint8>({[Atonement ID]: 1})*/, EmptySpellArray, EmptySpellArray)
    //Talent = GetID(`Spell`, `dh-spells`, ``)     Soul Warding - not in ts and no spell ID in Dochaven
    //SetTalentNode(Talent, TAB, 4, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pri-disc-safety`)]: 1, [Twilight Cutter ID]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `pri-disc-twin`)
    SetTalentNode(Talent, TAB, 5, 4, 0, true, 0, CreateArray<uint32>([Talent]), EmptyPrereqs/*CreateDictionary<uint32, uint8>({[Twilight Cutter ID]: 1})*/, EmptySpellArray, EmptySpellArray)
    //Talent = GetID(`Spell`, `dh-spells`, ``)     Revel in Pain - not in ts and no spell ID in Dochaven
    //SetTalentNode(Talent, TAB, 6, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[Twilight Cutter ID]: 1, [GetID(`Spell`, `dh-spells`, `pri-disc-painful`)]: 1}), EmptySpellArray, EmptySpellArray)

}