export enum DHPointType /**@realType:uint8 */ {
    TALENT = 0,
    CLASS = 7,
    MISSING = 255,
}

export enum DHNodeType /**@realType:uint8 */ {
    AURA = 0,
    SPELL = 1,
    CHOICE = 2
}

export enum DHPrereqType /**@realType:uint8 */ {
    REQ_ALL = 0,
    ONE_OF = 1
}

export const TALENT_POINT_TYPES : TSArray<uint8> = [
    DHPointType.TALENT, DHPointType.CLASS,
]

export class DHCharacterPoint {
    Type: uint8
    SpecId: uint32
    Sum: uint32
    Max: uint32

    constructor(type: number, spec: number, sum: number, max: number) {
        this.Type = type
        this.SpecId = spec
        this.Sum = sum
        this.Max = max
    }
}

export class DHClassSpecDetail {
    Name: string
    SpellIconId: uint32
    SpecId: uint32
    
    constructor(Name: string, SpellIconId: uint32, SpecId: uint32) {
        this.Name = Name
        this.SpellIconId = SpellIconId
        this.SpecId = SpecId
    }
}

export class DHCharacterTalent {
    SpellId: uint32
    TabId: uint32
    CurrentRank: uint8
    Type: uint8 = 0
    Starter: bool = true

    constructor(spell: number, tab: number, currentRank: number, Starter: bool) {
        this.SpellId = spell
        this.TabId = tab
        this.CurrentRank = currentRank
        this.Starter = Starter
    }

    public IsNull() : bool {
        return this.SpellId === 0
    }

    public static Empty() : DHCharacterTalent {
        return new DHCharacterTalent(0, 0, 0, false)
    }
}

export class DHTalentPrereq {
    TabId: uint32
    Talent: uint32
    ReqId: uint32
    ReqRank: uint32

    constructor( TabId: uint32, Talent: uint32, ReqId: uint32, ReqRank: uint32) {
        this.TabId = TabId
        this.Talent = Talent
        this.ReqId = ReqId
        this.ReqRank = ReqRank
    }
}

export class DHPlayerSpec {
    Id: uint32
    CharGuid: TSNumber<uint64>
    Name: string
    Description: string
    Active: bool
    SpellIconId: uint32
    SpecTabId: uint32

    constructor(owner: number, id: number, name: string, desc: string, active: bool, icon: uint32, spec: uint32) {
        this.CharGuid = owner
        this.Id = id
        this.Name = name
        this.Description = desc
        this.Active = active
        this.SpellIconId = icon
        this.SpecTabId = spec
    }

    public IsNull() : bool {
        return this.CharGuid === 0
    }

    public static Empty() : DHPlayerSpec {
        return new DHPlayerSpec(0, 0, '', '', false, 0, 0)
    }

    Talents: TSDictionary<uint32, TSDictionary<uint32, DHCharacterTalent>> = CreateDictionary<uint32, TSDictionary<uint32, DHCharacterTalent>>({})
    PointsSpent: TSDictionary<uint32, uint8> = CreateDictionary<uint32, uint8>({})
    ChoiceNodesChosen: TSDictionary<uint32, uint32> = CreateDictionary<uint32, uint32>({})
}

export class DHTalentChoice {
    SpellId: uint32
    Active: bool

    constructor(SpellId: uint32, Active: bool) {
        this.SpellId = SpellId
        this.Active = Active
    }
}

export class DHTalent {
    SpellId: uint32
    TalentTabId: uint32
    ColumnIndex: uint32
    RowIndex: uint32
    RankCost: uint8
    TabPointReq: uint16
    RequiredLevel: uint8
    TalentType: uint8
    NodeType: uint8
    NodeIndex: uint8
    NumberOfRanks: uint8
    PreReqType: uint8
    Starter: TSArray<uint8>

