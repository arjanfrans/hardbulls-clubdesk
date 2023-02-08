import { createElement, createImage } from "./util/html"

import playerData from "./assets/players.json"
// @ts-ignore since typescript doesn't support multiple wildcards
import defaultPlayer from "./assets/players/default.png?as=webp&width=220&height=220"
// @ts-ignore since typescript doesn't support multiple wildcards
import imgClayton from "./assets/players/Clayton Carson.png?as=webp&width=220&height=220"
// @ts-ignore since typescript doesn't support multiple wildcards
import imgHubert from "./assets/players/Hubert Böhler.png?as=webp&width=220&height=220"

// @ts-ignore since typescript doesn't support multiple wildcards
import imgYanik from "./assets/players/Yanik Mäser.png?as=webp&width=220&height=220"

// @ts-ignore since typescript doesn't support multiple wildcards
import imgLuca from "./assets/players/Luca Mäser.png?as=webp&width=220&height=220"

// @ts-ignore since typescript doesn't support multiple wildcards
import imgLutti from "./assets/players/Matthias Lutter.png?as=webp&width=220&height=220"

// @ts-ignore since typescript doesn't support multiple wildcards
import imgErwin from "./assets/players/Erwin Frias.png?as=webp&width=220&height=220"

// @ts-ignore since typescript doesn't support multiple wildcards
import imgMarvin from "./assets/players/Marvin Glassen.png?as=webp&width=220&height=220"

// @ts-ignore since typescript doesn't support multiple wildcards
import imgLevin from "./assets/players/Levin Maier.png?as=webp&width=220&height=220"

// @ts-ignore since typescript doesn't support multiple wildcards
import imgLaurin from "./assets/players/Laurin Schedler.png?as=webp&width=220&height=220"

// @ts-ignore since typescript doesn't support multiple wildcards
import imgMarcel from "./assets/players/Marcel Winder.png?as=webp&width=220&height=220"

// @ts-ignore since typescript doesn't support multiple wildcards
import imgPascal from "./assets/players/Pascal Campregher.png?as=webp&width=220&height=220"

// @ts-ignore since typescript doesn't support multiple wildcards
import imgJonas from "./assets/players/Jonas Zimmermann.png?as=webp&width=220&height=220"

// @ts-ignore since typescript doesn't support multiple wildcards
import imgAB from "./assets/players/Anothny Bennett.png?as=webp&width=220&height=220"

import { createInlineModal, InlineModal } from "./create-modal"
import { PlayerStatistics } from "./player-statistics"

const mapping: { [key: string]: string } = {
    "Clayton Carson": imgClayton,
    "Hubert Böhler": imgHubert,
    "Yanik Mäser": imgYanik,
    "Luca Mäser": imgLuca,
    "Matthias Lutter": imgLutti,
    "Marvin Glassen": imgMarvin,
    "Erwin Frias": imgErwin,
    "Levin Maier": imgLevin,
    "Laurin Schedler": imgLaurin,
    "Pascal Campregher": imgPascal,
    "Marcel Winder": imgMarcel,
    "Jonas Zimmermann": imgJonas,
    "Anthony Bennett": imgAB,
}

export interface PlayerData {
    name: string
    positions: string[]
    yearOfBirth?: number | null
    nickname?: string
    isCoach?: boolean
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

const playerCard = (name: string, modal: InlineModal) => {
    const data = playerDataByName[name]

    if (!data) {
        return
    }

    const image = mapping[name] || defaultPlayer

    return createElement({
        tag: "div",
        classList: ["hardbulls-player-card"],
        children: [
            createElement({
                tag: "div",
                classList: ["hardbulls-player-card-image-container"],
                children: [
                    createImage({
                        src: image,
                    }),
                ],
            }),
            createElement({
                tag: "div",
                classList: ["hardbulls-player-card-content"],
                children: [
                    createElement({
                        tag: "div",
                        children: [createElement({ tag: "h3", text: name })],
                    }),
                    createElement({
                        tag: "div",
                        children: [createElement({ tag: "p", text: data.positions.join(" / ") })],
                    }),
                    createElement({
                        tag: "div",
                        children: [
                            (() => {
                                const statsLink = createElement({ tag: "a", text: "Statistik" })

                                statsLink.setAttribute("data-modal", "hardbulls-statistics-modal")
                                statsLink.setAttribute("data-player", name)

                                statsLink.onmousedown = (event) => {
                                    event.preventDefault()
                                    modal.open(statsLink)
                                }

                                return statsLink
                            })(),
                        ],
                    }),
                ],
            }),
        ],
    })
}

export const PlayerCardsContainer = (): HTMLElement => {
    const container = createElement({ tag: "div", classList: ["hardbulls-player-container"] })
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

    for (const playerData of Object.values(playerDataByName).sort(sortPlayers)) {
        const card = playerCard(playerData.name, modal)

        if (card) {
            container.appendChild(card)
        }
    }

    // container.appendChild(modalAnchor)
    container.appendChild(modal.container)

    return container
}
