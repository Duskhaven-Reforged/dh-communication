import { EmptyPrereqs, EmptySpellArray, SetChoiceNode, SetSpecAutolearn, SetTalentNode, SpecTabs } from "../TalentTreeLoader"

export function ReloadWarriorProtTree() {
    let TAB: uint32 = SpecTabs.PWAR
    let CLASS = Class.WARRIOR

    QueryWorld(`delete from character_spec_autolearn where \`class\` = ${CLASS} and \`spec\` = ${TAB}`)
    SetSpecAutolearn(CLASS, TAB, 16, GetID(`Spell`, 'dh-spells', 'warr-pro-demoshout'))
    SetSpecAutolearn(CLASS, TAB, 9, GetID(`Spell`, `dh-spells`, `warr-pro-dstance`))
    SetSpecAutolearn(CLASS, TAB, 10, GetID(`Spell`, `dh-spells`, `warr-pro-taunt`))
    SetSpecAutolearn(CLASS, TAB, 12, GetID(`Spell`, `dh-spells`, `warr-pro-athlete`))
    SetSpecAutolearn(CLASS, TAB, 16, GetID(`Spell`, `dh-spells`, `warr-pro-shieldwall`))
    SetSpecAutolearn(CLASS, TAB, 20, GetID(`Spell`, `dh-spells`, `warr-pro-challengingshout`))
    SetSpecAutolearn(CLASS, TAB, 25, GetID(`Spell`, `dh-spells`, `warr-pro-laststand`))

    QueryWorld(`Delete from forge_talents where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_prereq where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_ranks where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_unlearn where talentTabId = ${TAB}`)

    let Talent : uint32 = GetID(`Spell`, `dh-spells`, `warr-pro-shieldslam`)
    SetTalentNode(Talent, TAB, 6, 1, 0, false, 2**(TAB-1), CreateArray<uint32>([Talent]), EmptyPrereqs, EmptySpellArray, EmptySpellArray)
    
    Talent = GetID(`Spell`, 'dh-spells', 'warr-pro-revenge')
    SetTalentNode(Talent, TAB, 6, 2, 0, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `warr-pro-shieldslam`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'warr-pro-devastate')
    SetTalentNode(Talent, TAB, 5, 2, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `warr-pro-revenge`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'warr-pro-skirmishersstamina')
    SetTalentNode(Talent, TAB, 7, 2, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `warr-pro-revenge`)]: 1}), EmptySpellArray, EmptySpellArray)
    
    Talent = GetID(`Spell`, 'dh-spells', 'warr-pro-loudmanagement')
    SetTalentNode(Talent, TAB, 3, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `warr-pro-devastate`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'warr-pro-galvanized')
    SetTalentNode(Talent, TAB, 5, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `warr-pro-devastate`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'warr-pro-revengeance')
    SetTalentNode(Talent, TAB, 6, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `warr-pro-revenge`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'warr-pro-fewstoodagainstmany')
    SetTalentNode(Talent, TAB, 7, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `warr-pro-skirmishersstamina`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'warr-pro-shieldmastery')
    SetTalentNode(Talent, TAB, 9, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `warr-pro-skirmishersstamina`)]: 1}), EmptySpellArray, EmptySpellArray)
    
    Talent = GetID(`Spell`, 'dh-spells', 'warr-pro-swordandboard')
    SetTalentNode(Talent, TAB, 6, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `warr-pro-galvanized`)]: 1, [GetID(`Spell`, `dh-spells`, `warr-pro-revengeance`)]: 1, [GetID(`Spell`, `dh-spells`, `warr-pro-fewstoodagainstmany`)]: 1}), EmptySpellArray, EmptySpellArray)
    
    Talent = GetID(`Spell`, 'dh-spells', 'warr-pro-thunderlord')
    SetTalentNode(Talent, TAB, 3, 5, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `warr-pro-loudmanagement`)]: 1, [GetID(`Spell`, `dh-spells`, `warr-pro-galvanized`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'warr-pro-shieldcharge')
    SetTalentNode(Talent, TAB, 6, 5, 8, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `warr-pro-swordandboard`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'warr-pro-defensivemaneuvers')
    SetTalentNode(Talent, TAB, 9, 5, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `warr-pro-fewstoodagainstmany`)]: 1, [GetID(`Spell`, `dh-spells`, `warr-pro-shieldmastery`)]: 1}), EmptySpellArray, EmptySpellArray)
    
    Talent = GetID(`Spell`, 'dh-spells', 'warr-pro-staticcontact')
    SetTalentNode(Talent, TAB, 2, 6, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `warr-pro-thunderlord`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'warr-pro-thunderousblow')
    SetTalentNode(Talent, TAB, 4, 6, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `warr-pro-thunderlord`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'warr-pro-batteringram')
    SetTalentNode(Talent, TAB, 5, 6, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `warr-pro-shieldcharge`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'warr-pro-violentoutburst')
    SetTalentNode(Talent, TAB, 6, 6, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `warr-pro-shieldcharge`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'warr-pro-breakingstrikes')
    SetTalentNode(Talent, TAB, 7, 6, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `warr-pro-shieldcharge`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'warr-pro-citicalblock')
    SetTalentNode(Talent, TAB, 8, 6, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `warr-pro-defensivemaneuvers`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'warr-pro-shieldbash')
    SetTalentNode(Talent, TAB, 10, 6, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `warr-pro-defensivemaneuvers`)]: 1}), EmptySpellArray, EmptySpellArray)
    
    Talent = GetID(`Spell`, 'dh-spells', 'warr-pro-secretofsteel')
    SetTalentNode(Talent, TAB, 3, 7, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `warr-pro-staticcontact`)]: 1, [GetID(`Spell`, `dh-spells`, `warr-pro-thunderousblow`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'warr-pro-revengeofthegladiator')
    SetTalentNode(Talent, TAB, 5, 7, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `warr-pro-thunderousblow`)]: 1, [GetID(`Spell`, `dh-spells`, `warr-pro-batteringram`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'warr-pro-indomitable')
    SetTalentNode(Talent, TAB, 6, 7, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `warr-pro-batteringram`)]: 1, [GetID(`Spell`, `dh-spells`, `warr-pro-violentoutburst`)]: 1, [GetID(`Spell`, `dh-spells`, `warr-pro-breakingstrikes`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'warr-pro-removethehead')
    SetTalentNode(Talent, TAB, 7, 7, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `warr-pro-breakingstrikes`)]: 1, [GetID(`Spell`, `dh-spells`, `warr-pro-citicalblock`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'warr-pro-secretofflesh')
    SetTalentNode(Talent, TAB, 9, 7, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `warr-pro-citicalblock`)]: 1, [GetID(`Spell`, `dh-spells`, `warr-pro-shieldbash`)]: 1}), EmptySpellArray, EmptySpellArray)
}