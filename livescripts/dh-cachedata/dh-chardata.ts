import { ClientCallbackOperations, SimpleMessagePayload } from "../../shared/Messages";
import { DHCharacterPoint, DHCharacterTalent, DHNodeType, DHPlayerLoadout, DHPlayerSpec, DHPointType, TALENT_POINT_TYPES } from "../classes";
import { wTalentTrees } from "./dh-worlddata";

export let cActions: TSDictionary<uint64, TSDictionary<uint8, TSDictionary<uint8, CharacterSpecAction>>> = CreateDictionary<uint64, TSDictionary<uint8, TSDictionary<uint8, CharacterSpecAction>>>({})
export let cCharPoints: TSDictionary<uint64 /*owner*/, TSDictionary<uint16/*pointType*/, TSDictionary<uint8/*spec*/, DHCharacterPoint>>> = CreateDictionary<uint64, TSDictionary<uint16, TSDictionary<uint8, DHCharacterPoint>>>({})
export let cMaxPointDefaults: TSDictionary<uint16, DHCharacterPoint> = CreateDictionary<uint16, DHCharacterPoint>({})
export let cSpecs: TSDictionary<uint64 /*owner*/, DHPlayerSpec> = CreateDictionary<uint64, DHPlayerSpec>({})
export let cLoadouts: TSDictionary<uint64 /*owner*/, TSDictionary<uint32/*tab*/, TSDictionary<uint8/*id*/, DHPlayerLoadout>>> = CreateDictionary<uint64, TSDictionary<uint32, TSDictionary<uint8, DHPlayerLoadout>>>({})
export let cActiveLoadouts: TSDictionary<uint64, TSDictionary<uint8, DHPlayerLoadout>> = CreateDictionary<uint64, TSDictionary<uint8, DHPlayerLoadout>>({})

export function LoadCharacterData() {

    console.log("\tLoading character choice node choices...\n")
    console.log(new CharacterChoiceNodeChoices().Load())

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
        const res = QueryCharacters('select * from `character_actions`')
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

        const res = QueryCharacters('select * from `character_node_choices`')
        while (res.GetRow()) {
            let owner = res.GetUInt64(0)
            let spec = res.GetUInt8(1)
            let tabId = res.GetUInt8(2)
            let node = res.GetUInt32(3)
            let choice = res.GetUInt32(4)

            if (wTalentTrees.contains(tabId))
                if (wTalentTrees[tabId].Talents.contains(node)) {
                    if (wTalentTrees[tabId].Talents[node].NodeType == DHNodeType.CHOICE) {
                        cSpecs[owner].ChoiceNodesChosen[node] = choice
            
                        count++
                    }
                }
        }

        return `\t\tLoaded ${count} entries.\n`
    }
}

export class CharacterPoints extends TSClass {
    Type: uint8 = 0
    Sum: uint8 = 0
    Unlocked: uint8 = 0
    Max: uint8 = 25

    constructor(Type: uint8, Sum: uint8, Unlocked: uint8, Max: uint8) {
        super()
        this.Type = Type
        this.Sum = Sum
        this.Unlocked = Unlocked
        this.Max = Max
    }
}

export class CharacterPointsLoader {
    public Load(Player: TSPlayer) {
        let GUID : uint64 = Player.GetGUID().GetCounter()
        const res = QueryCharacters(`select * from \`characterpoints\` where guid = ${GUID}`)
        if (!res.GetRow()) {
            TALENT_POINT_TYPES.forEach((Type) => {
                let Point = new CharacterPoints(Type, 0, 0, 25)
                this.Init(Player, Point)
                Player.SetObject(`CharacterPoints:${Type}`, Point)
            })
        }

        while (res.GetRow()) {  
            let type = res.GetUInt16(1)
            let sum = res.GetUInt32(2)
            let Unlocked = res.GetUInt32(3)
            let max = res.GetUInt32(4)

            let Point = new CharacterPoints(type, sum, Unlocked, max)
            Player.SetObject(`CharacterPoints:${type}`, Point)
        }
    }

    public LoadByType(Player: TSPlayer, Type: uint8) {
        let GUID : uint64 = Player.GetGUID().GetCounter()
        const res = QueryCharacters(`select * from \`characterpoints\` where guid = ${GUID} and \`type\` = ${Type}`)
        let type = res.GetUInt16(1)
        let sum = res.GetUInt32(2)
        let Unlocked = res.GetUInt32(3)
        let max = res.GetUInt32(4)

        let Point = new CharacterPoints(type, sum, Unlocked, max)
        return Player.GetObject(`CharacterPoints:${type}`, Point)
    }

