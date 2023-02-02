import { createElement } from "./util/html"

export interface Modal {
    container: HTMLElement
    content: HTMLElement
    closeButton: HTMLElement

    background: HTMLElement
}

export const createModal = (id: string, onOpen: (modal: Modal, openTrigger: HTMLElement) => void): Modal => {
    const closeButton = createElement({
        tag: "button",
        classList: ["hardbulls-modal-close-button", "hardbulls-modal-close"],
        text: "X",
    })

    const content = createElement({
        tag: "div",
        classList: ["hardbulls-modal-content"],
    })
    const contentContainer = createElement({
        tag: "div",
        classList: ["hardbulls-modal-content-container"],
        children: [closeButton, content],
    })

    const background = createElement({ tag: "div", classList: ["hardbulls-modal-close", "hardbulls-modal-background"] })

    const container = createElement({
        id,
        tag: "div",
        classList: ["hardbulls-modal-container"],
        children: [background, contentContainer],
    })

    const openTriggers = document.querySelectorAll(`[data-modal=${id}]`)

    const modal = {
        container,
        content,
        background,
        closeButton,
    }

    for (const openTrigger of openTriggers) {
        openTrigger.addEventListener("click", function (event) {
            event.preventDefault()

            container.classList.add("hardbulls-modal-open")

            onOpen(modal, openTrigger as HTMLElement)

            for (const exitTrigger of [closeButton, background]) {
                exitTrigger.addEventListener("click", function (event) {
                    event.preventDefault()
                    container.classList.remove("hardbulls-modal-open")
                })
            }
        })
    }

    return modal
}
