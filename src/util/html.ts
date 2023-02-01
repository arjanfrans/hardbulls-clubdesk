interface ElementOptions {
    tag?: string
    classList?: string[]
    children?: HTMLElement[]
    text?: string
    id?: string
}
export const createElement = ({
    tag = "div",
    classList = [],
    children = [],
    text,
    id,
}: ElementOptions): HTMLElement => {
    const element = document.createElement(tag)

    element.className = classList.join(" ")

    if (id) {
        element.id = id
    }

    for (const child of children) {
        element.appendChild(child)
    }

    if (text) {
        element.textContent = text
    }

    return element
}
