import { EmptyPrereqs, EmptySpellArray, SetSpecAutolearn, SetTalentNode, SpecTabs } from "../TalentTreeLoader"

export function ReloadFeralDruidTree() {
    let TAB: uint32 = SpecTabs.FERA
    let CLASS = Class.DRUID

    QueryWorld(`delete from character_spec_autolearn where \`class\` = ${CLASS} and \`spec\` = ${TAB}`)
    SetSpecAutolearn(CLASS, TAB, 10, GetID(`Spell`, `dh-spells`, `dru-fer-graceofthewildshaper`))
    SetSpecAutolearn(CLASS, TAB, 10, GetID(`Spell`, `dh-spells`, `dru-fer-tearingclaws`))
    SetSpecAutolearn(CLASS, TAB, 16, GetID(`Spell`, `dh-spells`, `dru-fer-leaderofthepack`))
    SetSpecAutolearn(CLASS, TAB, 20, GetID(`Spell`, `dh-spells`, `dru-fer-unendingonslaught`))
    SetSpecAutolearn(CLASS, TAB, 30, GetID(`Spell`, `dh-spells`, `dru-fer-tigersviciousness`))
    SetSpecAutolearn(CLASS, TAB, 10, GetID(`Spell`, `dh-spells`, `dru-fer-mastery`))

    QueryWorld(`Delete from forge_talents where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_prereq where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_ranks where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_unlearn where talentTabId = ${TAB}`)

    let Talent : uint32 = GetID(`Spell`, 'dh-spells', `dru-fer-rip`)
    SetTalentNode(Talent, TAB, 6, 1, 0, false, 2**(TAB-1), CreateArray<uint32>([Talent]), EmptyPrereqs, EmptySpellArray, EmptySpellArray)
    
    Talent = GetID(`Spell`, `dh-spells`, `dru-fer-ripthewound`)
    SetTalentNode(Talent, TAB, 5, 2, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dru-fer-rip`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `dru-fer-thrillinghunt`)
    SetTalentNode(Talent, TAB, 6, 2, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dru-fer-rip`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `dru-fer-savagerending`)
    SetTalentNode(Talent, TAB, 7, 2, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dru-fer-rip`)]: 1}), EmptySpellArray, EmptySpellArray)
    
    Talent = GetID(`Spell`, `dh-spells`, `dru-fer-stalkingfixation`)
    SetTalentNode(Talent, TAB, 4, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dru-fer-ripthewound`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `dru-fer-bloodthirstybites`)
    SetTalentNode(Talent, TAB, 5, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dru-fer-ripthewound`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `dru-fer-predatoryswiftness`)
    SetTalentNode(Talent, TAB, 6, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dru-fer-thrillinghunt`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `dru-fer-primalwrath`)
    SetTalentNode(Talent, TAB, 7, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dru-fer-savagerending`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `dru-fer-openwounds`)
    SetTalentNode(Talent, TAB, 8, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dru-fer-savagerending`)]: 1}), EmptySpellArray, EmptySpellArray)
    
    Talent = GetID(`Spell`, `dh-spells`, `dru-fer-suddenambush`)
    SetTalentNode(Talent, TAB, 4, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dru-fer-stalkingfixation`)]: 1, [GetID(`Spell`, `dh-spells`, `dru-fer-bloodthirstybites`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `dru-fer-nurtureandnature`)
    SetTalentNode(Talent, TAB, 6, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dru-fer-bloodthirstybites`)]: 1, [GetID(`Spell`, `dh-spells`, `dru-fer-predatoryswiftness`)]: 1, [GetID(`Spell`, `dh-spells`, `dru-fer-primalwrath`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `dru-fer-cleavingrake`)
    SetTalentNode(Talent, TAB, 8, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dru-fer-primalwrath`)]: 1, [GetID(`Spell`, `dh-spells`, `dru-fer-openwounds`)]: 1}), EmptySpellArray, EmptySpellArray)

    Talent = GetID(`Spell`, 'dh-spells', 'dru-fer-ambushandassault')
    SetTalentNode(Talent, TAB, 3, 5, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dru-fer-suddenambush`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'dru-fer-rageofthepack')
    SetTalentNode(Talent, TAB, 5, 5, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dru-fer-nurtureandnature`)]: 1, [GetID(`Spell`, `dh-spells`, `dru-fer-bloodthirstybites`)]: 1, [GetID(`Spell`, `dh-spells`, `dru-fer-suddenambush`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'dru-fer-avatarofashamane')
    SetTalentNode(Talent, TAB, 6, 5, 8, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dru-fer-nurtureandnature`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'dru-fer-mercilessclaws')
    SetTalentNode(Talent, TAB, 7, 5, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dru-fer-cleavingrake`)]: 1, [GetID(`Spell`, `dh-spells`, `dru-fer-primalwrath`)]: 1, [GetID(`Spell`, `dh-spells`, `dru-fer-nurtureandnature`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'dru-fer-tornwounds')
    SetTalentNode(Talent, TAB, 9, 5, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dru-fer-cleavingrake`)]: 1}), EmptySpellArray, EmptySpellArray)

    Talent = GetID(`Spell`, 'dh-spells', 'dru-fer-devastatingsurprise')
    SetTalentNode(Talent, TAB, 4, 6, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dru-fer-suddenambush`)]: 1, [GetID(`Spell`, `dh-spells`, `dru-fer-rageofthepack`)]: 1, [GetID(`Spell`, `dh-spells`, `dru-fer-ambushandassault`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'dru-fer-clarityofthefae')
    SetTalentNode(Talent, TAB, 6, 6, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dru-fer-avatarofashamane`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'dru-fer-tasteforblood')
    SetTalentNode(Talent, TAB, 8, 6, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dru-fer-tornwounds`)]: 1, [GetID(`Spell`, `dh-spells`, `dru-fer-cleavingrake`)]: 1, [GetID(`Spell`, `dh-spells`, `dru-fer-mercilessclaws`)]: 1}), EmptySpellArray, EmptySpellArray)

    Talent = GetID(`Spell`, 'dh-spells', 'dru-fer-sabertooth')
    SetTalentNode(Talent, TAB, 3, 7, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dru-fer-ambushandassault`)]: 1, [GetID(`Spell`, `dh-spells`, `dru-fer-devastatingsurprise`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'dru-fer-lunarstrike')
    SetTalentNode(Talent, TAB, 4, 7, 8, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dru-fer-avatarofashamane`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'dru-fer-teartheflesh1')
    SetTalentNode(Talent, TAB, 5, 7, 8, true, 0, CreateArray<uint32>([Talent, GetID(`Spell`, 'dh-spells', 'dru-fer-teartheflesh2')]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dru-fer-clarityofthefae`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'dru-fer-cycleoflife')
    SetTalentNode(Talent, TAB, 6, 7, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dru-fer-clarityofthefae`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'dru-fer-relentlesspredator1')
    SetTalentNode(Talent, TAB, 7, 7, 8, true, 0, CreateArray<uint32>([Talent, GetID(`Spell`, 'dh-spells', 'dru-fer-relentlesspredator2')]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dru-fer-clarityofthefae`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'dru-fer-savageroar')
    SetTalentNode(Talent, TAB, 8, 7, 8, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dru-fer-avatarofashamane`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'dru-fer-rendingfangs')
    SetTalentNode(Talent, TAB, 9, 7, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dru-fer-tornwounds`)]: 1, [GetID(`Spell`, `dh-spells`, `dru-fer-tasteforblood`)]: 1}), EmptySpellArray, EmptySpellArray)

}