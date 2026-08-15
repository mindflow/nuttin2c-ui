import { EventManager, OptionElement } from "nuttin2c-core_v1";

export class SelectInputOptionsSource {
    
    static EVENT_OPTIONS_CHANGED = "optionsChanged";

    /**
     * @param {Map<String, String>} keyValueOptions 
     */
    constructor(keyValueOptions = new Map()) {

        const optionsArray = [];
        keyValueOptions.forEach((value, key) => {
            optionsArray.push({"label": value, "value": key });
        });

        /** @type {Array} */
        this.options = optionsArray;

        /** @type {EventManager} */
        this.events = new EventManager();
    }

    size() {
        return this.options.length;
    }

    /**
     * 
     * @param {Map<String, String>} keyValueOptions 
     * @returns 
     */
    update(keyValueOptions) {
        const optionsArray = [];
        keyValueOptions.forEach((value, key) => {
            optionsArray.push({"label": value, "value": key });
        });
        this.options = optionsArray;
        this.events.trigger(SelectInputOptionsSource.EVENT_OPTIONS_CHANGED, [null, this.options]);
    }

    refresh() {
        this.events.trigger(SelectInputOptionsSource.EVENT_OPTIONS_CHANGED, [null, this.options]);
    }

}