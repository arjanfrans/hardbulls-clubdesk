import { createElement } from "./util/html"
import statsJson from "./assets/bulls_stats.json"
import type { PlayerMapping } from "./types/player-mapping"

enum CalculationType {
    SUM = "SUM",
    AVG = "AVG",
}

interface StatisticProperty {
    abbreviation: string
    name: string
    type: CalculationType
    wiki: string
}

const BattingProperties: StatisticProperty[] = [
    {
        abbreviation: "BA",
        name: "Batting Average",
        type: CalculationType.AVG,
        wiki: "https://en.wikipedia.org/wiki/Batting_average_(baseball)",
    },
    {
        abbreviation: "G",
        name: "Games Played",
        type: CalculationType.SUM,
        wiki: "https://en.wikipedia.org/wiki/Games_played",
    },
    {
        abbreviation: "PA",
        name: "Plate Appearances",
        type: CalculationType.SUM,
        wiki: "https://en.wikipedia.org/wiki/Plate_appearance",
    },
    {
        abbreviation: "AB",
        name: "At Bats",
        type: CalculationType.SUM,
        wiki: "https://en.wikipedia.org/wiki/At_bat",
    },
    {
        abbreviation: "R",
        name: "Runs",
        type: CalculationType.SUM,
        wiki: "https://en.wikipedia.org/wiki/Run_(baseball)",
    },
    {
        abbreviation: "H",
        name: "Hits",
        type: CalculationType.SUM,
        wiki: "https://en.wikipedia.org/wiki/Hit_(baseball)",
    },
    {
        abbreviation: "2B",
        name: "Doubles",
        type: CalculationType.SUM,
        wiki: "https://en.wikipedia.org/wiki/Double_(baseball)",
    },
    {
        abbreviation: "3B",
        name: "Triples",
        type: CalculationType.SUM,
        wiki: "https://en.wikipedia.org/wiki/Triple_(baseball)",
    },
    {
        abbreviation: "HR",
        name: "Home Runs",
        type: CalculationType.SUM,
        wiki: "https://en.wikipedia.org/wiki/Home_run",
    },
    {
        abbreviation: "RBI",
        name: "Runs Batted In",
        wiki: "https://en.wikipedia.org/wiki/Run_batted_in",
        type: CalculationType.SUM,
    },
    {
        abbreviation: "SH",
        name: "Sacrifice Hits",
        type: CalculationType.SUM,
        wiki: "https://en.wikipedia.org/wiki/Sacrifice_hit",
    },
    {
        abbreviation: "SF",
        name: "Sacrifice Flies",
        type: CalculationType.SUM,
        wiki: "https://en.wikipedia.org/wiki/Sacrifice_fly",
    },
    {
        abbreviation: "HP",
        name: "Hit by Pitches",
        type: CalculationType.SUM,
        wiki: "https://en.wikipedia.org/wiki/Hit_by_pitch",
    },
    {
        abbreviation: "BB",
        name: "Base on Balls",
        type: CalculationType.SUM,
        wiki: "https://en.wikipedia.org/wiki/Base_on_balls",
    },
    {
        abbreviation: "IBB",
        name: "Intentional Base on Balls",
        type: CalculationType.SUM,
        wiki: "https://en.wikipedia.org/wiki/Intentional_base_on_balls",
    },
    {
        abbreviation: "K",
        name: "Strikeout",
        type: CalculationType.SUM,
        wiki: "https://en.wikipedia.org/wiki/Strikeout",
    },
    {
        abbreviation: "SB",
        name: "Stolen Bases",
        wiki: "https://en.wikipedia.org/wiki/Stolen_base",
        type: CalculationType.SUM,
    },
    {
        abbreviation: "CS",
        name: "Caught Stealing",
        type: CalculationType.SUM,
        wiki: "https://en.wikipedia.org/wiki/Caught_stealing",
    },
    {
        abbreviation: "GDP",
        name: "Grounded into Double Plays",
        type: CalculationType.SUM,
        wiki: "https://en.wikipedia.org/wiki/Double_play",
    },
    {
        abbreviation: "SLG",
        name: "Slugging percentage",
        type: CalculationType.AVG,
        wiki: "https://en.wikipedia.org/wiki/Slugging_percentage",
    },
    {
        abbreviation: "OBP",
        name: "On-Base Percentage",
        type: CalculationType.AVG,
        wiki: "https://en.wikipedia.org/wiki/On-base_percentage",
    },
    {
        abbreviation: "OPS",
        name: "On-Base plus Slugging",
        type: CalculationType.AVG,
        wiki: "https://en.wikipedia.org/wiki/On-base_plus_slugging",
    },
]

