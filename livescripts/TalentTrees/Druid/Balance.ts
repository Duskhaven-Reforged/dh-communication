import { EmptyPrereqs, EmptySpellArray, SetChoiceNode, SetSpecAutolearn, SetTalentNode, SpecTabs } from "../TalentTreeLoader"

export function ReloadBalDruidTree() {
    let TAB: uint64 = SpecTabs.BALD
    let CLASS = Class.DRUID

    QueryWorld(`delete from character_spec_autolearn where \`class\` = ${CLASS} and \`spec\` = ${TAB}`)
    SetSpecAutolearn(CLASS, TAB, 16, GetID(`Spell`, `dh-spells`, `dru-bal-weakeningspells`))
    SetSpecAutolearn(CLASS, TAB, 16, GetID(`Spell`, `dh-spells`, `dru-bal-primalspellcaster`))
    SetSpecAutolearn(CLASS, TAB, 26, GetID(`Spell`, `dh-spells`, `dru-bal-childofelune`))
    SetSpecAutolearn(CLASS, TAB, 10, GetID(`Spell`, `dh-spells`, `dru-bal-astralempowerment`))
    SetSpecAutolearn(CLASS, TAB, 10, GetID(`Spell`, `dh-spells`, `dru-bal-mastery1`))
    SetSpecAutolearn(CLASS, TAB, 10, GetID(`Spell`, `dh-spells`, `dru-bal-mastery2`))

    QueryWorld(`Delete from forge_talents where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_prereq where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_ranks where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_unlearn where talentTabId = ${TAB}`)

    let Talent : uint32 = GetID(`Spell`, 'dh-spells', `dru-bal-sunfire`)
    SetTalentNode(Talent, TAB, 6, 1, 0, false, 2**(TAB-1), CreateArray<uint32>([Talent]), EmptyPrereqs, EmptySpellArray, EmptySpellArray)
    
    Talent = GetID(`Spell`, `dh-spells`, `dru-bal-astralpowered`)
    SetTalentNode(Talent, TAB, 5, 2, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dru-bal-sunfire`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `dru-bal-umbralembrace`)
    SetTalentNode(Talent, TAB, 6, 2, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dru-bal-sunfire`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `dru-bal-solarpowered`)
    SetTalentNode(Talent, TAB, 7, 2, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dru-bal-sunfire`)]: 1}), EmptySpellArray, EmptySpellArray)
    
    Talent = GetID(`Spell`, `dh-spells`, `dru-bal-shootingstars`)
    SetTalentNode(Talent, TAB, 5, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dru-bal-astralpowered`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `dru-bal-celestialalignment`)
    SetTalentNode(Talent, TAB, 6, 3, 0, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dru-bal-umbralembrace`)]: 1, [GetID(`Spell`, `dh-spells`, `dru-bal-astralpowered`)]: 1, [GetID(`Spell`, `dh-spells`, `dru-bal-solarpowered`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `dru-bal-astralsmolder`)
    SetTalentNode(Talent, TAB, 7, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dru-bal-solarpowered`)]: 1}), EmptySpellArray, EmptySpellArray)
    
    Talent = GetID(`Spell`, `dh-spells`, `dru-bal-umbralintensity`)
    SetTalentNode(Talent, TAB, 5, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dru-bal-shootingstars`)]: 1, [GetID(`Spell`, `dh-spells`, `dru-bal-celestialalignment`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `dru-bal-starfall`)
    SetTalentNode(Talent, TAB, 6, 4, 0, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dru-bal-celestialalignment`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `dru-bal-penumbralglow`)
    SetTalentNode(Talent, TAB, 7, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dru-bal-astralsmolder`)]: 1, [GetID(`Spell`, `dh-spells`, `dru-bal-celestialalignment`)]: 1}), EmptySpellArray, EmptySpellArray)

    Talent = GetID(`Spell`, 'dh-spells', 'dru-bal-solstice')
    SetTalentNode(Talent, TAB, 3, 5, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dru-bal-shootingstars`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'dru-bal-starsurge')
    SetTalentNode(Talent, TAB, 4, 5, 8, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dru-bal-umbralintensity`)]: 1, [GetID(`Spell`, `dh-spells`, `dru-bal-solstice`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'dru-bal-fallingskies')
    SetChoiceNode(Talent, TAB, 5, 5, 8, true, CreateArray<uint32>([Talent, GetID(`Spell`, 'dh-spells', 'dru-bal-astralguidance')]), CreateDictionary<uint32, uint8>({[GetID('Spell', 'dh-spells', 'dru-bal-starfall')]: 1}), EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'dru-bal-balanceofallthings1')
    SetTalentNode(Talent, TAB, 6, 5, 8, true, 0, CreateArray<uint32>([Talent, GetID(`Spell`, 'dh-spells', 'dru-bal-balanceofallthings2')]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dru-bal-starfall`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'dru-bal-invigoratingeffulgence')
    SetChoiceNode(Talent, TAB, 7, 5, 8, true, CreateArray<uint32>([Talent, GetID(`Spell`, 'dh-spells', 'dru-bal-solarguidance')]), CreateDictionary<uint32, uint8>({[GetID('Spell', 'dh-spells', 'dru-bal-starfall')]: 1}), EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'dru-bal-stellarsporeburst')
    SetTalentNode(Talent, TAB, 8, 5, 8, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dru-bal-penumbralglow`)]: 1, [GetID(`Spell`, `dh-spells`, `dru-bal-cosmicsmoldering`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'dru-bal-cosmicsmoldering')
    SetTalentNode(Talent, TAB, 9, 5, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dru-bal-astralsmolder`)]: 1}), EmptySpellArray, EmptySpellArray)

    Talent = GetID(`Spell`, 'dh-spells', 'dru-bal-furyofelune')
    SetTalentNode(Talent, TAB, 3, 6, 8, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dru-bal-solstice`)]: 1, [GetID(`Spell`, `dh-spells`, `dru-bal-bathinginstarlight`)]: 1, [GetID(`Spell`, `dh-spells`, `dru-bal-starsurge`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'dru-bal-bathinginstarlight')
    SetTalentNode(Talent, TAB, 5, 6, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dru-bal-balanceofallthings1`)]: 2, [GetID(`Spell`, `dh-spells`, `dru-bal-fallingskies`)]: 1, [GetID(`Spell`, `dh-spells`, `dru-bal-starsurge`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'dru-bal-astralinfusion')
    SetTalentNode(Talent, TAB, 6, 6, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dru-bal-balanceofallthings1`)]: 2}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'dru-bal-faerieflare')
    SetTalentNode(Talent, TAB, 7, 6, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dru-bal-balanceofallthings1`)]: 2, [GetID(`Spell`, `dh-spells`, `dru-bal-invigoratingeffulgence`)]: 1, [GetID(`Spell`, `dh-spells`, `dru-bal-stellarsporeburst`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'dru-bal-earthmothersheart')
    SetTalentNode(Talent, TAB, 9, 6, 8, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dru-bal-faerieflare`)]: 1, [GetID(`Spell`, `dh-spells`, `dru-bal-stellarsporeburst`)]: 1, [GetID(`Spell`, `dh-spells`, `dru-bal-cosmicsmoldering`)]: 1}), EmptySpellArray, EmptySpellArray)

    Talent = GetID(`Spell`, 'dh-spells', 'dru-bal-aetherialkindling')
    SetTalentNode(Talent, TAB, 4, 7, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dru-bal-bathinginstarlight`)]: 1, [GetID(`Spell`, `dh-spells`, `dru-bal-furyofelune`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'dru-bal-eveningintotwilight')
    SetTalentNode(Talent, TAB, 5, 7, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dru-bal-bathinginstarlight`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'dru-bal-astralgale')
    SetTalentNode(Talent, TAB, 6, 7, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dru-bal-faerieflare`)]: 1, [GetID(`Spell`, `dh-spells`, `dru-bal-astralinfusion`)]: 1, [GetID(`Spell`, `dh-spells`, `dru-bal-bathinginstarlight`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'dru-bal-twilightintodawn')
    SetTalentNode(Talent, TAB, 7, 7, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dru-bal-faerieflare`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'dru-bal-thornybristles')
    SetTalentNode(Talent, TAB, 8, 7, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dru-bal-faerieflare`)]: 1, [GetID(`Spell`, `dh-spells`, `dru-bal-earthmothersheart`)]: 1}), EmptySpellArray, EmptySpellArray)

}