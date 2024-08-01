
-- PlayerTalentFrame

function PlayerTalentFrame_Toggle(pet, suggestedTalentGroup)
    local TSHook = require("TSAddons.dh-communication.addon.dh-ui.dh-talent.TalentTree")
    if ( not PlayerTalentFrame:IsShown() ) then
        SetButtonPulse(TalentMicroButton, 0, 1);
        
        PlaySound("TalentScreenOpen");
		ShowUIPanel(PlayerTalentFrame);
        if ( not GetCVarBool("talentFrameShown") ) then
            SetCVar("talentFrameShown", 1);
        end
        UpdateMicroButtons();

        TSHook.PlayerTalentFrameToggle(1)
	else
		HideUIPanel(PlayerTalentFrame);
        UpdateMicroButtons();
        TSHook.PlayerTalentFrameToggle(0)

        PlaySound("TalentScreenClose");
	end
end

function PlayerTalentFrame_OnLoad(self)
end

function PlayerTalentFrame_OnShow(self)
    local TSHook = require("TSAddons.dh-communication.addon.dh-ui.dh-talent.TalentTree")
    TSHook.PlayerTalentFrameToggle(1)
end

function  PlayerTalentFrame_OnHide()
    local TSHook = require("TSAddons.dh-communication.addon.dh-ui.dh-talent.TalentTree")
    TSHook.PlayerTalentFrameToggle(0)
end

function PlayerTalentFrame_Open(pet, talentGroup)
end

function PlayerTalentFrame_OnEvent(self, event, ...)

end

function PlayerTalentFrame_Refresh()

end

function PlayerTalentFrame_Update(playerLevel)

end

function PlayerTalentFrame_UpdateActiveSpec(activeTalentGroup, numTalentGroups)

end


-- PlayerTalentFrameTalents

function PlayerTalentFrameTalent_OnClick(self, button)

end

function PlayerTalentFrameTalent_OnEvent(self, event, ...)

end

function PlayerTalentFrameTalent_OnEnter(self)

end


-- Controls

function PlayerTalentFrame_UpdateControls(activeTalentGroup, numTalentGroups)

end

function PlayerTalentFrameActivateButton_OnLoad(self)

end

function PlayerTalentFrameActivateButton_OnClick(self)

end

function PlayerTalentFrameActivateButton_OnShow(self)

end

function PlayerTalentFrameActivateButton_OnHide(self)

end

function PlayerTalentFrameActivateButton_OnEvent(self, event, ...)

end

function PlayerTalentFrameActivateButton_Update()

end

function PlayerTalentFrameResetButton_OnEnter(self)
end

function PlayerTalentFrameResetButton_OnClick(self)

end

function PlayerTalentFrameLearnButton_OnEnter(self)

end

function PlayerTalentFrameLearnButton_OnClick(self)
end


-- PlayerTalentFrameDownArrow

function PlayerTalentFrameDownArrow_OnClick(self, button)

end


-- PlayerTalentFrameTab

function PlayerTalentFrame_UpdateTabs(playerLevel)
end

function PlayerTalentFrameTab_OnLoad(self)
end

function PlayerTalentFrameTab_OnClick(self)
end

function PlayerTalentFrameTab_OnEnter(self)
end


-- PlayerTalentTab

function PlayerTalentTab_OnLoad(self)

end

function PlayerTalentTab_OnClick(self)

end

function PlayerTalentTab_OnEvent(self, event, ...)

end

function PlayerTalentTab_GetBestDefaultTab(specIndex)

end


-- PlayerGlyphTab

function PlayerGlyphTab_OnLoad(self)

end

function PlayerGlyphTab_OnClick(self)

end

function PlayerGlyphTab_OnEvent(self, event, ...)

end


-- Specs

-- PlayerTalentFrame_UpdateSpecs is a helper function for PlayerTalentFrame_Update.
-- Returns true on a successful update, false otherwise. An update may fail if the currently
-- selected tab is no longer selectable. In this case, the first selectable tab will be selected.
function PlayerTalentFrame_UpdateSpecs(activeTalentGroup, numTalentGroups, activePetTalentGroup, numPetTalentGroups)

end

function PlayerSpecTab_Update(self, ...)

end

function PlayerSpecTab_Load(self, specIndex)

end

function PlayerSpecTab_OnClick(self)

end

function PlayerSpecTab_OnEnter(self)

end

