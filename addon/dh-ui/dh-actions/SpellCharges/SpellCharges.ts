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

const SpellsWithCharges : TSArray<uint32> = []
const CharCharges: TSArray<ChargeData> = []
const ActionButtons = [
    "ActionButton",
    "BonusActionButton",
    "MultiBarBottomLeftButton",
    "MultiBarBottomRightButton",
    "MultiBarLeftButton",
    "MultiBarRightButton"
]
const ActiveCooldowns = []

export function SpellCharges() {
    function CreateChargeText(button) {
        let ChargeText = _G[button.GetName()+'ChargeText']
        
        if (!ChargeText) {
            ChargeText = button.CreateFontString(null, 'OVERLAY')
            ChargeText.SetFont("Fonts\\FRIZQT__.TTF", 14, "OUTLINE")
            ChargeText.SetPoint("TOPLEFT", button, "TOPLEFT", 2, -3)
            ChargeText.SetTextColor(1, 1, 1, 1)
            _G[button.GetName()+'ChargeText'] = ChargeText
        }
    }

    function ClearButtons() {
        ActionButtons.forEach((prefix) => {
            for (let i = 1; i < 12; i++) {
                let Button = _G[`${prefix}${i}`]
                if (Button && _G[`${prefix}${i}ChargeText`]) {
                    _G[`${prefix}${i}ChargeText`].SetText('Nil')
                    _G[`${prefix}${i}ChargeText`].Hide()
                }
            }
        })
    }

    function GetSpellTex(SpellId) {
        const [a, b, Icon] = GetSpellInfo(SpellId)
        return Icon
    }

    function UpdateButtonCharges(Button, SpellId, Charges) {
        let SpellTexture = GetSpellTex(SpellId)
        const [ActionType, Id] = GetActionInfo(Button.action)
        let ButtonTexture = GetActionTexture(Button.action)
        if (ActionType == 'spell' && ButtonTexture == SpellTexture) {
            CreateChargeText(Button)
            _G[Button.GetName()+'ChargeText'].SetText(Charges)
            _G[Button.GetName()+'ChargeText'].Show()
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
                                UpdateButtonCharges(Button, ChargeData.SpellId, Charges)
                        })
                    }
                }
            }
        })
    }

    function UpdateSpellCharges(SpellId, Cooldown, Current, Max) {
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

                    if (Cooldown > 0) {
                        _G[`${prefix}${i}ChargingCooldown`].SetCooldown(GetTime(), Cooldown/1000)
                        _G[`${prefix}${i}ChargingCooldown`].Show()
                        OriginalCD.SetCooldown(0, 0)
                    } else if (Current == Max) {
                        _G[`${prefix}${i}ChargingCooldown`].Hide()
                    }
                }
            }
        })
    }

    let Packet = CreateCustomPacket(ClientCallbackOperations.SPELLCHARGE, 0)
    Packet.WriteInt8(1).Send()

    OnCustomPacket(ClientCallbackOperations.SPELLCHARGE, (Packet) => {
        let SpellId = Packet.ReadUInt32()
        let Charges = Packet.ReadUInt8()
        let Max = Packet.ReadUInt8()
        let Timer = Packet.ReadUInt32()

        SpellsWithCharges.push(SpellId)
        CharCharges[SpellId] = new ChargeData(SpellId, Charges, Max, Timer)
        ClearButtons()
        UpdateSpellCharges(SpellId, Timer, Charges, Max)
        UpdateAllButtonCharges()
    })
}