import { createElement } from "../util/html"

export const HitAndThrow = (hitting?: string, throwing?: string): HTMLElement => {
    return createElement({
        tag: "ul",
        classList: ["unstyled-list", "horizontal-list"],
        children: [
            hitting
                ? createElement({
                      tag: "li",
                      children: [
                          createElement({
                              tag: "strong",
                              text: "Hits: ",
                          }),
                          createElement({ tag: "span", text: hitting }),
                      ],
                  })
                : undefined,
            throwing
                ? createElement({
                      tag: "li",
                      children: [
                          createElement({
                              tag: "strong",
                              text: "Throws: ",
                          }),
                          createElement({ tag: "span", text: throwing }),
                      ],
                  })
                : undefined,
        ],
    })
}
