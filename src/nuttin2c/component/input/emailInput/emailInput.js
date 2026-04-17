import { Component, ComponentBuilder, Css3StylesheetBuilder, EmailValidator, Stylesheet, StylesheetBuilder } from "nuttin2c-core_v1";
import { Logger } from "coreutil_v1";
import { CommonInput } from "../commonInput.js";
import { PrototypeConfig, TypeConfigPack } from "mindi_v1";

const LOG = new Logger("EmailInput");

export class EmailInput extends CommonInput {

    static DEFAULT_PLACEHOLDER = "Email";

    /**
     * 
     * @param {string} name
     * @param {object} model
     * @param {string} placeholder
     * @param {boolean} mandatory
     */
    constructor(name, model = null, placeholder = TextInput.DEFAULT_PLACEHOLDER, mandatory = false) {

        super(EmailInput,
            name,
            model,
            new EmailValidator(mandatory, !mandatory),
            placeholder,
            "emailInput",
            "emailError");
    }

    /**
     * @param {StylesheetBuilder} stylesheetBuilder 
     * @returns {Stylesheet}
     */
    static buildStylesheet(stylesheetBuilder) {
        Css3StylesheetBuilder.create(stylesheetBuilder)
            .selector(".email-input-container")
                .position("relative")
                .padding("0.5rem")

            .selector(".email-input-entry")
                .display("block")
                .width("100%")
                .height("calc(1.5em + 1rem + 2px)")
                .padding("0.7rem", "0.75rem", "0.3rem", "0.75rem")
                .fontSize("1rem")
                .fontWeight("400")
                .lineHeight("1.5")
                .color("#495057")
                .backgroundColor("#fff")
                .backgroundClip("padding-box")
                .border("1px", "solid", "#ced4da")
                .borderRadius("0.25rem")
                .transition(["border-color", "0.15s", null, "ease-in-out"], ["box-shadow", "0.15s", null, "ease-in-out"])
                .margin(null,null,"1rem",null)

            .selector(".email-input-error")
                .width("fit-content")
                .color("#333333")
                .transform("translate(+5px,-5px)")
                .backgroundColor("#FFFFE0")
                .fontWeight("normal")
                .fontSize("14px")
                .borderRadius("8px")
                .position("relative")
                .zIndex("99999998")
                .boxSizing("border-box")
                .boxShadow("0", "1px", "8px", null, "rgba(0,0,0,0.5)")
                .cursor("pointer")

            .selector(".email-input-error-hidden")
                .transition(["max-height", ".3s", ".2s"], ["padding", ".3s", ".2s"], ["opacity", ".2s", "0s"], ["visibility", "0s", ".2s"])
                .opacity("0")
                .padding("0px","0px", null, null)
                .maxHeight("0px")
                .display("block")
                .visibility("hidden")

            .selector(".email-input-error-visible")
                .transition(["max-height", ".3s", "0s"], ["padding", ".2s", "0s"], ["opacity", ".2s", ".2s"])
                .opacity("1")
                .padding("10px", "20px", "10px", "20px")
                .maxHeight("50px")
                .display("block")
                .visibility("visible")
                .margin("10px", null, null, null)

            .selector(".email-input-error i")
                .position("absolute")
                .top("100%")
                .left("30%")
                .margin(null, null, null, "-15px")
                .width("30px")
                .height("15px")
                .overflow("hidden")

            .selector(".email-input-error i::after")
                .content("''")
                .position("absolute")
                .width("15px")
                .height("15px")
                .left("50%")
                .transform("translate(-50%,-50%) rotate(45deg)")
                .backgroundColor("#FFFFE0")
                .boxShadow("0", "1px", "8px", null, "rgba(0,0,0,0.5)")
                
            .selector(".email-label")
                .backgroundColor("#fff")
                .position("absolute")
                .top("-0.1rem")
                .left("0.4rem")
                .margin("0", null, "0.5rem", null)
                .fontSize("0.9rem")
                .fontWeight("bold")
                .color("#8a8a8a");

        return stylesheetBuilder.build();
    }

    /**
     * 
     * @param {ComponentBuilder} componentBuilder 
     * @return {Component}
     */
    static buildComponent(componentBuilder) {
       componentBuilder
            .root("div", "class=email-input-container")
            .open()
                .node("div", "id=emailError", "class=email-input-error email-input-error-hidden")
                .open()
                    .text("Invalid email address")
                    .node("i")
                .close()
                .node("label", "id=label", "class=email-label hidden", "for=emailInput")
                .node("input", "id=emailInput", "type=text", "class=email-input-entry")
            .close();
        return componentBuilder.build();
    }

    showValidationError() { this.component.get(this.errorElementId).setAttributeValue("class", "email-input-error email-input-error-visible"); }
    hideValidationError() { this.component.get(this.errorElementId).setAttributeValue("class", "email-input-error email-input-error-hidden"); }

}

TypeConfigPack.instance().addTypeConfig("nuttin2c-ui", PrototypeConfig.unnamed(EmailInput));