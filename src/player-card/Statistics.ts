import { createElement } from "../util/html"
import type { InlineModal } from "../create-modal"

export const Statistics = (name: string, modal: InlineModal) => {
    const handleClick = (event: MouseEvent) => {
        event.preventDefault()
        modal.open(statsLink)
    }

    const statsLink = createElement({
        tag: "a",
        title: "Statistik",
        children: [createElement({ tag: "span", classList: ["fas", "fa-chart-bar"] })],
    })

    statsLink.setAttribute("data-modal", "hardbulls-statistics-modal")
    statsLink.setAttribute("data-player", name)

    statsLink.onclick = handleClick

    return createElement({
        tag: "div",
        classList: ["hardbulls-player-card-statistics"],
        children: [statsLink],
    })
}
