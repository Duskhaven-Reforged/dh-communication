import { EmptyPrereqs, EmptySpellArray, SetChoiceNode, SetSpecAutolearn, SetTalentNode, SpecTabs } from "../TalentTreeLoader"

export function ReloadPalHolyTree() {
    let TAB: uint32 = SpecTabs.HPAL
    let CLASS = 2

    QueryWorld(`delete from character_spec_autolearn where \`class\` = ${CLASS} and \`spec\` = ${TAB}`)
    SetSpecAutolearn(CLASS, TAB, 10, GetID(`Spell`, 'dh-spells', 'pal-holy-holyguidance'))
    SetSpecAutolearn(CLASS, TAB, 16, GetID(`Spell`, 'dh-spells', 'pal-holy-lightsbeacon'))
    SetSpecAutolearn(CLASS, TAB, 16, GetID(`Spell`, 'dh-spells', 'pal-holy-presenceofaltruism'))

    QueryWorld(`Delete from forge_talents where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_prereq where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_ranks where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_unlearn where talentTabId = ${TAB}`)

    let Talent : uint32 = GetID(`Spell`, 'dh-spells', 'pal-holy-holyshock')
    SetTalentNode(Talent, TAB, 5, 1, 0, false, 1 << (TAB-1), CreateArray<uint32>([Talent]), EmptyPrereqs, EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'pal-holy-infusionoflight')
    SetTalentNode(Talent, TAB, 4, 2, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pal-holy-holyshock`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'pal-holy-shockbarrier')
    SetTalentNode(Talent, TAB, 5, 2, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pal-holy-holyshock`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'pal-holy-glimmer-of-light')
    SetTalentNode(Talent, TAB, 6, 2, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pal-holy-holyshock`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'pal-holy-liberty')
    SetTalentNode(Talent, TAB, 4, 3, 0, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pal-holy-infusionoflight`)]: 1, [GetID(`Spell`, `dh-spells`, `pal-holy-shockbarrier`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'pal-holy-lightofthemartyr')
    SetTalentNode(Talent, TAB, 6, 3, 0, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pal-holy-shockbarrier`)]: 1, [GetID(`Spell`, `dh-spells`, `pal-holy-glimmer-of-light`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'pal-holy-radiantinfusions')
    SetTalentNode(Talent, TAB, 2, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pal-holy-infusionoflight`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'pal-holy-unwaveringspirit')
    SetChoiceNode(Talent, TAB, 4, 4, 0, true, CreateArray<uint32>([Talent, GetID(`Spell`, `dh-spells`, `pal-holy-protectionoftyr`)]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, 'dh-spells', 'pal-holy-liberty')]: 1}), EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'pal-holy-untempereddedication')
    SetTalentNode(Talent, TAB, 6, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pal-holy-lightofthemartyr`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'pal-holy-crusadersmight')
    SetTalentNode(Talent, TAB, 8, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pal-holy-glimmer-of-light`)]: 1}), EmptySpellArray, EmptySpellArray)
    
}