let ScaledAbilities : TSArray<uint32> = TAG(`dh-spells`, `square-root-scaling`)

export function SquareRootScaling(events: TSEvents) {
    events.Spell.OnObjectAreaTargetSelect(ScaledAbilities, (Spell,  Objects, i) => {
        let Caster = Spell.GetCaster()
        let Info = Spell.GetSpellInfo()

        let MaxTargets = Info.GetMaxAffectedTargets()
        let Targets = Objects.get_length()

        let Pct = Targets > MaxTargets ? (Targets*Math.sqrt(MaxTargets/Targets))/Targets : 1
        Caster.SetFloat(`${Info.GetEntry()}TargetScale`, Pct)
    })

    events.Spell.OnDamageLate(ScaledAbilities, (Spell, Damage) => {
        let Caster = Spell.GetCaster()
        let Info = Spell.GetSpellInfo()
        let Pct = Caster.GetFloat(`${Info.GetEntry()}TargetScale`, 1)
        Damage.set(Damage.get() * Pct)
    })
}