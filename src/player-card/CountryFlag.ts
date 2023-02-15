import { createElement } from "../util/html"

export const CountryFlag = (code: string): HTMLElement => {
    return createElement({
        tag: "div",
        classList: ["hardbulls-player-card-flag"],
        children: [
            createElement({
                tag: "span",
                classList: ["hb-flag", `flag-${code}`, "flag-38"],
            }),
        ],
    })
}
