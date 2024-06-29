import { ClientCallbackOperations, SimpleMessagePayload } from "../../shared/Messages";
import { mDHDMsg } from "../livescripts";

export function RouteTopics(events: TSEvents) {
    events.CustomPacket.OnReceive(ClientCallbackOperations.TALENT_TREE_LAYOUT,(opcode,packet,player)=>{
        let customPacket = new SimpleMessagePayload(opcode, "")
        customPacket.read(packet)
        mDHDMsg.BuildTalentTreeLayout(player)
    })

    events.CustomPacket.OnReceive(ClientCallbackOperations.GET_CHARACTER_SPECS,(opcode,packet,player)=>{
        let customPacket = new SimpleMessagePayload(opcode, "")
        customPacket.read(packet)
        mDHDMsg.SendSpecInfo(player)
    })
}