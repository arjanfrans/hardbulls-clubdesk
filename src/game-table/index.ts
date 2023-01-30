import csvGamePlan from './bbl_2023.json';
import {createMapsLink} from "../create-maps-link";

export const GameTable = () => {
    const table = document.createElement('table');
    const tableBody = table.appendChild(document.createElement('tbody'));

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
