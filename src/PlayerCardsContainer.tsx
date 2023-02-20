import {DOMcreateElement} from "./jsx";
import {createModal} from "./create-modal"
import {Statistics} from "./statistics/Statistics"
import {PlayerCard} from "./player-card/PlayerCard"
import {replaceElementChildren} from "./util/html";
import {getAllPlayers, getPlayer, Player} from "./player/players";

export interface PlayerData {
    name: string
    positions: string[]
    yearOfBirth?: number | null
    nickname?: string
    isCoach?: boolean
    throws?: string
    hits?: string
    number?: number
    image?: string
    nationality?: string
}

const sortPlayers = (a: Player, b: Player) => {
    if (a.isCoach && !b.isCoach) {
        return -1
    }

    if (!a.isCoach && b.isCoach) {
        return 1
    }

    return Math.random() < 0.5 ? 1 : -1
}

export const PlayerCardsContainer = (): JSX.Element => {
    const modal = createModal({
        onOpen: ((container, openTrigger) => {
            const playerName = openTrigger.getAttribute("data-player")


            if (!playerName) {
                return
            }

            const player = getPlayer(playerName);

            if (!player) {
                return;
            }

            const playerStatsTable = <Statistics player={player} />

            if (!playerStatsTable) {
                return
            }

            replaceElementChildren(container, playerStatsTable);
        })
    })
    const children = getAllPlayers()
        .sort(sortPlayers)
        .map((player) => <PlayerCard player={player} modal={modal}/>);

    return (<div className="hardbulls-player-container">{children}{modal.container}</div>)
}
