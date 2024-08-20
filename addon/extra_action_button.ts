import { ClientCallbackOperations, SimpleMessagePayload } from "../shared/Messages"
import { ExtraActionButtonUpdate } from "../shared/Payloads/ExtraAddonButton"

export function eab() {
    let btn = CreateFrame("Button", "myButton", UIParent, "SecureActionButtonTemplate")
    btn.SetSize(32, 32)
    btn.SetPoint("CENTER", 0, -100)
    btn.SetAttribute("type", "spell")
    btn.SetAttribute("spell", "Fireball")
    let Texture = btn.CreateTexture(`EABTexture`)
    Texture.SetTexture(`Interface\\ComboFrame\\ComboPoint`)
    Texture.SetAllPoints()
    btn.Hide()

    OnCustomPacket(ClientCallbackOperations.EXTRA_ACTION_BUTTON_UPDATE, (pkt) => {
        let payload = new ExtraActionButtonUpdate().read(pkt)
        if (payload.spellID == 1) {
            btn.Hide()
            return;
        }
        let [name, _, icon] = GetSpellInfo(payload.spellID)
        btn.SetAttribute("spell", name)
        print(icon)
        Texture.SetTexture(icon)
        btn.Show()
    })
}