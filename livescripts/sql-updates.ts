// Aleist3r: Some queries will be run from here, mostly the ones that need to be run again with build
// But also I'm a lazy ass, instead of making SQL files in the core (then updating sumbodule head) some stuff lands here :P

export function UpdateSQLTables() {
    QueryWorld(`Delete from spell_learn_spell where entry = 58984`)

    QueryWorld(`Delete from spell_pet_auras where pet in (416, 417, 1860, 1863, 17252)`)
    
    let Spell : uint32 = GetID(`Spell`, 'dh-spells', 'warl-gen-soul-leech')
    let Aura : uint32 = GetID(`Spell`, 'dh-spells', 'warl-gen-soul-leech-minion')
    QueryWorld(`Insert into spell_pet_auras (spell, effectId, pet, aura) values
        (${Spell}, 0, 416, ${Aura}),
        (${Spell}, 0, 417, ${Aura}),
        (${Spell}, 0, 1860, ${Aura}),
        (${Spell}, 0, 1863, ${Aura}),
        (${Spell}, 0, 17252, ${Aura});`)
    
    Spell = GetID(`Spell`, 'dh-spells', 'warl-gen-demonic-fortitude')
    Aura = GetID(`Spell`, 'dh-spells', 'warl-gen-demonic-fortitude-pet')
    QueryWorld(`Insert into spell_pet_auras (spell, effectId, pet, aura) values
        (${Spell}, 0, 416, ${Aura}),
        (${Spell}, 0, 417, ${Aura}),
        (${Spell}, 0, 1860, ${Aura}),
        (${Spell}, 0, 1863, ${Aura}),
        (${Spell}, 0, 17252, ${Aura});`)

    //Aleist3r: Another dirty hack since .Proc.Cooldown doesn't exist
    Spell = GetID(`Spell`, 'dh-spells', 'warl-aff-eradication')
    QueryWorld(`update spell_proc set Cooldown = 20000 where SpellID = ${Spell}`)
}
