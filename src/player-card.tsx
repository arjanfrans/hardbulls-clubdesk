import './player-card.css'
import {createElement, createImage} from "./util/html"

import playerData from "./assets/players.json"
// @ts-ignore since typescript doesn't support multiple wildcards
import defaultPlayer from "./assets/players/default.png?as=webp&width=220&height=220"

import {createInlineModal, InlineModal} from "./create-modal"
import {PlayerStatistics} from "./player-statistics"
import {CoachCardContent} from "./player-card/CoachCardContent";
import {PlayerCardContent} from "./player-card/PlayerCardContent";

const images = require.context('./assets/players/?as=webp&width=220&height=220', false, /\.png$/)

interface ImageMapping {
    [key: string]: string|undefined
}

const imageNames = images.keys();

const mapping: ImageMapping = {};

for (const [key, image] of imageNames.map(images).entries()) {
    const imageSource = image as string;
    const name = imageNames[key] as string;

    if (name) {
        mapping[name] = imageSource;
    }
}

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

const playerCard = (name: string, imageName: string, modal: InlineModal) => {
    const data = playerDataByName[name]

    if (!data) {
        return
    }

    const image = mapping[`./${imageName}`] || defaultPlayer

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
            data.isCoach ? CoachCardContent(name) : PlayerCardContent(name, data.positions, data.hits, data.throws),
            createElement({
                tag: "div",
                classList: ["hardbulls-player-card-footer"],
                children: [
                    data.isCoach
                        ? undefined
                        : createElement({
                              tag: "div",
                              classList: ["hardbulls-player-card-statistics"],
                              children: [
                                  (() => {
                                      const statsLink = createElement({
                                          tag: "a",
                                          title: "Statistik",
                                          children: [
                                              createElement({ tag: "span", classList: ["fas", "fa-chart-bar"] }),
                                          ],
                                      })

                                      statsLink.setAttribute("data-modal", "hardbulls-statistics-modal")
                                      statsLink.setAttribute("data-player", name)

                                      statsLink.onclick = (event) => {
                                          event.preventDefault()
                                          modal.open(statsLink)
                                      }

                                      return statsLink
                                  })(),
                              ],
                          }),
                    data.number
                        ? createElement({
                              tag: "div",
                              classList: ["hardbulls-player-card-number"],
                              text: `${data.number}`,
                          })
                        : undefined,
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
        const card = playerCard(playerData.name, playerData.image || 'default.png', modal)

        if (card) {
            container.appendChild(card)
        }
    }

    container.appendChild(modal.container)

    return container
}
