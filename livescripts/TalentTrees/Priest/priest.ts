import { EmptyPrereqs, EmptySpellArray, SetChoiceNode, SetTalentNode, SpecTabs } from "../TalentTreeLoader"

export function ReloadPriestTree() {
    let TAB: uint32 = 55
    let ALLMASK = (1 << SpecTabs.HPRI - 1) | 1 << (SpecTabs.DISC - 1) | 1 << (SpecTabs.SPRI - 1) | (1 << SpecTabs.INQU - 1)

    QueryWorld(`Delete from forge_talents where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_prereq where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_ranks where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_unlearn where talentTabId = ${TAB}`)

    //let Talent : uint32 = 41635
    //SetTalentNode(Talent, TAB, 3, 1, 0, false, 1 << (SpecTabs.DISC - 1) | 1 << (SpecTabs.HPRI - 1), CreateArray<uint32>([Talent]), EmptyPrereqs, EmptySpellArray, EmptySpellArray)
    //Talent = GetID(`Spell`, `dh-spells`, `pri-gen-purify`)
    //SetTalentNode(Talent, TAB, 4, 1, 0, false, ALLMASK, CreateArray<uint32>([Talent]), EmptyPrereqs, EmptySpellArray, EmptySpellArray)
    //Talent = GetID(`Spell`, `dh-spells`, `pri-gen-nova`)
    //SetTalentNode(Talent, TAB, 6, 1, 0, false, 1 << (SpecTabs.HPRI - 1), CreateArray<uint32>([Talent]), EmptyPrereqs, EmptySpellArray, EmptySpellArray)
    //Talent = 32379
    //SetTalentNode(Talent, TAB, 7, 1, 0, false, 1 << (SpecTabs.DISC - 1) | 1 << (SpecTabs.SPRI - 1), CreateArray<uint32>([Talent]), EmptyPrereqs, EmptySpellArray, EmptySpellArray)
    //Talent = GetID(`Spell`, `dh-spells`, `pri-gen-focusmend`)
    //SetTalentNode(Talent, TAB, 2, 2, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[41635]: 1}), EmptySpellArray, EmptySpellArray)
    //Talent = GetID(`Spell`, `dh-spells`, `pri-gen-shackle`)
    //SetTalentNode(Talent, TAB, 3, 2, 0, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[41635]: 1, [GetID(`Spell`, `dh-spells`, `pri-gen-purify`)]: 1}), EmptySpellArray, EmptySpellArray)
    //Talent = GetID(`Spell`, `dh-spells`, `pri-gen-`)      Soul Tap - not in ts and no spell ID in Dochaven
    //SetTalentNode(Talent, TAB, 4, 2, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pri-gen-purify`)]: 1}), EmptySpellArray, EmptySpellArray)
    //Talent = GetID(`Spell`, `dh-spells`, `pri-gen-`)  Leap of Faith - not in ts and no spell ID in Dochaven
    //SetTalentNode(Talent, TAB, 5, 2, 0, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pri-gen-purify`)]: 1, [GetID(`Spell`, `dh-spells`, `pri-gen-nova`)]: 1}), EmptySpellArray, EmptySpellArray)
    //Talent = GetID(`Spell`, `dh-spells`, `pri-gen-rhap`)
    //SetTalentNode(Talent, TAB, 6, 2, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pri-gen-nova`)]: 1}), EmptySpellArray, EmptySpellArray)
    //Talent = 34433
    //SetTalentNode(Talent, TAB, 7, 2, 0, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pri-gen-nova`)]: 1, [32379]: 1}), EmptySpellArray, EmptySpellArray)
    //Talent = GetID(`Spell`, `dh-spells`, `pri-gen-`)  Death and Madness - not in ts and no spell ID in Dochaven
    //SetTalentNode(Talent, TAB, 8, 2, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[32379]: 1}), EmptySpellArray, EmptySpellArray)
    //Talent = GetID(`Spell`, `dh-spells`, `pri-gen-`)   Light Resonance - not in ts and no spell ID in Dochaven
    //SetTalentNode(Talent, TAB, 2, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pri-gen-focusmend`)]: 1}), EmptySpellArray, EmptySpellArray)
    //Talent = GetID(`Spell`, `dh-spells`, `pri-gen-`)   Inquisitor's Cell - not in ts and no spell ID in Dochaven
    //SetTalentNode(Talent, TAB, 3, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pri-gen-shackle`)]: 1}), EmptySpellArray, EmptySpellArray)
    //Talent = GetID(`Spell`, `dh-spells`, `pri-gen-silence`)
    //SetTalentNode(Talent, TAB, 4, 3, 0, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pri-gen-shackle`)]: 1/*, [GetID(`Spell`, `dh-spells`, `pri-gen-shackle`)]: 1, [GetID(`Spell`, `dh-spells`, `pri-gen-shackle`)]: 1*/}), EmptySpellArray, EmptySpellArray)
    //Talent = 1140032
    //SetTalentNode(Talent, TAB, 5, 3, 0, true, 0, CreateArray<uint32>([Talent]), EmptyPrereqs/*CreateDictionary<uint32, uint8>({[Leap of Faith ID]: 1})*/, EmptySpellArray, EmptySpellArray)
    //Talent = GetID(`Spell`, `dh-spells`, `pri-gen-flashlight`)
    //SetTalentNode(Talent, TAB, 6, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pri-gen-rhap`)]: 1/*, [Leap of Faith ID]: 1*/ }), EmptySpellArray, EmptySpellArray)
    //Talent = GetID(`Spell`, `dh-spells`, `pri-gen-`)   Choice node Empowered Aberration / Agressive Aberration - not in ts and no spell ID in Dochaven
    //SetChoiceNode(Talent, TAB, 7, 3, 0, true, CreateArray<uint32>([Talent, GetID(`Spell`, 'dh-spells', '')]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, '')]: 1}), EmptySpellArray)
    //Talent = GetID(`Spell`, `dh-spells`, `pri-gen-`)   Tithe - - not in ts and no spell ID in Dochaven
    //SetTalentNode(Talent, TAB, 8, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[]]: 1}), EmptySpellArray, EmptySpellArray)
    //Talent = GetID(`Spell`, `dh-spells`, `pri-gen-efficientholy`)
    //SetTalentNode(Talent, TAB, 3, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pri-gen-silence`)]: 1/*, [Light Resonance ID]: 1, [Inquisitor's Cell ID]: 1*/}), EmptySpellArray, EmptySpellArray)
    //Talent = 32375
    //SetTalentNode(Talent, TAB, 5, 4, 0, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pri-gen-silence`)]: 1, [1140032]: 1, [GetID(`Spell`, `dh-spells`, `pri-gen-flashlight`)]: 1}), EmptySpellArray, EmptySpellArray)
    //Talent = GetID(`Spell`, `dh-spells`, `pri-gen-efficientshadow`)
    //SetTalentNode(Talent, TAB, 7, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pri-gen-flashlight`)]: 1/*, [Choice node Empowered Aberration / Agressive Aberration ID)]: 1, [Tithe Spell ID]: 1*/}), EmptySpellArray, EmptySpellArray)

}
