import { ClientCallbackOperations, SimpleMessagePayload } from "../shared/Messages"
import { ExtraActionButtonUpdate } from "../shared/Payloads/ExtraAddonButton"

let bgs = ["default.blp",
    "air-extrabutton.blp",
    "airstrike.blp",
    "amber.blp",
    "ardenweald-extrabutton.blp",
    "ardenweald-zone-ability.blp",
    "ardenweald-zone-ability-2.blp",
    "bastion-extrabutton.blp",
    "bastion-zone-ability.blp",
    "bastion-zone-ability-2.blp",
    "brewmoonkeg.blp",
    "championlight.blp",
    "engineering.blp",
    "extrabuttonair.blp",
    "extrabuttoncypher.blp",
    "extrabuttonfire.blp",
    "extrabuttongeneric.blp",
    "extrabutton-generic.blp",
    "extrabuttonstorm.blp",
    "extrabuttontorghast.blp",
    "extrabuttonwater.blp",
    "eyeofterrok.blp",
    "fel.blp",
    "fengbarrier.blp",
    "fengshroud.blp",
    "fire-extrabutton.blp",
    "garrzoneability-armory.blp",
    "garrzoneability-barracksalliance.blp",
    "garrzoneability-barrackshorde.blp",
    "garrzoneability-inn.blp",
    "garrzoneability-lumbermill.blp",
    "garrzoneability-magetower.blp",
    "garrzoneability-stables.blp",
    "garrzoneability-tradingpost.blp",
    "garrzoneability-trainingpit.blp",
    "garrzoneability-workshop.blp",
    "greenstonekeg.blp",
    "hearthofazeroth-extrabutton-active.blp",
    "hearthofazeroth-extrabutton-disabled.blp",
    "hozubar.blp",
    "lightningkeg.blp",
    "maldraxxus-extrabutton.blp",
    "maldraxxus-zone-ability.blp",
    "maldraxxus-zone-ability-2.blp",
    "revendreth-zone-ability.blp",
    "revendreth-zone-ability-2.blp",
    "smash.blp",
    "soulcage.blp",
    "soulswap.blp",
    "stormblue-extrabutton.blp",
    "stormpurple-extrabutton.blp",
    "stormwhite-extrabutto.blp",
    "stormyellow-extrabutton.blp",
    "ultraxion.blp",
    "venthyr-extrabutton.blp",
    "water-extrabutton.blp",
    "ysera.blp",
    "zoneabilitiesshadowlands.blp"]

export function eab() {
    let btn = CreateFrame("Button", "myButton", UIParent)
    btn.SetSize(50, 50)
    btn.SetPoint("CENTER", 0, -200)
    btn.RegisterForClicks("LeftButtonDown")
    btn.SetScript("OnClick", (frame, button, down) => new ExtraActionButtonUpdate(1, 1).BuildPacket().Send())

    let TextureFlag = btn.CreateTexture(`EABTextureFlag`, "BACKGROUND")
    TextureFlag.SetTexture(`Interface\\ComboFrame\\ComboPoint`)
    TextureFlag.SetPoint("CENTER", 0, 0)
    TextureFlag.SetSize(250, 120)
    let Texture = btn.CreateTexture(`EABTexture`, "ARTWORK")
    Texture.SetTexture(`Interface\\ComboFrame\\ComboPoint`)
    Texture.SetAllPoints()
    btn.Hide()

    OnCustomPacket(ClientCallbackOperations.EXTRA_ACTION_BUTTON_UPDATE, (pkt) => {
        let payload = new ExtraActionButtonUpdate(1, 1).read(pkt)
        if (payload.spellID == 1) {
            btn.Hide()
            return;
        }
        let [a, b, icon] = GetSpellInfo(payload.spellID)
        Texture.SetTexture(icon)
        TextureFlag.SetTexture('Interface\\eab\\' + bgs[payload.flag])
        btn.Show()
    })
}