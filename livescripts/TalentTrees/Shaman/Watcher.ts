import { EmptyPrereqs, EmptySpellArray, SetChoiceNode, SetSpecAutolearn, SetTalentNode, SpecTabs } from "../TalentTreeLoader"

export function ReloadShamanWatcherTree() {
    let TAB: uint64 = SpecTabs.WARD
    let CLASS = Class.SHAMAN
    let SpecMask : uint64 = 2**(TAB-1)

    QueryWorld(`delete from character_spec_autolearn where \`class\` = ${CLASS} and \`spec\` = ${TAB}`)
    SetSpecAutolearn(CLASS, TAB, 10, GetID(`Spell`, `dh-spells`, `sha-wat-chosenofearth`))
    SetSpecAutolearn(CLASS, TAB, 10, GetID(`Spell`, `dh-spells`, `sha-wat-watchersprovocation`))
    SetSpecAutolearn(CLASS, TAB, 20, GetID(`Spell`, `dh-spells`, `sha-wat-challenginggale`))
    SetSpecAutolearn(CLASS, TAB, 10, GetID(`Spell`, `dh-spells`, `sha-wat-mastery`))

    QueryWorld(`Delete from forge_talents where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_prereq where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_ranks where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_unlearn where talentTabId = ${TAB}`)

    let Talent : uint32 = GetID(`Spell`, 'dh-spells', `sha-wat-rockbiter`)
    SetTalentNode(Talent, TAB, 6, 1, 0, false, SpecMask, CreateArray<uint32>([Talent]), EmptyPrereqs, CreateArray<uint32>([GetID(`Spell`, `dh-spells`, `sha-gen-primalstrike`)]), EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `sha-wat-grit`)
    SetTalentNode(Talent, TAB, 5, 2, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `sha-wat-rockbiter`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `sha-wat-magneticgrip`)
    SetTalentNode(Talent, TAB, 7, 2, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `sha-wat-rockbiter`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `sha-wat-courageousstrikes`)
    SetTalentNode(Talent, TAB, 3, 2, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `sha-wat-grit`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `sha-wat-ferallunge`)
    SetTalentNode(Talent, TAB, 9, 2, 0, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `sha-wat-magneticgrip`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `sha-wat-frostbrandweapon`)
    SetTalentNode(Talent, TAB, 4, 3, 0, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `sha-wat-courageousstrikes`)]: 1, [GetID(`Spell`, `dh-spells`, `sha-wat-grit`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `sha-wat-elementalbash`)
    SetTalentNode(Talent, TAB, 6, 3, 0, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `sha-wat-grit`)]: 1, [GetID(`Spell`, `dh-spells`, `sha-wat-magneticgrip`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `sha-wat-lavapooltotem`)
    SetTalentNode(Talent, TAB, 8, 3, 0, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `sha-wat-ferallunge`)]: 1, [GetID(`Spell`, `dh-spells`, `sha-wat-magneticgrip`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `sha-wat-sandstorm`)
    SetTalentNode(Talent, TAB, 3, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `sha-wat-courageousstrikes`)]: 1, [GetID(`Spell`, `dh-spells`, `sha-wat-frostbrandweapon`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `sha-wat-airsgrace`)
    SetChoiceNode(Talent, TAB, 6, 4, 0, true, CreateArray<uint32>([Talent, GetID(`Spell`, `dh-spells`, `sha-wat-earthsstoicism`)]), CreateDictionary<uint32, uint8>({[GetID('Spell', 'dh-spells', 'sha-wat-frostbrandweapon')]: 1,  [GetID('Spell', 'dh-spells', 'sha-wat-elementalbash')]: 1, [GetID('Spell', 'dh-spells', 'sha-wat-lavapooltotem')]: 1}), EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `sha-wat-maelstromdefense`)
    SetTalentNode(Talent, TAB, 9, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `sha-wat-lavapooltotem`)]: 1, [GetID(`Spell`, `dh-spells`, `sha-wat-ferallunge`)]: 1}), EmptySpellArray, EmptySpellArray)
}