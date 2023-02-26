interface ElementOptions {
    tag?: string
    classList?: string[]
    children?: Array<HTMLElement | Element | undefined> | undefined
    text?: string | undefined
    id?: string
    title?: string | undefined
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
