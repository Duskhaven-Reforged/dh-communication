import { EmptyPrereqs, EmptySpellArray, SetChoiceNode, SetSpecAutolearn, SetTalentNode, StarterData } from "../TalentTreeLoader"

export function ReloadFrostDKTree() {
    let TAB = 17
    let CLASS = Class.DEATH_KNIGHT

    QueryWorld(`delete from character_spec_autolearn where \`class\` = ${CLASS} and \`spec\` = ${TAB}`)
    SetSpecAutolearn(CLASS, TAB, 10, GetID(`Spell`, 'dh-spells', 'dk-fro-mightofthefrozenwastes'))
    SetSpecAutolearn(CLASS, TAB, 10, GetID(`Spell`, 'dh-spells', 'dk-fro-threatofunrelentingfrost'))
    SetSpecAutolearn(CLASS, TAB, 16, GetID(`Spell`, 'dh-spells', 'dk-fro-energyleech'))
    SetSpecAutolearn(CLASS, TAB, 20, GetID(`Spell`, 'dh-spells', 'dk-fro-coldimpact'))

    QueryWorld(`Delete from forge_talents where talentTabId = ${TAB}`)

    let Talent : uint32 = GetID(`Spell`, 'dh-spells', 'dk-fro-froststrike')
    SetTalentNode(Talent, TAB, 5, 1, 0, false, new StarterData(CLASS, true, 0), CreateArray<uint32>([Talent]), EmptyPrereqs, EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `dk-fro-obliterate`)
    SetTalentNode(Talent, TAB, 4, 2, 0, false, new StarterData(CLASS, false, 0), CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dk-fro-froststrike`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `dk-fro-icytalons`)
    SetTalentNode(Talent, TAB, 5, 2, 0, true, new StarterData(CLASS, false, 0), CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dk-fro-froststrike`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `dk-fro-howlingblast`)
    SetTalentNode(Talent, TAB, 6, 2, 0, false, new StarterData(CLASS, false, 0), CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dk-fro-froststrike`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `dk-fro-killingmachine`)
    SetTalentNode(Talent, TAB, 3, 3, 0, true, new StarterData(CLASS, false, 0), CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dk-fro-obliterate`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `dk-fro-shatterstrikes`)
    SetTalentNode(Talent, TAB, 5, 3, 0, true, new StarterData(CLASS, false, 0), CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dk-fro-obliterate`)]: 1, [GetID(`Spell`, `dh-spells`, `dk-fro-icytalons`)]: 1, [GetID(`Spell`, `dh-spells`, `dk-fro-howlingblast`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `dk-fro-rime`)
    SetTalentNode(Talent, TAB, 7, 3, 0, true, new StarterData(CLASS, false, 0), CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dk-fro-howlingblast`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `dk-fro-roarofthemachine`)
    SetTalentNode(Talent, TAB, 4, 4, 0, true, new StarterData(CLASS, false, 0), CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dk-fro-killingmachine`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `dk-fro-pillaroffrost`)
    SetTalentNode(Talent, TAB, 5, 4, 0, false, new StarterData(CLASS, false, 0), CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dk-fro-shatterstrikes`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `dk-fro-frigidforecast`)
    SetTalentNode(Talent, TAB, 6, 4, 0, true, new StarterData(CLASS, false, 0), CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dk-fro-rime`)]: 1}), EmptySpellArray, EmptySpellArray)

}