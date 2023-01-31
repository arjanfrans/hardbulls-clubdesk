// @ts-ignore since typescript doesn't support multiple wildcards
import diLogo from "./assets/logo_di.png?as=webp&width=100&height=100"
// @ts-ignore since typescript doesn't support multiple wildcards
import hbLogo from "./assets/logo_hb.png?as=webp&width=100&height=100"
// @ts-ignore since typescript doesn't support multiple wildcards
import bbLogo from "./assets/logo_bb.png?as=webp&width=100&height=100"
// @ts-ignore since typescript doesn't support multiple wildcards
import ghLogo from "./assets/logo_gh.png?as=webp&width=100&height=100"
// @ts-ignore since typescript doesn't support multiple wildcards
import ddLogo from "./assets/logo_dd.png?as=webp&width=100&height=100"
// @ts-ignore since typescript doesn't support multiple wildcards
import fcLogo from "./assets/logo_fc.png?as=webp&width=100&height=100"
// @ts-ignore since typescript doesn't support multiple wildcards
import vwLogo from "./assets/logo_vw.png?as=webp&width=100&height=100"
// @ts-ignore since typescript doesn't support multiple wildcards
import vmLogo from "./assets/logo_vm.png?as=webp&width=100&height=100"

export const findTeamLogo = (name: string) => {
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

    const logoMapping: { [key: string]: string } = {
        hb: hbLogo,
        di: diLogo,
        bb: bbLogo,
        gh: ghLogo,
        dd: ddLogo,
        fc: fcLogo,
        vw: vwLogo,
        vm: vmLogo,
    }

    for (const [key, values] of Object.entries(mapping)) {
        if (values.some((value) => name.toLowerCase().includes(value.toLowerCase())) && logoMapping[key]) {
            return logoMapping[key]
        }
    }

    return
}
