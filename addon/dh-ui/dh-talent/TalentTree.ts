import { Backdrop, CONSTANTS, GetClassId, PATH, Util } from './Constants';
import { ClientCallbackOperations, SimpleMessagePayload } from '../../../shared/Messages';
import { GetTalentTreeLayoutPayload, TalentTreeLayoutPayload } from '../../../shared/Payloads/TalentTreeLayoutPayload';
import { CPSSpec, CharacterSpecsPayload, GetCharacterSpecsPayload } from '../../../shared/Payloads/GetCharacterSpecsPayload';

// caches for intraaddon info sharing
export let TalentTree = {
    TalentTrees: [],
    ActiveSpec: new CPSSpec(),
    SpecsTab: [],
    SpecSlots: [],
    SelectedTab: null,
    Talents: null,
    INITIALIZED: false,
    SelectedSpec: null,
    MaxPoints: [],
    ClassTree: null,
    ClassTab: null,
    TalentLoadoutCache: [],
    CurrentLoadout: null,
    PrevLoadout: null,
    ActiveString: null,
}
export let TreeCache = {
    Spells: [],
    PointsSpent: [],
    Investments: [],
    TotalInvests: [],
    PrereqUnlocks: [],
    PrereqRev: [],
    Points: [],
    PreviousString: [],
    IndexToFrame: [],
    ChoiceNodes: []
}

export let loadoutString: string = ''

export let PlayerTalentFrame
export let PlayerSpecFrame
export let GridTalentTalents = []
export let GridTalentTalentsNodes = []

let FirstRankToolTip = CreateFrame("GameTooltip", "firstRankToolTip", WorldFrame, "GameTooltipTemplate");
let SecondRankToolTip = CreateFrame("GameTooltip", "secondRankToolTip", WorldFrame, "GameTooltipTemplate");

