import { std } from "wow/wotlk";
let RebuildWorld = true

if (RebuildWorld) {
    std.SQL.Databases.world_dest.writeEarly(`
        DROP TABLE IF EXISTS \`forge_talent_tabs\`;
        CREATE TABLE IF NOT EXISTS \`forge_talent_tabs\` (
            \`id\` INT UNSIGNED NOT NULL,
            \`classMask\` INT UNSIGNED NOT NULL,
            \`raceMask\` INT UNSIGNED NOT NULL,
            \`name\` VARCHAR(100) NOT NULL,
            \`spellIcon\` MEDIUMINT UNSIGNED NOT NULL,
            \`background\` TEXT NOT NULL,
            \`description\` VARCHAR(1000),
            \`role\` tinyint(1) default 0,
            \`spellString\` varchar(255),
            \`tabType\` INT UNSIGNED NOT NULL,
            \`TabIndex\` INT UNSIGNED NOT NULL,
            PRIMARY KEY (\`id\`));
            INSERT INTO \`forge_talent_tabs\` (\`id\`, \`classMask\`, \`raceMask\`, \`name\`, \`spellIcon\`, \`background\`, \`description\`, \`role\`, \`spellString\`, \`tabType\`, \`TabIndex\`) VALUES (1, 1, 32767, 'Arms', 9347, 'SpecBG/warrior-arms', 'A battle-hardened master of weapons, using mobility and overpowering attacks to strike their opponents down.\r\n\r\nPreferred Weapons: Two-handed Axe, Mace, Sword\r\nPrimary Stat: Strength\r\n', '1', '12294, 46924, 2457', 0, 98);
            INSERT INTO \`forge_talent_tabs\` (\`id\`, \`classMask\`, \`raceMask\`, \`name\`, \`spellIcon\`, \`background\`, \`description\`, \`role\`, \`spellString\`, \`tabType\`, \`TabIndex\`) VALUES (2, 1, 32767, 'Fury', 20375, 'SpecBG/warrior-fury', 'A furious dual-wielding berserker unleashing a flurry of attacks to carve their opponenets to pieces.\r\n\r\nPreferred Weapons: Dual Two-Handed Axes, Maces, Sword\r\nPrimary Stat: Strength', '1', '23881, 1719, 2458', 0, 97);
            INSERT INTO \`forge_talent_tabs\` (\`id\`, \`classMask\`, \`raceMask\`, \`name\`, \`spellIcon\`, \`background\`, \`description\`, \`role\`, \`spellString\`, \`tabType\`, \`TabIndex\`) VALUES (3, 1, 32767, 'Protection', 71, 'SpecBG/warrior-protection', 'A stalwart protector who uses a shield to safeguard themselves and their allies.\r\n\r\nPreferred Weapons: Axe, Mace, Sword, and Shield\r\nPrimary Stat: Strength', '3', '23922, 871, 71', 0, 96);
            INSERT INTO \`forge_talent_tabs\` (\`id\`, \`classMask\`, \`raceMask\`, \`name\`, \`spellIcon\`, \`background\`, \`description\`, \`role\`, \`spellString\`, \`tabType\`, \`TabIndex\`) VALUES (4, 2, 32767, 'Holy', 66112, 'SpecBG/paladin-holy', 'Invokes the power of the Light to heal and protect allies and vaquish evil from the darkest corners of the world.\r\n\r\nPreferred Weapons: Sword, Mace, and Shield\r\nPrimary Stat: Intellect', '2', '20473, 53563, 48782', 0, 96);
            INSERT INTO \`forge_talent_tabs\` (\`id\`, \`classMask\`, \`raceMask\`, \`name\`, \`spellIcon\`, \`background\`, \`description\`, \`role\`, \`spellString\`, \`tabType\`, \`TabIndex\`) VALUES (5, 2, 32767, 'Protection', 53709, 'SpecBG/paladin-protection', 'Uses Holy magic to shield themselves and defend allies from attackers.\r\n\r\nPreferred Weapons: Sword, Mace, Axe, and Shield\r\nPrimary Stat: Strength', '3', '31935, 31850, 642', 0, 97);
            INSERT INTO \`forge_talent_tabs\` (\`id\`, \`classMask\`, \`raceMask\`, \`name\`, \`spellIcon\`, \`background\`, \`description\`, \`role\`, \`spellString\`, \`tabType\`, \`TabIndex\`) VALUES (6, 2, 32767, 'Retribution', 54043, 'SpecBG/paladin-retribution', 'A righteous crusader who judges and punishes opponents with weapons and Holy magic.\r\n\r\nPreferred Weapons: Two-Handed Sword, Mace, Axe\r\nPrimary Stat: Strength', '1', '53407, 35395, 31884', 0, 98);
            INSERT INTO \`forge_talent_tabs\` (\`id\`, \`classMask\`, \`raceMask\`, \`name\`, \`spellIcon\`, \`background\`, \`description\`, \`role\`, \`spellString\`, \`tabType\`, \`TabIndex\`) VALUES (7, 4, 32767, 'Beast Mastery', 58923, 'SpecBG/hunter-beastmastery', 'A master of the wild who can tame a wide variety of beasts to assist them in combat.\r\n\r\nPreferred Weapon: Bow, Crossbow, Gun\r\nPrimary Stat: Agility', '1', '34026, 19574, 1515', 0, 96);
            INSERT INTO \`forge_talent_tabs\` (\`id\`, \`classMask\`, \`raceMask\`, \`name\`, \`spellIcon\`, \`background\`, \`description\`, \`role\`, \`spellString\`, \`tabType\`, \`TabIndex\`) VALUES (8, 4, 32767, 'Marksmanship', 58923, 'SpecBG/hunter-marksmanship', 'A master sharpshooter who excels in bringing down enemies from afar.\r\n\r\nPreferred Weapon: Bow, Crossbow, Gun\r\nPrimary Stat: Agility', '1', '19434, 56641, 3045', 0, 97);
            INSERT INTO \`forge_talent_tabs\` (\`id\`, \`classMask\`, \`raceMask\`, \`name\`, \`spellIcon\`, \`background\`, \`description\`, \`role\`, \`spellString\`, \`tabType\`, \`TabIndex\`) VALUES (9, 4, 32767, 'Survival', 53301, 'SpecBG/hunter-survival', 'An adaptive ranger who favors using explosives, animal venom, and coordinated attacks with their bonded beast.\r\n\r\nPreferred Weapon: Polearm, Staff\r\nPrimary Stat: Agility', '1', '13813, 5384, 2973', 0, 98);
            INSERT INTO \`forge_talent_tabs\` (\`id\`, \`classMask\`, \`raceMask\`, \`name\`, \`spellIcon\`, \`background\`, \`description\`, \`role\`, \`spellString\`, \`tabType\`, \`TabIndex\`) VALUES (10, 8, 32767, 'Assassination', 8623, 'SpecBG/rogue-assassination', 'A deadly master of poisons who dispatches victims with vicious dagger strikes.\r\n\r\nPreferred Weapon: Daggers\r\nPrimary Stat: Agility', '1', '48691, 1833, 57993', 0, 98);
            INSERT INTO \`forge_talent_tabs\` (\`id\`, \`classMask\`, \`raceMask\`, \`name\`, \`spellIcon\`, \`background\`, \`description\`, \`role\`, \`spellString\`, \`tabType\`, \`TabIndex\`) VALUES (11, 8, 32767, 'Combat', 53, 'SpecBG/rogue-combat', 'A ruthless fugitive who uses agility and guile to stand toe-to-toe with enemies.\r\n\r\nPreferred Weapon: Axes, Maces, Swords, Fist Weapons\r\nPrimary Stat: Agility', '1', '48657, 13877, 11305', 0, 97);
            INSERT INTO \`forge_talent_tabs\` (\`id\`, \`classMask\`, \`raceMask\`, \`name\`, \`spellIcon\`, \`background\`, \`description\`, \`role\`, \`spellString\`, \`tabType\`, \`TabIndex\`) VALUES (12, 8, 32767, 'Subtlety', 1784, 'SpecBG/rogue-subtlety', 'A dark stalker who leaps from the shadows to ambush their unsuspecting prey.\r\n\r\nPreferred Weapons: Daggers\r\nPrimary Stat: Agility', '1', '31224, 26889, 2094', 0, 96);
            INSERT INTO \`forge_talent_tabs\` (\`id\`, \`classMask\`, \`raceMask\`, \`name\`, \`spellIcon\`, \`background\`, \`description\`, \`role\`, \`spellString\`, \`tabType\`, \`TabIndex\`) VALUES (13, 16, 32767, 'Holy', 47788, 'SpecBG/priest-holy', 'A versatile healer who can reverse damage on individuals or groups and even heal from beyond the grave.\r\n\r\nPreferred Weapons: Staff, Wand, Dagger, Mace\r\nPrimary Stat: Intellect', '2', '48113, 48153, 48076', 0, 97);
            INSERT INTO \`forge_talent_tabs\` (\`id\`, \`classMask\`, \`raceMask\`, \`name\`, \`spellIcon\`, \`background\`, \`description\`, \`role\`, \`spellString\`, \`tabType\`, \`TabIndex\`) VALUES (14, 16, 32767, 'Discipline', 9800, 'SpecBG/priest-discipline', 'Uses magic to shield allies from taking damage as well as heal their wounds.\r\n\r\nPreferred Weapons: Staff, Wand, Dagger, Mace\r\nPrimary Stat: Intellect', '2', '53000, 48066, 8129', 0, 96);
            INSERT INTO \`forge_talent_tabs\` (\`id\`, \`classMask\`, \`raceMask\`, \`name\`, \`spellIcon\`, \`background\`, \`description\`, \`role\`, \`spellString\`, \`tabType\`, \`TabIndex\`) VALUES (15, 16, 32767, 'Shadow', 589, 'SpecBG/priest-shadow', 'Uses sinister Shadow magic and terrifying Void magic to eradicate enemies.\r\n\r\nPreferred Weapons: Staff, Wand, Dagger, Mace\r\nPrimary Stat: Intellect', '1', '15473, 605, 48300', 0, 98);
            INSERT INTO \`forge_talent_tabs\` (\`id\`, \`classMask\`, \`raceMask\`, \`name\`, \`spellIcon\`, \`background\`, \`description\`, \`role\`, \`spellString\`, \`tabType\`, \`TabIndex\`) VALUES (16, 32, 32767, 'Blood', 50689, 'SpecBG/deathknight-blood', 'A dark guardian who manipulates and corrupts life energy to sustain themselves in the face of an enemy onslaught.\r\n\r\nPreferred Weapons: Two-Handed Axe, Mace, Sword\r\nPrimary Stat: Strength', '3', '49998, 49028, 48266', 0, 96);
            INSERT INTO \`forge_talent_tabs\` (\`id\`, \`classMask\`, \`raceMask\`, \`name\`, \`spellIcon\`, \`background\`, \`description\`, \`role\`, \`spellString\`, \`tabType\`, \`TabIndex\`) VALUES (17, 32, 32767, 'Frost', 50384, 'SpecBG/deathknight-frost', 'An icy harbinger of doom, channeling runic power and delivering vicious weapon strikes.\r\n\r\nPreferred Weapons: Dual Axes, Maces, Sword\r\nPrimary Stat: Strength', '1', '49020, 51271, 48263', 0, 97);
            INSERT INTO \`forge_talent_tabs\` (\`id\`, \`classMask\`, \`raceMask\`, \`name\`, \`spellIcon\`, \`background\`, \`description\`, \`role\`, \`spellString\`, \`tabType\`, \`TabIndex\`) VALUES (18, 32, 32767, 'Unholy', 50391, 'SpecBG/deathknight-unholy', 'A master of death and decay, spreading infection and controlling undead minions to do their bidding.\r\n\r\nPreferred Weapons: Two-Handed Axe, Mace, Sword\r\nPrimary Stat: Strength', '1', '46584, 49938, 48265', 0, 98);
            INSERT INTO \`forge_talent_tabs\` (\`id\`, \`classMask\`, \`raceMask\`, \`name\`, \`spellIcon\`, \`background\`, \`description\`, \`role\`, \`spellString\`, \`tabType\`, \`TabIndex\`) VALUES (21, 64, 32767, 'Restoration', 41114, 'SpecBG/shaman-restoration', 'A healer who calls upon ancestral spirits and the cleansing power of water to mend allies wounds.\r\n\r\nPreferred Weapon: Mace, Dagger, and Shield\r\nPrimary Stat: Intellect', '2', '1064, 57960, 49277', 0, 98);
            INSERT INTO \`forge_talent_tabs\` (\`id\`, \`classMask\`, \`raceMask\`, \`name\`, \`spellIcon\`, \`background\`, \`description\`, \`role\`, \`spellString\`, \`tabType\`, \`TabIndex\`) VALUES (32, 64, 32767, 'Stone Warden', 8143, 'SpecBG/shaman-stonewarden', 'Soon', '3', '0', 0, 99);
            INSERT INTO \`forge_talent_tabs\` (\`id\`, \`classMask\`, \`raceMask\`, \`name\`, \`spellIcon\`, \`background\`, \`description\`, \`role\`, \`spellString\`, \`tabType\`, \`TabIndex\`) VALUES (19, 64, 32767, 'Elemental', 54843, 'SpecBG/shaman-elemental', 'A spellcaster who harnesses the destructive forces of nature and the elements.', '1', '49271, 60043, 2894', 0, 96);
            INSERT INTO \`forge_talent_tabs\` (\`id\`, \`classMask\`, \`raceMask\`, \`name\`, \`spellIcon\`, \`background\`, \`description\`, \`role\`, \`spellString\`, \`tabType\`, \`TabIndex\`) VALUES (20, 64, 32767, 'Enhancement', 51521, 'SpecBG/shaman-enhancement', 'A totemic warrior who strikes foes with weapons imbued with elemental power.\r\n\r\nPreferred Weapons: Dual Axes, Maces, Fist Weapons\r\nPrimary Stat: Agility', '1', '17364, 51533, 32182', 0, 97);
            INSERT INTO \`forge_talent_tabs\` (\`id\`, \`classMask\`, \`raceMask\`, \`name\`, \`spellIcon\`, \`background\`, \`description\`, \`role\`, \`spellString\`, \`tabType\`, \`TabIndex\`) VALUES (23, 128, 32767, 'Fire', 42833, 'SpecBG/mage-fire', 'Focuses the pure essence of Fire magic, assaulting enemies with combustive flames.\r\n\r\nPreferred Weapon, Staff, Wand, Dagger, Sword\r\nPrimary Stat, Intellect', '1', '42833', 0, 97);
            INSERT INTO \`forge_talent_tabs\` (\`id\`, \`classMask\`, \`raceMask\`, \`name\`, \`spellIcon\`, \`background\`, \`description\`, \`role\`, \`spellString\`, \`tabType\`, \`TabIndex\`) VALUES (24, 128, 32767, 'Frost', 116, 'SpecBG/mage-frost', 'Freezes enemies in their tracks and shatters them with Frost magic.\r\n\r\nPreferred Weapon, Staff, Wand, Dagger, Sword\r\nPrimary Stat, Intellect', '1', '116', 0, 98);
            INSERT INTO \`forge_talent_tabs\` (\`id\`, \`classMask\`, \`raceMask\`, \`name\`, \`spellIcon\`, \`background\`, \`description\`, \`role\`, \`spellString\`, \`tabType\`, \`TabIndex\`) VALUES (22, 128, 32767, 'Arcane', 1459, 'SpecBG/mage-arcane', 'Manipulates asdraw Arcane magic, destroying enemies with overwhelming power.\r\n\r\nPreferred Weapon, Staff, Wand, Dagger, Sword\r\nPrimary Stat, Intellect', '1', '1459, 116', 0, 96);
            INSERT INTO \`forge_talent_tabs\` (\`id\`, \`classMask\`, \`raceMask\`, \`name\`, \`spellIcon\`, \`background\`, \`description\`, \`role\`, \`spellString\`, \`tabType\`, \`TabIndex\`) VALUES (25, 256, 32767, 'Affliction', 47541, 'SpecBG/warlock-affliction', 'A master of shadow magic who specializes in drains and damage-over-time spells.\r\n\r\nPreferred Weapons: Staff, Wand, Dagger, Sword\r\nPrimary Stat: Intellect', '1', '47813, 47857, 47855', 0, 96);
            INSERT INTO \`forge_talent_tabs\` (\`id\`, \`classMask\`, \`raceMask\`, \`name\`, \`spellIcon\`, \`background\`, \`description\`, \`role\`, \`spellString\`, \`tabType\`, \`TabIndex\`) VALUES (26, 256, 32767, 'Demonology', 40506, 'SpecBG/warlock-demonology', 'A commander of demons who twists the souls of their army into devastating power.\r\n\r\nPreferred Weapons: Staff, Wand, Dagger, Sword\r\nPrimary Stat: Intellect', '1', '688, 712, 697', 0, 97);
            INSERT INTO \`forge_talent_tabs\` (\`id\`, \`classMask\`, \`raceMask\`, \`name\`, \`spellIcon\`, \`background\`, \`description\`, \`role\`, \`spellString\`, \`tabType\`, \`TabIndex\`) VALUES (27, 256, 32767, 'Destruction', 5740, 'SpecBG/warlock-destruction', 'A master of chaos who calls down fire to burn and demolish enemies.\r\n\r\nPreferred Weapons: Staff, Wand, Dagger, Sword\r\nPrimary Stat: Intellect', '1', '47811, 47820, 47838', 0, 98);
            INSERT INTO \`forge_talent_tabs\` (\`id\`, \`classMask\`, \`raceMask\`, \`name\`, \`spellIcon\`, \`background\`, \`description\`, \`role\`, \`spellString\`, \`tabType\`, \`TabIndex\`) VALUES (30, 1024, 32767, 'Restoration', 5185, 'SpecBG/druid-restoration', 'Channels powerful Nature magic to regenerate and revitalize allies.\r\n\r\nPreferred Weapon: Staff, Dagger, Mace\r\nPrimary Stat: Intellect', '2', '33891, 740, 48378', 0, 98);
            INSERT INTO \`forge_talent_tabs\` (\`id\`, \`classMask\`, \`raceMask\`, \`name\`, \`spellIcon\`, \`background\`, \`description\`, \`role\`, \`spellString\`, \`tabType\`, \`TabIndex\`) VALUES (31, 1024, 32767, 'Guardian', 5487, 'SpecBG/druid-guardian', 'Takes on the form of a mighty bear to absorb damage and protect allies.\r\n\r\nPreferred Weapons: Staff, Polearm\r\nPrimary Stat: Agility', '3', '5487, 61336, 5209', 0, 99);
            INSERT INTO \`forge_talent_tabs\` (\`id\`, \`classMask\`, \`raceMask\`, \`name\`, \`spellIcon\`, \`background\`, \`description\`, \`role\`, \`spellString\`, \`tabType\`, \`TabIndex\`) VALUES (28, 1024, 32767, 'Balance', 20687, 'SpecBG/druid-balance', 'Can shapeshift into a powerful Moonkin, balacing the power of Arcane and Nature magic to destroy enemies.\r\n\r\nPreferred Weapons: Staff, Dagger, Mace\r\nPrimary Stat: Intellect', '1', '24858, 48463, 48465', 0, 96);
            INSERT INTO \`forge_talent_tabs\` (\`id\`, \`classMask\`, \`raceMask\`, \`name\`, \`spellIcon\`, \`background\`, \`description\`, \`role\`, \`spellString\`, \`tabType\`, \`TabIndex\`) VALUES (29, 1024, 32767, 'Feral', 768, 'SpecBG/druid-feral', 'Takes on the form of a great cat to deal damage with bleeds and bites.\r\n\r\nPreferred Weapons: Staff, Polearm\r\nPrimary Stat: Agility', '1', '768, 49802, 5215', 0, 97);
            INSERT INTO \`forge_talent_tabs\` (\`id\`, \`classMask\`, \`raceMask\`, \`name\`, \`spellIcon\`, \`background\`, \`description\`, \`role\`, \`spellString\`, \`tabType\`, \`TabIndex\`) VALUES (51, 1, 32767, 'Warrior', 9347, '""', 'Warrior', '0', '0', 7, 95);
            INSERT INTO \`forge_talent_tabs\` (\`id\`, \`classMask\`, \`raceMask\`, \`name\`, \`spellIcon\`, \`background\`, \`description\`, \`role\`, \`spellString\`, \`tabType\`, \`TabIndex\`) VALUES (52, 2, 32767, 'Paladin', 66112, '""', 'Paladin', '0', '0', 7, 95);
            INSERT INTO \`forge_talent_tabs\` (\`id\`, \`classMask\`, \`raceMask\`, \`name\`, \`spellIcon\`, \`background\`, \`description\`, \`role\`, \`spellString\`, \`tabType\`, \`TabIndex\`) VALUES (53, 4, 32767, 'Hunter', 58923, '""', 'Hunter', '0', '0', 7, 95);
            INSERT INTO \`forge_talent_tabs\` (\`id\`, \`classMask\`, \`raceMask\`, \`name\`, \`spellIcon\`, \`background\`, \`description\`, \`role\`, \`spellString\`, \`tabType\`, \`TabIndex\`) VALUES (54, 8, 32767, 'Rogue', 8623, '""', 'Rogue', '0', '0', 7, 95);
            INSERT INTO \`forge_talent_tabs\` (\`id\`, \`classMask\`, \`raceMask\`, \`name\`, \`spellIcon\`, \`background\`, \`description\`, \`role\`, \`spellString\`, \`tabType\`, \`TabIndex\`) VALUES (55, 16, 32767, 'Priest', 47788, '""', 'Priest', '0', '0', 7, 95);
            INSERT INTO \`forge_talent_tabs\` (\`id\`, \`classMask\`, \`raceMask\`, \`name\`, \`spellIcon\`, \`background\`, \`description\`, \`role\`, \`spellString\`, \`tabType\`, \`TabIndex\`) VALUES (56, 32, 32767, 'Death Knight', 50689, '""', 'Death Knight', '0', '0', 7, 95);
            INSERT INTO \`forge_talent_tabs\` (\`id\`, \`classMask\`, \`raceMask\`, \`name\`, \`spellIcon\`, \`background\`, \`description\`, \`role\`, \`spellString\`, \`tabType\`, \`TabIndex\`) VALUES (57, 64, 32767, 'Shaman', 54843, '""', 'Shaman', '0', '0', 7, 95);
            INSERT INTO \`forge_talent_tabs\` (\`id\`, \`classMask\`, \`raceMask\`, \`name\`, \`spellIcon\`, \`background\`, \`description\`, \`role\`, \`spellString\`, \`tabType\`, \`TabIndex\`) VALUES (58, 128, 32767, 'Mage', 42833, '""', 'Mage', '0', '0', 7, 95);
            INSERT INTO \`forge_talent_tabs\` (\`id\`, \`classMask\`, \`raceMask\`, \`name\`, \`spellIcon\`, \`background\`, \`description\`, \`role\`, \`spellString\`, \`tabType\`, \`TabIndex\`) VALUES (59, 256, 32767, 'Warlock', 47541, '""', 'Warlock', '0', '0', 7, 95);
            INSERT INTO \`forge_talent_tabs\` (\`id\`, \`classMask\`, \`raceMask\`, \`name\`, \`spellIcon\`, \`background\`, \`description\`, \`role\`, \`spellString\`, \`tabType\`, \`TabIndex\`) VALUES (61, 1024, 32767, 'Druid', 5185, '""', 'Druid', '0', '0', 7, 95);
            INSERT INTO \`forge_talent_tabs\` (\`id\`, \`classMask\`, \`raceMask\`, \`name\`, \`spellIcon\`, \`background\`, \`description\`, \`role\`, \`spellString\`, \`tabType\`, \`TabIndex\`) VALUES (60, 512, 32767, 'Demon Hunter', 5185, '""', 'Demon Hunter', '0', '0', 7, 95);
            INSERT INTO \`forge_talent_tabs\` (\`id\`, \`classMask\`, \`raceMask\`, \`name\`, \`spellIcon\`, \`background\`, \`description\`, \`role\`, \`spellString\`, \`tabType\`, \`TabIndex\`) VALUES (62, 2048, 32767, 'Monk', 5185, '""', 'Monk', '0', '0', 7, 95);
            INSERT INTO \`forge_talent_tabs\` (\`id\`, \`classMask\`, \`raceMask\`, \`name\`, \`spellIcon\`, \`background\`, \`description\`, \`role\`, \`spellString\`, \`tabType\`, \`TabIndex\`) VALUES (63, 4096, 32767, 'Bard', 5185, '""', 'Bard', '0', '0', 7, 95);
            INSERT INTO \`forge_talent_tabs\` (\`id\`, \`classMask\`, \`raceMask\`, \`name\`, \`spellIcon\`, \`background\`, \`description\`, \`role\`, \`spellString\`, \`tabType\`, \`TabIndex\`) VALUES (64, 8192, 32767, 'Tinker', 5185, '""', 'Tinker', '0', '0', 7, 95);

        DROP TABLE IF EXISTS \`forge_talents\`;
        CREATE TABLE IF NOT EXISTS \`forge_talents\` (
            \`spellid\` MEDIUMINT UNSIGNED NOT NULL,
            \`talentTabId\` INT UNSIGNED NOT NULL,
            \`columnIndex\` INT UNSIGNED NOT NULL,
            \`rowIndex\` INT UNSIGNED NOT NULL,
            \`rankCost\` TINYINT UNSIGNED NOT NULL,
            \`minLevel\` TINYINT UNSIGNED NOT NULL,
            \`talentType\` TINYINT UNSIGNED NOT NULL,
            \`numberRanks\` TINYINT UNSIGNED NOT NULL,
            \`preReqType\` TINYINT UNSIGNED NOT NULL,
            \`tabPointReq\` INT NOT null default 5,
            \`nodeType\` TINYINT NOT null default 0,
            \`Starter\` TINYINT NOT NULL DEFAULT 0,
            PRIMARY KEY (\`spellid\`, \`talentTabId\`, \`columnIndex\`, \`rowIndex\`),
            UNIQUE  KEY \`UniqueKey\` (\`talentTabId\`, \`columnIndex\`, \`rowIndex\`));

        DROP TABLE IF EXISTS \`conditional_starter_data\`; 
        CREATE TABLE IF NOT EXISTS \`conditional_starter_data\` (
            \`Class\` MEDIUMINT UNSIGNED NOT NULL,
            \`SpellId\` INT UNSIGNED NOT NULL,
            \`SpecId\` INT UNSIGNED NOT NULL,
            PRIMARY KEY (\`Class\`, \`SpellId\`, \`SpecId\`));
        INSERT INTO conditional_starter_data (Class, SpellId, SpecId) VALUES(1, 0, 0);
        
        DROP TABLE IF EXISTS \`forge_talent_ranks\`;
        CREATE TABLE IF NOT EXISTS \`forge_talent_ranks\` (
            \`talentSpellId\` MEDIUMINT UNSIGNED NOT NULL,
            \`talentTabId\` INT UNSIGNED NOT NULL,
            \`rank\` INT UNSIGNED NOT NULL,
            \`spellId\` MEDIUMINT UNSIGNED NULL,
            PRIMARY KEY (\`talentSpellId\`, \`talentTabId\`, \`rank\`));
            
        DROP TABLE IF EXISTS \`forge_talent_prereq\`;
        CREATE TABLE IF NOT EXISTS \`forge_talent_prereq\` (
            \`spellid\` MEDIUMINT UNSIGNED NOT NULL,
            \`talentTabId\` INT UNSIGNED NOT NULL,
            \`reqTalent\` MEDIUMINT UNSIGNED NOT NULL,
            \`reqTalentTabId\` INT UNSIGNED NOT NULL,
            \`reqRank\` INT UNSIGNED NOT NULL,
            PRIMARY KEY (\`spellid\`, \`talentTabId\`, \`reqTalent\`));
        
        DROP TABLE IF EXISTS \`forge_talent_exclusive\`;
        CREATE TABLE IF NOT EXISTS \`forge_talent_exclusive\` (
            \`talentSpellId\` MEDIUMINT UNSIGNED NOT NULL,
            \`talentTabId\` INT UNSIGNED NOT NULL,
            \`exlusiveSpellId\` MEDIUMINT UNSIGNED NOT NULL,
            PRIMARY KEY (\`talentSpellId\`, \`talentTabId\`, \`exlusiveSpellId\`));
        
        DROP TABLE IF EXISTS \`forge_talent_unlearn\`;
        CREATE TABLE IF NOT EXISTS \`forge_talent_unlearn\` (
            \`talentTabId\` INT UNSIGNED NOT NULL,
            \`talentSpellId\` MEDIUMINT UNSIGNED NOT NULL,
            \`unlearnSpell\` MEDIUMINT UNSIGNED NOT NULL,
            PRIMARY KEY (\`talentTabId\`, \`talentSpellId\`, \`unlearnSpell\`));
        
        DROP TABLE IF EXISTS \`forge_prestige_ignored_spells\`;
        CREATE TABLE IF NOT EXISTS \`forge_prestige_ignored_spells\` (
            \`spellid\` INT UNSIGNED NOT NULL,
            PRIMARY KEY (\`spellid\`));
        
        DROP TABLE IF EXISTS \`forge_player_spell_scale\`;
        CREATE TABLE IF NOT EXISTS \`forge_player_spell_scale\` (
            \`ID\` INT NOT NULL DEFAULT '0',
            \`Data\` FLOAT NOT NULL DEFAULT '0',
            PRIMARY KEY (\`ID\`)) ENGINE=MyISAM
            DEFAULT CHARSET=utf8; 
            
        DROP TABLE IF EXISTS \`forge_talent_choice_nodes\`;
        CREATE TABLE IF NOT EXISTS \`forge_talent_choice_nodes\` (
            \`choiceNodeId\` MEDIUMINT UNSIGNED NOT NULL,
            \`talentTabId\` INT UNSIGNED NOT NULL,
            \`choiceIndex\` int unsigned not null,
            \`choiceSpellId\` MEDIUMINT UNSIGNED NOT NULL,
            PRIMARY KEY (\`choiceNodeId\`, \`talentTabId\`, \`choiceSpellId\`));
        
        DROP TABLE IF EXISTS \`character_spec_autolearn\`;
        CREATE TABLE IF NOT EXISTS \`character_spec_autolearn\` (
            \`class\` INT(10) UNSIGNED NOT NULL,
            \`spec\` INT(10) UNSIGNED NOT NULL,
            \`level\` INT(10) UNSIGNED NOT NULL,
            \`spell\` INT(32) UNSIGNED NOT NULL,
            PRIMARY KEY (\`class\`, \`spec\`,\`spell\`)
        ) COLLATE='utf8_general_ci' ENGINE=InnoDB;
        
        DROP TABLE IF EXISTS \`forge_spell_charge\`;
        CREATE TABLE IF NOT EXISTS \`forge_spell_charge\` (
            \`spell\` INT(10) UNSIGNED NOT NULL,
            \`timer\` INT(10) UNSIGNED NOT NULL,
            \`item\` INT(10) UNSIGNED NOT NULL,
            \`max\` INT(10) UNSIGNED NOT NULL,
            PRIMARY KEY (\`spell\`)
        ) COLLATE='utf8_general_ci' ENGINE=InnoDB;
        
        DROP TABLE IF EXISTS \`forge_talent_spell_flagged_unlearn\`;
        CREATE TABLE IF NOT EXISTS \`forge_talent_spell_flagged_unlearn\` (
            \`guid\` int unsigned NOT NULL,
            \`spell\` int unsigned NOT NULL,
            PRIMARY KEY (\`guid\`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
        
        DROP TABLE IF EXISTS \`forge_talent_learn_additional_spell\`;
        CREATE TABLE IF NOT EXISTS \`forge_talent_learn_additional_spell\` (
            \`spell\` int unsigned NOT NULL,
            \`addedSpell\` int unsigned NOT NULL,
            PRIMARY KEY (\`spell\`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
        
        DROP TABLE IF EXISTS \`forge_talent_exclusive\`;
        CREATE TABLE IF NOT EXISTS \`custom_druid_barbershop\` (
            \`guid\` mediumint unsigned NOT NULL DEFAULT '0',
            \`type\` char(200) NOT NULL DEFAULT '',
            \`name\` char(200) NOT NULL DEFAULT '',
            \`display\` mediumint unsigned NOT NULL DEFAULT '0',
            \`npc\` mediumint unsigned NOT NULL DEFAULT '0',
            \`racemask\` mediumint unsigned NOT NULL DEFAULT '0',
            \`SpellId\` mediumint unsigned NOT NULL DEFAULT '0',
            \`ReqSpellId\` mediumint NOT NULL DEFAULT '0',
            \`path\` char(200) NOT NULL DEFAULT '',
            \`ReqItemID\` mediumint NOT NULL DEFAULT '0',
            \`ReqItemCant\` mediumint NOT NULL DEFAULT '0',
            \`Comentario\` char(200) NOT NULL DEFAULT '',
            PRIMARY KEY (\`guid\`,\`display\`,\`SpellId\`)
        ) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;
    `)
}
