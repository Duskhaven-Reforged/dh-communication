import { EmptyPrereqs, EmptySpellArray, SetChoiceNode, SetSpecAutolearn, SetTalentNode, SpecTabs } from "../TalentTreeLoader"

export function ReloadMMTree() {
    let TAB = SpecTabs.MMHU
    let CLASS = Class.HUNTER

    QueryWorld(`delete from character_spec_autolearn where \`class\` = ${CLASS} and \`spec\` = ${TAB}`)
    SetSpecAutolearn(CLASS, TAB, 10, GetID(`Spell`, 'dh-spells', 'hun-mm-wildhunt'))
    SetSpecAutolearn(CLASS, TAB, 16, GetID(`Spell`, 'dh-spells', 'hun-mm-showinginitiative'))

    QueryWorld(`Delete from forge_talents where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_prereq where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_ranks where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_unlearn where talentTabId = ${TAB}`)

    let Talent : uint32 = GetID(`Spell`, `dh-spells`, `hun-mm-aimedshot`)
    SetTalentNode(Talent, TAB, 6, 1, 0, false, 2**(TAB-1), CreateArray<uint32>([Talent]), EmptyPrereqs, EmptySpellArray, EmptySpellArray)

    Talent = GetID(`Spell`, 'dh-spells', 'hun-mm-lockandload')
    SetTalentNode(Talent, TAB, 5, 2, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `hun-mm-aimedshot`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'hun-mm-controlledbreathing')
    SetTalentNode(Talent, TAB, 7, 2, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `hun-mm-aimedshot`)]: 1}), EmptySpellArray, EmptySpellArray)

    Talent = GetID(`Spell`, 'dh-spells', 'hun-mm-arcaneecho')
    SetTalentNode(Talent, TAB, 4, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `hun-mm-lockandload`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'hun-mm-trickshots')
    SetTalentNode(Talent, TAB, 6, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `hun-mm-lockandload`)]: 1, [GetID(`Spell`, `dh-spells`, `hun-mm-controlledbreathing`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'hun-mm-piercingshots')
    SetTalentNode(Talent, TAB, 8, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `hun-mm-controlledbreathing`)]: 1}), EmptySpellArray, EmptySpellArray)

    Talent = GetID(`Spell`, 'dh-spells', 'hun-mm-residualarcana')
    SetTalentNode(Talent, TAB, 4, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `hun-mm-arcaneecho`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'hun-mm-chimaerasting')
    SetTalentNode(Talent, TAB, 5, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `hun-mm-arcaneecho`)]: 1, [GetID(`Spell`, `dh-spells`, `hun-mm-trickshots`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'hun-mm-volley')
    SetTalentNode(Talent, TAB, 6, 4, 0, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `hun-mm-trickshots`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'hun-mm-entrapment')
    SetTalentNode(Talent, TAB, 7, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `hun-mm-trickshots`)]: 1, [GetID(`Spell`, `dh-spells`, `hun-mm-piercingshots`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'hun-mm-debilitatingblade')
    SetTalentNode(Talent, TAB, 8, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `hun-mm-piercingshots`)]: 1}), EmptySpellArray, EmptySpellArray)

    Talent = GetID(`Spell`, 'dh-spells', 'hun-mm-ebb')
    SetTalentNode(Talent, TAB, 3, 5, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `hun-mm-residualarcana`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'hun-mm-bullseye')
    SetTalentNode(Talent, TAB, 5, 5, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `hun-mm-chimaerasting`)]: 1, [GetID(`Spell`, `dh-spells`, `hun-mm-volley`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'hun-mm-bombardment')
    SetTalentNode(Talent, TAB, 6, 5, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `hun-mm-volley`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'hun-mm-takedown')
    SetTalentNode(Talent, TAB, 7, 5, 8, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `hun-mm-volley`)]: 1, [GetID(`Spell`, `dh-spells`, `hun-mm-debilitatingblade`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'hun-mm-penetratingshots')
    SetTalentNode(Talent, TAB, 9, 5, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `hun-mm-debilitatingblade`)]: 1}), EmptySpellArray, EmptySpellArray)

    Talent = GetID(`Spell`, 'dh-spells', 'hun-mm-snapfire')
    SetTalentNode(Talent, TAB, 4, 6, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `hun-mm-ebb`)]: 1, [GetID(`Spell`, `dh-spells`, `hun-mm-bullseye`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'hun-mm-separationtraining')
    SetTalentNode(Talent, TAB, 5, 6, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `hun-mm-bullseye`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'hun-mm-mastermarksman')
    SetTalentNode(Talent, TAB, 6, 6, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `hun-mm-bullseye`)]: 1, [GetID(`Spell`, `dh-spells`, `hun-mm-bombardment`)]: 1, [GetID(`Spell`, `dh-spells`, `hun-mm-takedown`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'hun-mm-termination')
    SetTalentNode(Talent, TAB, 7, 6, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `hun-mm-takedown`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'hun-mm-stressrelief')
    SetTalentNode(Talent, TAB, 8, 6, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `hun-mm-takedown`)]: 1, [GetID(`Spell`, `dh-spells`, `hun-mm-penetratingshots`)]: 1}), EmptySpellArray, EmptySpellArray)

    Talent = GetID(`Spell`, 'dh-spells', 'hun-mm-preptime')
    SetTalentNode(Talent, TAB, 4, 7, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `hun-mm-snapfire`)]: 1, [GetID(`Spell`, `dh-spells`, `hun-mm-separationtraining`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'hun-mm-thrillofthehunt')
    SetTalentNode(Talent, TAB, 5, 7, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `hun-mm-separationtraining`)]: 1, [GetID(`Spell`, `dh-spells`, `hun-mm-mastermarksman`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'hun-mm-trueshottechnique')
    SetTalentNode(Talent, TAB, 6, 7, 8, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `hun-mm-mastermarksman`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'hun-mm-resistanceisfutile')
    SetTalentNode(Talent, TAB, 7, 7, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `hun-mm-mastermarksman`)]: 1, [GetID(`Spell`, `dh-spells`, `hun-mm-termination`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'hun-mm-wildquiver')
    SetTalentNode(Talent, TAB, 8, 7, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `hun-mm-termination`)]: 1, [GetID(`Spell`, `dh-spells`, `hun-mm-stressrelief`)]: 1}), EmptySpellArray, EmptySpellArray)
}