export function TalentTreeUI() {

    let TalentFrame = CreateFrame('Frame', 'CustomTalentFrame', UIParent);
    TalentFrame.SetSize(1000, 800)
    TalentFrame.SetScale(0.9)
    TalentFrame.SetPoint('CENTER', 0, 50)
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

    let ClassSpecWindow = CreateFrame('Frame', 'ClassSpecWindow', UIParent);
    ClassSpecWindow.SetSize(1000, 800)
    ClassSpecWindow.SetPoint('CENTER', 0, 50)
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
        SpecTabButton.SetFrameStrata('MEDIUM')
        SpecTabButton.SetScript('OnClick', function() {
            if (TalentFrame.IsVisible()) {
            TalentFrame.Hide()
            ClassSpecWindow.Show()
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
        TalentTabButton.SetFrameStrata('MEDIUM')
        TalentTabButton.SetScript('OnClick', function() {
            if (ClassSpecWindow.IsVisible()) {
                ClassSpecWindow.Hide()
                TalentFrame.Show()
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
    BackgroundSpec.SetDrawLayer('BACKGROUND', -1)
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
            window.Hide()
            
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
        ClassIconTexture.SetDrawLayer('ARTWORK', 1)
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

    let TalentFrameContainerBackground = TalentFrame.CreateTexture(null, 'BACKGROUND')
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
    let TalentFrame_ChoiceSpecs_Spec = {};
    TalentFrame_ChoiceSpecs.Show();

    let AcceptTalentsButton = CreateFrame('Button', 'AcceptTalentsButton', TalentFrame, 'UIPanelButtonTemplate')
    AcceptTalentsButton.SetSize(200, 30)
    AcceptTalentsButton.SetPoint('BOTTOM', 0, 30)
    AcceptTalentsButton.SetText('Apply Changes')
    AcceptTalentsButton.Show()

    let resetButton = CreateFrame('Button', 'ResetTalentsButton', TalentFrame, 'UIPanelButtonTemplate')
    resetButton.SetSize(115, 40)
    resetButton.SetPoint('RIGHT', AcceptTalentsButton, 'RIGHT', 150, 0)
    resetButton.SetText('Reset Talents')
    resetButton.Show()

    resetButton.SetScript('OnClick', function() {
        //StaticPopup_Show('CONFIRM_TALENT_WIPE')
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

    TalentTree.ClassTree = GetClassTree(UnitClass('player'))

    function InitializeGridForTalents() {
        let GridTalent = CreateFrame('Frame', 'TalentFrameGridTalent', TalentFrameContainer)
        GridTalent.SetAllPoints()
    
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
                TextureIcon.SetTexture(spellInfo[2])
        
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

                GridTalentTalents[i][j] = Talent
                GridTalentTalentsNodes[i][j] = []
            }
        }
    }

    TalentFrame.Hide()
    ClassSpecWindow.Hide()
    let PlayerTalentFrameTabsLeft = null

    let TalentTabsLeftSpec = []
    function InitializeTabsLeft() {
        if (!PlayerTalentFrameTabsLeft) {
            let tabsLeft = CreateFrame("Frame", "ClassSpecWindow_TabsLeft", ClassSpecWindow)
            tabsLeft.SetFrameLevel(5);
            tabsLeft.SetSize(875, ClassSpecWindow.GetHeight());
            tabsLeft.SetPoint("TOPLEFT", -500, 300)
            TalentTabsLeftSpec = []

            let TabCount = TalentTree.TalentTrees.length
            let StartX = 73
            if (TabCount >= 2)
                StartX = 192
            else if (TabCount >= 4)
                StartX = 10

            TalentTree.TalentTrees.forEach((Tree, TabId) => {
                if (Tree) {
                    let ActiveSpec: CPSSpec = TalentTree.ActiveSpec
                    let PointSpent = ActiveSpec.PointsSpent
                    console.log(PointSpent)
                    let uClass = UnitClass('player')

                    let Spec = CreateFrame('Button', 'ClassSpecWindow_TabLefts_Spec'+Tree.Id, tabsLeft)
                    Spec.SetPoint('CENTER', StartX, -265)
                    Spec.SetSize(498, 795)
                    Spec.SetFrameLevel(5)

                    let button = CreateFrame('Button', 'ClassSpecWindow_TabLefts_Spec_Button'+Tree.Id, tabsLeft)
                    button.SetPoint('LEFT', StartX, -50)
                    button.SetSize(1, 1)

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

                    let ClickInterceptor = CreateFrame('Button', 'clickInterceptor', tabsLeft)
                    ClickInterceptor.SetAllPoints(tabsLeft)
                    ClickInterceptor.EnableMouse(true)
                    ClickInterceptor.SetFrameLevel(tabsLeft.GetFrameLevel()+1)


                    Spec.SetNormalTexture(NormalTex)
                    ClickInterceptor.SetHighlightTexture(HilightTex)
                    Spec.SetPushedTexture(PushedTex)
                    Spec.SetDisabledTexture(LockedTex)

                    let Circle = CreateFrame('Frame', 'ClassSpecWindow_TabsLeft_Spec_Circle', tabsLeft)
                    Circle.SetPoint('TOP', 0, -30)
                    Circle.SetFrameLevel(10)
                    Circle.SetSize(200, 200)
                    Circle.SetBackdrop({bgFile: CONSTANTS.UI.SPEC_RING})

                    let Slot = CreateFrame('Frame', 'IconSlot', Circle)
                    Slot.SetAllPoints()
                    Slot.SetFrameLevel(9)

                    let CircleTex = Slot.CreateTexture('$parentNormalTexture', 'BACKGROUND')
                    CircleTex.SetAllPoints()
                    CircleTex.SetTexture(PATH + `\\tabBG\\SpecThumbs\\${uClass}_${Tree.Name}`)

                    let Title = Circle.CreateFontString()
                    Title.SetFont("Fonts\\FRIZQT__.TTF", 40, "OUTLINE")
                    Title.SetPoint('BOTTOM', 0, 0)
                    Title.SetText(Tree.Name)
                }
            })

            PlayerTalentFrameTabsLeft = tabsLeft
        }
    }

    InitializeGridForTalents()

    PlayerTalentFrame = TalentFrame
    PlayerSpecFrame = ClassSpecWindow

    // ---------------------------- HOOKS FOR CALLBACKS ---------------------------- \\

    OnCustomPacket(ClientCallbackOperations.GET_CHARACTER_SPECS,pkt=>{ 
        let Reader = new GetCharacterSpecsPayload()
        let layout = Reader.read(pkt)
        print(layout.SpecCounts)
        if (layout.SpecCounts) {
            console.log(`Received ${ClientCallbackOperations.GET_CHARACTER_SPECS}: for ${layout.SpecCounts} specs`)
            layout.Specs.forEach((spec) => {
                if (spec.Active) {
                    TalentTree.SelectedSpec = spec.SpecTabId
                    TalentTree.ActiveSpec = spec
                    spec.Points.forEach((Point) => {
                        TreeCache.Points[Point.Type] = Point.SpecPointSum
                        TalentTree.MaxPoints[Point.Type] = Point.AbsoluteMax
                    })
                } else {
                    TalentTree.SpecSlots[spec.Id] = spec
                }
            })

            if (TalentTree.INITIALIZED && TalentTree.SelectedTab) {
                //ShowTypeTalentPoint(TalentTree.SelectedTab.TalentType, TalentTree.SelectedTab.Id)
            }  else {
                InitializeTabsLeft()
            }
            TalentTree.INITIALIZED = true
            SendCallbackToServer(ClientCallbackOperations.GET_TALENTS, '-1')
            //SendCallbackToServer(ClientCallbackOperations.GET_LOADOUTS, '-1')
        }
    })

    OnCustomPacket(ClientCallbackOperations.LEARN_TALENT_ERROR,pkt=>{
        OnTalentError(pkt)
    })
    OnCustomPacket(ClientCallbackOperations.TALENT_TREE_LAYOUT,pkt=>{ 
        GetTalentTreeLayout(pkt)
    })

    SendCallbackToServer(ClientCallbackOperations.TALENT_TREE_LAYOUT, '-1')
}

export function SaveLoadout(id, name, loadout) {
    if (!loadoutString.length) { 
        loadoutString = BuildLoadoutString()
    }
    let item = {
        name: name,
        loadout: loadoutString
    }
    TalentTree.TalentLoadoutCache[TalentTree.SelectedTab.Id][id] = item
}

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

export function BuildLoadoutString() {
    let out = ''

    out += Util.alpha.charAt(TalentTree.SelectedTab.TalentType + 1)
    out += Util.alpha.charAt(TalentTree.SelectedTab.Id)
    out += Util.alpha.charAt(GetClassId(UnitClass('player')))

    TreeCache.Spells[TalentTree.ClassTree].forEach((rank, i) => {
        out += Util.alpha.charAt(rank + 1)
    })
    TreeCache.Spells[TalentTree.SelectedTab.Id].forEach((rank, i) => {
        out += Util.alpha.charAt(rank + 1)
    })
    return out
}

export function GetClassTree(classString) {
    switch(classString) {
    case 'Warrior':
        return '33'
    case 'Paladin':
        return '34'
    case 'Hunter':
        return '35'
    case 'Rogue':
        return '36'
    case 'Priest':
        return '37'
    case 'Death Knight':
        return '38'
    case 'Shaman':
        return '39'
    case 'Mage':
        return '40'
    case 'Warlock':
        return '41'
    case 'Druid':
        return '42'
    }
}

let ValidTabs: TSArray<number> = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
    16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28,
    29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42,
]

export function SendCallbackToServer(op: ClientCallbackOperations, msg: string) {
    let packet = new SimpleMessagePayload(op, msg)
    packet.write().Send()
}

export function OnTalentError(pkt: TSPacketRead) {
    let customPacket = new SimpleMessagePayload(ClientCallbackOperations.TALENT_TREE_LAYOUT, "")
    customPacket.read(pkt)
    console.log("Talent learn error: "+customPacket.message)
}

export function GetTalentTreeLayout(pkt: TSPacketRead) {
    let Reader = new GetTalentTreeLayoutPayload()
    let layout = Reader.read(pkt)
    if (layout)
        if (layout.TabId)
            if (ValidTabs.includes(layout.TabId)) { // strange bug on first login where it gives a decimal tab id, just ignore it
                TalentTree.TalentTrees[layout.TabId] = layout
                SendCallbackToServer(ClientCallbackOperations.GET_CHARACTER_SPECS, '-1')
            }
}