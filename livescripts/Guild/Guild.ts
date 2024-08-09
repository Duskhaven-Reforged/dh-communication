let StarterID = 1
let AutoJoinGuild = false
export function StarterGuild(events: TSEvents) {
    events.Player.OnLogin((Player, First) => {
        if (First && AutoJoinGuild)
            GetGuild(StarterID).AddMember(Player, 0xFF)
    })
}