import { createElement, lineBreak } from "../util/html"

export const Positions = (positions: string[]): HTMLElement => {
    return createElement({
        tag: "div",
        children: [
            createElement({
                tag: "strong",
                text: positions.length > 1 ? "Positions: " : "Position: ",
            }),
            lineBreak(),
            createElement({
                tag: "ul",
                classList: ["unstyled-list"],
                children: positions.map((position) =>
                    createElement({
                        tag: "li",
                        children: [createElement({ tag: "span", text: position })],
                    })
                ),
            }),
        ],
    })
}
