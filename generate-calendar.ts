import ical from "ical-generator"
import { readFileSync } from 'fs';
import moment from "moment";

const calendar = ical({name: 'BBL 2023'});


const gameTableFile = readFileSync('./src/game-table/bbl_2023.json');
const gameTable = JSON.parse(gameTableFile.toString());

const dateFormat = 'DD.MM.YYYY HH:SS';

for (const entry of gameTable) {
    if (entry['Heim'] !== 'Hard Bulls' && entry['Gast'] !== 'Hard Bulls') {
        continue;
    }

    if (entry['Datum'].trim() === '') {
        continue;
    }

    const start = moment(`${entry['Datum']} ${entry['Startzeit']}`, dateFormat).toDate();
    const end = (new Date());

    end.setTime(start.getTime() + (2*60*60*1000));

    const location = entry['Spielort'];
    const description = `${entry['Heim']} - ${entry['Gast']}`
    const summary = description;

    calendar.createEvent({
        start,
        end,
        summary,
        description,
        location,
    });

    calendar.saveSync('./dist/bbl_2023.ics')
}
