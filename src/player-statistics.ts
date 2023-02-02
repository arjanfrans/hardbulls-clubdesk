import { createElement } from "./util/html"
import statsJson from "./assets/bulls_stats.json"
import type { PlayerMapping } from "./types/player-mapping"

const BattingProperties = [
    "BA",
    "G",
    "PA",
    "AB",
    "R",
    "H",
    "2B",
    "3B",
    "HR",
    "RBI",
    "SH",
    "SF",
    "HP",
    "BB",
    "IBB",
    "K",
    "SB",
    "CS",
    "GDP",
    "Slg",
    "OBP",
    "OPS",
]

const PitchingProperties = [
    "W",
    "L",
    "ERA",
    "G",
    "GS",
    "CG",
    "Sho",
    "Sv",
    "IP",
    "R",
    "ER",
    "H",
    "2B",
    "3B",
    "HR",
    "SH",
    "SF",
    "HB",
    "BB",
    "IBB",
    "K",
    "WP",
    "Bk",
    "AB",
    "BAVG",
]

const playerContainerCache: { [key: string]: HTMLElement | undefined } = {}

export const PlayerStatistics = (name: string) => {
    if (playerContainerCache[name]) {
        return playerContainerCache[name]
    }

    const container = createElement({ tag: "div" })

    const stats = statsJson as PlayerMapping
    const battingTableBody = createElement({ tag: "tbody" })
    const pitchingTableBody = createElement({ tag: "tbody" })
    const battingTableHeader = createElement({
        tag: "thead",
        children: [
            createElement({
                tag: "tr",
                children: [
                    createElement({ tag: "td", text: "Jahr" }),
                    ...BattingProperties.map((property) => {
                        return createElement({ tag: "td", text: property })
                    }),
                ],
            }),
        ],
    })
    const pitchingTableHeader = createElement({
        tag: "thead",
        children: [
            createElement({
                tag: "tr",
                children: [
                    createElement({ tag: "td", text: "Jahr" }),
                    ...PitchingProperties.map((property) => {
                        return createElement({ tag: "td", text: property })
                    }),
                ],
            }),
        ],
    })

    const battingTable = createElement({
        tag: "table",
        children: [battingTableHeader, battingTableBody],
        classList: ["hardbulls-player-statistics-table"],
    })

    const pitchingTable = createElement({
        tag: "table",
        children: [pitchingTableHeader, pitchingTableBody],
        classList: ["hardbulls-player-statistics-table"],
    })

    if (!Object.keys(statsJson).includes(name)) {
        return
    }

    const playerStats = stats[name]

    if (!playerStats) {
        return
    }

    for (const [year, { batting, pitching }] of Object.entries(playerStats)) {
        const yearColumn = createElement({
            tag: "td",
            children: [createElement({ tag: "strong", text: year })],
        })

        if (pitching) {
            const pitchingRow = createElement({
                tag: "tr",
                children: [yearColumn],
            })
            for (const pitchingProperty of PitchingProperties) {
                const column = createElement({ tag: "td" })
                const value = pitching[pitchingProperty]

                if (value) {
                    column.textContent = value
                } else {
                    column.textContent = "0"
                }

                pitchingRow.appendChild(column)
            }

            pitchingTableBody.appendChild(pitchingRow)
        }

        if (batting) {
            const battingRow = createElement({
                tag: "tr",
                children: [yearColumn],
            })

            for (const battingProperty of BattingProperties) {
                const column = createElement({ tag: "td" })
                const value = batting[battingProperty]

                if (value) {
                    column.textContent = value
                } else {
                    column.textContent = "0"
                }

                battingRow.appendChild(column)
            }

            battingTableBody.appendChild(battingRow)
        }
    }

    container.appendChild(createElement({ tag: "h3", text: name }))
    container.appendChild(createElement({ tag: "h4", text: "Batting" }))
    container.appendChild(battingTable)
    container.appendChild(createElement({ tag: "h4", text: "Pitching" }))
    container.appendChild(pitchingTable)

    playerContainerCache[name] = container

    return container
}
