import { ClientCallbackOperations } from "../../../shared/Messages"

export let CurrentComboPoints = 0
let MaximumPoints = 5
let [className, classFilename, classId] = UnitClass("player")

let ComboFrames = []
export function ComboPointUI() {
    let PlayerComboFrame = CreateFrame(`Frame`, `PlayerComboFrame`, UIParent)
    PlayerComboFrame.SetFrameStrata('MEDIUM')
    PlayerComboFrame.SetToplevel(true)
    PlayerComboFrame.SetSize(256, 32)
       
    if (classFilename === "DRUID")
        PlayerComboFrame.SetPoint(`TOPLEFT`, PlayerFrame, `TOPLEFT`, -43, -78)
    else
        PlayerComboFrame.SetPoint(`TOPLEFT`, PlayerFrame, `TOPLEFT`, -43, -64)

    for (let i = MaximumPoints; i >= 1; i--) {
        let ComboPoint = CreateFrame(`Frame`, `NewComboPoint${i}`, PlayerComboFrame)
        ComboPoint.SetSize(12, 12)
        let Texture = ComboPoint.CreateTexture(`NewComboPoint${i}BG`, `BACKGROUND`)
        Texture.SetTexture(`Interface\\Addons\\dh-ui-assets\\PowerType\\ComboPoints`)
        Texture.SetSize(28, 28)
        Texture.SetPoint(`TOPLEFT`)
        Texture.SetTexCoord(0, .5, 0, 1)

        let Highlight = ComboPoint.CreateTexture(`NewComboPoint${i}Highlight`, `ARTWORK`)
        Highlight.SetTexture(`Interface\\Addons\\dh-ui-assets\\PowerType\\ComboPoints`)
        Highlight.SetSize(28, 28)
        Highlight.SetPoint(`TOPLEFT`)
        Highlight.SetTexCoord(.5, 1, 0, 1)
        Highlight.SetAlpha(0)

        if (i == 5) {
            ComboPoint.SetPoint(`TOPRIGHT`)
        } else {
            ComboPoint.SetPoint(`LEFT`, `NewComboPoint${i+1}`, `LEFT`, -24, 0)
        }

        let ComboPointFrameData = {
            Frame: Texture,
            High: Highlight
        }
        ComboFrames[i] = ComboPointFrameData
    }

    if (classFilename !== "ROGUE")
        PlayerComboFrame.Hide()
    else
        _G[`PetFrame`].SetPoint(`TOPLEFT`,_G[`PlayerFrame`], `TOPLEFT`, 60, -78)
    
    _G['CurrentComboPoints'] = 0

    function UpdateCombopoints() {
        let ComboPointHighlight

        for (let i = 1; i <= MaximumPoints; i++) {
            let FrameData = ComboFrames[i]
            ComboPointHighlight = FrameData.High
            
            if (i <= CurrentComboPoints) {
                ComboPointHighlight.SetAlpha(1)
            } else {
                ComboPointHighlight.SetAlpha(0)
            }
        }
    }

    OnCustomPacket(ClientCallbackOperations.COMBOPOINTS, (Packet) => {
        let ComboPoints = Packet.ReadUInt8()
        CurrentComboPoints = ComboPoints
        _G['CurrentComboPoints'] = CurrentComboPoints
        UpdateCombopoints()
    })

    OnCustomPacket(ClientCallbackOperations.SHAPESHIFT_FORM, (Packet) => {
        let Shapeshift = Packet.ReadUInt8()

        if (classFilename === "DRUID") {
            if (Shapeshift === 1) {
                _G[`PetFrame`].SetPoint(`TOPLEFT`,_G[`PlayerFrame`], `TOPLEFT`, 60, -92)
                PlayerComboFrame.Show()
            } else {
                _G[`PetFrame`].SetPoint(`TOPLEFT`,_G[`PlayerFrame`], `TOPLEFT`, 60, -75)
                PlayerComboFrame.Hide()
            }
        }
    })
}
