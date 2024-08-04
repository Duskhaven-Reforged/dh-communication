COMBOFRAME_FADE_IN = 0.3;
COMBOFRAME_FADE_OUT = 0.5;
COMBOFRAME_HIGHLIGHT_FADE_IN = 0.4;
COMBOFRAME_SHINE_FADE_IN = 0.3;
COMBOFRAME_SHINE_FADE_OUT = 0.4;
COMBO_FRAME_LAST_NUM_POINTS = 0;

function ComboFrame_OnEvent(self, event, ...)
	if ( event == "PLAYER_TARGET_CHANGED" ) then
		ComboFrame_Update();
	elseif ( event == "UNIT_COMBO_POINTS" ) then
		local unit = ...;
		if ( unit == PlayerFrame.unit ) then
			ComboFrame_Update();
		end
	end
end

function ComboFrame_Update()

end

function ComboPointShineFadeIn(frame)
end

--hack since a frame can't have a reference to itself in it
function ComboPointShineFadeOut(frame)
end
