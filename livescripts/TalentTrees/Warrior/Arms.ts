import { EmptyPrereqs, EmptySpellArray, SetChoiceNode, SetTalentNode } from "../TalentTreeLoader"

export function ReloadArmsWarrTree() {
    let TAB = 1

    QueryWorld(`Delete from forge_talents where talentTabId = ${TAB}`)

    let Talent : uint32 = GetID(`Spell`, 'dh-spells', 'warr-arm-mortal-strike')
    SetTalentNode(Talent, TAB, 6, 1, 0, false, true, CreateArray<uint32>([Talent]), EmptyPrereqs, EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'warr-arm-taste-for-blood')
    SetTalentNode(Talent, TAB, 5, 2, 0, true, false, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `warr-arm-mortal-strike`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'warr-arm-bladestorm')
    SetTalentNode(Talent, TAB, 6, 2, 0, false, false, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `warr-arm-mortal-strike`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'warr-arm-deeper-cuts')
    SetTalentNode(Talent, TAB, 7, 2, 0, true, false, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `warr-arm-mortal-strike`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'warr-arm-overpowering')
    SetChoiceNode(Talent, TAB, 4, 3, 0, true, CreateArray<uint32>([Talent, GetID(`Spell`, 'dh-spells', 'warr-arm-overpowered')]), CreateDictionary<uint32, uint8>({[GetID('Spell', 'dh-spells', 'warr-arm-taste-for-blood')]: 1}), EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'warr-arm-winds-of-change')
    SetTalentNode(Talent, TAB, 5, 3, 0, true, false, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `warr-arm-bladestorm`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'warr-arm-fragrance-of-battle')
    SetTalentNode(Talent, TAB, 7, 3, 0, true, false, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `warr-arm-bladestorm`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'warr-arm-lambs-to-the-slaughter')
    SetTalentNode(Talent, TAB, 8, 3, 0, true, false, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `warr-arm-deeper-cuts`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'warr-arm-unhinged')
    SetTalentNode(Talent, TAB, 5, 4, 0, true, false, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `warr-arm-winds-of-change`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'warr-arm-slayer')
    SetTalentNode(Talent, TAB, 6, 4, 0, true, false, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `warr-arm-winds-of-change`)]: 1, [GetID(`Spell`, `dh-spells`, `warr-arm-bladestorm`)]: 1, [GetID(`Spell`, `dh-spells`, `warr-arm-fragrance-of-battle`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'warr-arm-flourish-and-follow-up')
    SetTalentNode(Talent, TAB, 7, 4, 0, true, false, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `warr-arm-fragrance-of-battle`)]: 1}), EmptySpellArray, EmptySpellArray)
    
}