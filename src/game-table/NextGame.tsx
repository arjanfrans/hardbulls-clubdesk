import {DOMcreateElement} from "../jsx";
import { getUpcomingGamesForTeam } from "../game-plan"
import { GameCard } from "./GameCard"

export const NextGame = (): JSX.Element => {
    const nextGameEntry = getUpcomingGamesForTeam("Hard Bulls")[0] || null

    if (!nextGameEntry) {
        return <div/>
    }

    return <GameCard entry={nextGameEntry}/>
}
