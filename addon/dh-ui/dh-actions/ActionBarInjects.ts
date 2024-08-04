import { ComboFinishers } from "../../../shared/Shared"

export let SpellCharges = []

export function IsActionUsable(Usable: bool, Action: number) : bool {
    if (Action) {
        if (ComboFinishers.includes(Action)) {
            Usable = _G['CurrentComboPoints'] ? _G['CurrentComboPoints'] > 0 : false
        }
    }
    return Usable
}