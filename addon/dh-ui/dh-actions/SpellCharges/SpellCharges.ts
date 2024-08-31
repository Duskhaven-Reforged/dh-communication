import { ClientCallbackOperations } from "../../../../shared/Messages"
import { SendCallbackToServer } from "../../dh-talent/TalentTree"

export class ChargeData {
    SpellId: uint32
    Charges: uint8
    Max: uint8
    Timer: uint32

    constructor(SpellId: uint32, Charges: uint8, Max: uint8, Timer: uint32) {
        this.SpellId = SpellId
        this.Charges = Charges
        this.Max = Max
        this.Timer = Timer
    }
}

export const ActionButtonMap = {
    [1] : 'ActionButton1', [2] : 'ActionButton2', [3] : 'ActionButton3', [4] : 'ActionButton4', [5] : 'ActionButton5', [6] : 'ActionButton6', [7] : 'ActionButton7', [8] : 'ActionButton8', [9] : 'ActionButton9', [10] : 'ActionButton10', [11] : 'ActionButton11', [12] : 'ActionButton12',
    [13] : 'ActionButton1', [14] : 'ActionButton2', [15] : 'ActionButton3', [16] : 'ActionButton4', [17] : 'ActionButton5', [18] : 'ActionButton6', [19] : 'ActionButton7', [20] : 'ActionButton8', [21] : 'ActionButton9', [22] : 'ActionButton10', [23] : 'ActionButton11', [24] : 'ActionButton12',
    [25] : 'MultiBarRightButton1', [26] : 'MultiBarRightButton2', [27] : 'MultiBarRightButton3', [28] : 'MultiBarRightButton4', [29] : 'MultiBarRightButton5', [30] : 'MultiBarRightButton6', [31] : 'MultiBarRightButton7', [32] : 'MultiBarRightButton8', [33] : 'MultiBarRightButton9', [34] : 'MultiBarRightButton10', [35] : 'MultiBarRightButton11', [36] : 'MultiBarRightButton12',
    [37] : 'MultiBarLeftButton1', [38] : 'MultiBarLeftButton2', [39] : 'MultiBarLeftButton3', [40] : 'MultiBarLeftButton4', [41] : 'MultiBarLeftButton5', [42] : 'MultiBarLeftButton6', [43] : 'MultiBarLeftButton7', [44] : 'MultiBarLeftButton8', [45] : 'MultiBarLeftButton9', [46] : 'MultiBarLeftButton10', [47] : 'MultiBarLeftButton11', [48] : 'MultiBarLeftButton12',
    [49] : 'MultiBarBottomRightButton1', [50] : 'MultiBarBottomRightButton2', [51] : 'MultiBarBottomRightButton3', [52] : 'MultiBarBottomRightButton4', [53] : 'MultiBarBottomRightButton5', [54] : 'MultiBarBottomRightButton6', [55] : 'MultiBarBottomRightButton7', [56] : 'MultiBarBottomRightButton8', [57] : 'MultiBarBottomRightButton9', [58] : 'MultiBarBottomRightButton10', [59] : 'MultiBarBottomRightButton11', [60] : 'MultiBarBottomRightButton12',
    [61] : 'MultiBarBottomLeftButton1', [62] : 'MultiBarBottomLeftButton2', [63] : 'MultiBarBottomLeftButton3', [64] : 'MultiBarBottomLeftButton4', [65] : 'MultiBarBottomLeftButton5', [66] : 'MultiBarBottomLeftButton6', [67] : 'MultiBarBottomLeftButton7', [68] : 'MultiBarBottomLeftButton8', [69] : 'MultiBarBottomLeftButton9', [70] : 'MultiBarBottomLeftButton10', [71] : 'MultiBarBottomLeftButton11', [72] : 'MultiBarBottomLeftButton12',
}

const SpellsWithCharges : TSArray<uint32> = []
const CharCharges: TSArray<ChargeData> = []
const SpellCooldownFrames = []
const ActionButtons = [
    "ActionButton",
    "BonusActionButton",
    "MultiBarBottomLeftButton",
    "MultiBarBottomRightButton",
    "MultiBarLeftButton",
    "MultiBarRightButton",
]
const ActiveCooldowns = []

