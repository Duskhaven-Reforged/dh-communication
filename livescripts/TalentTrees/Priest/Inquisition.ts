import { EmptyPrereqs, EmptySpellArray, SetChoiceNode, SetSpecAutolearn, SetTalentNode, SpecTabs } from "../TalentTreeLoader"

export function ReloadInqPriestTree() {
    let TAB: uint32 = SpecTabs.INQU
    let CLASS = Class.PRIEST

    QueryWorld(`delete from character_spec_autolearn where \`class\` = ${CLASS} and \`spec\` = ${TAB}`)
    //SetSpecAutolearn(CLASS, TAB, 10, GetID(`Spell`, 'dh-spells', 'pri-inq-mastery'))
    SetSpecAutolearn(CLASS, TAB, 10, GetID(`Spell`, 'dh-spells', 'pri-inq-wrathofthecrusade'))
    SetSpecAutolearn(CLASS, TAB, 10, GetID(`Spell`, 'dh-spells', 'pri-inq-powerwordpunishment'))
    SetSpecAutolearn(CLASS, TAB, 10, GetID(`Spell`, 'dh-spells', 'pri-inq-scarletwrath'))
    SetSpecAutolearn(CLASS, TAB, 16, GetID(`Spell`, 'dh-spells', 'pri-inq-blindedbylight'))

    QueryWorld(`Delete from forge_talents where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_prereq where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_ranks where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_unlearn where talentTabId = ${TAB}`)

    let Talent : uint32 = GetID(`Spell`, `dh-spells`, `pri-inq-zealotskin`)
    SetTalentNode(Talent, TAB, 6, 1, 0, false, 2**(TAB-1), CreateArray<uint32>([Talent]), EmptyPrereqs, EmptySpellArray, EmptySpellArray)

    Talent = GetID(`Spell`, `dh-spells`, `pri-inq-handoftheempyreal`)
    SetTalentNode(Talent, TAB, 6, 2, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pri-inq-zealotskin`)]: 1}), EmptySpellArray, EmptySpellArray)

    Talent = GetID(`Spell`, `dh-spells`, `pri-inq-viciouscycle`)
    SetTalentNode(Talent, TAB, 5, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pri-inq-handoftheempyreal`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `pri-inq-scarletblaze`)
    SetTalentNode(Talent, TAB, 6, 3, 0, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pri-inq-handoftheempyreal`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `pri-inq-sinnersflame`)
    SetTalentNode(Talent, TAB, 7, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pri-inq-handoftheempyreal`)]: 1}), EmptySpellArray, EmptySpellArray)

    Talent = GetID(`Spell`, `dh-spells`, `pri-inq-powerwordretribution`)
    SetTalentNode(Talent, TAB, 3, 4, 0, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pri-inq-zealotskin`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `pri-inq-holyblaze`)
    SetTalentNode(Talent, TAB, 5, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pri-inq-viciouscycle`)]: 1, [GetID(`Spell`, `dh-spells`, `pri-inq-scarletblaze`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `pri-inq-embersremain`)
    SetTalentNode(Talent, TAB, 6, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pri-inq-scarletblaze`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `pri-inq-blindfaith`)
    SetTalentNode(Talent, TAB, 7, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pri-inq-scarletblaze`)]: 1, [GetID(`Spell`, `dh-spells`, `pri-inq-sinnersflame`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `pri-inq-punisher`)
    SetTalentNode(Talent, TAB, 9, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pri-inq-zealotskin`)]: 1}), EmptySpellArray, EmptySpellArray)

    Talent = GetID(`Spell`, `dh-spells`, `pri-inq-spreadtheword`)
    SetTalentNode(Talent, TAB, 3, 5, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pri-inq-powerwordretribution`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `pri-inq-radiantashes`)
    SetTalentNode(Talent, TAB, 5, 5, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pri-inq-holyblaze`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `pri-inq-obliteratesinners`)
    SetTalentNode(Talent, TAB, 6, 5, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pri-inq-holyblaze`)]: 1, [GetID(`Spell`, `dh-spells`, `pri-inq-embersremain`)]: 1, [GetID(`Spell`, `dh-spells`, `pri-inq-blindfaith`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `pri-inq-inquisitorspast`)
    SetTalentNode(Talent, TAB, 7, 5, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pri-inq-blindfaith`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `pri-inq-empathylost`)
    SetTalentNode(Talent, TAB, 9, 5, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pri-inq-punisher`)]: 1}), EmptySpellArray, EmptySpellArray)
    
    Talent = GetID(`Spell`, `dh-spells`, `pri-inq-fateandconviction`)
    SetTalentNode(Talent, TAB, 3, 6, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pri-inq-spreadtheword`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `pri-inq-reachofthelight`)
    SetTalentNode(Talent, TAB, 4, 6, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pri-inq-spreadtheword`)]: 1, [GetID(`Spell`, `dh-spells`, `pri-inq-radiantashes`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `pri-inq-pursuitthewicked`)
    SetTalentNode(Talent, TAB, 5, 6, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pri-inq-radiantashes`)]: 1, [GetID(`Spell`, `dh-spells`, `pri-inq-obliteratesinners`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `pri-inq-destroyevil`)
    SetTalentNode(Talent, TAB, 6, 6, 8, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pri-inq-obliteratesinners`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `pri-inq-holyobliteration`)
    SetTalentNode(Talent, TAB, 7, 6, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pri-inq-obliteratesinners`)]: 1, [GetID(`Spell`, `dh-spells`, `pri-inq-inquisitorspast`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `pri-inq-weightofthelight`)
    SetTalentNode(Talent, TAB, 8, 6, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pri-inq-inquisitorspast`)]: 1, [GetID(`Spell`, `dh-spells`, `pri-inq-empathylost`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `pri-inq-pyreforthewicked`)
    SetTalentNode(Talent, TAB, 9, 6, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pri-inq-empathylost`)]: 1}), EmptySpellArray, EmptySpellArray)
    
    Talent = GetID(`Spell`, `dh-spells`, `pri-inq-requitalforretribution`)
    SetTalentNode(Talent, TAB, 3, 7, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pri-inq-fateandconviction`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `pri-inq-smitingfrenzy`)
    SetTalentNode(Talent, TAB, 4, 7, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pri-inq-fateandconviction`)]: 1, [GetID(`Spell`, `dh-spells`, `pri-inq-reachofthelight`)]: 1, [GetID(`Spell`, `dh-spells`, `pri-inq-pursuitthewicked`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `pri-inq-furyfire`)
    SetTalentNode(Talent, TAB, 6, 7, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pri-inq-destroyevil`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `pri-inq-luminousburst`)
    SetTalentNode(Talent, TAB, 8, 7, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pri-inq-holyobliteration`)]: 1, [GetID(`Spell`, `dh-spells`, `pri-inq-weightofthelight`)]: 1, [GetID(`Spell`, `dh-spells`, `pri-inq-pyreforthewicked`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `pri-inq-contemptofthewicked`)
    SetTalentNode(Talent, TAB, 9, 7, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pri-inq-pyreforthewicked`)]: 1}), EmptySpellArray, EmptySpellArray)
}
