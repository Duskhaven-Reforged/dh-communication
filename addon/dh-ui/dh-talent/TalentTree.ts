import { Backdrop, CONSTANTS, GetClassId, PATH, Util } from './Constants';
import { ClientCallbackOperations, SimpleMessagePayload } from '../../../shared/Messages';
import { GetTalentTreeLayoutPayload, TTLPTalent, TTLPTalentPrereq, TalentTreeLayout } from '../../../shared/Payloads/TalentTreeLayoutPayload';
import { CPSSpec, CharacterSpecsPayload, GetCharacterSpecsPayload } from '../../../shared/Payloads/GetCharacterSpecsPayload';

// caches for intraaddon info sharing
let TalentTree = {
    TalentTrees: [],
    ActiveSpec: null,
    SpecsTab: [],
    SpecSlots: [],
    SelectedTab: null,
    Talents: null,
    INITIALIZED: false,
    SelectedSpec: 0,
    MaxPoints: [],
    ClassTree: 0,
    ClassTab: null,
    TalentLoadoutCache: [],
    CurrentLoadout: '',
    PrevLoadout: '',
    ActiveString: '',
    FirstTab: 900,
    Tabs: [],
}

let TreeCache = {
    Spells: [],
    PointsSpent: [],
    TotalInvests: [],
    PrereqUnlocks: [],
    Points: [],
    IndexToFrame: [],
    ChoiceNodes: [],
    Unlocks: [],
    UnlockCounts: [],
    PrereqLines: [],
}

let FrameData = {
    PlayerTalentFrameTabsLeftData: [],
    LastFrame: null
}

export let loadoutString: string = ''

export let GridTalentTalents = []
export let GridTalentTalentsNodes = []

export let GridChoiceTalents = []

let FrameStatusLookup = []
let ChoiceTalentData = []
let TalentFrameContainerBackground

let FirstRankToolTip = CreateFrame("GameTooltip", "firstRankToolTip", WorldFrame, "GameTooltipTemplate");
let SecondRankToolTip = CreateFrame("GameTooltip", "secondRankToolTip", WorldFrame, "GameTooltipTemplate");

