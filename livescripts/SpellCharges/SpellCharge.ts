import { ClientCallbackOperations } from "../../shared/Messages"

export class SpellChargeInfo {
    SpellId: uint32 = 0
    RequiresSpell: uint32 = 0
    BaseCharges: uint8 = 0
    Cooldown: uint32 = 0

    constructor(SpellId: uint32, Requires: uint32, Base: uint8, Cooldown: uint32) {
        this.SpellId = SpellId
        this.RequiresSpell = Requires
        this.BaseCharges = Base
        this.Cooldown = Cooldown
    }
}

export let wSpellCharges : TSDictionary<uint32, SpellChargeInfo> = CreateDictionary<uint32, SpellChargeInfo>({
    [GetID(`Spell`, `dh-spells`, `mag-fir-fireblast`)]: new SpellChargeInfo(GetID(`Spell`, `dh-spells`, `mag-fir-fireblast`), 0, 2, 12000),
    [GetID(`Spell`, `dh-spells`, `pal-holy-holyshock`)]: new SpellChargeInfo(GetID(`Spell`, `dh-spells`, `pal-holy-holyshock`), 0, 2, 6000),
    [GetID(`Spell`, `dh-spells`, `mag-gen-managem`)]: new SpellChargeInfo(GetID(`Spell`, `dh-spells`, `mag-gen-managem`), 0, 3, 120000),
    [GetID(`Spell`, `dh-spells`, `mag-fir-livingbomb`)]: new SpellChargeInfo(GetID(`Spell`, `dh-spells`, `mag-fir-livingbomb`), 0, 2, 20000),
    [GetID(`Spell`, `dh-spells`, `mag-fro-flurry`)]: new SpellChargeInfo(GetID(`Spell`, `dh-spells`, `mag-fro-flurry`), 0, 2, 30000),
    [GetID(`Spell`, `dh-spells`, `warr-gen-shieldblock`)]: new SpellChargeInfo(GetID(`Spell`, `dh-spells`, `warr-gen-shieldblock`), 0, 1, 40000),
    [GetID(`Spell`, `dh-spells`, `pal-ret-divinestorm`)]: new SpellChargeInfo(GetID(`Spell`, `dh-spells`, `pal-ret-divinestorm`), 0, 1, 10000),
    [GetID(`Spell`, `dh-spells`, `pri-gen-mindblast`)]: new SpellChargeInfo(GetID(`Spell`, `dh-spells`, `pri-gen-mindblast`), 0, 2, 9000),
    [GetID(`Spell`, `dh-spells`, `sha-gen-lavaburst`)]: new SpellChargeInfo(GetID(`Spell`, `dh-spells`, `sha-gen-lavaburst`), 0, 2, 8000),
    [GetID(`Spell`, `dh-spells`, `hun-gen-killcommand`)]: new SpellChargeInfo(GetID(`Spell`, `dh-spells`, `hun-gen-killcommand`), 0, 2, 10000),
    [GetID(`Spell`, `dh-spells`, `hun-bm-barbedshot`)]: new SpellChargeInfo(GetID(`Spell`, `dh-spells`, `hun-bm-barbedshot`), 0, 2, 8000),
})

export class CharacterSpellChargeInfo extends TSClass {
    guid: uint64 = 0
    SpellId: uint32 = 0
    Current: uint8 = 0
    Max: uint8 = 0
    CD: uint32 = 0
    EffectiveCD: int32 = 0

    constructor(Player: TSPlayer, Spell: uint32, Current: uint8, Max: uint8, CD: uint32 ) {
        super()
        this.guid = Player.GetGUID().GetCounter()
        this.SpellId = Spell
        this.Current = Current
        this.Max = Max
        this.EffectiveCD = CD
    }
}

export class SpellChargeHandler {
    public Load(Player: TSPlayer) : bool {
        let Found = false
        let GUID : uint64 = Player.GetGUID().GetCounter()
        const res = QueryCharacters(`select * from \`characterspellcharges\` where guid = ${GUID}`)
        while (res.GetRow()) {  
            let Spell: uint32 = res.GetUInt32(1)
            let Current: uint8 = res.GetUInt8(2)
            let Max: uint8 = res.GetUInt8(3)
            let CD: uint32 = res.GetUInt32(4)

            let Info = new CharacterSpellChargeInfo(Player, Spell, Current, Max, CD)
            Found = true
        }
        return Found
    }

