import playerData from "../assets/players.json"
import statsJson from "../assets/bulls_stats.json"
import type { PlayerData } from "../PlayerCardsContainer"
import type { PlayerMapping } from "../types/player-mapping"

const playerDataByName: { [key: string]: PlayerData } = playerData.reduce(
    (result: { [key: string]: PlayerData }, player) => {
        result[player.name] = player

        return result
    },
    {}
)

const stats = statsJson as PlayerMapping

export interface Player {
    name: string
    positions: string[]
    yearOfBirth?: number | null | undefined
    nickname?: string | undefined
    isCoach?: boolean | undefined
    throws?: string | undefined
    hits?: string | undefined
    number?: number | undefined
    image?: string | undefined
    nationality?: string | undefined
    stats?:
        | {
              [key: string]: {
                  pitching?: {
                      [key: string]: string
                  }
                  batting?: {
                      [key: string]: string
                  }
              }
          }
        | undefined
}

const playerCache: { [key: string]: Player } = {}

export const getPlayer = (name: string): Player | undefined => {
    if (playerCache[name]) {
        return playerCache[name]
    }

    const playerStats = stats[name]
    const playerData = playerDataByName[name]

    if (!playerData) {
        return
    }

    const player: Player = {
        name: playerData.name,
        positions: playerData.positions,
        yearOfBirth: playerData.yearOfBirth,
        nickname: playerData.nickname,
        isCoach: playerData.isCoach,
        throws: playerData.throws,
        hits: playerData.hits,
        number: playerData.number,
        image: playerData.image,
        nationality: playerData.nationality,
        stats: playerStats,
    }

    playerCache[name] = player

    return player
}

export const getAllPlayers = (): Player[] => {
    const names = Object.keys(playerDataByName)
    const players = []

    for (const name of names) {
        const player = getPlayer(name)

        if (player) {
            players.push(player)
        }
    }

    return players
}
