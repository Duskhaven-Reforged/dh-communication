import { std } from "wow/wotlk";
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
    INSERT INTO \`forge_talent_tabs\` (\`id\`, \`classMask\`, \`raceMask\`, \`name\`, \`spellIcon\`, \`background\`, \`description\`, \`role\`, \`spellString\`, \`tabType\`, \`TabIndex\`) VALUES (33, 1, 32767, 'Warrior', 9347, '""', 'Warrior', '0', '0', 7, 95);
    INSERT INTO \`forge_talent_tabs\` (\`id\`, \`classMask\`, \`raceMask\`, \`name\`, \`spellIcon\`, \`background\`, \`description\`, \`role\`, \`spellString\`, \`tabType\`, \`TabIndex\`) VALUES (4, 2, 32767, 'Holy', 66112, 'SpecBG/paladin-holy', 'Invokes the power of the Light to heal and protect allies and vaquish evil from the darkest corners of the world.\r\n\r\nPreferred Weapons: Sword, Mace, and Shield\r\nPrimary Stat: Intellect', '2', '20473, 53563, 48782', 0, 96);
    INSERT INTO \`forge_talent_tabs\` (\`id\`, \`classMask\`, \`raceMask\`, \`name\`, \`spellIcon\`, \`background\`, \`description\`, \`role\`, \`spellString\`, \`tabType\`, \`TabIndex\`) VALUES (5, 2, 32767, 'Protection', 53709, 'SpecBG/paladin-protection', 'Uses Holy magic to shield themselves and defend allies from attackers.\r\n\r\nPreferred Weapons: Sword, Mace, Axe, and Shield\r\nPrimary Stat: Strength', '3', '31935, 31850, 642', 0, 97);
    INSERT INTO \`forge_talent_tabs\` (\`id\`, \`classMask\`, \`raceMask\`, \`name\`, \`spellIcon\`, \`background\`, \`description\`, \`role\`, \`spellString\`, \`tabType\`, \`TabIndex\`) VALUES (6, 2, 32767, 'Retribution', 54043, 'SpecBG/paladin-retribution', 'A righteous crusader who judges and punishes opponents with weapons and Holy magic.\r\n\r\nPreferred Weapons: Two-Handed Sword, Mace, Axe\r\nPrimary Stat: Strength', '1', '53407, 35395, 31884', 0, 98);
    INSERT INTO \`forge_talent_tabs\` (\`id\`, \`classMask\`, \`raceMask\`, \`name\`, \`spellIcon\`, \`background\`, \`description\`, \`role\`, \`spellString\`, \`tabType\`, \`TabIndex\`) VALUES (34, 2, 32767, 'Paladin', 66112, '""', 'Paladin', '0', '0', 7, 95);
    INSERT INTO \`forge_talent_tabs\` (\`id\`, \`classMask\`, \`raceMask\`, \`name\`, \`spellIcon\`, \`background\`, \`description\`, \`role\`, \`spellString\`, \`tabType\`, \`TabIndex\`) VALUES (7, 4, 32767, 'Beast Mastery', 58923, 'SpecBG/hunter-beastmastery', 'A master of the wild who can tame a wide variety of beasts to assist them in combat.\r\n\r\nPreferred Weapon: Bow, Crossbow, Gun\r\nPrimary Stat: Agility', '1', '34026, 19574, 1515', 0, 96);
    INSERT INTO \`forge_talent_tabs\` (\`id\`, \`classMask\`, \`raceMask\`, \`name\`, \`spellIcon\`, \`background\`, \`description\`, \`role\`, \`spellString\`, \`tabType\`, \`TabIndex\`) VALUES (8, 4, 32767, 'Marksmanship', 58923, 'SpecBG/hunter-marksmanship', 'A master sharpshooter who excels in bringing down enemies from afar.\r\n\r\nPreferred Weapon: Bow, Crossbow, Gun\r\nPrimary Stat: Agility', '1', '19434, 56641, 3045', 0, 97);
    INSERT INTO \`forge_talent_tabs\` (\`id\`, \`classMask\`, \`raceMask\`, \`name\`, \`spellIcon\`, \`background\`, \`description\`, \`role\`, \`spellString\`, \`tabType\`, \`TabIndex\`) VALUES (9, 4, 32767, 'Survival', 53301, 'SpecBG/hunter-survival', 'An adaptive ranger who favors using explosives, animal venom, and coordinated attacks with their bonded beast.\r\n\r\nPreferred Weapon: Polearm, Staff\r\nPrimary Stat: Agility', '1', '13813, 5384, 2973', 0, 98);
    INSERT INTO \`forge_talent_tabs\` (\`id\`, \`classMask\`, \`raceMask\`, \`name\`, \`spellIcon\`, \`background\`, \`description\`, \`role\`, \`spellString\`, \`tabType\`, \`TabIndex\`) VALUES (35, 4, 32767, 'Hunter', 58923, '""', 'Hunter', '0', '0', 7, 95);
    INSERT INTO \`forge_talent_tabs\` (\`id\`, \`classMask\`, \`raceMask\`, \`name\`, \`spellIcon\`, \`background\`, \`description\`, \`role\`, \`spellString\`, \`tabType\`, \`TabIndex\`) VALUES (10, 8, 32767, 'Assassination', 8623, 'SpecBG/rogue-assassination', 'A deadly master of poisons who dispatches victims with vicious dagger strikes.\r\n\r\nPreferred Weapon: Daggers\r\nPrimary Stat: Agility', '1', '48691, 1833, 57993', 0, 98);
    INSERT INTO \`forge_talent_tabs\` (\`id\`, \`classMask\`, \`raceMask\`, \`name\`, \`spellIcon\`, \`background\`, \`description\`, \`role\`, \`spellString\`, \`tabType\`, \`TabIndex\`) VALUES (11, 8, 32767, 'Combat', 53, 'SpecBG/rogue-combat', 'A ruthless fugitive who uses agility and guile to stand toe-to-toe with enemies.\r\n\r\nPreferred Weapon: Axes, Maces, Swords, Fist Weapons\r\nPrimary Stat: Agility', '1', '48657, 13877, 11305', 0, 97);
    INSERT INTO \`forge_talent_tabs\` (\`id\`, \`classMask\`, \`raceMask\`, \`name\`, \`spellIcon\`, \`background\`, \`description\`, \`role\`, \`spellString\`, \`tabType\`, \`TabIndex\`) VALUES (12, 8, 32767, 'Subtlety', 1784, 'SpecBG/rogue-subtlety', 'A dark stalker who leaps from the shadows to ambush their unsuspecting prey.\r\n\r\nPreferred Weapons: Daggers\r\nPrimary Stat: Agility', '1', '31224, 26889, 2094', 0, 96);
    INSERT INTO \`forge_talent_tabs\` (\`id\`, \`classMask\`, \`raceMask\`, \`name\`, \`spellIcon\`, \`background\`, \`description\`, \`role\`, \`spellString\`, \`tabType\`, \`TabIndex\`) VALUES (36, 8, 32767, 'Rogue', 8623, '""', 'Rogue', '0', '0', 7, 95);
    INSERT INTO \`forge_talent_tabs\` (\`id\`, \`classMask\`, \`raceMask\`, \`name\`, \`spellIcon\`, \`background\`, \`description\`, \`role\`, \`spellString\`, \`tabType\`, \`TabIndex\`) VALUES (13, 16, 32767, 'Holy', 47788, 'SpecBG/priest-holy', 'A versatile healer who can reverse damage on individuals or groups and even heal from beyond the grave.\r\n\r\nPreferred Weapons: Staff, Wand, Dagger, Mace\r\nPrimary Stat: Intellect', '2', '48113, 48153, 48076', 0, 97);
    INSERT INTO \`forge_talent_tabs\` (\`id\`, \`classMask\`, \`raceMask\`, \`name\`, \`spellIcon\`, \`background\`, \`description\`, \`role\`, \`spellString\`, \`tabType\`, \`TabIndex\`) VALUES (14, 16, 32767, 'Discipline', 9800, 'SpecBG/priest-discipline', 'Uses magic to shield allies from taking damage as well as heal their wounds.\r\n\r\nPreferred Weapons: Staff, Wand, Dagger, Mace\r\nPrimary Stat: Intellect', '2', '53000, 48066, 8129', 0, 96);
    INSERT INTO \`forge_talent_tabs\` (\`id\`, \`classMask\`, \`raceMask\`, \`name\`, \`spellIcon\`, \`background\`, \`description\`, \`role\`, \`spellString\`, \`tabType\`, \`TabIndex\`) VALUES (15, 16, 32767, 'Shadow', 589, 'SpecBG/priest-shadow', 'Uses sinister Shadow magic and terrifying Void magic to eradicate enemies.\r\n\r\nPreferred Weapons: Staff, Wand, Dagger, Mace\r\nPrimary Stat: Intellect', '1', '15473, 605, 48300', 0, 98);
    INSERT INTO \`forge_talent_tabs\` (\`id\`, \`classMask\`, \`raceMask\`, \`name\`, \`spellIcon\`, \`background\`, \`description\`, \`role\`, \`spellString\`, \`tabType\`, \`TabIndex\`) VALUES (37, 16, 32767, 'Priest', 47788, '""', 'Priest', '0', '0', 7, 95);
    INSERT INTO \`forge_talent_tabs\` (\`id\`, \`classMask\`, \`raceMask\`, \`name\`, \`spellIcon\`, \`background\`, \`description\`, \`role\`, \`spellString\`, \`tabType\`, \`TabIndex\`) VALUES (16, 32, 32767, 'Blood', 50689, 'SpecBG/deathknight-blood', 'A dark guardian who manipulates and corrupts life energy to sustain themselves in the face of an enemy onslaught.\r\n\r\nPreferred Weapons: Two-Handed Axe, Mace, Sword\r\nPrimary Stat: Strength', '3', '49998, 49028, 48266', 0, 96);
    INSERT INTO \`forge_talent_tabs\` (\`id\`, \`classMask\`, \`raceMask\`, \`name\`, \`spellIcon\`, \`background\`, \`description\`, \`role\`, \`spellString\`, \`tabType\`, \`TabIndex\`) VALUES (17, 32, 32767, 'Frost', 50384, 'SpecBG/deathknight-frost', 'An icy harbinger of doom, channeling runic power and delivering vicious weapon strikes.\r\n\r\nPreferred Weapons: Dual Axes, Maces, Sword\r\nPrimary Stat: Strength', '1', '49020, 51271, 48263', 0, 97);
    INSERT INTO \`forge_talent_tabs\` (\`id\`, \`classMask\`, \`raceMask\`, \`name\`, \`spellIcon\`, \`background\`, \`description\`, \`role\`, \`spellString\`, \`tabType\`, \`TabIndex\`) VALUES (18, 32, 32767, 'Unholy', 50391, 'SpecBG/deathknight-unholy', 'A master of death and decay, spreading infection and controlling undead minions to do their bidding.\r\n\r\nPreferred Weapons: Two-Handed Axe, Mace, Sword\r\nPrimary Stat: Strength', '1', '46584, 49938, 48265', 0, 98);
    INSERT INTO \`forge_talent_tabs\` (\`id\`, \`classMask\`, \`raceMask\`, \`name\`, \`spellIcon\`, \`background\`, \`description\`, \`role\`, \`spellString\`, \`tabType\`, \`TabIndex\`) VALUES (38, 32, 32767, 'Death Knight', 50689, '""', 'Death Knight', '0', '0', 7, 95);
    INSERT INTO \`forge_talent_tabs\` (\`id\`, \`classMask\`, \`raceMask\`, \`name\`, \`spellIcon\`, \`background\`, \`description\`, \`role\`, \`spellString\`, \`tabType\`, \`TabIndex\`) VALUES (21, 64, 32767, 'Restoration', 41114, 'SpecBG/shaman-restoration', 'A healer who calls upon ancestral spirits and the cleansing power of water to mend allies wounds.\r\n\r\nPreferred Weapon: Mace, Dagger, and Shield\r\nPrimary Stat: Intellect', '2', '1064, 57960, 49277', 0, 98);
    INSERT INTO \`forge_talent_tabs\` (\`id\`, \`classMask\`, \`raceMask\`, \`name\`, \`spellIcon\`, \`background\`, \`description\`, \`role\`, \`spellString\`, \`tabType\`, \`TabIndex\`) VALUES (32, 64, 32767, 'Stone Warden', 8143, 'SpecBG/shaman-stonewarden', 'Soon', '3', '0', 0, 99);
    INSERT INTO \`forge_talent_tabs\` (\`id\`, \`classMask\`, \`raceMask\`, \`name\`, \`spellIcon\`, \`background\`, \`description\`, \`role\`, \`spellString\`, \`tabType\`, \`TabIndex\`) VALUES (19, 64, 32767, 'Elemental', 54843, 'SpecBG/shaman-elemental', 'A spellcaster who harnesses the destructive forces of nature and the elements.', '1', '49271, 60043, 2894', 0, 96);
    INSERT INTO \`forge_talent_tabs\` (\`id\`, \`classMask\`, \`raceMask\`, \`name\`, \`spellIcon\`, \`background\`, \`description\`, \`role\`, \`spellString\`, \`tabType\`, \`TabIndex\`) VALUES (20, 64, 32767, 'Enhancement', 51521, 'SpecBG/shaman-enhancement', 'A totemic warrior who strikes foes with weapons imbued with elemental power.\r\n\r\nPreferred Weapons: Dual Axes, Maces, Fist Weapons\r\nPrimary Stat: Agility', '1', '17364, 51533, 32182', 0, 97);
    INSERT INTO \`forge_talent_tabs\` (\`id\`, \`classMask\`, \`raceMask\`, \`name\`, \`spellIcon\`, \`background\`, \`description\`, \`role\`, \`spellString\`, \`tabType\`, \`TabIndex\`) VALUES (39, 64, 32767, 'Shaman', 54843, '""', 'Shaman', '0', '0', 7, 95);
    INSERT INTO \`forge_talent_tabs\` (\`id\`, \`classMask\`, \`raceMask\`, \`name\`, \`spellIcon\`, \`background\`, \`description\`, \`role\`, \`spellString\`, \`tabType\`, \`TabIndex\`) VALUES (23, 128, 32767, 'Fire', 42833, 'SpecBG/mage-fire', 'Focuses the pure essence of Fire magic, assaulting enemies with combustive flames.\r\n\r\nPreferred Weapon, Staff, Wand, Dagger, Sword\r\nPrimary Stat, Intellect', '1', '42833', 0, 97);
    INSERT INTO \`forge_talent_tabs\` (\`id\`, \`classMask\`, \`raceMask\`, \`name\`, \`spellIcon\`, \`background\`, \`description\`, \`role\`, \`spellString\`, \`tabType\`, \`TabIndex\`) VALUES (24, 128, 32767, 'Frost', 116, 'SpecBG/mage-frost', 'Freezes enemies in their tracks and shatters them with Frost magic.\r\n\r\nPreferred Weapon, Staff, Wand, Dagger, Sword\r\nPrimary Stat, Intellect', '1', '116', 0, 98);
    INSERT INTO \`forge_talent_tabs\` (\`id\`, \`classMask\`, \`raceMask\`, \`name\`, \`spellIcon\`, \`background\`, \`description\`, \`role\`, \`spellString\`, \`tabType\`, \`TabIndex\`) VALUES (22, 128, 32767, 'Arcane', 1459, 'SpecBG/mage-arcane', 'Manipulates asdraw Arcane magic, destroying enemies with overwhelming power.\r\n\r\nPreferred Weapon, Staff, Wand, Dagger, Sword\r\nPrimary Stat, Intellect', '1', '1459, 116', 0, 96);
    INSERT INTO \`forge_talent_tabs\` (\`id\`, \`classMask\`, \`raceMask\`, \`name\`, \`spellIcon\`, \`background\`, \`description\`, \`role\`, \`spellString\`, \`tabType\`, \`TabIndex\`) VALUES (40, 128, 32767, 'Mage', 42833, '""', 'Mage', '0', '0', 7, 95);
    INSERT INTO \`forge_talent_tabs\` (\`id\`, \`classMask\`, \`raceMask\`, \`name\`, \`spellIcon\`, \`background\`, \`description\`, \`role\`, \`spellString\`, \`tabType\`, \`TabIndex\`) VALUES (25, 256, 32767, 'Affliction', 47541, 'SpecBG/warlock-affliction', 'A master of shadow magic who specializes in drains and damage-over-time spells.\r\n\r\nPreferred Weapons: Staff, Wand, Dagger, Sword\r\nPrimary Stat: Intellect', '1', '47813, 47857, 47855', 0, 96);
    INSERT INTO \`forge_talent_tabs\` (\`id\`, \`classMask\`, \`raceMask\`, \`name\`, \`spellIcon\`, \`background\`, \`description\`, \`role\`, \`spellString\`, \`tabType\`, \`TabIndex\`) VALUES (26, 256, 32767, 'Demonology', 40506, 'SpecBG/warlock-demonology', 'A commander of demons who twists the souls of their army into devastating power.\r\n\r\nPreferred Weapons: Staff, Wand, Dagger, Sword\r\nPrimary Stat: Intellect', '1', '688, 712, 697', 0, 97);
    INSERT INTO \`forge_talent_tabs\` (\`id\`, \`classMask\`, \`raceMask\`, \`name\`, \`spellIcon\`, \`background\`, \`description\`, \`role\`, \`spellString\`, \`tabType\`, \`TabIndex\`) VALUES (27, 256, 32767, 'Destruction', 5740, 'SpecBG/warlock-destruction', 'A master of chaos who calls down fire to burn and demolish enemies.\r\n\r\nPreferred Weapons: Staff, Wand, Dagger, Sword\r\nPrimary Stat: Intellect', '1', '47811, 47820, 47838', 0, 98);
    INSERT INTO \`forge_talent_tabs\` (\`id\`, \`classMask\`, \`raceMask\`, \`name\`, \`spellIcon\`, \`background\`, \`description\`, \`role\`, \`spellString\`, \`tabType\`, \`TabIndex\`) VALUES (41, 256, 32767, 'Warlock', 47541, '""', 'Warlock', '0', '0', 7, 95);
    INSERT INTO \`forge_talent_tabs\` (\`id\`, \`classMask\`, \`raceMask\`, \`name\`, \`spellIcon\`, \`background\`, \`description\`, \`role\`, \`spellString\`, \`tabType\`, \`TabIndex\`) VALUES (30, 1024, 32767, 'Restoration', 5185, 'SpecBG/druid-restoration', 'Channels powerful Nature magic to regenerate and revitalize allies.\r\n\r\nPreferred Weapon: Staff, Dagger, Mace\r\nPrimary Stat: Intellect', '2', '33891, 740, 48378', 0, 98);
    INSERT INTO \`forge_talent_tabs\` (\`id\`, \`classMask\`, \`raceMask\`, \`name\`, \`spellIcon\`, \`background\`, \`description\`, \`role\`, \`spellString\`, \`tabType\`, \`TabIndex\`) VALUES (31, 1024, 32767, 'Guardian', 5487, 'SpecBG/druid-guardian', 'Takes on the form of a mighty bear to absorb damage and protect allies.\r\n\r\nPreferred Weapons: Staff, Polearm\r\nPrimary Stat: Agility', '3', '5487, 61336, 5209', 0, 99);
    INSERT INTO \`forge_talent_tabs\` (\`id\`, \`classMask\`, \`raceMask\`, \`name\`, \`spellIcon\`, \`background\`, \`description\`, \`role\`, \`spellString\`, \`tabType\`, \`TabIndex\`) VALUES (28, 1024, 32767, 'Balance', 20687, 'SpecBG/druid-balance', 'Can shapeshift into a powerful Moonkin, balacing the power of Arcane and Nature magic to destroy enemies.\r\n\r\nPreferred Weapons: Staff, Dagger, Mace\r\nPrimary Stat: Intellect', '1', '24858, 48463, 48465', 0, 96);
    INSERT INTO \`forge_talent_tabs\` (\`id\`, \`classMask\`, \`raceMask\`, \`name\`, \`spellIcon\`, \`background\`, \`description\`, \`role\`, \`spellString\`, \`tabType\`, \`TabIndex\`) VALUES (29, 1024, 32767, 'Feral', 768, 'SpecBG/druid-feral', 'Takes on the form of a great cat to deal damage with bleeds and bites.\r\n\r\nPreferred Weapons: Staff, Polearm\r\nPrimary Stat: Agility', '1', '768, 49802, 5215', 0, 97);
    INSERT INTO \`forge_talent_tabs\` (\`id\`, \`classMask\`, \`raceMask\`, \`name\`, \`spellIcon\`, \`background\`, \`description\`, \`role\`, \`spellString\`, \`tabType\`, \`TabIndex\`) VALUES (42, 1024, 32767, 'Druid', 5185, '""', 'Druid', '0', '0', 7, 95);        

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
        \`nodeIndex\` INT NOT null,
        PRIMARY KEY (\`spellid\`, \`talentTabId\`, \`columnIndex\`, \`rowIndex\`),
        UNIQUE  KEY \`UniqueKey\` (\`talentTabId\`, \`columnIndex\`, \`rowIndex\`));
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(70752, 40, 7, 9, 1, 49, 7, 1, 1, 0, 0, 35);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(63457, 9, 6, 6, 1, 29, 0, 2, 1, 0, 0, 17);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(63158, 27, 6, 10, 1, 51, 0, 1, 1, 0, 0, 9);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(61216, 33, 6, 2, 1, 12, 7, 1, 1, 0, 0, 8);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(60103, 20, 7, 2, 1, 13, 0, 1, 1, 0, 2, 3);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(59741, 27, 5, 7, 1, 31, 0, 1, 1, 0, 0, 8);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(59172, 27, 4, 3, 1, 15, 0, 1, 1, 0, 1, 3);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(59088, 33, 8, 9, 1, 48, 7, 1, 1, 0, 0, 36);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(58435, 25, 4, 6, 1, 29, 0, 1, 1, 0, 0, 13);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(58425, 12, 4, 4, 1, 17, 0, 1, 1, 0, 0, 8);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(57499, 3, 2, 4, 1, 17, 0, 1, 1, 0, 0, 8);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(56636, 1, 4, 2, 1, 13, 0, 1, 1, 0, 0, 2);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(55360, 23, 7, 10, 1, 51, 0, 1, 1, 0, 1, 32);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(55342, 40, 6, 8, 1, 47, 7, 1, 1, 18, 1, 31);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(55339, 22, 7, 6, 1, 29, 0, 1, 1, 0, 0, 20);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(54787, 40, 7, 2, 1, 13, 7, 1, 1, 0, 0, 8);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(54734, 40, 4, 7, 1, 31, 7, 1, 1, 0, 0, 26);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(54659, 40, 3, 3, 1, 15, 7, 1, 1, 0, 0, 9);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(54490, 22, 4, 2, 1, 13, 0, 1, 1, 0, 0, 2);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(54354, 40, 3, 4, 1, 17, 7, 1, 1, 0, 0, 13);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(54038, 25, 8, 4, 1, 17, 0, 1, 1, 0, 0, 10);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(53754, 41, 2, 4, 1, 17, 7, 2, 1, 0, 0, 8);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(53648, 6, 7, 4, 1, 17, 0, 1, 1, 0, 0, 8);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(53601, 5, 7, 7, 1, 31, 0, 1, 1, 0, 1, 24);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(53595, 5, 5, 1, 1, 11, 0, 1, 1, 0, 1, 1);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(53590, 5, 4, 3, 1, 15, 0, 1, 1, 0, 0, 5);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(53385, 6, 5, 5, 1, 27, 0, 1, 1, 8, 1, 10);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(53375, 6, 3, 9, 1, 49, 0, 1, 1, 0, 0, 24);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(53292, 9, 5, 3, 1, 15, 0, 1, 1, 0, 0, 6);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(53234, 35, 5, 7, 1, 31, 7, 1, 1, 0, 0, 21);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(51690, 11, 2, 10, 1, 51, 0, 1, 1, 0, 1, 32);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(51662, 10, 6, 10, 1, 51, 0, 1, 1, 0, 1, 22);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(51632, 10, 6, 2, 1, 13, 0, 2, 1, 0, 0, 4);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(51625, 10, 4, 4, 1, 17, 0, 2, 1, 0, 0, 9);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(51514, 39, 5, 8, 1, 47, 7, 1, 1, 18, 1, 36);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(48181, 25, 4, 2, 1, 13, 0, 1, 1, 0, 0, 2);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(48018, 41, 7, 7, 1, 31, 7, 1, 1, 0, 1, 22);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(47897, 41, 5, 1, 1, 10, 7, 1, 1, 0, 1, 2);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(47788, 13, 6, 4, 1, 17, 0, 1, 1, 0, 1, 9);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(47498, 3, 4, 3, 1, 15, 0, 1, 1, 0, 2, 5);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(47488, 3, 5, 1, 1, 11, 0, 1, 1, 0, 1, 1);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(47294, 3, 7, 7, 1, 31, 0, 2, 1, 0, 0, 22);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(47270, 27, 6, 3, 1, 15, 0, 1, 1, 0, 0, 4);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(47260, 27, 5, 2, 1, 13, 0, 1, 1, 0, 0, 2);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(47223, 27, 8, 5, 1, 27, 0, 1, 1, 8, 0, 7);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(46968, 3, 5, 7, 1, 31, 0, 1, 1, 0, 2, 21);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(46952, 3, 3, 3, 1, 15, 0, 1, 1, 0, 0, 4);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(46924, 1, 5, 4, 1, 17, 0, 1, 1, 0, 1, 9);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(46917, 2, 5, 4, 1, 17, 0, 1, 1, 0, 2, 10);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(46865, 33, 6, 9, 1, 48, 7, 1, 1, 0, 0, 35);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(46854, 1, 8, 4, 1, 17, 0, 1, 1, 0, 0, 11);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(44549, 24, 6, 2, 1, 13, 0, 1, 1, 0, 0, 3);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(44472, 23, 5, 8, 1, 47, 0, 1, 1, 18, 0, 24);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(44399, 40, 2, 5, 1, 27, 7, 1, 1, 8, 0, 18);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(44396, 40, 5, 3, 1, 15, 7, 1, 1, 0, 0, 10);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(35691, 26, 6, 5, 1, 27, 0, 2, 1, 8, 0, 10);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(35397, 6, 7, 5, 1, 27, 0, 1, 1, 8, 0, 11);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(35030, 7, 3, 2, 1, 13, 0, 1, 1, 0, 0, 2);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(34692, 7, 5, 6, 1, 29, 0, 1, 1, 0, 2, 17);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(34433, 37, 6, 6, 1, 29, 7, 1, 1, 0, 1, 25);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(34428, 33, 5, 1, 1, 10, 7, 1, 1, 0, 1, 2);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(34296, 23, 6, 3, 1, 15, 0, 1, 1, 0, 0, 6);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(33757, 20, 5, 1, 1, 11, 0, 1, 1, 0, 1, 1);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(33150, 13, 6, 9, 1, 49, 0, 2, 1, 0, 0, 32);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(32699, 5, 5, 4, 1, 17, 0, 1, 1, 0, 1, 10);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(32477, 25, 3, 5, 1, 27, 0, 1, 1, 8, 0, 11);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(32375, 37, 5, 3, 1, 15, 7, 1, 1, 0, 1, 11);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(31852, 5, 5, 7, 1, 31, 0, 1, 1, 0, 0, 23);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(31848, 5, 7, 4, 1, 17, 0, 1, 1, 0, 0, 11);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(31845, 5, 8, 3, 1, 15, 0, 1, 1, 0, 0, 7);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(31679, 23, 4, 5, 1, 27, 0, 2, 1, 8, 0, 12);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(31669, 40, 7, 4, 1, 17, 7, 1, 1, 0, 0, 16);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(31583, 22, 3, 3, 1, 15, 0, 1, 1, 0, 0, 4);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(31572, 22, 7, 3, 1, 15, 0, 1, 1, 0, 0, 7);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(31230, 36, 6, 3, 1, 14, 7, 1, 1, 0, 0, 10);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(31226, 10, 4, 7, 1, 31, 0, 2, 1, 0, 0, 17);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(30885, 39, 3, 10, 1, 51, 7, 2, 1, 0, 0, 42);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(30335, 2, 5, 1, 1, 11, 0, 1, 1, 0, 1, 1);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(30326, 41, 6, 9, 1, 49, 7, 1, 1, 0, 0, 27);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(30299, 41, 8, 6, 1, 29, 7, 1, 1, 0, 0, 20);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(30146, 26, 7, 6, 1, 29, 0, 1, 1, 0, 1, 13);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(30143, 26, 4, 3, 1, 15, 0, 1, 1, 0, 0, 6);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(30108, 25, 5, 1, 1, 11, 0, 1, 1, 0, 1, 1);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(29836, 33, 2, 9, 1, 48, 7, 1, 1, 0, 0, 32);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(29834, 33, 6, 3, 1, 14, 7, 1, 1, 0, 0, 13);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(29776, 2, 2, 3, 1, 15, 0, 1, 1, 0, 0, 5);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(29759, 33, 5, 10, 1, 50, 7, 1, 1, 0, 0, 38);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(29724, 1, 8, 5, 1, 27, 0, 1, 1, 8, 0, 15);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(29598, 3, 6, 2, 1, 13, 0, 1, 1, 0, 0, 3);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(29593, 33, 7, 10, 1, 50, 7, 1, 1, 0, 0, 39);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(29444, 40, 3, 2, 1, 13, 7, 1, 1, 0, 0, 4);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(29440, 40, 6, 2, 1, 13, 7, 1, 1, 0, 0, 7);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(29076, 23, 7, 4, 1, 17, 0, 1, 1, 0, 0, 10);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(28593, 24, 6, 4, 1, 17, 0, 1, 1, 0, 0, 9);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(23588, 2, 7, 4, 1, 17, 0, 1, 1, 0, 0, 11);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(20928, 5, 6, 5, 1, 27, 0, 1, 1, 8, 0, 15);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(20711, 13, 8, 4, 1, 17, 0, 1, 1, 0, 0, 10);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(20505, 33, 4, 5, 1, 26, 7, 1, 1, 8, 0, 19);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(20468, 5, 6, 3, 1, 15, 0, 1, 1, 0, 0, 6);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(20164, 5, 3, 6, 1, 29, 0, 1, 1, 0, 1, 17);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(20131, 5, 5, 5, 1, 27, 0, 1, 1, 8, 1, 14);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(20053, 6, 3, 4, 1, 17, 0, 1, 1, 0, 0, 7);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(19503, 35, 8, 5, 1, 27, 7, 1, 1, 8, 1, 15);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(19412, 35, 4, 7, 1, 31, 7, 1, 1, 0, 0, 20);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(19370, 35, 3, 10, 1, 51, 7, 1, 1, 0, 0, 28);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(19028, 26, 5, 1, 1, 11, 0, 1, 1, 0, 1, 1);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(18769, 26, 8, 3, 1, 15, 0, 2, 1, 0, 0, 7);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(18767, 41, 4, 6, 1, 29, 7, 1, 1, 0, 0, 17);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(18744, 26, 5, 2, 1, 13, 0, 1, 1, 0, 0, 3);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(18709, 41, 6, 2, 1, 13, 7, 2, 1, 0, 0, 5);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(18708, 41, 7, 1, 1, 11, 7, 1, 1, 0, 1, 3);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(18704, 26, 7, 2, 1, 13, 0, 1, 1, 0, 0, 4);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(18288, 41, 4, 4, 1, 17, 7, 1, 1, 0, 0, 9);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(18223, 41, 2, 6, 1, 29, 7, 1, 1, 0, 1, 16);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(18183, 41, 6, 6, 1, 29, 7, 1, 1, 0, 0, 19);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(18126, 41, 7, 5, 1, 27, 7, 1, 1, 8, 0, 15);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(18094, 25, 3, 3, 1, 15, 0, 2, 1, 0, 0, 4);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(17962, 27, 5, 1, 1, 11, 0, 1, 1, 0, 1, 1);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(17957, 27, 6, 5, 1, 27, 0, 2, 1, 8, 0, 6);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(17877, 27, 6, 4, 1, 17, 0, 1, 1, 0, 1, 5);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(17788, 41, 3, 3, 1, 15, 7, 1, 1, 0, 0, 7);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(17364, 20, 6, 1, 1, 11, 0, 1, 1, 0, 1, 2);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(17083, 41, 6, 4, 1, 17, 7, 1, 1, 0, 0, 11);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(16770, 22, 4, 4, 1, 17, 0, 1, 1, 0, 0, 9);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(16758, 40, 8, 8, 1, 47, 7, 1, 1, 18, 0, 32);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(15060, 22, 8, 4, 1, 17, 0, 1, 1, 0, 0, 11);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(15047, 24, 5, 3, 1, 15, 0, 1, 1, 0, 0, 5);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(14185, 12, 4, 7, 1, 31, 0, 1, 1, 0, 1, 22);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(13159, 35, 6, 5, 1, 27, 7, 1, 1, 8, 1, 14);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(12975, 3, 5, 4, 1, 17, 0, 1, 1, 0, 1, 9);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(12963, 1, 3, 3, 1, 15, 0, 1, 1, 0, 0, 4);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(12960, 33, 6, 5, 1, 26, 7, 1, 1, 8, 0, 21);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(12879, 3, 8, 4, 1, 17, 0, 1, 1, 0, 0, 10);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(12873, 23, 3, 4, 1, 17, 0, 1, 1, 0, 0, 8);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(12861, 33, 6, 7, 1, 30, 7, 1, 1, 0, 0, 27);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(12848, 23, 5, 4, 1, 17, 0, 1, 1, 0, 0, 9);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(12840, 22, 6, 3, 1, 15, 0, 1, 1, 0, 0, 6);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(12835, 33, 4, 7, 1, 30, 7, 1, 1, 0, 0, 26);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(12678, 33, 2, 3, 1, 14, 7, 1, 1, 0, 0, 11);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(12658, 1, 6, 2, 1, 13, 0, 1, 1, 0, 0, 3);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(12577, 22, 6, 2, 1, 13, 0, 1, 1, 0, 0, 3);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(12519, 40, 7, 3, 1, 15, 7, 1, 1, 0, 0, 11);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(12497, 40, 8, 4, 1, 17, 7, 1, 1, 0, 2, 17);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(12490, 24, 8, 4, 1, 17, 0, 1, 1, 0, 0, 10);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(12472, 24, 5, 7, 1, 31, 0, 1, 1, 0, 1, 18);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(12469, 40, 6, 4, 1, 17, 7, 1, 1, 0, 0, 15);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(12399, 23, 6, 5, 1, 27, 0, 2, 1, 8, 0, 13);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(12353, 23, 2, 3, 1, 15, 0, 1, 1, 0, 0, 4);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(12351, 40, 5, 2, 1, 13, 7, 1, 1, 0, 0, 6);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(12350, 23, 4, 3, 1, 15, 0, 1, 1, 0, 0, 5);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(12328, 1, 2, 5, 1, 27, 0, 1, 1, 8, 0, 12);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(12323, 33, 5, 6, 1, 28, 7, 1, 1, 0, 1, 24);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(12299, 33, 8, 2, 1, 12, 7, 1, 1, 0, 0, 10);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(12294, 42, 5, 1, 1, 11, 7, 1, 1, 0, 1, 1);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(12294, 38, 5, 1, 1, 11, 7, 1, 1, 0, 1, 1);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(12294, 34, 5, 1, 1, 11, 7, 1, 1, 0, 1, 1);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(12294, 31, 5, 1, 1, 11, 0, 1, 1, 0, 1, 1);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(12294, 30, 5, 1, 1, 11, 0, 1, 1, 0, 1, 1);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(12294, 29, 5, 1, 1, 11, 0, 1, 1, 0, 1, 1);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(12294, 28, 5, 1, 1, 11, 0, 1, 1, 0, 1, 1);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(12294, 18, 5, 1, 1, 11, 0, 1, 1, 0, 1, 1);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(12294, 17, 5, 1, 1, 11, 0, 1, 1, 0, 1, 1);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(12294, 15, 5, 1, 1, 11, 0, 1, 1, 0, 1, 1);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(12294, 14, 5, 1, 1, 11, 0, 1, 1, 0, 1, 1);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(12294, 4, 5, 1, 1, 11, 0, 1, 1, 0, 1, 1);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(12294, 1, 5, 1, 1, 11, 0, 1, 0, 0, 1, 1);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(12043, 22, 7, 5, 1, 27, 0, 1, 1, 8, 0, 14);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(12042, 22, 5, 5, 1, 27, 0, 1, 1, 8, 1, 13);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(11958, 24, 6, 6, 1, 29, 0, 1, 1, 0, 0, 15);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(11368, 23, 8, 3, 1, 15, 0, 1, 1, 0, 0, 7);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(5940, 36, 2, 1, 1, 11, 7, 1, 1, 0, 1, 1);
    INSERT INTO forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, nodeIndex) VALUES(5118, 35, 4, 5, 1, 27, 7, 1, 1, 8, 1, 12);
        
    DROP TABLE IF EXISTS \`forge_talent_ranks\`;
    CREATE TABLE IF NOT EXISTS \`forge_talent_ranks\` (
        \`talentSpellId\` MEDIUMINT UNSIGNED NOT NULL,
        \`talentTabId\` INT UNSIGNED NOT NULL,
        \`rank\` INT UNSIGNED NOT NULL,
        \`spellId\` MEDIUMINT UNSIGNED NULL,
        PRIMARY KEY (\`talentSpellId\`, \`talentTabId\`, \`rank\`));
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(12294, 1, 1, 12294);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(12328, 1, 1, 12328);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(12658, 1, 1, 12658);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(12963, 1, 1, 12963);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(29724, 1, 1, 29724);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(46854, 1, 1, 46854);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(46924, 1, 1, 46924);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(56636, 1, 1, 56636);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(80901, 1, 1, 80901);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(23588, 2, 1, 23588);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(29776, 2, 1, 29776);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(30335, 2, 1, 30335);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(46917, 2, 1, 46917);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(80901, 2, 1, 80901);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(12879, 3, 1, 12879);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(12975, 3, 1, 12975);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(29598, 3, 1, 29598);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(46952, 3, 1, 46952);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(46968, 3, 1, 46968);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(47294, 3, 1, 47294);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(47294, 3, 2, 47295);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(47488, 3, 1, 47488);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(47498, 3, 1, 47498);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(57499, 3, 1, 57499);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(80901, 3, 1, 80901);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(20131, 5, 1, 20131);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(20164, 5, 1, 20164);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(20468, 5, 1, 20468);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(20928, 5, 1, 20928);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(31845, 5, 1, 31845);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(31848, 5, 1, 31848);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(31852, 5, 1, 31852);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(32699, 5, 1, 32699);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(53601, 5, 1, 53601);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(80901, 5, 1, 80901);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(35397, 6, 1, 35397);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(53375, 6, 1, 53375);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(53385, 6, 1, 53385);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(53648, 6, 1, 53648);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(80901, 6, 1, 80901);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(34692, 7, 1, 34692);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(35030, 7, 1, 35030);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(80901, 7, 1, 80901);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(80901, 8, 1, 80901);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(53292, 9, 1, 53292);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(63457, 9, 1, 63457);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(63457, 9, 2, 63458);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(80901, 9, 1, 80901);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(31226, 10, 1, 31226);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(31226, 10, 2, 31227);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(51625, 10, 1, 51625);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(51625, 10, 2, 51626);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(51632, 10, 1, 51632);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(51632, 10, 2, 51633);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(51662, 10, 1, 51662);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(80901, 10, 1, 80901);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(51690, 11, 1, 51690);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(80901, 11, 1, 80901);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(14185, 12, 1, 14185);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(58425, 12, 1, 58425);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(80901, 12, 1, 80901);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(20711, 13, 1, 20711);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(33150, 13, 1, 33150);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(33150, 13, 2, 33154);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(47788, 13, 1, 47788);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(80901, 13, 1, 80901);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(17364, 20, 1, 17364);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(60103, 20, 1, 60103);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(80901, 20, 1, 80901);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(80901, 21, 1, 80901);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(12042, 22, 1, 12042);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(12043, 22, 1, 12043);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(12577, 22, 1, 12577);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(12840, 22, 1, 12840);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(15060, 22, 1, 15060);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(16770, 22, 1, 16770);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(31572, 22, 1, 31572);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(31583, 22, 1, 31583);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(54490, 22, 1, 54490);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(55339, 22, 1, 55339);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(80901, 22, 1, 80901);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(11368, 23, 1, 11368);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(12350, 23, 1, 12350);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(12353, 23, 1, 12353);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(12399, 23, 1, 12399);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(12399, 23, 2, 12400);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(12848, 23, 1, 12848);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(12873, 23, 1, 12873);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(29076, 23, 1, 29076);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(31679, 23, 1, 31679);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(31679, 23, 2, 31680);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(34296, 23, 1, 34296);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(44472, 23, 1, 44472);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(55360, 23, 1, 55360);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(80901, 23, 1, 80901);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(11958, 24, 1, 11958);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(12472, 24, 1, 12472);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(12490, 24, 1, 12490);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(15047, 24, 1, 15047);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(28593, 24, 1, 28593);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(44549, 24, 1, 44549);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(1280042, 24, 1, 1280042);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(18094, 25, 1, 18094);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(18094, 25, 2, 18095);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(30108, 25, 1, 30108);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(32477, 25, 1, 32477);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(48181, 25, 1, 48181);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(54038, 25, 1, 54038);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(58435, 25, 1, 58435);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(80901, 25, 1, 80901);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(18704, 26, 1, 18704);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(18744, 26, 1, 18744);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(18769, 26, 1, 18769);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(18769, 26, 2, 18770);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(19028, 26, 1, 19028);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(30143, 26, 1, 30143);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(30146, 26, 1, 30146);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(35691, 26, 1, 35691);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(35691, 26, 2, 35692);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(80901, 26, 2, 80901);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(17877, 27, 1, 17877);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(17957, 27, 1, 17957);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(17957, 27, 2, 17958);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(17962, 27, 1, 17962);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(47223, 27, 1, 47223);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(47260, 27, 1, 47260);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(47270, 27, 1, 47270);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(59172, 27, 1, 59172);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(59741, 27, 1, 59741);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(63158, 27, 1, 63158);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(80901, 32, 1, 80901);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(12299, 33, 1, 12299);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(12323, 33, 1, 12323);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(12678, 33, 1, 12678);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(12835, 33, 1, 12835);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(12861, 33, 1, 12861);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(12960, 33, 1, 12960);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(20505, 33, 1, 20505);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(29593, 33, 1, 29593);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(29759, 33, 1, 29759);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(29834, 33, 1, 29834);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(29836, 33, 1, 29836);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(34428, 33, 1, 34428);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(46865, 33, 1, 46865);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(59088, 33, 1, 59088);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(61216, 33, 1, 61216);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(80901, 33, 1, 80901);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(5118, 35, 1, 5118);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(13159, 35, 1, 13159);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(19370, 35, 1, 19370);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(19412, 35, 1, 19412);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(19503, 35, 1, 19503);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(53234, 35, 1, 53234);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(80901, 35, 1, 80901);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(5940, 36, 1, 5940);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(31230, 36, 1, 31230);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(80901, 36, 1, 80901);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(32375, 37, 1, 32375);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(34433, 37, 1, 34433);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(80901, 37, 1, 80901);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(30885, 39, 1, 30885);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(30885, 39, 2, 30886);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(51514, 39, 1, 51514);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(80901, 39, 1, 80901);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(12351, 40, 1, 12351);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(12469, 40, 1, 12469);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(12497, 40, 1, 12497);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(12519, 40, 1, 12519);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(16758, 40, 1, 16758);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(29440, 40, 1, 29440);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(29444, 40, 1, 29444);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(31669, 40, 1, 31669);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(44396, 40, 1, 44396);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(44399, 40, 1, 44399);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(54354, 40, 1, 54354);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(54659, 40, 1, 54659);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(54734, 40, 1, 54734);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(54787, 40, 1, 54787);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(55342, 40, 1, 55342);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(70752, 40, 1, 70752);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(80901, 40, 1, 80901);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(17083, 41, 1, 17083);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(17788, 41, 1, 17788);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(18126, 41, 1, 18126);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(18183, 41, 1, 18183);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(18223, 41, 1, 18223);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(18288, 41, 1, 18288);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(18708, 41, 1, 18708);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(18709, 41, 1, 18709);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(18709, 41, 2, 18710);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(18767, 41, 1, 18767);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(30299, 41, 1, 30299);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(30326, 41, 1, 30326);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(47897, 41, 1, 47897);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(48018, 41, 1, 48018);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(53754, 41, 1, 53754);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(53754, 41, 2, 53759);
    INSERT INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(80901, 41, 1, 80901);
        
    DROP TABLE IF EXISTS \`forge_talent_prereq\`;
    CREATE TABLE IF NOT EXISTS \`forge_talent_prereq\` (
        \`reqId\` INT UNSIGNED NOT NULL,
        \`spellid\` MEDIUMINT UNSIGNED NOT NULL,
        \`talentTabId\` INT UNSIGNED NOT NULL,
        \`reqTalent\` MEDIUMINT UNSIGNED NOT NULL,
        \`reqTalentTabId\` INT UNSIGNED NOT NULL,
        \`reqRank\` INT UNSIGNED NOT NULL,
        PRIMARY KEY (\`reqId\`, \`spellid\`, \`talentTabId\`));
    
    DROP TABLE IF EXISTS \`forge_talent_exclusive\`;
    CREATE TABLE IF NOT EXISTS \`forge_talent_exclusive\` (
        \`talentSpellId\` MEDIUMINT UNSIGNED NOT NULL,
        \`talentTabId\` INT UNSIGNED NOT NULL,
        \`exlusiveSpellId\` MEDIUMINT UNSIGNED NOT NULL,
        PRIMARY KEY (\`talentSpellId\`, \`talentTabId\`, \`exlusiveSpellId\`));
    
    DROP TABLE IF EXISTS \`forge_talent_exclusive\`;
    CREATE TABLE IF NOT EXISTS \`forge_talent_unlearn\` (
        \`talentTabId\` INT UNSIGNED NOT NULL,
        \`talentSpellId\` MEDIUMINT UNSIGNED NOT NULL,
        \`unlearnSpell\` MEDIUMINT UNSIGNED NOT NULL,
        PRIMARY KEY (\`talentTabId\`, \`talentSpellId\`, \`unlearnSpell\`));
    
    DROP TABLE IF EXISTS \`forge_talent_exclusive\`;
    CREATE TABLE IF NOT EXISTS \`forge_prestige_ignored_spells\` (
        \`spellid\` INT UNSIGNED NOT NULL,
        PRIMARY KEY (\`spellid\`));
    
    DROP TABLE IF EXISTS \`forge_talent_exclusive\`;
    CREATE TABLE IF NOT EXISTS \`forge_player_spell_scale\` (
        \`ID\` INT NOT NULL DEFAULT '0',
        \`Data\` FLOAT NOT NULL DEFAULT '0',
        PRIMARY KEY (\`ID\`)) ENGINE=MyISAM
        DEFAULT CHARSET=utf8; 
    
    DROP TABLE IF EXISTS \`forge_talent_exclusive\`;
    CREATE TABLE IF NOT EXISTS \`forge_character_node_choices\` (
        \`guid\` INT UNSIGNED NOT NULL,
        \`spec\` INT UNSIGNED NOT NULL,
        \`tabId\` INT UNSIGNED NOT NULL,
        \`node\` TINYINT UNSIGNED NOT NULL,
        \`choice\` INT UNSIGNED NOT NULL,
        PRIMARY KEY (\`guid\`, \`spec\`, \`tabId\`, \`node\`));
        
    DROP TABLE IF EXISTS \`forge_talent_exclusive\`;
    CREATE TABLE IF NOT EXISTS \`forge_talent_choice_nodes\` (
        \`choiceNodeId\` MEDIUMINT UNSIGNED NOT NULL,
        \`talentTabId\` INT UNSIGNED NOT NULL,
        \`choiceIndex\` int unsigned not null,
        \`choiceSpellId\` MEDIUMINT UNSIGNED NOT NULL,
        PRIMARY KEY (\`choiceNodeId\`, \`talentTabId\`, \`choiceSpellId\`));
    
    DROP TABLE IF EXISTS \`forge_talent_exclusive\`;
    CREATE TABLE IF NOT EXISTS \`forge_character_spec_spells\` (
        \`class\` INT(10) UNSIGNED NOT NULL,
        \`race\` INT(10) UNSIGNED NOT NULL,
        \`level\` INT(10) UNSIGNED NOT NULL,
        \`spell\` INT(10) UNSIGNED NOT NULL,
        PRIMARY KEY (\`class\`, \`race\`,\`spell\`)
    ) COLLATE='utf8_general_ci' ENGINE=InnoDB;
    
    DROP TABLE IF EXISTS \`forge_talent_exclusive\`;
    CREATE TABLE IF NOT EXISTS \`forge_spell_charge\` (
        \`spell\` INT(10) UNSIGNED NOT NULL,
        \`timer\` INT(10) UNSIGNED NOT NULL,
        \`item\` INT(10) UNSIGNED NOT NULL,
        \`max\` INT(10) UNSIGNED NOT NULL,
        PRIMARY KEY (\`spell\`)
    ) COLLATE='utf8_general_ci' ENGINE=InnoDB;
    
    DROP TABLE IF EXISTS \`forge_talent_exclusive\`;
    CREATE TABLE IF NOT EXISTS \`forge_talent_spell_flagged_unlearn\` (
        \`guid\` int unsigned NOT NULL,
        \`spell\` int unsigned NOT NULL,
        PRIMARY KEY (\`guid\`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
    
    DROP TABLE IF EXISTS \`forge_talent_exclusive\`;
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