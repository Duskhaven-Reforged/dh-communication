import { EmptyPrereqs, EmptySpellArray, SetChoiceNode, SetSpecAutolearn, SetTalentNode, SpecTabs } from "../TalentTreeLoader"

export function ReloadSVTree() {
    let TAB = SpecTabs.SVHU
    let CLASS = Class.HUNTER

    QueryWorld(`delete from character_spec_autolearn where \`class\` = ${CLASS} and \`spec\` = ${TAB}`)
    SetSpecAutolearn(CLASS, TAB, 10, GetID(`Spell`, 'dh-spells', 'hun-mm-wildhunt'))
    SetSpecAutolearn(CLASS, TAB, 10, GetID(`Spell`, 'dh-spells', 'hun-sur-upcloseandpersonal'))

    QueryWorld(`Delete from forge_talents where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_prereq where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_ranks where talentTabId = ${TAB}`)
    QueryWorld(`Delete from forge_talent_unlearn where talentTabId = ${TAB}`)

    let Talent : uint32 = GetID(`Spell`, `dh-spells`, `hun-sur-mongoosebite`)
    SetTalentNode(Talent, TAB, 6, 1, 0, false, 2**(TAB-1), CreateArray<uint32>([Talent]), EmptyPrereqs, EmptySpellArray, EmptySpellArray)

    Talent = GetID(`Spell`, 'dh-spells', 'hun-sur-wyvernsting')
    SetTalentNode(Talent, TAB, 5, 2, 0, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `hun-sur-mongoosebite`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'hun-sur-skirmisher')
    SetTalentNode(Talent, TAB, 6, 2, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `hun-sur-mongoosebite`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'hun-sur-lunge')
    SetTalentNode(Talent, TAB, 7, 2, 0, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `hun-sur-mongoosebite`)]: 1}), EmptySpellArray, EmptySpellArray)
    
    Talent = GetID(`Spell`, 'dh-spells', 'hun-sur-luringsting')
    SetTalentNode(Talent, TAB, 5, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `hun-sur-wyvernsting`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'hun-sur-carve')
    SetTalentNode(Talent, TAB, 6, 3, 0, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `hun-sur-wyvernsting`)]: 1, [GetID(`Spell`, `dh-spells`, `hun-sur-skirmisher`)]: 1, [GetID(`Spell`, `dh-spells`, `hun-sur-lunge`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'hun-sur-spearmaster')
    SetTalentNode(Talent, TAB, 7, 3, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `hun-sur-lunge`)]: 1}), EmptySpellArray, EmptySpellArray)

    Talent = GetID(`Spell`, 'dh-spells', 'hun-sur-teamwork')
    SetTalentNode(Talent, TAB, 5, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `hun-sur-luringsting`)]: 1, [GetID(`Spell`, `dh-spells`, `hun-sur-carve`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'hun-sur-venomousslashings')
    SetTalentNode(Talent, TAB, 6, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `hun-sur-carve`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'hun-sur-primalstrikes')
    SetTalentNode(Talent, TAB, 7, 4, 0, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `hun-sur-carve`)]: 1, [GetID(`Spell`, `dh-spells`, `hun-sur-spearmaster`)]: 1}), EmptySpellArray, EmptySpellArray)

    Talent = GetID(`Spell`, 'dh-spells', 'hun-sur-excruciatingstrikes')
    SetTalentNode(Talent, TAB, 4, 5, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `hun-sur-teamwork`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'hun-sur-coldsteel')
    SetTalentNode(Talent, TAB, 5, 5, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `hun-sur-teamwork`)]: 1, [GetID(`Spell`, `dh-spells`, `hun-sur-venomousslashings`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'hun-sur-subversivesdedication')
    SetTalentNode(Talent, TAB, 6, 5, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `hun-sur-venomousslashings`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'hun-sur-fixate')
    SetTalentNode(Talent, TAB, 7, 5, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `hun-sur-venomousslashings`)]: 1, [GetID(`Spell`, `dh-spells`, `hun-sur-primalstrikes`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'hun-sur-slicinghazard')
    SetTalentNode(Talent, TAB, 8, 5, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `hun-sur-primalstrikes`)]: 1}), EmptySpellArray, EmptySpellArray)
    
    Talent = GetID(`Spell`, 'dh-spells', 'hun-sur-bloodintheair')
    SetTalentNode(Talent, TAB, 3, 6, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `hun-sur-excruciatingstrikes`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'hun-sur-painfulsting')
    SetTalentNode(Talent, TAB, 4, 6, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `hun-sur-excruciatingstrikes`)]: 1, [GetID(`Spell`, `dh-spells`, `hun-sur-coldsteel`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'hun-sur-airbornefury')
    SetTalentNode(Talent, TAB, 5, 6, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `hun-sur-coldsteel`)]: 1, [GetID(`Spell`, `dh-spells`, `hun-sur-subversivesdedication`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'hun-sur-killingbite')
    SetTalentNode(Talent, TAB, 6, 6, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `hun-sur-subversivesdedication`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'hun-sur-wildstalkersfury')
    SetTalentNode(Talent, TAB, 7, 6, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `hun-sur-subversivesdedication`)]: 1, [GetID(`Spell`, `dh-spells`, `hun-sur-fixate`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'hun-sur-wolverinestrike')
    SetTalentNode(Talent, TAB, 8, 6, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `hun-sur-fixate`)]: 1, [GetID(`Spell`, `dh-spells`, `hun-sur-slicinghazard`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'hun-sur-shreddinghazard')
    SetTalentNode(Talent, TAB, 9, 6, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `hun-sur-slicinghazard`)]: 1}), EmptySpellArray, EmptySpellArray)

    Talent = GetID(`Spell`, 'dh-spells', 'hun-sur-vilevenoms')
    SetTalentNode(Talent, TAB, 3, 7, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `hun-sur-bloodintheair`)]: 1, [GetID(`Spell`, `dh-spells`, `hun-sur-painfulsting`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'hun-sur-carvingandflaying')
    SetTalentNode(Talent, TAB, 4, 7, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `hun-sur-painfulsting`)]: 1, [GetID(`Spell`, `dh-spells`, `hun-sur-airbornefury`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'hun-sur-mercilesstraps')
    SetTalentNode(Talent, TAB, 5, 7, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `hun-sur-airbornefury`)]: 1, [GetID(`Spell`, `dh-spells`, `hun-sur-killingbite`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'hun-sur-coordinatedassault')
    SetTalentNode(Talent, TAB, 6, 7, 8, false, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `hun-sur-killingbite`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'hun-sur-trappersfury')
    SetTalentNode(Talent, TAB, 7, 7, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `hun-sur-killingbite`)]: 1, [GetID(`Spell`, `dh-spells`, `hun-sur-wildstalkersfury`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'hun-sur-primalfrenzy')
    SetTalentNode(Talent, TAB, 8, 7, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `hun-sur-wildstalkersfury`)]: 1, [GetID(`Spell`, `dh-spells`, `hun-sur-wolverinestrike`)]: 1}), EmptySpellArray, EmptySpellArray)
    Talent = GetID(`Spell`, 'dh-spells', 'hun-sur-bladerush')
    SetTalentNode(Talent, TAB, 9, 7, 8, true, 0, CreateArray<uint32>([Talent]), CreateDictionary<uint32, uint8>({[GetID(`Spell`, `dh-spells`, `hun-sur-wolverinestrike`)]: 1, [GetID(`Spell`, `dh-spells`, `hun-sur-shreddinghazard`)]: 1}), EmptySpellArray, EmptySpellArray)

}