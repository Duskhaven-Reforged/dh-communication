import { EmptyPrereqs, EmptySpellArray, SetChoiceNode, SetSpecAutolearn, SetTalentNode, SpecTabs } from "../TalentTreeLoader"

export function ReloadShamanEleTree() {
    let TAB: uint32 = SpecTabs.ELEM
    let CLASS = Class.SHAMAN

    QueryWorld(`delete from character_spec_autolearn where \`class\` = ${CLASS} and \`spec\` = ${TAB}`)
    SetSpecAutolearn(CLASS, TAB, 20, GetID(`Spell`, `dh-spells`, `sha-ele-elementalvulnerability`))
    SetSpecAutolearn(CLASS, TAB, 20, GetID(`Spell`, `dh-spells`, `sha-ele-totemicwrath`))
    SetSpecAutolearn(CLASS, TAB, 20, GetID(`Spell`, `dh-spells`, `sha-ele-airsprecision`))
    SetSpecAutolearn(CLASS, TAB, 10, GetID(`Spell`, `dh-spells`, `sha-ele-mastery`))

    QueryWorld(`Delete from forge_talents where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_prereq where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_ranks where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_unlearn where talentTabId = ${TAB}`)

    let Talent : uint32 = GetID(`Spell`, 'dh-spells', `sha-ele-elementalblast`)
    SetTalentNode(Talent, TAB, 6, 1, 0, false, 2**(TAB-1), CreateArray<uint32>([Talent]), EmptyPrereqs, EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `sha-ele-earthquake`)
    SetTalentNode(Talent, TAB, 4, 2, 0, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `sha-ele-elementalblast`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `sha-ele-elementalfury`)
    SetTalentNode(Talent, TAB, 6, 2, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `sha-ele-elementalblast`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `sha-ele-stormelemental`)
    SetTalentNode(Talent, TAB, 8, 2, 0, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `sha-ele-elementalblast`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `sha-ele-tumultuousfissures`)
    SetTalentNode(Talent, TAB, 4, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `sha-ele-earthquake`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `sha-ele-capacitortotem`)
    SetTalentNode(Talent, TAB, 6, 3, 0, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `sha-ele-elementalfury`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `sha-ele-elementalprowess`)
    SetTalentNode(Talent, TAB, 8, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `sha-ele-stormelemental`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `sha-ele-boomingechos`)
    SetTalentNode(Talent, TAB, 3, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `sha-ele-tumultuousfissures`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `sha-ele-inundate`)
    SetTalentNode(Talent, TAB, 5, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `sha-ele-tumultuousfissures`)]: 1, [GetID(`Spell`, `dh-spells`, `sha-ele-capacitortotem`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `sha-ele-watersinsight`)
    SetTalentNode(Talent, TAB, 6, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `sha-ele-capacitortotem`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `sha-ele-callofthunder`)
    SetTalentNode(Talent, TAB, 7, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `sha-ele-elementalprowess`)]: 1, [GetID(`Spell`, `dh-spells`, `sha-ele-capacitortotem`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `sha-ele-calloffire`)
    SetTalentNode(Talent, TAB, 9, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `sha-ele-elementalprowess`)]: 1}), EmptySpellArray, EmptySpellArray)
}
