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
})

@CharactersTable
export class CharacterSpellChargeInfo extends DBEntry {
    @DBPrimaryKey
    guid: uint64 = 0
    @DBPrimaryKey
    SpellId: uint32 = 0
    @DBField
    Current: uint8 = 0
    @DBField
    Max: uint8 = 0
    @DBField
    CD: uint32 = 0

    constructor(Player: TSPlayer, Spell: uint32) {
        super()
        this.guid = Player.GetGUID().GetCounter()
        this.SpellId = Spell
    }

    static get(Player: TSPlayer, Spell: uint32) : CharacterSpellChargeInfo {
        return Player.GetObject(`SpellCharges:${Spell}`, LoadDBEntry(new CharacterSpellChargeInfo(Player, Spell).Calc()))
    }

    public Calc() : CharacterSpellChargeInfo {
        let Base = wSpellCharges[this.SpellId]
        this.Max = Base.BaseCharges
        this.Save()
        return this
    }
}

export let cSpellCharges : TSDictionary<uint64, TSDictionary<uint32, CharacterSpellChargeInfo>>

let SpellsWithCharges : TSArray<uint32> = TAG(`dh-spells`, 'has-charges')
let AddsACharge : TSArray<uint32> = TAG(`dh-spells`, 'add-charge-on-apply')

function LoadCharacterSpellCharges(Player: TSPlayer) {
    wSpellCharges.forEach((Spell) => {
        if (Player.HasSpell(Spell)) {
            LoadCharacterChargesForSpell(Player, Spell)
        }
    })
}

function LoadCharacterChargesForSpell(Player: TSPlayer, Spell: uint32) : CharacterSpellChargeInfo {
    if (wSpellCharges.contains(Spell)) {
        let BaseChargeData = wSpellCharges[Spell]
        let ChargeData = CharacterSpellChargeInfo.get(Player, Spell)

        if (ChargeData.Current < ChargeData.Max)
            StartCD(Player, BaseChargeData, ChargeData)
        else
            SendChargeData(Player, Spell, ChargeData)

        return ChargeData
    }
    return new CharacterSpellChargeInfo(Player, 0)
}

let BrainFreeze = GetID(`Spell`, `dh-spells`, `mag-fro-brainfreezeamp`)
let Flurry = GetID(`Spell`, `dh-spells`, `mag-fro-flurry`)
let SpellChargeDurationRefunds : TSArray<uint32> = TAG(`dh-spells`, `charge-duration-refund`)
export function SpellChargeHandler(events: TSEvents) {
    events.Spell.OnLearn(SpellsWithCharges, (SpellInfo, Player) => {
        LoadCharacterChargesForSpell(Player, SpellInfo.GetEntry())
    })
    
    events.Spell.OnUnlearn(SpellsWithCharges, (SpellInfo, Player) => {
        CharacterSpellChargeInfo.get(Player, SpellInfo.GetEntry()).Delete()
    })

    events.Spell.OnCheckCast(SpellsWithCharges, (Spell, Result) => {
        if (Spell.GetCaster() == null)
            Result.set(67)
        else if (Spell.GetCaster().IsPlayer()) {
            let Player = Spell.GetCaster().ToPlayer()
            let ChargeInfo = CharacterSpellChargeInfo.get(Player, Spell.GetEntry())
            Result.set(ChargeInfo.Current > 0 ? 255 : 67)
            return
        }
        Result.set(67)
    })

    events.Spell.OnAfterCast(SpellsWithCharges, (Spell) => {
        if (Spell.GetCaster() == null)
            return

        if (Spell.GetCaster().IsPlayer()) {
            let Player = Spell.GetCaster().ToPlayer()
            let ChargeInfo = CharacterSpellChargeInfo.get(Player, Spell.GetEntry())
            ChargeInfo.Current -= 1
            ChargeInfo.Save()
            StartCD(Player, wSpellCharges[Spell.GetEntry()], ChargeInfo)
        }
    })

    events.Spell.OnApply(AddsACharge,  (Eff, App, Mode) => {
        if (App.GetTarget().IsPlayer()) {
            let SpellId  = Eff.GetSpellInfo().GetEntry()
            let ChargedSpell = 0
            if (SpellId == BrainFreeze)
                ChargedSpell = Flurry

            if (SpellId > 0) {
                let Caster = App.GetTarget().ToPlayer()
                let ChargeInfo = CharacterSpellChargeInfo.get(Caster, ChargedSpell)
                if (ChargeInfo.Current < ChargeInfo.Max) {
                    ChargeInfo.Current += 1
                    ChargeInfo.Save()
                    let BaseChargeData = wSpellCharges[ChargedSpell]
                    StartCD(Caster, BaseChargeData, ChargeInfo)
                }
            }
        }
    })

    events.CustomPacket.OnReceive(ClientCallbackOperations.SPELLCHARGE, (Op, Packet, Player) => {
        LoadCharacterSpellCharges(Player)
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
                let ChargeInfo = CharacterSpellChargeInfo.get(Player, ChargeSpell)
                ChargeInfo.CD = Rem
                ChargeInfo.Save()
                StartCD(Player, wSpellCharges[ChargeSpell], ChargeInfo)
            }
        }
    })
}

function StartCD(Player: TSPlayer, BaseCharge: SpellChargeInfo, CharChargeInfo: CharacterSpellChargeInfo) {
    let Timer = BaseCharge.Cooldown
    let Current = CharChargeInfo.Current

    let TimerName = `ChargeTimer:${BaseCharge.SpellId}`
    let HasTimer = Player.GetBool(TimerName, false)
    if (Current < CharChargeInfo.Max && !HasTimer) {
        CharChargeInfo.CD = Timer
        Player.SetBool(TimerName, true)
        Player.AddNamedTimer(TimerName, Timer, (Player, TSTimer) => {
            FinishCD(Player.ToPlayer(), BaseCharge, CharChargeInfo)
        })
    } else if (Current == CharChargeInfo.Max && HasTimer) {
        Player.StopNamedTimer(TimerName)
        CharChargeInfo.CD = 0
        Player.SetBool(TimerName, false)
    }
    CharChargeInfo.Save()
    SendChargeData(Player, CharChargeInfo.SpellId, CharChargeInfo)
}

function FinishCD(Player: TSPlayer, BaseCharge: SpellChargeInfo, CharChargeInfo: CharacterSpellChargeInfo) {
    CharChargeInfo.CD = 0
    CharChargeInfo.Current += 1
    CharChargeInfo.Save()
    Player.SetBool(`ChargeTimer:${BaseCharge.SpellId}`, false)
    StartCD(Player, BaseCharge, CharChargeInfo)
}

function SendChargeData(Player: TSPlayer, Spell: uint32, ChargeData: CharacterSpellChargeInfo) {
    let Payload = CreateCustomPacket(ClientCallbackOperations.SPELLCHARGE, 0)
    Payload.WriteInt32(ChargeData.SpellId)
    Payload.WriteInt8(ChargeData.Current)
    Payload.WriteInt8(ChargeData.Max)
    Payload.WriteUInt32(ChargeData.CD)
    Payload.SendToPlayer(Player)
}