export function TalentTreeUI() {
    let TalentFrame = CreateFrame('Frame', 'CustomTalentFrame', UIParent)
    TalentFrame.SetSize(1000, 800)
    TalentFrame.SetScale(0.9)
    TalentFrame.SetPoint('CENTER', 0, 0)
    TalentFrame.SetFrameLevel(1);
    TalentFrame.SetFrameStrata('MEDIUM')

    let ConfigFrame = CreateFrame('Frame', 'ConfigFrame', TalentFrame)
    ConfigFrame.SetSize(500, 400) // Tamanho do frame de configuração
    ConfigFrame.SetPoint('TOP', TalentFrame, 'TOP', 0, -50) // Centraliza no TalentFrame
    ConfigFrame.SetFrameStrata('HIGH')
    ConfigFrame.SetBackdrop({
        bgFile: 'Interface\\DialogFrame\\UI-DialogBox-Background', // Textura de fundo
        edgeFile: 'Interface\\DialogFrame\\UI-DialogBox-Border', // Borda
        tile: true,
        tileSize: 32,
        edgeSize: 32,
        insets: { left: 8, right: 8, top: 8, bottom: 8 }
    })
    ConfigFrame.SetBackdropColor(0, 0, 0, 1) // Cor de fundo
    ConfigFrame.Hide()

    let headerTexture = ConfigFrame.CreateTexture(null, 'ARTWORK')
    headerTexture.SetTexture('Interface\\DialogFrame\\UI-DialogBox-Header') // caminho para a textura do cabeçalho
    headerTexture.SetSize(256, 64) // O tamanho da textura pode variar, ajuste conforme necessário
    headerTexture.SetPoint('TOP', ConfigFrame, 'TOP', 0, 12) // Ajuste a posição Y conforme necessário

    let headerText = ConfigFrame.CreateFontString(null, 'OVERLAY', 'GameFontNormal')
    headerText.SetPoint('CENTER', headerTexture, 'CENTER', 0, 12)
    headerText.SetText('Configuration') // Defina o texto do cabeçalho conforme necessário

    let closeButton = CreateFrame('Button', null, ConfigFrame, 'UIPanelCloseButton')
    closeButton.SetPoint('TOPRIGHT', ConfigFrame, 'TOPRIGHT', -5, -5)
    closeButton.SetScript('OnClick', function() {ConfigFrame.Hide()})

    let ClassSpecWindow = CreateFrame('Frame', 'CustomSpecFrame', UIParent)
    ClassSpecWindow.SetSize(1000, 800)
    ClassSpecWindow.SetPoint('CENTER', 0, 0)
    ClassSpecWindow.SetFrameLevel(1);
    ClassSpecWindow.SetFrameStrata('MEDIUM')
    
    function CheckPlayerLevel(button: WoWAPI.Button, text: WoWAPI.FontString) {
        let playerLevel = UnitLevel('player')
        if (playerLevel < 10) {
            button.Disable()
            let tex = button.GetNormalTexture()
            if (ClassSpecWindow.IsVisible() || TalentFrame.IsVisible()) {
                ClassSpecWindow.Hide()
                TalentFrame.Hide()
            }
        } else {
            button.Enable()
            text.SetTextColor(1, 1, 0)
        }
    }

    let windows = [TalentFrame, ClassSpecWindow]
    windows.forEach((window, i) => {
        let SpecTabButton = CreateFrame('Button', 'SpecButton' + i, window)
        SpecTabButton.SetSize(150, 60)
        SpecTabButton.SetFrameStrata('FULLSCREEN')
        SpecTabButton.SetScript('OnClick', function() {
            if (TalentFrame.IsVisible()) {
                TalentFrame.Hide()
                ClassSpecWindow.Show()
                FrameData.LastFrame = ClassSpecWindow
            }
        })
        
        SpecTabButton.SetNormalTexture(CONSTANTS.UI.TAB_NORM)
        SpecTabButton.SetHighlightTexture(CONSTANTS.UI.TAB_HILITE)
        
        let SpecTabButtonText = SpecTabButton.CreateFontString()
        SpecTabButtonText.SetFont('Fonts\\FRIZQT__.TTF', 13, 'OUTLINE')
        SpecTabButtonText.SetPoint('CENTER', 0, 0)
        SpecTabButtonText.SetTextColor(1, 1, 0)
        SpecTabButtonText.SetText('Specializations')
        
        SpecTabButton.SetScript('OnUpdate', function(self, elapsed) {
            CheckPlayerLevel(SpecTabButton, SpecTabButtonText)
        })

        let TalentTabButton = CreateFrame('Button', 'TalentTabButton'+i, window)
        TalentTabButton.SetSize(100, 60)
        TalentTabButton.SetFrameStrata('FULLSCREEN')
        TalentTabButton.SetScript('OnClick', function() {
            if (ClassSpecWindow.IsVisible()) {
                ClassSpecWindow.Hide()
                TalentFrame.Show()
                FrameData.LastFrame = TalentFrame
            }
        })

        TalentTabButton.SetNormalTexture(CONSTANTS.UI.TAB_NORM)
        TalentTabButton.SetHighlightTexture(CONSTANTS.UI.TAB_HILITE)
        
        let TalentTabText = TalentTabButton.CreateFontString()
        TalentTabText.SetFont('Fonts\\FRIZQT__.TTF', 13, 'OUTLINE')
        TalentTabText.SetPoint('CENTER', 0, 0)
        TalentTabText.SetTextColor(1, 1, 0)
        TalentTabText.SetText('Talents')
        
        if (window === TalentFrame) {
            SpecTabButton.SetPoint('BOTTOMLEFT', window, 'BOTTOMLEFT', -200, -35)
            TalentTabButton.SetPoint('LEFT', SpecTabButton, 'RIGHT', 50, 0)
        } else if (window === ClassSpecWindow) {
            SpecTabButton.SetPoint('BOTTOMLEFT', window, 'BOTTOMLEFT', -200, -35)
            TalentTabButton.SetPoint('LEFT', SpecTabButton, 'RIGHT', 50, 0)
        }
    })

    AdjustFrameScale(TalentFrame)
    AdjustFrameScale(ClassSpecWindow)

    let Bordertexture = TalentFrame.CreateTexture(null, 'OVERLAY')
    Bordertexture.SetTexture(CONSTANTS.UI.MAIN_BG)
    Bordertexture.SetPoint('CENTER', 0, -100)
    Bordertexture.SetTexCoord(0, 1, 0, 0.57)
    Bordertexture.SetSize(TalentFrame.GetWidth() * 1.8, TalentFrame.GetHeight() * 1.3)

    let BorderSpec = ClassSpecWindow.CreateTexture(null, 'OVERLAY')
    BorderSpec.SetTexture(CONSTANTS.UI.MAIN_BG_SPEC)
    BorderSpec.SetPoint('CENTER', 0, -100)
    BorderSpec.SetTexCoord(0, 1, 0, 0.57)
    BorderSpec.SetSize(TalentFrame.GetWidth() * 1.8, TalentFrame.GetHeight() * 1.3)

    let ClassSpecWindowLockout = CreateFrame('Frame', 'ClassSpecWindow.Lockout', ClassSpecWindow)
    ClassSpecWindowLockout.SetSize(ClassSpecWindow.GetWidth() * 1.433, ClassSpecWindow.GetHeight() * 0.96)
    ClassSpecWindowLockout.SetFrameLevel(100)
    ClassSpecWindowLockout.EnableMouse(true)
    ClassSpecWindowLockout.SetPoint('CENTER', -25, -5)
    ClassSpecWindowLockout.Hide()

    let BackgroundSpec = ClassSpecWindow.CreateTexture(null, 'BACKGROUND')
    BackgroundSpec.SetTexture(CONSTANTS.UI.BG_SPEC)
    BackgroundSpec.SetPoint('CENTER', 0, -117)
    BackgroundSpec.SetDrawLayer('BACKGROUND', -2)
    BackgroundSpec.SetTexCoord(0, 1, 0, 0.57)
    BackgroundSpec.SetSize(TalentFrame.GetWidth() * 1.8, TalentFrame.GetHeight() * 1.4)

    let SpecTitleText = ClassSpecWindow.CreateFontString()
    SpecTitleText.SetFont('Fonts\\FRIZQT__.TTF', 15, 'OUTLINE')
    SpecTitleText.SetPoint('TOP', BackgroundSpec, 'TOP', -20, -45)
    SpecTitleText.SetTextColor(1, 1, 0)
    SpecTitleText.SetText('Specializations')

    windows.forEach((window, i) => {
        let closeButton = CreateFrame('Button', 'CloseTalentUI'+i, window)
        closeButton.SetSize(30, 30) 
        closeButton.SetFrameLevel(100)
        closeButton.SetFrameStrata('FULLSCREEN')

        closeButton.SetNormalTexture(CONSTANTS.UI.BTN_CLOSE_NORM) 
        closeButton.SetHighlightTexture(CONSTANTS.UI.BTN_CLOSE_HILI)
        closeButton.SetPushedTexture(CONSTANTS.UI.BTN_CLOSE_PUSH)

        closeButton.SetScript('OnClick', function() {
            TalentMicroButton.Click()
        })

        let configButton = CreateFrame('Button', 'ConfigButtonButton' + i , closeButton)
        configButton.SetSize(30, 30)
        configButton.SetFrameLevel(100)
        configButton.SetFrameStrata('FULLSCREEN')

        configButton.SetNormalTexture(CONSTANTS.UI.BTN_CONF_NORM) 
        configButton.SetHighlightTexture(CONSTANTS.UI.BTN_CLOSE_HILI)
        configButton.SetPushedTexture(CONSTANTS.UI.BTN_CONF_PUSH)

        configButton.SetScript('OnClick', function() {
            if (ConfigFrame.IsVisible())
                ConfigFrame.Show()
            else
                ConfigFrame.Hide()
        })

        let ClassIconTexture = window.CreateTexture(null, 'ARTWORK')
        ClassIconTexture.SetTexture(CONSTANTS.UI.MAIN_BG)
        ClassIconTexture.SetSize(67, 67)
        ClassIconTexture.SetDrawLayer('ARTWORK', 2)
        SetPortraitToTexture(ClassIconTexture, CONSTANTS.classIcon[CONSTANTS.CLASS[1]])  

        let LockoutTexture = ClassSpecWindowLockout.CreateTexture(null, 'BACKGROUND') 
        LockoutTexture.SetAllPoints()
        LockoutTexture.SetTexture(PATH + '\\Background_DragonflightSpec.blp')
        LockoutTexture.SetTexCoord(0.083007813, 0.880859375, 0.576660156, 1)
        LockoutTexture.SetVertexColor(0, 0, 0, 0.7)
        LockoutTexture.SetDrawLayer('BACKGROUND', -1)

        if (window == TalentFrame) {
            closeButton.SetPoint('TOPRIGHT', window, 'TOPRIGHT', 180, 4) 
            ClassIconTexture.SetPoint('TOPLEFT', window, 'TOPLEFT', -241, 12) 
            configButton.SetPoint('LEFT', closeButton, 'RIGHT', -70, 0) 
        } else if (window == ClassSpecWindow) {
            closeButton.SetPoint('TOPRIGHT', window, 'TOPRIGHT', 180, 4)
            ClassIconTexture.SetPoint('TOPLEFT', window, 'TOPLEFT', -241, 12)
            configButton.SetPoint('LEFT', closeButton, 'RIGHT', -70, 0) 
        }
    })
    
    let TalentFrameContainer = CreateFrame('Frame', 'TalentFrameContainer', TalentFrame)
    TalentFrameContainer.SetSize(TalentFrame.GetWidth() * 1.42, TalentFrame.GetHeight() * 0.925);
    TalentFrameContainer.SetPoint('CENTER', 0, 0)
    TalentFrameContainer.SetFrameStrata('MEDIUM');

    TalentFrameContainerBackground = TalentFrame.CreateTexture(null, 'BACKGROUND')
    TalentFrameContainerBackground.SetTexCoord(0.16, 1, 0.0625, 0.5625)
    TalentFrameContainerBackground.SetPoint('CENTER', -32, 20)
    TalentFrameContainerBackground.SetDrawLayer('BACKGROUND', -1)
    TalentFrameContainerBackground.SetSize(TalentFrame.GetWidth() * 1.47, TalentFrame.GetHeight() * 0.945)
    
    
    let TalentFrame_ChoiceSpecs = CreateFrame('Frame', 'TalentFrame.ChoiceSpecs', TalentFrameContainer);
    TalentFrame_ChoiceSpecs.SetSize(100, 100);
    TalentFrame_ChoiceSpecs.SetPoint('TOP', 30, -100);
    TalentFrame_ChoiceSpecs.SetFrameLevel(15)
    TalentFrame_ChoiceSpecs.SetBackdrop({
        edgeSize: 24,
        bgFile: CONSTANTS.UI.BACKGROUND_SPECS,
    })
    TalentFrame_ChoiceSpecs.Show();

    let AcceptTalentsButton = CreateFrame('Button', 'AcceptTalentsButton', TalentFrame, 'UIPanelButtonTemplate')
    AcceptTalentsButton.SetSize(200, 30)
    AcceptTalentsButton.SetPoint('BOTTOM', 0, 30)
    AcceptTalentsButton.SetText('Apply Changes')
    AcceptTalentsButton.Show()

    AcceptTalentsButton.SetScript('OnClick', function() {
        let TalentString = BuildLoadoutString()
        if (TalentString !== TalentTree.ActiveString) {
            SendCallbackToServer(ClientCallbackOperations.LEARN_TALENT, TalentString)
        }
    })


    let resetButton = CreateFrame('Button', 'ResetTalentsButton', TalentFrame, 'UIPanelButtonTemplate')
    resetButton.SetSize(115, 40)
    resetButton.SetPoint('RIGHT', AcceptTalentsButton, 'RIGHT', 150, 0)
    resetButton.SetText('Reset Talents')
    resetButton.Show()

    resetButton.SetScript('OnClick', function() {
        DeselectAllTalents()
    })

    // [[Configs]]
    let alphaSlider = CreateFrame('Slider', 'AlphaSlider', ConfigFrame, 'OptionsSliderTemplate')
    alphaSlider.SetMinMaxValues(0, 1)
    alphaSlider.SetValueStep(0.01)  
    alphaSlider.SetWidth(200)  
    alphaSlider.SetHeight(20)  
    alphaSlider.SetPoint('TOPLEFT', ConfigFrame, 'TOPLEFT', 40, -50)

    let lowText = alphaSlider.CreateFontString(null, 'ARTWORK', 'GameFontNormalSmall')
    lowText.SetPoint('TOPLEFT', alphaSlider, 'BOTTOMLEFT', 2, 3)

    let highText = alphaSlider.CreateFontString(null, 'ARTWORK', 'GameFontNormalSmall')
    highText.SetPoint('TOPRIGHT', alphaSlider, 'BOTTOMRIGHT', -2, 3)

    let titleText = alphaSlider.CreateFontString(null, 'ARTWORK', 'GameFontNormalSmall')
    titleText.SetPoint('TOP', alphaSlider, 'TOP', 0, 10)
    titleText.SetText('Background Transparence')

    alphaSlider.SetScript('OnValueChanged', function(self, value) {
        TalentFrameContainerBackground.SetAlpha(value)
    })

    alphaSlider.SetValue(1)

    let scaleSlider = CreateFrame('Slider', 'ScaleSlider', ConfigFrame, 'OptionsSliderTemplate')
    scaleSlider.SetMinMaxValues(0.5, 2) // Define os valores mínimos e máximos. Por exemplo, de 0.5 (50%) a 2 (200%)
    scaleSlider.SetValueStep(0.01)
    scaleSlider.SetWidth(200)
    scaleSlider.SetHeight(20)
    scaleSlider.SetPoint('BOTTOM', alphaSlider, 'BOTTOM', 0, -50)
    scaleSlider.EnableMouse(false)

    let scaleTitleText = scaleSlider.CreateFontString(null, 'ARTWORK', 'GameFontNormalSmall')
    scaleTitleText.SetPoint('TOP', scaleSlider, 'TOP', 0, 10)
    scaleTitleText.SetText('Scale Adjustment')

    let decreaseButton = CreateFrame('Button', 'DecreaseButton', ConfigFrame, 'UIPanelButtonTemplate')
    decreaseButton.SetSize(20, 20)
    decreaseButton.SetPoint('RIGHT', scaleSlider, 'LEFT', -5, 0)
    decreaseButton.SetText('-')

    let increaseButton = CreateFrame('Button', 'IncreaseButton', ConfigFrame, 'UIPanelButtonTemplate')
    increaseButton.SetSize(20, 20)
    increaseButton.SetPoint('LEFT', scaleSlider, 'RIGHT', 5, 0)
    increaseButton.SetText('+')

    function UpdateScale(value) {
        let currentScale = TalentFrame.GetScale()
        let newScale = currentScale + value
        if (newScale >= 0.6 && newScale <= 0.9) {
            newScale = Math.max(0.5, Math.min(newScale, 2))
            TalentFrame.SetScale(newScale)
            ClassSpecWindow.SetScale(newScale)
            scaleSlider.SetValue(newScale)
        }
    }

    decreaseButton.SetScript('OnClick', function() {
        UpdateScale(-0.01)
    })

    increaseButton.SetScript('OnClick', function() {
        UpdateScale(0.01)
    })

    TalentFrame.Hide()
    ClassSpecWindow.Hide()

    FrameData.LastFrame = TalentFrame

    function HideAllNodes() {
        let gridRows = 11
        let totalGridCols = 23
        for (let i = 0; i < gridRows; i++)
            for (let j = 1; j < totalGridCols; j++) {
                GridTalentTalents[i][j].Frame.Hide()
            }
    }

    let TalentFrameGridTalent
    function InitializeGridForTalents() {
        let GridTalent = CreateFrame('Frame', 'TalentFrameGridTalent', TalentFrameContainer)
        GridTalent.SetAllPoints()

        let Background = GridTalent.CreateTexture('GridTalentBG', 'BACKGROUND')
        Background.SetAllPoints()
    
        let visualizationSize = 30;
        let spaceBetweenNodes = 30; 
        let gridRows = 11;
        let totalGridCols = 23;
        let Tree2_X = 50;
        

        for (let i = 0; i < gridRows; i++) {
            if (!GridTalentTalents[i])
                GridTalentTalents[i] = []

            if (!GridTalentTalentsNodes[i])
                GridTalentTalentsNodes[i] = []

            for (let j = 1; j < totalGridCols; j++) {
                if (!GridTalentTalents[i][j])
                    GridTalentTalents[i][j] = []

                if (!GridTalentTalentsNodes[i][j])
                    GridTalentTalentsNodes[i][j] = []

                let basePosX = -728
                let basePosY = -315
                let posX, posY
    
                posX = basePosX + (j * (visualizationSize + spaceBetweenNodes))
                posY = basePosY + (i * (visualizationSize + spaceBetweenNodes))
    
                if (j > 11)
                    posX = posX + Tree2_X
    
                let Talent = CreateFrame('Button', 'TalentTreeWindowGridTalentTalents:'+i+':'+j, GridTalent)
                Talent.SetPoint('CENTER', posX, posY)
                Talent.SetSize(visualizationSize, visualizationSize)
                Talent.SetPoint('CENTER', posX, -posY)
                    
                let spellInfo = GetSpellInfo(5)

                let TextureIcon = Talent.CreateTexture(null, 'ARTWORK')
                TextureIcon.SetAllPoints()
        
                let Border = CreateFrame('Frame', 'Talent_Border', Talent)
                Border.SetFrameLevel(10)
                Border.SetPoint('CENTER', -2, 0)
                Border.SetSize(75, 75)
        
                let BorderTexture = Border.CreateTexture(null, 'ARTWORK')
                BorderTexture.SetTexture(CONSTANTS.UI.DF_TALENT_BASE) 
                BorderTexture.SetAllPoints()
                
                let Ranks = CreateFrame('Frame', 'Ranks'+i+':'+j, Talent)
                Ranks.SetFrameLevel(13)
                Ranks.SetPoint('BOTTOM', 0, -12)
                Ranks.SetSize(32, 26)
                let RankText = Ranks.CreateFontString(null, 'OVERLAY', 'GameFontNormal')
                RankText.SetFont('Fonts\\FRIZQT__.TTF', 13, 'OUTLINE')
                RankText.SetPoint('CENTER', 10, 8.5)

                let TextureIconLeft = Talent.CreateTexture(null, 'ARTWORK')
                let TextureIconRight = Talent.CreateTexture(null, 'ARTWORK')

                let FrameLinks = {
                    Frame: Talent,
                    TextureIcon: TextureIcon,
                    Border: Border,
                    BorderTexture: BorderTexture,
                    Ranks: Ranks,
                    RankText: RankText,
                    TextureIconLeft: TextureIconLeft,
                    TextureIconRight: TextureIconRight,
                }

                GridTalentTalents[i][j] = FrameLinks
                GridTalentTalentsNodes[i][j] = []
            }
        }

        TalentFrameGridTalent = GridTalent
    }

    let Roles = ['Damage', 'Healer', 'Tank']
    function InitializeTabsLeft() {
        let tabsLeft = CreateFrame("Frame", "ClassSpecWindow_TabsLeft", ClassSpecWindow)
        tabsLeft.SetFrameLevel(5);
        tabsLeft.SetSize(ClassSpecWindow.GetWidth()* 1.433, ClassSpecWindow.GetHeight());
        tabsLeft.SetPoint('CENTER', -20, 0)

        let TabCount = TalentTree.Tabs.length
        let StartX = 0

        let Width = (tabsLeft.GetWidth()) / TabCount
        let Ratio = 72/477.66666
        let Offs = Ratio * Width 
        let i = 1
        TalentTree.Tabs.forEach((TreeId) => {
            let Tree = TalentTree.TalentTrees[TreeId+1]
            if (Tree) {
                let ActiveSpec: CPSSpec = TalentTree.ActiveSpec
                let PointSpent = 0
                ActiveSpec.PointsSpent.forEach((Spend) => {
                    if (Tree.TabId === Spend.TabId)
                        PointSpent = Spend.Amount
                })
                let uClass = UnitClass('player')

                let Point = Width*(i-2)
                if (TabCount > 3) {
                    Point = Width*(i-2.5)
                } else if (TabCount < 3) {
                    switch  (i) {
                        case 1:
                            Point = Width*-1
                            break;
                        case 2:
                            Point = Width
                            break;
                    }
                }

                let Spec = CreateFrame('Button', 'ClassSpecWindow_TabLefts_Spec'+TreeId, tabsLeft)
                Spec.SetPoint('CENTER', Point, -1)
                Spec.SetSize(Width+Offs, ClassSpecWindow.GetHeight())
                Spec.SetFrameLevel(5)
                i++

                let NormalTex = Spec.CreateTexture("$parentNormalTexture", "ARTWORK")
                NormalTex.SetPoint('CENTER', 0, 15)
                NormalTex.SetTexture(CONSTANTS.UI.SPECIALIZATION_BUTTON)
                NormalTex.SetVertexColor(0.5, 0.5, 0.5, 1)

                let HilightTex = Spec.CreateTexture("SetHighlightTexture", "ARTWORK")
                HilightTex.SetPoint('CENTER', 0, 15)
                HilightTex.SetTexture(CONSTANTS.UI.SPECIALIZATION_BUTTON_BG_HOVER_OR_PUSHED)
                HilightTex.SetVertexColor(0.5, 0.5, 0.5, 1)

                let PushedTex = Spec.CreateTexture("SetHighlightTexture", "ARTWORK")
                PushedTex.SetTexture(CONSTANTS.UI.SPECIALIZATION_BUTTON_BG_HOVER_OR_PUSHED)
                PushedTex.SetAlpha(.8)

                let LockedTex = Spec.CreateTexture("$parentNormalTexture", "ARTWORK")
                LockedTex.SetTexture(CONSTANTS.UI.SPECIALIZATION_BUTTON_BG_DISABLED)
                LockedTex.SetTexCoord(0, 0.625, 0.265625, 0)

                let ClickInterceptor = CreateFrame('Button', 'clickInterceptor', Spec)
                ClickInterceptor.SetAllPoints(Spec)
                ClickInterceptor.EnableMouse(true)
                ClickInterceptor.SetFrameLevel(Spec.GetFrameLevel()+1)

                Spec.SetNormalTexture(NormalTex)
                ClickInterceptor.SetHighlightTexture(HilightTex)
                Spec.SetPushedTexture(PushedTex)
                Spec.SetDisabledTexture(LockedTex)

                let Circle = CreateFrame('Frame', 'ClassSpecWindow_TabsLeft_Spec_Circle', Spec)
                Circle.SetPoint('TOP', 0, -30)
                Circle.SetFrameLevel(10)
                Circle.SetSize(200, 200)
                Circle.SetBackdrop({bgFile: CONSTANTS.UI.SPEC_RING})

                let Slot = CreateFrame('Frame', 'IconSlot', Circle)
                Slot.SetAllPoints()
                Slot.SetFrameLevel(9)

                let CircleTex = Slot.CreateTexture('$parentNormalTexture', 'BACKGROUND')
                CircleTex.SetAllPoints()
                CircleTex.SetTexture(PATH + `tabBG\\SpecThumbs\\${uClass[1]}_${Tree.TabName}`)

                let Title = Circle.CreateFontString()
                Title.SetFont("Fonts\\FRIZQT__.TTF", 32, "OUTLINE")
                Title.SetPoint('BOTTOM', 0, 15)
                Title.SetText(Tree.TabName)

                let SamplesTitle = Spec.CreateFontString(null, 'OVERLAY', 'GameFontNormalSmall')
                SamplesTitle.SetFont("Fonts\\FRIZQT__.TTF", 15, "OUTLINE")
                SamplesTitle.SetPoint('BOTTOM', 0, Spec.GetHeight()/4)
                SamplesTitle.SetText('Sample Abilities')
                SamplesTitle.SetTextColor(1,1,1,1)

                let RoleTex = Circle.CreateTexture('RoleTex', 'ARTWORK')
                RoleTex.SetTexture(PATH + `tabBg\\Roles\\${Tree.TabRole}`)
                RoleTex.SetPoint('BOTTOM', Title, 'BOTTOM', 0, -30)
                RoleTex.SetSize(30, 30)
                RoleTex.SetDrawLayer('ARTWORK', 3)

                let LineTex = Circle.CreateTexture('LineTex', 'ARTWORK')
                LineTex.SetTexture(PATH + `DescriptionLine`)
                LineTex.SetSize(220, 5)
                LineTex.SetPoint('BOTTOM', Title, 'BOTTOM', 0, -60)
                LineTex.SetDrawLayer('ARTWORK', 3)
                LineTex.SetVertexColor(.5, .5, .5)

                let RoleText = Spec.CreateFontString('RoleText', 'OVERLAY', 'GameFontNormalSmall')
                RoleText.SetFont("Fonts\\FRIZQT__.TTF", 15, "OUTLINE")
                RoleText.SetText(Roles[Tree.TabRole-1])
                RoleText.SetPoint('BOTTOM', 0, 0)

                let Description = Spec.CreateFontString('Description', 'OVERLAY', 'GameFontNormalSmall')
                Description.SetFont("Fonts\\FRIZQT__.TTF", (-6*TabCount + 36), "OUTLINE")
                Description.SetText(Tree.TabDesc)
                Description.SetWidth(Spec.GetWidth()*.7)
                Description.SetPoint("CENTER", 0, 0)

                // Sample Spell Icons
                let SpellIconIds: TSArray<string> = (<string>Tree.TabSpellString).split(', ')
                let PosX = 0
                let Direction = -1
                let Count = 0
                let CurrentTab

                SpellIconIds.forEach((SpellId) => {
                    let SpellTex = Spec.CreateTexture('SpellTex', 'BACKGROUND')
                    SpellTex.SetSize(50, 50)
                    SpellTex.SetDrawLayer('BACKGROUND', -1)

                    let SpellCircle = Spec.CreateTexture('SpellCircle', 'ARTWORK')
                    SpellCircle.SetPoint('CENTER', SpellTex, 'CENTER', 0, 0)
                    SpellCircle.SetSize(60, 60)
                    SpellCircle.SetTexture(PATH+'SampleBorder')
                    SpellCircle.SetDrawLayer('ARTWORK', 1)

                    let [Name, Rank, Icon] = GetSpellInfo(parseInt(SpellId))

                    SetPortraitToTexture(SpellTex, Icon)
                    let SpellButton = CreateFrame('Button', 'SpellButton', Spec)
                    SpellButton.SetSize(50, 50)
                    SpellButton.SetPoint('CENTER', SpellTex, 'CENTER', 0, 0)
                    SpellButton.SetFrameLevel(ClickInterceptor.GetFrameLevel()+1)
                    SpellButton.SetScript('OnEnter', function(self) {
                        GameTooltip.SetOwner(self, 'ANCHOR_RIGHT')
                        GameTooltip.SetHyperlink(`spell:${SpellId}`)
                        GameTooltip.Show()
                    })
                    SpellButton.SetScript('OnLeave', function () {
                        GameTooltip.Hide()
                        GameTooltip.ClearLines()
                    })

                    if (!Count)
                        PosX = 0
                    else {
                        PosX = 70 * Direction * Math.ceil(Count/2)
                        Direction = -Direction
                    }

                    SpellTex.SetPoint('BOTTOM', SamplesTitle, 'BOTTOM', PosX, -(SpellTex.GetHeight() + 20))
                    SpellButton.SetPoint('CENTER', SpellTex, 'CENTER', 0, 0)
                    Count++
                })

                let OffX
                switch (Tree.TabRole) {
                    case 1:
                        OffX = 75
                        break
                    case 2:
                        OffX = 60
                        break
                    case 3:
                        OffX = 48
                        break
                }

                RoleText.SetPoint('BOTTOM', RoleTex, 'BOTTOM', 0, -20)
                let ActivateSpecBtn = CreateFrame('Button', 'ActivateSpecButton', Spec, 'UIPanelButtonTemplate')
                ActivateSpecBtn.SetSize(130, 40)
                ActivateSpecBtn.SetPoint("BOTTOM", 0, 30)
                ActivateSpecBtn.SetText("Activate")
                ActivateSpecBtn.SetFrameLevel(ClickInterceptor.GetFrameLevel() + 1)

                ActivateSpecBtn.SetScript('OnClick', function (self: WoWAPI.Button) {
                    if (self.GetText() === 'Activate') {
                        CurrentTab = Tree
                        SendCallbackToServer(ClientCallbackOperations.ACTIVATE_CLASS_SPEC, Tree.TabId)
                    }
                })

                ActivateSpecBtn.SetScript('OnUpdate', function (self: WoWAPI.Button, elapsed) {
                    let PlayerLevel = UnitLevel('player')
                    if (PlayerLevel < 10)
                        self.Disable()
                    else
                        self.Enable()
                })
                
                if (TabCount <= 2) {
                    NormalTex.SetSize(Spec.GetWidth(), Spec.GetHeight() + 180)
                    HilightTex.SetSize(Spec.GetWidth(), Spec.GetHeight() + 180)
                    PushedTex.SetSize(Spec.GetWidth(), Spec.GetHeight() + 180)
                } else if (TabCount === 3) {
                    NormalTex.SetSize(Spec.GetWidth(), Spec.GetHeight() + 180)
                    HilightTex.SetSize(Spec.GetWidth(), Spec.GetHeight() + 180)
                    PushedTex.SetSize(Spec.GetWidth(), Spec.GetHeight() + 180)
                } else {
                    NormalTex.SetSize(Spec.GetWidth(), Spec.GetHeight() + 180)
                    HilightTex.SetSize(Spec.GetWidth(), Spec.GetHeight() + 180)
                    PushedTex.SetSize(Spec.GetWidth(), Spec.GetHeight() + 180)
                }
                StartX += Width - Offs/2

                FrameData.PlayerTalentFrameTabsLeftData[Tree.TabId+1] = {Frame: Spec, SpecButton: ActivateSpecBtn}
            }
        })
    }

    let PointsBottomLeft, PointsBottomRight 
    function InitializeTalentPointDisplay() {
        if (PointsBottomLeft && PointsBottomRight)
            return;

        let Right = CreateFrame('Frame', 'TalentPoints', TalentFrame)
        Right.SetSize(100, 100)
        Right.SetFrameLevel(2000)
        Right.SetPoint('TOP', -370, -55)
        let RightPoints = TalentFrame.CreateFontString()
        RightPoints.SetFont("Fonts\\FRIZQT__.TTF", 10, "OUTLINE")
        RightPoints.SetPoint('TOP', GridTalentTalents[0][17].Frame, 0, 35)

        let Left = CreateFrame('Frame', 'TalentPoints', TalentFrame)
        Left.SetSize(100, 100)
        Left.SetFrameLevel(2000)
        Left.SetPoint('CENTER', -370, -55)
        let LeftPoints = TalentFrame.CreateFontString()
        LeftPoints.SetFont("Fonts\\FRIZQT__.TTF", 10, "OUTLINE")
        LeftPoints.SetPoint('TOP', GridTalentTalents[0][6].Frame, 0, 35)

        PointsBottomLeft = LeftPoints
        PointsBottomRight = RightPoints
    }

    InitializeGridForTalents()

    _G[`PlayerSpecFrame`] = ClassSpecWindow

    function GetCurRankAndNextSpell(TabId: number, Talent: TTLPTalent) {
        let NextSpell = 0
        let Spell = 0
        let CurRank = 0
        if (Talent.NodeType == 2)
            Spell = Talent.SpellId
        else if (CurRank < 1) {
            Spell = Talent.Ranks[0].Spell
        } else if (CurRank) {
            Spell = Talent.Ranks[CurRank-1].Spell
            if (CurRank !== Talent.NumRanks)
                NextSpell = Talent.Ranks[CurRank].Spell
        }

        return {CurRank: CurRank, SpellId: Spell,  NextRankSpellId: NextSpell}
    }

    function IsMouseOverFrame(Frame: WoWAPI.Frame, Margin = 0) : bool {
        Margin = Math.abs(Margin)
        let [Left, Bottom, Width, Height] = Frame.GetRect()

        let [X, Y] = GetCursorPosition()
        let Scale = Frame.GetEffectiveScale()

        X /= Scale
        Y /= Scale

        return X > (Left - Margin) && X < (Left + Width + Margin) && Y > (Bottom - Margin) && Y < (Bottom + Height + Margin)
    }   

    function FindSpellInTab(Tab: TalentTreeLayout, SpellId: number) : TTLPTalent {
        let out = null
        Tab.Talents.forEach((Talent) => {
            if (Talent.SpellId === SpellId)
                out = Talent
        })

        return out
    }

    function IsNodeUnlocked(Talent: TTLPTalentPrereq, Rank) {
        return Rank == Talent.ReqRank
    }

    function GetPositionXY(Frame: WoWAPI.Frame) {
        const [a, b, c, xOfs, yOfs] = Frame.GetPoint()
        let Position = {
            x: xOfs,
            y: yOfs,
        }
        return Position
    }

    function Degrees(Radians) {
        return Radians * (180/Math.PI)
    }

    function DrawNode(StartPos, EndPos, PrevFrame: WoWAPI.Frame, Talent: TTLPTalent, RequiredTalent: TTLPTalent, LineTex: string) {
        let [a, b, c, xOfs, yOfs] = PrevFrame.GetPoint(0)
        
        let x1 = StartPos.x
        let y1 = StartPos.y
        let x2 = EndPos.x
        let y2 = EndPos.y

        let DX = x1 - x2
        let DY = y1 - y2
        let Angle = Degrees(Math.atan2(DY, DX)) + 360
        let Length = Math.sqrt(Math.abs(x2 - x1)**2 + Math.abs(y2 - y1)**2) - 33.5

        let CX = (x1 + x2)/2
        let CY = (y1 + y2)/2

        if (CX === 0)
            CX -= 12/2

        if (!TreeCache.PrereqLines[RequiredTalent.Row])
            TreeCache.PrereqLines[RequiredTalent.Row] = []

        if (!TreeCache.PrereqLines[RequiredTalent.Row][RequiredTalent.Col])
            TreeCache.PrereqLines[RequiredTalent.Row][RequiredTalent.Col] = []

        if (!TreeCache.PrereqLines[RequiredTalent.Row][RequiredTalent.Col][Talent.SpellId]) {
            let Node = CreateFrame('Frame', `NodeLine:${Talent.TabId}:${Talent.SpellId}:${RequiredTalent.SpellId}`, TalentFrameContainer)
            Node.SetSize(Length, 12)
            Node.SetPoint('CENTER', CX, CY)
            Node.SetBackdrop({
                bgFile: LineTex
            })
            
            let Animation = Node.CreateAnimationGroup(`Spin`)
            let Spin = Animation.CreateAnimation('Rotation')
            Spin.SetOrder(1)
            Spin.SetDuration(0)
            Spin.SetDegrees(Angle)
            Spin.SetEndDelay(999999999)
            Spin.SetMaxFramerate(400)
            Animation.SetLooping('NONE')
            Animation.Stop()
            Animation.Play()

            let LineData = {
                Line: Node,
                Animation: Animation,
            }

            TreeCache.PrereqLines[RequiredTalent.Row][RequiredTalent.Col][Talent.SpellId] = LineData
        }
    }

    function InitializePrereqsAndLines(Talent: TTLPTalent, Tab: TalentTreeLayout) {
        Talent.Prereqs.forEach((Prereq) => {
            if (Prereq.Talent > 0) {
                let Required = FindSpellInTab(Tab, Prereq.Talent)
                if (Required != null) {
                    if (!TreeCache.Unlocks[Required.SpellId]) {
                        TreeCache.Unlocks[Required.SpellId] = []
                        TreeCache.UnlockCounts[Required.SpellId] = 1
                    }
                    
                    let count = TreeCache.UnlockCounts[Required.SpellId] 
                    TreeCache.Unlocks[Required.SpellId][count] = Talent.SpellId

                    TreeCache.UnlockCounts[Required.SpellId]++

                    if (TreeCache.PrereqUnlocks[Prereq.TabId] == null)
                        TreeCache.PrereqUnlocks[Prereq.TabId] = []

                    TreeCache.PrereqUnlocks[Prereq.TabId][Prereq.Talent] = 0

                    let offset = 0
                    if (Tab.TabType === 0)
                        offset += 11

                    let PrevFrame = GridTalentTalents[Required.Row-1][Required.Col + offset].Frame
                    let ThisFrame = GridTalentTalents[Talent.Row-1][Talent.Col + offset].Frame
                    
                    let LineTexturePath = CONSTANTS.UI.CONNECTOR_DISABLED

                    let StartPos = GetPositionXY(ThisFrame)
                    let EndPos = GetPositionXY(PrevFrame)
                    DrawNode(StartPos, EndPos, PrevFrame, Talent, Required, LineTexturePath)
                }
            }
        })
    }

    function CreateTooltip(Spell: number, NextSpellId: uint32, TFrame: WoWAPI.Frame) {
        FirstRankToolTip.SetOwner(TFrame, 'ANCHOR_RIGHT')
        SecondRankToolTip.SetOwner(FirstRankToolTip, 'ANCHOR_BOTTOM')

        FirstRankToolTip.SetHyperlink(`spell:${Spell}`)

        if (NextSpellId) {
            SecondRankToolTip.AddLine(`Next Rank: ${NextSpellId}`, 1, 1, 1)
            SecondRankToolTip.SetBackdropColor(0, 0, 0, 0,)
            SecondRankToolTip.AddLine('')
            SecondRankToolTip.SetPoint('TOP', FirstRankToolTip, 'TOP', 0, -(FirstRankToolTip.GetHeight() + 25))
            FirstRankToolTip.SetSize(FirstRankToolTip.GetWidth(), FirstRankToolTip.GetHeight())
        } else {
            FirstRankToolTip.SetSize(FirstRankToolTip.GetWidth(), FirstRankToolTip.GetHeight())
        }
    }

    function PopulateGridFromTab(Tab: TalentTreeLayout) {
        if (TalentFrameGridTalent)
            TalentFrameGridTalent.Hide()

        if (Tab.TalentsCount) {
            Tab.Talents.forEach((Talent) => {
                const {CurRank, SpellId, NextRankSpellId} = GetCurRankAndNextSpell(Tab.TabId, Talent)
                let CurrentRank = CurRank 
                let SpellInfo = GetSpellInfo(Talent.SpellId) 
                const [Name, Rank, Icon] = SpellInfo[0] ? SpellInfo : GetSpellInfo(5)
                let Col = Talent.Col
                let Row = Talent.Row-1
                let nRanks = Talent.NumRanks
                
                if (Tab.TabType === 0)
                    Col += 11

                let IsStarter = IsStarterForTab(Talent)

                let FrameData = GridTalentTalents[Row][Col]
                let Frame = FrameData.Frame 

                TreeCache.IndexToFrame[Tab.TabId][Talent.NodeIndex] = {row: Row, col: Col}
                TreeCache.Spells[Tab.TabId][Talent.NodeIndex] = 0

                if (!Frame)
                    return

                if (Talent.PrereqCount > 0)
                    InitializePrereqsAndLines(Talent, Tab)

                let FrameStatus = {
                    CanUpRank: false,
                    CanDeRank: false,
                    Update: true,
                    ReqsMet: false,
                    Init: false,
                    TooltipActive: false,
                }
                
                if (!GridChoiceTalents[Row]) 
                    GridChoiceTalents[Row] = []

                if (!GridChoiceTalents[Row][Col]) {
                    let ChoiceTalents =  CreateFrame('Frame', 'Choice_Talents', Frame)
                    ChoiceTalents.SetSize(200, 100)
                    ChoiceTalents.SetPoint('CENTER')
                    ChoiceTalents.Hide()

                    GridChoiceTalents[Row][Col] = ChoiceTalents
                }


                TreeCache.PointsSpent[Tab.TabId] = 0
                TreeCache.TotalInvests[Talent.TabPointReq] = 0

                FrameStatus.Init = true
                if (!FrameStatus[Row])
                    FrameStatusLookup[Row] = []

                FrameStatusLookup[Row][Col] = FrameStatus

                Frame.SetScript('OnHide', function() {
                    Talent.Prereqs.forEach((Req) => {
                        let Required = FindSpellInTab(Tab, Req.Talent)
                        if (Required) {
                            let LineData = TreeCache.PrereqLines[Required.Row][Required.Col][Talent.SpellId]
                            LineData.Line.Hide()
                        }
                    })
                })

                Frame.SetScript('OnShow', function() {
                    Talent.Prereqs.forEach((Req) => {
                        let Required = FindSpellInTab(Tab, Req.Talent)
                        if (Required) {
                            let LineData = TreeCache.PrereqLines[Required.Row][Required.Col][Talent.SpellId]
                            LineData.Line.Show()
                        }
                    })
                })

                Frame.SetScript('OnEnter', function() {
                    if (TreeCache.Points[Tab.TabType] < Talent.RankCost || TreeCache.PointsSpent[Tab.TabId] < Talent.TabPointReq || UnitLevel('player') < Talent.ReqLevel || !FrameStatus.ReqsMet) {
                        return
                    }
                    if (Talent.NodeType < 2) {
                        CreateTooltip(Talent.SpellId, NextRankSpellId, GridTalentTalents[Row][Col].Frame)
                        FrameStatus.TooltipActive = true
                    }
                })

                Frame.SetScript('OnLeave', function() {
                    FirstRankToolTip.Hide()
                    SecondRankToolTip.Hide()
                    FrameStatus.TooltipActive = false
                    GridChoiceTalents[Row][Col].Hide()
                })

                if (Talent.NodeType !== 2 && Talent.NumRanks > 1)
                    FrameData.RankText.SetText(CurrentRank === -1 ? 0 : CurrentRank)
                else
                    FrameData.RankText.Hide()

                Frame.SetScript('OnMouseDown', function(self, input) {
                    if (!IsStarter) {
                        let SpellRank = TreeCache.Spells[Tab.TabId][Talent.NodeIndex]
                        let Change = false

                        if (input === 'LeftButton' && FrameStatus.CanUpRank && Talent.NodeType < 2) {
                            if (SpellRank < nRanks) {
                                TreeCache.Spells[Tab.TabId][Talent.NodeIndex] = SpellRank + 1
                                TreeCache.PointsSpent[Tab.TabId] += Talent.RankCost

                                TreeCache.PrereqUnlocks[Tab.TabId][Talent.SpellId] = TreeCache.Spells[Tab.TabId][Talent.NodeIndex]

                                TreeCache.Points[Tab.TabType] -= Talent.RankCost
                                Change = true
                            }
                        } else if (input !== 'LeftButton' && FrameStatus.CanDeRank) {
                            if (TreeCache.Spells[Tab.TabId][Talent.NodeIndex] > 0) {
                                if (Talent.NodeType === 2) {
                                    TreeCache.Spells[Tab.TabId][Talent.NodeIndex] = 0
                                } else {
                                    TreeCache.Spells[Tab.TabId][Talent.NodeIndex] = SpellRank - 1
                                }
                                TreeCache.PointsSpent[Tab.TabId] -= Talent.RankCost

                                TreeCache.PrereqUnlocks[Tab.TabId][Talent.SpellId] = TreeCache.Spells[Tab.TabId][Talent.NodeIndex]

                                TreeCache.Points[Tab.TabType] += Talent.RankCost
                                Change = true
                            }
                        }
                        if (Change) {
                            FrameStatus.Update = true
                            FrameStatusLookup[Row][Col] = FrameStatus
                        }
                    }
                })

                Frame.SetScript('OnUpdate', function() {
                    ShowTalentPointType(Tab.TabType, Tab.TabId)

                    if (Talent.NodeType < 2)
                        FrameData.RankText.SetText(TreeCache.Spells[Tab.TabId][Talent.NodeIndex])

                    let PreventDerank = false
                    if (TreeCache.Unlocks[Talent.SpellId]) {
                        let RequiredBy : TSArray<number> = TreeCache.Unlocks[Talent.SpellId]
                        RequiredBy.forEach((Spell) => {
                            let By = FindSpellInTab(Tab, Spell)
                            let Dependency = TreeCache.Spells[Tab.TabId][By.NodeIndex]
                            if (Dependency > 0) {
                                let SumDependency = 0
                                By.Prereqs.forEach((Prereq) => {
                                    let OtherReq = FindSpellInTab(Tab, Prereq.Talent)
                                    SumDependency += OtherReq.NodeType === 2 ? Math.min(1, TreeCache.Spells[Prereq.TabId][OtherReq.NodeIndex]) : TreeCache.Spells[Prereq.TabId][OtherReq.NodeIndex]
                                })
                                let Value = Talent.NodeIndex === 2 ? Math.min(1, TreeCache.Spells[Talent.TabId][Talent.NodeIndex]) : TreeCache.Spells[Talent.TabId][Talent.NodeIndex]
                                PreventDerank ||= SumDependency - Value == 0
                            }

                            if (TreeCache.PrereqLines[Talent.Row]) {
                                if (TreeCache.PrereqLines[Talent.Row][Talent.Col]) {
                                    if (TreeCache.PrereqLines[Talent.Row][Talent.Col][By.SpellId]) {
                                        let Line : WoWAPI.Frame = TreeCache.PrereqLines[Talent.Row][Talent.Col][By.SpellId].Line
                                        if ((Talent.NumRanks === TreeCache.Spells[Tab.TabId][Talent.NodeIndex] && Talent.NodeType < 2) || (Talent.NodeType === 2 && TreeCache.Spells[Tab.TabId][Talent.NodeIndex] > 0)) {
                                            Line.SetBackdropColor(165/255, 142/255, 17/255, 1) 
                                        } else {
                                            Line.SetBackdropColor(82/255, 82/255, 82/255, 1) 
                                        }
                                    }
                                }
                            }
                        })
                    }
                    FrameStatus.CanDeRank = !PreventDerank

                    // if (Talent.StarterTabs > 0) {
                    //     console.log('Spell: '+Talent.SpellId)
                    //     Talent.Starter.forEach((Tap) => {
                    //         console.log(Tap)
                    //     })
                    // }

                    if (Talent.NodeType == 2) { // Choice node
                        if (GridChoiceTalents[Row][Col] && !ChoiceTalentData[Talent.SpellId]) {
                            let ChoiceTalents = GridChoiceTalents[Row][Col]
                            ChoiceTalents.SetParent(Frame)
                            ChoiceTalents.SetFrameStrata('FULLSCREEN')
                            ChoiceTalents.ClearAllPoints()
                            ChoiceTalents.SetPoint('CENTER', Frame, 'CENTER')

                            ChoiceTalentData[Talent.SpellId] = []
                            TreeCache.ChoiceNodes[Talent.NodeIndex] = []

                            Talent.Choices.forEach((ChoiceSpellId, i) => {
                                let Adjusted = i + 1
                                let ChoiceTalentButton = TreeCache.ChoiceNodes[Talent.NodeIndex][ChoiceSpellId]
                                if (!ChoiceTalentButton) {
                                    ChoiceTalentButton = CreateFrame('Button', `ChoiceTalentButton:${ChoiceSpellId}`, ChoiceTalents)
                                    ChoiceTalentButton.SetSize(50, 50)

                                    let ChoiceTexture = ChoiceTalentButton.CreateTexture(`ChoiceTexture:${Adjusted}`, 'BACKGROUND')
                                    ChoiceTexture.SetAllPoints(ChoiceTalentButton)

                                    let ChoiceBorderTexture = ChoiceTalentButton.CreateTexture(`ChoiceBorderTexture${Adjusted}`, 'ARTWORK')
                                    ChoiceBorderTexture.SetPoint('CENTER', 0, 2)
                                    ChoiceBorderTexture.SetSize(ChoiceTalentButton.GetWidth()*1.7, ChoiceTalentButton.GetHeight()*1.7)
                                    ChoiceBorderTexture.SetTexture(PATH+'Talents_DF')
                                    ChoiceBorderTexture.SetTexCoord(0.5, 0.5625, 0.125, 0.1875)
                                    ChoiceBorderTexture.SetVertexColor(0, 1, 0, 1)

                                    ChoiceTalentData[Talent.SpellId][Adjusted] = {
                                        Button: ChoiceTalentButton,
                                        Texture: ChoiceTexture,
                                        BorderTexture: ChoiceBorderTexture,
                                    }
                                }

                                const [ChoiceName, Skip, ChoiceIcon] = GetSpellInfo(ChoiceSpellId)
                                SetPortraitToTexture(ChoiceTalentData[Talent.SpellId][Adjusted].Texture, ChoiceIcon)
                                ChoiceTalentButton.SetPoint('CENTER', ChoiceTalents, 'CENTER', ((i - 1)* 60) + (30 * (Talent.ChoicesCount-1)), 0)
                                ChoiceTalentButton.Show()

                                ChoiceTalentButton.SetScript('OnMouseDown', function(self, input) {
                                    let change = false
                                    if (input === 'LeftButton') {
                                        let WasZero = TreeCache.Spells[Tab.TabId][Talent.NodeIndex] == 0
                                        TreeCache.Spells[Tab.TabId][Talent.NodeIndex] = Adjusted
                                        TreeCache.PointsSpent[Tab.TabId] += Talent.RankCost

                                        TreeCache.PrereqUnlocks[Tab.TabId][Talent.SpellId] = TreeCache.Spells[Tab.TabId][Talent.NodeIndex]

                                        if (WasZero)
                                            TreeCache.Points[Tab.TabType] -= Talent.RankCost

                                        change = true
                                    } else if (input !== 'LeftButton' && FrameStatus.CanDeRank) {
                                        if (TreeCache.Spells[Tab.TabId][Talent.NodeIndex] > 0) {
                                            TreeCache.Spells[Tab.TabId][Talent.NodeIndex] = 0

                                            TreeCache.PointsSpent[Tab.TabId] -= Talent.RankCost
                                            TreeCache.PrereqUnlocks[Tab.TabId][Talent.SpellId] = TreeCache.Spells[Tab.TabId][Talent.NodeIndex]
                
                                            TreeCache.Points[Tab.TabType] += Talent.RankCost
                                            change = true
                                        }
                                    }

                                    if (change) {
                                        FrameStatus.Update = true
                                        FrameStatusLookup[Row][Col] = FrameStatus
                                    }
                                })

                                ChoiceTalentButton.SetScript('OnEnter', function(self) {
                                    CreateTooltip(ChoiceSpellId, 0, ChoiceTalentButton)
                                    FrameStatus.TooltipActive = true
                                })

                                ChoiceTalentButton.SetScript('OnLeave', function (self) {
                                    FrameStatus.TooltipActive = false
                                })

                                ChoiceTalents.SetScript('OnHide', function() {
                                    FrameStatus.TooltipActive = false
                                    FirstRankToolTip.Hide()
                                })

                                TreeCache.ChoiceNodes[Talent.NodeIndex][ChoiceSpellId] = ChoiceTalentButton
                            })
                            GridChoiceTalents[Row][Col] = ChoiceTalents
                        }
                    }

                    if (Talent.NodeType === 2) {
                        let SpellLearned = TreeCache.Spells[Tab.TabId][Talent.NodeIndex]
                        let Set = false
                        Talent.Choices.forEach((Spell, i) => {
                            let Adjusted = i + 1
                            if (ChoiceTalentData[Talent.SpellId]) {
                                if (ChoiceTalentData[Talent.SpellId][Adjusted]) {
                                    let ButtonData = ChoiceTalentData[Talent.SpellId][Adjusted]

                                    if (SpellLearned == Adjusted) {
                                        ButtonData.BorderTexture.SetVertexColor(1, 1, 0, 1)
                                        const [n, r, SpellIcon] = GetSpellInfo(Spell)
                                        SetPortraitToTexture(FrameData.TextureIcon, SpellIcon)
                                        FrameData.TextureIcon.ClearAllPoints()
                                        FrameData.TextureIcon.SetSize(33.5, 33.5)
                                        FrameData.TextureIcon.SetPoint('CENTER', FrameData.Border, 'CENTER', 2, 1)
                                        FrameData.TextureIcon.Show()
                                        FrameData.TextureIconLeft.Hide()
                                        FrameData.TextureIconRight.Hide()
                                        FrameData.BorderTexture.SetTexCoord(0, 0.125, 0.25, 0.375)
                                        Set = true
                                    } else if (!Set) {
                                        ButtonData.BorderTexture.SetVertexColor(0, 1, 0, 1)
                                        FrameData.TextureIcon.Hide()
                                        FrameData.TextureIconLeft.Show()
                                        FrameData.TextureIconRight.Show()
                                    } else {
                                        ButtonData.BorderTexture.SetVertexColor(0, 1, 0, 1)
                                    }
                                }
                            }
                        })

                        let debug1 = TreeCache.Points[Tab.TabType] < Talent.RankCost
                        let debug2 = TreeCache.PointsSpent[Tab.TabId] < Talent.TabPointReq 
                        let debug3 = UnitLevel('player') < Talent.ReqLevel || !FrameStatus.ReqsMet

                        if ( debug1 || debug2 || debug3) {
                            if (Talent.NumRanks > TreeCache.Spells[Tab.TabId][Talent.NodeIndex] || (Talent.NodeType === 2 && TreeCache.Spells[Tab.TabId][Talent.NodeIndex] === 0)) {
                                FrameData.TextureIcon.SetDesaturated(true)
                                if (FrameData.Border && FrameData.BorderTexture) {
                                    FrameData.BorderTexture.SetDesaturated(true)
                                    FrameData.TextureIconLeft.SetDesaturated(true)
                                    FrameData.TextureIconRight.SetDesaturated(true)
                                }
                                FrameStatus.CanUpRank = false
                            } 
                        } else {
                            FrameData.TextureIcon.SetDesaturated(false)
                            if (FrameData.Border && FrameData.BorderTexture) {
                                FrameData.BorderTexture.SetDesaturated(false)
                                FrameData.TextureIconLeft.SetDesaturated(false)
                                FrameData.TextureIconRight.SetDesaturated(false)
                            }
                            FrameStatus.CanUpRank = true
                        }
                    }

                    if (TreeCache.Spells[Tab.TabId][Talent.NodeIndex] <= 0) {
                        FrameData.BorderTexture.SetVertexColor(0, 1, 0, 1)
                        if (Talent.NodeType === 2) {
                            FrameData.BorderTexture.SetTexCoord(0, 0.125, 0.625, 0.75)
                            
                        }
                    } else if (TreeCache.Spells[Tab.TabId][Talent.NodeIndex] > 0 && Talent.NodeType == 2) {
                        FrameData.BorderTexture.SetTexCoord(0, 0.125, 0.25, 0.375)
                        FrameData.BorderTexture.SetVertexColor(1, 1, 0, 1)
                    } else if (Talent.NumRanks = TreeCache.Spells[Tab.TabId][Talent.NodeIndex]) {
                        FrameData.BorderTexture.SetVertexColor(1, 1, 0, 1)
                    }

                    if (Talent.PrereqCount > 0) {
                        let Met = false
                        Talent.Prereqs.forEach((Prereq) => {
                            if (TreeCache.PrereqUnlocks[Prereq.TabId] && !Met) {
                                let ReqUnlocked = TreeCache.PrereqUnlocks[Prereq.TabId][Prereq.Talent]
                                if (ReqUnlocked) {
                                    if (ReqUnlocked >= Prereq.ReqRank) {
                                        Met = true
                                    }
                                    else
                                        Met = false
                                } else {
                                    Met = false
                                }
                            }
                        })
                        FrameStatus.ReqsMet = Met
                    } else {
                        FrameStatus.ReqsMet = true
                    }

                    if (Talent.NodeType === 2) {
                        if (IsMouseOverFrame(Frame, 25) && FrameStatus.ReqsMet && (TreeCache.Spells[Tab.TabId][Talent.NodeIndex] > 0 || TreeCache.Points[Tab.TabType] >= Talent.RankCost))
                            GridChoiceTalents[Row][Col].Show()
                        else
                            GridChoiceTalents[Row][Col].Hide()
                    }

                    if (TreeCache.Points[Tab.TabType] < Talent.RankCost || TreeCache.PointsSpent[Tab.TabId] < Talent.TabPointReq || UnitLevel('player') < Talent.ReqLevel || !FrameStatus.ReqsMet) {
                        if (Talent.NumRanks > TreeCache.Spells[Tab.TabId][Talent.NodeIndex]) {
                            FrameData.TextureIcon.SetDesaturated(true)
                            if (FrameData.Border && FrameData.BorderTexture) {
                                FrameData.BorderTexture.SetDesaturated(true)
                            } 
                        }
                        FrameStatus.CanUpRank = false
                    } else if (Talent.NumRanks > TreeCache.Spells[Tab.TabId][Talent.NodeIndex] || (Talent.NodeType === 2 && TreeCache.Spells[Tab.TabId][Talent.NodeIndex] === 0)) {
                        FrameData.TextureIcon.SetDesaturated(false)
                        if (FrameData.Border && FrameData.BorderTexture) {
                            FrameData.BorderTexture.SetDesaturated(false)
                        }
                        FrameStatus.CanUpRank = true
                    } else {
                        FrameStatus.CanUpRank = false
                    }
                    FrameStatus.Update = false
                    FrameStatusLookup[Row][Col] = FrameStatus
                })

                if (Talent.NodeType === 0) {
                    SetPortraitToTexture(FrameData.TextureIcon, Icon)
                    FrameData.BorderTexture.ClearAllPoints()
                    FrameData.BorderTexture.SetPoint('CENTER', FrameData.Border, 'CENTER', 2, 2)
                    FrameData.BorderTexture.SetSize(60, 60)
                    FrameData.TextureIcon.ClearAllPoints()
                    FrameData.TextureIcon.SetPoint('CENTER', FrameData.Border, 'CENTER')
                    FrameData.TextureIcon.SetSize(35, 35)
                    FrameData.TextureIcon.Show()
                    FrameData.TextureIconLeft.Hide()
                    FrameData.TextureIconRight.Hide()
                } else if (Talent.NodeType === 1) {
                    FrameData.TextureIcon.SetTexture(Icon)
                    FrameData.BorderTexture.ClearAllPoints()
                    FrameData.BorderTexture.SetPoint('CENTER', FrameData.Border, 'CENTER', 2, -3)
                    FrameData.BorderTexture.SetSize(59, 59)
                    FrameData.TextureIcon.Show()
                    FrameData.TextureIconLeft.Hide()
                    FrameData.TextureIconRight.Hide()
                }

                if (Talent.NodeType == 2) {
                    if (Talent.ChoicesCount >= 2) {
                        const [SpellId1, SpellId2] = Talent.Choices
                        const [a, b, Icon1] = GetSpellInfo(SpellId1)
                        const [c, d, Icon2] = GetSpellInfo(SpellId2)

                        if (!Icon1 || !Icon2) {
                            console.log(`Error, missing texture for 1 or more choices for: ${Talent.SpellId}`)
                            return
                        }

                        FrameData.TextureIconLeft.SetSize(16.75, 33.5)
                        FrameData.TextureIconLeft.SetPoint('LEFT', FrameData.TextureIcon, 'LEFT', -2, 0)
                        FrameData.TextureIconLeft.SetTexCoord(0, 0.5, 0, 1)

                        FrameData.TextureIconRight.SetSize(16.75, 33.35)
                        FrameData.TextureIconRight.SetPoint('LEFT', FrameData.TextureIcon, 'LEFT', 18.75, 0)
                        FrameData.TextureIconRight.SetTexCoord(0.5, 1, 0, 1)

                        FrameData.BorderTexture.ClearAllPoints()
                        FrameData.BorderTexture.SetPoint('CENTER', FrameData.Border, 'CENTER', 0.5, 0.5)
                        FrameData.BorderTexture.SetSize(65, 65)

                        SetPortraitToTexture(FrameData.TextureIconLeft, Icon1)
                        SetPortraitToTexture(FrameData.TextureIconRight, Icon2)
                    }
                }

                let TextureSettings = {
                    0: {Desaturate: false, Coords: {minX: 0.5, maxX: 0.5625, minY: 0.125, maxY: 0.1875}},
                    1: {Desaturate: false, Coords: {minX: 0.125, maxX: 0.25, minY: 0.625, maxY: 0.75}},
                }
                if (Talent.NodeType !== 2) {
                    let Settings = TextureSettings[Talent.NodeType]

                    if (Settings) {
                        FrameData.BorderTexture.SetDesaturated(Settings.Desaturate)
                        FrameData.TextureIcon.SetDesaturated(Settings.Desaturate)
                        FrameData.BorderTexture.SetTexCoord(Settings.Coords.minX, Settings.Coords.maxX, Settings.Coords.minY, Settings.Coords.maxY)
                    }
                }

                Frame.Show()
            })
        }
    }

    function GetPointsByType(type: number) {
        return TreeCache.Points[type]
    }

    function ShowTalentPointType(Type: number, TabId: number) {
        let Tab = TabId === TalentTree.ClassTree ? TalentTree.ClassTab : TalentTree.TalentTrees[TabId]
        let ClassName = UnitClass('player')[0]

        if (!Tab) 
            return;

        if (Type === 0) {
            PointsBottomLeft.SetText(`${ClassName} points available: ${GetPointsByType(7)}`)
            PointsBottomRight.SetText(`${Tab.TabName} points available: ${GetPointsByType(0)}`)
        } else {
            PointsBottomLeft.SetText(`${ClassName} points available: ${GetPointsByType(7)}`)
        }
    }

    let OriginalButtonTextures = []

    function SaveOriginalButtonTextures(button: WoWAPI.Button, tabId: number) {
        if (!OriginalButtonTextures[tabId]) {
            OriginalButtonTextures[tabId] = {
                normal: button.GetNormalTexture() || null,
                pushed: button.GetPushedTexture() || null,
                highlight: button.GetHighlightTexture() || null,
            }
        }
    }

    function UpdateButtonTexture(button: WoWAPI.Button, textureKey, texturePath: string) {
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

    function UpdateActiveSpecButton(Tab: TalentTreeLayout) {
        let LeftData = FrameData.PlayerTalentFrameTabsLeftData[Tab.TabId]
        if (LeftData) {
            let TabSelected = Tab.TabId === TalentTree.SelectedSpec
            let Button = LeftData.SpecButton

            SaveOriginalButtonTextures(Button, Tab.TabId)
            if (TabSelected) {
                Button.SetText('Active')
                Button.SetNormalFontObject('GameFontHighlightSmall')
                Button.SetNormalTexture(null)
                Button.SetPushedTexture(null)
                Button.SetHighlightTexture(null)
                Button.GetFontString().SetTextColor(0, 1, 0)
                Button.SetButtonState('PUSHED')
            } else {
                Button.SetText('Activate')
                Button.SetNormalFontObject('GameFontNormalSmall')
                Button.SetButtonState('NORMAL')

                let Textures = OriginalButtonTextures[Tab.TabId]
                UpdateButtonTexture(Button, 'normal', Textures.normal)
                UpdateButtonTexture(Button, 'pushed', Textures.pushed)
                UpdateButtonTexture(Button, 'highlight', Textures.highlight)
                Button.GetFontString().SetTextColor(1, 1, 1)
            }
        }
    }

    let LastPushedTabId = null
    function SelectTab(Tab: TalentTreeLayout) {
        HideAllNodes()

        TalentTree.SelectedTab = Tab

        if (Tab.TabType === 0) {
            TreeCache.IndexToFrame[Tab.TabId] = []

            TreeCache.Spells[Tab.TabId] = []

            TreeCache.PrereqUnlocks[Tab.TabId] = []

            if (Tab.TalentsCount) {
                PopulateGridFromTab(Tab)

                if (!TreeCache.IndexToFrame.includes(TalentTree.ClassTree+1))
                    TreeCache.IndexToFrame[TalentTree.ClassTree] = []

                if (!TreeCache.Spells.includes(TalentTree.ClassTree+1))
                    TreeCache.Spells[TalentTree.ClassTree] = []

                if (!TreeCache.PrereqUnlocks.includes(TalentTree.ClassTree+1))
                    TreeCache.PrereqUnlocks[TalentTree.ClassTree] = []

                PopulateGridFromTab(TalentTree.ClassTab)
            }
            TalentFrameGridTalent.Show()
        } else 
            TalentFrameGridTalent.Hide()

        ShowTalentPointType(Tab.TabType, Tab.TabId)
        if (TalentTree.SelectedTab) {
            FrameData.PlayerTalentFrameTabsLeftData[Tab.TabId].Frame.SetButtonState('NORMAL', 1)
        }

        if (LastPushedTabId && FrameData.PlayerTalentFrameTabsLeftData[LastPushedTabId+1]) {
            FrameData.PlayerTalentFrameTabsLeftData[LastPushedTabId+1].Frame.SetButtonState('NORMAL', 1)
            let BGPath = PATH + TalentTree.TalentTrees[LastPushedTabId+1].TabBg
            TalentFrameContainerBackground.SetTexture(BGPath)
        }

        if (FrameData.PlayerTalentFrameTabsLeftData[Tab.TabId]) {
            FrameData.PlayerTalentFrameTabsLeftData[Tab.TabId].Frame.SetButtonState('PUSHED', 1)
            LastPushedTabId = Tab.TabId

            let BGPath = PATH + Tab.TabBg
            TalentFrameContainerBackground.SetTexture(BGPath)
        }

        TalentTree.Tabs.forEach((TabId) => {
            let Layout = TalentTree.TalentTrees[TabId+1]
            UpdateActiveSpecButton(Layout)
        })
    }

    function LoadTalentString(Talents: string, force: bool = false) {
        let ToggleFrame = !TalentFrame.IsVisible()
        if (ToggleFrame)
            TalentMicroButton.Click()

        let Type = Util.alpha.indexOf(Talents[0]) - 1
        let Spec = Util.alpha.indexOf(Talents[1])
        let Class = Util.alpha.indexOf(Talents[2])
        if (Type === 0 && Talents.length > 3 && Spec === TalentTree.SelectedSpec && Class == GetClassId(UnitClass('player')[1]) ) {
            if (TalentTree.ActiveString !== Talents) {
                SelectTab(TalentTree.TalentTrees[Spec])
                let SpecTab: TalentTreeLayout = TalentTree.SelectedTab
                let ClassTab: TalentTreeLayout = TalentTree.ClassTab
 
                let ClassTreeLen = ClassTab.TalentsCount ? ClassTab.TalentsCount : 0
                TreeCache.Points[0] = TalentTree.MaxPoints[0]
                TreeCache.PointsSpent[SpecTab.TabId] = 0
                if (Type === 0) {
                    TreeCache.Points[7] = TalentTree.MaxPoints[7]
                    TreeCache.PointsSpent[ClassTab.TabId] = 0
                }

                let ClassString = Talents.substring(3, 3 + ClassTreeLen)
                
                ClassTab.Talents.forEach((Talent) => {
                    TreeCache.Spells[Talent.TabId][Talent.NodeIndex] = 0
                    let Rank = Util.alpha.indexOf(ClassString[Talent.NodeIndex-1]) - 1
                    let Cost = Talent.RankCost * Rank
                    if (!IsStarterForTab(Talent)) {
                        if (Talent.NodeType == 2 && Rank > 0)
                            Cost = Talent.RankCost
                        TreeCache.Points[7] -= Cost
                        TreeCache.PointsSpent[ClassTab.TabId] += Cost
                    }
                    TreeCache.Spells[Talent.TabId][Talent.NodeIndex] = Rank
                    TreeCache.PrereqUnlocks[Talent.TabId][Talent.SpellId] = Rank
                })

                let SpecString = Talents.substring(3 + ClassTreeLen)
                SpecTab.Talents.forEach((Talent) => {
                    TreeCache.Spells[Talent.TabId][Talent.NodeIndex] = 0
                    let Rank = Util.alpha.indexOf(SpecString[Talent.NodeIndex-1]) - 1
                    let Cost = Rank * Talent.RankCost
                    if (!IsStarterForTab(Talent)) {
                        if (Talent.NodeType == 2 && Rank > 0)
                            Cost = Talent.RankCost
                        TreeCache.Points[Type] -= Cost
                        TreeCache.PointsSpent[SpecTab.TabId] += Cost
                    }
                    TreeCache.Spells[Talent.TabId][Talent.NodeIndex] = Rank
                    TreeCache.PrereqUnlocks[Talent.TabId][Talent.SpellId] = Rank
                })

                TalentTree.ActiveString = Talents
            }
        }
        if (ToggleFrame)
            TalentMicroButton.Click()
    }

    function IsStarterForTab(Talent: TTLPTalent) : bool {
        let out = false
        if (Talent.StarterTabs > 0) {
            Talent.Starter.forEach((TabId) => {
                if (TalentTree.SelectedSpec === TabId)
                    out = true
            })
        }

        return out
    }

    function DeselectAllTalents() {
        ClassSpecWindowLockout.Show()
        let SpecTab: TalentTreeLayout = TalentTree.SelectedTab
        let ClassTab: TalentTreeLayout = TalentTree.ClassTab
        TreeCache.PointsSpent[SpecTab.TabId] = 0
        TreeCache.Points[0] = TalentTree.MaxPoints[0]
        SpecTab.Talents.forEach((Talent: TTLPTalent) => {
            if (!IsStarterForTab(Talent)) {
                let Row = Talent.Row - 1
                let Col = Talent.Col + 11
                let FrameStatus = FrameStatusLookup[Row][Col]
                if (FrameStatus && TreeCache.Spells[Talent.TabId][Talent.NodeIndex] > 0) {
                    TreeCache.Spells[Talent.TabId][Talent.NodeIndex] = 0
                    TreeCache.PrereqUnlocks[Talent.TabId][Talent.SpellId] = 0

                    FrameStatus.Update = true
                    FrameStatusLookup[Row][Col] = FrameStatus
                }
            }
        })

        TreeCache.PointsSpent[ClassTab.TabId] = 0
        TreeCache.Points[7] = TalentTree.MaxPoints[7]
        ClassTab.Talents.forEach((Talent) => {
            if (!IsStarterForTab(Talent)) {
                let Row = Talent.Row - 1
                let Col = Talent.Col
                let FrameStatus = FrameStatusLookup[Row][Col]
                if (FrameStatus && TreeCache.Spells[Talent.TabId][Talent.NodeIndex] > 0) {
                    TreeCache.Spells[Talent.TabId][Talent.NodeIndex] = 0
                    TreeCache.PrereqUnlocks[Talent.TabId][Talent.SpellId] = 0

                    FrameStatus.Update = true
                    FrameStatusLookup[Row][Col] = FrameStatus
                }
            }
        })
        ClassSpecWindowLockout.Hide()
    }

    function BuildLoadoutString() {
        let out = 'A'

        let SpecTab: TalentTreeLayout = TalentTree.SelectedTab
        out += Util.alpha.charAt(SpecTab.TabId)
        let ClassId = GetClassId(UnitClass('player')[1])
        out += Util.alpha.charAt(ClassId)

        let ClassTab: TalentTreeLayout = TalentTree.ClassTab
        for (let i = 1; i < ClassTab.TalentsCount + 1; i++) {
            let Rank = TreeCache.Spells[ClassTab.TabId][i]
            if (Rank == null) {
                TreeCache.Spells[ClassTab.TabId][i] = 0
                Rank = 0
            }
            out += Util.alpha.charAt(Rank + 1)
        }
        for (let i = 1; i < SpecTab.TalentsCount + 1; i++) {
            let Rank = TreeCache.Spells[SpecTab.TabId][i]
            if (Rank == null) {
                TreeCache.Spells[SpecTab.TabId][i] = 0
                Rank = 0
            }
            out += Util.alpha.charAt(Rank + 1)
        }

        return out
    }

    // ---------------------------- HOOKS FOR CALLBACKS ---------------------------- \\

    OnCustomPacket(ClientCallbackOperations.GET_CHARACTER_SPECS,pkt=>{ 
        let Reader = new GetCharacterSpecsPayload()
        let payload = Reader.read(pkt)
        if (payload.SpecCounts > 0) {
            payload.Specs.forEach((spec) => {
                TalentTree.SelectedSpec = spec.SpecTabId
                TalentTree.ActiveSpec = spec
                
                spec.Points.forEach((Point) => {
                    TreeCache.Points[Point.Type] = Point.SpecPointSum
                    TalentTree.MaxPoints[Point.Type] = Point.AbsoluteMax
                })
            })

            if (TalentTree.INITIALIZED && TalentTree.SelectedTab) {
                ShowTalentPointType(TalentTree.SelectedTab.TabType, TalentTree.SelectedTab.TabId)
            }  else {
                InitializeTabsLeft()
                InitializeTalentPointDisplay()

                SelectTab(TalentTree.TalentTrees[TalentTree.FirstTab])
            }
            TalentTree.INITIALIZED = true
            SendCallbackToServer(ClientCallbackOperations.GET_TALENTS, '-1')
            SendCallbackToServer(ClientCallbackOperations.GET_LOADOUTS, '-1')
        }
    })

    OnCustomPacket(ClientCallbackOperations.LEARN_TALENT_ERROR,pkt=>{
        OnTalentError(pkt)
    })
    OnCustomPacket(ClientCallbackOperations.TALENT_TREE_LAYOUT,pkt=>{ 
        GetTalentTreeLayout(pkt)
    })
    OnCustomPacket(ClientCallbackOperations.LEVELUP, pkt=> {
        console.log(pkt.ReadString())
    })
    OnCustomPacket(ClientCallbackOperations.GET_TALENTS, pkt => {
        let Loadout = pkt.ReadString()
        LoadTalentString(Loadout)
    })
    OnCustomPacket(ClientCallbackOperations.ACTIVATE_CLASS_SPEC, pkt => {
        let Message = pkt.ReadString()
        let Show = Message === 'Show'
        if (Show)
            ClassSpecWindowLockout.Show()
        else {
            TalentFrame.Show()
            ClassSpecWindowLockout.Hide()
            ClassSpecWindow.Hide()
        }
    })

    SendCallbackToServer(ClientCallbackOperations.TALENT_TREE_LAYOUT, '-1')
}

// export function SaveLoadout(id, name, loadout) {
//     if (!loadoutString.length) { 
//         loadoutString = BuildLoadoutString()
//     }
//     let item = {
//         name: name,
//         loadout: loadoutString
//     }
//     TalentTree.TalentLoadoutCache[TalentTree.SelectedTab.Id][id] = item
// }

export function AdjustFrameScale(frame: WoWAPI.Frame) {
    let maxScale = 0.85
    let minScale = 0.3

    let screenWidth = UIParent.GetWidth()
    let screenHeight = UIParent.GetHeight()
    let windowWidth = frame.GetWidth()
    let windowHeight = frame.GetHeight()

    let scaleWidth = screenWidth / windowWidth
    let scaleHeight = screenHeight / windowHeight
    let newScale = Math.min(scaleWidth, scaleHeight, maxScale)
    newScale = Math.max(newScale, minScale)

    frame.SetScale(newScale)
}

let ValidTabs: TSArray<number> = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 
    18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32,

    64, 63, 62, 61, 60, 59, 58, 57, 56, 55, 54, 53, 52, 51
]

