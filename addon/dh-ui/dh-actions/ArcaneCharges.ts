import { ClientCallbackOperations } from "../../../shared/Messages"

export function ArcaneCharges() {
    _G['CurrentArcaneCharges'] = 0
    OnCustomPacket(ClientCallbackOperations.ARCANE_CHARGES, (Packet) => {
        let ArcaneCharges = Packet.ReadUInt8()
        _G['CurrentArcaneCharges'] = ArcaneCharges
    })

    _G['HasClearcasting'] = 0
    OnCustomPacket(ClientCallbackOperations.MAGE_CLEARCASTING, (Packet) => {
        let Clearcasting = Packet.ReadUInt8()
        _G['HasClearcasting'] = Clearcasting
        console.log(Clearcasting)
    })
}