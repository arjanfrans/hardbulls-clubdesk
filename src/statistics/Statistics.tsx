import {DOMcreateElement} from "../jsx";
import type { Player} from "../player/players";
import type {StatisticProperty} from "../types/StatisticProperty";
import {CalculationType} from "../types/enum/CalculationType";
import {PitchingProperties} from "../types/PitchingProperty";
import {BattingProperties} from "../types/BattingProperties";

const playerContainerCache: { [key: string]: JSX.Element | undefined } = {}

const TableHeader = ({headers}: {headers: StatisticProperty[]}) => {
    return (
        <thead>
            <tr>
                <th>Jahr</th>
                {headers.map(property => (
                    <th>
                        <span title={property.name}>{property.abbreviation}</span>
                    </th>
                ))}
            </tr>
        </thead>
    )
}

const TableRow = ({year, headers, values}: {year: string, headers: StatisticProperty[], values: {[key: string]: string|undefined}}) => {
    return (
        <tr>
            <td><strong>{year}</strong></td>
            {headers.map(header => {
                return (
                    <td>
                        {renderValue(header.type, values[header.abbreviation])}
                    </td>
                )
            })}
        </tr>
    )
}

const renderValue = (type: CalculationType, value: string | undefined): string => {
    if (!value) {
        value = "0"
    }

    if (type === CalculationType.AVG) {
        return Number.parseFloat(value).toFixed(3)
    }

    return Number.parseFloat(value) % 1 === 0 ? value : Number.parseFloat(value).toFixed(2)
}

interface Props {
    player: Player
}

export const Statistics = ({player}: Props): JSX.Element => {
    const name = player.name;
    const cached = playerContainerCache[name];

    if (cached) {
        return cached
    }

    const pitchingRows = [];
    const battingRows = [];

    if (player.stats) {
        for (const [year, {pitching, batting}] of Object.entries(player.stats)) {
            if (pitching) {
                pitchingRows.push(
                    <TableRow year={year} headers={PitchingProperties} values={pitching}/>
                )
            }

            if (batting) {
                battingRows.push(
                    <TableRow year={year} headers={BattingProperties} values={batting}/>
                )
            }
        }
    }

    const battingTableBody = (
        <table>
            <TableHeader headers={BattingProperties}></TableHeader>
            <tbody>
                {...battingRows}
            </tbody>
        </table>
    )

    const pitchingTableBody = (
        <table>
            <TableHeader headers={PitchingProperties}></TableHeader>
            <tbody>
            {...pitchingRows}
            </tbody>
        </table>
    )

    const element = (
        <div>
            <h2>{name}</h2>
            {battingTableBody && (
                <div>
                    <h3>Batting</h3>
                    {battingTableBody}
                </div>
            )}

            {pitchingTableBody && (
                <div>
                <h3>Pitching</h3>
                    {pitchingTableBody}
                </div>
            )}
        </div>
    );

    playerContainerCache[name] = element

    return element;
}
