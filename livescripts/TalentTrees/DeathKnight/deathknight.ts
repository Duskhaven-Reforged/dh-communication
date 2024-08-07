import { EmptyPrereqs, EmptySpellArray, SetChoiceNode, SetTalentNode, SpecTabs } from "../TalentTreeLoader"

export function ReloadDKTree() {
    let TAB: uint64 = 56

    QueryWorld(`Delete from forge_talents where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_prereq where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_ranks where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_unlearn where talentTabId = ${TAB}`)

    let Talent : uint32 = GetID(`Spell`, `dh-spells`, `dk-gen-ibf`)
    SetTalentNode(Talent, TAB, 4, 1, 0, false, 2**(SpecTabs.FDK - 1), CreateArray<uint32>([Talent]), EmptyPrereqs, EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `dk-gen-deathstrike`)
    SetTalentNode(Talent, TAB, 6, 1, 0, false, 2**(SpecTabs.BDK - 1), CreateArray<uint32>([Talent]), EmptyPrereqs, EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `dk-gen-raiseghoul`)
    SetTalentNode(Talent, TAB, 8, 1, 0, false, 2**(SpecTabs.UDK - 1), CreateArray<uint32>([Talent]), EmptyPrereqs, EmptySpellArray, EmptySpellArray)
    
    Talent = GetID(`Spell`, `dh-spells`, `dk-gen-strongwill`)
    SetTalentNode(Talent, TAB, 4, 2, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dk-gen-ibf`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `dk-gen-hungryformore`)
    SetTalentNode(Talent, TAB, 6, 2, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dk-gen-deathstrike`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `dk-gen-deathsadvance`)
    SetTalentNode(Talent, TAB, 8, 2, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dk-gen-raiseghoul`)]: 1}), EmptySpellArray, EmptySpellArray)
    
    Talent = GetID(`Spell`, `dh-spells`, `dk-gen-coldthirst`)
    SetTalentNode(Talent, TAB, 3, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dk-gen-strongwill`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `dk-gen-frigiddeathplate`)
    SetTalentNode(Talent, TAB, 4, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dk-gen-strongwill`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `dk-gen-permafrost`)
    SetTalentNode(Talent, TAB, 5, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dk-gen-strongwill`)]: 1, [GetID(`Spell`, `dh-spells`, `dk-gen-hungryformore`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `dk-gen-magicsuppression`)
    SetTalentNode(Talent, TAB, 6, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dk-gen-hungryformore`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `dk-gen-deathsreach`)
    SetTalentNode(Talent, TAB, 7, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dk-gen-hungryformore`)]: 1, [GetID(`Spell`, `dh-spells`, `dk-gen-deathsadvance`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `dk-gen-mutation`)
    SetTalentNode(Talent, TAB, 8, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dk-gen-deathsadvance`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `dk-gen-corruptedfreeze`)
    SetTalentNode(Talent, TAB, 9, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dk-gen-deathsadvance`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `dk-gen-hornofthefrozenchampion`)
    SetTalentNode(Talent, TAB, 4, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dk-gen-coldthirst`)]: 1, [GetID(`Spell`, `dh-spells`, `dk-gen-frigiddeathplate`)]: 1, [GetID(`Spell`, `dh-spells`, `dk-gen-permafrost`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `dk-gen-deathpact`)
    SetTalentNode(Talent, TAB, 6, 4, 0, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dk-gen-permafrost`)]: 1, [GetID(`Spell`, `dh-spells`, `dk-gen-magicsuppression`)]: 1, [GetID(`Spell`, `dh-spells`, `dk-gen-deathsreach`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `dk-gen-brittle`)
    SetTalentNode(Talent, TAB, 8, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `dk-gen-deathsreach`)]: 1, [GetID(`Spell`, `dh-spells`, `dk-gen-mutation`)]: 1, [GetID(`Spell`, `dh-spells`, `dk-gen-corruptedfreeze`)]: 1}), EmptySpellArray, EmptySpellArray)
    

}