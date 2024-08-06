import { PATH } from "../dh-talent/Constants"

let Focus = {R : 255, G : 128, B : 64}
let runicPower = {R : 0, G : 209, B : 255}
let soulShards = {R : 128, G : 82, B : 105}
let lunarPower = {R : 77, G : 133, B : 230}
let insanity = {R : 102, G : 0, B : 204}
let arcaneCharges = {R : 26, G : 26, B : 250}
let fury = {R : 201, G : 66, B : 253}
let pain = {R : 255, G : 156, B : 0}
let ammoSlot = {R : 204, G : 153, B : 0}
let fuel = {R : 0, G : 140, B : 128}

let PowerTypes = {
    ["ENERGY"]: {R : 255, G : 255, B : 0},
    ["RAGE"]: {R : 255, G : 0, B : 0},
    ["MANA"]: {R : 0, G : 0, B : 255}
}

let AltPowers = {
    ["DRUID"]: "MANA",
    ["PRIEST"]: "RUNIC_POWER",
}

let AltManaBarAdjusted = false
let OriginalPlayerPortraitTexture = null

export function SecondaryPowerUI() {
    let PlayerFrameAlternateManaBar = _G['PlayerFrameAlternateManaBar']

    let UpdateFrame = CreateFrame(`Frame`)
    UpdateFrame.SetScript(`OnUpdate`, (Frame) => {
        let Player = 'player'
        let Target = 'target'
        let Focused = 'focus'

        UpdatePowerBar(_G[`PlayerFrameAlternateManaBar`], Player, false)
        
        UpdatePlayerPortrait()
        UpdateAltManaText()
    })

    function UpdatePlayerPortrait() {
        let Portrait : WoWAPI.Texture = _G['PlayerFrameTexture']

        if (PlayerFrameAlternateManaBar && PlayerFrameAlternateManaBar.IsVisible()) {
            Portrait.SetTexture(`${PATH}PowerType\\ui-targetingframe2`)
            Portrait.SetTexCoord(1.0, 0.09375, 0.0, 0.78125)
        } else {
            Portrait.SetTexture(`Interface\\TargetingFrame\\UI-TargetingFrame`)
            Portrait.SetTexCoord(1.0, 0.09375, 0.0, 0.78125)
        }
    }

    function AbreviateNumber(Value: number) {
        if (Value > 1e6)
            return `${(Value/1e6)}M`
        else if (Value >= 1e3)
            return `${(Value/1e3)}K`
        else
            return `${Value}`
    }

    function UpdateAltManaText() {
        let Value = PlayerFrameAlternateManaBar.GetValue()
        let [PowerType, PowerToken] = UnitPowerType('player')
        let MaxPower = UnitPowerMax(`player`, PowerType)

        let Text = `${AbreviateNumber(Value)}/${AbreviateNumber(MaxPower)}`

        PlayerFrameAlternateManaBar.TextString.SetText(Text)
    }

    function UpdatePowerBar(Frame, Unit, Alt : bool) {
        let [a, Class] = UnitClass(Unit)

        if (AltPowers[Class]) {
            let ColorData = PowerTypes[AltPowers[Class]]
            if (ColorData) {
                //Frame.SetStatusBarTexture(`${PATH}PowerType\\amber_horizontal_fill`, 'OVERLAY')
                Frame.SetStatusBarColor(ColorData.R/255, ColorData.G/255, ColorData.B/255)
            }

            if (!Alt && Unit == 'player' && PlayerFrameAlternateManaBar && !AltManaBarAdjusted) {
                PlayerFrameAlternateManaBar.SetWidth(_G[`PlayerFrameManaBar`].GetWidth())
                PlayerFrameAlternateManaBar.ClearAllPoints()
                PlayerFrameAlternateManaBar.SetPoint(`BOTTOM`, `PlayerFrameManaBar`, `BOTTOM`, 0, -_G[`PlayerFrameManaBar`].GetHeight())
                
                let Background = _G["PlayerFrameAlternateManaBarBackground"]
                Background.SetWidth(_G[`PlayerFrameManaBar`].GetWidth())

                let Border = _G["PlayerFrameAlternateManaBarBorder"]
                if (Border)
                    Border.Hide()

                AltManaBarAdjusted = true
            }
        }
    }
}