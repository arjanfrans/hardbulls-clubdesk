import { createElement } from "../util/html"

export const CoachCardContent = (name: string): HTMLElement => {
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
                children: [createElement({ tag: "p", text: "Head Coach" })],
            }),
        ],
    })
}
