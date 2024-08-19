
class SpecMastery {
    RatingConversion : float = 0
    X: float = 0
    Y: float = 0
    Z: float = 0
}



@CharactersTable
class MasteryData extends DBEntry {
    @DBPrimaryKey
    PlayerGuid: uint64 = 0

    @DBField
    GearRating: uint32 = 0
    @DBField
    AuraRating: uint32 = 0
    @DBField
    AuraPercent: float = 0

    constructor(Player: uint64) {
        super()
        this.PlayerGuid = Player
    }

    static get(Player: TSPlayer): MasteryData {
        return Player.GetObject(`MasteryData`, LoadDBEntry(new MasteryData(Player.GetGUID().GetCounter())))
    }
}

// let MasteryRatingSpells0 : TSArray<uint32> = TAG(`dh-spells`, 'mod-mastery-rating-eff0')
// let MasteryRatingSpells1 : TSArray<uint32> = TAG(`dh-spells`, 'mod-mastery-rating-eff1')
// let MasteryRatingSpells2 : TSArray<uint32> = TAG(`dh-spells`, 'mod-mastery-rating-eff2')
let MasteryPctSpells0 : TSArray<uint32> = TAG(`dh-spells`, 'mod-mastery-flatpct-eff0')
let MasteryPctSpells1 : TSArray<uint32> = TAG(`dh-spells`, 'mod-mastery-flatpct-eff1')
// let MasteryPctSpells2 : TSArray<uint32> = TAG(`dh-spells`, 'mod-mastery-flatpct-eff2')

export function MasteryStatScripts(events: TSEvents) {
    events.Player.OnLogin((Player) => {
        MasteryData.get(Player)
    })

    events.Player.OnUpdateMasteryRating((Player, Rating) => {
        let Mastery = MasteryData.get(Player)
        Mastery.GearRating = Rating
    })

    // flat pct mods
    events.Spell.OnApply(MasteryPctSpells0, (Eff, App, Mode) => {
        if (App.GetTarget().IsPlayer() && Eff.GetEffectIndex() == 0) {
            let Player = App.GetTarget().ToPlayer()
            let Mastery = MasteryData.get(Player)
            Mastery.AuraPercent += Eff.GetAmount()   
            Mastery.Save()
        }
    })
    events.Spell.OnApply(MasteryPctSpells1, (Eff, App, Mode) => {
        if (App.GetTarget().IsPlayer() && Eff.GetEffectIndex() == 1) {
            let Player = App.GetTarget().ToPlayer()
            let Mastery = MasteryData.get(Player)
            Mastery.AuraPercent += Eff.GetAmount()            
            Mastery.Save()
        }
    })
    // events.Spell.OnApply(MasteryPctSpells2, (Eff, App, Mode) => {
    //     if (App.GetTarget().IsPlayer() && Eff.GetEffectIndex() == 2) {
    //         let Player = App.GetTarget().ToPlayer()
    //         let Mastery = MasteryData.get(Player)
    //         Mastery.AuraPercent += Eff.GetAmount()            
    //         Mastery.Save()
    //     }
    // })

    events.Spell.OnRemove(MasteryPctSpells0, (Eff, App, Mode) => {
        if (App.GetTarget().IsPlayer() && Mode != 12 && Eff.GetEffectIndex() == 0) {
            let Player = App.GetTarget().ToPlayer()
            let Mastery = MasteryData.get(Player)
            Mastery.AuraPercent -= Eff.GetAmount()
            Mastery.Save()
        }
    })
    events.Spell.OnRemove(MasteryPctSpells1, (Eff, App, Mode) => {
        if (App.GetTarget().IsPlayer() && Mode != 12 && Eff.GetEffectIndex() == 1) {
            let Player = App.GetTarget().ToPlayer()
            let Mastery = MasteryData.get(Player)
            Mastery.AuraPercent -= Eff.GetAmount()
            Mastery.Save()
        }
    })
    // events.Spell.OnRemove(MasteryPctSpells2, (Eff, App, Mode) => {
    //     if (App.GetTarget().IsPlayer() && Mode != 12 && Eff.GetEffectIndex() == 2) {
    //         let Player = App.GetTarget().ToPlayer()
    //         let Mastery = MasteryData.get(Player)
    //         Mastery.AuraPercent -= Eff.GetAmount()
    //         Mastery.Save()
    //     }
    // })

    // Rating mods
    // events.Spell.OnApply(MasteryRatingSpells0, (Eff, App, Mode) => {
    //     if (App.GetTarget().IsPlayer() && Eff.GetEffectIndex() == 0) {
    //         let Player = App.GetTarget().ToPlayer()
    //         let Mastery = MasteryData.get(Player)
    //         Mastery.AuraRating += Eff.GetAmount()            
    //         Mastery.Save()
    //     }
    // })
    // events.Spell.OnApply(MasteryRatingSpells1, (Eff, App, Mode) => {
    //     if (App.GetTarget().IsPlayer() && Eff.GetEffectIndex() == 1) {
    //         let Player = App.GetTarget().ToPlayer()
    //         let Mastery = MasteryData.get(Player)
    //         Mastery.AuraRating += Eff.GetAmount()            
    //         Mastery.Save()
    //     }
    // })
    // events.Spell.OnApply(MasteryRatingSpells2, (Eff, App, Mode) => {
    //     if (App.GetTarget().IsPlayer() && Eff.GetEffectIndex() == 2) {
    //         let Player = App.GetTarget().ToPlayer()
    //         let Mastery = MasteryData.get(Player)
    //         Mastery.AuraRating += Eff.GetAmount()            
    //         Mastery.Save()
    //     }
    // })

    // events.Spell.OnRemove(MasteryRatingSpells0, (Eff, App, Mode) => {
    //     if (App.GetTarget().IsPlayer() && Mode != 12 && Eff.GetEffectIndex() == 0) {
    //         let Player = App.GetTarget().ToPlayer()
    //         let Mastery = MasteryData.get(Player)
    //         Mastery.AuraRating -= Eff.GetAmount()
    //         Mastery.Save()
    //     }
    // })
    // events.Spell.OnRemove(MasteryRatingSpells1, (Eff, App, Mode) => {
    //     if (App.GetTarget().IsPlayer() && Mode != 12 && Eff.GetEffectIndex() == 1) {
    //         let Player = App.GetTarget().ToPlayer()
    //         let Mastery = MasteryData.get(Player)
    //         Mastery.AuraRating -= Eff.GetAmount()
    //         Mastery.Save()
    //     }
    // })
    // events.Spell.OnRemove(MasteryRatingSpells2, (Eff, App, Mode) => {
    //     if (App.GetTarget().IsPlayer() && Mode != 12 && Eff.GetEffectIndex() == 2) {
    //         let Player = App.GetTarget().ToPlayer()
    //         let Mastery = MasteryData.get(Player)
    //         Mastery.AuraRating -= Eff.GetAmount()
    //         Mastery.Save()
    //     }
    // })
}