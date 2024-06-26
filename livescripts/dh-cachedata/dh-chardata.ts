import { DHCharacterPoint, DHCharacterTalent, DHNodeType, DHPlayerLoadout, DHPlayerSpec } from "../classes";
import { wTalentTrees } from "./dh-worlddata";

export let cActions: TSDictionary<uint64, TSDictionary<uint8, TSDictionary<uint8, CharacterSpecAction>>> = CreateDictionary<uint64, TSDictionary<uint8, TSDictionary<uint8, CharacterSpecAction>>>({})
export let cCharPoints: TSDictionary<uint64 /*owner*/, TSDictionary<uint16/*pointType*/, TSDictionary<uint8/*spec*/, DHCharacterPoint>>> = CreateDictionary<uint64, TSDictionary<uint16, TSDictionary<uint8, DHCharacterPoint>>>({})
export let cMaxPointDefaults: TSDictionary<uint16, DHCharacterPoint> = CreateDictionary<uint16, DHCharacterPoint>({})
export let cSpecs: TSDictionary<uint64 /*owner*/, TSDictionary<uint8/*spec*/, DHPlayerSpec>> = CreateDictionary<uint64, TSDictionary<uint8, DHPlayerSpec>>({})
export let cActiveSpecs: TSDictionary<uint64, uint32> = CreateDictionary<uint64, uint32>({})
export let cLoadouts: TSDictionary<uint64 /*owner*/, TSDictionary<uint32/*tab*/, TSDictionary<uint8/*id*/, DHPlayerLoadout>>> = CreateDictionary<uint64, TSDictionary<uint32, TSDictionary<uint8, DHPlayerLoadout>>>({})
export let cActiveLoadouts: TSDictionary<uint64, DHPlayerLoadout> = CreateDictionary<uint64, DHPlayerLoadout>({})

export function LoadCharacterData() {
    console.log("\tLoading character actionbars...\n")
    console.log(new CharacterActions().Load())

    console.log("\tLoading character choice node choices...\n")
    console.log(new CharacterChoiceNodeChoices().Load())

    console.log("\tLoading character points...\n")
    console.log(new CharacterPoints().Load())

    console.log("\tLoading character specs...\n")
    console.log(new CharacterSpecs().Load())

    console.log("\tLoading character talent loadouts...\n")
    console.log(new CharacterTalentLoadouts().Load())

    console.log("\tLoading character talents...\n")
    console.log(new CharacterTalents().Load())

    console.log("\tLoading character talents spent...\n")
    console.log(new CharacterTalentsSpent().Load())
}

export class CharacterSpecAction {
    button: uint32 = 0
    action: uint32 = 0
    type: uint32 = 0

    constructor(button: uint32, action: uint32, type: uint32) {
        this.button = button;
        this.action = action;
        this.type = type;
    }
}
class CharacterActions {
    Load() : string {
        let count = 0
        const res = QueryCharacters('select * from `forge_character_action`')
        while (res.GetRow()) {
            let owner = res.GetUInt64(0)
            let spec = res.GetUInt8(1)
            let loadout = res.GetUInt8(2)
            let button = res.GetUInt32(3)
            let action = res.GetUInt32(4)
            let type = res.GetUInt8(5)

            cActions[owner][spec][loadout] = new CharacterSpecAction(button, action, type)
            count++
        }

        return `\t\tLoaded ${count} entries.\n`
    }
}

class CharacterChoiceNodeChoices {
    Load() : string {
        let count = 0

        const res = QueryCharacters('select * from `forge_character_node_choices`')
        while (res.GetRow()) {
            let owner = res.GetUInt64(0)
            let spec = res.GetUInt8(1)
            let tabId = res.GetUInt8(2)
            let node = res.GetUInt32(3)
            let choice = res.GetUInt32(4)

            if (wTalentTrees.contains(tabId))
                if (wTalentTrees[tabId].Talents.contains(node)) {
                    if (wTalentTrees[tabId].Talents[node].NodeType == DHNodeType.CHOICE) {
                        cSpecs[owner][spec].ChoiceNodesChosen[node] = choice
            
                        count++
                    }
                }
        }

        return `\t\tLoaded ${count} entries.\n`
    }
}

class CharacterPoints {
    Load() : string {
        let count = 0
        const res = QueryCharacters('select * from `forge_character_points`')
        while (res.GetRow()) {
            let owner = res.GetUInt64(0)  
            let type = res.GetUInt16(1)
            let spec = res.GetUInt32(2)
            let sum = res.GetUInt32(3)
            let max = res.GetUInt32(4)
            let point = new DHCharacterPoint(type, spec, sum, max)

            if (owner === 0xffffffff)
                cMaxPointDefaults[type] = point
            else 
                cCharPoints[owner][type][spec] = point

            count++
        }

        return `\t\tLoaded ${count} entries.\n`
    }
}

class CharacterSpecs {
    Load() : string {
        let count = 0

        const res = QueryCharacters('select * from `forge_character_specs`')
        while (res.GetRow()) {
            let owner = res.GetUInt64(1)
            let id = res.GetUInt32(0)
            let name = res.GetString(2)
            let description = res.GetString(3)
            let active = res.GetUInt8(4)
            let spellIcon = res.GetUInt32(5)
            let specTabId = res.GetUInt32(6)

            let spec = new DHPlayerSpec(owner, id, name, description, !!active, spellIcon, specTabId);

            if (active)
                cActiveSpecs[id] = spec.Id

            cSpecs[owner][id] = spec

            count++
        }

        return `\t\tLoaded ${count} entries.\n`
    }
}

class CharacterTalentLoadouts {
 
    Load() : string {
        let count = 0

        const res = QueryCharacters('select * from `forge_character_talent_loadouts`')
        while (res.GetRow()) {
            let owner = res.GetUInt64(0)  
            let id = res.GetUInt8(1)
            let tabId = res.GetUInt32(2)
            let name = res.GetString(3)
            let talentString = res.GetString(4)
            let active = res.GetUInt8(5)

            let loadout = new DHPlayerLoadout(id, tabId, name, talentString, !!active)

            if (active)
                cActiveLoadouts[owner] = loadout

            cLoadouts[owner][tabId][id] = loadout

            count++
        }

        return `\t\tLoaded ${count} entries.\n`
    }
}

class CharacterTalents {
 
    Load() : string {
        let count = 0

        const res = QueryCharacters('select * from `forge_character_talents`')
        while (res.GetRow()) {
            let owner = res.GetUInt64(0)  
            let spec = res.GetUInt32(1)
            let spell = res.GetUInt32(2)
            let tab = res.GetUInt32(3)
            let currentRank = res.GetUInt8(4)

            let talent = new DHCharacterTalent(spell, tab, currentRank)
            if (wTalentTrees.contains(tab)) {
                if (wTalentTrees[tab].Talents.contains(spell)) {
                    talent.Type = wTalentTrees[tab].Talents[spell].NodeType
                    cSpecs[owner][spec].Talents[tab][spell] = talent
                    count++
                }
            }
        }

        return `\t\tLoaded ${count} entries.\n`
    }
}

class CharacterTalentsSpent {
 
    Load() : string {
        let count = 0

        const res = QueryCharacters('select * from `forge_character_talents_spent`')
        while (res.GetRow()) {
            let Owner = res.GetUInt64(0) 
            let Spec = res.GetUInt32(1)
            let TabId = res.GetUInt32(2)
            let Amount = res.GetUInt8(3)

            cSpecs[Owner][Spec].PointsSpent[TabId] = Amount
            count++
        }

        return `\t\tLoaded ${count} entries.\n`
    }
}