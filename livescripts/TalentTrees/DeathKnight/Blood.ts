import { EmptyPrereqs, EmptySpellArray, SetChoiceNode, SetSpecAutolearn, SetTalentNode, SpecTabs } from "../TalentTreeLoader"

export function ReloadDKBloodTree() {
    let TAB : uint32 = SpecTabs.BDK
    let CLASS = Class.DEATH_KNIGHT

    QueryWorld(`delete from character_spec_autolearn where \`class\` = ${CLASS} and \`spec\` = ${TAB}`)
    SetSpecAutolearn(CLASS, TAB, 10, GetID(`Spell`, 'dh-spells', 'dk-blo-debilitatingdisease'))
    SetSpecAutolearn(CLASS, TAB, 10, GetID(`Spell`, 'dh-spells', 'dk-blo-darkcommand'))
    SetSpecAutolearn(CLASS, TAB, 16, GetID(`Spell`, 'dh-spells', 'dk-blo-darkguardian'))

    QueryWorld(`Delete from forge_talents where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_prereq where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_ranks where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_unlearn where talentTabId = ${TAB}`)

    let Talent : uint32 = GetID(`Spell`, 'dh-spells', 'dk-blo-marrowrend')
    SetTalentNode(Talent, TAB, 6, 1, 0, false, 2**(TAB-1), CreateArray<uint32>([Talent]), EmptyPrereqs, EmptySpellArray, EmptySpellArray)
    
    Talent = 55233
    SetTalentNode(Talent, TAB, 6, 2, 0, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dk-blo-marrowrend`)]: 1}), EmptySpellArray, EmptySpellArray)
    
    Talent = GetID(`Spell`, `dh-spells`, `dk-blo-tombstone`)
    SetTalentNode(Talent, TAB, 5, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({55233: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `dk-blo-goliathstrike`)
    SetTalentNode(Talent, TAB, 6, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({55233: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `dk-blo-crimsonscourge`)
    SetTalentNode(Talent, TAB, 7, 3, 0, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({55233: 1}), CreateArray<uint32>([GetID(`Spell`, `dh-spells`, `dk-gen-deathanddecay`)]), EmptySpellArray)
    
    Talent = GetID(`Spell`, `dh-spells`, `dk-blo-runetap`)
    SetTalentNode(Talent, TAB, 4, 4, 0, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dk-blo-tombstone`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `dk-blo-undyingresolve`)
    SetTalentNode(Talent, TAB, 5, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dk-blo-tombstone`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `dk-blo-abominationsmight`)
    SetTalentNode(Talent, TAB, 6, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dk-blo-tombstone`)]: 1, [GetID(`Spell`, `dh-spells`, `dk-blo-goliathstrike`)]: 1, [GetID(`Spell`, `dh-spells`, `dk-blo-crimsonscourge`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `dk-blo-bloodfeastingrunes`)
    SetTalentNode(Talent, TAB, 7, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dk-blo-crimsonscourge`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `dk-blo-blooddrinker`)
    SetTalentNode(Talent, TAB, 8, 4, 0, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dk-blo-crimsonscourge`)]: 1}), EmptySpellArray, EmptySpellArray)
    
    Talent = GetID(`Spell`, 'dh-spells', 'dk-blo-foulbulwark')
    SetTalentNode(Talent, TAB, 3, 5, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dk-blo-runetap`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'dk-blo-magicward')
    SetChoiceNode(Talent, TAB, 4, 5, 8, true, CreateArray<uint32>([Talent, GetID(`Spell`, 'dh-spells', 'dk-blo-lifeward')]), CreateDictionary<uint32, uint8>({[GetID('Spell', 'dh-spells', 'dk-blo-runetap')]: 1}), EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'dk-blo-bloodyvengeance')
    SetTalentNode(Talent, TAB, 5, 5, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dk-blo-runetap`)]: 1, [GetID(`Spell`, `dh-spells`, `dk-blo-undyingresolve`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'dk-blo-frozenheart')
    SetTalentNode(Talent, TAB, 6, 5, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dk-blo-bloodfeastingrunes`)]: 1, [GetID(`Spell`, `dh-spells`, `dk-blo-abominationsmight`)]: 1, [GetID(`Spell`, `dh-spells`, `dk-blo-undyingresolve`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'dk-blo-bloodymenace')
    SetTalentNode(Talent, TAB, 7, 5, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dk-blo-bloodfeastingrunes`)]: 1, [GetID(`Spell`, `dh-spells`, `dk-blo-blooddrinker`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'dk-blo-consumption')
    SetTalentNode(Talent, TAB, 8, 5, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dk-blo-blooddrinker`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'dk-blo-relishinblood')
    SetTalentNode(Talent, TAB, 9, 5, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dk-blo-blooddrinker`)]: 1}), EmptySpellArray, EmptySpellArray)

    Talent = GetID(`Spell`, 'dh-spells', 'dk-blo-improvedboneshield')
    SetTalentNode(Talent, TAB, 4, 6, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dk-blo-foulbulwark`)]: 1, [GetID(`Spell`, `dh-spells`, `dk-blo-magicward`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'dk-blo-voracious')
    SetTalentNode(Talent, TAB, 5, 6, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dk-blo-magicward`)]: 1, [GetID(`Spell`, `dh-spells`, `dk-blo-bloodyvengeance`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = 50150
    SetTalentNode(Talent, TAB, 6, 6, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dk-blo-bloodymenace`)]: 1, [GetID(`Spell`, `dh-spells`, `dk-blo-bloodyvengeance`)]: 1, [GetID(`Spell`, `dh-spells`, `dk-blo-frozenheart`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'dk-blo-hemostasis')
    SetTalentNode(Talent, TAB, 7, 6, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dk-blo-bloodymenace`)]: 1, [GetID(`Spell`, `dh-spells`, `dk-blo-consumption`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'dk-blo-improvedbloodtap')
    SetTalentNode(Talent, TAB, 8, 6, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dk-blo-consumption`)]: 1, [GetID(`Spell`, `dh-spells`, `dk-blo-relishinblood`)]: 1}), EmptySpellArray, EmptySpellArray)

    Talent = GetID(`Spell`, 'dh-spells', 'dk-blo-reinforcedbones')
    SetTalentNode(Talent, TAB, 3, 7, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dk-blo-improvedboneshield`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'dk-blo-bonereaver')
    SetTalentNode(Talent, TAB, 5, 7, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[50150]: 1, [GetID(`Spell`, `dh-spells`, `dk-blo-voracious`)]: 1, [GetID(`Spell`, `dh-spells`, `dk-blo-improvedboneshield`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = 49028
    SetTalentNode(Talent, TAB, 6, 7, 8, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[50150]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'dk-blo-bloodweaver')
    SetTalentNode(Talent, TAB, 7, 7, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dk-blo-improvedbloodtap`)]: 1, [GetID(`Spell`, `dh-spells`, `dk-blo-hemostasis`)]: 1, [50150]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'dk-blo-coagulopathy')
    SetTalentNode(Talent, TAB, 9, 7, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dk-blo-improvedbloodtap`)]: 1}), EmptySpellArray, EmptySpellArray)

}