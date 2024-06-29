import { Backdrop } from "./dh-ui/dh-talent/Constants"

let originalButtonTextures = []

export function SaveOriginalButtonTextures(button: WoWAPI.Button, tabId: number) {
    if (!originalButtonTextures[tabId]) {
        originalButtonTextures[tabId] = {
            normal: button.GetNormalTexture() || null,
            pushed: button.GetPushedTexture() || null,
            highlight: button.GetHighlightTexture() || null,
        }
    }
}

export function UpdateButtonTexture(button: WoWAPI.Button, textureKey, texturePath: string) {
    if (texturePath) {
        let texture = button.CreateTexture()
        texture.SetTexture(texturePath)
        texture.SetSize(button.GetWidth()+100, button.GetHeight()+10)
        texture.SetPoint("CENTER", button, "CENTER", 40 ,-5)

        switch(textureKey) {
        case 'normal':
            button.SetNormalTexture(texture.GetTexture())
            break;
        case 'pushed':
            button.SetPushedTexture(texture.GetTexture())
            break;
        case 'highlight':
            button.SetHighlightTexture(texture.GetTexture())
            break;
        }
    }
}

// export function UpdateActivateSpecButton(tab) {
//     let button = PlayerTalentFrame_TabsLeft_Spec[tab.Id].ActivateSpecBtn
//     let isTabSelected = PlayerTalentFrame_TabsLeft_Spec[tab.Id].GetButtonState() == "PUSHED"

//     SaveOriginalButtonTextures(button, tab.Id)

//     if (isTabSelected) {
//         button.SetText("Activated")
//         button.SetNormalFontObject(GameFontHighlightSmall)
//         button.SetNormalTexture(nil)
//         button.SetPushedTexture(nil)
//         button.SetHighlightTexture(nil)
//         button.GetFontString().SetTextColor(0, 1, 0)
//         button.SetButtonState("PUSHED")
//     } else {
//         button.SetText("Activate")
//         button.SetNormalFontObject(GameFontNormalSmall)
//         button.SetButtonState("NORMAL")

//         let textures = originalButtonTextures[tab.Id]
//         UpdateButtonTexture(button, "normal", textures.normal)
//         UpdateButtonTexture(button, "pushed", textures.pushed)
//         UpdateButtonTexture(button, "highlight", textures.highlight)

//         button.GetFontString().SetTextColor(1, 1, 1)
//     }
// }

// export function FindExistingTab(tabId) {
//     if (tabId === TalentTree.ClassTree)
//         return TalentTree.CLASS_TAB

//     TalentTree.FORGE_TABS.forEach((tab) => {
//         if (tonumber(tab.Id) == tonumber(tabId))
//             return tab;
//     })
// }