import { CalculationType } from "./enum/CalculationType"
import type { StatisticProperty } from "./StatisticProperty"

export const BattingProperties: StatisticProperty[] = [
    {
        abbreviation: "BA",
        name: "Batting Average",
        type: CalculationType.AVG,
        wiki: "https://en.wikipedia.org/wiki/Batting_average_(baseball)",
    },
    {
        abbreviation: "G",
        name: "Games Played",
        type: CalculationType.SUM,
        wiki: "https://en.wikipedia.org/wiki/Games_played",
    },
    {
        abbreviation: "PA",
        name: "Plate Appearances",
        type: CalculationType.SUM,
        wiki: "https://en.wikipedia.org/wiki/Plate_appearance",
    },
    {
        abbreviation: "AB",
        name: "At Bats",
        type: CalculationType.SUM,
        wiki: "https://en.wikipedia.org/wiki/At_bat",
    },
    {
        abbreviation: "R",
        name: "Runs",
        type: CalculationType.SUM,
        wiki: "https://en.wikipedia.org/wiki/Run_(baseball)",
    },
    {
        abbreviation: "H",
        name: "Hits",
        type: CalculationType.SUM,
        wiki: "https://en.wikipedia.org/wiki/Hit_(baseball)",
    },
    {
        abbreviation: "2B",
        name: "Doubles",
        type: CalculationType.SUM,
        wiki: "https://en.wikipedia.org/wiki/Double_(baseball)",
    },
    {
        abbreviation: "3B",
        name: "Triples",
        type: CalculationType.SUM,
        wiki: "https://en.wikipedia.org/wiki/Triple_(baseball)",
    },
    {
        abbreviation: "HR",
        name: "Home Runs",
        type: CalculationType.SUM,
        wiki: "https://en.wikipedia.org/wiki/Home_run",
    },
    {
        abbreviation: "RBI",
        name: "Runs Batted In",
        wiki: "https://en.wikipedia.org/wiki/Run_batted_in",
        type: CalculationType.SUM,
    },
    {
        abbreviation: "SH",
        name: "Sacrifice Hits",
        type: CalculationType.SUM,
        wiki: "https://en.wikipedia.org/wiki/Sacrifice_hit",
    },
    {
        abbreviation: "SF",
        name: "Sacrifice Flies",
        type: CalculationType.SUM,
        wiki: "https://en.wikipedia.org/wiki/Sacrifice_fly",
    },
    {
        abbreviation: "HP",
        name: "Hit by Pitches",
        type: CalculationType.SUM,
        wiki: "https://en.wikipedia.org/wiki/Hit_by_pitch",
    },
    {
        abbreviation: "BB",
        name: "Base on Balls",
        type: CalculationType.SUM,
        wiki: "https://en.wikipedia.org/wiki/Base_on_balls",
    },
    {
        abbreviation: "IBB",
        name: "Intentional Base on Balls",
        type: CalculationType.SUM,
        wiki: "https://en.wikipedia.org/wiki/Intentional_base_on_balls",
    },
    {
        abbreviation: "K",
        name: "Strikeout",
        type: CalculationType.SUM,
        wiki: "https://en.wikipedia.org/wiki/Strikeout",
    },
    {
        abbreviation: "SB",
        name: "Stolen Bases",
        wiki: "https://en.wikipedia.org/wiki/Stolen_base",
        type: CalculationType.SUM,
    },
    {
        abbreviation: "CS",
        name: "Caught Stealing",
        type: CalculationType.SUM,
        wiki: "https://en.wikipedia.org/wiki/Caught_stealing",
    },
    {
        abbreviation: "GDP",
        name: "Grounded into Double Plays",
        type: CalculationType.SUM,
        wiki: "https://en.wikipedia.org/wiki/Double_play",
    },
    {
        abbreviation: "SLG",
        name: "Slugging percentage",
        type: CalculationType.AVG,
        wiki: "https://en.wikipedia.org/wiki/Slugging_percentage",
    },
    {
        abbreviation: "OBP",
        name: "On-Base Percentage",
        type: CalculationType.AVG,
        wiki: "https://en.wikipedia.org/wiki/On-base_percentage",
    },
    {
        abbreviation: "OPS",
        name: "On-Base plus Slugging",
        type: CalculationType.AVG,
        wiki: "https://en.wikipedia.org/wiki/On-base_plus_slugging",
    },
]
