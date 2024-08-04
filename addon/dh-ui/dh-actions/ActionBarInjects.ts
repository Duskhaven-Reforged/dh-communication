import { ComboFinishers } from "../../../shared/Shared"

export let SpellCharges = []

export function IsActionUsable(Usable: bool, Action: number) : bool {
    if (Action && Usable) {
        if (ComboFinishers.includes(Action)) {
            Usable = _G['CurrentComboPoints'] > 0
        }
    }
    return Usable
}