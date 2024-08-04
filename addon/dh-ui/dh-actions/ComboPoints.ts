import { ClientCallbackOperations } from "../../../shared/Messages"

export let CurrentComboPoints = 0
let MaximumPoints = 5

let ComboFrames = []
export function ComboPointUI() {
    let PlayerComboFrame = CreateFrame(`Frame`, `PlayerComboFrame`, UIParent)
    PlayerComboFrame.SetFrameStrata('MEDIUM')
    PlayerComboFrame.SetToplevel(true)
    PlayerComboFrame.SetSize(256, 32)
    PlayerComboFrame.SetPoint(`TOPLEFT`, PlayerFrame, `TOPLEFT`, -25, -5)

    console.log(`INIT COMBOS`)

    for (let i = MaximumPoints; i >= 1; i--) {
        let ComboPoint = CreateFrame(`Frame`, `NewComboPoint${i}`, PlayerComboFrame)
        ComboPoint.SetSize(12, 12)
        let Texture = ComboPoint.CreateTexture(`NewComboPoint${i}BG`, `BACKGROUND`)
        Texture.SetTexture(`Interface\\ComboFrame\\ComboPoint`)
        Texture.SetSize(12, 16)
        Texture.SetPoint(`TOPLEFT`)
        Texture.SetTexCoord(0, .375, 0, 1)

        let Highlight = ComboPoint.CreateTexture(`NewComboPoint${i}Highlight`, `ARTWORK`)
        Highlight.SetTexture(`Interface\\ComboFrame\\ComboPoint`)
        Highlight.SetSize(8, 16)
        Highlight.SetPoint(`TOPLEFT`, 2, 0)
        Highlight.SetTexCoord(.375, .5625, 0, 1)

        if (i == 5) {
            ComboPoint.SetPoint(`TOPRIGHT`)
        } else {
            ComboPoint.SetPoint(`LEFT`, `NewComboPoint${i+1}`, `LEFT`, -15, 0)
        }

        let ComboPointFrameData = {
            Frame: Texture,
            High: Highlight
        }
        ComboFrames[i] = ComboPointFrameData
    }

    let ComboPoint1Highlight = _G['NewComboPoint1Highlight']
    _G['CurrentComboPoints'] = 0

    function UpdateCombopoints() {
        let ComboPoint: WoWAPI.Frame;
        let ComboPointHighlight

        if (CurrentComboPoints > 0) {
            if (!PlayerComboFrame.IsVisible())
                PlayerComboFrame.Show()

            for (let i = 1; i <= MaximumPoints; i++) {
                let FrameData = ComboFrames[i]
                ComboPoint = FrameData.Frame
                ComboPoint.Show()
                ComboPointHighlight = FrameData.High

                if (i <= CurrentComboPoints) {
                    ComboPointHighlight.SetAlpha(1)
                } else {
                    ComboPointHighlight.SetAlpha(0)
                }
            }
        } else {
            ComboPoint1Highlight.SetAlpha(0)
            PlayerComboFrame.Hide()
        }
    }

    OnCustomPacket(ClientCallbackOperations.COMBOPOINTS, (Packet) => {
        let ComboPoints = Packet.ReadUInt8()
        CurrentComboPoints = ComboPoints
        _G['CurrentComboPoints'] = CurrentComboPoints
        UpdateCombopoints()
    })
}