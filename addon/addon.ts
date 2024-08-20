import { ArcaneCharges } from "./dh-ui/dh-actions/ArcaneCharges";
import { ComboPointUI } from "./dh-ui/dh-actions/ComboPoints";
import { SpellCharges } from "./dh-ui/dh-actions/SpellCharges/SpellCharges";
import { SecondaryPowerUI } from "./dh-ui/dh-powertype/PowerType";
import { TalentTreeUI } from "./dh-ui/dh-talent/TalentTree";
import { eab } from "./extra_action_button";
import { tooltipInfo } from "./internal-ids";

TalentTreeUI()
ComboPointUI()
ArcaneCharges()
SecondaryPowerUI()
SpellCharges()
eab()
//this will have errors if you didnt build data once
_G['tooltipInfo'] = tooltipInfo