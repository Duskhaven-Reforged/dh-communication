import { EmptyPrereqs, EmptySpellArray, SetChoiceNode, SetSpecAutolearn, SetTalentNode, SpecTabs } from "../TalentTreeLoader"

export function ReloadShamanEnhTree() {
    let TAB: uint32 = SpecTabs.ENHA
    let CLASS = Class.SHAMAN

    QueryWorld(`delete from character_spec_autolearn where \`class\` = ${CLASS} and \`spec\` = ${TAB}`)
    SetSpecAutolearn(CLASS, TAB, 10, GetID(`Spell`, `dh-spells`, `sha-enh-windfuryweapon`))
    SetSpecAutolearn(CLASS, TAB, 20, GetID(`Spell`, `dh-spells`, `sha-enh-airsfury`))
    SetSpecAutolearn(CLASS, TAB, 30, GetID(`Spell`, `dh-spells`, `sha-enh-primalweaponsexpert`))
    SetSpecAutolearn(CLASS, TAB, 10, GetID(`Spell`, `dh-spells`, `sha-enh-mastery`))

    QueryWorld(`Delete from forge_talents where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_prereq where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_ranks where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_unlearn where talentTabId = ${TAB}`)

    let Talent : uint32 = GetID(`Spell`, 'dh-spells', `sha-enh-stormstrike`)
    SetTalentNode(Talent, TAB, 6, 1, 0, false, 1 << (TAB-1), CreateArray<uint32>([Talent]), EmptyPrereqs, EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `sha-enh-ferallunge`)
    SetTalentNode(Talent, TAB, 4, 2, 0, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `sha-enh-stormstrike`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `sha-enh-improvedmaelstromweapon`)
    SetTalentNode(Talent, TAB, 6, 2, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `sha-enh-stormstrike`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `sha-enh-strengthofearth`)
    SetChoiceNode(Talent, TAB, 8, 2, 0, true, CreateArray<uint32>([Talent, GetID(`Spell`, `dh-spells`, `sha-enh-lavalash`)]), CreateDictionary<uint32, uint8>({[GetID('Spell', 'dh-spells', 'sha-enh-stormstrike')]: 1}), EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `sha-enh-forcefulwinds`)
    SetTalentNode(Talent, TAB, 3, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `sha-enh-ferallunge`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `sha-enh-feralinstincts`)
    SetTalentNode(Talent, TAB, 5, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `sha-enh-ferallunge`)]: 1, [GetID(`Spell`, `dh-spells`, `sha-enh-improvedmaelstromweapon`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `sha-enh-ragingmaelstrom`)
    SetTalentNode(Talent, TAB, 6, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `sha-enh-improvedmaelstromweapon`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `sha-enh-watersicytouch`)
    SetTalentNode(Talent, TAB, 7, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `sha-enh-improvedmaelstromweapon`)]: 1, [GetID(`Spell`, `dh-spells`, `sha-enh-strengthofearth`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `sha-enh-moltenassault`)
    SetTalentNode(Talent, TAB, 9, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `sha-enh-strengthofearth`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `sha-enh-cyclonewhirl`)
    SetTalentNode(Talent, TAB, 3, 4, 0, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `sha-enh-forcefulwinds`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `sha-enh-sundering`)
    SetTalentNode(Talent, TAB, 4, 4, 0, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `sha-enh-forcefulwinds`)]: 1, [GetID(`Spell`, `dh-spells`, `sha-enh-feralinstincts`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `sha-enh-magmatotem`)
    SetTalentNode(Talent, TAB, 6, 4, 0, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `sha-enh-feralinstincts`)]: 1, [GetID(`Spell`, `dh-spells`, `sha-enh-ragingmaelstrom`)]: 1, [GetID(`Spell`, `dh-spells`, `sha-enh-watersicytouch`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `sha-enh-icestrike`)
    SetTalentNode(Talent, TAB, 8, 4, 0, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `sha-enh-watersicytouch`)]: 1, [GetID(`Spell`, `dh-spells`, `sha-enh-moltenassault`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `sha-enh-firenova`)
    SetTalentNode(Talent, TAB, 9, 4, 0, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `sha-enh-moltenassault`)]: 1}), EmptySpellArray, EmptySpellArray)
}
