import { EmptyPrereqs, EmptySpellArray, SetChoiceNode, SetSpecAutolearn, SetTalentNode, SpecTabs } from "../TalentTreeLoader"

export function ReloadWarriorFuryTree() {
    let TAB: uint32 = SpecTabs.FURY
    let CLASS = Class.WARRIOR

    QueryWorld(`delete from character_spec_autolearn where \`class\` = ${CLASS} and \`spec\` = ${TAB}`)
    SetSpecAutolearn(CLASS, TAB, 20, GetID(`Spell`, 'dh-spells', 'warr-fur-berserkerstance'))
    SetSpecAutolearn(CLASS, TAB, 16, GetID(`Spell`, `dh-spells`, `warr-fur-furiousattacks`))
    SetSpecAutolearn(CLASS, TAB, 10, GetID(`Spell`, `dh-spells`, `warr-fur-whirlingberserker`))

    QueryWorld(`Delete from forge_talents where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_prereq where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_ranks where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_unlearn where talentTabId = ${TAB}`)

    let Talent : uint32 = GetID(`Spell`, `dh-spells`, `warr-fur-bloodthirst`)
    SetTalentNode(Talent, TAB, 6, 1, 0, false, 2**(TAB-1), CreateArray<uint32>([Talent]), EmptyPrereqs, EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `warr-fur-titansgrip`)
    SetChoiceNode(Talent, TAB, 6, 2, 0, true, CreateArray<uint32>([Talent, GetID(`Spell`, `dh-spells`, `warr-fur-smf`)]), CreateDictionary<uint32, uint8>({[GetID('Spell', 'dh-spells', 'warr-fur-bloodthirst')]: 1}), EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'warr-fur-sidearm')
    SetTalentNode(Talent, TAB, 5, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `warr-fur-titansgrip`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'warr-fur-flurry')
    SetTalentNode(Talent, TAB, 6, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `warr-fur-titansgrip`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'warr-fur-savageassault')
    SetTalentNode(Talent, TAB, 7, 3, 0, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `warr-fur-titansgrip`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'warr-fur-ragingrush')
    SetTalentNode(Talent, TAB, 4, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `warr-fur-sidearm`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'warr-fur-hackandslash')
    SetTalentNode(Talent, TAB, 5, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `warr-fur-sidearm`)]: 1, [GetID(`Spell`, 'dh-spells', 'warr-fur-flurry')]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'warr-fur-barbarianstrikes')
    SetTalentNode(Talent, TAB, 6, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `warr-fur-flurry`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'warr-fur-ragingvortex')
    SetTalentNode(Talent, TAB, 7, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `warr-fur-savageassault`)]: 1, [GetID(`Spell`, 'dh-spells', 'warr-fur-flurry')]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'warr-fur-wildassault')
    SetTalentNode(Talent, TAB, 8, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `warr-fur-savageassault`)]: 1}), EmptySpellArray, EmptySpellArray)
}