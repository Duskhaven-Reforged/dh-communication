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
    SetTalentNode(Talent, TAB, 6, 1, 0, false, 2**(TAB-1), CreateArray<uint32>([Talent]), EmptyPrereqs, EmptySpellArray, EmptySpellArray)
    
    Talent = GetID(`Spell`, `dh-spells`, `rog-sub-shadowfocus`)
    SetTalentNode(Talent, TAB, 5, 2, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `rog-sub-shadowdance`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `rog-sub-shadowstep`)
    SetTalentNode(Talent, TAB, 6, 2, 0, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `rog-sub-shadowdance`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `rog-sub-masterofdeception`)
    SetTalentNode(Talent, TAB, 7, 2, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `rog-sub-shadowdance`)]: 1}), EmptySpellArray, EmptySpellArray)
    
    Talent = GetID(`Spell`, `dh-spells`, `rog-sub-shurikenstorm`)
    SetTalentNode(Talent, TAB, 5, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `rog-sub-shadowfocus`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `rog-sub-shadowtechnique`)
    SetTalentNode(Talent, TAB, 6, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `rog-sub-shadowfocus`)]: 1, [GetID(`Spell`, `dh-spells`, `rog-sub-shadowstep`)]: 1, [GetID(`Spell`, `dh-spells`, `rog-sub-masterofdeception`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `rog-sub-shadowblades`)
    SetTalentNode(Talent, TAB, 7, 3, 0, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `rog-sub-masterofdeception`)]: 1}), EmptySpellArray, EmptySpellArray)
    
    Talent = GetID(`Spell`, `dh-spells`, `rog-sub-wellaimedblades`)
    SetTalentNode(Talent, TAB, 5, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `rog-sub-shurikenstorm`)]: 1, [GetID(`Spell`, `dh-spells`, `rog-sub-shadowtechnique`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `rog-sub-relentlessstrikes`)
    SetTalentNode(Talent, TAB, 6, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `rog-sub-shadowtechnique`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `rog-sub-improvedgloomblade`)
    SetTalentNode(Talent, TAB, 7, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `rog-sub-shadowtechnique`)]: 1, [GetID(`Spell`, `dh-spells`, `rog-sub-shadowblades`)]: 1}), EmptySpellArray, EmptySpellArray)

    Talent = GetID(`Spell`, 'dh-spells', 'rog-sub-shurikentornado')
    SetTalentNode(Talent, TAB, 4, 5, 8, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `rog-sub-wellaimedblades`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'rog-sub-thefirstdance')
    SetChoiceNode(Talent, TAB, 5, 5, 8, true, CreateArray<uint32>([Talent, GetID(`Spell`, 'dh-spells', 'rog-sub-masterofshadows')]), CreateDictionary<uint32, uint8>({[GetID('Spell', 'dh-spells', 'rog-sub-relentlessstrikes')]: 1, [GetID('Spell', 'dh-spells', 'rog-sub-wellaimedblades')]: 1}), EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'rog-sub-deepeningshadows')
    SetTalentNode(Talent, TAB, 6, 5, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `rog-sub-relentlessstrikes`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'rog-sub-stabandtear')
    SetTalentNode(Talent, TAB, 7, 5, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `rog-sub-improvedgloomblade`)]: 1, [GetID(`Spell`, `dh-spells`, `rog-sub-relentlessstrikes`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'rog-sub-symbolsofdeath')
    SetTalentNode(Talent, TAB, 8, 5, 8, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `rog-sub-improvedgloomblade`)]: 1}), EmptySpellArray, EmptySpellArray)

    Talent = GetID(`Spell`, 'dh-spells', 'rog-sub-flashofblades')
    SetTalentNode(Talent, TAB, 3, 6, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `rog-sub-shurikentornado`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'rog-sub-waylay')
    SetTalentNode(Talent, TAB, 4, 6, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `rog-sub-shurikentornado`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'rog-sub-sinistercalling')
    SetTalentNode(Talent, TAB, 5, 6, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `rog-sub-shurikentornado`)]: 1, [GetID(`Spell`, `dh-spells`, `rog-sub-thefirstdance`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'rog-sub-blackpowder')
    SetTalentNode(Talent, TAB, 6, 6, 8, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `rog-sub-stabandtear`)]: 1, [GetID(`Spell`, `dh-spells`, `rog-sub-thefirstdance`)]: 1, [GetID(`Spell`, `dh-spells`, `rog-sub-deepeningshadows`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'rog-sub-veiltouched')
    SetTalentNode(Talent, TAB, 7, 6, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `rog-sub-stabandtear`)]: 1, [GetID(`Spell`, `dh-spells`, `rog-sub-symbolsofdeath`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'rog-sub-shotinthedark')
    SetTalentNode(Talent, TAB, 8, 6, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `rog-sub-symbolsofdeath`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'rog-sub-plannedexecution')
    SetChoiceNode(Talent, TAB, 9, 6, 8, true, CreateArray<uint32>([Talent, GetID(`Spell`, 'dh-spells', 'rog-sub-warningsigns')]), CreateDictionary<uint32, uint8>({[GetID('Spell', 'dh-spells', 'rog-sub-symbolsofdeath')]: 1}), EmptySpellArray)
    
    Talent = GetID(`Spell`, 'dh-spells', 'rog-sub-saltthewound')
    SetTalentNode(Talent, TAB, 4, 7, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `rog-sub-flashofblades`)]: 1, [GetID(`Spell`, `dh-spells`, `rog-sub-waylay`)]: 1, [GetID(`Spell`, `dh-spells`, `rog-sub-sinistercalling`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'rog-sub-preparation')
    SetTalentNode(Talent, TAB, 5, 7, 8, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `rog-sub-sinistercalling`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'rog-sub-honoramongthieves')
    SetTalentNode(Talent, TAB, 6, 7, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `rog-sub-veiltouched`)]: 1, [GetID(`Spell`, `dh-spells`, `rog-sub-blackpowder`)]: 1, [GetID(`Spell`, `dh-spells`, `rog-sub-sinistercalling`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'rog-sub-premeditation')
    SetTalentNode(Talent, TAB, 7, 7, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `rog-sub-veiltouched`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'rog-sub-slaughterfromtheshadows')
    SetTalentNode(Talent, TAB, 8, 7, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `rog-sub-plannedexecution`)]: 1, [GetID(`Spell`, `dh-spells`, `rog-sub-shotinthedark`)]: 1, [GetID(`Spell`, `dh-spells`, `rog-sub-veiltouched`)]: 1}), EmptySpellArray, EmptySpellArray)

}