import "../player-card.css"
import { createElement, createImage } from "../util/html"
// @ts-ignore since typescript doesn't support multiple wildcards
import defaultPlayer from "../assets/players/default.png?as=webp&width=220&height=220"

import type { InlineModal } from "../create-modal"
import { CoachCardContent } from "./CoachCardContent"
import { PlayerCardContent } from "./PlayerCardContent"
import { CountryFlag } from "./CountryFlag"
import { loadFiles } from "../util/files"
import { Statistics } from "./Statistics"
import type { PlayerData } from "../PlayerCardsContainer"

const playerImageMapping = loadFiles(
    require.context("../assets/players/?as=webp&width=220&height=220", false, /\.png$/)
)

export const PlayerCard = (data: PlayerData, modal: InlineModal): HTMLElement => {
    const name = data.name
    const imageName = data.image || "default.png"
    const image = playerImageMapping[`./${imageName}`] || defaultPlayer

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
                    data.nationality ? CountryFlag(data.nationality) : undefined,
                    data.isCoach ? undefined : Statistics(name, modal),
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
