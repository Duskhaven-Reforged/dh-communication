
local originalButtonTextures = {}

local function SaveOriginalButtonTextures(button, tabId)
    if not originalButtonTextures[tabId] then
        originalButtonTextures[tabId] = {
            normal = button:GetNormalTexture() and button:GetNormalTexture():GetTexture() or nil,
            pushed = button:GetPushedTexture() and button:GetPushedTexture():GetTexture() or nil,
            highlight = button:GetHighlightTexture() and button:GetHighlightTexture():GetTexture() or nil
        }
    end
end

local function UpdateButtonTexture(button, textureKey, texturePath)
    if texturePath then
        local texture = button:CreateTexture()
        texture:SetTexture(texturePath)
        texture:SetSize(button:GetWidth() + 100, button:GetHeight() + 10)
        texture:SetPoint("CENTER", button, "CENTER", 40, -5)

        if textureKey == "normal" then
            button:SetNormalTexture(texture)
        elseif textureKey == "pushed" then
            button:SetPushedTexture(texture)
        elseif textureKey == "highlight" then
            button:SetHighlightTexture(texture)
        end
    end
end

local function UpdateActivateSpecButton(tab)
    local button = PlayerTalentFrame.TabsLeft.Spec[tab.Id].ActivateSpecBtn
    local isTabSelected = PlayerTalentFrame.TabsLeft.Spec[tab.Id]:GetButtonState() == "PUSHED"

    SaveOriginalButtonTextures(button, tab.Id)

    if isTabSelected then
        button:SetText("Activated")
        button:SetNormalFontObject(GameFontHighlightSmall)
        button:SetNormalTexture(nil)
        button:SetPushedTexture(nil)
        button:SetHighlightTexture(nil)
        button:GetFontString():SetTextColor(0, 1, 0)
		button:SetButtonState("PUSHED")
    else
        button:SetText("Activate")
        button:SetNormalFontObject(GameFontNormalSmall)
		button:SetButtonState("NORMAL")

        local textures = originalButtonTextures[tab.Id]
        UpdateButtonTexture(button, "normal", textures.normal)
        UpdateButtonTexture(button, "pushed", textures.pushed)
        UpdateButtonTexture(button, "highlight", textures.highlight)

        button:GetFontString():SetTextColor(1, 1, 1)
    end
end


function FindExistingTab(tabId)
    if tabId == TalentTree.ClassTree then
        return TalentTree.CLASS_TAB
    end

    for _, tab in ipairs(TalentTree.FORGE_TABS) do
        if tonumber(tab.Id) == tonumber(tabId) then
            return tab;
        end
    end
    return FindTabInForgeSpell(tabId);
end

function UpdateTalentCurrentView()
    -- if not TalentTree.FORGE_SELECTED_TAB then
    --     return;
    -- end
    -- local CurrentTab = FindExistingTab(TalentTree.FORGE_SELECTED_TAB.Id);
    -- if CurrentTab then
    --     if CurrentTab.TalentType == CharacterPointType.FORGE_SKILL_TREE then
    --         InitializeViewFromGrid(PlayerTalentFrame.GridForgeSkill, CurrentTab.Talents, CurrentTab.Id, 465);
    --     else
    --         InitializeViewFromGrid(PlayerTalentFrame.GridTalent, CurrentTab.Talents, CurrentTab.Id, 392);
    --     end
    -- end
end

function FindTalent(talentId, talents)
    for _, talent in pairs(talents) do
        if talent.SpellId == talentId then
            return talent;
        end
    end
end

function UpdateTalent(tabId, talents)
    if not talents then
        return;
    end
    for spellId, rank in pairs(talents) do
        local tab = FindExistingTab(tabId)
        if tab then
            local talent = FindTalent(spellId, tab.Talents)
--            local ColumnIndex = tonumber(talent.ColumnIndex);
--            local RowIndex = tonumber(talent.RowIndex);
            if tab.TalentType == CharacterPointType.FORGE_SKILL_TREE then
                RankUpTalent(PlayerTalentFrame.GridForgeSkill.Talents[ColumnIndex][RowIndex], rank, talent, tabId)
            else
      --          RankUpTalent(PlayerTalentFrame.GridTalent.Talents[ColumnIndex][RowIndex], rank, talent, tabId)
            end
        end
    end
end

function RankUpTalent(frame, rank, talent, tabId)
    if frame then
        frame.RankText:SetText(CurrentRankSpell(rank));
        local CurrentRank, SpellId, NextSpellId = GetSpellIdAndNextRank(tabId, talent);
        if IsUnlocked(CurrentRank, talent.NumberOfRanks) then
           --[[ frame.Border:SetBackdrop({

                bgFile = CONSTANTS.UI.BORDER_UNLOCKED
            })]]
        else
            if CurrentRank ~= -1 then
                frame.TextureIcon:SetDesaturated(nil);
             --[[   frame.Border:SetBackdrop({
                    bgFile = CONSTANTS.UI.BORDER_ACTIVE
                })]]
            else
                if CurrentRank < 1 then
                    frame.TextureIcon:SetDesaturated(1);
                --[[    frame.Border:SetBackdrop({
                        bgFile = CONSTANTS.UI.BORDER_LOCKED
                    })]]
                else
                 --[[   frame.Border:SetBackdrop({
                        bgFile = CONSTANTS.UI.BORDER_ACTIVE
                    })]]
                end
            end
        end
        frame:HookScript("OnEnter", function()
            CreateTooltip(talent, SpellId, NextSpellId, frame, CurrentRank);
        end)
        if frame.IsTooltipActive then
            CreateTooltip(talent, SpellId, NextSpellId, frame, CurrentRank);
        end
    end
end

function UpdateOldTabTalents(newTab)
    local oldTab = FindExistingTab(newTab.Id);
    if oldTab then
        oldTab.Talents = newTab.Talents;
    end
end

function GetStrByCharacterPointType(talentType)
    if talentType == CharacterPointType.RACIAL_TREE then
        return "racial";
    end
    if talentType == CharacterPointType.PRESTIGE_TREE then
        return "prestige";
    end
    if talentType == CharacterPointType.TALENT_SKILL_TREE then
        return "talent";
    end
    if talentType == CharacterPointType.FORGE_SKILL_TREE then
        return "forge";
    end
end

function GetPositionXY(frame)
    local position = {
        x = 0,
        y = 0
    }
    local _, _, _, xOfs, yOfs = frame:GetPoint();
    position.x = xOfs;
    position.y = yOfs;
    return position;
end

function IsNodeUnlocked(talent, CurrentRank)
    return CurrentRank ~= -1 or IsUnlocked(CurrentRank, tonumber((talent.NumberOfRanks)))
end

function DrawNode(startPosition, endPosition, parentFrame, parent, offSet, talent, CurrentRank, previousSpell)
    local nodeSize = 0.05

    local x1 = startPosition.x
    local y1 = startPosition.y
    local x2 = endPosition.x
    local y2 = endPosition.y

    local dx = x1 - x2
    local dy = y2 - y1
    local angle = math.deg(math.atan2(startPosition.y - endPosition.y, startPosition.x - endPosition.x))
    local length = math.sqrt((x2 - x1)^2 + (y2 - y1)^2)

    local cx = ((startPosition.x + endPosition.x) / 2)
    local cy = ((startPosition.y + endPosition.y) / 2)

    if dy ~= 0 and dx == 0 then
      cx = cx - 1
    end


    if not parentFrame.node[talent.SpellId] then
        parentFrame.node[talent.SpellId] = CreateFrame("Frame", parentFrame.node[talent.SpellId], parent)
        parentFrame.node[talent.SpellId]:SetSize(length - 30, 12) 
        parentFrame.node[talent.SpellId]:SetPoint("CENTER", cx, cy)
    	
        if IsNodeUnlocked(talent, CurrentRank) then
            parentFrame.node[talent.SpellId]:SetBackdrop({
                bgFile = CONSTANTS.UI.CONNECTOR
            })
        else
            parentFrame.node[talent.SpellId]:SetBackdrop({
                bgFile = CONSTANTS.UI.CONNECTOR_DISABLED
            })
        end


        parentFrame.node[talent.SpellId].animation = parentFrame.node[talent.SpellId]:CreateAnimationGroup()
        parentFrame.node[talent.SpellId].animation.spin = parentFrame.node[talent.SpellId].animation:CreateAnimation(
            "Rotation")
        parentFrame.node[talent.SpellId].animation.spin:SetOrder(1)
        parentFrame.node[talent.SpellId].animation.spin:SetDuration(0)
        parentFrame.node[talent.SpellId].animation.spin:SetDegrees(angle)
        parentFrame.node[talent.SpellId].animation.spin:SetEndDelay(999999)

        parentFrame.node[talent.SpellId].animation:Stop()
        parentFrame.node[talent.SpellId].animation:Play()
    end
end

function Tablelength(T)
    local count = 0
    for _ in pairs(T) do
        count = count + 1
    end
    return count
end

