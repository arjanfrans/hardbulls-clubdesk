import statsJson from "./assets/bulls_stats.json"
import type { Player, PlayerMapping } from "./types/player-mapping"

export const getPlayerStats = (name: string): Player | undefined => {
    const stats = statsJson as PlayerMapping
    const playerStats = stats[name]

    if (!playerStats) {
        return
    }

    return {
        stats: playerStats,
    }
}
