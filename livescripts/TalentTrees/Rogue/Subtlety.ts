import { EmptyPrereqs, EmptySpellArray, SetChoiceNode, SetSpecAutolearn, SetTalentNode, SpecTabs } from "../TalentTreeLoader"

export function ReloadRogueSubTree() {
    let TAB: uint32 = SpecTabs.SUBR
    let CLASS = Class.ROGUE

    QueryWorld(`delete from character_spec_autolearn where \`class\` = ${CLASS} and \`spec\` = ${TAB}`)
    SetSpecAutolearn(CLASS, TAB, 10, GetID(`Spell`, 'dh-spells', 'rog-sub-gloomblade'))
    SetSpecAutolearn(CLASS, TAB, 10, GetID(`Spell`, 'dh-spells', 'rog-sub-shadowstrike'))
    SetSpecAutolearn(CLASS, TAB, 16, GetID(`Spell`, 'dh-spells', 'rog-sub-exposeweakness'))

    QueryWorld(`Delete from forge_talents where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_prereq where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_ranks where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_unlearn where talentTabId = ${TAB}`)

    let Talent : uint32 = GetID(`Spell`, 'dh-spells', 'rog-sub-shadowdance')
    SetTalentNode(Talent, TAB, 5, 1, 0, false, 2**(TAB-1), CreateArray<uint32>([Talent]), EmptyPrereqs, EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `rog-sub-shadowfocus`)
    SetTalentNode(Talent, TAB, 4, 2, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `rog-sub-shadowdance`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `rog-sub-shadowstep`)
    SetTalentNode(Talent, TAB, 5, 2, 0, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `rog-sub-shadowdance`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `rog-sub-masterofdeception`)
    SetTalentNode(Talent, TAB, 6, 2, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `rog-sub-shadowdance`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `rog-sub-shurikenstorm`)
    SetTalentNode(Talent, TAB, 4, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `rog-sub-shadowfocus`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `rog-sub-shadowtechnique`)
    SetTalentNode(Talent, TAB, 5, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `rog-sub-shadowfocus`)]: 1, [GetID(`Spell`, `dh-spells`, `rog-sub-shadowstep`)]: 1, [GetID(`Spell`, `dh-spells`, `rog-sub-masterofdeception`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `rog-sub-shadowblades`)
    SetTalentNode(Talent, TAB, 6, 3, 0, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `rog-sub-masterofdeception`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `rog-sub-wellaimedblades`)
    SetTalentNode(Talent, TAB, 4, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `rog-sub-shurikenstorm`)]: 1, [GetID(`Spell`, `dh-spells`, `rog-sub-shadowtechnique`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `rog-sub-relentlessstrikes`)
    SetTalentNode(Talent, TAB, 5, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `rog-sub-shadowtechnique`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `rog-sub-improvedgloomblade`)
    SetTalentNode(Talent, TAB, 6, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `rog-sub-shadowtechnique`)]: 1, [GetID(`Spell`, `dh-spells`, `rog-sub-shadowblades`)]: 1}), EmptySpellArray, EmptySpellArray)

}