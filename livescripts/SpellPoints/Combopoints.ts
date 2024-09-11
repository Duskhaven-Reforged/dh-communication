import { ClientCallbackOperations } from "../../shared/Messages"

let Finishers : TSArray<uint32> = TAG(`dh-spells`, `combo-finisher`)
let Generators : TSArray<uint32> = TAG(`dh-spells`, `combo-generator`)

// rogue
let OneComboPoint = GetID(`Spell`, `dh-spells`, `rog-cor-freecombopoint`)
let SliceAndDice = GetID(`Spell`, `dh-spells`, `rog-gen-sliceanddice`)
let CutToTheChase = GetID(`Spell`, `dh-spells`, `rog-ass-cuttothechase`)
let FastHands = GetID(`Spell`, `dh-spells`, `rog-ass-fasthands`)
let Shiv = GetID(`Spell`, `dh-spells`, `rog-gen-shiv`)
let Swashbuckling = GetID(`Spell`, `dh-spells`, `rog-gen-swashbuckling`)
let SwashCDR = GetID(`Spell`, `dh-spells`, `rog-gen-swashcdr`)
// druid
let CatForm = GetID(`Spell`, `dh-spells`, `dru-gen-catform`)
let GoldrinnsFury = GetID(`Spell`, `dh-spells`, `dru-gen-goldrinnsfury`)
let UnendingOnslaught = GetID(`Spell`, `dh-spells`, `dru-fer-unendingonslaught`)
let PredatorySwiftness = GetID(`Spell`, `dh-spells`, `dru-fer-predatoryswiftness`)
let FreeRegrowth = GetID(`Spell`, `dh-spells`, `dru-fer-freeregrowth`)
let SuddenAmbush = GetID(`Spell`, `dh-spells`, `dru-fer-suddenambush`)
let SuddenAmbushBonus = GetID(`Spell`, `dh-spells`, `dru-fer-suddenambushbonus`)
export function ComboPoints(events: TSEvents) {
    events.Player.OnLogin((Player) => {
        Player.SetUInt(`ComboPoints`, 0)

        if (Player.GetClass() === Class.DRUID) {
            Player.SetUInt(`ShapeshiftForm`, 0)

            if (Player.HasAura(CatForm))
                Player.SetUInt(`ShapeshiftForm`, 1)

            SendShapeshiftForm(Player)
        }

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
        if (Spell.GetCaster() == null)
            return
        
        if (Spell.GetCaster().IsPlayer()) {
            let Player = Spell.GetCaster().ToPlayer()
            Result.set(Player.GetUInt(`ComboPoints`, 0) > 0 ? 255 : 78)
        }    
    })

    events.Spell.OnAfterCast(Generators, (Spell) => {
        Spell.GetCaster().CastSpell(Spell.GetCaster(), OneComboPoint, true)
    })

    events.Spell.OnAfterHit(Finishers, (Spell, Cancel) => {
        if (Spell.GetCaster().IsPlayer()) {
            let Player = Spell.GetCaster().ToPlayer()
            let Spent = Player.GetUInt(`ComboPoints`)
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
            } else if (Player.GetClass() == Class.ROGUE) {
                if (Player.HasAura(SliceAndDice) && Player.HasAura(CutToTheChase)) {
                    let CTTC = Player.GetAura(CutToTheChase)
                    let SND = Player.GetAura(SliceAndDice)
    
                    let Time = CTTC.GetEffect(0).GetAmount() * Spent
                    SND.SetMaxDuration(SND.GetMaxDuration() + Time)
                    SND.SetDuration(SND.GetDuration() + Time)
                }

                if (Player.HasAura(FastHands)) {
                    let Pct = Spent * Player.GetAura(CutToTheChase).GetEffect(0).GetAmount()
                    if (Player.RollChance(Pct)) {
                        Player.ModifyCooldown(Shiv, -2000)
                    }
                }

                if (Player.HasAura(Swashbuckling) && Spent >= 5) {
                    Player.CastSpell(Player, SwashCDR, true)
                }
            }

            Player.SetUInt(`ComboPoints`, 0)
            SendComboPoints(Player)
        }    
    })

    events.Spell.OnApply(CatForm, (Eff, App, Mode) => {
        if (Eff.GetCaster().IsPlayer()) {
            if (Eff.GetEffectIndex() === 0) {
                let Player = Eff.GetCaster().ToPlayer()
                Player.SetUInt(`ShapeshiftForm`, 1)
                SendShapeshiftForm(Player)
            }
        }
    })

    events.Spell.OnRemove(CatForm, (Eff, App, Mode) => {
        if (Eff.GetCaster().IsPlayer()) {
            if (Eff.GetEffectIndex() === 0) {
                let Player = Eff.GetCaster().ToPlayer()
                Player.SetUInt(`ShapeshiftForm`, 0)
                SendShapeshiftForm(Player)
            }
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

function SendShapeshiftForm(Player: TSPlayer) {
    if (Player.IsInWorld()) {
        let packet = CreateCustomPacket(ClientCallbackOperations.SHAPESHIFT_FORM, 0);
        packet.WriteUInt8(Player.GetUInt(`ShapeshiftForm`))
        packet.SendToPlayer(Player)
    }
}
