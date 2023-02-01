import { createElement } from "./util/html"

export interface Modal {
    container: HTMLElement
    content: HTMLElement
    closeButton: HTMLElement

    background: HTMLElement

    openTrigger: HTMLElement
}

export const createModal = (id: string) => {
    const closeButton = createElement({
        tag: "button",
        classList: ["hardbulls-modal-close-button", "hardbulls-modal-close"],
        text: "X",
    })

    const content = createElement({
        tag: "div",
        classList: ["hardbulls-modal-content"],
        children: [closeButton],
    })
    const background = createElement({ tag: "div", classList: ["hardbulls-modal-close", "hardbulls-modal-background"] })

    const container = createElement({
        id,
        tag: "div",
        classList: ["hardbulls-modal-container"],
        children: [background, content],
    })

    const openTrigger = document.querySelector(`[data-modal=${id}]`)

    if (openTrigger) {
        openTrigger.addEventListener("click", function (event) {
            event.preventDefault()

            container.classList.add("hardbulls-modal-open")

            for (const exitTrigger of [closeButton, background]) {
                exitTrigger.addEventListener("click", function (event) {
                    event.preventDefault()
                    container.classList.remove("hardbulls-modal-open")
                })
            }
        })
    }

    return {
        container,
        content,
        background,
        closeButton,
    }
}
