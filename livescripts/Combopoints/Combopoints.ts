import { ClientCallbackOperations } from "../../shared/Messages"

let Finishers : TSArray<uint32> = TAG(`dh-spells`, `combo-finisher`)

// druid
let GoldrinnsFury = GetID(`Spell`, `dh-spells`, `dru-gen-goldrinnsfury`)
let UnendingOnslaught = GetID(`Spell`, `dh-spells`, `dru-fer-unendingonslaught`)
let PredatorySwiftness = GetID(`Spell`, `dh-spells`, `dru-fer-predatoryswiftness`)
let FreeRegrowth = GetID(`Spell`, `dh-spells`, `dru-fer-freeregrowth`)
let SuddenAmbush = GetID(`Spell`, `dh-spells`, `dru-fer-suddenambush`)
let SuddenAmbushBonus = GetID(`Spell`, `dh-spells`, `dru-fer-suddenambushbonus`)
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
            Result.set(Player.GetUInt(`ComboPoints`, 0) > 0 ? 255 : 78)
        }    
    })

    events.Spell.OnAfterHit(Finishers, (Spell, Cancel) => {
        if (Spell.GetCaster().IsPlayer()) {
            let Player = Spell.GetCaster().ToPlayer()
            let Spent = Player.GetUInt(`ComboPoints`)
            console.log(Spent)
            if (Player.GetClass() == Class.DRUID) {
                if (Player.HasAura(GoldrinnsFury) && Player.HasAura(UnendingOnslaught)) {
                    let Onslaught = Player.GetAura(UnendingOnslaught)
                    let Fury = Player.GetAura(GoldrinnsFury)
    
                    let Time = Onslaught.GetEffect(0).GetAmount() * Spent
                    Fury.SetMaxDuration(Fury.GetMaxDuration() + Time)
                    Fury.SetDuration(Fury.GetDuration() + Time)
                }

                if (Player.HasAura(PredatorySwiftness)) {
                    let Pct = Spent * Player.GetAura(PredatorySwiftness).GetEffect(0).GetAmount()
                    if (Player.RollChance(Pct)) {
                        Player.CastSpell(Player, FreeRegrowth, true)
                    }
                }

                if (Player.HasAura(SuddenAmbush)) {
                    let Pct = Spent * Player.GetAura(SuddenAmbush).GetEffect(0).GetAmount()
                    if (Player.RollChance(Pct)) {
                        Player.CastSpell(Player, SuddenAmbushBonus, true)
                    }
                }
            }

            Player.SetUInt(`ComboPoints`, 0)
            SendComboPoints(Player)
        }    
    })
}

function SendComboPoints(Player: TSPlayer) {
    if (Player.IsInWorld()) {
        let packet = CreateCustomPacket(ClientCallbackOperations.COMBOPOINTS, 0);
        packet.WriteUInt8(Player.GetUInt(`ComboPoints`))
        packet.SendToPlayer(Player)
    }
}