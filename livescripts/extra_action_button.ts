import { ClientCallbackOperations } from "../shared/Messages";
import { ExtraActionButtonUpdate } from "../shared/Payloads/ExtraAddonButton";
let playerToSpellID = CreateDictionary<number, number>({})
export function ExtraActionButton(events: TSEvents) {
    events.Player.OnCommand((player, command, found) => {
        if (!player.IsPlayer())
            return;
        if (!player.IsGM())
            return;

        if (command.get().startsWith('freespell')) {
            setupEAB(player, 774, 1)
        } else if (command.get().startsWith('losespell')) {
            clearEAB(player)
        }
    })

    events.CustomPacket.OnReceive(ClientCallbackOperations.EXTRA_ACTION_BUTTON_UPDATE, (opcode, packet, player) => {
        if (player.GetSelection().IsNull())
            return;
        if (playerToSpellID[player.GetGUIDLow()] == null)
            return;
        player.CastSpell(player.GetSelection(), playerToSpellID[player.GetGUIDLow()], false)
    })
}

export function setupEAB(player: TSPlayer, spellID: number, flagID: number) {
    let pkt = new ExtraActionButtonUpdate(spellID, flagID)
    playerToSpellID[player.GetGUIDLow()] = spellID
    pkt.BuildPacket().SendToPlayer(player);
}

export function clearEAB(player: TSPlayer) {
    let pkt = new ExtraActionButtonUpdate(1, 1)
    playerToSpellID.erase(player.GetGUIDLow())
    pkt.BuildPacket().SendToPlayer(player);
}
