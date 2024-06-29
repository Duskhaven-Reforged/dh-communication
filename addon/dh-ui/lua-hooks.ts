import { PlayerSpecFrame, PlayerTalentFrame } from "./dh-talent/TalentTree"

export function PlayerTalentFrameToggle() {
    if (PlayerTalentFrame || PlayerSpecFrame) {
        if (PlayerTalentFrame.IsVisible()) {
            PlayerTalentFrame.Hide()
            TalentMicroButton.SetButtonState('NORMAL')
        } else if (PlayerSpecFrame.IsVisible()) {
            PlayerSpecFrame.Hide()
            TalentMicroButton.SetButtonState('NORMAL')
        } else {
            if (SpellBookFrame) 
                if (SpellBookFrame.IsVisible())  
                    SpellBookFrame.Hide()
                
            if (PVPFrame) 
                if (PVPFrame.IsVisible()) 
                    PVPFrame.Hide()
                
            if (WorldMapFrame) 
                if (WorldMapFrame.IsVisible()) 
                    WorldMapFrame.Hide()
                
            if (LFDQueueFrame) 
                if (LFDQueueFrame.IsVisible()) 
                    LFDQueueFrame.Hide()
                
            if (CharacterFrame) 
                if (CharacterFrame.IsVisible()) 
                    CharacterFrame.Hide()
                
            if (AchievementFrame) 
                if (AchievementFrame.IsVisible()) 
                    AchievementFrame.Hide()
                
            if (FriendsFrame) 
                if (FriendsFrame.IsVisible()) 
                    FriendsFrame.Hide()
                
            if (QuestLogFrame) 
                if (QuestLogFrame.IsVisible()) 
                    QuestLogFrame.Hide()
                
            if (HelpFrame) 
                if (HelpFrame.IsVisible()) 
                    HelpFrame.Hide()
        
            PlayerTalentFrame.Show()
            TalentMicroButton.SetButtonState('PUSHED')
        }
    }
}