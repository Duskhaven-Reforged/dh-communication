import { EmptyPrereqs, EmptySpellArray, SetChoiceNode, SetSpecAutolearn, SetTalentNode, StarterData } from "../TalentTreeLoader"

export function ReloadCorRogueTree() {
    let TAB = 11
    let CLASS = Class.ROGUE

    QueryWorld(`delete from character_spec_autolearn where \`class\` = ${CLASS} and \`spec\` = ${TAB}`)
    SetSpecAutolearn(CLASS, TAB, 10, GetID(`Spell`, 'dh-spells', 'rog-cor-cursedfragility'))
    SetSpecAutolearn(CLASS, TAB, 10, GetID(`Spell`, 'dh-spells', 'rog-cor-parley'))

    QueryWorld(`Delete from forge_talents where talentTabId = ${TAB}`)
    let Talent : uint32 = GetID(`Spell`, 'dh-spells', 'rog-cor-sinisteropportunities')
    SetTalentNode(Talent, TAB, 5, 1, 0, true, new StarterData(CLASS, true, 0), CreateArray<uint32>([Talent]), EmptyPrereqs, EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `rog-cor-neptulonslockes`)
    SetTalentNode(Talent, TAB, 3, 2, 0, false, new StarterData(CLASS, false, 0), CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `rog-cor-sinisteropportunities`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `rog-cor-flourishtheblade`)
    SetTalentNode(Talent, TAB, 5, 2, 0, true, new StarterData(CLASS, false, 0), CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `rog-cor-sinisteropportunities`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `rog-cor-spectralshot`)
    SetTalentNode(Talent, TAB, 7, 2, 0, false, new StarterData(CLASS, false, 0), CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `rog-cor-sinisteropportunities`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `rog-cor-fogofwar`)
    SetTalentNode(Talent, TAB, 2, 3, 0, false, new StarterData(CLASS, false, 0), CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `rog-cor-neptulonslockes`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `rog-cor-curseddoubloon`)
    SetTalentNode(Talent, TAB, 5, 3, 0, true, new StarterData(CLASS, false, 0), CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `rog-cor-neptulonslockes`)]: 1, [GetID(`Spell`, `dh-spells`, `rog-cor-flourishtheblade`)]: 1, [GetID(`Spell`, `dh-spells`, `rog-cor-spectralshot`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `rog-cor-aceupyoursleeve`)
    SetTalentNode(Talent, TAB, 8, 3, 0, true, new StarterData(CLASS, false, 0), CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `rog-cor-spectralshot`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `rog-cor-bladeflurry`)
    SetTalentNode(Talent, TAB, 3, 4, 0, false, new StarterData(CLASS, false, 0), CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `rog-cor-fogofwar`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `rog-cor-combatpotency`)
    SetTalentNode(Talent, TAB, 5, 4, 0, true, new StarterData(CLASS, false, 0), CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `rog-cor-curseddoubloon`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `rog-cor-plunder`)
    SetTalentNode(Talent, TAB, 7, 4, 0, false, new StarterData(CLASS, false, 0), CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `rog-cor-aceupyoursleeve`)]: 1}), EmptySpellArray, EmptySpellArray)

}