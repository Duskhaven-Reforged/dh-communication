import { EmptyPrereqs, EmptySpellArray, SetChoiceNode, SetTalentNode, StarterData } from "../TalentTreeLoader"

export function ReloadWarrTree() {
    let TAB = 51
    let CLASS = 1

    let Talent : uint32 = GetID(`Spell`, `dh-spells`, `warr-gen-victory-rush`)
    SetTalentNode(Talent, TAB, 4, 1, 0, false, new StarterData(CLASS, true, 0), CreateArray<uint32>([Talent]), EmptyPrereqs, EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'warr-gen-heroic-leap')
    SetTalentNode(Talent, TAB, 6, 1, 0, false, new StarterData(CLASS, true, 0), CreateArray<uint32>([Talent]), EmptyPrereqs, EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'warr-gen-war-machine')
    SetTalentNode(Talent, TAB, 3, 2, 0, true, new StarterData(CLASS, false, 0), CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `warr-gen-victory-rush`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'warr-gen-sieze-the-day')
    SetTalentNode(Talent, TAB, 4, 2, 0, true, new StarterData(CLASS, false, 0), CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `warr-gen-victory-rush`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'warr-gen-rallying-cry')
    SetTalentNode(Talent, TAB, 5, 2, 0, true, new StarterData(CLASS, false, 0), CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `warr-gen-victory-rush`)]: 1, [GetID(`Spell`, 'dh-spells', 'warr-gen-heroic-leap')]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'warr-gen-heroic-entrance')
    SetTalentNode(Talent, TAB, 6, 2, 0, true, new StarterData(CLASS, false, 0), CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `warr-gen-heroic-leap`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'warr-gen-blitz')
    SetTalentNode(Talent, TAB, 7, 2, 0, true, new StarterData(CLASS, false, 0), CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `warr-gen-heroic-leap`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'warr-gen-anger-management')
    SetTalentNode(Talent, TAB, 2, 3, 0, true, new StarterData(CLASS, false, 0), CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `warr-gen-war-machine`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'warr-gen-stormbolt')
    SetTalentNode(Talent, TAB, 4, 3, 0, false, new StarterData(CLASS, false, 0), CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, 'warr-gen-sieze-the-day')]: 1, [GetID(`Spell`, 'dh-spells', 'warr-gen-rallying-cry')]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'warr-gen-second-wind')
    SetChoiceNode(Talent, TAB, 5, 3, 0, true, CreateArray<uint32>([Talent, GetID(`Spell`, 'dh-spells', 'warr-gen-blood-craze')]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, 'warr-gen-rallying-cry')]: 1}), EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'warr-gen-blood-and-thunder')
    SetTalentNode(Talent, TAB, 6, 3, 0, true, new StarterData(CLASS, false, 0), CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, 'warr-gen-heroic-entrance')]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'warr-gen-chargepositive')
    SetTalentNode(Talent, TAB, 8, 3, 0, true, new StarterData(CLASS, false, 0), CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, 'warr-gen-blitz')]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'warr-gen-quick-and-heavy')
    SetTalentNode(Talent, TAB, 3, 4, 0, true, new StarterData(CLASS, false, 0), CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `warr-gen-war-machine`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'warr-gen-svens-stormbolt')
    SetChoiceNode(Talent, TAB, 4, 4, 0, true, CreateArray<uint32>([Talent, GetID(`Spell`, 'dh-spells', 'warr-gen-sledgehammer')]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, 'dh-spells', 'warr-gen-stormbolt')]: 1}), EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'warr-gen-bloodletting')
    SetTalentNode(Talent, TAB, 6, 4, 0, true, new StarterData(CLASS, false, 0), CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `warr-gen-blood-and-thunder`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'warr-gen-the-wall')
    SetTalentNode(Talent, TAB, 7, 4, 0, true, new StarterData(CLASS, false, 0), CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `warr-gen-blood-and-thunder`)]: 1, [GetID(`Spell`, `dh-spells`, `warr-gen-blitz`)]: 1, [GetID(`Spell`,  'dh-spells', 'warr-gen-chargepositive')]: 1}), EmptySpellArray, EmptySpellArray)
    
}
