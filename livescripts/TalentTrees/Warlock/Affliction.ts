import { EmptyPrereqs, EmptySpellArray, SetChoiceNode, SetSpecAutolearn, SetTalentNode, SpecTabs } from "../TalentTreeLoader"

export function ReloadAffLockTree() {
    let TAB: uint32 = SpecTabs.ALCK
    let CLASS = Class.WARLOCK

    QueryWorld(`delete from character_spec_autolearn where \`class\` = ${CLASS} and \`spec\` = ${TAB}`)
    SetSpecAutolearn(CLASS, TAB, 10, GetID(`Spell`, 'dh-spells', 'warl-aff-cursed-phylactery'))
    SetSpecAutolearn(CLASS, TAB, 10, GetID(`Spell`, 'dh-spells', 'warl-aff-sacrifice-demon'))
    SetSpecAutolearn(CLASS, TAB, 10, GetID(`Spell`, 'dh-spells', 'warl-aff-excruciating-affliction'))
    SetSpecAutolearn(CLASS, TAB, 15, GetID(`Spell`, 'dh-spells', 'warl-aff-soul-deterioration'))
    SetSpecAutolearn(CLASS, TAB, 16, GetID(`Spell`, 'dh-spells', 'warl-aff-demonic-fortitude'))
    SetSpecAutolearn(CLASS, TAB, 16, GetID(`Spell`, 'dh-spells', 'warl-aff-seed-of-corruption'))

    QueryWorld(`Delete from forge_talents where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_prereq where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_ranks where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_unlearn where talentTabId = ${TAB}`)

    let Talent : uint32 = GetID(`Spell`, 'dh-spells', 'warl-aff-drain-soul')
    SetTalentNode(Talent, TAB, 5, 1, 0, false, 2**(TAB-1), CreateArray<uint32>([Talent]), EmptyPrereqs, EmptySpellArray, EmptySpellArray)

    Talent = GetID(`Spell`, `dh-spells`, `warl-aff-corrupted-immolate`)
    SetTalentNode(Talent, TAB, 4, 2, 0, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `warl-aff-drain-soul`)]: 1}), CreateArray<uint32>([GetID(`Spell`, `dh-spells`, `warl-gen-immolate`)]), EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `warl-aff-haunt`)
    SetTalentNode(Talent, TAB, 6, 2, 0, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `warl-aff-drain-soul`)]: 1}), EmptySpellArray, EmptySpellArray)

    Talent = GetID(`Spell`, `dh-spells`, `warl-aff-empowered-corruption`)
    SetTalentNode(Talent, TAB, 3, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `warl-aff-corrupted-immolate`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `warl-aff-shadow-embrance`)
    SetTalentNode(Talent, TAB, 5, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `warl-aff-corrupted-immolate`)]: 1, [GetID(`Spell`, `dh-spells`, `warl-aff-drain-soul`)]: 1, [GetID(`Spell`, `dh-spells`, `warl-aff-haunt`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `warl-aff-unstable-affliction`)
    SetTalentNode(Talent, TAB, 7, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `warl-aff-haunt`)]: 1}), EmptySpellArray, EmptySpellArray)

    Talent = GetID(`Spell`, `dh-spells`, `warl-aff-eradication`)
    SetTalentNode(Talent, TAB, 2, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `warl-aff-empowered-corruption`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `warl-aff-sow-the-seeds`)
    SetTalentNode(Talent, TAB, 4, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `warl-aff-empowered-corruption`)]: 1, [GetID(`Spell`, `dh-spells`, `warl-aff-shadow-embrance`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `warl-aff-soulrend`)
    SetTalentNode(Talent, TAB, 5, 4, 0, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `warl-aff-shadow-embrance`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `warl-aff-deaths-embrance`)
    SetTalentNode(Talent, TAB, 6, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `warl-aff-shadow-embrance`)]: 1, [GetID(`Spell`, `dh-spells`, `warl-aff-unstable-affliction`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `warl-aff-suppression`)
    SetTalentNode(Talent, TAB, 8, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `warl-aff-unstable-affliction`)]: 1}), EmptySpellArray, EmptySpellArray)
}