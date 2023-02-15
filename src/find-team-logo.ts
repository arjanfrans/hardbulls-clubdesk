import { loadFiles } from "./util/files"

const teamImageMapping = loadFiles(require.context("./assets/teams/?as=webp&width=100&height=100", false, /\.png$/))

export const findTeamLogo = (name: string): string | undefined => {
    const mapping = {
        hb: ["Hard Bulls"],
        di: ["Dornbirn Indians"],
        dd: ["Diving Ducks"],
        vw: ["Vienna Wanderers"],
        bb: ["Blue Bats"],
        vm: ["Vienna Metrostars"],
        gh: ["Grasshoppers"],
        fc: ["Feldkirch Cardinals"],
    }

    for (const [key, values] of Object.entries(mapping)) {
        const filename = `./logo_${key}.png`
        if (values.some((value) => name.toLowerCase().includes(value.toLowerCase())) && teamImageMapping[filename]) {
            return teamImageMapping[filename]
        }
    }

    return
}
