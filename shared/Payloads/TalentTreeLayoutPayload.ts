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
export class TalentTreeLayoutPayload {
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
export class GetTalentTreeLayoutPayload {

    read(read: TSPacketRead): TalentTreeLayoutPayload {
        let output = new TalentTreeLayoutPayload()
        output.TabId = read.ReadDouble()
        output.TabName = read.ReadString()
        output.TabIcon = read.ReadDouble()
        output.TabBg = read.ReadString()
        output.TabDesc = read.ReadString()
        output.TabRole = read.ReadDouble()
        output.TabSpellString = read.ReadString()
        output.TabType = read.ReadDouble()
        output.TabIndex = read.ReadDouble()
        output.TalentsCount = read.ReadDouble()
        for (let i = 0; i < output.TalentsCount; i++) {
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
                console.log(`Rank: ${Prereq.Talent}`)
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

            output.Talents.push(Talent)
        }
        return output
    }

    BuildPacket(Payload: TalentTreeLayoutPayload): TSPacketWrite {
        let packet = CreateCustomPacket(ClientCallbackOperations.TALENT_TREE_LAYOUT, 0);
        packet.WriteDouble(Payload.TabId)
        packet.WriteString(Payload.TabName)
        packet.WriteDouble(Payload.TabIcon)
        packet.WriteString(Payload.TabBg)
        packet.WriteString(Payload.TabDesc)
        packet.WriteDouble(Payload.TabRole)
        packet.WriteString(Payload.TabSpellString)
        packet.WriteDouble(Payload.TabType)
        packet.WriteDouble(Payload.TabIndex)
        packet.WriteDouble(Payload.TalentsCount)
        Payload.Talents.forEach((Talent, i) => {
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

        return packet;
    } 
}