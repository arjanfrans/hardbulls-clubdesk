import { createMapsLink } from "../create-maps-link"
import { getGamesForTeam } from "../game-plan"

export const GameTable = () => {
    const table = document.createElement("table")
    const tableBody = table.appendChild(document.createElement("tbody"))

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
