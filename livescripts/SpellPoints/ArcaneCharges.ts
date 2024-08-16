import { ClientCallbackOperations } from "../../shared/Messages"
import { ArcaneChargeDependent } from "../../shared/Shared"

let MageClearcasting = GetID(`Spell`, `dh-spells`, `mag-arc-clearcasting`)

let ArcaneCharge = GetID(`Spell`, `dh-spells`, `mag-arc-arcanecharge`)


export function ArcaneCharges(events: TSEvents) {
    events.Player.OnLogin((Player) => {
        Player.SetUInt(`ArcaneCharges`, 0)
        SendArcaneCharges(Player)
    })

    events.Spell.OnApply(ArcaneCharge, (Eff, App, Mode) => {
        if (App.GetTarget().IsPlayer() && Eff.GetEffectIndex() == 0) {
            let Player = App.GetTarget().ToPlayer()
            let Charges = App.GetAura().GetStackAmount()
            Player.SetUInt('ArcaneCharges', Charges)
            SendArcaneCharges(Player)
        }
    })

    events.Spell.OnRemove(ArcaneCharge, (Eff, App, Mode) => {
        if (Mode != 12) {
            let Player = App.GetTarget().ToPlayer()
            Player.SetUInt('ArcaneCharges', 0)
            SendArcaneCharges(Player)
        }
    })

    events.Spell.OnCheckCast(ArcaneChargeDependent, (Spell, Result) => {
        if (Spell.GetCaster() == null)
            return
        
        if (Spell.GetCaster().IsPlayer()) {
            let Player = Spell.GetCaster().ToPlayer()
            Result.set(Player.GetUInt(`ArcaneCharges`, 0) > 0 ? 255 : 78)
        }    
    })

    events.Spell.OnApply(MageClearcasting, (Eff, App, Mode) => {
        if(App.GetTarget().IsPlayer()) {
            let Player = App.GetTarget().ToPlayer()
            Player.SetUInt(`MageClearcasting`, 1)
            SendMageClearCasting(Player)
        }
    })

    events.Spell.OnRemove(MageClearcasting, (Eff, App, Mode) => {
        if(App.GetTarget().IsPlayer()) {
            let Player = App.GetTarget().ToPlayer()
            Player.SetUInt(`MageClearcasting`, 0)
            SendMageClearCasting(Player)
        }
    })
}

function SendArcaneCharges(Player: TSPlayer) {
    if (Player.IsInWorld()) {
        let packet = CreateCustomPacket(ClientCallbackOperations.ARCANE_CHARGES, 0);
        packet.WriteUInt8(Player.GetUInt(`ArcaneCharges`))
        packet.SendToPlayer(Player)
    }
}

function SendMageClearCasting(Player: TSPlayer) {
    if (Player.IsInWorld()) {
        let packet = CreateCustomPacket(ClientCallbackOperations.MAGE_CLEARCASTING, 0);
        packet.WriteUInt8(Player.GetUInt(`MageClearcasting`))
        packet.SendToPlayer(Player)
    }
}