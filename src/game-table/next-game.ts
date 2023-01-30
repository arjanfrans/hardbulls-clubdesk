import { createMapsLink } from "../create-maps-link"
import { findTeamLogo } from "../find-team-logo"
import { getUpcomingGamesForTeam } from "../game-plan"
import { parseDate } from "../date"

const dateFormatter = new Intl.DateTimeFormat("de-AT", { dateStyle: "full", timeStyle: "medium" })

export const NextGame = () => {
    const nextGameContainer = document.createElement("div") as HTMLElement

    const nextGameEntry = getUpcomingGamesForTeam("Hard Bulls")[0] || null

    if (!nextGameEntry) {
        return
    }

    const nextGameDate = parseDate(`${nextGameEntry["Datum"]} ${nextGameEntry["Startzeit"]}`)
    const headerElement = document.createElement("div") as HTMLElement

    headerElement.className = "hardbulls-flex-row"

    const homeTeam = document.createElement("div")
    const awayTeam = document.createElement("div")

    const homeLogo = findTeamLogo(nextGameEntry["Heim"])

    if (homeLogo) {
        const homeTeamLogoImg = document.createElement("img")

        homeTeamLogoImg.src = homeLogo
        homeTeamLogoImg.title = nextGameEntry["Heim"]
        homeTeamLogoImg.className = "hardbulls-team-logo"
        homeTeamLogoImg.width = 100
        homeTeamLogoImg.height = 100

        homeTeam.appendChild(homeTeamLogoImg)
    }

    const awayLogo = findTeamLogo(nextGameEntry["Gast"])

    if (awayLogo) {
        const awayTeamLogoImg = document.createElement("img")

        awayTeamLogoImg.src = awayLogo
        awayTeamLogoImg.title = nextGameEntry["Gast"]
        awayTeamLogoImg.className = "hardbulls-team-logo"
        awayTeamLogoImg.width = 100
        awayTeamLogoImg.height = 100

        awayTeam.appendChild(awayTeamLogoImg)
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

    footerElement.appendChild(createMapsLink(nextGameEntry["Spielort"]))

    nextGameContainer.appendChild(headerElement)
    nextGameContainer.appendChild(bodyElement)
    nextGameContainer.appendChild(footerElement)

    return nextGameContainer
}
