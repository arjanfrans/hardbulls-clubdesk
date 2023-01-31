import { createMapsLink } from "../create-maps-link"
import { CsvEntry, getGamesForTeam } from "../game-plan"
import { createElement } from "../html/utils"
import { createGameCard } from "./game-card"
import { chunks } from "../array/util"

export const SimpleGameTable = () => {
    const table = createElement({ tag: "table" })
    const tableBody = table.appendChild(createElement({ tag: "tbody" }))

    for (const entry of getGamesForTeam("Hard Bulls")) {
        const rowElement = document.createElement("tr")
        const homeColumn = document.createElement("td") as HTMLElement
        const awayColumn = document.createElement("td") as HTMLElement
        const dateColumn = document.createElement("td") as HTMLElement
        const venueColumn = document.createElement("td") as HTMLElement

        homeColumn.textContent = entry["Heim"]
        awayColumn.textContent = entry["Gast"]
        dateColumn.textContent = `${entry["Datum"]} ${entry["Startzeit"]}`

        venueColumn.appendChild(createMapsLink(entry["Spielort"]))
        ;[dateColumn, homeColumn, awayColumn, venueColumn].map((column) => rowElement.appendChild(column))

        tableBody.appendChild(rowElement)
    }

    return table
}

export const CardGameTable = () => {
    const container = createElement({ tag: "div", classList: ["cd-section-content"] })
    const rowData = [...chunks<CsvEntry>(getGamesForTeam("Hard Bulls"), 3)]

    for (const columnData of rowData) {
        const row = createElement({ tag: "div", classList: ["cd-row"] })

        for (const blockData of columnData) {
            const column = createElement({ tag: "div", classList: ["cd-col", "m4"] })
            const block = createElement({
                tag: "div",
                classList: ["cd-block", "cd-block-center", "hardbulls-game-card"],
            })
            const content = createElement({ tag: "div", classList: ["cd-block-content"] })

            content.appendChild(createGameCard(blockData))

            block.appendChild(content)
            column.appendChild(block)

            row.appendChild(column)
        }

        container.appendChild(row)
    }

    return container
}
