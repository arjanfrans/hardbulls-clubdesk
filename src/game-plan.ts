import csvGamePlan from "./assets/bbl_2023.json"
import { parseDate } from "./date"

export interface CsvEntry {
    Heim: string
    Gast: string
    Startzeit: string
    Datum: string
    Spielort: string
}

export const getGamesForTeam = (team: string): CsvEntry[] => {
    return csvGamePlan
        .filter((entry) => entry["Heim"].trim() !== "")
        .filter((entry) => entry["Datum"].trim() !== "" && entry["Startzeit"] !== null)
        .filter((entry) => entry["Heim"] === team || entry["Gast"] === team)
}

export const getUpcomingGamesForTeam = (team: string): CsvEntry[] => {
    const now = new Date()

    now.setHours(0)
    now.setMinutes(0)

    return getGamesForTeam(team).filter((entry: CsvEntry) => {
        const startDate = parseDate(`${entry["Datum"]} ${entry["Startzeit"]}`)

        return startDate > now
    })
}