function SplitSpellsByChunk(array, nb)
    local chunks = {};
    local i = 1;
    for index, value in ipairs(array) do
        if chunks[i] == nil then
            chunks[i] = {};
        end
        table.insert(chunks[i], value);
        if Tablelength(chunks[i]) > nb then
            i = i + 1
        end
    end
    return chunks
end

local Backdrop = {
    bgFile = "Interface/Tooltips/UI-Tooltip-Background",  -- Arquivo de textura do fundo
    edgeFile = "Interface/Tooltips/UI-Tooltip-Border",  -- Arquivo de textura da borda
    tile = true, tileSize = 16, edgeSize = 16, 
    insets = { left = 4, right = 4, top = 4, bottom = 4 }
}

local function printTable(t, indent)
    indent = indent or ""
    for key, value in pairs(t) do
        if type(value) == "table" then
            print(indent .. tostring(key) .. ": ")
            printTable(value, indent .. "  ")
        else
            print(indent .. tostring(key) .. ": " .. tostring(value))
        end
    end
end

function findTabIndexById(tabId)
    for index, tab in ipairs(TalentTree.FORGE_TABS) do
        if tab.Id == tabId then
            return index
        end
    end
    return nil
end

local lastPushedTabId = nil
function SelectTab(tab)
    TalentTree.FORGE_SELECTED_TAB = tab;

    -- if tab.TalentType == CharacterPointType.SKILL_PAGE then
    --     ShowTypeTalentPoint(CharacterPointType.FORGE_SKILL_TREE, "forge", tab.Id)
    --     PlayerTalentFrame.SpellBook:Show();
    -- else
    --     PlayerTalentFrame.SpellBook:Hide();
    -- end
    if tab.TalentType == CharacterPointType.RACIAL_TREE or tab.TalentType == CharacterPointType.TALENT_SKILL_TREE or
        tab.TalentType == CharacterPointType.PRESTIGE_TREE then
        if not TreeCache.Spells[tab.Id] then
            TreeCache.Spells[tab.Id] = {}
        end
        if not TreeCache.PrereqUnlocks[tab.Id] then
            TreeCache.PrereqUnlocks[tab.Id] = {}
        end
        if not TreeCache.IndexToFrame[tab.Id] then
            TreeCache.IndexToFrame[tab.Id] = {}
        end
        InitializeGridForTalent();
        if tab.Talents then
            InitializeViewFromGrid(PlayerTalentFrame.GridTalent, tab.Talents, tab.Id);
            if tab.TalentType == CharacterPointType.TALENT_SKILL_TREE then
                if not TreeCache.IndexToFrame[TalentTree.ClassTree] then
                    TreeCache.IndexToFrame[TalentTree.ClassTree] = {}
                end
                if not TreeCache.Spells[TalentTree.ClassTree] then
                    TreeCache.Spells[TalentTree.ClassTree] = {}
                end
                if not TreeCache.PrereqUnlocks[TalentTree.ClassTree] then
                    TreeCache.PrereqUnlocks[TalentTree.ClassTree] = {}
                end
                InitializeViewFromGrid(PlayerTalentFrame.GridTalent, TalentTree.CLASS_TAB.Talents, TalentTree.ClassTree)
            end
        end
        PlayerTalentFrame.GridTalent:Show();
    else
        PlayerTalentFrame.GridTalent:Hide();
    end
    ShowTypeTalentPoint(tab.TalentType, tab.Id)
    
    if TalentTree.FORGE_SELECTED_TAB then
        local previousTabId = TalentTree.FORGE_SELECTED_TAB.Id
        if PlayerTalentFrame.TabsLeft.Spec[previousTabId] then
            PlayerTalentFrame.TabsLeft.Spec[previousTabId]:SetButtonState("NORMAL", 1)
        end
    end
    if TalentTree.FORGE_SELECTED_TAB then
        if PlayerTalentFrame.TabsLeft.Spec[TalentTree.FORGE_SELECTED_TAB.Id] then
            PlayerTalentFrame.TabsLeft.Spec[TalentTree.FORGE_SELECTED_TAB.Id]:SetButtonState("NORMAL", 1);
        end
    end

    if lastPushedTabId and PlayerTalentFrame.TabsLeft.Spec[lastPushedTabId] then
        PlayerTalentFrame.TabsLeft.Spec[lastPushedTabId]:SetButtonState("NORMAL", 1)
        local tabIndex = findTabIndexById(lastPushedTabId)
        if tabIndex then
            local backgroundPath = "Interface\\AddOns\\ForgedWoWCommunication\\UI\\"..TalentTree.FORGE_TABS[tabIndex].Background
            PlayerTalentFrame.Container.Background:SetTexture(backgroundPath)
        end
    end

    if PlayerTalentFrame.TabsLeft.Spec[tab.Id] then
        PlayerTalentFrame.TabsLeft.Spec[tab.Id]:SetButtonState("PUSHED", 1)
        lastPushedTabId = tab.Id

        -- Atualize o fundo e a grade de talentos para o tab selecionado
        local tabIndex = findTabIndexById(tab.Id)
        if tabIndex then
            local backgroundPath = "Interface\\AddOns\\ForgedWoWCommunication\\UI\\"..TalentTree.FORGE_TABS[tabIndex].Background
            PlayerTalentFrame.Container.Background:SetTexture(backgroundPath)
        end

    end
    
     for _, tab in ipairs(TalentTree.FORGE_TABS) do
        UpdateActivateSpecButton(tab)
     end

end
	 
function GetPointByCharacterPointType(type)
    return TreeCache.Points[type]
end

function ShowTypeTalentPoint(cpt, tabId)
    local talent = GetPointByCharacterPointType(tostring(cpt));
	local tab = FindExistingTab(tabId)
	local className, classFilename = UnitClass("player");

	if not tab then
	  return;
	end

    if cpt == CharacterPointType.TALENT_SKILL_TREE then
        PlayerTalentFrame.PointsBottomLeft.Points:SetText(className.." points available\n"..GetPointByCharacterPointType(CharacterPointType.CLASS_TREE))
        PlayerTalentFrame.PointsBottomRight.Points:SetText(tab.Name.." points available\n"..GetPointByCharacterPointType(cpt))
    else
        PlayerTalentFrame.PointsBottomLeft.Points:SetText(className.." points available\n"..GetPointByCharacterPointType(cpt))
    end
end

function GetPointSpendByTabId(id)
    for tabId, points in pairs(TalentTree.FORGE_ACTIVE_SPEC.PointsSpent) do
        if tabId == id then
            return points;
        end
    end
end

function InitializePreviewSpecialization(tabId)
    PlayerTalentFrame.SpecializationPreview = CreateFrame("Frame", PlayerTalentFrame.SpecializationPreview,
        PlayerTalentFrame)
    PlayerTalentFrame.SpecializationPreview:SetSize(40, 40);
