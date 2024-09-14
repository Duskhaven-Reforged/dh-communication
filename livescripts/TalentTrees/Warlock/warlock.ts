import { EmptyPrereqs, EmptySpellArray, SetChoiceNode, SetTalentNode, SpecTabs } from "../TalentTreeLoader"

export function ReloadWarlockTree() {
    let TAB: uint32 = 59

    QueryWorld(`Delete from forge_talents where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_prereq where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_ranks where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_unlearn where talentTabId = ${TAB}`)

    let Talent : uint32 = GetID(`Spell`, `dh-spells`, `warl-gen-fel-domination`)
    SetTalentNode(Talent, TAB, 4, 1, 0, false, 2**(SpecTabs.DEMO - 1), CreateArray<uint32>([Talent]), EmptyPrereqs, EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `warl-gen-mortal-coil`)
    SetTalentNode(Talent, TAB, 6, 1, 0, false, 2**(SpecTabs.ALCK - 1), CreateArray<uint32>([Talent]), EmptyPrereqs, EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `warl-gen-shadowfury`)
    SetTalentNode(Talent, TAB, 8, 1, 0, false, 2**(SpecTabs.DEST - 1), CreateArray<uint32>([Talent]), EmptyPrereqs, EmptySpellArray, EmptySpellArray)

    Talent = GetID(`Spell`, `dh-spells`, `warl-gen-fel-synergy`)
    SetTalentNode(Talent, TAB, 3, 2, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `warl-gen-fel-domination`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `warl-gen-demon-skin`)
    SetTalentNode(Talent, TAB, 5, 2, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `warl-gen-fel-domination`)]: 1, [GetID(`Spell`, `dh-spells`, `warl-gen-mortal-coil`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `warl-gen-horrify`)
    SetChoiceNode(Talent, TAB, 7, 2, 0, true, CreateArray<uint32>([Talent, GetID(`Spell`, `dh-spells`, `warl-gen-nightmare`)]), CreateDictionary<uint32, uint8>({[GetID('Spell', 'dh-spells', 'warl-gen-mortal-coil')]: 1, [GetID('Spell', 'dh-spells', 'warl-gen-shadowfury')]: 1}), EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `warl-gen-darkfury`)
    SetTalentNode(Talent, TAB, 9, 2, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `warl-gen-shadowfury`)]: 1}), EmptySpellArray, EmptySpellArray)

    Talent = GetID(`Spell`, `dh-spells`, `warl-gen-mana-feed`)
    SetTalentNode(Talent, TAB, 4, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `warl-gen-fel-synergy`)]: 1, [GetID(`Spell`, `dh-spells`, `warl-gen-fel-domination`)]: 1, [GetID(`Spell`, `dh-spells`, `warl-gen-demon-skin`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = 48018
    SetTalentNode(Talent, TAB, 6, 3, 0, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `warl-gen-demon-skin`)]: 1, [GetID(`Spell`, `dh-spells`, `warl-gen-mortal-coil`)]: 1, [GetID(`Spell`, `dh-spells`, `warl-gen-horrify`)]: 1}), EmptySpellArray, CreateArray<uint32>([48020]))
    Talent = GetID(`Spell`, `dh-spells`, `warl-gen-kotgb`)
    SetTalentNode(Talent, TAB, 8, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `warl-gen-horrify`)]: 1, [GetID(`Spell`, `dh-spells`, `warl-gen-shadowfury`)]: 1, [GetID(`Spell`, `dh-spells`, `warl-gen-darkfury`)]: 1}), EmptySpellArray, EmptySpellArray)

    Talent = GetID(`Spell`, `dh-spells`, `warl-gen-demonic-fortitude`)
    SetTalentNode(Talent, TAB, 3, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `warl-gen-mana-feed`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `warl-gen-curse-of-elements`)
    SetChoiceNode(Talent, TAB, 5, 4, 0, true, CreateArray<uint32>([Talent, GetID(`Spell`, `dh-spells`, `warl-gen-curse-of-weakness`)]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `warl-gen-mana-feed`)]: 1, [48018]: 1}), EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `warl-gen-abyss-walker`)
    SetTalentNode(Talent, TAB, 6, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[48018]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `warl-gen-empowered-soul-leech`)
    SetTalentNode(Talent, TAB, 7, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[48018]: 1, [GetID(`Spell`, `dh-spells`, `warl-gen-kotgb`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `warl-gen-demonic-embrance`)
    SetTalentNode(Talent, TAB, 9, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `warl-gen-kotgb`)]: 1}), EmptySpellArray, EmptySpellArray)
}