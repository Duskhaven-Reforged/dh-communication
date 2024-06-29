import { ClientCallbackOperations, SimpleMessagePayload } from "../../shared/Messages";
import { GetCharacterSpecsPayload } from "../../shared/Payloads/GetCharacterSpecsPayload";
import { GetTalentTreeLayoutPayload } from "../../shared/Payloads/TalentTreeLayoutPayload";
import { TalentTree } from "../dh-ui/dh-talent/TalentTree";

export function SendCallbackToServer(op: ClientCallbackOperations, msg: string) {
    let packet = new SimpleMessagePayload(op, msg)
    packet.write().Send()
}

export function OnTalentError(pkt: TSPacketRead) {
    let customPacket = new SimpleMessagePayload(ClientCallbackOperations.TALENT_TREE_LAYOUT, "")
    customPacket.read(pkt)
    console.log("Talent learn error: "+customPacket.message)
}

export function GetTalentTreeLayout(pkt: TSPacketRead) {
    let Reader = new GetTalentTreeLayoutPayload()
    let layout = Reader.read(pkt)
    if (!(layout.TabId % 1)) { // strange bug on first login where it gives a decimal tab id, just ignore it
        console.log(`Received ${ClientCallbackOperations.TALENT_TREE_LAYOUT}: for tab ${layout.TabId}`)
        console.log(`Talents: ${layout.TalentsCount}`)
        //TalentTree.TalentTrees[layout.TabId] = layout
        SendCallbackToServer(ClientCallbackOperations.GET_CHARACTER_SPECS, '-1')
    }
}