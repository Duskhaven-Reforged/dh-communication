import { EmptyPrereqs, EmptySpellArray, SetChoiceNode, SetSpecAutolearn, SetTalentNode, SpecTabs } from "../TalentTreeLoader"

export function ReloadHPriestTree() {
    let TAB: uint32 = SpecTabs.HPRI
    let CLASS = Class.PRIEST

    QueryWorld(`delete from character_spec_autolearn where \`class\` = ${CLASS} and \`spec\` = ${TAB}`)
    SetSpecAutolearn(CLASS, TAB, 10, GetID(`Spell`, 'dh-spells', 'pri-inq-powerwordpunishment'))
    SetSpecAutolearn(CLASS, TAB, 16, GetID(`Spell`, 'dh-spells', 'pri-holy-presenceofaltruism'))
    SetSpecAutolearn(CLASS, TAB, 20, 20711)
    SetSpecAutolearn(CLASS, TAB, 20, GetID(`Spell`, 'dh-spells', 'pri-holy-sacredblessing'))
    SetSpecAutolearn(CLASS, TAB, 30, GetID(`Spell`, 'dh-spells', 'pri-holy-guardianspirit'))

    QueryWorld(`Delete from forge_talents where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_prereq where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_ranks where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_unlearn where talentTabId = ${TAB}`)
}