export function SpellCharges() {
    function CreateChargeText(button) {
        let ChargeText = _G[button.GetName()+'ChargeText']
        
        if (!ChargeText) {
            ChargeText = button.CreateFontString(null, 'OVERLAY')
            ChargeText.SetFont("Fonts\\ARIALN.TTF", 14, "OUTLINE")
            ChargeText.SetPoint("BOTTOMRIGHT", button, "BOTTOMRIGHT", -2, 2)
            ChargeText.SetTextColor(1, 1, 1, 1)
            _G[button.GetName()+'ChargeText'] = ChargeText
        }
    }

    function GetSpellTex(SpellId) {
        const [a, b, Icon] = GetSpellInfo(SpellId)
        return Icon
    }

    function UpdateButtonCharges(Button, SpellId, Charges, Max) {
        let SpellTexture = GetSpellTex(SpellId)
        const [ActionType, Id] = GetActionInfo(Button.action)
        let ButtonTexture = GetActionTexture(Button.action)
        if (ActionType == 'spell' && ButtonTexture == SpellTexture) {
            CreateChargeText(Button)
            if (Max > 1) {
                _G[Button.GetName()+'ChargeText'].SetText(Charges)
                _G[Button.GetName()+'ChargeText'].Show()
            }
        }
    }

    function UpdateAllButtonCharges() {
        ActionButtons.forEach((prefix) => {
            for (let i = 1; i < 12; i++) {
                let Button = _G[`${prefix}${i}`]
                if (Button && HasAction(Button.action)) {
                    let [ActionType, Id] = GetActionInfo(Button.action)
                    if (ActionType == 'spell') {
                        SpellsWithCharges.forEach((Spell) => {
                            let ChargeData = CharCharges[Spell]
                            let Charges = ChargeData.Charges
                            let Texture = GetSpellTex(ChargeData.SpellId)
                            let ButtonTexture = GetActionTexture(Button.action)
                            if (ButtonTexture == Texture)
                                UpdateButtonCharges(Button, ChargeData.SpellId, Charges, ChargeData.Max)
                        })
                    }
                }
            }
        })
    }

    function UpdateSpellCharges(SpellId, Cooldown, Current, Max, StartTime) {
        ActionButtons.forEach((prefix) => {
            for (let i = 1; i < 12; i++) {
                let Button = _G[`${prefix}${i}`]
                let OriginalCD = _G[`${prefix}${i}Cooldown`]
                let SpellTexture = GetSpellTex(SpellId)
                const [ActionType, Id] = GetActionInfo(Button.action)
                let ButtonTexture = GetActionTexture(Button.action)
                const [Name] = GetSpellInfo(SpellId)

                if (ActionType == 'spell' && ButtonTexture == SpellTexture) {
                    let ChargeCD = _G[`${prefix}${i}ChargingCooldown`]
                    if (!ChargeCD) {
                        _G[`${prefix}${i}ChargingCooldown`] = CreateFrame('Cooldown', `${prefix}${i}ChargingCooldown`, Button, 'CooldownFrameTemplate')
                        _G[`${prefix}${i}ChargingCooldown`].SetAllPoints(Button)
                    }
                    
                    _G[`${prefix}${i}ChargingCooldown`].Start = Current == Max ? 0 : StartTime
                    _G[`${prefix}${i}ChargingCooldown`].SetCooldown(StartTime, Cooldown/1000)

                    SpellCooldownFrames[SpellId] = _G[`${prefix}${i}ChargingCooldown`]
                    _G[`${prefix}${i}ChargingCooldown`].Show()
                    OriginalCD.SetCooldown(0, 0)
                    if (Current == Max) {
                        _G[`${prefix}${i}ChargingCooldown`].Hide()
                    }
                }
            }
        })
    }

    let UpdateFrame = CreateFrame('Frame')
    UpdateFrame.RegisterEvent('ACTIONBAR_SLOT_CHANGED')
    UpdateFrame.RegisterEvent('SPELLS_CHANGED')
    UpdateFrame.RegisterEvent('LEARNED_SPELL_IN_TAB')

    UpdateFrame.SetScript('OnEvent', (f, EventName, a, b, c) => {
        UpdateAllButtonCharges()
    })

    let Packet = CreateCustomPacket(ClientCallbackOperations.SPELLCHARGE, 0)
    Packet.WriteInt8(1).Send()

    OnCustomPacket(ClientCallbackOperations.SPELLCHARGE, (Packet) => {
        let SpellId = Packet.ReadUInt32()
        let Charges = Packet.ReadUInt8()
        let Max = Packet.ReadUInt8()
        let Timer = Packet.ReadUInt32()

        console.log(SpellId, Charges, Max, Timer)

        if (!SpellsWithCharges.includes(SpellId))
            SpellsWithCharges.push(SpellId)

        CharCharges[SpellId] = new ChargeData(SpellId, Charges, Max, Timer)
        let OldCooldownFrame = SpellCooldownFrames[SpellId-1]
        let Time = GetTime()
        if (OldCooldownFrame && OldCooldownFrame.Start) {
            let OldTime = OldCooldownFrame.Start
            if ((Time - OldTime) < Timer/1000 && OldTime > 0)
                Time = OldTime
        }

        UpdateSpellCharges(SpellId, Timer, Charges, Max, Time)
        UpdateAllButtonCharges()
    })

    OnCustomPacket(ClientCallbackOperations.SPELLCHARGE_MOVE, (Packet) => {
        let Setting = Packet.ReadDouble(0) > 0 ? true : false
        let Button = Packet.ReadUInt8(1)
        let Spell : uint32 = Packet.ReadUInt32(2)
        let ButtonString = ActionButtonMap[Button+1]
        let ChargeCD = _G[`${ButtonString}ChargingCooldown`]

        if (SpellsWithCharges.includes(Spell)) {
            if (!Setting && ChargeCD) {
                if (ChargeCD.IsVisible())
                    ChargeCD.Hide()
                    _G[`${ButtonString}ChargeText`].SetText('Nil')
                    _G[`${ButtonString}ChargeText`].Hide()
            } else {
                let OldCooldownFrame = SpellCooldownFrames[Spell-1]
                let Time = GetTime()
                if (OldCooldownFrame)
                    Time = OldCooldownFrame.Start
                
                let ChargeData = CharCharges[Spell]
                UpdateSpellCharges(Spell, ChargeData.Timer, ChargeData.Charges, ChargeData.Max, Time)
            }
        } else if (ChargeCD) {
            ChargeCD.Hide()
            _G[`${ButtonString}ChargeText`].SetText('Nil')
            _G[`${ButtonString}ChargeText`].Hide()
        }
        UpdateAllButtonCharges()
    })
}