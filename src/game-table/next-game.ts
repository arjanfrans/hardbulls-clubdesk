import csvGamePlan from './bbl_2023.json';
import moment from "moment/moment";
import {createMapsLink} from "../create-maps-link";
import {findTeamLogo} from "../find-team-logo";

const dateFormat = 'DD.MM.YYYY HH:SS';

export const NextGame = () => {
    const nextGameContainer = document.createElement('div') as HTMLElement;
    const now = new Date();

    let nextGameDate = null;
    let nextGameEntry = null;

    for (const entry of csvGamePlan.filter(entry => entry['Heim'].trim() !== '')) {
        if (entry['Heim'] !== 'Hard Bulls' && entry['Gast'] !== 'Hard Bulls') {
            continue;
        }

        const start = moment(`${entry['Datum']} ${entry['Startzeit']}`, dateFormat).toDate();

        if (start > now && (nextGameDate === null || start < nextGameDate)) {
            nextGameDate = start;
            nextGameEntry = entry;
        }
    }

    if (!nextGameEntry || !nextGameDate) {
        return;
    }

    const headerElement = document.createElement('div') as HTMLElement;

    headerElement.className = 'hardbulls-flex-row';


    const homeTeam = document.createElement('div');
    const awayTeam = document.createElement('div');

    const homeLogo = findTeamLogo(nextGameEntry['Heim']);

    if (homeLogo) {
        const homeTeamLogoImg = document.createElement('img')

        homeTeamLogoImg.src = homeLogo;
        homeTeamLogoImg.title = nextGameEntry['Heim'];
        homeTeamLogoImg.className = 'hardbulls-team-logo';

        homeTeam.appendChild(homeTeamLogoImg)
    }

    const awayLogo = findTeamLogo(nextGameEntry['Gast']);

    if (awayLogo) {
        const awayTeamLogoImg = document.createElement('img')

        awayTeamLogoImg.src = awayLogo;
        awayTeamLogoImg.title = nextGameEntry['Gast'];
        awayTeamLogoImg.className = 'hardbulls-team-logo';

        awayTeam.appendChild(awayTeamLogoImg)
    }

    const placeHolder = document.createElement('div')

    placeHolder.style.fontSize = 'x-large';
    placeHolder.textContent = '-'
    placeHolder.style.marginTop = 'auto';
    placeHolder.style.marginBottom = 'auto';
    placeHolder.style.marginLeft = '10px';
    placeHolder.style.marginRight = '10px';

    headerElement.appendChild(homeTeam);
    headerElement.appendChild(placeHolder);
    headerElement.appendChild(awayTeam);

    const bodyElement = document.createElement('div') as HTMLElement;

    bodyElement.className = 'hardbulls-flex-row';

    bodyElement.textContent = moment(nextGameDate).format('LLL');

    const footerElement = document.createElement('div') as HTMLElement;

    footerElement.className = 'hardbulls-flex-row';

    footerElement.appendChild(createMapsLink(nextGameEntry['Spielort']));

    nextGameContainer.appendChild(headerElement);
    nextGameContainer.appendChild(bodyElement);
    nextGameContainer.appendChild(footerElement);


    return nextGameContainer;
}
