export function SetTalentNode( id: uint32, Tab: uint8, Col: uint8, Row: uint8, PointReq: uint16, Passive: bool, Starter: bool, Ranks: TSArray<uint32>, Prereqs: TSDictionary<uint32, uint8>, Unlearn: TSArray<uint32>, Additionals: TSArray<uint32> )  {
    let TalentType = 0
    let ClassTabs: TSArray<number> = [
        64, 63, 62, 61, 60, 59, 58, 57, 56, 55, 54, 53, 52, 51
    ]
    if (ClassTabs.includes(Tab))
        TalentType = 7

    let SpecTabs: TSArray<number> = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 38, 
        21, 32, 19, 20, 23, 24, 22, 25, 26, 27, 30, 31, 28, 29
    ]
    if (TalentType === 0 && !SpecTabs.includes(Tab)) {
        console.log(`Incorrect tab ID.`)
        return
    }

    const res = QueryWorld(`replace into forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, Starter)
    VALUES(${id}, ${Tab}, ${Col}, ${Row}, 1, 1, ${TalentType}, ${Ranks.length}, 1, ${PointReq}, ${Passive ? 0 : 1}, ${Starter})`)

    Ranks.forEach((Spell, i) => {
        let Rank = i + 1
        const res = QueryWorld(`REPLACE INTO forge_talent_ranks (talentSpellId, talentTabId, \`rank\`, spellId) VALUES(${id}, ${Tab}, ${Rank}, ${Spell})`)
    })

    if (Prereqs.get_length() > 0) {
        Prereqs.forEach((Spell, ReqRank) => {
            const res = QueryWorld(`REPLACE INTO forge_talent_prereq (spellid, talentTabId, reqTalent, reqTalentTabId, reqRank) VALUES(${id}, ${Tab}, ${Spell}, ${Tab}, ${ReqRank})`)
        })
    }

    if (Unlearn.length > 0) {
        Unlearn.forEach((Spell) => {
            const res = QueryWorld(`REPLACE INTO forge_talent_unlearn (\`talentTabId\` \`talentSpellId\`, \`unlearnSpell\`) VALUES(${Tab}, ${id}, ${Spell})`)
        })
    }

    if (Additionals.length > 0) {
        Additionals.forEach((Spell) => {
            const res = QueryWorld(`REPLACE INTO forge_talent_learn_additional_spell (\`spell\` \`addedSpell\`) VALUES(${id}, ${Spell})`)
        })
    }
}

export function SetChoiceNode( id: uint32, Tab: uint8, Col: uint8, Row: uint8, PointReq: uint16, Passive: bool, Choices: TSArray<uint32>, Prereqs: TSDictionary<uint32, uint8>, Unlearn: TSArray<uint32>)  {
    let TalentType = 0
    let ClassTabs: TSArray<number> = [
        64, 63, 62, 61, 60, 59, 58, 57, 56, 55, 54, 53, 52, 51
    ]
    if (ClassTabs.includes(Tab))
        TalentType = 7

    let SpecTabs: TSArray<number> = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 38, 
        21, 32, 19, 20, 23, 24, 22, 25, 26, 27, 30, 31, 28, 29
    ]
    if (TalentType === 0 && !SpecTabs.includes(Tab)) {
        console.log(`Incorrect tab ID.`)
        return
    }

    const res = QueryWorld(`replace into forge_talents (spellid, talentTabId, columnIndex, rowIndex, rankCost, minLevel, talentType, numberRanks, preReqType, tabPointReq, nodeType, Starter)
    VALUES(${id}, ${Tab}, ${Col}, ${Row}, 1, 1, ${TalentType}, 0, 1, ${PointReq}, 2, 0)`)

    Choices.forEach((Spell, i) => {
        let Choice = i + 1
        const res = QueryWorld(`REPLACE INTO forge_talent_choice_nodes (choiceNodeId, talentTabId, choiceIndex, choiceSpellId) VALUES(${id}, ${Tab}, ${Choice}, ${Spell})`)
    })

    if (Prereqs.get_length() > 0) {
        Prereqs.forEach((Spell, ReqRank) => {
            const res = QueryWorld(`REPLACE INTO forge_talent_prereq (spellid, talentTabId, reqTalent, reqTalentTabId, reqRank) VALUES(${id}, ${Tab}, ${Spell}, ${Tab}, ${ReqRank})`)
        })
    }

    if (Unlearn.length > 0) {
        Unlearn.forEach((Spell) => {
            const res = QueryWorld(`REPLACE INTO forge_talent_unlearn (\`talentTabId\` \`talentSpellId\`, \`unlearnSpell\`) VALUES(${Tab}, ${id}, ${Spell})`)
        })
    }
}

export const EmptyPrereqs : TSDictionary<uint32, uint8> = CreateDictionary<uint32, uint8>({})
export const EmptySpellArray : TSArray<uint32> = CreateArray<uint32>([])