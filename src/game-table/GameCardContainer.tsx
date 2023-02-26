import {DOMcreateElement} from "../jsx";
import {getGamesForTeam} from "../game-plan"
import {GameCard} from "./GameCard"

export const GameCardContainer = () => {
    const games = getGamesForTeam("Hard Bulls");

    return (
        <div className="hardbulls-game-overview-container">
            {
                games.map(game => <GameCard entry={game}/>)
            }
        </div>
    )
}