    public NewCharge(Player: TSPlayer, Spell: uint32) : CharacterSpellChargeInfo {
        console.log(Spell, '\n')
        let Base = wSpellCharges[Spell]
        console.log(Base, '\n')
        let Info = new CharacterSpellChargeInfo(Player, Spell, 0, Base.BaseCharges, Base.Cooldown)
        this.Calc(Player, Info)
        return Player.GetObject(`SpellCharge:${Spell}`, Info)
    }

    public Save(Player: TSPlayer, Charges: CharacterSpellChargeInfo) {
        let GUID : uint64 = Player.GetGUID().GetCounter()
        Player.SetObject(`SpellCharge:${Charges.SpellId}`, Charges)
        QueryCharacters(`REPLACE INTO \`characterspellcharges\` (\`guid\`, \`spell\`, \`current\`, \`max\`, \`cd\`) VALUES (${GUID}, ${Charges.SpellId}, ${Charges.Current}, ${Charges.Max}, ${Charges.EffectiveCD});`)
    }

    public Delete(Player: TSPlayer, Spell: uint32) {
        let GUID : uint64 = Player.GetGUID().GetCounter()
        QueryCharactersAsync(`DELETE FROM \`characterspellcharges\` where guid = ${GUID} and spell = ${Spell}`)
    }

    public Calc(Player: TSPlayer, Charge: CharacterSpellChargeInfo) {
        Charge.EffectiveCD = wSpellCharges[Charge.SpellId].Cooldown
        Charge.Max = wSpellCharges[Charge.SpellId].BaseCharges
        console.log(Charge.SpellId, ' Learned with Charges \n')
        ModChargeCD.forEach((Spell) => {
            if (Player.HasAura(Spell)) {
                let Info = GetSpellInfo(Spell).GetEffect(0).GetTriggerSpell()
                if (Charge.SpellId == Info) {
                    let CDR : int32 = Player.GetAura(Spell).GetEffect(0).GetAmount()
                    Charge.EffectiveCD += CDR
                }
            }
        })
        ModChargeMax.forEach((Spell) => {
            if (Player.HasAura(Spell)) {
                let Info = GetSpellInfo(Spell).GetEffect(0).GetTriggerSpell()
                if (Charge.SpellId == Info) {
                    let Max : int32 = Player.GetAura(Spell).GetEffect(0).GetAmount()
                    Charge.Max += Max
                }
            }
        })

        this.Save(Player, Charge)
    }
}

export const ChargeMgr = new SpellChargeHandler()

export let cSpellCharges : TSDictionary<uint64, TSDictionary<uint32, CharacterSpellChargeInfo>> = CreateDictionary<uint64, TSDictionary<uint32, CharacterSpellChargeInfo>>({})

export let SpellsWithCharges : TSArray<uint32> = TAG(`dh-spells`, 'has-charges')
let AddsACharge : TSArray<uint32> = TAG(`dh-spells`, 'add-charge-on-apply')
export let ModChargeCD : TSArray<uint32> = TAG(`dh-spells`, 'modify-base-charge-cd')
export let ModChargeMax : TSArray<uint32> = TAG(`dh-spells`, 'modify-base-charge-max')

