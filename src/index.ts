import "./index.css"
import "./news-page.css"
import "./modal.css"
import "./table.css"
import "./icons.css"
import "./flags.css"
import { NextGame } from "./game-table/NextGame"
import { PlayerCardsContainer } from "./PlayerCardsContainer"
import { appendElement } from "./util/html"
import { GameCardContainer } from "./game-table/GameCardContainer"

const addNameToHeader = () => {
    const siteNameElement = document.createElement("span")

    siteNameElement.classList.add("bulls-club-name")
    siteNameElement.textContent = "Hard Bulls Baseballverein"

    document.querySelector("div.cd-club-logo-and-name")?.appendChild(siteNameElement)
}

const alwaysShowMenuOnDesktop = () => {
    const desktopMediaQuery = window.matchMedia("(min-width: 993px)")

    const megaMenu = document.querySelector("div.cd-megamenu") as HTMLElement

    if (!megaMenu) {
        return
    }

    const mediaQueryHandler = (event: MediaQueryListEvent) => {
        if (event.matches) {
            megaMenu.style.display = "block"
            document.querySelector("body")?.classList.remove("cd-megamenu-open")
        } else {
            megaMenu.style.display = "none"
            document.querySelector("body")?.classList.remove("cd-megamenu-open")
        }
    }

    desktopMediaQuery.addEventListener("change", mediaQueryHandler)
}

const shuffleSponsors = () => {
    const sponsorItem = document.querySelector(".cd-sponsors-item") as HTMLElement
    const sponsorContainer = sponsorItem && (sponsorItem.parentElement as HTMLElement)

    if (sponsorContainer) {
        for (let i = sponsorContainer.children.length; i >= 0; i--) {
            const child = sponsorContainer.children[(Math.random() * i) | 0]

            if (child) {
                sponsorContainer.appendChild(child)
            }
        }
    }
}

const addImageFallback = () => {
    const newsImages = document.querySelectorAll(".cd-tile-v-box .cd-image-content")
    const notFoundImage = document.createElement("img")

    notFoundImage.src = "./wwwfiles/bull_gray.png?v={{lastWwwFilesChange}}"
    notFoundImage.style.width = "initial"
    notFoundImage.style.height = "initial"

    for (let i = 0; i < newsImages.length; i++) {
        const node = newsImages[i] as HTMLElement

        if (node && !node.querySelector("img")) {
            node.appendChild(notFoundImage)

            node.style.display = "flex"
            node.style.justifyContent = "center"
            node.style.alignItems = "center"

            node.style.border = "3px dashed #cccccc"
        }
    }
}

const moveNewsSubheading = () => {
    const detailSection = document.querySelector("div.cd-news-detail div.cd-detailPageNavigation") as HTMLElement
    const detailSubheading = document.querySelector("div.cd-news-detail div.cd-additional-subheading") as HTMLElement

    if (detailSection && detailSubheading) {
        detailSection.style.display = "flex"
        detailSection.style.justifyContent = "space-between"

        detailSection.appendChild(detailSubheading)

        const childNode3 = detailSubheading.childNodes[2]

        // Remove ", " if author is empty
        if (childNode3 && childNode3.textContent?.trim() === ",") {
            detailSubheading.removeChild(childNode3)
        } else if (childNode3) {
            childNode3.textContent = childNode3.textContent?.trim() || ""
        }
    }
}

const optimizeSponsorImages = () => {
    const format = "_512x512"
    const sponsorImageTags = document.querySelectorAll("div.cd-sponsors-item .cd-image-content img")

    for (const image of Array.from(sponsorImageTags)) {
        if (image instanceof HTMLImageElement) {
            image.src = `${image.src}&imageFormat=${format}`
        }
    }
}

const newsOverviewAuthorSubheading = () => {
    const overviewSubheadings = document.querySelectorAll("div.cd-tile-v-main-subheading") as NodeListOf<HTMLElement>

    for (const overviewSubheading of Array.from(overviewSubheadings)) {
        if (overviewSubheading.childNodes[2]) {
            overviewSubheading.childNodes[2].textContent = overviewSubheading.childNodes[2].textContent?.trim() || ""
        }
    }
}

const addGameTable = () => {
    const container = document.querySelector(".hardbulls-card-game-table") as HTMLElement

    if (container) {
        appendElement(container, GameCardContainer())
    }
}

const addNextGame = () => {
    const container = document.querySelector(".hardbulls-next-game") as HTMLElement

    if (container) {
        appendElement(container, NextGame())
    }
}

const addPlayerCardPage = () => {
    const container = document.querySelector(".hardbulls-player-container") as HTMLElement

    if (container) {
        appendElement(container, PlayerCardsContainer())
    }
}

export const theBulls = () => {
    optimizeSponsorImages()
    alwaysShowMenuOnDesktop()
    addNameToHeader()
    shuffleSponsors()
    addImageFallback()
    moveNewsSubheading()
    newsOverviewAuthorSubheading()
    addGameTable()
    addNextGame()
    addPlayerCardPage()
}
