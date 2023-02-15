import { createElement } from "../util/html"
import { Positions } from "./Positions"
import { HitAndThrow } from "./HitAndThrow"

export const PlayerCardContent = (name: string, positions: string[], hits?: string, throws?: string): HTMLElement => {
    return createElement({
        tag: "div",
        classList: ["hardbulls-player-card-content"],
        children: [
            createElement({
                tag: "div",
                classList: ["hardbulls-player-card-name"],
                text: name,
            }),
            createElement({
                tag: "div",
                children: [Positions(positions), HitAndThrow(hits, throws)],
            }),
        ],
    })
}