end

		
--[[Navigations HERE]]--
function InitializeTalentLeft()
    if PlayerTalentFrame.TabsLeft then
        return;
    end
    PlayerTalentFrame.TabsLeft = CreateFrame("Frame", "PlayerTalentFrame.TabsLeft", ClassSpecWindow);
    PlayerTalentFrame.TabsLeft:SetFrameLevel(5);
    PlayerTalentFrame.TabsLeft:SetSize(875, 875);
    PlayerTalentFrame.TabsLeft:SetPoint("TOPLEFT", -500, 300)
    PlayerTalentFrame.TabsLeft.Spec = {};
	
	local TabsCount = #TalentTree.FORGE_TABS
    
	if TabsCount <= 2 then
	   Startx = 192
	elseif TabsCount == 3 then
	   Startx = 73;
	elseif TabsCount >= 4 then
	   Startx = 10;
	end
	
    for index, tab in ipairs(TalentTree.FORGE_TABS) do
        local pointsSpent = GetPointSpendByTabId(tab.Id);
		local ClassName = UnitClass("player");
		
				
        PlayerTalentFrame.TabsLeft.Spec[tab.Id] = CreateFrame("Button", "PlayerTalentFrame.TabsLeft.Spec"..tab.Id, PlayerTalentFrame.TabsLeft);
        PlayerTalentFrame.TabsLeft.Spec[tab.Id]:SetPoint("CENTER", Startx, -265);
        PlayerTalentFrame.TabsLeft.Spec[tab.Id]:SetSize(498, 795);
        PlayerTalentFrame.TabsLeft.Spec[tab.Id]:SetFrameLevel(5)

		
        PlayerTalentFrame.TabsLeft.Spec[tab.Id].Button = CreateFrame("Button", "PlayerTalentFrame.TabsLeft.Spec"..tab.Id, PlayerTalentFrame.TabsLeft);
        PlayerTalentFrame.TabsLeft.Spec[tab.Id].Button:SetPoint("LEFT", Startx, -50);
        PlayerTalentFrame.TabsLeft.Spec[tab.Id].Button:SetSize(1, 1);

		
        PlayerTalentFrame.TabsLeft.Spec[tab.Id].TextureNormal = PlayerTalentFrame.TabsLeft.Spec[tab.Id]:CreateTexture("$parentNormalTexture", "ARTWORK");
        PlayerTalentFrame.TabsLeft.Spec[tab.Id].TextureNormal:SetPoint("CENTER" , 0, 15)
        PlayerTalentFrame.TabsLeft.Spec[tab.Id].TextureNormal:SetTexture(CONSTANTS.UI.SPECIALIZATION_BUTTON)
		PlayerTalentFrame.TabsLeft.Spec[tab.Id].TextureNormal:SetVertexColor(0.5, 0.5, 0.5, 1)
		
        PlayerTalentFrame.TabsLeft.Spec[tab.Id].TextureHighligted = PlayerTalentFrame.TabsLeft.Spec[tab.Id]:CreateTexture("SetHighlightTexture", "ARTWORK");
        PlayerTalentFrame.TabsLeft.Spec[tab.Id].TextureHighligted:SetPoint("CENTER" , 0, 15)
        PlayerTalentFrame.TabsLeft.Spec[tab.Id].TextureHighligted:SetTexture(CONSTANTS.UI.SPECIALIZATION_BUTTON)
		PlayerTalentFrame.TabsLeft.Spec[tab.Id].TextureHighligted:SetVertexColor(0.5, 0.5, 0.5, 0.1)
		
	    clickInterceptor = CreateFrame("Button", nil, PlayerTalentFrame.TabsLeft.Spec[tab.Id])
        clickInterceptor:SetAllPoints(PlayerTalentFrame.TabsLeft.Spec[tab.Id])
		clickInterceptor:EnableMouse(true)
        clickInterceptor:SetFrameLevel(PlayerTalentFrame.TabsLeft.Spec[tab.Id]:GetFrameLevel() + 1) 			  

        PlayerTalentFrame.TabsLeft.Spec[tab.Id].TexturePushed = PlayerTalentFrame.TabsLeft.Spec[tab.Id]:CreateTexture("SetHighlightTexture", "ARTWORK");
        PlayerTalentFrame.TabsLeft.Spec[tab.Id].TexturePushed:SetPoint("CENTER" , 0, 15)
        PlayerTalentFrame.TabsLeft.Spec[tab.Id].TexturePushed:SetTexture(CONSTANTS.UI.SPECIALIZATION_BUTTON_BG_HOVER_OR_PUSHED)
		PlayerTalentFrame.TabsLeft.Spec[tab.Id].TexturePushed:SetAlpha(0.8)

        PlayerTalentFrame.TabsLeft.Spec[tab.Id].LockedTexture = PlayerTalentFrame.TabsLeft.Spec[tab.Id]:CreateTexture("$parentNormalTexture", "ARTWORK");
        PlayerTalentFrame.TabsLeft.Spec[tab.Id].LockedTexture:SetTexture(CONSTANTS.UI.SPECIALIZATION_BUTTON_BG_DISABLED)
        PlayerTalentFrame.TabsLeft.Spec[tab.Id].LockedTexture:SetTexCoord(0, 0.625, 0.265625, 0);

        PlayerTalentFrame.TabsLeft.Spec[tab.Id]:SetNormalTexture(PlayerTalentFrame.TabsLeft.Spec[tab.Id].TextureNormal)
        clickInterceptor:SetHighlightTexture(PlayerTalentFrame.TabsLeft.Spec[tab.Id].TextureHighligted)
        PlayerTalentFrame.TabsLeft.Spec[tab.Id]:SetPushedTexture(PlayerTalentFrame.TabsLeft.Spec[tab.Id].TexturePushed)
        PlayerTalentFrame.TabsLeft.Spec[tab.Id]:SetDisabledTexture(PlayerTalentFrame.TabsLeft.Spec[tab.Id].LockedTexture)

        PlayerTalentFrame.TabsLeft.Spec[tab.Id].Circle = CreateFrame("Frame", PlayerTalentFrame.TabsLeft.Spec[tab.Id].Circle, PlayerTalentFrame.TabsLeft.Spec[tab.Id]);
        PlayerTalentFrame.TabsLeft.Spec[tab.Id].Circle:SetPoint("TOP", 0, -30)
        PlayerTalentFrame.TabsLeft.Spec[tab.Id].Circle:SetFrameLevel(10);
        PlayerTalentFrame.TabsLeft.Spec[tab.Id].Circle:SetSize(280, 280);
        PlayerTalentFrame.TabsLeft.Spec[tab.Id].Circle:SetBackdrop({bgFile = CONSTANTS.UI.SPEC_RING});

        PlayerTalentFrame.TabsLeft.Spec[tab.Id].Circle.Slot = CreateFrame("Frame", "IconSlot", PlayerTalentFrame.TabsLeft.Spec[tab.Id].Circle);
        PlayerTalentFrame.TabsLeft.Spec[tab.Id].Circle.Slot:SetAllPoints()
        PlayerTalentFrame.TabsLeft.Spec[tab.Id].Circle.Slot:SetFrameLevel(9);
	    
		PlayerTalentFrame.TabsLeft.Spec[tab.Id].Circle.Texture = PlayerTalentFrame.TabsLeft.Spec[tab.Id].Circle.Slot:CreateTexture("$parentNormalTexture", "BACKGROUND");
        PlayerTalentFrame.TabsLeft.Spec[tab.Id].Circle.Texture:SetAllPoints();
		PlayerTalentFrame.TabsLeft.Spec[tab.Id].Circle.Texture:SetTexture("Interface\\AddOns\\ForgedWoWCommunication\\UI\\tabBG\\SpecThumbs\\"..ClassName.."_"..tab.Name)
		PlayerTalentFrame.TabsLeft.Spec[tab.Id].Circle.Texture:SetDrawLayer("BACKGROUND", -1)
		
		
		PlayerTalentFrame.TabsLeft.Spec[tab.Id].Title = PlayerTalentFrame.TabsLeft.Spec[tab.Id].Circle:CreateFontString()
        PlayerTalentFrame.TabsLeft.Spec[tab.Id].Title:SetFont("Fonts\\FRIZQT__.TTF", 40, "OUTLINE")
        PlayerTalentFrame.TabsLeft.Spec[tab.Id].Title:SetPoint("BOTTOM", 0, 0)
        PlayerTalentFrame.TabsLeft.Spec[tab.Id].Title:SetText(tab.Name)
		
		SampleTitle = PlayerTalentFrame.TabsLeft.Spec[tab.Id]:CreateFontString(nil, "OVERLAY", "GameFontNormalSmall")
        SampleTitle:SetFont("Fonts\\FRIZQT__.TTF", 15, "OUTLINE")
		SampleTitle:SetPoint("BOTTOM", 0, 150)
        SampleTitle:SetText("Sample Abilities")
		SampleTitle:SetTextColor(1, 1, 1, 1)
				

        --Roles--
        Roles = {
              ["1"] = {"Damage"},
			  ["2"] = {"Healer"},
			  ["3"] = {"Tank"}
            }
			
        PlayerTalentFrame.TabsLeft.Spec[tab.Id].RoleTexture = PlayerTalentFrame.TabsLeft.Spec[tab.Id].Circle:CreateTexture(nil, "ARTWORK")
        PlayerTalentFrame.TabsLeft.Spec[tab.Id].RoleTexture:SetTexture("Interface\\AddOns\\ForgedWoWCommunication\\UI\\tabBG\\Roles\\"..tab.Role)
		PlayerTalentFrame.TabsLeft.Spec[tab.Id].RoleTexture:SetSize(30, 30)
        PlayerTalentFrame.TabsLeft.Spec[tab.Id].RoleTexture:SetPoint("BOTTOM", -40, -40)
		PlayerTalentFrame.TabsLeft.Spec[tab.Id].RoleTexture:SetDrawLayer("ARTWORK", 3)

        PlayerTalentFrame.TabsLeft.Spec[tab.Id].LineTexture = PlayerTalentFrame.TabsLeft.Spec[tab.Id].Circle:CreateTexture(nil, "ARTWORK")
        PlayerTalentFrame.TabsLeft.Spec[tab.Id].LineTexture:SetTexture("Interface\\AddOns\\ForgedWoWCommunication\\UI\\DescriptionLine")
		PlayerTalentFrame.TabsLeft.Spec[tab.Id].LineTexture:SetSize(220, 5)
        PlayerTalentFrame.TabsLeft.Spec[tab.Id].LineTexture:SetPoint("BOTTOM", PlayerTalentFrame.TabsLeft.Spec[tab.Id].Title, "BOTTOM", 0, -60)
		PlayerTalentFrame.TabsLeft.Spec[tab.Id].LineTexture:SetDrawLayer("ARTWORK", 3)
		PlayerTalentFrame.TabsLeft.Spec[tab.Id].LineTexture:SetVertexColor(0.5, 0.5, 0.5)
 
        PlayerTalentFrame.TabsLeft.Spec[tab.Id].RoleText = PlayerTalentFrame.TabsLeft.Spec[tab.Id].Circle:CreateFontString(nil, "OVERLAY", "GameFontNormalSmall")
        PlayerTalentFrame.TabsLeft.Spec[tab.Id].RoleText:SetFont("Fonts\\FRIZQT__.TTF", 15, "OUTLINE")
        PlayerTalentFrame.TabsLeft.Spec[tab.Id].RoleText:SetText(Roles[tostring(tab.Role)][1])
		
		PlayerTalentFrame.TabsLeft.Spec[tab.Id].Description = PlayerTalentFrame.TabsLeft.Spec[tab.Id]:CreateFontString(nil, "OVERLAY", "GameFontNormalSmall")
        PlayerTalentFrame.TabsLeft.Spec[tab.Id].Description:SetFont("Fonts\\FRIZQT__.TTF", 18, "OUTLINE")
		PlayerTalentFrame.TabsLeft.Spec[tab.Id].Description:SetText(tab.Description)
		PlayerTalentFrame.TabsLeft.Spec[tab.Id].Description:SetWidth(300)
        PlayerTalentFrame.TabsLeft.Spec[tab.Id].Description:SetPoint("CENTER", 0, -70)
        
		--Sample Spells--
        local spellIconIds = tab.SpellString
        local PosX = 0
		local PosY = 80
		local direction = -1 
        local count = 0
		local currentTab 
        
	for spellId in string.gmatch(spellIconIds, "%d+") do
        local texture = PlayerTalentFrame.TabsLeft.Spec[tab.Id]:CreateTexture(nil, "BACKGROUND")
              texture:SetSize(50, 50)
              texture:SetPoint("BOTTOM", PosX, PosY)
              texture:SetDrawLayer("BACKGROUND", -1)
			  
			  texture.Circle = PlayerTalentFrame.TabsLeft.Spec[tab.Id]:CreateTexture(nil, "ARTWORK")
              texture.Circle:SetPoint("CENTER", texture, "CENTER", 0, 0)
              texture.Circle:SetSize(60, 60);
              texture.Circle:SetTexture("Interface\\AddOns\\ForgedWoWCommunication\\UI\\SampleBorder");
			  texture.Circle:SetDrawLayer("ARTWORK", 1)
			  
              local name, rank, icon = GetSpellInfo(tonumber(spellId))
              SetPortraitToTexture(texture, icon)

              local button = CreateFrame("Button", nil, PlayerTalentFrame.TabsLeft.Spec[tab.Id])
                    button:SetSize(50, 50)
                    button:SetPoint("CENTER", texture, "CENTER", 0, 0)
					button:SetFrameLevel(clickInterceptor:GetFrameLevel() + 1)
                    button:SetScript("OnEnter", function(self)
                      GameTooltip:SetOwner(self, "ANCHOR_RIGHT")
                      GameTooltip:SetHyperlink("spell:"..spellId)
                      GameTooltip:Show()
                    end)
                    button:SetScript("OnLeave", function()
                      GameTooltip:Hide()
                    end)
		
                  if count == 0 then
                   PosX = 0
                  else
                   PosX = 70 * direction * math.ceil(count / 2)
                   direction = -direction
                  end

                  texture:SetPoint("BOTTOM", PosX, PosY)
                  button:SetPoint("CENTER", texture, "CENTER", 0, 0)
                  count = count + 1
    end
		
				
		local deslocamentoX
              if tab.Role == "1" then
                 deslocamentoX = 75
              elseif tab.Role == "2" then
                 deslocamentoX = 60 
              elseif tab.Role == "3" then
                 deslocamentoX = 48 
              end

        function onSpellCast(self, event, unitID, spellName)
        end
		


        PlayerTalentFrame.TabsLeft.Spec[tab.Id].RoleText:SetPoint("RIGHT", PlayerTalentFrame.TabsLeft.Spec[tab.Id].RoleTexture, "RIGHT", deslocamentoX, 0)
		
		
		PlayerTalentFrame.TabsLeft.Spec[tab.Id].ActivateSpecBtn = CreateFrame("Button", "ActivateSpecButton", PlayerTalentFrame.TabsLeft.Spec[tab.Id], "UIPanelButtonTemplate")
        PlayerTalentFrame.TabsLeft.Spec[tab.Id].ActivateSpecBtn:SetSize(130, 25)  -- Ajuste o tamanho conforme necessário
        PlayerTalentFrame.TabsLeft.Spec[tab.Id].ActivateSpecBtn:SetPoint("BOTTOM", 0, 30)
		PlayerTalentFrame.TabsLeft.Spec[tab.Id].ActivateSpecBtn:SetText("Activate")
		PlayerTalentFrame.TabsLeft.Spec[tab.Id].ActivateSpecBtn:SetFrameLevel(clickInterceptor:GetFrameLevel() + 1)
		
		local ButtonState = PlayerTalentFrame.TabsLeft.Spec[tab.Id].ActivateSpecBtn:GetButtonState()		
        PlayerTalentFrame.TabsLeft.Spec[tab.Id].ActivateSpecBtn:SetScript("OnClick", function(self)
         if self:GetText() == "Activate" then
          currentTab = tab
          ActivateSpec(currentTab.Id)
          --ClassSpecWindow.Lockout:Show()
         end
        end)

		
        PlayerTalentFrame.TabsLeft.Spec[tab.Id].ActivateSpecBtn:SetScript("OnUpdate", function(self, elapsed)
          local playerLevel = UnitLevel("player")

          if playerLevel < 10 then
             self:Disable()
          else
             self:Enable()
          end
        end)

        local eventFrame = CreateFrame("Frame")
              eventFrame:RegisterEvent("UNIT_SPELLCAST_SUCCEEDED")
              eventFrame:RegisterEvent("UNIT_SPELLCAST_INTERRUPTED")
              eventFrame:SetScript("OnEvent", function(self, event, unitID, spellName)
                if unitID == "player" then
                  if event == "UNIT_SPELLCAST_SUCCEEDED" and spellName == "Activate Primary Spec" and currentTab then
                    SelectTab(currentTab)
                    currentTab = nil
                  elseif event == "UNIT_SPELLCAST_INTERRUPTED" and currentTab then
				  --ClassSpecWindow.Lockout:Hide()
				  PlayerTalentFrame.TabsLeft.Spec[tab.Id].ActivateSpecBtn:SetButtonState("NORMAL")
                    currentTab = nil
                  end
                end
              end)
			 
				
        if tab.TalentType ~= CharacterPointType.SKILL_PAGE then
            PlayerTalentFrame.TabsLeft.Spec[tab.Id].Points = CreateFrame("Button",
            PlayerTalentFrame.TabsLeft.Spec[tab.Id].Points, PlayerTalentFrame.TabsLeft.Spec[tab.Id].Circle);
            PlayerTalentFrame.TabsLeft.Spec[tab.Id].Points:SetPoint("TOPRIGHT", 0, -40)
            PlayerTalentFrame.TabsLeft.Spec[tab.Id].Points:SetFrameLevel(12);
            PlayerTalentFrame.TabsLeft.Spec[tab.Id].Points:SetSize(20, 20);
            PlayerTalentFrame.TabsLeft.Spec[tab.Id].Points:SetBackdrop({
                bgFile = CONSTANTS.UI.RING_POINTS
            });
            PlayerTalentFrame.TabsLeft.Spec[tab.Id].Points.Text =
                PlayerTalentFrame.TabsLeft.Spec[tab.Id].Points:CreateFontString();
            PlayerTalentFrame.TabsLeft.Spec[tab.Id].Points.Text:SetFont("Fonts\\FRIZQT__.TTF", 9, "OUTLINE")
            PlayerTalentFrame.TabsLeft.Spec[tab.Id].Points.Text:SetPoint("CENTER", 0, 0)
            PlayerTalentFrame.TabsLeft.Spec[tab.Id].Points.Text:SetText("0");
            if pointsSpent then
                PlayerTalentFrame.TabsLeft.Spec[tab.Id].Points.Text:SetText(pointsSpent);
            end
			
			PlayerTalentFrame.TabsLeft.Spec[tab.Id].Points:Hide()
        end


        if TabsCount <= 2 then
           Startx = Startx + 710
	       PlayerTalentFrame.TabsLeft.Spec[tab.Id].TextureNormal:SetSize(PlayerTalentFrame.TabsLeft.Spec[tab.Id]:GetWidth() + 410, PlayerTalentFrame.TabsLeft.Spec[tab.Id]:GetHeight() + 180)
	       PlayerTalentFrame.TabsLeft.Spec[tab.Id].TextureHighligted:SetSize(PlayerTalentFrame.TabsLeft.Spec[tab.Id]:GetWidth() + 410, PlayerTalentFrame.TabsLeft.Spec[tab.Id]:GetHeight() + 180)
	       PlayerTalentFrame.TabsLeft.Spec[tab.Id].TexturePushed:SetSize(PlayerTalentFrame.TabsLeft.Spec[tab.Id]:GetWidth() + 410, PlayerTalentFrame.TabsLeft.Spec[tab.Id]:GetHeight() + 180)
	
        elseif TabsCount == 3 then
           Startx = Startx + 472
	       PlayerTalentFrame.TabsLeft.Spec[tab.Id].TextureNormal:SetSize(PlayerTalentFrame.TabsLeft.Spec[tab.Id]:GetWidth() + 103, PlayerTalentFrame.TabsLeft.Spec[tab.Id]:GetHeight() + 180)
	       PlayerTalentFrame.TabsLeft.Spec[tab.Id].TextureHighligted:SetSize(PlayerTalentFrame.TabsLeft.Spec[tab.Id]:GetWidth() + 103, PlayerTalentFrame.TabsLeft.Spec[tab.Id]:GetHeight() + 180)
	       PlayerTalentFrame.TabsLeft.Spec[tab.Id].TexturePushed:SetSize(PlayerTalentFrame.TabsLeft.Spec[tab.Id]:GetWidth() + 103, PlayerTalentFrame.TabsLeft.Spec[tab.Id]:GetHeight() + 180)
        elseif TabsCount >= 4 then
           Startx = Startx + 355
           PlayerTalentFrame.TabsLeft.Spec[tab.Id].TextureNormal:SetSize(PlayerTalentFrame.TabsLeft.Spec[tab.Id]:GetWidth() - 50, PlayerTalentFrame.TabsLeft.Spec[tab.Id]:GetHeight() + 180)
	       PlayerTalentFrame.TabsLeft.Spec[tab.Id].TextureHighligted:SetSize(PlayerTalentFrame.TabsLeft.Spec[tab.Id]:GetWidth() - 50, PlayerTalentFrame.TabsLeft.Spec[tab.Id]:GetHeight() + 180)
	       PlayerTalentFrame.TabsLeft.Spec[tab.Id].TexturePushed:SetSize(PlayerTalentFrame.TabsLeft.Spec[tab.Id]:GetWidth() - 50, PlayerTalentFrame.TabsLeft.Spec[tab.Id]:GetHeight() + 180)
        end
		
    end
