interface ElementOptions {
    tag?: string
    classList?: string[]
    children?: Array<HTMLElement | Element | undefined> | undefined
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

interface ImageOptions {
    src: string
    title?: string | undefined
}

export const link = ({ href, text, children, target, title }: LinkOptions) => {
    const element = createElement({ tag: "a", text, children, title }) as HTMLLinkElement

    element.href = href

    if (target) {
        element.setAttribute("target", target)
    }

    return element
}

export const lineBreak = () => {
    return createElement({ tag: "br" })
}

export const createImage = ({ src, title }: ImageOptions) => {
    const element = createElement({ tag: "img", title }) as HTMLImageElement

    element.src = src

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
        if (child) {
            element.appendChild(child)
        }
    }

    if (text) {
        element.textContent = text
    }

    return element
}

export const replaceElementChildren = (element: HTMLElement, nodes: JSX.Element | Array<JSX.Element>): void => {
    if (!Array.isArray(nodes)) {
        nodes = [nodes]
    }

    // @ts-ignore Typescript doesn't know that it actually is a HTMLElement
    element.replaceChildren(...nodes)
}

export const appendElement = (element: HTMLElement, nodes: JSX.Element | Array<JSX.Element>): void => {
    if (Array.isArray(nodes)) {
        for (const child of nodes) {
            // @ts-ignore Typescript doesn't know that it actually is a HTMLElement
            element.appendChild(child)
        }

        return
    }

    // @ts-ignore Typescript doesn't know that it actually is a HTMLElement
    element.appendChild(nodes)
}
