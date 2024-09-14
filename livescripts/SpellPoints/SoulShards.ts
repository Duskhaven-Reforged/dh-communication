import { ClientCallbackOperations } from "../../shared/Messages"
import { RequiresSoulShard, RequiresSoulShard2 } from "../../shared/Shared"

let Soulfire = GetID(`Spell`, `dh-spells`, `warl-des-soulfire`)
let SoulShard = GetID(`Spell`, `dh-spells`, `warl-gen-soul-shard-aura`)
let SufferAndPerishBuff = GetID('Spell', 'dh-spells', 'warl-dem-suffer-and-perish-buff')

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

    events.Spell.OnCheckCast(RequiresSoulShard, (Spell, Result) => {
        if (Spell.GetCaster() == null)
            return
        
        if (Spell.GetCaster().IsPlayer()) {
            let Player = Spell.GetCaster().ToPlayer()
            if (Spell.GetEntry() === Soulfire && Player.HasAura(SufferAndPerishBuff))
                Result.set(255)
            else
                Result.set(Player.GetUInt(`SoulShards`, 0) > 0 ? 255 : 172)
        }    
    })

    events.Spell.OnCast(RequiresSoulShard, (Spell) => {
        if (Spell.GetCaster() == null)
            return

        if (Spell.GetCaster().ToUnit().HasAura(SoulShard)) {
            let Aura = Spell.GetCaster().ToUnit().GetAura(SoulShard)
            let StackAmount = Aura.GetStackAmount()
            let Player = Spell.GetCaster().ToPlayer()

            if (Player.HasAura(SufferAndPerishBuff) && Spell.GetEntry() === Soulfire) {
                // Do nothing
            } else if (StackAmount > 1) {
                Aura.SetStackAmount(StackAmount - 1)
                Player.SetUInt('SoulShards', StackAmount - 1)
            } else if (StackAmount === 1) {
                Spell.GetCaster().ToUnit().RemoveAura(SoulShard)
                Player.SetUInt('SoulShards', 0)
            }

            SendSoulShards(Player)
        }
    })

    events.Spell.OnCheckCast(RequiresSoulShard2, (Spell, Result) => {
        if (Spell.GetCaster() == null)
            return
        
        if (Spell.GetCaster().IsPlayer()) {
            let Player = Spell.GetCaster().ToPlayer()
            Result.set(Player.GetUInt(`SoulShards`, 0) > 1 ? 255 : 172)
        }    
    })

    events.Spell.OnCast(RequiresSoulShard2, (Spell) => {
        if (Spell.GetCaster() == null)
            return

        if (Spell.GetCaster().ToUnit().HasAura(SoulShard)) {
            let Aura = Spell.GetCaster().ToUnit().GetAura(SoulShard)
            let StackAmount = Aura.GetStackAmount()
            let Player = Spell.GetCaster().ToPlayer()
            if (StackAmount > 2) {
                Aura.SetStackAmount(StackAmount - 2)
                Player.SetUInt('SoulShards', StackAmount - 2)
            } else if (StackAmount === 2) {
                Spell.GetCaster().ToUnit().RemoveAura(SoulShard)
                Player.SetUInt('SoulShards', 0)
            }

            SendSoulShards(Player)
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