end


function InitializeForgePoints()
    if PlayerTalentFrame.PointsBottomRight then
        return;
    end
	
	if PlayerTalentFrame.PointsBottomLeft then
        return;
    end
	
    PlayerTalentFrame.PointsBottomRight = CreateFrame("Frame", "TalentPoints", PlayerTalentFrame);
    PlayerTalentFrame.PointsBottomRight:SetSize(100, 100);
    PlayerTalentFrame.PointsBottomRight:SetFrameLevel(2000);
    PlayerTalentFrame.PointsBottomRight:SetPoint("CENTER", -370, -55);
    PlayerTalentFrame.PointsBottomRight.Points = PlayerTalentFrame:CreateFontString()
    PlayerTalentFrame.PointsBottomRight.Points:SetFont("Fonts\\FRIZQT__.TTF", 15, "OUTLINE")
    PlayerTalentFrame.PointsBottomRight.Points:SetPoint("TOPRIGHT", -70, -35)
	
	PlayerTalentFrame.PointsBottomLeft = CreateFrame("Frame", "TalentPoints", PlayerTalentFrame);
    PlayerTalentFrame.PointsBottomLeft:SetSize(100, 100);
    PlayerTalentFrame.PointsBottomLeft:SetFrameLevel(2000);
    PlayerTalentFrame.PointsBottomLeft:SetPoint("CENTER", -370, -55);
    PlayerTalentFrame.PointsBottomLeft.Points = PlayerTalentFrame:CreateFontString()
    PlayerTalentFrame.PointsBottomLeft.Points:SetFont("Fonts\\FRIZQT__.TTF", 15, "OUTLINE")
    PlayerTalentFrame.PointsBottomLeft.Points:SetPoint("TOPLEFT", -20, -35)
	
