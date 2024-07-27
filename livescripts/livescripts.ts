import { ClientCallbackOperations, SimpleMessagePayload } from "../shared/Messages";
import { DHPointType } from "./classes";
import { wClassLevelSpells, wTalentTrees } from "./dh-cachedata/dh-worlddata";
import { DHCommonMessage } from "./dh-message/dh-cmsg";
import { RouteTopics } from "./dh-topic/TopicRouter";

export const mDHDMsg = new DHCommonMessage()

export function Main(events: TSEvents) {
    RouteTopics(events)

    events.Player.OnLogin((player, first) => {
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
            //mDHDMsg.SendTalents(player)
            mDHDMsg.cache.UpdateCharSpec(player, spec)
            mDHDMsg.SendSpecInfo(player)
            LearnSpellsForLevel(player)
            SetAllSkillsToLevel(player)
        }
    }) 

    events.Unit.OnCastCancelled((who, spell) => {
        if (who.IsPlayer() && spell.GetEntry() === 63645)
            who.SetUInt(`SpecActivation`, 0)
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
                    QueryCharactersAsync(`update forge_character_specs set charspec = ${SpecToActivate} where guid = ${Player.GetGUID().GetCounter()}`)
                    mDHDMsg.SendSpecInfo(Player)
                    let ClientCallback = new SimpleMessagePayload(ClientCallbackOperations.ACTIVATE_CLASS_SPEC, 'Finished Setting Spec')
                    ClientCallback.write().SendToPlayer(Player)
                }
            }
            Player.SetUInt(`SpecActivation`, 0)
        }

    })

    events.Spell.OnLearn((spell, player, active, disables, superceded, from_skill) => {
        // learn extra spells
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
    //if (player.HasUnitState(0x00000001))
    // TODO add remove by effect

    if (wClassLevelSpells.contains(player.GetClass())) {
        let pClass = wClassLevelSpells[player.GetClass()]
        pClass.forEach((race, levelmap) => {
            levelmap.forEach((level, spells) => {
                if (level <= player.GetLevel()) {
                    spells.forEach((spell) => {
                        if (player.HasSpell(spell))
                            return;

                        player.LearnSpell(spell)
                    })
                }
            })
        })
    }
}
