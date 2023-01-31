import { getUpcomingGamesForTeam } from "../game-plan"
import { createGameCard } from "./game-card"

export const NextGame = () => {
    const nextGameEntry = getUpcomingGamesForTeam("Hard Bulls")[0] || null

    if (!nextGameEntry) {
        return
    }

    return createGameCard(nextGameEntry)
}