end

function InitializeProgressionBar()
    if not PlayerTalentFrame.ProgressBarPlaceholder then
        PlayerTalentFrame.ProgressBarPlaceholder = CreateFrame("Button", PlayerTalentFrame.ProgressBarPlaceholder,
            PlayerTalentFrame);
    end
    PlayerTalentFrame.ProgressBarPlaceholder:SetSize(0, 0);
    PlayerTalentFrame.ProgressBarPlaceholder:SetFrameLevel(11);
    PlayerTalentFrame.ProgressBarPlaceholder:SetPoint("CENTER", 150.5, -528.5)
    PlayerTalentFrame.ProgressBarPlaceholder:SetBackdrop({
        bgFile = CONSTANTS.UI.EMPTY_PROGRESS_BAR
    });
    local talent = GetPointByCharacterPointType(1);
    local progression = 0;
    local total = 0;
    if talent then
        total = tonumber(talent.Earned)
        local percentage = tonumber(talent.Earned) / tonumber(talent.MaxPoints) * 100
        progression = 7.675 * percentage
    end

    if not PlayerTalentFrame.ProgressBarPlaceholder.Progression then
        PlayerTalentFrame.ProgressBarPlaceholder.Progression = CreateFrame("Frame",
            PlayerTalentFrame.ProgressBarPlaceholder, PlayerTalentFrame);
        PlayerTalentFrame.ProgressBarPlaceholder.Progression:SetFrameLevel(10);
        PlayerTalentFrame.ProgressBarPlaceholder.Progression:SetPoint("LEFT", 0, 0)
        PlayerTalentFrame.ProgressBarPlaceholder.Progression:SetBackdrop({
            bgFile = CONSTANTS.UI.COLORED_PROGRESS_BAR
        });
    end

    PlayerTalentFrame.ProgressBarPlaceholder.Progression:SetSize(progression, 0);

    if not PlayerTalentFrame.ProgressBarPlaceholder.Text then
        PlayerTalentFrame.ProgressBarPlaceholder.Text = PlayerTalentFrame.ProgressBarPlaceholder:CreateFontString()
        PlayerTalentFrame.ProgressBarPlaceholder.Text:SetFont("Fonts\\FRIZQT__.TTF", 10, "OUTLINE")
        PlayerTalentFrame.ProgressBarPlaceholder.Text:SetPoint("TOP", -100, -15)
    end

    PlayerTalentFrame.ProgressBarPlaceholder.Text:SetText(total .. " / " .. talent.MaxPoints)
end

--[[Talents HERE]]--
function InitializeGridForTalent()
    if PlayerTalentFrame.GridTalent then
        PlayerTalentFrame.GridTalent:Hide();
    end

    PlayerTalentFrame.GridTalent = CreateFrame("Frame", nil, PlayerTalentFrame.Container);
    PlayerTalentFrame.GridTalent:SetAllPoints();

    if not PlayerTalentFrame.GridTalent.Talents then
        PlayerTalentFrame.GridTalent.Talents = {};
    end

    local visualizationSize = 30;
    local spaceBetweenNodes = 30; 
    local gridRows = 30;
    local totalGridCols = 22;
	local Tree2_X = 115;

    for i = 0, gridRows - 1 do
        if not PlayerTalentFrame.GridTalent.Talents[i] then
            PlayerTalentFrame.GridTalent.Talents[i] = {};
        end

        for j = 0, totalGridCols - 1 do

            local basePosX, basePosY = -728, -300;

            local posX, posY;
            posX = basePosX + (j * (visualizationSize + spaceBetweenNodes));
            posY = basePosY + (i * (visualizationSize + spaceBetweenNodes));

			--Tree 2
			if j >= 12 then
              posX = posX + Tree2_X;
            end

            if not PlayerTalentFrame.GridTalent.Talents[i][j] then
                    PlayerTalentFrame.GridTalent.Talents[i][j] = CreateFrame("Button", "PlayerTalentFrame.GridTalent.Talents"..i, PlayerTalentFrame.GridTalent);
                    PlayerTalentFrame.GridTalent.Talents[i][j]:SetPoint("CENTER", posX, posY);
                    PlayerTalentFrame.GridTalent.Talents[i][j]:SetFrameLevel(9);
                    PlayerTalentFrame.GridTalent.Talents[i][j]:SetSize(visualizationSize, visualizationSize);
					PlayerTalentFrame.GridTalent.Talents[i][j]:SetPoint("CENTER", posX, -posY); -- Usando posY aqui				

                    PlayerTalentFrame.GridTalent.Talents[i][j].TextureIcon = PlayerTalentFrame.GridTalent.Talents[i][j]:CreateTexture(nil, "ARTWORK");
                    PlayerTalentFrame.GridTalent.Talents[i][j].TextureIcon:SetAllPoints()

           
                    PlayerTalentFrame.GridTalent.Talents[i][j].Border = CreateFrame("Frame",
                    PlayerTalentFrame.GridTalent.Talents[i][j].Border, PlayerTalentFrame.GridTalent.Talents[i][j])
                    PlayerTalentFrame.GridTalent.Talents[i][j].Border:SetFrameLevel(10);
                    PlayerTalentFrame.GridTalent.Talents[i][j].Border:SetPoint("CENTER", -2, 0);
                    PlayerTalentFrame.GridTalent.Talents[i][j].Border:SetSize(75, 75)
			
			        PlayerTalentFrame.GridTalent.Talents[i][j].Border.texture = PlayerTalentFrame.GridTalent.Talents[i][j].Border:CreateTexture(nil, "ARTWORK")
			        PlayerTalentFrame.GridTalent.Talents[i][j].Border.texture:SetTexture("Interface\\AddOns\\ForgedWoWCommunication\\UI\\Talents_DF.blp") 
                    PlayerTalentFrame.GridTalent.Talents[i][j].Border.texture:SetAllPoints(true)
					
                    PlayerTalentFrame.GridTalent.Talents[i][j].Ranks = CreateFrame("Frame", nil, PlayerTalentFrame.GridTalent.Talents[i][j]);
                    PlayerTalentFrame.GridTalent.Talents[i][j].Ranks:SetFrameLevel(13);
                    PlayerTalentFrame.GridTalent.Talents[i][j].Ranks:SetPoint("BOTTOM", 0, -12);
                    PlayerTalentFrame.GridTalent.Talents[i][j].Ranks:SetSize(32, 26);
                    PlayerTalentFrame.GridTalent.Talents[i][j].RankText = PlayerTalentFrame.GridTalent.Talents[i][j].Ranks:CreateFontString(nil, "OVERLAY", "GameFontNormal");
                    PlayerTalentFrame.GridTalent.Talents[i][j].RankText:SetFont("Fonts\\FRIZQT__.TTF", 13, "OUTLINE");
                    PlayerTalentFrame.GridTalent.Talents[i][j].RankText:SetPoint("CENTER", 10, 8.5);

					PlayerTalentFrame.GridTalent.Talents[i][j].node = {};
                    PlayerTalentFrame.GridTalent.Talents[i][j]:Hide();
                end
            end
        end
    end
	
