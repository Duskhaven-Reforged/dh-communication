import { ClientCallbackOperations, SimpleMessagePayload } from "../shared/Messages";
import { ComboPoints } from "./SpellPoints/Combopoints";
import { StarterGuild } from "./Guild/Guild";
import { DHPlayerSpec, DHPointType, TALENT_POINT_TYPES } from "./classes";
import { CharacterPoints, LearnWithExtraSteps, PointsMgr } from "./dh-cachedata/dh-cache";
import { wChoiceNodes, wDefaultLoadoutStrings, wSpecAutolearn, wStartersForTabs, wTalentTrees } from "./dh-cachedata/dh-worlddata";
import { DHCommonMessage } from "./dh-message/dh-cmsg";
import { RouteTopics } from "./dh-topic/TopicRouter";
import { ArcaneCharges } from "./SpellPoints/ArcaneCharges";
import { HandleSpellCharge } from "./SpellCharges/SpellCharge";
import { ExtraActionButton } from "./extra_action_button";

export let mDHDMsg : DHCommonMessage

export function Main(events: TSEvents) {
    mDHDMsg = new DHCommonMessage()
    RouteTopics(events)
    ComboPoints(events)
    ArcaneCharges(events)
    StarterGuild(events)
    HandleSpellCharge(events)
    ExtraActionButton(events)
    
    events.Player.OnLogin((Player, first) => {
        let spec = mDHDMsg.cache.TryGetCharacterActiveSpec(Player)
        Player.SetUInt(`Spec`, spec.SpecTabId)

        if (!PointsMgr.Load(Player)) {
            TALENT_POINT_TYPES.forEach((Type) => {
                let Point = new CharacterPoints(Type, 0, 0, 25)
                PointsMgr.Init(Player, Point)
                Player.SetObject(`CharacterPoints:${Type}`, Point)
            })
            if (Player.GetLevel() > 10) {
                mDHDMsg.cache.TrySaveNewLoadout(Player, wDefaultLoadoutStrings[Player.GetClass()][spec.SpecTabId])
            }
        }

        LearnSpellsForLevel(Player)
        EnsurePlayerHasTalents(Player, spec)
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

    events.Player.OnLevelChanged((Player, oldLevel) => {
        let spec = mDHDMsg.cache.TryGetCharacterActiveSpec(Player)
        if (!spec.IsNull()) {
            let curLevel = Player.GetLevel()
            if (oldLevel < 10 && curLevel > 9)
                mDHDMsg.cache.TrySaveNewLoadout(Player, wDefaultLoadoutStrings[Player.GetClass()][Player.GetUInt(`Spec`)])
            
            if (curLevel > 10) {
                if (oldLevel < curLevel) {
                    let Classpoints = Player.GetObject(`CharacterPoints:${DHPointType.CLASS}`, PointsMgr.LoadByType(Player, DHPointType.CLASS))
                    let TalentPoints = Player.GetObject(`CharacterPoints:${DHPointType.TALENT}`, PointsMgr.LoadByType(Player, DHPointType.TALENT))

                    let levelDiff = curLevel - oldLevel
                    if (oldLevel < 11 && levelDiff > 1)
                        levelDiff -= 10 - oldLevel

                    if (levelDiff > 1) {
                        let div = Math.floor(levelDiff / 2)
                        let rem = levelDiff % 2
                        PointsMgr.AddPoints(Player, Classpoints, div)
                        PointsMgr.AddPoints(Player, TalentPoints, div + (rem ? 1 : 0))
                    } else {
                        if (curLevel % 2)
                            PointsMgr.AddPoints(Player, TalentPoints, 1)
                        else
                            PointsMgr.AddPoints(Player, Classpoints, 1)
                    }
                }
            }
            mDHDMsg.cache.UpdateCharSpec(Player, spec)
            mDHDMsg.SendSpecInfo(Player)
            LearnSpellsForLevel(Player)
            SetAllSkillsToLevel(Player)
        }
    }) 

    events.Spell.OnCastCancelled(63645, (who, tar) => {
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
                    Spec.SpecTabId = SpecToActivate
                    Player.SetUInt(`Spec`, Spec.SpecTabId)

                    mDHDMsg.cache.ForgetTalents(Player, Spec, DHPointType.CLASS)
                    mDHDMsg.cache.ForgetTalents(Player, Spec, DHPointType.TALENT)

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
                                LearnWithExtraSteps(player, Spell)
                        })
                    }
                } else {
                    Spells.forEach((Spell) => {
                        player.RemoveSpell(Spell, false, false)
                    })
                }
            })
        })

        if (player.GetLevel() > 9) {
            wStartersForTabs[Spec].forEach((Spell) => {
                if (!player.HasSpell(Spell))
                    LearnWithExtraSteps(player, Spell)
            })

            if (player.GetClass() == Class.DEATH_KNIGHT)
                player.CastSpell(player, 53431, true)
        }
    }
}

function LearnSpecSpecificSkills(Player: TSPlayer, SpecId: number) {
    let DualWieldSpecs = [2, 20, 16, 17, 18, 10, 11, 12, 7, 8, 9]
    if (SpecId != 6) {
        if (DualWieldSpecs.includes(SpecId))
            Player.SetSkill(118, 1, 1, 1)
        else
            Player.SetSkill(118, 0, 0, 0)
    }
}

function EnsurePlayerHasTalents(Player: TSPlayer, Spec: DHPlayerSpec) {
    Spec.Talents.forEach((TabId, Spells) => {
        let Tab = mDHDMsg.cache.TryGetTalentTab(Player, TabId)
        Spells.forEach((SpellId, Talent) => {
            if (TabId == Spec.SpecTabId || Tab.TalentType == DHPointType.CLASS) {
                let ChoiceNode = Talent.Type === CustomNodeType.CHOICE
                if (Talent.CurrentRank > 0) {
                    Tab.Talents[Talent.SpellId].UnlearnSpells.forEach((UnlearnSpellId) => {
                        Player.RemoveSpell(UnlearnSpellId, false, false)
                    })

                    if (!Player.HasSpell(Talent.SpellId)) {
                        if (ChoiceNode) {
                            let Choice = wChoiceNodes[Talent.SpellId][Talent.CurrentRank-1]
                            Player.LearnSpell(Choice)
                            Spec.ChoiceNodesChosen[Talent.SpellId] = Choice
                        } else {
                            Tab.Talents[Talent.SpellId].Ranks.forEach((Rank, RankedSpell) => {
                                if (Talent.CurrentRank == Rank)
                                    LearnWithExtraSteps(Player, RankedSpell)
                                else
                                    Player.RemoveSpell(RankedSpell, false, false)
                            })
                        }
                    }
                } else if (Player.HasSpell(SpellId) && !mDHDMsg.cache.IsStarter(Player, Tab.Talents[SpellId])) {
                    Player.RemoveSpell(Talent.SpellId, false, false)
                }
            } else {
                Player.RemoveSpell(SpellId, false, false)
            }
        })
    })
}