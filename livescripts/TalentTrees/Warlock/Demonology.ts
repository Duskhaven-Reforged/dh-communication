import { EmptyPrereqs, EmptySpellArray, SetChoiceNode, SetSpecAutolearn, SetTalentNode, SpecTabs } from "../TalentTreeLoader"

export function ReloadDemoLockTree() {
    let TAB: uint32 = SpecTabs.DEMO
    let CLASS = Class.WARLOCK

    QueryWorld(`delete from character_spec_autolearn where \`class\` = ${CLASS} and \`spec\` = ${TAB}`)
    //SetSpecAutolearn(CLASS, TAB, 10, GetID(`Spell`, 'dh-spells', 'warl-dem-mastery'))
    SetSpecAutolearn(CLASS, TAB, 10, GetID(`Spell`, 'dh-spells', 'warl-dem-handofguldan'))
    SetSpecAutolearn(CLASS, TAB, 10, GetID(`Spell`, 'dh-spells', 'warl-dem-summonfelguard'))
    SetSpecAutolearn(CLASS, TAB, 10, GetID(`Spell`, 'dh-spells', 'warl-des-incinerate'))
    SetSpecAutolearn(CLASS, TAB, 10, GetID(`Spell`, 'dh-spells', 'warl-des-soulfire'))
    SetSpecAutolearn(CLASS, TAB, 15, GetID(`Spell`, 'dh-spells', 'warl-dem-demonpowered'))
    SetSpecAutolearn(CLASS, TAB, 16, GetID(`Spell`, 'dh-spells', 'warl-des-rainoffire'))
    SetSpecAutolearn(CLASS, TAB, 16, GetID(`Spell`, 'dh-spells', 'warl-dem-demonicwrath'))

    QueryWorld(`Delete from forge_talents where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_prereq where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_ranks where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_unlearn where talentTabId = ${TAB}`)

    let Talent : uint32 = GetID(`Spell`, 'dh-spells', 'warl-dem-grimoirefelguard')
    SetTalentNode(Talent, TAB, 5, 1, 0, false, 2**(TAB-1), CreateArray<uint32>([Talent]), EmptyPrereqs, EmptySpellArray, EmptySpellArray)

    Talent = GetID(`Spell`, `dh-spells`, `warl-dem-demonbolt`)
    SetTalentNode(Talent, TAB, 5, 2, 0, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `warl-dem-grimoirefelguard`)]: 1}), EmptySpellArray, EmptySpellArray)

    Talent = GetID(`Spell`, `dh-spells`, `warl-dem-grimoirefelhunter`)
    SetChoiceNode(Talent, TAB, 4, 3, 0, false, CreateArray<uint32>([Talent, GetID(`Spell`, `dh-spells`, `warl-dem-grimoirevoidwalker`)]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `warl-dem-demonbolt`)]: 1}), EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `warl-dem-sufferandperish`)
    SetTalentNode(Talent, TAB, 5, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `warl-dem-demonbolt`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `warl-dem-grimoiresuccubus`)
    SetChoiceNode(Talent, TAB, 6, 3, 0, false, CreateArray<uint32>([Talent, GetID(`Spell`, `dh-spells`, `warl-dem-grimoireimp`)]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `warl-dem-demonbolt`)]: 1}), EmptySpellArray)

    Talent = GetID(`Spell`, `dh-spells`, `warl-dem-drawntocorruption`)
    SetTalentNode(Talent, TAB, 3, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `warl-dem-grimoirefelhunter`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `warl-dem-shadowyassistance`)
    SetTalentNode(Talent, TAB, 4, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `warl-dem-grimoirefelhunter`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `warl-dem-burningsynergy`)
    SetTalentNode(Talent, TAB, 6, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `warl-dem-grimoiresuccubus`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `warl-dem-mothtoflame`)
    SetTalentNode(Talent, TAB, 7, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `warl-dem-grimoiresuccubus`)]: 1}), EmptySpellArray, EmptySpellArray)
}