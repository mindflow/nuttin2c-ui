'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var nuttin2cCore_v1 = require('nuttin2c-core_v1');
var coreutil_v1 = require('coreutil_v1');
var mindi_v1 = require('mindi_v1');
var containerbridge_v1 = require('containerbridge_v1');

/**
 * @description Font color, background color, and border color palettes for various modes.
 */
class ColorPalette {

    static PRIMARY_COLORS =          ["#fff","#007bff","#007bff"];
    static PRIMARY_HOVER_COLORS =    ["#fff","#0069d9","#0062cc"];
    static PRIMARY_DISABLED_COLORS = ["#fff","#5eabfd","#5eabfd"];
    static PRIMARY_ACTIVE_COLORS =   ["#fff","#0062cc","#005cbf"];

    static SECONDARY_COLORS =          ["#fff","#6c757d","#6c757d"];
    static SECONDARY_HOVER_COLORS =    ["#fff","#5a6268","#545b62"];
    static SECONDARY_DISABLED_COLORS = ["#fff","#6c757d","#6c757d"];
    static SECONDARY_ACTIVE_COLORS =   ["#fff","#545b62","#4e555b"];

    static SUCCESS_COLORS =          ["#fff","#28a745","#28a745"];
    static SUCCESS_HOVER_COLORS =    ["#fff","#218838","#1e7e34"];
    static SUCCESS_DISABLED_COLORS = ["#fff","#28a745","#28a745"];
    static SUCCESS_ACTIVE_COLORS =   ["#fff","#1e7e34","#1c7430"];

    static INFO_COLORS =          ["#fff","#17a2b8","#17a2b8"];
    static INFO_HOVER_COLORS =    ["#fff","#138496","#117a8b"];
    static INFO_DISABLED_COLORS = ["#fff","#17a2b8","#17a2b8"];
    static INFO_ACTIVE_COLORS =   ["#fff","#117a8b","#10707f"];

    static WARNING_COLORS =          ["#fff","#ffc107","#ffc107"];
    static WARNING_HOVER_COLORS =    ["#fff","#e0a800","#d39e00"];
    static WARNING_DISABLED_COLORS = ["#fff","#ffc107","#ffc107"];
    static WARNING_ACTIVE_COLORS =   ["#fff","#d39e00","#c69500"];

    static DANGER_COLORS =          ["#fff","#dc3545","#dc3545"];
    static DANGER_HOVER_COLORS =    ["#fff","#c82333","#bd2130"];
    static DANGER_DISABLED_COLORS = ["#fff","#dc3545","#dc3545"];
    static DANGER_ACTIVE_COLORS =   ["#fff","#bd2130","#b21f2d"];

    static LIGHT_COLORS =          ["#212529","#f8f9fa","#f8f9fa"];
    static LIGHT_HOVER_COLORS =    ["#212529","#e2e6ea","#dae0e5"];
    static LIGHT_DISABLED_COLORS = ["#212529","#f8f9fa","#f8f9fa"];
    static LIGHT_ACTIVE_COLORS =   ["#212529","#dae0e5","#d3d9df"];

    static DARK_COLORS =          ["#fff","#343a40","#343a40"];
    static DARK_HOVER_COLORS =    ["#fff","#23272b","#1d2124"];
    static DARK_DISABLED_COLORS = ["#fff","#343a40","#343a40"];
    static DARK_ACTIVE_COLORS =   ["#fff","#1d2124","#171a1d"];
}

class CustomAppearance {

    static SIZE_DEFAUL = "size-default";
    static SIZE_SMALL = "size-small";
    static SIZE_MEDIUM = "size-medium";
    static SIZE_LARGE = "size-large";

    static SHAPE_DEAFULT = "shape-default";
    static SHAPE_ROUND = "shape-round";
    static SHAPE_SQUARE = "shape-square";

    static VISIBILITY_DEAFULT = "visibility-default";
    static VISIBILITY_VISIBLE = "visibility-visible";
    static VISIBILITY_HIDDEN = "visibility-hidden";

    static SPACING_DEFAULT = "spacing-default";
    static SPACING_NONE = "spacing-none";
    static SPACING_ABOVE = "spacing-above";
    static SPACING_BELOW = "spacing-below";
    static SPACING_ABOVE_BELOW = "spacing-above-below";

    constructor() {
        this.size = CustomAppearance.SIZE_DEFAULT;
        this.shape = CustomAppearance.SHAPE_DEAFULT;
        this.spacing = CustomAppearance.SPACING_DEFAULT;
        this.visibility = CustomAppearance.VISIBILITY_DEAFULT;
        this.locked = false;
    }

    withSize(size) {
        this.size = size;
        return this;
    }

    withShape(shape) {
        this.shape = shape;
        return this;
    }

    withSpacing(spacing) {
        this.spacing = spacing;
        return this;
    }

    withVisibility(visibility) {
        this.visibility = visibility;
        return this;
    }

}

class Dependencies {

    constructor() {
        this.componentClass = nuttin2cCore_v1.Component;
    }

}

class BackShadeListeners {

    constructor(existingListeners = null) {
        this.backgroundClickedListener = (existingListeners && existingListeners.getBackgroundClicked) ? existingListeners.getBackgroundClicked() : null;
    }

    /**
     * 
     * @param {Method} backgroundClickedListener 
     */
    withBackgroundClicked(backgroundClickedListener) {
        this.backgroundClickedListener = backgroundClickedListener;
        return this;
    }


    getBackgroundClicked() {
        return this.backgroundClickedListener;
    }

    callBackgroundClicked(event) {
        this.callListener(this.backgroundClickedListener, event);
    }

    /**
     * 
     * @param {Method} listener 
     * @param {ContainerEvent} event 
     */
    callListener(listener, event) {
        if (null != listener) {
            listener.call(event);
        }
    }

}

mindi_v1.TypeConfigPack.instance().addTypeConfig("nuttin2c-ui", mindi_v1.PrototypeConfig.unnamed(BackShadeListeners));

new coreutil_v1.Logger("BackShade");

class BackShade {

    /**
     * @param {BackShadeListeners} backShadeListeners
     */
    constructor(backShadeListeners = new BackShadeListeners()){

        /** @type {InlineComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(nuttin2cCore_v1.InlineComponentFactory);

        /** @type {Component} */
        this.component = null;

        /** @type {BaseElement} */
        this.container = null;

        /** @type {BackShadeListeners} */
        this.backShadeListeners = backShadeListeners;

        /** @type {boolean} */
        this.hidden = true;
	}

	/**
	 * 
     * @param {StylesheetBuilder} stylesheetBuilder
	 * @returns {Stylesheet}
	 */
	static buildStylesheet(stylesheetBuilder) {
		return stylesheetBuilder
			.selector(".back-shade")
            .open()
                .style("opacity", "0")
                .style("position", "fixed")
                .style("top", "0")
                .style("left", "0")
                .style("z-index", "1040")
                .style("width", "100vw")
                .style("height", "100vh")
                .style("background-color", "#000")
            .close()

            .selector(".back-shade.show")
            .open()
                .style("opacity", "0.5")
            .close()

            .selector(".back-shade.fade")
            .open()
                .style("transition", "opacity 0.3s ease-in-out")
                .style("-moz-transition", "opacity 0.3s ease-in-out")
                .style("-webkit-transition", "opacity 0.3s ease-in-out")
            .close()

			.build();
	}

	/**
	 * 
	 * @param {ComponentBuilder} componentBuilder
	 * @returns {Component}
	 */
	static buildComponent(componentBuilder) {
		return componentBuilder
			.root("div", "id=backShade", "style=z-index:3;display:none;", "class=back-shade")
			.build();
	}

    postConfig() {
        this.component = this.componentFactory.create(BackShade);
    }

    hideAfter(milliSeconds) {
        if (this.hidden) {
            return new Promise((resolve, reject) => {resolve();});
        }
        this.hidden = true;
        this.component.get("backShade").setAttributeValue("class", "back-shade fade");
        const hidePromise = coreutil_v1.TimePromise.asPromise(milliSeconds,
            () => {
                this.component.get("backShade").setStyle("display", "none");
            }
        );
        const disableStylePromise = coreutil_v1.TimePromise.asPromise(milliSeconds + 1,
            () => {
                nuttin2cCore_v1.CanvasStyles.disableStyle(BackShade.name, this.component.componentIndex);
            }
        );
        return Promise.all([hidePromise, disableStylePromise]);
    }

    show() {
        if (!this.hidden) {
            return new Promise((resolve, reject) => {resolve();});
        }
        this.hidden = false;
        nuttin2cCore_v1.CanvasStyles.enableStyle(BackShade.name, this.component.componentIndex);
        this.component.get("backShade").setStyle("display", "block");
        return coreutil_v1.TimePromise.asPromise(100,
            () => { 
                this.component.get("backShade").setAttributeValue("class", "back-shade fade show");
            }
        );
    }
    
}

mindi_v1.TypeConfigPack.instance().addTypeConfig("nuttin2c-ui", mindi_v1.PrototypeConfig.unnamed(BackShade));

new coreutil_v1.Logger("Background");

class Background {

    constructor(backgroundImagePath){

		/** @type {InlineComponentFactory} */
		this.componentFactory = mindi_v1.InjectionPoint.instance(nuttin2cCore_v1.InlineComponentFactory);

		/** @type {Component} */
		this.component = null;

		/** @type {string} */
		this.backgroundImagePath = backgroundImagePath;
	}

	/**
	 * @param {StylesheetBuilder} stylesheetBuilder
	 * @returns {Stylesheet}
	 */
	static buildStylesheet(stylesheetBuilder) {
		return stylesheetBuilder
			.selector(".background")
			.open()
				.style("background-color", "rgb(150, 197, 255)")
				.style("background-repeat", "no-repeat")
				.style("background-position-x", "center")
				.style("background-position-y", "center")
				.style("background-attachment", "scroll")
				.style("background-size", "cover")
				.style("font-family", "Source Sans Pro")
				.style("font-weight", "300")
				.style("height", "100%")
			.close()
			.build();
	}

	/**
	 * 
	 * @param {ComponentBuilder} uniqueIdRegistry
	 * @returns {Component}
	 */
	static buildComponent(componentBuilder) {
		return componentBuilder
			.root("div", "id=background", "class=background")
			.build();
	}

	set(key,val) {
		this.component.set(key,val);
	}

	postConfig() {
		this.component = this.componentFactory.create(Background);
		if (this.backgroundImagePath) {
            nuttin2cCore_v1.StyleAccessor.from(this.component.get("background"))
                .set("background-image", "url(\"" + this.backgroundImagePath + "\")");
		}
		nuttin2cCore_v1.CanvasStyles.enableStyle(Background.name);
	}

}

mindi_v1.TypeConfigPack.instance().addTypeConfig("nuttin2c-ui", mindi_v1.PrototypeConfig.unnamed(Background));

class BannerLabelMessage {

    static get EVENT_CLOSE_CLICKED() { return "closeClicked"; }

    static get TYPE_ALERT() { return "type-alert"; }
    static get TYPE_INFO() { return "type-info"; }
    static get TYPE_SUCCESS() { return "type-success"; }
    static get TYPE_WARNING() { return "type-warning"; }

    constructor(message, bannerType = BannerLabelMessage.TYPE_INFO, customAppearance = null) {

        /** @type {InlineComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(nuttin2cCore_v1.InlineComponentFactory);

        /** @type {Component} */
        this.component = null;

        /** @type {String} */
        this.header = null;

        /** @type {String} */
        this.message = message;

        /** @type {string} */
        this.bannerType = bannerType;

        /** @type {CustomAppearance} */
        this.customAppearance = customAppearance;

        /** @type {EventManager} */
        this.eventManager = new nuttin2cCore_v1.EventManager();
    }

    /**
     * 
     * @param {StylesheetBuilder} stylesheetBuilder 
     * @returns 
     */
    static buildStylesheet(stylesheetBuilder) {
        return stylesheetBuilder
            .selector(".banner-label-message")
            .open()
                .style("color", "white")
                .style("width", "100%")
            .close()

            .selector(".banner-label-message-visible")
            .open()
                .style("opacity", "0.8")
                .style("transition", "opacity .5s .1s")
            .close()

            .selector(".banner-label-message-hidden")
            .open()
                .style("opacity", "0")
                .style("transition", "opacity .5s 0s")
            .close()

            .selector(".banner-label-message-close-button")
            .open()
                .style("margin-left", "15pt")
                .style("color", "white")
                .style("font-weight", "bold")
                .style("float", "right")
                .style("font-size", "22pt")
                .style("line-height", "14pt")
                .style("cursor", "pointer")
                .style("transition", "0.3s")
            .close()

            .selector(".banner-label-message-header")
            .open()
                .style("color", "white")
            .close()

            .selector(".banner-label-message-text")
            .open()
                .style("margin-left", "15px")
            .close()

            .selector(".banner-label-message-type-alert")
            .open()
                .style("background-color", "#f44336")
            .close()

            .selector(".banner-label-message-type-success")
            .open()
                .style("background-color", "#4CAF50")
            .close()

            .selector(".banner-label-message-type-info")
            .open()
                .style("background-color", "#2196F3")
            .close()

            .selector(".banner-label-message-type-warning")
            .open()
                .style("background-color", "#ff9800")
            .close()

            .selector(".banner-label-message-size-large")
            .open()
                .style("padding", "18pt")
            .close()

            .selector(".banner-label-message-size-default")
            .open()
                .style("padding", "12pt")
            .close()

            .selector(".banner-label-message-size-small")
            .open()
                .style("padding-left", "10pt")
                .style("padding-right", "10px")
                .style("padding-bottom", "8px")
                .style("padding-top", "8px")
            .close()

            .selector(".banner-label-message-shape-square")
            .open()
                .style("border-radius", "0px")
            .close()

            .selector(".banner-label-message-shape-round")
            .open()
                .style("border-radius", "3px")
            .close()

            .selector(".banner-label-message-spacing-none")
            .open()
                .style("margin", "0pt")
            .close()

            .selector(".banner-label-message-spacing-above")
            .open()
                .style("margin-top", "1rem")
            .close()

            .selector(".banner-label-message-spacing-below")
            .open()
                .style("margin-bottom", "1rem")
            .close()

            .selector(".banner-label-message-spacing-above-below")
            .open()
                .style("margin-top", "1rem")
                .style("margin-bottom", "1rem")
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
            .root("div", "id=bannerLabelMessage", "style=display:none;")
            .open()
                .node("div", "id=bannerLabelMessageContent", "class=banner-label-message banner-label-message-hidden")
                .open()
                    .node("span", "id=bannerLabelMessageCloseButton", "class=banner-label-message-close-button")
                    .open()
                        .text("×")
                    .close()
                    .node("span", "id=bannerLabelMessageHeader", "class=banner-label-message-header")
                    .node("span", "id=bannerLabelMessageText", "class=banner-label-message-text")
                .close()
            .close()
            .build();
    }

    async postConfig() {

        /** @type {Component} */
        this.component = this.componentFactory.create(BannerLabelMessage);
        nuttin2cCore_v1.CanvasStyles.enableStyle(BannerLabelMessage.name);
        nuttin2cCore_v1.StyleSelectorAccessor.from(this.messageContentElement)
            .enable("banner-label-message")
            .enable("banner-label-message-" + this.bannerType);

        if (this.customAppearance && this.customAppearance.shape) {
            nuttin2cCore_v1.StyleSelectorAccessor.from(this.messageContentElement)
                .enable("banner-label-message-" + this.customAppearance.shape);
        }
        if (this.customAppearance && this.customAppearance.size) {
            nuttin2cCore_v1.StyleSelectorAccessor.from(this.messageContentElement)
                .enable("banner-label-message-" + this.customAppearance.size);
        }
        if (this.customAppearance && this.customAppearance.spacing) {
            nuttin2cCore_v1.StyleSelectorAccessor.from(this.messageContentElement)
                .enable("banner-label-message-" + this.customAppearance.spacing);
        }

        this.component.get("bannerLabelMessageCloseButton").listenTo("click", this.closeClicked, this);
    }

    closeClicked(event) {
        this.eventManager.trigger(BannerLabelMessage.EVENT_CLOSE_CLICKED);
    }

    hide() {
        nuttin2cCore_v1.StyleSelectorAccessor.from(this.messageContentElement)
            .disable("banner-label-message-visible")
            .enable("banner-label-message-hidden");

        this.isVisible = false;
        
        coreutil_v1.TimePromise.asPromise(500, () => {
            if (!this.isVisible) {
                nuttin2cCore_v1.StyleAccessor.from(this.component.get("bannerLabelMessage"))
                    .set("display", "none");
            }
        });
    }

    show() {
        nuttin2cCore_v1.StyleAccessor.from(this.component.get("bannerLabelMessage"))
            .set("display", "block");

        coreutil_v1.TimePromise.asPromise(50, () => {
            if (this.isVisible) {
                nuttin2cCore_v1.StyleSelectorAccessor.from(this.messageContentElement)
                    .disable("banner-label-message-hidden")
                    .enable("banner-label-message-visible");
            }
        });
        
        this.isVisible = true;
    }

    get messageContentElement() {
        return this.component.get("bannerLabelMessageContent");
    }

    setMessage(header, message) {
        if (header) {
            this.applyHeader(header);
        }
        if (message) {
            this.applyMessage(message);
        }
    }

    applyHeader(header) {
        this.header = header;
        this.component.get("bannerLabelMessageHeader").setChild(this.header);
    }

    applyMessage(message) {
        this.message = message;
        this.component.get("bannerLabelMessageText").setChild(this.message);
    }

}

mindi_v1.TypeConfigPack.instance().addTypeConfig("nuttin2c-ui", mindi_v1.PrototypeConfig.unnamed(BannerLabelMessage));

class BannerLabel {

    static EVENT_HIDDEN = "bannerLabelHidden";
    static EVENT_SHOWN = "bannerLabelShown";

    constructor() {
        /** @type {InlineComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(nuttin2cCore_v1.InlineComponentFactory);

        /** @type {Component} */
        this.component = null;

		this.appearance = new CustomAppearance()
			.withSize(CustomAppearance.SIZE_SMALL)
			.withShape(CustomAppearance.SHAPE_ROUND)
			.withSpacing(CustomAppearance.SPACING_BELOW);

		/** @type {BannerLabelMessage} */
		this.success = mindi_v1.InjectionPoint
			.instance(BannerLabelMessage, ["", BannerLabelMessage.TYPE_SUCCESS, this.appearance]);

		/** @type {BannerLabelMessage} */
		this.warning = mindi_v1.InjectionPoint
			.instance(BannerLabelMessage, ["", BannerLabelMessage.TYPE_WARNING, this.appearance]);

		/** @type {BannerLabelMessage} */
		this.error = mindi_v1.InjectionPoint
			.instance(BannerLabelMessage, ["", BannerLabelMessage.TYPE_ALERT, this.appearance]);

        this.isVisible = false;

        /** @type {EventManager} */
        this.events = new nuttin2cCore_v1.EventManager();
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
            .close()

            .selector(".banner-label-visible")
            .open()
                .style("max-height", "50px")
                .style("visibility", "visible")
                .style("transition", "max-height .3s, visibility 0s")
            .close()

            .selector(".banner-label-hidden")
            .open()
                .style("max-height", "0px")
                .style("visibility", "hidden")
                .style("transition", "max-height .3s .3s, visibility 0s .3s")
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
        nuttin2cCore_v1.CanvasStyles.enableStyle(BannerLabel.name);
        this.success.hide();
        this.warning.hide();
        this.error.hide();
        this.component.get("bannerLabel").addChild(this.success.component);
        this.component.get("bannerLabel").addChild(this.warning.component);
        this.component.get("bannerLabel").addChild(this.error.component);
        this.success.eventManager.listenTo(BannerLabelMessage.EVENT_CLOSE_CLICKED, this.hide, this);
        this.warning.eventManager.listenTo(BannerLabelMessage.EVENT_CLOSE_CLICKED, this.hide, this);
        this.error.eventManager.listenTo(BannerLabelMessage.EVENT_CLOSE_CLICKED, this.hide, this);
        this.active = this.success;
    }

    /**
     * 
     * @param {String} header 
     * @param {String} message 
     */
    showSuccess(header, message) {
        this.showBanner(this.success, header, message);
    }

    /**
     * 
     * @param {String} header 
     * @param {String} message 
     */
    showWarning(header, message) {
        this.showBanner(this.warning, header, message);
    }

    /**
     * 
     * @param {String} header 
     * @param {String} message 
     */
    showError(header, message) {
        this.showBanner(this.error, header, message);
    }

    /**
     * 
     * @param {String} header 
     * @param {String} message 
     */
    hide() {
        this.reset();
        containerbridge_v1.ContainerAsync.delay(600, () => {
            this.events.trigger(BannerLabel.EVENT_HIDDEN);
        });
    }

    reset() {
		this.component.get("bannerLabel").setAttributeValue("class", "banner-label banner-label-hidden");
        this.active.hide();
        this.isVisible = false;
    }

    /**
     * @param {BannerLabelMessage} banner
     * @param {String} header
     * @param {String} message
     */
     showBanner(banner, header, message) {
        this.reset();
		banner.setMessage(header, message);
        banner.show();
        this.component.get("bannerLabel").setAttributeValue("class", "banner-label banner-label-visible");
        this.isVisible = true;
		this.active = banner;
        containerbridge_v1.ContainerAsync.delay(600, () => {
            this.events.trigger(BannerLabel.EVENT_SHOWN);
        });
    }
}

mindi_v1.TypeConfigPack.instance().addTypeConfig("nuttin2c-ui", mindi_v1.PrototypeConfig.unnamed(BannerLabel));

new coreutil_v1.Logger("BannerMessage");

class BannerMessage {

    static TYPE_ALERT = "type-alert";
    static TYPE_INFO = "type-info";
    static TYPE_SUCCESS = "type-success";
    static TYPE_WARNING = "type-warning";

    /**
     * 
     * @param {string} message 
     * @param {string} bannerType 
     * @param {boolean} closeable 
     * @param {CustomAppearance} customAppearance
     */
    constructor(message, bannerType = BannerMessage.TYPE_INFO, closeable = false, customAppearance = null) {

        /** @type {InlineComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(nuttin2cCore_v1.InlineComponentFactory);

        /** @type {Component} */
        this.component = null;

        /** @type {string} */
        this.message = message;

        /** @type {boolean} */
        this.closeable = closeable;

        /** @type {string} */
        this.bannerType = bannerType;

        /** @type {Method} */
        this.onHideListener = null;

        /** @type {Method} */
        this.onShowListener = null;

        /** @type {CustomAppearance} */
        this.customAppearance = customAppearance;

    }

    /**
     * 
     * @param {StylesheetBuilder} stylesheetBuilder 
     * @returns {Stylesheet}
     */
    static buildStylesheet(stylesheetBuilder) {
        return stylesheetBuilder
            .selector(".banner-message-size-large")
            .open()
                .style("padding", "18pt")
            .close()

            .selector(".banner-message-size-default, .banner-message-size-medium")
            .open()
                .style("padding", "12pt")
            .close()

            .selector(".banner-message-size-small")
            .open()
                .style("padding-left", "10pt")
                .style("padding-right", "10px")
                .style("padding-bottom", "8px")
                .style("padding-top", "8px")
            .close()

            .selector(".banner-message-shape-default, .banner-message-shape-square")
            .open()
                .style("border-radius", "0px")
            .close()

            .selector(".banner-message-shape-round")
            .open()
                .style("border-radius", "3px")
            .close()

            .selector(".banner-message-spacing-default, .banner-message-spacing-none")
            .open()
                .style("margin", "0pt")
            .close()

            .selector(".banner-message-spacing-above")
            .open()
                .style("margin-top", "1rem")
            .close()

            .selector(".banner-message-spacing-below")
            .open()
                .style("margin-bottom", "1rem")
            .close()

            .selector(".banner-message-spacing-above-below")
            .open()
                .style("margin-top", "1rem")
                .style("margin-bottom", "1rem")
            .close()

            .selector(".banner-message")
            .open()
                .style("color", "white")
                .style("width", "100%")
                .style("transition", "opacity 0.5s")
            .close()

            .selector(".banner-message.hide")
            .open()
                .style("opacity", "0")
            .close()

            .selector(".banner-message.show")
            .open()
                .style("opacity", "0.90")
            .close()

            .selector(".banner-message-type-alert")
            .open()
                .style("background-color", "#f44336")
            .close()

            .selector(".banner-message-type-success")
            .open()
                .style("background-color", "#4CAF50")
            .close()

            .selector(".banner-message-type-info")
            .open()
                .style("background-color", "#2196F3")
            .close()

            .selector(".banner-message-type-warning")
            .open()
                .style("background-color", "#ff9800")
            .close()

            .selector(".banner-message-close-button")
            .open()
                .style("margin-left", "15pt")
                .style("color", "white")
                .style("font-weight", "bold")
                .style("float", "right")
                .style("font-size", "22pt")
                .style("line-height", "14pt")
                .style("cursor", "pointer")
                .style("transition", "0.3s")
            .close()

            .selector(".banner-message-close-button:hover")
            .open()
                .style("color", "black")
            .close()

            .selector(".banner-message-message")
            .open()
                .style("margin-left", "15px")
            .close()

            .build();
    }

    /**
     * 
     * @param {ComponentBuilder} componentBuilder 
     * @returns {Component}
     */
    static buildComponent(componentBuilder) {
        return componentBuilder
            .root("div", "id=bannerMessage", "class=banner-message")
            .open()
                .node("span", "id=bannerMessageCloseButton", "class=banner-message-close-button")
                .open()
                    .text("×")
                .close()
                .node("span", "id=bannerMessageHeader", "class=banner-message-header")
                .node("span", "id=bannerMessageMessage", "class=banner-message-message")
            .close()
            .build();
    }

    postConfig() {
        this.component = this.componentFactory.create(BannerMessage);
        nuttin2cCore_v1.CanvasStyles.enableStyle(BannerMessage.name);
        this.component.get("bannerMessageHeader").setChild("Alert");
        this.component.get("bannerMessageMessage").setChild(this.message);
        this.applyClasses("banner-message fade");
        this.component.get("bannerMessageCloseButton").listenTo("click", this.hide, this);
    }

    applyClasses(baseClasses) {
        let classes = baseClasses;
        classes = classes + " banner-message-" + this.bannerType;
        if (this.customAppearance) {
            if (this.customAppearance.shape) {
                classes = classes + " banner-message-" + this.customAppearance.shape;
            }
            if (this.customAppearance.size) {
                classes = classes + " banner-message-" + this.customAppearance.size;
            }
            if (this.customAppearance.spacing) {
                classes = classes + " banner-message-" + this.customAppearance.spacing;
            }
        }
        this.component.get("bannerMessage").setAttributeValue("class",classes);
    }
    
    applyHeader(header) {
        this.header = header;
        this.component.get("bannerMessageHeader").setChild(this.header);
    }

    applyMessage(message) {
        this.message = message;
        this.component.get("bannerMessageMessage").setChild(this.message);
    }

    /**
     * 
     * @param {Method} clickedListener 
     */
    remove() {
        return this.component.remove();
    }

    /**
     * 
     * @param {Method} onHideListener 
     */
    onHide(onHideListener) {
        this.onHideListener = onHideListener;
    }

    /**
     * 
     * @param {Method} onShowListener 
     */
    onShow(onShowListener) {
        this.onShowListener = onShowListener;
    }

    async hide() {
        this.applyClasses("banner-message hide");
        await coreutil_v1.TimePromise.asPromise(500, () => { 
            this.component.get("bannerMessage").setStyle("display","none");
            nuttin2cCore_v1.CanvasStyles.disableStyle(BannerMessage.name, this.component.componentIndex);
        });
        if(this.onHideListener) {
            this.onHideListener.call();
        }
    }

    async show(newHeader = null, newMessage = null) {
        if (newHeader) {
            this.applyHeader(newHeader);
        }
        if (newMessage) {
            this.applyMessage(newMessage);
        }
        nuttin2cCore_v1.CanvasStyles.enableStyle(BannerMessage.name, this.component.componentIndex);
        this.component.get("bannerMessage").setStyle("display","block");
        await coreutil_v1.TimePromise.asPromise(100,() => { 
            this.applyClasses("banner-message show");
        });
        if(this.onShowListener) {
            this.onShowListener.call();
        }
    }

}

mindi_v1.TypeConfigPack.instance().addTypeConfig("nuttin2c-ui", mindi_v1.PrototypeConfig.unnamed(BannerMessage));

new coreutil_v1.Logger("BackgroundVideo");

class BackgroundVideo {

    constructor(videoSrc){

        /** @type {InlineComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(nuttin2cCore_v1.InlineComponentFactory);

		/** @type {Component} */
		this.component = null;

        /** @type {String} */
        this.videoSrc = videoSrc;
	}

	/**
	 * 
     * @param {StylesheetBuilder} stylesheetBuilder
	 * @returns {Stylesheet}
	 */
	static buildStylesheet(stylesheetBuilder) {
		return stylesheetBuilder
			.selector(".background-video")
			.open()
				.style("width", "auto")
				.style("height", "auto")
			.close()

			.selector(".background-video-player")
			.open()
				.style("position", "fixed")
				.style("top", "50%")
				.style("left", "50%")
				.style("min-width", "100%")
				.style("min-height", "100%")
				.style("width", "auto")
				.style("height", "auto")
				.style("transform", "translateX(-50%) translateY(-50%)")
				.style("z-index", "0")
			.close()

			.selector(".background-video-overlay")
			.open()
				.style("position", "absolute")
				.style("min-width", "100%")
				.style("min-height", "100%")
				.style("width", "auto")
				.style("height", "auto")
				.style("background-color", "#1144aa")
				.style("opacity", "0.3")
				.style("z-index", "1")
			.close()
				
			.build();
	}

	/**
	 * 
	 * @param {ComponentBuilder} componentBuilder
	 * @returns {Component}
	 */
	static buildComponent(componentBuilder) {
		return componentBuilder
			.root("div", "id=backgroundVideo", "class=background-video")
			.open()
				.node("div", "class=background-video-overlay")
				.node("video", "id=video", "class=background-video-player",
				        "playsinline=playsinline",
						"autoplay=true",
				        "muted=true", "loop=loop")
				.open()
					.node("source", "id=source", "src=", "type=video/mp4")
				.close()
			.close()
			.build();
	}

	set(key,val) {
		this.component.set(key,val);
	}

	postConfig() {
		this.component = this.componentFactory.create(BackgroundVideo);
		nuttin2cCore_v1.CanvasStyles.enableStyle(BackgroundVideo.name);

        this.component.get("source").setAttributeValue("src", this.videoSrc);
	}

	async playMuted() {
		await containerbridge_v1.ContainerAsync.pause(100);
		/** @type {VideoElement} */
		const video = this.component.get("video");
		video.playMuted();
	}

}

mindi_v1.TypeConfigPack.instance().addTypeConfig("nuttin2c-ui", mindi_v1.PrototypeConfig.unnamed(BackgroundVideo));

new coreutil_v1.Logger("BubbleMessage");

class BubbleMessage {


    /**
     * 
     * @param {String} message 
     * @param {String[]} listItems
     */
    constructor(message, listItems = []) {

        /** @type {InlineComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(nuttin2cCore_v1.InlineComponentFactory);

        /** @type {String} */
        this.message = message;

        /** @type {String[]} */
        this.listItems = listItems;

        /** @type {Component} */
        this.component = null;

    }

    postConfig() {
        this.component = this.componentFactory.create(BubbleMessage);
        nuttin2cCore_v1.CanvasStyles.enableStyle(BubbleMessage.name);

        this.component.get("bubbleMessage").addChild(this.message);

        if (this.listItems.length > 0) {

            /** @type {SimpleElement} */
            const list = nuttin2cCore_v1.HTML.custom("ul");
            list.setAttributeValue("class", "bubble-message-input-value-crieria-list");
            
            for (const listItem of this.listItems) {
                /** @type {SimpleElement} */
                const listEntry = nuttin2cCore_v1.HTML.custom("li");
                listEntry.addChild(listItem);
                list.addChild(listEntry);
            }
            this.component.get("bubbleMessage").addChild(list);

        }

        const i = nuttin2cCore_v1.HTML.custom("i");
        this.component.get("bubbleMessage").addChild(i);
    }

    /**
     * @param {StylesheetBuilder} stylesheetBuilder 
     * @returns {Stylesheet}
     */
    static buildStylesheet(stylesheetBuilder) {
        nuttin2cCore_v1.Css3StylesheetBuilder.create(stylesheetBuilder)

            .selector(".bubble-message")
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

            .selector(".bubble-message-hidden")
                .transition(["max-height", ".3s", ".2s"], ["padding", ".3s", ".2s"], ["opacity", ".2s", "0s"], ["visibility", "0s", ".2s"])
                .opacity("0")
                .padding("0px","0px", null, null)
                .maxHeight("0px")
                .display("block")
                .visibility("hidden")

            .selector(".bubble-message-visible")
                .transition(["max-height", ".3s", "0s"], ["padding", ".2s", "0s"], ["opacity", ".2s", ".2s"])
                .opacity("1")
                .padding("10px", "20px", "10px", "20px")
                .display("block")
                .visibility("visible")
                .margin("10px", null, null, null)

            .selector(".bubble-message i")
                .position("absolute")
                .top("100%")
                .left("30%")
                .margin(null, null, null, "-15px")
                .width("30px")
                .height("15px")
                .overflow("hidden")

            .selector(".bubble-message i::after")
                .content("''")
                .position("absolute")
                .width("15px")
                .height("15px")
                .left("50%")
                .transform("translate(-50%,-50%) rotate(45deg)")
                .backgroundColor("#FFFFE0")
                .boxShadow("0", "1px", "8px", null, "rgba(0,0,0,0.5)")

            .selector(".bubble-message-input-value-crieria-list")
                .margin("0", null, "0", null);

        return stylesheetBuilder.build();
    }

    /**
     * 
     * @param {ComponentBuilder} componentBuilder 
     * @returns {Component}
     */
    static buildComponent(componentBuilder) {
        componentBuilder
            .root("div", "id=bubbleMessage", "class=bubble-message bubble-message-hidden");
        return componentBuilder.build();
    }

    show() { this.component.get("bubbleMessage").setAttributeValue("class", "bubble-message bubble-message-visible"); }
    hide() { this.component.get("bubbleMessage").setAttributeValue("class", "bubble-message bubble-message-hidden"); }
}

mindi_v1.TypeConfigPack.instance().addTypeConfig("nuttin2c-ui", mindi_v1.PrototypeConfig.unnamed(BubbleMessage));

class CommonEvents {

    static HOVERED = "hovered";
    static UNHOVERED = "unhovered";
    static CLICKED = "clicked";
    static DOUBLE_CLICKED = "doubleClicked";

    static ENTERED = "entered";
    static KEYUPPED = "keyUpped";
    static FOCUSED = "focused";
    static BLURRED = "blurred";

    static CHANGED = "changed";
    static ENABLED = "enabled";
    static DISABLED = "disabled";
    static SELECTED = "selected";
    static INPUT = "input";
    static LOADED = "loaded";

    static DRAG_STARTED = "dragStarted";
    static DRAG_ENDED = "dragEnded";
    static DROPPED = "dropped";
    
}

class ColorApplicator {

    /**
     * 
     * @param {StylesheetBuilder} stylesheetBuilder 
     * @param {String} selector 
     * @param {String} fontColor 
     * @param {String} backgroundColor 
     * @param {String} borderColor 
     * @returns 
     */
    static apply(stylesheetBuilder, selector, fontColor, backgroundColor, borderColor) {
        return stylesheetBuilder.selector(selector)
            .open()
                .style("color", fontColor)
                .style("background-color", backgroundColor)
                .style("border-color", borderColor)
            .close();
    }

}

class ElementThemeApplicator {
    /**
     * 
     * @param {StylesheetBuilder} stylesheetBuilder 
     * @param {String} classPrefix
     * @param {String} modeName 
     * @param {String[]} defaultColors 
     * @param {String[]} hoverColors 
     * @param {String[]} disabledColors 
     * @param {String[]} activeColors 
     * @param {String} boxShadowFocus 
     * @param {String} boxShadowActiveFocus 
     * @return {StylesheetBuilder}
     */
    static apply(stylesheetBuilder, classPrefix, modeName,
            defaultColors, hoverColors, disabledColors, activeColors,
            boxShadowFocus, boxShadowActiveFocus) {

        ColorApplicator.apply(stylesheetBuilder, 
            `.${classPrefix}-${modeName}`,
            defaultColors[0], defaultColors[1], defaultColors[2]);

        ColorApplicator.apply(stylesheetBuilder,
            `.${classPrefix}-${modeName}:hover`,
            hoverColors[0], hoverColors[1], hoverColors[2]);

        ColorApplicator.apply(stylesheetBuilder,
            `.${classPrefix}-${modeName}:focus, .${classPrefix}-${modeName}.focus`,
            hoverColors[0], hoverColors[1], hoverColors[2]);

        ColorApplicator.apply(stylesheetBuilder,
            `.${classPrefix}-${modeName}.disabled, .${classPrefix}-${modeName}:disabled`,
            disabledColors[0], disabledColors[1], disabledColors[2]);

        ColorApplicator.apply(stylesheetBuilder,
            `.${classPrefix}-${modeName}:not(:disabled):not(.disabled):active,` +
                `.${classPrefix}-${modeName}:not(:disabled):not(.disabled).active,` +
                `.show > .${classPrefix}-${modeName}.dropdown-toggle`,
            activeColors[0], activeColors[1], activeColors[2]);

        ColorApplicator.apply(stylesheetBuilder,
            `.${classPrefix}-${modeName}:not(:disabled):not(.disabled):active:focus,` +
                `.${classPrefix}-${modeName}:not(:disabled):not(.disabled).active:focus,` +
                `.show > .${classPrefix}-${modeName}.dropdown-toggle:focus`,
            activeColors[0], activeColors[1], activeColors[2]);


        return stylesheetBuilder
            .selector(`.${classPrefix}-${modeName}:not(:disabled):not(.disabled):active:focus,` +
                        `.${classPrefix}-${modeName}:not(:disabled):not(.disabled).active:focus,` +
                        `.show > .${classPrefix}-${modeName}.dropdown-toggle:focus`)
            .open()
                .style("box-shadow", boxShadowActiveFocus)
            .close()

            .selector(`.${classPrefix}-${modeName}:focus,` + 
                        `${classPrefix}-${modeName}.focus`)
            .open()
                .style("box-shadow", boxShadowFocus)
            .close();
    }
}

new coreutil_v1.Logger("DialogBox");

class DialogBox {
    
    static OPTION_BACK_ON_CLOSE = 1;

    /**
     * 
     */
    constructor(defaultOptions = []){

        /** @type {InlineComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(nuttin2cCore_v1.InlineComponentFactory);

		/** @type {Component} */
        this.component = null;
        
        /** @type {BackShade} */
        this.backShade = mindi_v1.InjectionPoint.instance(BackShade, [
            new BackShadeListeners()
                .withBackgroundClicked(new coreutil_v1.Method(this.hide, this))]);

        this.hidden = true;

        this.swallowFocusEscape = false;

        this.owningTrigger = null;

        /** @type {List<string>} */
        this.defaultOptions = new coreutil_v1.List(defaultOptions);

        /** @type {List<string>} */
        this.options = new coreutil_v1.List(defaultOptions);

        /** @type {Function} */
        this.destroyFocusEscapeListener = null;
    }
    
    /**
     * 
     * @param {StylesheetBuilder} stylesheetBuilder 
     * @returns {Stylesheet}
     */
    static buildStylesheet(stylesheetBuilder) {
       return stylesheetBuilder
            .media("@media (max-width: 516px)")
            .open()
                .selector(".dialogbox-overlay")
                .open()
                    .style("position", "fixed")
                    .style("left", "0")
                    .style("width", "100%")
                    .style("height", "100%")
                .close()

                .selector(".dialogbox-frame")
                .open()
                    .style("position", "absolute")
                    .style("margin", "0")
                    .style("width", "100%")
                    .style("height", "100%")
                .close()

                .selector(".dialogbox-content")
                .open()
                    .style("position", "relative")
                    .style("height", "100%")
                .close()

                .selector(".dialogbox-body")
                .open()
                    .style("overflow-y", "visible")
                .close()
            .close()
            .media("@media (min-width: 517px)")
            .open()
                .selector(".dialogbox-overlay")
                .open()
                    .style("position", "fixed")
                    .style("margin-top", "54pt")
                    .style("padding-top", "1.5rem")
                    .style("left", "50%")
                    .style("transform", "translate(-50%,0)")
                    .style("width", "auto")
                    .style("height", "auto")
                .close()

                .selector(".dialogbox-frame")
                .open()
                    .style("position", "relative")
                    .style("width", "auto")
                    .style("height", "auto")
                    .style("margin", "0.5rem")
                    .style("pointer-events", "none")
                .close()

                .selector(".dialogbox-content")
                .open()
                    .style("position", "relative")
                    .style("border", "1px solid rgba(0, 0, 0, 0.2)")
                    .style("border-radius", "0.3rem")
                    .style("height", "auto")
                .close()

                .selector(".dialogbox-body")
                .open()
                    .style("overflow-y", "visible")
                .close()

                .selector(".dialogbox-header")
                .open()
                    .style("border-top-left-radius", "0.3rem")
                    .style("border-top-right-radius", "0.3rem")
                .close()
            .close()
            .media("@media (prefers-reduced-motion: reduce)")
            .open()
                .selector(".dialogbox-overlay.dialogbox-fade .dialogbox-frame")
                .open()
                    .style("transition", "none")
                .close()

                .selector(".dialogbox-fade")
                .open()
                    .style("transition", "none")
                .close()
            .close()
            .selector(".dialogbox-open")
            .open()
                .style("overflow", "hidden")
            .close()

            .selector(".dialogbox-open .dialogbox-overlay")
            .open()
                .style("overflow-x", "hidden")
                .style("overflow-y", "auto")
            .close()

            .selector(".dialogbox-overlay-fade")
            .open()
                .style("transition", "opacity 0.15s linear")
            .close()

            .selector(".dialogbox-overlay-display-block")
            .open()
                .style("display", "block")
            .close()

            .selector(".dialogbox-overlay-display-none")
            .open()
                .style("display", "none")
            .close()

            .selector(".dialogbox-overlay-fade:not(.dialogbox-overlay-show)")
            .open()
                .style("opacity", "0")
            .close()

            .selector(".dialogbox-overlay.dialogbox-overlay-fade .dialogbox-frame")
            .open()
                .style("transition", "-webkit-transform 0.3s ease-out")
                .style("transition", "transform 0.3s ease-out")
                .style("transition", "transform 0.3s ease-out, -webkit-transform 0.3s ease-out")
                .style("-webkit-transform", "translate(0, -50px)")
                .style("transform", "translate(0, -50px)")
            .close()

            .selector(".dialogbox-overlay.dialogbox-overlay-show .dialogbox-frame")
            .open()
                .style("-webkit-transform", "none")
                .style("transform", "none")
            .close()

            .selector(".dialogbox-header .dialogbox-close-button")
            .open()
                .style("padding", "0.7rem 1rem")
                .style("margin", "-0.7rem -1rem -0.7rem auto")
            .close()

            .selector(".dialogbox-title")
            .open()
                .style("margin-bottom", "0")
                .style("line-height", "1.5")
            .close()

            .selector(".dialogbox-body")
            .open()
                .style("position", "relative")
                .style("-ms-flex", "1 1 auto")
                .style("flex", "1 1 auto")
            .close()

            .selector(".dialogbox-footer")
            .open()
                .style("display", "-ms-flexbox")
                .style("display", "flex")
                .style("-ms-flex-align", "center")
                .style("align-items", "center")
                .style("-ms-flex-pack", "end")
                .style("justify-content", "flex-end")
                .style("padding", "1rem")
                .style("border-top", "1px solid #dee2e6")
                .style("border-bottom-right-radius", "0.3rem")
                .style("border-bottom-left-radius", "0.3rem")
            .close()

            .selector(".dialogbox-footer > :not(:first-child)")
            .open()
                .style("margin-left", ".25rem")
            .close()

            .selector(".dialogbox-footer > :not(:last-child)")
            .open()
                .style("margin-right", ".25rem")
            .close()

            .selector(".dialogbox-overlay")
            .open()
                .style("top", "0")
                .style("z-index", "10")
                .style("overflow", "hidden")
                .style("outline", "0")
            .close()

            .selector(".dialogbox-frame")
            .open()
                .style("margin", "0")
            .close()

            .selector(".dialogbox-content")
            .open()
                .style("display", "-ms-flexbox")
                .style("display", "flex")
                .style("-ms-flex-direction", "column")
                .style("flex-direction", "column")
                .style("width", "100%")
                .style("pointer-events", "auto")
                .style("background-color", "#fff")
                .style("background-clip", "padding-box")
            .close()

            .selector(".dialogbox-header")
            .open()
                .style("display", "-ms-flexbox")
                .style("display", "flex")
                .style("background-color", "#999999")
                .style("color", "var(--default-panel-color)")
                .style("-ms-flex-align", "start")
                .style("align-items", "flex-start")
                .style("-ms-flex-pack", "justify")
                .style("justify-content", "space-between")
                .style("padding", "0.7rem 1rem")
                .style("border-bottom", "1px solid #dee2e6")
            .close()

            .selector(".dialogbox-close-button")
            .open()
                .style("float", "right")
                .style("font-size", "1.5rem")
                .style("font-weight", "700")
                .style("line-height", "1")
                .style("color", "#000")
                .style("text-shadow", "0 1px 0 #fff")
                .style("opacity", ".5")
            .close()

            .selector(".dialogbox-close-button:hover")
            .open()
                .style("color", "#000")
                .style("text-decoration", "none")
            .close()

            .selector(".dialogbox-close-button:not(:disabled):not(.disabled):hover, .dialogbox-close-button:not(:disabled):not(.disabled):focus")
            .open()
                .style("opacity", ".75")
            .close()

            .selector("button.dialogbox-close-button")
            .open()
                .style("padding", "0")
                .style("background-color", "transparent")
                .style("border", "0")
                .style("-webkit-appearance", "none")
                .style("-moz-appearance", "none")
                .style("appearance", "none")
            .close()
            
            .build();
    }

    /**
     * 
     * @param {ComponentBuilder} componentBuilder 
     * @returns {Component}
     */
    static buildComponent(componentBuilder) {
       return componentBuilder
            .root("div", "id=dialogBox",
                        "style=z-index:-1")
            .open()
                .node("div", "id=backShadeContainer")
                .node("div", "id=dialogBoxOverlay",
                            "class=dialogbox-overlay dialogbox-overlay-display-block dialogbox-overlay-fade",
                            "tabindex=-1",
                            "role=dialog",
                            "aria-labelledby=dialogLabel",
                            "aria-dialogbox=true")
                    .open()
                        .node("div", "class=dialogbox-frame",
                                    "style=z-index:2",
                                    "role=document")
                            .open()
                                .node("div", "class=dialogbox-content")
                                    .open()
                                        .node("div", "class=dialogbox-header")
                                            .open()
                                                .node("h5", "id=title",
                                                        "class=dialogbox-title")
                                                .open()
                                                    .text("Message")
                                                .close()
                                                .node("button", "id=closeButton",
                                                                "type=button",
                                                                "class=dialogbox-close-button",
                                                                "data-dismiss=dialogbox",
                                                                "aria-label=Close")
                                                    .open()
                                                        .node("i", "class=fa fa-window-close",
                                                                    "aria-hidden=true")
                                                    .close()
                                            .close()
                                        .node("div", "id=dialogBoxContent",
                                                    "class=dialogbox-body")
                                    .close()
                            .close()
                    .close()
            .close()

            .build();
    }

    postConfig() {
        this.component = this.componentFactory.create(DialogBox);
        this.component.set("backShadeContainer", this.backShade.component);
        this.component.get("closeButton").listenTo("click", this.close, this);
    }

    /**
     * 
     * @param {string} text 
     */
    setTitle(text){ this.component.setChild("title", text); }

    /**
     * 
     * @param {Component} component 
     */
    setFooter(component){
        this.component.get("dialogBoxFooter").setStyle("display", "block");
        this.component.setChild("dialogBoxFooter", component);
    }

    /**
     * 
     * @param {Component} component 
     */
    setContent(component){ this.component.setChild("dialogBoxContent",component); }

	set(key,val) { this.component.set(key,val); }
    
    async close() {
        const options = this.options;
        await this.hide();
        if (options.contains(DialogBox.OPTION_BACK_ON_CLOSE)) {
            nuttin2cCore_v1.Navigation.instance().back();
        }
    }

    /**
     * 
     * @param {ContainerEvent} event 
     * @returns 
     */
    hide(event) {
        if (this.destroyFocusEscapeListener) {
            this.destroyFocusEscapeListener();
            this.destroyFocusEscapeListener = null;
        }
        this.options;
        if (this.hidden) {
            return Promise.resolve();
        }
        this.hidden = true;
        this.getDialogBoxOverlay().setAttributeValue("class", "dialogbox-overlay dialogbox-overlay-fade");
        const hideBackShadePromise = this.backShade.hideAfter(300);
        const hidePromise = coreutil_v1.TimePromise.asPromise(200, () => { 
                this.getDialogBoxOverlay().setAttributeValue("class", "dialogbox-overlay dialogbox-overlay-fade dialogbox-overlay-display-none");
            }
        );
        const disableStylePromise = coreutil_v1.TimePromise.asPromise(201, () => {
                this.getDialogBox().remove();
                nuttin2cCore_v1.CanvasStyles.disableStyle(DialogBox.name, this.component.componentIndex);
            }
        );
        this.options = this.defaultOptions;
        return Promise.all([hidePromise, disableStylePromise, hideBackShadePromise]);
    }

    /**
     * 
     * @param {ContainerEvent} event 
     * @param {Array<string>} temporaryOptions
     * @returns 
     */
    show(event, temporaryOptions) {
        if (this.destroyFocusEscapeListener) {
            this.destroyFocusEscapeListener();
            this.destroyFocusEscapeListener = null;
        }
        this.destroyFocusEscapeListener = nuttin2cCore_v1.CanvasRoot.listenToFocusEscape(
            this.component.get("dialogBoxOverlay"), this.close, this, 
        );

        if (temporaryOptions) {
            this.options = new coreutil_v1.List(temporaryOptions);
        }
        nuttin2cCore_v1.CanvasRoot.swallowFocusEscape(500);
        if (!this.hidden) {
            return new Promise((resolve, reject) => {resolve();});
        }
        this.hidden = false;
        nuttin2cCore_v1.CanvasStyles.enableStyle(DialogBox.name, this.component.componentIndex);
        this.backShade.show();
        this.getDialogBoxOverlay().setAttributeValue("class", "dialogbox-overlay dialogbox-overlay-fade dialogbox-overlay-display-block");
        nuttin2cCore_v1.CanvasRoot.mouseDownElement = this.component.get("dialogBoxContent").containerElement;
        return coreutil_v1.TimePromise.asPromise(100,  () => {
                this.getDialogBoxOverlay().setAttributeValue("class", "dialogbox-overlay dialogbox-overlay-fade dialogbox-overlay-display-block dialogbox-overlay-show");
            }
        );
    }

    getDialogBoxOverlay() { return this.component.get("dialogBoxOverlay"); }

    getDialogBox() { return this.component.get("dialogBox"); }

    scrollLock() {
        containerbridge_v1.ContainerElementUtils.scrollLockTo(this.component.get("dialogBoxContent").containerElement, 0, 0, 1000);
    }
}

mindi_v1.TypeConfigPack.instance().addTypeConfig("nuttin2c-ui", mindi_v1.PrototypeConfig.unnamed(DialogBox));

new coreutil_v1.Logger("DropDownPanel");

class DropDownPanel {

    static TYPE_PRIMARY = "drop-down-panel-button-primary";
    static TYPE_SECONDARY = "drop-down-panel-button-secondary";
    static TYPE_SUCCESS = "drop-down-panel-button-success";
    static TYPE_INFO = "drop-down-panel-button-info";
    static TYPE_WARNING = "drop-down-panel-button-warning";
    static TYPE_DANGER = "drop-down-panel-button-danger";
    static TYPE_LIGHT = "drop-down-panel-button-light";
    static TYPE_DARK = "drop-down-panel-button-dark";

    static SIZE_MEDIUM = "drop-down-panel-button-medium";
    static SIZE_LARGE = "drop-down-panel-button-large";

    static ORIENTATION_LEFT = "drop-down-panel-left";
    static ORIENTATION_RIGHT = "drop-down-panel-right";

    static CONTENT_VISIBLE = "drop-down-panel-content-visible";
    static CONTENT_HIDDEN = "drop-down-panel-content-hidden";
    static CONTENT_EXPAND = "drop-down-panel-content-expand";
    static CONTENT_COLLAPSE = "drop-down-panel-content-collapse";
    static CONTENT = "drop-down-panel-content";
    static BUTTON = "drop-down-panel-button";

    /**
     * 
     * @param {string} iconClass
     * @param {string} type
     * @param {string} orientation
     */
    constructor(iconClass, type = DropDownPanel.TYPE_DARK, size = DropDownPanel.SIZE_MEDIUM, orientation = DropDownPanel.ORIENTATION_LEFT) {

        /** @type {InlineComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(nuttin2cCore_v1.InlineComponentFactory);

        /** @type {Component} */
        this.component = null;

        /** @type {string} */
        this.iconClass = iconClass;

        /** @type {string} */
        this.type = type;

        /** @type {string} */
        this.size = size;

        /** @type {string} */
        this.orientation = orientation;

    }

    /**
     * 
     * @param {StylesheetBuilder} stylesheetBuilder 
     * @returns {Stylesheet}
     */
    static buildStylesheet(stylesheetBuilder) {
        stylesheetBuilder
            .media("(prefers-reduced-motion: reduce)")
            .open()
                .selector(".drop-down-panel-button")
                .open()
                    .style("transition", "none")
                .close()
            .close()

            .selector(".drop-down-panel-outline")
            .open()
                .style("display", "inline-block")
                .style("vertical-align", "middle")
            .close()

            .selector(".drop-down-panel-button")
            .open()
                .style("min-width", "35pt")
                .style("display", "inline-block")
                .style("font-weight", "400")
                .style("color", "#212529")
                .style("text-align", "center")
                .style("vertical-align", "middle")
                .style("-webkit-user-select", "none")
                .style("-moz-user-select", "none")
                .style("-ms-user-select", "none")
                .style("user-select", "none")
                .style("background-color", "transparent")
                .style("border", "1px solid transparent")
                .style("padding", "0.375rem 0.75rem")
                .style("line-height", "1.5")
                .style("border-radius", "0.25rem")
                .style("transition", "color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out")
            .close()

            .selector(".drop-down-panel-button-medium")
            .open()
                .style("font-size", "1rem")
            .close()

            .selector(".drop-down-panel-button-large")
            .open()
                .style("font-size", "1.5rem")
            .close()

            .selector(".drop-down-panel-content")
            .open()
                .style("min-width", "150pt")
                .style("max-width", "450pt")
                .style("padding", "8pt 14pt")
                .style("color", "#333333")
                .style("background-color", "var(--default-panel-color)")
                .style("border-radius", "5pt")
                .style("position", "absolute")
                .style("z-index", "99999997")
                .style("box-sizing", "border-box")
                .style("box-shadow", "0 1px 8px rgba(0,0,0,0.5)")
                .style("overflow", "hidden")
            .close()

            .selector(".drop-down-panel-content.drop-down-panel-left")
            .open()
                .style("transform", "translate(0%, 10pt) translate(0%,0px)")
            .close()

            .selector(".drop-down-panel-content.drop-down-panel-right")
            .open()
                .style("transform", "translate(-100%, 10pt) translate(35pt,0px)")
            .close()

            .selector(".drop-down-panel-content-visible")
            .open()
                .style("display","block")
            .close()
                
            .selector(".drop-down-panel-content-hidden")
            .open()
                .style("display","none")
            .close()

            .selector(".drop-down-panel-arrow")
            .open()
                .style("padding", "10px 20px")
                .style("color", "#333333")
                .style("font-weight", "normal")
                .style("position", "absolute")
                .style("z-index", "99999998")
                .style("box-sizing", "border-box")
                .style("display", "none")
                .style("transform", "translate(0%, 50%) translate(0%,-3pt)")
            .close()

            .selector(".drop-down-panel-arrow i")
            .open()
                .style("position", "absolute")
                .style("margin-left", "-15px")
                .style("width", "40px")
                .style("height", "15px")
                .style("overflow", "hidden")
                .style("top", "-20%")
                .style("left", "30%")
            .close()

            .selector(".drop-down-panel-arrow i::after")
            .open()
                .style("content", "''")
                .style("position", "absolute")
                .style("width", "18px")
                .style("height", "15px")
                .style("background-color", "var(--default-panel-color)")
                .style("box-shadow", "0 1px 8px rgba(0,0,0,0.5)")
                .style("left", "30%")
                .style("transform", "translate(50%,50%) rotate(45deg)")
            .close()

            .selector(".drop-down-panel-button:hover")
            .open()
                .style("color", "#212529")
                .style("text-decoration", "none")
            .close()

            .selector(".drop-down-panel-button:focus," +
                        ".drop-down-panel-button.focus")
            .open()
                .style("outline", "0")
                .style("box-shadow", "0 0 0 0.2rem rgba(0, 123, 255, 0.25)")
            .close()

            .selector(".drop-down-panel-button.disabled,"+ 
                        ".drop-down-panel-button:disabled")
            .open()
                .style("opacity", "0.65")
            .close();

        ElementThemeApplicator.apply(stylesheetBuilder, "drop-down-panel-button", "primary",
            ColorPalette.PRIMARY_COLORS,
            ColorPalette.PRIMARY_HOVER_COLORS,
            ColorPalette.PRIMARY_DISABLED_COLORS,
            ColorPalette.PRIMARY_ACTIVE_COLORS,
            "0 0 0 0.2rem rgba(130, 138, 145, 0.5)", // boxShadowFocus
            "0 0 0 0.2rem rgba(130, 138, 145, 0.5)"); // boxShadowActiveFocus


        ElementThemeApplicator.apply(stylesheetBuilder, "drop-down-panel-button", "secondary",
            ColorPalette.SECONDARY_COLORS,
            ColorPalette.SECONDARY_HOVER_COLORS,
            ColorPalette.SECONDARY_DISABLED_COLORS,
            ColorPalette.SECONDARY_ACTIVE_COLORS,
            "0 0 0 0.2rem rgba(130, 138, 145, 0.5)", // boxShadowFocus
            "0 0 0 0.2rem rgba(130, 138, 145, 0.5)"); // boxShadowActiveFocus
        
        ElementThemeApplicator.apply(stylesheetBuilder, "drop-down-panel-button", "success",
            ColorPalette.SUCCESS_COLORS,
            ColorPalette.SUCCESS_HOVER_COLORS,
            ColorPalette.SUCCESS_DISABLED_COLORS,
            ColorPalette.SUCCESS_ACTIVE_COLORS,
            "0 0 0 0.2rem rgba(72, 180, 97, 0.5)", // boxShadowFocus
            "0 0 0 0.2rem rgba(72, 180, 97, 0.5)"); // boxShadowActiveFocus

        ElementThemeApplicator.apply(stylesheetBuilder, "drop-down-panel-button", "info",
            ColorPalette.INFO_COLORS,
            ColorPalette.INFO_HOVER_COLORS,
            ColorPalette.INFO_DISABLED_COLORS,
            ColorPalette.INFO_ACTIVE_COLORS,
            "0 0 0 0.2rem rgba(58, 176, 195, 0.5)", // boxShadowFocus
            "0 0 0 0.2rem rgba(58, 176, 195, 0.5)"); // boxShadowActiveFocus

        ElementThemeApplicator.apply(stylesheetBuilder, "drop-down-panel-button", "warning",
            ColorPalette.WARNING_COLORS,
            ColorPalette.WARNING_HOVER_COLORS,
            ColorPalette.WARNING_DISABLED_COLORS,
            ColorPalette.WARNING_ACTIVE_COLORS,
            "0 0 0 0.2rem rgba(222, 170, 12, 0.5)", // boxShadowFocus
            "0 0 0 0.2rem rgba(222, 170, 12, 0.5)"); // boxShadowActiveFocus

        ElementThemeApplicator.apply(stylesheetBuilder, "drop-down-panel-button", "danger",
            ColorPalette.DANGER_COLORS,
            ColorPalette.DANGER_HOVER_COLORS,
            ColorPalette.DANGER_DISABLED_COLORS,
            ColorPalette.DANGER_ACTIVE_COLORS,
            "0 0 0 0.2rem rgba(225, 83, 97, 0.5)", // boxShadowFocus
            "0 0 0 0.2rem rgba(225, 83, 97, 0.5)"); // boxShadowActiveFocus

        ElementThemeApplicator.apply(stylesheetBuilder, "drop-down-panel-button", "light",
            ColorPalette.LIGHT_COLORS,
            ColorPalette.LIGHT_HOVER_COLORS,
            ColorPalette.LIGHT_DISABLED_COLORS,
            ColorPalette.LIGHT_ACTIVE_COLORS,
            "0 0 0 0.2rem rgba(216, 217, 219, 0.5)", // boxShadowFocus
            "0 0 0 0.2rem rgba(216, 217, 219, 0.5)"); // boxShadowActiveFocus

        ElementThemeApplicator.apply(stylesheetBuilder, "drop-down-panel-button", "dark",
            ColorPalette.DARK_COLORS,
            ColorPalette.DARK_HOVER_COLORS,
            ColorPalette.DARK_DISABLED_COLORS,
            ColorPalette.DARK_ACTIVE_COLORS,
            "0 0 0 0.2rem rgba(82, 88, 93, 0.5)", // boxShadowFocus
            "0 0 0 0.2rem rgba(82, 88, 93, 0.5)"); // boxShadowActiveFocus

        return stylesheetBuilder.build();
    }

    /**
     * 
     * @param {ComponentBuilder} componentBuilder 
     * @returns {Component}
     */
    static buildComponent(componentBuilder) {
       return componentBuilder
            .root("div", "id=dropDownPanelRoot", "class=drop-down-panel-outline")
            .open()
                .node("button", "id=button", "class=drop-down-panel-button")
                .node("div", "id=arrow", "class=drop-down-panel-arrow")
                .open()
                    .node("i")
                .close()
                .node("div", "id=content", "class=drop-down-panel-content", "tabindex=0")
            .close()

            .build();
    }

    postConfig() {
        this.component = this.componentFactory.create(DropDownPanel);
        nuttin2cCore_v1.CanvasStyles.enableStyle(DropDownPanel.name);
        this.component.get("button").setChild(nuttin2cCore_v1.HTML.i("", this.iconClass));

        nuttin2cCore_v1.StyleSelectorAccessor.from(this.component.get("button"))
            .enable(DropDownPanel.BUTTON)
            .enable(this.type);

        nuttin2cCore_v1.StyleSelectorAccessor.from(this.component.get("content"))
            .enable(DropDownPanel.CONTENT)
            .disable(DropDownPanel.CONTENT_VISIBLE)
            .enable(DropDownPanel.CONTENT_HIDDEN)
            .enable(this.size)
            .enable(this.orientation);

        this.component.get("button").listenTo("click", this.clicked, this);
        nuttin2cCore_v1.CanvasRoot.listenToFocusEscape(this.component.get("dropDownPanelRoot"), this.hide, this);
    }

    /**
     * 
     * @param {Component} dropDownPanelContent 
     */
    setPanelContent(dropDownPanelContent) {
        this.component.get("content").setChild(dropDownPanelContent.component);
    }
    /**
     * 
     * @param {ContainerEvent} event 
     */
    clicked(event) {
        this.toggleContent();
    }

    toggleContent() {
        if (!nuttin2cCore_v1.StyleAccessor.from(this.component.get("arrow")).is("display","block")) {
            this.show();
        } else {
            this.hide();
        }
    }

    show() {
        nuttin2cCore_v1.StyleSelectorAccessor.from(this.component.get("content"))
            .disable(DropDownPanel.CONTENT_HIDDEN)
            .enable(DropDownPanel.CONTENT_VISIBLE);
        nuttin2cCore_v1.StyleAccessor.from(this.component.get("arrow"))
            .set("display", "block");
        this.component.get("content").containerElement.focus();
    }

    hide() {
        nuttin2cCore_v1.StyleSelectorAccessor.from(this.component.get("content"))
            .disable(DropDownPanel.CONTENT_VISIBLE)
            .enable(DropDownPanel.CONTENT_HIDDEN);
        this.component.get("arrow").setStyle("display", "none");
    }

    disable() {
        this.component.get("button").setAttributeValue("disabled", "true");
    }

    enable() {
        this.component.get("button").removeAttribute("disabled");
    }
}

mindi_v1.TypeConfigPack.instance().addTypeConfig("nuttin2c-ui", mindi_v1.PrototypeConfig.unnamed(DropDownPanel));

new coreutil_v1.Logger("FillPanel");

class FillPanel {


    /**
     * 
     */
    constructor() {

        /** @type {InlineComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(nuttin2cCore_v1.InlineComponentFactory);

        /** @type {Component} */
        this.component = null;

    }

    setContent(component) {
        this.component.setChild("content", component);
    }

    /**
     * 
     * @param {ComponentBuilder} componentBuilder 
     * @returns {Component}
     */
    static buildComponent(componentBuilder) {
        return componentBuilder
            .root("div", "id=content", "class=cntr cntr-rows cntr-grow-only width-full")
            .build();
    }

    postConfig() {
        this.component = this.componentFactory.create(FillPanel);
    }

}

mindi_v1.TypeConfigPack.instance().addTypeConfig("nuttin2c-ui", mindi_v1.PrototypeConfig.unnamed(FillPanel));

new coreutil_v1.Logger("CommonInput");

class CommonInput {

    static EVENT_CLICKED = CommonEvents.CLICKED;
    static EVENT_ENTERED = CommonEvents.ENTERED;
    static EVENT_KEYUPPED = CommonEvents.KEYUPPED;
    static EVENT_CHANGED = CommonEvents.CHANGED;
    static EVENT_BLURRED = CommonEvents.BLURRED;

    /**
     * 
     * @param {Function} componentClass
     * @param {string} name
     * @param {object} model
     * @param {AbstractValidator} validator
     * @param {string} placeholder
     * @param {string} inputElementId
     * @param {string} errorElementId
     */
    constructor(componentClass,
        name,
        model = null,
        validator = null, 
        label = null,
        errorMessage = "Invalid value",
        errorMessageListItems = []) {


        /** @type {InlineComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(nuttin2cCore_v1.InlineComponentFactory);

        /** @type {Component} */
        this.component = null;

        /** @type {AbstractValidator} */
        this.validator = validator;

        /** @type {Function} */
        this.componentClass = componentClass;

        /** @type {string} */
        this.name = name;

        /** @type {string} */
        this.label = label;

        /** @type {object} */
        this.model = model;

        /** @type {boolean} */
        this.tainted = false;

        /** @type {EventManager} */
        this.eventManager = new nuttin2cCore_v1.EventManager();

        /** @type {InputElementDataBinding} */
        this.dataBinding = null;

        /** @type {BubbleMessage} */
        this.bubbleMessage = mindi_v1.InjectionPoint.instance(BubbleMessage, [errorMessage, errorMessageListItems]);
    }

    postConfig() {
        this.component = this.componentFactory.create(this.componentClass);

        nuttin2cCore_v1.CanvasStyles.enableStyle(this.componentClass.name, this.component.componentIndex);

        this.bubbleMessage.hide();

        this.component.get("input").setAttributeValue("name", this.name);
        if (this.component.get("bubbleMessage")) {
            this.component.set("bubbleMessage", this.bubbleMessage.component);
        }

        const label = this.component.get("label");
        const input = this.component.get("input");

        if (this.label && label) {
            label.setAttributeValue("for", input.getAttributeValue("id"));
            label.setChild(this.label);
            nuttin2cCore_v1.StyleSelectorAccessor.from(label).disable("hidden");
        }

        if (this.validator) {
            this.validator.withValidListener(new coreutil_v1.Method(this.bubbleMessage.hide, this.bubbleMessage));
        }

        if(this.model) {
            this.dataBinding = nuttin2cCore_v1.InputElementDataBinding.link(this.model, this.validator).to(input);
        }

        input
            .listenTo("keyup", this.keyupped, this)
            .listenTo("change", this.changed, this)
            .listenTo("blur", this.blurred, this)
            .listenTo("click", this.clicked, this)
            .listenTo("keyup", (event) => {
                if (event.isKeyCode(13)) {
                    this.entered(event);
                }
            }, this);

        if (this.component.get("bubbleMessage")) {
            this.component.get("bubbleMessage").listenTo("click", this.errorClicked, this);
        }
    }

    get events() { return this.eventManager; }

    get value() { 
        /** @type {HTMLInputElement} */
        const input = this.component.get("input");
        return input.value;
    }

    set value(value) {
        /** @type {HTMLInputElement} */
        const input = this.component.get("input");
        input.value = value;
        if (this.dataBinding) {
            this.dataBinding.push();
        }
    }

    /**
     * 
     * @param {ContainerEvent} event 
     */
    keyupped(event) {
        if (!event.isKeyCode(13) && !event.isKeyCode(16) && !event.isKeyCode(9)) {
            this.tainted = true;
        }
        if ("" === event.targetValue) {
            this.tainted = false;
        }
        this.events.trigger(CommonInput.EVENT_KEYUPPED, event);
    }

    /**
     * 
     * @param {ContainerEvent} event 
     */
    changed(event) {
        this.tainted = true;
        if ("" === event.targetValue) {
            this.tainted = false;
        }
        this.events.trigger(CommonInput.EVENT_CHANGED, event);
    }

    clicked(event) {
        this.events.trigger(CommonInput.EVENT_CLICKED, event);
    }

    entered(event) {
        if (!this.validator.isValid()) {
            this.bubbleMessage.show();
            this.selectAll();
            return;
        }
        this.events.trigger(CommonInput.EVENT_ENTERED, event);
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

    errorClicked(event) {
        this.bubbleMessage.hide();
    }

    focus() { this.component.get("input").focus(); }
    selectAll() { this.component.get("input").selectAll(); }
    enable() { this.component.get("input").enable(); }
    disable() { this.component.get("input").disable(); }
    clear() { this.component.get("input").value = ""; this.tainted = false; this.bubbleMessage.hide(); }

}

new coreutil_v1.Logger("LinkPanel");

class LinkPanel {

    static EVENT_CLICKED = CommonEvents.CLICKED;

    static SIZE_SMALL = "link-panel-small";
    static SIZE_MEDIUM = "link-panel-medium";
    static SIZE_LARGE = "link-panel-large";

    static ORIENTATION_FLAT = "link-panel-flat";
    static ORIENTATION_STACKED = "link-panel-stacked";

    static THEME_DARK = "link-panel-dark";
    static THEME_LIGHT = "link-panel-light";
    static THEME_DANGER = "link-panel-danger";
    static THEME_INFO = "link-panel-info";
    static THEME_SUCCESS = "link-panel-success";

    /**
     * 
     * @param {String} label
     * @param {String} icon
     */
    constructor(label, icon, theme = LinkPanel.THEME_DARK, orientation = LinkPanel.ORIENTATION_FLAT, size = LinkPanel.SIZE_SMALL) {

        /** @type {InlineComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(nuttin2cCore_v1.InlineComponentFactory);

        /** @type {Component} */
        this.component = null;

        /** @type {String} */
        this.label = label;

        /** @type {String} */
        this.icon = icon;

        /** @type {String} */
        this.orientation = orientation;

        /** @type {String} */
        this.size = size;

        /** @type {String} */
        this.theme = theme;

        /** @type {EventManager<LinkPanel>} */
        this.eventManager = new nuttin2cCore_v1.EventManager();
    }

    /**
     * 
     * @param {StylesheetBuilder} stylesheetBuilder 
     * @returns {Stylesheet}
     */
    static buildStylesheet(stylesheetBuilder) {
        return stylesheetBuilder
            .selector(".link-panel")
            .open()
                .style("display", "flex")
                .style("align-items", "stretch")
                .style("margin", "2pt")
                .style("border-radius", "5pt")
                .style("cursor", "pointer")
                .style("padding", "0.75rem 0.75rem")
                .style("user-select", "none")
            .close()

            .selector(".link-panel-flat")
            .open()
                .style("flex-direction", "row")
            .close()

            .selector(".link-panel-flat > .link-panel-icon")
            .open()
                .style("width", "2rem")
            .close()

            .selector(".link-panel-stacked")
            .open()
                .style("flex-direction", "column")
            .close()

            .selector(".link-panel-small")
            .open()
                .style("font-size", "1rem")
            .close()

            .selector(".link-panel-medium")
            .open()
                .style("font-size", "1.2rem")
            .close()

            .selector(".link-panel-large")
            .open()
                .style("font-size", "1.5rem")
            .close()

            .selector(".link-panel-dark")
            .open()
                .style("color", "#212529")
            .close()

            .selector(".link-panel-dark:hover")
            .open()
                .style("background-color", "#bfbfbf")
            .close()

            .selector(".link-panel-light")
            .open()
                .style("color", "#ffffff")
            .close()

            .selector(".link-panel-light:hover")
            .open()
                .style("background-color", "#8f8f8f")
            .close()

            .selector(".link-panel-danger")
            .open()
                .style("color", "#ff0000")
            .close()

            .selector(".link-panel-danger:hover")
            .open()
                .style("background-color", "#bfbfbf")
            .close()

            .selector(".link-panel-info")
            .open()
                .style("color", "#0000ff")
            .close()

            .selector(".link-panel-info:hover")
            .open()
                .style("background-color", "#bfbfbf")
            .close()

            .selector(".link-panel-success")
            .open()
                .style("color", "#00ff00")
            .close()

            .selector(".link-panel-success:hover")
            .open()
                .style("background-color", "#ffffff")
            .close()

            .selector(".link-panel-icon")
            .open()
                .style("text-align", "center")
                .style("vertical-align", "middle")
                .style("user-select", "none")
            .close()

            .selector(".link-panel-label")
            .open()
                .style("font-weight", "400")
                .style("text-align", "center")
                .style("vertical-align", "middle")
                .style("padding-left", "5pt")
                .style("padding-right", "5pt")
                .style("user-select", "none")
                .style("transition", "color 0.15s ease-in-out, " +
                    "background-color 0.15s ease-in-out, " +
                    "border-color 0.15s ease-in-out, " +
                    "box-shadow 0.15s ease-in-out")
            .close()

            .build();

    }

    /**
     * 
     * @param {ComponentBuilder} componentBuilder 
     * @returns {Component}
     */
    static buildComponent(componentBuilder) {
        return componentBuilder
            .root("div", "id=link", "class=link-panel")
            .open()
                .node("div", "class=link-panel-icon")
                .open()
                    .node("i", "id=icon")
                .close()
                .node("div", "class=link-panel-label")
                .open()
                    .node("a", "id=label")
                .close()
            .close()
            .build();
    }

    /** @type {EventManager<LinkPanel>} */
    get events() { return this.eventManager; }

    postConfig() {
        this.component = this.componentFactory.create(LinkPanel);
        nuttin2cCore_v1.CanvasStyles.enableStyle(LinkPanel.name);
        
        nuttin2cCore_v1.StyleSelectorAccessor.from(this.component.get("link"))
            .enable(this.size)
            .enable(this.orientation)
            .enable(this.theme);

        if (this.label) {
            this.component.get("label").setChild(this.label);
        } else {
            this.component.get("label").remove();
        }

        if (this.icon) {
            nuttin2cCore_v1.StyleSelectorAccessor.from(this.component.get("icon"))
                .clear()
                .enable(this.icon);
        } else {
            this.component.get("icon").remove();
        }


        this.component.get("link").listenTo("click", (event) => {
            this.eventManager.trigger(LinkPanel.EVENT_CLICKED, event);
        }, this);
    }

    /**
     * 
     * @param {Method} method 
     */
    withClickListener(method) {
        this.component.get("link").listenTo("click", method);
        return this;
    }

}

mindi_v1.TypeConfigPack.instance().addTypeConfig("nuttin2c-ui", mindi_v1.PrototypeConfig.unnamed(LinkPanel));

new coreutil_v1.Logger("Panel");

class Panel {

    static PARAMETER_STYLE_TYPE_COLUMN_ROOT = "panel-type-column-root";
    static PARAMETER_STYLE_TYPE_COLUMN = "panel-type-column";
    static PARAMETER_STYLE_TYPE_ROW = "panel-type-row";

    static PARAMETER_STYLE_CONTENT_ALIGN_LEFT = "panel-content-align-left";
    static PARAMETER_STYLE_CONTENT_ALIGN_RIGHT = "panel-content-align-right";
    static PARAMETER_STYLE_CONTENT_ALIGN_CENTER = "panel-content-align-center";
    static PARAMETER_STYLE_CONTENT_ALIGN_JUSTIFY = "panel-content-align-justify";

    static PARAMETER_STYLE_SIZE_AUTO = "panel-size-auto";
    static PARAMETER_STYLE_SIZE_MINIMAL = "panel-size-minimal";
    static PARAMETER_STYLE_SIZE_RESPONSIVE = "panel-size-responsive";

    static OPTION_STYLE_CONTENT_PADDING_SMALL = "panel-content-padding-small";
    static OPTION_STYLE_CONTENT_PADDING_LARGE = "panel-content-padding-large";

    static OPTION_STYLE_BORDER_SHADOW = "panel-border-shadow";

    /**
     * 
     * @param {string} type 
     * @param {string} contentAlign 
     * @param {string} size 
     * @param {Array<string>} options 
     */
    constructor(type = Panel.PARAMETER_STYLE_TYPE_COLUMN_ROOT,
        contentAlign = Panel.PARAMETER_STYLE_CONTENT_ALIGN_CENTER,
        size = Panel.PARAMETER_STYLE_SIZE_AUTO,
        options = []) {

        /** @type {InlineComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(nuttin2cCore_v1.InlineComponentFactory);

        /** @type {Component} */
        this.component = null;

        /** @type {string} */
        this.type = type;

        /** @type {string} */
        this.contentAlign = contentAlign;

        /** @type {string} */
        this.size = size;

        /** @type {Array<String>} */
        this.options = options;

    }

    /**
     * 
     * @param {StylesheetBuilder} stylesheetBuilder 
     * @returns {Stylesheet}
     */
    static buildStylesheet(stylesheetBuilder) {
        return stylesheetBuilder
            .media("@media only screen and (min-width: 850pt)")
            .open()
                .selector(".panel-size-responsive")
                .open()
                    .style("flex-basis", "100%")
                    .style("min-width", "800pt")
                .close()
            .close()

            .media("@media only screen and (max-width: 849pt)")
            .open()
                .selector(".panel-size-responsive")
                .open()
                    .style("flex-basis", "100%")
                    .style("min-width", "500pt")
                .close()
            .close()

            .media("@media only screen and (max-width: 500pt)")
            .open()
                .selector(".panel-size-responsive")
                .open()
                    .style("flex-basis", "100%")
                    .style("min-width", "100%")
                .close()
            .close()

            .selector(".panel-type-column-root")
            .open()
                .style("display", "flex")
                .style("flex-direction", "column")
                .style("box-sizing", "border-box")
                .style("height", "100%")
                .style("border", "0")
                .style("margin", "0")
            .close()

            .selector(".panel-type-column")
            .open()
                .style("display", "flex")
                .style("flex-direction", "column")
                .style("box-sizing", "border-box")
                .style("margin", "0")
                .style("border", "0")
            .close()

            .selector(".panel-type-row")
            .open()
                .style("display", "flex")
                .style("flex-direction", "row")
                .style("box-sizing", "border-box")
                .style("margin", "0")
                .style("border", "0")
            .close()

            .selector(".panel-content-align-left")
            .open()
                .style("justify-content", "left")
            .close()

            .selector(".panel-content-align-right")
            .open()
                .style("justify-content", "right")
            .close()

            .selector(".panel-content-align-center")
            .open()
                .style("align-items", "center")
                .style("justify-content", "center")
            .close()

            .selector(".panel-content-align-justify")
            .open()
                .style("justify-content", "space-between")
            .close()

            .selector(".panel-size-auto")
            .open()
                .style("flex-grow", "1")
                .style("flex-shrink", "0")
                .style("flex-basis", "auto")
            .close()

            .selector(".panel-size-minimal")
            .open()
                .style("flex-grow", "0")
                .style("flex-shrink", "0")
                .style("flex-basis", "auto")
            .close()

            .selector(".panel-content-padding-small")
            .open()
                .style("padding", "2pt")
            .close()

            .selector(".panel-content-padding-large")
            .open()
                .style("padding", "6pt")
            .close()

            .selector(".panel-border-shadow")
            .open()
                .style("box-shadow", "0 1px 8px rgba(0,0,0,0.5)")
            .close()

            .build();
    }

    /**
     * 
     * @param {ComponentBuilder} componentBuilder 
     * @returns {Component}
     */
    static buildComponent(componentBuilder) {
        return componentBuilder
            .root("div", "id=panel")
            .build();
    }

    postConfig() {
        this.component = this.componentFactory.create(Panel);
        nuttin2cCore_v1.CanvasStyles.enableStyle(Panel.name);

        nuttin2cCore_v1.StyleSelectorAccessor.from(this.component.get("panel"))
            .enable(this.type)
            .enable(this.contentAlign)
            .enable(this.size);
    }

}

mindi_v1.TypeConfigPack.instance().addTypeConfig("nuttin2c-ui", mindi_v1.PrototypeConfig.unnamed(Panel));

new coreutil_v1.Logger("LinePanelEntry");

class LinePanelEntry {

    constructor() {

		/** @type {InlineComponentFactory} */
		this.componentFactory = mindi_v1.InjectionPoint.instance(nuttin2cCore_v1.InlineComponentFactory);

		/** @type {Component} */
		this.component = null;

    }

	/**
	 * 
	 * @param {ComponentBuilder} componentBuilder 
	 * @returns {Component}
	 */
	static buildComponent(componentBuilder) {
		return componentBuilder
			.root("div", "id=recordElement", "class=cntr cntr-columns cntr-gap-small")
			.build();
	}

    async postConfig() {
		this.component = this.componentFactory.create(LinePanelEntry);
    }


}

mindi_v1.TypeConfigPack.instance().addTypeConfig("nuttin2c-ui", mindi_v1.PrototypeConfig.unnamed(LinePanelEntry));

new coreutil_v1.Logger("LinePanel");

class LinePanel {

	static EVENT_REFRESH_CLICKED = "refreshClicked";
	static RECORD_ELEMENT_REQUESTED = "recordElementRequested";
	static RECORDS_STATE_UPDATE_REQUESTED = "recordsStateUpdateRequested";

	/**
	 * 
	 * @param {Panel} buttonPanel 
	 */
	constructor(buttonPanel = null) {

		/** @type {InlineComponentFactory} */
		this.componentFactory = mindi_v1.InjectionPoint.instance(nuttin2cCore_v1.InlineComponentFactory);
		
		/** @type {Component} */
		this.component = null;

		/** @type {EventManager} */
		this.eventManager = new nuttin2cCore_v1.EventManager();

		/** @type {Provider<LinePanelEntry>} */
		this.linePanelEntryProvider = mindi_v1.InjectionPoint.provider(LinePanelEntry);

		/** @type {Provider<Panel>} */
		this.panelProvider = mindi_v1.InjectionPoint.provider(Panel);

        /** @type {StateManager<any[]>} */
        this.arrayState = new nuttin2cCore_v1.StateManager();

		/** @type {Panel} */
		this.buttonPanel = buttonPanel;

	}

	/**
	 * @param {ComponentBuilder} componentBuilder 
	 * @returns {Component}
	 */
	static buildComponent(componentBuilder) {
		return componentBuilder
			.root("div", "class=cntr cntr-gap-medium cntr-rows cntr-prevent-size-change padding-small")
			.open()
				.node("div", "id=buttonPanel")
				.node("div", "id=recordElements", "class=cntr-override-grow-only cntr cntr-rows cntr-gap-small")
			.close()
			.build();
	}

	async postConfig() {
		this.component = this.componentFactory.create(LinePanel);

		if (this.buttonPanel) {
			this.component.setChild("buttonPanel", this.buttonPanel.component);
		}

		this.arrayState.react(new coreutil_v1.Method(this.handleArrayState, this));

	}

	/**
	 * @type { EventManager }
	 */
	get events() { return this.eventManager; }

	/**
	 * @type { EventManager }
	 */
	get events() { return this.eventManager; }

	/**
	 * Reset
	 * 
	 * @param {ContainerEvent} event 
	 */
	async reset(event) {
		this.events.trigger(LinePanel.RECORDS_STATE_UPDATE_REQUESTED, [event, this.arrayState]);
	}

    /**
     * @param {Array} array 
     */
    async handleArrayState(array) {
		this.component.clearChildren("recordElements");
		array.forEach(async (record) => {
            this.component.addChild("recordElements", await this.populateRecord(record));
        });		
    }

	/**
     * @param {any} record 
     */
    async populateRecord(record) {
        const recordElement = await this.eventManager.trigger(LinePanel.RECORD_ELEMENT_REQUESTED, [null, record]);
        
		if (!recordElement) {
			return;
		}

		const linePanelEntry = await this.linePanelEntryProvider.get([true, record]);
		linePanelEntry.component.setChild("recordElement", recordElement.component);

		return linePanelEntry.component;
    }
}

mindi_v1.TypeConfigPack.instance().addTypeConfig("nuttin2c-ui", mindi_v1.PrototypeConfig.unnamed(LinePanel));

new coreutil_v1.Logger("PopUpPanel");

class PopUpPanel {

    static TYPE_PRIMARY = "pop-up-panel-button-primary";
    static TYPE_SECONDARY = "pop-up-panel-button-secondary";
    static TYPE_SUCCESS = "pop-up-panel-button-success";
    static TYPE_INFO = "pop-up-panel-button-info";
    static TYPE_WARNING = "pop-up-panel-button-warning";
    static TYPE_DANGER = "pop-up-panel-button-danger";
    static TYPE_LIGHT = "pop-up-panel-button-light";
    static TYPE_DARK = "pop-up-panel-button-dark";

    static SIZE_MEDIUM = "pop-up-panel-button-medium";
    static SIZE_LARGE = "pop-up-panel-button-large";

    static ORIENTATION_LEFT = "pop-up-panel-left";
    static ORIENTATION_RIGHT = "pop-up-panel-right";

    static CONTENT_VISIBLE = "pop-up-panel-content-visible";
    static CONTENT_HIDDEN = "pop-up-panel-content-hidden";
    static CONTENT_EXPAND = "pop-up-panel-content-expand";
    static CONTENT_COLLAPSE = "pop-up-panel-content-collapse";
    static CONTENT = "pop-up-panel-content";
    static BUTTON = "pop-up-panel-button";

    /**
     * 
     * @param {string} iconClass
     * @param {string} type
     * @param {string} orientation
     */
    constructor(iconClass, type = PopUpPanel.TYPE_DARK, size = PopUpPanel.SIZE_MEDIUM, orientation = PopUpPanel.ORIENTATION_LEFT) {

        /** @type {InlineComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(nuttin2cCore_v1.InlineComponentFactory);

        /** @type {Component} */
        this.component = null;

        /** @type {string} */
        this.iconClass = iconClass;

        /** @type {string} */
        this.type = type;

        /** @type {string} */
        this.size = size;

        /** @type {string} */
        this.orientation = orientation;

    }

    /**
     * 
     * @param {StylesheetBuilder} stylesheetBuilder 
     * @returns {Stylesheet}
     */
    static buildStylesheet(stylesheetBuilder) {
        stylesheetBuilder
            .media("@media (prefers-reduced-motion: reduce)")
            .open()
                .selector(".pop-up-panel-button")
                .open()
                    .style("transition", "none")
                .close()
            .close()

            .selector(".pop-up-panel-outline")
            .open()
                .style("display", "inline-block")
                .style("vertical-align", "middle")
            .close()

            .selector(".pop-up-panel-button")
            .open()
                .style("min-width", "35pt")
                .style("display", "inline-block")
                .style("font-weight", "400")
                .style("color", "#212529")
                .style("text-align", "center")
                .style("vertical-align", "middle")
                .style("user-select", "none")
                .style("background-color", "transparent")
                .style("border", "1px solid transparent")
                .style("padding", "0.375rem 0.75rem")
                .style("line-height", "1.5")
                .style("border-radius", "0.25rem")
                .style("transition", "color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out")
            .close()

            .selector(".pop-up-panel-button-medium")
            .open()
                .style("font-size", "1rem")
            .close()

            .selector(".pop-up-panel-button-large")
            .open()
                .style("font-size", "1.5rem")
            .close()

            .selector(".pop-up-panel-content")
            .open()
                .style("min-width", "150pt")
                .style("max-width", "450pt")
                .style("padding", "8pt 14pt")
                .style("color", "#333333")
                .style("background-color", "var(--default-panel-color)")
                .style("border-radius", "5pt")
                .style("position", "absolute")
                .style("z-index", "99999997")
                .style("box-sizing", "border-box")
                .style("box-shadow", "0 1px 8px rgba(0,0,0,0.5)")
                .style("overflow", "hidden")
            .close()

            .selector(".pop-up-panel-content.pop-up-panel-left")
            .open()
                .style("transform", "translate(0%, -100%) translate(0%, -42pt)")
            .close()

            .selector(".pop-up-panel-content.pop-up-panel-right")
            .open()
                .style("transform", "translate(-100%, -100%) translate(35pt,-42pt)")
            .close()

            .selector(".pop-up-panel-content-visible")
            .open()
                .style("display","block")
            .close()
                
            .selector(".pop-up-panel-content-hidden")
            .open()
                .style("display","none")
            .close()

            .selector(".pop-up-panel-arrow")
            .open()
                .style("padding", "10px 20px")
                .style("color", "#333333")
                .style("font-weight", "normal")
                .style("position", "absolute")
                .style("z-index", "99999996")
                .style("box-sizing", "border-box")
                .style("display", "none")
                .style("transform", "translate(0%, -100%) translate(0%,-38pt)")
            .close()

            .selector(".pop-up-panel-arrow i")
            .open()
                .style("position", "absolute")
                .style("margin-left", "-15px")
                .style("width", "40px")
                .style("height", "40px")
                .style("overflow", "hidden")
                .style("top", "-20%")
                .style("left", "30%")
            .close()

            .selector(".pop-up-panel-arrow i::after")
            .open()
                .style("content", "''")
                .style("position", "absolute")
                .style("width", "16px")
                .style("height", "16px")
                .style("background-color", "var(--default-panel-color)")
                .style("box-shadow", "0 1px 8px rgba(0,0,0,0.5)")
                .style("left", "30%")
                .style("transform", "translate(50%,50%) rotate(45deg)")
            .close()

            .selector(".pop-up-panel-button:hover")
            .open()
                .style("color", "#212529")
                .style("text-decoration", "none")
            .close()

            .selector(".pop-up-panel-button:focus, .pop-up-panel-button.focus")
            .open()
                .style("outline", "0")
                .style("box-shadow", "0 0 0 0.2rem rgba(0, 123, 255, 0.25)")
            .close()

            .selector(".pop-up-panel-button.disabled, .pop-up-panel-button:disabled")
            .open()
                .style("opacity", "0.65")
            .close();

        ElementThemeApplicator.apply(stylesheetBuilder, "pop-up-panel-button", "primary",
            ColorPalette.PRIMARY_COLORS,
            ColorPalette.PRIMARY_HOVER_COLORS,
            ColorPalette.PRIMARY_DISABLED_COLORS,
            ColorPalette.PRIMARY_ACTIVE_COLORS,
            "0 0 0 0.2rem rgba(130, 138, 145, 0.5)", // boxShadowFocus
            "0 0 0 0.2rem rgba(130, 138, 145, 0.5)"); // boxShadowActiveFocus


        ElementThemeApplicator.apply(stylesheetBuilder, "pop-up-panel-button", "secondary",
            ColorPalette.SECONDARY_COLORS,
            ColorPalette.SECONDARY_HOVER_COLORS,
            ColorPalette.SECONDARY_DISABLED_COLORS,
            ColorPalette.SECONDARY_ACTIVE_COLORS,
            "0 0 0 0.2rem rgba(130, 138, 145, 0.5)", // boxShadowFocus
            "0 0 0 0.2rem rgba(130, 138, 145, 0.5)"); // boxShadowActiveFocus
        
        ElementThemeApplicator.apply(stylesheetBuilder, "pop-up-panel-button", "success",
            ColorPalette.SUCCESS_COLORS,
            ColorPalette.SUCCESS_HOVER_COLORS,
            ColorPalette.SUCCESS_DISABLED_COLORS,
            ColorPalette.SUCCESS_ACTIVE_COLORS,
            "0 0 0 0.2rem rgba(72, 180, 97, 0.5)", // boxShadowFocus
            "0 0 0 0.2rem rgba(72, 180, 97, 0.5)"); // boxShadowActiveFocus

        ElementThemeApplicator.apply(stylesheetBuilder, "pop-up-panel-button", "info",
            ColorPalette.INFO_COLORS,
            ColorPalette.INFO_HOVER_COLORS,
            ColorPalette.INFO_DISABLED_COLORS,
            ColorPalette.INFO_ACTIVE_COLORS,
            "0 0 0 0.2rem rgba(58, 176, 195, 0.5)", // boxShadowFocus
            "0 0 0 0.2rem rgba(58, 176, 195, 0.5)"); // boxShadowActiveFocus

        ElementThemeApplicator.apply(stylesheetBuilder, "pop-up-panel-button", "warning",
            ColorPalette.WARNING_COLORS,
            ColorPalette.WARNING_HOVER_COLORS,
            ColorPalette.WARNING_DISABLED_COLORS,
            ColorPalette.WARNING_ACTIVE_COLORS,
            "0 0 0 0.2rem rgba(222, 170, 12, 0.5)", // boxShadowFocus
            "0 0 0 0.2rem rgba(222, 170, 12, 0.5)"); // boxShadowActiveFocus

        ElementThemeApplicator.apply(stylesheetBuilder, "pop-up-panel-button", "danger",
            ColorPalette.DANGER_COLORS,
            ColorPalette.DANGER_HOVER_COLORS,
            ColorPalette.DANGER_DISABLED_COLORS,
            ColorPalette.DANGER_ACTIVE_COLORS,
            "0 0 0 0.2rem rgba(225, 83, 97, 0.5)", // boxShadowFocus
            "0 0 0 0.2rem rgba(225, 83, 97, 0.5)"); // boxShadowActiveFocus

        ElementThemeApplicator.apply(stylesheetBuilder, "pop-up-panel-button", "light",
            ColorPalette.LIGHT_COLORS,
            ColorPalette.LIGHT_HOVER_COLORS,
            ColorPalette.LIGHT_DISABLED_COLORS,
            ColorPalette.LIGHT_ACTIVE_COLORS,
            "0 0 0 0.2rem rgba(216, 217, 219, 0.5)", // boxShadowFocus
            "0 0 0 0.2rem rgba(216, 217, 219, 0.5)"); // boxShadowActiveFocus

        ElementThemeApplicator.apply(stylesheetBuilder, "pop-up-panel-button", "dark",
            ColorPalette.DARK_COLORS,
            ColorPalette.DARK_HOVER_COLORS,
            ColorPalette.DARK_DISABLED_COLORS,
            ColorPalette.DARK_ACTIVE_COLORS,
            "0 0 0 0.2rem rgba(82, 88, 93, 0.5)", // boxShadowFocus
            "0 0 0 0.2rem rgba(82, 88, 93, 0.5)"); // boxShadowActiveFocus

        return stylesheetBuilder.build();
    }

    /**
     * 
     * @param {ComponentBuilder} componentBuilder 
     */
    static buildComponent(componentBuilder) {
        return componentBuilder
            .root("div", "id=popUpPanelRoot", "class=pop-up-panel-outline")
            .open()
                .node("button", "id=button", "class=pop-up-panel-button")
                .node("div", "id=arrow", "class=pop-up-panel-arrow")
                .open()
                    .node("i")
                .close()
                .node("div", "id=content", "class=pop-up-panel-content", "tabindex=0")
            .close()
            .build();
    }

    postConfig() {
        this.component = this.componentFactory.create(PopUpPanel);
        nuttin2cCore_v1.CanvasStyles.enableStyle(PopUpPanel.name);
        this.component.get("button").setChild(nuttin2cCore_v1.HTML.i("", this.iconClass));

        nuttin2cCore_v1.StyleSelectorAccessor.from(this.component.get("button"))
            .enable(PopUpPanel.BUTTON)
            .enable(this.type);

        nuttin2cCore_v1.StyleSelectorAccessor.from(this.component.get("content"))
            .enable(PopUpPanel.CONTENT)
            .disable(PopUpPanel.CONTENT_VISIBLE)
            .enable(PopUpPanel.CONTENT_HIDDEN)
            .enable(this.size)
            .enable(this.orientation);

        this.component.get("button").listenTo("click", this.clicked, this);
        nuttin2cCore_v1.CanvasRoot.listenToFocusEscape(this.component.get("popUpPanelRoot"), this.hide, this);
    }

    /**
     * 
     * @param {Component} popUpPanelContent 
     */
    setPanelContent(popUpPanelContent) {
        this.component.get("content").setChild(popUpPanelContent.component);
    }
    /**
     * 
     * @param {ContainerEvent} event 
     */
    clicked(event) {
        this.toggleContent();
    }

    toggleContent() {
        if (!nuttin2cCore_v1.StyleAccessor.from(this.component.get("arrow")).is("display","block")) {
            this.show();
        } else {
            this.hide();
        }
    }

    show() {
        nuttin2cCore_v1.StyleSelectorAccessor.from(this.component.get("content"))
            .disable(PopUpPanel.CONTENT_HIDDEN)
            .enable(PopUpPanel.CONTENT_VISIBLE);
        nuttin2cCore_v1.StyleAccessor.from(this.component.get("arrow"))
            .set("display", "block");
        this.component.get("content").containerElement.focus();
    }

    hide() {
        nuttin2cCore_v1.StyleSelectorAccessor.from(this.component.get("content"))
            .disable(PopUpPanel.CONTENT_VISIBLE)
            .enable(PopUpPanel.CONTENT_HIDDEN);
        this.component.get("arrow").setStyle("display", "none");
    }

    disable() {
        this.component.get("button").setAttributeValue("disabled", "true");
    }

    enable() {
        this.component.get("button").removeAttribute("disabled");
    }
}

mindi_v1.TypeConfigPack.instance().addTypeConfig("nuttin2c-ui", mindi_v1.PrototypeConfig.unnamed(PopUpPanel));

class SlideDeckEntry {

    static DEFAULT_CLASS = "slide-deck-entry";

    static ENTRY_POSITION_FRONT = "position-front";
    static ENTRY_POSITION_BEHIND = "position-behind";
    static ENTRY_POSITION_RIGHT = "position-right";

    static CONTENT_EXISTANCE_PRESENT = "existance-present";
    static CONTENT_EXISTANCE_REMOVED = "existance-removed";

    constructor() {
        /** @type {InlineComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(nuttin2cCore_v1.InlineComponentFactory);

        /** @type {Component} */
        this.component = null;

        /** @type {Number} */
        this.index = 0;

        /** @type {String} */
        this.position = SlideDeckEntry.ENTRY_POSITION_FRONT;
    }

    /**
     * @returns {Stylesheet}
     * @param {StylesheetBuilder} stylesheetBuilder 
     */
    static buildStylesheet(stylesheetBuilder) {
        return nuttin2cCore_v1.Css3StylesheetBuilder.create(stylesheetBuilder)
            .selector(".slide-deck-entry")
                .position("relative")
                .backgroundColor("var(--default-panel-color)")
                .gridColumn("1")
                .gridRow("1")
                .width("100%")
                .height("100%")
                .minHeight("0")

            .selector(".slide-deck-entry.position-front")
                .transform("translate(0%, 0%)")
                .transition(["transform", ".6s"])

            .selector(".slide-deck-entry.position-behind")
                .transform("translate(0%, 0%)")
                .transition(["transform", ".6s"])

            .selector(".slide-deck-entry.position-right")
                .transform("translate(+105%, 0%)")
                .transition(["transform", ".6s"])

            .selector(".slide-deck-entry-content.existance-removed")
                .display("none")

            .selector(".slide-deck-entry-content.existance-present")
                .position("relative")
                .height("100%")

            .build();
    }

    /**
     * @returns {Component}
     * @param {ComponentBuilder} componentBuilder 
     */
    static buildComponent(componentBuilder) {
        return componentBuilder
            .root("div", "id=slideDeckEntry", "class=slide-deck-entry")
            .open()
                .node("div", "id=slideDeckEntryContent", "class=slide-deck-entry-content")
            .close()
            .build();
    }

    /**
     * @returns {BaseElement}
     */
    get contentElement() {
        return this.component.get("slideDeckEntryContent");
    }

    /**
     * @returns {BaseElement}
     */
    get entryElement() {
        return this.component.get("slideDeckEntry");
    }

    async postConfig() {
        this.component = this.componentFactory.create(SlideDeckEntry);
        nuttin2cCore_v1.CanvasStyles.enableStyle(SlideDeckEntry.name);
    }

    setIndex(index) {
        this.index = index;
    }

    setContent(component) {
        this.contentElement.setChild(component);
    }

    show() {
        this.setContentVisibility(SlideDeckEntry.CONTENT_EXISTANCE_PRESENT);
        this.setShift(SlideDeckEntry.ENTRY_POSITION_FRONT);
    }

    hide(nextIndex) {
        if (nextIndex > this.index) {
            this.setShift(SlideDeckEntry.ENTRY_POSITION_BEHIND);
        } else {
            this.setShift(SlideDeckEntry.ENTRY_POSITION_RIGHT);
        }
        this.adjustWhenHidden();
    }

    adjustWhenHidden() {
        coreutil_v1.TimePromise.asPromise(600, () => {
            if (this.position === SlideDeckEntry.ENTRY_POSITION_FRONT) {
                return;
            }
            this.setContentVisibility(SlideDeckEntry.CONTENT_EXISTANCE_REMOVED);
        });
    }

    setContentVisibility(contentVisibility) {
        nuttin2cCore_v1.StyleSelectorAccessor.from(this.contentElement).replace("existance-", contentVisibility);
    }

    setShift(position) {
        this.position = position;
        nuttin2cCore_v1.StyleSelectorAccessor.from(this.entryElement).replace("position-", position);
    }

}

mindi_v1.TypeConfigPack.instance().addTypeConfig("nuttin2c-ui", mindi_v1.PrototypeConfig.unnamed(SlideDeckEntry));

class SlideDeck {

    static EVENT_ENTRY_CHANGED = "eventEntryChanged";

    /**
     * 
     * @param {Map<Component>} componentMap 
     */
    constructor(componentMap) {

        /** @type {InlineComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(nuttin2cCore_v1.InlineComponentFactory);

        /** @type {Component} */
        this.component = null;

        /** @type {Map<Component>} */
        this.componentMap = componentMap;

        /** @type {Provider<SlideDeckEntry>} */
        this.slideDeckEntryProvider = mindi_v1.InjectionPoint.provider(SlideDeckEntry);

        /** @type {List<SlideDeckEntry>} */
        this.slideDeckEntryList = new coreutil_v1.List();

        /** @type {Map<SlideDeckEntry>} */
        this.slideDeckEntryMap = new coreutil_v1.Map();

        /** @type {Map<Number>} */
        this.slideDeckEntryIndexMap = new coreutil_v1.Map();

        /** @type {SlideDeckEntry} */
        this.currentEntry = null;

        /** @type {EventManager} */
        this.events = new nuttin2cCore_v1.EventManager();
    }

    /**
     * 
     * @param {StylesheetBuilder} stylesheetBuilder 
     * @returns 
     */
    static buildStylesheet(stylesheetBuilder) {
        return nuttin2cCore_v1.Css3StylesheetBuilder.create(stylesheetBuilder)
            .selector(".slide-deck")
                .position("relative")
                .backgroundColor("#f1f1f1")
                .display("grid")
                .height("100%")

            .build();
    }

    static buildComponent(componentBuilder) {
        return componentBuilder
            .root("div", "id=slideDeckEntries", "class=slide-deck")
            .build();
    }

    async postConfig() {
        this.component = this.componentFactory.create(SlideDeck);
        nuttin2cCore_v1.CanvasStyles.enableStyle(SlideDeck.name);

        if (this.componentMap) {
            this.prepareEntries();
        }

        this.scrollback = () => {
            this.component.get("slideDeckEntries").element.parentElement.scrollTo(0,0);
        };
    }

    prepareEntries() {
        this.componentMap.forEach(async (key, component) => {

            const slideDeckEntry = await this.slideDeckEntryProvider.get();

            if (null == this.currentEntry) {
                slideDeckEntry.show();
                this.currentEntry = slideDeckEntry;
            } else {
                slideDeckEntry.hide(0);
            }

            this.slideDeckEntryMap.set(key, slideDeckEntry);
            this.slideDeckEntryList.add(slideDeckEntry);
            this.slideDeckEntryIndexMap.set(key, this.slideDeckEntryList.size() -1);

            slideDeckEntry.setContent(component);
            slideDeckEntry.setIndex(this.slideDeckEntryList.size() - 1);

            this.component.addChild("slideDeckEntries", slideDeckEntry.component);
            return true;
        }, this);
    }

    slideNext() {
        if (this.currentEntry.index + 1 >= this.slideDeckEntryList.size()) {
            return;
        }
        const nextEntry = this.slideDeckEntryList.get(this.currentEntry.index + 1);
        this.currentEntry.hide(nextEntry.index);
        this.currentEntry = nextEntry;
        this.currentEntry.show();
        
        this.events.trigger(SlideDeck.EVENT_ENTRY_CHANGED);
    }

    slidePrevious() {
        if (this.currentEntry.index <= 0) {
            return;
        }
        const nextEntry = this.slideDeckEntryList.get(this.currentEntry.index - 1);
        this.currentEntry.hide(nextEntry.index);
        this.currentEntry = nextEntry;
        this.currentEntry.show();

        this.events.trigger(SlideDeck.EVENT_ENTRY_CHANGED);
    }

    slideTo(name) {
        const nextEntry = this.slideDeckEntryMap.get(name);
        this.currentEntry.hide(nextEntry.index);
        this.currentEntry = nextEntry;
        this.currentEntry.show();

        this.events.trigger(SlideDeck.EVENT_ENTRY_CHANGED);
    }

}

mindi_v1.TypeConfigPack.instance().addTypeConfig("nuttin2c-ui", mindi_v1.PrototypeConfig.unnamed(SlideDeck));

new coreutil_v1.Logger("Button");

class Button {

    static TYPE_PRIMARY = "button-primary";
    static TYPE_SECONDARY = "button-secondary";
    static TYPE_SUCCESS = "button-success";
    static TYPE_INFO = "button-info";
    static TYPE_WARNING = "button-warning";
    static TYPE_DANGER = "button-danger";
    static TYPE_LIGHT = "button-light";
    static TYPE_DARK = "button-dark";

    static SIZE_MEDIUM = "button-medium";
    static SIZE_LARGE = "button-large";

    static SPINNER_VISIBLE = "spinner-container-visible";
    static SPINNER_HIDDEN = "spinner-container-hidden";

    static EVENT_CLICKED = CommonEvents.CLICKED;

    /**
     * 
     * @param {String} label
     * @param {String} buttonType
     * @param {String} iconClass
     */
    constructor(label, buttonType = Button.TYPE_PRIMARY, buttonSize = Button.SIZE_MEDIUM, iconClass) {

        /** @type {InlineComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(nuttin2cCore_v1.InlineComponentFactory);

        /** @type {Component} */
        this.component = null;

        /** @type {String} */
        this.label = label;

        /** @type {String} */
        this.buttonType = buttonType;

        /** @type {String} */
        this.buttonSize = buttonSize;

        /** @type {String} */
        this.iconClass = iconClass;

        /** @type {EventManager<Button>} */
        this.eventManager = new nuttin2cCore_v1.EventManager();
    }

    /**
     * 
     * @param {StylesheetBuilder} stylesheetBuilder 
     * @returns {Stylesheet}
     */
    static buildStylesheet(stylesheetBuilder) {
        stylesheetBuilder
            .selector(".button-outline")
            .open()
                .style("display", "flex")
                .style("vertical-align", "middle")
            .close()
            .selector(".button")
            .open()
                .style("display", "inline-block")
                .style("font-weight", "400")
                .style("color", "#212529")
                .style("text-align", "center")
                .style("vertical-align", "middle")
                .style("-webkit-user-select", "none")
                .style("-moz-user-select", "none")
                .style("-ms-user-select", "none")
                .style("user-select", "none")
                .style("background-color", "transparent")
                .style("border", "1px solid transparent")
                .style("padding", "0.375rem 0.75rem")
                .style("line-height", "1.5")
                .style("border-radius", "0.25rem")
                .style("transition", "color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out")
            .close()

            .selector(".button-medium")
            .open()
                .style("font-size", "1rem")
            .close()

            .selector(".button-large")
            .open()
                .style("font-size", "1.5rem")
            .close()

            .selector(".button:hover")
            .open()
                .style("color", "#212529")
                .style("text-decoration", "none")
            .close()

            .selector(".button:focus, .button.focus")
            .open()
                .style("outline", "0")
                .style("box-shadow", "0 0 0 0.2rem rgba(0, 123, 255, 0.25)")
            .close()

            .selector(".button.disabled, .button:disabled")
            .open()
                .style("opacity", "0.65")
            .close();

        ElementThemeApplicator.apply(stylesheetBuilder, "button", "primary",
            ColorPalette.PRIMARY_COLORS,
            ColorPalette.PRIMARY_HOVER_COLORS,
            ColorPalette.PRIMARY_DISABLED_COLORS,
            ColorPalette.PRIMARY_ACTIVE_COLORS,
            "0 0 0 0.2rem rgba(130, 138, 145, 0.5)", // boxShadowFocus
            "0 0 0 0.2rem rgba(130, 138, 145, 0.5)"); // boxShadowActiveFocus


        ElementThemeApplicator.apply(stylesheetBuilder, "button", "secondary",
            ColorPalette.SECONDARY_COLORS,
            ColorPalette.SECONDARY_HOVER_COLORS,
            ColorPalette.SECONDARY_DISABLED_COLORS,
            ColorPalette.SECONDARY_ACTIVE_COLORS,
            "0 0 0 0.2rem rgba(130, 138, 145, 0.5)", // boxShadowFocus
            "0 0 0 0.2rem rgba(130, 138, 145, 0.5)"); // boxShadowActiveFocus
        
        ElementThemeApplicator.apply(stylesheetBuilder, "button", "success",
            ColorPalette.SUCCESS_COLORS,
            ColorPalette.SUCCESS_HOVER_COLORS,
            ColorPalette.SUCCESS_DISABLED_COLORS,
            ColorPalette.SUCCESS_ACTIVE_COLORS,
            "0 0 0 0.2rem rgba(72, 180, 97, 0.5)", // boxShadowFocus
            "0 0 0 0.2rem rgba(72, 180, 97, 0.5)"); // boxShadowActiveFocus

        ElementThemeApplicator.apply(stylesheetBuilder, "button", "info",
            ColorPalette.INFO_COLORS,
            ColorPalette.INFO_HOVER_COLORS,
            ColorPalette.INFO_DISABLED_COLORS,
            ColorPalette.INFO_ACTIVE_COLORS,
            "0 0 0 0.2rem rgba(58, 176, 195, 0.5)", // boxShadowFocus
            "0 0 0 0.2rem rgba(58, 176, 195, 0.5)"); // boxShadowActiveFocus

        ElementThemeApplicator.apply(stylesheetBuilder, "button", "warning",
            ColorPalette.WARNING_COLORS,
            ColorPalette.WARNING_HOVER_COLORS,
            ColorPalette.WARNING_DISABLED_COLORS,
            ColorPalette.WARNING_ACTIVE_COLORS,
            "0 0 0 0.2rem rgba(222, 170, 12, 0.5)", // boxShadowFocus
            "0 0 0 0.2rem rgba(222, 170, 12, 0.5)"); // boxShadowActiveFocus

        ElementThemeApplicator.apply(stylesheetBuilder, "button", "danger",
            ColorPalette.DANGER_COLORS,
            ColorPalette.DANGER_HOVER_COLORS,
            ColorPalette.DANGER_DISABLED_COLORS,
            ColorPalette.DANGER_ACTIVE_COLORS,
            "0 0 0 0.2rem rgba(225, 83, 97, 0.5)", // boxShadowFocus
            "0 0 0 0.2rem rgba(225, 83, 97, 0.5)"); // boxShadowActiveFocus

        ElementThemeApplicator.apply(stylesheetBuilder, "button", "light",
            ColorPalette.LIGHT_COLORS,
            ColorPalette.LIGHT_HOVER_COLORS,
            ColorPalette.LIGHT_DISABLED_COLORS,
            ColorPalette.LIGHT_ACTIVE_COLORS,
            "0 0 0 0.2rem rgba(216, 217, 219, 0.5)", // boxShadowFocus
            "0 0 0 0.2rem rgba(216, 217, 219, 0.5)"); // boxShadowActiveFocus

        ElementThemeApplicator.apply(stylesheetBuilder, "button", "dark",
            ColorPalette.DARK_COLORS,
            ColorPalette.DARK_HOVER_COLORS,
            ColorPalette.DARK_DISABLED_COLORS,
            ColorPalette.DARK_ACTIVE_COLORS,
            "0 0 0 0.2rem rgba(82, 88, 93, 0.5)", // boxShadowFocus
            "0 0 0 0.2rem rgba(82, 88, 93, 0.5)"); // boxShadowActiveFocus

        return stylesheetBuilder.build();
    }

    /**
     * 
     * @param {ComponentBuilder} componentBuilder 
     * @returns {Component}
     */
    static buildComponent(componentBuilder) {
        return componentBuilder
            .root("div", "class=button-outline")
            .open()
                .node("button", "class=button", "id=button", "type=button")
                .node("div", "class=spinner-container-hidden", "id=spinnerContainer")
                .open()
                    .node("div", "class=spinner")
                .close()
            .close()
            .build();
    }

    /** @type {EventManager<Button>} */
    get events() { return this.eventManager; }

    postConfig() {
        this.component = this.componentFactory.create(Button);
        nuttin2cCore_v1.CanvasStyles.enableStyle(Button.name);
        if (this.iconClass) {
            this.component.get("button").addChild(nuttin2cCore_v1.HTML.i("", this.iconClass));
        }
        if (this.label) {
            this.component.get("button").addChild(this.label);
        }

        nuttin2cCore_v1.StyleSelectorAccessor.from(this.component.get("button"))
            .enable("button")
            .enable(this.buttonSize)
            .enable(this.buttonType);

        this.component.get("button").listenTo("click", (event) => {
            this.eventManager.trigger(Button.EVENT_CLICKED, event);
        }, this);
    }

    /**
     * 
     * @param {Method} method 
     */
    withClickListener(method) {
        this.component.get("button").listenTo("click", method);
        return this;
    }

    enableLoading() {
        nuttin2cCore_v1.StyleSelectorAccessor.from(this.component.get("spinnerContainer"))
            .disable(Button.SPINNER_HIDDEN)
            .enable(Button.SPINNER_VISIBLE);
    }

    disableLoading() {
        nuttin2cCore_v1.StyleSelectorAccessor.from(this.component.get("spinnerContainer"))
            .disable(Button.SPINNER_VISIBLE)
            .enable(Button.SPINNER_HIDDEN);
    }

    disable() {
        this.component.get("button").setAttributeValue("disabled","true");
    }

    enable() {
        this.component.get("button").removeAttribute("disabled");
    }
}

mindi_v1.TypeConfigPack.instance().addTypeConfig("nuttin2c-ui", mindi_v1.PrototypeConfig.unnamed(Button));

class ToolBar {

    constructor() {

        /** @type {InlineComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(nuttin2cCore_v1.InlineComponentFactory);

        /** @type {Component} */
        this.component = null;

        /** @type {EventManager} */
        this.eventManager = new nuttin2cCore_v1.EventManager();

		/** @type {Provider<Button>} */
		this.buttonProvider = mindi_v1.InjectionPoint.provider(Button);

        /** @type {Array<Button>} */
        this.buttons = [];

        /** @type {Number} */
        this.fillIndex = null;
    }

	async postConfig() {
		this.component = this.componentFactory.create(ToolBar);
		nuttin2cCore_v1.CanvasStyles.enableStyle(ToolBar.name);
	}

    /**
     * @param {Number} fillIndex The index of the button that should be followed by a fill element. Starting with 0
     */
    setFillIndex(fillIndex) {
        this.fillIndex = fillIndex;
    }

    /**
     * @param {String} label 
     * @param {String} type E.g. Button.TYPE_PRIMARY
     * @returns {Button}
     */
    async addButton(label, type = Button.TYPE_PRIMARY) {
        const button = await this.buttonProvider.get([label, type]);

        if (this.buttons.length > 0) {
            /** @type {SimpleElement} */
            const spacerDiv = nuttin2cCore_v1.HTML.custom("div");
            const style = this.buttons.length-1 === this.fillIndex ? "tool-bar-fill" : "tool-bar-space";
            spacerDiv.setAttributeValue("class", style);
            this.component.addChild("buttonContainer", spacerDiv);
        }

        /** @type {SimpleElement} */
        const buttonDiv = nuttin2cCore_v1.HTML.custom("div");
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
        return nuttin2cCore_v1.Css3StylesheetBuilder.create(stylesheetBuilder)
                
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

mindi_v1.TypeConfigPack.instance().addTypeConfig("nuttin2c-ui", mindi_v1.PrototypeConfig.unnamed(ToolBar));

new coreutil_v1.Logger("RadioToggleIcon");

class RadioToggleIcon {
    
    static EVENT_ENABLED = CommonEvents.ENABLED;
    static EVENT_DISABLED = CommonEvents.DISABLED;
    static EVENT_CHANGED = CommonEvents.CHANGED;

    /**
     * @param {object} model
     */
    constructor(name = "?", model = null, icon = "fas fa-question", label = null) {

        /** @type {InlineComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(nuttin2cCore_v1.InlineComponentFactory);

        /** @type {EventManager} */
        this.events = new nuttin2cCore_v1.EventManager();

        /** @type {Component} */
        this.component = null;

        /** @type {object} */
        this.model = model;

        /** @type {string} */
        this.name = name;

        /** @type {string} */
        this.icon = icon;

        /** @type {string} */
        this.label = label;

        /** @type {boolean} */
        this.checked = false;
    }

    /**
     * 
     * @param {StylesheetBuilder} stylesheetBuilder 
     * @returns {Stylesheet}
     */
    static buildStylesheet(stylesheetBuilder) {
        stylesheetBuilder
            .selector(".radio-toggle-icon-container")
            .open()
                .style("display", "inline-block")
                .style("border-radius", "50%")
                .style("background-color", "transparent")
                .style("transition", "background-color 0.3s")
                .style("text-align", "center")
                .style("align-items", "center")
            .close()

            .selector(".radio-toggle-icon-radio")
            .open()
                .style("opacity", "0")
                .style("position", "absolute")
                .style("cursor", "pointer")
            .close()

            .selector(".radio-toggle-icon-label")
            .open()
                .style("cursor", "pointer")
                .style("border-radius", "5px")
                .style("transition", "all 0.3s ease")
                .style("font-size", "20pt")
            .close()

            .selector(".radio-toggle-icon-container input[type='radio']:not(:is(:checked)) + label")
            .open()
                .style("color", "lightgray")
            .close()

            .selector(".radio-toggle-icon-container input[type='radio']:not(:is(:checked)) + label:hover")
            .open()
                .style("color", "gray")
            .close()

            .selector(".radio-toggle-icon-container input[type='radio']:is(:checked) + label")
            .open()
                .style("color", "#2196F3")
            .close();
        return stylesheetBuilder.build();

    }

    /**
     * 
     * @param {ComponentBuilder} componentBuilder 
     * @returns {Component}
     */
    static buildComponent(componentBuilder) {
        return componentBuilder
            .root("span", "id=container", "class=radio-toggle-icon-container")
            .open()
                .node("input", "id=radio", "class=radio-toggle-icon-radio", "type=radio")
                .node("label", "id=label", "class=radio-toggle-icon-label")
                .open()
                    .node("i", "id=icon", "title=")
                .close()
            .close()
            .build();
    }

    postConfig() {
        this.component = this.componentFactory.create(RadioToggleIcon);
        nuttin2cCore_v1.CanvasStyles.enableStyle(RadioToggleIcon.name);

        const radio = this.getRadio();
        radio.setAttributeValue("name", this.name);
        radio.listenTo("click", this.clicked, this);

        const id = radio.getAttributeValue("id");

        const label = this.component.get("label");
        label.setAttributeValue("for", id);

        const icon = this.component.get("icon");
        icon.setAttributeValue("class", this.icon);

        if (this.model) {
            nuttin2cCore_v1.InputElementDataBinding.link(this.model).to(radio);
        }

    }

    /**
     * 
     * @param {ContainerEvent} event 
     */
    clicked(event) {
        const oldValue = this.checked;
        this.checked = event.target.checked;

        if (oldValue !== this.checked) {
            this.events.trigger(RadioToggleIcon.EVENT_CHANGED, [event]);
        }

        if (this.checked) {
            this.events.trigger(RadioToggleIcon.EVENT_ENABLED, [event]);
        } else {
            this.events.trigger(RadioToggleIcon.EVENT_DISABLED, [event]);
        }
        
    }

    /**
     * Set the toggle state programmatically
     * @param {boolean} checked 
     * @param {boolean} silent
     */
    toggle(checked, silent = false) {
        if (this.checked === checked) {
            return; // No change
        }
        this.checked = checked;
        if (!this.component) {
            return;
        }
        if (!silent) {
            this.getRadio().containerElement.click();
            return;
        }
        if (checked) {
            this.getRadio().checked = true;
        } else {
            this.getRadio().checked = false;
        }
        this.refreshColors();
    }

    /** @returns {RadioInputElement} */
    getRadio() {
        return this.component.get("radio");
    }

    /**
     * Get the current toggle state
     * @returns {boolean}
     */
    isChecked() {
        return this.checked;
    }
}

mindi_v1.TypeConfigPack.instance().addTypeConfig("nuttin2c-ui", mindi_v1.PrototypeConfig.unnamed(RadioToggleIcon));

new coreutil_v1.Logger("ToggleIcon");

class ToggleIcon {

    static TYPE_PRIMARY = "toggleIcon-primary";
    static TYPE_SECONDARY = "toggleIcon-secondary";
    static TYPE_SUCCESS = "toggleIcon-success";
    static TYPE_INFO = "toggleIcon-info";
    static TYPE_WARNING = "toggleIcon-warning";
    static TYPE_DANGER = "toggleIcon-danger";
    static TYPE_LIGHT = "toggleIcon-light";
    static TYPE_DARK = "toggleIcon-dark";

    static SIZE_MEDIUM = "toggleIcon-medium";
    static SIZE_LARGE = "toggleIcon-large";

    static SPINNER_VISIBLE = "toggleIcon-spinner-container-visible";
    static SPINNER_HIDDEN = "toggleIcon-spinner-container-hidden";

    static EVENT_ENABLED = CommonEvents.ENABLED;
    static EVENT_DISABLED = CommonEvents.DISABLED

    /**
     * 
     * @param {String} name
     * @param {Object} model
     * @param {String} label
     * @param {Boolean} checked
     */
    constructor(name = "?", model = null, label = null, checked = false) {

        /** @type {InlineComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(nuttin2cCore_v1.InlineComponentFactory);

        /** @type {Component} */
        this.component = null;

        /** @type {object} */
        this.model = model;

        /** @type {boolean} */
        this.checked = checked;

        /** @type {string} */
        this.name = name;

        /** @type {String} */
        this.label = label;

        /** @type {string} */
        this.enabledIcon = "fas fa-circle-check";

        /** @type {string} */
        this.disabledIcon = "fas fa-circle";

        /** @type {string} */
        this.disabledColor = "lightgray";

        /** @type {string} */
        this.enabledColor = "#2196F3";

        /** @type {string} */
        this.hoverColor = "gray";

        /** @type {EventManager} */
        this.events = new nuttin2cCore_v1.EventManager();
    }

    /**
     * 
     * @param {StylesheetBuilder} stylesheetBuilder 
     * @returns {Stylesheet}
     */
    static buildStylesheet(stylesheetBuilder) {
        stylesheetBuilder
            .selector(".toggle-icon-container")
            .open()
                .style("display", "inline-block")
                .style("border-radius", "50%")
                .style("background-color", "transparent")
                .style("transition", "background-color 0.3s")
                .style("text-align", "center")
                .style("align-items", "center")
            .close()

            .selector(".toggle-icon-radio")
            .open()
                .style("opacity", "0")
                .style("position", "absolute")
                .style("cursor", "pointer")
            .close()

            .selector(".toggle-icon-label")
            .open()
                .style("cursor", "pointer")
                .style("border-radius", "5px")
                .style("transition", "all 0.3s ease")
                .style("font-size", "20pt")
            .close();

        return stylesheetBuilder.build();
    }

    /**
     * 
     * @param {ComponentBuilder} componentBuilder 
     * @return {Component}
     */
    static buildComponent(componentBuilder) {
        return componentBuilder
            .root("span", "id=container", "class=toggle-icon-container")
            .open()
                .node("input", "id=checkbox", "class=toggle-icon-radio", "type=checkbox")
                .node("label", "id=label", "class=toggle-icon-label")
                .open()
                    .node("i", "id=icon", "title=")
                .close()
            .close()
            .build();
    }

    postConfig() {
        this.component = this.componentFactory.create(ToggleIcon);
        nuttin2cCore_v1.CanvasStyles.enableStyle(ToggleIcon.name);

        const checkbox = this.getCheckbox();
        checkbox.setAttributeValue("name", this.name);
        checkbox.listenTo("change", this.changed, this);
        if (this.checked) {
            checkbox.setAttributeValue("checked", "checked");
        }

        const container = this.component.get("container");
        container.listenTo("mouseover", this.enableHover, this);
        container.listenTo("mouseout", this.disableHover, this);

        const id = checkbox.getAttributeValue("id");

        const label = this.component.get("label");
        label.setAttributeValue("for", id);

        this.refreshColors();

    }

    async refreshColors() {
        if (this.checked) {
            this.applyIcon(this.enabledIcon);
            this.applyColor(this.enabledColor);
            
        } else {
            this.applyIcon(this.disabledIcon);
            this.applyColor(this.disabledColor);
        }
    }

    loadIcons(disabledIcon, enabledIcon) {
        this.disabledIcon = disabledIcon;
        this.enabledIcon = enabledIcon;
        this.checked ? this.applyIcon(this.enabledIcon) : this.applyIcon(this.disabledIcon);
    }

    loadColors(disabled, checked, hover) {
        this.disabledColor = disabled;
        this.enabledColor = checked;
        this.hoverColor = hover;
        this.checked ? this.applyColor(this.enabledColor) : this.applyColor(this.disabledColor);
    }

    /**
     * 
     * @param {Method} method 
     */
    withClickListener(method) {
        this.getCheckbox().listenTo("click", method);
        return this;
    }

    /**
     * Set the toggle state programmatically
     * @param {boolean} checked 
     * @param {boolean} silent
     */
    toggle(checked, silent = false) {
        if (this.checked === checked) {
            return; // No change
        }
        this.checked = checked;
        if (!this.component) {
            return;
        }
        if (!silent) {
            this.getCheckbox().containerElement.click();
            return;
        }
        if (checked) {
            this.getCheckbox().checked = true;
        } else {
            this.getCheckbox().checked = false;
        }
        this.refreshColors();
    }

    /**
     * 
     * @returns {CheckboxInputElement}
     */
    getCheckbox() {
        return this.component.get("checkbox");
    }

    /**
     * @param {ContainerEvent} event 
     * @returns 
     */
    changed(event) {
        this.checked = event.target.checked;

        this.refreshColors();

        if (this.checked) {
            this.events.trigger(ToggleIcon.EVENT_ENABLED, event);
            return;
        }
        
        this.events.trigger(ToggleIcon.EVENT_DISABLED, event);
    }

    applyColor(color) {
        const container = this.component.get("container");
        container.setAttributeValue("style", "color: " + color);
    }

    applyIcon(icon) {
        const iconElement = this.component.get("icon");
        iconElement.setAttributeValue("class", icon);
    }

    enableHover() {
        const container = this.component.get("container");
        if (!this.checked) {
            container.setAttributeValue("style", "color: " + this.hoverColor);
        }
    }

    disableHover() {
        const container = this.component.get("container");
        if (this.checked) {
            container.setAttributeValue("style", "color: " + this.enabledColor);
        } else {
            container.setAttributeValue("style", "color: " + this.disabledColor);
        }
    }
}

mindi_v1.TypeConfigPack.instance().addTypeConfig("nuttin2c-ui", mindi_v1.PrototypeConfig.unnamed(ToggleIcon));

const LOG$1 = new coreutil_v1.Logger("TreePanelEntry");

class TreePanelEntry {

	static RECORD_ELEMENT_REQUESTED = "recordElementRequested";
	static BEFORE_LOAD_ELEMENT_REQUESTED = "beforeLoadElementRequested";
	static SUB_RECORDS_STATE_UPDATE_REQUESTED = "subRecordsStateUpdateRequested";
	static EVENT_EXPAND_TOGGLE_OVERRIDE = "expandToggleOverride";

    constructor(record = null) {

		/** @type {InlineComponentFactory} */
		this.componentFactory = mindi_v1.InjectionPoint.instance(nuttin2cCore_v1.InlineComponentFactory);

		/** @type {Component} */
		this.component = null;

		/** @type {Provider<Panel>} */
		this.panelProvider = mindi_v1.InjectionPoint.provider(Panel);

		/** @type {EventManager} */
		this.eventManager = new nuttin2cCore_v1.EventManager();

        /** @type {StateManager<any[]>} */
        this.arrayState = new nuttin2cCore_v1.StateManager();

		/** @type {Provider<TreePanelEntry>} */
		this.treePanelEntryProvider = mindi_v1.InjectionPoint.provider(TreePanelEntry);

		/** @type {ToggleIcon} */
		this.expandToggle = mindi_v1.InjectionPoint.instance(ToggleIcon);

		/** @type {BannerLabel} */
		this.bannerLabel = mindi_v1.InjectionPoint.instance(BannerLabel);

        /** @type {any} */
        this.record = record;
    }

	/**
	 * 
	 * @param {ComponentBuilder} componentBuilder 
	 * @returns {Component}
	 */
	static buildComponent(componentBuilder) {
		return componentBuilder
			.root("div", "id=root", "style=--width-1:10pt", "class=cntr cntr-rows cntr-prevent-size-change cntr-gap-small")
			.open()
				.node("div", "id=recordElementContainer", "class=cntr cntr-columns cntr-grow-only cntr-gap-small cntr-centered")
				.open()
					.node("div", "id=expandButton", "class=cntr-override-prevent-size-change")
					.node("div", "class=cntr-override-shrink-only spinner-container-hidden", "id=spinner")
					.open()
						.node("div", "class=spinner")
					.close()
					.node("div", "id=recordElement")
				.close()

				.node("div", "id=messageContainer", "class=cntr cntr-columns cntr-grow-only cntr-gap-small cntr-centered hidden")
				.open()
					.node("div", "id=messageIndent", "class=cntr-override-prevent-size-change width-1")
					.node("div", "id=message", "class=cntr-gap-small")
				.close()

				.node("div", "id=buttonsContainer", "class=cntr cntr-columns cntr-grow-only cntr-gap-small cntr-centered hidden")
				.open()
					.node("div", "id=buttonsIndent", "class=cntr-override-prevent-size-change width-1")
					.node("div", "id=buttons", "class=cntr-gap-small")
				.close()

				.node("div", "id=subrecordElementsContainer", "class=cntr cntr-columns cntr-grow-only cntr-gap-small cntr-centered hidden")
				.open()
					.node("div", "id=subrecordIndent", "class=cntr-override-prevent-size-change width-1")
					.node("div", "id=subrecordElements", "class=cntr cntr-rows cntr-gap-small")
				.close()
			.close()
			.build();
	}

    async postConfig() {
		this.component = this.componentFactory.create(TreePanelEntry);

		this.expandToggle.events.listenTo(RadioToggleIcon.EVENT_ENABLED, this.loadSubRecordsClicked, this);
		this.expandToggle.events.listenTo(RadioToggleIcon.EVENT_DISABLED, this.hideSubRecordsClicked, this);

		this.component.setChild("expandButton", this.expandToggle.component);

		this.bannerLabel.events.listenTo(BannerLabel.EVENT_HIDDEN, this.hideMessage, this);

		this.component.setChild("message", this.bannerLabel.component);

        this.arrayState.react(
			new coreutil_v1.Method(this.handleDomainChange, this),
			new coreutil_v1.Method(this.handleErrorChange,this));

    }

	async enableBorder() {
		nuttin2cCore_v1.StyleSelectorAccessor.from(this.component.get("root")).enable("cntr-round-bordered");
	}

	/**
	 * @returns { EventManager }
	 */
	get events() { return this.eventManager; }

    /**
     * @param {Object} object 
     */
    async handleDomainChange(object) {
		if (object instanceof Array) {

			this.component.clearChildren("subrecordElements");
			this.toggleChildElements(true);
			this.toggleSpinner(true);
			object.forEach(async (record) => {
				this.component.addChild("subrecordElements", await this.createSubEntry(record));
			});
		}
		this.toggleSpinner(false);
    }

	handleErrorChange(error) {
		this.toggleErrorMode(error);
	}

	async toggleErrorMode(error) {
		if (error) {
			this.bannerLabel.showError(error.message);
			nuttin2cCore_v1.StyleSelectorAccessor.from(this.component.get("messageContainer")).disable("hidden");
			await this.toggleSpinner(false);
			await this.hideSubRecords();
			this.expandToggle.toggle(false, true);
			return;
		}
		this.bannerLabel.hide();
		await this.hideMessage();
	}

	async hideMessage() {
		nuttin2cCore_v1.StyleSelectorAccessor.from(this.component.get("messageContainer")).enable("hidden");
	}

    /**
     * @param {any} record 
	 * @returns {SimpleElement}
     */
    async createSubEntry(record) {
		const treePanelSubEntry = await this.treePanelEntryProvider.get([record]);
		const recordElement = await this.eventManager.trigger(TreePanelEntry.RECORD_ELEMENT_REQUESTED, [null, record, treePanelSubEntry, this]);
        
		if (!recordElement) {
			return;
		}

		treePanelSubEntry.component.setChild("recordElement", recordElement.component);

		await this.eventManager
			.trigger(TreePanelEntry.EVENT_EXPAND_TOGGLE_OVERRIDE, [null, treePanelSubEntry, record]);

		treePanelSubEntry.events
			.listenTo(TreePanelEntry.RECORD_ELEMENT_REQUESTED, this.entryRequested, this);

		treePanelSubEntry.events
			.listenTo(TreePanelEntry.EVENT_EXPAND_TOGGLE_OVERRIDE, this.expandToggleOverride, this);

		treePanelSubEntry.events
			.listenTo(TreePanelEntry.SUB_RECORDS_STATE_UPDATE_REQUESTED, this.subRecordsUpdateRequested, this);

		return treePanelSubEntry.component;
    }

	/**
	 * @param {ContainerEvent} event 
	 * @param {TreePanelEntry} treePanelEntry
	 * @param {any} record
	 */
	async entryRequested(event, record, treePanelEntry, parentTreePanelEntry) {
		try {
			return await this.events.trigger(TreePanelEntry.RECORD_ELEMENT_REQUESTED, [event, record, treePanelEntry, parentTreePanelEntry]);
		} catch (error) {
			LOG$1.error(error);
		}
	}

	/**
	 * @param {ContainerEvent} event 
	 * @param {TreePanelEntry} treePanelEntry
	 * @param {any} record
	 */
	async expandToggleOverride(event, treePanelEntry, record) {
		try {
			return await this.events.trigger(TreePanelEntry.EVENT_EXPAND_TOGGLE_OVERRIDE, [event, treePanelEntry, record]);
		} catch (error) {
			LOG$1.error(error);
		}
	}

	async reloadSubRecords() {
		const elementButtonsContainer = await this.component.get("buttons");
		await this.subRecordsUpdateRequested(null, this.record, this.arrayState, elementButtonsContainer);
	}

	/**
	 * @param {ContainerEvent} event 
	 * @param {any} record
	 * @param {StateManager<any[]>} stateManager
	 * @param {SimpleElement} elementButtonsContainer
	 */
	async subRecordsUpdateRequested(event, record, stateManager, elementButtonsContainer) {
		await this.events
			.trigger(TreePanelEntry.SUB_RECORDS_STATE_UPDATE_REQUESTED, [event, record, stateManager, elementButtonsContainer]);
	}

	/**
	 * @param {Boolean} visible 
	 */
	async toggleSpinner(visible) {
		if (visible) {
			nuttin2cCore_v1.StyleSelectorAccessor.from(this.component.get("spinner")).disable("spinner-container-hidden");
			nuttin2cCore_v1.StyleSelectorAccessor.from(this.component.get("spinner")).enable("spinner-container-visible");
			return;
		}
		nuttin2cCore_v1.StyleSelectorAccessor.from(this.component.get("spinner")).enable("spinner-container-hidden");
		nuttin2cCore_v1.StyleSelectorAccessor.from(this.component.get("spinner")).disable("spinner-container-visible");
	}

	/**
	 * @param {Boolean} visible 
	 */
	async toggleChildElements(visible) {
		if (visible) {
			nuttin2cCore_v1.StyleSelectorAccessor.from(this.component.get("subrecordElementsContainer")).disable("hidden");
			return;
		}
		nuttin2cCore_v1.StyleSelectorAccessor.from(this.component.get("subrecordElementsContainer")).enable("hidden");
	}

	/**
	 * 
	 * @param {Boolean} visible 
	 */
	async toggleButtons(visible) {
		if (visible) {
			nuttin2cCore_v1.StyleSelectorAccessor.from(this.component.get("buttonsContainer")).disable("hidden");
			return;
		}
		nuttin2cCore_v1.StyleSelectorAccessor.from(this.component.get("buttonsContainer")).enable("hidden");
	}

	/**
	 * @param {ContainerEvent} event 
	 */
    async loadSubRecordsClicked(event) {
		this.toggleChildElements(true);
		this.toggleSpinner(true);

		const elementButtonsContainer = await this.component.get("buttons");

		await this.eventManager
			.trigger(TreePanelEntry.SUB_RECORDS_STATE_UPDATE_REQUESTED, [event, this.record, this.arrayState, elementButtonsContainer]);

		if (elementButtonsContainer.containerElement.firstChild) {
			await this.toggleButtons(true);
		}
    }

	/**
	 * @param {ContainerEvent} event 
	 */
    async hideSubRecordsClicked(event) {
		await this.hideSubRecords();
    }

	async hideSubRecords() {
		await this.toggleChildElements(false);
		await this.toggleSpinner(false);
		await this.toggleButtons(false);
        this.component.get("subrecordElements").clear();
		this.component.get("buttons").clear();
	}

}

mindi_v1.TypeConfigPack.instance().addTypeConfig("nuttin2c-ui", mindi_v1.PrototypeConfig.unnamed(TreePanelEntry));

const LOG = new coreutil_v1.Logger("TreePanel");

class TreePanel {

	static EVENT_REFRESH_CLICKED = "refreshClicked";
	static RECORD_ELEMENT_REQUESTED = "recordElementRequested";
	static BEFORE_LOAD_ELEMENT_REQUESTED = "beforeLoadElementRequested";
	static SUB_RECORDS_STATE_UPDATE_REQUESTED = "subRecordsStateUpdateRequested";
	static EVENT_EXPAND_TOGGLE_OVERRIDE = "expandToggleOverride";

	/**
	 * 
	 * @param {Panel} buttonPanel 
	 */
	constructor(buttonPanel = null) {

		/** @type {InlineComponentFactory} */
		this.componentFactory = mindi_v1.InjectionPoint.instance(nuttin2cCore_v1.InlineComponentFactory);
		
		/** @type {Component} */
		this.component = null;

		/** @type {EventManager} */
		this.eventManager = new nuttin2cCore_v1.EventManager();

		/** @type {Provider<TreePanelEntry>} */
		this.treePanelEntryProvier = mindi_v1.InjectionPoint.provider(TreePanelEntry);

		/** @type {TreePanelEntry} */
		this.treePanelEntry = null;

		/** @type {Panel} */
		this.buttonPanel = buttonPanel;

	}

	/**
	 * 
	 * @param {ComponentBuilder} componentBuilder 
	 * @returns {Component}
	 */
	static buildComponent(componentBuilder) {
		return componentBuilder
			.root("div", "class=cntr cntr-gap-medium cntr-rows cntr-prevent-size-change padding-small")
			.open()
				.node("div", "id=buttonPanel")
				.node("div", "id=rootElement", "class=cntr-override-grow-only cntr cntr-rows cntr-gap-small")
			.close()
			.build();
	}

	async postConfig() {
		this.component = this.componentFactory.create(TreePanel);

		if (this.buttonPanel) {
			this.component.setChild("buttonPanel", this.buttonPanel.component);
		}

		this.treePanelEntry = await this.treePanelEntryProvier.get();
		this.treePanelEntry.events
			.listenTo(TreePanelEntry.RECORD_ELEMENT_REQUESTED, this.entryRequested, this)
			.listenTo(TreePanelEntry.EVENT_EXPAND_TOGGLE_OVERRIDE, this.expandToggleOverride, this)
			.listenTo(TreePanelEntry.SUB_RECORDS_STATE_UPDATE_REQUESTED, this.subRecordsUpdateRequested, this);
		this.treePanelEntry.toggleSpinner(true);
		// Root element has no record
		this.treePanelEntry.component.get("subrecordIndent").remove();
		this.treePanelEntry.component.get("messageIndent").remove();
		this.treePanelEntry.component.get("recordElementContainer").remove();

	}

	/**
	 * @type { EventManager }
	 */
	get events() { return this.eventManager; }

	/**
	 * Called by the root TreePanelEntry when it's or one of it's subordinate elements need to be rendered
	 * 
	 * @param {ContainerEvent} event 
	 * @param {TreePanelEntry} treePanelEntry
	 * @param {any} record
	 */
	async entryRequested(event, record, treePanelEntry, parentTreePanelEntry) {
		try {

			/** @type {any} */
			const panel = await this.events
				.trigger(TreePanel.RECORD_ELEMENT_REQUESTED, [event, record, treePanelEntry, parentTreePanelEntry]);

			return panel;
		} catch (error) {
			LOG.error(error);
		}
	}

	/**
	 * Called by the root TreePanelEntry it asks for the expand toggle to be overridden
	 * 
	 * @param {ContainerEvent} event 
	 * @param {TreePanelEntry} treePanelEntry
	 * @param {any} record
	 */
	async expandToggleOverride(event, treePanelEntry, record) {
		try {
			await this.events
				.trigger(TreePanel.EVENT_EXPAND_TOGGLE_OVERRIDE, [treePanelEntry.expandToggle, record]);

		} catch (error) {
			LOG.error(error);
		}
	}

	/**
	 * Called by the root TreePanelEntry when it's or one of it's subordinate elements need the state of the subrecords to be updated,
	 * for example when the expand button is clicked
	 * 
	 * @param {ContainerEvent} event 
	 * @param {any} record
	 * @param {StateManager<any[]>} stateManager
	 * @param {SimpleElement} elementButtonsContainer
	 * @returns {Promise<TreePanelEntry[]>}
	 */
	async subRecordsUpdateRequested(event, record, stateManager, elementButtonsContainer) {
		this.treePanelEntry.toggleChildElements(true);
		await this.events
			.trigger(TreePanel.SUB_RECORDS_STATE_UPDATE_REQUESTED, [event, record, stateManager, elementButtonsContainer]);
	}

	/**
	 * Reset
	 * 
	 * @param {ContainerEvent} event 
	 */
	async reset(event) {
		this.subRecordsUpdateRequested(event, null, this.treePanelEntry.arrayState);
		this.component.setChild("rootElement", this.treePanelEntry.component);
	}
}

mindi_v1.TypeConfigPack.instance().addTypeConfig("nuttin2c-ui", mindi_v1.PrototypeConfig.unnamed(TreePanel));

new coreutil_v1.Logger("CheckBox");

class CheckBox {

    /**
     * 
     * @param {string} name 
     * @param {object} model
     */
    constructor(name, model = null) {
        
        /** @type {InlineComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(nuttin2cCore_v1.InlineComponentFactory);

        /** @type {Component} */
        this.component = null;

        /** @type {string} */
        this.name = name;

        /** @type {object} */
        this.model = model;

    }

    /**
     * 
     * @param {StylesheetBuilder} stylesheetBuilder 
     * @returns {Stylesheet}
     */
    static buildStylesheet(stylesheetBuilder) {
        stylesheetBuilder
            .selector(".check-box")
            .open()
                .style("display","block")
                .style("position","relative")
                .style("padding-left","2em")
                .style("margin-bottom","0.5em")
                .style("cursor","pointer")
                .style("-webkit-user-select","none")
                .style("-moz-user-select","none")
                .style("-ms-user-select","none")
                .style("user-select","none")
                .style("margin-bottom","1rem")
            .close()

            .selector(".check-box input")
            .open()
                .style("position","absolute")
                .style("opacity","0")
                .style("cursor","pointer")
                .style("height","0")
                .style("width","0")
            .close()

            .selector(".check-box-mark")
            .open()
                .style("position","absolute")
                .style("top","0")
                .style("left","0")
                .style("width","calc(1em + 0.5rem + 2px)")
                .style("height","calc(1em + 0.5rem + 2px)")
                .style("background-color","#eee")
            .close()

            .selector(".check-box:hover input ~ .check-box-mark")
            .open()
                .style("background-color","#ccc")
            .close()

            .selector(".check-box input:checked ~ .check-box-mark")
            .open()
                .style("background-color","#2196F3")
            .close()

            .selector(".check-box-mark:after")
            .open()
                .style("content","\"\"")
                .style("position","absolute")
                .style("display","none")
            .close()

            .selector(".check-box input:checked ~ .check-box-mark:after")
            .open()
                .style("display","block")
            .close()

            .selector(".check-box .check-box-mark:after")
            .open()
                .style("left","0.5em")
                .style("top","0.4em")
                .style("width","0.6em")
                .style("height","0.6em")
                .style("border","solid white")
                .style("border-width","0 3px 3px 0")
                .style("-webkit-transform","rotate(45deg)")
                .style("-ms-transform","rotate(45deg)")
                .style("transform","rotate(45deg)")
            .close();

        return stylesheetBuilder.build();
    }

    /**
     * 
     * @param {ComponentBuilder} componentBuilder 
     * @returns {Component}
     */
    static buildComponent(componentBuilder) {
       componentBuilder
            .root("label", "id=check-box", "class=check-box")
            .open()
                .node("input", "id=checkBox", "type=checkbox")
                .node("span", "class=check-box-mark")
                .text(" Stay logged in")
            .close();
        return componentBuilder.build();
    }

    postConfig() {
        this.component = this.componentFactory.create(CheckBox);
        nuttin2cCore_v1.CanvasStyles.enableStyle(CheckBox.name);
        this.component.get("checkBox").setAttributeValue("name",this.name);

        if(this.model) {
            nuttin2cCore_v1.InputElementDataBinding.link(this.model).to(this.component.get("checkBox"));
        }
    }

}

mindi_v1.TypeConfigPack.instance().addTypeConfig("nuttin2c-ui", mindi_v1.PrototypeConfig.unnamed(CheckBox));

new coreutil_v1.Logger("ExpandChevron");

class ExpandChevron {
    
    static EVENT_ENABLED = CommonEvents.ENABLED;
    static EVENT_DISABLED = CommonEvents.DISABLED;
    static EVENT_CHANGED = CommonEvents.CHANGED;

    /**
     * 
     * @param {object} model
     * @param {string} size
     */
    constructor(model = null, size = "medium") {
        
        /** @type {InlineComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(nuttin2cCore_v1.InlineComponentFactory);

        /** @type {EventManager} */
        this.events = new nuttin2cCore_v1.EventManager();

        /** @type {Component} */
        this.component = null;

        /** @type {object} */
        this.model = model;

        /** @type {boolean} */
        this.expanded = false;

        /** @type {string} */
        this.size = size;

    }

    /**
     * 
     * @param {StylesheetBuilder} stylesheetBuilder 
     * @returns {Stylesheet}
     */
    static buildStylesheet(stylesheetBuilder) {
        const css3StylesheetBuilder = nuttin2cCore_v1.Css3StylesheetBuilder.create(stylesheetBuilder);
        css3StylesheetBuilder

            .selector(".expand-chevron")
                .cursor("pointer")

            .selector(".expand-chevron input")
                .opacity("0")
                .width("0")
                .height("0")

            .selector(".expand-chevron-icon")
                .transition(["transform", ".4s"])
                .transform("rotate(0deg) translateX(0)")

            .selector(".expand-chevron-icon-small")
                .fontSize("1em")
                
            .selector(".expand-chevron-icon-medium")
                .fontSize("1.4em")

            .selector(".expand-chevron-icon-large")
                .fontSize("2em")

            .selector(".expand-chevron input:checked + .expand-chevron-icon")
                .transition(["transform", ".4s"])
                .transform("rotate(90deg) translateX(0)")

            .selector(".expand-chevron input:disabled + .expand-chevron-icon")
                .opacity("0.6");

        return css3StylesheetBuilder.build();
    }

    /**
     * 
     * @param {ComponentBuilder} conmponentBuilder 
     * @returns {Component}
     */
    static buildComponent(conmponentBuilder) {
        return conmponentBuilder
            .root("label", "class=cntr cntr-columns cntr-centered expand-chevron")
            .open()
                .node("input", "id=checkbox", "type=checkbox")
                .node("i", "id=icon", "class=expand-chevron-icon fas fa-chevron-right")
            .close()
            .build();
    }

    postConfig() {
        this.component = this.componentFactory.create(ExpandChevron);
        nuttin2cCore_v1.CanvasStyles.enableStyle(ExpandChevron.name);

        if (this.model) {
            nuttin2cCore_v1.InputElementDataBinding.link(this.model).to(this.component.get("checkbox"));
        }

        nuttin2cCore_v1.StyleSelectorAccessor.from(this.component.get("icon")).enable(`expand-chevron-icon-${this.size}`);
        
        this.component.get("checkbox").listenTo("change", this.clicked, this);
    }

    /**
     * 
     * @param {ContainerEvent} event 
     */
    clicked(event) {
        event.stopPropagation();
        const oldValue = this.expanded;
        this.expanded = event.target.checked;

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

mindi_v1.TypeConfigPack.instance().addTypeConfig("nuttin2c-ui", mindi_v1.PrototypeConfig.unnamed(ExpandChevron));

new coreutil_v1.Logger("EmailInput");

class EmailInput extends CommonInput {

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
            new nuttin2cCore_v1.EmailValidator(mandatory, !mandatory),
            label,
            "Invalid email address");
    }

    /**
     * @param {StylesheetBuilder} stylesheetBuilder 
     * @returns {Stylesheet}
     */
    static buildStylesheet(stylesheetBuilder) {
        nuttin2cCore_v1.Css3StylesheetBuilder.create(stylesheetBuilder)
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

mindi_v1.TypeConfigPack.instance().addTypeConfig("nuttin2c-ui", mindi_v1.PrototypeConfig.unnamed(EmailInput));

class FileUploadEntry {
    
    static EVENT_REMOVE_CLICKED = "removeClicked";

    /**
     * 
     * @param {ContainerFileData} file 
     */
    constructor(file) {

        /** @type {InlineComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(nuttin2cCore_v1.InlineComponentFactory);
        
        /** @type {EventManager} */
        this.events = new nuttin2cCore_v1.EventManager();
        
        /** @type {Component} */
        this.component = null;
        
        /** @type {ContainerFileData} */
        this.file = file;
        
        /** @type {string} */
        this.fileName = file.name;
        
        /** @type {number} */
        this.fileSize = file.size;
        
        /** @type {string} */
        this.fileType = file.type;
    }
    
    /**
     * 
     * @param {StylesheetBuilder} stylesheetBuilder 
     * @returns {Stylesheet}
     */
    static buildStylesheet(stylesheetBuilder) {
       stylesheetBuilder
            .selector(".file-upload-entry")
            .open()
                .style("border-top", "1px solid #ddd")
                .style("padding-top", "5pt")
                .style("margin-top", "10pt")
            .close()

            .selector(".file-upload-entry-details")
            .open()
                .style("display", "flex")
                .style("flex-direction", "row")
                .style("align-items", "center")
                .style("margin-bottom", "8px")
            .close()

            .selector(".file-upload-entry-details-name")
            .open()
                .style("flex", "1")
                .style("font-weight", "500")
                .style("margin-right", "12px")
            .close()

            .selector(".file-upload-entry-details-type")
            .open()
                .style("flex", "0 0 auto")
                .style("color", "#666")
                .style("font-size", "0.9em")
                .style("margin-right", "12px")
            .close()

            .selector(".file-upload-entry-remove")
            .open()
                .style("flex", "0 0 auto")
                .style("margin-left", "auto")
                .style("cursor", "pointer")
                .style("color", "gray")
                .style("padding", "4px")
                .style("border-radius", "4px")
                .style("transition", "background-color 0.2s")
            .close()

            .selector(".file-upload-entry-remove:hover")
            .open()
                .style("background-color", "#f8f9fa")
            .close()

            .selector(".file-upload-entry-progress")
            .open()
                .style("display", "flex")
                .style("flex-direction", "row")
                .style("align-items", "center")
                .style("gap", "12px")
            .close()

            .selector(".file-upload-entry-progress-size")
            .open()
                .style("flex", "0 0 auto")
                .style("font-size", "0.9em")
                .style("color", "#666")
                .style("min-width", "80px")
            .close()

            .selector(".file-upload-entry-progress-bar")
            .open()
                .style("flex", "1")
                .style("height", "8px")
                .style("background-color", "#e9ecef")
                .style("border-radius", "4px")
                .style("overflow", "hidden")
                .style("position", "relative")
            .close()

            .selector(".file-upload-entry-progress-bar-fill")
            .open()
                .style("height", "100%")
                .style("background-color", "#28a745")
                .style("border-radius", "4px")
                .style("transition", "width 0.3s ease")
                .style("width", "0%")
            .close()

            .selector(".file-upload-entry-progress-status")
            .open()
                .style("flex", "0 0 auto")
                .style("font-size", "0.9em")
                .style("color", "#666")
                .style("min-width", "80px")
                .style("text-align", "right")
            .close();

        return stylesheetBuilder.build();
    }

    /**
     * 
     * @param {ComponentBuilder} componentBuilder 
     * @returns {Component}
     */
    static buildComponent(componentBuilder) {
        componentBuilder
            .root("div", "class=file-upload-entry")
            .open()
                .node("div", "class=file-upload-entry-details")
                .open()
                    .node("div", "id=fileName", "class=file-upload-entry-details-name")
                    .open()
                        .text("Filename")
                    .close()
                    .node("div", "id=fileType", "class=file-upload-entry-details-type")
                    .open()
                        .text("File Type")
                    .close()
                    .node("div", "id=removeButton", "class=file-upload-entry-remove")
                    .open()
                        .node("i", "class=fas fa-trash")
                    .close()
                .close()
                .node("div", "class=file-upload-entry-progress")
                .open()
                    .node("div", "id=fileSize", "class=file-upload-entry-progress-size")
                    .open()
                        .text("File Size")
                    .close()
                    .node("div", "class=file-upload-entry-progress-bar", "id=fileProgress")
                    .open()
                        .node("div", "class=file-upload-entry-progress-bar-fill", "id=fileProgressBar")
                    .close()
                    .node("div", "id=fileStatus", "class=file-upload-entry-progress-status")
                .close()
            .close();
        return componentBuilder.build();
    }

    async postConfig() {
        this.component = this.componentFactory.create(FileUploadEntry);
        nuttin2cCore_v1.CanvasStyles.enableStyle(FileUploadEntry.name);
        
        const fileNameElement = this.component.get("fileName");
        fileNameElement.setChild(this.fileName);
        
        const fileSizeElement = this.component.get("fileSize");
        fileSizeElement.setChild((this.fileSize / 1024).toFixed(2) + " KB");
        
        const fileTypeElement = this.component.get("fileType");
        fileTypeElement.setChild(this.fileType ? this.fileType : "Unknown");

        const removeButton = this.component.get("removeButton");
        removeButton.listenTo("click", this.removeCliked, this);

        this.updateProgress(this.file, this.file.name);

        
    }
    
    /**
     * 
     * @param {ContainerEvent} event 
     */
    removeCliked(event) {
        this.events.trigger(FileUploadEntry.EVENT_REMOVE_CLICKED, [event, this.file]);
    }

    /**
     * 
     * @param {ContainerFileData} file 
     * @param {string} key 
     */
    updateProgress(file, key) {
        if (file) {
            const progressBar = this.component.get("fileProgressBar");
            progressBar.setStyle("width", file.uploadPercentage + "%");
            if (file.uploadPercentage >= 100) {
                file.uploadComplete = true;
            }
        }
    }
}

mindi_v1.TypeConfigPack.instance().addTypeConfig("nuttin2c-ui", mindi_v1.PrototypeConfig.unnamed(FileUploadEntry));

new coreutil_v1.Logger("FileUpload");

class FileUpload {

	static DEFAULT_PLACEHOLDER = "FileUpload";

	static EVENT_CLICKED = CommonEvents.CLICKED;
    static EVENT_FILE_ADDED = "fileAdded";
    static EVENT_FILE_REMOVED = "fileRemoved";
    static EVENT_UPLOAD_COMPLETE = "uploadComplete";
    static EVENT_UPLOAD_RESET = "uploadReset";

    /**
     * 
     * @param {string} name 
     * @param {boolean} multiple
     * @param {Array<string>} fileTypeArray
     */
    constructor(name, multiple = false, fileTypeArray = []) {
        
        /** @type {InlineComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(nuttin2cCore_v1.InlineComponentFactory);

        /** @type {EventManager} */
        this.events = new nuttin2cCore_v1.EventManager();

        /** @type {Component} */
        this.component = null;

        /** @type {string} */
        this.name = name;

        /** @type {boolean} */
        this.multiple = multiple;
        
        /** @type {string[]} */
        this.fileTypeArray = fileTypeArray;

        /** @type {StateManager<ContainerFileData>}  */
        this.fileArrayState = new nuttin2cCore_v1.StateManager();

        /** @type {Provider<FileUploadEntry>} */
        this.fileUploadEntryProvider = mindi_v1.InjectionPoint.provider(FileUploadEntry);

    }

    /**
     * 
     * @param {StylesheetBuilder} stylesheetBuilder 
     * @returns {Stylesheet}
     */
    static buildStylesheet(stylesheetBuilder) {
       stylesheetBuilder
           .selector(".file-upload-error")
           .open()
                .style("width", "fit-content")
                .style("color", "#333333")
                .style("transform", "translate(+5px,-5px)")
                .style("background-color", "#FFFFE0")
                .style("font-weight", "normal")
                .style("font-size", "14px")
                .style("border-radius", "8px")
                .style("position", "relative")
                .style("z-index", "99999998")
                .style("box-sizing", "border-box")
                .style("box-shadow", "0 1px 8px rgba(0,0,0,0.5)")
                .style("cursor", "pointer")
           .close()

           .selector(".file-upload-error-hidden")
           .open()
                .style("transition", "max-height .3s .2s, padding .3s .2s, opacity .2s 0s, visibility 0s .2s")
                .style("opacity", "0")
                .style("padding", "0px 0px")
                .style("max-height", "0px")
                .style("display", "block")
                .style("visibility", "hidden")
           .close()

           .selector(".file-upload-error-visible")
           .open()
                .style("transition", "max-height .3s, padding .2s, opacity .2s .2s")
                .style("opacity", "1")
                .style("padding", "10px 20px")
                .style("max-height", "50px")
                .style("display", "block")
                .style("visibility", "visible")
                .style("margin-top", "10px")
           .close()

           .selector(".file-upload-error i")
           .open()
                .style("position", "absolute")
                .style("top", "100%")
                .style("left", "30%")
                .style("margin-left", "-15px")
                .style("width", "30px")
                .style("height", "15px")
                .style("overflow", "hidden")
           .close()

           .selector(".file-upload-box")
           .open()
                .style("border", "2px dashed #ced4da")
                .style("border-radius", "0.25rem")
                .style("padding", "1rem")
                .style("cursor", "pointer")
                .style("transition", "background-color 0.15s ease-in-out, border-color 0.15s ease-in-out")
                .style("margin-bottom", "15pt")
           .close()

           .selector(".file-upload-box-instructions")
           .open()
                .style("text-align", "center")
           .close()

           .selector(".file-upload-box-instructions-icon")
           .open()
                .style("width", "48px")
                .style("height", "48px")
                .style("margin", "0 auto 0 auto")
                .style("background-size", "contain")
                .style("background-repeat", "no-repeat")
                .style("background-position", "center")
                .style("color", "#e1e1e1")
                .style("font-size", "3rem")
           .close()

           .selector(".file-upload-box-instructions-text")
           .open()
                .style("font-size", "1rem")
                .style("color", "#6c757d")
           .close()

           .selector(".file-upload-box-dragover")
           .open()
                .style("background-color", "#e9ecef")
                .style("border-color", "#80bdff")
           .close()

           .selector(".file-upload-input")
           .open()
                .style("display", "none")
           .close()

           .selector(".file-upload-unsupported-file")
           .open()
                .style("color", "#dc3545")
                .style("font-size", "0.875rem")
                .style("padding", "0.25rem 0")
                .style("border-left", "3px solid #dc3545")
                .style("padding-left", "0.5rem")
                .style("margin-top", "0.50rem")
                .style("background-color", "#f8d7da")
                .style("border-radius", "0.25rem")
           .close();
         return stylesheetBuilder.build();
    }

    /**
     * 
     * @param {ComponentBuilder} componentBuilder 
     * @returns {Component}
     */
    static buildComponent(componentBuilder) {
        componentBuilder
            .root("div")
            .open()
                .node("div", "id=fileUploadError", "class=file-upload-error file-upload-error-hidden")
                .open()
                    .text("Invalid file-upload")
                    .node("i")
                .close()
                .node("div", "id=uploadBox", "class=file-upload-box")
                .open()
                    .node("div", "id=instructions", "class=file-upload-box-instructions")
                    .open()
                        .node("input", "id=fileInput", "type=file", "class=file-upload-input")
                        .node("div", "id=uploadBoxIcon", "class=fas fa-upload file-upload-box-instructions-icon")
                    .close()
                    .node("div", "id=unsupported")
                    .node("div", "id=fileList")
                .close()
            .close();
        return componentBuilder.build();
    }

    postConfig() {
        this.component = this.componentFactory.create(FileUpload);
        nuttin2cCore_v1.CanvasStyles.enableStyle(FileUpload.name);

        
        /** @type {SimpleElement} */
        const uploadBox = this.component.get("uploadBox");
        uploadBox.listenTo("dragover", this.dragOver, this);
        uploadBox.listenTo("dragleave", this.dragLeave, this);
        uploadBox.listenTo("drop", this.fileDropped, this);
        uploadBox.listenTo("click", this.fileInputClicked, this);

        if (this.multiple) {
            const fileInput = this.component.get("fileInput");
            fileInput.containerElement.setAttributeValue("multiple", "multiple");
        }

        const fileInput = this.component.get("fileInput");
        fileInput.listenTo("change", this.fileInputChanged, this);

    }

    /**
     * 
     * @param {ContainerEvent} event 
     */
    fileInputClicked(event) {
        const fileInput = this.component.get("fileInput");
        fileInput.containerElement.value = null;
        fileInput.containerElement.click();
    }


    /**
     * @param {ContainerEvent} event
     */
    fileInputChanged(event) {
        this.processFiles(event.files);
    }

    /**
     * Process uploaded files and validate against file type array
     * @param {ContainerFileData[]} files
     */
    async processFiles(files) {
        const supportedFiles = [];
        const unsupportedFiles = [];
        const addedFiles = [];

        for (const file of files) {
            const supportedFile = this.isFileTypeSupported(file);
            const fileAlreadySeleted = this.fileAlreadySeleted(file);
            if (supportedFile && !fileAlreadySeleted) {
                supportedFiles.push(file);
            }
            if (!supportedFile) {
                unsupportedFiles.push(file);
            }
        }

        // Handle supported files
        if (supportedFiles.length > 0) {
            if (this.multiple === false) {
                this.fileArrayState.clear();
            }
            for (const file of supportedFiles) {
                addedFiles.push(await this.fileArrayState.updateDomain(file, file.name));
                if (this.multiple === false) {
                    break;
                }
            }
        }

        // Show unsupported files
        this.showUnsupportedFiles(unsupportedFiles);
        await this.updateFileList();

        // Trigger file added event for each supported file
        for (const file of addedFiles) {
            this.events.trigger(FileUpload.EVENT_FILE_ADDED, [file]);
        }
    }

    fileAlreadySeleted(file) {
        return this.fileArrayState.domainMap.has(file.name);
    }

    /**
     * Check if file type is supported
     * @param {ContainerFileData} file
     * @returns {boolean}
     */
    isFileTypeSupported(file) {
        // If fileTypeArray is empty, accept all files
        if (this.fileTypeArray.length === 0) {
            return true;
        }

        // Check if file's MIME type matches any in the fileTypeArray
        return this.fileTypeArray.includes(file.type);
    }

    /**
     * Display unsupported files in the unsupported div
     * @param {Array<File>} unsupportedFiles
     */
    showUnsupportedFiles(unsupportedFiles) {
        const unsupportedDiv = this.component.get("unsupported");
        unsupportedDiv.clear();

        if (unsupportedFiles.length > 0) {
            unsupportedDiv.clear();
            for (const file of unsupportedFiles) {
                const messageElement = nuttin2cCore_v1.HTML.custom("div");
                messageElement.setAttributeValue("class","file-upload-unsupported-file");
                messageElement.setChild(`File "${file.name}" is not supported.`);
                unsupportedDiv.addChild(messageElement);
            }
        }
    }

    /**
     * @param {ContainerEvent} event
     */
    dragOver(event) {
        event.preventDefault();
        event.stopPropagation();

        const uploadBox = this.component.get("uploadBox");
        nuttin2cCore_v1.StyleSelectorAccessor.from(uploadBox).enable("file-upload-box-dragover");
    }

    /**
     * @param {ContainerEvent} event
     */
    dragLeave(event) {
        event.preventDefault();
        event.stopPropagation();

        const uploadBox = this.component.get("uploadBox");
        nuttin2cCore_v1.StyleSelectorAccessor.from(uploadBox).disable("file-upload-box-dragover");
    }

    /**
     *  @param {ContainerEvent} event
     */
    fileDropped(event) {
        event.preventDefault();
        event.stopPropagation();

        const uploadBox = this.component.get("uploadBox");
        nuttin2cCore_v1.StyleSelectorAccessor.from(uploadBox).disable("file-upload-box-dragover");

        this.processFiles(event.files);
    }

    async updateFileList() {
        const fileList = this.component.get("fileList");
        fileList.clear();
        this.events.trigger(FileUpload.EVENT_UPLOAD_RESET);
        for (const file of this.fileArrayState.domainMap.values()) {
            const fileEntry = await this.fileUploadEntryProvider.get([file]);
            fileEntry.events.listenTo(FileUploadEntry.EVENT_REMOVE_CLICKED, this.removeFileEntry, this);
            this.fileArrayState.reactTo(file.name, new coreutil_v1.Method(fileEntry.updateProgress, fileEntry));
            fileList.addChild(fileEntry.component);
        }
        this.fileArrayState.react(new coreutil_v1.Method(this.checkFileUploadComplete, this));
    }

    checkFileUploadComplete() {
        if (this.fileArrayState.domainMap.size === 0) {
            this.events.trigger(FileUpload.EVENT_UPLOAD_RESET);
            return;
        }
        for (const file of this.fileArrayState.domainMap.values()) {
            if (!file.uploadComplete) {
                return;
            }
        }
        this.events.trigger(FileUpload.EVENT_UPLOAD_COMPLETE, [this.fileArrayState.objectArray]);
    }

    /**
     * 
     * @param {ContainerEvent} event
     * @param {File} file
     * @param {any} args
     */
    async removeFileEntry(event, file, args) {
        this.fileArrayState.delete(file.name);
        // Clear unsupported files when updating file list
        const unsupportedDiv = this.component.get("unsupported");
        unsupportedDiv.clear();
        await this.updateFileList();
        // Prevent the click event from bubbling up to the upload box
        event.stopPropagation();
        this.checkFileUploadComplete();
    }

    clicked(event) {
        this.events.trigger(FileUpload.EVENT_CLICKED, [event]);
    }

    focus() {

    }
}

mindi_v1.TypeConfigPack.instance().addTypeConfig("nuttin2c-ui", mindi_v1.PrototypeConfig.unnamed(FileUpload));

new coreutil_v1.Logger("HiddenInput");

class HiddenInput extends CommonInput {

    /**
     * 
     * @param {string} name
     * @param {object} model
     */
    constructor(name, model = null) {

        super(HiddenInput,
            name,
            model);
    }

    /**
     * 
     * @param {StylesheetBuilder} stylesheetBuilder 
     * @returns {Stylesheet}
     */
    static buildStylesheet(stylesheetBuilder) {
        nuttin2cCore_v1.Css3StylesheetBuilder.create(stylesheetBuilder)
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

mindi_v1.TypeConfigPack.instance().addTypeConfig("nuttin2c-ui", mindi_v1.PrototypeConfig.unnamed(HiddenInput));

new coreutil_v1.Logger("TextInput");

class NumberInput extends CommonInput {

    static DEFAULT_LABEL = "Number";

    /**
     * 
     * @param {string} name
     * @param {object} model
     * @param {string} label
     * @param {boolean} mandatory
     */
    constructor(name, model = null, label = NumberInput.DEFAULT_LABEL, mandatory = false) {

        super(NumberInput,
            name,
            model,
            new nuttin2cCore_v1.NumberValidator(mandatory, !mandatory),
            label,
            "Invalid value");
    }

    /**
     * 
     * @param {StylesheetBuilder} stylesheetBuilder 
     * @returns {Stylesheet}
     */
    static buildStylesheet(stylesheetBuilder) {
        nuttin2cCore_v1.Css3StylesheetBuilder.create(stylesheetBuilder)
            .selector(".number-input-container")
                .position("relative")
                .padding("0.5rem")

            .selector(".number-input-entry")
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
                
            .selector(".number-label")
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
     * @returns {Component}
     */
    static buildComponent(componentBuilder) {
        return componentBuilder
            .root("div", "class=number-input-container")
            .open()
                .node("div", "id=bubbleMessage")
                .node("label", "id=label", "class=number-label hidden")
                .node("input", "id=input", "type=number", "pattern=[0-9]*", "inputmode=numeric", "class=number-input-entry")
            .close()
            .build();
    }
}

mindi_v1.TypeConfigPack.instance().addTypeConfig("nuttin2c-ui", mindi_v1.PrototypeConfig.unnamed(NumberInput));

new coreutil_v1.Logger("PasswordInput");

class PasswordInput extends CommonInput {

    static DEFAULT_LABEL = "Password";

    /**
     * 
     * @param {string} name
     * @param {object} model
     * @param {string} label
     * @param {boolean} mandatory
     */
    constructor(name, model = null, label = PasswordInput.DEFAULT_LABEL, mandatory = false) {

        super(PasswordInput,
            name,
            model,
            new nuttin2cCore_v1.RequiredValidator(!mandatory),
            label,
            "Password required");
    }

    /**
     * @param {StylesheetBuilder} stylesheetBuilder 
     * @returns {Stylesheet}
     */
    static buildStylesheet(stylesheetBuilder) {
        nuttin2cCore_v1.Css3StylesheetBuilder.create(stylesheetBuilder)
            .selector(".password-input-container")
                .position("relative")
                .padding("0.5rem")

            .selector(".password-input-entry")
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

            .selector(".password-input-error")
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

            .selector(".password-input-error-hidden")
                .transition(["max-height", ".3s", ".2s"], ["padding", ".3s", ".2s"], ["opacity", ".2s", "0s"], ["visibility", "0s", ".2s"])
                .opacity("0")
                .padding("0px","0px", null, null)
                .maxHeight("0px")
                .display("block")
                .visibility("hidden")

            .selector(".password-input-error-visible")
                .transition(["max-height", ".3s", "0s"], ["padding", ".2s", "0s"], ["opacity", ".2s", ".2s"])
                .opacity("1")
                .padding("10px", "20px", "10px", "20px")
                .maxHeight("50px")
                .display("block")
                .visibility("visible")
                .margin("10px", null, null, null)

            .selector(".password-input-error i")
                .position("absolute")
                .top("100%")
                .left("30%")
                .margin(null, null, null, "-15px")
                .width("30px")
                .height("15px")
                .overflow("hidden")

            .selector(".password-input-error i::after")
                .content("''")
                .position("absolute")
                .width("15px")
                .height("15px")
                .left("50%")
                .transform("translate(-50%,-50%) rotate(45deg)")
                .backgroundColor("#FFFFE0")
                .boxShadow("0", "1px", "8px", null, "rgba(0,0,0,0.5)")
                
            .selector(".password-label")
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
     * @returns {Component}
     */
    static buildComponent(componentBuilder) {
        return componentBuilder
            .root("div", "class=password-input-container")
            .open()
                .node("div", "id=bubbleMessage")
                .node("label", "id=label", "class=password-label hidden")
                .node("input", "id=input", "type=password", "class=password-input-entry")
            .close()
            .build();
    }

}

mindi_v1.TypeConfigPack.instance().addTypeConfig("nuttin2c-ui", mindi_v1.PrototypeConfig.unnamed(PasswordInput));

new coreutil_v1.Logger("PasswordMatcherInputValue");

class PasswordMatcherInputValue extends CommonInput {

    static DEFAULT_LABEL = "New password";

    /**
     * 
     * @param {string} name
     * @param {object} model
     * @param {string} label
     * @param {boolean} mandatory
     */
    constructor(name, model = null, label = PasswordMatcherInputValue.DEFAULT_LABEL, mandatory = false) {

        super(PasswordMatcherInputValue,
            name,
            model,
            new nuttin2cCore_v1.PasswordValidator(mandatory),
            label,
            "Minimum 8 characters containing:",
            [
                "Letter(s)",
                "Number(s)",
                "Special character(s) #?!@$%^&*-"
            ]);
    }

    /**
     * 
     * @param {StylesheetBuilder} stylesheetBuilder 
     * @returns {Stylesheet}
     */
    static buildStylesheet(stylesheetBuilder) {
        nuttin2cCore_v1.Css3StylesheetBuilder.create(stylesheetBuilder)
            .selector(".password-matcher-input-value-container")
                .position("relative")
                .padding("0.5rem")

            .selector(".password-matcher-input-value-entry")
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
                
            .selector(".password-matcher-input-value-label")
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
     * @returns {Component}
     */
    static buildComponent(componentBuilder) {
        return componentBuilder
            .root("div", "class=password-matcher-input-value-container")
            .open()
                .node("div", "id=bubbleMessage")
                .node("label", "id=label", "class=password-matcher-input-value-label hidden")
                .node("input", "id=input", "autocomplete=new-password", "type=password", "class=password-matcher-input-value-entry")
            .close()
            .build();
    }

}

mindi_v1.TypeConfigPack.instance().addTypeConfig("nuttin2c-ui", mindi_v1.PrototypeConfig.unnamed(PasswordMatcherInputValue));

new coreutil_v1.Logger("PasswordMatcherInputControl");

class PasswordMatcherInputControl extends CommonInput {

    static DEFAULT_LABEL = "Confirm password";
    
    /**
     * 
     * @param {string} name
     * @param {object} model
     * @param {string} modelComparedPropertyName
     * @param {string} label
     * @param {boolean} mandatory
     */
    constructor(name, model = null, modelComparedPropertyName = null, label = PasswordMatcherInputControl.DEFAULT_LABEL,
           mandatory = false) {

        super(PasswordMatcherInputControl,
            name,
            model,
            new nuttin2cCore_v1.EqualsPropertyValidator(mandatory, false, model, modelComparedPropertyName),
            label,
            "Passwords must match");
    }

    /**
     * @param {StylesheetBuilder} stylesheetBuilder 
     * @returns {Stylesheet}
     */
    static buildStylesheet(stylesheetBuilder) {
        nuttin2cCore_v1.Css3StylesheetBuilder.create(stylesheetBuilder)
            .selector(".password-matcher-input-control-container")
                .position("relative")
                .padding("0.5rem")

            .selector(".password-matcher-input-control-entry")
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
                
            .selector(".password-matcher-input-control-label")
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
     * @returns {Component}
     */
    static buildComponent(componentBuilder) {
        return componentBuilder
            .root("div", "class=password-matcher-input-control-container")
            .open()
                .node("div", "id=bubbleMessage")
                .node("label", "id=label", "class=password-matcher-input-control-label hidden")
                .node("input", "id=input", "type=password", "autocomplete=new-password", "class=password-matcher-input-control-entry")
            .close()
            .build();
    }

}

mindi_v1.TypeConfigPack.instance().addTypeConfig("nuttin2c-ui", mindi_v1.PrototypeConfig.unnamed(PasswordMatcherInputControl));

class PasswordMatcherModel {

    constructor() {
        this.newPassword = null;
        this.controlPassword = null;
    }

    setNewPassword(newPassword) {
        this.newPassword = newPassword;
    }

    getNewPassword() {
        return this.newPassword;
    }

    setControlPassword(controlPassword) {
        this.controlPassword = controlPassword;
    }

    getControlPassword() {
        return this.controlPassword;
    }

}

mindi_v1.TypeConfigPack.instance().addTypeConfig("nuttin2c-ui", mindi_v1.PrototypeConfig.unnamed(PasswordMatcherModel));

new coreutil_v1.Logger("PasswordMatcherInput");

class PasswordMatcherInput {

	static EVENT_VALIDATED_ENTERED = "validatedEntered";

    /**
     * 
     * @param {string} name
     * @param {object} model
     * @param {string} placeholder
     * @param {string} controlPlaceholder
     * @param {boolean} mandatory
     */
    constructor(name,
        model = null,
        placeholder = PasswordMatcherInput.DEFAULT_PLACEHOLDER, 
        controlPlaceholder = PasswordMatcherInput.DEFAULT_CONTROL_PLACEHOLDER,
        mandatory = false) {

        /** @type {InlineComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(nuttin2cCore_v1.InlineComponentFactory);

        /** @type {Component} */
        this.component = null;

        /** @type {AndValidatorSet} */
        this.validator = null;

        this.passwordMatcherModel = new PasswordMatcherModel();

        this.name = name;
        this.model = model;

        /** @type {PasswordMatcherInputValue} */
		this.passwordMatcherInputValue = mindi_v1.InjectionPoint.instance(PasswordMatcherInputValue,
            ["newPassword", this.passwordMatcherModel, placeholder, mandatory]
		);

        /** @type {PasswordMatcherInputControl} */
		this.passwordMatcherInputControl = mindi_v1.InjectionPoint.instance(PasswordMatcherInputControl,
            ["controlPassword", this.passwordMatcherModel, "newPassword", controlPlaceholder, mandatory]
		);

        /** @type {EventManager} */
        this.eventManager = new nuttin2cCore_v1.EventManager();
    }

    /**
     * 
     * @param {StylesheetBuilder} stylesheetBuilder 
     * @returns {Stylesheet}
     */
    static buildStylesheet(stylesheetBuilder) {
       stylesheetBuilder
           .selector(".password-matcher-input-hint")
           .open()
               .style("color", "#888888")
               .style("font-size", "0.8em")
               .style("margin-bottom", "1rem")
               .style("white-space", "nowrap")
           .close();

       return stylesheetBuilder.build();
    }

    /**
     * 
     * @param {ComponentBuilder} componentBuilder 
     * @returns {Component}
     */
    static buildComponent(componentBuilder) {
        return componentBuilder
            .root("div", "class=password-matcher-input-root")
            .open()
                .node("div", "id=passwordMatcherInputValue")
                .node("div", "id=passwordMatcherInputControl")
                .node("div", "class=password-matcher-input-hint")
                .open()
                    .text("* Must contain letters, numbers and special characters")
                .close()
            .close()
            .build();
    }

    async postConfig() {
        this.component = this.componentFactory.create(PasswordMatcherInput);

        nuttin2cCore_v1.CanvasStyles.enableStyle(PasswordMatcherInput.name);

        this.component.setChild("passwordMatcherInputValue",this.passwordMatcherInputValue.component);
        this.component.setChild("passwordMatcherInputControl",this.passwordMatcherInputControl.component);

        this.passwordMatcherInputValue.events
            .listenTo(CommonInput.EVENT_ENTERED, this.passwordValueEntered, this)
            .listenTo(CommonInput.EVENT_KEYUPPED, this.passwordValueChanged, this);

        this.passwordMatcherInputControl.events
            .listenTo(CommonInput.EVENT_ENTERED, this.passwordControlEntered, this);

        /** @type {AndValidatorSet} */
        this.validator = new nuttin2cCore_v1.AndValidatorSet()
            .withValidator(this.passwordMatcherInputValue.validator)
            .withValidator(this.passwordMatcherInputControl.validator)
            .withValidListener(new coreutil_v1.Method(this.passwordMatcherValidOccured, this));

    }

    get events() { return this.eventManager; }

    passwordMatcherValidOccured() {
        coreutil_v1.PropertyAccessor.setValue(this.model, this.name, this.passwordMatcherModel.getNewPassword());
    }

    passwordValueEntered(event) {
        if (this.passwordMatcherInputValue.validator.isValid()) {
            this.passwordMatcherInputControl.focus();
        }
    }

    passwordValueChanged(event) {
        this.passwordMatcherInputControl.clear();
    }

    passwordControlEntered(event) {
        if (this.validator.isValid()) {
            this.events.trigger(PasswordMatcherInput.EVENT_VALIDATED_ENTERED, event);
        }
    }

    focus() { this.passwordMatcherInputValue.focus(); }
    selectAll() { this.passwordMatcherInputValue.selectAll(); }
    enable() { this.passwordMatcherInputValue.enable(); this.passwordMatcherInputControl.enable(); }
    disable() { this.passwordMatcherInputValue.disable(); this.passwordMatcherInputControl.disable(); }
    clear() { this.passwordMatcherInputValue.clear(); this.passwordMatcherInputControl.clear(); }
}

mindi_v1.TypeConfigPack.instance().addTypeConfig("nuttin2c-ui", mindi_v1.PrototypeConfig.unnamed(PasswordMatcherInput));

new coreutil_v1.Logger("PhoneInput");

class PhoneInput extends CommonInput {

    static DEFAULT_PLACEHOLDER = "Phone";
    
    /**
     * 
     * @param {string} name
     * @param {object} model
     * @param {string} placeholder
     * @param {boolean} mandatory
     */
    constructor(name, model = null, placeholder = TextInput.DEFAULT_PLACEHOLDER, mandatory = false) {

        super(PhoneInput,
            name,
            model,
            new nuttin2cCore_v1.PhoneValidator(mandatory, !mandatory),
            placeholder,
            "Invalid phone number",
            ["Must start with + sign", "followed by minimum 8 numbers"]);
    }

    /**
     * 
     * @param {StylesheetBuilder} stylesheetBuilder 
     * @returns {Stylesheet}
     */
    static buildStylesheet(stylesheetBuilder) {
        nuttin2cCore_v1.Css3StylesheetBuilder.create(stylesheetBuilder)
            .selector(".phone-input-container")
                .position("relative")
                .padding("0.5rem")

            .selector(".phone-input-entry")
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
                
            .selector(".phone-label")
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
     * @returns {Component}
     */
    static buildComponent(componentBuilder) {
        componentBuilder
            .root("div", "class=phone-input-container")
            .open()
                .node("div", "id=bubbleMessage")
                .node("label", "id=label", "class=phone-label hidden")
                .node("input", "id=input", "type=text", "class=phone-input-entry")
            .close();
        return componentBuilder.build();
    }

}

mindi_v1.TypeConfigPack.instance().addTypeConfig("nuttin2c-ui", mindi_v1.PrototypeConfig.unnamed(PhoneInput));

new coreutil_v1.Logger("RadioButton");

class RadioButton {
    
    static EVENT_CLICKED = CommonEvents.CLICKED;

    /**
     * 
     * @param {string} name 
     * @param {object} model
     */
    constructor(name, model = null) {
        
        /** @type {InlineComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(nuttin2cCore_v1.InlineComponentFactory);

        /** @type {EventManager} */
        this.events = new nuttin2cCore_v1.EventManager();

        /** @type {Component} */
        this.component = null;

        /** @type {string} */
        this.name = name;

        /** @type {object} */
        this.model = model;

    }

    /**
     * 
     * @param {StylesheetBuilder} stylesheetBuilder 
     * @returns {Stylesheet}
     */
    static buildStylesheet(stylesheetBuilder) {
        stylesheetBuilder
            .selector(".radio-button")
            .open()
                .style("display", "block")
                .style("position", "relative")
                .style("padding-left", "2em")
                .style("margin-bottom", "0.5em")
                .style("cursor", "pointer")
                .style("-webkit-user-select", "none")
                .style("-moz-user-select", "none")
                .style("-ms-user-select", "none")
                .style("user-select", "none")
                .style("margin-bottom", "1rem")
            .close()

            .selector(".radio-button input")
            .open()
                .style("position", "absolute")
                .style("opacity", "0")
                .style("cursor", "pointer")
                .style("height", "0")
                .style("width", "0")
            .close()

            .selector(".radio-button-mark")
            .open()
                .style("position", "absolute")
                .style("top", "0")
                .style("left", "0")
                .style("width", "20pt")
                .style("height", "20pt")
                .style("background-color", "#ddd")
                .style("border-radius", "50%")
                .style("border-width", "1pt")
                .style("border-style", "solid")
                .style("border-color", "#bbb")
            .close()

            .selector(".radio-button:hover input ~ .check-box-mark")
            .open()
                .style("background-color", "#2196F3")
            .close()

            .selector(".radio-button input:checked ~ .radio-button-mark")
            .open()
                .style("background-color", "#ddd")
            .close()

            .selector(".radio-button-mark:after")
            .open()
                .style("content", "\"\"")
                .style("position", "absolute")
                .style("display", "none")
            .close()

            .selector(".radio-button input:checked ~ .radio-button-mark:after")
            .open()
                .style("display", "block")
            .close()

            .selector(".radio-button .radio-button-mark:after")
            .open()
                .style("left", "50%")
                .style("top", "50%")
                .style("transform", "translate(-50%, -50%)")
                .style("width", "14pt")
                .style("height", "14pt")
                .style("background-color", "#2196F3")
                .style("border-radius", "50%")
            .close();
        return stylesheetBuilder.build();
    }

    /**
     * 
     * @param {ComponentBuilder} componentBuilder 
     * @returns {Component}
     */
    static buildComponent(componentBuilder) {
        return componentBuilder
            .root("label", "class=radio-button")
            .open()
                .node("input", "id=radio", "type=radio")
                .node("span", "class=radio-button-mark")
            .close()
            .build();
    }

    postConfig() {
        this.component = this.componentFactory.create(RadioButton);
        nuttin2cCore_v1.CanvasStyles.enableStyle(RadioButton.name);
        this.component.get("radio").setAttributeValue("name",this.name);

        if (this.model) {
            nuttin2cCore_v1.InputElementDataBinding.link(this.model).to(this.component.get("radio"));
        }

        this.component.get("radio").listenTo("click", this.clicked, this);
    }

    clicked(event) {
        this.events.trigger(RadioButton.EVENT_CLICKED, [event]);
    }

}

mindi_v1.TypeConfigPack.instance().addTypeConfig("nuttin2c-ui", mindi_v1.PrototypeConfig.unnamed(RadioButton));

new coreutil_v1.Logger("RadioToggleSwitch");

class RadioToggleSwitch {
    
    static EVENT_ENABLED = CommonEvents.ENABLED;
    static EVENT_DISABLED = CommonEvents.DISABLED;
    static EVENT_CHANGED = CommonEvents.CHANGED;

    /**
     * 
     * @param {object} model
     */
    constructor(model = null) {
        
        /** @type {InlineComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(nuttin2cCore_v1.InlineComponentFactory);

        /** @type {EventManager} */
        this.events = new nuttin2cCore_v1.EventManager();

        /** @type {Component} */
        this.component = null;

        /** @type {object} */
        this.model = model;

        /** @type {boolean} */
        this.checked = false;

    }

    /**
     * 
     * @param {StylesheetBuilder} stylesheetBuilder 
     * @returns {Stylesheet}
     */
    static buildStylesheet(stylesheetBuilder) {
       stylesheetBuilder
            .selector(".radio-toggle-switch")
            .open()
                .style("position", "relative")
                .style("display", "inline-block")
                .style("width", "41pt")
                .style("height", "24pt")
            .close()

            .selector(".radio-toggle-switch input")
            .open()
                .style("opacity", "0")
                .style("width", "0")
                .style("height", "0")
            .close()

            .selector(".radio-toggle-switch-slider")
            .open()
                .style("position", "absolute")
                .style("cursor", "pointer")
                .style("top", "0")
                .style("left", "0")
                .style("right", "0")
                .style("bottom", "0")
                .style("background-color", "#ccc")
                .style("border-radius", "24pt")
                .style("transition", ".4s")
                .style("border-width", "1pt")
                .style("border-style", "solid")
                .style("border-color", "#bbb")
            .close()

            .selector(".radio-toggle-switch-slider:before")
            .open()
                .style("position", "absolute")
                .style("content", "\"\"")
                .style("height", "17pt")
                .style("width", "17pt")
                .style("left", "3.5pt")
                .style("bottom", "3.5pt")
                .style("background-color", "white")
                .style("border-radius", "50%")
                .style("transition", ".4s")
                .style("transform", "translateX(0)")
            .close()

            .selector(".radio-toggle-switch:hover .radio-toggle-switch-slider")
            .open()
                .style("background-color", "#bbb")
            .close()

            .selector(".radio-toggle-switch input:checked + .radio-toggle-switch-slider")
            .open()
                .style("background-color", "#2196F3")
                .style("border-color", "#1976D2")
            .close()

            .selector(".radio-toggle-switch input:checked + .radio-toggle-switch-slider:before")
            .open()
                .style("transform", "translateX(17pt)")
            .close()

            .selector(".radio-toggle-switch input:focus + .radio-toggle-switch-slider")
            .open()
                .style("box-shadow", "0 0 1pt #2196F3")
            .close()

            .selector(".radio-toggle-switch input:disabled + .radio-toggle-switch-slider")
            .open()
                .style("opacity", "0.6")
                .style("cursor", "not-allowed")
            .close()

            .selector(".radio-toggle-switch input:disabled:hover + .radio-toggle-switch-slider")
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
            .root("label", "class=radio-toggle-switch")
            .open()
                .node("input", "id=checkbox", "type=checkbox")
                .node("span", "class=radio-toggle-switch-slider")
            .close()
            .build();
    }

    postConfig() {
        this.component = this.componentFactory.create(RadioToggleSwitch);
        nuttin2cCore_v1.CanvasStyles.enableStyle(RadioToggleSwitch.name);

        if (this.model) {
            nuttin2cCore_v1.InputElementDataBinding.link(this.model).to(this.component.get("checkbox"));
        }

        this.component.get("checkbox").listenTo("change", this.clicked, this);
    }

    /**
     * 
     * @param {ContainerEvent} event 
     */
    clicked(event) {
        const oldValue = this.checked;
        this.checked = event.target.checked;

        if (oldValue !== this.checked) {
            this.events.trigger(RadioToggleSwitch.EVENT_CHANGED, [event, this.checked]);
        }

        if (this.checked) {
            this.events.trigger(RadioToggleSwitch.EVENT_ENABLED, [event]);
        } else {
            this.events.trigger(RadioToggleSwitch.EVENT_DISABLED, [event]);
        }
        
    }

    /**
     * Set the toggle state programmatically
     * @param {boolean} checked 
     */
    toggle(checked) {
        if (this.checked === checked) {
            return; // No change
        }
        this.checked = checked;
        if (this.component) {
            this.component.get("checkbox").containerElement.click();
        }
    }

    /**
     * Get the current toggle state
     * @returns {boolean}
     */
    isChecked() {
        return this.checked;
    }

}

mindi_v1.TypeConfigPack.instance().addTypeConfig("nuttin2c-ui", mindi_v1.PrototypeConfig.unnamed(RadioToggleSwitch));

class SelectInputOptionsSource {
    
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
        this.events = new nuttin2cCore_v1.EventManager();
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
        this.events.trigger(SelectInputOptionsSource.EVENT_OPTIONS_CHANGED, [this.options]);
    }

    refresh() {
        this.events.trigger(SelectInputOptionsSource.EVENT_OPTIONS_CHANGED, [this.options]);
    }

}

new coreutil_v1.Logger("SelectInput");

class SelectInput {

	static DEFAULT_PLACEHOLDER = "Select";

	static EVENT_CLICKED = CommonEvents.CLICKED;
    static EVENT_CHANGED = CommonEvents.CHANGED;
    static EVENT_LOADED = CommonEvents.INPUT;
    static EVENT_BLURRED = CommonEvents.BLURRED;

    /**
     * 
     * @param {string} name 
     * @param {object} model
     * @param {string} label
     * @param {boolean} mandatory
     * @param {SelectInputOptionsSource} optionsSource
     */
    constructor(name, model = null, label = SelectInput.DEFAULT_PLACEHOLDER, mandatory = false, optionsSource = new SelectInputOptionsSource()) {
        
        /** @type {InlineComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(nuttin2cCore_v1.InlineComponentFactory);

        /** @type {EventManager} */
        this.events = new nuttin2cCore_v1.EventManager();

        /** @type {Component} */
        this.component = null;

        /** @type {string} */
        this.name = name;

        /** @type {SelectInputOptionsSource} */
        this.optionsSource = optionsSource;

        /** @type {string} */
        this.label = label;

        /** @type {boolean} */
        this.mandatory = mandatory;

        /** @type {object} */
        this.model = model;

        /** @type {RequiredValidator} */
        this.validator = new nuttin2cCore_v1.RequiredValidator(false, mandatory);

    }

    /**
     * @param {StylesheetBuilder} stylesheetBuilder 
     * @returns {Stylesheet}
     */
    static buildStylesheet(stylesheetBuilder) {
        nuttin2cCore_v1.Css3StylesheetBuilder.create(stylesheetBuilder)
            .selector(".select-container")
                .position("relative")
                .padding("0.5rem")

            .selector(".select-entry")
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
                .border("1pt", "solid", "#ced4da")
                .borderRadius("0.25rem")
                .transition(
                    ["border-color", "0.15s", null, "ease-in-out"],
                    ["box-shadow", "0.15s", null, "ease-in-out"])
                .margin(null, null, "1rem", null)
                .appearance("none")
                .backgroundImage("url(\"data:image/svg+xml;utf8,<svg fill='2196F3' height='20' viewBox='0 0 20 20' width='20' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>\")")
                .backgroundRepeat("no-repeat")
                .backgroundPosition("right 0.75rem top 0.3rem")
                .backgroundSize("1.5em")
            
            .selector(".select-error")
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
                .boxShadow("0", "1pt", "8pt", null, "rgba(0,0,0,0.5)")
                .cursor("pointer")

            .selector(".select-error-hidden")
                .transition(
                    ["max-height", ".3s", ".2s"],
                    ["padding", ".3s", ".2s"],
                    ["opacity", ".2s", "0s"],
                    ["visibility", "0s", ".2s"])
                .opacity("0")
                .padding("0px", "0px", "0px", "0px")
                .maxHeight("0px")
                .display("block")
                .visibility("hidden")

            .selector(".select-error-visible")
                .transition(
                    ["max-height", ".3s", null],
                    ["padding", ".2s", null],
                    ["opacity", ".2s", ".2s"])
                .opacity("1")
                .padding("10px", "20px", "10px", "20px")
                .maxHeight("50px")
                .display("block")
                .visibility("visible")
                .margin("10px", null, null, null)

            .selector(".select-error i")
                .position("absolute")
                .top("100%")
                .left("30%")
                .margin(null, null, null, "-15pt")
                .width("30pt")
                .height("15pt")
                .overflow("hidden")

            .selector(".select-error i::after")
                .content("''")
                .position("absolute")
                .width("15pt")
                .height("15pt")
                .left("50%")
                .transform("translate(-50%,-50%) rotate(45deg)")
                .backgroundColor("#FFFFE0")
                .boxShadow("0", "1pt", "8pt", null, "rgba(0,0,0,0.5)")
                
            .selector(".select-label")
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
     * @returns {Component}
     */
    static buildComponent(componentBuilder) {
        return componentBuilder
            .root("div", "class=select-container")
            .open()
                .node("div", "id=bubbleMessage")
                .node("label", "id=label", "class=select-label hidden")
                .node("select", "id=select", "class=select-entry")
            .close()
        .build();
    }

    postConfig() {
        this.component = this.componentFactory.create(SelectInput);
        nuttin2cCore_v1.CanvasStyles.enableStyle(SelectInput.name);

        
        const label = this.component.get("label");

		/** @type {SelectElement} */
		const select = this.component.get("select");
        select.name = this.name;
        select.listenTo("click", this.clicked, this);
        select.listenTo("change", this.changed, this);
        select.listenTo("blur", this.blurred, this);

        if (this.label && label) {
            label.setAttributeValue("for", select.getAttributeValue("id"));
            label.setChild(this.label);
            nuttin2cCore_v1.StyleSelectorAccessor.from(label).disable("hidden");
        }

		this.optionsSource.events.listenTo(SelectInputOptionsSource.EVENT_OPTIONS_CHANGED, this.handleOptionsChange, this);
        this.optionsSource.refresh();

        if(this.model) {
            this.dataBinding = nuttin2cCore_v1.InputElementDataBinding.link(this.model, this.validator).to(this.component.get("select"));
        }
    }

    /**
     * 
     * @param {Array<OptionElement>} optionsArray 
     */
    handleOptionsChange(optionsArray) {
        /** @type {SelectElement} */
        const select = this.component.get("select");
        select.options = optionsArray;
        if (this.dataBinding) {
            this.dataBinding.push();
        }
    }

	/**
	 * @param {Map<String, String>} keyValueOptions
	 */
	set options(keyValueOptions) {
		this.optionsSource.update(keyValueOptions);
        if (this.dataBinding) {
            this.dataBinding.push();
        }
	}

    clicked(event) {
        this.events.trigger(SelectInput.EVENT_CLICKED, [event]);
    }

    changed(event) {
        this.events.trigger(SelectInput.EVENT_CHANGED, [event]);
    }

    blurred(event) {
        this.events.trigger(SelectInput.EVENT_BLURRED, [event]);
    }

    focus() { this.component.get("select").focus(); }
    enable() { this.component.get("select").enable(); }
    disable() { this.component.get("select").disable(); }
    clear() { this.component.get("select").value = ""; }

}

mindi_v1.TypeConfigPack.instance().addTypeConfig("nuttin2c-ui", mindi_v1.PrototypeConfig.unnamed(SelectInput));

new coreutil_v1.Logger("TextInput");

class TextInput$1 extends CommonInput {

    static DEFAULT_LABEL = "Text";

    /**
     * 
     * @param {string} name
     * @param {object} model
     * @param {string} label
     * @param {boolean} mandatory
     */
    constructor(name, model = null, label = TextInput$1.DEFAULT_LABEL, mandatory = false) {

        super(TextInput$1,
            name,
            model,
            new nuttin2cCore_v1.RequiredValidator(false, mandatory),
            label,
            "Invalid value");

    }

    /**
     * @param {StylesheetBuilder} stylesheetBuilder 
     * @returns {Stylesheet}
     */
    static buildStylesheet(stylesheetBuilder) {
       nuttin2cCore_v1.Css3StylesheetBuilder.create(stylesheetBuilder)
            .selector(".text-input-container")
                .position("relative")
                .padding("0.5rem")

            .selector(".text-input-entry")
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
                
            .selector(".text-label")
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
     * @returns {Component}
     */
    static buildComponent(componentBuilder) {
        return componentBuilder
            .root("div", "class=text-input-container")
            .open()
                .node("div", "id=bubbleMessage")
                .node("label", "id=label", "class=text-label hidden")
                .node("input", "id=input", "type=text", "class=text-input-entry")
            .close()
            .build();
    }

}

mindi_v1.TypeConfigPack.instance().addTypeConfig("nuttin2c-ui", mindi_v1.PrototypeConfig.unnamed(TextInput$1));

exports.BackShade = BackShade;
exports.BackShadeListeners = BackShadeListeners;
exports.Background = Background;
exports.BackgroundVideo = BackgroundVideo;
exports.BannerLabel = BannerLabel;
exports.BannerLabelMessage = BannerLabelMessage;
exports.BannerMessage = BannerMessage;
exports.BubbleMessage = BubbleMessage;
exports.Button = Button;
exports.CheckBox = CheckBox;
exports.ColorApplicator = ColorApplicator;
exports.ColorPalette = ColorPalette;
exports.CommonEvents = CommonEvents;
exports.CommonInput = CommonInput;
exports.CustomAppearance = CustomAppearance;
exports.Dependencies = Dependencies;
exports.DialogBox = DialogBox;
exports.DropDownPanel = DropDownPanel;
exports.ElementThemeApplicator = ElementThemeApplicator;
exports.EmailInput = EmailInput;
exports.ExpandChevron = ExpandChevron;
exports.FileUpload = FileUpload;
exports.FileUploadEntry = FileUploadEntry;
exports.FillPanel = FillPanel;
exports.HiddenInput = HiddenInput;
exports.LinePanel = LinePanel;
exports.LinePanelEntry = LinePanelEntry;
exports.LinkPanel = LinkPanel;
exports.NumberInput = NumberInput;
exports.Panel = Panel;
exports.PasswordInput = PasswordInput;
exports.PasswordMatcherInput = PasswordMatcherInput;
exports.PasswordMatcherInputControl = PasswordMatcherInputControl;
exports.PasswordMatcherInputValue = PasswordMatcherInputValue;
exports.PasswordMatcherModel = PasswordMatcherModel;
exports.PhoneInput = PhoneInput;
exports.PopUpPanel = PopUpPanel;
exports.RadioButton = RadioButton;
exports.RadioToggleIcon = RadioToggleIcon;
exports.RadioToggleSwitch = RadioToggleSwitch;
exports.SelectInput = SelectInput;
exports.SelectInputOptionsSource = SelectInputOptionsSource;
exports.SlideDeck = SlideDeck;
exports.SlideDeckEntry = SlideDeckEntry;
exports.TextInput = TextInput$1;
exports.ToggleIcon = ToggleIcon;
exports.ToolBar = ToolBar;
exports.TreePanel = TreePanel;
exports.TreePanelEntry = TreePanelEntry;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnV0dGluMmMtdWlfdjEuanMiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9udXR0aW4yYy9jb21wb25lbnQvY29sb3JQYWxldHRlLmpzIiwiLi4vLi4vc3JjL251dHRpbjJjL2NvbXBvbmVudC9jdXN0b21BcHBlYXJhbmNlLmpzIiwiLi4vLi4vc3JjL251dHRpbjJjL2NvbXBvbmVudC9kZXBlbmRlbmNpZXMuanMiLCIuLi8uLi9zcmMvbnV0dGluMmMvY29tcG9uZW50L2JhY2tTaGFkZS9iYWNrU2hhZGVMaXN0ZW5lcnMuanMiLCIuLi8uLi9zcmMvbnV0dGluMmMvY29tcG9uZW50L2JhY2tTaGFkZS9iYWNrU2hhZGUuanMiLCIuLi8uLi9zcmMvbnV0dGluMmMvY29tcG9uZW50L2JhY2tncm91bmQvYmFja2dyb3VuZC5qcyIsIi4uLy4uL3NyYy9udXR0aW4yYy9jb21wb25lbnQvYmFubmVyTGFiZWwvYmFubmVyTGFiZWxNZXNzYWdlL2Jhbm5lckxhYmVsTWVzc2FnZS5qcyIsIi4uLy4uL3NyYy9udXR0aW4yYy9jb21wb25lbnQvYmFubmVyTGFiZWwvYmFubmVyTGFiZWwuanMiLCIuLi8uLi9zcmMvbnV0dGluMmMvY29tcG9uZW50L2Jhbm5lck1lc3NhZ2UvYmFubmVyTWVzc2FnZS5qcyIsIi4uLy4uL3NyYy9udXR0aW4yYy9jb21wb25lbnQvYmFja2dyb3VuZFZpZGVvL2JhY2tncm91bmRWaWRlby5qcyIsIi4uLy4uL3NyYy9udXR0aW4yYy9jb21wb25lbnQvYnViYmxlTWVzc2FnZS9idWJibGVNZXNzYWdlLmpzIiwiLi4vLi4vc3JjL251dHRpbjJjL2NvbXBvbmVudC9jb21tb24vY29tbW9uRXZlbnRzLmpzIiwiLi4vLi4vc3JjL251dHRpbjJjL2NvbXBvbmVudC9jb21tb24vY29sb3JBcHBsaWNhdG9yLmpzIiwiLi4vLi4vc3JjL251dHRpbjJjL2NvbXBvbmVudC9jb21tb24vZWxlbWVudFRoZW1lQXBwbGljYXRvci5qcyIsIi4uLy4uL3NyYy9udXR0aW4yYy9jb21wb25lbnQvZGlhbG9nQm94L2RpYWxvZ0JveC5qcyIsIi4uLy4uL3NyYy9udXR0aW4yYy9jb21wb25lbnQvZHJvcERvd25QYW5lbC9kcm9wRG93blBhbmVsLmpzIiwiLi4vLi4vc3JjL251dHRpbjJjL2NvbXBvbmVudC9maWxsUGFuZWwvZmlsbFBhbmVsLmpzIiwiLi4vLi4vc3JjL251dHRpbjJjL2NvbXBvbmVudC9pbnB1dC9jb21tb25JbnB1dC5qcyIsIi4uLy4uL3NyYy9udXR0aW4yYy9jb21wb25lbnQvbGlua1BhbmVsL2xpbmtQYW5lbC5qcyIsIi4uLy4uL3NyYy9udXR0aW4yYy9jb21wb25lbnQvcGFuZWwvcGFuZWwuanMiLCIuLi8uLi9zcmMvbnV0dGluMmMvY29tcG9uZW50L2xpbmVQYW5lbC9saW5lUGFuZWxFbnRyeS9saW5lUGFuZWxFbnRyeS5qcyIsIi4uLy4uL3NyYy9udXR0aW4yYy9jb21wb25lbnQvbGluZVBhbmVsL2xpbmVQYW5lbC5qcyIsIi4uLy4uL3NyYy9udXR0aW4yYy9jb21wb25lbnQvcG9wVXBQYW5lbC9wb3BVcFBhbmVsLmpzIiwiLi4vLi4vc3JjL251dHRpbjJjL2NvbXBvbmVudC9zbGlkZURlY2svc2xpZGVEZWNrRW50cnkvc2xpZGVEZWNrRW50cnkuanMiLCIuLi8uLi9zcmMvbnV0dGluMmMvY29tcG9uZW50L3NsaWRlRGVjay9zbGlkZURlY2suanMiLCIuLi8uLi9zcmMvbnV0dGluMmMvY29tcG9uZW50L2lucHV0L2J1dHRvbi9idXR0b24uanMiLCIuLi8uLi9zcmMvbnV0dGluMmMvY29tcG9uZW50L3Rvb2xCYXIvdG9vbEJhci5qcyIsIi4uLy4uL3NyYy9udXR0aW4yYy9jb21wb25lbnQvaW5wdXQvcmFkaW9Ub2dnbGVJY29uL3JhZGlvVG9nZ2xlSWNvbi5qcyIsIi4uLy4uL3NyYy9udXR0aW4yYy9jb21wb25lbnQvaW5wdXQvdG9nZ2xlSWNvbi90b2dnbGVJY29uLmpzIiwiLi4vLi4vc3JjL251dHRpbjJjL2NvbXBvbmVudC90cmVlUGFuZWwvdHJlZVBhbmVsRW50cnkvdHJlZVBhbmVsRW50cnkuanMiLCIuLi8uLi9zcmMvbnV0dGluMmMvY29tcG9uZW50L3RyZWVQYW5lbC90cmVlUGFuZWwuanMiLCIuLi8uLi9zcmMvbnV0dGluMmMvY29tcG9uZW50L2lucHV0L2NoZWNrQm94L2NoZWNrQm94LmpzIiwiLi4vLi4vc3JjL251dHRpbjJjL2NvbXBvbmVudC9pbnB1dC9leHBhbmRDaGV2cm9uL2V4cGFuZENoZXZyb24uanMiLCIuLi8uLi9zcmMvbnV0dGluMmMvY29tcG9uZW50L2lucHV0L2VtYWlsSW5wdXQvZW1haWxJbnB1dC5qcyIsIi4uLy4uL3NyYy9udXR0aW4yYy9jb21wb25lbnQvaW5wdXQvZmlsZVVwbG9hZC9maWxlVXBsb2FkRW50cnkvZmlsZVVwbG9hZEVudHJ5LmpzIiwiLi4vLi4vc3JjL251dHRpbjJjL2NvbXBvbmVudC9pbnB1dC9maWxlVXBsb2FkL2ZpbGVVcGxvYWQuanMiLCIuLi8uLi9zcmMvbnV0dGluMmMvY29tcG9uZW50L2lucHV0L2hpZGRlbklucHV0L2hpZGRlbklucHV0LmpzIiwiLi4vLi4vc3JjL251dHRpbjJjL2NvbXBvbmVudC9pbnB1dC9udW1iZXJJbnB1dC9udW1iZXJJbnB1dC5qcyIsIi4uLy4uL3NyYy9udXR0aW4yYy9jb21wb25lbnQvaW5wdXQvcGFzc3dvcmRJbnB1dC9wYXNzd29yZElucHV0LmpzIiwiLi4vLi4vc3JjL251dHRpbjJjL2NvbXBvbmVudC9pbnB1dC9wYXNzd29yZE1hdGNoZXJJbnB1dC9wYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlL3Bhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWUuanMiLCIuLi8uLi9zcmMvbnV0dGluMmMvY29tcG9uZW50L2lucHV0L3Bhc3N3b3JkTWF0Y2hlcklucHV0L3Bhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbC9wYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2wuanMiLCIuLi8uLi9zcmMvbnV0dGluMmMvY29tcG9uZW50L2lucHV0L3Bhc3N3b3JkTWF0Y2hlcklucHV0L3Bhc3N3b3JkTWF0Y2hlck1vZGVsLmpzIiwiLi4vLi4vc3JjL251dHRpbjJjL2NvbXBvbmVudC9pbnB1dC9wYXNzd29yZE1hdGNoZXJJbnB1dC9wYXNzd29yZE1hdGNoZXJJbnB1dC5qcyIsIi4uLy4uL3NyYy9udXR0aW4yYy9jb21wb25lbnQvaW5wdXQvcGhvbmVJbnB1dC9waG9uZUlucHV0LmpzIiwiLi4vLi4vc3JjL251dHRpbjJjL2NvbXBvbmVudC9pbnB1dC9yYWRpb0J1dHRvbi9yYWRpb0J1dHRvbi5qcyIsIi4uLy4uL3NyYy9udXR0aW4yYy9jb21wb25lbnQvaW5wdXQvcmFkaW9Ub2dnbGVTd2l0Y2gvcmFkaW9Ub2dnbGVTd2l0Y2guanMiLCIuLi8uLi9zcmMvbnV0dGluMmMvY29tcG9uZW50L2lucHV0L3NlbGVjdElucHV0L3NlbGVjdElucHV0T3B0aW9uc1NvdXJjZS5qcyIsIi4uLy4uL3NyYy9udXR0aW4yYy9jb21wb25lbnQvaW5wdXQvc2VsZWN0SW5wdXQvc2VsZWN0SW5wdXQuanMiLCIuLi8uLi9zcmMvbnV0dGluMmMvY29tcG9uZW50L2lucHV0L3RleHRJbnB1dC90ZXh0SW5wdXQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAZGVzY3JpcHRpb24gRm9udCBjb2xvciwgYmFja2dyb3VuZCBjb2xvciwgYW5kIGJvcmRlciBjb2xvciBwYWxldHRlcyBmb3IgdmFyaW91cyBtb2Rlcy5cbiAqL1xuZXhwb3J0IGNsYXNzIENvbG9yUGFsZXR0ZSB7XG5cbiAgICBzdGF0aWMgUFJJTUFSWV9DT0xPUlMgPSAgICAgICAgICBbXCIjZmZmXCIsXCIjMDA3YmZmXCIsXCIjMDA3YmZmXCJdO1xuICAgIHN0YXRpYyBQUklNQVJZX0hPVkVSX0NPTE9SUyA9ICAgIFtcIiNmZmZcIixcIiMwMDY5ZDlcIixcIiMwMDYyY2NcIl07XG4gICAgc3RhdGljIFBSSU1BUllfRElTQUJMRURfQ09MT1JTID0gW1wiI2ZmZlwiLFwiIzVlYWJmZFwiLFwiIzVlYWJmZFwiXTtcbiAgICBzdGF0aWMgUFJJTUFSWV9BQ1RJVkVfQ09MT1JTID0gICBbXCIjZmZmXCIsXCIjMDA2MmNjXCIsXCIjMDA1Y2JmXCJdO1xuXG4gICAgc3RhdGljIFNFQ09OREFSWV9DT0xPUlMgPSAgICAgICAgICBbXCIjZmZmXCIsXCIjNmM3NTdkXCIsXCIjNmM3NTdkXCJdO1xuICAgIHN0YXRpYyBTRUNPTkRBUllfSE9WRVJfQ09MT1JTID0gICAgW1wiI2ZmZlwiLFwiIzVhNjI2OFwiLFwiIzU0NWI2MlwiXTtcbiAgICBzdGF0aWMgU0VDT05EQVJZX0RJU0FCTEVEX0NPTE9SUyA9IFtcIiNmZmZcIixcIiM2Yzc1N2RcIixcIiM2Yzc1N2RcIl07XG4gICAgc3RhdGljIFNFQ09OREFSWV9BQ1RJVkVfQ09MT1JTID0gICBbXCIjZmZmXCIsXCIjNTQ1YjYyXCIsXCIjNGU1NTViXCJdO1xuXG4gICAgc3RhdGljIFNVQ0NFU1NfQ09MT1JTID0gICAgICAgICAgW1wiI2ZmZlwiLFwiIzI4YTc0NVwiLFwiIzI4YTc0NVwiXTtcbiAgICBzdGF0aWMgU1VDQ0VTU19IT1ZFUl9DT0xPUlMgPSAgICBbXCIjZmZmXCIsXCIjMjE4ODM4XCIsXCIjMWU3ZTM0XCJdO1xuICAgIHN0YXRpYyBTVUNDRVNTX0RJU0FCTEVEX0NPTE9SUyA9IFtcIiNmZmZcIixcIiMyOGE3NDVcIixcIiMyOGE3NDVcIl07XG4gICAgc3RhdGljIFNVQ0NFU1NfQUNUSVZFX0NPTE9SUyA9ICAgW1wiI2ZmZlwiLFwiIzFlN2UzNFwiLFwiIzFjNzQzMFwiXTtcblxuICAgIHN0YXRpYyBJTkZPX0NPTE9SUyA9ICAgICAgICAgIFtcIiNmZmZcIixcIiMxN2EyYjhcIixcIiMxN2EyYjhcIl07XG4gICAgc3RhdGljIElORk9fSE9WRVJfQ09MT1JTID0gICAgW1wiI2ZmZlwiLFwiIzEzODQ5NlwiLFwiIzExN2E4YlwiXTtcbiAgICBzdGF0aWMgSU5GT19ESVNBQkxFRF9DT0xPUlMgPSBbXCIjZmZmXCIsXCIjMTdhMmI4XCIsXCIjMTdhMmI4XCJdO1xuICAgIHN0YXRpYyBJTkZPX0FDVElWRV9DT0xPUlMgPSAgIFtcIiNmZmZcIixcIiMxMTdhOGJcIixcIiMxMDcwN2ZcIl07XG5cbiAgICBzdGF0aWMgV0FSTklOR19DT0xPUlMgPSAgICAgICAgICBbXCIjZmZmXCIsXCIjZmZjMTA3XCIsXCIjZmZjMTA3XCJdO1xuICAgIHN0YXRpYyBXQVJOSU5HX0hPVkVSX0NPTE9SUyA9ICAgIFtcIiNmZmZcIixcIiNlMGE4MDBcIixcIiNkMzllMDBcIl07XG4gICAgc3RhdGljIFdBUk5JTkdfRElTQUJMRURfQ09MT1JTID0gW1wiI2ZmZlwiLFwiI2ZmYzEwN1wiLFwiI2ZmYzEwN1wiXTtcbiAgICBzdGF0aWMgV0FSTklOR19BQ1RJVkVfQ09MT1JTID0gICBbXCIjZmZmXCIsXCIjZDM5ZTAwXCIsXCIjYzY5NTAwXCJdO1xuXG4gICAgc3RhdGljIERBTkdFUl9DT0xPUlMgPSAgICAgICAgICBbXCIjZmZmXCIsXCIjZGMzNTQ1XCIsXCIjZGMzNTQ1XCJdO1xuICAgIHN0YXRpYyBEQU5HRVJfSE9WRVJfQ09MT1JTID0gICAgW1wiI2ZmZlwiLFwiI2M4MjMzM1wiLFwiI2JkMjEzMFwiXTtcbiAgICBzdGF0aWMgREFOR0VSX0RJU0FCTEVEX0NPTE9SUyA9IFtcIiNmZmZcIixcIiNkYzM1NDVcIixcIiNkYzM1NDVcIl07XG4gICAgc3RhdGljIERBTkdFUl9BQ1RJVkVfQ09MT1JTID0gICBbXCIjZmZmXCIsXCIjYmQyMTMwXCIsXCIjYjIxZjJkXCJdO1xuXG4gICAgc3RhdGljIExJR0hUX0NPTE9SUyA9ICAgICAgICAgIFtcIiMyMTI1MjlcIixcIiNmOGY5ZmFcIixcIiNmOGY5ZmFcIl07XG4gICAgc3RhdGljIExJR0hUX0hPVkVSX0NPTE9SUyA9ICAgIFtcIiMyMTI1MjlcIixcIiNlMmU2ZWFcIixcIiNkYWUwZTVcIl07XG4gICAgc3RhdGljIExJR0hUX0RJU0FCTEVEX0NPTE9SUyA9IFtcIiMyMTI1MjlcIixcIiNmOGY5ZmFcIixcIiNmOGY5ZmFcIl07XG4gICAgc3RhdGljIExJR0hUX0FDVElWRV9DT0xPUlMgPSAgIFtcIiMyMTI1MjlcIixcIiNkYWUwZTVcIixcIiNkM2Q5ZGZcIl07XG5cbiAgICBzdGF0aWMgREFSS19DT0xPUlMgPSAgICAgICAgICBbXCIjZmZmXCIsXCIjMzQzYTQwXCIsXCIjMzQzYTQwXCJdO1xuICAgIHN0YXRpYyBEQVJLX0hPVkVSX0NPTE9SUyA9ICAgIFtcIiNmZmZcIixcIiMyMzI3MmJcIixcIiMxZDIxMjRcIl07XG4gICAgc3RhdGljIERBUktfRElTQUJMRURfQ09MT1JTID0gW1wiI2ZmZlwiLFwiIzM0M2E0MFwiLFwiIzM0M2E0MFwiXTtcbiAgICBzdGF0aWMgREFSS19BQ1RJVkVfQ09MT1JTID0gICBbXCIjZmZmXCIsXCIjMWQyMTI0XCIsXCIjMTcxYTFkXCJdO1xufSIsImV4cG9ydCBjbGFzcyBDdXN0b21BcHBlYXJhbmNlIHtcblxuICAgIHN0YXRpYyBTSVpFX0RFRkFVTCA9IFwic2l6ZS1kZWZhdWx0XCI7XG4gICAgc3RhdGljIFNJWkVfU01BTEwgPSBcInNpemUtc21hbGxcIjtcbiAgICBzdGF0aWMgU0laRV9NRURJVU0gPSBcInNpemUtbWVkaXVtXCI7XG4gICAgc3RhdGljIFNJWkVfTEFSR0UgPSBcInNpemUtbGFyZ2VcIjtcblxuICAgIHN0YXRpYyBTSEFQRV9ERUFGVUxUID0gXCJzaGFwZS1kZWZhdWx0XCI7XG4gICAgc3RhdGljIFNIQVBFX1JPVU5EID0gXCJzaGFwZS1yb3VuZFwiO1xuICAgIHN0YXRpYyBTSEFQRV9TUVVBUkUgPSBcInNoYXBlLXNxdWFyZVwiO1xuXG4gICAgc3RhdGljIFZJU0lCSUxJVFlfREVBRlVMVCA9IFwidmlzaWJpbGl0eS1kZWZhdWx0XCI7XG4gICAgc3RhdGljIFZJU0lCSUxJVFlfVklTSUJMRSA9IFwidmlzaWJpbGl0eS12aXNpYmxlXCI7XG4gICAgc3RhdGljIFZJU0lCSUxJVFlfSElEREVOID0gXCJ2aXNpYmlsaXR5LWhpZGRlblwiO1xuXG4gICAgc3RhdGljIFNQQUNJTkdfREVGQVVMVCA9IFwic3BhY2luZy1kZWZhdWx0XCI7XG4gICAgc3RhdGljIFNQQUNJTkdfTk9ORSA9IFwic3BhY2luZy1ub25lXCI7XG4gICAgc3RhdGljIFNQQUNJTkdfQUJPVkUgPSBcInNwYWNpbmctYWJvdmVcIjtcbiAgICBzdGF0aWMgU1BBQ0lOR19CRUxPVyA9IFwic3BhY2luZy1iZWxvd1wiO1xuICAgIHN0YXRpYyBTUEFDSU5HX0FCT1ZFX0JFTE9XID0gXCJzcGFjaW5nLWFib3ZlLWJlbG93XCI7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5zaXplID0gQ3VzdG9tQXBwZWFyYW5jZS5TSVpFX0RFRkFVTFQ7XG4gICAgICAgIHRoaXMuc2hhcGUgPSBDdXN0b21BcHBlYXJhbmNlLlNIQVBFX0RFQUZVTFQ7XG4gICAgICAgIHRoaXMuc3BhY2luZyA9IEN1c3RvbUFwcGVhcmFuY2UuU1BBQ0lOR19ERUZBVUxUO1xuICAgICAgICB0aGlzLnZpc2liaWxpdHkgPSBDdXN0b21BcHBlYXJhbmNlLlZJU0lCSUxJVFlfREVBRlVMVDtcbiAgICAgICAgdGhpcy5sb2NrZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICB3aXRoU2l6ZShzaXplKSB7XG4gICAgICAgIHRoaXMuc2l6ZSA9IHNpemU7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHdpdGhTaGFwZShzaGFwZSkge1xuICAgICAgICB0aGlzLnNoYXBlID0gc2hhcGU7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHdpdGhTcGFjaW5nKHNwYWNpbmcpIHtcbiAgICAgICAgdGhpcy5zcGFjaW5nID0gc3BhY2luZztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgd2l0aFZpc2liaWxpdHkodmlzaWJpbGl0eSkge1xuICAgICAgICB0aGlzLnZpc2liaWxpdHkgPSB2aXNpYmlsaXR5O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbn0iLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwibnV0dGluMmMtY29yZV92MVwiO1xuXG5leHBvcnQgY2xhc3MgRGVwZW5kZW5jaWVzIHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudENsYXNzID0gQ29tcG9uZW50O1xuICAgIH1cblxufSIsImltcG9ydCB7IENvbnRhaW5lckV2ZW50IH0gZnJvbSBcImNvbnRhaW5lcmJyaWRnZV92MVwiO1xuaW1wb3J0IHsgTWV0aG9kIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5pbXBvcnQgeyBQcm90b3R5cGVDb25maWcsIFR5cGVDb25maWdQYWNrIH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5cbmV4cG9ydCBjbGFzcyBCYWNrU2hhZGVMaXN0ZW5lcnMge1xuXG4gICAgY29uc3RydWN0b3IoZXhpc3RpbmdMaXN0ZW5lcnMgPSBudWxsKSB7XG4gICAgICAgIHRoaXMuYmFja2dyb3VuZENsaWNrZWRMaXN0ZW5lciA9IChleGlzdGluZ0xpc3RlbmVycyAmJiBleGlzdGluZ0xpc3RlbmVycy5nZXRCYWNrZ3JvdW5kQ2xpY2tlZCkgPyBleGlzdGluZ0xpc3RlbmVycy5nZXRCYWNrZ3JvdW5kQ2xpY2tlZCgpIDogbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge01ldGhvZH0gYmFja2dyb3VuZENsaWNrZWRMaXN0ZW5lciBcbiAgICAgKi9cbiAgICB3aXRoQmFja2dyb3VuZENsaWNrZWQoYmFja2dyb3VuZENsaWNrZWRMaXN0ZW5lcikge1xuICAgICAgICB0aGlzLmJhY2tncm91bmRDbGlja2VkTGlzdGVuZXIgPSBiYWNrZ3JvdW5kQ2xpY2tlZExpc3RlbmVyO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cblxuICAgIGdldEJhY2tncm91bmRDbGlja2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5iYWNrZ3JvdW5kQ2xpY2tlZExpc3RlbmVyO1xuICAgIH1cblxuICAgIGNhbGxCYWNrZ3JvdW5kQ2xpY2tlZChldmVudCkge1xuICAgICAgICB0aGlzLmNhbGxMaXN0ZW5lcih0aGlzLmJhY2tncm91bmRDbGlja2VkTGlzdGVuZXIsIGV2ZW50KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge01ldGhvZH0gbGlzdGVuZXIgXG4gICAgICogQHBhcmFtIHtDb250YWluZXJFdmVudH0gZXZlbnQgXG4gICAgICovXG4gICAgY2FsbExpc3RlbmVyKGxpc3RlbmVyLCBldmVudCkge1xuICAgICAgICBpZiAobnVsbCAhPSBsaXN0ZW5lcikge1xuICAgICAgICAgICAgbGlzdGVuZXIuY2FsbChldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cblxuVHlwZUNvbmZpZ1BhY2suaW5zdGFuY2UoKS5hZGRUeXBlQ29uZmlnKFwibnV0dGluMmMtdWlcIiwgUHJvdG90eXBlQ29uZmlnLnVubmFtZWQoQmFja1NoYWRlTGlzdGVuZXJzKSk7IiwiaW1wb3J0IHtcbiAgICBDb21wb25lbnQsXG4gICAgQ2FudmFzU3R5bGVzLFxuICAgIEJhc2VFbGVtZW50LFxuICAgIFN0eWxlc2hlZXRCdWlsZGVyLFxuICAgIElubGluZUNvbXBvbmVudEZhY3RvcnksXG4gICAgQ29tcG9uZW50QnVpbGRlcixcbiAgICBTdHlsZXNoZWV0XG59IGZyb20gXCJudXR0aW4yYy1jb3JlX3YxXCI7XG5pbXBvcnQgeyBMb2dnZXIsIFRpbWVQcm9taXNlIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5pbXBvcnQgeyBJbmplY3Rpb25Qb2ludCwgUHJvdG90eXBlQ29uZmlnLCBUeXBlQ29uZmlnUGFjayB9IGZyb20gXCJtaW5kaV92MVwiO1xuaW1wb3J0IHsgQmFja1NoYWRlTGlzdGVuZXJzIH0gZnJvbSBcIi4vYmFja1NoYWRlTGlzdGVuZXJzLmpzXCI7XG5cbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJCYWNrU2hhZGVcIik7XG5cbmV4cG9ydCBjbGFzcyBCYWNrU2hhZGUge1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtCYWNrU2hhZGVMaXN0ZW5lcnN9IGJhY2tTaGFkZUxpc3RlbmVyc1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGJhY2tTaGFkZUxpc3RlbmVycyA9IG5ldyBCYWNrU2hhZGVMaXN0ZW5lcnMoKSl7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtJbmxpbmVDb21wb25lbnRGYWN0b3J5fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShJbmxpbmVDb21wb25lbnRGYWN0b3J5KTtcblxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudH0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSBudWxsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7QmFzZUVsZW1lbnR9ICovXG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gbnVsbDtcblxuICAgICAgICAvKiogQHR5cGUge0JhY2tTaGFkZUxpc3RlbmVyc30gKi9cbiAgICAgICAgdGhpcy5iYWNrU2hhZGVMaXN0ZW5lcnMgPSBiYWNrU2hhZGVMaXN0ZW5lcnM7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtib29sZWFufSAqL1xuICAgICAgICB0aGlzLmhpZGRlbiA9IHRydWU7XG5cdH1cblxuXHQvKipcblx0ICogXG4gICAgICogQHBhcmFtIHtTdHlsZXNoZWV0QnVpbGRlcn0gc3R5bGVzaGVldEJ1aWxkZXJcblx0ICogQHJldHVybnMge1N0eWxlc2hlZXR9XG5cdCAqL1xuXHRzdGF0aWMgYnVpbGRTdHlsZXNoZWV0KHN0eWxlc2hlZXRCdWlsZGVyKSB7XG5cdFx0cmV0dXJuIHN0eWxlc2hlZXRCdWlsZGVyXG5cdFx0XHQuc2VsZWN0b3IoXCIuYmFjay1zaGFkZVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIiwgXCJmaXhlZFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRvcFwiLCBcIjBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJsZWZ0XCIsIFwiMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInotaW5kZXhcIiwgXCIxMDQwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwid2lkdGhcIiwgXCIxMDB2d1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImhlaWdodFwiLCBcIjEwMHZoXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiMwMDBcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5iYWNrLXNoYWRlLnNob3dcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMC41XCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYmFjay1zaGFkZS5mYWRlXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNpdGlvblwiLCBcIm9wYWNpdHkgMC4zcyBlYXNlLWluLW91dFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIi1tb3otdHJhbnNpdGlvblwiLCBcIm9wYWNpdHkgMC4zcyBlYXNlLWluLW91dFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIi13ZWJraXQtdHJhbnNpdGlvblwiLCBcIm9wYWNpdHkgMC4zcyBlYXNlLWluLW91dFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuXHRcdFx0LmJ1aWxkKCk7XG5cdH1cblxuXHQvKipcblx0ICogXG5cdCAqIEBwYXJhbSB7Q29tcG9uZW50QnVpbGRlcn0gY29tcG9uZW50QnVpbGRlclxuXHQgKiBAcmV0dXJucyB7Q29tcG9uZW50fVxuXHQgKi9cblx0c3RhdGljIGJ1aWxkQ29tcG9uZW50KGNvbXBvbmVudEJ1aWxkZXIpIHtcblx0XHRyZXR1cm4gY29tcG9uZW50QnVpbGRlclxuXHRcdFx0LnJvb3QoXCJkaXZcIiwgXCJpZD1iYWNrU2hhZGVcIiwgXCJzdHlsZT16LWluZGV4OjM7ZGlzcGxheTpub25lO1wiLCBcImNsYXNzPWJhY2stc2hhZGVcIilcblx0XHRcdC5idWlsZCgpO1xuXHR9XG5cbiAgICBwb3N0Q29uZmlnKCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoQmFja1NoYWRlKTtcbiAgICB9XG5cbiAgICBoaWRlQWZ0ZXIobWlsbGlTZWNvbmRzKSB7XG4gICAgICAgIGlmICh0aGlzLmhpZGRlbikge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtyZXNvbHZlKCk7fSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5oaWRkZW4gPSB0cnVlO1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJiYWNrU2hhZGVcIikuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLCBcImJhY2stc2hhZGUgZmFkZVwiKTtcbiAgICAgICAgY29uc3QgaGlkZVByb21pc2UgPSBUaW1lUHJvbWlzZS5hc1Byb21pc2UobWlsbGlTZWNvbmRzLFxuICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJhY2tTaGFkZVwiKS5zZXRTdHlsZShcImRpc3BsYXlcIiwgXCJub25lXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgICBjb25zdCBkaXNhYmxlU3R5bGVQcm9taXNlID0gVGltZVByb21pc2UuYXNQcm9taXNlKG1pbGxpU2Vjb25kcyArIDEsXG4gICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgQ2FudmFzU3R5bGVzLmRpc2FibGVTdHlsZShCYWNrU2hhZGUubmFtZSwgdGhpcy5jb21wb25lbnQuY29tcG9uZW50SW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW2hpZGVQcm9taXNlLCBkaXNhYmxlU3R5bGVQcm9taXNlXSk7XG4gICAgfVxuXG4gICAgc2hvdygpIHtcbiAgICAgICAgaWYgKCF0aGlzLmhpZGRlbikge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtyZXNvbHZlKCk7fSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5oaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgQ2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKEJhY2tTaGFkZS5uYW1lLCB0aGlzLmNvbXBvbmVudC5jb21wb25lbnRJbmRleCk7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJhY2tTaGFkZVwiKS5zZXRTdHlsZShcImRpc3BsYXlcIiwgXCJibG9ja1wiKTtcbiAgICAgICAgcmV0dXJuIFRpbWVQcm9taXNlLmFzUHJvbWlzZSgxMDAsXG4gICAgICAgICAgICAoKSA9PiB7IFxuICAgICAgICAgICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJhY2tTaGFkZVwiKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImNsYXNzXCIsIFwiYmFjay1zaGFkZSBmYWRlIHNob3dcIilcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG4gICAgXG59XG5cblR5cGVDb25maWdQYWNrLmluc3RhbmNlKCkuYWRkVHlwZUNvbmZpZyhcIm51dHRpbjJjLXVpXCIsIFByb3RvdHlwZUNvbmZpZy51bm5hbWVkKEJhY2tTaGFkZSkpOyIsImltcG9ydCB7IENvbXBvbmVudCxcblx0Q2FudmFzU3R5bGVzLFxuXHRTdHlsZUFjY2Vzc29yLFxuXHRTdHlsZXNoZWV0QnVpbGRlcixcblx0Q29tcG9uZW50QnVpbGRlcixcblx0SW5saW5lQ29tcG9uZW50RmFjdG9yeSxcblx0U3R5bGVzaGVldFxufSBmcm9tIFwibnV0dGluMmMtY29yZV92MVwiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5pbXBvcnQgeyBJbmplY3Rpb25Qb2ludCwgUHJvdG90eXBlQ29uZmlnLCBUeXBlQ29uZmlnUGFjayB9IGZyb20gXCJtaW5kaV92MVwiO1xuXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiQmFja2dyb3VuZFwiKTtcblxuZXhwb3J0IGNsYXNzIEJhY2tncm91bmQge1xuXG4gICAgY29uc3RydWN0b3IoYmFja2dyb3VuZEltYWdlUGF0aCl7XG5cblx0XHQvKiogQHR5cGUge0lubGluZUNvbXBvbmVudEZhY3Rvcnl9ICovXG5cdFx0dGhpcy5jb21wb25lbnRGYWN0b3J5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoSW5saW5lQ29tcG9uZW50RmFjdG9yeSk7XG5cblx0XHQvKiogQHR5cGUge0NvbXBvbmVudH0gKi9cblx0XHR0aGlzLmNvbXBvbmVudCA9IG51bGw7XG5cblx0XHQvKiogQHR5cGUge3N0cmluZ30gKi9cblx0XHR0aGlzLmJhY2tncm91bmRJbWFnZVBhdGggPSBiYWNrZ3JvdW5kSW1hZ2VQYXRoO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBwYXJhbSB7U3R5bGVzaGVldEJ1aWxkZXJ9IHN0eWxlc2hlZXRCdWlsZGVyXG5cdCAqIEByZXR1cm5zIHtTdHlsZXNoZWV0fVxuXHQgKi9cblx0c3RhdGljIGJ1aWxkU3R5bGVzaGVldChzdHlsZXNoZWV0QnVpbGRlcikge1xuXHRcdHJldHVybiBzdHlsZXNoZWV0QnVpbGRlclxuXHRcdFx0LnNlbGVjdG9yKFwiLmJhY2tncm91bmRcIilcblx0XHRcdC5vcGVuKClcblx0XHRcdFx0LnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcInJnYigxNTAsIDE5NywgMjU1KVwiKVxuXHRcdFx0XHQuc3R5bGUoXCJiYWNrZ3JvdW5kLXJlcGVhdFwiLCBcIm5vLXJlcGVhdFwiKVxuXHRcdFx0XHQuc3R5bGUoXCJiYWNrZ3JvdW5kLXBvc2l0aW9uLXhcIiwgXCJjZW50ZXJcIilcblx0XHRcdFx0LnN0eWxlKFwiYmFja2dyb3VuZC1wb3NpdGlvbi15XCIsIFwiY2VudGVyXCIpXG5cdFx0XHRcdC5zdHlsZShcImJhY2tncm91bmQtYXR0YWNobWVudFwiLCBcInNjcm9sbFwiKVxuXHRcdFx0XHQuc3R5bGUoXCJiYWNrZ3JvdW5kLXNpemVcIiwgXCJjb3ZlclwiKVxuXHRcdFx0XHQuc3R5bGUoXCJmb250LWZhbWlseVwiLCBcIlNvdXJjZSBTYW5zIFByb1wiKVxuXHRcdFx0XHQuc3R5bGUoXCJmb250LXdlaWdodFwiLCBcIjMwMFwiKVxuXHRcdFx0XHQuc3R5bGUoXCJoZWlnaHRcIiwgXCIxMDAlXCIpXG5cdFx0XHQuY2xvc2UoKVxuXHRcdFx0LmJ1aWxkKCk7XG5cdH1cblxuXHQvKipcblx0ICogXG5cdCAqIEBwYXJhbSB7Q29tcG9uZW50QnVpbGRlcn0gdW5pcXVlSWRSZWdpc3RyeVxuXHQgKiBAcmV0dXJucyB7Q29tcG9uZW50fVxuXHQgKi9cblx0c3RhdGljIGJ1aWxkQ29tcG9uZW50KGNvbXBvbmVudEJ1aWxkZXIpIHtcblx0XHRyZXR1cm4gY29tcG9uZW50QnVpbGRlclxuXHRcdFx0LnJvb3QoXCJkaXZcIiwgXCJpZD1iYWNrZ3JvdW5kXCIsIFwiY2xhc3M9YmFja2dyb3VuZFwiKVxuXHRcdFx0LmJ1aWxkKCk7XG5cdH1cblxuXHRzZXQoa2V5LHZhbCkge1xuXHRcdHRoaXMuY29tcG9uZW50LnNldChrZXksdmFsKTtcblx0fVxuXG5cdHBvc3RDb25maWcoKSB7XG5cdFx0dGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKEJhY2tncm91bmQpO1xuXHRcdGlmICh0aGlzLmJhY2tncm91bmRJbWFnZVBhdGgpIHtcbiAgICAgICAgICAgIFN0eWxlQWNjZXNzb3IuZnJvbSh0aGlzLmNvbXBvbmVudC5nZXQoXCJiYWNrZ3JvdW5kXCIpKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJiYWNrZ3JvdW5kLWltYWdlXCIsIFwidXJsKFxcXCJcIiArIHRoaXMuYmFja2dyb3VuZEltYWdlUGF0aCArIFwiXFxcIilcIik7XG5cdFx0fVxuXHRcdENhbnZhc1N0eWxlcy5lbmFibGVTdHlsZShCYWNrZ3JvdW5kLm5hbWUpO1xuXHR9XG5cbn1cblxuVHlwZUNvbmZpZ1BhY2suaW5zdGFuY2UoKS5hZGRUeXBlQ29uZmlnKFwibnV0dGluMmMtdWlcIiwgUHJvdG90eXBlQ29uZmlnLnVubmFtZWQoQmFja2dyb3VuZCkpOyIsImltcG9ydCB7IFRpbWVQcm9taXNlIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5pbXBvcnQge1xuICAgIENhbnZhc1N0eWxlcyxcbiAgICBTdHlsZVNlbGVjdG9yQWNjZXNzb3IsXG4gICAgRXZlbnRNYW5hZ2VyLFxuICAgIFN0eWxlQWNjZXNzb3IsXG4gICAgQ29tcG9uZW50LFxuICAgIElubGluZUNvbXBvbmVudEZhY3RvcnksXG4gICAgQ29tcG9uZW50QnVpbGRlcixcbiAgICBTdHlsZXNoZWV0QnVpbGRlclxufSBmcm9tIFwibnV0dGluMmMtY29yZV92MVwiO1xuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQsIFByb3RvdHlwZUNvbmZpZywgVHlwZUNvbmZpZ1BhY2sgfSBmcm9tIFwibWluZGlfdjFcIjtcbmltcG9ydCB7IEN1c3RvbUFwcGVhcmFuY2UgfSBmcm9tIFwiLi4vLi4vY3VzdG9tQXBwZWFyYW5jZS5qc1wiO1xuXG5leHBvcnQgY2xhc3MgQmFubmVyTGFiZWxNZXNzYWdlIHtcblxuICAgIHN0YXRpYyBnZXQgRVZFTlRfQ0xPU0VfQ0xJQ0tFRCgpIHsgcmV0dXJuIFwiY2xvc2VDbGlja2VkXCI7IH1cblxuICAgIHN0YXRpYyBnZXQgVFlQRV9BTEVSVCgpIHsgcmV0dXJuIFwidHlwZS1hbGVydFwiOyB9XG4gICAgc3RhdGljIGdldCBUWVBFX0lORk8oKSB7IHJldHVybiBcInR5cGUtaW5mb1wiOyB9XG4gICAgc3RhdGljIGdldCBUWVBFX1NVQ0NFU1MoKSB7IHJldHVybiBcInR5cGUtc3VjY2Vzc1wiOyB9XG4gICAgc3RhdGljIGdldCBUWVBFX1dBUk5JTkcoKSB7IHJldHVybiBcInR5cGUtd2FybmluZ1wiOyB9XG5cbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlLCBiYW5uZXJUeXBlID0gQmFubmVyTGFiZWxNZXNzYWdlLlRZUEVfSU5GTywgY3VzdG9tQXBwZWFyYW5jZSA9IG51bGwpIHtcblxuICAgICAgICAvKiogQHR5cGUge0lubGluZUNvbXBvbmVudEZhY3Rvcnl9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKElubGluZUNvbXBvbmVudEZhY3RvcnkpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IG51bGw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtTdHJpbmd9ICovXG4gICAgICAgIHRoaXMuaGVhZGVyID0gbnVsbDtcblxuICAgICAgICAvKiogQHR5cGUge1N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcblxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5iYW5uZXJUeXBlID0gYmFubmVyVHlwZTtcblxuICAgICAgICAvKiogQHR5cGUge0N1c3RvbUFwcGVhcmFuY2V9ICovXG4gICAgICAgIHRoaXMuY3VzdG9tQXBwZWFyYW5jZSA9IGN1c3RvbUFwcGVhcmFuY2U7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtFdmVudE1hbmFnZXJ9ICovXG4gICAgICAgIHRoaXMuZXZlbnRNYW5hZ2VyID0gbmV3IEV2ZW50TWFuYWdlcigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3R5bGVzaGVldEJ1aWxkZXJ9IHN0eWxlc2hlZXRCdWlsZGVyIFxuICAgICAqIEByZXR1cm5zIFxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZFN0eWxlc2hlZXQoc3R5bGVzaGVldEJ1aWxkZXIpIHtcbiAgICAgICAgcmV0dXJuIHN0eWxlc2hlZXRCdWlsZGVyXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYmFubmVyLWxhYmVsLW1lc3NhZ2VcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjb2xvclwiLCBcIndoaXRlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwid2lkdGhcIiwgXCIxMDAlXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYmFubmVyLWxhYmVsLW1lc3NhZ2UtdmlzaWJsZVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwLjhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2l0aW9uXCIsIFwib3BhY2l0eSAuNXMgLjFzXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYmFubmVyLWxhYmVsLW1lc3NhZ2UtaGlkZGVuXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCBcIjBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2l0aW9uXCIsIFwib3BhY2l0eSAuNXMgMHNcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5iYW5uZXItbGFiZWwtbWVzc2FnZS1jbG9zZS1idXR0b25cIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tbGVmdFwiLCBcIjE1cHRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjb2xvclwiLCBcIndoaXRlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZm9udC13ZWlnaHRcIiwgXCJib2xkXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZmxvYXRcIiwgXCJyaWdodFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtc2l6ZVwiLCBcIjIycHRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJsaW5lLWhlaWdodFwiLCBcIjE0cHRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjdXJzb3JcIiwgXCJwb2ludGVyXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNpdGlvblwiLCBcIjAuM3NcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5iYW5uZXItbGFiZWwtbWVzc2FnZS1oZWFkZXJcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjb2xvclwiLCBcIndoaXRlXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYmFubmVyLWxhYmVsLW1lc3NhZ2UtdGV4dFwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpbi1sZWZ0XCIsIFwiMTVweFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmJhbm5lci1sYWJlbC1tZXNzYWdlLXR5cGUtYWxlcnRcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiI2Y0NDMzNlwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmJhbm5lci1sYWJlbC1tZXNzYWdlLXR5cGUtc3VjY2Vzc1wiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIiwgXCIjNENBRjUwXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYmFubmVyLWxhYmVsLW1lc3NhZ2UtdHlwZS1pbmZvXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiMyMTk2RjNcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5iYW5uZXItbGFiZWwtbWVzc2FnZS10eXBlLXdhcm5pbmdcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiI2ZmOTgwMFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmJhbm5lci1sYWJlbC1tZXNzYWdlLXNpemUtbGFyZ2VcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwYWRkaW5nXCIsIFwiMThwdFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmJhbm5lci1sYWJlbC1tZXNzYWdlLXNpemUtZGVmYXVsdFwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmdcIiwgXCIxMnB0XCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYmFubmVyLWxhYmVsLW1lc3NhZ2Utc2l6ZS1zbWFsbFwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmctbGVmdFwiLCBcIjEwcHRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwYWRkaW5nLXJpZ2h0XCIsIFwiMTBweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmctYm90dG9tXCIsIFwiOHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZy10b3BcIiwgXCI4cHhcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5iYW5uZXItbGFiZWwtbWVzc2FnZS1zaGFwZS1zcXVhcmVcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItcmFkaXVzXCIsIFwiMHB4XCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYmFubmVyLWxhYmVsLW1lc3NhZ2Utc2hhcGUtcm91bmRcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItcmFkaXVzXCIsIFwiM3B4XCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYmFubmVyLWxhYmVsLW1lc3NhZ2Utc3BhY2luZy1ub25lXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luXCIsIFwiMHB0XCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYmFubmVyLWxhYmVsLW1lc3NhZ2Utc3BhY2luZy1hYm92ZVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpbi10b3BcIiwgXCIxcmVtXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYmFubmVyLWxhYmVsLW1lc3NhZ2Utc3BhY2luZy1iZWxvd1wiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpbi1ib3R0b21cIiwgXCIxcmVtXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYmFubmVyLWxhYmVsLW1lc3NhZ2Utc3BhY2luZy1hYm92ZS1iZWxvd1wiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpbi10b3BcIiwgXCIxcmVtXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luLWJvdHRvbVwiLCBcIjFyZW1cIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5idWlsZCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Q29tcG9uZW50QnVpbGRlcn0gY29tcG9uZW50QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyBcbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRDb21wb25lbnQoY29tcG9uZW50QnVpbGRlcikge1xuICAgICAgICByZXR1cm4gY29tcG9uZW50QnVpbGRlclxuICAgICAgICAgICAgLnJvb3QoXCJkaXZcIiwgXCJpZD1iYW5uZXJMYWJlbE1lc3NhZ2VcIiwgXCJzdHlsZT1kaXNwbGF5Om5vbmU7XCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLm5vZGUoXCJkaXZcIiwgXCJpZD1iYW5uZXJMYWJlbE1lc3NhZ2VDb250ZW50XCIsIFwiY2xhc3M9YmFubmVyLWxhYmVsLW1lc3NhZ2UgYmFubmVyLWxhYmVsLW1lc3NhZ2UtaGlkZGVuXCIpXG4gICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAubm9kZShcInNwYW5cIiwgXCJpZD1iYW5uZXJMYWJlbE1lc3NhZ2VDbG9zZUJ1dHRvblwiLCBcImNsYXNzPWJhbm5lci1sYWJlbC1tZXNzYWdlLWNsb3NlLWJ1dHRvblwiKVxuICAgICAgICAgICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgICAgICAgICAudGV4dChcIsOXXCIpXG4gICAgICAgICAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAgICAgICAgIC5ub2RlKFwic3BhblwiLCBcImlkPWJhbm5lckxhYmVsTWVzc2FnZUhlYWRlclwiLCBcImNsYXNzPWJhbm5lci1sYWJlbC1tZXNzYWdlLWhlYWRlclwiKVxuICAgICAgICAgICAgICAgICAgICAubm9kZShcInNwYW5cIiwgXCJpZD1iYW5uZXJMYWJlbE1lc3NhZ2VUZXh0XCIsIFwiY2xhc3M9YmFubmVyLWxhYmVsLW1lc3NhZ2UtdGV4dFwiKVxuICAgICAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgYXN5bmMgcG9zdENvbmZpZygpIHtcblxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudH0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKEJhbm5lckxhYmVsTWVzc2FnZSk7XG4gICAgICAgIENhbnZhc1N0eWxlcy5lbmFibGVTdHlsZShCYW5uZXJMYWJlbE1lc3NhZ2UubmFtZSk7XG4gICAgICAgIFN0eWxlU2VsZWN0b3JBY2Nlc3Nvci5mcm9tKHRoaXMubWVzc2FnZUNvbnRlbnRFbGVtZW50KVxuICAgICAgICAgICAgLmVuYWJsZShcImJhbm5lci1sYWJlbC1tZXNzYWdlXCIpXG4gICAgICAgICAgICAuZW5hYmxlKFwiYmFubmVyLWxhYmVsLW1lc3NhZ2UtXCIgKyB0aGlzLmJhbm5lclR5cGUpO1xuXG4gICAgICAgIGlmICh0aGlzLmN1c3RvbUFwcGVhcmFuY2UgJiYgdGhpcy5jdXN0b21BcHBlYXJhbmNlLnNoYXBlKSB7XG4gICAgICAgICAgICBTdHlsZVNlbGVjdG9yQWNjZXNzb3IuZnJvbSh0aGlzLm1lc3NhZ2VDb250ZW50RWxlbWVudClcbiAgICAgICAgICAgICAgICAuZW5hYmxlKFwiYmFubmVyLWxhYmVsLW1lc3NhZ2UtXCIgKyB0aGlzLmN1c3RvbUFwcGVhcmFuY2Uuc2hhcGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmN1c3RvbUFwcGVhcmFuY2UgJiYgdGhpcy5jdXN0b21BcHBlYXJhbmNlLnNpemUpIHtcbiAgICAgICAgICAgIFN0eWxlU2VsZWN0b3JBY2Nlc3Nvci5mcm9tKHRoaXMubWVzc2FnZUNvbnRlbnRFbGVtZW50KVxuICAgICAgICAgICAgICAgIC5lbmFibGUoXCJiYW5uZXItbGFiZWwtbWVzc2FnZS1cIiArIHRoaXMuY3VzdG9tQXBwZWFyYW5jZS5zaXplKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5jdXN0b21BcHBlYXJhbmNlICYmIHRoaXMuY3VzdG9tQXBwZWFyYW5jZS5zcGFjaW5nKSB7XG4gICAgICAgICAgICBTdHlsZVNlbGVjdG9yQWNjZXNzb3IuZnJvbSh0aGlzLm1lc3NhZ2VDb250ZW50RWxlbWVudClcbiAgICAgICAgICAgICAgICAuZW5hYmxlKFwiYmFubmVyLWxhYmVsLW1lc3NhZ2UtXCIgKyB0aGlzLmN1c3RvbUFwcGVhcmFuY2Uuc3BhY2luZyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJiYW5uZXJMYWJlbE1lc3NhZ2VDbG9zZUJ1dHRvblwiKS5saXN0ZW5UbyhcImNsaWNrXCIsIHRoaXMuY2xvc2VDbGlja2VkLCB0aGlzKTtcbiAgICB9XG5cbiAgICBjbG9zZUNsaWNrZWQoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5ldmVudE1hbmFnZXIudHJpZ2dlcihCYW5uZXJMYWJlbE1lc3NhZ2UuRVZFTlRfQ0xPU0VfQ0xJQ0tFRCk7XG4gICAgfVxuXG4gICAgaGlkZSgpIHtcbiAgICAgICAgU3R5bGVTZWxlY3RvckFjY2Vzc29yLmZyb20odGhpcy5tZXNzYWdlQ29udGVudEVsZW1lbnQpXG4gICAgICAgICAgICAuZGlzYWJsZShcImJhbm5lci1sYWJlbC1tZXNzYWdlLXZpc2libGVcIilcbiAgICAgICAgICAgIC5lbmFibGUoXCJiYW5uZXItbGFiZWwtbWVzc2FnZS1oaWRkZW5cIik7XG5cbiAgICAgICAgdGhpcy5pc1Zpc2libGUgPSBmYWxzZTtcbiAgICAgICAgXG4gICAgICAgIFRpbWVQcm9taXNlLmFzUHJvbWlzZSg1MDAsICgpID0+IHtcbiAgICAgICAgICAgIGlmICghdGhpcy5pc1Zpc2libGUpIHtcbiAgICAgICAgICAgICAgICBTdHlsZUFjY2Vzc29yLmZyb20odGhpcy5jb21wb25lbnQuZ2V0KFwiYmFubmVyTGFiZWxNZXNzYWdlXCIpKVxuICAgICAgICAgICAgICAgICAgICAuc2V0KFwiZGlzcGxheVwiLCBcIm5vbmVcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNob3coKSB7XG4gICAgICAgIFN0eWxlQWNjZXNzb3IuZnJvbSh0aGlzLmNvbXBvbmVudC5nZXQoXCJiYW5uZXJMYWJlbE1lc3NhZ2VcIikpXG4gICAgICAgICAgICAuc2V0KFwiZGlzcGxheVwiLCBcImJsb2NrXCIpO1xuXG4gICAgICAgIFRpbWVQcm9taXNlLmFzUHJvbWlzZSg1MCwgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNWaXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgU3R5bGVTZWxlY3RvckFjY2Vzc29yLmZyb20odGhpcy5tZXNzYWdlQ29udGVudEVsZW1lbnQpXG4gICAgICAgICAgICAgICAgICAgIC5kaXNhYmxlKFwiYmFubmVyLWxhYmVsLW1lc3NhZ2UtaGlkZGVuXCIpXG4gICAgICAgICAgICAgICAgICAgIC5lbmFibGUoXCJiYW5uZXItbGFiZWwtbWVzc2FnZS12aXNpYmxlXCIpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5pc1Zpc2libGUgPSB0cnVlO1xuICAgIH1cblxuICAgIGdldCBtZXNzYWdlQ29udGVudEVsZW1lbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbXBvbmVudC5nZXQoXCJiYW5uZXJMYWJlbE1lc3NhZ2VDb250ZW50XCIpO1xuICAgIH1cblxuICAgIHNldE1lc3NhZ2UoaGVhZGVyLCBtZXNzYWdlKSB7XG4gICAgICAgIGlmIChoZWFkZXIpIHtcbiAgICAgICAgICAgIHRoaXMuYXBwbHlIZWFkZXIoaGVhZGVyKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobWVzc2FnZSkge1xuICAgICAgICAgICAgdGhpcy5hcHBseU1lc3NhZ2UobWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhcHBseUhlYWRlcihoZWFkZXIpIHtcbiAgICAgICAgdGhpcy5oZWFkZXIgPSBoZWFkZXI7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJhbm5lckxhYmVsTWVzc2FnZUhlYWRlclwiKS5zZXRDaGlsZCh0aGlzLmhlYWRlcik7XG4gICAgfVxuXG4gICAgYXBwbHlNZXNzYWdlKG1lc3NhZ2UpIHtcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYmFubmVyTGFiZWxNZXNzYWdlVGV4dFwiKS5zZXRDaGlsZCh0aGlzLm1lc3NhZ2UpO1xuICAgIH1cblxufVxuXG5UeXBlQ29uZmlnUGFjay5pbnN0YW5jZSgpLmFkZFR5cGVDb25maWcoXCJudXR0aW4yYy11aVwiLCBQcm90b3R5cGVDb25maWcudW5uYW1lZChCYW5uZXJMYWJlbE1lc3NhZ2UpKTsiLCJpbXBvcnQgeyBDYW52YXNTdHlsZXMsIENvbXBvbmVudEJ1aWxkZXIsIEV2ZW50TWFuYWdlciwgSW5saW5lQ29tcG9uZW50RmFjdG9yeSwgU3R5bGVzaGVldCwgU3R5bGVzaGVldEJ1aWxkZXIgfSBmcm9tIFwibnV0dGluMmMtY29yZV92MVwiO1xuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQsIFByb3RvdHlwZUNvbmZpZywgVHlwZUNvbmZpZ1BhY2sgfSBmcm9tIFwibWluZGlfdjFcIjtcbmltcG9ydCB7IEN1c3RvbUFwcGVhcmFuY2UgfSBmcm9tIFwiLi4vY3VzdG9tQXBwZWFyYW5jZS5qc1wiO1xuaW1wb3J0IHsgQmFubmVyTGFiZWxNZXNzYWdlIH0gZnJvbSBcIi4vYmFubmVyTGFiZWxNZXNzYWdlL2Jhbm5lckxhYmVsTWVzc2FnZS5qc1wiO1xuaW1wb3J0IHsgQ29udGFpbmVyQXN5bmMgfSBmcm9tIFwiY29udGFpbmVyYnJpZGdlX3YxXCI7XG5cbmV4cG9ydCBjbGFzcyBCYW5uZXJMYWJlbCB7XG5cbiAgICBzdGF0aWMgRVZFTlRfSElEREVOID0gXCJiYW5uZXJMYWJlbEhpZGRlblwiO1xuICAgIHN0YXRpYyBFVkVOVF9TSE9XTiA9IFwiYmFubmVyTGFiZWxTaG93blwiO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIC8qKiBAdHlwZSB7SW5saW5lQ29tcG9uZW50RmFjdG9yeX0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoSW5saW5lQ29tcG9uZW50RmFjdG9yeSk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnR9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gbnVsbDtcblxuXHRcdHRoaXMuYXBwZWFyYW5jZSA9IG5ldyBDdXN0b21BcHBlYXJhbmNlKClcblx0XHRcdC53aXRoU2l6ZShDdXN0b21BcHBlYXJhbmNlLlNJWkVfU01BTEwpXG5cdFx0XHQud2l0aFNoYXBlKEN1c3RvbUFwcGVhcmFuY2UuU0hBUEVfUk9VTkQpXG5cdFx0XHQud2l0aFNwYWNpbmcoQ3VzdG9tQXBwZWFyYW5jZS5TUEFDSU5HX0JFTE9XKTtcblxuXHRcdC8qKiBAdHlwZSB7QmFubmVyTGFiZWxNZXNzYWdlfSAqL1xuXHRcdHRoaXMuc3VjY2VzcyA9IEluamVjdGlvblBvaW50XG5cdFx0XHQuaW5zdGFuY2UoQmFubmVyTGFiZWxNZXNzYWdlLCBbXCJcIiwgQmFubmVyTGFiZWxNZXNzYWdlLlRZUEVfU1VDQ0VTUywgdGhpcy5hcHBlYXJhbmNlXSk7XG5cblx0XHQvKiogQHR5cGUge0Jhbm5lckxhYmVsTWVzc2FnZX0gKi9cblx0XHR0aGlzLndhcm5pbmcgPSBJbmplY3Rpb25Qb2ludFxuXHRcdFx0Lmluc3RhbmNlKEJhbm5lckxhYmVsTWVzc2FnZSwgW1wiXCIsIEJhbm5lckxhYmVsTWVzc2FnZS5UWVBFX1dBUk5JTkcsIHRoaXMuYXBwZWFyYW5jZV0pO1xuXG5cdFx0LyoqIEB0eXBlIHtCYW5uZXJMYWJlbE1lc3NhZ2V9ICovXG5cdFx0dGhpcy5lcnJvciA9IEluamVjdGlvblBvaW50XG5cdFx0XHQuaW5zdGFuY2UoQmFubmVyTGFiZWxNZXNzYWdlLCBbXCJcIiwgQmFubmVyTGFiZWxNZXNzYWdlLlRZUEVfQUxFUlQsIHRoaXMuYXBwZWFyYW5jZV0pO1xuXG4gICAgICAgIHRoaXMuaXNWaXNpYmxlID0gZmFsc2U7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtFdmVudE1hbmFnZXJ9ICovXG4gICAgICAgIHRoaXMuZXZlbnRzID0gbmV3IEV2ZW50TWFuYWdlcigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7U3R5bGVzaGVldEJ1aWxkZXJ9IHN0eWxlc2hlZXRCdWlsZGVyIFxuICAgICAqIEByZXR1cm5zIHtTdHlsZXNoZWV0fVxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZFN0eWxlc2hlZXQoc3R5bGVzaGVldEJ1aWxkZXIpIHtcbiAgICAgICAgcmV0dXJuIHN0eWxlc2hlZXRCdWlsZGVyXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYmFubmVyLWxhYmVsXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCJ3aGl0ZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIndpZHRoXCIsIFwiMTAwJVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm92ZXJmbG93XCIsIFwiaGlkZGVuXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIiwgXCJyZWxhdGl2ZVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmJhbm5lci1sYWJlbC12aXNpYmxlXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWF4LWhlaWdodFwiLCBcIjUwcHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ2aXNpYmlsaXR5XCIsIFwidmlzaWJsZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zaXRpb25cIiwgXCJtYXgtaGVpZ2h0IC4zcywgdmlzaWJpbGl0eSAwc1wiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmJhbm5lci1sYWJlbC1oaWRkZW5cIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXgtaGVpZ2h0XCIsIFwiMHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidmlzaWJpbGl0eVwiLCBcImhpZGRlblwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zaXRpb25cIiwgXCJtYXgtaGVpZ2h0IC4zcyAuM3MsIHZpc2liaWxpdHkgMHMgLjNzXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuYnVpbGQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudEJ1aWxkZXJ9IGNvbXBvbmVudEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMgXG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkQ29tcG9uZW50KGNvbXBvbmVudEJ1aWxkZXIpIHtcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudEJ1aWxkZXJcbiAgICAgICAgICAgIC5yb290KFwiZGl2XCIsIFwiaWQ9YmFubmVyTGFiZWxcIiwgXCJjbGFzcz1iYW5uZXItbGFiZWwgYmFubmVyLWxhYmVsLWhpZGRlblwiKVxuICAgICAgICAgICAgLmJ1aWxkKCk7XG4gICAgfVxuXG5cbiAgICBhc3luYyBwb3N0Q29uZmlnKCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoQmFubmVyTGFiZWwpO1xuICAgICAgICBDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUoQmFubmVyTGFiZWwubmFtZSk7XG4gICAgICAgIHRoaXMuc3VjY2Vzcy5oaWRlKCk7XG4gICAgICAgIHRoaXMud2FybmluZy5oaWRlKCk7XG4gICAgICAgIHRoaXMuZXJyb3IuaGlkZSgpO1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJiYW5uZXJMYWJlbFwiKS5hZGRDaGlsZCh0aGlzLnN1Y2Nlc3MuY29tcG9uZW50KTtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYmFubmVyTGFiZWxcIikuYWRkQ2hpbGQodGhpcy53YXJuaW5nLmNvbXBvbmVudCk7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJhbm5lckxhYmVsXCIpLmFkZENoaWxkKHRoaXMuZXJyb3IuY29tcG9uZW50KTtcbiAgICAgICAgdGhpcy5zdWNjZXNzLmV2ZW50TWFuYWdlci5saXN0ZW5UbyhCYW5uZXJMYWJlbE1lc3NhZ2UuRVZFTlRfQ0xPU0VfQ0xJQ0tFRCwgdGhpcy5oaWRlLCB0aGlzKTtcbiAgICAgICAgdGhpcy53YXJuaW5nLmV2ZW50TWFuYWdlci5saXN0ZW5UbyhCYW5uZXJMYWJlbE1lc3NhZ2UuRVZFTlRfQ0xPU0VfQ0xJQ0tFRCwgdGhpcy5oaWRlLCB0aGlzKTtcbiAgICAgICAgdGhpcy5lcnJvci5ldmVudE1hbmFnZXIubGlzdGVuVG8oQmFubmVyTGFiZWxNZXNzYWdlLkVWRU5UX0NMT1NFX0NMSUNLRUQsIHRoaXMuaGlkZSwgdGhpcyk7XG4gICAgICAgIHRoaXMuYWN0aXZlID0gdGhpcy5zdWNjZXNzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBoZWFkZXIgXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2UgXG4gICAgICovXG4gICAgc2hvd1N1Y2Nlc3MoaGVhZGVyLCBtZXNzYWdlKSB7XG4gICAgICAgIHRoaXMuc2hvd0Jhbm5lcih0aGlzLnN1Y2Nlc3MsIGhlYWRlciwgbWVzc2FnZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGhlYWRlciBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZSBcbiAgICAgKi9cbiAgICBzaG93V2FybmluZyhoZWFkZXIsIG1lc3NhZ2UpIHtcbiAgICAgICAgdGhpcy5zaG93QmFubmVyKHRoaXMud2FybmluZywgaGVhZGVyLCBtZXNzYWdlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaGVhZGVyIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlIFxuICAgICAqL1xuICAgIHNob3dFcnJvcihoZWFkZXIsIG1lc3NhZ2UpIHtcbiAgICAgICAgdGhpcy5zaG93QmFubmVyKHRoaXMuZXJyb3IsIGhlYWRlciwgbWVzc2FnZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGhlYWRlciBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZSBcbiAgICAgKi9cbiAgICBoaWRlKCkge1xuICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICAgIENvbnRhaW5lckFzeW5jLmRlbGF5KDYwMCwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5ldmVudHMudHJpZ2dlcihCYW5uZXJMYWJlbC5FVkVOVF9ISURERU4pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZXNldCgpIHtcblx0XHR0aGlzLmNvbXBvbmVudC5nZXQoXCJiYW5uZXJMYWJlbFwiKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImNsYXNzXCIsIFwiYmFubmVyLWxhYmVsIGJhbm5lci1sYWJlbC1oaWRkZW5cIik7XG4gICAgICAgIHRoaXMuYWN0aXZlLmhpZGUoKTtcbiAgICAgICAgdGhpcy5pc1Zpc2libGUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge0Jhbm5lckxhYmVsTWVzc2FnZX0gYmFubmVyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGhlYWRlclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAgICovXG4gICAgIHNob3dCYW5uZXIoYmFubmVyLCBoZWFkZXIsIG1lc3NhZ2UpIHtcbiAgICAgICAgdGhpcy5yZXNldCgpO1xuXHRcdGJhbm5lci5zZXRNZXNzYWdlKGhlYWRlciwgbWVzc2FnZSk7XG4gICAgICAgIGJhbm5lci5zaG93KCk7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJhbm5lckxhYmVsXCIpLnNldEF0dHJpYnV0ZVZhbHVlKFwiY2xhc3NcIiwgXCJiYW5uZXItbGFiZWwgYmFubmVyLWxhYmVsLXZpc2libGVcIik7XG4gICAgICAgIHRoaXMuaXNWaXNpYmxlID0gdHJ1ZTtcblx0XHR0aGlzLmFjdGl2ZSA9IGJhbm5lcjtcbiAgICAgICAgQ29udGFpbmVyQXN5bmMuZGVsYXkoNjAwLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmV2ZW50cy50cmlnZ2VyKEJhbm5lckxhYmVsLkVWRU5UX1NIT1dOKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5UeXBlQ29uZmlnUGFjay5pbnN0YW5jZSgpLmFkZFR5cGVDb25maWcoXCJudXR0aW4yYy11aVwiLCBQcm90b3R5cGVDb25maWcudW5uYW1lZChCYW5uZXJMYWJlbCkpOyIsImltcG9ydCB7XG4gICAgQ2FudmFzU3R5bGVzLFxuICAgIENvbXBvbmVudCxcbiAgICBTdHlsZXNoZWV0QnVpbGRlcixcbiAgICBDb21wb25lbnRCdWlsZGVyLFxuICAgIElubGluZUNvbXBvbmVudEZhY3RvcnksXG4gICAgU3R5bGVzaGVldFxufSBmcm9tIFwibnV0dGluMmMtY29yZV92MVwiO1xuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQsIFByb3RvdHlwZUNvbmZpZywgVHlwZUNvbmZpZ1BhY2sgfSBmcm9tIFwibWluZGlfdjFcIjtcbmltcG9ydCB7IExvZ2dlciwgTWV0aG9kLCBUaW1lUHJvbWlzZSB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuaW1wb3J0IHsgQ3VzdG9tQXBwZWFyYW5jZSB9IGZyb20gXCIuLi9jdXN0b21BcHBlYXJhbmNlLmpzXCI7XG5cbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJCYW5uZXJNZXNzYWdlXCIpO1xuXG5leHBvcnQgY2xhc3MgQmFubmVyTWVzc2FnZSB7XG5cbiAgICBzdGF0aWMgVFlQRV9BTEVSVCA9IFwidHlwZS1hbGVydFwiO1xuICAgIHN0YXRpYyBUWVBFX0lORk8gPSBcInR5cGUtaW5mb1wiO1xuICAgIHN0YXRpYyBUWVBFX1NVQ0NFU1MgPSBcInR5cGUtc3VjY2Vzc1wiO1xuICAgIHN0YXRpYyBUWVBFX1dBUk5JTkcgPSBcInR5cGUtd2FybmluZ1wiO1xuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGJhbm5lclR5cGUgXG4gICAgICogQHBhcmFtIHtib29sZWFufSBjbG9zZWFibGUgXG4gICAgICogQHBhcmFtIHtDdXN0b21BcHBlYXJhbmNlfSBjdXN0b21BcHBlYXJhbmNlXG4gICAgICovXG4gICAgY29uc3RydWN0b3IobWVzc2FnZSwgYmFubmVyVHlwZSA9IEJhbm5lck1lc3NhZ2UuVFlQRV9JTkZPLCBjbG9zZWFibGUgPSBmYWxzZSwgY3VzdG9tQXBwZWFyYW5jZSA9IG51bGwpIHtcblxuICAgICAgICAvKiogQHR5cGUge0lubGluZUNvbXBvbmVudEZhY3Rvcnl9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKElubGluZUNvbXBvbmVudEZhY3RvcnkpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IG51bGw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtib29sZWFufSAqL1xuICAgICAgICB0aGlzLmNsb3NlYWJsZSA9IGNsb3NlYWJsZTtcblxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5iYW5uZXJUeXBlID0gYmFubmVyVHlwZTtcblxuICAgICAgICAvKiogQHR5cGUge01ldGhvZH0gKi9cbiAgICAgICAgdGhpcy5vbkhpZGVMaXN0ZW5lciA9IG51bGw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtNZXRob2R9ICovXG4gICAgICAgIHRoaXMub25TaG93TGlzdGVuZXIgPSBudWxsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Q3VzdG9tQXBwZWFyYW5jZX0gKi9cbiAgICAgICAgdGhpcy5jdXN0b21BcHBlYXJhbmNlID0gY3VzdG9tQXBwZWFyYW5jZTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3R5bGVzaGVldEJ1aWxkZXJ9IHN0eWxlc2hlZXRCdWlsZGVyIFxuICAgICAqIEByZXR1cm5zIHtTdHlsZXNoZWV0fVxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZFN0eWxlc2hlZXQoc3R5bGVzaGVldEJ1aWxkZXIpIHtcbiAgICAgICAgcmV0dXJuIHN0eWxlc2hlZXRCdWlsZGVyXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYmFubmVyLW1lc3NhZ2Utc2l6ZS1sYXJnZVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmdcIiwgXCIxOHB0XCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYmFubmVyLW1lc3NhZ2Utc2l6ZS1kZWZhdWx0LCAuYmFubmVyLW1lc3NhZ2Utc2l6ZS1tZWRpdW1cIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwYWRkaW5nXCIsIFwiMTJwdFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmJhbm5lci1tZXNzYWdlLXNpemUtc21hbGxcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwYWRkaW5nLWxlZnRcIiwgXCIxMHB0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZy1yaWdodFwiLCBcIjEwcHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwYWRkaW5nLWJvdHRvbVwiLCBcIjhweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmctdG9wXCIsIFwiOHB4XCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYmFubmVyLW1lc3NhZ2Utc2hhcGUtZGVmYXVsdCwgLmJhbm5lci1tZXNzYWdlLXNoYXBlLXNxdWFyZVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1yYWRpdXNcIiwgXCIwcHhcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5iYW5uZXItbWVzc2FnZS1zaGFwZS1yb3VuZFwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1yYWRpdXNcIiwgXCIzcHhcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5iYW5uZXItbWVzc2FnZS1zcGFjaW5nLWRlZmF1bHQsIC5iYW5uZXItbWVzc2FnZS1zcGFjaW5nLW5vbmVcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW5cIiwgXCIwcHRcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5iYW5uZXItbWVzc2FnZS1zcGFjaW5nLWFib3ZlXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luLXRvcFwiLCBcIjFyZW1cIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5iYW5uZXItbWVzc2FnZS1zcGFjaW5nLWJlbG93XCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luLWJvdHRvbVwiLCBcIjFyZW1cIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5iYW5uZXItbWVzc2FnZS1zcGFjaW5nLWFib3ZlLWJlbG93XCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luLXRvcFwiLCBcIjFyZW1cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tYm90dG9tXCIsIFwiMXJlbVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmJhbm5lci1tZXNzYWdlXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCJ3aGl0ZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIndpZHRoXCIsIFwiMTAwJVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zaXRpb25cIiwgXCJvcGFjaXR5IDAuNXNcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5iYW5uZXItbWVzc2FnZS5oaWRlXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCBcIjBcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5iYW5uZXItbWVzc2FnZS5zaG93XCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCBcIjAuOTBcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5iYW5uZXItbWVzc2FnZS10eXBlLWFsZXJ0XCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiNmNDQzMzZcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5iYW5uZXItbWVzc2FnZS10eXBlLXN1Y2Nlc3NcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiIzRDQUY1MFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmJhbm5lci1tZXNzYWdlLXR5cGUtaW5mb1wiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIiwgXCIjMjE5NkYzXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYmFubmVyLW1lc3NhZ2UtdHlwZS13YXJuaW5nXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiNmZjk4MDBcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5iYW5uZXItbWVzc2FnZS1jbG9zZS1idXR0b25cIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tbGVmdFwiLCBcIjE1cHRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjb2xvclwiLCBcIndoaXRlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZm9udC13ZWlnaHRcIiwgXCJib2xkXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZmxvYXRcIiwgXCJyaWdodFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtc2l6ZVwiLCBcIjIycHRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJsaW5lLWhlaWdodFwiLCBcIjE0cHRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjdXJzb3JcIiwgXCJwb2ludGVyXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNpdGlvblwiLCBcIjAuM3NcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5iYW5uZXItbWVzc2FnZS1jbG9zZS1idXR0b246aG92ZXJcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjb2xvclwiLCBcImJsYWNrXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYmFubmVyLW1lc3NhZ2UtbWVzc2FnZVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpbi1sZWZ0XCIsIFwiMTVweFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDb21wb25lbnRCdWlsZGVyfSBjb21wb25lbnRCdWlsZGVyIFxuICAgICAqIEByZXR1cm5zIHtDb21wb25lbnR9XG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkQ29tcG9uZW50KGNvbXBvbmVudEJ1aWxkZXIpIHtcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudEJ1aWxkZXJcbiAgICAgICAgICAgIC5yb290KFwiZGl2XCIsIFwiaWQ9YmFubmVyTWVzc2FnZVwiLCBcImNsYXNzPWJhbm5lci1tZXNzYWdlXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLm5vZGUoXCJzcGFuXCIsIFwiaWQ9YmFubmVyTWVzc2FnZUNsb3NlQnV0dG9uXCIsIFwiY2xhc3M9YmFubmVyLW1lc3NhZ2UtY2xvc2UtYnV0dG9uXCIpXG4gICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAudGV4dChcIsOXXCIpXG4gICAgICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgICAgICAubm9kZShcInNwYW5cIiwgXCJpZD1iYW5uZXJNZXNzYWdlSGVhZGVyXCIsIFwiY2xhc3M9YmFubmVyLW1lc3NhZ2UtaGVhZGVyXCIpXG4gICAgICAgICAgICAgICAgLm5vZGUoXCJzcGFuXCIsIFwiaWQ9YmFubmVyTWVzc2FnZU1lc3NhZ2VcIiwgXCJjbGFzcz1iYW5uZXItbWVzc2FnZS1tZXNzYWdlXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgcG9zdENvbmZpZygpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKEJhbm5lck1lc3NhZ2UpO1xuICAgICAgICBDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUoQmFubmVyTWVzc2FnZS5uYW1lKTtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYmFubmVyTWVzc2FnZUhlYWRlclwiKS5zZXRDaGlsZChcIkFsZXJ0XCIpO1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJiYW5uZXJNZXNzYWdlTWVzc2FnZVwiKS5zZXRDaGlsZCh0aGlzLm1lc3NhZ2UpO1xuICAgICAgICB0aGlzLmFwcGx5Q2xhc3NlcyhcImJhbm5lci1tZXNzYWdlIGZhZGVcIik7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJhbm5lck1lc3NhZ2VDbG9zZUJ1dHRvblwiKS5saXN0ZW5UbyhcImNsaWNrXCIsIHRoaXMuaGlkZSwgdGhpcyk7XG4gICAgfVxuXG4gICAgYXBwbHlDbGFzc2VzKGJhc2VDbGFzc2VzKSB7XG4gICAgICAgIGxldCBjbGFzc2VzID0gYmFzZUNsYXNzZXM7XG4gICAgICAgIGNsYXNzZXMgPSBjbGFzc2VzICsgXCIgYmFubmVyLW1lc3NhZ2UtXCIgKyB0aGlzLmJhbm5lclR5cGU7XG4gICAgICAgIGlmICh0aGlzLmN1c3RvbUFwcGVhcmFuY2UpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmN1c3RvbUFwcGVhcmFuY2Uuc2hhcGUpIHtcbiAgICAgICAgICAgICAgICBjbGFzc2VzID0gY2xhc3NlcyArIFwiIGJhbm5lci1tZXNzYWdlLVwiICsgdGhpcy5jdXN0b21BcHBlYXJhbmNlLnNoYXBlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuY3VzdG9tQXBwZWFyYW5jZS5zaXplKSB7XG4gICAgICAgICAgICAgICAgY2xhc3NlcyA9IGNsYXNzZXMgKyBcIiBiYW5uZXItbWVzc2FnZS1cIiArIHRoaXMuY3VzdG9tQXBwZWFyYW5jZS5zaXplO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuY3VzdG9tQXBwZWFyYW5jZS5zcGFjaW5nKSB7XG4gICAgICAgICAgICAgICAgY2xhc3NlcyA9IGNsYXNzZXMgKyBcIiBiYW5uZXItbWVzc2FnZS1cIiArIHRoaXMuY3VzdG9tQXBwZWFyYW5jZS5zcGFjaW5nO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJhbm5lck1lc3NhZ2VcIikuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLGNsYXNzZXMpO1xuICAgIH1cbiAgICBcbiAgICBhcHBseUhlYWRlcihoZWFkZXIpIHtcbiAgICAgICAgdGhpcy5oZWFkZXIgPSBoZWFkZXI7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJhbm5lck1lc3NhZ2VIZWFkZXJcIikuc2V0Q2hpbGQodGhpcy5oZWFkZXIpO1xuICAgIH1cblxuICAgIGFwcGx5TWVzc2FnZShtZXNzYWdlKSB7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJhbm5lck1lc3NhZ2VNZXNzYWdlXCIpLnNldENoaWxkKHRoaXMubWVzc2FnZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtNZXRob2R9IGNsaWNrZWRMaXN0ZW5lciBcbiAgICAgKi9cbiAgICByZW1vdmUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbXBvbmVudC5yZW1vdmUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge01ldGhvZH0gb25IaWRlTGlzdGVuZXIgXG4gICAgICovXG4gICAgb25IaWRlKG9uSGlkZUxpc3RlbmVyKSB7XG4gICAgICAgIHRoaXMub25IaWRlTGlzdGVuZXIgPSBvbkhpZGVMaXN0ZW5lcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge01ldGhvZH0gb25TaG93TGlzdGVuZXIgXG4gICAgICovXG4gICAgb25TaG93KG9uU2hvd0xpc3RlbmVyKSB7XG4gICAgICAgIHRoaXMub25TaG93TGlzdGVuZXIgPSBvblNob3dMaXN0ZW5lcjtcbiAgICB9XG5cbiAgICBhc3luYyBoaWRlKCkge1xuICAgICAgICB0aGlzLmFwcGx5Q2xhc3NlcyhcImJhbm5lci1tZXNzYWdlIGhpZGVcIik7XG4gICAgICAgIGF3YWl0IFRpbWVQcm9taXNlLmFzUHJvbWlzZSg1MDAsICgpID0+IHsgXG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJiYW5uZXJNZXNzYWdlXCIpLnNldFN0eWxlKFwiZGlzcGxheVwiLFwibm9uZVwiKTtcbiAgICAgICAgICAgIENhbnZhc1N0eWxlcy5kaXNhYmxlU3R5bGUoQmFubmVyTWVzc2FnZS5uYW1lLCB0aGlzLmNvbXBvbmVudC5jb21wb25lbnRJbmRleCk7XG4gICAgICAgIH0pO1xuICAgICAgICBpZih0aGlzLm9uSGlkZUxpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLm9uSGlkZUxpc3RlbmVyLmNhbGwoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIHNob3cobmV3SGVhZGVyID0gbnVsbCwgbmV3TWVzc2FnZSA9IG51bGwpIHtcbiAgICAgICAgaWYgKG5ld0hlYWRlcikge1xuICAgICAgICAgICAgdGhpcy5hcHBseUhlYWRlcihuZXdIZWFkZXIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuZXdNZXNzYWdlKSB7XG4gICAgICAgICAgICB0aGlzLmFwcGx5TWVzc2FnZShuZXdNZXNzYWdlKTtcbiAgICAgICAgfVxuICAgICAgICBDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUoQmFubmVyTWVzc2FnZS5uYW1lLCB0aGlzLmNvbXBvbmVudC5jb21wb25lbnRJbmRleCk7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJhbm5lck1lc3NhZ2VcIikuc2V0U3R5bGUoXCJkaXNwbGF5XCIsXCJibG9ja1wiKTtcbiAgICAgICAgYXdhaXQgVGltZVByb21pc2UuYXNQcm9taXNlKDEwMCwoKSA9PiB7IFxuICAgICAgICAgICAgdGhpcy5hcHBseUNsYXNzZXMoXCJiYW5uZXItbWVzc2FnZSBzaG93XCIpO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYodGhpcy5vblNob3dMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5vblNob3dMaXN0ZW5lci5jYWxsKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cblxuVHlwZUNvbmZpZ1BhY2suaW5zdGFuY2UoKS5hZGRUeXBlQ29uZmlnKFwibnV0dGluMmMtdWlcIiwgUHJvdG90eXBlQ29uZmlnLnVubmFtZWQoQmFubmVyTWVzc2FnZSkpOyIsImltcG9ydCB7IFZpZGVvRWxlbWVudCxcblx0Q2FudmFzU3R5bGVzLFxuXHRDb21wb25lbnQsXG5cdFN0eWxlc2hlZXRCdWlsZGVyLFxuXHRDb21wb25lbnRCdWlsZGVyLFxuXHRJbmxpbmVDb21wb25lbnRGYWN0b3J5LCBcblx0U3R5bGVzaGVldFxuIH0gZnJvbSBcIm51dHRpbjJjLWNvcmVfdjFcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQsIFByb3RvdHlwZUNvbmZpZywgVHlwZUNvbmZpZ1BhY2sgfSBmcm9tIFwibWluZGlfdjFcIjtcbmltcG9ydCB7IENvbnRhaW5lckFzeW5jIH0gZnJvbSBcImNvbnRhaW5lcmJyaWRnZV92MVwiXG5cbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJCYWNrZ3JvdW5kVmlkZW9cIik7XG5cbmV4cG9ydCBjbGFzcyBCYWNrZ3JvdW5kVmlkZW8ge1xuXG4gICAgY29uc3RydWN0b3IodmlkZW9TcmMpe1xuXG4gICAgICAgIC8qKiBAdHlwZSB7SW5saW5lQ29tcG9uZW50RmFjdG9yeX0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoSW5saW5lQ29tcG9uZW50RmFjdG9yeSk7XG5cblx0XHQvKiogQHR5cGUge0NvbXBvbmVudH0gKi9cblx0XHR0aGlzLmNvbXBvbmVudCA9IG51bGw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtTdHJpbmd9ICovXG4gICAgICAgIHRoaXMudmlkZW9TcmMgPSB2aWRlb1NyYztcblx0fVxuXG5cdC8qKlxuXHQgKiBcbiAgICAgKiBAcGFyYW0ge1N0eWxlc2hlZXRCdWlsZGVyfSBzdHlsZXNoZWV0QnVpbGRlclxuXHQgKiBAcmV0dXJucyB7U3R5bGVzaGVldH1cblx0ICovXG5cdHN0YXRpYyBidWlsZFN0eWxlc2hlZXQoc3R5bGVzaGVldEJ1aWxkZXIpIHtcblx0XHRyZXR1cm4gc3R5bGVzaGVldEJ1aWxkZXJcblx0XHRcdC5zZWxlY3RvcihcIi5iYWNrZ3JvdW5kLXZpZGVvXCIpXG5cdFx0XHQub3BlbigpXG5cdFx0XHRcdC5zdHlsZShcIndpZHRoXCIsIFwiYXV0b1wiKVxuXHRcdFx0XHQuc3R5bGUoXCJoZWlnaHRcIiwgXCJhdXRvXCIpXG5cdFx0XHQuY2xvc2UoKVxuXG5cdFx0XHQuc2VsZWN0b3IoXCIuYmFja2dyb3VuZC12aWRlby1wbGF5ZXJcIilcblx0XHRcdC5vcGVuKClcblx0XHRcdFx0LnN0eWxlKFwicG9zaXRpb25cIiwgXCJmaXhlZFwiKVxuXHRcdFx0XHQuc3R5bGUoXCJ0b3BcIiwgXCI1MCVcIilcblx0XHRcdFx0LnN0eWxlKFwibGVmdFwiLCBcIjUwJVwiKVxuXHRcdFx0XHQuc3R5bGUoXCJtaW4td2lkdGhcIiwgXCIxMDAlXCIpXG5cdFx0XHRcdC5zdHlsZShcIm1pbi1oZWlnaHRcIiwgXCIxMDAlXCIpXG5cdFx0XHRcdC5zdHlsZShcIndpZHRoXCIsIFwiYXV0b1wiKVxuXHRcdFx0XHQuc3R5bGUoXCJoZWlnaHRcIiwgXCJhdXRvXCIpXG5cdFx0XHRcdC5zdHlsZShcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZVgoLTUwJSkgdHJhbnNsYXRlWSgtNTAlKVwiKVxuXHRcdFx0XHQuc3R5bGUoXCJ6LWluZGV4XCIsIFwiMFwiKVxuXHRcdFx0LmNsb3NlKClcblxuXHRcdFx0LnNlbGVjdG9yKFwiLmJhY2tncm91bmQtdmlkZW8tb3ZlcmxheVwiKVxuXHRcdFx0Lm9wZW4oKVxuXHRcdFx0XHQuc3R5bGUoXCJwb3NpdGlvblwiLCBcImFic29sdXRlXCIpXG5cdFx0XHRcdC5zdHlsZShcIm1pbi13aWR0aFwiLCBcIjEwMCVcIilcblx0XHRcdFx0LnN0eWxlKFwibWluLWhlaWdodFwiLCBcIjEwMCVcIilcblx0XHRcdFx0LnN0eWxlKFwid2lkdGhcIiwgXCJhdXRvXCIpXG5cdFx0XHRcdC5zdHlsZShcImhlaWdodFwiLCBcImF1dG9cIilcblx0XHRcdFx0LnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiMxMTQ0YWFcIilcblx0XHRcdFx0LnN0eWxlKFwib3BhY2l0eVwiLCBcIjAuM1wiKVxuXHRcdFx0XHQuc3R5bGUoXCJ6LWluZGV4XCIsIFwiMVwiKVxuXHRcdFx0LmNsb3NlKClcblx0XHRcdFx0XG5cdFx0XHQuYnVpbGQoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBcblx0ICogQHBhcmFtIHtDb21wb25lbnRCdWlsZGVyfSBjb21wb25lbnRCdWlsZGVyXG5cdCAqIEByZXR1cm5zIHtDb21wb25lbnR9XG5cdCAqL1xuXHRzdGF0aWMgYnVpbGRDb21wb25lbnQoY29tcG9uZW50QnVpbGRlcikge1xuXHRcdHJldHVybiBjb21wb25lbnRCdWlsZGVyXG5cdFx0XHQucm9vdChcImRpdlwiLCBcImlkPWJhY2tncm91bmRWaWRlb1wiLCBcImNsYXNzPWJhY2tncm91bmQtdmlkZW9cIilcblx0XHRcdC5vcGVuKClcblx0XHRcdFx0Lm5vZGUoXCJkaXZcIiwgXCJjbGFzcz1iYWNrZ3JvdW5kLXZpZGVvLW92ZXJsYXlcIilcblx0XHRcdFx0Lm5vZGUoXCJ2aWRlb1wiLCBcImlkPXZpZGVvXCIsIFwiY2xhc3M9YmFja2dyb3VuZC12aWRlby1wbGF5ZXJcIixcblx0XHRcdFx0ICAgICAgICBcInBsYXlzaW5saW5lPXBsYXlzaW5saW5lXCIsXG5cdFx0XHRcdFx0XHRcImF1dG9wbGF5PXRydWVcIixcblx0XHRcdFx0ICAgICAgICBcIm11dGVkPXRydWVcIiwgXCJsb29wPWxvb3BcIilcblx0XHRcdFx0Lm9wZW4oKVxuXHRcdFx0XHRcdC5ub2RlKFwic291cmNlXCIsIFwiaWQ9c291cmNlXCIsIFwic3JjPVwiLCBcInR5cGU9dmlkZW8vbXA0XCIpXG5cdFx0XHRcdC5jbG9zZSgpXG5cdFx0XHQuY2xvc2UoKVxuXHRcdFx0LmJ1aWxkKCk7XG5cdH1cblxuXHRzZXQoa2V5LHZhbCkge1xuXHRcdHRoaXMuY29tcG9uZW50LnNldChrZXksdmFsKTtcblx0fVxuXG5cdHBvc3RDb25maWcoKSB7XG5cdFx0dGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKEJhY2tncm91bmRWaWRlbyk7XG5cdFx0Q2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKEJhY2tncm91bmRWaWRlby5uYW1lKTtcblxuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJzb3VyY2VcIikuc2V0QXR0cmlidXRlVmFsdWUoXCJzcmNcIiwgdGhpcy52aWRlb1NyYyk7XG5cdH1cblxuXHRhc3luYyBwbGF5TXV0ZWQoKSB7XG5cdFx0YXdhaXQgQ29udGFpbmVyQXN5bmMucGF1c2UoMTAwKTtcblx0XHQvKiogQHR5cGUge1ZpZGVvRWxlbWVudH0gKi9cblx0XHRjb25zdCB2aWRlbyA9IHRoaXMuY29tcG9uZW50LmdldChcInZpZGVvXCIpO1xuXHRcdHZpZGVvLnBsYXlNdXRlZCgpO1xuXHR9XG5cbn1cblxuVHlwZUNvbmZpZ1BhY2suaW5zdGFuY2UoKS5hZGRUeXBlQ29uZmlnKFwibnV0dGluMmMtdWlcIiwgUHJvdG90eXBlQ29uZmlnLnVubmFtZWQoQmFja2dyb3VuZFZpZGVvKSk7IiwiaW1wb3J0IHtcbiAgICBDYW52YXNTdHlsZXMsXG4gICAgQ29tcG9uZW50LFxuICAgIFN0eWxlc2hlZXRCdWlsZGVyLFxuICAgIENvbXBvbmVudEJ1aWxkZXIsXG4gICAgSW5saW5lQ29tcG9uZW50RmFjdG9yeSxcbiAgICBTdHlsZXNoZWV0LFxuICAgIENzczNTdHlsZXNoZWV0QnVpbGRlcixcbiAgICBIVE1MLFxuICAgIFNpbXBsZUVsZW1lbnRcbn0gZnJvbSBcIm51dHRpbjJjLWNvcmVfdjFcIjtcbmltcG9ydCB7IEluamVjdGlvblBvaW50LCBQcm90b3R5cGVDb25maWcsIFR5cGVDb25maWdQYWNrIH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcblxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIkJ1YmJsZU1lc3NhZ2VcIik7XG5cbmV4cG9ydCBjbGFzcyBCdWJibGVNZXNzYWdlIHtcblxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2UgXG4gICAgICogQHBhcmFtIHtTdHJpbmdbXX0gbGlzdEl0ZW1zXG4gICAgICovXG4gICAgY29uc3RydWN0b3IobWVzc2FnZSwgbGlzdEl0ZW1zID0gW10pIHtcblxuICAgICAgICAvKiogQHR5cGUge0lubGluZUNvbXBvbmVudEZhY3Rvcnl9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKElubGluZUNvbXBvbmVudEZhY3RvcnkpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7U3RyaW5nfSAqL1xuICAgICAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7U3RyaW5nW119ICovXG4gICAgICAgIHRoaXMubGlzdEl0ZW1zID0gbGlzdEl0ZW1zO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IG51bGw7XG5cbiAgICB9XG5cbiAgICBwb3N0Q29uZmlnKCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoQnViYmxlTWVzc2FnZSk7XG4gICAgICAgIENhbnZhc1N0eWxlcy5lbmFibGVTdHlsZShCdWJibGVNZXNzYWdlLm5hbWUpO1xuXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJ1YmJsZU1lc3NhZ2VcIikuYWRkQ2hpbGQodGhpcy5tZXNzYWdlKTtcblxuICAgICAgICBpZiAodGhpcy5saXN0SXRlbXMubGVuZ3RoID4gMCkge1xuXG4gICAgICAgICAgICAvKiogQHR5cGUge1NpbXBsZUVsZW1lbnR9ICovXG4gICAgICAgICAgICBjb25zdCBsaXN0ID0gSFRNTC5jdXN0b20oXCJ1bFwiKTtcbiAgICAgICAgICAgIGxpc3Quc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLCBcImJ1YmJsZS1tZXNzYWdlLWlucHV0LXZhbHVlLWNyaWVyaWEtbGlzdFwiKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZm9yIChjb25zdCBsaXN0SXRlbSBvZiB0aGlzLmxpc3RJdGVtcykge1xuICAgICAgICAgICAgICAgIC8qKiBAdHlwZSB7U2ltcGxlRWxlbWVudH0gKi9cbiAgICAgICAgICAgICAgICBjb25zdCBsaXN0RW50cnkgPSBIVE1MLmN1c3RvbShcImxpXCIpO1xuICAgICAgICAgICAgICAgIGxpc3RFbnRyeS5hZGRDaGlsZChsaXN0SXRlbSk7XG4gICAgICAgICAgICAgICAgbGlzdC5hZGRDaGlsZChsaXN0RW50cnkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYnViYmxlTWVzc2FnZVwiKS5hZGRDaGlsZChsaXN0KTtcblxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgaSA9IEhUTUwuY3VzdG9tKFwiaVwiKTtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYnViYmxlTWVzc2FnZVwiKS5hZGRDaGlsZChpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge1N0eWxlc2hlZXRCdWlsZGVyfSBzdHlsZXNoZWV0QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyB7U3R5bGVzaGVldH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRTdHlsZXNoZWV0KHN0eWxlc2hlZXRCdWlsZGVyKSB7XG4gICAgICAgIENzczNTdHlsZXNoZWV0QnVpbGRlci5jcmVhdGUoc3R5bGVzaGVldEJ1aWxkZXIpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5idWJibGUtbWVzc2FnZVwiKVxuICAgICAgICAgICAgICAgIC53aWR0aChcImZpdC1jb250ZW50XCIpXG4gICAgICAgICAgICAgICAgLmNvbG9yKFwiIzMzMzMzM1wiKVxuICAgICAgICAgICAgICAgIC50cmFuc2Zvcm0oXCJ0cmFuc2xhdGUoKzVweCwtNXB4KVwiKVxuICAgICAgICAgICAgICAgIC5iYWNrZ3JvdW5kQ29sb3IoXCIjRkZGRkUwXCIpXG4gICAgICAgICAgICAgICAgLmZvbnRXZWlnaHQoXCJub3JtYWxcIilcbiAgICAgICAgICAgICAgICAuZm9udFNpemUoXCIxNHB4XCIpXG4gICAgICAgICAgICAgICAgLmJvcmRlclJhZGl1cyhcIjhweFwiKVxuICAgICAgICAgICAgICAgIC5wb3NpdGlvbihcInJlbGF0aXZlXCIpXG4gICAgICAgICAgICAgICAgLnpJbmRleChcIjk5OTk5OTk4XCIpXG4gICAgICAgICAgICAgICAgLmJveFNpemluZyhcImJvcmRlci1ib3hcIilcbiAgICAgICAgICAgICAgICAuYm94U2hhZG93KFwiMFwiLCBcIjFweFwiLCBcIjhweFwiLCBudWxsLCBcInJnYmEoMCwwLDAsMC41KVwiKVxuICAgICAgICAgICAgICAgIC5jdXJzb3IoXCJwb2ludGVyXCIpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5idWJibGUtbWVzc2FnZS1oaWRkZW5cIilcbiAgICAgICAgICAgICAgICAudHJhbnNpdGlvbihbXCJtYXgtaGVpZ2h0XCIsIFwiLjNzXCIsIFwiLjJzXCJdLCBbXCJwYWRkaW5nXCIsIFwiLjNzXCIsIFwiLjJzXCJdLCBbXCJvcGFjaXR5XCIsIFwiLjJzXCIsIFwiMHNcIl0sIFtcInZpc2liaWxpdHlcIiwgXCIwc1wiLCBcIi4yc1wiXSlcbiAgICAgICAgICAgICAgICAub3BhY2l0eShcIjBcIilcbiAgICAgICAgICAgICAgICAucGFkZGluZyhcIjBweFwiLFwiMHB4XCIsIG51bGwsIG51bGwpXG4gICAgICAgICAgICAgICAgLm1heEhlaWdodChcIjBweFwiKVxuICAgICAgICAgICAgICAgIC5kaXNwbGF5KFwiYmxvY2tcIilcbiAgICAgICAgICAgICAgICAudmlzaWJpbGl0eShcImhpZGRlblwiKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYnViYmxlLW1lc3NhZ2UtdmlzaWJsZVwiKVxuICAgICAgICAgICAgICAgIC50cmFuc2l0aW9uKFtcIm1heC1oZWlnaHRcIiwgXCIuM3NcIiwgXCIwc1wiXSwgW1wicGFkZGluZ1wiLCBcIi4yc1wiLCBcIjBzXCJdLCBbXCJvcGFjaXR5XCIsIFwiLjJzXCIsIFwiLjJzXCJdKVxuICAgICAgICAgICAgICAgIC5vcGFjaXR5KFwiMVwiKVxuICAgICAgICAgICAgICAgIC5wYWRkaW5nKFwiMTBweFwiLCBcIjIwcHhcIiwgXCIxMHB4XCIsIFwiMjBweFwiKVxuICAgICAgICAgICAgICAgIC5kaXNwbGF5KFwiYmxvY2tcIilcbiAgICAgICAgICAgICAgICAudmlzaWJpbGl0eShcInZpc2libGVcIilcbiAgICAgICAgICAgICAgICAubWFyZ2luKFwiMTBweFwiLCBudWxsLCBudWxsLCBudWxsKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYnViYmxlLW1lc3NhZ2UgaVwiKVxuICAgICAgICAgICAgICAgIC5wb3NpdGlvbihcImFic29sdXRlXCIpXG4gICAgICAgICAgICAgICAgLnRvcChcIjEwMCVcIilcbiAgICAgICAgICAgICAgICAubGVmdChcIjMwJVwiKVxuICAgICAgICAgICAgICAgIC5tYXJnaW4obnVsbCwgbnVsbCwgbnVsbCwgXCItMTVweFwiKVxuICAgICAgICAgICAgICAgIC53aWR0aChcIjMwcHhcIilcbiAgICAgICAgICAgICAgICAuaGVpZ2h0KFwiMTVweFwiKVxuICAgICAgICAgICAgICAgIC5vdmVyZmxvdyhcImhpZGRlblwiKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYnViYmxlLW1lc3NhZ2UgaTo6YWZ0ZXJcIilcbiAgICAgICAgICAgICAgICAuY29udGVudChcIicnXCIpXG4gICAgICAgICAgICAgICAgLnBvc2l0aW9uKFwiYWJzb2x1dGVcIilcbiAgICAgICAgICAgICAgICAud2lkdGgoXCIxNXB4XCIpXG4gICAgICAgICAgICAgICAgLmhlaWdodChcIjE1cHhcIilcbiAgICAgICAgICAgICAgICAubGVmdChcIjUwJVwiKVxuICAgICAgICAgICAgICAgIC50cmFuc2Zvcm0oXCJ0cmFuc2xhdGUoLTUwJSwtNTAlKSByb3RhdGUoNDVkZWcpXCIpXG4gICAgICAgICAgICAgICAgLmJhY2tncm91bmRDb2xvcihcIiNGRkZGRTBcIilcbiAgICAgICAgICAgICAgICAuYm94U2hhZG93KFwiMFwiLCBcIjFweFwiLCBcIjhweFwiLCBudWxsLCBcInJnYmEoMCwwLDAsMC41KVwiKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYnViYmxlLW1lc3NhZ2UtaW5wdXQtdmFsdWUtY3JpZXJpYS1saXN0XCIpXG4gICAgICAgICAgICAgICAgLm1hcmdpbihcIjBcIiwgbnVsbCwgXCIwXCIsIG51bGwpO1xuXG4gICAgICAgIHJldHVybiBzdHlsZXNoZWV0QnVpbGRlci5idWlsZCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Q29tcG9uZW50QnVpbGRlcn0gY29tcG9uZW50QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyB7Q29tcG9uZW50fVxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZENvbXBvbmVudChjb21wb25lbnRCdWlsZGVyKSB7XG4gICAgICAgIGNvbXBvbmVudEJ1aWxkZXJcbiAgICAgICAgICAgIC5yb290KFwiZGl2XCIsIFwiaWQ9YnViYmxlTWVzc2FnZVwiLCBcImNsYXNzPWJ1YmJsZS1tZXNzYWdlIGJ1YmJsZS1tZXNzYWdlLWhpZGRlblwiKTtcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudEJ1aWxkZXIuYnVpbGQoKTtcbiAgICB9XG5cbiAgICBzaG93KCkgeyB0aGlzLmNvbXBvbmVudC5nZXQoXCJidWJibGVNZXNzYWdlXCIpLnNldEF0dHJpYnV0ZVZhbHVlKFwiY2xhc3NcIiwgXCJidWJibGUtbWVzc2FnZSBidWJibGUtbWVzc2FnZS12aXNpYmxlXCIpOyB9XG4gICAgaGlkZSgpIHsgdGhpcy5jb21wb25lbnQuZ2V0KFwiYnViYmxlTWVzc2FnZVwiKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImNsYXNzXCIsIFwiYnViYmxlLW1lc3NhZ2UgYnViYmxlLW1lc3NhZ2UtaGlkZGVuXCIpOyB9XG59XG5cblR5cGVDb25maWdQYWNrLmluc3RhbmNlKCkuYWRkVHlwZUNvbmZpZyhcIm51dHRpbjJjLXVpXCIsIFByb3RvdHlwZUNvbmZpZy51bm5hbWVkKEJ1YmJsZU1lc3NhZ2UpKTsiLCJleHBvcnQgY2xhc3MgQ29tbW9uRXZlbnRzIHtcblxuICAgIHN0YXRpYyBIT1ZFUkVEID0gXCJob3ZlcmVkXCI7XG4gICAgc3RhdGljIFVOSE9WRVJFRCA9IFwidW5ob3ZlcmVkXCI7XG4gICAgc3RhdGljIENMSUNLRUQgPSBcImNsaWNrZWRcIjtcbiAgICBzdGF0aWMgRE9VQkxFX0NMSUNLRUQgPSBcImRvdWJsZUNsaWNrZWRcIjtcblxuICAgIHN0YXRpYyBFTlRFUkVEID0gXCJlbnRlcmVkXCI7XG4gICAgc3RhdGljIEtFWVVQUEVEID0gXCJrZXlVcHBlZFwiO1xuICAgIHN0YXRpYyBGT0NVU0VEID0gXCJmb2N1c2VkXCI7XG4gICAgc3RhdGljIEJMVVJSRUQgPSBcImJsdXJyZWRcIjtcblxuICAgIHN0YXRpYyBDSEFOR0VEID0gXCJjaGFuZ2VkXCI7XG4gICAgc3RhdGljIEVOQUJMRUQgPSBcImVuYWJsZWRcIjtcbiAgICBzdGF0aWMgRElTQUJMRUQgPSBcImRpc2FibGVkXCI7XG4gICAgc3RhdGljIFNFTEVDVEVEID0gXCJzZWxlY3RlZFwiO1xuICAgIHN0YXRpYyBJTlBVVCA9IFwiaW5wdXRcIjtcbiAgICBzdGF0aWMgTE9BREVEID0gXCJsb2FkZWRcIjtcblxuICAgIHN0YXRpYyBEUkFHX1NUQVJURUQgPSBcImRyYWdTdGFydGVkXCI7XG4gICAgc3RhdGljIERSQUdfRU5ERUQgPSBcImRyYWdFbmRlZFwiO1xuICAgIHN0YXRpYyBEUk9QUEVEID0gXCJkcm9wcGVkXCI7XG4gICAgXG59IiwiZXhwb3J0IGNsYXNzIENvbG9yQXBwbGljYXRvciB7XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0eWxlc2hlZXRCdWlsZGVyfSBzdHlsZXNoZWV0QnVpbGRlciBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0b3IgXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGZvbnRDb2xvciBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gYmFja2dyb3VuZENvbG9yIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBib3JkZXJDb2xvciBcbiAgICAgKiBAcmV0dXJucyBcbiAgICAgKi9cbiAgICBzdGF0aWMgYXBwbHkoc3R5bGVzaGVldEJ1aWxkZXIsIHNlbGVjdG9yLCBmb250Q29sb3IsIGJhY2tncm91bmRDb2xvciwgYm9yZGVyQ29sb3IpIHtcbiAgICAgICAgcmV0dXJuIHN0eWxlc2hlZXRCdWlsZGVyLnNlbGVjdG9yKHNlbGVjdG9yKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbG9yXCIsIGZvbnRDb2xvcilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIGJhY2tncm91bmRDb2xvcilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItY29sb3JcIiwgYm9yZGVyQ29sb3IpXG4gICAgICAgICAgICAuY2xvc2UoKTtcbiAgICB9XG5cbn0iLCJpbXBvcnQgeyBTdHlsZXNoZWV0QnVpbGRlciB9IGZyb20gXCJudXR0aW4yYy1jb3JlX3YxXCI7XG5pbXBvcnQgeyBDb2xvckFwcGxpY2F0b3IgfSBmcm9tIFwiLi9jb2xvckFwcGxpY2F0b3JcIjtcblxuZXhwb3J0IGNsYXNzIEVsZW1lbnRUaGVtZUFwcGxpY2F0b3Ige1xuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3R5bGVzaGVldEJ1aWxkZXJ9IHN0eWxlc2hlZXRCdWlsZGVyIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBjbGFzc1ByZWZpeFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBtb2RlTmFtZSBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ1tdfSBkZWZhdWx0Q29sb3JzIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nW119IGhvdmVyQ29sb3JzIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nW119IGRpc2FibGVkQ29sb3JzIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nW119IGFjdGl2ZUNvbG9ycyBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gYm94U2hhZG93Rm9jdXMgXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGJveFNoYWRvd0FjdGl2ZUZvY3VzIFxuICAgICAqIEByZXR1cm4ge1N0eWxlc2hlZXRCdWlsZGVyfVxuICAgICAqL1xuICAgIHN0YXRpYyBhcHBseShzdHlsZXNoZWV0QnVpbGRlciwgY2xhc3NQcmVmaXgsIG1vZGVOYW1lLFxuICAgICAgICAgICAgZGVmYXVsdENvbG9ycywgaG92ZXJDb2xvcnMsIGRpc2FibGVkQ29sb3JzLCBhY3RpdmVDb2xvcnMsXG4gICAgICAgICAgICBib3hTaGFkb3dGb2N1cywgYm94U2hhZG93QWN0aXZlRm9jdXMpIHtcblxuICAgICAgICBDb2xvckFwcGxpY2F0b3IuYXBwbHkoc3R5bGVzaGVldEJ1aWxkZXIsIFxuICAgICAgICAgICAgYC4ke2NsYXNzUHJlZml4fS0ke21vZGVOYW1lfWAsXG4gICAgICAgICAgICBkZWZhdWx0Q29sb3JzWzBdLCBkZWZhdWx0Q29sb3JzWzFdLCBkZWZhdWx0Q29sb3JzWzJdKTtcblxuICAgICAgICBDb2xvckFwcGxpY2F0b3IuYXBwbHkoc3R5bGVzaGVldEJ1aWxkZXIsXG4gICAgICAgICAgICBgLiR7Y2xhc3NQcmVmaXh9LSR7bW9kZU5hbWV9OmhvdmVyYCxcbiAgICAgICAgICAgIGhvdmVyQ29sb3JzWzBdLCBob3ZlckNvbG9yc1sxXSwgaG92ZXJDb2xvcnNbMl0pO1xuXG4gICAgICAgIENvbG9yQXBwbGljYXRvci5hcHBseShzdHlsZXNoZWV0QnVpbGRlcixcbiAgICAgICAgICAgIGAuJHtjbGFzc1ByZWZpeH0tJHttb2RlTmFtZX06Zm9jdXMsIC4ke2NsYXNzUHJlZml4fS0ke21vZGVOYW1lfS5mb2N1c2AsXG4gICAgICAgICAgICBob3ZlckNvbG9yc1swXSwgaG92ZXJDb2xvcnNbMV0sIGhvdmVyQ29sb3JzWzJdKTtcblxuICAgICAgICBDb2xvckFwcGxpY2F0b3IuYXBwbHkoc3R5bGVzaGVldEJ1aWxkZXIsXG4gICAgICAgICAgICBgLiR7Y2xhc3NQcmVmaXh9LSR7bW9kZU5hbWV9LmRpc2FibGVkLCAuJHtjbGFzc1ByZWZpeH0tJHttb2RlTmFtZX06ZGlzYWJsZWRgLFxuICAgICAgICAgICAgZGlzYWJsZWRDb2xvcnNbMF0sIGRpc2FibGVkQ29sb3JzWzFdLCBkaXNhYmxlZENvbG9yc1syXSk7XG5cbiAgICAgICAgQ29sb3JBcHBsaWNhdG9yLmFwcGx5KHN0eWxlc2hlZXRCdWlsZGVyLFxuICAgICAgICAgICAgYC4ke2NsYXNzUHJlZml4fS0ke21vZGVOYW1lfTpub3QoOmRpc2FibGVkKTpub3QoLmRpc2FibGVkKTphY3RpdmUsYCArXG4gICAgICAgICAgICAgICAgYC4ke2NsYXNzUHJlZml4fS0ke21vZGVOYW1lfTpub3QoOmRpc2FibGVkKTpub3QoLmRpc2FibGVkKS5hY3RpdmUsYCArXG4gICAgICAgICAgICAgICAgYC5zaG93ID4gLiR7Y2xhc3NQcmVmaXh9LSR7bW9kZU5hbWV9LmRyb3Bkb3duLXRvZ2dsZWAsXG4gICAgICAgICAgICBhY3RpdmVDb2xvcnNbMF0sIGFjdGl2ZUNvbG9yc1sxXSwgYWN0aXZlQ29sb3JzWzJdKTtcblxuICAgICAgICBDb2xvckFwcGxpY2F0b3IuYXBwbHkoc3R5bGVzaGVldEJ1aWxkZXIsXG4gICAgICAgICAgICBgLiR7Y2xhc3NQcmVmaXh9LSR7bW9kZU5hbWV9Om5vdCg6ZGlzYWJsZWQpOm5vdCguZGlzYWJsZWQpOmFjdGl2ZTpmb2N1cyxgICtcbiAgICAgICAgICAgICAgICBgLiR7Y2xhc3NQcmVmaXh9LSR7bW9kZU5hbWV9Om5vdCg6ZGlzYWJsZWQpOm5vdCguZGlzYWJsZWQpLmFjdGl2ZTpmb2N1cyxgICtcbiAgICAgICAgICAgICAgICBgLnNob3cgPiAuJHtjbGFzc1ByZWZpeH0tJHttb2RlTmFtZX0uZHJvcGRvd24tdG9nZ2xlOmZvY3VzYCxcbiAgICAgICAgICAgIGFjdGl2ZUNvbG9yc1swXSwgYWN0aXZlQ29sb3JzWzFdLCBhY3RpdmVDb2xvcnNbMl0pO1xuXG5cbiAgICAgICAgcmV0dXJuIHN0eWxlc2hlZXRCdWlsZGVyXG4gICAgICAgICAgICAuc2VsZWN0b3IoYC4ke2NsYXNzUHJlZml4fS0ke21vZGVOYW1lfTpub3QoOmRpc2FibGVkKTpub3QoLmRpc2FibGVkKTphY3RpdmU6Zm9jdXMsYCArXG4gICAgICAgICAgICAgICAgICAgICAgICBgLiR7Y2xhc3NQcmVmaXh9LSR7bW9kZU5hbWV9Om5vdCg6ZGlzYWJsZWQpOm5vdCguZGlzYWJsZWQpLmFjdGl2ZTpmb2N1cyxgICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGAuc2hvdyA+IC4ke2NsYXNzUHJlZml4fS0ke21vZGVOYW1lfS5kcm9wZG93bi10b2dnbGU6Zm9jdXNgKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJveC1zaGFkb3dcIiwgYm94U2hhZG93QWN0aXZlRm9jdXMpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoYC4ke2NsYXNzUHJlZml4fS0ke21vZGVOYW1lfTpmb2N1cyxgICsgXG4gICAgICAgICAgICAgICAgICAgICAgICBgJHtjbGFzc1ByZWZpeH0tJHttb2RlTmFtZX0uZm9jdXNgKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJveC1zaGFkb3dcIiwgYm94U2hhZG93Rm9jdXMpXG4gICAgICAgICAgICAuY2xvc2UoKTtcbiAgICB9XG59IiwiaW1wb3J0IHtcbiAgICBDb21wb25lbnQsXG4gICAgQ2FudmFzU3R5bGVzLFxuICAgIENhbnZhc1Jvb3QsXG4gICAgTmF2aWdhdGlvbixcbiAgICBTdHlsZXNoZWV0QnVpbGRlcixcbiAgICBTdHlsZXNoZWV0LFxuICAgIENvbXBvbmVudEJ1aWxkZXIsXG4gICAgSW5saW5lQ29tcG9uZW50RmFjdG9yeVxufSBmcm9tIFwibnV0dGluMmMtY29yZV92MVwiO1xuaW1wb3J0IHsgVGltZVByb21pc2UsIExvZ2dlciwgTWV0aG9kLCBMaXN0IH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5pbXBvcnQgeyBJbmplY3Rpb25Qb2ludCwgUHJvdG90eXBlQ29uZmlnLCBUeXBlQ29uZmlnUGFjayB9IGZyb20gXCJtaW5kaV92MVwiO1xuaW1wb3J0IHsgQmFja1NoYWRlIH0gZnJvbSBcIi4uL2JhY2tTaGFkZS9iYWNrU2hhZGUuanNcIjtcbmltcG9ydCB7IEJhY2tTaGFkZUxpc3RlbmVycyB9IGZyb20gXCIuLi9iYWNrU2hhZGUvYmFja1NoYWRlTGlzdGVuZXJzLmpzXCI7XG5pbXBvcnQgeyBDb250YWluZXJFbGVtZW50VXRpbHMsIENvbnRhaW5lckV2ZW50IH0gZnJvbSBcImNvbnRhaW5lcmJyaWRnZV92MVwiO1xuXG5cbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJEaWFsb2dCb3hcIik7XG5cbmV4cG9ydCBjbGFzcyBEaWFsb2dCb3gge1xuICAgIFxuICAgIHN0YXRpYyBPUFRJT05fQkFDS19PTl9DTE9TRSA9IDE7XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihkZWZhdWx0T3B0aW9ucyA9IFtdKXtcblxuICAgICAgICAvKiogQHR5cGUge0lubGluZUNvbXBvbmVudEZhY3Rvcnl9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKElubGluZUNvbXBvbmVudEZhY3RvcnkpO1xuXG5cdFx0LyoqIEB0eXBlIHtDb21wb25lbnR9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gbnVsbDtcbiAgICAgICAgXG4gICAgICAgIC8qKiBAdHlwZSB7QmFja1NoYWRlfSAqL1xuICAgICAgICB0aGlzLmJhY2tTaGFkZSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKEJhY2tTaGFkZSwgW1xuICAgICAgICAgICAgbmV3IEJhY2tTaGFkZUxpc3RlbmVycygpXG4gICAgICAgICAgICAgICAgLndpdGhCYWNrZ3JvdW5kQ2xpY2tlZChuZXcgTWV0aG9kKHRoaXMuaGlkZSwgdGhpcykpXSk7XG5cbiAgICAgICAgdGhpcy5oaWRkZW4gPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuc3dhbGxvd0ZvY3VzRXNjYXBlID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5vd25pbmdUcmlnZ2VyID0gbnVsbDtcblxuICAgICAgICAvKiogQHR5cGUge0xpc3Q8c3RyaW5nPn0gKi9cbiAgICAgICAgdGhpcy5kZWZhdWx0T3B0aW9ucyA9IG5ldyBMaXN0KGRlZmF1bHRPcHRpb25zKTtcblxuICAgICAgICAvKiogQHR5cGUge0xpc3Q8c3RyaW5nPn0gKi9cbiAgICAgICAgdGhpcy5vcHRpb25zID0gbmV3IExpc3QoZGVmYXVsdE9wdGlvbnMpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7RnVuY3Rpb259ICovXG4gICAgICAgIHRoaXMuZGVzdHJveUZvY3VzRXNjYXBlTGlzdGVuZXIgPSBudWxsO1xuICAgIH1cbiAgICBcbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0eWxlc2hlZXRCdWlsZGVyfSBzdHlsZXNoZWV0QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyB7U3R5bGVzaGVldH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRTdHlsZXNoZWV0KHN0eWxlc2hlZXRCdWlsZGVyKSB7XG4gICAgICAgcmV0dXJuIHN0eWxlc2hlZXRCdWlsZGVyXG4gICAgICAgICAgICAubWVkaWEoXCJAbWVkaWEgKG1heC13aWR0aDogNTE2cHgpXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRpYWxvZ2JveC1vdmVybGF5XCIpXG4gICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLCBcImZpeGVkXCIpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcImxlZnRcIiwgXCIwXCIpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcIndpZHRoXCIsIFwiMTAwJVwiKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJoZWlnaHRcIiwgXCIxMDAlXCIpXG4gICAgICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgICAgIC5zZWxlY3RvcihcIi5kaWFsb2dib3gtZnJhbWVcIilcbiAgICAgICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcInBvc2l0aW9uXCIsIFwiYWJzb2x1dGVcIilcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luXCIsIFwiMFwiKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLCBcIjEwMCVcIilcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwiaGVpZ2h0XCIsIFwiMTAwJVwiKVxuICAgICAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgICAgICAuc2VsZWN0b3IoXCIuZGlhbG9nYm94LWNvbnRlbnRcIilcbiAgICAgICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcInBvc2l0aW9uXCIsIFwicmVsYXRpdmVcIilcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwiaGVpZ2h0XCIsIFwiMTAwJVwiKVxuICAgICAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgICAgICAuc2VsZWN0b3IoXCIuZGlhbG9nYm94LWJvZHlcIilcbiAgICAgICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcIm92ZXJmbG93LXlcIiwgXCJ2aXNpYmxlXCIpXG4gICAgICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAubWVkaWEoXCJAbWVkaWEgKG1pbi13aWR0aDogNTE3cHgpXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRpYWxvZ2JveC1vdmVybGF5XCIpXG4gICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLCBcImZpeGVkXCIpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpbi10b3BcIiwgXCI1NHB0XCIpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmctdG9wXCIsIFwiMS41cmVtXCIpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcImxlZnRcIiwgXCI1MCVcIilcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKC01MCUsMClcIilcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwid2lkdGhcIiwgXCJhdXRvXCIpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcImhlaWdodFwiLCBcImF1dG9cIilcbiAgICAgICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRpYWxvZ2JveC1mcmFtZVwiKVxuICAgICAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIiwgXCJyZWxhdGl2ZVwiKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLCBcImF1dG9cIilcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwiaGVpZ2h0XCIsIFwiYXV0b1wiKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW5cIiwgXCIwLjVyZW1cIilcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwicG9pbnRlci1ldmVudHNcIiwgXCJub25lXCIpXG4gICAgICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgICAgIC5zZWxlY3RvcihcIi5kaWFsb2dib3gtY29udGVudFwiKVxuICAgICAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIiwgXCJyZWxhdGl2ZVwiKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXJcIiwgXCIxcHggc29saWQgcmdiYSgwLCAwLCAwLCAwLjIpXCIpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1yYWRpdXNcIiwgXCIwLjNyZW1cIilcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwiaGVpZ2h0XCIsIFwiYXV0b1wiKVxuICAgICAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgICAgICAuc2VsZWN0b3IoXCIuZGlhbG9nYm94LWJvZHlcIilcbiAgICAgICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcIm92ZXJmbG93LXlcIiwgXCJ2aXNpYmxlXCIpXG4gICAgICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgICAgIC5zZWxlY3RvcihcIi5kaWFsb2dib3gtaGVhZGVyXCIpXG4gICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItdG9wLWxlZnQtcmFkaXVzXCIsIFwiMC4zcmVtXCIpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci10b3AtcmlnaHQtcmFkaXVzXCIsIFwiMC4zcmVtXCIpXG4gICAgICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAubWVkaWEoXCJAbWVkaWEgKHByZWZlcnMtcmVkdWNlZC1tb3Rpb246IHJlZHVjZSlcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc2VsZWN0b3IoXCIuZGlhbG9nYm94LW92ZXJsYXkuZGlhbG9nYm94LWZhZGUgLmRpYWxvZ2JveC1mcmFtZVwiKVxuICAgICAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNpdGlvblwiLCBcIm5vbmVcIilcbiAgICAgICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRpYWxvZ2JveC1mYWRlXCIpXG4gICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2l0aW9uXCIsIFwibm9uZVwiKVxuICAgICAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRpYWxvZ2JveC1vcGVuXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwib3ZlcmZsb3dcIiwgXCJoaWRkZW5cIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5kaWFsb2dib3gtb3BlbiAuZGlhbG9nYm94LW92ZXJsYXlcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJvdmVyZmxvdy14XCIsIFwiaGlkZGVuXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwib3ZlcmZsb3cteVwiLCBcImF1dG9cIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5kaWFsb2dib3gtb3ZlcmxheS1mYWRlXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNpdGlvblwiLCBcIm9wYWNpdHkgMC4xNXMgbGluZWFyXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuZGlhbG9nYm94LW92ZXJsYXktZGlzcGxheS1ibG9ja1wiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgXCJibG9ja1wiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRpYWxvZ2JveC1vdmVybGF5LWRpc3BsYXktbm9uZVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgXCJub25lXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuZGlhbG9nYm94LW92ZXJsYXktZmFkZTpub3QoLmRpYWxvZ2JveC1vdmVybGF5LXNob3cpXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCBcIjBcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5kaWFsb2dib3gtb3ZlcmxheS5kaWFsb2dib3gtb3ZlcmxheS1mYWRlIC5kaWFsb2dib3gtZnJhbWVcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2l0aW9uXCIsIFwiLXdlYmtpdC10cmFuc2Zvcm0gMC4zcyBlYXNlLW91dFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zaXRpb25cIiwgXCJ0cmFuc2Zvcm0gMC4zcyBlYXNlLW91dFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zaXRpb25cIiwgXCJ0cmFuc2Zvcm0gMC4zcyBlYXNlLW91dCwgLXdlYmtpdC10cmFuc2Zvcm0gMC4zcyBlYXNlLW91dFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIi13ZWJraXQtdHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKDAsIC01MHB4KVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZSgwLCAtNTBweClcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5kaWFsb2dib3gtb3ZlcmxheS5kaWFsb2dib3gtb3ZlcmxheS1zaG93IC5kaWFsb2dib3gtZnJhbWVcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCItd2Via2l0LXRyYW5zZm9ybVwiLCBcIm5vbmVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2Zvcm1cIiwgXCJub25lXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuZGlhbG9nYm94LWhlYWRlciAuZGlhbG9nYm94LWNsb3NlLWJ1dHRvblwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmdcIiwgXCIwLjdyZW0gMXJlbVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpblwiLCBcIi0wLjdyZW0gLTFyZW0gLTAuN3JlbSBhdXRvXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuZGlhbG9nYm94LXRpdGxlXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luLWJvdHRvbVwiLCBcIjBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJsaW5lLWhlaWdodFwiLCBcIjEuNVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRpYWxvZ2JveC1ib2R5XCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIiwgXCJyZWxhdGl2ZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIi1tcy1mbGV4XCIsIFwiMSAxIGF1dG9cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmbGV4XCIsIFwiMSAxIGF1dG9cIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5kaWFsb2dib3gtZm9vdGVyXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLCBcIi1tcy1mbGV4Ym94XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLCBcImZsZXhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCItbXMtZmxleC1hbGlnblwiLCBcImNlbnRlclwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImFsaWduLWl0ZW1zXCIsIFwiY2VudGVyXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiLW1zLWZsZXgtcGFja1wiLCBcImVuZFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImp1c3RpZnktY29udGVudFwiLCBcImZsZXgtZW5kXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZ1wiLCBcIjFyZW1cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItdG9wXCIsIFwiMXB4IHNvbGlkICNkZWUyZTZcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1c1wiLCBcIjAuM3JlbVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXNcIiwgXCIwLjNyZW1cIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5kaWFsb2dib3gtZm9vdGVyID4gOm5vdCg6Zmlyc3QtY2hpbGQpXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luLWxlZnRcIiwgXCIuMjVyZW1cIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5kaWFsb2dib3gtZm9vdGVyID4gOm5vdCg6bGFzdC1jaGlsZClcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tcmlnaHRcIiwgXCIuMjVyZW1cIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5kaWFsb2dib3gtb3ZlcmxheVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRvcFwiLCBcIjBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ6LWluZGV4XCIsIFwiMTBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJvdmVyZmxvd1wiLCBcImhpZGRlblwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm91dGxpbmVcIiwgXCIwXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuZGlhbG9nYm94LWZyYW1lXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luXCIsIFwiMFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRpYWxvZ2JveC1jb250ZW50XCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLCBcIi1tcy1mbGV4Ym94XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLCBcImZsZXhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCItbXMtZmxleC1kaXJlY3Rpb25cIiwgXCJjb2x1bW5cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmbGV4LWRpcmVjdGlvblwiLCBcImNvbHVtblwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIndpZHRoXCIsIFwiMTAwJVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBvaW50ZXItZXZlbnRzXCIsIFwiYXV0b1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIiwgXCIjZmZmXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jbGlwXCIsIFwicGFkZGluZy1ib3hcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5kaWFsb2dib3gtaGVhZGVyXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLCBcIi1tcy1mbGV4Ym94XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLCBcImZsZXhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiIzk5OTk5OVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbG9yXCIsIFwidmFyKC0tZGVmYXVsdC1wYW5lbC1jb2xvcilcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCItbXMtZmxleC1hbGlnblwiLCBcInN0YXJ0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYWxpZ24taXRlbXNcIiwgXCJmbGV4LXN0YXJ0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiLW1zLWZsZXgtcGFja1wiLCBcImp1c3RpZnlcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJqdXN0aWZ5LWNvbnRlbnRcIiwgXCJzcGFjZS1iZXR3ZWVuXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZ1wiLCBcIjAuN3JlbSAxcmVtXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyLWJvdHRvbVwiLCBcIjFweCBzb2xpZCAjZGVlMmU2XCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuZGlhbG9nYm94LWNsb3NlLWJ1dHRvblwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZsb2F0XCIsIFwicmlnaHRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmb250LXNpemVcIiwgXCIxLjVyZW1cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmb250LXdlaWdodFwiLCBcIjcwMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImxpbmUtaGVpZ2h0XCIsIFwiMVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbG9yXCIsIFwiIzAwMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRleHQtc2hhZG93XCIsIFwiMCAxcHggMCAjZmZmXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCBcIi41XCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuZGlhbG9nYm94LWNsb3NlLWJ1dHRvbjpob3ZlclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbG9yXCIsIFwiIzAwMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRleHQtZGVjb3JhdGlvblwiLCBcIm5vbmVcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5kaWFsb2dib3gtY2xvc2UtYnV0dG9uOm5vdCg6ZGlzYWJsZWQpOm5vdCguZGlzYWJsZWQpOmhvdmVyLCAuZGlhbG9nYm94LWNsb3NlLWJ1dHRvbjpub3QoOmRpc2FibGVkKTpub3QoLmRpc2FibGVkKTpmb2N1c1wiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIuNzVcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcImJ1dHRvbi5kaWFsb2dib3gtY2xvc2UtYnV0dG9uXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZ1wiLCBcIjBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwidHJhbnNwYXJlbnRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXJcIiwgXCIwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiLXdlYmtpdC1hcHBlYXJhbmNlXCIsIFwibm9uZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIi1tb3otYXBwZWFyYW5jZVwiLCBcIm5vbmVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJhcHBlYXJhbmNlXCIsIFwibm9uZVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDb21wb25lbnRCdWlsZGVyfSBjb21wb25lbnRCdWlsZGVyIFxuICAgICAqIEByZXR1cm5zIHtDb21wb25lbnR9XG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkQ29tcG9uZW50KGNvbXBvbmVudEJ1aWxkZXIpIHtcbiAgICAgICByZXR1cm4gY29tcG9uZW50QnVpbGRlclxuICAgICAgICAgICAgLnJvb3QoXCJkaXZcIiwgXCJpZD1kaWFsb2dCb3hcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic3R5bGU9ei1pbmRleDotMVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwiZGl2XCIsIFwiaWQ9YmFja1NoYWRlQ29udGFpbmVyXCIpXG4gICAgICAgICAgICAgICAgLm5vZGUoXCJkaXZcIiwgXCJpZD1kaWFsb2dCb3hPdmVybGF5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGFzcz1kaWFsb2dib3gtb3ZlcmxheSBkaWFsb2dib3gtb3ZlcmxheS1kaXNwbGF5LWJsb2NrIGRpYWxvZ2JveC1vdmVybGF5LWZhZGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRhYmluZGV4PS0xXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJyb2xlPWRpYWxvZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXJpYS1sYWJlbGxlZGJ5PWRpYWxvZ0xhYmVsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhcmlhLWRpYWxvZ2JveD10cnVlXCIpXG4gICAgICAgICAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5ub2RlKFwiZGl2XCIsIFwiY2xhc3M9ZGlhbG9nYm94LWZyYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInN0eWxlPXotaW5kZXg6MlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJyb2xlPWRvY3VtZW50XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubm9kZShcImRpdlwiLCBcImNsYXNzPWRpYWxvZ2JveC1jb250ZW50XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm5vZGUoXCJkaXZcIiwgXCJjbGFzcz1kaWFsb2dib3gtaGVhZGVyXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5ub2RlKFwiaDVcIiwgXCJpZD10aXRsZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzPWRpYWxvZ2JveC10aXRsZVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50ZXh0KFwiTWVzc2FnZVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5ub2RlKFwiYnV0dG9uXCIsIFwiaWQ9Y2xvc2VCdXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGU9YnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGFzcz1kaWFsb2dib3gtY2xvc2UtYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkYXRhLWRpc21pc3M9ZGlhbG9nYm94XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhcmlhLWxhYmVsPUNsb3NlXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubm9kZShcImlcIiwgXCJjbGFzcz1mYSBmYS13aW5kb3ctY2xvc2VcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhcmlhLWhpZGRlbj10cnVlXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubm9kZShcImRpdlwiLCBcImlkPWRpYWxvZ0JveENvbnRlbnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzPWRpYWxvZ2JveC1ib2R5XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuYnVpbGQoKTtcbiAgICB9XG5cbiAgICBwb3N0Q29uZmlnKCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoRGlhbG9nQm94KTtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuc2V0KFwiYmFja1NoYWRlQ29udGFpbmVyXCIsIHRoaXMuYmFja1NoYWRlLmNvbXBvbmVudCk7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImNsb3NlQnV0dG9uXCIpLmxpc3RlblRvKFwiY2xpY2tcIiwgdGhpcy5jbG9zZSwgdGhpcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRleHQgXG4gICAgICovXG4gICAgc2V0VGl0bGUodGV4dCl7IHRoaXMuY29tcG9uZW50LnNldENoaWxkKFwidGl0bGVcIiwgdGV4dCk7IH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Q29tcG9uZW50fSBjb21wb25lbnQgXG4gICAgICovXG4gICAgc2V0Rm9vdGVyKGNvbXBvbmVudCl7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImRpYWxvZ0JveEZvb3RlclwiKS5zZXRTdHlsZShcImRpc3BsYXlcIiwgXCJibG9ja1wiKTtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuc2V0Q2hpbGQoXCJkaWFsb2dCb3hGb290ZXJcIiwgY29tcG9uZW50KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudH0gY29tcG9uZW50IFxuICAgICAqL1xuICAgIHNldENvbnRlbnQoY29tcG9uZW50KXsgdGhpcy5jb21wb25lbnQuc2V0Q2hpbGQoXCJkaWFsb2dCb3hDb250ZW50XCIsY29tcG9uZW50KTsgfVxuXG5cdHNldChrZXksdmFsKSB7IHRoaXMuY29tcG9uZW50LnNldChrZXksdmFsKTsgfVxuICAgIFxuICAgIGFzeW5jIGNsb3NlKCkge1xuICAgICAgICBjb25zdCBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xuICAgICAgICBhd2FpdCB0aGlzLmhpZGUoKTtcbiAgICAgICAgaWYgKG9wdGlvbnMuY29udGFpbnMoRGlhbG9nQm94Lk9QVElPTl9CQUNLX09OX0NMT1NFKSkge1xuICAgICAgICAgICAgTmF2aWdhdGlvbi5pbnN0YW5jZSgpLmJhY2soKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Q29udGFpbmVyRXZlbnR9IGV2ZW50IFxuICAgICAqIEByZXR1cm5zIFxuICAgICAqL1xuICAgIGhpZGUoZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuZGVzdHJveUZvY3VzRXNjYXBlTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZGVzdHJveUZvY3VzRXNjYXBlTGlzdGVuZXIoKTtcbiAgICAgICAgICAgIHRoaXMuZGVzdHJveUZvY3VzRXNjYXBlTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG4gICAgICAgIGlmICh0aGlzLmhpZGRlbikge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5nZXREaWFsb2dCb3hPdmVybGF5KCkuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLCBcImRpYWxvZ2JveC1vdmVybGF5IGRpYWxvZ2JveC1vdmVybGF5LWZhZGVcIik7XG4gICAgICAgIGNvbnN0IGhpZGVCYWNrU2hhZGVQcm9taXNlID0gdGhpcy5iYWNrU2hhZGUuaGlkZUFmdGVyKDMwMCk7XG4gICAgICAgIGNvbnN0IGhpZGVQcm9taXNlID0gVGltZVByb21pc2UuYXNQcm9taXNlKDIwMCwgKCkgPT4geyBcbiAgICAgICAgICAgICAgICB0aGlzLmdldERpYWxvZ0JveE92ZXJsYXkoKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImNsYXNzXCIsIFwiZGlhbG9nYm94LW92ZXJsYXkgZGlhbG9nYm94LW92ZXJsYXktZmFkZSBkaWFsb2dib3gtb3ZlcmxheS1kaXNwbGF5LW5vbmVcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IGRpc2FibGVTdHlsZVByb21pc2UgPSBUaW1lUHJvbWlzZS5hc1Byb21pc2UoMjAxLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXREaWFsb2dCb3goKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICBDYW52YXNTdHlsZXMuZGlzYWJsZVN0eWxlKERpYWxvZ0JveC5uYW1lLCB0aGlzLmNvbXBvbmVudC5jb21wb25lbnRJbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IHRoaXMuZGVmYXVsdE9wdGlvbnM7XG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbaGlkZVByb21pc2UsIGRpc2FibGVTdHlsZVByb21pc2UsIGhpZGVCYWNrU2hhZGVQcm9taXNlXSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDb250YWluZXJFdmVudH0gZXZlbnQgXG4gICAgICogQHBhcmFtIHtBcnJheTxzdHJpbmc+fSB0ZW1wb3JhcnlPcHRpb25zXG4gICAgICogQHJldHVybnMgXG4gICAgICovXG4gICAgc2hvdyhldmVudCwgdGVtcG9yYXJ5T3B0aW9ucykge1xuICAgICAgICBpZiAodGhpcy5kZXN0cm95Rm9jdXNFc2NhcGVMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5kZXN0cm95Rm9jdXNFc2NhcGVMaXN0ZW5lcigpO1xuICAgICAgICAgICAgdGhpcy5kZXN0cm95Rm9jdXNFc2NhcGVMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kZXN0cm95Rm9jdXNFc2NhcGVMaXN0ZW5lciA9IENhbnZhc1Jvb3QubGlzdGVuVG9Gb2N1c0VzY2FwZShcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImRpYWxvZ0JveE92ZXJsYXlcIiksIHRoaXMuY2xvc2UsIHRoaXMsIFxuICAgICAgICApO1xuXG4gICAgICAgIGlmICh0ZW1wb3JhcnlPcHRpb25zKSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMgPSBuZXcgTGlzdCh0ZW1wb3JhcnlPcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgICBDYW52YXNSb290LnN3YWxsb3dGb2N1c0VzY2FwZSg1MDApO1xuICAgICAgICBpZiAoIXRoaXMuaGlkZGVuKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge3Jlc29sdmUoKTt9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmhpZGRlbiA9IGZhbHNlO1xuICAgICAgICBDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUoRGlhbG9nQm94Lm5hbWUsIHRoaXMuY29tcG9uZW50LmNvbXBvbmVudEluZGV4KTtcbiAgICAgICAgdGhpcy5iYWNrU2hhZGUuc2hvdygpO1xuICAgICAgICB0aGlzLmdldERpYWxvZ0JveE92ZXJsYXkoKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImNsYXNzXCIsIFwiZGlhbG9nYm94LW92ZXJsYXkgZGlhbG9nYm94LW92ZXJsYXktZmFkZSBkaWFsb2dib3gtb3ZlcmxheS1kaXNwbGF5LWJsb2NrXCIpO1xuICAgICAgICBDYW52YXNSb290Lm1vdXNlRG93bkVsZW1lbnQgPSB0aGlzLmNvbXBvbmVudC5nZXQoXCJkaWFsb2dCb3hDb250ZW50XCIpLmNvbnRhaW5lckVsZW1lbnQ7XG4gICAgICAgIHJldHVybiBUaW1lUHJvbWlzZS5hc1Byb21pc2UoMTAwLCAgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0RGlhbG9nQm94T3ZlcmxheSgpLnNldEF0dHJpYnV0ZVZhbHVlKFwiY2xhc3NcIiwgXCJkaWFsb2dib3gtb3ZlcmxheSBkaWFsb2dib3gtb3ZlcmxheS1mYWRlIGRpYWxvZ2JveC1vdmVybGF5LWRpc3BsYXktYmxvY2sgZGlhbG9nYm94LW92ZXJsYXktc2hvd1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBnZXREaWFsb2dCb3hPdmVybGF5KCkgeyByZXR1cm4gdGhpcy5jb21wb25lbnQuZ2V0KFwiZGlhbG9nQm94T3ZlcmxheVwiKTsgfVxuXG4gICAgZ2V0RGlhbG9nQm94KCkgeyByZXR1cm4gdGhpcy5jb21wb25lbnQuZ2V0KFwiZGlhbG9nQm94XCIpOyB9XG5cbiAgICBzY3JvbGxMb2NrKCkge1xuICAgICAgICBDb250YWluZXJFbGVtZW50VXRpbHMuc2Nyb2xsTG9ja1RvKHRoaXMuY29tcG9uZW50LmdldChcImRpYWxvZ0JveENvbnRlbnRcIikuY29udGFpbmVyRWxlbWVudCwgMCwgMCwgMTAwMCk7XG4gICAgfVxufVxuXG5UeXBlQ29uZmlnUGFjay5pbnN0YW5jZSgpLmFkZFR5cGVDb25maWcoXCJudXR0aW4yYy11aVwiLCBQcm90b3R5cGVDb25maWcudW5uYW1lZChEaWFsb2dCb3gpKTsiLCJpbXBvcnQge1xuICAgIENhbnZhc1N0eWxlcyxcbiAgICBDb21wb25lbnQsXG4gICAgQ2FudmFzUm9vdCxcbiAgICBIVE1MLFxuICAgIFN0eWxlU2VsZWN0b3JBY2Nlc3NvcixcbiAgICBTdHlsZUFjY2Vzc29yLFxuICAgIFN0eWxlc2hlZXRCdWlsZGVyLFxuICAgIFN0eWxlc2hlZXQsXG4gICAgQ29tcG9uZW50QnVpbGRlcixcbiAgICBJbmxpbmVDb21wb25lbnRGYWN0b3J5XG59IGZyb20gXCJudXR0aW4yYy1jb3JlX3YxXCI7XG5pbXBvcnQgeyBJbmplY3Rpb25Qb2ludCwgUHJvdG90eXBlQ29uZmlnLCBUeXBlQ29uZmlnUGFjayB9IGZyb20gXCJtaW5kaV92MVwiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5pbXBvcnQgeyBDb250YWluZXJFdmVudCB9IGZyb20gXCJjb250YWluZXJicmlkZ2VfdjFcIjtcbmltcG9ydCB7IENvbG9yUGFsZXR0ZSB9IGZyb20gXCIuLi9jb2xvclBhbGV0dGVcIjtcbmltcG9ydCB7IEVsZW1lbnRUaGVtZUFwcGxpY2F0b3IgfSBmcm9tIFwiLi4vY29tbW9uL2VsZW1lbnRUaGVtZUFwcGxpY2F0b3JcIjtcblxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIkRyb3BEb3duUGFuZWxcIik7XG5cbmV4cG9ydCBjbGFzcyBEcm9wRG93blBhbmVsIHtcblxuICAgIHN0YXRpYyBUWVBFX1BSSU1BUlkgPSBcImRyb3AtZG93bi1wYW5lbC1idXR0b24tcHJpbWFyeVwiO1xuICAgIHN0YXRpYyBUWVBFX1NFQ09OREFSWSA9IFwiZHJvcC1kb3duLXBhbmVsLWJ1dHRvbi1zZWNvbmRhcnlcIjtcbiAgICBzdGF0aWMgVFlQRV9TVUNDRVNTID0gXCJkcm9wLWRvd24tcGFuZWwtYnV0dG9uLXN1Y2Nlc3NcIjtcbiAgICBzdGF0aWMgVFlQRV9JTkZPID0gXCJkcm9wLWRvd24tcGFuZWwtYnV0dG9uLWluZm9cIjtcbiAgICBzdGF0aWMgVFlQRV9XQVJOSU5HID0gXCJkcm9wLWRvd24tcGFuZWwtYnV0dG9uLXdhcm5pbmdcIjtcbiAgICBzdGF0aWMgVFlQRV9EQU5HRVIgPSBcImRyb3AtZG93bi1wYW5lbC1idXR0b24tZGFuZ2VyXCI7XG4gICAgc3RhdGljIFRZUEVfTElHSFQgPSBcImRyb3AtZG93bi1wYW5lbC1idXR0b24tbGlnaHRcIjtcbiAgICBzdGF0aWMgVFlQRV9EQVJLID0gXCJkcm9wLWRvd24tcGFuZWwtYnV0dG9uLWRhcmtcIjtcblxuICAgIHN0YXRpYyBTSVpFX01FRElVTSA9IFwiZHJvcC1kb3duLXBhbmVsLWJ1dHRvbi1tZWRpdW1cIjtcbiAgICBzdGF0aWMgU0laRV9MQVJHRSA9IFwiZHJvcC1kb3duLXBhbmVsLWJ1dHRvbi1sYXJnZVwiO1xuXG4gICAgc3RhdGljIE9SSUVOVEFUSU9OX0xFRlQgPSBcImRyb3AtZG93bi1wYW5lbC1sZWZ0XCI7XG4gICAgc3RhdGljIE9SSUVOVEFUSU9OX1JJR0hUID0gXCJkcm9wLWRvd24tcGFuZWwtcmlnaHRcIjtcblxuICAgIHN0YXRpYyBDT05URU5UX1ZJU0lCTEUgPSBcImRyb3AtZG93bi1wYW5lbC1jb250ZW50LXZpc2libGVcIjtcbiAgICBzdGF0aWMgQ09OVEVOVF9ISURERU4gPSBcImRyb3AtZG93bi1wYW5lbC1jb250ZW50LWhpZGRlblwiO1xuICAgIHN0YXRpYyBDT05URU5UX0VYUEFORCA9IFwiZHJvcC1kb3duLXBhbmVsLWNvbnRlbnQtZXhwYW5kXCI7XG4gICAgc3RhdGljIENPTlRFTlRfQ09MTEFQU0UgPSBcImRyb3AtZG93bi1wYW5lbC1jb250ZW50LWNvbGxhcHNlXCI7XG4gICAgc3RhdGljIENPTlRFTlQgPSBcImRyb3AtZG93bi1wYW5lbC1jb250ZW50XCI7XG4gICAgc3RhdGljIEJVVFRPTiA9IFwiZHJvcC1kb3duLXBhbmVsLWJ1dHRvblwiO1xuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGljb25DbGFzc1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG9yaWVudGF0aW9uXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoaWNvbkNsYXNzLCB0eXBlID0gRHJvcERvd25QYW5lbC5UWVBFX0RBUkssIHNpemUgPSBEcm9wRG93blBhbmVsLlNJWkVfTUVESVVNLCBvcmllbnRhdGlvbiA9IERyb3BEb3duUGFuZWwuT1JJRU5UQVRJT05fTEVGVCkge1xuXG4gICAgICAgIC8qKiBAdHlwZSB7SW5saW5lQ29tcG9uZW50RmFjdG9yeX0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoSW5saW5lQ29tcG9uZW50RmFjdG9yeSk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnR9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gbnVsbDtcblxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5pY29uQ2xhc3MgPSBpY29uQ2xhc3M7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMuc2l6ZSA9IHNpemU7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMub3JpZW50YXRpb24gPSBvcmllbnRhdGlvbjtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3R5bGVzaGVldEJ1aWxkZXJ9IHN0eWxlc2hlZXRCdWlsZGVyIFxuICAgICAqIEByZXR1cm5zIHtTdHlsZXNoZWV0fVxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZFN0eWxlc2hlZXQoc3R5bGVzaGVldEJ1aWxkZXIpIHtcbiAgICAgICAgc3R5bGVzaGVldEJ1aWxkZXJcbiAgICAgICAgICAgIC5tZWRpYShcIihwcmVmZXJzLXJlZHVjZWQtbW90aW9uOiByZWR1Y2UpXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRyb3AtZG93bi1wYW5lbC1idXR0b25cIilcbiAgICAgICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zaXRpb25cIiwgXCJub25lXCIpXG4gICAgICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5kcm9wLWRvd24tcGFuZWwtb3V0bGluZVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgXCJpbmxpbmUtYmxvY2tcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ2ZXJ0aWNhbC1hbGlnblwiLCBcIm1pZGRsZVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRyb3AtZG93bi1wYW5lbC1idXR0b25cIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtaW4td2lkdGhcIiwgXCIzNXB0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLCBcImlubGluZS1ibG9ja1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtd2VpZ2h0XCIsIFwiNDAwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCIjMjEyNTI5XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidGV4dC1hbGlnblwiLCBcImNlbnRlclwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInZlcnRpY2FsLWFsaWduXCIsIFwibWlkZGxlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiLXdlYmtpdC11c2VyLXNlbGVjdFwiLCBcIm5vbmVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCItbW96LXVzZXItc2VsZWN0XCIsIFwibm9uZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIi1tcy11c2VyLXNlbGVjdFwiLCBcIm5vbmVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ1c2VyLXNlbGVjdFwiLCBcIm5vbmVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwidHJhbnNwYXJlbnRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXJcIiwgXCIxcHggc29saWQgdHJhbnNwYXJlbnRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwYWRkaW5nXCIsIFwiMC4zNzVyZW0gMC43NXJlbVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImxpbmUtaGVpZ2h0XCIsIFwiMS41XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyLXJhZGl1c1wiLCBcIjAuMjVyZW1cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2l0aW9uXCIsIFwiY29sb3IgMC4xNXMgZWFzZS1pbi1vdXQsIGJhY2tncm91bmQtY29sb3IgMC4xNXMgZWFzZS1pbi1vdXQsIGJvcmRlci1jb2xvciAwLjE1cyBlYXNlLWluLW91dCwgYm94LXNoYWRvdyAwLjE1cyBlYXNlLWluLW91dFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRyb3AtZG93bi1wYW5lbC1idXR0b24tbWVkaXVtXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZm9udC1zaXplXCIsIFwiMXJlbVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRyb3AtZG93bi1wYW5lbC1idXR0b24tbGFyZ2VcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmb250LXNpemVcIiwgXCIxLjVyZW1cIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5kcm9wLWRvd24tcGFuZWwtY29udGVudFwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1pbi13aWR0aFwiLCBcIjE1MHB0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWF4LXdpZHRoXCIsIFwiNDUwcHRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwYWRkaW5nXCIsIFwiOHB0IDE0cHRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjb2xvclwiLCBcIiMzMzMzMzNcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwidmFyKC0tZGVmYXVsdC1wYW5lbC1jb2xvcilcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItcmFkaXVzXCIsIFwiNXB0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIiwgXCJhYnNvbHV0ZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInotaW5kZXhcIiwgXCI5OTk5OTk5N1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJveC1zaXppbmdcIiwgXCJib3JkZXItYm94XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm94LXNoYWRvd1wiLCBcIjAgMXB4IDhweCByZ2JhKDAsMCwwLDAuNSlcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJvdmVyZmxvd1wiLCBcImhpZGRlblwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRyb3AtZG93bi1wYW5lbC1jb250ZW50LmRyb3AtZG93bi1wYW5lbC1sZWZ0XCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKDAlLCAxMHB0KSB0cmFuc2xhdGUoMCUsMHB4KVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRyb3AtZG93bi1wYW5lbC1jb250ZW50LmRyb3AtZG93bi1wYW5lbC1yaWdodFwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZSgtMTAwJSwgMTBwdCkgdHJhbnNsYXRlKDM1cHQsMHB4KVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRyb3AtZG93bi1wYW5lbC1jb250ZW50LXZpc2libGVcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsXCJibG9ja1wiKVxuICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5kcm9wLWRvd24tcGFuZWwtY29udGVudC1oaWRkZW5cIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsXCJub25lXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuZHJvcC1kb3duLXBhbmVsLWFycm93XCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZ1wiLCBcIjEwcHggMjBweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbG9yXCIsIFwiIzMzMzMzM1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtd2VpZ2h0XCIsIFwibm9ybWFsXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIiwgXCJhYnNvbHV0ZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInotaW5kZXhcIiwgXCI5OTk5OTk5OFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJveC1zaXppbmdcIiwgXCJib3JkZXItYm94XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLCBcIm5vbmVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoMCUsIDUwJSkgdHJhbnNsYXRlKDAlLC0zcHQpXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuZHJvcC1kb3duLXBhbmVsLWFycm93IGlcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLCBcImFic29sdXRlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luLWxlZnRcIiwgXCItMTVweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIndpZHRoXCIsIFwiNDBweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImhlaWdodFwiLCBcIjE1cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJvdmVyZmxvd1wiLCBcImhpZGRlblwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRvcFwiLCBcIi0yMCVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJsZWZ0XCIsIFwiMzAlXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuZHJvcC1kb3duLXBhbmVsLWFycm93IGk6OmFmdGVyXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29udGVudFwiLCBcIicnXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIiwgXCJhYnNvbHV0ZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIndpZHRoXCIsIFwiMThweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImhlaWdodFwiLCBcIjE1cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwidmFyKC0tZGVmYXVsdC1wYW5lbC1jb2xvcilcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3gtc2hhZG93XCIsIFwiMCAxcHggOHB4IHJnYmEoMCwwLDAsMC41KVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImxlZnRcIiwgXCIzMCVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoNTAlLDUwJSkgcm90YXRlKDQ1ZGVnKVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRyb3AtZG93bi1wYW5lbC1idXR0b246aG92ZXJcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjb2xvclwiLCBcIiMyMTI1MjlcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0ZXh0LWRlY29yYXRpb25cIiwgXCJub25lXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuZHJvcC1kb3duLXBhbmVsLWJ1dHRvbjpmb2N1cyxcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICBcIi5kcm9wLWRvd24tcGFuZWwtYnV0dG9uLmZvY3VzXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwib3V0bGluZVwiLCBcIjBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3gtc2hhZG93XCIsIFwiMCAwIDAgMC4ycmVtIHJnYmEoMCwgMTIzLCAyNTUsIDAuMjUpXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuZHJvcC1kb3duLXBhbmVsLWJ1dHRvbi5kaXNhYmxlZCxcIisgXG4gICAgICAgICAgICAgICAgICAgICAgICBcIi5kcm9wLWRvd24tcGFuZWwtYnV0dG9uOmRpc2FibGVkXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCBcIjAuNjVcIilcbiAgICAgICAgICAgIC5jbG9zZSgpO1xuXG4gICAgICAgIEVsZW1lbnRUaGVtZUFwcGxpY2F0b3IuYXBwbHkoc3R5bGVzaGVldEJ1aWxkZXIsIFwiZHJvcC1kb3duLXBhbmVsLWJ1dHRvblwiLCBcInByaW1hcnlcIixcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5QUklNQVJZX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5QUklNQVJZX0hPVkVSX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5QUklNQVJZX0RJU0FCTEVEX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5QUklNQVJZX0FDVElWRV9DT0xPUlMsXG4gICAgICAgICAgICBcIjAgMCAwIDAuMnJlbSByZ2JhKDEzMCwgMTM4LCAxNDUsIDAuNSlcIiwgLy8gYm94U2hhZG93Rm9jdXNcbiAgICAgICAgICAgIFwiMCAwIDAgMC4ycmVtIHJnYmEoMTMwLCAxMzgsIDE0NSwgMC41KVwiKTsgLy8gYm94U2hhZG93QWN0aXZlRm9jdXNcblxuXG4gICAgICAgIEVsZW1lbnRUaGVtZUFwcGxpY2F0b3IuYXBwbHkoc3R5bGVzaGVldEJ1aWxkZXIsIFwiZHJvcC1kb3duLXBhbmVsLWJ1dHRvblwiLCBcInNlY29uZGFyeVwiLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLlNFQ09OREFSWV9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuU0VDT05EQVJZX0hPVkVSX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5TRUNPTkRBUllfRElTQUJMRURfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLlNFQ09OREFSWV9BQ1RJVkVfQ09MT1JTLFxuICAgICAgICAgICAgXCIwIDAgMCAwLjJyZW0gcmdiYSgxMzAsIDEzOCwgMTQ1LCAwLjUpXCIsIC8vIGJveFNoYWRvd0ZvY3VzXG4gICAgICAgICAgICBcIjAgMCAwIDAuMnJlbSByZ2JhKDEzMCwgMTM4LCAxNDUsIDAuNSlcIik7IC8vIGJveFNoYWRvd0FjdGl2ZUZvY3VzXG4gICAgICAgIFxuICAgICAgICBFbGVtZW50VGhlbWVBcHBsaWNhdG9yLmFwcGx5KHN0eWxlc2hlZXRCdWlsZGVyLCBcImRyb3AtZG93bi1wYW5lbC1idXR0b25cIiwgXCJzdWNjZXNzXCIsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuU1VDQ0VTU19DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuU1VDQ0VTU19IT1ZFUl9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuU1VDQ0VTU19ESVNBQkxFRF9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuU1VDQ0VTU19BQ1RJVkVfQ09MT1JTLFxuICAgICAgICAgICAgXCIwIDAgMCAwLjJyZW0gcmdiYSg3MiwgMTgwLCA5NywgMC41KVwiLCAvLyBib3hTaGFkb3dGb2N1c1xuICAgICAgICAgICAgXCIwIDAgMCAwLjJyZW0gcmdiYSg3MiwgMTgwLCA5NywgMC41KVwiKTsgLy8gYm94U2hhZG93QWN0aXZlRm9jdXNcblxuICAgICAgICBFbGVtZW50VGhlbWVBcHBsaWNhdG9yLmFwcGx5KHN0eWxlc2hlZXRCdWlsZGVyLCBcImRyb3AtZG93bi1wYW5lbC1idXR0b25cIiwgXCJpbmZvXCIsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuSU5GT19DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuSU5GT19IT1ZFUl9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuSU5GT19ESVNBQkxFRF9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuSU5GT19BQ1RJVkVfQ09MT1JTLFxuICAgICAgICAgICAgXCIwIDAgMCAwLjJyZW0gcmdiYSg1OCwgMTc2LCAxOTUsIDAuNSlcIiwgLy8gYm94U2hhZG93Rm9jdXNcbiAgICAgICAgICAgIFwiMCAwIDAgMC4ycmVtIHJnYmEoNTgsIDE3NiwgMTk1LCAwLjUpXCIpOyAvLyBib3hTaGFkb3dBY3RpdmVGb2N1c1xuXG4gICAgICAgIEVsZW1lbnRUaGVtZUFwcGxpY2F0b3IuYXBwbHkoc3R5bGVzaGVldEJ1aWxkZXIsIFwiZHJvcC1kb3duLXBhbmVsLWJ1dHRvblwiLCBcIndhcm5pbmdcIixcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5XQVJOSU5HX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5XQVJOSU5HX0hPVkVSX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5XQVJOSU5HX0RJU0FCTEVEX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5XQVJOSU5HX0FDVElWRV9DT0xPUlMsXG4gICAgICAgICAgICBcIjAgMCAwIDAuMnJlbSByZ2JhKDIyMiwgMTcwLCAxMiwgMC41KVwiLCAvLyBib3hTaGFkb3dGb2N1c1xuICAgICAgICAgICAgXCIwIDAgMCAwLjJyZW0gcmdiYSgyMjIsIDE3MCwgMTIsIDAuNSlcIik7IC8vIGJveFNoYWRvd0FjdGl2ZUZvY3VzXG5cbiAgICAgICAgRWxlbWVudFRoZW1lQXBwbGljYXRvci5hcHBseShzdHlsZXNoZWV0QnVpbGRlciwgXCJkcm9wLWRvd24tcGFuZWwtYnV0dG9uXCIsIFwiZGFuZ2VyXCIsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuREFOR0VSX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5EQU5HRVJfSE9WRVJfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLkRBTkdFUl9ESVNBQkxFRF9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuREFOR0VSX0FDVElWRV9DT0xPUlMsXG4gICAgICAgICAgICBcIjAgMCAwIDAuMnJlbSByZ2JhKDIyNSwgODMsIDk3LCAwLjUpXCIsIC8vIGJveFNoYWRvd0ZvY3VzXG4gICAgICAgICAgICBcIjAgMCAwIDAuMnJlbSByZ2JhKDIyNSwgODMsIDk3LCAwLjUpXCIpOyAvLyBib3hTaGFkb3dBY3RpdmVGb2N1c1xuXG4gICAgICAgIEVsZW1lbnRUaGVtZUFwcGxpY2F0b3IuYXBwbHkoc3R5bGVzaGVldEJ1aWxkZXIsIFwiZHJvcC1kb3duLXBhbmVsLWJ1dHRvblwiLCBcImxpZ2h0XCIsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuTElHSFRfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLkxJR0hUX0hPVkVSX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5MSUdIVF9ESVNBQkxFRF9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuTElHSFRfQUNUSVZFX0NPTE9SUyxcbiAgICAgICAgICAgIFwiMCAwIDAgMC4ycmVtIHJnYmEoMjE2LCAyMTcsIDIxOSwgMC41KVwiLCAvLyBib3hTaGFkb3dGb2N1c1xuICAgICAgICAgICAgXCIwIDAgMCAwLjJyZW0gcmdiYSgyMTYsIDIxNywgMjE5LCAwLjUpXCIpOyAvLyBib3hTaGFkb3dBY3RpdmVGb2N1c1xuXG4gICAgICAgIEVsZW1lbnRUaGVtZUFwcGxpY2F0b3IuYXBwbHkoc3R5bGVzaGVldEJ1aWxkZXIsIFwiZHJvcC1kb3duLXBhbmVsLWJ1dHRvblwiLCBcImRhcmtcIixcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5EQVJLX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5EQVJLX0hPVkVSX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5EQVJLX0RJU0FCTEVEX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5EQVJLX0FDVElWRV9DT0xPUlMsXG4gICAgICAgICAgICBcIjAgMCAwIDAuMnJlbSByZ2JhKDgyLCA4OCwgOTMsIDAuNSlcIiwgLy8gYm94U2hhZG93Rm9jdXNcbiAgICAgICAgICAgIFwiMCAwIDAgMC4ycmVtIHJnYmEoODIsIDg4LCA5MywgMC41KVwiKTsgLy8gYm94U2hhZG93QWN0aXZlRm9jdXNcblxuICAgICAgICByZXR1cm4gc3R5bGVzaGVldEJ1aWxkZXIuYnVpbGQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudEJ1aWxkZXJ9IGNvbXBvbmVudEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMge0NvbXBvbmVudH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRDb21wb25lbnQoY29tcG9uZW50QnVpbGRlcikge1xuICAgICAgIHJldHVybiBjb21wb25lbnRCdWlsZGVyXG4gICAgICAgICAgICAucm9vdChcImRpdlwiLCBcImlkPWRyb3BEb3duUGFuZWxSb290XCIsIFwiY2xhc3M9ZHJvcC1kb3duLXBhbmVsLW91dGxpbmVcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAubm9kZShcImJ1dHRvblwiLCBcImlkPWJ1dHRvblwiLCBcImNsYXNzPWRyb3AtZG93bi1wYW5lbC1idXR0b25cIilcbiAgICAgICAgICAgICAgICAubm9kZShcImRpdlwiLCBcImlkPWFycm93XCIsIFwiY2xhc3M9ZHJvcC1kb3duLXBhbmVsLWFycm93XCIpXG4gICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAubm9kZShcImlcIilcbiAgICAgICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwiZGl2XCIsIFwiaWQ9Y29udGVudFwiLCBcImNsYXNzPWRyb3AtZG93bi1wYW5lbC1jb250ZW50XCIsIFwidGFiaW5kZXg9MFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgcG9zdENvbmZpZygpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKERyb3BEb3duUGFuZWwpO1xuICAgICAgICBDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUoRHJvcERvd25QYW5lbC5uYW1lKTtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYnV0dG9uXCIpLnNldENoaWxkKEhUTUwuaShcIlwiLCB0aGlzLmljb25DbGFzcykpO1xuXG4gICAgICAgIFN0eWxlU2VsZWN0b3JBY2Nlc3Nvci5mcm9tKHRoaXMuY29tcG9uZW50LmdldChcImJ1dHRvblwiKSlcbiAgICAgICAgICAgIC5lbmFibGUoRHJvcERvd25QYW5lbC5CVVRUT04pXG4gICAgICAgICAgICAuZW5hYmxlKHRoaXMudHlwZSk7XG5cbiAgICAgICAgU3R5bGVTZWxlY3RvckFjY2Vzc29yLmZyb20odGhpcy5jb21wb25lbnQuZ2V0KFwiY29udGVudFwiKSlcbiAgICAgICAgICAgIC5lbmFibGUoRHJvcERvd25QYW5lbC5DT05URU5UKVxuICAgICAgICAgICAgLmRpc2FibGUoRHJvcERvd25QYW5lbC5DT05URU5UX1ZJU0lCTEUpXG4gICAgICAgICAgICAuZW5hYmxlKERyb3BEb3duUGFuZWwuQ09OVEVOVF9ISURERU4pXG4gICAgICAgICAgICAuZW5hYmxlKHRoaXMuc2l6ZSlcbiAgICAgICAgICAgIC5lbmFibGUodGhpcy5vcmllbnRhdGlvbik7XG5cbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYnV0dG9uXCIpLmxpc3RlblRvKFwiY2xpY2tcIiwgdGhpcy5jbGlja2VkLCB0aGlzKTtcbiAgICAgICAgQ2FudmFzUm9vdC5saXN0ZW5Ub0ZvY3VzRXNjYXBlKHRoaXMuY29tcG9uZW50LmdldChcImRyb3BEb3duUGFuZWxSb290XCIpLCB0aGlzLmhpZGUsIHRoaXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Q29tcG9uZW50fSBkcm9wRG93blBhbmVsQ29udGVudCBcbiAgICAgKi9cbiAgICBzZXRQYW5lbENvbnRlbnQoZHJvcERvd25QYW5lbENvbnRlbnQpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiY29udGVudFwiKS5zZXRDaGlsZChkcm9wRG93blBhbmVsQ29udGVudC5jb21wb25lbnQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbnRhaW5lckV2ZW50fSBldmVudCBcbiAgICAgKi9cbiAgICBjbGlja2VkKGV2ZW50KSB7XG4gICAgICAgIHRoaXMudG9nZ2xlQ29udGVudCgpO1xuICAgIH1cblxuICAgIHRvZ2dsZUNvbnRlbnQoKSB7XG4gICAgICAgIGlmICghU3R5bGVBY2Nlc3Nvci5mcm9tKHRoaXMuY29tcG9uZW50LmdldChcImFycm93XCIpKS5pcyhcImRpc3BsYXlcIixcImJsb2NrXCIpKSB7XG4gICAgICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2hvdygpIHtcbiAgICAgICAgU3R5bGVTZWxlY3RvckFjY2Vzc29yLmZyb20odGhpcy5jb21wb25lbnQuZ2V0KFwiY29udGVudFwiKSlcbiAgICAgICAgICAgIC5kaXNhYmxlKERyb3BEb3duUGFuZWwuQ09OVEVOVF9ISURERU4pXG4gICAgICAgICAgICAuZW5hYmxlKERyb3BEb3duUGFuZWwuQ09OVEVOVF9WSVNJQkxFKTtcbiAgICAgICAgU3R5bGVBY2Nlc3Nvci5mcm9tKHRoaXMuY29tcG9uZW50LmdldChcImFycm93XCIpKVxuICAgICAgICAgICAgLnNldChcImRpc3BsYXlcIiwgXCJibG9ja1wiKTtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiY29udGVudFwiKS5jb250YWluZXJFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuXG4gICAgaGlkZSgpIHtcbiAgICAgICAgU3R5bGVTZWxlY3RvckFjY2Vzc29yLmZyb20odGhpcy5jb21wb25lbnQuZ2V0KFwiY29udGVudFwiKSlcbiAgICAgICAgICAgIC5kaXNhYmxlKERyb3BEb3duUGFuZWwuQ09OVEVOVF9WSVNJQkxFKVxuICAgICAgICAgICAgLmVuYWJsZShEcm9wRG93blBhbmVsLkNPTlRFTlRfSElEREVOKTtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYXJyb3dcIikuc2V0U3R5bGUoXCJkaXNwbGF5XCIsIFwibm9uZVwiKTtcbiAgICB9XG5cbiAgICBkaXNhYmxlKCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJidXR0b25cIikuc2V0QXR0cmlidXRlVmFsdWUoXCJkaXNhYmxlZFwiLCBcInRydWVcIik7XG4gICAgfVxuXG4gICAgZW5hYmxlKCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJidXR0b25cIikucmVtb3ZlQXR0cmlidXRlKFwiZGlzYWJsZWRcIik7XG4gICAgfVxufVxuXG5UeXBlQ29uZmlnUGFjay5pbnN0YW5jZSgpLmFkZFR5cGVDb25maWcoXCJudXR0aW4yYy11aVwiLCBQcm90b3R5cGVDb25maWcudW5uYW1lZChEcm9wRG93blBhbmVsKSk7IiwiaW1wb3J0IHsgQ29tcG9uZW50LFxuICAgIENhbnZhc1N0eWxlcyxcbiAgICBDb21wb25lbnRCdWlsZGVyLFxuICAgIElubGluZUNvbXBvbmVudEZhY3Rvcnlcbn0gZnJvbSBcIm51dHRpbjJjLWNvcmVfdjFcIjtcbmltcG9ydCB7IEluamVjdGlvblBvaW50LCBQcm90b3R5cGVDb25maWcsIFR5cGVDb25maWdQYWNrIH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcblxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIkZpbGxQYW5lbFwiKTtcblxuZXhwb3J0IGNsYXNzIEZpbGxQYW5lbCB7XG5cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgICAgIC8qKiBAdHlwZSB7SW5saW5lQ29tcG9uZW50RmFjdG9yeX0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoSW5saW5lQ29tcG9uZW50RmFjdG9yeSk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnR9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gbnVsbDtcblxuICAgIH1cblxuICAgIHNldENvbnRlbnQoY29tcG9uZW50KSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LnNldENoaWxkKFwiY29udGVudFwiLCBjb21wb25lbnQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Q29tcG9uZW50QnVpbGRlcn0gY29tcG9uZW50QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyB7Q29tcG9uZW50fVxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZENvbXBvbmVudChjb21wb25lbnRCdWlsZGVyKSB7XG4gICAgICAgIHJldHVybiBjb21wb25lbnRCdWlsZGVyXG4gICAgICAgICAgICAucm9vdChcImRpdlwiLCBcImlkPWNvbnRlbnRcIiwgXCJjbGFzcz1jbnRyIGNudHItcm93cyBjbnRyLWdyb3ctb25seSB3aWR0aC1mdWxsXCIpXG4gICAgICAgICAgICAuYnVpbGQoKTtcbiAgICB9XG5cbiAgICBwb3N0Q29uZmlnKCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoRmlsbFBhbmVsKTtcbiAgICB9XG5cbn1cblxuVHlwZUNvbmZpZ1BhY2suaW5zdGFuY2UoKS5hZGRUeXBlQ29uZmlnKFwibnV0dGluMmMtdWlcIiwgUHJvdG90eXBlQ29uZmlnLnVubmFtZWQoRmlsbFBhbmVsKSk7IiwiaW1wb3J0IHsgTWV0aG9kLCBMb2dnZXIgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcbmltcG9ydCB7IElucHV0RWxlbWVudERhdGFCaW5kaW5nLCBBYnN0cmFjdFZhbGlkYXRvciwgVGVtcGxhdGVDb21wb25lbnRGYWN0b3J5LCBDYW52YXNTdHlsZXMsIENvbXBvbmVudCwgRXZlbnRNYW5hZ2VyLCBJbmxpbmVDb21wb25lbnRGYWN0b3J5LCBTdHlsZUFjY2Vzc29yLCBTdHlsZVNlbGVjdG9yQWNjZXNzb3IgfSBmcm9tIFwibnV0dGluMmMtY29yZV92MVwiO1xuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQgfSBmcm9tIFwibWluZGlfdjFcIjtcbmltcG9ydCB7IENvbW1vbkV2ZW50cyB9IGZyb20gXCIuLi9jb21tb24vY29tbW9uRXZlbnRzXCI7XG5pbXBvcnQgeyBDb250YWluZXJFdmVudCB9IGZyb20gXCJjb250YWluZXJicmlkZ2VfdjFcIjtcbmltcG9ydCB7IEJhbm5lck1lc3NhZ2UgfSBmcm9tIFwiLi4vYmFubmVyTWVzc2FnZS9iYW5uZXJNZXNzYWdlLmpzXCI7XG5pbXBvcnQgeyBCdWJibGVNZXNzYWdlIH0gZnJvbSBcIi4uL2J1YmJsZU1lc3NhZ2UvYnViYmxlTWVzc2FnZS5qc1wiO1xuXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiQ29tbW9uSW5wdXRcIik7XG5cbmV4cG9ydCBjbGFzcyBDb21tb25JbnB1dCB7XG5cbiAgICBzdGF0aWMgRVZFTlRfQ0xJQ0tFRCA9IENvbW1vbkV2ZW50cy5DTElDS0VEO1xuICAgIHN0YXRpYyBFVkVOVF9FTlRFUkVEID0gQ29tbW9uRXZlbnRzLkVOVEVSRUQ7XG4gICAgc3RhdGljIEVWRU5UX0tFWVVQUEVEID0gQ29tbW9uRXZlbnRzLktFWVVQUEVEO1xuICAgIHN0YXRpYyBFVkVOVF9DSEFOR0VEID0gQ29tbW9uRXZlbnRzLkNIQU5HRUQ7XG4gICAgc3RhdGljIEVWRU5UX0JMVVJSRUQgPSBDb21tb25FdmVudHMuQkxVUlJFRDtcblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNvbXBvbmVudENsYXNzXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gbW9kZWxcbiAgICAgKiBAcGFyYW0ge0Fic3RyYWN0VmFsaWRhdG9yfSB2YWxpZGF0b3JcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGxhY2Vob2xkZXJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaW5wdXRFbGVtZW50SWRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZXJyb3JFbGVtZW50SWRcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihjb21wb25lbnRDbGFzcyxcbiAgICAgICAgbmFtZSxcbiAgICAgICAgbW9kZWwgPSBudWxsLFxuICAgICAgICB2YWxpZGF0b3IgPSBudWxsLCBcbiAgICAgICAgbGFiZWwgPSBudWxsLFxuICAgICAgICBlcnJvck1lc3NhZ2UgPSBcIkludmFsaWQgdmFsdWVcIixcbiAgICAgICAgZXJyb3JNZXNzYWdlTGlzdEl0ZW1zID0gW10pIHtcblxuXG4gICAgICAgIC8qKiBAdHlwZSB7SW5saW5lQ29tcG9uZW50RmFjdG9yeX0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoSW5saW5lQ29tcG9uZW50RmFjdG9yeSk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnR9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gbnVsbDtcblxuICAgICAgICAvKiogQHR5cGUge0Fic3RyYWN0VmFsaWRhdG9yfSAqL1xuICAgICAgICB0aGlzLnZhbGlkYXRvciA9IHZhbGlkYXRvcjtcblxuICAgICAgICAvKiogQHR5cGUge0Z1bmN0aW9ufSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudENsYXNzID0gY29tcG9uZW50Q2xhc3M7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMubGFiZWwgPSBsYWJlbDtcblxuICAgICAgICAvKiogQHR5cGUge29iamVjdH0gKi9cbiAgICAgICAgdGhpcy5tb2RlbCA9IG1vZGVsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Ym9vbGVhbn0gKi9cbiAgICAgICAgdGhpcy50YWludGVkID0gZmFsc2U7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtFdmVudE1hbmFnZXJ9ICovXG4gICAgICAgIHRoaXMuZXZlbnRNYW5hZ2VyID0gbmV3IEV2ZW50TWFuYWdlcigpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7SW5wdXRFbGVtZW50RGF0YUJpbmRpbmd9ICovXG4gICAgICAgIHRoaXMuZGF0YUJpbmRpbmcgPSBudWxsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7QnViYmxlTWVzc2FnZX0gKi9cbiAgICAgICAgdGhpcy5idWJibGVNZXNzYWdlID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoQnViYmxlTWVzc2FnZSwgW2Vycm9yTWVzc2FnZSwgZXJyb3JNZXNzYWdlTGlzdEl0ZW1zXSk7XG4gICAgfVxuXG4gICAgcG9zdENvbmZpZygpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKHRoaXMuY29tcG9uZW50Q2xhc3MpO1xuXG4gICAgICAgIENhbnZhc1N0eWxlcy5lbmFibGVTdHlsZSh0aGlzLmNvbXBvbmVudENsYXNzLm5hbWUsIHRoaXMuY29tcG9uZW50LmNvbXBvbmVudEluZGV4KTtcblxuICAgICAgICB0aGlzLmJ1YmJsZU1lc3NhZ2UuaGlkZSgpO1xuXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImlucHV0XCIpLnNldEF0dHJpYnV0ZVZhbHVlKFwibmFtZVwiLCB0aGlzLm5hbWUpO1xuICAgICAgICBpZiAodGhpcy5jb21wb25lbnQuZ2V0KFwiYnViYmxlTWVzc2FnZVwiKSkge1xuICAgICAgICAgICAgdGhpcy5jb21wb25lbnQuc2V0KFwiYnViYmxlTWVzc2FnZVwiLCB0aGlzLmJ1YmJsZU1lc3NhZ2UuY29tcG9uZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGxhYmVsID0gdGhpcy5jb21wb25lbnQuZ2V0KFwibGFiZWxcIik7XG4gICAgICAgIGNvbnN0IGlucHV0ID0gdGhpcy5jb21wb25lbnQuZ2V0KFwiaW5wdXRcIik7XG5cbiAgICAgICAgaWYgKHRoaXMubGFiZWwgJiYgbGFiZWwpIHtcbiAgICAgICAgICAgIGxhYmVsLnNldEF0dHJpYnV0ZVZhbHVlKFwiZm9yXCIsIGlucHV0LmdldEF0dHJpYnV0ZVZhbHVlKFwiaWRcIikpO1xuICAgICAgICAgICAgbGFiZWwuc2V0Q2hpbGQodGhpcy5sYWJlbCk7XG4gICAgICAgICAgICBTdHlsZVNlbGVjdG9yQWNjZXNzb3IuZnJvbShsYWJlbCkuZGlzYWJsZShcImhpZGRlblwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnZhbGlkYXRvcikge1xuICAgICAgICAgICAgdGhpcy52YWxpZGF0b3Iud2l0aFZhbGlkTGlzdGVuZXIobmV3IE1ldGhvZCh0aGlzLmJ1YmJsZU1lc3NhZ2UuaGlkZSwgdGhpcy5idWJibGVNZXNzYWdlKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZih0aGlzLm1vZGVsKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGFCaW5kaW5nID0gSW5wdXRFbGVtZW50RGF0YUJpbmRpbmcubGluayh0aGlzLm1vZGVsLCB0aGlzLnZhbGlkYXRvcikudG8oaW5wdXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaW5wdXRcbiAgICAgICAgICAgIC5saXN0ZW5UbyhcImtleXVwXCIsIHRoaXMua2V5dXBwZWQsIHRoaXMpXG4gICAgICAgICAgICAubGlzdGVuVG8oXCJjaGFuZ2VcIiwgdGhpcy5jaGFuZ2VkLCB0aGlzKVxuICAgICAgICAgICAgLmxpc3RlblRvKFwiYmx1clwiLCB0aGlzLmJsdXJyZWQsIHRoaXMpXG4gICAgICAgICAgICAubGlzdGVuVG8oXCJjbGlja1wiLCB0aGlzLmNsaWNrZWQsIHRoaXMpXG4gICAgICAgICAgICAubGlzdGVuVG8oXCJrZXl1cFwiLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQuaXNLZXlDb2RlKDEzKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVudGVyZWQoZXZlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIHRoaXMpO1xuXG4gICAgICAgIGlmICh0aGlzLmNvbXBvbmVudC5nZXQoXCJidWJibGVNZXNzYWdlXCIpKSB7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJidWJibGVNZXNzYWdlXCIpLmxpc3RlblRvKFwiY2xpY2tcIiwgdGhpcy5lcnJvckNsaWNrZWQsIHRoaXMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IGV2ZW50cygpIHsgcmV0dXJuIHRoaXMuZXZlbnRNYW5hZ2VyOyB9XG5cbiAgICBnZXQgdmFsdWUoKSB7IFxuICAgICAgICAvKiogQHR5cGUge0hUTUxJbnB1dEVsZW1lbnR9ICovXG4gICAgICAgIGNvbnN0IGlucHV0ID0gdGhpcy5jb21wb25lbnQuZ2V0KFwiaW5wdXRcIik7XG4gICAgICAgIHJldHVybiBpbnB1dC52YWx1ZTtcbiAgICB9XG5cbiAgICBzZXQgdmFsdWUodmFsdWUpIHtcbiAgICAgICAgLyoqIEB0eXBlIHtIVE1MSW5wdXRFbGVtZW50fSAqL1xuICAgICAgICBjb25zdCBpbnB1dCA9IHRoaXMuY29tcG9uZW50LmdldChcImlucHV0XCIpO1xuICAgICAgICBpbnB1dC52YWx1ZSA9IHZhbHVlO1xuICAgICAgICBpZiAodGhpcy5kYXRhQmluZGluZykge1xuICAgICAgICAgICAgdGhpcy5kYXRhQmluZGluZy5wdXNoKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbnRhaW5lckV2ZW50fSBldmVudCBcbiAgICAgKi9cbiAgICBrZXl1cHBlZChldmVudCkge1xuICAgICAgICBpZiAoIWV2ZW50LmlzS2V5Q29kZSgxMykgJiYgIWV2ZW50LmlzS2V5Q29kZSgxNikgJiYgIWV2ZW50LmlzS2V5Q29kZSg5KSkge1xuICAgICAgICAgICAgdGhpcy50YWludGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoXCJcIiA9PT0gZXZlbnQudGFyZ2V0VmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMudGFpbnRlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZXZlbnRzLnRyaWdnZXIoQ29tbW9uSW5wdXQuRVZFTlRfS0VZVVBQRUQsIGV2ZW50KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbnRhaW5lckV2ZW50fSBldmVudCBcbiAgICAgKi9cbiAgICBjaGFuZ2VkKGV2ZW50KSB7XG4gICAgICAgIHRoaXMudGFpbnRlZCA9IHRydWU7XG4gICAgICAgIGlmIChcIlwiID09PSBldmVudC50YXJnZXRWYWx1ZSkge1xuICAgICAgICAgICAgdGhpcy50YWludGVkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5ldmVudHMudHJpZ2dlcihDb21tb25JbnB1dC5FVkVOVF9DSEFOR0VELCBldmVudCk7XG4gICAgfVxuXG4gICAgY2xpY2tlZChldmVudCkge1xuICAgICAgICB0aGlzLmV2ZW50cy50cmlnZ2VyKENvbW1vbklucHV0LkVWRU5UX0NMSUNLRUQsIGV2ZW50KTtcbiAgICB9XG5cbiAgICBlbnRlcmVkKGV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy52YWxpZGF0b3IuaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICB0aGlzLmJ1YmJsZU1lc3NhZ2Uuc2hvdygpO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RBbGwoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmV2ZW50cy50cmlnZ2VyKENvbW1vbklucHV0LkVWRU5UX0VOVEVSRUQsIGV2ZW50KTtcbiAgICB9XG5cbiAgICBibHVycmVkKGV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy50YWludGVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLnZhbGlkYXRvci5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgIHRoaXMuYnViYmxlTWVzc2FnZS5zaG93KCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5idWJibGVNZXNzYWdlLmhpZGUoKTtcbiAgICAgICAgdGhpcy5ldmVudHMudHJpZ2dlcihDb21tb25JbnB1dC5FVkVOVF9CTFVSUkVELCBldmVudCk7XG4gICAgfVxuXG4gICAgZXJyb3JDbGlja2VkKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuYnViYmxlTWVzc2FnZS5oaWRlKCk7XG4gICAgfVxuXG4gICAgZm9jdXMoKSB7IHRoaXMuY29tcG9uZW50LmdldChcImlucHV0XCIpLmZvY3VzKCk7IH1cbiAgICBzZWxlY3RBbGwoKSB7IHRoaXMuY29tcG9uZW50LmdldChcImlucHV0XCIpLnNlbGVjdEFsbCgpOyB9XG4gICAgZW5hYmxlKCkgeyB0aGlzLmNvbXBvbmVudC5nZXQoXCJpbnB1dFwiKS5lbmFibGUoKTsgfVxuICAgIGRpc2FibGUoKSB7IHRoaXMuY29tcG9uZW50LmdldChcImlucHV0XCIpLmRpc2FibGUoKTsgfVxuICAgIGNsZWFyKCkgeyB0aGlzLmNvbXBvbmVudC5nZXQoXCJpbnB1dFwiKS52YWx1ZSA9IFwiXCI7IHRoaXMudGFpbnRlZCA9IGZhbHNlOyB0aGlzLmJ1YmJsZU1lc3NhZ2UuaGlkZSgpOyB9XG5cbn0iLCJpbXBvcnQge1xuICAgIENhbnZhc1N0eWxlcyxcbiAgICBDb21wb25lbnQsXG4gICAgRXZlbnRNYW5hZ2VyLFxuICAgIFN0eWxlU2VsZWN0b3JBY2Nlc3NvcixcbiAgICBTdHlsZXNoZWV0QnVpbGRlcixcbiAgICBDb21wb25lbnRCdWlsZGVyLFxuICAgIFN0eWxlc2hlZXQsXG4gICAgSW5saW5lQ29tcG9uZW50RmFjdG9yeVxufSBmcm9tIFwibnV0dGluMmMtY29yZV92MVwiO1xuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQsIFByb3RvdHlwZUNvbmZpZywgVHlwZUNvbmZpZ1BhY2sgfSBmcm9tIFwibWluZGlfdjFcIjtcbmltcG9ydCB7IExvZ2dlciwgTWV0aG9kIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5pbXBvcnQgeyBDb21tb25FdmVudHMgfSBmcm9tIFwiLi4vY29tbW9uL2NvbW1vbkV2ZW50c1wiO1xuXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiTGlua1BhbmVsXCIpO1xuXG5leHBvcnQgY2xhc3MgTGlua1BhbmVsIHtcblxuICAgIHN0YXRpYyBFVkVOVF9DTElDS0VEID0gQ29tbW9uRXZlbnRzLkNMSUNLRUQ7XG5cbiAgICBzdGF0aWMgU0laRV9TTUFMTCA9IFwibGluay1wYW5lbC1zbWFsbFwiO1xuICAgIHN0YXRpYyBTSVpFX01FRElVTSA9IFwibGluay1wYW5lbC1tZWRpdW1cIjtcbiAgICBzdGF0aWMgU0laRV9MQVJHRSA9IFwibGluay1wYW5lbC1sYXJnZVwiO1xuXG4gICAgc3RhdGljIE9SSUVOVEFUSU9OX0ZMQVQgPSBcImxpbmstcGFuZWwtZmxhdFwiO1xuICAgIHN0YXRpYyBPUklFTlRBVElPTl9TVEFDS0VEID0gXCJsaW5rLXBhbmVsLXN0YWNrZWRcIjtcblxuICAgIHN0YXRpYyBUSEVNRV9EQVJLID0gXCJsaW5rLXBhbmVsLWRhcmtcIjtcbiAgICBzdGF0aWMgVEhFTUVfTElHSFQgPSBcImxpbmstcGFuZWwtbGlnaHRcIjtcbiAgICBzdGF0aWMgVEhFTUVfREFOR0VSID0gXCJsaW5rLXBhbmVsLWRhbmdlclwiO1xuICAgIHN0YXRpYyBUSEVNRV9JTkZPID0gXCJsaW5rLXBhbmVsLWluZm9cIjtcbiAgICBzdGF0aWMgVEhFTUVfU1VDQ0VTUyA9IFwibGluay1wYW5lbC1zdWNjZXNzXCI7XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbGFiZWxcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWNvblxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGxhYmVsLCBpY29uLCB0aGVtZSA9IExpbmtQYW5lbC5USEVNRV9EQVJLLCBvcmllbnRhdGlvbiA9IExpbmtQYW5lbC5PUklFTlRBVElPTl9GTEFULCBzaXplID0gTGlua1BhbmVsLlNJWkVfU01BTEwpIHtcblxuICAgICAgICAvKiogQHR5cGUge0lubGluZUNvbXBvbmVudEZhY3Rvcnl9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKElubGluZUNvbXBvbmVudEZhY3RvcnkpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IG51bGw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtTdHJpbmd9ICovXG4gICAgICAgIHRoaXMubGFiZWwgPSBsYWJlbDtcblxuICAgICAgICAvKiogQHR5cGUge1N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5pY29uID0gaWNvbjtcblxuICAgICAgICAvKiogQHR5cGUge1N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5vcmllbnRhdGlvbiA9IG9yaWVudGF0aW9uO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7U3RyaW5nfSAqL1xuICAgICAgICB0aGlzLnNpemUgPSBzaXplO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7U3RyaW5nfSAqL1xuICAgICAgICB0aGlzLnRoZW1lID0gdGhlbWU7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtFdmVudE1hbmFnZXI8TGlua1BhbmVsPn0gKi9cbiAgICAgICAgdGhpcy5ldmVudE1hbmFnZXIgPSBuZXcgRXZlbnRNYW5hZ2VyKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHlsZXNoZWV0QnVpbGRlcn0gc3R5bGVzaGVldEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMge1N0eWxlc2hlZXR9XG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkU3R5bGVzaGVldChzdHlsZXNoZWV0QnVpbGRlcikge1xuICAgICAgICByZXR1cm4gc3R5bGVzaGVldEJ1aWxkZXJcbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5saW5rLXBhbmVsXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLCBcImZsZXhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJhbGlnbi1pdGVtc1wiLCBcInN0cmV0Y2hcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW5cIiwgXCIycHRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItcmFkaXVzXCIsIFwiNXB0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY3Vyc29yXCIsIFwicG9pbnRlclwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmdcIiwgXCIwLjc1cmVtIDAuNzVyZW1cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ1c2VyLXNlbGVjdFwiLCBcIm5vbmVcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5saW5rLXBhbmVsLWZsYXRcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmbGV4LWRpcmVjdGlvblwiLCBcInJvd1wiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmxpbmstcGFuZWwtZmxhdCA+IC5saW5rLXBhbmVsLWljb25cIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLCBcIjJyZW1cIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5saW5rLXBhbmVsLXN0YWNrZWRcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmbGV4LWRpcmVjdGlvblwiLCBcImNvbHVtblwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmxpbmstcGFuZWwtc21hbGxcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmb250LXNpemVcIiwgXCIxcmVtXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIubGluay1wYW5lbC1tZWRpdW1cIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmb250LXNpemVcIiwgXCIxLjJyZW1cIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5saW5rLXBhbmVsLWxhcmdlXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZm9udC1zaXplXCIsIFwiMS41cmVtXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIubGluay1wYW5lbC1kYXJrXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCIjMjEyNTI5XCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIubGluay1wYW5lbC1kYXJrOmhvdmVyXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiNiZmJmYmZcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5saW5rLXBhbmVsLWxpZ2h0XCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCIjZmZmZmZmXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIubGluay1wYW5lbC1saWdodDpob3ZlclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIiwgXCIjOGY4ZjhmXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIubGluay1wYW5lbC1kYW5nZXJcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjb2xvclwiLCBcIiNmZjAwMDBcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5saW5rLXBhbmVsLWRhbmdlcjpob3ZlclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIiwgXCIjYmZiZmJmXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIubGluay1wYW5lbC1pbmZvXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCIjMDAwMGZmXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIubGluay1wYW5lbC1pbmZvOmhvdmVyXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiNiZmJmYmZcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5saW5rLXBhbmVsLXN1Y2Nlc3NcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjb2xvclwiLCBcIiMwMGZmMDBcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5saW5rLXBhbmVsLXN1Y2Nlc3M6aG92ZXJcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiI2ZmZmZmZlwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmxpbmstcGFuZWwtaWNvblwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRleHQtYWxpZ25cIiwgXCJjZW50ZXJcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ2ZXJ0aWNhbC1hbGlnblwiLCBcIm1pZGRsZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInVzZXItc2VsZWN0XCIsIFwibm9uZVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmxpbmstcGFuZWwtbGFiZWxcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmb250LXdlaWdodFwiLCBcIjQwMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRleHQtYWxpZ25cIiwgXCJjZW50ZXJcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ2ZXJ0aWNhbC1hbGlnblwiLCBcIm1pZGRsZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmctbGVmdFwiLCBcIjVwdFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmctcmlnaHRcIiwgXCI1cHRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ1c2VyLXNlbGVjdFwiLCBcIm5vbmVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2l0aW9uXCIsIFwiY29sb3IgMC4xNXMgZWFzZS1pbi1vdXQsIFwiICtcbiAgICAgICAgICAgICAgICAgICAgXCJiYWNrZ3JvdW5kLWNvbG9yIDAuMTVzIGVhc2UtaW4tb3V0LCBcIiArXG4gICAgICAgICAgICAgICAgICAgIFwiYm9yZGVyLWNvbG9yIDAuMTVzIGVhc2UtaW4tb3V0LCBcIiArXG4gICAgICAgICAgICAgICAgICAgIFwiYm94LXNoYWRvdyAwLjE1cyBlYXNlLWluLW91dFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLmJ1aWxkKCk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudEJ1aWxkZXJ9IGNvbXBvbmVudEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMge0NvbXBvbmVudH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRDb21wb25lbnQoY29tcG9uZW50QnVpbGRlcikge1xuICAgICAgICByZXR1cm4gY29tcG9uZW50QnVpbGRlclxuICAgICAgICAgICAgLnJvb3QoXCJkaXZcIiwgXCJpZD1saW5rXCIsIFwiY2xhc3M9bGluay1wYW5lbFwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwiZGl2XCIsIFwiY2xhc3M9bGluay1wYW5lbC1pY29uXCIpXG4gICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAubm9kZShcImlcIiwgXCJpZD1pY29uXCIpXG4gICAgICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgICAgICAubm9kZShcImRpdlwiLCBcImNsYXNzPWxpbmstcGFuZWwtbGFiZWxcIilcbiAgICAgICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgICAgIC5ub2RlKFwiYVwiLCBcImlkPWxhYmVsXCIpXG4gICAgICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAuYnVpbGQoKTtcbiAgICB9XG5cbiAgICAvKiogQHR5cGUge0V2ZW50TWFuYWdlcjxMaW5rUGFuZWw+fSAqL1xuICAgIGdldCBldmVudHMoKSB7IHJldHVybiB0aGlzLmV2ZW50TWFuYWdlcjsgfVxuXG4gICAgcG9zdENvbmZpZygpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKExpbmtQYW5lbCk7XG4gICAgICAgIENhbnZhc1N0eWxlcy5lbmFibGVTdHlsZShMaW5rUGFuZWwubmFtZSk7XG4gICAgICAgIFxuICAgICAgICBTdHlsZVNlbGVjdG9yQWNjZXNzb3IuZnJvbSh0aGlzLmNvbXBvbmVudC5nZXQoXCJsaW5rXCIpKVxuICAgICAgICAgICAgLmVuYWJsZSh0aGlzLnNpemUpXG4gICAgICAgICAgICAuZW5hYmxlKHRoaXMub3JpZW50YXRpb24pXG4gICAgICAgICAgICAuZW5hYmxlKHRoaXMudGhlbWUpO1xuXG4gICAgICAgIGlmICh0aGlzLmxhYmVsKSB7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJsYWJlbFwiKS5zZXRDaGlsZCh0aGlzLmxhYmVsKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImxhYmVsXCIpLnJlbW92ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaWNvbikge1xuICAgICAgICAgICAgU3R5bGVTZWxlY3RvckFjY2Vzc29yLmZyb20odGhpcy5jb21wb25lbnQuZ2V0KFwiaWNvblwiKSlcbiAgICAgICAgICAgICAgICAuY2xlYXIoKVxuICAgICAgICAgICAgICAgIC5lbmFibGUodGhpcy5pY29uKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImljb25cIikucmVtb3ZlKCk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImxpbmtcIikubGlzdGVuVG8oXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRNYW5hZ2VyLnRyaWdnZXIoTGlua1BhbmVsLkVWRU5UX0NMSUNLRUQsIGV2ZW50KTtcbiAgICAgICAgfSwgdGhpcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtNZXRob2R9IG1ldGhvZCBcbiAgICAgKi9cbiAgICB3aXRoQ2xpY2tMaXN0ZW5lcihtZXRob2QpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwibGlua1wiKS5saXN0ZW5UbyhcImNsaWNrXCIsIG1ldGhvZCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxufVxuXG5UeXBlQ29uZmlnUGFjay5pbnN0YW5jZSgpLmFkZFR5cGVDb25maWcoXCJudXR0aW4yYy11aVwiLCBQcm90b3R5cGVDb25maWcudW5uYW1lZChMaW5rUGFuZWwpKTsiLCJpbXBvcnQgeyBDb21wb25lbnQsXG4gICAgQ2FudmFzU3R5bGVzLFxuICAgIFN0eWxlU2VsZWN0b3JBY2Nlc3NvcixcbiAgICBTdHlsZXNoZWV0QnVpbGRlcixcbiAgICBTdHlsZXNoZWV0LFxuICAgIENvbXBvbmVudEJ1aWxkZXIsXG4gICAgSW5saW5lQ29tcG9uZW50RmFjdG9yeVxufSBmcm9tIFwibnV0dGluMmMtY29yZV92MVwiO1xuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQsIFByb3RvdHlwZUNvbmZpZywgVHlwZUNvbmZpZ1BhY2sgfSBmcm9tIFwibWluZGlfdjFcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiUGFuZWxcIik7XG5cbmV4cG9ydCBjbGFzcyBQYW5lbCB7XG5cbiAgICBzdGF0aWMgUEFSQU1FVEVSX1NUWUxFX1RZUEVfQ09MVU1OX1JPT1QgPSBcInBhbmVsLXR5cGUtY29sdW1uLXJvb3RcIjtcbiAgICBzdGF0aWMgUEFSQU1FVEVSX1NUWUxFX1RZUEVfQ09MVU1OID0gXCJwYW5lbC10eXBlLWNvbHVtblwiO1xuICAgIHN0YXRpYyBQQVJBTUVURVJfU1RZTEVfVFlQRV9ST1cgPSBcInBhbmVsLXR5cGUtcm93XCI7XG5cbiAgICBzdGF0aWMgUEFSQU1FVEVSX1NUWUxFX0NPTlRFTlRfQUxJR05fTEVGVCA9IFwicGFuZWwtY29udGVudC1hbGlnbi1sZWZ0XCI7XG4gICAgc3RhdGljIFBBUkFNRVRFUl9TVFlMRV9DT05URU5UX0FMSUdOX1JJR0hUID0gXCJwYW5lbC1jb250ZW50LWFsaWduLXJpZ2h0XCI7XG4gICAgc3RhdGljIFBBUkFNRVRFUl9TVFlMRV9DT05URU5UX0FMSUdOX0NFTlRFUiA9IFwicGFuZWwtY29udGVudC1hbGlnbi1jZW50ZXJcIjtcbiAgICBzdGF0aWMgUEFSQU1FVEVSX1NUWUxFX0NPTlRFTlRfQUxJR05fSlVTVElGWSA9IFwicGFuZWwtY29udGVudC1hbGlnbi1qdXN0aWZ5XCI7XG5cbiAgICBzdGF0aWMgUEFSQU1FVEVSX1NUWUxFX1NJWkVfQVVUTyA9IFwicGFuZWwtc2l6ZS1hdXRvXCI7XG4gICAgc3RhdGljIFBBUkFNRVRFUl9TVFlMRV9TSVpFX01JTklNQUwgPSBcInBhbmVsLXNpemUtbWluaW1hbFwiO1xuICAgIHN0YXRpYyBQQVJBTUVURVJfU1RZTEVfU0laRV9SRVNQT05TSVZFID0gXCJwYW5lbC1zaXplLXJlc3BvbnNpdmVcIjtcblxuICAgIHN0YXRpYyBPUFRJT05fU1RZTEVfQ09OVEVOVF9QQURESU5HX1NNQUxMID0gXCJwYW5lbC1jb250ZW50LXBhZGRpbmctc21hbGxcIjtcbiAgICBzdGF0aWMgT1BUSU9OX1NUWUxFX0NPTlRFTlRfUEFERElOR19MQVJHRSA9IFwicGFuZWwtY29udGVudC1wYWRkaW5nLWxhcmdlXCI7XG5cbiAgICBzdGF0aWMgT1BUSU9OX1NUWUxFX0JPUkRFUl9TSEFET1cgPSBcInBhbmVsLWJvcmRlci1zaGFkb3dcIjtcblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb250ZW50QWxpZ24gXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNpemUgXG4gICAgICogQHBhcmFtIHtBcnJheTxzdHJpbmc+fSBvcHRpb25zIFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHR5cGUgPSBQYW5lbC5QQVJBTUVURVJfU1RZTEVfVFlQRV9DT0xVTU5fUk9PVCxcbiAgICAgICAgY29udGVudEFsaWduID0gUGFuZWwuUEFSQU1FVEVSX1NUWUxFX0NPTlRFTlRfQUxJR05fQ0VOVEVSLFxuICAgICAgICBzaXplID0gUGFuZWwuUEFSQU1FVEVSX1NUWUxFX1NJWkVfQVVUTyxcbiAgICAgICAgb3B0aW9ucyA9IFtdKSB7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtJbmxpbmVDb21wb25lbnRGYWN0b3J5fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShJbmxpbmVDb21wb25lbnRGYWN0b3J5KTtcblxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudH0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSBudWxsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLmNvbnRlbnRBbGlnbiA9IGNvbnRlbnRBbGlnbjtcblxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5zaXplID0gc2l6ZTtcblxuICAgICAgICAvKiogQHR5cGUge0FycmF5PFN0cmluZz59ICovXG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0eWxlc2hlZXRCdWlsZGVyfSBzdHlsZXNoZWV0QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyB7U3R5bGVzaGVldH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRTdHlsZXNoZWV0KHN0eWxlc2hlZXRCdWlsZGVyKSB7XG4gICAgICAgIHJldHVybiBzdHlsZXNoZWV0QnVpbGRlclxuICAgICAgICAgICAgLm1lZGlhKFwiQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA4NTBwdClcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc2VsZWN0b3IoXCIucGFuZWwtc2l6ZS1yZXNwb25zaXZlXCIpXG4gICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJmbGV4LWJhc2lzXCIsIFwiMTAwJVwiKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJtaW4td2lkdGhcIiwgXCI4MDBwdFwiKVxuICAgICAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAubWVkaWEoXCJAbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDg0OXB0KVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zZWxlY3RvcihcIi5wYW5lbC1zaXplLXJlc3BvbnNpdmVcIilcbiAgICAgICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcImZsZXgtYmFzaXNcIiwgXCIxMDAlXCIpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcIm1pbi13aWR0aFwiLCBcIjUwMHB0XCIpXG4gICAgICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5tZWRpYShcIkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogNTAwcHQpXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBhbmVsLXNpemUtcmVzcG9uc2l2ZVwiKVxuICAgICAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwiZmxleC1iYXNpc1wiLCBcIjEwMCVcIilcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwibWluLXdpZHRoXCIsIFwiMTAwJVwiKVxuICAgICAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucGFuZWwtdHlwZS1jb2x1bW4tcm9vdFwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgXCJmbGV4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZmxleC1kaXJlY3Rpb25cIiwgXCJjb2x1bW5cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3gtc2l6aW5nXCIsIFwiYm9yZGVyLWJveFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImhlaWdodFwiLCBcIjEwMCVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXJcIiwgXCIwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luXCIsIFwiMFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBhbmVsLXR5cGUtY29sdW1uXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLCBcImZsZXhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmbGV4LWRpcmVjdGlvblwiLCBcImNvbHVtblwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJveC1zaXppbmdcIiwgXCJib3JkZXItYm94XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luXCIsIFwiMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlclwiLCBcIjBcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5wYW5lbC10eXBlLXJvd1wiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgXCJmbGV4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZmxleC1kaXJlY3Rpb25cIiwgXCJyb3dcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3gtc2l6aW5nXCIsIFwiYm9yZGVyLWJveFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpblwiLCBcIjBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXJcIiwgXCIwXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucGFuZWwtY29udGVudC1hbGlnbi1sZWZ0XCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwianVzdGlmeS1jb250ZW50XCIsIFwibGVmdFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBhbmVsLWNvbnRlbnQtYWxpZ24tcmlnaHRcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJqdXN0aWZ5LWNvbnRlbnRcIiwgXCJyaWdodFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBhbmVsLWNvbnRlbnQtYWxpZ24tY2VudGVyXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYWxpZ24taXRlbXNcIiwgXCJjZW50ZXJcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJqdXN0aWZ5LWNvbnRlbnRcIiwgXCJjZW50ZXJcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5wYW5lbC1jb250ZW50LWFsaWduLWp1c3RpZnlcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJqdXN0aWZ5LWNvbnRlbnRcIiwgXCJzcGFjZS1iZXR3ZWVuXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucGFuZWwtc2l6ZS1hdXRvXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZmxleC1ncm93XCIsIFwiMVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZsZXgtc2hyaW5rXCIsIFwiMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZsZXgtYmFzaXNcIiwgXCJhdXRvXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucGFuZWwtc2l6ZS1taW5pbWFsXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZmxleC1ncm93XCIsIFwiMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZsZXgtc2hyaW5rXCIsIFwiMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZsZXgtYmFzaXNcIiwgXCJhdXRvXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucGFuZWwtY29udGVudC1wYWRkaW5nLXNtYWxsXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZ1wiLCBcIjJwdFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBhbmVsLWNvbnRlbnQtcGFkZGluZy1sYXJnZVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmdcIiwgXCI2cHRcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5wYW5lbC1ib3JkZXItc2hhZG93XCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm94LXNoYWRvd1wiLCBcIjAgMXB4IDhweCByZ2JhKDAsMCwwLDAuNSlcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5idWlsZCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Q29tcG9uZW50QnVpbGRlcn0gY29tcG9uZW50QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyB7Q29tcG9uZW50fVxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZENvbXBvbmVudChjb21wb25lbnRCdWlsZGVyKSB7XG4gICAgICAgIHJldHVybiBjb21wb25lbnRCdWlsZGVyXG4gICAgICAgICAgICAucm9vdChcImRpdlwiLCBcImlkPXBhbmVsXCIpXG4gICAgICAgICAgICAuYnVpbGQoKTtcbiAgICB9XG5cbiAgICBwb3N0Q29uZmlnKCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoUGFuZWwpO1xuICAgICAgICBDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUoUGFuZWwubmFtZSk7XG5cbiAgICAgICAgU3R5bGVTZWxlY3RvckFjY2Vzc29yLmZyb20odGhpcy5jb21wb25lbnQuZ2V0KFwicGFuZWxcIikpXG4gICAgICAgICAgICAuZW5hYmxlKHRoaXMudHlwZSlcbiAgICAgICAgICAgIC5lbmFibGUodGhpcy5jb250ZW50QWxpZ24pXG4gICAgICAgICAgICAuZW5hYmxlKHRoaXMuc2l6ZSk7XG4gICAgfVxuXG59XG5cblR5cGVDb25maWdQYWNrLmluc3RhbmNlKCkuYWRkVHlwZUNvbmZpZyhcIm51dHRpbjJjLXVpXCIsIFByb3RvdHlwZUNvbmZpZy51bm5hbWVkKFBhbmVsKSk7IiwiaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5pbXBvcnQgeyBDb21wb25lbnQsIENvbXBvbmVudEJ1aWxkZXIsIElubGluZUNvbXBvbmVudEZhY3RvcnkgfSBmcm9tIFwibnV0dGluMmMtY29yZV92MVwiO1xuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQsIFByb3RvdHlwZUNvbmZpZywgVHlwZUNvbmZpZ1BhY2sgfSBmcm9tIFwibWluZGlfdjFcIjtcblxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIkxpbmVQYW5lbEVudHJ5XCIpO1xuXG5leHBvcnQgY2xhc3MgTGluZVBhbmVsRW50cnkge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG5cblx0XHQvKiogQHR5cGUge0lubGluZUNvbXBvbmVudEZhY3Rvcnl9ICovXG5cdFx0dGhpcy5jb21wb25lbnRGYWN0b3J5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoSW5saW5lQ29tcG9uZW50RmFjdG9yeSk7XG5cblx0XHQvKiogQHR5cGUge0NvbXBvbmVudH0gKi9cblx0XHR0aGlzLmNvbXBvbmVudCA9IG51bGw7XG5cbiAgICB9XG5cblx0LyoqXG5cdCAqIFxuXHQgKiBAcGFyYW0ge0NvbXBvbmVudEJ1aWxkZXJ9IGNvbXBvbmVudEJ1aWxkZXIgXG5cdCAqIEByZXR1cm5zIHtDb21wb25lbnR9XG5cdCAqL1xuXHRzdGF0aWMgYnVpbGRDb21wb25lbnQoY29tcG9uZW50QnVpbGRlcikge1xuXHRcdHJldHVybiBjb21wb25lbnRCdWlsZGVyXG5cdFx0XHQucm9vdChcImRpdlwiLCBcImlkPXJlY29yZEVsZW1lbnRcIiwgXCJjbGFzcz1jbnRyIGNudHItY29sdW1ucyBjbnRyLWdhcC1zbWFsbFwiKVxuXHRcdFx0LmJ1aWxkKCk7XG5cdH1cblxuICAgIGFzeW5jIHBvc3RDb25maWcoKSB7XG5cdFx0dGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKExpbmVQYW5lbEVudHJ5KTtcbiAgICB9XG5cblxufVxuXG5UeXBlQ29uZmlnUGFjay5pbnN0YW5jZSgpLmFkZFR5cGVDb25maWcoXCJudXR0aW4yYy11aVwiLCBQcm90b3R5cGVDb25maWcudW5uYW1lZChMaW5lUGFuZWxFbnRyeSkpOyIsImltcG9ydCB7IExvZ2dlciwgTWV0aG9kIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5pbXBvcnQgeyBJbmplY3Rpb25Qb2ludCwgUHJvdG90eXBlQ29uZmlnLCBQcm92aWRlciwgVHlwZUNvbmZpZ1BhY2sgfSBmcm9tIFwibWluZGlfdjFcIjtcbmltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRNYW5hZ2VyLCBTdGF0ZU1hbmFnZXIsIElubGluZUNvbXBvbmVudEZhY3RvcnksIENvbXBvbmVudEJ1aWxkZXIgfSBmcm9tIFwibnV0dGluMmMtY29yZV92MVwiO1xuaW1wb3J0IHsgUGFuZWwgfSBmcm9tIFwiLi4vcGFuZWwvcGFuZWwuanNcIjtcbmltcG9ydCB7IExpbmVQYW5lbEVudHJ5IH0gZnJvbSBcIi4vbGluZVBhbmVsRW50cnkvbGluZVBhbmVsRW50cnkuanNcIjtcbmltcG9ydCB7IENvbnRhaW5lckV2ZW50IH0gZnJvbSBcImNvbnRhaW5lcmJyaWRnZV92MVwiO1xuXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiTGluZVBhbmVsXCIpO1xuXG5leHBvcnQgY2xhc3MgTGluZVBhbmVsIHtcblxuXHRzdGF0aWMgRVZFTlRfUkVGUkVTSF9DTElDS0VEID0gXCJyZWZyZXNoQ2xpY2tlZFwiO1xuXHRzdGF0aWMgUkVDT1JEX0VMRU1FTlRfUkVRVUVTVEVEID0gXCJyZWNvcmRFbGVtZW50UmVxdWVzdGVkXCI7XG5cdHN0YXRpYyBSRUNPUkRTX1NUQVRFX1VQREFURV9SRVFVRVNURUQgPSBcInJlY29yZHNTdGF0ZVVwZGF0ZVJlcXVlc3RlZFwiO1xuXG5cdC8qKlxuXHQgKiBcblx0ICogQHBhcmFtIHtQYW5lbH0gYnV0dG9uUGFuZWwgXG5cdCAqL1xuXHRjb25zdHJ1Y3RvcihidXR0b25QYW5lbCA9IG51bGwpIHtcblxuXHRcdC8qKiBAdHlwZSB7SW5saW5lQ29tcG9uZW50RmFjdG9yeX0gKi9cblx0XHR0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShJbmxpbmVDb21wb25lbnRGYWN0b3J5KTtcblx0XHRcblx0XHQvKiogQHR5cGUge0NvbXBvbmVudH0gKi9cblx0XHR0aGlzLmNvbXBvbmVudCA9IG51bGw7XG5cblx0XHQvKiogQHR5cGUge0V2ZW50TWFuYWdlcn0gKi9cblx0XHR0aGlzLmV2ZW50TWFuYWdlciA9IG5ldyBFdmVudE1hbmFnZXIoKTtcblxuXHRcdC8qKiBAdHlwZSB7UHJvdmlkZXI8TGluZVBhbmVsRW50cnk+fSAqL1xuXHRcdHRoaXMubGluZVBhbmVsRW50cnlQcm92aWRlciA9IEluamVjdGlvblBvaW50LnByb3ZpZGVyKExpbmVQYW5lbEVudHJ5KTtcblxuXHRcdC8qKiBAdHlwZSB7UHJvdmlkZXI8UGFuZWw+fSAqL1xuXHRcdHRoaXMucGFuZWxQcm92aWRlciA9IEluamVjdGlvblBvaW50LnByb3ZpZGVyKFBhbmVsKTtcblxuICAgICAgICAvKiogQHR5cGUge1N0YXRlTWFuYWdlcjxhbnlbXT59ICovXG4gICAgICAgIHRoaXMuYXJyYXlTdGF0ZSA9IG5ldyBTdGF0ZU1hbmFnZXIoKTtcblxuXHRcdC8qKiBAdHlwZSB7UGFuZWx9ICovXG5cdFx0dGhpcy5idXR0b25QYW5lbCA9IGJ1dHRvblBhbmVsO1xuXG5cdH1cblxuXHQvKipcblx0ICogQHBhcmFtIHtDb21wb25lbnRCdWlsZGVyfSBjb21wb25lbnRCdWlsZGVyIFxuXHQgKiBAcmV0dXJucyB7Q29tcG9uZW50fVxuXHQgKi9cblx0c3RhdGljIGJ1aWxkQ29tcG9uZW50KGNvbXBvbmVudEJ1aWxkZXIpIHtcblx0XHRyZXR1cm4gY29tcG9uZW50QnVpbGRlclxuXHRcdFx0LnJvb3QoXCJkaXZcIiwgXCJjbGFzcz1jbnRyIGNudHItZ2FwLW1lZGl1bSBjbnRyLXJvd3MgY250ci1wcmV2ZW50LXNpemUtY2hhbmdlIHBhZGRpbmctc21hbGxcIilcblx0XHRcdC5vcGVuKClcblx0XHRcdFx0Lm5vZGUoXCJkaXZcIiwgXCJpZD1idXR0b25QYW5lbFwiKVxuXHRcdFx0XHQubm9kZShcImRpdlwiLCBcImlkPXJlY29yZEVsZW1lbnRzXCIsIFwiY2xhc3M9Y250ci1vdmVycmlkZS1ncm93LW9ubHkgY250ciBjbnRyLXJvd3MgY250ci1nYXAtc21hbGxcIilcblx0XHRcdC5jbG9zZSgpXG5cdFx0XHQuYnVpbGQoKTtcblx0fVxuXG5cdGFzeW5jIHBvc3RDb25maWcoKSB7XG5cdFx0dGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKExpbmVQYW5lbCk7XG5cblx0XHRpZiAodGhpcy5idXR0b25QYW5lbCkge1xuXHRcdFx0dGhpcy5jb21wb25lbnQuc2V0Q2hpbGQoXCJidXR0b25QYW5lbFwiLCB0aGlzLmJ1dHRvblBhbmVsLmNvbXBvbmVudCk7XG5cdFx0fVxuXG5cdFx0dGhpcy5hcnJheVN0YXRlLnJlYWN0KG5ldyBNZXRob2QodGhpcy5oYW5kbGVBcnJheVN0YXRlLCB0aGlzKSk7XG5cblx0fVxuXG5cdC8qKlxuXHQgKiBAdHlwZSB7IEV2ZW50TWFuYWdlciB9XG5cdCAqL1xuXHRnZXQgZXZlbnRzKCkgeyByZXR1cm4gdGhpcy5ldmVudE1hbmFnZXI7IH1cblxuXHQvKipcblx0ICogQHR5cGUgeyBFdmVudE1hbmFnZXIgfVxuXHQgKi9cblx0Z2V0IGV2ZW50cygpIHsgcmV0dXJuIHRoaXMuZXZlbnRNYW5hZ2VyOyB9XG5cblx0LyoqXG5cdCAqIFJlc2V0XG5cdCAqIFxuXHQgKiBAcGFyYW0ge0NvbnRhaW5lckV2ZW50fSBldmVudCBcblx0ICovXG5cdGFzeW5jIHJlc2V0KGV2ZW50KSB7XG5cdFx0dGhpcy5ldmVudHMudHJpZ2dlcihMaW5lUGFuZWwuUkVDT1JEU19TVEFURV9VUERBVEVfUkVRVUVTVEVELCBbZXZlbnQsIHRoaXMuYXJyYXlTdGF0ZV0pO1xuXHR9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBhcnJheSBcbiAgICAgKi9cbiAgICBhc3luYyBoYW5kbGVBcnJheVN0YXRlKGFycmF5KSB7XG5cdFx0dGhpcy5jb21wb25lbnQuY2xlYXJDaGlsZHJlbihcInJlY29yZEVsZW1lbnRzXCIpO1xuXHRcdGFycmF5LmZvckVhY2goYXN5bmMgKHJlY29yZCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jb21wb25lbnQuYWRkQ2hpbGQoXCJyZWNvcmRFbGVtZW50c1wiLCBhd2FpdCB0aGlzLnBvcHVsYXRlUmVjb3JkKHJlY29yZCkpO1xuICAgICAgICB9KTtcdFx0XG4gICAgfVxuXG5cdC8qKlxuICAgICAqIEBwYXJhbSB7YW55fSByZWNvcmQgXG4gICAgICovXG4gICAgYXN5bmMgcG9wdWxhdGVSZWNvcmQocmVjb3JkKSB7XG4gICAgICAgIGNvbnN0IHJlY29yZEVsZW1lbnQgPSBhd2FpdCB0aGlzLmV2ZW50TWFuYWdlci50cmlnZ2VyKExpbmVQYW5lbC5SRUNPUkRfRUxFTUVOVF9SRVFVRVNURUQsIFtudWxsLCByZWNvcmRdKTtcbiAgICAgICAgXG5cdFx0aWYgKCFyZWNvcmRFbGVtZW50KSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Y29uc3QgbGluZVBhbmVsRW50cnkgPSBhd2FpdCB0aGlzLmxpbmVQYW5lbEVudHJ5UHJvdmlkZXIuZ2V0KFt0cnVlLCByZWNvcmRdKTtcblx0XHRsaW5lUGFuZWxFbnRyeS5jb21wb25lbnQuc2V0Q2hpbGQoXCJyZWNvcmRFbGVtZW50XCIsIHJlY29yZEVsZW1lbnQuY29tcG9uZW50KTtcblxuXHRcdHJldHVybiBsaW5lUGFuZWxFbnRyeS5jb21wb25lbnQ7XG4gICAgfVxufVxuXG5UeXBlQ29uZmlnUGFjay5pbnN0YW5jZSgpLmFkZFR5cGVDb25maWcoXCJudXR0aW4yYy11aVwiLCBQcm90b3R5cGVDb25maWcudW5uYW1lZChMaW5lUGFuZWwpKTsiLCJpbXBvcnQge1xuICAgIENhbnZhc1N0eWxlcyxcbiAgICBDb21wb25lbnQsXG4gICAgQ2FudmFzUm9vdCxcbiAgICBIVE1MLFxuICAgIFN0eWxlU2VsZWN0b3JBY2Nlc3NvcixcbiAgICBTdHlsZUFjY2Vzc29yLFxuICAgIFN0eWxlc2hlZXRCdWlsZGVyLFxuICAgIFN0eWxlc2hlZXQsXG4gICAgQ29tcG9uZW50QnVpbGRlcixcbiAgICBJbmxpbmVDb21wb25lbnRGYWN0b3J5XG59IGZyb20gXCJudXR0aW4yYy1jb3JlX3YxXCI7XG5pbXBvcnQgeyBJbmplY3Rpb25Qb2ludCwgUHJvdG90eXBlQ29uZmlnLCBUeXBlQ29uZmlnUGFjayB9IGZyb20gXCJtaW5kaV92MVwiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5pbXBvcnQgeyBDb250YWluZXJFdmVudCB9IGZyb20gXCJjb250YWluZXJicmlkZ2VfdjFcIjtcbmltcG9ydCB7IENvbG9yUGFsZXR0ZSB9IGZyb20gXCIuLi9jb2xvclBhbGV0dGVcIjtcbmltcG9ydCB7IEVsZW1lbnRUaGVtZUFwcGxpY2F0b3IgfSBmcm9tIFwiLi4vY29tbW9uL2VsZW1lbnRUaGVtZUFwcGxpY2F0b3JcIjtcblxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIlBvcFVwUGFuZWxcIik7XG5cbmV4cG9ydCBjbGFzcyBQb3BVcFBhbmVsIHtcblxuICAgIHN0YXRpYyBUWVBFX1BSSU1BUlkgPSBcInBvcC11cC1wYW5lbC1idXR0b24tcHJpbWFyeVwiO1xuICAgIHN0YXRpYyBUWVBFX1NFQ09OREFSWSA9IFwicG9wLXVwLXBhbmVsLWJ1dHRvbi1zZWNvbmRhcnlcIjtcbiAgICBzdGF0aWMgVFlQRV9TVUNDRVNTID0gXCJwb3AtdXAtcGFuZWwtYnV0dG9uLXN1Y2Nlc3NcIjtcbiAgICBzdGF0aWMgVFlQRV9JTkZPID0gXCJwb3AtdXAtcGFuZWwtYnV0dG9uLWluZm9cIjtcbiAgICBzdGF0aWMgVFlQRV9XQVJOSU5HID0gXCJwb3AtdXAtcGFuZWwtYnV0dG9uLXdhcm5pbmdcIjtcbiAgICBzdGF0aWMgVFlQRV9EQU5HRVIgPSBcInBvcC11cC1wYW5lbC1idXR0b24tZGFuZ2VyXCI7XG4gICAgc3RhdGljIFRZUEVfTElHSFQgPSBcInBvcC11cC1wYW5lbC1idXR0b24tbGlnaHRcIjtcbiAgICBzdGF0aWMgVFlQRV9EQVJLID0gXCJwb3AtdXAtcGFuZWwtYnV0dG9uLWRhcmtcIjtcblxuICAgIHN0YXRpYyBTSVpFX01FRElVTSA9IFwicG9wLXVwLXBhbmVsLWJ1dHRvbi1tZWRpdW1cIjtcbiAgICBzdGF0aWMgU0laRV9MQVJHRSA9IFwicG9wLXVwLXBhbmVsLWJ1dHRvbi1sYXJnZVwiO1xuXG4gICAgc3RhdGljIE9SSUVOVEFUSU9OX0xFRlQgPSBcInBvcC11cC1wYW5lbC1sZWZ0XCI7XG4gICAgc3RhdGljIE9SSUVOVEFUSU9OX1JJR0hUID0gXCJwb3AtdXAtcGFuZWwtcmlnaHRcIjtcblxuICAgIHN0YXRpYyBDT05URU5UX1ZJU0lCTEUgPSBcInBvcC11cC1wYW5lbC1jb250ZW50LXZpc2libGVcIjtcbiAgICBzdGF0aWMgQ09OVEVOVF9ISURERU4gPSBcInBvcC11cC1wYW5lbC1jb250ZW50LWhpZGRlblwiO1xuICAgIHN0YXRpYyBDT05URU5UX0VYUEFORCA9IFwicG9wLXVwLXBhbmVsLWNvbnRlbnQtZXhwYW5kXCI7XG4gICAgc3RhdGljIENPTlRFTlRfQ09MTEFQU0UgPSBcInBvcC11cC1wYW5lbC1jb250ZW50LWNvbGxhcHNlXCI7XG4gICAgc3RhdGljIENPTlRFTlQgPSBcInBvcC11cC1wYW5lbC1jb250ZW50XCI7XG4gICAgc3RhdGljIEJVVFRPTiA9IFwicG9wLXVwLXBhbmVsLWJ1dHRvblwiO1xuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGljb25DbGFzc1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG9yaWVudGF0aW9uXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoaWNvbkNsYXNzLCB0eXBlID0gUG9wVXBQYW5lbC5UWVBFX0RBUkssIHNpemUgPSBQb3BVcFBhbmVsLlNJWkVfTUVESVVNLCBvcmllbnRhdGlvbiA9IFBvcFVwUGFuZWwuT1JJRU5UQVRJT05fTEVGVCkge1xuXG4gICAgICAgIC8qKiBAdHlwZSB7SW5saW5lQ29tcG9uZW50RmFjdG9yeX0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoSW5saW5lQ29tcG9uZW50RmFjdG9yeSk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnR9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gbnVsbDtcblxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5pY29uQ2xhc3MgPSBpY29uQ2xhc3M7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMuc2l6ZSA9IHNpemU7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMub3JpZW50YXRpb24gPSBvcmllbnRhdGlvbjtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3R5bGVzaGVldEJ1aWxkZXJ9IHN0eWxlc2hlZXRCdWlsZGVyIFxuICAgICAqIEByZXR1cm5zIHtTdHlsZXNoZWV0fVxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZFN0eWxlc2hlZXQoc3R5bGVzaGVldEJ1aWxkZXIpIHtcbiAgICAgICAgc3R5bGVzaGVldEJ1aWxkZXJcbiAgICAgICAgICAgIC5tZWRpYShcIkBtZWRpYSAocHJlZmVycy1yZWR1Y2VkLW1vdGlvbjogcmVkdWNlKVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zZWxlY3RvcihcIi5wb3AtdXAtcGFuZWwtYnV0dG9uXCIpXG4gICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2l0aW9uXCIsIFwibm9uZVwiKVxuICAgICAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucG9wLXVwLXBhbmVsLW91dGxpbmVcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIFwiaW5saW5lLWJsb2NrXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidmVydGljYWwtYWxpZ25cIiwgXCJtaWRkbGVcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5wb3AtdXAtcGFuZWwtYnV0dG9uXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWluLXdpZHRoXCIsIFwiMzVwdFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgXCJpbmxpbmUtYmxvY2tcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmb250LXdlaWdodFwiLCBcIjQwMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbG9yXCIsIFwiIzIxMjUyOVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRleHQtYWxpZ25cIiwgXCJjZW50ZXJcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ2ZXJ0aWNhbC1hbGlnblwiLCBcIm1pZGRsZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInVzZXItc2VsZWN0XCIsIFwibm9uZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIiwgXCJ0cmFuc3BhcmVudFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlclwiLCBcIjFweCBzb2xpZCB0cmFuc3BhcmVudFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmdcIiwgXCIwLjM3NXJlbSAwLjc1cmVtXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibGluZS1oZWlnaHRcIiwgXCIxLjVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItcmFkaXVzXCIsIFwiMC4yNXJlbVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zaXRpb25cIiwgXCJjb2xvciAwLjE1cyBlYXNlLWluLW91dCwgYmFja2dyb3VuZC1jb2xvciAwLjE1cyBlYXNlLWluLW91dCwgYm9yZGVyLWNvbG9yIDAuMTVzIGVhc2UtaW4tb3V0LCBib3gtc2hhZG93IDAuMTVzIGVhc2UtaW4tb3V0XCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucG9wLXVwLXBhbmVsLWJ1dHRvbi1tZWRpdW1cIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmb250LXNpemVcIiwgXCIxcmVtXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucG9wLXVwLXBhbmVsLWJ1dHRvbi1sYXJnZVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtc2l6ZVwiLCBcIjEuNXJlbVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBvcC11cC1wYW5lbC1jb250ZW50XCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWluLXdpZHRoXCIsIFwiMTUwcHRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXgtd2lkdGhcIiwgXCI0NTBwdFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmdcIiwgXCI4cHQgMTRwdFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbG9yXCIsIFwiIzMzMzMzM1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIiwgXCJ2YXIoLS1kZWZhdWx0LXBhbmVsLWNvbG9yKVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1yYWRpdXNcIiwgXCI1cHRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLCBcImFic29sdXRlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiei1pbmRleFwiLCBcIjk5OTk5OTk3XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm94LXNpemluZ1wiLCBcImJvcmRlci1ib3hcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3gtc2hhZG93XCIsIFwiMCAxcHggOHB4IHJnYmEoMCwwLDAsMC41KVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm92ZXJmbG93XCIsIFwiaGlkZGVuXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucG9wLXVwLXBhbmVsLWNvbnRlbnQucG9wLXVwLXBhbmVsLWxlZnRcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoMCUsIC0xMDAlKSB0cmFuc2xhdGUoMCUsIC00MnB0KVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBvcC11cC1wYW5lbC1jb250ZW50LnBvcC11cC1wYW5lbC1yaWdodFwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZSgtMTAwJSwgLTEwMCUpIHRyYW5zbGF0ZSgzNXB0LC00MnB0KVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBvcC11cC1wYW5lbC1jb250ZW50LXZpc2libGVcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsXCJibG9ja1wiKVxuICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5wb3AtdXAtcGFuZWwtY29udGVudC1oaWRkZW5cIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsXCJub25lXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucG9wLXVwLXBhbmVsLWFycm93XCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZ1wiLCBcIjEwcHggMjBweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbG9yXCIsIFwiIzMzMzMzM1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtd2VpZ2h0XCIsIFwibm9ybWFsXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIiwgXCJhYnNvbHV0ZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInotaW5kZXhcIiwgXCI5OTk5OTk5NlwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJveC1zaXppbmdcIiwgXCJib3JkZXItYm94XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLCBcIm5vbmVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoMCUsIC0xMDAlKSB0cmFuc2xhdGUoMCUsLTM4cHQpXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucG9wLXVwLXBhbmVsLWFycm93IGlcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLCBcImFic29sdXRlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luLWxlZnRcIiwgXCItMTVweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIndpZHRoXCIsIFwiNDBweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImhlaWdodFwiLCBcIjQwcHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJvdmVyZmxvd1wiLCBcImhpZGRlblwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRvcFwiLCBcIi0yMCVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJsZWZ0XCIsIFwiMzAlXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucG9wLXVwLXBhbmVsLWFycm93IGk6OmFmdGVyXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29udGVudFwiLCBcIicnXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIiwgXCJhYnNvbHV0ZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIndpZHRoXCIsIFwiMTZweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImhlaWdodFwiLCBcIjE2cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwidmFyKC0tZGVmYXVsdC1wYW5lbC1jb2xvcilcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3gtc2hhZG93XCIsIFwiMCAxcHggOHB4IHJnYmEoMCwwLDAsMC41KVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImxlZnRcIiwgXCIzMCVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoNTAlLDUwJSkgcm90YXRlKDQ1ZGVnKVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBvcC11cC1wYW5lbC1idXR0b246aG92ZXJcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjb2xvclwiLCBcIiMyMTI1MjlcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0ZXh0LWRlY29yYXRpb25cIiwgXCJub25lXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucG9wLXVwLXBhbmVsLWJ1dHRvbjpmb2N1cywgLnBvcC11cC1wYW5lbC1idXR0b24uZm9jdXNcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJvdXRsaW5lXCIsIFwiMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJveC1zaGFkb3dcIiwgXCIwIDAgMCAwLjJyZW0gcmdiYSgwLCAxMjMsIDI1NSwgMC4yNSlcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5wb3AtdXAtcGFuZWwtYnV0dG9uLmRpc2FibGVkLCAucG9wLXVwLXBhbmVsLWJ1dHRvbjpkaXNhYmxlZFwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwLjY1XCIpXG4gICAgICAgICAgICAuY2xvc2UoKTtcblxuICAgICAgICBFbGVtZW50VGhlbWVBcHBsaWNhdG9yLmFwcGx5KHN0eWxlc2hlZXRCdWlsZGVyLCBcInBvcC11cC1wYW5lbC1idXR0b25cIiwgXCJwcmltYXJ5XCIsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuUFJJTUFSWV9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuUFJJTUFSWV9IT1ZFUl9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuUFJJTUFSWV9ESVNBQkxFRF9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuUFJJTUFSWV9BQ1RJVkVfQ09MT1JTLFxuICAgICAgICAgICAgXCIwIDAgMCAwLjJyZW0gcmdiYSgxMzAsIDEzOCwgMTQ1LCAwLjUpXCIsIC8vIGJveFNoYWRvd0ZvY3VzXG4gICAgICAgICAgICBcIjAgMCAwIDAuMnJlbSByZ2JhKDEzMCwgMTM4LCAxNDUsIDAuNSlcIik7IC8vIGJveFNoYWRvd0FjdGl2ZUZvY3VzXG5cblxuICAgICAgICBFbGVtZW50VGhlbWVBcHBsaWNhdG9yLmFwcGx5KHN0eWxlc2hlZXRCdWlsZGVyLCBcInBvcC11cC1wYW5lbC1idXR0b25cIiwgXCJzZWNvbmRhcnlcIixcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5TRUNPTkRBUllfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLlNFQ09OREFSWV9IT1ZFUl9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuU0VDT05EQVJZX0RJU0FCTEVEX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5TRUNPTkRBUllfQUNUSVZFX0NPTE9SUyxcbiAgICAgICAgICAgIFwiMCAwIDAgMC4ycmVtIHJnYmEoMTMwLCAxMzgsIDE0NSwgMC41KVwiLCAvLyBib3hTaGFkb3dGb2N1c1xuICAgICAgICAgICAgXCIwIDAgMCAwLjJyZW0gcmdiYSgxMzAsIDEzOCwgMTQ1LCAwLjUpXCIpOyAvLyBib3hTaGFkb3dBY3RpdmVGb2N1c1xuICAgICAgICBcbiAgICAgICAgRWxlbWVudFRoZW1lQXBwbGljYXRvci5hcHBseShzdHlsZXNoZWV0QnVpbGRlciwgXCJwb3AtdXAtcGFuZWwtYnV0dG9uXCIsIFwic3VjY2Vzc1wiLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLlNVQ0NFU1NfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLlNVQ0NFU1NfSE9WRVJfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLlNVQ0NFU1NfRElTQUJMRURfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLlNVQ0NFU1NfQUNUSVZFX0NPTE9SUyxcbiAgICAgICAgICAgIFwiMCAwIDAgMC4ycmVtIHJnYmEoNzIsIDE4MCwgOTcsIDAuNSlcIiwgLy8gYm94U2hhZG93Rm9jdXNcbiAgICAgICAgICAgIFwiMCAwIDAgMC4ycmVtIHJnYmEoNzIsIDE4MCwgOTcsIDAuNSlcIik7IC8vIGJveFNoYWRvd0FjdGl2ZUZvY3VzXG5cbiAgICAgICAgRWxlbWVudFRoZW1lQXBwbGljYXRvci5hcHBseShzdHlsZXNoZWV0QnVpbGRlciwgXCJwb3AtdXAtcGFuZWwtYnV0dG9uXCIsIFwiaW5mb1wiLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLklORk9fQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLklORk9fSE9WRVJfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLklORk9fRElTQUJMRURfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLklORk9fQUNUSVZFX0NPTE9SUyxcbiAgICAgICAgICAgIFwiMCAwIDAgMC4ycmVtIHJnYmEoNTgsIDE3NiwgMTk1LCAwLjUpXCIsIC8vIGJveFNoYWRvd0ZvY3VzXG4gICAgICAgICAgICBcIjAgMCAwIDAuMnJlbSByZ2JhKDU4LCAxNzYsIDE5NSwgMC41KVwiKTsgLy8gYm94U2hhZG93QWN0aXZlRm9jdXNcblxuICAgICAgICBFbGVtZW50VGhlbWVBcHBsaWNhdG9yLmFwcGx5KHN0eWxlc2hlZXRCdWlsZGVyLCBcInBvcC11cC1wYW5lbC1idXR0b25cIiwgXCJ3YXJuaW5nXCIsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuV0FSTklOR19DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuV0FSTklOR19IT1ZFUl9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuV0FSTklOR19ESVNBQkxFRF9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuV0FSTklOR19BQ1RJVkVfQ09MT1JTLFxuICAgICAgICAgICAgXCIwIDAgMCAwLjJyZW0gcmdiYSgyMjIsIDE3MCwgMTIsIDAuNSlcIiwgLy8gYm94U2hhZG93Rm9jdXNcbiAgICAgICAgICAgIFwiMCAwIDAgMC4ycmVtIHJnYmEoMjIyLCAxNzAsIDEyLCAwLjUpXCIpOyAvLyBib3hTaGFkb3dBY3RpdmVGb2N1c1xuXG4gICAgICAgIEVsZW1lbnRUaGVtZUFwcGxpY2F0b3IuYXBwbHkoc3R5bGVzaGVldEJ1aWxkZXIsIFwicG9wLXVwLXBhbmVsLWJ1dHRvblwiLCBcImRhbmdlclwiLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLkRBTkdFUl9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuREFOR0VSX0hPVkVSX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5EQU5HRVJfRElTQUJMRURfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLkRBTkdFUl9BQ1RJVkVfQ09MT1JTLFxuICAgICAgICAgICAgXCIwIDAgMCAwLjJyZW0gcmdiYSgyMjUsIDgzLCA5NywgMC41KVwiLCAvLyBib3hTaGFkb3dGb2N1c1xuICAgICAgICAgICAgXCIwIDAgMCAwLjJyZW0gcmdiYSgyMjUsIDgzLCA5NywgMC41KVwiKTsgLy8gYm94U2hhZG93QWN0aXZlRm9jdXNcblxuICAgICAgICBFbGVtZW50VGhlbWVBcHBsaWNhdG9yLmFwcGx5KHN0eWxlc2hlZXRCdWlsZGVyLCBcInBvcC11cC1wYW5lbC1idXR0b25cIiwgXCJsaWdodFwiLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLkxJR0hUX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5MSUdIVF9IT1ZFUl9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuTElHSFRfRElTQUJMRURfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLkxJR0hUX0FDVElWRV9DT0xPUlMsXG4gICAgICAgICAgICBcIjAgMCAwIDAuMnJlbSByZ2JhKDIxNiwgMjE3LCAyMTksIDAuNSlcIiwgLy8gYm94U2hhZG93Rm9jdXNcbiAgICAgICAgICAgIFwiMCAwIDAgMC4ycmVtIHJnYmEoMjE2LCAyMTcsIDIxOSwgMC41KVwiKTsgLy8gYm94U2hhZG93QWN0aXZlRm9jdXNcblxuICAgICAgICBFbGVtZW50VGhlbWVBcHBsaWNhdG9yLmFwcGx5KHN0eWxlc2hlZXRCdWlsZGVyLCBcInBvcC11cC1wYW5lbC1idXR0b25cIiwgXCJkYXJrXCIsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuREFSS19DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuREFSS19IT1ZFUl9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuREFSS19ESVNBQkxFRF9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuREFSS19BQ1RJVkVfQ09MT1JTLFxuICAgICAgICAgICAgXCIwIDAgMCAwLjJyZW0gcmdiYSg4MiwgODgsIDkzLCAwLjUpXCIsIC8vIGJveFNoYWRvd0ZvY3VzXG4gICAgICAgICAgICBcIjAgMCAwIDAuMnJlbSByZ2JhKDgyLCA4OCwgOTMsIDAuNSlcIik7IC8vIGJveFNoYWRvd0FjdGl2ZUZvY3VzXG5cbiAgICAgICAgcmV0dXJuIHN0eWxlc2hlZXRCdWlsZGVyLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDb21wb25lbnRCdWlsZGVyfSBjb21wb25lbnRCdWlsZGVyIFxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZENvbXBvbmVudChjb21wb25lbnRCdWlsZGVyKSB7XG4gICAgICAgIHJldHVybiBjb21wb25lbnRCdWlsZGVyXG4gICAgICAgICAgICAucm9vdChcImRpdlwiLCBcImlkPXBvcFVwUGFuZWxSb290XCIsIFwiY2xhc3M9cG9wLXVwLXBhbmVsLW91dGxpbmVcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAubm9kZShcImJ1dHRvblwiLCBcImlkPWJ1dHRvblwiLCBcImNsYXNzPXBvcC11cC1wYW5lbC1idXR0b25cIilcbiAgICAgICAgICAgICAgICAubm9kZShcImRpdlwiLCBcImlkPWFycm93XCIsIFwiY2xhc3M9cG9wLXVwLXBhbmVsLWFycm93XCIpXG4gICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAubm9kZShcImlcIilcbiAgICAgICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwiZGl2XCIsIFwiaWQ9Y29udGVudFwiLCBcImNsYXNzPXBvcC11cC1wYW5lbC1jb250ZW50XCIsIFwidGFiaW5kZXg9MFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgIC5idWlsZCgpO1xuICAgIH1cblxuICAgIHBvc3RDb25maWcoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZShQb3BVcFBhbmVsKTtcbiAgICAgICAgQ2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKFBvcFVwUGFuZWwubmFtZSk7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJ1dHRvblwiKS5zZXRDaGlsZChIVE1MLmkoXCJcIiwgdGhpcy5pY29uQ2xhc3MpKTtcblxuICAgICAgICBTdHlsZVNlbGVjdG9yQWNjZXNzb3IuZnJvbSh0aGlzLmNvbXBvbmVudC5nZXQoXCJidXR0b25cIikpXG4gICAgICAgICAgICAuZW5hYmxlKFBvcFVwUGFuZWwuQlVUVE9OKVxuICAgICAgICAgICAgLmVuYWJsZSh0aGlzLnR5cGUpO1xuXG4gICAgICAgIFN0eWxlU2VsZWN0b3JBY2Nlc3Nvci5mcm9tKHRoaXMuY29tcG9uZW50LmdldChcImNvbnRlbnRcIikpXG4gICAgICAgICAgICAuZW5hYmxlKFBvcFVwUGFuZWwuQ09OVEVOVClcbiAgICAgICAgICAgIC5kaXNhYmxlKFBvcFVwUGFuZWwuQ09OVEVOVF9WSVNJQkxFKVxuICAgICAgICAgICAgLmVuYWJsZShQb3BVcFBhbmVsLkNPTlRFTlRfSElEREVOKVxuICAgICAgICAgICAgLmVuYWJsZSh0aGlzLnNpemUpXG4gICAgICAgICAgICAuZW5hYmxlKHRoaXMub3JpZW50YXRpb24pO1xuXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJ1dHRvblwiKS5saXN0ZW5UbyhcImNsaWNrXCIsIHRoaXMuY2xpY2tlZCwgdGhpcyk7XG4gICAgICAgIENhbnZhc1Jvb3QubGlzdGVuVG9Gb2N1c0VzY2FwZSh0aGlzLmNvbXBvbmVudC5nZXQoXCJwb3BVcFBhbmVsUm9vdFwiKSwgdGhpcy5oaWRlLCB0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudH0gcG9wVXBQYW5lbENvbnRlbnQgXG4gICAgICovXG4gICAgc2V0UGFuZWxDb250ZW50KHBvcFVwUGFuZWxDb250ZW50KSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImNvbnRlbnRcIikuc2V0Q2hpbGQocG9wVXBQYW5lbENvbnRlbnQuY29tcG9uZW50KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDb250YWluZXJFdmVudH0gZXZlbnQgXG4gICAgICovXG4gICAgY2xpY2tlZChldmVudCkge1xuICAgICAgICB0aGlzLnRvZ2dsZUNvbnRlbnQoKTtcbiAgICB9XG5cbiAgICB0b2dnbGVDb250ZW50KCkge1xuICAgICAgICBpZiAoIVN0eWxlQWNjZXNzb3IuZnJvbSh0aGlzLmNvbXBvbmVudC5nZXQoXCJhcnJvd1wiKSkuaXMoXCJkaXNwbGF5XCIsXCJibG9ja1wiKSkge1xuICAgICAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNob3coKSB7XG4gICAgICAgIFN0eWxlU2VsZWN0b3JBY2Nlc3Nvci5mcm9tKHRoaXMuY29tcG9uZW50LmdldChcImNvbnRlbnRcIikpXG4gICAgICAgICAgICAuZGlzYWJsZShQb3BVcFBhbmVsLkNPTlRFTlRfSElEREVOKVxuICAgICAgICAgICAgLmVuYWJsZShQb3BVcFBhbmVsLkNPTlRFTlRfVklTSUJMRSk7XG4gICAgICAgIFN0eWxlQWNjZXNzb3IuZnJvbSh0aGlzLmNvbXBvbmVudC5nZXQoXCJhcnJvd1wiKSlcbiAgICAgICAgICAgIC5zZXQoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIik7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImNvbnRlbnRcIikuY29udGFpbmVyRWxlbWVudC5mb2N1cygpO1xuICAgIH1cblxuICAgIGhpZGUoKSB7XG4gICAgICAgIFN0eWxlU2VsZWN0b3JBY2Nlc3Nvci5mcm9tKHRoaXMuY29tcG9uZW50LmdldChcImNvbnRlbnRcIikpXG4gICAgICAgICAgICAuZGlzYWJsZShQb3BVcFBhbmVsLkNPTlRFTlRfVklTSUJMRSlcbiAgICAgICAgICAgIC5lbmFibGUoUG9wVXBQYW5lbC5DT05URU5UX0hJRERFTik7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImFycm93XCIpLnNldFN0eWxlKFwiZGlzcGxheVwiLCBcIm5vbmVcIik7XG4gICAgfVxuXG4gICAgZGlzYWJsZSgpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYnV0dG9uXCIpLnNldEF0dHJpYnV0ZVZhbHVlKFwiZGlzYWJsZWRcIiwgXCJ0cnVlXCIpO1xuICAgIH1cblxuICAgIGVuYWJsZSgpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYnV0dG9uXCIpLnJlbW92ZUF0dHJpYnV0ZShcImRpc2FibGVkXCIpO1xuICAgIH1cbn1cblxuVHlwZUNvbmZpZ1BhY2suaW5zdGFuY2UoKS5hZGRUeXBlQ29uZmlnKFwibnV0dGluMmMtdWlcIiwgUHJvdG90eXBlQ29uZmlnLnVubmFtZWQoUG9wVXBQYW5lbCkpOyIsImltcG9ydCB7IFRpbWVQcm9taXNlIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5pbXBvcnQgeyBCYXNlRWxlbWVudCxcbiAgICBDYW52YXNTdHlsZXMsXG4gICAgQ29tcG9uZW50LFxuICAgIFN0eWxlU2VsZWN0b3JBY2Nlc3NvcixcbiAgICBTdHlsZXNoZWV0QnVpbGRlcixcbiAgICBDb21wb25lbnRCdWlsZGVyLFxuICAgIFN0eWxlc2hlZXQsXG4gICAgSW5saW5lQ29tcG9uZW50RmFjdG9yeSxcbiAgICBDc3MzU3R5bGVzaGVldEJ1aWxkZXJcbn0gZnJvbSBcIm51dHRpbjJjLWNvcmVfdjFcIjtcbmltcG9ydCB7IEluamVjdGlvblBvaW50LCBQcm90b3R5cGVDb25maWcsIFR5cGVDb25maWdQYWNrIH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5cbmV4cG9ydCBjbGFzcyBTbGlkZURlY2tFbnRyeSB7XG5cbiAgICBzdGF0aWMgREVGQVVMVF9DTEFTUyA9IFwic2xpZGUtZGVjay1lbnRyeVwiO1xuXG4gICAgc3RhdGljIEVOVFJZX1BPU0lUSU9OX0ZST05UID0gXCJwb3NpdGlvbi1mcm9udFwiO1xuICAgIHN0YXRpYyBFTlRSWV9QT1NJVElPTl9CRUhJTkQgPSBcInBvc2l0aW9uLWJlaGluZFwiO1xuICAgIHN0YXRpYyBFTlRSWV9QT1NJVElPTl9SSUdIVCA9IFwicG9zaXRpb24tcmlnaHRcIjtcblxuICAgIHN0YXRpYyBDT05URU5UX0VYSVNUQU5DRV9QUkVTRU5UID0gXCJleGlzdGFuY2UtcHJlc2VudFwiO1xuICAgIHN0YXRpYyBDT05URU5UX0VYSVNUQU5DRV9SRU1PVkVEID0gXCJleGlzdGFuY2UtcmVtb3ZlZFwiO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIC8qKiBAdHlwZSB7SW5saW5lQ29tcG9uZW50RmFjdG9yeX0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoSW5saW5lQ29tcG9uZW50RmFjdG9yeSk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnR9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gbnVsbDtcblxuICAgICAgICAvKiogQHR5cGUge051bWJlcn0gKi9cbiAgICAgICAgdGhpcy5pbmRleCA9IDA7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtTdHJpbmd9ICovXG4gICAgICAgIHRoaXMucG9zaXRpb24gPSBTbGlkZURlY2tFbnRyeS5FTlRSWV9QT1NJVElPTl9GUk9OVDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7U3R5bGVzaGVldH1cbiAgICAgKiBAcGFyYW0ge1N0eWxlc2hlZXRCdWlsZGVyfSBzdHlsZXNoZWV0QnVpbGRlciBcbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRTdHlsZXNoZWV0KHN0eWxlc2hlZXRCdWlsZGVyKSB7XG4gICAgICAgIHJldHVybiBDc3MzU3R5bGVzaGVldEJ1aWxkZXIuY3JlYXRlKHN0eWxlc2hlZXRCdWlsZGVyKVxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnNsaWRlLWRlY2stZW50cnlcIilcbiAgICAgICAgICAgICAgICAucG9zaXRpb24oXCJyZWxhdGl2ZVwiKVxuICAgICAgICAgICAgICAgIC5iYWNrZ3JvdW5kQ29sb3IoXCJ2YXIoLS1kZWZhdWx0LXBhbmVsLWNvbG9yKVwiKVxuICAgICAgICAgICAgICAgIC5ncmlkQ29sdW1uKFwiMVwiKVxuICAgICAgICAgICAgICAgIC5ncmlkUm93KFwiMVwiKVxuICAgICAgICAgICAgICAgIC53aWR0aChcIjEwMCVcIilcbiAgICAgICAgICAgICAgICAuaGVpZ2h0KFwiMTAwJVwiKVxuICAgICAgICAgICAgICAgIC5taW5IZWlnaHQoXCIwXCIpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5zbGlkZS1kZWNrLWVudHJ5LnBvc2l0aW9uLWZyb250XCIpXG4gICAgICAgICAgICAgICAgLnRyYW5zZm9ybShcInRyYW5zbGF0ZSgwJSwgMCUpXCIpXG4gICAgICAgICAgICAgICAgLnRyYW5zaXRpb24oW1widHJhbnNmb3JtXCIsIFwiLjZzXCJdKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuc2xpZGUtZGVjay1lbnRyeS5wb3NpdGlvbi1iZWhpbmRcIilcbiAgICAgICAgICAgICAgICAudHJhbnNmb3JtKFwidHJhbnNsYXRlKDAlLCAwJSlcIilcbiAgICAgICAgICAgICAgICAudHJhbnNpdGlvbihbXCJ0cmFuc2Zvcm1cIiwgXCIuNnNcIl0pXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5zbGlkZS1kZWNrLWVudHJ5LnBvc2l0aW9uLXJpZ2h0XCIpXG4gICAgICAgICAgICAgICAgLnRyYW5zZm9ybShcInRyYW5zbGF0ZSgrMTA1JSwgMCUpXCIpXG4gICAgICAgICAgICAgICAgLnRyYW5zaXRpb24oW1widHJhbnNmb3JtXCIsIFwiLjZzXCJdKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuc2xpZGUtZGVjay1lbnRyeS1jb250ZW50LmV4aXN0YW5jZS1yZW1vdmVkXCIpXG4gICAgICAgICAgICAgICAgLmRpc3BsYXkoXCJub25lXCIpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5zbGlkZS1kZWNrLWVudHJ5LWNvbnRlbnQuZXhpc3RhbmNlLXByZXNlbnRcIilcbiAgICAgICAgICAgICAgICAucG9zaXRpb24oXCJyZWxhdGl2ZVwiKVxuICAgICAgICAgICAgICAgIC5oZWlnaHQoXCIxMDAlXCIpXG5cbiAgICAgICAgICAgIC5idWlsZCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHtDb21wb25lbnR9XG4gICAgICogQHBhcmFtIHtDb21wb25lbnRCdWlsZGVyfSBjb21wb25lbnRCdWlsZGVyIFxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZENvbXBvbmVudChjb21wb25lbnRCdWlsZGVyKSB7XG4gICAgICAgIHJldHVybiBjb21wb25lbnRCdWlsZGVyXG4gICAgICAgICAgICAucm9vdChcImRpdlwiLCBcImlkPXNsaWRlRGVja0VudHJ5XCIsIFwiY2xhc3M9c2xpZGUtZGVjay1lbnRyeVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwiZGl2XCIsIFwiaWQ9c2xpZGVEZWNrRW50cnlDb250ZW50XCIsIFwiY2xhc3M9c2xpZGUtZGVjay1lbnRyeS1jb250ZW50XCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge0Jhc2VFbGVtZW50fVxuICAgICAqL1xuICAgIGdldCBjb250ZW50RWxlbWVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tcG9uZW50LmdldChcInNsaWRlRGVja0VudHJ5Q29udGVudFwiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7QmFzZUVsZW1lbnR9XG4gICAgICovXG4gICAgZ2V0IGVudHJ5RWxlbWVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tcG9uZW50LmdldChcInNsaWRlRGVja0VudHJ5XCIpO1xuICAgIH1cblxuICAgIGFzeW5jIHBvc3RDb25maWcoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZShTbGlkZURlY2tFbnRyeSk7XG4gICAgICAgIENhbnZhc1N0eWxlcy5lbmFibGVTdHlsZShTbGlkZURlY2tFbnRyeS5uYW1lKTtcbiAgICB9XG5cbiAgICBzZXRJbmRleChpbmRleCkge1xuICAgICAgICB0aGlzLmluZGV4ID0gaW5kZXg7XG4gICAgfVxuXG4gICAgc2V0Q29udGVudChjb21wb25lbnQpIHtcbiAgICAgICAgdGhpcy5jb250ZW50RWxlbWVudC5zZXRDaGlsZChjb21wb25lbnQpO1xuICAgIH1cblxuICAgIHNob3coKSB7XG4gICAgICAgIHRoaXMuc2V0Q29udGVudFZpc2liaWxpdHkoU2xpZGVEZWNrRW50cnkuQ09OVEVOVF9FWElTVEFOQ0VfUFJFU0VOVCk7XG4gICAgICAgIHRoaXMuc2V0U2hpZnQoU2xpZGVEZWNrRW50cnkuRU5UUllfUE9TSVRJT05fRlJPTlQpO1xuICAgIH1cblxuICAgIGhpZGUobmV4dEluZGV4KSB7XG4gICAgICAgIGlmIChuZXh0SW5kZXggPiB0aGlzLmluZGV4KSB7XG4gICAgICAgICAgICB0aGlzLnNldFNoaWZ0KFNsaWRlRGVja0VudHJ5LkVOVFJZX1BPU0lUSU9OX0JFSElORCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNldFNoaWZ0KFNsaWRlRGVja0VudHJ5LkVOVFJZX1BPU0lUSU9OX1JJR0hUKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmFkanVzdFdoZW5IaWRkZW4oKTtcbiAgICB9XG5cbiAgICBhZGp1c3RXaGVuSGlkZGVuKCkge1xuICAgICAgICBUaW1lUHJvbWlzZS5hc1Byb21pc2UoNjAwLCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5wb3NpdGlvbiA9PT0gU2xpZGVEZWNrRW50cnkuRU5UUllfUE9TSVRJT05fRlJPTlQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNldENvbnRlbnRWaXNpYmlsaXR5KFNsaWRlRGVja0VudHJ5LkNPTlRFTlRfRVhJU1RBTkNFX1JFTU9WRUQpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzZXRDb250ZW50VmlzaWJpbGl0eShjb250ZW50VmlzaWJpbGl0eSkge1xuICAgICAgICBTdHlsZVNlbGVjdG9yQWNjZXNzb3IuZnJvbSh0aGlzLmNvbnRlbnRFbGVtZW50KS5yZXBsYWNlKFwiZXhpc3RhbmNlLVwiLCBjb250ZW50VmlzaWJpbGl0eSk7XG4gICAgfVxuXG4gICAgc2V0U2hpZnQocG9zaXRpb24pIHtcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uO1xuICAgICAgICBTdHlsZVNlbGVjdG9yQWNjZXNzb3IuZnJvbSh0aGlzLmVudHJ5RWxlbWVudCkucmVwbGFjZShcInBvc2l0aW9uLVwiLCBwb3NpdGlvbik7XG4gICAgfVxuXG59XG5cblR5cGVDb25maWdQYWNrLmluc3RhbmNlKCkuYWRkVHlwZUNvbmZpZyhcIm51dHRpbjJjLXVpXCIsIFByb3RvdHlwZUNvbmZpZy51bm5hbWVkKFNsaWRlRGVja0VudHJ5KSk7IiwiaW1wb3J0IHsgTGlzdCwgTWFwIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5pbXBvcnQgeyBDYW52YXNTdHlsZXMsXG4gICAgQ29tcG9uZW50LFxuICAgIEV2ZW50TWFuYWdlcixcbiAgICBTdHlsZXNoZWV0QnVpbGRlcixcbiAgICBJbmxpbmVDb21wb25lbnRGYWN0b3J5LFxuICAgIENzczNTdHlsZXNoZWV0QnVpbGRlclxufSBmcm9tIFwibnV0dGluMmMtY29yZV92MVwiO1xuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQsIFByb3RvdHlwZUNvbmZpZywgUHJvdmlkZXIsIFR5cGVDb25maWdQYWNrIH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5pbXBvcnQgeyBTbGlkZURlY2tFbnRyeSB9IGZyb20gXCIuL3NsaWRlRGVja0VudHJ5L3NsaWRlRGVja0VudHJ5LmpzXCI7XG5cbmV4cG9ydCBjbGFzcyBTbGlkZURlY2sge1xuXG4gICAgc3RhdGljIEVWRU5UX0VOVFJZX0NIQU5HRUQgPSBcImV2ZW50RW50cnlDaGFuZ2VkXCI7XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge01hcDxDb21wb25lbnQ+fSBjb21wb25lbnRNYXAgXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY29tcG9uZW50TWFwKSB7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtJbmxpbmVDb21wb25lbnRGYWN0b3J5fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShJbmxpbmVDb21wb25lbnRGYWN0b3J5KTtcblxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudH0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSBudWxsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7TWFwPENvbXBvbmVudD59ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50TWFwID0gY29tcG9uZW50TWFwO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7UHJvdmlkZXI8U2xpZGVEZWNrRW50cnk+fSAqL1xuICAgICAgICB0aGlzLnNsaWRlRGVja0VudHJ5UHJvdmlkZXIgPSBJbmplY3Rpb25Qb2ludC5wcm92aWRlcihTbGlkZURlY2tFbnRyeSk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtMaXN0PFNsaWRlRGVja0VudHJ5Pn0gKi9cbiAgICAgICAgdGhpcy5zbGlkZURlY2tFbnRyeUxpc3QgPSBuZXcgTGlzdCgpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7TWFwPFNsaWRlRGVja0VudHJ5Pn0gKi9cbiAgICAgICAgdGhpcy5zbGlkZURlY2tFbnRyeU1hcCA9IG5ldyBNYXAoKTtcblxuICAgICAgICAvKiogQHR5cGUge01hcDxOdW1iZXI+fSAqL1xuICAgICAgICB0aGlzLnNsaWRlRGVja0VudHJ5SW5kZXhNYXAgPSBuZXcgTWFwKCk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtTbGlkZURlY2tFbnRyeX0gKi9cbiAgICAgICAgdGhpcy5jdXJyZW50RW50cnkgPSBudWxsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7RXZlbnRNYW5hZ2VyfSAqL1xuICAgICAgICB0aGlzLmV2ZW50cyA9IG5ldyBFdmVudE1hbmFnZXIoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0eWxlc2hlZXRCdWlsZGVyfSBzdHlsZXNoZWV0QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyBcbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRTdHlsZXNoZWV0KHN0eWxlc2hlZXRCdWlsZGVyKSB7XG4gICAgICAgIHJldHVybiBDc3MzU3R5bGVzaGVldEJ1aWxkZXIuY3JlYXRlKHN0eWxlc2hlZXRCdWlsZGVyKVxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnNsaWRlLWRlY2tcIilcbiAgICAgICAgICAgICAgICAucG9zaXRpb24oXCJyZWxhdGl2ZVwiKVxuICAgICAgICAgICAgICAgIC5iYWNrZ3JvdW5kQ29sb3IoXCIjZjFmMWYxXCIpXG4gICAgICAgICAgICAgICAgLmRpc3BsYXkoXCJncmlkXCIpXG4gICAgICAgICAgICAgICAgLmhlaWdodChcIjEwMCVcIilcblxuICAgICAgICAgICAgLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGJ1aWxkQ29tcG9uZW50KGNvbXBvbmVudEJ1aWxkZXIpIHtcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudEJ1aWxkZXJcbiAgICAgICAgICAgIC5yb290KFwiZGl2XCIsIFwiaWQ9c2xpZGVEZWNrRW50cmllc1wiLCBcImNsYXNzPXNsaWRlLWRlY2tcIilcbiAgICAgICAgICAgIC5idWlsZCgpO1xuICAgIH1cblxuICAgIGFzeW5jIHBvc3RDb25maWcoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZShTbGlkZURlY2spO1xuICAgICAgICBDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUoU2xpZGVEZWNrLm5hbWUpO1xuXG4gICAgICAgIGlmICh0aGlzLmNvbXBvbmVudE1hcCkge1xuICAgICAgICAgICAgdGhpcy5wcmVwYXJlRW50cmllcygpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zY3JvbGxiYWNrID0gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwic2xpZGVEZWNrRW50cmllc1wiKS5lbGVtZW50LnBhcmVudEVsZW1lbnQuc2Nyb2xsVG8oMCwwKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBwcmVwYXJlRW50cmllcygpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnRNYXAuZm9yRWFjaChhc3luYyAoa2V5LCBjb21wb25lbnQpID0+IHtcblxuICAgICAgICAgICAgY29uc3Qgc2xpZGVEZWNrRW50cnkgPSBhd2FpdCB0aGlzLnNsaWRlRGVja0VudHJ5UHJvdmlkZXIuZ2V0KCk7XG5cbiAgICAgICAgICAgIGlmIChudWxsID09IHRoaXMuY3VycmVudEVudHJ5KSB7XG4gICAgICAgICAgICAgICAgc2xpZGVEZWNrRW50cnkuc2hvdygpO1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEVudHJ5ID0gc2xpZGVEZWNrRW50cnk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNsaWRlRGVja0VudHJ5LmhpZGUoMCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuc2xpZGVEZWNrRW50cnlNYXAuc2V0KGtleSwgc2xpZGVEZWNrRW50cnkpO1xuICAgICAgICAgICAgdGhpcy5zbGlkZURlY2tFbnRyeUxpc3QuYWRkKHNsaWRlRGVja0VudHJ5KTtcbiAgICAgICAgICAgIHRoaXMuc2xpZGVEZWNrRW50cnlJbmRleE1hcC5zZXQoa2V5LCB0aGlzLnNsaWRlRGVja0VudHJ5TGlzdC5zaXplKCkgLTEpO1xuXG4gICAgICAgICAgICBzbGlkZURlY2tFbnRyeS5zZXRDb250ZW50KGNvbXBvbmVudCk7XG4gICAgICAgICAgICBzbGlkZURlY2tFbnRyeS5zZXRJbmRleCh0aGlzLnNsaWRlRGVja0VudHJ5TGlzdC5zaXplKCkgLSAxKTtcblxuICAgICAgICAgICAgdGhpcy5jb21wb25lbnQuYWRkQ2hpbGQoXCJzbGlkZURlY2tFbnRyaWVzXCIsIHNsaWRlRGVja0VudHJ5LmNvbXBvbmVudCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSwgdGhpcyk7XG4gICAgfVxuXG4gICAgc2xpZGVOZXh0KCkge1xuICAgICAgICBpZiAodGhpcy5jdXJyZW50RW50cnkuaW5kZXggKyAxID49IHRoaXMuc2xpZGVEZWNrRW50cnlMaXN0LnNpemUoKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG5leHRFbnRyeSA9IHRoaXMuc2xpZGVEZWNrRW50cnlMaXN0LmdldCh0aGlzLmN1cnJlbnRFbnRyeS5pbmRleCArIDEpO1xuICAgICAgICB0aGlzLmN1cnJlbnRFbnRyeS5oaWRlKG5leHRFbnRyeS5pbmRleCk7XG4gICAgICAgIHRoaXMuY3VycmVudEVudHJ5ID0gbmV4dEVudHJ5O1xuICAgICAgICB0aGlzLmN1cnJlbnRFbnRyeS5zaG93KCk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmV2ZW50cy50cmlnZ2VyKFNsaWRlRGVjay5FVkVOVF9FTlRSWV9DSEFOR0VEKTtcbiAgICB9XG5cbiAgICBzbGlkZVByZXZpb3VzKCkge1xuICAgICAgICBpZiAodGhpcy5jdXJyZW50RW50cnkuaW5kZXggPD0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG5leHRFbnRyeSA9IHRoaXMuc2xpZGVEZWNrRW50cnlMaXN0LmdldCh0aGlzLmN1cnJlbnRFbnRyeS5pbmRleCAtIDEpO1xuICAgICAgICB0aGlzLmN1cnJlbnRFbnRyeS5oaWRlKG5leHRFbnRyeS5pbmRleCk7XG4gICAgICAgIHRoaXMuY3VycmVudEVudHJ5ID0gbmV4dEVudHJ5O1xuICAgICAgICB0aGlzLmN1cnJlbnRFbnRyeS5zaG93KCk7XG5cbiAgICAgICAgdGhpcy5ldmVudHMudHJpZ2dlcihTbGlkZURlY2suRVZFTlRfRU5UUllfQ0hBTkdFRCk7XG4gICAgfVxuXG4gICAgc2xpZGVUbyhuYW1lKSB7XG4gICAgICAgIGNvbnN0IG5leHRFbnRyeSA9IHRoaXMuc2xpZGVEZWNrRW50cnlNYXAuZ2V0KG5hbWUpO1xuICAgICAgICB0aGlzLmN1cnJlbnRFbnRyeS5oaWRlKG5leHRFbnRyeS5pbmRleCk7XG4gICAgICAgIHRoaXMuY3VycmVudEVudHJ5ID0gbmV4dEVudHJ5O1xuICAgICAgICB0aGlzLmN1cnJlbnRFbnRyeS5zaG93KCk7XG5cbiAgICAgICAgdGhpcy5ldmVudHMudHJpZ2dlcihTbGlkZURlY2suRVZFTlRfRU5UUllfQ0hBTkdFRCk7XG4gICAgfVxuXG59XG5cblR5cGVDb25maWdQYWNrLmluc3RhbmNlKCkuYWRkVHlwZUNvbmZpZyhcIm51dHRpbjJjLXVpXCIsIFByb3RvdHlwZUNvbmZpZy51bm5hbWVkKFNsaWRlRGVjaykpOyIsImltcG9ydCB7XG4gICAgQ2FudmFzU3R5bGVzLFxuICAgIENvbXBvbmVudCxcbiAgICBFdmVudE1hbmFnZXIsXG4gICAgU3R5bGVTZWxlY3RvckFjY2Vzc29yLFxuICAgIEhUTUwsXG4gICAgU3R5bGVzaGVldEJ1aWxkZXIsXG4gICAgU3R5bGVzaGVldCxcbiAgICBDb21wb25lbnRCdWlsZGVyLFxuICAgIElubGluZUNvbXBvbmVudEZhY3Rvcnlcbn0gZnJvbSBcIm51dHRpbjJjLWNvcmVfdjFcIjtcbmltcG9ydCB7IEluamVjdGlvblBvaW50LCBQcm90b3R5cGVDb25maWcsIFR5cGVDb25maWdQYWNrIH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5pbXBvcnQgeyBMb2dnZXIsIE1ldGhvZCB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuaW1wb3J0IHsgQ29tbW9uRXZlbnRzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21tb25FdmVudHNcIjtcbmltcG9ydCB7IEVsZW1lbnRUaGVtZUFwcGxpY2F0b3IgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2VsZW1lbnRUaGVtZUFwcGxpY2F0b3JcIjtcbmltcG9ydCB7IENvbG9yUGFsZXR0ZSB9IGZyb20gXCIuLi8uLi9jb2xvclBhbGV0dGVcIjtcblxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIkJ1dHRvblwiKTtcblxuZXhwb3J0IGNsYXNzIEJ1dHRvbiB7XG5cbiAgICBzdGF0aWMgVFlQRV9QUklNQVJZID0gXCJidXR0b24tcHJpbWFyeVwiO1xuICAgIHN0YXRpYyBUWVBFX1NFQ09OREFSWSA9IFwiYnV0dG9uLXNlY29uZGFyeVwiO1xuICAgIHN0YXRpYyBUWVBFX1NVQ0NFU1MgPSBcImJ1dHRvbi1zdWNjZXNzXCI7XG4gICAgc3RhdGljIFRZUEVfSU5GTyA9IFwiYnV0dG9uLWluZm9cIjtcbiAgICBzdGF0aWMgVFlQRV9XQVJOSU5HID0gXCJidXR0b24td2FybmluZ1wiO1xuICAgIHN0YXRpYyBUWVBFX0RBTkdFUiA9IFwiYnV0dG9uLWRhbmdlclwiO1xuICAgIHN0YXRpYyBUWVBFX0xJR0hUID0gXCJidXR0b24tbGlnaHRcIjtcbiAgICBzdGF0aWMgVFlQRV9EQVJLID0gXCJidXR0b24tZGFya1wiO1xuXG4gICAgc3RhdGljIFNJWkVfTUVESVVNID0gXCJidXR0b24tbWVkaXVtXCI7XG4gICAgc3RhdGljIFNJWkVfTEFSR0UgPSBcImJ1dHRvbi1sYXJnZVwiO1xuXG4gICAgc3RhdGljIFNQSU5ORVJfVklTSUJMRSA9IFwic3Bpbm5lci1jb250YWluZXItdmlzaWJsZVwiO1xuICAgIHN0YXRpYyBTUElOTkVSX0hJRERFTiA9IFwic3Bpbm5lci1jb250YWluZXItaGlkZGVuXCI7XG5cbiAgICBzdGF0aWMgRVZFTlRfQ0xJQ0tFRCA9IENvbW1vbkV2ZW50cy5DTElDS0VEO1xuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGxhYmVsXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGJ1dHRvblR5cGVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWNvbkNsYXNzXG4gICAgICovXG4gICAgY29uc3RydWN0b3IobGFiZWwsIGJ1dHRvblR5cGUgPSBCdXR0b24uVFlQRV9QUklNQVJZLCBidXR0b25TaXplID0gQnV0dG9uLlNJWkVfTUVESVVNLCBpY29uQ2xhc3MpIHtcblxuICAgICAgICAvKiogQHR5cGUge0lubGluZUNvbXBvbmVudEZhY3Rvcnl9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKElubGluZUNvbXBvbmVudEZhY3RvcnkpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IG51bGw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtTdHJpbmd9ICovXG4gICAgICAgIHRoaXMubGFiZWwgPSBsYWJlbDtcblxuICAgICAgICAvKiogQHR5cGUge1N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5idXR0b25UeXBlID0gYnV0dG9uVHlwZTtcblxuICAgICAgICAvKiogQHR5cGUge1N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5idXR0b25TaXplID0gYnV0dG9uU2l6ZTtcblxuICAgICAgICAvKiogQHR5cGUge1N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5pY29uQ2xhc3MgPSBpY29uQ2xhc3M7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtFdmVudE1hbmFnZXI8QnV0dG9uPn0gKi9cbiAgICAgICAgdGhpcy5ldmVudE1hbmFnZXIgPSBuZXcgRXZlbnRNYW5hZ2VyKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHlsZXNoZWV0QnVpbGRlcn0gc3R5bGVzaGVldEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMge1N0eWxlc2hlZXR9XG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkU3R5bGVzaGVldChzdHlsZXNoZWV0QnVpbGRlcikge1xuICAgICAgICBzdHlsZXNoZWV0QnVpbGRlclxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmJ1dHRvbi1vdXRsaW5lXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLCBcImZsZXhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ2ZXJ0aWNhbC1hbGlnblwiLCBcIm1pZGRsZVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5idXR0b25cIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIFwiaW5saW5lLWJsb2NrXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZm9udC13ZWlnaHRcIiwgXCI0MDBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjb2xvclwiLCBcIiMyMTI1MjlcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0ZXh0LWFsaWduXCIsIFwiY2VudGVyXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidmVydGljYWwtYWxpZ25cIiwgXCJtaWRkbGVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCItd2Via2l0LXVzZXItc2VsZWN0XCIsIFwibm9uZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIi1tb3otdXNlci1zZWxlY3RcIiwgXCJub25lXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiLW1zLXVzZXItc2VsZWN0XCIsIFwibm9uZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInVzZXItc2VsZWN0XCIsIFwibm9uZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIiwgXCJ0cmFuc3BhcmVudFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlclwiLCBcIjFweCBzb2xpZCB0cmFuc3BhcmVudFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmdcIiwgXCIwLjM3NXJlbSAwLjc1cmVtXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibGluZS1oZWlnaHRcIiwgXCIxLjVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItcmFkaXVzXCIsIFwiMC4yNXJlbVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zaXRpb25cIiwgXCJjb2xvciAwLjE1cyBlYXNlLWluLW91dCwgYmFja2dyb3VuZC1jb2xvciAwLjE1cyBlYXNlLWluLW91dCwgYm9yZGVyLWNvbG9yIDAuMTVzIGVhc2UtaW4tb3V0LCBib3gtc2hhZG93IDAuMTVzIGVhc2UtaW4tb3V0XCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYnV0dG9uLW1lZGl1bVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtc2l6ZVwiLCBcIjFyZW1cIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5idXR0b24tbGFyZ2VcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmb250LXNpemVcIiwgXCIxLjVyZW1cIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5idXR0b246aG92ZXJcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjb2xvclwiLCBcIiMyMTI1MjlcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0ZXh0LWRlY29yYXRpb25cIiwgXCJub25lXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYnV0dG9uOmZvY3VzLCAuYnV0dG9uLmZvY3VzXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwib3V0bGluZVwiLCBcIjBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3gtc2hhZG93XCIsIFwiMCAwIDAgMC4ycmVtIHJnYmEoMCwgMTIzLCAyNTUsIDAuMjUpXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYnV0dG9uLmRpc2FibGVkLCAuYnV0dG9uOmRpc2FibGVkXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCBcIjAuNjVcIilcbiAgICAgICAgICAgIC5jbG9zZSgpO1xuXG4gICAgICAgIEVsZW1lbnRUaGVtZUFwcGxpY2F0b3IuYXBwbHkoc3R5bGVzaGVldEJ1aWxkZXIsIFwiYnV0dG9uXCIsIFwicHJpbWFyeVwiLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLlBSSU1BUllfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLlBSSU1BUllfSE9WRVJfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLlBSSU1BUllfRElTQUJMRURfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLlBSSU1BUllfQUNUSVZFX0NPTE9SUyxcbiAgICAgICAgICAgIFwiMCAwIDAgMC4ycmVtIHJnYmEoMTMwLCAxMzgsIDE0NSwgMC41KVwiLCAvLyBib3hTaGFkb3dGb2N1c1xuICAgICAgICAgICAgXCIwIDAgMCAwLjJyZW0gcmdiYSgxMzAsIDEzOCwgMTQ1LCAwLjUpXCIpOyAvLyBib3hTaGFkb3dBY3RpdmVGb2N1c1xuXG5cbiAgICAgICAgRWxlbWVudFRoZW1lQXBwbGljYXRvci5hcHBseShzdHlsZXNoZWV0QnVpbGRlciwgXCJidXR0b25cIiwgXCJzZWNvbmRhcnlcIixcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5TRUNPTkRBUllfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLlNFQ09OREFSWV9IT1ZFUl9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuU0VDT05EQVJZX0RJU0FCTEVEX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5TRUNPTkRBUllfQUNUSVZFX0NPTE9SUyxcbiAgICAgICAgICAgIFwiMCAwIDAgMC4ycmVtIHJnYmEoMTMwLCAxMzgsIDE0NSwgMC41KVwiLCAvLyBib3hTaGFkb3dGb2N1c1xuICAgICAgICAgICAgXCIwIDAgMCAwLjJyZW0gcmdiYSgxMzAsIDEzOCwgMTQ1LCAwLjUpXCIpOyAvLyBib3hTaGFkb3dBY3RpdmVGb2N1c1xuICAgICAgICBcbiAgICAgICAgRWxlbWVudFRoZW1lQXBwbGljYXRvci5hcHBseShzdHlsZXNoZWV0QnVpbGRlciwgXCJidXR0b25cIiwgXCJzdWNjZXNzXCIsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuU1VDQ0VTU19DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuU1VDQ0VTU19IT1ZFUl9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuU1VDQ0VTU19ESVNBQkxFRF9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuU1VDQ0VTU19BQ1RJVkVfQ09MT1JTLFxuICAgICAgICAgICAgXCIwIDAgMCAwLjJyZW0gcmdiYSg3MiwgMTgwLCA5NywgMC41KVwiLCAvLyBib3hTaGFkb3dGb2N1c1xuICAgICAgICAgICAgXCIwIDAgMCAwLjJyZW0gcmdiYSg3MiwgMTgwLCA5NywgMC41KVwiKTsgLy8gYm94U2hhZG93QWN0aXZlRm9jdXNcblxuICAgICAgICBFbGVtZW50VGhlbWVBcHBsaWNhdG9yLmFwcGx5KHN0eWxlc2hlZXRCdWlsZGVyLCBcImJ1dHRvblwiLCBcImluZm9cIixcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5JTkZPX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5JTkZPX0hPVkVSX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5JTkZPX0RJU0FCTEVEX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5JTkZPX0FDVElWRV9DT0xPUlMsXG4gICAgICAgICAgICBcIjAgMCAwIDAuMnJlbSByZ2JhKDU4LCAxNzYsIDE5NSwgMC41KVwiLCAvLyBib3hTaGFkb3dGb2N1c1xuICAgICAgICAgICAgXCIwIDAgMCAwLjJyZW0gcmdiYSg1OCwgMTc2LCAxOTUsIDAuNSlcIik7IC8vIGJveFNoYWRvd0FjdGl2ZUZvY3VzXG5cbiAgICAgICAgRWxlbWVudFRoZW1lQXBwbGljYXRvci5hcHBseShzdHlsZXNoZWV0QnVpbGRlciwgXCJidXR0b25cIiwgXCJ3YXJuaW5nXCIsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuV0FSTklOR19DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuV0FSTklOR19IT1ZFUl9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuV0FSTklOR19ESVNBQkxFRF9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuV0FSTklOR19BQ1RJVkVfQ09MT1JTLFxuICAgICAgICAgICAgXCIwIDAgMCAwLjJyZW0gcmdiYSgyMjIsIDE3MCwgMTIsIDAuNSlcIiwgLy8gYm94U2hhZG93Rm9jdXNcbiAgICAgICAgICAgIFwiMCAwIDAgMC4ycmVtIHJnYmEoMjIyLCAxNzAsIDEyLCAwLjUpXCIpOyAvLyBib3hTaGFkb3dBY3RpdmVGb2N1c1xuXG4gICAgICAgIEVsZW1lbnRUaGVtZUFwcGxpY2F0b3IuYXBwbHkoc3R5bGVzaGVldEJ1aWxkZXIsIFwiYnV0dG9uXCIsIFwiZGFuZ2VyXCIsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuREFOR0VSX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5EQU5HRVJfSE9WRVJfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLkRBTkdFUl9ESVNBQkxFRF9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuREFOR0VSX0FDVElWRV9DT0xPUlMsXG4gICAgICAgICAgICBcIjAgMCAwIDAuMnJlbSByZ2JhKDIyNSwgODMsIDk3LCAwLjUpXCIsIC8vIGJveFNoYWRvd0ZvY3VzXG4gICAgICAgICAgICBcIjAgMCAwIDAuMnJlbSByZ2JhKDIyNSwgODMsIDk3LCAwLjUpXCIpOyAvLyBib3hTaGFkb3dBY3RpdmVGb2N1c1xuXG4gICAgICAgIEVsZW1lbnRUaGVtZUFwcGxpY2F0b3IuYXBwbHkoc3R5bGVzaGVldEJ1aWxkZXIsIFwiYnV0dG9uXCIsIFwibGlnaHRcIixcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5MSUdIVF9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuTElHSFRfSE9WRVJfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLkxJR0hUX0RJU0FCTEVEX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5MSUdIVF9BQ1RJVkVfQ09MT1JTLFxuICAgICAgICAgICAgXCIwIDAgMCAwLjJyZW0gcmdiYSgyMTYsIDIxNywgMjE5LCAwLjUpXCIsIC8vIGJveFNoYWRvd0ZvY3VzXG4gICAgICAgICAgICBcIjAgMCAwIDAuMnJlbSByZ2JhKDIxNiwgMjE3LCAyMTksIDAuNSlcIik7IC8vIGJveFNoYWRvd0FjdGl2ZUZvY3VzXG5cbiAgICAgICAgRWxlbWVudFRoZW1lQXBwbGljYXRvci5hcHBseShzdHlsZXNoZWV0QnVpbGRlciwgXCJidXR0b25cIiwgXCJkYXJrXCIsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuREFSS19DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuREFSS19IT1ZFUl9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuREFSS19ESVNBQkxFRF9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuREFSS19BQ1RJVkVfQ09MT1JTLFxuICAgICAgICAgICAgXCIwIDAgMCAwLjJyZW0gcmdiYSg4MiwgODgsIDkzLCAwLjUpXCIsIC8vIGJveFNoYWRvd0ZvY3VzXG4gICAgICAgICAgICBcIjAgMCAwIDAuMnJlbSByZ2JhKDgyLCA4OCwgOTMsIDAuNSlcIik7IC8vIGJveFNoYWRvd0FjdGl2ZUZvY3VzXG5cbiAgICAgICAgcmV0dXJuIHN0eWxlc2hlZXRCdWlsZGVyLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDb21wb25lbnRCdWlsZGVyfSBjb21wb25lbnRCdWlsZGVyIFxuICAgICAqIEByZXR1cm5zIHtDb21wb25lbnR9XG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkQ29tcG9uZW50KGNvbXBvbmVudEJ1aWxkZXIpIHtcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudEJ1aWxkZXJcbiAgICAgICAgICAgIC5yb290KFwiZGl2XCIsIFwiY2xhc3M9YnV0dG9uLW91dGxpbmVcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAubm9kZShcImJ1dHRvblwiLCBcImNsYXNzPWJ1dHRvblwiLCBcImlkPWJ1dHRvblwiLCBcInR5cGU9YnV0dG9uXCIpXG4gICAgICAgICAgICAgICAgLm5vZGUoXCJkaXZcIiwgXCJjbGFzcz1zcGlubmVyLWNvbnRhaW5lci1oaWRkZW5cIiwgXCJpZD1zcGlubmVyQ29udGFpbmVyXCIpXG4gICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAubm9kZShcImRpdlwiLCBcImNsYXNzPXNwaW5uZXJcIilcbiAgICAgICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgIC5idWlsZCgpO1xuICAgIH1cblxuICAgIC8qKiBAdHlwZSB7RXZlbnRNYW5hZ2VyPEJ1dHRvbj59ICovXG4gICAgZ2V0IGV2ZW50cygpIHsgcmV0dXJuIHRoaXMuZXZlbnRNYW5hZ2VyOyB9XG5cbiAgICBwb3N0Q29uZmlnKCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoQnV0dG9uKTtcbiAgICAgICAgQ2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKEJ1dHRvbi5uYW1lKTtcbiAgICAgICAgaWYgKHRoaXMuaWNvbkNsYXNzKSB7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJidXR0b25cIikuYWRkQ2hpbGQoSFRNTC5pKFwiXCIsIHRoaXMuaWNvbkNsYXNzKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMubGFiZWwpIHtcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJ1dHRvblwiKS5hZGRDaGlsZCh0aGlzLmxhYmVsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIFN0eWxlU2VsZWN0b3JBY2Nlc3Nvci5mcm9tKHRoaXMuY29tcG9uZW50LmdldChcImJ1dHRvblwiKSlcbiAgICAgICAgICAgIC5lbmFibGUoXCJidXR0b25cIilcbiAgICAgICAgICAgIC5lbmFibGUodGhpcy5idXR0b25TaXplKVxuICAgICAgICAgICAgLmVuYWJsZSh0aGlzLmJ1dHRvblR5cGUpO1xuXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJ1dHRvblwiKS5saXN0ZW5UbyhcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5ldmVudE1hbmFnZXIudHJpZ2dlcihCdXR0b24uRVZFTlRfQ0xJQ0tFRCwgZXZlbnQpO1xuICAgICAgICB9LCB0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge01ldGhvZH0gbWV0aG9kIFxuICAgICAqL1xuICAgIHdpdGhDbGlja0xpc3RlbmVyKG1ldGhvZCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJidXR0b25cIikubGlzdGVuVG8oXCJjbGlja1wiLCBtZXRob2QpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBlbmFibGVMb2FkaW5nKCkge1xuICAgICAgICBTdHlsZVNlbGVjdG9yQWNjZXNzb3IuZnJvbSh0aGlzLmNvbXBvbmVudC5nZXQoXCJzcGlubmVyQ29udGFpbmVyXCIpKVxuICAgICAgICAgICAgLmRpc2FibGUoQnV0dG9uLlNQSU5ORVJfSElEREVOKVxuICAgICAgICAgICAgLmVuYWJsZShCdXR0b24uU1BJTk5FUl9WSVNJQkxFKTtcbiAgICB9XG5cbiAgICBkaXNhYmxlTG9hZGluZygpIHtcbiAgICAgICAgU3R5bGVTZWxlY3RvckFjY2Vzc29yLmZyb20odGhpcy5jb21wb25lbnQuZ2V0KFwic3Bpbm5lckNvbnRhaW5lclwiKSlcbiAgICAgICAgICAgIC5kaXNhYmxlKEJ1dHRvbi5TUElOTkVSX1ZJU0lCTEUpXG4gICAgICAgICAgICAuZW5hYmxlKEJ1dHRvbi5TUElOTkVSX0hJRERFTik7XG4gICAgfVxuXG4gICAgZGlzYWJsZSgpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYnV0dG9uXCIpLnNldEF0dHJpYnV0ZVZhbHVlKFwiZGlzYWJsZWRcIixcInRydWVcIik7XG4gICAgfVxuXG4gICAgZW5hYmxlKCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJidXR0b25cIikucmVtb3ZlQXR0cmlidXRlKFwiZGlzYWJsZWRcIik7XG4gICAgfVxufVxuXG5UeXBlQ29uZmlnUGFjay5pbnN0YW5jZSgpLmFkZFR5cGVDb25maWcoXCJudXR0aW4yYy11aVwiLCBQcm90b3R5cGVDb25maWcudW5uYW1lZChCdXR0b24pKTsiLCJpbXBvcnQgeyBJbmplY3Rpb25Qb2ludCwgUHJvdG90eXBlQ29uZmlnLCBQcm92aWRlciwgVHlwZUNvbmZpZ1BhY2sgfSBmcm9tIFwibWluZGlfdjFcIjtcbmltcG9ydCB7IENhbnZhc1N0eWxlcyxcbiAgICBDb21wb25lbnQsXG4gICAgQ29tcG9uZW50QnVpbGRlcixcbiAgICBDc3MzU3R5bGVzaGVldEJ1aWxkZXIsXG4gICAgRXZlbnRNYW5hZ2VyLFxuICAgIEhUTUwsXG4gICAgSW5saW5lQ29tcG9uZW50RmFjdG9yeSxcbiAgICBTdHlsZXNoZWV0QnVpbGRlciB9IGZyb20gXCJudXR0aW4yYy1jb3JlX3YxXCI7XG5pbXBvcnQgeyBCdXR0b24gfSBmcm9tIFwiLi4vaW5wdXQvYnV0dG9uL2J1dHRvbi5qc1wiO1xuXG5leHBvcnQgY2xhc3MgVG9vbEJhciB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcblxuICAgICAgICAvKiogQHR5cGUge0lubGluZUNvbXBvbmVudEZhY3Rvcnl9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKElubGluZUNvbXBvbmVudEZhY3RvcnkpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IG51bGw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtFdmVudE1hbmFnZXJ9ICovXG4gICAgICAgIHRoaXMuZXZlbnRNYW5hZ2VyID0gbmV3IEV2ZW50TWFuYWdlcigpO1xuXG5cdFx0LyoqIEB0eXBlIHtQcm92aWRlcjxCdXR0b24+fSAqL1xuXHRcdHRoaXMuYnV0dG9uUHJvdmlkZXIgPSBJbmplY3Rpb25Qb2ludC5wcm92aWRlcihCdXR0b24pO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7QXJyYXk8QnV0dG9uPn0gKi9cbiAgICAgICAgdGhpcy5idXR0b25zID0gW107XG5cbiAgICAgICAgLyoqIEB0eXBlIHtOdW1iZXJ9ICovXG4gICAgICAgIHRoaXMuZmlsbEluZGV4ID0gbnVsbDtcbiAgICB9XG5cblx0YXN5bmMgcG9zdENvbmZpZygpIHtcblx0XHR0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoVG9vbEJhcik7XG5cdFx0Q2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKFRvb2xCYXIubmFtZSk7XG5cdH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBmaWxsSW5kZXggVGhlIGluZGV4IG9mIHRoZSBidXR0b24gdGhhdCBzaG91bGQgYmUgZm9sbG93ZWQgYnkgYSBmaWxsIGVsZW1lbnQuIFN0YXJ0aW5nIHdpdGggMFxuICAgICAqL1xuICAgIHNldEZpbGxJbmRleChmaWxsSW5kZXgpIHtcbiAgICAgICAgdGhpcy5maWxsSW5kZXggPSBmaWxsSW5kZXg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGxhYmVsIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlIEUuZy4gQnV0dG9uLlRZUEVfUFJJTUFSWVxuICAgICAqIEByZXR1cm5zIHtCdXR0b259XG4gICAgICovXG4gICAgYXN5bmMgYWRkQnV0dG9uKGxhYmVsLCB0eXBlID0gQnV0dG9uLlRZUEVfUFJJTUFSWSkge1xuICAgICAgICBjb25zdCBidXR0b24gPSBhd2FpdCB0aGlzLmJ1dHRvblByb3ZpZGVyLmdldChbbGFiZWwsIHR5cGVdKTtcblxuICAgICAgICBpZiAodGhpcy5idXR0b25zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIC8qKiBAdHlwZSB7U2ltcGxlRWxlbWVudH0gKi9cbiAgICAgICAgICAgIGNvbnN0IHNwYWNlckRpdiA9IEhUTUwuY3VzdG9tKFwiZGl2XCIpO1xuICAgICAgICAgICAgY29uc3Qgc3R5bGUgPSB0aGlzLmJ1dHRvbnMubGVuZ3RoLTEgPT09IHRoaXMuZmlsbEluZGV4ID8gXCJ0b29sLWJhci1maWxsXCIgOiBcInRvb2wtYmFyLXNwYWNlXCI7XG4gICAgICAgICAgICBzcGFjZXJEaXYuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLCBzdHlsZSk7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudC5hZGRDaGlsZChcImJ1dHRvbkNvbnRhaW5lclwiLCBzcGFjZXJEaXYpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqIEB0eXBlIHtTaW1wbGVFbGVtZW50fSAqL1xuICAgICAgICBjb25zdCBidXR0b25EaXYgPSBIVE1MLmN1c3RvbShcImRpdlwiKTtcbiAgICAgICAgYnV0dG9uRGl2LnNldEF0dHJpYnV0ZVZhbHVlKFwiY2xhc3NcIiwgXCJ0b29sLWJhci1idXR0b24tY29udGFpbmVyXCIpO1xuICAgICAgICBidXR0b25EaXYuYWRkQ2hpbGQoYnV0dG9uLmNvbXBvbmVudCk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmNvbXBvbmVudC5hZGRDaGlsZChcImJ1dHRvbkNvbnRhaW5lclwiLCBidXR0b25EaXYpO1xuXG4gICAgICAgIHRoaXMuYnV0dG9ucy5wdXNoKGJ1dHRvbik7XG5cbiAgICAgICAgcmV0dXJuIGJ1dHRvbjtcbiAgICB9XG5cbiAgICByZXZlcnNlQnV0dG9uTGF5b3V0KCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJidXR0b25Db250YWluZXJcIikuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLCBcInRvb2wtYmFyLXJldmVyc2VkXCIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7Q29tcG9uZW50QnVpbGRlcn0gY29tcG9uZW50QnVpbGRlclxuICAgICAqIEByZXR1cm5zIHtDb21wb25lbnR9XG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkQ29tcG9uZW50KGNvbXBvbmVudEJ1aWxkZXIpIHtcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudEJ1aWxkZXJcbiAgICAgICAgICAgIC5yb290KFwiZGl2XCIsIFwiY2xhc3M9dG9vbC1iYXJcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAubm9kZShcImRpdlwiLCBcImlkPWJ1dHRvbkNvbnRhaW5lclwiLCBcImNsYXNzPXRvb2wtYmFyLWNvbnRhaW5lclwiKVxuICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgIC5idWlsZCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHtTdHlsZXNoZWV0fVxuICAgICAqIEBwYXJhbSB7U3R5bGVzaGVldEJ1aWxkZXJ9IHN0eWxlc2hlZXRCdWlsZGVyIFxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZFN0eWxlc2hlZXQoc3R5bGVzaGVldEJ1aWxkZXIpIHtcbiAgICAgICAgcmV0dXJuIENzczNTdHlsZXNoZWV0QnVpbGRlci5jcmVhdGUoc3R5bGVzaGVldEJ1aWxkZXIpXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIudG9vbC1iYXJcIilcbiAgICAgICAgICAgICAgICAuZGlzcGxheShcImZsZXhcIilcbiAgICAgICAgICAgICAgICAuZmxleERpcmVjdGlvbihcInJvd1wiKVxuICAgICAgICAgICAgICAgIC53aWR0aChcIjEwMCVcIilcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnRvb2wtYmFyLXJldmVyc2VkXCIpXG4gICAgICAgICAgICAgICAgLmRpc3BsYXkoXCJmbGV4XCIpXG4gICAgICAgICAgICAgICAgLmZsZXhEaXJlY3Rpb24oXCJyb3ctcmV2ZXJzZVwiKVxuICAgICAgICAgICAgICAgIC53aWR0aChcIjEwMCVcIilcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnRvb2wtYmFyLWNvbnRhaW5lclwiKVxuICAgICAgICAgICAgICAgIC5mbGV4KFwiMFwiLCBcIjFcIiwgXCJhdXRvXCIpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi50b29sLWJhci1idXR0b24tY29udGFpbmVyXCIpXG4gICAgICAgICAgICAgICAgLmZsZXgoXCIwXCIsIFwiMVwiLCBcImF1dG9cIilcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnRvb2wtYmFyLWZpbGxcIilcbiAgICAgICAgICAgICAgICAuZmxleChcIjFcIiwgXCIwXCIsIFwiYXV0b1wiKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIudG9vbC1iYXItc3BhY2VcIilcbiAgICAgICAgICAgICAgICAuZmxleChcIjBcIiwgXCIwXCIsIFwiMC41cmVtXCIpXG5cbiAgICAgICAgICAgIC5idWlsZCgpO1xuICAgIH1cbn1cblxuVHlwZUNvbmZpZ1BhY2suaW5zdGFuY2UoKS5hZGRUeXBlQ29uZmlnKFwibnV0dGluMmMtdWlcIiwgUHJvdG90eXBlQ29uZmlnLnVubmFtZWQoVG9vbEJhcikpOyIsImltcG9ydCB7XG4gICAgVGVtcGxhdGVDb21wb25lbnRGYWN0b3J5LFxuICAgIENhbnZhc1N0eWxlcyxcbiAgICBDb21wb25lbnQsXG4gICAgRXZlbnRNYW5hZ2VyLFxuICAgIElucHV0RWxlbWVudERhdGFCaW5kaW5nLFxuICAgIFN0eWxlc2hlZXRCdWlsZGVyLFxuICAgIFN0eWxlc2hlZXQsXG4gICAgQ29tcG9uZW50QnVpbGRlcixcbiAgICBJbmxpbmVDb21wb25lbnRGYWN0b3J5LFxuICAgIFJhZGlvSW5wdXRFbGVtZW50XG59IGZyb20gXCJudXR0aW4yYy1jb3JlX3YxXCI7XG5pbXBvcnQgeyBJbmplY3Rpb25Qb2ludCwgUHJvdG90eXBlQ29uZmlnLCBUeXBlQ29uZmlnUGFjayB9IGZyb20gXCJtaW5kaV92MVwiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5pbXBvcnQgeyBDb21tb25FdmVudHMgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbW1vbkV2ZW50c1wiO1xuaW1wb3J0IHsgQ29udGFpbmVyRXZlbnQgfSBmcm9tIFwiY29udGFpbmVyYnJpZGdlX3YxXCI7XG5cbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJSYWRpb1RvZ2dsZUljb25cIik7XG5cbmV4cG9ydCBjbGFzcyBSYWRpb1RvZ2dsZUljb24ge1xuICAgIFxuICAgIHN0YXRpYyBFVkVOVF9FTkFCTEVEID0gQ29tbW9uRXZlbnRzLkVOQUJMRUQ7XG4gICAgc3RhdGljIEVWRU5UX0RJU0FCTEVEID0gQ29tbW9uRXZlbnRzLkRJU0FCTEVEO1xuICAgIHN0YXRpYyBFVkVOVF9DSEFOR0VEID0gQ29tbW9uRXZlbnRzLkNIQU5HRUQ7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gbW9kZWxcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihuYW1lID0gXCI/XCIsIG1vZGVsID0gbnVsbCwgaWNvbiA9IFwiZmFzIGZhLXF1ZXN0aW9uXCIsIGxhYmVsID0gbnVsbCkge1xuXG4gICAgICAgIC8qKiBAdHlwZSB7SW5saW5lQ29tcG9uZW50RmFjdG9yeX0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoSW5saW5lQ29tcG9uZW50RmFjdG9yeSk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtFdmVudE1hbmFnZXJ9ICovXG4gICAgICAgIHRoaXMuZXZlbnRzID0gbmV3IEV2ZW50TWFuYWdlcigpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IG51bGw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtvYmplY3R9ICovXG4gICAgICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcblxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcblxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5pY29uID0gaWNvbjtcblxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5sYWJlbCA9IGxhYmVsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Ym9vbGVhbn0gKi9cbiAgICAgICAgdGhpcy5jaGVja2VkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHlsZXNoZWV0QnVpbGRlcn0gc3R5bGVzaGVldEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMge1N0eWxlc2hlZXR9XG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkU3R5bGVzaGVldChzdHlsZXNoZWV0QnVpbGRlcikge1xuICAgICAgICBzdHlsZXNoZWV0QnVpbGRlclxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnJhZGlvLXRvZ2dsZS1pY29uLWNvbnRhaW5lclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgXCJpbmxpbmUtYmxvY2tcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItcmFkaXVzXCIsIFwiNTAlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcInRyYW5zcGFyZW50XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNpdGlvblwiLCBcImJhY2tncm91bmQtY29sb3IgMC4zc1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRleHQtYWxpZ25cIiwgXCJjZW50ZXJcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJhbGlnbi1pdGVtc1wiLCBcImNlbnRlclwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnJhZGlvLXRvZ2dsZS1pY29uLXJhZGlvXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCBcIjBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLCBcImFic29sdXRlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY3Vyc29yXCIsIFwicG9pbnRlclwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnJhZGlvLXRvZ2dsZS1pY29uLWxhYmVsXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY3Vyc29yXCIsIFwicG9pbnRlclwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1yYWRpdXNcIiwgXCI1cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2l0aW9uXCIsIFwiYWxsIDAuM3MgZWFzZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtc2l6ZVwiLCBcIjIwcHRcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5yYWRpby10b2dnbGUtaWNvbi1jb250YWluZXIgaW5wdXRbdHlwZT0ncmFkaW8nXTpub3QoOmlzKDpjaGVja2VkKSkgKyBsYWJlbFwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbG9yXCIsIFwibGlnaHRncmF5XCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucmFkaW8tdG9nZ2xlLWljb24tY29udGFpbmVyIGlucHV0W3R5cGU9J3JhZGlvJ106bm90KDppcyg6Y2hlY2tlZCkpICsgbGFiZWw6aG92ZXJcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjb2xvclwiLCBcImdyYXlcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5yYWRpby10b2dnbGUtaWNvbi1jb250YWluZXIgaW5wdXRbdHlwZT0ncmFkaW8nXTppcyg6Y2hlY2tlZCkgKyBsYWJlbFwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbG9yXCIsIFwiIzIxOTZGM1wiKVxuICAgICAgICAgICAgLmNsb3NlKCk7XG4gICAgICAgIHJldHVybiBzdHlsZXNoZWV0QnVpbGRlci5idWlsZCgpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDb21wb25lbnRCdWlsZGVyfSBjb21wb25lbnRCdWlsZGVyIFxuICAgICAqIEByZXR1cm5zIHtDb21wb25lbnR9XG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkQ29tcG9uZW50KGNvbXBvbmVudEJ1aWxkZXIpIHtcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudEJ1aWxkZXJcbiAgICAgICAgICAgIC5yb290KFwic3BhblwiLCBcImlkPWNvbnRhaW5lclwiLCBcImNsYXNzPXJhZGlvLXRvZ2dsZS1pY29uLWNvbnRhaW5lclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwiaW5wdXRcIiwgXCJpZD1yYWRpb1wiLCBcImNsYXNzPXJhZGlvLXRvZ2dsZS1pY29uLXJhZGlvXCIsIFwidHlwZT1yYWRpb1wiKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwibGFiZWxcIiwgXCJpZD1sYWJlbFwiLCBcImNsYXNzPXJhZGlvLXRvZ2dsZS1pY29uLWxhYmVsXCIpXG4gICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAubm9kZShcImlcIiwgXCJpZD1pY29uXCIsIFwidGl0bGU9XCIpXG4gICAgICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAuYnVpbGQoKTtcbiAgICB9XG5cbiAgICBwb3N0Q29uZmlnKCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoUmFkaW9Ub2dnbGVJY29uKTtcbiAgICAgICAgQ2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKFJhZGlvVG9nZ2xlSWNvbi5uYW1lKTtcblxuICAgICAgICBjb25zdCByYWRpbyA9IHRoaXMuZ2V0UmFkaW8oKTtcbiAgICAgICAgcmFkaW8uc2V0QXR0cmlidXRlVmFsdWUoXCJuYW1lXCIsIHRoaXMubmFtZSk7XG4gICAgICAgIHJhZGlvLmxpc3RlblRvKFwiY2xpY2tcIiwgdGhpcy5jbGlja2VkLCB0aGlzKTtcblxuICAgICAgICBjb25zdCBpZCA9IHJhZGlvLmdldEF0dHJpYnV0ZVZhbHVlKFwiaWRcIik7XG5cbiAgICAgICAgY29uc3QgbGFiZWwgPSB0aGlzLmNvbXBvbmVudC5nZXQoXCJsYWJlbFwiKTtcbiAgICAgICAgbGFiZWwuc2V0QXR0cmlidXRlVmFsdWUoXCJmb3JcIiwgaWQpO1xuXG4gICAgICAgIGNvbnN0IGljb24gPSB0aGlzLmNvbXBvbmVudC5nZXQoXCJpY29uXCIpO1xuICAgICAgICBpY29uLnNldEF0dHJpYnV0ZVZhbHVlKFwiY2xhc3NcIiwgdGhpcy5pY29uKTtcblxuICAgICAgICBpZiAodGhpcy5tb2RlbCkge1xuICAgICAgICAgICAgSW5wdXRFbGVtZW50RGF0YUJpbmRpbmcubGluayh0aGlzLm1vZGVsKS50byhyYWRpbyk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Q29udGFpbmVyRXZlbnR9IGV2ZW50IFxuICAgICAqL1xuICAgIGNsaWNrZWQoZXZlbnQpIHtcbiAgICAgICAgY29uc3Qgb2xkVmFsdWUgPSB0aGlzLmNoZWNrZWQ7XG4gICAgICAgIHRoaXMuY2hlY2tlZCA9IGV2ZW50LnRhcmdldC5jaGVja2VkO1xuXG4gICAgICAgIGlmIChvbGRWYWx1ZSAhPT0gdGhpcy5jaGVja2VkKSB7XG4gICAgICAgICAgICB0aGlzLmV2ZW50cy50cmlnZ2VyKFJhZGlvVG9nZ2xlSWNvbi5FVkVOVF9DSEFOR0VELCBbZXZlbnRdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmNoZWNrZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzLnRyaWdnZXIoUmFkaW9Ub2dnbGVJY29uLkVWRU5UX0VOQUJMRUQsIFtldmVudF0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5ldmVudHMudHJpZ2dlcihSYWRpb1RvZ2dsZUljb24uRVZFTlRfRElTQUJMRUQsIFtldmVudF0pO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgdG9nZ2xlIHN0YXRlIHByb2dyYW1tYXRpY2FsbHlcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGNoZWNrZWQgXG4gICAgICogQHBhcmFtIHtib29sZWFufSBzaWxlbnRcbiAgICAgKi9cbiAgICB0b2dnbGUoY2hlY2tlZCwgc2lsZW50ID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKHRoaXMuY2hlY2tlZCA9PT0gY2hlY2tlZCkge1xuICAgICAgICAgICAgcmV0dXJuOyAvLyBObyBjaGFuZ2VcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNoZWNrZWQgPSBjaGVja2VkO1xuICAgICAgICBpZiAoIXRoaXMuY29tcG9uZW50KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFzaWxlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0UmFkaW8oKS5jb250YWluZXJFbGVtZW50LmNsaWNrKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoZWNrZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0UmFkaW8oKS5jaGVja2VkID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0UmFkaW8oKS5jaGVja2VkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZWZyZXNoQ29sb3JzKCk7XG4gICAgfVxuXG4gICAgLyoqIEByZXR1cm5zIHtSYWRpb0lucHV0RWxlbWVudH0gKi9cbiAgICBnZXRSYWRpbygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tcG9uZW50LmdldChcInJhZGlvXCIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgY3VycmVudCB0b2dnbGUgc3RhdGVcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBpc0NoZWNrZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNoZWNrZWQ7XG4gICAgfVxufVxuXG5UeXBlQ29uZmlnUGFjay5pbnN0YW5jZSgpLmFkZFR5cGVDb25maWcoXCJudXR0aW4yYy11aVwiLCBQcm90b3R5cGVDb25maWcudW5uYW1lZChSYWRpb1RvZ2dsZUljb24pKTsiLCJpbXBvcnQge1xuICAgIENhbnZhc1N0eWxlcyxcbiAgICBDb21wb25lbnQsXG4gICAgRXZlbnRNYW5hZ2VyLFxuICAgIFN0eWxlc2hlZXRCdWlsZGVyLFxuICAgIFN0eWxlc2hlZXQsXG4gICAgQ29tcG9uZW50QnVpbGRlcixcbiAgICBJbmxpbmVDb21wb25lbnRGYWN0b3J5LFxuICAgIENoZWNrYm94SW5wdXRFbGVtZW50XG59IGZyb20gXCJudXR0aW4yYy1jb3JlX3YxXCI7XG5pbXBvcnQgeyBJbmplY3Rpb25Qb2ludCwgUHJvdG90eXBlQ29uZmlnLCBUeXBlQ29uZmlnUGFjayB9IGZyb20gXCJtaW5kaV92MVwiO1xuaW1wb3J0IHsgTG9nZ2VyLCBNZXRob2QgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcbmltcG9ydCB7IENvbW1vbkV2ZW50cyB9IGZyb20gXCIuLi8uLi9jb21tb24vY29tbW9uRXZlbnRzXCI7XG5pbXBvcnQgeyBDb250YWluZXJFdmVudCB9IGZyb20gXCJjb250YWluZXJicmlkZ2VfdjFcIjtcblxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIlRvZ2dsZUljb25cIik7XG5cbmV4cG9ydCBjbGFzcyBUb2dnbGVJY29uIHtcblxuICAgIHN0YXRpYyBUWVBFX1BSSU1BUlkgPSBcInRvZ2dsZUljb24tcHJpbWFyeVwiO1xuICAgIHN0YXRpYyBUWVBFX1NFQ09OREFSWSA9IFwidG9nZ2xlSWNvbi1zZWNvbmRhcnlcIjtcbiAgICBzdGF0aWMgVFlQRV9TVUNDRVNTID0gXCJ0b2dnbGVJY29uLXN1Y2Nlc3NcIjtcbiAgICBzdGF0aWMgVFlQRV9JTkZPID0gXCJ0b2dnbGVJY29uLWluZm9cIjtcbiAgICBzdGF0aWMgVFlQRV9XQVJOSU5HID0gXCJ0b2dnbGVJY29uLXdhcm5pbmdcIjtcbiAgICBzdGF0aWMgVFlQRV9EQU5HRVIgPSBcInRvZ2dsZUljb24tZGFuZ2VyXCI7XG4gICAgc3RhdGljIFRZUEVfTElHSFQgPSBcInRvZ2dsZUljb24tbGlnaHRcIjtcbiAgICBzdGF0aWMgVFlQRV9EQVJLID0gXCJ0b2dnbGVJY29uLWRhcmtcIjtcblxuICAgIHN0YXRpYyBTSVpFX01FRElVTSA9IFwidG9nZ2xlSWNvbi1tZWRpdW1cIjtcbiAgICBzdGF0aWMgU0laRV9MQVJHRSA9IFwidG9nZ2xlSWNvbi1sYXJnZVwiO1xuXG4gICAgc3RhdGljIFNQSU5ORVJfVklTSUJMRSA9IFwidG9nZ2xlSWNvbi1zcGlubmVyLWNvbnRhaW5lci12aXNpYmxlXCI7XG4gICAgc3RhdGljIFNQSU5ORVJfSElEREVOID0gXCJ0b2dnbGVJY29uLXNwaW5uZXItY29udGFpbmVyLWhpZGRlblwiO1xuXG4gICAgc3RhdGljIEVWRU5UX0VOQUJMRUQgPSBDb21tb25FdmVudHMuRU5BQkxFRDtcbiAgICBzdGF0aWMgRVZFTlRfRElTQUJMRUQgPSBDb21tb25FdmVudHMuRElTQUJMRURcblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG1vZGVsXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGxhYmVsXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBjaGVja2VkXG4gICAgICovXG4gICAgY29uc3RydWN0b3IobmFtZSA9IFwiP1wiLCBtb2RlbCA9IG51bGwsIGxhYmVsID0gbnVsbCwgY2hlY2tlZCA9IGZhbHNlKSB7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtJbmxpbmVDb21wb25lbnRGYWN0b3J5fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShJbmxpbmVDb21wb25lbnRGYWN0b3J5KTtcblxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudH0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSBudWxsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7b2JqZWN0fSAqL1xuICAgICAgICB0aGlzLm1vZGVsID0gbW9kZWw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtib29sZWFufSAqL1xuICAgICAgICB0aGlzLmNoZWNrZWQgPSBjaGVja2VkO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7U3RyaW5nfSAqL1xuICAgICAgICB0aGlzLmxhYmVsID0gbGFiZWw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMuZW5hYmxlZEljb24gPSBcImZhcyBmYS1jaXJjbGUtY2hlY2tcIjtcblxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5kaXNhYmxlZEljb24gPSBcImZhcyBmYS1jaXJjbGVcIjtcblxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5kaXNhYmxlZENvbG9yID0gXCJsaWdodGdyYXlcIjtcblxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5lbmFibGVkQ29sb3IgPSBcIiMyMTk2RjNcIjtcblxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5ob3ZlckNvbG9yID0gXCJncmF5XCI7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtFdmVudE1hbmFnZXJ9ICovXG4gICAgICAgIHRoaXMuZXZlbnRzID0gbmV3IEV2ZW50TWFuYWdlcigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3R5bGVzaGVldEJ1aWxkZXJ9IHN0eWxlc2hlZXRCdWlsZGVyIFxuICAgICAqIEByZXR1cm5zIHtTdHlsZXNoZWV0fVxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZFN0eWxlc2hlZXQoc3R5bGVzaGVldEJ1aWxkZXIpIHtcbiAgICAgICAgc3R5bGVzaGVldEJ1aWxkZXJcbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi50b2dnbGUtaWNvbi1jb250YWluZXJcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIFwiaW5saW5lLWJsb2NrXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyLXJhZGl1c1wiLCBcIjUwJVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIiwgXCJ0cmFuc3BhcmVudFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zaXRpb25cIiwgXCJiYWNrZ3JvdW5kLWNvbG9yIDAuM3NcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0ZXh0LWFsaWduXCIsIFwiY2VudGVyXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYWxpZ24taXRlbXNcIiwgXCJjZW50ZXJcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi50b2dnbGUtaWNvbi1yYWRpb1wiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIiwgXCJhYnNvbHV0ZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImN1cnNvclwiLCBcInBvaW50ZXJcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi50b2dnbGUtaWNvbi1sYWJlbFwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImN1cnNvclwiLCBcInBvaW50ZXJcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItcmFkaXVzXCIsIFwiNXB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNpdGlvblwiLCBcImFsbCAwLjNzIGVhc2VcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmb250LXNpemVcIiwgXCIyMHB0XCIpXG4gICAgICAgICAgICAuY2xvc2UoKTtcblxuICAgICAgICByZXR1cm4gc3R5bGVzaGVldEJ1aWxkZXIuYnVpbGQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudEJ1aWxkZXJ9IGNvbXBvbmVudEJ1aWxkZXIgXG4gICAgICogQHJldHVybiB7Q29tcG9uZW50fVxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZENvbXBvbmVudChjb21wb25lbnRCdWlsZGVyKSB7XG4gICAgICAgIHJldHVybiBjb21wb25lbnRCdWlsZGVyXG4gICAgICAgICAgICAucm9vdChcInNwYW5cIiwgXCJpZD1jb250YWluZXJcIiwgXCJjbGFzcz10b2dnbGUtaWNvbi1jb250YWluZXJcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAubm9kZShcImlucHV0XCIsIFwiaWQ9Y2hlY2tib3hcIiwgXCJjbGFzcz10b2dnbGUtaWNvbi1yYWRpb1wiLCBcInR5cGU9Y2hlY2tib3hcIilcbiAgICAgICAgICAgICAgICAubm9kZShcImxhYmVsXCIsIFwiaWQ9bGFiZWxcIiwgXCJjbGFzcz10b2dnbGUtaWNvbi1sYWJlbFwiKVxuICAgICAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAgICAgLm5vZGUoXCJpXCIsIFwiaWQ9aWNvblwiLCBcInRpdGxlPVwiKVxuICAgICAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgcG9zdENvbmZpZygpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKFRvZ2dsZUljb24pO1xuICAgICAgICBDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUoVG9nZ2xlSWNvbi5uYW1lKTtcblxuICAgICAgICBjb25zdCBjaGVja2JveCA9IHRoaXMuZ2V0Q2hlY2tib3goKTtcbiAgICAgICAgY2hlY2tib3guc2V0QXR0cmlidXRlVmFsdWUoXCJuYW1lXCIsIHRoaXMubmFtZSk7XG4gICAgICAgIGNoZWNrYm94Lmxpc3RlblRvKFwiY2hhbmdlXCIsIHRoaXMuY2hhbmdlZCwgdGhpcyk7XG4gICAgICAgIGlmICh0aGlzLmNoZWNrZWQpIHtcbiAgICAgICAgICAgIGNoZWNrYm94LnNldEF0dHJpYnV0ZVZhbHVlKFwiY2hlY2tlZFwiLCBcImNoZWNrZWRcIik7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLmNvbXBvbmVudC5nZXQoXCJjb250YWluZXJcIik7XG4gICAgICAgIGNvbnRhaW5lci5saXN0ZW5UbyhcIm1vdXNlb3ZlclwiLCB0aGlzLmVuYWJsZUhvdmVyLCB0aGlzKTtcbiAgICAgICAgY29udGFpbmVyLmxpc3RlblRvKFwibW91c2VvdXRcIiwgdGhpcy5kaXNhYmxlSG92ZXIsIHRoaXMpO1xuXG4gICAgICAgIGNvbnN0IGlkID0gY2hlY2tib3guZ2V0QXR0cmlidXRlVmFsdWUoXCJpZFwiKTtcblxuICAgICAgICBjb25zdCBsYWJlbCA9IHRoaXMuY29tcG9uZW50LmdldChcImxhYmVsXCIpO1xuICAgICAgICBsYWJlbC5zZXRBdHRyaWJ1dGVWYWx1ZShcImZvclwiLCBpZCk7XG5cbiAgICAgICAgdGhpcy5yZWZyZXNoQ29sb3JzKCk7XG5cbiAgICB9XG5cbiAgICBhc3luYyByZWZyZXNoQ29sb3JzKCkge1xuICAgICAgICBpZiAodGhpcy5jaGVja2VkKSB7XG4gICAgICAgICAgICB0aGlzLmFwcGx5SWNvbih0aGlzLmVuYWJsZWRJY29uKTtcbiAgICAgICAgICAgIHRoaXMuYXBwbHlDb2xvcih0aGlzLmVuYWJsZWRDb2xvcik7XG4gICAgICAgICAgICBcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYXBwbHlJY29uKHRoaXMuZGlzYWJsZWRJY29uKTtcbiAgICAgICAgICAgIHRoaXMuYXBwbHlDb2xvcih0aGlzLmRpc2FibGVkQ29sb3IpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbG9hZEljb25zKGRpc2FibGVkSWNvbiwgZW5hYmxlZEljb24pIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlZEljb24gPSBkaXNhYmxlZEljb247XG4gICAgICAgIHRoaXMuZW5hYmxlZEljb24gPSBlbmFibGVkSWNvbjtcbiAgICAgICAgdGhpcy5jaGVja2VkID8gdGhpcy5hcHBseUljb24odGhpcy5lbmFibGVkSWNvbikgOiB0aGlzLmFwcGx5SWNvbih0aGlzLmRpc2FibGVkSWNvbik7XG4gICAgfVxuXG4gICAgbG9hZENvbG9ycyhkaXNhYmxlZCwgY2hlY2tlZCwgaG92ZXIpIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlZENvbG9yID0gZGlzYWJsZWQ7XG4gICAgICAgIHRoaXMuZW5hYmxlZENvbG9yID0gY2hlY2tlZDtcbiAgICAgICAgdGhpcy5ob3ZlckNvbG9yID0gaG92ZXI7XG4gICAgICAgIHRoaXMuY2hlY2tlZCA/IHRoaXMuYXBwbHlDb2xvcih0aGlzLmVuYWJsZWRDb2xvcikgOiB0aGlzLmFwcGx5Q29sb3IodGhpcy5kaXNhYmxlZENvbG9yKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge01ldGhvZH0gbWV0aG9kIFxuICAgICAqL1xuICAgIHdpdGhDbGlja0xpc3RlbmVyKG1ldGhvZCkge1xuICAgICAgICB0aGlzLmdldENoZWNrYm94KCkubGlzdGVuVG8oXCJjbGlja1wiLCBtZXRob2QpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIHRvZ2dsZSBzdGF0ZSBwcm9ncmFtbWF0aWNhbGx5XG4gICAgICogQHBhcmFtIHtib29sZWFufSBjaGVja2VkIFxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gc2lsZW50XG4gICAgICovXG4gICAgdG9nZ2xlKGNoZWNrZWQsIHNpbGVudCA9IGZhbHNlKSB7XG4gICAgICAgIGlmICh0aGlzLmNoZWNrZWQgPT09IGNoZWNrZWQpIHtcbiAgICAgICAgICAgIHJldHVybjsgLy8gTm8gY2hhbmdlXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jaGVja2VkID0gY2hlY2tlZDtcbiAgICAgICAgaWYgKCF0aGlzLmNvbXBvbmVudCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICghc2lsZW50KSB7XG4gICAgICAgICAgICB0aGlzLmdldENoZWNrYm94KCkuY29udGFpbmVyRWxlbWVudC5jbGljaygpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjaGVja2VkKSB7XG4gICAgICAgICAgICB0aGlzLmdldENoZWNrYm94KCkuY2hlY2tlZCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmdldENoZWNrYm94KCkuY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVmcmVzaENvbG9ycygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEByZXR1cm5zIHtDaGVja2JveElucHV0RWxlbWVudH1cbiAgICAgKi9cbiAgICBnZXRDaGVja2JveCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tcG9uZW50LmdldChcImNoZWNrYm94XCIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7Q29udGFpbmVyRXZlbnR9IGV2ZW50IFxuICAgICAqIEByZXR1cm5zIFxuICAgICAqL1xuICAgIGNoYW5nZWQoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5jaGVja2VkID0gZXZlbnQudGFyZ2V0LmNoZWNrZWQ7XG5cbiAgICAgICAgdGhpcy5yZWZyZXNoQ29sb3JzKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuY2hlY2tlZCkge1xuICAgICAgICAgICAgdGhpcy5ldmVudHMudHJpZ2dlcihUb2dnbGVJY29uLkVWRU5UX0VOQUJMRUQsIGV2ZW50KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5ldmVudHMudHJpZ2dlcihUb2dnbGVJY29uLkVWRU5UX0RJU0FCTEVELCBldmVudCk7XG4gICAgfVxuXG4gICAgYXBwbHlDb2xvcihjb2xvcikge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLmNvbXBvbmVudC5nZXQoXCJjb250YWluZXJcIik7XG4gICAgICAgIGNvbnRhaW5lci5zZXRBdHRyaWJ1dGVWYWx1ZShcInN0eWxlXCIsIFwiY29sb3I6IFwiICsgY29sb3IpO1xuICAgIH1cblxuICAgIGFwcGx5SWNvbihpY29uKSB7XG4gICAgICAgIGNvbnN0IGljb25FbGVtZW50ID0gdGhpcy5jb21wb25lbnQuZ2V0KFwiaWNvblwiKTtcbiAgICAgICAgaWNvbkVsZW1lbnQuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLCBpY29uKTtcbiAgICB9XG5cbiAgICBlbmFibGVIb3ZlcigpIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5jb21wb25lbnQuZ2V0KFwiY29udGFpbmVyXCIpO1xuICAgICAgICBpZiAoIXRoaXMuY2hlY2tlZCkge1xuICAgICAgICAgICAgY29udGFpbmVyLnNldEF0dHJpYnV0ZVZhbHVlKFwic3R5bGVcIiwgXCJjb2xvcjogXCIgKyB0aGlzLmhvdmVyQ29sb3IpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGlzYWJsZUhvdmVyKCkge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLmNvbXBvbmVudC5nZXQoXCJjb250YWluZXJcIik7XG4gICAgICAgIGlmICh0aGlzLmNoZWNrZWQpIHtcbiAgICAgICAgICAgIGNvbnRhaW5lci5zZXRBdHRyaWJ1dGVWYWx1ZShcInN0eWxlXCIsIFwiY29sb3I6IFwiICsgdGhpcy5lbmFibGVkQ29sb3IpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29udGFpbmVyLnNldEF0dHJpYnV0ZVZhbHVlKFwic3R5bGVcIiwgXCJjb2xvcjogXCIgKyB0aGlzLmRpc2FibGVkQ29sb3IpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5UeXBlQ29uZmlnUGFjay5pbnN0YW5jZSgpLmFkZFR5cGVDb25maWcoXCJudXR0aW4yYy11aVwiLCBQcm90b3R5cGVDb25maWcudW5uYW1lZChUb2dnbGVJY29uKSk7IiwiaW1wb3J0IHsgTG9nZ2VyLCBNZXRob2QgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcbmltcG9ydCB7IENvbXBvbmVudCxcblx0RXZlbnRNYW5hZ2VyLFxuXHRTaW1wbGVFbGVtZW50LFxuXHRTdGF0ZU1hbmFnZXIsXG5cdENvbXBvbmVudEJ1aWxkZXIsXG5cdElubGluZUNvbXBvbmVudEZhY3RvcnksXG5cdFN0eWxlU2VsZWN0b3JBY2Nlc3NvclxufSBmcm9tIFwibnV0dGluMmMtY29yZV92MVwiO1xuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQsIFByb3RvdHlwZUNvbmZpZywgUHJvdmlkZXIsIFR5cGVDb25maWdQYWNrIH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5pbXBvcnQgeyBQYW5lbCB9IGZyb20gXCIuLi8uLi9wYW5lbC9wYW5lbC5qc1wiO1xuaW1wb3J0IHsgUmFkaW9Ub2dnbGVJY29uIH0gZnJvbSBcIi4uLy4uL2lucHV0L3JhZGlvVG9nZ2xlSWNvbi9yYWRpb1RvZ2dsZUljb24uanNcIjtcbmltcG9ydCB7IENvbnRhaW5lckV2ZW50IH0gZnJvbSBcImNvbnRhaW5lcmJyaWRnZV92MVwiO1xuaW1wb3J0IHsgVG9nZ2xlSWNvbiB9IGZyb20gXCIuLi8uLi9pbnB1dC90b2dnbGVJY29uL3RvZ2dsZUljb24uanNcIjtcbmltcG9ydCB7IEJhbm5lckxhYmVsIH0gZnJvbSBcIi4uLy4uL2Jhbm5lckxhYmVsL2Jhbm5lckxhYmVsLmpzXCI7XG5cbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJUcmVlUGFuZWxFbnRyeVwiKTtcblxuZXhwb3J0IGNsYXNzIFRyZWVQYW5lbEVudHJ5IHtcblxuXHRzdGF0aWMgUkVDT1JEX0VMRU1FTlRfUkVRVUVTVEVEID0gXCJyZWNvcmRFbGVtZW50UmVxdWVzdGVkXCI7XG5cdHN0YXRpYyBCRUZPUkVfTE9BRF9FTEVNRU5UX1JFUVVFU1RFRCA9IFwiYmVmb3JlTG9hZEVsZW1lbnRSZXF1ZXN0ZWRcIjtcblx0c3RhdGljIFNVQl9SRUNPUkRTX1NUQVRFX1VQREFURV9SRVFVRVNURUQgPSBcInN1YlJlY29yZHNTdGF0ZVVwZGF0ZVJlcXVlc3RlZFwiO1xuXHRzdGF0aWMgRVZFTlRfRVhQQU5EX1RPR0dMRV9PVkVSUklERSA9IFwiZXhwYW5kVG9nZ2xlT3ZlcnJpZGVcIjtcblxuICAgIGNvbnN0cnVjdG9yKHJlY29yZCA9IG51bGwpIHtcblxuXHRcdC8qKiBAdHlwZSB7SW5saW5lQ29tcG9uZW50RmFjdG9yeX0gKi9cblx0XHR0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShJbmxpbmVDb21wb25lbnRGYWN0b3J5KTtcblxuXHRcdC8qKiBAdHlwZSB7Q29tcG9uZW50fSAqL1xuXHRcdHRoaXMuY29tcG9uZW50ID0gbnVsbDtcblxuXHRcdC8qKiBAdHlwZSB7UHJvdmlkZXI8UGFuZWw+fSAqL1xuXHRcdHRoaXMucGFuZWxQcm92aWRlciA9IEluamVjdGlvblBvaW50LnByb3ZpZGVyKFBhbmVsKTtcblxuXHRcdC8qKiBAdHlwZSB7RXZlbnRNYW5hZ2VyfSAqL1xuXHRcdHRoaXMuZXZlbnRNYW5hZ2VyID0gbmV3IEV2ZW50TWFuYWdlcigpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7U3RhdGVNYW5hZ2VyPGFueVtdPn0gKi9cbiAgICAgICAgdGhpcy5hcnJheVN0YXRlID0gbmV3IFN0YXRlTWFuYWdlcigpO1xuXG5cdFx0LyoqIEB0eXBlIHtQcm92aWRlcjxUcmVlUGFuZWxFbnRyeT59ICovXG5cdFx0dGhpcy50cmVlUGFuZWxFbnRyeVByb3ZpZGVyID0gSW5qZWN0aW9uUG9pbnQucHJvdmlkZXIoVHJlZVBhbmVsRW50cnkpO1xuXG5cdFx0LyoqIEB0eXBlIHtUb2dnbGVJY29ufSAqL1xuXHRcdHRoaXMuZXhwYW5kVG9nZ2xlID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoVG9nZ2xlSWNvbik7XG5cblx0XHQvKiogQHR5cGUge0Jhbm5lckxhYmVsfSAqL1xuXHRcdHRoaXMuYmFubmVyTGFiZWwgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShCYW5uZXJMYWJlbCk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHthbnl9ICovXG4gICAgICAgIHRoaXMucmVjb3JkID0gcmVjb3JkO1xuICAgIH1cblxuXHQvKipcblx0ICogXG5cdCAqIEBwYXJhbSB7Q29tcG9uZW50QnVpbGRlcn0gY29tcG9uZW50QnVpbGRlciBcblx0ICogQHJldHVybnMge0NvbXBvbmVudH1cblx0ICovXG5cdHN0YXRpYyBidWlsZENvbXBvbmVudChjb21wb25lbnRCdWlsZGVyKSB7XG5cdFx0cmV0dXJuIGNvbXBvbmVudEJ1aWxkZXJcblx0XHRcdC5yb290KFwiZGl2XCIsIFwiaWQ9cm9vdFwiLCBcInN0eWxlPS0td2lkdGgtMToxMHB0XCIsIFwiY2xhc3M9Y250ciBjbnRyLXJvd3MgY250ci1wcmV2ZW50LXNpemUtY2hhbmdlIGNudHItZ2FwLXNtYWxsXCIpXG5cdFx0XHQub3BlbigpXG5cdFx0XHRcdC5ub2RlKFwiZGl2XCIsIFwiaWQ9cmVjb3JkRWxlbWVudENvbnRhaW5lclwiLCBcImNsYXNzPWNudHIgY250ci1jb2x1bW5zIGNudHItZ3Jvdy1vbmx5IGNudHItZ2FwLXNtYWxsIGNudHItY2VudGVyZWRcIilcblx0XHRcdFx0Lm9wZW4oKVxuXHRcdFx0XHRcdC5ub2RlKFwiZGl2XCIsIFwiaWQ9ZXhwYW5kQnV0dG9uXCIsIFwiY2xhc3M9Y250ci1vdmVycmlkZS1wcmV2ZW50LXNpemUtY2hhbmdlXCIpXG5cdFx0XHRcdFx0Lm5vZGUoXCJkaXZcIiwgXCJjbGFzcz1jbnRyLW92ZXJyaWRlLXNocmluay1vbmx5IHNwaW5uZXItY29udGFpbmVyLWhpZGRlblwiLCBcImlkPXNwaW5uZXJcIilcblx0XHRcdFx0XHQub3BlbigpXG5cdFx0XHRcdFx0XHQubm9kZShcImRpdlwiLCBcImNsYXNzPXNwaW5uZXJcIilcblx0XHRcdFx0XHQuY2xvc2UoKVxuXHRcdFx0XHRcdC5ub2RlKFwiZGl2XCIsIFwiaWQ9cmVjb3JkRWxlbWVudFwiKVxuXHRcdFx0XHQuY2xvc2UoKVxuXG5cdFx0XHRcdC5ub2RlKFwiZGl2XCIsIFwiaWQ9bWVzc2FnZUNvbnRhaW5lclwiLCBcImNsYXNzPWNudHIgY250ci1jb2x1bW5zIGNudHItZ3Jvdy1vbmx5IGNudHItZ2FwLXNtYWxsIGNudHItY2VudGVyZWQgaGlkZGVuXCIpXG5cdFx0XHRcdC5vcGVuKClcblx0XHRcdFx0XHQubm9kZShcImRpdlwiLCBcImlkPW1lc3NhZ2VJbmRlbnRcIiwgXCJjbGFzcz1jbnRyLW92ZXJyaWRlLXByZXZlbnQtc2l6ZS1jaGFuZ2Ugd2lkdGgtMVwiKVxuXHRcdFx0XHRcdC5ub2RlKFwiZGl2XCIsIFwiaWQ9bWVzc2FnZVwiLCBcImNsYXNzPWNudHItZ2FwLXNtYWxsXCIpXG5cdFx0XHRcdC5jbG9zZSgpXG5cblx0XHRcdFx0Lm5vZGUoXCJkaXZcIiwgXCJpZD1idXR0b25zQ29udGFpbmVyXCIsIFwiY2xhc3M9Y250ciBjbnRyLWNvbHVtbnMgY250ci1ncm93LW9ubHkgY250ci1nYXAtc21hbGwgY250ci1jZW50ZXJlZCBoaWRkZW5cIilcblx0XHRcdFx0Lm9wZW4oKVxuXHRcdFx0XHRcdC5ub2RlKFwiZGl2XCIsIFwiaWQ9YnV0dG9uc0luZGVudFwiLCBcImNsYXNzPWNudHItb3ZlcnJpZGUtcHJldmVudC1zaXplLWNoYW5nZSB3aWR0aC0xXCIpXG5cdFx0XHRcdFx0Lm5vZGUoXCJkaXZcIiwgXCJpZD1idXR0b25zXCIsIFwiY2xhc3M9Y250ci1nYXAtc21hbGxcIilcblx0XHRcdFx0LmNsb3NlKClcblxuXHRcdFx0XHQubm9kZShcImRpdlwiLCBcImlkPXN1YnJlY29yZEVsZW1lbnRzQ29udGFpbmVyXCIsIFwiY2xhc3M9Y250ciBjbnRyLWNvbHVtbnMgY250ci1ncm93LW9ubHkgY250ci1nYXAtc21hbGwgY250ci1jZW50ZXJlZCBoaWRkZW5cIilcblx0XHRcdFx0Lm9wZW4oKVxuXHRcdFx0XHRcdC5ub2RlKFwiZGl2XCIsIFwiaWQ9c3VicmVjb3JkSW5kZW50XCIsIFwiY2xhc3M9Y250ci1vdmVycmlkZS1wcmV2ZW50LXNpemUtY2hhbmdlIHdpZHRoLTFcIilcblx0XHRcdFx0XHQubm9kZShcImRpdlwiLCBcImlkPXN1YnJlY29yZEVsZW1lbnRzXCIsIFwiY2xhc3M9Y250ciBjbnRyLXJvd3MgY250ci1nYXAtc21hbGxcIilcblx0XHRcdFx0LmNsb3NlKClcblx0XHRcdC5jbG9zZSgpXG5cdFx0XHQuYnVpbGQoKTtcblx0fVxuXG4gICAgYXN5bmMgcG9zdENvbmZpZygpIHtcblx0XHR0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoVHJlZVBhbmVsRW50cnkpO1xuXG5cdFx0dGhpcy5leHBhbmRUb2dnbGUuZXZlbnRzLmxpc3RlblRvKFJhZGlvVG9nZ2xlSWNvbi5FVkVOVF9FTkFCTEVELCB0aGlzLmxvYWRTdWJSZWNvcmRzQ2xpY2tlZCwgdGhpcyk7XG5cdFx0dGhpcy5leHBhbmRUb2dnbGUuZXZlbnRzLmxpc3RlblRvKFJhZGlvVG9nZ2xlSWNvbi5FVkVOVF9ESVNBQkxFRCwgdGhpcy5oaWRlU3ViUmVjb3Jkc0NsaWNrZWQsIHRoaXMpO1xuXG5cdFx0dGhpcy5jb21wb25lbnQuc2V0Q2hpbGQoXCJleHBhbmRCdXR0b25cIiwgdGhpcy5leHBhbmRUb2dnbGUuY29tcG9uZW50KTtcblxuXHRcdHRoaXMuYmFubmVyTGFiZWwuZXZlbnRzLmxpc3RlblRvKEJhbm5lckxhYmVsLkVWRU5UX0hJRERFTiwgdGhpcy5oaWRlTWVzc2FnZSwgdGhpcyk7XG5cblx0XHR0aGlzLmNvbXBvbmVudC5zZXRDaGlsZChcIm1lc3NhZ2VcIiwgdGhpcy5iYW5uZXJMYWJlbC5jb21wb25lbnQpO1xuXG4gICAgICAgIHRoaXMuYXJyYXlTdGF0ZS5yZWFjdChcblx0XHRcdG5ldyBNZXRob2QodGhpcy5oYW5kbGVEb21haW5DaGFuZ2UsIHRoaXMpLFxuXHRcdFx0bmV3IE1ldGhvZCh0aGlzLmhhbmRsZUVycm9yQ2hhbmdlLHRoaXMpKTtcblxuICAgIH1cblxuXHRhc3luYyBlbmFibGVCb3JkZXIoKSB7XG5cdFx0U3R5bGVTZWxlY3RvckFjY2Vzc29yLmZyb20odGhpcy5jb21wb25lbnQuZ2V0KFwicm9vdFwiKSkuZW5hYmxlKFwiY250ci1yb3VuZC1ib3JkZXJlZFwiKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAcmV0dXJucyB7IEV2ZW50TWFuYWdlciB9XG5cdCAqL1xuXHRnZXQgZXZlbnRzKCkgeyByZXR1cm4gdGhpcy5ldmVudE1hbmFnZXI7IH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgXG4gICAgICovXG4gICAgYXN5bmMgaGFuZGxlRG9tYWluQ2hhbmdlKG9iamVjdCkge1xuXHRcdGlmIChvYmplY3QgaW5zdGFuY2VvZiBBcnJheSkge1xuXG5cdFx0XHR0aGlzLmNvbXBvbmVudC5jbGVhckNoaWxkcmVuKFwic3VicmVjb3JkRWxlbWVudHNcIik7XG5cdFx0XHR0aGlzLnRvZ2dsZUNoaWxkRWxlbWVudHModHJ1ZSk7XG5cdFx0XHR0aGlzLnRvZ2dsZVNwaW5uZXIodHJ1ZSk7XG5cdFx0XHRvYmplY3QuZm9yRWFjaChhc3luYyAocmVjb3JkKSA9PiB7XG5cdFx0XHRcdHRoaXMuY29tcG9uZW50LmFkZENoaWxkKFwic3VicmVjb3JkRWxlbWVudHNcIiwgYXdhaXQgdGhpcy5jcmVhdGVTdWJFbnRyeShyZWNvcmQpKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0XHR0aGlzLnRvZ2dsZVNwaW5uZXIoZmFsc2UpO1xuICAgIH1cblxuXHRoYW5kbGVFcnJvckNoYW5nZShlcnJvcikge1xuXHRcdHRoaXMudG9nZ2xlRXJyb3JNb2RlKGVycm9yKTtcblx0fVxuXG5cdGFzeW5jIHRvZ2dsZUVycm9yTW9kZShlcnJvcikge1xuXHRcdGlmIChlcnJvcikge1xuXHRcdFx0dGhpcy5iYW5uZXJMYWJlbC5zaG93RXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cdFx0XHRTdHlsZVNlbGVjdG9yQWNjZXNzb3IuZnJvbSh0aGlzLmNvbXBvbmVudC5nZXQoXCJtZXNzYWdlQ29udGFpbmVyXCIpKS5kaXNhYmxlKFwiaGlkZGVuXCIpO1xuXHRcdFx0YXdhaXQgdGhpcy50b2dnbGVTcGlubmVyKGZhbHNlKTtcblx0XHRcdGF3YWl0IHRoaXMuaGlkZVN1YlJlY29yZHMoKTtcblx0XHRcdHRoaXMuZXhwYW5kVG9nZ2xlLnRvZ2dsZShmYWxzZSwgdHJ1ZSk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdHRoaXMuYmFubmVyTGFiZWwuaGlkZSgpO1xuXHRcdGF3YWl0IHRoaXMuaGlkZU1lc3NhZ2UoKTtcblx0fVxuXG5cdGFzeW5jIGhpZGVNZXNzYWdlKCkge1xuXHRcdFN0eWxlU2VsZWN0b3JBY2Nlc3Nvci5mcm9tKHRoaXMuY29tcG9uZW50LmdldChcIm1lc3NhZ2VDb250YWluZXJcIikpLmVuYWJsZShcImhpZGRlblwiKTtcblx0fVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHthbnl9IHJlY29yZCBcblx0ICogQHJldHVybnMge1NpbXBsZUVsZW1lbnR9XG4gICAgICovXG4gICAgYXN5bmMgY3JlYXRlU3ViRW50cnkocmVjb3JkKSB7XG5cdFx0Y29uc3QgdHJlZVBhbmVsU3ViRW50cnkgPSBhd2FpdCB0aGlzLnRyZWVQYW5lbEVudHJ5UHJvdmlkZXIuZ2V0KFtyZWNvcmRdKTtcblx0XHRjb25zdCByZWNvcmRFbGVtZW50ID0gYXdhaXQgdGhpcy5ldmVudE1hbmFnZXIudHJpZ2dlcihUcmVlUGFuZWxFbnRyeS5SRUNPUkRfRUxFTUVOVF9SRVFVRVNURUQsIFtudWxsLCByZWNvcmQsIHRyZWVQYW5lbFN1YkVudHJ5LCB0aGlzXSk7XG4gICAgICAgIFxuXHRcdGlmICghcmVjb3JkRWxlbWVudCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdHRyZWVQYW5lbFN1YkVudHJ5LmNvbXBvbmVudC5zZXRDaGlsZChcInJlY29yZEVsZW1lbnRcIiwgcmVjb3JkRWxlbWVudC5jb21wb25lbnQpO1xuXG5cdFx0YXdhaXQgdGhpcy5ldmVudE1hbmFnZXJcblx0XHRcdC50cmlnZ2VyKFRyZWVQYW5lbEVudHJ5LkVWRU5UX0VYUEFORF9UT0dHTEVfT1ZFUlJJREUsIFtudWxsLCB0cmVlUGFuZWxTdWJFbnRyeSwgcmVjb3JkXSk7XG5cblx0XHR0cmVlUGFuZWxTdWJFbnRyeS5ldmVudHNcblx0XHRcdC5saXN0ZW5UbyhUcmVlUGFuZWxFbnRyeS5SRUNPUkRfRUxFTUVOVF9SRVFVRVNURUQsIHRoaXMuZW50cnlSZXF1ZXN0ZWQsIHRoaXMpO1xuXG5cdFx0dHJlZVBhbmVsU3ViRW50cnkuZXZlbnRzXG5cdFx0XHQubGlzdGVuVG8oVHJlZVBhbmVsRW50cnkuRVZFTlRfRVhQQU5EX1RPR0dMRV9PVkVSUklERSwgdGhpcy5leHBhbmRUb2dnbGVPdmVycmlkZSwgdGhpcyk7XG5cblx0XHR0cmVlUGFuZWxTdWJFbnRyeS5ldmVudHNcblx0XHRcdC5saXN0ZW5UbyhUcmVlUGFuZWxFbnRyeS5TVUJfUkVDT1JEU19TVEFURV9VUERBVEVfUkVRVUVTVEVELCB0aGlzLnN1YlJlY29yZHNVcGRhdGVSZXF1ZXN0ZWQsIHRoaXMpO1xuXG5cdFx0cmV0dXJuIHRyZWVQYW5lbFN1YkVudHJ5LmNvbXBvbmVudDtcbiAgICB9XG5cblx0LyoqXG5cdCAqIEBwYXJhbSB7Q29udGFpbmVyRXZlbnR9IGV2ZW50IFxuXHQgKiBAcGFyYW0ge1RyZWVQYW5lbEVudHJ5fSB0cmVlUGFuZWxFbnRyeVxuXHQgKiBAcGFyYW0ge2FueX0gcmVjb3JkXG5cdCAqL1xuXHRhc3luYyBlbnRyeVJlcXVlc3RlZChldmVudCwgcmVjb3JkLCB0cmVlUGFuZWxFbnRyeSwgcGFyZW50VHJlZVBhbmVsRW50cnkpIHtcblx0XHR0cnkge1xuXHRcdFx0cmV0dXJuIGF3YWl0IHRoaXMuZXZlbnRzLnRyaWdnZXIoVHJlZVBhbmVsRW50cnkuUkVDT1JEX0VMRU1FTlRfUkVRVUVTVEVELCBbZXZlbnQsIHJlY29yZCwgdHJlZVBhbmVsRW50cnksIHBhcmVudFRyZWVQYW5lbEVudHJ5XSk7XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdExPRy5lcnJvcihlcnJvcik7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEBwYXJhbSB7Q29udGFpbmVyRXZlbnR9IGV2ZW50IFxuXHQgKiBAcGFyYW0ge1RyZWVQYW5lbEVudHJ5fSB0cmVlUGFuZWxFbnRyeVxuXHQgKiBAcGFyYW0ge2FueX0gcmVjb3JkXG5cdCAqL1xuXHRhc3luYyBleHBhbmRUb2dnbGVPdmVycmlkZShldmVudCwgdHJlZVBhbmVsRW50cnksIHJlY29yZCkge1xuXHRcdHRyeSB7XG5cdFx0XHRyZXR1cm4gYXdhaXQgdGhpcy5ldmVudHMudHJpZ2dlcihUcmVlUGFuZWxFbnRyeS5FVkVOVF9FWFBBTkRfVE9HR0xFX09WRVJSSURFLCBbZXZlbnQsIHRyZWVQYW5lbEVudHJ5LCByZWNvcmRdKTtcblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0TE9HLmVycm9yKGVycm9yKTtcblx0XHR9XG5cdH1cblxuXHRhc3luYyByZWxvYWRTdWJSZWNvcmRzKCkge1xuXHRcdGNvbnN0IGVsZW1lbnRCdXR0b25zQ29udGFpbmVyID0gYXdhaXQgdGhpcy5jb21wb25lbnQuZ2V0KFwiYnV0dG9uc1wiKTtcblx0XHRhd2FpdCB0aGlzLnN1YlJlY29yZHNVcGRhdGVSZXF1ZXN0ZWQobnVsbCwgdGhpcy5yZWNvcmQsIHRoaXMuYXJyYXlTdGF0ZSwgZWxlbWVudEJ1dHRvbnNDb250YWluZXIpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBwYXJhbSB7Q29udGFpbmVyRXZlbnR9IGV2ZW50IFxuXHQgKiBAcGFyYW0ge2FueX0gcmVjb3JkXG5cdCAqIEBwYXJhbSB7U3RhdGVNYW5hZ2VyPGFueVtdPn0gc3RhdGVNYW5hZ2VyXG5cdCAqIEBwYXJhbSB7U2ltcGxlRWxlbWVudH0gZWxlbWVudEJ1dHRvbnNDb250YWluZXJcblx0ICovXG5cdGFzeW5jIHN1YlJlY29yZHNVcGRhdGVSZXF1ZXN0ZWQoZXZlbnQsIHJlY29yZCwgc3RhdGVNYW5hZ2VyLCBlbGVtZW50QnV0dG9uc0NvbnRhaW5lcikge1xuXHRcdGF3YWl0IHRoaXMuZXZlbnRzXG5cdFx0XHQudHJpZ2dlcihUcmVlUGFuZWxFbnRyeS5TVUJfUkVDT1JEU19TVEFURV9VUERBVEVfUkVRVUVTVEVELCBbZXZlbnQsIHJlY29yZCwgc3RhdGVNYW5hZ2VyLCBlbGVtZW50QnV0dG9uc0NvbnRhaW5lcl0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gdmlzaWJsZSBcblx0ICovXG5cdGFzeW5jIHRvZ2dsZVNwaW5uZXIodmlzaWJsZSkge1xuXHRcdGlmICh2aXNpYmxlKSB7XG5cdFx0XHRTdHlsZVNlbGVjdG9yQWNjZXNzb3IuZnJvbSh0aGlzLmNvbXBvbmVudC5nZXQoXCJzcGlubmVyXCIpKS5kaXNhYmxlKFwic3Bpbm5lci1jb250YWluZXItaGlkZGVuXCIpO1xuXHRcdFx0U3R5bGVTZWxlY3RvckFjY2Vzc29yLmZyb20odGhpcy5jb21wb25lbnQuZ2V0KFwic3Bpbm5lclwiKSkuZW5hYmxlKFwic3Bpbm5lci1jb250YWluZXItdmlzaWJsZVwiKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0U3R5bGVTZWxlY3RvckFjY2Vzc29yLmZyb20odGhpcy5jb21wb25lbnQuZ2V0KFwic3Bpbm5lclwiKSkuZW5hYmxlKFwic3Bpbm5lci1jb250YWluZXItaGlkZGVuXCIpO1xuXHRcdFN0eWxlU2VsZWN0b3JBY2Nlc3Nvci5mcm9tKHRoaXMuY29tcG9uZW50LmdldChcInNwaW5uZXJcIikpLmRpc2FibGUoXCJzcGlubmVyLWNvbnRhaW5lci12aXNpYmxlXCIpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gdmlzaWJsZSBcblx0ICovXG5cdGFzeW5jIHRvZ2dsZUNoaWxkRWxlbWVudHModmlzaWJsZSkge1xuXHRcdGlmICh2aXNpYmxlKSB7XG5cdFx0XHRTdHlsZVNlbGVjdG9yQWNjZXNzb3IuZnJvbSh0aGlzLmNvbXBvbmVudC5nZXQoXCJzdWJyZWNvcmRFbGVtZW50c0NvbnRhaW5lclwiKSkuZGlzYWJsZShcImhpZGRlblwiKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0U3R5bGVTZWxlY3RvckFjY2Vzc29yLmZyb20odGhpcy5jb21wb25lbnQuZ2V0KFwic3VicmVjb3JkRWxlbWVudHNDb250YWluZXJcIikpLmVuYWJsZShcImhpZGRlblwiKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBcblx0ICogQHBhcmFtIHtCb29sZWFufSB2aXNpYmxlIFxuXHQgKi9cblx0YXN5bmMgdG9nZ2xlQnV0dG9ucyh2aXNpYmxlKSB7XG5cdFx0aWYgKHZpc2libGUpIHtcblx0XHRcdFN0eWxlU2VsZWN0b3JBY2Nlc3Nvci5mcm9tKHRoaXMuY29tcG9uZW50LmdldChcImJ1dHRvbnNDb250YWluZXJcIikpLmRpc2FibGUoXCJoaWRkZW5cIik7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdFN0eWxlU2VsZWN0b3JBY2Nlc3Nvci5mcm9tKHRoaXMuY29tcG9uZW50LmdldChcImJ1dHRvbnNDb250YWluZXJcIikpLmVuYWJsZShcImhpZGRlblwiKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAcGFyYW0ge0NvbnRhaW5lckV2ZW50fSBldmVudCBcblx0ICovXG4gICAgYXN5bmMgbG9hZFN1YlJlY29yZHNDbGlja2VkKGV2ZW50KSB7XG5cdFx0dGhpcy50b2dnbGVDaGlsZEVsZW1lbnRzKHRydWUpO1xuXHRcdHRoaXMudG9nZ2xlU3Bpbm5lcih0cnVlKTtcblxuXHRcdGNvbnN0IGVsZW1lbnRCdXR0b25zQ29udGFpbmVyID0gYXdhaXQgdGhpcy5jb21wb25lbnQuZ2V0KFwiYnV0dG9uc1wiKTtcblxuXHRcdGF3YWl0IHRoaXMuZXZlbnRNYW5hZ2VyXG5cdFx0XHQudHJpZ2dlcihUcmVlUGFuZWxFbnRyeS5TVUJfUkVDT1JEU19TVEFURV9VUERBVEVfUkVRVUVTVEVELCBbZXZlbnQsIHRoaXMucmVjb3JkLCB0aGlzLmFycmF5U3RhdGUsIGVsZW1lbnRCdXR0b25zQ29udGFpbmVyXSk7XG5cblx0XHRpZiAoZWxlbWVudEJ1dHRvbnNDb250YWluZXIuY29udGFpbmVyRWxlbWVudC5maXJzdENoaWxkKSB7XG5cdFx0XHRhd2FpdCB0aGlzLnRvZ2dsZUJ1dHRvbnModHJ1ZSk7XG5cdFx0fVxuICAgIH1cblxuXHQvKipcblx0ICogQHBhcmFtIHtDb250YWluZXJFdmVudH0gZXZlbnQgXG5cdCAqL1xuICAgIGFzeW5jIGhpZGVTdWJSZWNvcmRzQ2xpY2tlZChldmVudCkge1xuXHRcdGF3YWl0IHRoaXMuaGlkZVN1YlJlY29yZHMoKTtcbiAgICB9XG5cblx0YXN5bmMgaGlkZVN1YlJlY29yZHMoKSB7XG5cdFx0YXdhaXQgdGhpcy50b2dnbGVDaGlsZEVsZW1lbnRzKGZhbHNlKTtcblx0XHRhd2FpdCB0aGlzLnRvZ2dsZVNwaW5uZXIoZmFsc2UpO1xuXHRcdGF3YWl0IHRoaXMudG9nZ2xlQnV0dG9ucyhmYWxzZSk7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcInN1YnJlY29yZEVsZW1lbnRzXCIpLmNsZWFyKCk7XG5cdFx0dGhpcy5jb21wb25lbnQuZ2V0KFwiYnV0dG9uc1wiKS5jbGVhcigpO1xuXHR9XG5cbn1cblxuVHlwZUNvbmZpZ1BhY2suaW5zdGFuY2UoKS5hZGRUeXBlQ29uZmlnKFwibnV0dGluMmMtdWlcIiwgUHJvdG90eXBlQ29uZmlnLnVubmFtZWQoVHJlZVBhbmVsRW50cnkpKTsiLCJpbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcbmltcG9ydCB7IENvbnRhaW5lckV2ZW50IH0gZnJvbSBcImNvbnRhaW5lcmJyaWRnZV92MVwiO1xuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQsIFByb3RvdHlwZUNvbmZpZywgUHJvdmlkZXIsIFR5cGVDb25maWdQYWNrIH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5pbXBvcnQgeyBDb21wb25lbnQsXG5cdEV2ZW50TWFuYWdlcixcblx0U2ltcGxlRWxlbWVudCxcblx0Q29tcG9uZW50QnVpbGRlcixcblx0SW5saW5lQ29tcG9uZW50RmFjdG9yeSB9IGZyb20gXCJudXR0aW4yYy1jb3JlX3YxXCI7XG5cbmltcG9ydCB7IFRyZWVQYW5lbEVudHJ5IH0gZnJvbSBcIi4vdHJlZVBhbmVsRW50cnkvdHJlZVBhbmVsRW50cnkuanNcIjtcbmltcG9ydCB7IFBhbmVsIH0gZnJvbSBcIi4uL3BhbmVsL3BhbmVsLmpzXCI7XG5cblxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIlRyZWVQYW5lbFwiKTtcblxuZXhwb3J0IGNsYXNzIFRyZWVQYW5lbCB7XG5cblx0c3RhdGljIEVWRU5UX1JFRlJFU0hfQ0xJQ0tFRCA9IFwicmVmcmVzaENsaWNrZWRcIjtcblx0c3RhdGljIFJFQ09SRF9FTEVNRU5UX1JFUVVFU1RFRCA9IFwicmVjb3JkRWxlbWVudFJlcXVlc3RlZFwiO1xuXHRzdGF0aWMgQkVGT1JFX0xPQURfRUxFTUVOVF9SRVFVRVNURUQgPSBcImJlZm9yZUxvYWRFbGVtZW50UmVxdWVzdGVkXCI7XG5cdHN0YXRpYyBTVUJfUkVDT1JEU19TVEFURV9VUERBVEVfUkVRVUVTVEVEID0gXCJzdWJSZWNvcmRzU3RhdGVVcGRhdGVSZXF1ZXN0ZWRcIjtcblx0c3RhdGljIEVWRU5UX0VYUEFORF9UT0dHTEVfT1ZFUlJJREUgPSBcImV4cGFuZFRvZ2dsZU92ZXJyaWRlXCI7XG5cblx0LyoqXG5cdCAqIFxuXHQgKiBAcGFyYW0ge1BhbmVsfSBidXR0b25QYW5lbCBcblx0ICovXG5cdGNvbnN0cnVjdG9yKGJ1dHRvblBhbmVsID0gbnVsbCkge1xuXG5cdFx0LyoqIEB0eXBlIHtJbmxpbmVDb21wb25lbnRGYWN0b3J5fSAqL1xuXHRcdHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKElubGluZUNvbXBvbmVudEZhY3RvcnkpO1xuXHRcdFxuXHRcdC8qKiBAdHlwZSB7Q29tcG9uZW50fSAqL1xuXHRcdHRoaXMuY29tcG9uZW50ID0gbnVsbDtcblxuXHRcdC8qKiBAdHlwZSB7RXZlbnRNYW5hZ2VyfSAqL1xuXHRcdHRoaXMuZXZlbnRNYW5hZ2VyID0gbmV3IEV2ZW50TWFuYWdlcigpO1xuXG5cdFx0LyoqIEB0eXBlIHtQcm92aWRlcjxUcmVlUGFuZWxFbnRyeT59ICovXG5cdFx0dGhpcy50cmVlUGFuZWxFbnRyeVByb3ZpZXIgPSBJbmplY3Rpb25Qb2ludC5wcm92aWRlcihUcmVlUGFuZWxFbnRyeSk7XG5cblx0XHQvKiogQHR5cGUge1RyZWVQYW5lbEVudHJ5fSAqL1xuXHRcdHRoaXMudHJlZVBhbmVsRW50cnkgPSBudWxsO1xuXG5cdFx0LyoqIEB0eXBlIHtQYW5lbH0gKi9cblx0XHR0aGlzLmJ1dHRvblBhbmVsID0gYnV0dG9uUGFuZWw7XG5cblx0fVxuXG5cdC8qKlxuXHQgKiBcblx0ICogQHBhcmFtIHtDb21wb25lbnRCdWlsZGVyfSBjb21wb25lbnRCdWlsZGVyIFxuXHQgKiBAcmV0dXJucyB7Q29tcG9uZW50fVxuXHQgKi9cblx0c3RhdGljIGJ1aWxkQ29tcG9uZW50KGNvbXBvbmVudEJ1aWxkZXIpIHtcblx0XHRyZXR1cm4gY29tcG9uZW50QnVpbGRlclxuXHRcdFx0LnJvb3QoXCJkaXZcIiwgXCJjbGFzcz1jbnRyIGNudHItZ2FwLW1lZGl1bSBjbnRyLXJvd3MgY250ci1wcmV2ZW50LXNpemUtY2hhbmdlIHBhZGRpbmctc21hbGxcIilcblx0XHRcdC5vcGVuKClcblx0XHRcdFx0Lm5vZGUoXCJkaXZcIiwgXCJpZD1idXR0b25QYW5lbFwiKVxuXHRcdFx0XHQubm9kZShcImRpdlwiLCBcImlkPXJvb3RFbGVtZW50XCIsIFwiY2xhc3M9Y250ci1vdmVycmlkZS1ncm93LW9ubHkgY250ciBjbnRyLXJvd3MgY250ci1nYXAtc21hbGxcIilcblx0XHRcdC5jbG9zZSgpXG5cdFx0XHQuYnVpbGQoKTtcblx0fVxuXG5cdGFzeW5jIHBvc3RDb25maWcoKSB7XG5cdFx0dGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKFRyZWVQYW5lbCk7XG5cblx0XHRpZiAodGhpcy5idXR0b25QYW5lbCkge1xuXHRcdFx0dGhpcy5jb21wb25lbnQuc2V0Q2hpbGQoXCJidXR0b25QYW5lbFwiLCB0aGlzLmJ1dHRvblBhbmVsLmNvbXBvbmVudCk7XG5cdFx0fVxuXG5cdFx0dGhpcy50cmVlUGFuZWxFbnRyeSA9IGF3YWl0IHRoaXMudHJlZVBhbmVsRW50cnlQcm92aWVyLmdldCgpO1xuXHRcdHRoaXMudHJlZVBhbmVsRW50cnkuZXZlbnRzXG5cdFx0XHQubGlzdGVuVG8oVHJlZVBhbmVsRW50cnkuUkVDT1JEX0VMRU1FTlRfUkVRVUVTVEVELCB0aGlzLmVudHJ5UmVxdWVzdGVkLCB0aGlzKVxuXHRcdFx0Lmxpc3RlblRvKFRyZWVQYW5lbEVudHJ5LkVWRU5UX0VYUEFORF9UT0dHTEVfT1ZFUlJJREUsIHRoaXMuZXhwYW5kVG9nZ2xlT3ZlcnJpZGUsIHRoaXMpXG5cdFx0XHQubGlzdGVuVG8oVHJlZVBhbmVsRW50cnkuU1VCX1JFQ09SRFNfU1RBVEVfVVBEQVRFX1JFUVVFU1RFRCwgdGhpcy5zdWJSZWNvcmRzVXBkYXRlUmVxdWVzdGVkLCB0aGlzKTtcblx0XHR0aGlzLnRyZWVQYW5lbEVudHJ5LnRvZ2dsZVNwaW5uZXIodHJ1ZSk7XG5cdFx0Ly8gUm9vdCBlbGVtZW50IGhhcyBubyByZWNvcmRcblx0XHR0aGlzLnRyZWVQYW5lbEVudHJ5LmNvbXBvbmVudC5nZXQoXCJzdWJyZWNvcmRJbmRlbnRcIikucmVtb3ZlKCk7XG5cdFx0dGhpcy50cmVlUGFuZWxFbnRyeS5jb21wb25lbnQuZ2V0KFwibWVzc2FnZUluZGVudFwiKS5yZW1vdmUoKTtcblx0XHR0aGlzLnRyZWVQYW5lbEVudHJ5LmNvbXBvbmVudC5nZXQoXCJyZWNvcmRFbGVtZW50Q29udGFpbmVyXCIpLnJlbW92ZSgpO1xuXG5cdH1cblxuXHQvKipcblx0ICogQHR5cGUgeyBFdmVudE1hbmFnZXIgfVxuXHQgKi9cblx0Z2V0IGV2ZW50cygpIHsgcmV0dXJuIHRoaXMuZXZlbnRNYW5hZ2VyOyB9XG5cblx0LyoqXG5cdCAqIENhbGxlZCBieSB0aGUgcm9vdCBUcmVlUGFuZWxFbnRyeSB3aGVuIGl0J3Mgb3Igb25lIG9mIGl0J3Mgc3Vib3JkaW5hdGUgZWxlbWVudHMgbmVlZCB0byBiZSByZW5kZXJlZFxuXHQgKiBcblx0ICogQHBhcmFtIHtDb250YWluZXJFdmVudH0gZXZlbnQgXG5cdCAqIEBwYXJhbSB7VHJlZVBhbmVsRW50cnl9IHRyZWVQYW5lbEVudHJ5XG5cdCAqIEBwYXJhbSB7YW55fSByZWNvcmRcblx0ICovXG5cdGFzeW5jIGVudHJ5UmVxdWVzdGVkKGV2ZW50LCByZWNvcmQsIHRyZWVQYW5lbEVudHJ5LCBwYXJlbnRUcmVlUGFuZWxFbnRyeSkge1xuXHRcdHRyeSB7XG5cblx0XHRcdC8qKiBAdHlwZSB7YW55fSAqL1xuXHRcdFx0Y29uc3QgcGFuZWwgPSBhd2FpdCB0aGlzLmV2ZW50c1xuXHRcdFx0XHQudHJpZ2dlcihUcmVlUGFuZWwuUkVDT1JEX0VMRU1FTlRfUkVRVUVTVEVELCBbZXZlbnQsIHJlY29yZCwgdHJlZVBhbmVsRW50cnksIHBhcmVudFRyZWVQYW5lbEVudHJ5XSk7XG5cblx0XHRcdHJldHVybiBwYW5lbDtcblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0TE9HLmVycm9yKGVycm9yKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogQ2FsbGVkIGJ5IHRoZSByb290IFRyZWVQYW5lbEVudHJ5IGl0IGFza3MgZm9yIHRoZSBleHBhbmQgdG9nZ2xlIHRvIGJlIG92ZXJyaWRkZW5cblx0ICogXG5cdCAqIEBwYXJhbSB7Q29udGFpbmVyRXZlbnR9IGV2ZW50IFxuXHQgKiBAcGFyYW0ge1RyZWVQYW5lbEVudHJ5fSB0cmVlUGFuZWxFbnRyeVxuXHQgKiBAcGFyYW0ge2FueX0gcmVjb3JkXG5cdCAqL1xuXHRhc3luYyBleHBhbmRUb2dnbGVPdmVycmlkZShldmVudCwgdHJlZVBhbmVsRW50cnksIHJlY29yZCkge1xuXHRcdHRyeSB7XG5cdFx0XHRhd2FpdCB0aGlzLmV2ZW50c1xuXHRcdFx0XHQudHJpZ2dlcihUcmVlUGFuZWwuRVZFTlRfRVhQQU5EX1RPR0dMRV9PVkVSUklERSwgW3RyZWVQYW5lbEVudHJ5LmV4cGFuZFRvZ2dsZSwgcmVjb3JkXSk7XG5cblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0TE9HLmVycm9yKGVycm9yKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogQ2FsbGVkIGJ5IHRoZSByb290IFRyZWVQYW5lbEVudHJ5IHdoZW4gaXQncyBvciBvbmUgb2YgaXQncyBzdWJvcmRpbmF0ZSBlbGVtZW50cyBuZWVkIHRoZSBzdGF0ZSBvZiB0aGUgc3VicmVjb3JkcyB0byBiZSB1cGRhdGVkLFxuXHQgKiBmb3IgZXhhbXBsZSB3aGVuIHRoZSBleHBhbmQgYnV0dG9uIGlzIGNsaWNrZWRcblx0ICogXG5cdCAqIEBwYXJhbSB7Q29udGFpbmVyRXZlbnR9IGV2ZW50IFxuXHQgKiBAcGFyYW0ge2FueX0gcmVjb3JkXG5cdCAqIEBwYXJhbSB7U3RhdGVNYW5hZ2VyPGFueVtdPn0gc3RhdGVNYW5hZ2VyXG5cdCAqIEBwYXJhbSB7U2ltcGxlRWxlbWVudH0gZWxlbWVudEJ1dHRvbnNDb250YWluZXJcblx0ICogQHJldHVybnMge1Byb21pc2U8VHJlZVBhbmVsRW50cnlbXT59XG5cdCAqL1xuXHRhc3luYyBzdWJSZWNvcmRzVXBkYXRlUmVxdWVzdGVkKGV2ZW50LCByZWNvcmQsIHN0YXRlTWFuYWdlciwgZWxlbWVudEJ1dHRvbnNDb250YWluZXIpIHtcblx0XHR0aGlzLnRyZWVQYW5lbEVudHJ5LnRvZ2dsZUNoaWxkRWxlbWVudHModHJ1ZSk7XG5cdFx0YXdhaXQgdGhpcy5ldmVudHNcblx0XHRcdC50cmlnZ2VyKFRyZWVQYW5lbC5TVUJfUkVDT1JEU19TVEFURV9VUERBVEVfUkVRVUVTVEVELCBbZXZlbnQsIHJlY29yZCwgc3RhdGVNYW5hZ2VyLCBlbGVtZW50QnV0dG9uc0NvbnRhaW5lcl0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJlc2V0XG5cdCAqIFxuXHQgKiBAcGFyYW0ge0NvbnRhaW5lckV2ZW50fSBldmVudCBcblx0ICovXG5cdGFzeW5jIHJlc2V0KGV2ZW50KSB7XG5cdFx0dGhpcy5zdWJSZWNvcmRzVXBkYXRlUmVxdWVzdGVkKGV2ZW50LCBudWxsLCB0aGlzLnRyZWVQYW5lbEVudHJ5LmFycmF5U3RhdGUpO1xuXHRcdHRoaXMuY29tcG9uZW50LnNldENoaWxkKFwicm9vdEVsZW1lbnRcIiwgdGhpcy50cmVlUGFuZWxFbnRyeS5jb21wb25lbnQpO1xuXHR9XG59XG5cblR5cGVDb25maWdQYWNrLmluc3RhbmNlKCkuYWRkVHlwZUNvbmZpZyhcIm51dHRpbjJjLXVpXCIsIFByb3RvdHlwZUNvbmZpZy51bm5hbWVkKFRyZWVQYW5lbCkpOyIsImltcG9ydCB7XG4gICAgQ2FudmFzU3R5bGVzLFxuICAgIENvbXBvbmVudCxcbiAgICBJbnB1dEVsZW1lbnREYXRhQmluZGluZyxcbiAgICBTdHlsZXNoZWV0QnVpbGRlcixcbiAgICBTdHlsZXNoZWV0LFxuICAgIENvbXBvbmVudEJ1aWxkZXIsXG4gICAgSW5saW5lQ29tcG9uZW50RmFjdG9yeVxufSBmcm9tIFwibnV0dGluMmMtY29yZV92MVwiO1xuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQsIFByb3RvdHlwZUNvbmZpZywgVHlwZUNvbmZpZ1BhY2sgfSBmcm9tIFwibWluZGlfdjFcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiQ2hlY2tCb3hcIik7XG5cbmV4cG9ydCBjbGFzcyBDaGVja0JveCB7XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gbW9kZWxcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBtb2RlbCA9IG51bGwpIHtcbiAgICAgICAgXG4gICAgICAgIC8qKiBAdHlwZSB7SW5saW5lQ29tcG9uZW50RmFjdG9yeX0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoSW5saW5lQ29tcG9uZW50RmFjdG9yeSk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnR9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gbnVsbDtcblxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcblxuICAgICAgICAvKiogQHR5cGUge29iamVjdH0gKi9cbiAgICAgICAgdGhpcy5tb2RlbCA9IG1vZGVsO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHlsZXNoZWV0QnVpbGRlcn0gc3R5bGVzaGVldEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMge1N0eWxlc2hlZXR9XG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkU3R5bGVzaGVldChzdHlsZXNoZWV0QnVpbGRlcikge1xuICAgICAgICBzdHlsZXNoZWV0QnVpbGRlclxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmNoZWNrLWJveFwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIixcImJsb2NrXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIixcInJlbGF0aXZlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZy1sZWZ0XCIsXCIyZW1cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tYm90dG9tXCIsXCIwLjVlbVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImN1cnNvclwiLFwicG9pbnRlclwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIi13ZWJraXQtdXNlci1zZWxlY3RcIixcIm5vbmVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCItbW96LXVzZXItc2VsZWN0XCIsXCJub25lXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiLW1zLXVzZXItc2VsZWN0XCIsXCJub25lXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidXNlci1zZWxlY3RcIixcIm5vbmVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tYm90dG9tXCIsXCIxcmVtXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuY2hlY2stYm94IGlucHV0XCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIixcImFic29sdXRlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLFwiMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImN1cnNvclwiLFwicG9pbnRlclwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImhlaWdodFwiLFwiMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIndpZHRoXCIsXCIwXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuY2hlY2stYm94LW1hcmtcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLFwiYWJzb2x1dGVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0b3BcIixcIjBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJsZWZ0XCIsXCIwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwid2lkdGhcIixcImNhbGMoMWVtICsgMC41cmVtICsgMnB4KVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImhlaWdodFwiLFwiY2FsYygxZW0gKyAwLjVyZW0gKyAycHgpXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLFwiI2VlZVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmNoZWNrLWJveDpob3ZlciBpbnB1dCB+IC5jaGVjay1ib3gtbWFya1wiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIixcIiNjY2NcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5jaGVjay1ib3ggaW5wdXQ6Y2hlY2tlZCB+IC5jaGVjay1ib3gtbWFya1wiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIixcIiMyMTk2RjNcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5jaGVjay1ib3gtbWFyazphZnRlclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbnRlbnRcIixcIlxcXCJcXFwiXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIixcImFic29sdXRlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLFwibm9uZVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmNoZWNrLWJveCBpbnB1dDpjaGVja2VkIH4gLmNoZWNrLWJveC1tYXJrOmFmdGVyXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLFwiYmxvY2tcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5jaGVjay1ib3ggLmNoZWNrLWJveC1tYXJrOmFmdGVyXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibGVmdFwiLFwiMC41ZW1cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0b3BcIixcIjAuNGVtXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwid2lkdGhcIixcIjAuNmVtXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiaGVpZ2h0XCIsXCIwLjZlbVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlclwiLFwic29saWQgd2hpdGVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItd2lkdGhcIixcIjAgM3B4IDNweCAwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiLXdlYmtpdC10cmFuc2Zvcm1cIixcInJvdGF0ZSg0NWRlZylcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCItbXMtdHJhbnNmb3JtXCIsXCJyb3RhdGUoNDVkZWcpXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNmb3JtXCIsXCJyb3RhdGUoNDVkZWcpXCIpXG4gICAgICAgICAgICAuY2xvc2UoKTtcblxuICAgICAgICByZXR1cm4gc3R5bGVzaGVldEJ1aWxkZXIuYnVpbGQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudEJ1aWxkZXJ9IGNvbXBvbmVudEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMge0NvbXBvbmVudH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRDb21wb25lbnQoY29tcG9uZW50QnVpbGRlcikge1xuICAgICAgIGNvbXBvbmVudEJ1aWxkZXJcbiAgICAgICAgICAgIC5yb290KFwibGFiZWxcIiwgXCJpZD1jaGVjay1ib3hcIiwgXCJjbGFzcz1jaGVjay1ib3hcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAubm9kZShcImlucHV0XCIsIFwiaWQ9Y2hlY2tCb3hcIiwgXCJ0eXBlPWNoZWNrYm94XCIpXG4gICAgICAgICAgICAgICAgLm5vZGUoXCJzcGFuXCIsIFwiY2xhc3M9Y2hlY2stYm94LW1hcmtcIilcbiAgICAgICAgICAgICAgICAudGV4dChcIiBTdGF5IGxvZ2dlZCBpblwiKVxuICAgICAgICAgICAgLmNsb3NlKCk7XG4gICAgICAgIHJldHVybiBjb21wb25lbnRCdWlsZGVyLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgcG9zdENvbmZpZygpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKENoZWNrQm94KTtcbiAgICAgICAgQ2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKENoZWNrQm94Lm5hbWUpO1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJjaGVja0JveFwiKS5zZXRBdHRyaWJ1dGVWYWx1ZShcIm5hbWVcIix0aGlzLm5hbWUpO1xuXG4gICAgICAgIGlmKHRoaXMubW9kZWwpIHtcbiAgICAgICAgICAgIElucHV0RWxlbWVudERhdGFCaW5kaW5nLmxpbmsodGhpcy5tb2RlbCkudG8odGhpcy5jb21wb25lbnQuZ2V0KFwiY2hlY2tCb3hcIikpO1xuICAgICAgICB9XG4gICAgfVxuXG59XG5cblR5cGVDb25maWdQYWNrLmluc3RhbmNlKCkuYWRkVHlwZUNvbmZpZyhcIm51dHRpbjJjLXVpXCIsIFByb3RvdHlwZUNvbmZpZy51bm5hbWVkKENoZWNrQm94KSk7IiwiaW1wb3J0IHtcbiAgICBDYW52YXNTdHlsZXMsXG4gICAgQ29tcG9uZW50LFxuICAgIElucHV0RWxlbWVudERhdGFCaW5kaW5nLFxuICAgIEV2ZW50TWFuYWdlcixcbiAgICBTdHlsZXNoZWV0QnVpbGRlcixcbiAgICBTdHlsZXNoZWV0LFxuICAgIENvbXBvbmVudEJ1aWxkZXIsXG4gICAgSW5saW5lQ29tcG9uZW50RmFjdG9yeSxcbiAgICBDc3MzU3R5bGVzaGVldEJ1aWxkZXIsXG4gICAgU3R5bGVTZWxlY3RvckFjY2Vzc29yXG59IGZyb20gXCJudXR0aW4yYy1jb3JlX3YxXCI7XG5pbXBvcnQgeyBJbmplY3Rpb25Qb2ludCwgUHJvdG90eXBlQ29uZmlnLCBUeXBlQ29uZmlnUGFjayB9IGZyb20gXCJtaW5kaV92MVwiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5pbXBvcnQgeyBDb21tb25FdmVudHMgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbW1vbkV2ZW50c1wiO1xuaW1wb3J0IHsgQ29udGFpbmVyRXZlbnQgfSBmcm9tIFwiY29udGFpbmVyYnJpZGdlX3YxXCI7XG5cbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJFeHBhbmRDaGV2cm9uXCIpO1xuXG5leHBvcnQgY2xhc3MgRXhwYW5kQ2hldnJvbiB7XG4gICAgXG4gICAgc3RhdGljIEVWRU5UX0VOQUJMRUQgPSBDb21tb25FdmVudHMuRU5BQkxFRDtcbiAgICBzdGF0aWMgRVZFTlRfRElTQUJMRUQgPSBDb21tb25FdmVudHMuRElTQUJMRUQ7XG4gICAgc3RhdGljIEVWRU5UX0NIQU5HRUQgPSBDb21tb25FdmVudHMuQ0hBTkdFRDtcblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBtb2RlbFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzaXplXG4gICAgICovXG4gICAgY29uc3RydWN0b3IobW9kZWwgPSBudWxsLCBzaXplID0gXCJtZWRpdW1cIikge1xuICAgICAgICBcbiAgICAgICAgLyoqIEB0eXBlIHtJbmxpbmVDb21wb25lbnRGYWN0b3J5fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShJbmxpbmVDb21wb25lbnRGYWN0b3J5KTtcblxuICAgICAgICAvKiogQHR5cGUge0V2ZW50TWFuYWdlcn0gKi9cbiAgICAgICAgdGhpcy5ldmVudHMgPSBuZXcgRXZlbnRNYW5hZ2VyKCk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnR9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gbnVsbDtcblxuICAgICAgICAvKiogQHR5cGUge29iamVjdH0gKi9cbiAgICAgICAgdGhpcy5tb2RlbCA9IG1vZGVsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Ym9vbGVhbn0gKi9cbiAgICAgICAgdGhpcy5leHBhbmRlZCA9IGZhbHNlO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLnNpemUgPSBzaXplO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHlsZXNoZWV0QnVpbGRlcn0gc3R5bGVzaGVldEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMge1N0eWxlc2hlZXR9XG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkU3R5bGVzaGVldChzdHlsZXNoZWV0QnVpbGRlcikge1xuICAgICAgICBjb25zdCBjc3MzU3R5bGVzaGVldEJ1aWxkZXIgPSBDc3MzU3R5bGVzaGVldEJ1aWxkZXIuY3JlYXRlKHN0eWxlc2hlZXRCdWlsZGVyKTtcbiAgICAgICAgY3NzM1N0eWxlc2hlZXRCdWlsZGVyXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5leHBhbmQtY2hldnJvblwiKVxuICAgICAgICAgICAgICAgIC5jdXJzb3IoXCJwb2ludGVyXCIpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5leHBhbmQtY2hldnJvbiBpbnB1dFwiKVxuICAgICAgICAgICAgICAgIC5vcGFjaXR5KFwiMFwiKVxuICAgICAgICAgICAgICAgIC53aWR0aChcIjBcIilcbiAgICAgICAgICAgICAgICAuaGVpZ2h0KFwiMFwiKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuZXhwYW5kLWNoZXZyb24taWNvblwiKVxuICAgICAgICAgICAgICAgIC50cmFuc2l0aW9uKFtcInRyYW5zZm9ybVwiLCBcIi40c1wiXSlcbiAgICAgICAgICAgICAgICAudHJhbnNmb3JtKFwicm90YXRlKDBkZWcpIHRyYW5zbGF0ZVgoMClcIilcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmV4cGFuZC1jaGV2cm9uLWljb24tc21hbGxcIilcbiAgICAgICAgICAgICAgICAuZm9udFNpemUoXCIxZW1cIilcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5leHBhbmQtY2hldnJvbi1pY29uLW1lZGl1bVwiKVxuICAgICAgICAgICAgICAgIC5mb250U2l6ZShcIjEuNGVtXCIpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5leHBhbmQtY2hldnJvbi1pY29uLWxhcmdlXCIpXG4gICAgICAgICAgICAgICAgLmZvbnRTaXplKFwiMmVtXCIpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5leHBhbmQtY2hldnJvbiBpbnB1dDpjaGVja2VkICsgLmV4cGFuZC1jaGV2cm9uLWljb25cIilcbiAgICAgICAgICAgICAgICAudHJhbnNpdGlvbihbXCJ0cmFuc2Zvcm1cIiwgXCIuNHNcIl0pXG4gICAgICAgICAgICAgICAgLnRyYW5zZm9ybShcInJvdGF0ZSg5MGRlZykgdHJhbnNsYXRlWCgwKVwiKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuZXhwYW5kLWNoZXZyb24gaW5wdXQ6ZGlzYWJsZWQgKyAuZXhwYW5kLWNoZXZyb24taWNvblwiKVxuICAgICAgICAgICAgICAgIC5vcGFjaXR5KFwiMC42XCIpXG5cbiAgICAgICAgcmV0dXJuIGNzczNTdHlsZXNoZWV0QnVpbGRlci5idWlsZCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Q29tcG9uZW50QnVpbGRlcn0gY29ubXBvbmVudEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMge0NvbXBvbmVudH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRDb21wb25lbnQoY29ubXBvbmVudEJ1aWxkZXIpIHtcbiAgICAgICAgcmV0dXJuIGNvbm1wb25lbnRCdWlsZGVyXG4gICAgICAgICAgICAucm9vdChcImxhYmVsXCIsIFwiY2xhc3M9Y250ciBjbnRyLWNvbHVtbnMgY250ci1jZW50ZXJlZCBleHBhbmQtY2hldnJvblwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwiaW5wdXRcIiwgXCJpZD1jaGVja2JveFwiLCBcInR5cGU9Y2hlY2tib3hcIilcbiAgICAgICAgICAgICAgICAubm9kZShcImlcIiwgXCJpZD1pY29uXCIsIFwiY2xhc3M9ZXhwYW5kLWNoZXZyb24taWNvbiBmYXMgZmEtY2hldnJvbi1yaWdodFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgIC5idWlsZCgpO1xuICAgIH1cblxuICAgIHBvc3RDb25maWcoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZShFeHBhbmRDaGV2cm9uKTtcbiAgICAgICAgQ2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKEV4cGFuZENoZXZyb24ubmFtZSk7XG5cbiAgICAgICAgaWYgKHRoaXMubW9kZWwpIHtcbiAgICAgICAgICAgIElucHV0RWxlbWVudERhdGFCaW5kaW5nLmxpbmsodGhpcy5tb2RlbCkudG8odGhpcy5jb21wb25lbnQuZ2V0KFwiY2hlY2tib3hcIikpO1xuICAgICAgICB9XG5cbiAgICAgICAgU3R5bGVTZWxlY3RvckFjY2Vzc29yLmZyb20odGhpcy5jb21wb25lbnQuZ2V0KFwiaWNvblwiKSkuZW5hYmxlKGBleHBhbmQtY2hldnJvbi1pY29uLSR7dGhpcy5zaXplfWApO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiY2hlY2tib3hcIikubGlzdGVuVG8oXCJjaGFuZ2VcIiwgdGhpcy5jbGlja2VkLCB0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbnRhaW5lckV2ZW50fSBldmVudCBcbiAgICAgKi9cbiAgICBjbGlja2VkKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBjb25zdCBvbGRWYWx1ZSA9IHRoaXMuZXhwYW5kZWQ7XG4gICAgICAgIHRoaXMuZXhwYW5kZWQgPSBldmVudC50YXJnZXQuY2hlY2tlZDtcblxuICAgICAgICBpZiAob2xkVmFsdWUgIT09IHRoaXMuZXhwYW5kZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzLnRyaWdnZXIoRXhwYW5kQ2hldnJvbi5FVkVOVF9DSEFOR0VELCBbZXZlbnQsIHRoaXMuZXhwYW5kZWRdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmV4cGFuZGVkKSB7XG4gICAgICAgICAgICB0aGlzLmV2ZW50cy50cmlnZ2VyKEV4cGFuZENoZXZyb24uRVZFTlRfRU5BQkxFRCwgW2V2ZW50XSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmV2ZW50cy50cmlnZ2VyKEV4cGFuZENoZXZyb24uRVZFTlRfRElTQUJMRUQsIFtldmVudF0pO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgdG9nZ2xlIHN0YXRlIHByb2dyYW1tYXRpY2FsbHlcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGV4cGFuZGVkIFxuICAgICAqL1xuICAgIHRvZ2dsZShleHBhbmRlZCkge1xuICAgICAgICBpZiAodGhpcy5leHBhbmRlZCA9PT0gZXhwYW5kZWQpIHtcbiAgICAgICAgICAgIHJldHVybjsgLy8gTm8gY2hhbmdlXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5leHBhbmRlZCA9IGV4cGFuZGVkO1xuICAgICAgICBpZiAodGhpcy5jb21wb25lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImNoZWNrYm94XCIpLmNvbnRhaW5lckVsZW1lbnQuY2xpY2soKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgY3VycmVudCB0b2dnbGUgc3RhdGVcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBpc0V4cGFuZGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5leHBhbmRlZDtcbiAgICB9XG5cbn1cblxuVHlwZUNvbmZpZ1BhY2suaW5zdGFuY2UoKS5hZGRUeXBlQ29uZmlnKFwibnV0dGluMmMtdWlcIiwgUHJvdG90eXBlQ29uZmlnLnVubmFtZWQoRXhwYW5kQ2hldnJvbikpOyIsImltcG9ydCB7IENvbXBvbmVudCwgQ29tcG9uZW50QnVpbGRlciwgQ3NzM1N0eWxlc2hlZXRCdWlsZGVyLCBFbWFpbFZhbGlkYXRvciwgU3R5bGVzaGVldCwgU3R5bGVzaGVldEJ1aWxkZXIgfSBmcm9tIFwibnV0dGluMmMtY29yZV92MVwiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5pbXBvcnQgeyBDb21tb25JbnB1dCB9IGZyb20gXCIuLi9jb21tb25JbnB1dC5qc1wiO1xuaW1wb3J0IHsgUHJvdG90eXBlQ29uZmlnLCBUeXBlQ29uZmlnUGFjayB9IGZyb20gXCJtaW5kaV92MVwiO1xuXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiRW1haWxJbnB1dFwiKTtcblxuZXhwb3J0IGNsYXNzIEVtYWlsSW5wdXQgZXh0ZW5kcyBDb21tb25JbnB1dCB7XG5cbiAgICBzdGF0aWMgREVGQVVMVF9MQUJFTCA9IFwiRW1haWxcIjtcblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG1vZGVsXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxhYmVsXG4gICAgICogQHBhcmFtIHtib29sZWFufSBtYW5kYXRvcnlcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBtb2RlbCA9IG51bGwsIGxhYmVsID0gRW1haWxJbnB1dC5ERUZBVUxUX0xBQkVMLCBtYW5kYXRvcnkgPSBmYWxzZSkge1xuXG4gICAgICAgIHN1cGVyKEVtYWlsSW5wdXQsXG4gICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgbW9kZWwsXG4gICAgICAgICAgICBuZXcgRW1haWxWYWxpZGF0b3IobWFuZGF0b3J5LCAhbWFuZGF0b3J5KSxcbiAgICAgICAgICAgIGxhYmVsLFxuICAgICAgICAgICAgXCJJbnZhbGlkIGVtYWlsIGFkZHJlc3NcIik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtTdHlsZXNoZWV0QnVpbGRlcn0gc3R5bGVzaGVldEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMge1N0eWxlc2hlZXR9XG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkU3R5bGVzaGVldChzdHlsZXNoZWV0QnVpbGRlcikge1xuICAgICAgICBDc3MzU3R5bGVzaGVldEJ1aWxkZXIuY3JlYXRlKHN0eWxlc2hlZXRCdWlsZGVyKVxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmVtYWlsLWlucHV0LWNvbnRhaW5lclwiKVxuICAgICAgICAgICAgICAgIC5wb3NpdGlvbihcInJlbGF0aXZlXCIpXG4gICAgICAgICAgICAgICAgLnBhZGRpbmcoXCIwLjVyZW1cIilcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmVtYWlsLWlucHV0LWVudHJ5XCIpXG4gICAgICAgICAgICAgICAgLmRpc3BsYXkoXCJibG9ja1wiKVxuICAgICAgICAgICAgICAgIC53aWR0aChcIjEwMCVcIilcbiAgICAgICAgICAgICAgICAuaGVpZ2h0KFwiY2FsYygxLjVlbSArIDFyZW0gKyAycHgpXCIpXG4gICAgICAgICAgICAgICAgLnBhZGRpbmcoXCIwLjdyZW1cIiwgXCIwLjc1cmVtXCIsIFwiMC4zcmVtXCIsIFwiMC43NXJlbVwiKVxuICAgICAgICAgICAgICAgIC5mb250U2l6ZShcIjFyZW1cIilcbiAgICAgICAgICAgICAgICAuZm9udFdlaWdodChcIjQwMFwiKVxuICAgICAgICAgICAgICAgIC5saW5lSGVpZ2h0KFwiMS41XCIpXG4gICAgICAgICAgICAgICAgLmNvbG9yKFwiIzQ5NTA1N1wiKVxuICAgICAgICAgICAgICAgIC5iYWNrZ3JvdW5kQ29sb3IoXCIjZmZmXCIpXG4gICAgICAgICAgICAgICAgLmJhY2tncm91bmRDbGlwKFwicGFkZGluZy1ib3hcIilcbiAgICAgICAgICAgICAgICAuYm9yZGVyKFwiMXB4XCIsIFwic29saWRcIiwgXCIjY2VkNGRhXCIpXG4gICAgICAgICAgICAgICAgLmJvcmRlclJhZGl1cyhcIjAuMjVyZW1cIilcbiAgICAgICAgICAgICAgICAudHJhbnNpdGlvbihcbiAgICAgICAgICAgICAgICAgICAgW1wiYm9yZGVyLWNvbG9yXCIsIFwiMC4xNXNcIiwgbnVsbCwgXCJlYXNlLWluLW91dFwiXSxcbiAgICAgICAgICAgICAgICAgICAgW1wiYm94LXNoYWRvd1wiLCBcIjAuMTVzXCIsIG51bGwsIFwiZWFzZS1pbi1vdXRcIl0pXG4gICAgICAgICAgICAgICAgLm1hcmdpbihudWxsLG51bGwsXCIxcmVtXCIsbnVsbClcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5lbWFpbC1sYWJlbFwiKVxuICAgICAgICAgICAgICAgIC5iYWNrZ3JvdW5kQ29sb3IoXCIjZmZmXCIpXG4gICAgICAgICAgICAgICAgLnBvc2l0aW9uKFwiYWJzb2x1dGVcIilcbiAgICAgICAgICAgICAgICAucGFkZGluZyhcIjBcIiwgXCIwLjI1cmVtXCIsIFwiMFwiLCBcIjAuMjVyZW1cIilcbiAgICAgICAgICAgICAgICAuYm9yZGVyUmFkaXVzKFwiMC41cmVtXCIpXG4gICAgICAgICAgICAgICAgLnRvcChcIi0wLjFyZW1cIilcbiAgICAgICAgICAgICAgICAubGVmdChcIjAuNHJlbVwiKVxuICAgICAgICAgICAgICAgIC5tYXJnaW4oXCIwXCIsIG51bGwsIFwiMC41cmVtXCIsIG51bGwpXG4gICAgICAgICAgICAgICAgLmZvbnRTaXplKFwiMC45cmVtXCIpXG4gICAgICAgICAgICAgICAgLmZvbnRXZWlnaHQoXCJib2xkXCIpXG4gICAgICAgICAgICAgICAgLmNvbG9yKFwiIzhhOGE4YVwiKTtcblxuICAgICAgICByZXR1cm4gc3R5bGVzaGVldEJ1aWxkZXIuYnVpbGQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudEJ1aWxkZXJ9IGNvbXBvbmVudEJ1aWxkZXIgXG4gICAgICogQHJldHVybiB7Q29tcG9uZW50fVxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZENvbXBvbmVudChjb21wb25lbnRCdWlsZGVyKSB7XG4gICAgICAgY29tcG9uZW50QnVpbGRlclxuICAgICAgICAgICAgLnJvb3QoXCJkaXZcIiwgXCJjbGFzcz1lbWFpbC1pbnB1dC1jb250YWluZXJcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAubm9kZShcImRpdlwiLCBcImlkPWJ1YmJsZU1lc3NhZ2VcIilcbiAgICAgICAgICAgICAgICAubm9kZShcImxhYmVsXCIsIFwiaWQ9bGFiZWxcIiwgXCJjbGFzcz1lbWFpbC1sYWJlbCBoaWRkZW5cIilcbiAgICAgICAgICAgICAgICAubm9kZShcImlucHV0XCIsIFwiaWQ9aW5wdXRcIiwgXCJ0eXBlPXRleHRcIiwgXCJjbGFzcz1lbWFpbC1pbnB1dC1lbnRyeVwiKVxuICAgICAgICAgICAgLmNsb3NlKCk7XG4gICAgICAgIHJldHVybiBjb21wb25lbnRCdWlsZGVyLmJ1aWxkKCk7XG4gICAgfVxuXG59XG5cblR5cGVDb25maWdQYWNrLmluc3RhbmNlKCkuYWRkVHlwZUNvbmZpZyhcIm51dHRpbjJjLXVpXCIsIFByb3RvdHlwZUNvbmZpZy51bm5hbWVkKEVtYWlsSW5wdXQpKTsiLCJpbXBvcnQgeyBDb250YWluZXJFdmVudCwgQ29udGFpbmVyRmlsZURhdGEgfSBmcm9tIFwiY29udGFpbmVyYnJpZGdlX3YxXCI7XG5pbXBvcnQgeyBDYW52YXNTdHlsZXMsXG4gICAgQ29tcG9uZW50LFxuICAgIEV2ZW50TWFuYWdlcixcbiAgICBTdHlsZXNoZWV0QnVpbGRlcixcbiAgICBTdHlsZXNoZWV0LFxuICAgIENvbXBvbmVudEJ1aWxkZXIsXG4gICAgSW5saW5lQ29tcG9uZW50RmFjdG9yeVxufSBmcm9tIFwibnV0dGluMmMtY29yZV92MVwiO1xuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQsIFByb3RvdHlwZUNvbmZpZywgVHlwZUNvbmZpZ1BhY2sgfSBmcm9tIFwibWluZGlfdjFcIjtcblxuZXhwb3J0IGNsYXNzIEZpbGVVcGxvYWRFbnRyeSB7XG4gICAgXG4gICAgc3RhdGljIEVWRU5UX1JFTU9WRV9DTElDS0VEID0gXCJyZW1vdmVDbGlja2VkXCI7XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbnRhaW5lckZpbGVEYXRhfSBmaWxlIFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGZpbGUpIHtcblxuICAgICAgICAvKiogQHR5cGUge0lubGluZUNvbXBvbmVudEZhY3Rvcnl9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKElubGluZUNvbXBvbmVudEZhY3RvcnkpO1xuICAgICAgICBcbiAgICAgICAgLyoqIEB0eXBlIHtFdmVudE1hbmFnZXJ9ICovXG4gICAgICAgIHRoaXMuZXZlbnRzID0gbmV3IEV2ZW50TWFuYWdlcigpO1xuICAgICAgICBcbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnR9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gbnVsbDtcbiAgICAgICAgXG4gICAgICAgIC8qKiBAdHlwZSB7Q29udGFpbmVyRmlsZURhdGF9ICovXG4gICAgICAgIHRoaXMuZmlsZSA9IGZpbGU7XG4gICAgICAgIFxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5maWxlTmFtZSA9IGZpbGUubmFtZTtcbiAgICAgICAgXG4gICAgICAgIC8qKiBAdHlwZSB7bnVtYmVyfSAqL1xuICAgICAgICB0aGlzLmZpbGVTaXplID0gZmlsZS5zaXplO1xuICAgICAgICBcbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMuZmlsZVR5cGUgPSBmaWxlLnR5cGU7XG4gICAgfVxuICAgIFxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3R5bGVzaGVldEJ1aWxkZXJ9IHN0eWxlc2hlZXRCdWlsZGVyIFxuICAgICAqIEByZXR1cm5zIHtTdHlsZXNoZWV0fVxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZFN0eWxlc2hlZXQoc3R5bGVzaGVldEJ1aWxkZXIpIHtcbiAgICAgICBzdHlsZXNoZWV0QnVpbGRlclxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmZpbGUtdXBsb2FkLWVudHJ5XCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyLXRvcFwiLCBcIjFweCBzb2xpZCAjZGRkXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZy10b3BcIiwgXCI1cHRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tdG9wXCIsIFwiMTBwdFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmZpbGUtdXBsb2FkLWVudHJ5LWRldGFpbHNcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIFwiZmxleFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZsZXgtZGlyZWN0aW9uXCIsIFwicm93XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYWxpZ24taXRlbXNcIiwgXCJjZW50ZXJcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tYm90dG9tXCIsIFwiOHB4XCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuZmlsZS11cGxvYWQtZW50cnktZGV0YWlscy1uYW1lXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZmxleFwiLCBcIjFcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmb250LXdlaWdodFwiLCBcIjUwMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpbi1yaWdodFwiLCBcIjEycHhcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5maWxlLXVwbG9hZC1lbnRyeS1kZXRhaWxzLXR5cGVcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmbGV4XCIsIFwiMCAwIGF1dG9cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjb2xvclwiLCBcIiM2NjZcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmb250LXNpemVcIiwgXCIwLjllbVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpbi1yaWdodFwiLCBcIjEycHhcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5maWxlLXVwbG9hZC1lbnRyeS1yZW1vdmVcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmbGV4XCIsIFwiMCAwIGF1dG9cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tbGVmdFwiLCBcImF1dG9cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjdXJzb3JcIiwgXCJwb2ludGVyXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCJncmF5XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZ1wiLCBcIjRweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1yYWRpdXNcIiwgXCI0cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2l0aW9uXCIsIFwiYmFja2dyb3VuZC1jb2xvciAwLjJzXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuZmlsZS11cGxvYWQtZW50cnktcmVtb3ZlOmhvdmVyXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiNmOGY5ZmFcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5maWxlLXVwbG9hZC1lbnRyeS1wcm9ncmVzc1wiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgXCJmbGV4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZmxleC1kaXJlY3Rpb25cIiwgXCJyb3dcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJhbGlnbi1pdGVtc1wiLCBcImNlbnRlclwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImdhcFwiLCBcIjEycHhcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5maWxlLXVwbG9hZC1lbnRyeS1wcm9ncmVzcy1zaXplXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZmxleFwiLCBcIjAgMCBhdXRvXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZm9udC1zaXplXCIsIFwiMC45ZW1cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjb2xvclwiLCBcIiM2NjZcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtaW4td2lkdGhcIiwgXCI4MHB4XCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuZmlsZS11cGxvYWQtZW50cnktcHJvZ3Jlc3MtYmFyXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZmxleFwiLCBcIjFcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJoZWlnaHRcIiwgXCI4cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiI2U5ZWNlZlwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1yYWRpdXNcIiwgXCI0cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJvdmVyZmxvd1wiLCBcImhpZGRlblwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBvc2l0aW9uXCIsIFwicmVsYXRpdmVcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5maWxlLXVwbG9hZC1lbnRyeS1wcm9ncmVzcy1iYXItZmlsbFwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImhlaWdodFwiLCBcIjEwMCVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiIzI4YTc0NVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1yYWRpdXNcIiwgXCI0cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2l0aW9uXCIsIFwid2lkdGggMC4zcyBlYXNlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwid2lkdGhcIiwgXCIwJVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmZpbGUtdXBsb2FkLWVudHJ5LXByb2dyZXNzLXN0YXR1c1wiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZsZXhcIiwgXCIwIDAgYXV0b1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtc2l6ZVwiLCBcIjAuOWVtXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCIjNjY2XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWluLXdpZHRoXCIsIFwiODBweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRleHQtYWxpZ25cIiwgXCJyaWdodFwiKVxuICAgICAgICAgICAgLmNsb3NlKCk7XG5cbiAgICAgICAgcmV0dXJuIHN0eWxlc2hlZXRCdWlsZGVyLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDb21wb25lbnRCdWlsZGVyfSBjb21wb25lbnRCdWlsZGVyIFxuICAgICAqIEByZXR1cm5zIHtDb21wb25lbnR9XG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkQ29tcG9uZW50KGNvbXBvbmVudEJ1aWxkZXIpIHtcbiAgICAgICAgY29tcG9uZW50QnVpbGRlclxuICAgICAgICAgICAgLnJvb3QoXCJkaXZcIiwgXCJjbGFzcz1maWxlLXVwbG9hZC1lbnRyeVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwiZGl2XCIsIFwiY2xhc3M9ZmlsZS11cGxvYWQtZW50cnktZGV0YWlsc1wiKVxuICAgICAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAgICAgLm5vZGUoXCJkaXZcIiwgXCJpZD1maWxlTmFtZVwiLCBcImNsYXNzPWZpbGUtdXBsb2FkLWVudHJ5LWRldGFpbHMtbmFtZVwiKVxuICAgICAgICAgICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgICAgICAgICAudGV4dChcIkZpbGVuYW1lXCIpXG4gICAgICAgICAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAgICAgICAgIC5ub2RlKFwiZGl2XCIsIFwiaWQ9ZmlsZVR5cGVcIiwgXCJjbGFzcz1maWxlLXVwbG9hZC1lbnRyeS1kZXRhaWxzLXR5cGVcIilcbiAgICAgICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRleHQoXCJGaWxlIFR5cGVcIilcbiAgICAgICAgICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgICAgICAgICAgLm5vZGUoXCJkaXZcIiwgXCJpZD1yZW1vdmVCdXR0b25cIiwgXCJjbGFzcz1maWxlLXVwbG9hZC1lbnRyeS1yZW1vdmVcIilcbiAgICAgICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm5vZGUoXCJpXCIsIFwiY2xhc3M9ZmFzIGZhLXRyYXNoXCIpXG4gICAgICAgICAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgICAgICAubm9kZShcImRpdlwiLCBcImNsYXNzPWZpbGUtdXBsb2FkLWVudHJ5LXByb2dyZXNzXCIpXG4gICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAubm9kZShcImRpdlwiLCBcImlkPWZpbGVTaXplXCIsIFwiY2xhc3M9ZmlsZS11cGxvYWQtZW50cnktcHJvZ3Jlc3Mtc2l6ZVwiKVxuICAgICAgICAgICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgICAgICAgICAudGV4dChcIkZpbGUgU2l6ZVwiKVxuICAgICAgICAgICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgICAgICAgICAubm9kZShcImRpdlwiLCBcImNsYXNzPWZpbGUtdXBsb2FkLWVudHJ5LXByb2dyZXNzLWJhclwiLCBcImlkPWZpbGVQcm9ncmVzc1wiKVxuICAgICAgICAgICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgICAgICAgICAubm9kZShcImRpdlwiLCBcImNsYXNzPWZpbGUtdXBsb2FkLWVudHJ5LXByb2dyZXNzLWJhci1maWxsXCIsIFwiaWQ9ZmlsZVByb2dyZXNzQmFyXCIpXG4gICAgICAgICAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAgICAgICAgIC5ub2RlKFwiZGl2XCIsIFwiaWQ9ZmlsZVN0YXR1c1wiLCBcImNsYXNzPWZpbGUtdXBsb2FkLWVudHJ5LXByb2dyZXNzLXN0YXR1c1wiKVxuICAgICAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAuY2xvc2UoKTtcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudEJ1aWxkZXIuYnVpbGQoKTtcbiAgICB9XG5cbiAgICBhc3luYyBwb3N0Q29uZmlnKCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoRmlsZVVwbG9hZEVudHJ5KTtcbiAgICAgICAgQ2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKEZpbGVVcGxvYWRFbnRyeS5uYW1lKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGZpbGVOYW1lRWxlbWVudCA9IHRoaXMuY29tcG9uZW50LmdldChcImZpbGVOYW1lXCIpO1xuICAgICAgICBmaWxlTmFtZUVsZW1lbnQuc2V0Q2hpbGQodGhpcy5maWxlTmFtZSk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBmaWxlU2l6ZUVsZW1lbnQgPSB0aGlzLmNvbXBvbmVudC5nZXQoXCJmaWxlU2l6ZVwiKTtcbiAgICAgICAgZmlsZVNpemVFbGVtZW50LnNldENoaWxkKCh0aGlzLmZpbGVTaXplIC8gMTAyNCkudG9GaXhlZCgyKSArIFwiIEtCXCIpO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgZmlsZVR5cGVFbGVtZW50ID0gdGhpcy5jb21wb25lbnQuZ2V0KFwiZmlsZVR5cGVcIik7XG4gICAgICAgIGZpbGVUeXBlRWxlbWVudC5zZXRDaGlsZCh0aGlzLmZpbGVUeXBlID8gdGhpcy5maWxlVHlwZSA6IFwiVW5rbm93blwiKTtcblxuICAgICAgICBjb25zdCByZW1vdmVCdXR0b24gPSB0aGlzLmNvbXBvbmVudC5nZXQoXCJyZW1vdmVCdXR0b25cIik7XG4gICAgICAgIHJlbW92ZUJ1dHRvbi5saXN0ZW5UbyhcImNsaWNrXCIsIHRoaXMucmVtb3ZlQ2xpa2VkLCB0aGlzKTtcblxuICAgICAgICB0aGlzLnVwZGF0ZVByb2dyZXNzKHRoaXMuZmlsZSwgdGhpcy5maWxlLm5hbWUpO1xuXG4gICAgICAgIFxuICAgIH1cbiAgICBcbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbnRhaW5lckV2ZW50fSBldmVudCBcbiAgICAgKi9cbiAgICByZW1vdmVDbGlrZWQoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5ldmVudHMudHJpZ2dlcihGaWxlVXBsb2FkRW50cnkuRVZFTlRfUkVNT1ZFX0NMSUNLRUQsIFtldmVudCwgdGhpcy5maWxlXSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDb250YWluZXJGaWxlRGF0YX0gZmlsZSBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IFxuICAgICAqL1xuICAgIHVwZGF0ZVByb2dyZXNzKGZpbGUsIGtleSkge1xuICAgICAgICBpZiAoZmlsZSkge1xuICAgICAgICAgICAgY29uc3QgcHJvZ3Jlc3NCYXIgPSB0aGlzLmNvbXBvbmVudC5nZXQoXCJmaWxlUHJvZ3Jlc3NCYXJcIik7XG4gICAgICAgICAgICBwcm9ncmVzc0Jhci5zZXRTdHlsZShcIndpZHRoXCIsIGZpbGUudXBsb2FkUGVyY2VudGFnZSArIFwiJVwiKTtcbiAgICAgICAgICAgIGlmIChmaWxlLnVwbG9hZFBlcmNlbnRhZ2UgPj0gMTAwKSB7XG4gICAgICAgICAgICAgICAgZmlsZS51cGxvYWRDb21wbGV0ZSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cblR5cGVDb25maWdQYWNrLmluc3RhbmNlKCkuYWRkVHlwZUNvbmZpZyhcIm51dHRpbjJjLXVpXCIsIFByb3RvdHlwZUNvbmZpZy51bm5hbWVkKEZpbGVVcGxvYWRFbnRyeSkpOyIsImltcG9ydCB7IENvbnRhaW5lckV2ZW50LCBDb250YWluZXJGaWxlRGF0YSB9IGZyb20gXCJjb250YWluZXJicmlkZ2VfdjFcIjtcbmltcG9ydCB7IExvZ2dlciwgTWV0aG9kIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5pbXBvcnQgeyBDYW52YXNTdHlsZXMsXG4gICAgQ29tcG9uZW50LFxuICAgIEV2ZW50TWFuYWdlcixcbiAgICBTaW1wbGVFbGVtZW50LFxuICAgIFN0eWxlU2VsZWN0b3JBY2Nlc3NvcixcbiAgICBIVE1MLFxuICAgIFN0YXRlTWFuYWdlcixcbiAgICBTdHlsZXNoZWV0QnVpbGRlcixcbiAgICBTdHlsZXNoZWV0LFxuICAgIENvbXBvbmVudEJ1aWxkZXIsXG4gICAgSW5saW5lQ29tcG9uZW50RmFjdG9yeVxufSBmcm9tIFwibnV0dGluMmMtY29yZV92MVwiO1xuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQsIFByb3RvdHlwZUNvbmZpZywgUHJvdmlkZXIsIFR5cGVDb25maWdQYWNrIH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5pbXBvcnQgeyBGaWxlVXBsb2FkRW50cnkgfSBmcm9tIFwiLi9maWxlVXBsb2FkRW50cnkvZmlsZVVwbG9hZEVudHJ5LmpzXCI7XG5pbXBvcnQgeyBDb21tb25FdmVudHMgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbW1vbkV2ZW50cy5qc1wiO1xuXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiRmlsZVVwbG9hZFwiKTtcblxuZXhwb3J0IGNsYXNzIEZpbGVVcGxvYWQge1xuXG5cdHN0YXRpYyBERUZBVUxUX1BMQUNFSE9MREVSID0gXCJGaWxlVXBsb2FkXCI7XG5cblx0c3RhdGljIEVWRU5UX0NMSUNLRUQgPSBDb21tb25FdmVudHMuQ0xJQ0tFRDtcbiAgICBzdGF0aWMgRVZFTlRfRklMRV9BRERFRCA9IFwiZmlsZUFkZGVkXCI7XG4gICAgc3RhdGljIEVWRU5UX0ZJTEVfUkVNT1ZFRCA9IFwiZmlsZVJlbW92ZWRcIjtcbiAgICBzdGF0aWMgRVZFTlRfVVBMT0FEX0NPTVBMRVRFID0gXCJ1cGxvYWRDb21wbGV0ZVwiO1xuICAgIHN0YXRpYyBFVkVOVF9VUExPQURfUkVTRVQgPSBcInVwbG9hZFJlc2V0XCI7XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IG11bHRpcGxlXG4gICAgICogQHBhcmFtIHtBcnJheTxzdHJpbmc+fSBmaWxlVHlwZUFycmF5XG4gICAgICovXG4gICAgY29uc3RydWN0b3IobmFtZSwgbXVsdGlwbGUgPSBmYWxzZSwgZmlsZVR5cGVBcnJheSA9IFtdKSB7XG4gICAgICAgIFxuICAgICAgICAvKiogQHR5cGUge0lubGluZUNvbXBvbmVudEZhY3Rvcnl9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKElubGluZUNvbXBvbmVudEZhY3RvcnkpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7RXZlbnRNYW5hZ2VyfSAqL1xuICAgICAgICB0aGlzLmV2ZW50cyA9IG5ldyBFdmVudE1hbmFnZXIoKTtcblxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudH0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSBudWxsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Ym9vbGVhbn0gKi9cbiAgICAgICAgdGhpcy5tdWx0aXBsZSA9IG11bHRpcGxlO1xuICAgICAgICBcbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmdbXX0gKi9cbiAgICAgICAgdGhpcy5maWxlVHlwZUFycmF5ID0gZmlsZVR5cGVBcnJheTtcblxuICAgICAgICAvKiogQHR5cGUge1N0YXRlTWFuYWdlcjxDb250YWluZXJGaWxlRGF0YT59ICAqL1xuICAgICAgICB0aGlzLmZpbGVBcnJheVN0YXRlID0gbmV3IFN0YXRlTWFuYWdlcigpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7UHJvdmlkZXI8RmlsZVVwbG9hZEVudHJ5Pn0gKi9cbiAgICAgICAgdGhpcy5maWxlVXBsb2FkRW50cnlQcm92aWRlciA9IEluamVjdGlvblBvaW50LnByb3ZpZGVyKEZpbGVVcGxvYWRFbnRyeSk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0eWxlc2hlZXRCdWlsZGVyfSBzdHlsZXNoZWV0QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyB7U3R5bGVzaGVldH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRTdHlsZXNoZWV0KHN0eWxlc2hlZXRCdWlsZGVyKSB7XG4gICAgICAgc3R5bGVzaGVldEJ1aWxkZXJcbiAgICAgICAgICAgLnNlbGVjdG9yKFwiLmZpbGUtdXBsb2FkLWVycm9yXCIpXG4gICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLCBcImZpdC1jb250ZW50XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCIjMzMzMzMzXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKCs1cHgsLTVweClcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiI0ZGRkZFMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtd2VpZ2h0XCIsIFwibm9ybWFsXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZm9udC1zaXplXCIsIFwiMTRweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1yYWRpdXNcIiwgXCI4cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLCBcInJlbGF0aXZlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiei1pbmRleFwiLCBcIjk5OTk5OTk4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm94LXNpemluZ1wiLCBcImJvcmRlci1ib3hcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3gtc2hhZG93XCIsIFwiMCAxcHggOHB4IHJnYmEoMCwwLDAsMC41KVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImN1cnNvclwiLCBcInBvaW50ZXJcIilcbiAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAuc2VsZWN0b3IoXCIuZmlsZS11cGxvYWQtZXJyb3ItaGlkZGVuXCIpXG4gICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2l0aW9uXCIsIFwibWF4LWhlaWdodCAuM3MgLjJzLCBwYWRkaW5nIC4zcyAuMnMsIG9wYWNpdHkgLjJzIDBzLCB2aXNpYmlsaXR5IDBzIC4yc1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZ1wiLCBcIjBweCAwcHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXgtaGVpZ2h0XCIsIFwiMHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidmlzaWJpbGl0eVwiLCBcImhpZGRlblwiKVxuICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgIC5zZWxlY3RvcihcIi5maWxlLXVwbG9hZC1lcnJvci12aXNpYmxlXCIpXG4gICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2l0aW9uXCIsIFwibWF4LWhlaWdodCAuM3MsIHBhZGRpbmcgLjJzLCBvcGFjaXR5IC4ycyAuMnNcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmdcIiwgXCIxMHB4IDIwcHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXgtaGVpZ2h0XCIsIFwiNTBweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgXCJibG9ja1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInZpc2liaWxpdHlcIiwgXCJ2aXNpYmxlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luLXRvcFwiLCBcIjEwcHhcIilcbiAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAuc2VsZWN0b3IoXCIuZmlsZS11cGxvYWQtZXJyb3IgaVwiKVxuICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIiwgXCJhYnNvbHV0ZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRvcFwiLCBcIjEwMCVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJsZWZ0XCIsIFwiMzAlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luLWxlZnRcIiwgXCItMTVweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIndpZHRoXCIsIFwiMzBweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImhlaWdodFwiLCBcIjE1cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJvdmVyZmxvd1wiLCBcImhpZGRlblwiKVxuICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgIC5zZWxlY3RvcihcIi5maWxlLXVwbG9hZC1ib3hcIilcbiAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlclwiLCBcIjJweCBkYXNoZWQgI2NlZDRkYVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1yYWRpdXNcIiwgXCIwLjI1cmVtXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZ1wiLCBcIjFyZW1cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjdXJzb3JcIiwgXCJwb2ludGVyXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNpdGlvblwiLCBcImJhY2tncm91bmQtY29sb3IgMC4xNXMgZWFzZS1pbi1vdXQsIGJvcmRlci1jb2xvciAwLjE1cyBlYXNlLWluLW91dFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpbi1ib3R0b21cIiwgXCIxNXB0XCIpXG4gICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgLnNlbGVjdG9yKFwiLmZpbGUtdXBsb2FkLWJveC1pbnN0cnVjdGlvbnNcIilcbiAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRleHQtYWxpZ25cIiwgXCJjZW50ZXJcIilcbiAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAuc2VsZWN0b3IoXCIuZmlsZS11cGxvYWQtYm94LWluc3RydWN0aW9ucy1pY29uXCIpXG4gICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLCBcIjQ4cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJoZWlnaHRcIiwgXCI0OHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luXCIsIFwiMCBhdXRvIDAgYXV0b1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtc2l6ZVwiLCBcImNvbnRhaW5cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLXJlcGVhdFwiLCBcIm5vLXJlcGVhdFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtcG9zaXRpb25cIiwgXCJjZW50ZXJcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjb2xvclwiLCBcIiNlMWUxZTFcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmb250LXNpemVcIiwgXCIzcmVtXCIpXG4gICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgLnNlbGVjdG9yKFwiLmZpbGUtdXBsb2FkLWJveC1pbnN0cnVjdGlvbnMtdGV4dFwiKVxuICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZm9udC1zaXplXCIsIFwiMXJlbVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbG9yXCIsIFwiIzZjNzU3ZFwiKVxuICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgIC5zZWxlY3RvcihcIi5maWxlLXVwbG9hZC1ib3gtZHJhZ292ZXJcIilcbiAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIiwgXCIjZTllY2VmXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyLWNvbG9yXCIsIFwiIzgwYmRmZlwiKVxuICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgIC5zZWxlY3RvcihcIi5maWxlLXVwbG9hZC1pbnB1dFwiKVxuICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLCBcIm5vbmVcIilcbiAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAuc2VsZWN0b3IoXCIuZmlsZS11cGxvYWQtdW5zdXBwb3J0ZWQtZmlsZVwiKVxuICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCIjZGMzNTQ1XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZm9udC1zaXplXCIsIFwiMC44NzVyZW1cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwYWRkaW5nXCIsIFwiMC4yNXJlbSAwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyLWxlZnRcIiwgXCIzcHggc29saWQgI2RjMzU0NVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmctbGVmdFwiLCBcIjAuNXJlbVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpbi10b3BcIiwgXCIwLjUwcmVtXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiNmOGQ3ZGFcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItcmFkaXVzXCIsIFwiMC4yNXJlbVwiKVxuICAgICAgICAgICAuY2xvc2UoKTtcbiAgICAgICAgIHJldHVybiBzdHlsZXNoZWV0QnVpbGRlci5idWlsZCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Q29tcG9uZW50QnVpbGRlcn0gY29tcG9uZW50QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyB7Q29tcG9uZW50fVxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZENvbXBvbmVudChjb21wb25lbnRCdWlsZGVyKSB7XG4gICAgICAgIGNvbXBvbmVudEJ1aWxkZXJcbiAgICAgICAgICAgIC5yb290KFwiZGl2XCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLm5vZGUoXCJkaXZcIiwgXCJpZD1maWxlVXBsb2FkRXJyb3JcIiwgXCJjbGFzcz1maWxlLXVwbG9hZC1lcnJvciBmaWxlLXVwbG9hZC1lcnJvci1oaWRkZW5cIilcbiAgICAgICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgICAgIC50ZXh0KFwiSW52YWxpZCBmaWxlLXVwbG9hZFwiKVxuICAgICAgICAgICAgICAgICAgICAubm9kZShcImlcIilcbiAgICAgICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwiZGl2XCIsIFwiaWQ9dXBsb2FkQm94XCIsIFwiY2xhc3M9ZmlsZS11cGxvYWQtYm94XCIpXG4gICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAubm9kZShcImRpdlwiLCBcImlkPWluc3RydWN0aW9uc1wiLCBcImNsYXNzPWZpbGUtdXBsb2FkLWJveC1pbnN0cnVjdGlvbnNcIilcbiAgICAgICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm5vZGUoXCJpbnB1dFwiLCBcImlkPWZpbGVJbnB1dFwiLCBcInR5cGU9ZmlsZVwiLCBcImNsYXNzPWZpbGUtdXBsb2FkLWlucHV0XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAubm9kZShcImRpdlwiLCBcImlkPXVwbG9hZEJveEljb25cIiwgXCJjbGFzcz1mYXMgZmEtdXBsb2FkIGZpbGUtdXBsb2FkLWJveC1pbnN0cnVjdGlvbnMtaWNvblwiKVxuICAgICAgICAgICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgICAgICAgICAubm9kZShcImRpdlwiLCBcImlkPXVuc3VwcG9ydGVkXCIpXG4gICAgICAgICAgICAgICAgICAgIC5ub2RlKFwiZGl2XCIsIFwiaWQ9ZmlsZUxpc3RcIilcbiAgICAgICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgLmNsb3NlKCk7XG4gICAgICAgIHJldHVybiBjb21wb25lbnRCdWlsZGVyLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgcG9zdENvbmZpZygpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKEZpbGVVcGxvYWQpO1xuICAgICAgICBDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUoRmlsZVVwbG9hZC5uYW1lKTtcblxuICAgICAgICBcbiAgICAgICAgLyoqIEB0eXBlIHtTaW1wbGVFbGVtZW50fSAqL1xuICAgICAgICBjb25zdCB1cGxvYWRCb3ggPSB0aGlzLmNvbXBvbmVudC5nZXQoXCJ1cGxvYWRCb3hcIik7XG4gICAgICAgIHVwbG9hZEJveC5saXN0ZW5UbyhcImRyYWdvdmVyXCIsIHRoaXMuZHJhZ092ZXIsIHRoaXMpO1xuICAgICAgICB1cGxvYWRCb3gubGlzdGVuVG8oXCJkcmFnbGVhdmVcIiwgdGhpcy5kcmFnTGVhdmUsIHRoaXMpO1xuICAgICAgICB1cGxvYWRCb3gubGlzdGVuVG8oXCJkcm9wXCIsIHRoaXMuZmlsZURyb3BwZWQsIHRoaXMpO1xuICAgICAgICB1cGxvYWRCb3gubGlzdGVuVG8oXCJjbGlja1wiLCB0aGlzLmZpbGVJbnB1dENsaWNrZWQsIHRoaXMpO1xuXG4gICAgICAgIGlmICh0aGlzLm11bHRpcGxlKSB7XG4gICAgICAgICAgICBjb25zdCBmaWxlSW5wdXQgPSB0aGlzLmNvbXBvbmVudC5nZXQoXCJmaWxlSW5wdXRcIik7XG4gICAgICAgICAgICBmaWxlSW5wdXQuY29udGFpbmVyRWxlbWVudC5zZXRBdHRyaWJ1dGVWYWx1ZShcIm11bHRpcGxlXCIsIFwibXVsdGlwbGVcIik7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBmaWxlSW5wdXQgPSB0aGlzLmNvbXBvbmVudC5nZXQoXCJmaWxlSW5wdXRcIik7XG4gICAgICAgIGZpbGVJbnB1dC5saXN0ZW5UbyhcImNoYW5nZVwiLCB0aGlzLmZpbGVJbnB1dENoYW5nZWQsIHRoaXMpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDb250YWluZXJFdmVudH0gZXZlbnQgXG4gICAgICovXG4gICAgZmlsZUlucHV0Q2xpY2tlZChldmVudCkge1xuICAgICAgICBjb25zdCBmaWxlSW5wdXQgPSB0aGlzLmNvbXBvbmVudC5nZXQoXCJmaWxlSW5wdXRcIik7XG4gICAgICAgIGZpbGVJbnB1dC5jb250YWluZXJFbGVtZW50LnZhbHVlID0gbnVsbDtcbiAgICAgICAgZmlsZUlucHV0LmNvbnRhaW5lckVsZW1lbnQuY2xpY2soKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7Q29udGFpbmVyRXZlbnR9IGV2ZW50XG4gICAgICovXG4gICAgZmlsZUlucHV0Q2hhbmdlZChldmVudCkge1xuICAgICAgICB0aGlzLnByb2Nlc3NGaWxlcyhldmVudC5maWxlcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHJvY2VzcyB1cGxvYWRlZCBmaWxlcyBhbmQgdmFsaWRhdGUgYWdhaW5zdCBmaWxlIHR5cGUgYXJyYXlcbiAgICAgKiBAcGFyYW0ge0NvbnRhaW5lckZpbGVEYXRhW119IGZpbGVzXG4gICAgICovXG4gICAgYXN5bmMgcHJvY2Vzc0ZpbGVzKGZpbGVzKSB7XG4gICAgICAgIGNvbnN0IHN1cHBvcnRlZEZpbGVzID0gW107XG4gICAgICAgIGNvbnN0IHVuc3VwcG9ydGVkRmlsZXMgPSBbXTtcbiAgICAgICAgY29uc3QgYWRkZWRGaWxlcyA9IFtdO1xuXG4gICAgICAgIGZvciAoY29uc3QgZmlsZSBvZiBmaWxlcykge1xuICAgICAgICAgICAgY29uc3Qgc3VwcG9ydGVkRmlsZSA9IHRoaXMuaXNGaWxlVHlwZVN1cHBvcnRlZChmaWxlKTtcbiAgICAgICAgICAgIGNvbnN0IGZpbGVBbHJlYWR5U2VsZXRlZCA9IHRoaXMuZmlsZUFscmVhZHlTZWxldGVkKGZpbGUpO1xuICAgICAgICAgICAgaWYgKHN1cHBvcnRlZEZpbGUgJiYgIWZpbGVBbHJlYWR5U2VsZXRlZCkge1xuICAgICAgICAgICAgICAgIHN1cHBvcnRlZEZpbGVzLnB1c2goZmlsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXN1cHBvcnRlZEZpbGUpIHtcbiAgICAgICAgICAgICAgICB1bnN1cHBvcnRlZEZpbGVzLnB1c2goZmlsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBIYW5kbGUgc3VwcG9ydGVkIGZpbGVzXG4gICAgICAgIGlmIChzdXBwb3J0ZWRGaWxlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5tdWx0aXBsZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZpbGVBcnJheVN0YXRlLmNsZWFyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGZpbGUgb2Ygc3VwcG9ydGVkRmlsZXMpIHtcbiAgICAgICAgICAgICAgICBhZGRlZEZpbGVzLnB1c2goYXdhaXQgdGhpcy5maWxlQXJyYXlTdGF0ZS51cGRhdGVEb21haW4oZmlsZSwgZmlsZS5uYW1lKSk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubXVsdGlwbGUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFNob3cgdW5zdXBwb3J0ZWQgZmlsZXNcbiAgICAgICAgdGhpcy5zaG93VW5zdXBwb3J0ZWRGaWxlcyh1bnN1cHBvcnRlZEZpbGVzKTtcbiAgICAgICAgYXdhaXQgdGhpcy51cGRhdGVGaWxlTGlzdCgpO1xuXG4gICAgICAgIC8vIFRyaWdnZXIgZmlsZSBhZGRlZCBldmVudCBmb3IgZWFjaCBzdXBwb3J0ZWQgZmlsZVxuICAgICAgICBmb3IgKGNvbnN0IGZpbGUgb2YgYWRkZWRGaWxlcykge1xuICAgICAgICAgICAgdGhpcy5ldmVudHMudHJpZ2dlcihGaWxlVXBsb2FkLkVWRU5UX0ZJTEVfQURERUQsIFtmaWxlXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmaWxlQWxyZWFkeVNlbGV0ZWQoZmlsZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5maWxlQXJyYXlTdGF0ZS5kb21haW5NYXAuaGFzKGZpbGUubmFtZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgZmlsZSB0eXBlIGlzIHN1cHBvcnRlZFxuICAgICAqIEBwYXJhbSB7Q29udGFpbmVyRmlsZURhdGF9IGZpbGVcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBpc0ZpbGVUeXBlU3VwcG9ydGVkKGZpbGUpIHtcbiAgICAgICAgLy8gSWYgZmlsZVR5cGVBcnJheSBpcyBlbXB0eSwgYWNjZXB0IGFsbCBmaWxlc1xuICAgICAgICBpZiAodGhpcy5maWxlVHlwZUFycmF5Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDaGVjayBpZiBmaWxlJ3MgTUlNRSB0eXBlIG1hdGNoZXMgYW55IGluIHRoZSBmaWxlVHlwZUFycmF5XG4gICAgICAgIHJldHVybiB0aGlzLmZpbGVUeXBlQXJyYXkuaW5jbHVkZXMoZmlsZS50eXBlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEaXNwbGF5IHVuc3VwcG9ydGVkIGZpbGVzIGluIHRoZSB1bnN1cHBvcnRlZCBkaXZcbiAgICAgKiBAcGFyYW0ge0FycmF5PEZpbGU+fSB1bnN1cHBvcnRlZEZpbGVzXG4gICAgICovXG4gICAgc2hvd1Vuc3VwcG9ydGVkRmlsZXModW5zdXBwb3J0ZWRGaWxlcykge1xuICAgICAgICBjb25zdCB1bnN1cHBvcnRlZERpdiA9IHRoaXMuY29tcG9uZW50LmdldChcInVuc3VwcG9ydGVkXCIpO1xuICAgICAgICB1bnN1cHBvcnRlZERpdi5jbGVhcigpO1xuXG4gICAgICAgIGlmICh1bnN1cHBvcnRlZEZpbGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHVuc3VwcG9ydGVkRGl2LmNsZWFyKCk7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGZpbGUgb2YgdW5zdXBwb3J0ZWRGaWxlcykge1xuICAgICAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2VFbGVtZW50ID0gSFRNTC5jdXN0b20oXCJkaXZcIik7XG4gICAgICAgICAgICAgICAgbWVzc2FnZUVsZW1lbnQuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLFwiZmlsZS11cGxvYWQtdW5zdXBwb3J0ZWQtZmlsZVwiKTtcbiAgICAgICAgICAgICAgICBtZXNzYWdlRWxlbWVudC5zZXRDaGlsZChgRmlsZSBcIiR7ZmlsZS5uYW1lfVwiIGlzIG5vdCBzdXBwb3J0ZWQuYCk7XG4gICAgICAgICAgICAgICAgdW5zdXBwb3J0ZWREaXYuYWRkQ2hpbGQobWVzc2FnZUVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtDb250YWluZXJFdmVudH0gZXZlbnRcbiAgICAgKi9cbiAgICBkcmFnT3ZlcihldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICBjb25zdCB1cGxvYWRCb3ggPSB0aGlzLmNvbXBvbmVudC5nZXQoXCJ1cGxvYWRCb3hcIik7XG4gICAgICAgIFN0eWxlU2VsZWN0b3JBY2Nlc3Nvci5mcm9tKHVwbG9hZEJveCkuZW5hYmxlKFwiZmlsZS11cGxvYWQtYm94LWRyYWdvdmVyXCIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7Q29udGFpbmVyRXZlbnR9IGV2ZW50XG4gICAgICovXG4gICAgZHJhZ0xlYXZlKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIGNvbnN0IHVwbG9hZEJveCA9IHRoaXMuY29tcG9uZW50LmdldChcInVwbG9hZEJveFwiKTtcbiAgICAgICAgU3R5bGVTZWxlY3RvckFjY2Vzc29yLmZyb20odXBsb2FkQm94KS5kaXNhYmxlKFwiZmlsZS11cGxvYWQtYm94LWRyYWdvdmVyXCIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICBAcGFyYW0ge0NvbnRhaW5lckV2ZW50fSBldmVudFxuICAgICAqL1xuICAgIGZpbGVEcm9wcGVkKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIGNvbnN0IHVwbG9hZEJveCA9IHRoaXMuY29tcG9uZW50LmdldChcInVwbG9hZEJveFwiKTtcbiAgICAgICAgU3R5bGVTZWxlY3RvckFjY2Vzc29yLmZyb20odXBsb2FkQm94KS5kaXNhYmxlKFwiZmlsZS11cGxvYWQtYm94LWRyYWdvdmVyXCIpO1xuXG4gICAgICAgIHRoaXMucHJvY2Vzc0ZpbGVzKGV2ZW50LmZpbGVzKTtcbiAgICB9XG5cbiAgICBhc3luYyB1cGRhdGVGaWxlTGlzdCgpIHtcbiAgICAgICAgY29uc3QgZmlsZUxpc3QgPSB0aGlzLmNvbXBvbmVudC5nZXQoXCJmaWxlTGlzdFwiKTtcbiAgICAgICAgZmlsZUxpc3QuY2xlYXIoKTtcbiAgICAgICAgdGhpcy5ldmVudHMudHJpZ2dlcihGaWxlVXBsb2FkLkVWRU5UX1VQTE9BRF9SRVNFVCk7XG4gICAgICAgIGZvciAoY29uc3QgZmlsZSBvZiB0aGlzLmZpbGVBcnJheVN0YXRlLmRvbWFpbk1hcC52YWx1ZXMoKSkge1xuICAgICAgICAgICAgY29uc3QgZmlsZUVudHJ5ID0gYXdhaXQgdGhpcy5maWxlVXBsb2FkRW50cnlQcm92aWRlci5nZXQoW2ZpbGVdKTtcbiAgICAgICAgICAgIGZpbGVFbnRyeS5ldmVudHMubGlzdGVuVG8oRmlsZVVwbG9hZEVudHJ5LkVWRU5UX1JFTU9WRV9DTElDS0VELCB0aGlzLnJlbW92ZUZpbGVFbnRyeSwgdGhpcyk7XG4gICAgICAgICAgICB0aGlzLmZpbGVBcnJheVN0YXRlLnJlYWN0VG8oZmlsZS5uYW1lLCBuZXcgTWV0aG9kKGZpbGVFbnRyeS51cGRhdGVQcm9ncmVzcywgZmlsZUVudHJ5KSk7XG4gICAgICAgICAgICBmaWxlTGlzdC5hZGRDaGlsZChmaWxlRW50cnkuY29tcG9uZW50KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmZpbGVBcnJheVN0YXRlLnJlYWN0KG5ldyBNZXRob2QodGhpcy5jaGVja0ZpbGVVcGxvYWRDb21wbGV0ZSwgdGhpcykpO1xuICAgIH1cblxuICAgIGNoZWNrRmlsZVVwbG9hZENvbXBsZXRlKCkge1xuICAgICAgICBpZiAodGhpcy5maWxlQXJyYXlTdGF0ZS5kb21haW5NYXAuc2l6ZSA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5ldmVudHMudHJpZ2dlcihGaWxlVXBsb2FkLkVWRU5UX1VQTE9BRF9SRVNFVCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBmaWxlIG9mIHRoaXMuZmlsZUFycmF5U3RhdGUuZG9tYWluTWFwLnZhbHVlcygpKSB7XG4gICAgICAgICAgICBpZiAoIWZpbGUudXBsb2FkQ29tcGxldGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5ldmVudHMudHJpZ2dlcihGaWxlVXBsb2FkLkVWRU5UX1VQTE9BRF9DT01QTEVURSwgW3RoaXMuZmlsZUFycmF5U3RhdGUub2JqZWN0QXJyYXldKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbnRhaW5lckV2ZW50fSBldmVudFxuICAgICAqIEBwYXJhbSB7RmlsZX0gZmlsZVxuICAgICAqIEBwYXJhbSB7YW55fSBhcmdzXG4gICAgICovXG4gICAgYXN5bmMgcmVtb3ZlRmlsZUVudHJ5KGV2ZW50LCBmaWxlLCBhcmdzKSB7XG4gICAgICAgIHRoaXMuZmlsZUFycmF5U3RhdGUuZGVsZXRlKGZpbGUubmFtZSk7XG4gICAgICAgIC8vIENsZWFyIHVuc3VwcG9ydGVkIGZpbGVzIHdoZW4gdXBkYXRpbmcgZmlsZSBsaXN0XG4gICAgICAgIGNvbnN0IHVuc3VwcG9ydGVkRGl2ID0gdGhpcy5jb21wb25lbnQuZ2V0KFwidW5zdXBwb3J0ZWRcIik7XG4gICAgICAgIHVuc3VwcG9ydGVkRGl2LmNsZWFyKCk7XG4gICAgICAgIGF3YWl0IHRoaXMudXBkYXRlRmlsZUxpc3QoKTtcbiAgICAgICAgLy8gUHJldmVudCB0aGUgY2xpY2sgZXZlbnQgZnJvbSBidWJibGluZyB1cCB0byB0aGUgdXBsb2FkIGJveFxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgdGhpcy5jaGVja0ZpbGVVcGxvYWRDb21wbGV0ZSgpO1xuICAgIH1cblxuICAgIGNsaWNrZWQoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5ldmVudHMudHJpZ2dlcihGaWxlVXBsb2FkLkVWRU5UX0NMSUNLRUQsIFtldmVudF0pO1xuICAgIH1cblxuICAgIGZvY3VzKCkge1xuXG4gICAgfVxufVxuXG5UeXBlQ29uZmlnUGFjay5pbnN0YW5jZSgpLmFkZFR5cGVDb25maWcoXCJudXR0aW4yYy11aVwiLCBQcm90b3R5cGVDb25maWcudW5uYW1lZChGaWxlVXBsb2FkKSk7IiwiaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5pbXBvcnQgeyBDb21tb25JbnB1dCB9IGZyb20gXCIuLi9jb21tb25JbnB1dFwiO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBDb21wb25lbnRCdWlsZGVyLCBDc3MzU3R5bGVzaGVldEJ1aWxkZXIsIFN0eWxlc2hlZXQsIFN0eWxlc2hlZXRCdWlsZGVyIH0gZnJvbSBcIm51dHRpbjJjLWNvcmVfdjFcIjtcbmltcG9ydCB7IFByb3RvdHlwZUNvbmZpZywgVHlwZUNvbmZpZ1BhY2sgfSBmcm9tIFwibWluZGlfdjFcIjtcblxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIkhpZGRlbklucHV0XCIpO1xuXG5leHBvcnQgY2xhc3MgSGlkZGVuSW5wdXQgZXh0ZW5kcyBDb21tb25JbnB1dCB7XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBtb2RlbFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIG1vZGVsID0gbnVsbCkge1xuXG4gICAgICAgIHN1cGVyKEhpZGRlbklucHV0LFxuICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgIG1vZGVsKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0eWxlc2hlZXRCdWlsZGVyfSBzdHlsZXNoZWV0QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyB7U3R5bGVzaGVldH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRTdHlsZXNoZWV0KHN0eWxlc2hlZXRCdWlsZGVyKSB7XG4gICAgICAgIENzczNTdHlsZXNoZWV0QnVpbGRlci5jcmVhdGUoc3R5bGVzaGVldEJ1aWxkZXIpXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuaGlkZGVuLWlucHV0LWVudHJ5XCIpO1xuXG4gICAgICAgIHJldHVybiBzdHlsZXNoZWV0QnVpbGRlci5idWlsZCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Q29tcG9uZW50QnVpbGRlcn0gY29tcG9uZW50QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyB7Q29tcG9uZW50fVxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZENvbXBvbmVudChjb21wb25lbnRCdWlsZGVyKSB7XG4gICAgICAgIHJldHVybiBjb21wb25lbnRCdWlsZGVyXG4gICAgICAgICAgICAucm9vdChcImlucHV0XCIsIFwiaWQ9aW5wdXRcIiwgXCJ0eXBlPWhpZGRlblwiLCBcImNsYXNzPWhpZGRlbi1pbnB1dC1lbnRyeVwiKVxuICAgICAgICAgICAgLmJ1aWxkKCk7XG4gICAgfVxuXG59XG5cblR5cGVDb25maWdQYWNrLmluc3RhbmNlKCkuYWRkVHlwZUNvbmZpZyhcIm51dHRpbjJjLXVpXCIsIFByb3RvdHlwZUNvbmZpZy51bm5hbWVkKEhpZGRlbklucHV0KSk7IiwiaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5pbXBvcnQgeyBDb21wb25lbnQsIENvbXBvbmVudEJ1aWxkZXIsIENzczNTdHlsZXNoZWV0QnVpbGRlciwgTnVtYmVyVmFsaWRhdG9yLCBTdHlsZXNoZWV0LCBTdHlsZXNoZWV0QnVpbGRlciB9IGZyb20gXCJudXR0aW4yYy1jb3JlX3YxXCI7XG5pbXBvcnQgeyBDb21tb25JbnB1dCB9IGZyb20gXCIuLi9jb21tb25JbnB1dC5qc1wiO1xuaW1wb3J0IHsgUHJvdG90eXBlQ29uZmlnLCBUeXBlQ29uZmlnUGFjayB9IGZyb20gXCJtaW5kaV92MVwiO1xuXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiVGV4dElucHV0XCIpO1xuXG5leHBvcnQgY2xhc3MgTnVtYmVySW5wdXQgZXh0ZW5kcyBDb21tb25JbnB1dCB7XG5cbiAgICBzdGF0aWMgREVGQVVMVF9MQUJFTCA9IFwiTnVtYmVyXCI7XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBtb2RlbFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsYWJlbFxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gbWFuZGF0b3J5XG4gICAgICovXG4gICAgY29uc3RydWN0b3IobmFtZSwgbW9kZWwgPSBudWxsLCBsYWJlbCA9IE51bWJlcklucHV0LkRFRkFVTFRfTEFCRUwsIG1hbmRhdG9yeSA9IGZhbHNlKSB7XG5cbiAgICAgICAgc3VwZXIoTnVtYmVySW5wdXQsXG4gICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgbW9kZWwsXG4gICAgICAgICAgICBuZXcgTnVtYmVyVmFsaWRhdG9yKG1hbmRhdG9yeSwgIW1hbmRhdG9yeSksXG4gICAgICAgICAgICBsYWJlbCxcbiAgICAgICAgICAgIFwiSW52YWxpZCB2YWx1ZVwiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0eWxlc2hlZXRCdWlsZGVyfSBzdHlsZXNoZWV0QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyB7U3R5bGVzaGVldH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRTdHlsZXNoZWV0KHN0eWxlc2hlZXRCdWlsZGVyKSB7XG4gICAgICAgIENzczNTdHlsZXNoZWV0QnVpbGRlci5jcmVhdGUoc3R5bGVzaGVldEJ1aWxkZXIpXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIubnVtYmVyLWlucHV0LWNvbnRhaW5lclwiKVxuICAgICAgICAgICAgICAgIC5wb3NpdGlvbihcInJlbGF0aXZlXCIpXG4gICAgICAgICAgICAgICAgLnBhZGRpbmcoXCIwLjVyZW1cIilcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLm51bWJlci1pbnB1dC1lbnRyeVwiKVxuICAgICAgICAgICAgICAgIC5kaXNwbGF5KFwiYmxvY2tcIilcbiAgICAgICAgICAgICAgICAud2lkdGgoXCIxMDAlXCIpXG4gICAgICAgICAgICAgICAgLmhlaWdodChcImNhbGMoMS41ZW0gKyAxcmVtICsgMnB4KVwiKVxuICAgICAgICAgICAgICAgIC5wYWRkaW5nKFwiMC43cmVtXCIsIFwiMC43NXJlbVwiLCBcIjAuM3JlbVwiLCBcIjAuNzVyZW1cIilcbiAgICAgICAgICAgICAgICAuZm9udFNpemUoXCIxcmVtXCIpXG4gICAgICAgICAgICAgICAgLmZvbnRXZWlnaHQoXCI0MDBcIilcbiAgICAgICAgICAgICAgICAubGluZUhlaWdodChcIjEuNVwiKVxuICAgICAgICAgICAgICAgIC5jb2xvcihcIiM0OTUwNTdcIilcbiAgICAgICAgICAgICAgICAuYmFja2dyb3VuZENvbG9yKFwiI2ZmZlwiKVxuICAgICAgICAgICAgICAgIC5iYWNrZ3JvdW5kQ2xpcChcInBhZGRpbmctYm94XCIpXG4gICAgICAgICAgICAgICAgLmJvcmRlcihcIjFweFwiLCBcInNvbGlkXCIsIFwiI2NlZDRkYVwiKVxuICAgICAgICAgICAgICAgIC5ib3JkZXJSYWRpdXMoXCIwLjI1cmVtXCIpXG4gICAgICAgICAgICAgICAgLnRyYW5zaXRpb24oXG4gICAgICAgICAgICAgICAgICAgIFtcImJvcmRlci1jb2xvclwiLCBcIjAuMTVzXCIsIG51bGwsIFwiZWFzZS1pbi1vdXRcIl0sXG4gICAgICAgICAgICAgICAgICAgIFtcImJveC1zaGFkb3dcIiwgXCIwLjE1c1wiLCBudWxsLCBcImVhc2UtaW4tb3V0XCJdKVxuICAgICAgICAgICAgICAgIC5tYXJnaW4obnVsbCxudWxsLFwiMXJlbVwiLG51bGwpXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIubnVtYmVyLWxhYmVsXCIpXG4gICAgICAgICAgICAgICAgLmJhY2tncm91bmRDb2xvcihcIiNmZmZcIilcbiAgICAgICAgICAgICAgICAucG9zaXRpb24oXCJhYnNvbHV0ZVwiKVxuICAgICAgICAgICAgICAgIC5wYWRkaW5nKFwiMFwiLCBcIjAuMjVyZW1cIiwgXCIwXCIsIFwiMC4yNXJlbVwiKVxuICAgICAgICAgICAgICAgIC5ib3JkZXJSYWRpdXMoXCIwLjVyZW1cIilcbiAgICAgICAgICAgICAgICAudG9wKFwiLTAuMXJlbVwiKVxuICAgICAgICAgICAgICAgIC5sZWZ0KFwiMC40cmVtXCIpXG4gICAgICAgICAgICAgICAgLm1hcmdpbihcIjBcIiwgbnVsbCwgXCIwLjVyZW1cIiwgbnVsbClcbiAgICAgICAgICAgICAgICAuZm9udFNpemUoXCIwLjlyZW1cIilcbiAgICAgICAgICAgICAgICAuZm9udFdlaWdodChcImJvbGRcIilcbiAgICAgICAgICAgICAgICAuY29sb3IoXCIjOGE4YThhXCIpO1xuXG4gICAgICAgIHJldHVybiBzdHlsZXNoZWV0QnVpbGRlci5idWlsZCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Q29tcG9uZW50QnVpbGRlcn0gY29tcG9uZW50QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyB7Q29tcG9uZW50fVxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZENvbXBvbmVudChjb21wb25lbnRCdWlsZGVyKSB7XG4gICAgICAgIHJldHVybiBjb21wb25lbnRCdWlsZGVyXG4gICAgICAgICAgICAucm9vdChcImRpdlwiLCBcImNsYXNzPW51bWJlci1pbnB1dC1jb250YWluZXJcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAubm9kZShcImRpdlwiLCBcImlkPWJ1YmJsZU1lc3NhZ2VcIilcbiAgICAgICAgICAgICAgICAubm9kZShcImxhYmVsXCIsIFwiaWQ9bGFiZWxcIiwgXCJjbGFzcz1udW1iZXItbGFiZWwgaGlkZGVuXCIpXG4gICAgICAgICAgICAgICAgLm5vZGUoXCJpbnB1dFwiLCBcImlkPWlucHV0XCIsIFwidHlwZT1udW1iZXJcIiwgXCJwYXR0ZXJuPVswLTldKlwiLCBcImlucHV0bW9kZT1udW1lcmljXCIsIFwiY2xhc3M9bnVtYmVyLWlucHV0LWVudHJ5XCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgLmJ1aWxkKCk7XG4gICAgfVxufVxuXG5UeXBlQ29uZmlnUGFjay5pbnN0YW5jZSgpLmFkZFR5cGVDb25maWcoXCJudXR0aW4yYy11aVwiLCBQcm90b3R5cGVDb25maWcudW5uYW1lZChOdW1iZXJJbnB1dCkpOyIsImltcG9ydCB7IENvbXBvbmVudCwgQ29tcG9uZW50QnVpbGRlciwgQ3NzM1N0eWxlc2hlZXRCdWlsZGVyLCBSZXF1aXJlZFZhbGlkYXRvciwgU3R5bGVzaGVldCwgU3R5bGVzaGVldEJ1aWxkZXIgfSBmcm9tIFwibnV0dGluMmMtY29yZV92MVwiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5pbXBvcnQgeyBDb21tb25JbnB1dCB9IGZyb20gXCIuLi9jb21tb25JbnB1dC5qc1wiO1xuaW1wb3J0IHsgUHJvdG90eXBlQ29uZmlnLCBUeXBlQ29uZmlnUGFjayB9IGZyb20gXCJtaW5kaV92MVwiO1xuXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiUGFzc3dvcmRJbnB1dFwiKTtcblxuZXhwb3J0IGNsYXNzIFBhc3N3b3JkSW5wdXQgZXh0ZW5kcyBDb21tb25JbnB1dCB7XG5cbiAgICBzdGF0aWMgREVGQVVMVF9MQUJFTCA9IFwiUGFzc3dvcmRcIjtcblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG1vZGVsXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxhYmVsXG4gICAgICogQHBhcmFtIHtib29sZWFufSBtYW5kYXRvcnlcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBtb2RlbCA9IG51bGwsIGxhYmVsID0gUGFzc3dvcmRJbnB1dC5ERUZBVUxUX0xBQkVMLCBtYW5kYXRvcnkgPSBmYWxzZSkge1xuXG4gICAgICAgIHN1cGVyKFBhc3N3b3JkSW5wdXQsXG4gICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgbW9kZWwsXG4gICAgICAgICAgICBuZXcgUmVxdWlyZWRWYWxpZGF0b3IoIW1hbmRhdG9yeSksXG4gICAgICAgICAgICBsYWJlbCxcbiAgICAgICAgICAgIFwiUGFzc3dvcmQgcmVxdWlyZWRcIik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtTdHlsZXNoZWV0QnVpbGRlcn0gc3R5bGVzaGVldEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMge1N0eWxlc2hlZXR9XG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkU3R5bGVzaGVldChzdHlsZXNoZWV0QnVpbGRlcikge1xuICAgICAgICBDc3MzU3R5bGVzaGVldEJ1aWxkZXIuY3JlYXRlKHN0eWxlc2hlZXRCdWlsZGVyKVxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBhc3N3b3JkLWlucHV0LWNvbnRhaW5lclwiKVxuICAgICAgICAgICAgICAgIC5wb3NpdGlvbihcInJlbGF0aXZlXCIpXG4gICAgICAgICAgICAgICAgLnBhZGRpbmcoXCIwLjVyZW1cIilcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBhc3N3b3JkLWlucHV0LWVudHJ5XCIpXG4gICAgICAgICAgICAgICAgLmRpc3BsYXkoXCJibG9ja1wiKVxuICAgICAgICAgICAgICAgIC53aWR0aChcIjEwMCVcIilcbiAgICAgICAgICAgICAgICAuaGVpZ2h0KFwiY2FsYygxLjVlbSArIDFyZW0gKyAycHgpXCIpXG4gICAgICAgICAgICAgICAgLnBhZGRpbmcoXCIwLjdyZW1cIiwgXCIwLjc1cmVtXCIsIFwiMC4zcmVtXCIsIFwiMC43NXJlbVwiKVxuICAgICAgICAgICAgICAgIC5mb250U2l6ZShcIjFyZW1cIilcbiAgICAgICAgICAgICAgICAuZm9udFdlaWdodChcIjQwMFwiKVxuICAgICAgICAgICAgICAgIC5saW5lSGVpZ2h0KFwiMS41XCIpXG4gICAgICAgICAgICAgICAgLmNvbG9yKFwiIzQ5NTA1N1wiKVxuICAgICAgICAgICAgICAgIC5iYWNrZ3JvdW5kQ29sb3IoXCIjZmZmXCIpXG4gICAgICAgICAgICAgICAgLmJhY2tncm91bmRDbGlwKFwicGFkZGluZy1ib3hcIilcbiAgICAgICAgICAgICAgICAuYm9yZGVyKFwiMXB4XCIsIFwic29saWRcIiwgXCIjY2VkNGRhXCIpXG4gICAgICAgICAgICAgICAgLmJvcmRlclJhZGl1cyhcIjAuMjVyZW1cIilcbiAgICAgICAgICAgICAgICAudHJhbnNpdGlvbihbXCJib3JkZXItY29sb3JcIiwgXCIwLjE1c1wiLCBudWxsLCBcImVhc2UtaW4tb3V0XCJdLCBbXCJib3gtc2hhZG93XCIsIFwiMC4xNXNcIiwgbnVsbCwgXCJlYXNlLWluLW91dFwiXSlcbiAgICAgICAgICAgICAgICAubWFyZ2luKG51bGwsbnVsbCxcIjFyZW1cIixudWxsKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucGFzc3dvcmQtaW5wdXQtZXJyb3JcIilcbiAgICAgICAgICAgICAgICAud2lkdGgoXCJmaXQtY29udGVudFwiKVxuICAgICAgICAgICAgICAgIC5jb2xvcihcIiMzMzMzMzNcIilcbiAgICAgICAgICAgICAgICAudHJhbnNmb3JtKFwidHJhbnNsYXRlKCs1cHgsLTVweClcIilcbiAgICAgICAgICAgICAgICAuYmFja2dyb3VuZENvbG9yKFwiI0ZGRkZFMFwiKVxuICAgICAgICAgICAgICAgIC5mb250V2VpZ2h0KFwibm9ybWFsXCIpXG4gICAgICAgICAgICAgICAgLmZvbnRTaXplKFwiMTRweFwiKVxuICAgICAgICAgICAgICAgIC5ib3JkZXJSYWRpdXMoXCI4cHhcIilcbiAgICAgICAgICAgICAgICAucG9zaXRpb24oXCJyZWxhdGl2ZVwiKVxuICAgICAgICAgICAgICAgIC56SW5kZXgoXCI5OTk5OTk5OFwiKVxuICAgICAgICAgICAgICAgIC5ib3hTaXppbmcoXCJib3JkZXItYm94XCIpXG4gICAgICAgICAgICAgICAgLmJveFNoYWRvdyhcIjBcIiwgXCIxcHhcIiwgXCI4cHhcIiwgbnVsbCwgXCJyZ2JhKDAsMCwwLDAuNSlcIilcbiAgICAgICAgICAgICAgICAuY3Vyc29yKFwicG9pbnRlclwiKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucGFzc3dvcmQtaW5wdXQtZXJyb3ItaGlkZGVuXCIpXG4gICAgICAgICAgICAgICAgLnRyYW5zaXRpb24oW1wibWF4LWhlaWdodFwiLCBcIi4zc1wiLCBcIi4yc1wiXSwgW1wicGFkZGluZ1wiLCBcIi4zc1wiLCBcIi4yc1wiXSwgW1wib3BhY2l0eVwiLCBcIi4yc1wiLCBcIjBzXCJdLCBbXCJ2aXNpYmlsaXR5XCIsIFwiMHNcIiwgXCIuMnNcIl0pXG4gICAgICAgICAgICAgICAgLm9wYWNpdHkoXCIwXCIpXG4gICAgICAgICAgICAgICAgLnBhZGRpbmcoXCIwcHhcIixcIjBweFwiLCBudWxsLCBudWxsKVxuICAgICAgICAgICAgICAgIC5tYXhIZWlnaHQoXCIwcHhcIilcbiAgICAgICAgICAgICAgICAuZGlzcGxheShcImJsb2NrXCIpXG4gICAgICAgICAgICAgICAgLnZpc2liaWxpdHkoXCJoaWRkZW5cIilcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBhc3N3b3JkLWlucHV0LWVycm9yLXZpc2libGVcIilcbiAgICAgICAgICAgICAgICAudHJhbnNpdGlvbihbXCJtYXgtaGVpZ2h0XCIsIFwiLjNzXCIsIFwiMHNcIl0sIFtcInBhZGRpbmdcIiwgXCIuMnNcIiwgXCIwc1wiXSwgW1wib3BhY2l0eVwiLCBcIi4yc1wiLCBcIi4yc1wiXSlcbiAgICAgICAgICAgICAgICAub3BhY2l0eShcIjFcIilcbiAgICAgICAgICAgICAgICAucGFkZGluZyhcIjEwcHhcIiwgXCIyMHB4XCIsIFwiMTBweFwiLCBcIjIwcHhcIilcbiAgICAgICAgICAgICAgICAubWF4SGVpZ2h0KFwiNTBweFwiKVxuICAgICAgICAgICAgICAgIC5kaXNwbGF5KFwiYmxvY2tcIilcbiAgICAgICAgICAgICAgICAudmlzaWJpbGl0eShcInZpc2libGVcIilcbiAgICAgICAgICAgICAgICAubWFyZ2luKFwiMTBweFwiLCBudWxsLCBudWxsLCBudWxsKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucGFzc3dvcmQtaW5wdXQtZXJyb3IgaVwiKVxuICAgICAgICAgICAgICAgIC5wb3NpdGlvbihcImFic29sdXRlXCIpXG4gICAgICAgICAgICAgICAgLnRvcChcIjEwMCVcIilcbiAgICAgICAgICAgICAgICAubGVmdChcIjMwJVwiKVxuICAgICAgICAgICAgICAgIC5tYXJnaW4obnVsbCwgbnVsbCwgbnVsbCwgXCItMTVweFwiKVxuICAgICAgICAgICAgICAgIC53aWR0aChcIjMwcHhcIilcbiAgICAgICAgICAgICAgICAuaGVpZ2h0KFwiMTVweFwiKVxuICAgICAgICAgICAgICAgIC5vdmVyZmxvdyhcImhpZGRlblwiKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucGFzc3dvcmQtaW5wdXQtZXJyb3IgaTo6YWZ0ZXJcIilcbiAgICAgICAgICAgICAgICAuY29udGVudChcIicnXCIpXG4gICAgICAgICAgICAgICAgLnBvc2l0aW9uKFwiYWJzb2x1dGVcIilcbiAgICAgICAgICAgICAgICAud2lkdGgoXCIxNXB4XCIpXG4gICAgICAgICAgICAgICAgLmhlaWdodChcIjE1cHhcIilcbiAgICAgICAgICAgICAgICAubGVmdChcIjUwJVwiKVxuICAgICAgICAgICAgICAgIC50cmFuc2Zvcm0oXCJ0cmFuc2xhdGUoLTUwJSwtNTAlKSByb3RhdGUoNDVkZWcpXCIpXG4gICAgICAgICAgICAgICAgLmJhY2tncm91bmRDb2xvcihcIiNGRkZGRTBcIilcbiAgICAgICAgICAgICAgICAuYm94U2hhZG93KFwiMFwiLCBcIjFweFwiLCBcIjhweFwiLCBudWxsLCBcInJnYmEoMCwwLDAsMC41KVwiKVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBhc3N3b3JkLWxhYmVsXCIpXG4gICAgICAgICAgICAgICAgLmJhY2tncm91bmRDb2xvcihcIiNmZmZcIilcbiAgICAgICAgICAgICAgICAucG9zaXRpb24oXCJhYnNvbHV0ZVwiKVxuICAgICAgICAgICAgICAgIC5wYWRkaW5nKFwiMFwiLCBcIjAuMjVyZW1cIiwgXCIwXCIsIFwiMC4yNXJlbVwiKVxuICAgICAgICAgICAgICAgIC5ib3JkZXJSYWRpdXMoXCIwLjVyZW1cIilcbiAgICAgICAgICAgICAgICAudG9wKFwiLTAuMXJlbVwiKVxuICAgICAgICAgICAgICAgIC5sZWZ0KFwiMC40cmVtXCIpXG4gICAgICAgICAgICAgICAgLm1hcmdpbihcIjBcIiwgbnVsbCwgXCIwLjVyZW1cIiwgbnVsbClcbiAgICAgICAgICAgICAgICAuZm9udFNpemUoXCIwLjlyZW1cIilcbiAgICAgICAgICAgICAgICAuZm9udFdlaWdodChcImJvbGRcIilcbiAgICAgICAgICAgICAgICAuY29sb3IoXCIjOGE4YThhXCIpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICByZXR1cm4gc3R5bGVzaGVldEJ1aWxkZXIuYnVpbGQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudEJ1aWxkZXJ9IGNvbXBvbmVudEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMge0NvbXBvbmVudH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRDb21wb25lbnQoY29tcG9uZW50QnVpbGRlcikge1xuICAgICAgICByZXR1cm4gY29tcG9uZW50QnVpbGRlclxuICAgICAgICAgICAgLnJvb3QoXCJkaXZcIiwgXCJjbGFzcz1wYXNzd29yZC1pbnB1dC1jb250YWluZXJcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAubm9kZShcImRpdlwiLCBcImlkPWJ1YmJsZU1lc3NhZ2VcIilcbiAgICAgICAgICAgICAgICAubm9kZShcImxhYmVsXCIsIFwiaWQ9bGFiZWxcIiwgXCJjbGFzcz1wYXNzd29yZC1sYWJlbCBoaWRkZW5cIilcbiAgICAgICAgICAgICAgICAubm9kZShcImlucHV0XCIsIFwiaWQ9aW5wdXRcIiwgXCJ0eXBlPXBhc3N3b3JkXCIsIFwiY2xhc3M9cGFzc3dvcmQtaW5wdXQtZW50cnlcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAuYnVpbGQoKTtcbiAgICB9XG5cbn1cblxuVHlwZUNvbmZpZ1BhY2suaW5zdGFuY2UoKS5hZGRUeXBlQ29uZmlnKFwibnV0dGluMmMtdWlcIiwgUHJvdG90eXBlQ29uZmlnLnVubmFtZWQoUGFzc3dvcmRJbnB1dCkpOyIsImltcG9ydCB7IENvbXBvbmVudCwgQ29tcG9uZW50QnVpbGRlciwgQ3NzM1N0eWxlc2hlZXRCdWlsZGVyLCBQYXNzd29yZFZhbGlkYXRvciwgU3R5bGVzaGVldCwgU3R5bGVzaGVldEJ1aWxkZXIgfSBmcm9tIFwibnV0dGluMmMtY29yZV92MVwiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5pbXBvcnQgeyBDb21tb25JbnB1dCB9IGZyb20gXCIuLi8uLi9jb21tb25JbnB1dC5qc1wiO1xuaW1wb3J0IHsgUHJvdG90eXBlQ29uZmlnLCBUeXBlQ29uZmlnUGFjayB9IGZyb20gXCJtaW5kaV92MVwiO1xuXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiUGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZVwiKTtcblxuZXhwb3J0IGNsYXNzIFBhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWUgZXh0ZW5kcyBDb21tb25JbnB1dCB7XG5cbiAgICBzdGF0aWMgREVGQVVMVF9MQUJFTCA9IFwiTmV3IHBhc3N3b3JkXCI7XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBtb2RlbFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsYWJlbFxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gbWFuZGF0b3J5XG4gICAgICovXG4gICAgY29uc3RydWN0b3IobmFtZSwgbW9kZWwgPSBudWxsLCBsYWJlbCA9IFBhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWUuREVGQVVMVF9MQUJFTCwgbWFuZGF0b3J5ID0gZmFsc2UpIHtcblxuICAgICAgICBzdXBlcihQYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlLFxuICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgIG1vZGVsLFxuICAgICAgICAgICAgbmV3IFBhc3N3b3JkVmFsaWRhdG9yKG1hbmRhdG9yeSksXG4gICAgICAgICAgICBsYWJlbCxcbiAgICAgICAgICAgIFwiTWluaW11bSA4IGNoYXJhY3RlcnMgY29udGFpbmluZzpcIixcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBcIkxldHRlcihzKVwiLFxuICAgICAgICAgICAgICAgIFwiTnVtYmVyKHMpXCIsXG4gICAgICAgICAgICAgICAgXCJTcGVjaWFsIGNoYXJhY3RlcihzKSAjPyFAJCVeJiotXCJcbiAgICAgICAgICAgIF0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3R5bGVzaGVldEJ1aWxkZXJ9IHN0eWxlc2hlZXRCdWlsZGVyIFxuICAgICAqIEByZXR1cm5zIHtTdHlsZXNoZWV0fVxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZFN0eWxlc2hlZXQoc3R5bGVzaGVldEJ1aWxkZXIpIHtcbiAgICAgICAgQ3NzM1N0eWxlc2hlZXRCdWlsZGVyLmNyZWF0ZShzdHlsZXNoZWV0QnVpbGRlcilcbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5wYXNzd29yZC1tYXRjaGVyLWlucHV0LXZhbHVlLWNvbnRhaW5lclwiKVxuICAgICAgICAgICAgICAgIC5wb3NpdGlvbihcInJlbGF0aXZlXCIpXG4gICAgICAgICAgICAgICAgLnBhZGRpbmcoXCIwLjVyZW1cIilcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBhc3N3b3JkLW1hdGNoZXItaW5wdXQtdmFsdWUtZW50cnlcIilcbiAgICAgICAgICAgICAgICAuZGlzcGxheShcImJsb2NrXCIpXG4gICAgICAgICAgICAgICAgLndpZHRoKFwiMTAwJVwiKVxuICAgICAgICAgICAgICAgIC5oZWlnaHQoXCJjYWxjKDEuNWVtICsgMXJlbSArIDJweClcIilcbiAgICAgICAgICAgICAgICAucGFkZGluZyhcIjAuN3JlbVwiLCBcIjAuNzVyZW1cIiwgXCIwLjNyZW1cIiwgXCIwLjc1cmVtXCIpXG4gICAgICAgICAgICAgICAgLmZvbnRTaXplKFwiMXJlbVwiKVxuICAgICAgICAgICAgICAgIC5mb250V2VpZ2h0KFwiNDAwXCIpXG4gICAgICAgICAgICAgICAgLmxpbmVIZWlnaHQoXCIxLjVcIilcbiAgICAgICAgICAgICAgICAuY29sb3IoXCIjNDk1MDU3XCIpXG4gICAgICAgICAgICAgICAgLmJhY2tncm91bmRDb2xvcihcIiNmZmZcIilcbiAgICAgICAgICAgICAgICAuYmFja2dyb3VuZENsaXAoXCJwYWRkaW5nLWJveFwiKVxuICAgICAgICAgICAgICAgIC5ib3JkZXIoXCIxcHhcIiwgXCJzb2xpZFwiLCBcIiNjZWQ0ZGFcIilcbiAgICAgICAgICAgICAgICAuYm9yZGVyUmFkaXVzKFwiMC4yNXJlbVwiKVxuICAgICAgICAgICAgICAgIC50cmFuc2l0aW9uKFtcImJvcmRlci1jb2xvclwiLCBcIjAuMTVzXCIsIG51bGwsIFwiZWFzZS1pbi1vdXRcIl0sIFtcImJveC1zaGFkb3dcIiwgXCIwLjE1c1wiLCBudWxsLCBcImVhc2UtaW4tb3V0XCJdKVxuICAgICAgICAgICAgICAgIC5tYXJnaW4obnVsbCxudWxsLFwiMXJlbVwiLG51bGwpXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucGFzc3dvcmQtbWF0Y2hlci1pbnB1dC12YWx1ZS1sYWJlbFwiKVxuICAgICAgICAgICAgICAgIC5iYWNrZ3JvdW5kQ29sb3IoXCIjZmZmXCIpXG4gICAgICAgICAgICAgICAgLnBvc2l0aW9uKFwiYWJzb2x1dGVcIilcbiAgICAgICAgICAgICAgICAucGFkZGluZyhcIjBcIiwgXCIwLjI1cmVtXCIsIFwiMFwiLCBcIjAuMjVyZW1cIilcbiAgICAgICAgICAgICAgICAuYm9yZGVyUmFkaXVzKFwiMC41cmVtXCIpXG4gICAgICAgICAgICAgICAgLnRvcChcIi0wLjFyZW1cIilcbiAgICAgICAgICAgICAgICAubGVmdChcIjAuNHJlbVwiKVxuICAgICAgICAgICAgICAgIC5tYXJnaW4oXCIwXCIsIG51bGwsIFwiMC41cmVtXCIsIG51bGwpXG4gICAgICAgICAgICAgICAgLmZvbnRTaXplKFwiMC45cmVtXCIpXG4gICAgICAgICAgICAgICAgLmZvbnRXZWlnaHQoXCJib2xkXCIpXG4gICAgICAgICAgICAgICAgLmNvbG9yKFwiIzhhOGE4YVwiKTtcblxuICAgICAgICByZXR1cm4gc3R5bGVzaGVldEJ1aWxkZXIuYnVpbGQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudEJ1aWxkZXJ9IGNvbXBvbmVudEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMge0NvbXBvbmVudH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRDb21wb25lbnQoY29tcG9uZW50QnVpbGRlcikge1xuICAgICAgICByZXR1cm4gY29tcG9uZW50QnVpbGRlclxuICAgICAgICAgICAgLnJvb3QoXCJkaXZcIiwgXCJjbGFzcz1wYXNzd29yZC1tYXRjaGVyLWlucHV0LXZhbHVlLWNvbnRhaW5lclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwiZGl2XCIsIFwiaWQ9YnViYmxlTWVzc2FnZVwiKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwibGFiZWxcIiwgXCJpZD1sYWJlbFwiLCBcImNsYXNzPXBhc3N3b3JkLW1hdGNoZXItaW5wdXQtdmFsdWUtbGFiZWwgaGlkZGVuXCIpXG4gICAgICAgICAgICAgICAgLm5vZGUoXCJpbnB1dFwiLCBcImlkPWlucHV0XCIsIFwiYXV0b2NvbXBsZXRlPW5ldy1wYXNzd29yZFwiLCBcInR5cGU9cGFzc3dvcmRcIiwgXCJjbGFzcz1wYXNzd29yZC1tYXRjaGVyLWlucHV0LXZhbHVlLWVudHJ5XCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgLmJ1aWxkKCk7XG4gICAgfVxuXG59XG5cblR5cGVDb25maWdQYWNrLmluc3RhbmNlKCkuYWRkVHlwZUNvbmZpZyhcIm51dHRpbjJjLXVpXCIsIFByb3RvdHlwZUNvbmZpZy51bm5hbWVkKFBhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWUpKTsiLCJpbXBvcnQgeyBDb21wb25lbnQsIENvbXBvbmVudEJ1aWxkZXIsIENzczNTdHlsZXNoZWV0QnVpbGRlciwgRXF1YWxzUHJvcGVydHlWYWxpZGF0b3IsIFN0eWxlc2hlZXQsIFN0eWxlc2hlZXRCdWlsZGVyIH0gZnJvbSBcIm51dHRpbjJjLWNvcmVfdjFcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuaW1wb3J0IHsgQ29tbW9uSW5wdXQgfSBmcm9tIFwiLi4vLi4vY29tbW9uSW5wdXQuanNcIjtcbmltcG9ydCB7IFByb3RvdHlwZUNvbmZpZywgVHlwZUNvbmZpZ1BhY2sgfSBmcm9tIFwibWluZGlfdjFcIjtcbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJQYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2xcIik7XG5cbmV4cG9ydCBjbGFzcyBQYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2wgZXh0ZW5kcyBDb21tb25JbnB1dCB7XG5cbiAgICBzdGF0aWMgREVGQVVMVF9MQUJFTCA9IFwiQ29uZmlybSBwYXNzd29yZFwiO1xuICAgIFxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG1vZGVsXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1vZGVsQ29tcGFyZWRQcm9wZXJ0eU5hbWVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGFiZWxcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IG1hbmRhdG9yeVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIG1vZGVsID0gbnVsbCwgbW9kZWxDb21wYXJlZFByb3BlcnR5TmFtZSA9IG51bGwsIGxhYmVsID0gUGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sLkRFRkFVTFRfTEFCRUwsXG4gICAgICAgICAgIG1hbmRhdG9yeSA9IGZhbHNlKSB7XG5cbiAgICAgICAgc3VwZXIoUGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sLFxuICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgIG1vZGVsLFxuICAgICAgICAgICAgbmV3IEVxdWFsc1Byb3BlcnR5VmFsaWRhdG9yKG1hbmRhdG9yeSwgZmFsc2UsIG1vZGVsLCBtb2RlbENvbXBhcmVkUHJvcGVydHlOYW1lKSxcbiAgICAgICAgICAgIGxhYmVsLFxuICAgICAgICAgICAgXCJQYXNzd29yZHMgbXVzdCBtYXRjaFwiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge1N0eWxlc2hlZXRCdWlsZGVyfSBzdHlsZXNoZWV0QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyB7U3R5bGVzaGVldH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRTdHlsZXNoZWV0KHN0eWxlc2hlZXRCdWlsZGVyKSB7XG4gICAgICAgIENzczNTdHlsZXNoZWV0QnVpbGRlci5jcmVhdGUoc3R5bGVzaGVldEJ1aWxkZXIpXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucGFzc3dvcmQtbWF0Y2hlci1pbnB1dC1jb250cm9sLWNvbnRhaW5lclwiKVxuICAgICAgICAgICAgICAgIC5wb3NpdGlvbihcInJlbGF0aXZlXCIpXG4gICAgICAgICAgICAgICAgLnBhZGRpbmcoXCIwLjVyZW1cIilcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBhc3N3b3JkLW1hdGNoZXItaW5wdXQtY29udHJvbC1lbnRyeVwiKVxuICAgICAgICAgICAgICAgIC5kaXNwbGF5KFwiYmxvY2tcIilcbiAgICAgICAgICAgICAgICAud2lkdGgoXCIxMDAlXCIpXG4gICAgICAgICAgICAgICAgLmhlaWdodChcImNhbGMoMS41ZW0gKyAxcmVtICsgMnB4KVwiKVxuICAgICAgICAgICAgICAgIC5wYWRkaW5nKFwiMC43cmVtXCIsIFwiMC43NXJlbVwiLCBcIjAuM3JlbVwiLCBcIjAuNzVyZW1cIilcbiAgICAgICAgICAgICAgICAuZm9udFNpemUoXCIxcmVtXCIpXG4gICAgICAgICAgICAgICAgLmZvbnRXZWlnaHQoXCI0MDBcIilcbiAgICAgICAgICAgICAgICAubGluZUhlaWdodChcIjEuNVwiKVxuICAgICAgICAgICAgICAgIC5jb2xvcihcIiM0OTUwNTdcIilcbiAgICAgICAgICAgICAgICAuYmFja2dyb3VuZENvbG9yKFwiI2ZmZlwiKVxuICAgICAgICAgICAgICAgIC5iYWNrZ3JvdW5kQ2xpcChcInBhZGRpbmctYm94XCIpXG4gICAgICAgICAgICAgICAgLmJvcmRlcihcIjFweFwiLCBcInNvbGlkXCIsIFwiI2NlZDRkYVwiKVxuICAgICAgICAgICAgICAgIC5ib3JkZXJSYWRpdXMoXCIwLjI1cmVtXCIpXG4gICAgICAgICAgICAgICAgLnRyYW5zaXRpb24oW1wiYm9yZGVyLWNvbG9yXCIsIFwiMC4xNXNcIiwgbnVsbCwgXCJlYXNlLWluLW91dFwiXSwgW1wiYm94LXNoYWRvd1wiLCBcIjAuMTVzXCIsIG51bGwsIFwiZWFzZS1pbi1vdXRcIl0pXG4gICAgICAgICAgICAgICAgLm1hcmdpbihudWxsLG51bGwsXCIxcmVtXCIsbnVsbClcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5wYXNzd29yZC1tYXRjaGVyLWlucHV0LWNvbnRyb2wtbGFiZWxcIilcbiAgICAgICAgICAgICAgICAuYmFja2dyb3VuZENvbG9yKFwiI2ZmZlwiKVxuICAgICAgICAgICAgICAgIC5wb3NpdGlvbihcImFic29sdXRlXCIpXG4gICAgICAgICAgICAgICAgLnBhZGRpbmcoXCIwXCIsIFwiMC4yNXJlbVwiLCBcIjBcIiwgXCIwLjI1cmVtXCIpXG4gICAgICAgICAgICAgICAgLmJvcmRlclJhZGl1cyhcIjAuNXJlbVwiKVxuICAgICAgICAgICAgICAgIC50b3AoXCItMC4xcmVtXCIpXG4gICAgICAgICAgICAgICAgLmxlZnQoXCIwLjRyZW1cIilcbiAgICAgICAgICAgICAgICAubWFyZ2luKFwiMFwiLCBudWxsLCBcIjAuNXJlbVwiLCBudWxsKVxuICAgICAgICAgICAgICAgIC5mb250U2l6ZShcIjAuOXJlbVwiKVxuICAgICAgICAgICAgICAgIC5mb250V2VpZ2h0KFwiYm9sZFwiKVxuICAgICAgICAgICAgICAgIC5jb2xvcihcIiM4YThhOGFcIik7XG5cbiAgICAgICAgcmV0dXJuIHN0eWxlc2hlZXRCdWlsZGVyLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDb21wb25lbnRCdWlsZGVyfSBjb21wb25lbnRCdWlsZGVyIFxuICAgICAqIEByZXR1cm5zIHtDb21wb25lbnR9XG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkQ29tcG9uZW50KGNvbXBvbmVudEJ1aWxkZXIpIHtcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudEJ1aWxkZXJcbiAgICAgICAgICAgIC5yb290KFwiZGl2XCIsIFwiY2xhc3M9cGFzc3dvcmQtbWF0Y2hlci1pbnB1dC1jb250cm9sLWNvbnRhaW5lclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwiZGl2XCIsIFwiaWQ9YnViYmxlTWVzc2FnZVwiKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwibGFiZWxcIiwgXCJpZD1sYWJlbFwiLCBcImNsYXNzPXBhc3N3b3JkLW1hdGNoZXItaW5wdXQtY29udHJvbC1sYWJlbCBoaWRkZW5cIilcbiAgICAgICAgICAgICAgICAubm9kZShcImlucHV0XCIsIFwiaWQ9aW5wdXRcIiwgXCJ0eXBlPXBhc3N3b3JkXCIsIFwiYXV0b2NvbXBsZXRlPW5ldy1wYXNzd29yZFwiLCBcImNsYXNzPXBhc3N3b3JkLW1hdGNoZXItaW5wdXQtY29udHJvbC1lbnRyeVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgIC5idWlsZCgpO1xuICAgIH1cblxufVxuXG5UeXBlQ29uZmlnUGFjay5pbnN0YW5jZSgpLmFkZFR5cGVDb25maWcoXCJudXR0aW4yYy11aVwiLCBQcm90b3R5cGVDb25maWcudW5uYW1lZChQYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2wpKTsiLCJpbXBvcnQgeyBQcm90b3R5cGVDb25maWcsIFR5cGVDb25maWdQYWNrIH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5cbmV4cG9ydCBjbGFzcyBQYXNzd29yZE1hdGNoZXJNb2RlbCB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5uZXdQYXNzd29yZCA9IG51bGw7XG4gICAgICAgIHRoaXMuY29udHJvbFBhc3N3b3JkID0gbnVsbDtcbiAgICB9XG5cbiAgICBzZXROZXdQYXNzd29yZChuZXdQYXNzd29yZCkge1xuICAgICAgICB0aGlzLm5ld1Bhc3N3b3JkID0gbmV3UGFzc3dvcmQ7XG4gICAgfVxuXG4gICAgZ2V0TmV3UGFzc3dvcmQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5ld1Bhc3N3b3JkO1xuICAgIH1cblxuICAgIHNldENvbnRyb2xQYXNzd29yZChjb250cm9sUGFzc3dvcmQpIHtcbiAgICAgICAgdGhpcy5jb250cm9sUGFzc3dvcmQgPSBjb250cm9sUGFzc3dvcmQ7XG4gICAgfVxuXG4gICAgZ2V0Q29udHJvbFBhc3N3b3JkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250cm9sUGFzc3dvcmQ7XG4gICAgfVxuXG59XG5cblR5cGVDb25maWdQYWNrLmluc3RhbmNlKCkuYWRkVHlwZUNvbmZpZyhcIm51dHRpbjJjLXVpXCIsIFByb3RvdHlwZUNvbmZpZy51bm5hbWVkKFBhc3N3b3JkTWF0Y2hlck1vZGVsKSk7IiwiaW1wb3J0IHsgXG4gICAgQ2FudmFzU3R5bGVzLFxuICAgIEFuZFZhbGlkYXRvclNldCxcbiAgICBDb21wb25lbnQsXG4gICAgRXZlbnRNYW5hZ2VyLFxuICAgIFN0eWxlc2hlZXRCdWlsZGVyLFxuICAgIFN0eWxlc2hlZXQsXG4gICAgQ29tcG9uZW50QnVpbGRlcixcbiAgICBJbmxpbmVDb21wb25lbnRGYWN0b3J5XG59IGZyb20gXCJudXR0aW4yYy1jb3JlX3YxXCI7XG5pbXBvcnQgeyBJbmplY3Rpb25Qb2ludCwgUHJvdG90eXBlQ29uZmlnLCBUeXBlQ29uZmlnUGFjayB9IGZyb20gXCJtaW5kaV92MVwiO1xuaW1wb3J0IHsgTG9nZ2VyLCBQcm9wZXJ0eUFjY2Vzc29yLCBNZXRob2QgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcbmltcG9ydCB7IFBhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWUgfSBmcm9tIFwiLi9wYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlL3Bhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWUuanNcIjtcbmltcG9ydCB7IFBhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbCB9IGZyb20gXCIuL3Bhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbC9wYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2wuanNcIjtcbmltcG9ydCB7IFBhc3N3b3JkTWF0Y2hlck1vZGVsIH0gZnJvbSBcIi4vcGFzc3dvcmRNYXRjaGVyTW9kZWwuanNcIjtcbmltcG9ydCB7IENvbW1vbklucHV0IH0gZnJvbSBcIi4uL2NvbW1vbklucHV0LmpzXCI7XG5cbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJQYXNzd29yZE1hdGNoZXJJbnB1dFwiKTtcblxuZXhwb3J0IGNsYXNzIFBhc3N3b3JkTWF0Y2hlcklucHV0IHtcblxuXHRzdGF0aWMgRVZFTlRfVkFMSURBVEVEX0VOVEVSRUQgPSBcInZhbGlkYXRlZEVudGVyZWRcIjtcblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG1vZGVsXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBsYWNlaG9sZGVyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbnRyb2xQbGFjZWhvbGRlclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gbWFuZGF0b3J5XG4gICAgICovXG4gICAgY29uc3RydWN0b3IobmFtZSxcbiAgICAgICAgbW9kZWwgPSBudWxsLFxuICAgICAgICBwbGFjZWhvbGRlciA9IFBhc3N3b3JkTWF0Y2hlcklucHV0LkRFRkFVTFRfUExBQ0VIT0xERVIsIFxuICAgICAgICBjb250cm9sUGxhY2Vob2xkZXIgPSBQYXNzd29yZE1hdGNoZXJJbnB1dC5ERUZBVUxUX0NPTlRST0xfUExBQ0VIT0xERVIsXG4gICAgICAgIG1hbmRhdG9yeSA9IGZhbHNlKSB7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtJbmxpbmVDb21wb25lbnRGYWN0b3J5fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShJbmxpbmVDb21wb25lbnRGYWN0b3J5KTtcblxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudH0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSBudWxsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7QW5kVmFsaWRhdG9yU2V0fSAqL1xuICAgICAgICB0aGlzLnZhbGlkYXRvciA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5wYXNzd29yZE1hdGNoZXJNb2RlbCA9IG5ldyBQYXNzd29yZE1hdGNoZXJNb2RlbCgpO1xuXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcblxuICAgICAgICAvKiogQHR5cGUge1Bhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWV9ICovXG5cdFx0dGhpcy5wYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoUGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZSxcbiAgICAgICAgICAgIFtcIm5ld1Bhc3N3b3JkXCIsIHRoaXMucGFzc3dvcmRNYXRjaGVyTW9kZWwsIHBsYWNlaG9sZGVyLCBtYW5kYXRvcnldXG5cdFx0KTtcblxuICAgICAgICAvKiogQHR5cGUge1Bhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbH0gKi9cblx0XHR0aGlzLnBhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbCA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKFBhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbCxcbiAgICAgICAgICAgIFtcImNvbnRyb2xQYXNzd29yZFwiLCB0aGlzLnBhc3N3b3JkTWF0Y2hlck1vZGVsLCBcIm5ld1Bhc3N3b3JkXCIsIGNvbnRyb2xQbGFjZWhvbGRlciwgbWFuZGF0b3J5XVxuXHRcdCk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtFdmVudE1hbmFnZXJ9ICovXG4gICAgICAgIHRoaXMuZXZlbnRNYW5hZ2VyID0gbmV3IEV2ZW50TWFuYWdlcigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3R5bGVzaGVldEJ1aWxkZXJ9IHN0eWxlc2hlZXRCdWlsZGVyIFxuICAgICAqIEByZXR1cm5zIHtTdHlsZXNoZWV0fVxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZFN0eWxlc2hlZXQoc3R5bGVzaGVldEJ1aWxkZXIpIHtcbiAgICAgICBzdHlsZXNoZWV0QnVpbGRlclxuICAgICAgICAgICAuc2VsZWN0b3IoXCIucGFzc3dvcmQtbWF0Y2hlci1pbnB1dC1oaW50XCIpXG4gICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgIC5zdHlsZShcImNvbG9yXCIsIFwiIzg4ODg4OFwiKVxuICAgICAgICAgICAgICAgLnN0eWxlKFwiZm9udC1zaXplXCIsIFwiMC44ZW1cIilcbiAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpbi1ib3R0b21cIiwgXCIxcmVtXCIpXG4gICAgICAgICAgICAgICAuc3R5bGUoXCJ3aGl0ZS1zcGFjZVwiLCBcIm5vd3JhcFwiKVxuICAgICAgICAgICAuY2xvc2UoKTtcblxuICAgICAgIHJldHVybiBzdHlsZXNoZWV0QnVpbGRlci5idWlsZCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Q29tcG9uZW50QnVpbGRlcn0gY29tcG9uZW50QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyB7Q29tcG9uZW50fVxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZENvbXBvbmVudChjb21wb25lbnRCdWlsZGVyKSB7XG4gICAgICAgIHJldHVybiBjb21wb25lbnRCdWlsZGVyXG4gICAgICAgICAgICAucm9vdChcImRpdlwiLCBcImNsYXNzPXBhc3N3b3JkLW1hdGNoZXItaW5wdXQtcm9vdFwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwiZGl2XCIsIFwiaWQ9cGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZVwiKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwiZGl2XCIsIFwiaWQ9cGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sXCIpXG4gICAgICAgICAgICAgICAgLm5vZGUoXCJkaXZcIiwgXCJjbGFzcz1wYXNzd29yZC1tYXRjaGVyLWlucHV0LWhpbnRcIilcbiAgICAgICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgICAgIC50ZXh0KFwiKiBNdXN0IGNvbnRhaW4gbGV0dGVycywgbnVtYmVycyBhbmQgc3BlY2lhbCBjaGFyYWN0ZXJzXCIpXG4gICAgICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAuYnVpbGQoKTtcbiAgICB9XG5cbiAgICBhc3luYyBwb3N0Q29uZmlnKCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoUGFzc3dvcmRNYXRjaGVySW5wdXQpO1xuXG4gICAgICAgIENhbnZhc1N0eWxlcy5lbmFibGVTdHlsZShQYXNzd29yZE1hdGNoZXJJbnB1dC5uYW1lKTtcblxuICAgICAgICB0aGlzLmNvbXBvbmVudC5zZXRDaGlsZChcInBhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWVcIix0aGlzLnBhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWUuY29tcG9uZW50KTtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuc2V0Q2hpbGQoXCJwYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2xcIix0aGlzLnBhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbC5jb21wb25lbnQpO1xuXG4gICAgICAgIHRoaXMucGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZS5ldmVudHNcbiAgICAgICAgICAgIC5saXN0ZW5UbyhDb21tb25JbnB1dC5FVkVOVF9FTlRFUkVELCB0aGlzLnBhc3N3b3JkVmFsdWVFbnRlcmVkLCB0aGlzKVxuICAgICAgICAgICAgLmxpc3RlblRvKENvbW1vbklucHV0LkVWRU5UX0tFWVVQUEVELCB0aGlzLnBhc3N3b3JkVmFsdWVDaGFuZ2VkLCB0aGlzKTtcblxuICAgICAgICB0aGlzLnBhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbC5ldmVudHNcbiAgICAgICAgICAgIC5saXN0ZW5UbyhDb21tb25JbnB1dC5FVkVOVF9FTlRFUkVELCB0aGlzLnBhc3N3b3JkQ29udHJvbEVudGVyZWQsIHRoaXMpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7QW5kVmFsaWRhdG9yU2V0fSAqL1xuICAgICAgICB0aGlzLnZhbGlkYXRvciA9IG5ldyBBbmRWYWxpZGF0b3JTZXQoKVxuICAgICAgICAgICAgLndpdGhWYWxpZGF0b3IodGhpcy5wYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlLnZhbGlkYXRvcilcbiAgICAgICAgICAgIC53aXRoVmFsaWRhdG9yKHRoaXMucGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sLnZhbGlkYXRvcilcbiAgICAgICAgICAgIC53aXRoVmFsaWRMaXN0ZW5lcihuZXcgTWV0aG9kKHRoaXMucGFzc3dvcmRNYXRjaGVyVmFsaWRPY2N1cmVkLCB0aGlzKSk7XG5cbiAgICB9XG5cbiAgICBnZXQgZXZlbnRzKCkgeyByZXR1cm4gdGhpcy5ldmVudE1hbmFnZXI7IH1cblxuICAgIHBhc3N3b3JkTWF0Y2hlclZhbGlkT2NjdXJlZCgpIHtcbiAgICAgICAgUHJvcGVydHlBY2Nlc3Nvci5zZXRWYWx1ZSh0aGlzLm1vZGVsLCB0aGlzLm5hbWUsIHRoaXMucGFzc3dvcmRNYXRjaGVyTW9kZWwuZ2V0TmV3UGFzc3dvcmQoKSlcbiAgICB9XG5cbiAgICBwYXNzd29yZFZhbHVlRW50ZXJlZChldmVudCkge1xuICAgICAgICBpZiAodGhpcy5wYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlLnZhbGlkYXRvci5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgIHRoaXMucGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwYXNzd29yZFZhbHVlQ2hhbmdlZChldmVudCkge1xuICAgICAgICB0aGlzLnBhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbC5jbGVhcigpO1xuICAgIH1cblxuICAgIHBhc3N3b3JkQ29udHJvbEVudGVyZWQoZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMudmFsaWRhdG9yLmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgdGhpcy5ldmVudHMudHJpZ2dlcihQYXNzd29yZE1hdGNoZXJJbnB1dC5FVkVOVF9WQUxJREFURURfRU5URVJFRCwgZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZm9jdXMoKSB7IHRoaXMucGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZS5mb2N1cygpOyB9XG4gICAgc2VsZWN0QWxsKCkgeyB0aGlzLnBhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWUuc2VsZWN0QWxsKCk7IH1cbiAgICBlbmFibGUoKSB7IHRoaXMucGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZS5lbmFibGUoKTsgdGhpcy5wYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2wuZW5hYmxlKCk7IH1cbiAgICBkaXNhYmxlKCkgeyB0aGlzLnBhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWUuZGlzYWJsZSgpOyB0aGlzLnBhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbC5kaXNhYmxlKCk7IH1cbiAgICBjbGVhcigpIHsgdGhpcy5wYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlLmNsZWFyKCk7IHRoaXMucGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sLmNsZWFyKCk7IH1cbn1cblxuVHlwZUNvbmZpZ1BhY2suaW5zdGFuY2UoKS5hZGRUeXBlQ29uZmlnKFwibnV0dGluMmMtdWlcIiwgUHJvdG90eXBlQ29uZmlnLnVubmFtZWQoUGFzc3dvcmRNYXRjaGVySW5wdXQpKTsiLCJpbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcbmltcG9ydCB7IENvbW1vbklucHV0IH0gZnJvbSBcIi4uL2NvbW1vbklucHV0LmpzXCI7XG5pbXBvcnQgeyBDb21wb25lbnQsIENvbXBvbmVudEJ1aWxkZXIsIENzczNTdHlsZXNoZWV0QnVpbGRlciwgUGhvbmVWYWxpZGF0b3IsIFN0eWxlc2hlZXQsIFN0eWxlc2hlZXRCdWlsZGVyIH0gZnJvbSBcIm51dHRpbjJjLWNvcmVfdjFcIjtcbmltcG9ydCB7IFByb3RvdHlwZUNvbmZpZywgVHlwZUNvbmZpZ1BhY2sgfSBmcm9tIFwibWluZGlfdjFcIjtcblxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIlBob25lSW5wdXRcIik7XG5cbmV4cG9ydCBjbGFzcyBQaG9uZUlucHV0IGV4dGVuZHMgQ29tbW9uSW5wdXQge1xuXG4gICAgc3RhdGljIERFRkFVTFRfUExBQ0VIT0xERVIgPSBcIlBob25lXCI7XG4gICAgXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gbW9kZWxcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGxhY2Vob2xkZXJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IG1hbmRhdG9yeVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIG1vZGVsID0gbnVsbCwgcGxhY2Vob2xkZXIgPSBUZXh0SW5wdXQuREVGQVVMVF9QTEFDRUhPTERFUiwgbWFuZGF0b3J5ID0gZmFsc2UpIHtcblxuICAgICAgICBzdXBlcihQaG9uZUlucHV0LFxuICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgIG1vZGVsLFxuICAgICAgICAgICAgbmV3IFBob25lVmFsaWRhdG9yKG1hbmRhdG9yeSwgIW1hbmRhdG9yeSksXG4gICAgICAgICAgICBwbGFjZWhvbGRlcixcbiAgICAgICAgICAgIFwiSW52YWxpZCBwaG9uZSBudW1iZXJcIixcbiAgICAgICAgICAgIFtcIk11c3Qgc3RhcnQgd2l0aCArIHNpZ25cIiwgXCJmb2xsb3dlZCBieSBtaW5pbXVtIDggbnVtYmVyc1wiXSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHlsZXNoZWV0QnVpbGRlcn0gc3R5bGVzaGVldEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMge1N0eWxlc2hlZXR9XG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkU3R5bGVzaGVldChzdHlsZXNoZWV0QnVpbGRlcikge1xuICAgICAgICBDc3MzU3R5bGVzaGVldEJ1aWxkZXIuY3JlYXRlKHN0eWxlc2hlZXRCdWlsZGVyKVxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBob25lLWlucHV0LWNvbnRhaW5lclwiKVxuICAgICAgICAgICAgICAgIC5wb3NpdGlvbihcInJlbGF0aXZlXCIpXG4gICAgICAgICAgICAgICAgLnBhZGRpbmcoXCIwLjVyZW1cIilcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBob25lLWlucHV0LWVudHJ5XCIpXG4gICAgICAgICAgICAgICAgLmRpc3BsYXkoXCJibG9ja1wiKVxuICAgICAgICAgICAgICAgIC53aWR0aChcIjEwMCVcIilcbiAgICAgICAgICAgICAgICAuaGVpZ2h0KFwiY2FsYygxLjVlbSArIDFyZW0gKyAycHgpXCIpXG4gICAgICAgICAgICAgICAgLnBhZGRpbmcoXCIwLjdyZW1cIiwgXCIwLjc1cmVtXCIsIFwiMC4zcmVtXCIsIFwiMC43NXJlbVwiKVxuICAgICAgICAgICAgICAgIC5mb250U2l6ZShcIjFyZW1cIilcbiAgICAgICAgICAgICAgICAuZm9udFdlaWdodChcIjQwMFwiKVxuICAgICAgICAgICAgICAgIC5saW5lSGVpZ2h0KFwiMS41XCIpXG4gICAgICAgICAgICAgICAgLmNvbG9yKFwiIzQ5NTA1N1wiKVxuICAgICAgICAgICAgICAgIC5iYWNrZ3JvdW5kQ29sb3IoXCIjZmZmXCIpXG4gICAgICAgICAgICAgICAgLmJhY2tncm91bmRDbGlwKFwicGFkZGluZy1ib3hcIilcbiAgICAgICAgICAgICAgICAuYm9yZGVyKFwiMXB4XCIsIFwic29saWRcIiwgXCIjY2VkNGRhXCIpXG4gICAgICAgICAgICAgICAgLmJvcmRlclJhZGl1cyhcIjAuMjVyZW1cIilcbiAgICAgICAgICAgICAgICAudHJhbnNpdGlvbihbXCJib3JkZXItY29sb3JcIiwgXCIwLjE1c1wiLCBudWxsLCBcImVhc2UtaW4tb3V0XCJdLCBbXCJib3gtc2hhZG93XCIsIFwiMC4xNXNcIiwgbnVsbCwgXCJlYXNlLWluLW91dFwiXSlcbiAgICAgICAgICAgICAgICAubWFyZ2luKG51bGwsbnVsbCxcIjFyZW1cIixudWxsKVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBob25lLWxhYmVsXCIpXG4gICAgICAgICAgICAgICAgLmJhY2tncm91bmRDb2xvcihcIiNmZmZcIilcbiAgICAgICAgICAgICAgICAucG9zaXRpb24oXCJhYnNvbHV0ZVwiKVxuICAgICAgICAgICAgICAgIC5wYWRkaW5nKFwiMFwiLCBcIjAuMjVyZW1cIiwgXCIwXCIsIFwiMC4yNXJlbVwiKVxuICAgICAgICAgICAgICAgIC5ib3JkZXJSYWRpdXMoXCIwLjVyZW1cIilcbiAgICAgICAgICAgICAgICAudG9wKFwiLTAuMXJlbVwiKVxuICAgICAgICAgICAgICAgIC5sZWZ0KFwiMC40cmVtXCIpXG4gICAgICAgICAgICAgICAgLm1hcmdpbihcIjBcIiwgbnVsbCwgXCIwLjVyZW1cIiwgbnVsbClcbiAgICAgICAgICAgICAgICAuZm9udFNpemUoXCIwLjlyZW1cIilcbiAgICAgICAgICAgICAgICAuZm9udFdlaWdodChcImJvbGRcIilcbiAgICAgICAgICAgICAgICAuY29sb3IoXCIjOGE4YThhXCIpO1xuXG4gICAgICAgIHJldHVybiBzdHlsZXNoZWV0QnVpbGRlci5idWlsZCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Q29tcG9uZW50QnVpbGRlcn0gY29tcG9uZW50QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyB7Q29tcG9uZW50fVxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZENvbXBvbmVudChjb21wb25lbnRCdWlsZGVyKSB7XG4gICAgICAgIGNvbXBvbmVudEJ1aWxkZXJcbiAgICAgICAgICAgIC5yb290KFwiZGl2XCIsIFwiY2xhc3M9cGhvbmUtaW5wdXQtY29udGFpbmVyXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLm5vZGUoXCJkaXZcIiwgXCJpZD1idWJibGVNZXNzYWdlXCIpXG4gICAgICAgICAgICAgICAgLm5vZGUoXCJsYWJlbFwiLCBcImlkPWxhYmVsXCIsIFwiY2xhc3M9cGhvbmUtbGFiZWwgaGlkZGVuXCIpXG4gICAgICAgICAgICAgICAgLm5vZGUoXCJpbnB1dFwiLCBcImlkPWlucHV0XCIsIFwidHlwZT10ZXh0XCIsIFwiY2xhc3M9cGhvbmUtaW5wdXQtZW50cnlcIilcbiAgICAgICAgICAgIC5jbG9zZSgpO1xuICAgICAgICByZXR1cm4gY29tcG9uZW50QnVpbGRlci5idWlsZCgpO1xuICAgIH1cblxufVxuXG5UeXBlQ29uZmlnUGFjay5pbnN0YW5jZSgpLmFkZFR5cGVDb25maWcoXCJudXR0aW4yYy11aVwiLCBQcm90b3R5cGVDb25maWcudW5uYW1lZChQaG9uZUlucHV0KSk7IiwiaW1wb3J0IHtcbiAgICBDYW52YXNTdHlsZXMsXG4gICAgQ29tcG9uZW50LFxuICAgIElucHV0RWxlbWVudERhdGFCaW5kaW5nLFxuICAgIEV2ZW50TWFuYWdlcixcbiAgICBTdHlsZXNoZWV0QnVpbGRlcixcbiAgICBTdHlsZXNoZWV0LFxuICAgIENvbXBvbmVudEJ1aWxkZXIsXG4gICAgSW5saW5lQ29tcG9uZW50RmFjdG9yeVxufSBmcm9tIFwibnV0dGluMmMtY29yZV92MVwiO1xuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQsIFByb3RvdHlwZUNvbmZpZywgVHlwZUNvbmZpZ1BhY2sgfSBmcm9tIFwibWluZGlfdjFcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuaW1wb3J0IHsgQ29tbW9uRXZlbnRzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21tb25FdmVudHNcIjtcblxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIlJhZGlvQnV0dG9uXCIpO1xuXG5leHBvcnQgY2xhc3MgUmFkaW9CdXR0b24ge1xuICAgIFxuICAgIHN0YXRpYyBFVkVOVF9DTElDS0VEID0gQ29tbW9uRXZlbnRzLkNMSUNLRUQ7XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gbW9kZWxcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBtb2RlbCA9IG51bGwpIHtcbiAgICAgICAgXG4gICAgICAgIC8qKiBAdHlwZSB7SW5saW5lQ29tcG9uZW50RmFjdG9yeX0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoSW5saW5lQ29tcG9uZW50RmFjdG9yeSk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtFdmVudE1hbmFnZXJ9ICovXG4gICAgICAgIHRoaXMuZXZlbnRzID0gbmV3IEV2ZW50TWFuYWdlcigpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IG51bGw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtvYmplY3R9ICovXG4gICAgICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3R5bGVzaGVldEJ1aWxkZXJ9IHN0eWxlc2hlZXRCdWlsZGVyIFxuICAgICAqIEByZXR1cm5zIHtTdHlsZXNoZWV0fVxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZFN0eWxlc2hlZXQoc3R5bGVzaGVldEJ1aWxkZXIpIHtcbiAgICAgICAgc3R5bGVzaGVldEJ1aWxkZXJcbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5yYWRpby1idXR0b25cIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLCBcInJlbGF0aXZlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZy1sZWZ0XCIsIFwiMmVtXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luLWJvdHRvbVwiLCBcIjAuNWVtXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY3Vyc29yXCIsIFwicG9pbnRlclwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIi13ZWJraXQtdXNlci1zZWxlY3RcIiwgXCJub25lXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiLW1vei11c2VyLXNlbGVjdFwiLCBcIm5vbmVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCItbXMtdXNlci1zZWxlY3RcIiwgXCJub25lXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidXNlci1zZWxlY3RcIiwgXCJub25lXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luLWJvdHRvbVwiLCBcIjFyZW1cIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5yYWRpby1idXR0b24gaW5wdXRcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLCBcImFic29sdXRlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCBcIjBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjdXJzb3JcIiwgXCJwb2ludGVyXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiaGVpZ2h0XCIsIFwiMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIndpZHRoXCIsIFwiMFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnJhZGlvLWJ1dHRvbi1tYXJrXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIiwgXCJhYnNvbHV0ZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRvcFwiLCBcIjBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJsZWZ0XCIsIFwiMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIndpZHRoXCIsIFwiMjBwdFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImhlaWdodFwiLCBcIjIwcHRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiI2RkZFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1yYWRpdXNcIiwgXCI1MCVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItd2lkdGhcIiwgXCIxcHRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItc3R5bGVcIiwgXCJzb2xpZFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1jb2xvclwiLCBcIiNiYmJcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5yYWRpby1idXR0b246aG92ZXIgaW5wdXQgfiAuY2hlY2stYm94LW1hcmtcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiIzIxOTZGM1wiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnJhZGlvLWJ1dHRvbiBpbnB1dDpjaGVja2VkIH4gLnJhZGlvLWJ1dHRvbi1tYXJrXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiNkZGRcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5yYWRpby1idXR0b24tbWFyazphZnRlclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbnRlbnRcIiwgXCJcXFwiXFxcIlwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBvc2l0aW9uXCIsIFwiYWJzb2x1dGVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIFwibm9uZVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnJhZGlvLWJ1dHRvbiBpbnB1dDpjaGVja2VkIH4gLnJhZGlvLWJ1dHRvbi1tYXJrOmFmdGVyXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucmFkaW8tYnV0dG9uIC5yYWRpby1idXR0b24tbWFyazphZnRlclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImxlZnRcIiwgXCI1MCVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0b3BcIiwgXCI1MCVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoLTUwJSwgLTUwJSlcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLCBcIjE0cHRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJoZWlnaHRcIiwgXCIxNHB0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiMyMTk2RjNcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItcmFkaXVzXCIsIFwiNTAlXCIpXG4gICAgICAgICAgICAuY2xvc2UoKTtcbiAgICAgICAgcmV0dXJuIHN0eWxlc2hlZXRCdWlsZGVyLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDb21wb25lbnRCdWlsZGVyfSBjb21wb25lbnRCdWlsZGVyIFxuICAgICAqIEByZXR1cm5zIHtDb21wb25lbnR9XG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkQ29tcG9uZW50KGNvbXBvbmVudEJ1aWxkZXIpIHtcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudEJ1aWxkZXJcbiAgICAgICAgICAgIC5yb290KFwibGFiZWxcIiwgXCJjbGFzcz1yYWRpby1idXR0b25cIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAubm9kZShcImlucHV0XCIsIFwiaWQ9cmFkaW9cIiwgXCJ0eXBlPXJhZGlvXCIpXG4gICAgICAgICAgICAgICAgLm5vZGUoXCJzcGFuXCIsIFwiY2xhc3M9cmFkaW8tYnV0dG9uLW1hcmtcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAuYnVpbGQoKTtcbiAgICB9XG5cbiAgICBwb3N0Q29uZmlnKCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoUmFkaW9CdXR0b24pO1xuICAgICAgICBDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUoUmFkaW9CdXR0b24ubmFtZSk7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcInJhZGlvXCIpLnNldEF0dHJpYnV0ZVZhbHVlKFwibmFtZVwiLHRoaXMubmFtZSk7XG5cbiAgICAgICAgaWYgKHRoaXMubW9kZWwpIHtcbiAgICAgICAgICAgIElucHV0RWxlbWVudERhdGFCaW5kaW5nLmxpbmsodGhpcy5tb2RlbCkudG8odGhpcy5jb21wb25lbnQuZ2V0KFwicmFkaW9cIikpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwicmFkaW9cIikubGlzdGVuVG8oXCJjbGlja1wiLCB0aGlzLmNsaWNrZWQsIHRoaXMpO1xuICAgIH1cblxuICAgIGNsaWNrZWQoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5ldmVudHMudHJpZ2dlcihSYWRpb0J1dHRvbi5FVkVOVF9DTElDS0VELCBbZXZlbnRdKTtcbiAgICB9XG5cbn1cblxuVHlwZUNvbmZpZ1BhY2suaW5zdGFuY2UoKS5hZGRUeXBlQ29uZmlnKFwibnV0dGluMmMtdWlcIiwgUHJvdG90eXBlQ29uZmlnLnVubmFtZWQoUmFkaW9CdXR0b24pKTsiLCJpbXBvcnQge1xuICAgIENhbnZhc1N0eWxlcyxcbiAgICBDb21wb25lbnQsXG4gICAgSW5wdXRFbGVtZW50RGF0YUJpbmRpbmcsXG4gICAgRXZlbnRNYW5hZ2VyLFxuICAgIFN0eWxlc2hlZXRCdWlsZGVyLFxuICAgIFN0eWxlc2hlZXQsXG4gICAgQ29tcG9uZW50QnVpbGRlcixcbiAgICBJbmxpbmVDb21wb25lbnRGYWN0b3J5XG59IGZyb20gXCJudXR0aW4yYy1jb3JlX3YxXCI7XG5pbXBvcnQgeyBJbmplY3Rpb25Qb2ludCwgUHJvdG90eXBlQ29uZmlnLCBUeXBlQ29uZmlnUGFjayB9IGZyb20gXCJtaW5kaV92MVwiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5pbXBvcnQgeyBDb21tb25FdmVudHMgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbW1vbkV2ZW50c1wiO1xuaW1wb3J0IHsgQ29udGFpbmVyRXZlbnQgfSBmcm9tIFwiY29udGFpbmVyYnJpZGdlX3YxXCI7XG5cbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJSYWRpb1RvZ2dsZVN3aXRjaFwiKTtcblxuZXhwb3J0IGNsYXNzIFJhZGlvVG9nZ2xlU3dpdGNoIHtcbiAgICBcbiAgICBzdGF0aWMgRVZFTlRfRU5BQkxFRCA9IENvbW1vbkV2ZW50cy5FTkFCTEVEO1xuICAgIHN0YXRpYyBFVkVOVF9ESVNBQkxFRCA9IENvbW1vbkV2ZW50cy5ESVNBQkxFRDtcbiAgICBzdGF0aWMgRVZFTlRfQ0hBTkdFRCA9IENvbW1vbkV2ZW50cy5DSEFOR0VEO1xuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG1vZGVsXG4gICAgICovXG4gICAgY29uc3RydWN0b3IobW9kZWwgPSBudWxsKSB7XG4gICAgICAgIFxuICAgICAgICAvKiogQHR5cGUge0lubGluZUNvbXBvbmVudEZhY3Rvcnl9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKElubGluZUNvbXBvbmVudEZhY3RvcnkpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7RXZlbnRNYW5hZ2VyfSAqL1xuICAgICAgICB0aGlzLmV2ZW50cyA9IG5ldyBFdmVudE1hbmFnZXIoKTtcblxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudH0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSBudWxsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7b2JqZWN0fSAqL1xuICAgICAgICB0aGlzLm1vZGVsID0gbW9kZWw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtib29sZWFufSAqL1xuICAgICAgICB0aGlzLmNoZWNrZWQgPSBmYWxzZTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3R5bGVzaGVldEJ1aWxkZXJ9IHN0eWxlc2hlZXRCdWlsZGVyIFxuICAgICAqIEByZXR1cm5zIHtTdHlsZXNoZWV0fVxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZFN0eWxlc2hlZXQoc3R5bGVzaGVldEJ1aWxkZXIpIHtcbiAgICAgICBzdHlsZXNoZWV0QnVpbGRlclxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnJhZGlvLXRvZ2dsZS1zd2l0Y2hcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLCBcInJlbGF0aXZlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLCBcImlubGluZS1ibG9ja1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIndpZHRoXCIsIFwiNDFwdFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImhlaWdodFwiLCBcIjI0cHRcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5yYWRpby10b2dnbGUtc3dpdGNoIGlucHV0XCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCBcIjBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLCBcIjBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJoZWlnaHRcIiwgXCIwXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucmFkaW8tdG9nZ2xlLXN3aXRjaC1zbGlkZXJcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLCBcImFic29sdXRlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY3Vyc29yXCIsIFwicG9pbnRlclwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRvcFwiLCBcIjBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJsZWZ0XCIsIFwiMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInJpZ2h0XCIsIFwiMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvdHRvbVwiLCBcIjBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiI2NjY1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1yYWRpdXNcIiwgXCIyNHB0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNpdGlvblwiLCBcIi40c1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci13aWR0aFwiLCBcIjFwdFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1zdHlsZVwiLCBcInNvbGlkXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyLWNvbG9yXCIsIFwiI2JiYlwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnJhZGlvLXRvZ2dsZS1zd2l0Y2gtc2xpZGVyOmJlZm9yZVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBvc2l0aW9uXCIsIFwiYWJzb2x1dGVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjb250ZW50XCIsIFwiXFxcIlxcXCJcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJoZWlnaHRcIiwgXCIxN3B0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwid2lkdGhcIiwgXCIxN3B0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibGVmdFwiLCBcIjMuNXB0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm90dG9tXCIsIFwiMy41cHRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwid2hpdGVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItcmFkaXVzXCIsIFwiNTAlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNpdGlvblwiLCBcIi40c1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZVgoMClcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5yYWRpby10b2dnbGUtc3dpdGNoOmhvdmVyIC5yYWRpby10b2dnbGUtc3dpdGNoLXNsaWRlclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIiwgXCIjYmJiXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucmFkaW8tdG9nZ2xlLXN3aXRjaCBpbnB1dDpjaGVja2VkICsgLnJhZGlvLXRvZ2dsZS1zd2l0Y2gtc2xpZGVyXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiMyMTk2RjNcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItY29sb3JcIiwgXCIjMTk3NkQyXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucmFkaW8tdG9nZ2xlLXN3aXRjaCBpbnB1dDpjaGVja2VkICsgLnJhZGlvLXRvZ2dsZS1zd2l0Y2gtc2xpZGVyOmJlZm9yZVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZVgoMTdwdClcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5yYWRpby10b2dnbGUtc3dpdGNoIGlucHV0OmZvY3VzICsgLnJhZGlvLXRvZ2dsZS1zd2l0Y2gtc2xpZGVyXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm94LXNoYWRvd1wiLCBcIjAgMCAxcHQgIzIxOTZGM1wiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnJhZGlvLXRvZ2dsZS1zd2l0Y2ggaW5wdXQ6ZGlzYWJsZWQgKyAucmFkaW8tdG9nZ2xlLXN3aXRjaC1zbGlkZXJcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMC42XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY3Vyc29yXCIsIFwibm90LWFsbG93ZWRcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5yYWRpby10b2dnbGUtc3dpdGNoIGlucHV0OmRpc2FibGVkOmhvdmVyICsgLnJhZGlvLXRvZ2dsZS1zd2l0Y2gtc2xpZGVyXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiNjY2NcIilcbiAgICAgICAgICAgIC5jbG9zZSgpO1xuXG4gICAgICAgIHJldHVybiBzdHlsZXNoZWV0QnVpbGRlci5idWlsZCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Q29tcG9uZW50QnVpbGRlcn0gY29ubXBvbmVudEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMge0NvbXBvbmVudH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRDb21wb25lbnQoY29ubXBvbmVudEJ1aWxkZXIpIHtcbiAgICAgICAgcmV0dXJuIGNvbm1wb25lbnRCdWlsZGVyXG4gICAgICAgICAgICAucm9vdChcImxhYmVsXCIsIFwiY2xhc3M9cmFkaW8tdG9nZ2xlLXN3aXRjaFwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwiaW5wdXRcIiwgXCJpZD1jaGVja2JveFwiLCBcInR5cGU9Y2hlY2tib3hcIilcbiAgICAgICAgICAgICAgICAubm9kZShcInNwYW5cIiwgXCJjbGFzcz1yYWRpby10b2dnbGUtc3dpdGNoLXNsaWRlclwiKVxuICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgIC5idWlsZCgpO1xuICAgIH1cblxuICAgIHBvc3RDb25maWcoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZShSYWRpb1RvZ2dsZVN3aXRjaCk7XG4gICAgICAgIENhbnZhc1N0eWxlcy5lbmFibGVTdHlsZShSYWRpb1RvZ2dsZVN3aXRjaC5uYW1lKTtcblxuICAgICAgICBpZiAodGhpcy5tb2RlbCkge1xuICAgICAgICAgICAgSW5wdXRFbGVtZW50RGF0YUJpbmRpbmcubGluayh0aGlzLm1vZGVsKS50byh0aGlzLmNvbXBvbmVudC5nZXQoXCJjaGVja2JveFwiKSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJjaGVja2JveFwiKS5saXN0ZW5UbyhcImNoYW5nZVwiLCB0aGlzLmNsaWNrZWQsIHRoaXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Q29udGFpbmVyRXZlbnR9IGV2ZW50IFxuICAgICAqL1xuICAgIGNsaWNrZWQoZXZlbnQpIHtcbiAgICAgICAgY29uc3Qgb2xkVmFsdWUgPSB0aGlzLmNoZWNrZWQ7XG4gICAgICAgIHRoaXMuY2hlY2tlZCA9IGV2ZW50LnRhcmdldC5jaGVja2VkO1xuXG4gICAgICAgIGlmIChvbGRWYWx1ZSAhPT0gdGhpcy5jaGVja2VkKSB7XG4gICAgICAgICAgICB0aGlzLmV2ZW50cy50cmlnZ2VyKFJhZGlvVG9nZ2xlU3dpdGNoLkVWRU5UX0NIQU5HRUQsIFtldmVudCwgdGhpcy5jaGVja2VkXSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5jaGVja2VkKSB7XG4gICAgICAgICAgICB0aGlzLmV2ZW50cy50cmlnZ2VyKFJhZGlvVG9nZ2xlU3dpdGNoLkVWRU5UX0VOQUJMRUQsIFtldmVudF0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5ldmVudHMudHJpZ2dlcihSYWRpb1RvZ2dsZVN3aXRjaC5FVkVOVF9ESVNBQkxFRCwgW2V2ZW50XSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSB0b2dnbGUgc3RhdGUgcHJvZ3JhbW1hdGljYWxseVxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gY2hlY2tlZCBcbiAgICAgKi9cbiAgICB0b2dnbGUoY2hlY2tlZCkge1xuICAgICAgICBpZiAodGhpcy5jaGVja2VkID09PSBjaGVja2VkKSB7XG4gICAgICAgICAgICByZXR1cm47IC8vIE5vIGNoYW5nZVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2hlY2tlZCA9IGNoZWNrZWQ7XG4gICAgICAgIGlmICh0aGlzLmNvbXBvbmVudCkge1xuICAgICAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiY2hlY2tib3hcIikuY29udGFpbmVyRWxlbWVudC5jbGljaygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBjdXJyZW50IHRvZ2dsZSBzdGF0ZVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGlzQ2hlY2tlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hlY2tlZDtcbiAgICB9XG5cbn1cblxuVHlwZUNvbmZpZ1BhY2suaW5zdGFuY2UoKS5hZGRUeXBlQ29uZmlnKFwibnV0dGluMmMtdWlcIiwgUHJvdG90eXBlQ29uZmlnLnVubmFtZWQoUmFkaW9Ub2dnbGVTd2l0Y2gpKTsiLCJpbXBvcnQgeyBFdmVudE1hbmFnZXIsIE9wdGlvbkVsZW1lbnQgfSBmcm9tIFwibnV0dGluMmMtY29yZV92MVwiO1xuXG5leHBvcnQgY2xhc3MgU2VsZWN0SW5wdXRPcHRpb25zU291cmNlIHtcbiAgICBcbiAgICBzdGF0aWMgRVZFTlRfT1BUSU9OU19DSEFOR0VEID0gXCJvcHRpb25zQ2hhbmdlZFwiO1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtNYXA8U3RyaW5nLCBTdHJpbmc+fSBrZXlWYWx1ZU9wdGlvbnMgXG4gICAgICovXG4gICAgY29uc3RydWN0b3Ioa2V5VmFsdWVPcHRpb25zID0gbmV3IE1hcCgpKSB7XG5cbiAgICAgICAgY29uc3Qgb3B0aW9uc0FycmF5ID0gW107XG4gICAgICAgIGtleVZhbHVlT3B0aW9ucy5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgICBvcHRpb25zQXJyYXkucHVzaCh7XCJsYWJlbFwiOiB2YWx1ZSwgXCJ2YWx1ZVwiOiBrZXkgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7T2JqZWN0fSAqL1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zQXJyYXk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtFdmVudE1hbmFnZXJ9ICovXG4gICAgICAgIHRoaXMuZXZlbnRzID0gbmV3IEV2ZW50TWFuYWdlcigpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtNYXA8U3RyaW5nLCBTdHJpbmc+fSBrZXlWYWx1ZU9wdGlvbnMgXG4gICAgICogQHJldHVybnMgXG4gICAgICovXG4gICAgdXBkYXRlKGtleVZhbHVlT3B0aW9ucykge1xuICAgICAgICBjb25zdCBvcHRpb25zQXJyYXkgPSBbXTtcbiAgICAgICAga2V5VmFsdWVPcHRpb25zLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgICAgIG9wdGlvbnNBcnJheS5wdXNoKHtcImxhYmVsXCI6IHZhbHVlLCBcInZhbHVlXCI6IGtleSB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnNBcnJheTtcbiAgICAgICAgdGhpcy5ldmVudHMudHJpZ2dlcihTZWxlY3RJbnB1dE9wdGlvbnNTb3VyY2UuRVZFTlRfT1BUSU9OU19DSEFOR0VELCBbdGhpcy5vcHRpb25zXSk7XG4gICAgfVxuXG4gICAgcmVmcmVzaCgpIHtcbiAgICAgICAgdGhpcy5ldmVudHMudHJpZ2dlcihTZWxlY3RJbnB1dE9wdGlvbnNTb3VyY2UuRVZFTlRfT1BUSU9OU19DSEFOR0VELCBbdGhpcy5vcHRpb25zXSk7XG4gICAgfVxuXG59IiwiaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5pbXBvcnQgeyBDYW52YXNTdHlsZXMsXG4gICAgQ29tcG9uZW50LFxuICAgIEV2ZW50TWFuYWdlcixcbiAgICBJbnB1dEVsZW1lbnREYXRhQmluZGluZyxcbiAgICBPcHRpb25FbGVtZW50LFxuICAgIFNlbGVjdEVsZW1lbnQsIFxuICAgIFN0eWxlc2hlZXQsXG4gICAgU3R5bGVzaGVldEJ1aWxkZXIsXG4gICAgQ29tcG9uZW50QnVpbGRlcixcbiAgICBJbmxpbmVDb21wb25lbnRGYWN0b3J5LFxuICAgIENzczNTdHlsZXNoZWV0QnVpbGRlcixcbiAgICBSZXF1aXJlZFZhbGlkYXRvcixcbiAgICBTdHlsZVNlbGVjdG9yQWNjZXNzb3Jcbn0gZnJvbSBcIm51dHRpbjJjLWNvcmVfdjFcIjtcbmltcG9ydCB7IEluamVjdGlvblBvaW50LFxuICAgIFByb3RvdHlwZUNvbmZpZyxcbiAgICBUeXBlQ29uZmlnUGFjayB9IGZyb20gXCJtaW5kaV92MVwiO1xuaW1wb3J0IHsgQ29tbW9uRXZlbnRzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21tb25FdmVudHNcIjtcbmltcG9ydCB7IFNlbGVjdElucHV0T3B0aW9uc1NvdXJjZSB9IGZyb20gXCIuL3NlbGVjdElucHV0T3B0aW9uc1NvdXJjZVwiO1xuXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiU2VsZWN0SW5wdXRcIik7XG5cbmV4cG9ydCBjbGFzcyBTZWxlY3RJbnB1dCB7XG5cblx0c3RhdGljIERFRkFVTFRfUExBQ0VIT0xERVIgPSBcIlNlbGVjdFwiO1xuXG5cdHN0YXRpYyBFVkVOVF9DTElDS0VEID0gQ29tbW9uRXZlbnRzLkNMSUNLRUQ7XG4gICAgc3RhdGljIEVWRU5UX0NIQU5HRUQgPSBDb21tb25FdmVudHMuQ0hBTkdFRDtcbiAgICBzdGF0aWMgRVZFTlRfTE9BREVEID0gQ29tbW9uRXZlbnRzLklOUFVUO1xuICAgIHN0YXRpYyBFVkVOVF9CTFVSUkVEID0gQ29tbW9uRXZlbnRzLkJMVVJSRUQ7XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gbW9kZWxcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGFiZWxcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IG1hbmRhdG9yeVxuICAgICAqIEBwYXJhbSB7U2VsZWN0SW5wdXRPcHRpb25zU291cmNlfSBvcHRpb25zU291cmNlXG4gICAgICovXG4gICAgY29uc3RydWN0b3IobmFtZSwgbW9kZWwgPSBudWxsLCBsYWJlbCA9IFNlbGVjdElucHV0LkRFRkFVTFRfUExBQ0VIT0xERVIsIG1hbmRhdG9yeSA9IGZhbHNlLCBvcHRpb25zU291cmNlID0gbmV3IFNlbGVjdElucHV0T3B0aW9uc1NvdXJjZSgpKSB7XG4gICAgICAgIFxuICAgICAgICAvKiogQHR5cGUge0lubGluZUNvbXBvbmVudEZhY3Rvcnl9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKElubGluZUNvbXBvbmVudEZhY3RvcnkpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7RXZlbnRNYW5hZ2VyfSAqL1xuICAgICAgICB0aGlzLmV2ZW50cyA9IG5ldyBFdmVudE1hbmFnZXIoKTtcblxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudH0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSBudWxsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7U2VsZWN0SW5wdXRPcHRpb25zU291cmNlfSAqL1xuICAgICAgICB0aGlzLm9wdGlvbnNTb3VyY2UgPSBvcHRpb25zU291cmNlO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLmxhYmVsID0gbGFiZWw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtib29sZWFufSAqL1xuICAgICAgICB0aGlzLm1hbmRhdG9yeSA9IG1hbmRhdG9yeTtcblxuICAgICAgICAvKiogQHR5cGUge29iamVjdH0gKi9cbiAgICAgICAgdGhpcy5tb2RlbCA9IG1vZGVsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7UmVxdWlyZWRWYWxpZGF0b3J9ICovXG4gICAgICAgIHRoaXMudmFsaWRhdG9yID0gbmV3IFJlcXVpcmVkVmFsaWRhdG9yKGZhbHNlLCBtYW5kYXRvcnkpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtTdHlsZXNoZWV0QnVpbGRlcn0gc3R5bGVzaGVldEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMge1N0eWxlc2hlZXR9XG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkU3R5bGVzaGVldChzdHlsZXNoZWV0QnVpbGRlcikge1xuICAgICAgICBDc3MzU3R5bGVzaGVldEJ1aWxkZXIuY3JlYXRlKHN0eWxlc2hlZXRCdWlsZGVyKVxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnNlbGVjdC1jb250YWluZXJcIilcbiAgICAgICAgICAgICAgICAucG9zaXRpb24oXCJyZWxhdGl2ZVwiKVxuICAgICAgICAgICAgICAgIC5wYWRkaW5nKFwiMC41cmVtXCIpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5zZWxlY3QtZW50cnlcIilcbiAgICAgICAgICAgICAgICAuZGlzcGxheShcImJsb2NrXCIpXG4gICAgICAgICAgICAgICAgLndpZHRoKFwiMTAwJVwiKVxuICAgICAgICAgICAgICAgIC5oZWlnaHQoXCJjYWxjKDEuNWVtICsgMXJlbSArIDJweClcIilcbiAgICAgICAgICAgICAgICAucGFkZGluZyhcIjAuN3JlbVwiLCBcIjAuNzVyZW1cIiwgXCIwLjNyZW1cIiwgXCIwLjc1cmVtXCIpXG4gICAgICAgICAgICAgICAgLmZvbnRTaXplKFwiMXJlbVwiKVxuICAgICAgICAgICAgICAgIC5mb250V2VpZ2h0KFwiNDAwXCIpXG4gICAgICAgICAgICAgICAgLmxpbmVIZWlnaHQoXCIxLjVcIilcbiAgICAgICAgICAgICAgICAuY29sb3IoXCIjNDk1MDU3XCIpXG4gICAgICAgICAgICAgICAgLmJhY2tncm91bmRDb2xvcihcIiNmZmZcIilcbiAgICAgICAgICAgICAgICAuYmFja2dyb3VuZENsaXAoXCJwYWRkaW5nLWJveFwiKVxuICAgICAgICAgICAgICAgIC5ib3JkZXIoXCIxcHRcIiwgXCJzb2xpZFwiLCBcIiNjZWQ0ZGFcIilcbiAgICAgICAgICAgICAgICAuYm9yZGVyUmFkaXVzKFwiMC4yNXJlbVwiKVxuICAgICAgICAgICAgICAgIC50cmFuc2l0aW9uKFxuICAgICAgICAgICAgICAgICAgICBbXCJib3JkZXItY29sb3JcIiwgXCIwLjE1c1wiLCBudWxsLCBcImVhc2UtaW4tb3V0XCJdLFxuICAgICAgICAgICAgICAgICAgICBbXCJib3gtc2hhZG93XCIsIFwiMC4xNXNcIiwgbnVsbCwgXCJlYXNlLWluLW91dFwiXSlcbiAgICAgICAgICAgICAgICAubWFyZ2luKG51bGwsIG51bGwsIFwiMXJlbVwiLCBudWxsKVxuICAgICAgICAgICAgICAgIC5hcHBlYXJhbmNlKFwibm9uZVwiKVxuICAgICAgICAgICAgICAgIC5iYWNrZ3JvdW5kSW1hZ2UoXCJ1cmwoXFxcImRhdGE6aW1hZ2Uvc3ZnK3htbDt1dGY4LDxzdmcgZmlsbD0nMjE5NkYzJyBoZWlnaHQ9JzIwJyB2aWV3Qm94PScwIDAgMjAgMjAnIHdpZHRoPScyMCcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48cGF0aCBkPSdNNyAxMGw1IDUgNS01eicvPjwvc3ZnPlxcXCIpXCIpXG4gICAgICAgICAgICAgICAgLmJhY2tncm91bmRSZXBlYXQoXCJuby1yZXBlYXRcIilcbiAgICAgICAgICAgICAgICAuYmFja2dyb3VuZFBvc2l0aW9uKFwicmlnaHQgMC43NXJlbSB0b3AgMC4zcmVtXCIpXG4gICAgICAgICAgICAgICAgLmJhY2tncm91bmRTaXplKFwiMS41ZW1cIilcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnNlbGVjdC1lcnJvclwiKVxuICAgICAgICAgICAgICAgIC53aWR0aChcImZpdC1jb250ZW50XCIpXG4gICAgICAgICAgICAgICAgLmNvbG9yKFwiIzMzMzMzM1wiKVxuICAgICAgICAgICAgICAgIC50cmFuc2Zvcm0oXCJ0cmFuc2xhdGUoKzVweCwtNXB4KVwiKVxuICAgICAgICAgICAgICAgIC5iYWNrZ3JvdW5kQ29sb3IoXCIjRkZGRkUwXCIpXG4gICAgICAgICAgICAgICAgLmZvbnRXZWlnaHQoXCJub3JtYWxcIilcbiAgICAgICAgICAgICAgICAuZm9udFNpemUoXCIxNHB4XCIpXG4gICAgICAgICAgICAgICAgLmJvcmRlclJhZGl1cyhcIjhweFwiKVxuICAgICAgICAgICAgICAgIC5wb3NpdGlvbihcInJlbGF0aXZlXCIpXG4gICAgICAgICAgICAgICAgLnpJbmRleChcIjk5OTk5OTk4XCIpXG4gICAgICAgICAgICAgICAgLmJveFNpemluZyhcImJvcmRlci1ib3hcIilcbiAgICAgICAgICAgICAgICAuYm94U2hhZG93KFwiMFwiLCBcIjFwdFwiLCBcIjhwdFwiLCBudWxsLCBcInJnYmEoMCwwLDAsMC41KVwiKVxuICAgICAgICAgICAgICAgIC5jdXJzb3IoXCJwb2ludGVyXCIpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5zZWxlY3QtZXJyb3ItaGlkZGVuXCIpXG4gICAgICAgICAgICAgICAgLnRyYW5zaXRpb24oXG4gICAgICAgICAgICAgICAgICAgIFtcIm1heC1oZWlnaHRcIiwgXCIuM3NcIiwgXCIuMnNcIl0sXG4gICAgICAgICAgICAgICAgICAgIFtcInBhZGRpbmdcIiwgXCIuM3NcIiwgXCIuMnNcIl0sXG4gICAgICAgICAgICAgICAgICAgIFtcIm9wYWNpdHlcIiwgXCIuMnNcIiwgXCIwc1wiXSxcbiAgICAgICAgICAgICAgICAgICAgW1widmlzaWJpbGl0eVwiLCBcIjBzXCIsIFwiLjJzXCJdKVxuICAgICAgICAgICAgICAgIC5vcGFjaXR5KFwiMFwiKVxuICAgICAgICAgICAgICAgIC5wYWRkaW5nKFwiMHB4XCIsIFwiMHB4XCIsIFwiMHB4XCIsIFwiMHB4XCIpXG4gICAgICAgICAgICAgICAgLm1heEhlaWdodChcIjBweFwiKVxuICAgICAgICAgICAgICAgIC5kaXNwbGF5KFwiYmxvY2tcIilcbiAgICAgICAgICAgICAgICAudmlzaWJpbGl0eShcImhpZGRlblwiKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuc2VsZWN0LWVycm9yLXZpc2libGVcIilcbiAgICAgICAgICAgICAgICAudHJhbnNpdGlvbihcbiAgICAgICAgICAgICAgICAgICAgW1wibWF4LWhlaWdodFwiLCBcIi4zc1wiLCBudWxsXSxcbiAgICAgICAgICAgICAgICAgICAgW1wicGFkZGluZ1wiLCBcIi4yc1wiLCBudWxsXSxcbiAgICAgICAgICAgICAgICAgICAgW1wib3BhY2l0eVwiLCBcIi4yc1wiLCBcIi4yc1wiXSlcbiAgICAgICAgICAgICAgICAub3BhY2l0eShcIjFcIilcbiAgICAgICAgICAgICAgICAucGFkZGluZyhcIjEwcHhcIiwgXCIyMHB4XCIsIFwiMTBweFwiLCBcIjIwcHhcIilcbiAgICAgICAgICAgICAgICAubWF4SGVpZ2h0KFwiNTBweFwiKVxuICAgICAgICAgICAgICAgIC5kaXNwbGF5KFwiYmxvY2tcIilcbiAgICAgICAgICAgICAgICAudmlzaWJpbGl0eShcInZpc2libGVcIilcbiAgICAgICAgICAgICAgICAubWFyZ2luKFwiMTBweFwiLCBudWxsLCBudWxsLCBudWxsKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuc2VsZWN0LWVycm9yIGlcIilcbiAgICAgICAgICAgICAgICAucG9zaXRpb24oXCJhYnNvbHV0ZVwiKVxuICAgICAgICAgICAgICAgIC50b3AoXCIxMDAlXCIpXG4gICAgICAgICAgICAgICAgLmxlZnQoXCIzMCVcIilcbiAgICAgICAgICAgICAgICAubWFyZ2luKG51bGwsIG51bGwsIG51bGwsIFwiLTE1cHRcIilcbiAgICAgICAgICAgICAgICAud2lkdGgoXCIzMHB0XCIpXG4gICAgICAgICAgICAgICAgLmhlaWdodChcIjE1cHRcIilcbiAgICAgICAgICAgICAgICAub3ZlcmZsb3coXCJoaWRkZW5cIilcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnNlbGVjdC1lcnJvciBpOjphZnRlclwiKVxuICAgICAgICAgICAgICAgIC5jb250ZW50KFwiJydcIilcbiAgICAgICAgICAgICAgICAucG9zaXRpb24oXCJhYnNvbHV0ZVwiKVxuICAgICAgICAgICAgICAgIC53aWR0aChcIjE1cHRcIilcbiAgICAgICAgICAgICAgICAuaGVpZ2h0KFwiMTVwdFwiKVxuICAgICAgICAgICAgICAgIC5sZWZ0KFwiNTAlXCIpXG4gICAgICAgICAgICAgICAgLnRyYW5zZm9ybShcInRyYW5zbGF0ZSgtNTAlLC01MCUpIHJvdGF0ZSg0NWRlZylcIilcbiAgICAgICAgICAgICAgICAuYmFja2dyb3VuZENvbG9yKFwiI0ZGRkZFMFwiKVxuICAgICAgICAgICAgICAgIC5ib3hTaGFkb3coXCIwXCIsIFwiMXB0XCIsIFwiOHB0XCIsIG51bGwsIFwicmdiYSgwLDAsMCwwLjUpXCIpXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuc2VsZWN0LWxhYmVsXCIpXG4gICAgICAgICAgICAgICAgLmJhY2tncm91bmRDb2xvcihcIiNmZmZcIilcbiAgICAgICAgICAgICAgICAucG9zaXRpb24oXCJhYnNvbHV0ZVwiKVxuICAgICAgICAgICAgICAgIC5wYWRkaW5nKFwiMFwiLCBcIjAuMjVyZW1cIiwgXCIwXCIsIFwiMC4yNXJlbVwiKVxuICAgICAgICAgICAgICAgIC5ib3JkZXJSYWRpdXMoXCIwLjVyZW1cIilcbiAgICAgICAgICAgICAgICAudG9wKFwiLTAuMXJlbVwiKVxuICAgICAgICAgICAgICAgIC5sZWZ0KFwiMC40cmVtXCIpXG4gICAgICAgICAgICAgICAgLm1hcmdpbihcIjBcIiwgbnVsbCwgXCIwLjVyZW1cIiwgbnVsbClcbiAgICAgICAgICAgICAgICAuZm9udFNpemUoXCIwLjlyZW1cIilcbiAgICAgICAgICAgICAgICAuZm9udFdlaWdodChcImJvbGRcIilcbiAgICAgICAgICAgICAgICAuY29sb3IoXCIjOGE4YThhXCIpO1xuXG4gICAgICAgIHJldHVybiBzdHlsZXNoZWV0QnVpbGRlci5idWlsZCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Q29tcG9uZW50QnVpbGRlcn0gY29tcG9uZW50QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyB7Q29tcG9uZW50fVxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZENvbXBvbmVudChjb21wb25lbnRCdWlsZGVyKSB7XG4gICAgICAgIHJldHVybiBjb21wb25lbnRCdWlsZGVyXG4gICAgICAgICAgICAucm9vdChcImRpdlwiLCBcImNsYXNzPXNlbGVjdC1jb250YWluZXJcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAubm9kZShcImRpdlwiLCBcImlkPWJ1YmJsZU1lc3NhZ2VcIilcbiAgICAgICAgICAgICAgICAubm9kZShcImxhYmVsXCIsIFwiaWQ9bGFiZWxcIiwgXCJjbGFzcz1zZWxlY3QtbGFiZWwgaGlkZGVuXCIpXG4gICAgICAgICAgICAgICAgLm5vZGUoXCJzZWxlY3RcIiwgXCJpZD1zZWxlY3RcIiwgXCJjbGFzcz1zZWxlY3QtZW50cnlcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgIC5idWlsZCgpO1xuICAgIH1cblxuICAgIHBvc3RDb25maWcoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZShTZWxlY3RJbnB1dCk7XG4gICAgICAgIENhbnZhc1N0eWxlcy5lbmFibGVTdHlsZShTZWxlY3RJbnB1dC5uYW1lKTtcblxuICAgICAgICBcbiAgICAgICAgY29uc3QgbGFiZWwgPSB0aGlzLmNvbXBvbmVudC5nZXQoXCJsYWJlbFwiKTtcblxuXHRcdC8qKiBAdHlwZSB7U2VsZWN0RWxlbWVudH0gKi9cblx0XHRjb25zdCBzZWxlY3QgPSB0aGlzLmNvbXBvbmVudC5nZXQoXCJzZWxlY3RcIik7XG4gICAgICAgIHNlbGVjdC5uYW1lID0gdGhpcy5uYW1lO1xuICAgICAgICBzZWxlY3QubGlzdGVuVG8oXCJjbGlja1wiLCB0aGlzLmNsaWNrZWQsIHRoaXMpO1xuICAgICAgICBzZWxlY3QubGlzdGVuVG8oXCJjaGFuZ2VcIiwgdGhpcy5jaGFuZ2VkLCB0aGlzKTtcbiAgICAgICAgc2VsZWN0Lmxpc3RlblRvKFwiYmx1clwiLCB0aGlzLmJsdXJyZWQsIHRoaXMpO1xuXG4gICAgICAgIGlmICh0aGlzLmxhYmVsICYmIGxhYmVsKSB7XG4gICAgICAgICAgICBsYWJlbC5zZXRBdHRyaWJ1dGVWYWx1ZShcImZvclwiLCBzZWxlY3QuZ2V0QXR0cmlidXRlVmFsdWUoXCJpZFwiKSk7XG4gICAgICAgICAgICBsYWJlbC5zZXRDaGlsZCh0aGlzLmxhYmVsKTtcbiAgICAgICAgICAgIFN0eWxlU2VsZWN0b3JBY2Nlc3Nvci5mcm9tKGxhYmVsKS5kaXNhYmxlKFwiaGlkZGVuXCIpO1xuICAgICAgICB9XG5cblx0XHR0aGlzLm9wdGlvbnNTb3VyY2UuZXZlbnRzLmxpc3RlblRvKFNlbGVjdElucHV0T3B0aW9uc1NvdXJjZS5FVkVOVF9PUFRJT05TX0NIQU5HRUQsIHRoaXMuaGFuZGxlT3B0aW9uc0NoYW5nZSwgdGhpcyk7XG4gICAgICAgIHRoaXMub3B0aW9uc1NvdXJjZS5yZWZyZXNoKCk7XG5cbiAgICAgICAgaWYodGhpcy5tb2RlbCkge1xuICAgICAgICAgICAgdGhpcy5kYXRhQmluZGluZyA9IElucHV0RWxlbWVudERhdGFCaW5kaW5nLmxpbmsodGhpcy5tb2RlbCwgdGhpcy52YWxpZGF0b3IpLnRvKHRoaXMuY29tcG9uZW50LmdldChcInNlbGVjdFwiKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0FycmF5PE9wdGlvbkVsZW1lbnQ+fSBvcHRpb25zQXJyYXkgXG4gICAgICovXG4gICAgaGFuZGxlT3B0aW9uc0NoYW5nZShvcHRpb25zQXJyYXkpIHtcbiAgICAgICAgLyoqIEB0eXBlIHtTZWxlY3RFbGVtZW50fSAqL1xuICAgICAgICBjb25zdCBzZWxlY3QgPSB0aGlzLmNvbXBvbmVudC5nZXQoXCJzZWxlY3RcIik7XG4gICAgICAgIHNlbGVjdC5vcHRpb25zID0gb3B0aW9uc0FycmF5O1xuICAgICAgICBpZiAodGhpcy5kYXRhQmluZGluZykge1xuICAgICAgICAgICAgdGhpcy5kYXRhQmluZGluZy5wdXNoKCk7XG4gICAgICAgIH1cbiAgICB9XG5cblx0LyoqXG5cdCAqIEBwYXJhbSB7TWFwPFN0cmluZywgU3RyaW5nPn0ga2V5VmFsdWVPcHRpb25zXG5cdCAqL1xuXHRzZXQgb3B0aW9ucyhrZXlWYWx1ZU9wdGlvbnMpIHtcblx0XHR0aGlzLm9wdGlvbnNTb3VyY2UudXBkYXRlKGtleVZhbHVlT3B0aW9ucyk7XG4gICAgICAgIGlmICh0aGlzLmRhdGFCaW5kaW5nKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGFCaW5kaW5nLnB1c2goKTtcbiAgICAgICAgfVxuXHR9XG5cbiAgICBjbGlja2VkKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuZXZlbnRzLnRyaWdnZXIoU2VsZWN0SW5wdXQuRVZFTlRfQ0xJQ0tFRCwgW2V2ZW50XSk7XG4gICAgfVxuXG4gICAgY2hhbmdlZChldmVudCkge1xuICAgICAgICB0aGlzLmV2ZW50cy50cmlnZ2VyKFNlbGVjdElucHV0LkVWRU5UX0NIQU5HRUQsIFtldmVudF0pO1xuICAgIH1cblxuICAgIGJsdXJyZWQoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5ldmVudHMudHJpZ2dlcihTZWxlY3RJbnB1dC5FVkVOVF9CTFVSUkVELCBbZXZlbnRdKTtcbiAgICB9XG5cbiAgICBmb2N1cygpIHsgdGhpcy5jb21wb25lbnQuZ2V0KFwic2VsZWN0XCIpLmZvY3VzKCk7IH1cbiAgICBlbmFibGUoKSB7IHRoaXMuY29tcG9uZW50LmdldChcInNlbGVjdFwiKS5lbmFibGUoKTsgfVxuICAgIGRpc2FibGUoKSB7IHRoaXMuY29tcG9uZW50LmdldChcInNlbGVjdFwiKS5kaXNhYmxlKCk7IH1cbiAgICBjbGVhcigpIHsgdGhpcy5jb21wb25lbnQuZ2V0KFwic2VsZWN0XCIpLnZhbHVlID0gXCJcIjsgfVxuXG59XG5cblR5cGVDb25maWdQYWNrLmluc3RhbmNlKCkuYWRkVHlwZUNvbmZpZyhcIm51dHRpbjJjLXVpXCIsIFByb3RvdHlwZUNvbmZpZy51bm5hbWVkKFNlbGVjdElucHV0KSk7IiwiaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5pbXBvcnQgeyBDb21tb25JbnB1dCB9IGZyb20gXCIuLi9jb21tb25JbnB1dFwiO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBDb21wb25lbnRCdWlsZGVyLCBDc3MzU3R5bGVzaGVldEJ1aWxkZXIsIFJlcXVpcmVkVmFsaWRhdG9yLCBTdHlsZXNoZWV0LCBTdHlsZXNoZWV0QnVpbGRlciB9IGZyb20gXCJudXR0aW4yYy1jb3JlX3YxXCI7XG5pbXBvcnQgeyBJbmplY3Rpb25Qb2ludCwgUHJvdG90eXBlQ29uZmlnLCBUeXBlQ29uZmlnUGFjayB9IGZyb20gXCJtaW5kaV92MVwiO1xuXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiVGV4dElucHV0XCIpO1xuXG5leHBvcnQgY2xhc3MgVGV4dElucHV0IGV4dGVuZHMgQ29tbW9uSW5wdXQge1xuXG4gICAgc3RhdGljIERFRkFVTFRfTEFCRUwgPSBcIlRleHRcIjtcblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG1vZGVsXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxhYmVsXG4gICAgICogQHBhcmFtIHtib29sZWFufSBtYW5kYXRvcnlcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBtb2RlbCA9IG51bGwsIGxhYmVsID0gVGV4dElucHV0LkRFRkFVTFRfTEFCRUwsIG1hbmRhdG9yeSA9IGZhbHNlKSB7XG5cbiAgICAgICAgc3VwZXIoVGV4dElucHV0LFxuICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgIG1vZGVsLFxuICAgICAgICAgICAgbmV3IFJlcXVpcmVkVmFsaWRhdG9yKGZhbHNlLCBtYW5kYXRvcnkpLFxuICAgICAgICAgICAgbGFiZWwsXG4gICAgICAgICAgICBcIkludmFsaWQgdmFsdWVcIik7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge1N0eWxlc2hlZXRCdWlsZGVyfSBzdHlsZXNoZWV0QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyB7U3R5bGVzaGVldH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRTdHlsZXNoZWV0KHN0eWxlc2hlZXRCdWlsZGVyKSB7XG4gICAgICAgQ3NzM1N0eWxlc2hlZXRCdWlsZGVyLmNyZWF0ZShzdHlsZXNoZWV0QnVpbGRlcilcbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi50ZXh0LWlucHV0LWNvbnRhaW5lclwiKVxuICAgICAgICAgICAgICAgIC5wb3NpdGlvbihcInJlbGF0aXZlXCIpXG4gICAgICAgICAgICAgICAgLnBhZGRpbmcoXCIwLjVyZW1cIilcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnRleHQtaW5wdXQtZW50cnlcIilcbiAgICAgICAgICAgICAgICAuZGlzcGxheShcImJsb2NrXCIpXG4gICAgICAgICAgICAgICAgLndpZHRoKFwiMTAwJVwiKVxuICAgICAgICAgICAgICAgIC5oZWlnaHQoXCJjYWxjKDEuNWVtICsgMXJlbSArIDJweClcIilcbiAgICAgICAgICAgICAgICAucGFkZGluZyhcIjAuN3JlbVwiLCBcIjAuNzVyZW1cIiwgXCIwLjNyZW1cIiwgXCIwLjc1cmVtXCIpXG4gICAgICAgICAgICAgICAgLmZvbnRTaXplKFwiMXJlbVwiKVxuICAgICAgICAgICAgICAgIC5mb250V2VpZ2h0KFwiNDAwXCIpXG4gICAgICAgICAgICAgICAgLmxpbmVIZWlnaHQoXCIxLjVcIilcbiAgICAgICAgICAgICAgICAuY29sb3IoXCIjNDk1MDU3XCIpXG4gICAgICAgICAgICAgICAgLmJhY2tncm91bmRDb2xvcihcIiNmZmZcIilcbiAgICAgICAgICAgICAgICAuYmFja2dyb3VuZENsaXAoXCJwYWRkaW5nLWJveFwiKVxuICAgICAgICAgICAgICAgIC5ib3JkZXIoXCIxcHhcIiwgXCJzb2xpZFwiLCBcIiNjZWQ0ZGFcIilcbiAgICAgICAgICAgICAgICAuYm9yZGVyUmFkaXVzKFwiMC4yNXJlbVwiKVxuICAgICAgICAgICAgICAgIC50cmFuc2l0aW9uKFxuICAgICAgICAgICAgICAgICAgICBbXCJib3JkZXItY29sb3JcIiwgXCIwLjE1c1wiLCBudWxsLCBcImVhc2UtaW4tb3V0XCJdLCBcbiAgICAgICAgICAgICAgICAgICAgW1wiYm94LXNoYWRvd1wiLCBcIjAuMTVzXCIsIG51bGwsIFwiZWFzZS1pbi1vdXRcIl0pXG4gICAgICAgICAgICAgICAgLm1hcmdpbihudWxsLG51bGwsXCIxcmVtXCIsbnVsbClcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi50ZXh0LWxhYmVsXCIpXG4gICAgICAgICAgICAgICAgLmJhY2tncm91bmRDb2xvcihcIiNmZmZcIilcbiAgICAgICAgICAgICAgICAucG9zaXRpb24oXCJhYnNvbHV0ZVwiKVxuICAgICAgICAgICAgICAgIC5wYWRkaW5nKFwiMFwiLCBcIjAuMjVyZW1cIiwgXCIwXCIsIFwiMC4yNXJlbVwiKVxuICAgICAgICAgICAgICAgIC5ib3JkZXJSYWRpdXMoXCIwLjVyZW1cIilcbiAgICAgICAgICAgICAgICAudG9wKFwiLTAuMXJlbVwiKVxuICAgICAgICAgICAgICAgIC5sZWZ0KFwiMC40cmVtXCIpXG4gICAgICAgICAgICAgICAgLm1hcmdpbihcIjBcIiwgbnVsbCwgXCIwLjVyZW1cIiwgbnVsbClcbiAgICAgICAgICAgICAgICAuZm9udFNpemUoXCIwLjlyZW1cIilcbiAgICAgICAgICAgICAgICAuZm9udFdlaWdodChcImJvbGRcIilcbiAgICAgICAgICAgICAgICAuY29sb3IoXCIjOGE4YThhXCIpO1xuXG4gICAgICAgIHJldHVybiBzdHlsZXNoZWV0QnVpbGRlci5idWlsZCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Q29tcG9uZW50QnVpbGRlcn0gY29tcG9uZW50QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyB7Q29tcG9uZW50fVxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZENvbXBvbmVudChjb21wb25lbnRCdWlsZGVyKSB7XG4gICAgICAgIHJldHVybiBjb21wb25lbnRCdWlsZGVyXG4gICAgICAgICAgICAucm9vdChcImRpdlwiLCBcImNsYXNzPXRleHQtaW5wdXQtY29udGFpbmVyXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLm5vZGUoXCJkaXZcIiwgXCJpZD1idWJibGVNZXNzYWdlXCIpXG4gICAgICAgICAgICAgICAgLm5vZGUoXCJsYWJlbFwiLCBcImlkPWxhYmVsXCIsIFwiY2xhc3M9dGV4dC1sYWJlbCBoaWRkZW5cIilcbiAgICAgICAgICAgICAgICAubm9kZShcImlucHV0XCIsIFwiaWQ9aW5wdXRcIiwgXCJ0eXBlPXRleHRcIiwgXCJjbGFzcz10ZXh0LWlucHV0LWVudHJ5XCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgLmJ1aWxkKCk7XG4gICAgfVxuXG59XG5cblR5cGVDb25maWdQYWNrLmluc3RhbmNlKCkuYWRkVHlwZUNvbmZpZyhcIm51dHRpbjJjLXVpXCIsIFByb3RvdHlwZUNvbmZpZy51bm5hbWVkKFRleHRJbnB1dCkpOyJdLCJuYW1lcyI6WyJDb21wb25lbnQiLCJUeXBlQ29uZmlnUGFjayIsIlByb3RvdHlwZUNvbmZpZyIsIkxvZ2dlciIsIkluamVjdGlvblBvaW50IiwiSW5saW5lQ29tcG9uZW50RmFjdG9yeSIsIlRpbWVQcm9taXNlIiwiQ2FudmFzU3R5bGVzIiwiU3R5bGVBY2Nlc3NvciIsIkV2ZW50TWFuYWdlciIsIlN0eWxlU2VsZWN0b3JBY2Nlc3NvciIsIkNvbnRhaW5lckFzeW5jIiwiSFRNTCIsIkNzczNTdHlsZXNoZWV0QnVpbGRlciIsIk1ldGhvZCIsIkxpc3QiLCJOYXZpZ2F0aW9uIiwiQ2FudmFzUm9vdCIsIkNvbnRhaW5lckVsZW1lbnRVdGlscyIsIklucHV0RWxlbWVudERhdGFCaW5kaW5nIiwiU3RhdGVNYW5hZ2VyIiwiTWFwIiwiTE9HIiwiRW1haWxWYWxpZGF0b3IiLCJOdW1iZXJWYWxpZGF0b3IiLCJSZXF1aXJlZFZhbGlkYXRvciIsIlBhc3N3b3JkVmFsaWRhdG9yIiwiRXF1YWxzUHJvcGVydHlWYWxpZGF0b3IiLCJBbmRWYWxpZGF0b3JTZXQiLCJQcm9wZXJ0eUFjY2Vzc29yIiwiUGhvbmVWYWxpZGF0b3IiLCJUZXh0SW5wdXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNPLE1BQU0sWUFBWSxDQUFDO0FBQzFCO0FBQ0EsSUFBSSxPQUFPLGNBQWMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDbEUsSUFBSSxPQUFPLG9CQUFvQixNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNsRSxJQUFJLE9BQU8sdUJBQXVCLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ2xFLElBQUksT0FBTyxxQkFBcUIsS0FBSyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDbEU7QUFDQSxJQUFJLE9BQU8sZ0JBQWdCLFlBQVksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3BFLElBQUksT0FBTyxzQkFBc0IsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDcEUsSUFBSSxPQUFPLHlCQUF5QixHQUFH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
