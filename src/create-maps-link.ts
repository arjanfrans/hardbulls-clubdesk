export const createMapsLink = (venue: string): HTMLElement => {
    const mapsBaseUrl = "https://www.google.com/maps?q="
    const link = document.createElement("a")

    link.href = `${mapsBaseUrl}${encodeURIComponent(venue)}`
    link.target = "_blank"

    link.textContent = venue

    return link
}