function FindPreReq(spells, spellId)
    for _, spell in pairs(spells) do
        if tonumber(spell.SpellId) == spellId then
            return spell;
        end
    end
end

function InitializePreReqAndDrawNodes(spells, spellNode, children, parent, offset, CurrentRank, tabId)
    for _, pr in pairs(spellNode.Prereqs) do
        local previousSpell = FindPreReq(spells, tonumber(pr.Talent))
        local previousSpellFrame = children[tonumber(previousSpell.ColumnIndex)][tonumber(previousSpell.RowIndex)]
        local spellNodeFrame = children[tonumber(spellNode.ColumnIndex)][tonumber(spellNode.RowIndex)]

        local lineTexture = parent:CreateTexture(nil, "OVERLAY")
        lineTexture:SetDrawLayer("ARTWORK", 7)
        local width = 10

        if IsNodeUnlocked(spellNode, CurrentRank) then
            lineTexture:SetTexture(CONSTANTS.UI.CONNECTOR)
        else
            lineTexture:SetTexture(CONSTANTS.UI.CONNECTOR_DISABLED)
        end

        local srclocation = TreeCache.IndexToFrame[tabId][spellNode.nodeIndex]
        local srcFrame = PlayerTalentFrame.GridTalent.Talents[srclocation.row][srclocation.col]

        local destlocation = TreeCache.IndexToFrame[tabId][previousSpell.nodeIndex]
        local destFrame = PlayerTalentFrame.GridTalent.Talents[destlocation.row][destlocation.col]

        local startPosition = GetPositionXY(srcFrame);
        local endPosition = GetPositionXY(destFrame);
        DrawNode(startPosition, endPosition,
            children[tonumber(previousSpell.ColumnIndex)][tonumber(previousSpell.RowIndex)], parent, offset, spellNode,
            CurrentRank, previousSpell);
    end
end

function ActivateSpec(tabId)
    PushForgeMessage(ForgeTopic.ACTIVATE_CLASS_SPEC, tabId)
end


function CreateTooltip(spell, SpellId, NextSpellId, parent, CurrentRank)
    if (SpellId == nil) then
        return
    end
    FirstRankToolTip:SetOwner(parent, "ANCHOR_RIGHT");
    SecondRankToolTip:SetOwner(FirstRankToolTip, "ANCHOR_BOTTOM");
    FirstRankToolTip:SetHyperlink('spell:' .. SpellId);

    if tonumber(spell.RankCost) > 0 and (CurrentRank < tonumber(spell.NumberOfRanks)) then
        FirstRankToolTip:AddLine("Rank cost: " .. spell.RankCost, 1, 1, 1);
        FirstRankToolTip:AddLine("Required Level: " .. spell.RequiredLevel, 1, 1, 1);
		FirstRankToolTip:AddLine("Dev: (SpellID): " .. spell.SpellId, 1, 1, 1);
    end
    if not NextSpellId and tonumber(spell.RankCost) > 0 and (CurrentRank < tonumber(spell.NumberOfRanks)) then
        FirstRankToolTip:SetSize(FirstRankToolTip:GetWidth(), FirstRankToolTip:GetHeight() + 40) --28 default
    end
    if NextSpellId then
        FirstRankToolTip:AddLine("Next rank:", 1, 1, 1);
        SecondRankToolTip:SetHyperlink('spell:' .. NextSpellId);
        SecondRankToolTip:SetBackdropBorderColor(0, 0, 0, 0);
        SecondRankToolTip:SetBackdropColor(0, 0, 0, 0);
        SecondRankToolTip:AddLine(" ")

        SecondRankToolTip:SetPoint("TOP", FirstRankToolTip, "TOP", 0, -(FirstRankToolTip:GetHeight() + 25));
        FirstRankToolTip:SetSize(FirstRankToolTip:GetWidth(),
        FirstRankToolTip:GetHeight() + SecondRankToolTip:GetHeight() + 30)
			
    end
end

function GetSpellIdAndNextRank(tabId, spell)
    local NextSpellId;
    local SpellId;
    local CurrentRank = 0;
    local SpellIdToFind = tostring(spell.SpellId)
   -- CurrentRank = tonumber(TalentTree.FORGE_TALENTS[tabId][SpellIdToFind]);
    if CurrentRank == -1 or CurrentRank == 0 then
        SpellId = tonumber(spell.Ranks["1"]);
    else
        SpellId = tonumber(spell.Ranks[tostring(CurrentRank)]);
        NextSpellId = tonumber(spell.Ranks[tostring(CurrentRank + 1)]);
    end
    return CurrentRank, SpellId, NextSpellId;
end

function IsUnlocked(CurrentRank, NumberOfRanks, NextSpellId)
    if tonumber(NumberOfRanks) == 1 and tonumber(CurrentRank) == 1 then
        return tonumber(CurrentRank) == tonumber(NumberOfRanks);
    end
    if tonumber(NumberOfRanks) > 1 then
        return tonumber(CurrentRank) == tonumber(NumberOfRanks);
    end
end

local mouseOverButton = false  -- Controla se o mouse está sobre um botão

local function IsMouseOverFrame(frame, margin)
    margin = margin or 0
    local left, bottom, width, height = frame:GetRect()
    local x, y = GetCursorPosition()
    local scale = frame:GetEffectiveScale()

    x = x / scale
    y = y / scale

    return x > (left - margin) and x < (left + width + margin) and y > (bottom - margin) and y < (bottom + height + margin)
end
-- Função para adicionar eventos nos botões
local function AddButtonEvents(button)
    button:SetScript("OnEnter", function()
        mouseOverButton = true
    end)

    button:SetScript("OnLeave", function()
        mouseOverButton = false
    end)
end

