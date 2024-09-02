import { ClientCallbackOperations } from "../../../shared/Messages"

export let CurrentSoulShards = 0
let MaximumPoints = 10
let [className, classFilename, classId] = UnitClass("player")

let SoulShardFrames = []
export function SoulShards() {
    let PlayerSoulShardFrame = CreateFrame(`Frame`, `PlayerSoulShardFrame`, UIParent)
    PlayerSoulShardFrame.SetFrameStrata('MEDIUM')
    PlayerSoulShardFrame.SetToplevel(true)
    PlayerSoulShardFrame.SetSize(256, 32)
    PlayerSoulShardFrame.SetPoint(`TOPLEFT`, PlayerFrame, `TOPLEFT`, -31, -66)
    for (let i = MaximumPoints; i >= 1; i--) {
        let SoulShard = CreateFrame(`Frame`, `NewSoulShard${i}`, PlayerSoulShardFrame)
        SoulShard.SetSize(12, 12)
        let Texture = SoulShard.CreateTexture(`NewSoulShard${i}BG`, `BACKGROUND`)
        Texture.SetTexture(`Interface\\Addons\\dh-ui-assets\\PowerType\\Soulshard`)
        Texture.SetSize(16, 16)
        Texture.SetPoint(`TOPLEFT`)
        Texture.SetTexCoord(0, .5, 0, 1)

        let Highlight = SoulShard.CreateTexture(`NewSoulShard${i}Highlight`, `ARTWORK`)
        Highlight.SetTexture(`Interface\\Addons\\dh-ui-assets\\PowerType\\Soulshard`)
        Highlight.SetSize(16, 16)
        Highlight.SetPoint(`TOPLEFT`)
        Highlight.SetTexCoord(.5, 1, 0, 1)
        Highlight.SetAlpha(0)

        if (i == 10) {
            SoulShard.SetPoint(`TOPRIGHT`)
        } else {
            SoulShard.SetPoint(`LEFT`, `NewSoulShard${i+1}`, `LEFT`, -12, 0)
        }

        let SoulShardFrameData = {
            Frame: Texture,
            High: Highlight
        }
        SoulShardFrames[i] = SoulShardFrameData
    }

    if (classFilename !== "WARLOCK")
        PlayerSoulShardFrame.Hide()
    else
        _G[`PetFrame`].SetPoint(`TOPLEFT`,_G[`PlayerFrame`], `TOPLEFT`, 60, -73)

    _G['CurrentSoulShards'] = 0

    function UpdateSoulShards() {
        let SoulShardHighlight

        for (let i = 1; i <= MaximumPoints; i++) {
            let FrameData = SoulShardFrames[i]
            SoulShardHighlight = FrameData.High

            if (i <= CurrentSoulShards) {
                SoulShardHighlight.SetAlpha(1)
            } else {
                SoulShardHighlight.SetAlpha(0)
            }
        }
    }

    OnCustomPacket(ClientCallbackOperations.SOUL_SHARDS, (Packet) => {
        let SoulShards = Packet.ReadUInt8()
        CurrentSoulShards = SoulShards
        _G['CurrentSoulShards'] = CurrentSoulShards
        UpdateSoulShards()
    })
}
