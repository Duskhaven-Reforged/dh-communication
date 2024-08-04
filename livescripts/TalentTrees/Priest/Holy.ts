import { EmptyPrereqs, EmptySpellArray, SetChoiceNode, SetSpecAutolearn, SetTalentNode, SpecTabs } from "../TalentTreeLoader"

export function ReloadHPriestTree() {
    let TAB: uint32 = SpecTabs.HPRI
    let CLASS = Class.PRIEST

    QueryWorld(`delete from character_spec_autolearn where \`class\` = ${CLASS} and \`spec\` = ${TAB}`)
    SetSpecAutolearn(CLASS, TAB, 1, GetID(`Spell`, 'dh-spells', 'pri-holy-punish'))
    //SetSpecAutolearn(CLASS, TAB, 1, GetID(`Spell`, 'dh-spells', ''))     Presence of Altruism
    //SetSpecAutolearn(CLASS, TAB, 1, GetID(`Spell`, 'dh-spells', ''))     Sacred Blessing
    SetSpecAutolearn(CLASS, TAB, 1, 20711)

    QueryWorld(`Delete from forge_talents where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_prereq where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_ranks where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_unlearn where talentTabId = ${TAB}`)

    //let Talent : uint32 = GetID(`Spell`, `dh-spells`, ``)     Holyform - not in ts and no spell ID in Dochaven
    //SetTalentNode(Talent, TAB, 5, 1, 0, false, 1 << (TAB-1), CreateArray<uint32>([Talent]), EmptyPrereqs, EmptySpellArray, EmptySpellArray)
    let Talent : uint32 = GetID(`Spell`, `dh-spells`, `pri-holy-sanctity`)
    SetTalentNode(Talent, TAB, 4, 2, 0, false, 0, CreateArray<uint32>([Talent]), EmptyPrereqs /*CreateDictionary<uint32, uint8>({[Holyform ID]: 1})*/, EmptySpellArray, EmptySpellArray)
    Talent = 139
    SetTalentNode(Talent, TAB, 5, 2, 0, false, 0, CreateArray<uint32>([Talent]), EmptyPrereqs /*CreateDictionary<uint32, uint8>({[Holyform ID]: 1})*/, EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `pri-holy-serenity`)
    SetTalentNode(Talent, TAB, 6, 2, 0, false, 0, CreateArray<uint32>([Talent]), EmptyPrereqs /*CreateDictionary<uint32, uint8>({[Holyform ID]: 1})*/, EmptySpellArray, EmptySpellArray)
    //Talent = GetID(`Spell`, `dh-spells`, ``)              Sanctified Salvation - not in ts and no spell ID in Dochaven
    //SetTalentNode(Talent, TAB, 3, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pri-holy-sanctity`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = 34861
    SetTalentNode(Talent, TAB, 4, 3, 0, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[139]: 1}), EmptySpellArray, EmptySpellArray)
    //Talent = GetID(`Spell`, `dh-spells`, ``)              Hand of the Empyreal - not in ts and no spell ID in Dochaven
    //SetTalentNode(Talent, TAB, 5, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[139]: 1}), EmptySpellArray, EmptySpellArray)
    //Talent = GetID(`Spell`, `dh-spells`, ``)              Renewed Faith - not in ts and no spell ID in Dochaven
    //SetTalentNode(Talent, TAB, 6, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[139]: 1}), EmptySpellArray, EmptySpellArray)
    //Talent = GetID(`Spell`, `dh-spells`, ``)              Miraculous Salvation - not in ts and no spell ID in Dochaven
    //SetTalentNode(Talent, TAB, 7, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pri-holy-serenity`)]: 1}), EmptySpellArray, EmptySpellArray)
    //Talent = GetID(`Spell`, `dh-spells`, ``)              Cosmic Ripple - not in ts and no spell ID in Dochaven
    //SetTalentNode(Talent, TAB, 5, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[34861]: 1, [Hand of the Empyreal ID]: 1, [Renewed Faith ID]: 1}), EmptySpellArray, EmptySpellArray)

}