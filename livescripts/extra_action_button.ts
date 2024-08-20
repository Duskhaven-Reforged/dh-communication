import { ExtraActionButtonUpdate } from "../shared/Payloads/ExtraAddonButton";

export function ExtraActionButton(events: TSEvents) {
    events.Player.OnCommand((player, command, found) => {
        if (!player.IsPlayer())
            return;
        if (!player.IsGM())
            return;

        if (command.get().startsWith('freespell')) {
            player.LearnSpell(774)
            let pkt = new ExtraActionButtonUpdate()
            pkt.spellID = 774
            pkt.flag = 1
            pkt.BuildPacket().SendToPlayer(player);

        } else if (command.get().startsWith('losespell')) {
            player.RemoveSpell(774, true, true)
            let pkt = new ExtraActionButtonUpdate()
            pkt.spellID = 1
            pkt.BuildPacket().SendToPlayer(player);
        }
    })
}