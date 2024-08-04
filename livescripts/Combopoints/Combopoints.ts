import { ClientCallbackOperations } from "../../shared/Messages"

let Finishers : TSArray<uint32> = TAG(`dh-spells`, `combo-finisher`)

export function ComboPoints(events: TSEvents) {
    events.Player.OnLogin((Player) => {
        Player.SetUInt(`ComboPoints`, 0)
        SendComboPoints(Player)
    })

    events.Player.GainComboPoint((Player, Count) => {
        let Old = Player.GetUInt(`ComboPoints`, 0)
        let New = Math.min(Old + Count, 5)
        Player.SetUInt(`ComboPoints`, New)
        SendComboPoints(Player)
    })

    events.Player.ClearComboPoints((Player) => {
        Player.SetUInt(`ComboPoints`, 0)
        SendComboPoints(Player)
    })

    events.Spell.OnCheckCast(Finishers, (Spell, Result) => {
        if (Spell.GetCaster().IsPlayer()) {
            let Player = Spell.GetCaster().ToPlayer()
            console.log(`Check cast`)
            Result.set(Player.GetUInt(`ComboPoints`, 0) > 0 ? 255 : 78)
        }    
    })

    events.Spell.OnAfterHit(Finishers, (Spell, Cancel) => {
        if (Spell.GetCaster().IsPlayer()) {
            let Player = Spell.GetCaster().ToPlayer()
            Player.SetUInt(`ComboPoints`, 0)
            SendComboPoints(Player)
        }    
    })
}

function SendComboPoints(Player: TSPlayer) {
    let packet = CreateCustomPacket(ClientCallbackOperations.COMBOPOINTS, 0);
    packet.WriteUInt8(Player.GetUInt(`ComboPoints`))
    packet.SendToPlayer(Player)
}