import { ClientCallbackOperations } from "../../shared/Messages"
import { RequiresSoulShards } from "../../shared/Shared"

let SoulShard = GetID(`Spell`, `dh-spells`, `warl-gen-soul-shard-aura`)

export function SoulShards(events: TSEvents) {
    events.Player.OnLogin((Player) => {
        let Shards = 0

        if (Player.HasAura(SoulShard))
            Shards = Player.GetAura(SoulShard).GetStackAmount()

        Player.SetUInt(`SoulShards`, Shards)
        SendSoulShards(Player)
    })

    events.Spell.OnApply(SoulShard, (Eff, App, Mode) => {
        if (App.GetTarget().IsPlayer() && Eff.GetEffectIndex() == 0) {
            let Player = App.GetTarget().ToPlayer()
            let Charges = App.GetAura().GetStackAmount()
            Player.SetUInt('SoulShards', Charges)
            SendSoulShards(Player)
        }
    })

    events.Spell.OnCheckCast(RequiresSoulShards, (Spell, Result) => {
        if (Spell.GetCaster() == null)
            return
        
        if (Spell.GetCaster().IsPlayer()) {
            let Player = Spell.GetCaster().ToPlayer()
            Result.set(Player.GetUInt(`SoulShards`, 0) > 0 ? 255 : 172)
        }    
    })

    events.Spell.OnCast(RequiresSoulShards, (Spell) => {
        if (Spell.GetCaster() == null)
            return

        if (Spell.GetCaster().ToUnit().HasAura(SoulShard)) {
            let Aura = Spell.GetCaster().ToUnit().GetAura(SoulShard)
            Aura.SetStackAmount(Aura.GetStackAmount() - 1)
        }
    })
}

function SendSoulShards(Player: TSPlayer) {
    if (Player.IsInWorld()) {
        let packet = CreateCustomPacket(ClientCallbackOperations.SOUL_SHARDS, 0);
        packet.WriteUInt8(Player.GetUInt(`SoulShards`))
        packet.SendToPlayer(Player)
    }
}
