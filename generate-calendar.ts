import ical from "ical-generator"
import { readFileSync } from 'fs';
import {parseDate} from "./src/date";
import {getVtimezoneComponent} from '@touch4it/ical-timezones';

const calendar = ical({name: 'BBL 2023'});


const gameTableFile = readFileSync('./src/assets/bbl_2023.json');
const gameTable = JSON.parse(gameTableFile.toString());

function changeTimezone(date: Date, ianatz: string) {
    const invdate = new Date(date.toLocaleString('en-US', {
        timeZone: ianatz
    }));

    const diff = date.getTime() - invdate.getTime();

    return new Date(date.getTime() - diff);

}

for (const entry of gameTable) {
    if (entry['Heim'] !== 'Hard Bulls' && entry['Gast'] !== 'Hard Bulls') {
        continue;
    }

    if (entry['Datum'].trim() === '') {
        continue;
    }

    const start = parseDate(`${entry['Datum']} ${entry['Startzeit']}`);
    const end = (new Date());

    end.setTime(start.getTime() + (2*60*60*1000));

    const location = entry['Spielort'];
    const description = `${entry['Heim']} - ${entry['Gast']}`
    const summary = description;

    calendar.timezone({
        name: 'Europe/Vienna',
        generator: getVtimezoneComponent
    })

    calendar.createEvent({
        start: changeTimezone(start, "UTC"),
        end: changeTimezone(end, "UTC"),
        summary,
        description,
        location,
        timezone: 'Europe/Vienna'
    });

    calendar.saveSync('./dist/bbl_2023.ics')
}
