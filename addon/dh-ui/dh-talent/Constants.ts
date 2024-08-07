export const PATH = 'Interface\\AddOns\\dh-ui-assets\\'

export let CONSTANTS = { 
    classIcon: { 
        DEATHKNIGHT: 'Interface\\Icons\\spell_deathknight_classicon', 
        DRUID: 'Interface\\Icons\\INV_Misc_MonsterClaw_04', 
        WARLOCK: 'Interface\\Icons\\Spell_Nature_FaerieFire', 
        HUNTER: 'Interface\\Icons\\INV_Weapon_Bow_07', 
        MAGE: 'Interface\\Icons\\INV_Staff_13', 
        PRIEST: 'Interface\\Icons\\INV_Staff_30', 
        WARRIOR: 'Interface\\Icons\\INV_Sword_27', 
        SHAMAN: 'Interface\\Icons\\Spell_Nature_BloodLust', 
        PALADIN: 'Interface\\Icons\\Ability_Paladin_HammeroftheRighteous', 
        ROGUE: 'Interface\\Icons\\inv_throwingknife_04'
    },
    UI: { 
        SPECIALIZATION_BUTTON_BG_NORMAL: PATH + 'Buttons\\normal_button', 
        SPECIALIZATION_BUTTON_BG_HOVER_OR_PUSHED: PATH + 'Buttons\\Spec_Pushed', 
        SPECIALIZATION_BUTTON: PATH + 'Buttons\\Spec_Highlight', 
        SPECIALIZATION_BUTTON_BG_DISABLED: PATH + 'Buttons\\locked_button', 
        DEFAULT_BOOK: PATH + 'tabBG\\spellbook_base', 
        SPEC_RING: PATH + 'Spec_Thumb_Border', 
        RING_POINTS: PATH + 'tab_points', 
        MAIN_BG: PATH + 'Background_Dragonflight', 
        MAIN_BG_SPEC: PATH + 'Background_DragonflightSpec', 
        BG_SPEC: PATH + 'Background_Spec', 
        NORMAL_TEXTURE_BTN: PATH + 'ui-microbutton-ej-up', 
        PUSHED_TEXTURE_BTN: PATH + 'ui-microbutton-ej-down', 
        EMPTY_PROGRESS_BAR: PATH + 'main_bar', 
        COLORED_PROGRESS_BAR: PATH + 'colored_bar', 
        SHADOW_TEXTURE: PATH + 'shadow_effect', 
        RANK_PLACEHOLDER: PATH + 'rank_placeholder', 
        BORDER_CLOSE_BTN: PATH + 'NodeBorder\\border_close', 
        CONNECTOR: PATH + 'connector', 
        CONNECTOR_DISABLED: PATH + 'connector_disabled', 
        BORDER_ACTIVE: PATH + 'NodeBorder\\border_active', 
        BORDER_LOCKED: PATH + 'NodeBorder\\border_locked', 
        BORDER_UNLOCKED: PATH + 'NodeBorder\\border_unlocked', 
        BORDER_EXCLUSIVITY: PATH + 'exclusive', 
        BACKGROUND_SPECS: PATH + 'tabsUI\\specsUI',
        TAB_NORM: PATH + 'uiframestab',
        TAB_HILITE: PATH + 'uiframestab-Highlight',
        BTN_CLOSE_NORM: PATH + 'Buttons\\NormalClose',
        BTN_CLOSE_HILI: PATH + 'Buttons\\NormalClose_Highlight',
        BTN_CLOSE_PUSH: PATH + 'Buttons\\NormalClose_Pushed',
        BTN_CONF_NORM: PATH + 'Buttons\\ConfigButton',
        BTN_CONF_PUSH: PATH + 'Buttons\\ConfigButton_Pushed',
        DF_TALENT_BASE: PATH + 'Talents_DF'
    }, 
    CLASS: UnitClass('player') 
};

export let Util = {
    alpha: "|ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
}

export let Backdrop: WoWAPI.Backdrop = {
    bgFile: 'Interface/Tooltips/UI-Tooltip-Background',  // Arquivo de textura  { fundo
    edgeFile: 'Interface/Tooltips/UI-Tooltip-Border',  // Arquivo de textura da borda
    tile: true, tileSize: 16, edgeSize: 16, 
    insets: { left: 4, right: 4, top: 4, bottom: 4 }
}

export function GetClassId (classString) {
    if (classString == "WARRIOR")
        return 1;
    else if (classString == "PALADIN")
        return 2;
    else if (classString == "HUNTER") 
        return 3;
    else if (classString == "ROGUE") 
        return 4;
    else if (classString == "PRIEST") 
        return 5;
    else if (classString == "DEATHKNIGHT") 
        return 6;
    else if (classString == "SHAMAN") 
        return 7;
    else if (classString == "MAGE") 
        return 8;
    else if (classString == "WARLOCK") 
        return 9;
    else
        return 11;
}
