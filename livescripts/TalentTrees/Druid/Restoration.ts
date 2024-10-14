import { EmptyPrereqs, EmptySpellArray, SetChoiceNode, SetSpecAutolearn, SetTalentNode, SpecTabs } from "../TalentTreeLoader"

export function ReloadRestoDruidTree() {
    let TAB: uint32 = SpecTabs.RDRU
    let CLASS = Class.DRUID

    QueryWorld(`delete from character_spec_autolearn where \`class\` = ${CLASS} and \`spec\` = ${TAB}`)
    // SetSpecAutolearn(CLASS, TAB, 10, GetID(`Spell`, `dh-spells`, `dru-res-mastery`))
    
    QueryWorld(`Delete from forge_talents where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_prereq where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_ranks where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_unlearn where talentTabId = ${TAB}`)

    let Talent : uint32 = GetID(`Spell`, 'dh-spells', `dru-res-wildgrowth`)
    SetTalentNode(Talent, TAB, 6, 1, 0, false, 2**(TAB-1), CreateArray<uint32>([Talent]), EmptyPrereqs, EmptySpellArray, EmptySpellArray)
    
    Talent = GetID(`Spell`, `dh-spells`, `dru-res-wildovergrowth`)
    SetChoiceNode(Talent, TAB, 6, 2, 0, true, CreateArray<uint32>([Talent, GetID(`Spell`, `dh-spells`, `dru-res-unendinggrowth`)]), CreateDictionary<uint32, uint8>({[GetID('Spell', 'dh-spells', 'dru-res-wildgrowth')]: 1}), EmptySpellArray)
    
    Talent = GetID(`Spell`, `dh-spells`, `dru-res-swiftmend`)
    SetTalentNode(Talent, TAB, 5, 3, 0, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dru-res-wildovergrowth`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `dru-res-naturesbalance`)
    SetTalentNode(Talent, TAB, 6, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dru-res-wildovergrowth`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `dru-res-adaptiveswarm`)
    SetTalentNode(Talent, TAB, 7, 3, 0, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dru-res-wildovergrowth`)]: 1}), EmptySpellArray, EmptySpellArray)
    
    Talent = GetID(`Spell`, `dh-spells`, `dru-res-reforestation`)
    SetTalentNode(Talent, TAB, 4, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dru-res-swiftmend`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `dru-res-grovetending`)
    SetTalentNode(Talent, TAB, 5, 4, 0, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dru-res-swiftmend`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `dru-res-naturealacrity`)
    SetTalentNode(Talent, TAB, 6, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dru-res-swiftmend`)]: 1, [GetID(`Spell`, `dh-spells`, `dru-res-naturesbalance`)]: 1, [GetID(`Spell`, `dh-spells`, `dru-res-adaptiveswarm`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `dru-res-essenceleech`)
    SetTalentNode(Talent, TAB, 7, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dru-res-adaptiveswarm`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `dru-res-menderswrath`)
    SetTalentNode(Talent, TAB, 8, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dru-res-adaptiveswarm`)]: 1}), EmptySpellArray, EmptySpellArray)

    Talent = GetID(`Spell`, 'dh-spells', 'dru-res-regenesis')
    SetTalentNode(Talent, TAB, 3, 5, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dru-res-reforestation`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'dru-res-abundance')
    SetTalentNode(Talent, TAB, 5, 5, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dru-res-grovetending`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'dru-res-flourish')
    SetTalentNode(Talent, TAB, 6, 5, 8, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dru-res-essenceleech`)]: 1, [GetID(`Spell`, `dh-spells`, `dru-res-naturealacrity`)]: 1, [GetID(`Spell`, `dh-spells`, `dru-res-grovetending`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'dru-res-harmoniousblooming')
    SetTalentNode(Talent, TAB, 7, 5, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dru-res-essenceleech`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'dru-res-verdantspores')
    SetTalentNode(Talent, TAB, 8, 5, 8, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dru-res-essenceleech`)]: 1, [GetID(`Spell`, `dh-spells`, `dru-res-menderswrath`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'dru-res-angrymending')
    SetTalentNode(Talent, TAB, 9, 5, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dru-res-menderswrath`)]: 1}), EmptySpellArray, EmptySpellArray)

    Talent = GetID(`Spell`, 'dh-spells', 'dru-res-innerpeace')
    SetTalentNode(Talent, TAB, 3, 6, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dru-res-regenesis`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'dru-res-wildsynthesis')
    SetTalentNode(Talent, TAB, 4, 6, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dru-res-regenesis`)]: 1, [GetID(`Spell`, `dh-spells`, `dru-res-abundance`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'dru-res-ironbark')
    SetTalentNode(Talent, TAB, 5, 6, 8, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dru-res-abundance`)]: 1, [GetID(`Spell`, `dh-spells`, `dru-res-flourish`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'dru-res-childofthegrove')
    SetTalentNode(Talent, TAB, 6, 6, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dru-res-flourish`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'dru-res-naturesswiftness')
    SetTalentNode(Talent, TAB, 7, 6, 8, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dru-res-flourish`)]: 1, [GetID(`Spell`, `dh-spells`, `dru-res-harmoniousblooming`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'dru-res-rampantgrowth')
    SetTalentNode(Talent, TAB, 8, 6, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dru-res-harmoniousblooming`)]: 1, [GetID(`Spell`, `dh-spells`, `dru-res-verdantspores`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'dru-res-naturalselection')
    SetTalentNode(Talent, TAB, 9, 6, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dru-res-verdantspores`)]: 1}), EmptySpellArray, EmptySpellArray)

    Talent = GetID(`Spell`, 'dh-spells', 'dru-res-invigorate')
    SetTalentNode(Talent, TAB, 3, 7, 8, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dru-res-innerpeace`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'dru-res-healingforests1')
    SetTalentNode(Talent, TAB, 4, 7, 8, true, 0, CreateArray<uint32>([Talent, GetID(`Spell`, 'dh-spells', 'dru-res-healingforests2')]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dru-res-wildsynthesis`)]: 1, [GetID(`Spell`, `dh-spells`, `dru-res-ironbark`)]: 1, [GetID(`Spell`, `dh-spells`, `dru-res-innerpeace`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'dru-res-menderssoul')
    SetTalentNode(Talent, TAB, 5, 7, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dru-res-ironbark`)]: 1, [GetID(`Spell`, `dh-spells`, `dru-res-childofthegrove`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'dru-res-groveguardians')
    SetTalentNode(Talent, TAB, 6, 7, 8, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dru-res-childofthegrove`)]: 1, [GetID(`Spell`, `dh-spells`, `dru-res-naturesswiftness`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'dru-res-naturessplendor')
    SetChoiceNode(Talent, TAB, 7, 7, 8, true, CreateArray<uint32>([Talent, GetID('Spell', 'dh-spells', 'dru-res-passingseasons')]), CreateDictionary<uint32, uint8>({[GetID('Spell', 'dh-spells', 'dru-res-naturesswiftness')]: 1}), EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'dru-res-buddingleaves1')
    SetTalentNode(Talent, TAB, 8, 7, 8, true, 0, CreateArray<uint32>([Talent, GetID(`Spell`, 'dh-spells', 'dru-res-buddingleaves2')]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dru-res-naturesswiftness`)]: 1}), EmptySpellArray, EmptySpellArray)

}