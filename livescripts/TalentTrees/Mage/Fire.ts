import { EmptyPrereqs, EmptySpellArray, SetChoiceNode, SetSpecAutolearn, SetTalentNode, SpecTabs } from "../TalentTreeLoader"

export function ReloadMageFireTree() {
    let TAB: uint32 = SpecTabs.FIRE
    let CLASS = Class.MAGE

    QueryWorld(`delete from character_spec_autolearn where \`class\` = ${CLASS} and \`spec\` = ${TAB}`)
    SetSpecAutolearn(CLASS, TAB, 10, GetID(`Spell`, `dh-spells`, `mag-fir-hotstreak`))
    SetSpecAutolearn(CLASS, TAB, 16, GetID(`Spell`, `dh-spells`, `mag-fir-flamestrike`))
    SetSpecAutolearn(CLASS, TAB, 20, GetID(`Spell`, `dh-spells`, `mag-fir-criticalmass`))
    SetSpecAutolearn(CLASS, TAB, 10, GetID(`Spell`, `dh-spells`, `mag-fir-mastery`))

    QueryWorld(`Delete from forge_talents where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_prereq where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_ranks where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_unlearn where talentTabId = ${TAB}`)

    let Talent : uint32 = GetID(`Spell`, 'dh-spells', `mag-fir-pyroblast`)
    SetTalentNode(Talent, TAB, 6, 1, 0, false, 2**(TAB - 1), CreateArray<uint32>([Talent]), EmptyPrereqs, EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `mag-fir-fireblast`)
    SetTalentNode(Talent, TAB, 5, 2, 0, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `mag-fir-pyroblast`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `mag-fir-instantblaze`)
    SetTalentNode(Talent, TAB, 6, 2, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `mag-fir-pyroblast`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `mag-fir-livingbomb`)
    SetTalentNode(Talent, TAB, 7, 2, 0, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `mag-fir-pyroblast`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `mag-fir-fuelthefire`)
    SetTalentNode(Talent, TAB, 4, 3, 0, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `mag-fir-fireblast`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `mag-fir-dragonheart`)
    SetTalentNode(Talent, TAB, 6, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `mag-fir-fireblast`)]: 1, [GetID(`Spell`, `dh-spells`, `mag-fir-instantblaze`)]: 1, [GetID(`Spell`, `dh-spells`, `mag-fir-livingbomb`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `mag-fir-livingbombardment`)
    SetTalentNode(Talent, TAB, 8, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `mag-fir-livingbomb`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `mag-fir-feedthefire`)
    SetTalentNode(Talent, TAB, 3, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `mag-fir-fuelthefire`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `mag-fir-pyrotechnics`)
    SetTalentNode(Talent, TAB, 5, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `mag-fir-fuelthefire`)]: 1, [GetID(`Spell`, `dh-spells`, `mag-fir-dragonheart`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `mag-fir-burningbrighter`)
    SetTalentNode(Talent, TAB, 7, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `mag-fir-dragonheart`)]: 1, [GetID(`Spell`, `dh-spells`, `mag-fir-livingbombardment`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `mag-fir-livingmissile`)
    SetTalentNode(Talent, TAB, 9, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `mag-fir-livingbombardment`)]: 1}), EmptySpellArray, EmptySpellArray)
}