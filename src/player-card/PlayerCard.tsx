import {DOMcreateElement} from "../jsx";
import "../player-card.css"
// @ts-ignore since typescript doesn't support multiple wildcards
import defaultPlayer from "../assets/players/default.png?as=webp&width=220&height=220"

import {CoachCardContent} from "./CoachCardContent"
import {PlayerCardContent} from "./PlayerCardContent"
import {CountryFlag} from "./CountryFlag"
import {loadFiles} from "../util/files"
import {Statistics} from "./Statistics"
import type {Modal} from "../create-modal";
import type {Player} from "../player/players";

const playerImageMapping = loadFiles(
    require.context("../assets/players/?as=webp&width=220&height=220", false, /\.png$/)
)
interface Props {
    player: Player,
    modal: Modal
}

export const PlayerCard = ({player, modal}: Props): JSX.Element => {
    const name = player.name
    const imageName = player.image || "default.png"
    const image = playerImageMapping[`./${imageName}`] || defaultPlayer

    return (
        <div className="hardbulls-player-card">
            <div className="hardbulls-player-card-image-container">
                <img src={image} alt={name} width={220} height={220}/>
            </div>
            {player.isCoach ?
                <CoachCardContent name={name}/> :
                <PlayerCardContent name={name} positions={player.positions} hits={player.hits} throws={player.throws}/>}
            {!player.isCoach && <Statistics name={name} modal={modal}/>}
            <div className="hardbulls-player-card-footer">
                {player.nationality && <CountryFlag code={player.nationality}/>}
                {player.number && <div className="hardbulls-player-card-number">{player.number}</div> }
            </div>
        </div>
    )
}
