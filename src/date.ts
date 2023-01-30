export const parseDate = (date: string) => {
    const datePattern = /^(\d{2}).(\d{2}).(\d{4})\s+(\d{2}):(\d{2})$/
    const parsedDate = datePattern.exec(date)

    if (!parsedDate || parsedDate.length !== 6) {
        throw new Error(`Invalid date format ${date}.`)
    }

    const [, month, day, year, hour, minute] = parsedDate.map((v) => Number.parseInt(v)) as Array<number>

    if (month && day && year) {
        return new Date(year, month - 1, day, hour, minute)
    }

    throw new Error(`Error parsing date ${date}.`)
}
