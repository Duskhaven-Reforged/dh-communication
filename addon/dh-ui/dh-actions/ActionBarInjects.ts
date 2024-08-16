import { ArcaneChargeDependent, ComboFinishers, RequiresMageClearcasting } from "../../../shared/Shared"

export let SpellCharges = []

export function IsActionUsable(Usable: bool, Action: number) : bool {
    if (Usable && Action) {
        if (ComboFinishers.includes(Action)) {
            Usable = _G['CurrentComboPoints'] ? _G['CurrentComboPoints'] > 0 : false
        }
        
        if (ArcaneChargeDependent.includes(Action)) {
            console.log('Action: ',Action)
            let Check = _G['CurrentArcaneCharges'] ? _G['CurrentArcaneCharges'] > 0 : false
            console.log('Result: ', Check)
            Usable = Check
        } 
        if (RequiresMageClearcasting.includes(Action)) {
            Usable = _G['HasClearcasting'] ? _G['HasClearcasting'] > 0 : false
        }
    }
    return Usable
}