export interface PlayerMapping {
    [key: string]: {
        [key: string]: {
            pitching?: {
                [key: string]: string
            }
            batting?: {
                [key: string]: string
            }
        }
    }
}