const PitchingProperties: StatisticProperty[] = [
    {
        abbreviation: "W",
        name: "Wins",
        type: CalculationType.SUM,
        wiki: "https://en.wikipedia.org/wiki/Win_(baseball)",
    },
    {
        abbreviation: "L",
        name: "Losses",
        type: CalculationType.SUM,
        wiki: "https://en.wikipedia.org/wiki/Loss_(baseball)",
    },
    {
        abbreviation: "ERA",
        name: "Earned Run Average",
        type: CalculationType.AVG,
        wiki: "https://en.wikipedia.org/wiki/Earned_run_average",
    },
    {
        abbreviation: "G",
        name: "Games pitched",
        type: CalculationType.SUM,
        wiki: "https://en.wikipedia.org/wiki/Games_pitched",
    },
    {
        abbreviation: "GS",
        name: "Games Started",
        type: CalculationType.SUM,
        wiki: "https://en.wikipedia.org/wiki/Games_started",
    },
    {
        abbreviation: "CG",
        name: "Complete Games",
        type: CalculationType.SUM,
        wiki: "https://en.wikipedia.org/wiki/Complete_game",
    },
    {
        abbreviation: "SHO",
        name: "Shutouts",
        type: CalculationType.SUM,
        wiki: "https://en.wikipedia.org/wiki/Shutout_(baseball)",
    },
    {
        abbreviation: "SV",
        name: "Saves",
        type: CalculationType.SUM,
        wiki: "https://en.wikipedia.org/wiki/Save_(baseball)",
    },
    {
        abbreviation: "IP",
        name: "Innings Pitched",
        type: CalculationType.SUM,
        wiki: "https://en.wikipedia.org/wiki/Innings_pitched",
    },
    {
        abbreviation: "R",
        name: "Runs allowed",
        type: CalculationType.SUM,
        wiki: "https://en.wikipedia.org/wiki/Run_(baseball)",
    },
    {
        abbreviation: "ER",
        name: "Earned Runs",
        type: CalculationType.SUM,
        wiki: "https://en.wikipedia.org/wiki/Earned_run",
    },
    {
        abbreviation: "H",
        name: "Hits allowed",
        type: CalculationType.SUM,
        wiki: "https://en.wikipedia.org/wiki/Hits_allowed",
    },
    {
        abbreviation: "2B",
        name: "Doubles allowed",
        type: CalculationType.SUM,
        wiki: "https://en.wikipedia.org/wiki/Double_(baseball)",
    },
    {
        abbreviation: "3B",
        name: "Triples allowed",
        type: CalculationType.SUM,
        wiki: "https://en.wikipedia.org/wiki/Triple_(baseball)",
    },
    {
        abbreviation: "HR",
        name: "Home Runs allowed",
        type: CalculationType.SUM,
        wiki: "https://en.wikipedia.org/wiki/Home_runs_allowed",
    },
    {
        abbreviation: "SH",
        name: "Sacrifice Hits allowed",
        type: CalculationType.SUM,
        wiki: "https://en.wikipedia.org/wiki/Sacrifice_hit",
    },
    {
        abbreviation: "SF",
        name: "Sacrifice Flies allowed",
        type: CalculationType.SUM,
        wiki: "https://en.wikipedia.org/wiki/Sacrifice_fly",
    },
    {
        abbreviation: "HB",
        name: "Hit Batsmen",
        type: CalculationType.SUM,
        wiki: "https://en.wikipedia.org/wiki/Hit_by_pitch",
    },
    {
        abbreviation: "BB",
        name: "Base on Balls allowed",
        type: CalculationType.SUM,
        wiki: "https://en.wikipedia.org/wiki/Base_on_balls",
    },
    {
        abbreviation: "IBB",
        name: "Intentional Base on Balls allowed",
        type: CalculationType.SUM,
        wiki: "https://en.wikipedia.org/wiki/Intentional_base_on_balls",
    },
    {
        abbreviation: "K",
        name: "Strikeouts",
        type: CalculationType.SUM,
        wiki: "https://en.wikipedia.org/wiki/Strikeout",
    },
    {
        abbreviation: "WP",
        name: "Wild Pitches",
        type: CalculationType.SUM,
        wiki: "https://en.wikipedia.org/wiki/Wild_pitch",
    },
    {
        abbreviation: "BK",
        name: "Balks",
        type: CalculationType.SUM,
        wiki: "https://en.wikipedia.org/wiki/Balk",
    },
    {
        abbreviation: "AB",
        name: "Batters faced",
        type: CalculationType.SUM,
        wiki: "https://en.wikipedia.org/wiki/Batters_faced",
    },
    {
        abbreviation: "BAVG",
        name: "Opponents Batting Average",
        type: CalculationType.AVG,
        wiki: "https://en.wikipedia.org/wiki/Opponents_batting_average",
    },
]

