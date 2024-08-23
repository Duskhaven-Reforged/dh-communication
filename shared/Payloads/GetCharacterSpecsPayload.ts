import { ClientCallbackOperations } from "../Messages"

export class CSPPoints {
    Type!: number
    SpecPointSum!: number
    SpecPointMax!: number
    CommonPointSum!: number
    AbsoluteMax!: number
}
export class CSPPointSpend {
    TabId!: number
    Amount!: number
}
export class CPSSpec {
    Id: number
    Name!: string
    Description!: string
    Active!: number
    SpellIcon!: number
    SpecTabId!: number

    PointsSpentCount!: number
    PointsSpent: TSArray<CSPPointSpend> = []
    PointsCount!: number
    Points: TSArray<CSPPoints> = []

    constructor(){
        this.Id = -1
    }
}
export class CharacterSpecsPayload {
    SpecCounts!: number
    Specs: TSArray<CPSSpec> = []
}

export class GetCharacterSpecsPayload {

    read(read: TSPacketRead): CharacterSpecsPayload {
        let output = new CharacterSpecsPayload()
        output.SpecCounts = read.ReadDouble()
        for (let i = 0; i < output.SpecCounts; i++) {
            let Spec = new CPSSpec()
            Spec.Id = read.ReadDouble()
            Spec.Name = read.ReadString()
            Spec.Description = read.ReadString()
            Spec.Active = read.ReadDouble()
            Spec.SpellIcon = read.ReadDouble()
            Spec.SpecTabId = read.ReadDouble()
            
            Spec.PointsSpentCount = read.ReadDouble()
            for (let j = 0; j < Spec.PointsSpentCount; j++) {
                let Spend = new CSPPointSpend()
                Spend.TabId = read.ReadDouble()
                Spend.Amount = read.ReadDouble()
                Spec.PointsSpent.push(Spend)
            }
            
            Spec.PointsCount = read.ReadDouble()
            for (let j = 0; j < Spec.PointsCount; j++) {
                let Point = new CSPPoints()
                Point.Type = read.ReadDouble()
                Point.SpecPointSum = read.ReadDouble()
                Point.SpecPointMax = read.ReadDouble()
                Point.CommonPointSum = read.ReadDouble()
                Point.AbsoluteMax = read.ReadDouble()
                Spec.Points.push(Point)
            }

            output.Specs.push(Spec)
        }
        return output
    }
}