    public Save(Player: TSPlayer, Points: CharacterPoints) {
        let GUID : uint64 = Player.GetGUID().GetCounter()
        QueryCharactersAsync(`REPLACE INTO \`characterpoints\` (\`guid\`, \`type\`, \`sum\`, \`unlocked\`, \`max\`) VALUES (${GUID}, ${Points.Type}, ${Points.Sum}, ${Points.Unlocked}, ${Points.Max});`)
    }

    public Delete(GUID : uint64) {
        QueryCharactersAsync(`DELETE FROM \`characterpoints\` where guid = ${GUID}`)
    }

    public Init(Player: TSPlayer, Points: CharacterPoints) {
        let Level = Player.GetLevel()
        if (Level > 10) {
            let ValidLevels = Level - 10
            if (ValidLevels > 1) {
                let div = Math.floor(ValidLevels / 2)
                let rem = ValidLevels % 2
                if (Points.Type == DHPointType.CLASS)
                    this.AddPoints(Player, Points, div)
                else
                    this.AddPoints(Player, Points,div + (rem ? 1 : 0))
            } else  {
                if (Level % 2 && Points.Type == DHPointType.TALENT)
                    this.AddPoints(Player, Points, 1)
                else if (Points.Type == DHPointType.CLASS)
                    this.AddPoints(Player, Points, 1)
            }
        } else {
            this.Save(Player, Points)
        }
    }

    public AddPoints(Player: TSPlayer, Points: CharacterPoints, Amount: uint8) {
        if (Amount > 0) {
            if (Points.Unlocked < Points.Max) {
                let NewAmount = Points.Unlocked + Amount
                if (NewAmount > Points.Max)
                    Amount = Points.Max - Points.Unlocked

                Points.Unlocked = Amount
                Points.Sum = Amount

                let pkt = new SimpleMessagePayload(ClientCallbackOperations.LEVELUP, `|cff8FCE00You have been awarded ${Amount} point${Amount > 1 ? 's' : ''}.`);
                pkt.write().SendToPlayer(Player)
            }
        }

        this.Save(Player, Points)
    }
}

class CharacterSpecs {
    Load() : string {
        let count = 0

        const res = QueryCharacters('select * from `character_specs`')
        while (res.GetRow()) {
            let owner = res.GetUInt64(1)
            let id = res.GetUInt32(0)
            let name = res.GetString(2)
            let description = res.GetString(3)
            let active = res.GetUInt8(4)
            let spellIcon = res.GetUInt32(5)
            let specTabId = res.GetUInt32(7)

            let spec = new DHPlayerSpec(owner, id, name, description, !!active, spellIcon, specTabId);

            cSpecs[owner] = spec

            count++
        }

        return `\t\tLoaded ${count} entries.\n`
    }
}

class CharacterTalentLoadouts {
 
    Load() : string {
        let count = 0

        const res = QueryCharacters('select * from `character_talent_loadouts`')
        while (res.GetRow()) {
            let owner = res.GetUInt64(0)  
            let id = res.GetUInt8(1)
            let tabId = res.GetUInt32(2)
            let name = res.GetString(3)
            let talentString = res.GetString(4)
            let active = res.GetUInt8(5)

            let loadout = new DHPlayerLoadout(id, tabId, name, talentString, !!active)

            if (active)
                cActiveLoadouts[owner][tabId] = loadout

            cLoadouts[owner][tabId][id] = loadout

            count++
        }

        return `\t\tLoaded ${count} entries.\n`
    }
}

class CharacterTalents {
 
    Load() : string {
        let count = 0

        const res = QueryCharacters('select * from `character_talents`')
        while (res.GetRow()) {
            let owner = res.GetUInt64(0)  
            let spec = res.GetUInt32(1)
            let spell = res.GetUInt32(2)
            let tab = res.GetUInt32(3)
            let currentRank = res.GetUInt8(4)

            let talent = new DHCharacterTalent(spell, tab, currentRank, false)
            if (wTalentTrees.contains(tab)) {
                if (wTalentTrees[tab].Talents.contains(spell)) {
                    talent.Type = wTalentTrees[tab].Talents[spell].NodeType
                    cSpecs[owner].Talents[tab][spell] = talent
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

        const res = QueryCharacters('select * from `character_talents_spent`')
        while (res.GetRow()) {
            let Owner = res.GetUInt64(0) 
            let Spec = res.GetUInt32(1)
            let TabId = res.GetUInt32(2)
            let Amount = res.GetUInt8(3)

            cSpecs[Owner].PointsSpent[TabId] = Amount
            count++
        }

        return `\t\tLoaded ${count} entries.\n`
    }
}