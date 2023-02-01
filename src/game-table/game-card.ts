import type { CsvEntry } from "../game-plan"
import { dateFormatter, parseDate } from "../date"
import { findTeamLogo } from "../find-team-logo"
import { createMapsLink } from "../create-maps-link"
import { createElement } from "../util/html"

export const createGameCard = (entry: CsvEntry) => {
    const nextGameContainer = document.createElement("div") as HTMLElement

    const nextGameDate = parseDate(`${entry["Datum"]} ${entry["Startzeit"]}`)
    const headerElement = document.createElement("div") as HTMLElement

    headerElement.className = "hardbulls-flex-row"

    const homeTeam = document.createElement("div")
    const awayTeam = document.createElement("div")

    const homeLogo = findTeamLogo(entry["Heim"])

    if (homeLogo) {
        const homeTeamLogoImg = document.createElement("img")

        homeTeamLogoImg.src = homeLogo
        homeTeamLogoImg.title = entry["Heim"]
        homeTeamLogoImg.className = "hardbulls-team-logo"
        homeTeamLogoImg.width = 100
        homeTeamLogoImg.height = 100

        homeTeam.appendChild(homeTeamLogoImg)
    } else {
        homeTeam.appendChild(createElement({ tag: "span", text: entry["Heim"] }))
    }

    const awayLogo = findTeamLogo(entry["Gast"])

    if (awayLogo) {
        const awayTeamLogoImg = document.createElement("img")

        awayTeamLogoImg.src = awayLogo
        awayTeamLogoImg.title = entry["Gast"]
        awayTeamLogoImg.className = "hardbulls-team-logo"
        awayTeamLogoImg.width = 100
        awayTeamLogoImg.height = 100

        awayTeam.appendChild(awayTeamLogoImg)
    } else {
        awayTeam.appendChild(createElement({ tag: "span", text: entry["Gast"] }))
    }

    const placeHolder = document.createElement("div")

    placeHolder.style.fontSize = "x-large"
    placeHolder.textContent = "-"
    placeHolder.style.marginTop = "auto"
    placeHolder.style.marginBottom = "auto"
    placeHolder.style.marginLeft = "10px"
    placeHolder.style.marginRight = "10px"

    headerElement.appendChild(homeTeam)
    headerElement.appendChild(placeHolder)
    headerElement.appendChild(awayTeam)

    const bodyElement = document.createElement("div") as HTMLElement

    bodyElement.className = "hardbulls-flex-row"

    bodyElement.textContent = dateFormatter.format(nextGameDate)

    const footerElement = document.createElement("div") as HTMLElement

    footerElement.className = "hardbulls-flex-row"

    footerElement.appendChild(createMapsLink(entry["Spielort"]))

    nextGameContainer.appendChild(headerElement)
    nextGameContainer.appendChild(bodyElement)
    nextGameContainer.appendChild(footerElement)

    return nextGameContainer
}
