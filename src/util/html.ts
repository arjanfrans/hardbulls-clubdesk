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