    constructor(SpellId: uint32, TalentTabId: uint32, ColumnIndex: uint32, RowIndex: uint32, RankCost: uint8, TabPointReq: uint16, 
        RequiredLevel: uint8, TalentType: uint8, NodeType: uint8, NodeIndex: uint8, NumberOfRanks: uint8, PrereqType: DHPrereqType, Starter: TSArray<uint8>) {
            this.SpellId = SpellId
            this.TalentTabId = TalentTabId
            this.RowIndex = RowIndex
            this.ColumnIndex = ColumnIndex
            this.RankCost = RankCost
            this.TabPointReq = TabPointReq
            this.RequiredLevel = RequiredLevel
            this.TalentType = TalentType
            this.NodeType = NodeType
            this.NodeIndex = NodeIndex
            this.NumberOfRanks = NumberOfRanks
            this.PreReqType = PrereqType
            this.Starter = Starter
    }

    Prereqs: TSArray<DHTalentPrereq> = CreateArray<DHTalentPrereq>([])
    Choices: TSArray<uint32> = CreateArray<uint32>([])
    UnlearnSpells: TSArray<uint32> = CreateArray<uint32>([])
    Ranks: TSDictionary<uint8, uint32> = CreateDictionary<uint8, uint32>({})
    RanksRev: TSDictionary<uint32, uint8> = CreateDictionary<uint32, uint8>({})
}

export class DHTalentTab {
    Id: uint32;
    Classmask: uint32;
    Racemask: uint32;
    Name: string;
    SpellIconId: uint32;
    Background: string;
    Description: string;
    Role: uint8;
    SpellString: string;
    TalentType: uint8;
    TabIndex: uint32;

    constructor(id: uint32, classMask: uint32, raceMask: uint32, name: string, spellIconId: uint32, background: string, 
        description: string, role: uint8, spellString: string, talentType: uint8, tabIndex: uint32) {
            this.Id = id
            this.Classmask = classMask
            this.Racemask = raceMask
            this.Name = name
            this.SpellIconId = spellIconId
            this.Background = background
            this.Description = description
            this.Role = role
            this.SpellString = spellString
            this.TalentType = talentType
            this.TabIndex = tabIndex
    }

    public IsNull () : bool {
        return this.Id === 0
    }

    public static Empty() : DHTalentTab {
        return new DHTalentTab(0, 0, 0, '', 0, '', '', 0, '', 0, 0)
    }

    Talents: TSDictionary<uint32, DHTalent> = CreateDictionary<uint32, DHTalent>({})
}

export class DHPlayerLoadout {
    Active: bool;
    Id: uint8;
    TabId: uint32;
    Name: string;
    TalentString: string;

    constructor(id: uint8, tab: uint32, name: string, talentString: string, active: bool) {
        this.Id = id
        this.TabId = tab
        this.Name = name
        this.TalentString = talentString
        this.Active = active
    }
}

export class DHNodeMetaData {
    SpellId: uint32
    Row: uint8
    Col: uint8
    PointReq: uint8
    NodeIndex: uint8

    constructor(SpellId: uint32, Row: uint8, Col: uint8, PointReq:uint8, NodeIndex: uint8) {
        this.SpellId = SpellId
        this.Row = Row
        this.Col = Col
        this.PointReq = PointReq
        this.NodeIndex = NodeIndex
    }

    Unlocks: TSArray<DHNodeMetaData> = CreateArray<DHNodeMetaData>([]);
}

export class DHTreeMetaData {
    TabId: uint32
    MaxXDim: uint8
    MaxYDim: uint8

    constructor(TabId: uint32, MaxXDim: uint8, MaxYDim: uint8) {
        this.TabId = TabId
        this.MaxXDim = MaxXDim
        this.MaxYDim = MaxYDim
    }

    Nodes: TSDictionary<uint8, TSDictionary<uint8, DHNodeMetaData>> = CreateDictionary<uint8, TSDictionary<uint8, DHNodeMetaData>>({})
    NodeLocation: TSDictionary<uint32, DHNodeMetaData> = CreateDictionary<uint32, DHNodeMetaData>({})
}

export const base64_char : string = "|ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
export const ACOUNT_WIDE_KEY = 0xfffffffe