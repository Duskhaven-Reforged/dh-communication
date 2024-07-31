import { EmptyPrereqs, EmptySpellArray, SetChoiceNode, SetSpecAutolearn, SetTalentNode, SpecTabs } from "../TalentTreeLoader"

export function ReloadMageArcaneTree() {
    let TAB: uint32 = SpecTabs.ARCA
    let CLASS = Class.MAGE

    QueryWorld(`delete from character_spec_autolearn where \`class\` = ${CLASS} and \`spec\` = ${TAB}`)
    SetSpecAutolearn(CLASS, TAB, 10, GetID(`Spell`, `dh-spells`, `mag-arc-clearcasting`))
    SetSpecAutolearn(CLASS, TAB, 20, GetID(`Spell`, `dh-spells`, `mag-arc-arcaneinstability`))
    SetSpecAutolearn(CLASS, TAB, 10, GetID(`Spell`, `dh-spells`, `mag-arc-mastery`))

    QueryWorld(`Delete from forge_talents where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_prereq where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_ranks where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_unlearn where talentTabId = ${TAB}`)

    let Talent : uint32 = GetID(`Spell`, 'dh-spells', `mag-arc-arcaneblast`)
    SetTalentNode(Talent, TAB, 6, 1, 0, false, 1 << (TAB - 1), CreateArray<uint32>([Talent]), EmptyPrereqs, EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `mag-arc-arcanebarrage`)
    SetTalentNode(Talent, TAB, 5, 2, 0, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `mag-arc-arcaneblast`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `mag-arc-ruleofthrees`)
    SetTalentNode(Talent, TAB, 6, 2, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `mag-arc-arcaneblast`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `mag-arc-arcanemissiles`)
    SetTalentNode(Talent, TAB, 7, 2, 0, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `mag-arc-arcaneblast`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `mag-arc-arcanesalvos`)
    SetTalentNode(Talent, TAB, 4, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `mag-arc-arcanebarrage`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `mag-arc-arcingbarrage`)
    SetTalentNode(Talent, TAB, 5, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `mag-arc-arcanebarrage`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `mag-arc-reverberation`)
    SetTalentNode(Talent, TAB, 6, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `mag-arc-arcanebarrage`)]: 1, [GetID(`Spell`, `dh-spells`, `mag-arc-ruleofthrees`)]: 1, [GetID(`Spell`, `dh-spells`, `mag-arc-arcanemissiles`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `mag-arc-arcaneanomaly`)
    SetTalentNode(Talent, TAB, 7, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `mag-arc-arcanemissiles`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `mag-arc-arcanetempo`)
    SetTalentNode(Talent, TAB, 8, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `mag-arc-arcanemissiles`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `mag-arc-arcanebrands`)
    SetTalentNode(Talent, TAB, 4, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `mag-arc-arcanesalvos`)]: 1, [GetID(`Spell`, `dh-spells`, `mag-arc-arcingbarrage`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `mag-arc-arcanosphere`)
    SetTalentNode(Talent, TAB, 6, 4, 0, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `mag-arc-arcingbarrage`)]: 1, [GetID(`Spell`, `dh-spells`, `mag-arc-reverberation`)]: 1, [GetID(`Spell`, `dh-spells`, `mag-arc-arcaneanomaly`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `mag-arc-arcaneprecision`)
    SetTalentNode(Talent, TAB, 8, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `mag-arc-arcaneanomaly`)]: 1, [GetID(`Spell`, `dh-spells`, `mag-arc-arcanetempo`)]: 1}), EmptySpellArray, EmptySpellArray)
}
