import csvtojson from 'csvtojson';
import * as path from "path";
import fs from 'fs/promises';

// const PitchingProperties = [
//     'Jahr',
//     'Liga',
//     'Team',
//     'Player',
//     'W',
//     'L',
//     'ERA',
//     'G',
//     'GS',
//     'CG',
//     'Sho',
//     'Sv',
//     'IP',
//     'R',
//     'ER',
//     'H',
//     '2B',
//     '3B',
//     'HR',
//     'SH',
//     'SF',
//     'HB',
//     'BB',
//     'IBB',
//     'K',
//     'WP',
//     'Bk',
//     'AB',
//     'BAVG',
// ]
//
// const BattingProperties = [
//     'Jahr',
//     'Liga',
//     'Team',
//     'Player',
//     'BA',
//     'G',
//     'PA',
//     'AB',
//     'R',
//     'H',
//     '2B',
//     '3B',
//     'HR',
//     'RBI',
//     'SH',
//     'SF',
//     'HP',
//     'BB',
//     'IBB',
//     'K',
//     'SB',
//     'CS',
//     'GDP',
//     'Slg',
//     'OBP',
//     'OPS',
// ]

(async () => {
    const years = ['2017', '2018', '2019', '2020', '2021', '2022']
    const players: any = {};

    for (const year of years) {
        const pitchingFile = path.join('data', `bulls_stats_${year}_pitching.csv`);
        const battingFile = path.join('data', `bulls_stats_${year}_batting.csv`);

        const pitchingJson = await csvtojson().fromFile(pitchingFile);

        for (const entry of pitchingJson) {
            const name = entry['Player'];

            if (!players[name]) {
                players[name] = {
                    [year]: {}
                }
            }

            if (!players[name][year]) {
                players[name][year] = {}
            }

            players[name][year].pitching = entry;
        }

        const battingJson = await csvtojson().fromFile(battingFile);

        for (const entry of battingJson) {
            const name = entry['Player'];

            if (!players[name]) {
                players[name] = {
                    [year]: {}
                }
            }

            if (!players[name][year]) {
                players[name][year] = {}
            }

            players[name][year].batting = entry;
        }
    }

    await fs.writeFile('./src/assets/bulls_stats.json', JSON.stringify(players));
})()