let BrainFreeze = GetID(`Spell`, `dh-spells`, `mag-fro-brainfreezeamp`)
let Flurry = GetID(`Spell`, `dh-spells`, `mag-fro-flurry`)
let SpellChargeDurationRefunds : TSArray<uint32> = TAG(`dh-spells`, `charge-duration-refund`)
export function HandleSpellCharge(events: TSEvents) {
    events.Player.OnLogin((Player) => {
        if (!ChargeMgr.Load(Player)) {
            SpellsWithCharges.forEach((Spell) => {
                let Base = wSpellCharges[Spell]
                let Charge = new CharacterSpellChargeInfo(Player, Spell, 0, Base.BaseCharges, Base.Cooldown)
                Player.SetObject(`SpellCharge:${Spell}`, Charge)
            })
        }
        SpellsWithCharges.forEach((Spell) => {
            if (Player.HasSpell(Spell)) {
                StartCD(Player, wSpellCharges[Spell])
            }
        })
    })

    events.Spell.OnLearn(SpellsWithCharges, (SpellInfo, Player) => {
        let Spell = SpellInfo.GetEntry()
        if (Player.IsInWorld())
            ChargeMgr.Calc(Player, Player.GetObject(`SpellCharge:${Spell}`, ChargeMgr.NewCharge(Player, Spell)))
    })

    events.Spell.OnUnlearn(SpellsWithCharges, (SpellInfo, Player) => {
        let Spell = SpellInfo.GetEntry()
        ChargeMgr.Delete(Player, Spell)
    })

    events.Spell.OnCheckCast(SpellsWithCharges, (Spell, Result) => {
        if (Spell.GetCaster() == null)
            Result.set(67)
        else if (Spell.GetCaster().IsPlayer()) {
            let SpellId: uint32 = Spell.GetEntry()
            let Player = Spell.GetCaster().ToPlayer()
            let ChargeInfo = Player.GetObject(`SpellCharge:${SpellId}`, ChargeMgr.NewCharge(Player, SpellId))
            Result.set(ChargeInfo.Current > 0 ? 255 : 67)
            return
        }
        Result.set(67)
    })

    events.Spell.OnAfterCast(SpellsWithCharges, (Spell) => {
        if (Spell.GetCaster() == null)
            return

        if (Spell.GetCaster().IsPlayer()) {
            let SpellId: uint32 = Spell.GetEntry()
            let Player = Spell.GetCaster().ToPlayer()
            let ChargeInfo = Player.GetObject(`SpellCharge:${SpellId}`, ChargeMgr.NewCharge(Player, SpellId))
            ChargeInfo.Current -= 1
            ChargeMgr.Save(Player, ChargeInfo)
            StartCD(Player, wSpellCharges[Spell.GetEntry()])
        }
    })

    events.Spell.OnApply(AddsACharge,  (Eff, App, Mode) => {
        if (App.GetTarget().IsPlayer()) {
            let SpellId: uint32  = Eff.GetSpellInfo().GetEntry()
            let ChargedSpell = 0
            if (SpellId == BrainFreeze)
                ChargedSpell = Flurry

            if (ChargedSpell > 0) {
                let Caster = App.GetTarget().ToPlayer()
                if (Caster.HasSpell(ChargedSpell)) {
                    let ChargeInfo = Caster.GetObject(`SpellCharge:${ChargedSpell}`, ChargeMgr.NewCharge(Caster, ChargedSpell))
                    if (ChargeInfo.Current < ChargeInfo.Max) {
                        ChargeInfo.Current += 1
                        ChargeMgr.Save(Caster, ChargeInfo)
                        let BaseChargeData = wSpellCharges[ChargedSpell]
                        StartCD(Caster, BaseChargeData)
                    }
                }
            }
        }
    })

    events.Spell.OnApply(ModChargeCD, (E, App) => {
        let Player = App.GetTarget().ToPlayer()
        if (Player.IsInWorld()) {
            let ChargeSpell : uint32 = E.GetSpellInfo().GetEffect(0).GetTriggerSpell()
            ChargeMgr.Calc(Player, Player.GetObject(`SpellCharge:${ChargeSpell}`, ChargeMgr.NewCharge(Player, ChargeSpell)))
        }
    })

    events.Spell.OnRemove(ModChargeCD, (E, App) => {
        let Player = App.GetTarget().ToPlayer()
        if (Player.IsInWorld()) {
            let ChargeSpell : uint32 = E.GetSpellInfo().GetEffect(0).GetTriggerSpell()
            ChargeMgr.Calc(Player, Player.GetObject(`SpellCharge:${ChargeSpell}`, ChargeMgr.NewCharge(Player, ChargeSpell)))
        }
    })

    events.Spell.OnApply(ModChargeMax, (E, App) => {
        let Player = App.GetTarget().ToPlayer()
        if (Player.IsInWorld()) {
            let ChargeSpell : uint32 = E.GetSpellInfo().GetEffect(0).GetTriggerSpell()
            ChargeMgr.Calc(Player, Player.GetObject(`SpellCharge:${ChargeSpell}`, ChargeMgr.NewCharge(Player, ChargeSpell)))
        }
    })

    events.Spell.OnRemove(ModChargeMax, (E, App) => {
        let Player = App.GetTarget().ToPlayer()
        if (Player.IsInWorld()) {
            let ChargeSpell : uint32 = E.GetSpellInfo().GetEffect(0).GetTriggerSpell()
            ChargeMgr.Calc(Player, Player.GetObject(`SpellCharge:${ChargeSpell}`, ChargeMgr.NewCharge(Player, ChargeSpell)))
        }
    })

    events.Player.OnActionButtonSet((Player, Button, Action, Type) => {
        let Packet = CreateCustomPacket(ClientCallbackOperations.SPELLCHARGE_MOVE, 0)
        Packet.WriteDouble(1)
        Packet.WriteUInt8(Button)
        Packet.WriteUInt32(Action)
        Packet.SendToPlayer(Player)
    })

    events.Player.OnActionButtonDelete((Player, Button, Action, Type) => {
        let Packet = CreateCustomPacket(ClientCallbackOperations.SPELLCHARGE_MOVE, 0)
        Packet.WriteDouble(0)
        Packet.WriteUInt8(Button)
        Packet.WriteUInt32(Action)
        Packet.SendToPlayer(Player)
    })

    events.Spell.OnCast(SpellChargeDurationRefunds, (Spell) => {
        if (Spell.GetCaster().IsPlayer()) {
            let Player = Spell.GetCaster().ToPlayer()
            let Effect = Spell.GetSpellInfo().GetEffect(0)
            let ChargeSpell : uint32 = Effect.GetTriggerSpell()
            let TimerName = `ChargeTimer:${ChargeSpell}`
            let Mod : int32 = Effect.GetBasePoints()
            if (Player.GetBool(TimerName, false)) {
                let Rem : int64 = Math.max(0, Player.ModNamedTimer(TimerName, Mod))
                let ChargeInfo = Player.GetObject(`SpellCharge:${ChargeSpell}`, ChargeMgr.NewCharge(Player, ChargeSpell))
                ChargeInfo.CD = Rem
                ChargeMgr.Save(Player, ChargeInfo)
                StartCD(Player, wSpellCharges[ChargeSpell])
            }
        }
    })
}

