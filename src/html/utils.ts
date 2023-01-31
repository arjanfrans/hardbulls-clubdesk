interface ElementOptions {
    tag?: string
    classList?: string[]
    children?: HTMLElement[]
    text?: string
}
export const createElement = ({ tag = "div", classList = [], children = [], text }: ElementOptions): HTMLElement => {
    const element = document.createElement(tag)

    element.className = classList.join(" ")

    for (const child of children) {
        element.appendChild(child)
    }

    if (text) {
        element.textContent = text
    }

    return element
}
