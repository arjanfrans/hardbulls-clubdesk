import './game-card.css'
import {DOMcreateElement} from "../jsx";
import type {CsvEntry} from "../game-plan"
import {dateFormatter, parseDate} from "../date"
import {findTeamLogo} from "../find-team-logo"
import {GoogleMapsLink} from "../GoogleMapsLink"
import {loadFiles} from "../util/files";
import {findField} from "../fields";


const fieldImageMapping = loadFiles(
    require.context("../assets/fields/?as=webp&width=260&height=200", false, /\.(png|jpg)$/)
)

interface Props {
    entry: CsvEntry
}

export const GameCard = ({ entry }: Props): JSX.Element => {
    const nextGameDate = parseDate(`${entry["Datum"]} ${entry["Startzeit"]}`)
    const homeLogo = findTeamLogo(entry["Heim"])
    const awayLogo = findTeamLogo(entry["Gast"])
    const awayClass = entry["Gast"] === "Hard Bulls" ? "hardbulls-game-card-away" : "";
    const venue = entry['Spielort'];

    const field = findField(venue);

    const image = fieldImageMapping[`./${field?.image}`];

    return (
        <div className={`hardbulls-game-card-container ${awayClass}`}>
            <div style={{
                backgroundImage: image && `url(${image})`,
                backgroundSize: 'auto',
                backgroundRepeat: 'no-repeat',
                backdropFilter: 'filter: grayscale(30%)',
                backgroundPosition: 'center'
            }}>
                <div className="hardbulls-game-card-header-container">
                    {
                        homeLogo ? (
                            <img src={homeLogo} title={entry["Heim"]} className="hardbulls-team-logo" width={100} height={100} alt={entry["Heim"]}></img>
                        ) : <span>{entry["Heim"]}</span>
                    }
                    <div style={{fontSize: '32px', marginTop: 'auto', marginBottom: 'auto', marginLeft: '10px', marginRight: '10px'}}>
                        -
                    </div>
                    {
                        awayLogo ? (
                            <img src={awayLogo} title={entry["Gast"]} className="hardbulls-team-logo" width={100} height={100} alt={entry["Gast"]}></img>
                        ) : <span>{entry["Gast"]}</span>
                    }
                </div>
            </div>
            <div className="hardbulls-flex-row">
                {dateFormatter.format(nextGameDate)}
            </div>
            <div className="hardbulls-flex-row">
                <GoogleMapsLink venue={entry['Spielort']}/>
            </div>
        </div>
    )
}
