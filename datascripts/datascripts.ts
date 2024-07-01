import { std } from "wow/wotlk";
import { BuildTalentTables, TalentsNeedRebuild } from "./talent-db";

console.log("Hello from dh-communication data script!");

std.SQL.Databases.world_dest.write(`
CREATE TABLE IF NOT EXISTS \`datafile_build_history\` (
    \`file_name\` VARCHAR(32) NOT NULL,
    \`file_key\` VARCHAR(32) NOT NULL,
    \`timestamp\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (\`file_name\`, \`file_key\`));
`)

if(TalentsNeedRebuild()) {
    console.log(`Talents trees need rebuilding.`)
    BuildTalentTables()
}

export let ActivateSpec = std.Spells.create('dh-ui-talent', 'activate-spec', 63645)
ActivateSpec.Name.enGB.set('Activate Specialization')
ActivateSpec.Description.enGB.set('Activating specialization.')
ActivateSpec.AuraDescription.enGB.set('Activating specialization.')
ActivateSpec.CastTime.setSimple(7000)
ActivateSpec.Effects.get(0).Type.DUMMY.set()

export let PlaceholderTalent = std.Spells.create('dh-ui-talent', 'placeholder', 12299)
PlaceholderTalent.Name.enGB.set('Placeholder Talent')
PlaceholderTalent.Description.enGB.set('Placeholder talent; does nothing... unless?')
PlaceholderTalent.AuraDescription.enGB.set('Placeholder talent; does nothing... unless?')
PlaceholderTalent.Effects.get(0).Aura.DUMMY.set()
PlaceholderTalent.Effects.get(1).Aura.DUMMY.set()
PlaceholderTalent.Effects.get(2).Aura.DUMMY.set()
PlaceholderTalent.Icon.set(1)