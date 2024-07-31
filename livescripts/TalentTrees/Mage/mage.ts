import { EmptyPrereqs, EmptySpellArray, SetChoiceNode, SetTalentNode, SpecTabs } from "../TalentTreeLoader"

export function ReloadMageTree() {
    let TAB: uint32 = 58
    let ALLMASK = (1 << (SpecTabs.FIRE - 1)) | (1 << (SpecTabs.ARCA - 1)) | (1 << (SpecTabs.FROS - 1))

    QueryWorld(`Delete from forge_talents where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_prereq where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_ranks where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_unlearn where talentTabId = ${TAB}`)

    let Talent : uint32 = GetID(`Spell`, 'dh-spells', `mag-gen-barrierarcana`)
    SetTalentNode(Talent, TAB, 6, 1, 0, false, ALLMASK, CreateArray<uint32>([Talent]), EmptyPrereqs, EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `mag-gen-frictionbarrier`)
    SetTalentNode(Talent, TAB, 5, 2, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `mag-gen-barrierarcana`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `mag-gen-manabarrier`)
    SetTalentNode(Talent, TAB, 6, 2, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `mag-gen-barrierarcana`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `mag-gen-coldwinds`)
    SetTalentNode(Talent, TAB, 7, 2, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `mag-gen-barrierarcana`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `mag-gen-magicabsorption`)
    SetTalentNode(Talent, TAB, 5, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `mag-gen-frictionbarrier`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `mag-gen-incantersabsorption`)
    SetTalentNode(Talent, TAB, 6, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `mag-gen-frictionbarrier`)]: 1, [GetID(`Spell`, `dh-spells`, `mag-gen-manabarrier`)]: 1, [GetID(`Spell`, `dh-spells`, `mag-gen-coldwinds`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `mag-gen-fadingbarriers`)
    SetTalentNode(Talent, TAB, 7, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `mag-gen-coldwinds`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `mag-gen-blastwave`)
    SetTalentNode(Talent, TAB, 4, 4, 0, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `mag-gen-magicabsorption`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `mag-gen-moltenarmor`)
    SetChoiceNode(Talent, TAB, 6, 4, 0, true, CreateArray<uint32>([Talent, GetID(`Spell`, `dh-spells`, `mag-gen-frostarmor`)]), CreateDictionary<uint32, uint8>({[GetID('Spell', 'dh-spells', 'mag-gen-magicabsorption')]: 1, [GetID('Spell', 'dh-spells', 'mag-gen-incantersabsorption')]: 1, [GetID('Spell', 'dh-spells', 'mag-gen-fadingbarriers')]: 1}), EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `mag-gen-iceblock`)
    SetTalentNode(Talent, TAB, 8, 4, 0, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `mag-gen-fadingbarriers`)]: 1}), EmptySpellArray, EmptySpellArray)
}
