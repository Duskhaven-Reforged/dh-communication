export function StatWindowUI() {

}export const ItemSlotButtons =  {
    ["CharacterHeadSlot"] : CharacterHeadSlot,
    ["CharacterNeckSlot"] : CharacterNeckSlot,
    ["CharacterShoulderSlot"] : CharacterShoulderSlot,
    ["CharacterBackSlot"] : CharacterBackSlot,
    ["CharacterChestSlot"] : CharacterChestSlot,
    ["CharacterShirtSlot"] : CharacterShirtSlot,
    ["CharacterTabardSlot"] : CharacterTabardSlot,
    ["CharacterWristSlot"] : CharacterWristSlot,
    ["CharacterHandsSlot"] : CharacterHandsSlot,
    ["CharacterWaistSlot"] : CharacterWaistSlot,
    ["CharacterLegsSlot"] : CharacterLegsSlot,
    ["CharacterFeetSlot"] : CharacterFeetSlot,
    ["CharacterFinger0Slot"] : CharacterFinger0Slot,
    ["CharacterFinger1Slot"] : CharacterFinger1Slot,
    ["CharacterTrinket0Slot"] : CharacterTrinket0Slot,
    ["CharacterTrinket1Slot"] : CharacterTrinket1Slot,
    ["CharacterMainHandSlot"] : CharacterMainHandSlot,
    ["CharacterSecondaryHandSlot"] : CharacterSecondaryHandSlot,
    ["CharacterRangedSlot"] : CharacterRangedSlot,
    ["CharacterAmmoSlot"] : CharacterAmmoSlot,
}

export function ScrollFramePlayerStat(frame1, scrollframe1, scrollbar1, content) {
    let Frame: WoWAPI.Frame = frame1
    let ScrollFrame: WoWAPI.ScrollFrame = scrollframe1
    let NameTexFrame = Frame.GetName()

    let ScrollBar = scrollbar1
    ScrollBar.SetPoint("TOPLEFT", ScrollFrame, "TOPRIGHT", 1, 0) 
    ScrollBar.SetPoint("BOTTOMLEFT", ScrollFrame, "BOTTOMRIGHT", 1, 14)  
 
    ScrollBar.SetMinMaxValues(1, 1); 
    ScrollBar.SetValueStep(2); 
    ScrollBar.scrollStep = 32; 
    ScrollBar.SetValue(0); 
    ScrollBar.SetWidth(17);  
    
    ScrollBar.SetScript("OnValueChanged", (self, value) => {
        self.GetParent().SetVerticalScroll(value)     
    })

    let ScrollBG = _G[NameTexFrame + "scrollbg"]
    if (!ScrollBG) 
        ScrollBG = ScrollBar.CreateTexture(NameTexFrame + "scrollbg", "BACKGROUND")

	ScrollBG.SetAllPoints(ScrollBar); 
	ScrollBG.SetTexture(0, 0, 0, 0.7);
	ScrollBG.SetAlpha(0.5);
	_G[NameTexFrame+"ScrollBar"] = ScrollBar; 
	 
	let Content = content;
	  
	Content.SetSize(128, 400); 
	ScrollFrame.SetScrollChild(content); 
	ScrollBar.SetMinMaxValues(1, 425); 
	ScrollBar.Hide()
}