import { ClientCallbackOperations, SimpleMessagePayload } from "../../shared/Messages";
import { mDHDMsg } from "../livescripts";

export function RouteTopics(events: TSEvents) {
    events.CustomPacket.OnReceive(ClientCallbackOperations.TALENT_TREE_LAYOUT,(Opcode,Packet,Player)=>{
        let CustomPacket = new SimpleMessagePayload(Opcode, "")
        CustomPacket.read(Packet)
        mDHDMsg.BuildTalentTreeLayout(Player)
    })

    events.CustomPacket.OnReceive(ClientCallbackOperations.GET_CHARACTER_SPECS,(Opcode,Packet,Player)=>{
        let CustomPacket = new SimpleMessagePayload(Opcode, "")
        CustomPacket.read(Packet)
        mDHDMsg.SendSpecInfo(Player)
    })

    events.CustomPacket.OnReceive(ClientCallbackOperations.GET_TALENTS, (Opcode, Packet, Player) => {
        let CustomPacket = new SimpleMessagePayload(Opcode, '')
        CustomPacket.read(Packet)
        mDHDMsg.SendTalents(Player)
    })

    events.CustomPacket.OnReceive(ClientCallbackOperations.LEARN_TALENT, (Opcode, Packet, Player) => {
        let CustomPacket = new SimpleMessagePayload(Opcode, '')
        CustomPacket.read(Packet)
        mDHDMsg.cache.TrySaveNewLoadout(Player, CustomPacket.message)
        mDHDMsg.SendSpecInfo(Player)
    })

    events.CustomPacket.OnReceive(ClientCallbackOperations.ACTIVATE_CLASS_SPEC, (Opcode, Packet, Player) => {
        let CustomPacket = new SimpleMessagePayload(Opcode, '')
        CustomPacket.read(Packet)
        if (parseInt(CustomPacket.message)) {
            mDHDMsg.cache.ActivateSpec(Player, parseInt(CustomPacket.message))
        }
        
    })
}