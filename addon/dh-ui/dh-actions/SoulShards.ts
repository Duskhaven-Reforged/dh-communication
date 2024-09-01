import { ClientCallbackOperations } from "../../../shared/Messages"

export function SoulShards() {
    _G['CurrentSoulShards'] = 0
    OnCustomPacket(ClientCallbackOperations.SOUL_SHARDS, (Packet) => {
        let SoulShards = Packet.ReadUInt8()
        _G['CurrentSoulShards'] = SoulShards
    })
}
