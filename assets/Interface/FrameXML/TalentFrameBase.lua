MAX_TALENT_GROUPS = 2;
MAX_TALENT_TABS = 3;
MAX_NUM_TALENT_TIERS = 15;
NUM_TALENT_COLUMNS = 4;
MAX_NUM_TALENTS = 40;
PLAYER_TALENTS_PER_TIER = 5;
PET_TALENTS_PER_TIER = 3;

DEFAULT_TALENT_SPEC = "spec1";
DEFAULT_TALENT_TAB = 1;

TALENT_BUTTON_SIZE = 32;
MAX_NUM_BRANCH_TEXTURES = 30;
MAX_NUM_ARROW_TEXTURES = 30;
INITIAL_TALENT_OFFSET_X = 35;
INITIAL_TALENT_OFFSET_Y = 20;

TALENT_HYBRID_ICON = "Interface\\Icons\\Ability_DualWieldSpecialization";

TALENT_BRANCH_TEXTURECOORDS = {
	up = {
		[1] = {0.12890625, 0.25390625, 0 , 0.484375},
		[-1] = {0.12890625, 0.25390625, 0.515625 , 1.0}
	},
	down = {
		[1] = {0, 0.125, 0, 0.484375},
		[-1] = {0, 0.125, 0.515625, 1.0}
	},
	left = {
		[1] = {0.2578125, 0.3828125, 0, 0.5},
		[-1] = {0.2578125, 0.3828125, 0.5, 1.0}
	},
	right = {
		[1] = {0.2578125, 0.3828125, 0, 0.5},
		[-1] = {0.2578125, 0.3828125, 0.5, 1.0}
	},
	topright = {
		[1] = {0.515625, 0.640625, 0, 0.5},
		[-1] = {0.515625, 0.640625, 0.5, 1.0}
	},
	topleft = {
		[1] = {0.640625, 0.515625, 0, 0.5},
		[-1] = {0.640625, 0.515625, 0.5, 1.0}
	},
	bottomright = {
		[1] = {0.38671875, 0.51171875, 0, 0.5},
		[-1] = {0.38671875, 0.51171875, 0.5, 1.0}
	},
	bottomleft = {
		[1] = {0.51171875, 0.38671875, 0, 0.5},
		[-1] = {0.51171875, 0.38671875, 0.5, 1.0}
	},
	tdown = {
		[1] = {0.64453125, 0.76953125, 0, 0.5},
		[-1] = {0.64453125, 0.76953125, 0.5, 1.0}
	},
	tup = {
		[1] = {0.7734375, 0.8984375, 0, 0.5},
		[-1] = {0.7734375, 0.8984375, 0.5, 1.0}
	},
};

TALENT_ARROW_TEXTURECOORDS = {
	top = {
		[1] = {0, 0.5, 0, 0.5},
		[-1] = {0, 0.5, 0.5, 1.0}
	},
	right = {
		[1] = {1.0, 0.5, 0, 0.5},
		[-1] = {1.0, 0.5, 0.5, 1.0}
	},
	left = {
		[1] = {0.5, 1.0, 0, 0.5},
		[-1] = {0.5, 1.0, 0.5, 1.0}
	},
};


local min = min;
local max = max;
local huge = math.huge;
local rshift = bit.rshift;


function TalentFrame_Load(TalentFrame)
end

function TalentFrame_Toggle(pet, TalentFrame)
end

function TalentFrame_Update(TalentFrame)
end

function TalentFrame_SetArrowTexture(tier, column, texCoords, xOffset, yOffset, TalentFrame)

end

function TalentFrame_SetBranchTexture(tier, column, texCoords, xOffset, yOffset, TalentFrame)

end

function TalentFrame_GetArrowTexture(TalentFrame)

end

function TalentFrame_GetBranchTexture(TalentFrame)

end

function TalentFrame_ResetArrowTextureCount(TalentFrame)

end

function TalentFrame_ResetBranchTextureCount(TalentFrame)

end

function TalentFrame_GetArrowTextureCount(TalentFrame)

end

function TalentFrame_GetBranchTextureCount(TalentFrame)

end

function TalentFrame_SetPrereqs(TalentFrame, buttonTier, buttonColumn, forceDesaturated, tierUnlocked, preview, ...)

end


function TalentFrame_DrawLines(buttonTier, buttonColumn, tier, column, requirementsMet, TalentFrame)
	
end



-- Helper functions

function TalentFrame_UpdateTalentPoints(TalentFrame)
	
end

function SetTalentButtonLocation(button, tier, column)
	
end

function TalentFrame_ResetBranches(TalentFrame)
	
end

function TalentFrame_UpdateSpecInfoCache(cache, inspect, pet, talentGroup)
	
end

