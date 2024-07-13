type scalar = string | number | boolean | null;

interface SyncedElement {
    element: HTMLInputElement | HTMLTextAreaElement | HTMLElement;
    type: "input" | "text" | "state";
}

interface SyncedElements {
    id: string;
    value: scalar;
    source: Element;
    elements: SyncedElement[];
}

type SyncedElementsMap = { [key: string]: SyncedElements };

export class ViewSync {
    syncedElements: SyncedElementsMap = {};

    constructor() {
        const elements = document.querySelectorAll("[data-sync-init]");
        elements.forEach(el => {
            const id = el.getAttribute("data-sync-init");
            const value = el.getAttribute("data-sync-value");
            if (!id) return;

            this.syncedElements[id] = {
                id,
                value: this.#convertValue(value),
                source: el,
                elements: [],
            };

            const inputs = el.querySelectorAll(`[data-sync="${id}"]`);
            const texts = el.querySelectorAll(`[data-sync-text="${id}"]`);
            const states = el.querySelectorAll(`[data-sync-state="${id}"]`);

            inputs.forEach(el => {
                if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
                    this.syncedElements[id].elements.push({
                        element: el,
                        type: "input",
                    });
                }
            });

            texts.forEach(el => {
                if (el instanceof HTMLElement) {
                    this.syncedElements[id].elements.push({
                        element: el,
                        type: "text",
                    });
                }
            });

            states.forEach(el => {
                if (el instanceof HTMLElement) {
                    this.syncedElements[id].elements.push({
                        element: el,
                        type: "state",
                    });
                }
            });

            this.#bindInputEvents(this.syncedElements[id]);
        });
    }

    #bindInputEvents(syncedElements: SyncedElements) {
        syncedElements.elements.filter(el => el.element instanceof HTMLInputElement || el.element instanceof HTMLTextAreaElement).forEach(el => {
            const element = el.element;
            if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
                el.element.addEventListener("input", () => {
                    this.#updateValue(syncedElements, element);
                });
            }
        });
    }

    #updateValue(syncedElements: SyncedElements, element: HTMLInputElement | HTMLTextAreaElement) {
        const value = element.value;
        syncedElements.value = this.#convertValue(value);
        syncedElements.elements.forEach(el => {
            if (el.element !== element) {
                switch (el.type) {
                    case "input":
                        (el.element as HTMLInputElement | HTMLTextAreaElement).value = value;
                        break;
                    case "text":
                        el.element.textContent = value;
                        break;
                    case "state":
                        if (!!syncedElements.value) {
                            el.element.style.removeProperty("display");
                        } else {
                            el.element.style.display = "none";
                        }
                        break;
                }
            }
        });
    }

    #convertValue(value: string|null): scalar {
        switch (value) {
            case "null":
            case null:
                return null;
            case "true":
                return true;
            case "false":
                return false;
            default:
                if (!isNaN(Number(value))) {
                    return Number(value);
                }
                return value;
        }
    }

    static Init(): ViewSync {
        return new ViewSync();
    }
}