const playerContainerCache: { [key: string]: HTMLElement | undefined } = {}

const createHeader = (headers: StatisticProperty[]) => {
    const createHeaderColumn = (property: StatisticProperty) => {
        return createElement({
            tag: "th",
            children: [createElement({ tag: "span", title: property.name, text: property.abbreviation })],
        })
    }

    return createElement({
        tag: "thead",
        children: [
            createElement({
                tag: "tr",
                children: [
                    createElement({ tag: "th", text: "Jahr" }),
                    ...headers.map((property) => createHeaderColumn(property)),
                ],
            }),
        ],
    })
}

const renderValue = (type: CalculationType, value: string | undefined): string => {
    if (!value) {
        value = "0"
    }

    if (type === CalculationType.AVG) {
        return Number.parseFloat(value).toFixed(3)
    }

    return Number.parseFloat(value) % 1 === 0 ? value : Number.parseFloat(value).toFixed(2)
}

export const PlayerStatistics = (name: string) => {
    if (playerContainerCache[name]) {
        return playerContainerCache[name]
    }

    const container = createElement({ tag: "div" })

    const stats = statsJson as PlayerMapping
    const battingTableBody = createElement({ tag: "tbody" })
    const pitchingTableBody = createElement({ tag: "tbody" })

    let pitchingTable
    let battingTable

    const playerStats = stats[name]

    if (playerStats) {
        for (const [year, { batting, pitching }] of Object.entries(playerStats)) {
            const pitchingYearColumn = createElement({
                tag: "td",
                children: [createElement({ tag: "strong", text: year })],
            })
            const battingYearColumn = createElement({
                tag: "td",
                children: [createElement({ tag: "strong", text: year })],
            })

            if (pitching) {
                pitchingTable = createElement({
                    tag: "table",
                    children: [createHeader(PitchingProperties), pitchingTableBody],
                    classList: ["hardbulls-player-statistics-table"],
                })

                const pitchingRow = createElement({
                    tag: "tr",
                    children: [pitchingYearColumn],
                })
                for (const pitchingProperty of PitchingProperties) {
                    const column = createElement({ tag: "td" })
                    const value = pitching[pitchingProperty.abbreviation]

                    column.textContent = renderValue(pitchingProperty.type, value)

                    pitchingRow.appendChild(column)
                }

                pitchingTableBody.appendChild(pitchingRow)
            }

            if (batting) {
                battingTable = createElement({
                    tag: "table",
                    children: [createHeader(BattingProperties), battingTableBody],
                    classList: ["hardbulls-player-statistics-table"],
                })

                const battingRow = createElement({
                    tag: "tr",
                    children: [battingYearColumn],
                })

                for (const battingProperty of BattingProperties) {
                    const column = createElement({ tag: "td" })
                    const value = batting[battingProperty.abbreviation]

                    column.textContent = renderValue(battingProperty.type, value)

                    battingRow.appendChild(column)
                }

                battingTableBody.appendChild(battingRow)
            }
        }
    }

    container.appendChild(createElement({ tag: "h2", text: name }))

    if (battingTable) {
        container.appendChild(createElement({ tag: "h3", text: "Batting" }))
        container.appendChild(battingTable)
    }

    if (pitchingTable) {
        container.appendChild(createElement({ tag: "h3", text: "Pitching" }))
        container.appendChild(pitchingTable)
    }

    playerContainerCache[name] = container

    return container
}
