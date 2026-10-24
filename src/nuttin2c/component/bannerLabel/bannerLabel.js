import { CanvasStyles, ComponentBuilder, EventManager, InlineComponentFactory, StyleSelectorAccessor, Stylesheet, StylesheetBuilder } from "nuttin2c-core_v1";
import { InjectionPoint, PrototypeConfig, TypeConfigPack } from "mindi_v1";
import { CustomAppearance } from "../customAppearance.js";
import { BannerLabelMessage } from "./bannerLabelMessage/bannerLabelMessage.js";
import { TimePromise } from "coreutil_v1";

export class BannerLabel {

    static EVENT_HIDDEN = "bannerLabelHidden";
    static EVENT_SHOWN = "bannerLabelShown";

    static LABEL = "banner-label";
    static LABEL_VISIBLE = "banner-label-visible";
    static LABEL_HIDDEN = "banner-label-hidden";

    constructor() {
        /** @type {InlineComponentFactory} */
        this.componentFactory = InjectionPoint.instance(InlineComponentFactory);

        /** @type {Component} */
        this.component = null;

		this.appearance = new CustomAppearance()
			.withSize(CustomAppearance.SIZE_SMALL)
			.withShape(CustomAppearance.SHAPE_ROUND)
			.withSpacing(CustomAppearance.SPACING_ABOVE);

		/** @type {BannerLabelMessage} */
		this.success = InjectionPoint
			.instance(BannerLabelMessage, ["", BannerLabelMessage.TYPE_SUCCESS, this.appearance]);

		/** @type {BannerLabelMessage} */
		this.warning = InjectionPoint
			.instance(BannerLabelMessage, ["", BannerLabelMessage.TYPE_WARNING, this.appearance]);

		/** @type {BannerLabelMessage} */
		this.error = InjectionPoint
			.instance(BannerLabelMessage, ["", BannerLabelMessage.TYPE_ALERT, this.appearance]);

        this.isVisible = false;

        /** @type {EventManager} */
        this.events = new EventManager();
    }

    /**
     * @param {StylesheetBuilder} stylesheetBuilder 
     * @returns {Stylesheet}
     */
    static buildStylesheet(stylesheetBuilder) {
        return stylesheetBuilder
            .selector(".banner-label")
            .open()
                .style("color", "white")
                .style("width", "100%")
                .style("overflow", "hidden")
                .style("position", "relative")
                .style("max-height", "100px")
                .style("transition", "max-height 0.6s")
            .close()

            .selector(".banner-label-hidden")
            .open()
                .style("max-height", "0px")
            .close()

            .build();
    }

    /**
     * 
     * @param {ComponentBuilder} componentBuilder 
     * @returns 
     */
    static buildComponent(componentBuilder) {
        return componentBuilder
            .root("div", "id=bannerLabel", "class=banner-label banner-label-hidden")
            .build();
    }


    async postConfig() {
        this.component = this.componentFactory.create(BannerLabel);
        CanvasStyles.enableStyle(BannerLabel.name);
        this.success.hide();
        this.warning.hide();
        this.error.hide();
        this.component.get("bannerLabel").addChild(this.success.component);
        this.component.get("bannerLabel").addChild(this.warning.component);
        this.component.get("bannerLabel").addChild(this.error.component);
        this.success.events.listenTo(BannerLabelMessage.EVENT_CLOSE_CLICKED, this.hide, this);
        this.warning.events.listenTo(BannerLabelMessage.EVENT_CLOSE_CLICKED, this.hide, this);
        this.error.events.listenTo(BannerLabelMessage.EVENT_CLOSE_CLICKED, this.hide, this);
        this.active = this.success;
    }

    /**
     * 
     * @param {String} header 
     * @param {String} message 
     */
    async showSuccess(header, message) {
        await this.showBanner(this.success, header, message);
    }

    /**
     * 
     * @param {String} header 
     * @param {String} message 
     */
    async showWarning(header, message) {
        await this.showBanner(this.warning, header, message);
    }

    /**
     * 
     * @param {String} header 
     * @param {String} message 
     */
    async showError(header, message) {
        await this.showBanner(this.error, header, message);
    }

    async hide() {
        if (this.active) {
           this.active.delayedHide();
        }

        if (!this.isVisible) {
            // Already hidden
            return;
        }
        StyleSelectorAccessor.from(this.component.get("bannerLabel"))
            .enable(BannerLabel.LABEL)
            .enable(BannerLabel.LABEL_HIDDEN);

        this.events.trigger(BannerLabel.EVENT_HIDDEN);
        this.isVisible = false;
    }

    async reset() {
        if (this.active) {
           this.active.hide();
        }

        if (!this.isVisible) {
            // Already hidden
            return;
        }

        StyleSelectorAccessor.from(this.component.get("bannerLabel"))
            .enable(BannerLabel.LABEL)
            .enable(BannerLabel.LABEL_HIDDEN);

        this.isVisible = false;
    }

    /**
     * @param {BannerLabelMessage} banner
     * @param {String} header
     * @param {String} message
     */
     async showBanner(banner, header, message) {
        if (this.active) {
           this.active.hide();
        }

        await this.events.trigger(BannerLabel.EVENT_SHOWN);

		banner.setMessage(header, message);
        await banner.show();

        StyleSelectorAccessor.from(this.component.get("bannerLabel"))
            .enable(BannerLabel.LABEL)
            .disable(BannerLabel.LABEL_HIDDEN);

        this.isVisible = true;
		this.active = banner;
    }
}

TypeConfigPack.instance().addTypeConfig("nuttin2c-ui", PrototypeConfig.unnamed(BannerLabel));