import { EmptyPrereqs, EmptySpellArray, SetChoiceNode, SetSpecAutolearn, SetTalentNode, StarterData } from "../TalentTreeLoader"

export function ReloadUnholyDKTree() {
    let TAB = 18
    let CLASS = Class.DEATH_KNIGHT

    QueryWorld(`delete from character_spec_autolearn where \`class\` = ${CLASS} and \`spec\` = ${TAB}`)
    SetSpecAutolearn(CLASS, TAB, 10, GetID(`Spell`, 'dh-spells', 'dk-unh-unholyrunes'))
    SetSpecAutolearn(CLASS, TAB, 16, GetID(`Spell`, 'dh-spells', 'dk-unh-ebonplaguebringer'))

    QueryWorld(`Delete from forge_talents where talentTabId = ${TAB}`)

    let Talent : uint32 = GetID(`Spell`, 'dh-spells', 'dk-unh-festeringstrikes')
    SetTalentNode(Talent, TAB, 5, 1, 0, true, new StarterData(CLASS, true, 0), CreateArray<uint32>([Talent]), EmptyPrereqs, EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `dk-unh-clawingshadows`)
    SetTalentNode(Talent, TAB, 3, 2, 0, false, new StarterData(CLASS, false, 0), CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dk-unh-festeringstrikes`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `dk-unh-outbreak`)
    SetTalentNode(Talent, TAB, 5, 2, 0, false, new StarterData(CLASS, false, 0), CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dk-unh-festeringstrikes`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `dk-unh-masterofthedead`)
    SetTalentNode(Talent, TAB, 7, 2, 0, true, new StarterData(CLASS, false, 0), CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dk-unh-festeringstrikes`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `dk-unh-shadowmultiplicity`)
    SetTalentNode(Talent, TAB, 3, 3, 0, true, new StarterData(CLASS, false, 0), CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dk-unh-clawingshadows`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `dk-unh-epidemic`)
    SetTalentNode(Talent, TAB, 5, 3, 0, false, new StarterData(CLASS, false, 0), CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dk-unh-outbreak`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `dk-unh-burstingsores`)
    SetTalentNode(Talent, TAB, 7, 3, 0, true, new StarterData(CLASS, false, 0), CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dk-unh-masterofthedead`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `dh-unh-unholyblight`)
    SetTalentNode(Talent, TAB, 3, 4, 0, false, new StarterData(CLASS, false, 0), CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dk-unh-shadowmultiplicity`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `dk-unh-ebonplague`)
    SetTalentNode(Talent, TAB, 5, 4, 0, true, new StarterData(CLASS, false, 0), CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dk-unh-epidemic`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `dk-unh-darktransformation`)
    SetTalentNode(Talent, TAB, 7, 4, 0, false, new StarterData(CLASS, false, 0), CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dk-unh-burstingsores`)]: 1}), EmptySpellArray, EmptySpellArray)

}