import {
    CanvasStyles,
    Component,
    InputElementDataBinding,
    EventManager,
    StylesheetBuilder,
    Stylesheet,
    ComponentBuilder,
    InlineComponentFactory
} from "nuttin2c-core_v1";
import { InjectionPoint, PrototypeConfig, TypeConfigPack } from "mindi_v1";
import { Logger } from "coreutil_v1";
import { CommonEvents } from "../../common/commonEvents";
import { ContainerEvent } from "containerbridge_v1";

const LOG = new Logger("ExpandChevron");

export class ExpandChevron {
    
    static EVENT_ENABLED = CommonEvents.ENABLED;
    static EVENT_DISABLED = CommonEvents.DISABLED;
    static EVENT_CHANGED = CommonEvents.CHANGED;

    /**
     * 
     * @param {object} model
     */
    constructor(model = null) {
        
        /** @type {InlineComponentFactory} */
        this.componentFactory = InjectionPoint.instance(InlineComponentFactory);

        /** @type {EventManager} */
        this.events = new EventManager();

        /** @type {Component} */
        this.component = null;

        /** @type {object} */
        this.model = model;

        /** @type {boolean} */
        this.expanded = false;

    }

    /**
     * 
     * @param {StylesheetBuilder} stylesheetBuilder 
     * @returns {Stylesheet}
     */
    static buildStylesheet(stylesheetBuilder) {
       stylesheetBuilder
            .selector(".expand-chevron")
            .open()
                .style("position", "relative")
                .style("display", "inline-block")
                .style("width", "16pt")
                .style("height", "16pt")
            .close()

            .selector(".expand-chevron input")
            .open()
                .style("opacity", "0")
                .style("width", "0")
                .style("height", "0")
            .close()

            .selector(".expand-chevron-icon")
            .open()
                .style("cursor", "pointer")
            .close()

            .selector(".expand-chevron-icon")
            .open()
                .style("transition", ".4s")
                .style("transform", "rotate(0deg) translateX(0)")
            .close()

            .selector(".expand-chevron input:checked + .expand-chevron-icon")
            .open()
                .style("transition", ".4s")
                .style("transform", "rotate(90deg) translateX(0)")
            .close()

            .selector(".expand-chevron input:disabled + .expand-chevron-icon")
            .open()
                .style("opacity", "0.6")
                .style("cursor", "not-allowed")
            .close()

            .selector(".expand-chevron input:disabled:hover + .expand-chevron-icon")
            .open()
                .style("background-color", "#ccc")
            .close();

        return stylesheetBuilder.build();
    }

    /**
     * 
     * @param {ComponentBuilder} conmponentBuilder 
     * @returns {Component}
     */
    static buildComponent(conmponentBuilder) {
        return conmponentBuilder
            .root("label", "class=expand-chevron")
            .open()
                .node("input", "id=checkbox", "type=checkbox")
                .node("i", "class=expand-chevron-icon fas fa-chevron-right")
            .close()
            .build();
    }

    postConfig() {
        this.component = this.componentFactory.create(ExpandChevron);
        CanvasStyles.enableStyle(ExpandChevron.name);

        if (this.model) {
            InputElementDataBinding.link(this.model).to(this.component.get("checkbox"));
        }

        this.component.get("checkbox").listenTo("change", this.clicked, this);
    }

    /**
     * 
     * @param {ContainerEvent} event 
     */
    clicked(event) {
        const oldValue = this.expanded;
        this.expanded = event.target.expanded;

        if (oldValue !== this.expanded) {
            this.events.trigger(ExpandChevron.EVENT_CHANGED, [event, this.expanded]);
        }

        if (this.expanded) {
            this.events.trigger(ExpandChevron.EVENT_ENABLED, [event]);
        } else {
            this.events.trigger(ExpandChevron.EVENT_DISABLED, [event]);
        }
        
    }

    /**
     * Set the toggle state programmatically
     * @param {boolean} expanded 
     */
    toggle(expanded) {
        if (this.expanded === expanded) {
            return; // No change
        }
        this.expanded = expanded;
        if (this.component) {
            this.component.get("checkbox").containerElement.click();
        }
    }

    /**
     * Get the current toggle state
     * @returns {boolean}
     */
    isExpanded() {
        return this.expanded;
    }

}

TypeConfigPack.instance().addTypeConfig("nuttin2c-ui", PrototypeConfig.unnamed(ExpandChevron));