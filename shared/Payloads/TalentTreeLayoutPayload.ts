import { ClientCallbackOperations } from "../Messages"

export class TTLPTalentPrereq {
    Talent: number
    TabId: number
    ReqRank: number
}

export class TTLPTalentRank {
    Rank: number
    Spell: number
}

export class TTLPTalent {
    TabId: number
    SpellId: number
    Col: number
    Row: number
    RankCost: number
    ReqLevel: number
    TabPointReq: number
    PrereqType: number
    NodeType: number
    NodeIndex: number

    NumRanks: number
    Ranks: TSArray<TTLPTalentRank> = []
    PrereqCount: number
    Prereqs: TSArray<TTLPTalentPrereq> = []
    UnlearnsCount: number
    Unlearns: TSArray<number> = []
    ChoicesCount: number
    Choices: TSArray<number> = []
}
export class TalentTreeLayout {
    TabId: number
    TabName: string
    TabIcon: number
    TabBg: string
    TabDesc: string
    TabRole: number
    TabSpellString: string
    TabType: number
    TabIndex: number

    TalentsCount: number
    Talents: TSArray<TTLPTalent> = []
}

export class TalentTreeLayoutPayload {
    TabCount: number
    Tabs: TSArray<TalentTreeLayout> = []
}

export class GetTalentTreeLayoutPayload {

    read(read: TSPacketRead): TalentTreeLayoutPayload {
        let output = new TalentTreeLayoutPayload()
        output.TabCount = read.ReadDouble()
        for (let h = 0; h < output.TabCount; h++) {
            let layout = new TalentTreeLayout()
            layout.TabId = read.ReadDouble()
            layout.TabName = read.ReadString()
            layout.TabIcon = read.ReadDouble()
            layout.TabBg = read.ReadString()
            layout.TabDesc = read.ReadString()
            layout.TabRole = read.ReadDouble()
            layout.TabSpellString = read.ReadString()
            layout.TabType = read.ReadDouble()
            layout.TabIndex = read.ReadDouble()
            layout.TalentsCount = read.ReadDouble()
            for (let i = 0; i < layout.TalentsCount; i++) {
                let Talent = new TTLPTalent()
                Talent.TabId = read.ReadDouble()
                Talent.SpellId = read.ReadDouble()
                Talent.Col = read.ReadDouble()
                Talent.Row = read.ReadDouble()
                Talent.RankCost = read.ReadDouble()
                Talent.ReqLevel = read.ReadDouble()
                Talent.TabPointReq = read.ReadDouble()
                Talent.PrereqType = read.ReadDouble()
                Talent.NodeType = read.ReadDouble()
                Talent.NodeIndex = read.ReadDouble()

                Talent.NumRanks = read.ReadDouble()
                for (let j = 0; j < Talent.NumRanks; j++) {
                    let Rank = new TTLPTalentRank()
                    Rank.Rank = read.ReadDouble()
                    Rank.Spell = read.ReadDouble()
                    Talent.Ranks.push(Rank)
                }

                Talent.PrereqCount = read.ReadDouble()
                for (let j = 0; j < Talent.PrereqCount; j++) {
                    let Prereq = new TTLPTalentPrereq()
                    Prereq.Talent = read.ReadDouble()
                    Prereq.TabId = read.ReadDouble()
                    Prereq.ReqRank = read.ReadDouble()
                    Talent.Prereqs.push(Prereq)
                }

                Talent.UnlearnsCount = read.ReadDouble()
                for (let j = 0; j < Talent.UnlearnsCount; j++) {
                    Talent.Unlearns.push(read.ReadDouble())
                }

                Talent.ChoicesCount = read.ReadDouble()
                for (let j = 0; j < Talent.ChoicesCount; j++) {
                    Talent.Choices.push(read.ReadDouble())
                }

                layout.Talents.push(Talent)
            }
            output.Tabs.push(layout)
        }
        return output
    }

    BuildPacket(Payload: TalentTreeLayoutPayload): TSPacketWrite {
        let packet = CreateCustomPacket(ClientCallbackOperations.TALENT_TREE_LAYOUT, 0);
        packet.WriteDouble(Payload.TabCount)
        Payload.Tabs.forEach((Tab) => { 
            packet.WriteDouble(Tab.TabId)
            packet.WriteString(Tab.TabName)
            packet.WriteDouble(Tab.TabIcon)
            packet.WriteString(Tab.TabBg)
            packet.WriteString(Tab.TabDesc)
            packet.WriteDouble(Tab.TabRole)
            packet.WriteString(Tab.TabSpellString)
            packet.WriteDouble(Tab.TabType)
            packet.WriteDouble(Tab.TabIndex)
            packet.WriteDouble(Tab.TalentsCount)
            Tab.Talents.forEach((Talent, i) => {
                packet.WriteDouble(Talent.TabId)
                packet.WriteDouble(Talent.SpellId)
                packet.WriteDouble(Talent.Col)
                packet.WriteDouble(Talent.Row)
                packet.WriteDouble(Talent.RankCost)
                packet.WriteDouble(Talent.ReqLevel)
                packet.WriteDouble(Talent.TabPointReq)
                packet.WriteDouble(Talent.PrereqType)
                packet.WriteDouble(Talent.NodeType)
                packet.WriteDouble(Talent.NodeIndex)

                packet.WriteDouble(Talent.NumRanks)
                Talent.Ranks.forEach((Rank, i) => {
                    packet.WriteDouble(Rank.Rank)
                    packet.WriteDouble(Rank.Spell)
                })

                packet.WriteDouble(Talent.PrereqCount)
                Talent.Prereqs.forEach((Prereq, i) => {
                    packet.WriteDouble(Prereq.Talent)
                    packet.WriteDouble(Prereq.TabId)
                    packet.WriteDouble(Prereq.ReqRank)
                })

                packet.WriteDouble(Talent.UnlearnsCount)
                Talent.Unlearns.forEach((Unlearn, i) => {
                    packet.WriteDouble(Unlearn)
                })

                packet.WriteDouble(Talent.ChoicesCount)
                Talent.Choices.forEach((Choice, i) => {
                    packet.WriteDouble(Choice)
                })
            })
        })
        return packet;
    } 
}