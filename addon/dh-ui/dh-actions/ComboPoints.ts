import { ClientCallbackOperations } from "../../../shared/Messages"

export let CurrentComboPoints = 0
let MaximumPoints = 5

export function ComboPointUI() {
    let ComboFrame = _G[`ComboFrame`]
    ComboFrame.SetAlpha(1)

    let ComboPoint1Highlight = _G['ComboPoint1Highlight']
    let ComboPoint1Shine = _G['ComboPoint1Shine']
    _G['CurrentComboPoints'] = 0

    function UpdateCombopoints() {
        let ComboPoint: WoWAPI.Frame;
        let ComboPointHighlight
        let ComboPointShine

        if (CurrentComboPoints > 0) {
            if (!ComboFrame.IsVisible())
                ComboFrame.Show()

            for (let i = 1; i <= MaximumPoints; i++) {
                ComboPoint = _G[`ComboPoint${i}`]
                ComboPoint.Show()
                ComboPointHighlight = _G[`ComboPoint${i}Highlight`]
                ComboPointShine = _G[`ComboPoint${i}Shine`]

                if (i <= CurrentComboPoints) {
                    ComboPointHighlight.SetAlpha(1)
                } else {
                    ComboPointHighlight.SetAlpha(0)
                    ComboPointShine.SetAlpha(0)
                }
            }
        } else {
            ComboPoint1Highlight.SetAlpha(0)
            ComboPoint1Shine.SetAlpha(0)
            ComboFrame.Hide()
        }
    }

    OnCustomPacket(ClientCallbackOperations.COMBOPOINTS, (Packet) => {
        let ComboPoints = Packet.ReadUInt8()
        CurrentComboPoints = ComboPoints
        _G['CurrentComboPoints'] = CurrentComboPoints
        UpdateCombopoints()
    })
}