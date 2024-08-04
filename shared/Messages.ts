export enum  ClientCallbackOperations
{
    GET_TALENTS                     = 0,
    LEARN_TALENT                    = 1,
    UNLEARN_TALENT                  = 2,
    RESPEC_TALENTS                  = 3,
    RESPEC_TALENTS_ERROR            = 4,
    UPDATE_SPEC                     = 5,
    ACTIVATE_SPEC                   = 6,
    COMBOPOINTS                     = 7,
    TALENT_TREE_LAYOUT              = 8,
    PROMPT_CHAR_SPEC                = 9,
    UPDATE_SPEC_ERROR               = 10,
    ACTIVATE_SPEC_ERROR             = 11,
    LEARN_TALENT_ERROR              = 12,
    BUY_ITEM_ERROR                  = 13,
    UNLEARN_TALENT_ERROR            = 14,
    GET_TALENT_ERROR                = 15,
    BUY_ITEMS                       = 16,
    GET_ITEM_FROM_COLLECTION        = 17,
    GET_PLAYER_COLLECTION           = 18,
    GET_SHOP_LAYOUT                 = 19,
    HOLIDAYS                        = 20,
    GET_CHARACTER_SPECS             = 21,
    GET_COMBO_FINISHERS             = 22,
    ACTIVATE_CLASS_SPEC             = 23,
    ACTIVATE_CLASS_SPEC_ERROR       = 24,
    GET_TOOLTIPS                    = 25,
    FORGET_TOOLTIP                  = 26,
    
    // m+
    MYTHIC_GET_WEEKLY_REWARD        = 101,
    MYTHIC_GET_MAP_STATS            = 102,
    MYTHIC_GET_AFFIXES_LIST         = 103,
    MYTHIC_SET_AFFIXES_AND_START    = 104,
    MYTHIC_KEY_COMPLETED            = 105, // send confirmation that key has ended
    MYTHIC_OPEN_WINDOW              = 106,
    MYTHIC_UPDATE_TIMER             = 107,
    MYTHIC_UPDATE_DEATHS            = 108,
    MYTHIC_UPDATE_CRITERIA          = 109,

    // loadouts
    LOADOUT_ERROR                   = 120,
    GET_LOADOUTS                    = 121,
    SAVE_LOADOUT                    = 122,
    DELETE_LOADOUT                  = 123,

    LEVELUP                         = 300,
    MALFORMED_PACKET_ERROR          = 999,
};

//dont reuse IDs
export class SimpleMessagePayload {
    //all vars here
    op: number = ClientCallbackOperations.GET_TALENTS
    message: string = ""

    //constructor, self explanatory
    constructor(opcode: number, message: string) {
        this.message = message;
        this.op = opcode;
    }

    //parsing the packet
    read(read: TSPacketRead): void {
        this.message = read.ReadString()
    }
    //writing the packet
    write(): TSPacketWrite {
        //you can default the size to 0, it will find it's own size. sometimes string brick this. i default to 2000 whenever it acts up
        let packet = CreateCustomPacket(this.op, 0);
        packet.WriteString(this.message);
        return packet;
    }
}

export class ServerToClientPayload {
    op: number = -1

    //constructor, self explanatory
    constructor(opcode: number) {
        this.op = opcode;
    }

    //parsing the packet
    read(read: TSPacketRead): void {
    }
    //writing the packet
    write(): TSPacketWrite {
        //you can default the size to 0, it will find it's own size. sometimes string brick this. i default to 2000 whenever it acts up
        let packet = CreateCustomPacket(this.op, 0);
        return packet;
    }
}