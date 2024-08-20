
import { EmptyPrereqs, EmptySpellArray, SetChoiceNode, SetTalentNode, SpecTabs } from "../TalentTreeLoader"

export function ReloadWarriorTree() {
    let TAB = 51
    let ALLMASK = 2**(SpecTabs.ARMS - 1) + 2**(SpecTabs.FURY - 1) + 2**(SpecTabs.PWAR - 1)

    QueryWorld(`Delete from forge_talents where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_prereq where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_ranks where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_unlearn where talentTabId = ${TAB}`)

    let Talent : uint32 = GetID(`Spell`, `dh-spells`, `warr-gen-victoryrush`)
    SetTalentNode(Talent, TAB, 4, 1, 0, false, ALLMASK, CreateArray<uint32>([Talent]), EmptyPrereqs, EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'warr-gen-heroicleap')
    SetTalentNode(Talent, TAB, 6, 1, 0, false, ALLMASK, CreateArray<uint32>([Talent]), EmptyPrereqs, EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'warr-gen-warmachine')
    SetTalentNode(Talent, TAB, 3, 2, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `warr-gen-victoryrush`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'warr-gen-siezetheday')
    SetTalentNode(Talent, TAB, 4, 2, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `warr-gen-victoryrush`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'warr-gen-rallyingcry')
    SetTalentNode(Talent, TAB, 5, 2, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `warr-gen-victoryrush`)]: 1, [GetID(`Spell`, 'dh-spells', 'warr-gen-heroicleap')]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'warr-gen-heroicentrance')
    SetTalentNode(Talent, TAB, 6, 2, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `warr-gen-heroicleap`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'warr-gen-blitz')
    SetTalentNode(Talent, TAB, 7, 2, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `warr-gen-heroicleap`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'warr-gen-angermanagement')
    SetTalentNode(Talent, TAB, 2, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `warr-gen-warmachine`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'warr-gen-stormbolt')
    SetTalentNode(Talent, TAB, 4, 3, 0, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, 'warr-gen-siezetheday')]: 1, [GetID(`Spell`, 'dh-spells', 'warr-gen-rallyingcry')]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'warr-gen-secondwind')
    SetChoiceNode(Talent, TAB, 5, 3, 0, true, CreateArray<uint32>([Talent, GetID(`Spell`, 'dh-spells', 'warr-gen-bloodcraze')]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, 'warr-gen-rallyingcry')]: 1}), EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'warr-gen-bloodandthunder')
    SetTalentNode(Talent, TAB, 6, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, 'warr-gen-heroicentrance')]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'warr-gen-chargepositive')
    SetTalentNode(Talent, TAB, 8, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, 'warr-gen-blitz')]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'warr-gen-quickandheavy')
    SetTalentNode(Talent, TAB, 3, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `warr-gen-warmachine`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'warr-gen-svensstormbolt')
    SetChoiceNode(Talent, TAB, 4, 4, 0, true, CreateArray<uint32>([Talent, GetID(`Spell`, 'dh-spells', 'warr-gen-sledgehammer')]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, 'dh-spells', 'warr-gen-stormbolt')]: 1}), EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'warr-gen-bloodletting')
    SetTalentNode(Talent, TAB, 6, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `warr-gen-bloodandthunder`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'warr-gen-thewall')
    SetTalentNode(Talent, TAB, 7, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `warr-gen-bloodandthunder`)]: 1, [GetID(`Spell`, `dh-spells`, `warr-gen-blitz`)]: 1, [GetID(`Spell`,  'dh-spells', 'warr-gen-chargepositive')]: 1}), EmptySpellArray, EmptySpellArray)
    
}
