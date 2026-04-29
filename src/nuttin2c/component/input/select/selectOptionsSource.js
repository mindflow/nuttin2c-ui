import { EventManager, OptionElement } from "nuttin2c-core_v1";

export class SelectOptionsSource {
    
    static EVENT_OPTIONS_CHANGED = "optionsChanged";

    /**
     * @param {Map<String, String>} keyValueOptions 
     */
    constructor(keyValueOptions = new Map()) {

        const optionsArray = [];
        keyValueOptions.forEach((value, key) => {
            optionsArray.push({"label": value, "value": key });
        });

        /** @type {Object} */
        this.options = optionsArray;

        /** @type {EventManager} */
        this.events = new EventManager();
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
        this.events.trigger(SelectOptionsSource.EVENT_OPTIONS_CHANGED, [this.options]);
    }

    refresh() {
        this.events.trigger(SelectOptionsSource.EVENT_OPTIONS_CHANGED, [this.options]);
    }

}