import { EmptyPrereqs, EmptySpellArray, SetChoiceNode, SetSpecAutolearn, SetTalentNode, SpecTabs } from "../TalentTreeLoader"

export function ReloadRogueCorsairTree() {
    let TAB: uint32 = SpecTabs.CORR
    let CLASS = Class.ROGUE

    QueryWorld(`delete from character_spec_autolearn where \`class\` = ${CLASS} and \`spec\` = ${TAB}`)
    SetSpecAutolearn(CLASS, TAB, 10, GetID(`Spell`, 'dh-spells', 'rog-cor-cursedfragility'))
    SetSpecAutolearn(CLASS, TAB, 10, GetID(`Spell`, 'dh-spells', 'rog-cor-parley'))

    QueryWorld(`Delete from forge_talents where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_prereq where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_ranks where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_unlearn where talentTabId = ${TAB}`)

    let Talent : uint32 = GetID(`Spell`, 'dh-spells', 'rog-cor-sinisteropportunities')
    SetTalentNode(Talent, TAB, 6, 1, 0, true, 2**(TAB-1), CreateArray<uint32>([Talent]), EmptyPrereqs, EmptySpellArray, EmptySpellArray)
    
    Talent = GetID(`Spell`, `dh-spells`, `rog-cor-neptulonslocker`)
    SetTalentNode(Talent, TAB, 4, 2, 0, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `rog-cor-sinisteropportunities`)]: 1}), CreateArray<uint32>([GetID(`Spell`, `dh-spells`, `rog-gen-garrote`)]), EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `rog-cor-flourishtheblade`)
    SetTalentNode(Talent, TAB, 6, 2, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `rog-cor-sinisteropportunities`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `rog-cor-spectralshot`)
    SetTalentNode(Talent, TAB, 8, 2, 0, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `rog-cor-sinisteropportunities`)]: 1}), EmptySpellArray, EmptySpellArray)
    
    Talent = GetID(`Spell`, `dh-spells`, `rog-cor-fogofwar`)
    SetTalentNode(Talent, TAB, 3, 3, 0, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `rog-cor-neptulonslocker`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `rog-cor-curseddoubloon`)
    SetTalentNode(Talent, TAB, 6, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `rog-cor-neptulonslocker`)]: 1, [GetID(`Spell`, `dh-spells`, `rog-cor-flourishtheblade`)]: 1, [GetID(`Spell`, `dh-spells`, `rog-cor-spectralshot`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `rog-cor-aceupyoursleeve`)
    SetTalentNode(Talent, TAB, 9, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `rog-cor-spectralshot`)]: 1}), EmptySpellArray, EmptySpellArray)
    
    Talent = GetID(`Spell`, `dh-spells`, `rog-cor-bladeflurry`)
    SetTalentNode(Talent, TAB, 4, 4, 0, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `rog-cor-fogofwar`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `rog-cor-combatpotency`)
    SetTalentNode(Talent, TAB, 6, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `rog-cor-curseddoubloon`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `rog-cor-plunder`)
    SetTalentNode(Talent, TAB, 8, 4, 0, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `rog-cor-aceupyoursleeve`)]: 1}), CreateArray<uint32>([GetID(`Spell`, `dh-spells`, `rog-gen-ambush`)]), EmptySpellArray)

    Talent = GetID(`Spell`, 'dh-spells', 'rog-cor-fogwalker')
    SetTalentNode(Talent, TAB, 3, 5, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `rog-cor-fogofwar`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'rog-cor-dancingsteel')
    SetTalentNode(Talent, TAB, 4, 5, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `rog-cor-bladeflurry`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'rog-cor-keepitrolling')
    SetTalentNode(Talent, TAB, 5, 5, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `rog-cor-bladeflurry`)]: 1, [GetID(`Spell`, `dh-spells`, `rog-cor-combatpotency`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'rog-cor-lightningreflexes')
    SetTalentNode(Talent, TAB, 6, 5, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `rog-cor-combatpotency`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'rog-cor-spectralconcoctions')
    SetTalentNode(Talent, TAB, 7, 5, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `rog-cor-combatpotency`)]: 1, [GetID(`Spell`, `dh-spells`, `rog-cor-plunder`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'rog-cor-unseenfoes')
    SetTalentNode(Talent, TAB, 8, 5, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `rog-cor-plunder`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'rog-cor-immaculaterigging')
    SetTalentNode(Talent, TAB, 9, 5, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `rog-cor-aceupyoursleeve`)]: 1}), EmptySpellArray, EmptySpellArray)

    Talent = GetID(`Spell`, 'dh-spells', 'rog-cor-brutaleviscerations')
    SetTalentNode(Talent, TAB, 4, 6, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `rog-cor-fogwalker`)]: 1, [GetID(`Spell`, `dh-spells`, `rog-cor-dancingsteel`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'rog-cor-triplethreat')
    SetTalentNode(Talent, TAB, 5, 6, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `rog-cor-keepitrolling`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'rog-cor-adrenalinerush')
    SetTalentNode(Talent, TAB, 6, 6, 8, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `rog-cor-spectralconcoctions`)]: 1, [GetID(`Spell`, `dh-spells`, `rog-cor-lightningreflexes`)]: 1, [GetID(`Spell`, `dh-spells`, `rog-cor-keepitrolling`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'rog-cor-drinkitoff')
    SetTalentNode(Talent, TAB, 7, 6, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `rog-cor-spectralconcoctions`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'rog-cor-bonvoyage')
    SetTalentNode(Talent, TAB, 8, 6, 8, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `rog-cor-unseenfoes`)]: 1, [GetID(`Spell`, `dh-spells`, `rog-cor-immaculaterigging`)]: 1}), EmptySpellArray, EmptySpellArray)
    
    Talent = GetID(`Spell`, 'dh-spells', 'rog-cor-savorthemoment1')
    SetTalentNode(Talent, TAB, 4, 7, 8, true, 0, CreateArray<uint32>([Talent, GetID(`Spell`, 'dh-spells', 'rog-cor-savorthemoment2')]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `rog-cor-brutaleviscerations`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'rog-cor-heavyhitter')
    SetTalentNode(Talent, TAB, 5, 7, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `rog-cor-brutaleviscerations`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'rog-cor-swashbuckling')
    SetTalentNode(Talent, TAB, 6, 7, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `rog-cor-triplethreat`)]: 1, [GetID(`Spell`, `dh-spells`, `rog-cor-drinkitoff`)]: 1, [GetID(`Spell`, `dh-spells`, `rog-cor-adrenalinerush`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'rog-cor-powderkegsurprise')
    SetTalentNode(Talent, TAB, 7, 7, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `rog-cor-bonvoyage`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'rog-cor-highroller1')
    SetTalentNode(Talent, TAB, 8, 7, 8, true, 0, CreateArray<uint32>([Talent, GetID(`Spell`, 'dh-spells', 'rog-cor-highroller2')]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `rog-cor-bonvoyage`)]: 1}), EmptySpellArray, EmptySpellArray)

}