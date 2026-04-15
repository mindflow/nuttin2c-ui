import { InjectionPoint, PrototypeConfig, TypeConfigPack } from "mindi_v1";
import { CanvasStyles,
    Component,
    ComponentBuilder,
    Css3StylesheetBuilder,
    EventManager,
    HTML,
    InlineComponentFactory,
    StylesheetBuilder } from "nuttin2c-core_v1";
import { Button } from "../input/button/button.js";

export class ToolBar {

    constructor() {

        /** @type {InlineComponentFactory} */
        this.componentFactory = InjectionPoint.instance(InlineComponentFactory);

        /** @type {Component} */
        this.component = null;

        /** @type {EventManager} */
        this.eventManager = new EventManager();

		/** @type {Button} */
		this.buttonProvider = InjectionPoint.provider(Button);

        /** @type {Array<Button>} */
        this.buttons = [];
    }

	async postConfig() {
		this.component = this.componentFactory.create(ToolBar);
		CanvasStyles.enableStyle(ToolBar.name);
	}

    /**
     * 
     * @param {String} label 
     * @param {String} type E.g. Button.TYPE_PRIMARY
     * @param {boolean} fill Pushes the next buttons to the other end of the tool bar
     * @returns {Button}
     */
    async addButton(label, type = Button.TYPE_PRIMARY, fill = false) {
        const button = await this.buttonProvider.get([label, type]);

        if (this.buttons.length > 0) {
            /** @type {SimpleElement} */
            const spacerDiv = HTML.custom("div");
            const style = fill ? "tool-bar-fill" : "tool-bar-space";
            spacerDiv.setAttributeValue("class", style);
            this.component.addChild("buttonContainer", spacerDiv);
        }

        /** @type {SimpleElement} */
        const buttonDiv = HTML.custom("div");
        buttonDiv.setAttributeValue("class", "tool-bar-button-container");
        buttonDiv.addChild(button.component);
        
        this.component.addChild("buttonContainer", buttonDiv);

        this.buttons.push(button);

        return button;
    }

    reverseButtonLayout() {
        this.component.get("buttonContainer").setAttributeValue("class", "tool-bar-reversed");
    }

    /**
     * @param {ComponentBuilder} componentBuilder
     * @returns {Component}
     */
    static buildComponent(componentBuilder) {
        return componentBuilder
            .root("div", "class=tool-bar")
            .open()
                .node("div", "id=buttonContainer", "class=tool-bar-container")
            .close()
            .build();
    }

    /**
     * @returns {Stylesheet}
     * @param {StylesheetBuilder} stylesheetBuilder 
     */
    static buildStylesheet(stylesheetBuilder) {
        return Css3StylesheetBuilder.create(stylesheetBuilder)
                
            .selector(".tool-bar")
                .display("flex")
                .flexDirection("row")
                .width("100%")

            .selector(".tool-bar-reversed")
                .display("flex")
                .flexDirection("row-reverse")
                .width("100%")

            .selector(".tool-bar-container")
                .flex("0", "1", "auto")

            .selector(".tool-bar-button-container")
                .flex("0", "1", "auto")

            .selector(".tool-bar-fill")
                .flex("1", "0", "auto")

            .selector(".tool-bar-space")
                .flex("0", "0", "0.5rem")

            .build();
    }
}

TypeConfigPack.instance().addTypeConfig("nuttin2c-ui", PrototypeConfig.unnamed(ToolBar));