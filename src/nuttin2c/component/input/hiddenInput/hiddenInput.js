import { Logger } from "coreutil_v1";
import { CommonInput } from "../commonInput";
import { Component, ComponentBuilder, Css3StylesheetBuilder, RequiredValidator, Stylesheet, StylesheetBuilder } from "nuttin2c-core_v1";
import { PrototypeConfig, TypeConfigPack } from "mindi_v1";

const LOG = new Logger("HiddenInput");

export class HiddenInput extends CommonInput {

    /**
     * 
     * @param {string} name
     * @param {object} model
     */
    constructor(name, model = null, mandatory = false) {

        super(HiddenInput,
            name,
            model,
            new RequiredValidator(false, mandatory));
    }

    /**
     * 
     * @param {StylesheetBuilder} stylesheetBuilder 
     * @returns {Stylesheet}
     */
    static buildStylesheet(stylesheetBuilder) {
        Css3StylesheetBuilder.create(stylesheetBuilder)
            .selector(".hidden-input-entry");

        return stylesheetBuilder.build();
    }

    /**
     * 
     * @param {ComponentBuilder} componentBuilder 
     * @returns {Component}
     */
    static buildComponent(componentBuilder) {
        return componentBuilder
            .root("input", "id=input", "type=hidden", "class=hidden-input-entry")
            .build();
    }

}

TypeConfigPack.instance().addTypeConfig("nuttin2c-ui", PrototypeConfig.unnamed(HiddenInput));