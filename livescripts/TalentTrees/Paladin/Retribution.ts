import { EmptyPrereqs, EmptySpellArray, SetChoiceNode, SetSpecAutolearn, SetTalentNode, SpecTabs } from "../TalentTreeLoader"

export function ReloadPalRetTree() {
    let TAB: uint32 = SpecTabs.RPAL
    let CLASS = 2

    QueryWorld(`delete from character_spec_autolearn where \`class\` = ${CLASS} and \`spec\` = ${TAB}`)
    SetSpecAutolearn(CLASS, TAB, 10, GetID(`Spell`, 'dh-spells', 'pal-ret-sheathoflight'))
    SetSpecAutolearn(CLASS, TAB, 16, GetID(`Spell`, 'dh-spells', 'pal-ret-vindication'))

    QueryWorld(`Delete from forge_talents where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_prereq where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_ranks where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_unlearn where talentTabId = ${TAB}`)

    let Talent : uint32 = GetID(`Spell`, 'dh-spells', 'pal-ret-divinestorm')
    SetTalentNode(Talent, TAB, 6, 1, 0, false, 2**(TAB-1), CreateArray<uint32>([Talent]), EmptyPrereqs, EmptySpellArray, EmptySpellArray)
    
    Talent = GetID(`Spell`, `dh-spells`, `pal-ret-divinestorm-tempestofthelightbringer`)
    SetTalentNode(Talent, TAB, 5, 2, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pal-ret-divinestorm`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `pal-ret-lightscelerity`)
    SetTalentNode(Talent, TAB, 6, 2, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pal-ret-divinestorm`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = 20057
    SetTalentNode(Talent, TAB, 7, 2, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pal-ret-divinestorm`)]: 1}), EmptySpellArray, EmptySpellArray)
    
    Talent = GetID(`Spell`, `dh-spells`, `pal-ret-artofwar`)
    SetTalentNode(Talent, TAB, 5, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pal-ret-divinestorm-tempestofthelightbringer`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `pal-ret-championsreward`)
    SetTalentNode(Talent, TAB, 6, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pal-ret-divinestorm-tempestofthelightbringer`)]: 1, [GetID(`Spell`, `dh-spells`, `pal-ret-lightscelerity`)]: 1, [20057]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `pal-ret-championszeal`)
    SetTalentNode(Talent, TAB, 7, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[20057]: 1}), EmptySpellArray, EmptySpellArray)
    
    Talent = GetID(`Spell`, `dh-spells`, `pal-ret-flamesofwar`)
    SetTalentNode(Talent, TAB, 4, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pal-ret-artofwar`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `pal-ret-blessedchampion`)
    SetChoiceNode(Talent, TAB, 6, 4, 0, true, CreateArray<uint32>([Talent, GetID(`Spell`, `dh-spells`, `pal-ret-righteousmaverick`)]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, 'dh-spells', 'pal-ret-artofwar')]: 1, [GetID(`Spell`, 'dh-spells', 'pal-ret-championsreward')]: 1, [GetID(`Spell`, 'dh-spells', 'pal-ret-championszeal')]: 1}), EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `pal-ret-finalverdict`)
    SetTalentNode(Talent, TAB, 8, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pal-ret-championszeal`)]: 1}), EmptySpellArray, EmptySpellArray)
    
    Talent = GetID(`Spell`, `dh-spells`, `pal-ret-searinglight`)
    SetTalentNode(Talent, TAB, 3, 5, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pal-ret-flamesofwar`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `pal-ret-seethingflames`)
    SetTalentNode(Talent, TAB, 5, 5, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pal-ret-flamesofwar`)]: 1, [GetID(`Spell`, `dh-spells`, `pal-ret-blessedchampion`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `pal-ret-lightscaress`)
    SetTalentNode(Talent, TAB, 6, 5, 8, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pal-ret-blessedchampion`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `pal-ret-expurgation`)
    SetTalentNode(Talent, TAB, 7, 5, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pal-ret-blessedchampion`)]: 1, [GetID(`Spell`, `dh-spells`, `pal-ret-finalverdict`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `pal-ret-sanctification`)
    SetTalentNode(Talent, TAB, 9, 5, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pal-ret-finalverdict`)]: 1}), EmptySpellArray, EmptySpellArray)
    
    Talent = GetID(`Spell`, `dh-spells`, `pal-ret-jurisdiction`)
    SetTalentNode(Talent, TAB, 4, 6, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pal-ret-searinglight`)]: 1, [GetID(`Spell`, `dh-spells`, `pal-ret-flamesofwar`)]: 1, [GetID(`Spell`, `dh-spells`, `pal-ret-seethingflames`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `pal-ret-boundlessjudgements`)
    SetTalentNode(Talent, TAB, 5, 6, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pal-ret-seethingflames`)]: 1, [GetID(`Spell`, `dh-spells`, `pal-ret-lightscaress`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `pal-ret-sacredshell`)
    SetChoiceNode(Talent, TAB, 6, 6, 8, true, CreateArray<uint32>([Talent, GetID(`Spell`, `dh-spells`, `pal-ret-gloriousalacrity`)]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, 'dh-spells', 'pal-ret-lightscaress')]: 1}), EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `pal-ret-tempestuousfaith`)
    SetTalentNode(Talent, TAB, 7, 6, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pal-ret-lightscaress`)]: 1, [GetID(`Spell`, `dh-spells`, `pal-ret-expurgation`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `pal-ret-vanguardofjustice`)
    SetTalentNode(Talent, TAB, 8, 6, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pal-ret-expurgation`)]: 1, [GetID(`Spell`, `dh-spells`, `pal-ret-finalverdict`)]: 1, [GetID(`Spell`, `dh-spells`, `pal-ret-sanctification`)]: 1}), EmptySpellArray, EmptySpellArray)
    
    Talent = GetID(`Spell`, `dh-spells`, `pal-ret-empyreanpower1`)
    SetTalentNode(Talent, TAB, 3, 7, 8, true, 0, CreateArray<uint32>([Talent, GetID(`Spell`, `dh-spells`, `pal-ret-empyreanpower2`)]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pal-ret-jurisdiction`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `pal-ret-radiantjudgement`)
    SetTalentNode(Talent, TAB, 4, 7, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pal-ret-jurisdiction`)]: 1, [GetID(`Spell`, `dh-spells`, `pal-ret-boundlessjudgements`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `pal-ret-adjudication`)
    SetTalentNode(Talent, TAB, 5, 7, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pal-ret-boundlessjudgements`)]: 1, [GetID(`Spell`, `dh-spells`, `pal-ret-sacredshell`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `pal-ret-crusade`)
    SetTalentNode(Talent, TAB, 6, 7, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pal-ret-sacredshell`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `pal-ret-heartofthecrusader`)
    SetTalentNode(Talent, TAB, 7, 7, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pal-ret-sacredshell`)]: 1, [GetID(`Spell`, `dh-spells`, `pal-ret-tempestuousfaith`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `pal-ret-lightofjustice`)
    SetTalentNode(Talent, TAB, 8, 7, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pal-ret-tempestuousfaith`)]: 1, [GetID(`Spell`, `dh-spells`, `pal-ret-vanguardofjustice`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, `dh-spells`, `pal-ret-divinewrath1`)
    SetTalentNode(Talent, TAB, 9, 7, 8, true, 0, CreateArray<uint32>([Talent, GetID(`Spell`, `dh-spells`, `pal-ret-divinewrath2`)]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `pal-ret-vanguardofjustice`)]: 1}), EmptySpellArray, EmptySpellArray)
}