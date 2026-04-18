import { Component, ComponentBuilder, Css3StylesheetBuilder, EmailValidator, Stylesheet, StylesheetBuilder } from "nuttin2c-core_v1";
import { Logger } from "coreutil_v1";
import { CommonInput } from "../commonInput.js";
import { PrototypeConfig, TypeConfigPack } from "mindi_v1";

const LOG = new Logger("EmailInput");

export class EmailInput extends CommonInput {

    static DEFAULT_LABEL = "Email";

    /**
     * 
     * @param {string} name
     * @param {object} model
     * @param {string} label
     * @param {boolean} mandatory
     */
    constructor(name, model = null, label = EmailInput.DEFAULT_LABEL, mandatory = false) {

        super(EmailInput,
            name,
            model,
            new EmailValidator(mandatory, !mandatory),
            label,
            "Invalid email address");
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
                .transition(
                    ["border-color", "0.15s", null, "ease-in-out"],
                    ["box-shadow", "0.15s", null, "ease-in-out"])
                .margin(null,null,"1rem",null)
                
            .selector(".email-label")
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

    /**
     * 
     * @param {ComponentBuilder} componentBuilder 
     * @return {Component}
     */
    static buildComponent(componentBuilder) {
       componentBuilder
            .root("div", "class=email-input-container")
            .open()
                .node("div", "id=bubbleMessage")
                .node("label", "id=label", "class=email-label hidden")
                .node("input", "id=input", "type=text", "class=email-input-entry")
            .close();
        return componentBuilder.build();
    }

}

TypeConfigPack.instance().addTypeConfig("nuttin2c-ui", PrototypeConfig.unnamed(EmailInput));