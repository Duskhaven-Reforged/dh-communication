import { EmptyPrereqs, EmptySpellArray, SetChoiceNode, SetSpecAutolearn, SetTalentNode, SpecTabs } from "../TalentTreeLoader"

export function ReloadDiscPriestTree() {
    let TAB: uint32 = SpecTabs.DISC
    let CLASS = Class.PRIEST

    QueryWorld(`delete from character_spec_autolearn where \`class\` = ${CLASS} and \`spec\` = ${TAB}`)
    //SetSpecAutolearn(CLASS, TAB, 10, GetID(`Spell`, 'dh-spells', 'pri-disc-mastery'))
    SetSpecAutolearn(CLASS, TAB, 16, GetID(`Spell`, 'dh-spells', 'pri-disc-protectivepresence'))
    SetSpecAutolearn(CLASS, TAB, 30, GetID(`Spell`, 'dh-spells', 'pri-disc-divineaegis'))

    QueryWorld(`Delete from forge_talents where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_prereq where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_ranks where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_unlearn where talentTabId = ${TAB}`)

    let Talent : uint32 = GetID(`Spell`, `dh-spells`, `pri-disc-penance`)
    SetTalentNode(Talent, TAB, 6, 1, 0, false, 2**(TAB-1), CreateArray<uint32>([Talent]), EmptyPrereqs, EmptySpellArray, EmptySpellArray)

    Talent = GetID(`Spell`, `dh-spells`, `pri-disc-powerwordphalanx`)
    SetTalentNode(Talent, TAB, 5, 2, 0, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pri-disc-penance`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `pri-disc-innerturmoil`)
    SetTalentNode(Talent, TAB, 6, 2, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pri-disc-penance`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `pri-disc-atonement`)
    SetTalentNode(Talent, TAB, 7, 2, 0, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pri-disc-penance`)]: 1}), EmptySpellArray, EmptySpellArray)

    Talent = GetID(`Spell`, `dh-spells`, `pri-disc-safetyheal`)
    SetTalentNode(Talent, TAB, 5, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pri-disc-powerwordphalanx`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `pri-disc-twilightcutter`)
    SetTalentNode(Talent, TAB, 6, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pri-disc-powerwordphalanx`)]: 1, [GetID(`Spell`, `dh-spells`, `pri-disc-innerturmoil`)]: 1, [GetID(`Spell`, `dh-spells`, `pri-disc-atonement`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `pri-disc-painfulretention`)
    SetTalentNode(Talent, TAB, 7, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pri-disc-atonement`)]: 1}), EmptySpellArray, EmptySpellArray)

    Talent = GetID(`Spell`, `dh-spells`, `pri-disc-soulwarding`)
    SetTalentNode(Talent, TAB, 5, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pri-disc-safetyheal`)]: 1, [GetID(`Spell`, `dh-spells`, `pri-disc-twilightcutter`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `pri-disc-twindisciplines`)
    SetTalentNode(Talent, TAB, 6, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pri-disc-twilightcutter`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `pri-disc-revelinpain`)
    SetTalentNode(Talent, TAB, 7, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pri-disc-twilightcutter`)]: 1, [GetID(`Spell`, `dh-spells`, `pri-disc-painfulretention`)]: 1}), EmptySpellArray, EmptySpellArray)

    Talent = GetID(`Spell`, `dh-spells`, `pri-disc-powermending`)
    SetTalentNode(Talent, TAB, 4, 5, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pri-disc-soulwarding`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `pri-disc-rapture`)
    SetTalentNode(Talent, TAB, 5, 5, 0, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pri-disc-soulwarding`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `pri-disc-painsuppression`)
    SetTalentNode(Talent, TAB, 6, 5, 0, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pri-disc-soulwarding`)]: 1, [GetID(`Spell`, `dh-spells`, `pri-disc-twindisciplines`)]: 1, [GetID(`Spell`, `dh-spells`, `pri-disc-revelinpain`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `pri-disc-prayerofthefortunate`)
    SetTalentNode(Talent, TAB, 7, 5, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pri-disc-revelinpain`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `pri-disc-powerofthedarkside`)
    SetTalentNode(Talent, TAB, 8, 5, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pri-disc-revelinpain`)]: 1}), EmptySpellArray, EmptySpellArray)
    
    Talent = GetID(`Spell`, `dh-spells`, `pri-disc-relentlessprayer`)
    SetTalentNode(Talent, TAB, 3, 6, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pri-disc-powermending`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `pri-disc-livinglife`)
    SetTalentNode(Talent, TAB, 4, 6, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pri-disc-powermending`)]: 1, [GetID(`Spell`, `dh-spells`, `pri-disc-rapture`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `pri-disc-empoweredpenance`)
    SetTalentNode(Talent, TAB, 5, 6, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pri-disc-rapture`)]: 1, [GetID(`Spell`, `dh-spells`, `pri-disc-painsuppression`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `pri-disc-innerfocus`)
    SetTalentNode(Talent, TAB, 6, 6, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pri-disc-painsuppression`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `pri-disc-evangelism`)
    SetTalentNode(Talent, TAB, 7, 6, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pri-disc-painsuppression`)]: 1, [GetID(`Spell`, `dh-spells`, `pri-disc-prayerofthefortunate`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `pri-disc-darkindulgence`)
    SetTalentNode(Talent, TAB, 8, 6, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pri-disc-prayerofthefortunate`)]: 1, [GetID(`Spell`, `dh-spells`, `pri-disc-powerofthedarkside`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `pri-disc-shadowscream`)
    SetTalentNode(Talent, TAB, 9, 6, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pri-disc-powerofthedarkside`)]: 1}), EmptySpellArray, EmptySpellArray)
    
    Talent = GetID(`Spell`, `dh-spells`, `pri-disc-grace`)
    SetTalentNode(Talent, TAB, 4, 7, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pri-disc-relentlessprayer`)]: 1, [GetID(`Spell`, `dh-spells`, `pri-disc-livinglife`)]: 1, [GetID(`Spell`, `dh-spells`, `pri-disc-empoweredpenance`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `pri-disc-borrowedtimer1`)
    SetTalentNode(Talent, TAB, 5, 7, 0, true, 0, CreateArray<uint32>([Talent, GetID(`Spell`, `dh-spells`, `pri-disc-borrowedtimer2`)]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pri-disc-empoweredpenance`)]: 1, [GetID(`Spell`, `dh-spells`, `pri-disc-innerfocus`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `pri-disc-powerinfusion`)
    SetTalentNode(Talent, TAB, 6, 7, 0, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pri-disc-innerfocus`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `pri-disc-touchofthedevoutr1`)
    SetTalentNode(Talent, TAB, 7, 7, 0, true, 0, CreateArray<uint32>([Talent, GetID(`Spell`, `dh-spells`, `pri-disc-touchofthedevoutr2`)]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pri-disc-innerfocus`)]: 1, [GetID(`Spell`, `dh-spells`, `pri-disc-evangelism`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `pri-disc-destroyevil`)
    SetTalentNode(Talent, TAB, 8, 7, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pri-disc-evangelism`)]: 1, [GetID(`Spell`, `dh-spells`, `pri-disc-darkindulgence`)]: 1, [GetID(`Spell`, `dh-spells`, `pri-disc-shadowscream`)]: 1}), EmptySpellArray, EmptySpellArray)
    
}