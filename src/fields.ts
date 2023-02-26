import fields from "./assets/fields.json"

export interface Field {
    venue: string
    location: string
    teams: Array<string>
    image: string
}

export const getFields = (): Field[] => {
    return fields as Field[]
}

const fieldCache: { [key: string]: Field } = {}

export const findField = (search: string) => {
    let cachedField = fieldCache[search]

    if (cachedField) {
        return cachedField
    }

    cachedField = getFields().find((field) => {
        if (field.teams.includes(search)) {
            return true
        }

        if (field.location.includes(search) || search.includes(field.location)) {
            return true
        }

        if (field.venue.includes(search) || search.includes(field.venue)) {
            return true
        }

        return false
    })

    return cachedField
}
