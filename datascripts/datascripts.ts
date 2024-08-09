import { std } from "wow/wotlk";

console.log("Hello from dh-communication data script!");

export let ActivateSpec = std.Spells.create('dh-ui-talent', 'activate-spec', 63645)
ActivateSpec.Name.enGB.set('Activate Specialization')
ActivateSpec.Description.enGB.set('Activating specialization.')
ActivateSpec.AuraDescription.enGB.set('Activating specialization.')
ActivateSpec.CastTime.setSimple(7000)
ActivateSpec.Effects.get(0).Type.DUMMY.set()
