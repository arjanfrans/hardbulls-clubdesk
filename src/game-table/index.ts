import csvGamePlan from './bbl_2023.json';

const findTeamLogo = (name: string) => {
    const mapping = {
        'hb': ['Hard Bulls'],
        'di': ['Dornbirn Indians'],
        'dd': ['Diving Ducks'],
        'vw': ['Vienna Wanderers'],
        'bb': ['Blue Bats'],
        'vm': ['Vienna Metrostars'],
        'tg': ['Grasshoppers'],
    };

    for (const [key, values] of Object.entries(mapping)) {
        if (values.includes(name)) {
            return `team_logo_${key}.png`;
        }
    }

    return;
}

export const GameTable = () => {
    const table = document.createElement('table');
    const tableBody = table.appendChild(document.createElement('tbody'));
    const mapsBaseUrl = 'https://www.google.com/maps?q='

    const createMapsLink = (venue: string): HTMLElement => {
        const link = document.createElement('a')

        link.href = `${mapsBaseUrl}${encodeURIComponent(venue)}`;
        link.target = '_blank';

        link.textContent = venue;

        return link;
    }

    for (const entry of csvGamePlan.filter(entry => entry['Heim'].trim() !== '')) {
        if (entry['Heim'] !== 'Hard Bulls' && entry['Gast'] !== 'Hard Bulls') {
            continue;
        }

        const rowElement = document.createElement('tr');
        const homeColumn = document.createElement('td') as HTMLElement;
        const awayColumn = document.createElement('td') as HTMLElement;
        const dateColumn = document.createElement('td') as HTMLElement;
        const venueColumn = document.createElement('td') as HTMLElement;

        homeColumn.textContent = entry['Heim'];
        awayColumn.textContent = entry['Gast'];
        dateColumn.textContent = `${entry['Datum']} ${entry['Startzeit']}`;

        venueColumn.appendChild(createMapsLink(entry['Spielort']));

        [dateColumn, homeColumn, awayColumn, venueColumn].map((column) => rowElement.appendChild(column));

        tableBody.appendChild(rowElement);
    }

    return table;
}
