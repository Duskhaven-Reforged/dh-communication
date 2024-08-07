import { EmptyPrereqs, EmptySpellArray, SetChoiceNode, SetSpecAutolearn, SetTalentNode, SpecTabs } from "../TalentTreeLoader"

export function ReloadShamanRestoTree() {
    let TAB: uint32 = SpecTabs.RSHA
    let CLASS = Class.SHAMAN

    QueryWorld(`delete from character_spec_autolearn where \`class\` = ${CLASS} and \`spec\` = ${TAB}`)
    SetSpecAutolearn(CLASS, TAB, 10, GetID(`Spell`, `dh-spells`, `sha-res-naturesblessing`))
    SetSpecAutolearn(CLASS, TAB, 20, GetID(`Spell`, `dh-spells`, `sha-res-acidwaters`))
    SetSpecAutolearn(CLASS, TAB, 20, GetID(`Spell`, `dh-spells`, `sha-res-earthsblessing`))
    SetSpecAutolearn(CLASS, TAB, 10, GetID(`Spell`, `dh-spells`, `sha-res-mastery`))

    QueryWorld(`Delete from forge_talents where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_prereq where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_ranks where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_unlearn where talentTabId = ${TAB}`)

    let Talent : uint32 = GetID(`Spell`, 'dh-spells', `sha-res-riptide`)
    SetTalentNode(Talent, TAB, 6, 1, 0, false, 2**(TAB-1), CreateArray<uint32>([Talent]), EmptyPrereqs, EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `sha-res-healingrain`)
    SetTalentNode(Talent, TAB, 5, 2, 0, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `sha-res-riptide`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `sha-res-greaterhealingwave`)
    SetTalentNode(Talent, TAB, 6, 2, 0, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `sha-res-riptide`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `sha-res-earthshield`)
    SetTalentNode(Talent, TAB, 7, 2, 0, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `sha-res-riptide`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `sha-res-acidrain`)
    SetTalentNode(Talent, TAB, 4, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `sha-res-healingrain`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `sha-res-overflowingshores`)
    SetTalentNode(Talent, TAB, 5, 3, 0, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `sha-res-healingrain`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `sha-res-tidalwaves`)
    SetTalentNode(Talent, TAB, 6, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `sha-res-healingrain`)]: 1, [GetID(`Spell`, `dh-spells`, `sha-res-greaterhealingwave`)]: 1, [GetID(`Spell`, `dh-spells`, `sha-res-earthshield`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `sha-res-torrent`)
    SetTalentNode(Talent, TAB, 7, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `sha-res-earthshield`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `sha-res-cultivatingearth`)
    SetTalentNode(Talent, TAB, 8, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `sha-res-earthshield`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `sha-res-astralalignment`)
    SetTalentNode(Talent, TAB, 3, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `sha-res-acidrain`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `sha-res-earthsempoweringpetrichor`)
    SetTalentNode(Talent, TAB, 4, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `sha-res-acidrain`)]: 1, [GetID(`Spell`, `dh-spells`, `sha-res-overflowingshores`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `sha-res-farshores`)
    SetChoiceNode(Talent, TAB, 6, 4, 0, true, CreateArray<uint32>([Talent, GetID(`Spell`, `dh-spells`, `sha-res-flowofthetides`)]), CreateDictionary<uint32, uint8>({[GetID('Spell', 'dh-spells', 'sha-res-overflowingshores')]: 1,  [GetID('Spell', 'dh-spells', 'sha-res-tidalwaves')]: 1, [GetID('Spell', 'dh-spells', 'sha-res-torrent')]: 1}), EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `sha-res-wavespeakersblessing`)
    SetTalentNode(Talent, TAB, 8, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `sha-res-torrent`)]: 1, [GetID(`Spell`, `dh-spells`, `sha-res-cultivatingearth`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `sha-res-undulation`)
    SetTalentNode(Talent, TAB, 9, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `sha-res-cultivatingearth`)]: 1}), EmptySpellArray, EmptySpellArray)
}
