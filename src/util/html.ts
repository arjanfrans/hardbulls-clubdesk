interface ElementOptions {
    tag?: string
    classList?: string[]
    children?: HTMLElement[] | undefined
    text?: string | undefined
    id?: string
    title?: string | undefined
}

interface LinkOptions {
    href: string
    text?: string
    title?: string | undefined
    children?: HTMLElement[]
    target?: "_blank" | undefined
}

export const link = ({ href, text, children, target, title }: LinkOptions) => {
    const element = createElement({ tag: "a", text, children, title }) as HTMLLinkElement

    element.href = href

    if (target) {
        element.setAttribute("target", target)
    }

    return element
}

export const createElement = ({
    tag = "div",
    classList = [],
    children = [],
    title,
    text,
    id,
}: ElementOptions): HTMLElement => {
    const element = document.createElement(tag)

    if (title) {
        element.title = title
    }

    if (classList?.length) {
        element.className = classList.join(" ")
    }

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