export function SendCallbackToServer(op: ClientCallbackOperations, msg: string) {
    let packet = new SimpleMessagePayload(op, msg)
    packet.write().Send()
}

export function OnTalentError(pkt: TSPacketRead) {
    let customPacket = new SimpleMessagePayload(ClientCallbackOperations.TALENT_TREE_LAYOUT, "")
    customPacket.read(pkt)
    console.log(customPacket.message)
}

export function OnSpecError(pkt: TSPacketRead) {
    let customPacket = new SimpleMessagePayload(ClientCallbackOperations.ACTIVATE_SPEC_ERROR, "")
    customPacket.read(pkt)
    console.log(customPacket.message)
}

export function GetTalentTreeLayout(pkt: TSPacketRead) {
    let Reader = new GetTalentTreeLayoutPayload()
    let payload = Reader.read(pkt)
    TalentTree.Tabs = []
    // todo Send them all at once
    if (payload) {
        if (payload.TabCount) {
            payload.Tabs.forEach((layout) => {
                if (ValidTabs.includes(layout.TabId)) { // strange bug on first login where it gives a decimal tab id, just ignore it
                    if (layout.TabType === 7) {
                        TalentTree.ClassTab = layout
                        TalentTree.ClassTree = layout.TabId
                    } else {
                        TalentTree.FirstTab = TalentTree.FirstTab > layout.TabId ? layout.TabId : TalentTree.FirstTab 
                        TalentTree.TalentTrees[layout.TabId] = layout
                        TalentTree.Tabs.push(layout.TabId)
                    }
                }
            })
            SendCallbackToServer(ClientCallbackOperations.GET_CHARACTER_SPECS, '-1')
        }
    }
}

export function PlayerTalentFrameToggle(Show: number) {
    if (Show > 0) {
        FrameData.LastFrame.Show()
    } else {
        FrameData.LastFrame.Hide()
    }
}
