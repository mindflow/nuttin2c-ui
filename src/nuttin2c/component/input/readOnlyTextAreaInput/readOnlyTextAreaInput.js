import { AbstractValidator, BaseElement, CanvasStyles, Component, Css3StylesheetBuilder, EventManager, InlineComponentFactory, InputElementDataBinding, RequiredValidator, SimpleElement, StyleSelectorAccessor } from "nuttin2c-core_v1";
import { CommonEvents } from "../../common/commonEvents.js";
import { InjectionPoint, PrototypeConfig, TypeConfigPack } from "mindi_v1";
import { BubbleMessage } from "../../bubbleMessage/bubbleMessage.js";
import { CommonInput } from "../commonInput.js";
import { Method } from "coreutil_v1";
import { ContainerElement } from "containerbridge_v1";

export class ReadOnlyTextAreaInput {

    static EVENT_CLICKED = CommonEvents.CLICKED;
    static EVENT_ENTERED = CommonEvents.ENTERED;
    static EVENT_KEYUPPED = CommonEvents.KEYUPPED;
    static EVENT_CHANGED = CommonEvents.CHANGED;
    static EVENT_BLURRED = CommonEvents.BLURRED;
    static EVENT_INPUT = CommonEvents.INPUT;

    /**
     * 
     * @param {string} name
     * @param {object} model
     * @param {string} label
     */
    constructor(
        name,
        model = null,
        label = null) {


        /** @type {InlineComponentFactory} */
        this.componentFactory = InjectionPoint.instance(InlineComponentFactory);

        /** @type {Component} */
        this.component = null;

        /** @type {string} */
        this.name = name;

        /** @type {string} */
        this.label = label;

        /** @type {object} */
        this.model = model;

        /** @type {boolean} */
        this.tainted = false;

        /** @type {EventManager} */
        this.events = new EventManager();

        /** @type {InputElementDataBinding} */
        this.dataBinding = null;
    }

    /**
     * @param {StylesheetBuilder} stylesheetBuilder 
     * @returns {Stylesheet}
     */
    static buildStylesheet(stylesheetBuilder) {
       Css3StylesheetBuilder.create(stylesheetBuilder)
            .selector(".read-only-text-area-container")
                .position("relative")
                .padding("0.5rem")

            .selector(".read-only-text-area-entry")
                .display("block")
                .width("100%")
                .padding("0.7rem", "0.75rem", "0.3rem", "0.75rem")
                .fontSize("1rem")
                .fontWeight("400")
                .lineHeight("1.5")
                .color("#495057")
                .backgroundColor("#efefef")
                .backgroundClip("padding-box")
                .border("1px", "solid", "#ced4da")
                .borderRadius("0.25rem")
                .transition(
                    ["border-color", "0.15s", null, "ease-in-out"], 
                    ["box-shadow", "0.15s", null, "ease-in-out"])
                .margin(null,null,"1rem",null)
                
            .selector(".read-only-text-area-label")
                .backgroundColor("#fff")
                .position("absolute")
                .padding("0", "0.25rem", "0", "0.25rem")
                .borderRadius("0.5rem")
                .top("-0.1rem")
                .left("0.4rem")
                .margin("0", null, "0.5rem", null)
                .fontSize("0.9rem")
                .fontWeight("bold")
                .color("#8a8a8a");

        return stylesheetBuilder.build();
    }

    rows(rows) {
        /** @type {BaseElement} */
        const textArea = this.component.get("textArea");
        textArea.setAttributeValue("rows", rows);
    }

    columns(columns) {
        /** @type {BaseElement} */
        const textArea = this.component.get("textArea");
        textArea.setAttributeValue("cols", columns);
    }

    /**
     * 
     * @param {ComponentBuilder} componentBuilder 
     * @returns {Component}
     */
    static buildComponent(componentBuilder) {
        return componentBuilder
            .root("div", "class=read-only-text-area-container")
            .open()
                .node("label", "id=label", "class=read-only-text-area-label hidden")
                .node("textArea", "id=textArea", "readonly=true", "class=read-only-text-area-entry")
            .close()
            .build();
    }

    postConfig() {
        this.component = this.componentFactory.create(ReadOnlyTextAreaInput);

        CanvasStyles.enableStyle(ReadOnlyTextAreaInput.name);

        this.component.get("textArea").setAttributeValue("name", this.name);
        const label = this.component.get("label");
        const textArea = this.component.get("textArea");

        if (this.label && label) {
            label.setAttributeValue("for", textArea.getAttributeValue("id"));
            label.setChild(this.label);
            StyleSelectorAccessor.from(label).disable("hidden");
        }

        if (this.model) {
            this.dataBinding = InputElementDataBinding.link(this.model).to(textArea);
        }

        textArea
            .listenTo("blur", this.blurred, this)
            .listenTo("click", this.clicked, this);
    }
    
    get value() { 
        /** @type {SimpleElement} */
        const textArea = this.component.get("textArea");

        /** @type {ContainerElement} */
        const containerElement = textArea.containerElement;
        return containerElement.value;
    }

    set value(value) {
        /** @type {SimpleElement} */
        const textArea = this.component.get("textArea");

        /** @type {ContainerElement} */
        const containerElement = textArea.containerElement;

        containerElement.value = value;
        if (this.dataBinding) {
            this.dataBinding.push();
        }
    }

    clicked(event) {
        this.events.trigger(CommonInput.EVENT_CLICKED, event);
    }

    blurred(event) {
        if (!this.tainted) {
            return;
        }
        if (!this.validator.isValid()) {
            this.bubbleMessage.show();
            return;
        }
        this.bubbleMessage.hide();
        this.events.trigger(CommonInput.EVENT_BLURRED, event);
    }

    focus() { this.component.get("textArea").focus(); }
    selectAll() { this.component.get("textArea").selectAll(); }
    enable() { this.component.get("textArea").enable(); }
    disable() { this.component.get("textArea").disable(); }
    clear() { this.component.get("textArea").value = ""; }

}

TypeConfigPack.instance().addTypeConfig("nuttin2c-ui", PrototypeConfig.unnamed(ReadOnlyTextAreaInput));