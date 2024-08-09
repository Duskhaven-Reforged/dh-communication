import { ClientCallbackOperations, SimpleMessagePayload } from "../shared/Messages";
import { ComboPoints } from "./Combopoints/Combopoints";
import { StarterGuild } from "./Guild/Guild";
import { DHPointType } from "./classes";
import { wDefaultLoadoutStrings, wSpecAutolearn, wStartersForTabs, wTalentTrees } from "./dh-cachedata/dh-worlddata";
import { DHCommonMessage } from "./dh-message/dh-cmsg";
import { RouteTopics } from "./dh-topic/TopicRouter";

export let mDHDMsg : DHCommonMessage

export function Main(events: TSEvents) {
    mDHDMsg = new DHCommonMessage()
    RouteTopics(events)
    ComboPoints(events)
    StarterGuild(events)

    events.Player.OnLogin((player, first) => {
        let spec = mDHDMsg.cache.TryGetCharacterActiveSpec(player)
        player.SetUInt(`Spec`, spec.SpecTabId)

        LearnSpellsForLevel(player)
        //todo load actions and maybe account bonuses
        // maybe unlearn flagged too
    })

    events.Player.OnCreate((player) => {
        mDHDMsg.cache.CreateBaseSpec(player)
        mDHDMsg.cache.AddDefaultLoadout(player)
    })

    events.Player.OnDelete((guid, account) => {
        mDHDMsg.cache.HandleDeleteCharacter(guid)
    })

    events.Player.OnLogout((player) => {
        let spec = mDHDMsg.cache.TryGetCharacterActiveSpec(player)
        if (!spec.IsNull()) {
            //mDHDMsg.cache.SaveLoadoutActions()
        }
    })

    events.Player.OnLevelChanged((player, oldLevel) => {
        let spec = mDHDMsg.cache.TryGetCharacterActiveSpec(player)
        if (!spec.IsNull()) {
            let curLevel = player.GetLevel()
            if (oldLevel < 10 && curLevel > 9)
                mDHDMsg.cache.TrySaveNewLoadout(player, wDefaultLoadoutStrings[player.GetClass()][player.GetUInt(`Spec`)])
            
            if (curLevel > 10) {
                if (oldLevel < curLevel) {
                    let levelDiff = curLevel - oldLevel
                    if (oldLevel < 11 && levelDiff > 1)
                        levelDiff -= 10 - oldLevel

                    if (levelDiff > 1) {
                        let div = Math.floor(levelDiff / 2)
                        let rem = levelDiff % 2

                        mDHDMsg.cache.AddCharacterPointsToAllSpecs(player, DHPointType.CLASS, div)
                        if (rem)
                            div += 1

                        mDHDMsg.cache.AddCharacterPointsToAllSpecs(player, DHPointType.TALENT, div)
                    } else {
                        if (curLevel % 2)
                            mDHDMsg.cache.AddCharacterPointsToAllSpecs(player, DHPointType.TALENT, 1)
                        else
                            mDHDMsg.cache.AddCharacterPointsToAllSpecs(player, DHPointType.CLASS, 1)
                    }
                }
            }
            mDHDMsg.cache.UpdateCharSpec(player, spec)
            mDHDMsg.SendSpecInfo(player)
            LearnSpellsForLevel(player)
            SetAllSkillsToLevel(player)
        }
    }) 

    events.Spell.OnCastCancelled(63645, (who, spell) => {
        if (who.IsPlayer()) {
            who.SetUInt(`SpecActivation`, 0)
            let ClientCallback = new SimpleMessagePayload(ClientCallbackOperations.ACTIVATE_CLASS_SPEC, 'Cancelled Setting Spec')
            ClientCallback.write().SendToPlayer(who.ToPlayer())
        }
    })

    events.Spell.OnAfterCast(63645, (Spell, Cancel) => {
        if (Spell.GetCaster().IsPlayer()) {
            let Player = Spell.GetCaster().ToPlayer()
            let SpecToActivate = Player.GetUInt(`SpecActivation`)

            let Tab = mDHDMsg.cache.TryGetTalentTab(Player, SpecToActivate)
            let Spec = mDHDMsg.cache.TryGetCharacterActiveSpec(Player)
            if (wTalentTrees.contains(SpecToActivate)) {
                let Tree = wTalentTrees[SpecToActivate]
                if (!Tab.IsNull() && !Spec.IsNull() && Tree.TalentType === DHPointType.TALENT) {
                    mDHDMsg.cache.ForgetTalents(Player, Spec, DHPointType.CLASS)
                    mDHDMsg.cache.ForgetTalents(Player, Spec, DHPointType.TALENT)

                    Spec.SpecTabId = SpecToActivate
                    Player.SetUInt(`Spec`, Spec.SpecTabId)
                    mDHDMsg.cache.UpdateCharSpec(Player, Spec)
                    LearnSpecSpecificSkills(Player, Spec.SpecTabId)
                    LearnSpellsForLevel(Player)

                    mDHDMsg.SendSpecInfo(Player)
                    let ClientCallback = new SimpleMessagePayload(ClientCallbackOperations.ACTIVATE_CLASS_SPEC, 'Finished Setting Spec')
                    ClientCallback.write().SendToPlayer(Player)
                }
            }
            Player.SetUInt(`SpecActivation`, 0)
        }

    })
}

export function SetAllSkillsToLevel(Player: TSPlayer) {
    let Skills = [95, 162, 415, 45, 46, 176, 229, 55, 44, 172, 43, 54, 136, 173, 226, 160]
    Skills.forEach((SkillId) => {
        if (Player.HasSkill(SkillId))
            Player.AdvanceSkill(SkillId, Player.GetMaxSkillValue(SkillId))
    })
}

export function LearnSpellsForLevel(player: TSPlayer) {
    if (wSpecAutolearn.contains(player.GetClass())) {
        let Spec = player.GetUInt(`Spec`)
        wSpecAutolearn[player.GetClass()].forEach((SpecId, Levels) => {
            Levels.forEach((Level, Spells) => {
                if (SpecId === Spec) {
                    if (player.GetLevel() >= Level) {
                        Spells.forEach((Spell) => {
                            if (!player.HasSpell(Spell))
                                player.LearnSpell(Spell)
                        })
                    }
                } else {
                    Spells.forEach((Spell) => {
                        player.RemoveSpell(Spell, false, false)
                    })
                }
            })
        })
        wStartersForTabs[Spec].forEach((Spell) => {
            if (!player.HasSpell(Spell))
                player.LearnSpell(Spell)
        })
    }
}

function LearnSpecSpecificSkills(Player: TSPlayer, SpecId: number) {
    let DualWieldSpecs = [2, 20, 16, 17, 18]
    if (DualWieldSpecs.includes(SpecId))
        Player.SetSkill(118, 1, 1, 1)
    else
        Player.SetSkill(118, 0, 0, 0)
}