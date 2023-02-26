import {DOMcreateElement} from "./jsx";

interface Props {
    venue: string
}

export const GoogleMapsLink = ({venue}: Props): JSX.Element => {
    const mapsBaseUrl = "https://www.google.com/maps?q="

    return (
        <a href={`${mapsBaseUrl}${encodeURIComponent(venue)}`} target="_blank">
          {venue}
        </a>
    )
}
