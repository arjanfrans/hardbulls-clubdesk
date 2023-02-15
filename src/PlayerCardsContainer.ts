import { createElement } from "./util/html"
import { createInlineModal } from "./create-modal"
import { PlayerStatistics } from "./player-statistics"
import playerData from "./assets/players.json"
import { PlayerCard } from "./player-card/PlayerCard"

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

const sortPlayers = (a: PlayerData, b: PlayerData) => {
    if (a.isCoach && !b.isCoach) {
        return -1
    }

    if (!a.isCoach && b.isCoach) {
        return 1
    }

    return Math.random() < 0.5 ? 1 : -1
}

const playerDataByName: { [key: string]: PlayerData } = playerData.reduce(
    (result: { [key: string]: PlayerData }, player) => {
        result[player.name] = player

        return result
    },
    {}
)

export const PlayerCardsContainer = (): HTMLElement => {
    const modalAnchor = createElement({ tag: "div", classList: ["hardbulls-player-statistics"] })

    const modal = createInlineModal(modalAnchor, (modal, openTrigger) => {
        const playerName = openTrigger.getAttribute("data-player")

        if (!playerName) {
            return
        }

        const playerStatsTable = PlayerStatistics(playerName)

        if (!playerStatsTable) {
            return
        }

        modal.content.replaceChildren(playerStatsTable)
    })

    return createElement({
        tag: "div",
        classList: ["hardbulls-player-container"],
        children: [
            ...Object.values(playerDataByName)
                .sort(sortPlayers)
                .map((playerData) => {
                    return PlayerCard(playerData, modal)
                }),
            modal.container,
        ],
    })
}
