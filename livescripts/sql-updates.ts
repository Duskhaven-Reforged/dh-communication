// Aleist3r: Some queries will be run from here, mostly the ones that need to be run again with build
// But also I'm a lazy ass, instead of making SQL files in the core (then updating sumbodule head) some stuff lands here :P

export function UpdateSQLTables() {
    QueryWorld(`Delete from spell_learn_spell where entry = 58984`)

    QueryWorld(`Delete from spell_pet_auras where pet in (416, 417, 1860, 1863, 17252)`)

    // temporary
    QueryWorld(`Insert ignore into forge_talent_tabs (id, classMask, raceMask, name, spellIcon, background, description, role, spellString, tabType, TabIndex) values
    (33, 16, 32767, 'Inquisition', 1, 'SpecBG/priest-discipline', 'Soon', 1, 0, 0, 99);`)

    //Aleist3r: Another dirty hack since .Proc.Cooldown doesn't exist
    let Spell = GetID(`Spell`, 'dh-spells', 'mag-gen-magicansflourish')
    QueryWorld(`insert ignore into spell_proc (SpellId, SchoolMask, SpellFamilyName, SpellFamilyMask0, SpellFamilyMask1, SpellFamilyMask2, ProcFlags, SpellTypeMask, SpellPhaseMask, HitMask, AttributesMask, DisableEffectsMask, ProcsPerMinute, Chance, Cooldown, Charges, __tswow_tag) values
    (${Spell}, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1000, 0, 0);)`)
}
