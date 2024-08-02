import { EmptyPrereqs, EmptySpellArray, SetChoiceNode, SetSpecAutolearn, SetTalentNode, SpecTabs } from "../TalentTreeLoader"

export function ReloadShaPriestTree() {
    let TAB: uint32 = SpecTabs.SPRI
    let CLASS = Class.PRIEST

    QueryWorld(`delete from character_spec_autolearn where \`class\` = ${CLASS} and \`spec\` = ${TAB}`)
    //SetSpecAutolearn(CLASS, TAB, 10, GetID(`Spell`, 'dh-spells', ''))       Shadowy Apparitions
    //SetSpecAutolearn(CLASS, TAB, 10, GetID(`Spell`, 'dh-spells', ''))       Insanity
    SetSpecAutolearn(CLASS, TAB, 10, 15407)
    //SetSpecAutolearn(CLASS, TAB, 16, GetID(`Spell`, 'dh-spells', ''))       Darkest Thoughts
    //SetSpecAutolearn(CLASS, TAB, 25, GetID(`Spell`, 'dh-spells', ''))       Hallucinations

    QueryWorld(`Delete from forge_talents where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_prereq where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_ranks where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_unlearn where talentTabId = ${TAB}`)

    let Talent : uint32 = 15473
    SetTalentNode(Talent, TAB, 5, 1, 0, false, 1 << (TAB-1), CreateArray<uint32>([Talent]), EmptyPrereqs, EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `pri-shad-vamp`)
    SetTalentNode(Talent, TAB, 5, 2, 0, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[15473]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `pri-shad-misery`)
    SetTalentNode(Talent, TAB, 4, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pri-shad-vamp`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = 47585
    SetTalentNode(Talent, TAB, 5, 3, 0, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pri-shad-vamp`)]: 1}), EmptySpellArray, EmptySpellArray)
    //Talent = GetID(`Spell`, `dh-spells`, ``)    Psychic Link - not in ts and no spell ID in Dochaven
    //SetTalentNode(Talent, TAB, 6, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pri-shad-vamp`)]: 1}), EmptySpellArray, EmptySpellArray)
    //Talent = GetID(`Spell`, `dh-spells`, ``)    Obliderate Mind - not in ts and no spell ID in Dochaven
    //SetTalentNode(Talent, TAB, 2, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pri-shad-misery`)]: 1}), EmptySpellArray, EmptySpellArray)
    //Talent = GetID(`Spell`, `dh-spells`, ``)    Inner Quietus - not in ts and no spell ID in Dochaven
    //SetTalentNode(Talent, TAB, 4, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pri-shad-misery`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `pri-shadow-crash`)
    SetTalentNode(Talent, TAB, 5, 4, 0, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pri-shad-misery`)]: 1, [47585]: 1/*, [GetID(`Spell`, `dh-spells`, `Psychic Link ID`)]: 1*/}), EmptySpellArray, EmptySpellArray)
    //Talent = GetID(`Spell`, `dh-spells`, ``)    Deathspeaker - not in ts and no spell ID in Dochaven
    //SetTalentNode(Talent, TAB, 6, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `Psychic Link ID`)]: 1}), EmptySpellArray, EmptySpellArray)
    //Talent = GetID(`Spell`, `dh-spells`, ``)    Mind Melter - not in ts and no spell ID in Dochaven
    //SetTalentNode(Talent, TAB, 8, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `Psychic Link ID`)]: 1}), EmptySpellArray, EmptySpellArray)

}