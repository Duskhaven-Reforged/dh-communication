import { EmptyPrereqs, EmptySpellArray, SetChoiceNode, SetTalentNode, SpecTabs } from "../TalentTreeLoader"

export function ReloadPaladinTree() {
    let TAB: uint32 = 52
    let CLASS = 2

    QueryWorld(`Delete from forge_talents where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_prereq where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_ranks where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_unlearn where talentTabId = ${TAB}`)

    let Talent : uint32 = GetID(`Spell`, `dh-spells`, `pal-gen-loh`)
    SetTalentNode(Talent, TAB, 2, 1, 0, false, 1 << (SpecTabs.HPAL - 1), CreateArray<uint32>([Talent]), EmptyPrereqs, EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `pal-gen-divinesteed`)
    SetTalentNode(Talent, TAB, 5, 1, 0, false, 1 << (SpecTabs.PPAL - 1), CreateArray<uint32>([Talent]), EmptyPrereqs, EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `pal-gen-exorcism`)
    SetTalentNode(Talent, TAB, 8, 1, 0, false, 1 << (SpecTabs.RPAL - 1), CreateArray<uint32>([Talent]), EmptyPrereqs, EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `pal-gen-sotp`)
    SetTalentNode(Talent, TAB, 4, 2, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pal-gen-loh`)]: 1, [GetID(`Spell`, 'dh-spells', 'pal-gen-divinesteed')]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `pal-gen-pursuitofjustice`)
    SetTalentNode(Talent, TAB, 5, 2, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pal-gen-divinesteed`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `pal-gen-sanctified-plaets`)
    SetTalentNode(Talent, TAB, 6, 2, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pal-gen-divinesteed`)]: 1, [GetID(`Spell`, 'dh-spells', 'pal-gen-exorcism')]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `pal-gen-all-good-deeds`)
    SetTalentNode(Talent, TAB, 2, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pal-gen-loh`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `pal-gen-healinglight`)
    SetTalentNode(Talent, TAB, 3, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pal-gen-sotp`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `pal-gen-rebuke`)
    SetTalentNode(Talent, TAB, 5, 3, 0, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pal-gen-sotp`)]: 1, [GetID(`Spell`, 'dh-spells', 'pal-gen-pursuitofjustice')]: 1, [GetID(`Spell`, 'dh-spells', 'pal-gen-sanctified-plaets')]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `pal-gen-crusade`)
    SetTalentNode(Talent, TAB, 7, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pal-gen-sanctified-plaets`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `pal-gen-evil-be-judged`)
    SetTalentNode(Talent, TAB, 8, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pal-gen-exorcism`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `pal-gen-purify`)
    SetTalentNode(Talent, TAB, 2, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pal-gen-all-good-deeds`)]: 1, [GetID(`Spell`, `dh-spells`, `pal-gen-healinglight`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `pal-gen-replenishing-strikes`)
    SetTalentNode(Talent, TAB, 4, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pal-gen-rebuke`)]: 1, [GetID(`Spell`, `dh-spells`, `pal-gen-healinglight`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `pal-gen-seals-of-the-just`)
    SetTalentNode(Talent, TAB, 8, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pal-gen-crusade`)]: 1, [GetID(`Spell`, `dh-spells`, `pal-gen-evil-be-judged`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `pal-gen-no-mercy-for-the-wicked`)
    SetTalentNode(Talent, TAB, 6, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pal-gen-rebuke`)]: 1, [GetID(`Spell`, `dh-spells`, `pal-gen-crusade`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `pal-gen-punishment`)
    SetChoiceNode(Talent, TAB, 5, 4, 0, true, CreateArray<uint32>([Talent, GetID(`Spell`, `dh-spells`, `pal-gen-example`)]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, 'dh-spells', 'pal-gen-rebuke')]: 1}), EmptySpellArray)

}