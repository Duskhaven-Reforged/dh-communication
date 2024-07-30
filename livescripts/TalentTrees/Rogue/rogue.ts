import { EmptyPrereqs, EmptySpellArray, SetChoiceNode, SetTalentNode, StarterData } from "../TalentTreeLoader"

export function ReloadRogueTree() {
    let TAB = 54
    let CLASS = Class.ROGUE

    let Talent : uint32 = GetID(`Spell`, `dh-spells`, `rog-gen-shiv`)
    SetTalentNode(Talent, TAB, 2, 1, 0, false, new StarterData(CLASS, true, 0), CreateArray<uint32>([Talent]), EmptyPrereqs, EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `rog-gen-crimsonvial`)
    SetTalentNode(Talent, TAB, 5, 1, 0, false, new StarterData(CLASS, true, 0), CreateArray<uint32>([Talent]), EmptyPrereqs, EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `rog-gen-sap`)
    SetTalentNode(Talent, TAB, 8, 1, 0, false, new StarterData(CLASS, true, 0), CreateArray<uint32>([Talent]), EmptyPrereqs, EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `rog-gen-virulentpoisons`)
    SetTalentNode(Talent, TAB, 3, 2, 0, true, new StarterData(CLASS, false, 0), CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `rog-gen-shiv`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `rog-gen-southpawexpertise`)
    SetTalentNode(Talent, TAB, 5, 2, 0, true, new StarterData(CLASS, false, 0), CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `rog-gen-crimsonvial`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `rog-gen-nightstalker`)
    SetTalentNode(Talent, TAB, 7, 2, 0, true, new StarterData(CLASS, false, 0), CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `rog-gen-sap`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `rog-gen-masterpoisoner`)
    SetTalentNode(Talent, TAB, 2, 3, 0, true, new StarterData(CLASS, false, 0), CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `rog-gen-virulentpoisons`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `rog-gen-improvedgouge`)
    SetTalentNode(Talent, TAB, 4, 3, 0, true, new StarterData(CLASS, false, 0), CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `rog-gen-virulentpoisons`)]: 1, [GetID(`Spell`, 'dh-spells', 'rog-gen-southpawexpertise')]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `rog-gen-improvedsprint`)
    SetTalentNode(Talent, TAB, 5, 3, 0, true, new StarterData(CLASS, false, 0), CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `rog-gen-southpawexpertise`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `rog-gen-cheatdeath`)
    SetTalentNode(Talent, TAB, 6, 3, 0, true, new StarterData(CLASS, false, 0), CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `rog-gen-southpawexpertise`)]: 1, [GetID(`Spell`, 'dh-spells', 'rog-gen-nightstalker')]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `rog-gen-improvedambush`)
    SetTalentNode(Talent, TAB, 8, 3, 0, true, new StarterData(CLASS, false, 0), CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `rog-gen-nightstalker`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `rog-gen-leechingpoison`)
    SetTalentNode(Talent, TAB, 3, 4, 0, true, new StarterData(CLASS, false, 0), CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `rog-gen-masterpoisoner`)]: 1, [GetID(`Spell`, 'dh-spells', 'rog-gen-improvedgouge')]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `rog-gen-irongut`)
    SetTalentNode(Talent, TAB, 4, 4, 0, true, new StarterData(CLASS, false, 0), CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `rog-gen-improvedgouge`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `rog-gen-thistletea`)
    SetTalentNode(Talent, TAB, 5, 4, 0, false, new StarterData(CLASS, false, 0), CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `rog-gen-improvedgouge`)]: 1, [GetID(`Spell`, 'dh-spells', 'rog-gen-improvedsprint')]: 1, [GetID(`Spell`, 'dh-spells', 'rog-gen-cheatdeath')]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `rog-gen-sealegs`)
    SetTalentNode(Talent, TAB, 6, 4, 0, true, new StarterData(CLASS, false, 0), CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `rog-gen-cheatdeath`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `rog-gen-preyontheweak`)
    SetTalentNode(Talent, TAB, 7, 4, 0, true, new StarterData(CLASS, false, 0), CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `rog-gen-cheatdeath`)]: 1, [GetID(`Spell`, 'dh-spells', 'rog-gen-improvedambush')]: 1}), EmptySpellArray, EmptySpellArray)

}