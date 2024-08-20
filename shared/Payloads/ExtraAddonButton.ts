import { ClientCallbackOperations } from "../Messages"

export class ExtraActionButtonUpdate {
    spellID: number = 123
    flag: number = 1

    read(read: TSPacketRead): ExtraActionButtonUpdate {
        this.spellID = read.ReadUInt32();
        this.flag = read.ReadUInt32();
        return this;
    }

    BuildPacket(): TSPacketWrite {
        let packet = CreateCustomPacket(ClientCallbackOperations.EXTRA_ACTION_BUTTON_UPDATE, 0);
        packet.WriteUInt32(this.spellID)
        packet.WriteUInt32(this.flag)
        return packet;
    }
}