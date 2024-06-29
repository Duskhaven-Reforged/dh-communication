import { ClientCallbackOperations, SimpleMessagePayload } from "../../shared/Messages";
import { GetCharacterSpecsPayload } from "../../shared/Payloads/GetCharacterSpecsPayload";
import { GetTalentTreeLayoutPayload, TalentTreeLayoutPayload } from "../../shared/Payloads/TalentTreeLayoutPayload";
import { TalentTree } from "../dh-ui/dh-talent/TalentTree";

let ValidTabs: TSArray<number> = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
    16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28,
    29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42,
]

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
    if (layout)
        if (layout.TabId)
            if (ValidTabs.includes(layout.TabId)) { // strange bug on first login where it gives a decimal tab id, just ignore it
                console.log('Received '+ClientCallbackOperations.TALENT_TREE_LAYOUT+': for tab '+layout.TabId)
                console.log('Containing '+layout.TalentsCount+' talents.\n')
                //TalentTree.TalentTrees[layout.TabId] = layout
                //SendCallbackToServer(ClientCallbackOperations.GET_CHARACTER_SPECS, '-1')
            }
}