function InitializeViewFromGrid(children, spells, tabId)
    if PlayerTalentFrame.GridTalent then
        PlayerTalentFrame.GridTalent:Hide();
    end

    for index, spell in pairs(spells) do
        local CurrentRank, SpellId, NextSpellId = GetSpellIdAndNextRank(tabId, spell);
        local name, rank, icon, castTime, minRange, maxRange, spellID = GetSpellInfo(spell.SpellId)
        local ColumnIndex = tonumber(spell.ColumnIndex);
        local RowIndex = tonumber(spell.RowIndex)-1;
        local NumberOfRanks = tonumber(spell.NumberOfRanks);
        local tab = FindExistingTab(tabId)
		

        if tab.Id ~= GetClassTree(UnitClass("player")) then
            ColumnIndex = ColumnIndex + 11
        end

        local frame = children.Talents[RowIndex][ColumnIndex];
    
        if not TreeCache.IndexToFrame[tab.Id][spell.nodeIndex] then
            TreeCache.IndexToFrame[tab.Id][spell.nodeIndex] = { row = RowIndex, col = ColumnIndex }
        end
        if not TreeCache.Spells[tabId][spell.nodeIndex] then
            TreeCache.Spells[tabId][spell.nodeIndex] = 0; 
        end

        if not frame then
            return;
        end

        frame.CanUprank = false
        frame.CanDerank = false
        frame.update = false
        frame.reqsMet = false

        SpellCache = {}
        TreeCache.PointsSpent[tabId] = 0
        if not TreeCache.Investments[tabId] then
            TreeCache.Investments[tabId] = {}
        end

        TreeCache.Investments[tabId][spell.TabPointReq] = 0
        TreeCache.TotalInvests[spell.TabPointReq] = 0

        local Choice_Talents = CreateFrame("Frame", "Choice_Talents", TalentFrame)
              Choice_Talents:SetSize(200, 100)  
              Choice_Talents:SetPoint("CENTER")
              Choice_Talents:Hide()
            
        if spell.Prereqs then
            if next(spell.Prereqs) then
                InitializePreReqAndDrawNodes(spells, spell, children.Talents, children, 0, CurrentRank, tabId)
            end
        end
        frame.Init = true;
        if NumberOfRanks == 0 then
            frame:SetSize(38, 38);
            frame.Ranks:Hide();
            frame.Border:Hide();
            frame.TextureIcon:SetTexture(icon);
        else
    
        frame:EnableMouse(true)
        frame:RegisterForDrag("LeftButton")
        frame:SetMovable(true) 

        frame:SetScript("OnDragStart", function()
         PickupSpell(name) -- Substitua 'name' pelo nome real da magia
        end)

        frame:SetScript("OnDragStop", function()
         frame:StopMovingOrSizing() -- Para o movimento e ajuste do tamanho
        end)

        frame:SetScript("OnEnter", function()
	
	     if (tonumber(TreeCache.Points[tab.TalentType]) < tonumber(spell.RankCost) or TreeCache.PointsSpent[tabId] < spell.TabPointReq or UnitLevel("player") < tonumber(spell.RequiredLevel) or not frame.reqsMet) then
	        return;
         end
        
         if spell.nodeType <= 1 then            
            CreateTooltip(spell, SpellId, NextSpellId, frame, CurrentRank)
            frame.IsTooltipActive = true
         end


    if spell.nodeType == 2 then
        Choice_Talents:SetParent(frame)
        Choice_Talents:SetFrameLevel(200)
        Choice_Talents:SetFrameStrata("FULLSCREEN")
        Choice_Talents:ClearAllPoints()
        Choice_Talents:SetPoint("CENTER", frame, "CENTER")

        Choice_Talents.buttons = Choice_Talents.buttons or {}

       for i, choiceSpellId in ipairs(spell.Choices or {}) do
          local button = Choice_Talents.buttons[i]
                if not button then
                   button = CreateFrame("Button", nil, Choice_Talents)
                   button:SetSize(50, 50)
                   Choice_Talents.buttons[i] = button

                    button:SetScript("OnMouseDown", function(self, button)
                        if (button == 'LeftButton') then
                            local wasZero = TreeCache.Spells[tabId][spell.nodeIndex] == 0
                            TreeCache.Spells[tabId][spell.nodeIndex] = i
                            TreeCache.PointsSpent[tab.Id] = TreeCache.PointsSpent[tab.Id] + spell.RankCost
                            TreeCache.Investments[tab.Id][spell.TabPointReq] = TreeCache.Investments[tab.Id][spell.TabPointReq] + spell.RankCost

                            CurrentRank = TreeCache.Spells[tabId][spell.nodeIndex]

                            TreeCache.PrereqUnlocks[tabId][spell.SpellId] = CurrentRank
                            TreeCache.PrereqRev[spell.SpellId] = {}
                            if #spell.Prereqs > 0 then
                                for _, req in ipairs(spell.Prereqs) do
                                    if TreeCache.PrereqRev[req.Talent] and tonumber(req.RequiredRank) <= TreeCache.PrereqUnlocks[req.TalentTabId][req.Talent] then
                                        TreeCache.PrereqRev[req.Talent][spell.SpellId] = true
                                    end
                                end
                            end
                            if wasZero then
                                TreeCache.Points[tab.TalentType] = TreeCache.Points[tab.TalentType] - 1
                            end
                            change = true
                        end

                        if change then
                            ShowTypeTalentPoint(tab.TalentType, tabId)
                        end
                    end)

                local texture = button:CreateTexture(nil, "BACKGROUND")
                      texture:SetAllPoints(button)
                      button.texture = texture
                
                local Bordertexture = button:CreateTexture(nil, "ARTWORK")
                      Bordertexture:SetPoint("CENTER", 0, 2)
                      Bordertexture:SetSize(button:GetWidth() * 1.7, button:GetHeight() * 1.7)
                      button.textureBorder = Bordertexture
                      Bordertexture:SetTexture("Interface\\AddOns\\ForgedWoWCommunication\\UI\\Talents_DF.blp") 
                      Bordertexture:SetTexCoord(0.5, 0.5625, 0.125, 0.1875)
                      Bordertexture:SetVertexColor(0, 1, 0, 1)
        end

        local spellName, _, spellIcon = GetSpellInfo(choiceSpellId)
        SetPortraitToTexture(button.texture, spellIcon)
        button:SetPoint("CENTER", Choice_Talents, "CENTER", ((i - 1) * 60) - (30 * (#spell.Choices - 1)), 0)
        button:Show()

        button:SetScript("OnEnter", function(self)
            CreateTooltip(spell, choiceSpellId, NextSpellId, self, CurrentRank)  -- Substitua NextSpellId e CurrentRank se necessário
            self.IsTooltipActive = true
        end)

        button:SetScript("OnLeave", function(self)
            self.IsTooltipActive = false
        end)
        
        Choice_Talents:SetScript("OnHide", function(self)
           frame.IsTooltipActive = false;
           firstRankToolTip:Hide()
        end)

        TreeCache.ChoiceNodes[spell.nodeIndex] = Choice_Talents.buttons
    end

    Choice_Talents:Show()
    end
end)

            frame:SetScript("OnLeave", function()
                FirstRankToolTip:Hide();
                SecondRankToolTip:Hide();
                frame.IsTooltipActive = false;
				Choice_Talents:Hide()
            end)
		
		
if spell.nodeType ~= 2 then
    frame.RankText:SetText(CurrentRankSpell(CurrentRank))
end
frame:RegisterForClicks("AnyDown");
frame:SetScript("OnMouseDown", function(self, button)
    local spellRank = TreeCache.Spells[tabId][spell.nodeIndex];
    local change = false

    if (button == 'LeftButton' and frame.CanUprank and spell.nodeType ~= 2) then
        if TreeCache.Spells[tabId][spell.nodeIndex] < NumberOfRanks then
            TreeCache.Spells[tabId][spell.nodeIndex] = spellRank + 1
            TreeCache.PointsSpent[tab.Id] = TreeCache.PointsSpent[tab.Id] + spell.RankCost
            TreeCache.Investments[tab.Id][spell.TabPointReq] = TreeCache.Investments[tab.Id][spell.TabPointReq] + spell.RankCost

            CurrentRank = TreeCache.Spells[tabId][spell.nodeIndex]

            TreeCache.PrereqUnlocks[tabId][spell.SpellId] = CurrentRank
            TreeCache.PrereqRev[spell.SpellId] = {}
            if #spell.Prereqs > 0 then
                for _, req in ipairs(spell.Prereqs) do
                    if TreeCache.PrereqRev[req.Talent] and tonumber(req.RequiredRank) <= TreeCache.PrereqUnlocks[req.TalentTabId][req.Talent] then
                        TreeCache.PrereqRev[req.Talent][spell.SpellId] = true
                    end
                end
            end

            TreeCache.Points[tab.TalentType] = TreeCache.Points[tab.TalentType] - spell.RankCost

            change = true
        end
    elseif (button ~= 'LeftButton' and frame.CanDerank) then
        if TreeCache.Spells[tabId][spell.nodeIndex] > 0 then
            if spell.nodeType == 2 then
                TreeCache.Spells[tabId][spell.nodeIndex] = 0
            else
                TreeCache.Spells[tabId][spell.nodeIndex] = spellRank - 1
            end
            TreeCache.PointsSpent[tab.Id] = TreeCache.PointsSpent[tab.Id] - spell.RankCost
            TreeCache.Investments[tab.Id][spell.TabPointReq] = TreeCache.Investments[tab.Id][spell.TabPointReq] - spell.RankCost

            CurrentRank = TreeCache.Spells[tabId][spell.nodeIndex]
            TreeCache.PrereqUnlocks[tabId][spell.SpellId] = CurrentRank

            if #spell.Prereqs > 0 then
                for _, req in ipairs(spell.Prereqs) do
                    if TreeCache.PrereqRev[req.Talent] and TreeCache.Spells[tabId][spell.nodeIndex] < 1 then
                        TreeCache.PrereqRev[req.Talent][spell.SpellId] = nil
                    end
                end
            end

            TreeCache.Points[tab.TalentType] = TreeCache.Points[tab.TalentType] + spell.RankCost

            change = true
        end
    end

    if change then
        local cumulative = 0
        for i = 0, 50, 5 do
            local value = TreeCache.Investments[tab.Id][i]
            if value then
                cumulative = cumulative + value
                TreeCache.TotalInvests[i] = cumulative
            end
        end

        frame.update = true
        if spell.nodeType ~= 2 then
            frame.RankText:SetText(TreeCache.Spells[tabId][spell.nodeIndex])
        end
        ShowTypeTalentPoint(tab.TalentType, tabId)
    end
end)
end


frame:SetScript("OnUpdate", function()
    local next = next
    local allow = false
    if frame.update then
        if TreeCache.Spells[tabId][spell.nodeIndex] > 0 then
            local nextReq = spell.TabPointReq + 5
            local spentAfter = {}
            for i = nextReq, 50, 5 do
                if TreeCache.Investments[tab.Id][i] then
                    if TreeCache.Investments[tab.Id][i] > 0 then
                        table.insert(spentAfter, i);
                    end
                end
            end

            if (#spentAfter > 0) then
                for _, tier in ipairs(spentAfter) do
                    if TreeCache.TotalInvests[tier-5] then
                        if tier > TreeCache.TotalInvests[tier-5]-1 then
                            allow = true
                        end
                    end
                end
            end
        end
    end
    if TreeCache.PrereqRev[spell.SpellId] then
        if next(TreeCache.PrereqRev[spell.SpellId]) then
            allow = true
        end
    end
    frame.CanDerank = not allow

    if spell.nodeType == 2 then
        if not IsMouseOverFrame(frame, 25) and not mouseOverButton then
            Choice_Talents:Hide()
        else
            Choice_Talents:Show()
        end
    end
	
    if spell.nodeType == 2 and spell.Choices then
        local spellLearned
        if Choice_Talents.buttons then
            if next(Choice_Talents.buttons) then
                for d = 1, #Choice_Talents.buttons, 1 do
                    if TreeCache.Spells[tabId][spell.nodeIndex] == d then
                        spellLearned = spell.Choices[d]
                        Choice_Talents.buttons[d].textureBorder:SetVertexColor(1, 1, 0, 1);
                    else
                        Choice_Talents.buttons[d].textureBorder:SetVertexColor(0, 1, 0, 1);
                    end
                end
            end
        end

        if spellLearned then
            local _, _, spellIcon = GetSpellInfo(spellLearned)
            frame.TextureIcon:SetTexture(spellIcon)
			frame.TextureIcon:ClearAllPoints()
			frame.TextureIcon:SetSize(33.5, 33.5)
            frame.TextureIcon:SetPoint("CENTER", frame.Border, "CENTER", 2, 1)
            frame.TextureIconLeft:Hide()
            frame.TextureIconRight:Hide()
			frame.Border.texture:SetTexCoord(0, 0.125, 0.25, 0.375)
        else
            frame.TextureIconLeft:Show()
            frame.TextureIconRight:Show()
        end
		
	if (tonumber(TreeCache.Points[tab.TalentType]) < tonumber(spell.RankCost) or TreeCache.PointsSpent[tabId] < spell.TabPointReq or UnitLevel("player") < tonumber(spell.RequiredLevel) or not frame.reqsMet) then
        if (tonumber(spell.NumberOfRanks) > TreeCache.Spells[tabId][spell.nodeIndex]) then
            frame.TextureIcon:SetDesaturated(true)
            if frame.Border and frame.Border.texture then
			    frame.Border.texture:SetDesaturated(true)
                frame.TextureIconLeft:SetDesaturated(true)
				frame.TextureIconRight:SetDesaturated(true)
            end
        end
        frame.CanUprank = false
    else
        frame.TextureIcon:SetDesaturated(false)
        if frame.Border and frame.Border.texture then
           frame.Border.texture:SetDesaturated(false)
           frame.TextureIconLeft:SetDesaturated(false)
		   frame.TextureIconRight:SetDesaturated(false)
        end
        frame.CanUprank = true
    end
	
    end
	
    if CurrentRank <= 0 then
	   frame.Border.texture:SetVertexColor(0, 1, 0, 1)
	elseif spellLearned then
	   frame.Border.texture:SetVertexColor(1, 1, 0, 1)
	end

    if next(spell.Prereqs) then
        for _, prereq in ipairs(spell.Prereqs) do
            if TreeCache.PrereqUnlocks[prereq.TalentTabId] then
                local reqUnlocked = TreeCache.PrereqUnlocks[prereq.TalentTabId][prereq.Talent]
                if reqUnlocked then
                    if tonumber(reqUnlocked) >= tonumber(prereq.RequiredRank) then
                        frame.reqsMet = true
                    else
                        frame.reqsMet = false
                    end
                else
                    frame.reqsMet = false
                end
            else
                frame.reqsMet = false
            end
        end
    else
        frame.reqsMet = true
    end

    if (tonumber(TreeCache.Points[tab.TalentType]) < tonumber(spell.RankCost) or TreeCache.PointsSpent[tabId] < spell.TabPointReq or UnitLevel("player") < tonumber(spell.RequiredLevel) or not frame.reqsMet) then
        if (tonumber(spell.NumberOfRanks) > TreeCache.Spells[tabId][spell.nodeIndex]) then
            frame.TextureIcon:SetDesaturated(true)
            if frame.Border and frame.Border.texture then
                frame.Border.texture:SetDesaturated(true)
            end
        end
        frame.CanUprank = false
    else
        frame.TextureIcon:SetDesaturated(false)
        if frame.Border and frame.Border.texture then
            frame.Border.texture:SetDesaturated(false)
        end
        frame.CanUprank = true
    end
end)

		   
   if spell.nodeType == 0 then
   SetPortraitToTexture(frame.TextureIcon, icon)
   frame.Border.texture:ClearAllPoints()
   frame.Border.texture:SetPoint("CENTER", frame.Border, "CENTER", 2, 2)
   frame.Border.texture:SetSize(60, 60)
   frame.TextureIcon:ClearAllPoints()
   frame.TextureIcon:SetPoint("CENTER", frame.Border, "CENTER")
   frame.TextureIcon:SetSize(35, 35)
   elseif spell.nodeType == 1 then
   frame.TextureIcon:SetTexture(icon)
   frame.Border.texture:ClearAllPoints()
   frame.Border.texture:SetPoint("CENTER", frame.Border, "CENTER", 2, -3)
   frame.Border.texture:SetSize(59, 59)
   end
		   
    if spell.nodeType == 2 and spell.Choices then
        if #spell.Choices >= 2 then
            local spellId1, spellId2 = spell.Choices[1], spell.Choices[2]
            local _, _, texturePath1 = GetSpellInfo(spellId1)
            local _, _, texturePath2 = GetSpellInfo(spellId2)

            if not texturePath1 or not texturePath2 then
                print("Error: One of the textures was not encountered!")
                return
            end

            frame.TextureIconLeft = frame.TextureIconLeft or frame:CreateTexture(nil, "ARTWORK")
            frame.TextureIconRight = frame.TextureIconRight or frame:CreateTexture(nil, "ARTWORK")
			
            local iconSize = frame.TextureIcon:GetWidth() + 10 -- Presumindo que TextureIcon é quadrado
            frame.TextureIconLeft:SetSize(iconSize / 2, iconSize + 1)
            frame.TextureIconLeft:SetPoint("LEFT", frame.TextureIcon, "LEFT", -2, 2)
            frame.TextureIconLeft:SetTexCoord(0, 0.5, 0, 1)  -- Metade esquerda da primeira textura

            frame.TextureIconRight:SetSize(iconSize / 2, iconSize)
            frame.TextureIconRight:SetPoint("LEFT", frame.TextureIconLeft, "RIGHT", 0, 0)
            frame.TextureIconRight:SetTexCoord(0.5, 1, 0, 1)  -- Metade direita da segunda textura

            -- Ajustes finais
            frame.Border.texture:ClearAllPoints()
            frame.Border.texture:SetPoint("CENTER", frame.Border, "CENTER", 0.5, 0.5)
            frame.Border.texture:SetSize(66, 66)
            
            SetPortraitToTexture(frame.TextureIconLeft, texturePath1)
            SetPortraitToTexture(frame.TextureIconRight, texturePath2)
        end
    end
		
        local TextureSettings = {
          [0] = {
                desaturate = false, 
                coords = {0.5, 0.5625, 0.125, 0.1875}
                },
          [1] = {
                desaturate = false, 
                coords = {0.125, 0.25, 0.625, 0.75}
                },
	      [2] = {
                desaturate = false, 
                coords = {0, 0.125, 0.625, 0.75}
                }
        }

        local settings = TextureSettings[spell.nodeType]



if settings then
    frame.TextureIcon:SetDesaturated(settings.desaturate)
    frame.Border.texture:SetTexCoord(unpack(settings.coords))
end
  
        frame:Show();
    end
end

function CurrentRankSpell(CurrentRank)
    if CurrentRank == "-1" or CurrentRank == -1 then
        return 0;
    end
    return CurrentRank;
end