function StartCD(Player: TSPlayer, BaseCharge: SpellChargeInfo) {
    let CharChargeInfo = Player.GetObject(`SpellCharge:${BaseCharge.SpellId}`, ChargeMgr.NewCharge(Player, BaseCharge.SpellId))
    let Timer = CharChargeInfo.EffectiveCD
    let Current = CharChargeInfo.Current

    let TimerName = `ChargeTimer:${BaseCharge.SpellId}`
    let HasTimer = Player.GetBool(TimerName, false)
    if (Current < CharChargeInfo.Max && !HasTimer) {
        CharChargeInfo.CD = Timer
        Player.SetBool(TimerName, true)
        Player.AddNamedTimer(TimerName, Timer, (Player, TSTimer) => {
            FinishCD(Player.ToPlayer(), BaseCharge)
        })
    } else if (Current == CharChargeInfo.Max && HasTimer) {
        Player.StopNamedTimer(TimerName)
        CharChargeInfo.CD = 0
        Player.SetBool(TimerName, false)
    }
    ChargeMgr.Save(Player, CharChargeInfo)
    SendChargeData(Player, CharChargeInfo.SpellId)
}

function FinishCD(Player: TSPlayer, BaseCharge: SpellChargeInfo) {
    let CharChargeInfo = Player.GetObject(`SpellCharge:${BaseCharge.SpellId}`, ChargeMgr.NewCharge(Player, BaseCharge.SpellId))
    CharChargeInfo.CD = 0
    CharChargeInfo.Current += 1
    
    ChargeMgr.Save(Player, CharChargeInfo)
    Player.SetBool(`ChargeTimer:${BaseCharge.SpellId}`, false)
    StartCD(Player, BaseCharge)
}

function SendChargeData(Player: TSPlayer, Spell: uint32) {
    let ChargeData = Player.GetObject(`SpellCharge:${Spell}`, ChargeMgr.NewCharge(Player, Spell))
    let Payload = CreateCustomPacket(ClientCallbackOperations.SPELLCHARGE, 0)
    Payload.WriteInt32(ChargeData.SpellId)
    Payload.WriteInt8(ChargeData.Current)
    Payload.WriteInt8(ChargeData.Max)
    Payload.WriteUInt32(ChargeData.CD)
    Payload.SendToPlayer(Player)
}