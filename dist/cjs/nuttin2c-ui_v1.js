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

    static DRAG_STARTED = "dragStarted";
    static DRAG_ENDED = "dragEnded";
    static DROPPED = "dropped";
    
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
                .style("color", "#ffffff")
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
                .style("background-color", "#ffffff")
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
                .style("background-color", "#ffffff")
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
        placeholder = null,
        inputElementId = null,
        errorElementId = null) {


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
        this.placeholder = placeholder;

        /** @type {string} */
        this.inputElementId = inputElementId;

        /** @type {string} */
        this.errorElementId = errorElementId;

        /** @type {object} */
        this.model = model;

        /** @type {boolean} */
        this.tainted = false;

        /** @type {EventManager} */
        this.eventManager = new nuttin2cCore_v1.EventManager();

        /** @type {InputElementDataBinding} */
        this.dataBinding = null;
    }

    postConfig() {
        this.component = this.componentFactory.create(this.componentClass);

        nuttin2cCore_v1.CanvasStyles.enableStyle(this.componentClass.name, this.component.componentIndex);

        this.component.get(this.inputElementId).setAttributeValue("name", this.name);
        if (this.placeholder) {
            this.component.get(this.inputElementId).setAttributeValue("placeholder", ":  " +  this.placeholder);
        }

        if(this.validator) {
            this.validator.withValidListener(new coreutil_v1.Method(this.hideValidationError, this));
        }

        if(this.model) {
            this.dataBinding = nuttin2cCore_v1.InputElementDataBinding.link(this.model, this.validator).to(this.component.get(this.inputElementId));
        }

        this.component.get(this.inputElementId)
            .listenTo("keyup", this.keyupped, this)
            .listenTo("change", this.changed, this)
            .listenTo("blur", this.blurred, this)
            .listenTo("click", this.clicked, this)
            .listenTo("keyup", (event) => {
                if (event.isKeyCode(13)) {
                    this.entered(event);
                }
            }, this);

        if (this.errorElementId) {
            this.component.get(this.errorElementId)
                .listenTo("click", this.errorClicked, this);
        }
    }

    get events() { return this.eventManager; }

    get value() { 
        /** @type {HTMLInputElement} */
        const input = this.component.get(this.inputElementId);
        return input.value;
    }

    set value(value) {
        /** @type {HTMLInputElement} */
        const input = this.component.get(this.inputElementId);
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
            this.showValidationError();
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
            this.showValidationError();
            return;
        }
        this.hideValidationError();
        this.events.trigger(CommonInput.EVENT_BLURRED, event);
    }

    errorClicked(event) {
        this.hideValidationError();
    }

    focus() { this.component.get(this.inputElementId).focus(); }
    selectAll() { this.component.get(this.inputElementId).selectAll(); }
    enable() { this.component.get(this.inputElementId).enable(); }
    disable() { this.component.get(this.inputElementId).disable(); }
    clear() { this.component.get(this.inputElementId).value = ""; this.tainted = false; this.hideValidationError(); }

}

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
                .style("background-color", "#ffffff")
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
                .style("background-color", "#ffffff")
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
                .backgroundColor("#ffffff")
                .gridColumn("1")
                .gridRow("1")
                .width("100%")
                .height("100%")
                .minHeight("0")

            .selector(".slide-deck-entry.position-front")
                .transform("translate(0%, 0%)")
                .transition("transform .6s")

            .selector(".slide-deck-entry.position-behind")
                .transform("translate(0%, 0%)")
                .transition("transform .6s")

            .selector(".slide-deck-entry.position-right")
                .transform("translate(+105%, 0%)")
                .transition("transform .6s")

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
                .style("display", "inline-block")
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

		/** @type {Button} */
		this.buttonProvider = mindi_v1.InjectionPoint.provider(Button);

        /** @type {Array<Button>} */
        this.buttons = [];
    }

	async postConfig() {
		this.component = this.componentFactory.create(ToolBar);
		nuttin2cCore_v1.CanvasStyles.enableStyle(ToolBar.name);
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
            const spacerDiv = nuttin2cCore_v1.HTML.custom("div");
            const style = fill ? "tool-bar-fill" : "tool-bar-space";
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

new coreutil_v1.Logger("EmailInput");

class EmailInput extends CommonInput {

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
            new nuttin2cCore_v1.EmailValidator(mandatory, !mandatory),
            placeholder,
            "emailInput",
            "emailError");
    }

    /**
     * 
     * @param {StylesheetBuilder} stylesheetBuilder 
     * @returns {Stylesheet}
     */
    static buildStylesheet(stylesheetBuilder) {
       stylesheetBuilder
            .selector(".email-input-entry")
            .open()
                .style("display","block")
                .style("width","100%")
                .style("height","calc(1.5em + 0.75rem + 2px)")
                .style("padding","0.375rem 0.75rem")
                .style("font-size","1rem")
                .style("font-weight","400")
                .style("line-height","1.5")
                .style("color","#495057")
                .style("background-color","#fff")
                .style("background-clip","padding-box")
                .style("border","1px solid #ced4da")
                .style("border-radius","0.25rem")
                .style("transition","border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out")
                .style("margin-bottom","1rem")
            .close()

            .selector(".email-input-error")
            .open()
                .style("width","fit-content")
                .style("color","#333333")
                .style("transform","translate(+5px,-5px)")
                .style("background-color","#FFFFE0")
                .style("font-weight","normal")
                .style("font-size","14px")
                .style("border-radius","8px")
                .style("position","relative")
                .style("z-index","99999998")
                .style("box-sizing","border-box")
                .style("box-shadow","0 1px 8px rgba(0,0,0,0.5)")
                .style("cursor","pointer")
            .close()

            .selector(".email-input-error-hidden")
            .open()
                .style("transition","max-height .3s .2s, padding .3s .2s, opacity .2s 0s, visibility 0s .2s")
                .style("opacity","0")
                .style("padding","0px 0px")
                .style("max-height","0px")
                .style("display","block")
                .style("visibility","hidden")
            .close()

            .selector(".email-input-error-visible")
            .open()
                .style("transition","max-height .3s, padding .2s, opacity .2s .2s")
                .style("opacity","1")
                .style("padding","10px 20px")
                .style("max-height","50px")
                .style("display","block")
                .style("visibility","visible")
                .style("margin-top","10px")
            .close()

            .selector(".email-input-error i")
            .open()
                .style("position","absolute")
                .style("top","100%")
                .style("left","30%")
                .style("margin-left","-15px")
                .style("width","30px")
                .style("height","15px")
                .style("overflow","hidden")
            .close()

            .selector(".email-input-error i::after")
            .open()
                .style("content","''")
                .style("position","absolute")
                .style("width","15px")
                .style("height","15px")
                .style("left","50%")
                .style("transform","translate(-50%,-50%) rotate(45deg)")
                .style("background-color","#FFFFE0")
                .style("box-shadow","0 1px 8px rgba(0,0,0,0.5)")
            .close();

        return stylesheetBuilder.build();
    }

    /**
     * 
     * @param {ComponentBuilder} componentBuilder 
     * @return {Component}
     */
    static buildComponent(componentBuilder) {
       componentBuilder
            .root("div")
            .open()
                .node("div", "id=emailError", "class=email-input-error email-input-error-hidden")
                .open()
                    .text("Invalid email address")
                    .node("i")
                .close()
                .node("input", "id=emailInput", "type=text", "class=email-input-entry")
            .close();
        return componentBuilder.build();
    }

    showValidationError() { this.component.get(this.errorElementId).setAttributeValue("class", "email-input-error email-input-error-visible"); }
    hideValidationError() { this.component.get(this.errorElementId).setAttributeValue("class", "email-input-error email-input-error-hidden"); }

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
            model,
            null,
            null,
            "hiddenInput");
    }

    /**
     * 
     * @param {StylesheetBuilder} stylesheetBuilder 
     * @returns {Stylesheet}
     */
    static buildStylesheet(stylesheetBuilder) {
        return stylesheetBuilder
            .selector(".hidden-input-entry")
            .build();
    }

    /**
     * 
     * @param {ComponentBuilder} componentBuilder 
     * @returns {Component}
     */
    static buildComponent(componentBuilder) {
        return componentBuilder
            .root("input", "id=hiddenInput", "type=hidden", "class=hidden-input-entry")
            .build();
    }

}

mindi_v1.TypeConfigPack.instance().addTypeConfig("nuttin2c-ui", mindi_v1.PrototypeConfig.unnamed(HiddenInput));

new coreutil_v1.Logger("TextInput");

class NumberInput extends CommonInput {

    static DEFAULT_PLACEHOLDER = "Number";

    /**
     * 
     * @param {string} name
     * @param {object} model
     * @param {string} placeholder
     * @param {boolean} mandatory
     */
    constructor(name, model = null, placeholder = NumberInput.DEFAULT_PLACEHOLDER, mandatory = false) {

        super(NumberInput,
            name,
            model,
            new nuttin2cCore_v1.NumberValidator(mandatory, !mandatory),
            placeholder,
            "numberInput",
            "numberError");
    }

    /**
     * 
     * @param {StylesheetBuilder} stylesheetBuilder 
     * @returns {Stylesheet}
     */
    static buildStylesheet(stylesheetBuilder) {
        stylesheetBuilder
            .selector(".number-input-entry")
            .open()
                .style("display", "block")
                .style("width", "100%")
                .style("height", "calc(1.5em + 0.75rem + 2px)")
                .style("padding", "0.375rem 0.75rem")
                .style("font-size", "1rem")
                .style("font-weight", "400")
                .style("line-height", "1.5")
                .style("color", "#495057")
                .style("background-color", "#fff")
                .style("background-clip", "padding-box")
                .style("border", "1px solid #ced4da")
                .style("border-radius", "0.25rem")
                .style("transition", "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out")
                .style("margin-bottom", "1rem")
            .close()

            .selector(".number-input-error")
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

            .selector(".number-input-error-hidden")
            .open()
                .style("transition", "max-height .3s .2s, padding .3s .2s, opacity .2s 0s, visibility 0s .2s")
                .style("opacity", "0")
                .style("padding", "0px 0px")
                .style("max-height", "0px")
                .style("display", "block")
                .style("visibility", "hidden")
            .close()

            .selector(".number-input-error-visible")
            .open()
                .style("transition", "max-height .3s, padding .2s, opacity .2s .2s")
                .style("opacity", "1")
                .style("padding", "10px 20px")
                .style("max-height", "50px")
                .style("display", "block")
                .style("visibility", "visible")
                .style("margin-top", "10px")
            .close()

            .selector(".number-input-error i")
            .open()
                .style("position", "absolute")
                .style("top", "100%")
                .style("left", "30%")
                .style("margin-left", "-15px")
                .style("width", "30px")
                .style("height", "15px")
                .style("overflow", "hidden")
            .close()

            .selector(".number-input-error i::after")
            .open()
                .style("content", "''")
                .style("position", "absolute")
                .style("width", "15px")
                .style("height", "15px")
                .style("left", "50%")
                .style("transform", "translate(-50%,-50%) rotate(45deg)")
                .style("background-color", "#FFFFE0")
                .style("box-shadow", "0 1px 8px rgba(0,0,0,0.5)")
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
            .root("div")
            .open()
                .node("div", "id=numberError", "class=number-input-error number-input-error-hidden")
                .open()
                    .text("Invalid value")
                    .node("i")
                .close()
                .node("input", "id=numberInput", "type=number", "pattern=[0-9]*", "inputmode=numeric", "class=number-input-entry")
            .close()
            .build();
    }

    showValidationError() { this.component.get(this.errorElementId).setAttributeValue("class", "number-input-error number-input-error-visible"); }
    hideValidationError() { this.component.get(this.errorElementId).setAttributeValue("class", "number-input-error number-input-error-hidden"); }
}

mindi_v1.TypeConfigPack.instance().addTypeConfig("nuttin2c-ui", mindi_v1.PrototypeConfig.unnamed(NumberInput));

new coreutil_v1.Logger("PasswordInput");

class PasswordInput extends CommonInput {

    static DEFAULT_PLACEHOLDER = "Password";

    /**
     * 
     * @param {string} name
     * @param {object} model
     * @param {string} placeholder
     * @param {boolean} mandatory
     */
    constructor(name, model = null, placeholder = TextInput.DEFAULT_PLACEHOLDER, mandatory = false) {

        super(PasswordInput,
            name,
            model,
            new nuttin2cCore_v1.RequiredValidator(!mandatory),
            placeholder,
            "passwordInput",
            "passwordError");
    }

    /**
     * 
     * @param {StylesheetBuilder} stylesheetBuilder 
     * @returns {Stylesheet}
     */
    static buildStylesheet(stylesheetBuilder) {
        stylesheetBuilder
            .selector(".password-input-entry")
            .open()
                .style("display", "block")
                .style("width", "100%")
                .style("height", "calc(1.5em + 0.75rem + 2px)")
                .style("padding", "0.375rem 0.75rem")
                .style("font-size", "1rem")
                .style("font-weight", "400")
                .style("line-height", "1.5")
                .style("color", "#495057")
                .style("background-color", "#fff")
                .style("background-clip", "padding-box")
                .style("border", "1px solid #ced4da")
                .style("border-radius", "0.25rem")
                .style("transition", "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out")
                .style("margin-bottom", "1rem")
            .close()

            .selector(".password-input-error")
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

            .selector(".password-input-error-hidden")
            .open()
                .style("transition", "max-height .3s .2s, padding .3s .2s, opacity .2s 0s, visibility 0s .2s")
                .style("opacity", "0")
                .style("padding", "0px 0px")
                .style("max-height", "0px")
                .style("display", "block")
                .style("visibility", "hidden")
            .close()

            .selector(".password-input-error-visible")
            .open()
                .style("transition", "max-height .3s, padding .2s, opacity .2s .2s")
                .style("opacity", "1")
                .style("padding", "10px 20px")
                .style("max-height", "50px")
                .style("display", "block")
                .style("visibility", "visible")
                .style("margin-top", "10px")
            .close()

            .selector(".password-input-error i")
            .open()
                .style("position", "absolute")
                .style("top", "100%")
                .style("left", "30%")
                .style("margin-left", "-15px")
                .style("width", "30px")
                .style("height", "15px")
                .style("overflow", "hidden")
            .close()

            .selector(".password-input-error i::after")
            .open()
                .style("content", "''")
                .style("position", "absolute")
                .style("width", "15px")
                .style("height", "15px")
                .style("left", "50%")
                .style("transform", "translate(-50%,-50%) rotate(45deg)")
                .style("background-color", "#FFFFE0")
                .style("box-shadow", "0 1px 8px rgba(0,0,0,0.5)")
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
            .root("div")
            .open()
                .node("div", "id=passwordError", "class=password-input-error password-input-error-hidden")
                .open()
                    .text("Password required")
                    .node("i")
                .close()
                .node("input", "id=passwordInput", "type=password", "class=password-input-entry")
            .close()
            .build();
    }

    showValidationError() { this.component.get(this.errorElementId).setAttributeValue("class", "email-input-error email-input-error-visible"); }
    hideValidationError() { this.component.get(this.errorElementId).setAttributeValue("class", "email-input-error email-input-error-hidden"); }
}

mindi_v1.TypeConfigPack.instance().addTypeConfig("nuttin2c-ui", mindi_v1.PrototypeConfig.unnamed(PasswordInput));

new coreutil_v1.Logger("PasswordMatcherInputValue");

class PasswordMatcherInputValue extends CommonInput {

    static DEFAULT_PLACEHOLDER = "New password";

    /**
     * 
     * @param {string} name
     * @param {object} model
     * @param {string} placeholder
     * @param {boolean} mandatory
     */
    constructor(name, model = null, placeholder = TextInput.DEFAULT_PLACEHOLDER, mandatory = false) {

        super(PasswordMatcherInputValue,
            name,
            model,
            new nuttin2cCore_v1.PasswordValidator(mandatory),
            placeholder,
            "passwordMatcherInputValueField",
            "passwordMatcherInputValueError");
    }

    /**
     * 
     * @param {StylesheetBuilder} stylesheetBuilder 
     * @returns {Stylesheet}
     */
    static buildStylesheet(stylesheetBuilder) {
        stylesheetBuilder
            .selector(".password-matcher-input-value-entry")
            .open()
                .style("display", "block")
                .style("width", "100%")
                .style("height", "calc(1.5em + 0.75rem + 2px)")
                .style("padding", "0.375rem 0.75rem")
                .style("font-size", "1rem")
                .style("font-weight", "400")
                .style("line-height", "1.5")
                .style("color", "#495057")
                .style("background-color", "#fff")
                .style("background-clip", "padding-box")
                .style("border", "1px solid #ced4da")
                .style("border-radius", "0.25rem")
                .style("transition", "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out")
                .style("margin-bottom", "1rem")
            .close()

            .selector(".password-matcher-input-value-error")
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

            .selector(".password-matcher-input-value-error-hidden")
            .open()
                .style("transition", "max-height .3s .2s, padding .3s .2s, opacity .2s 0s, visibility 0s .2s")
                .style("opacity", "0")
                .style("padding", "0px 0px")
                .style("max-height", "0px")
                .style("display", "block")
                .style("visibility", "hidden")
            .close()

            .selector(".password-matcher-input-value-error-visible")
            .open()
                .style("transition", "max-height .3s, padding .2s, opacity .2s .2s")
                .style("opacity", "1")
                .style("padding", "10px 20px")
                .style("max-height", "250px")
                .style("display", "block")
                .style("visibility", "visible")
                .style("margin-top", "10px")
            .close()

            .selector(".password-matcher-input-value-error i")
            .open()
                .style("position", "absolute")
                .style("top", "100%")
                .style("left", "30%")
                .style("margin-left", "-15px")
                .style("width", "30px")
                .style("height", "15px")
                .style("overflow", "hidden")
            .close()

            .selector(".password-matcher-input-value-error i::after")
            .open()
                .style("content", "''")
                .style("position", "absolute")
                .style("width", "15px")
                .style("height", "15px")
                .style("left", "50%")
                .style("transform", "translate(-50%,-50%) rotate(45deg)")
                .style("background-color", "#FFFFE0")
                .style("box-shadow", "0 1px 8px rgba(0,0,0,0.5)")
            .close()

            .selector(".password-matcher-input-value-crieria-list")
            .open()
                .style("margin-top", "0")
                .style("margin-bottom", "0")
                .style("padding-inline-start", "2em")
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
            .root("div")
            .open()
                .node("div", "id=passwordMatcherInputValueError", "class=password-matcher-input-value-error password-matcher-input-value-error-hidden")
                .open()
                    .text("Minimum 8 characters containing:")
                    .node("ul", "class=password-matcher-input-value-crieria-list")
                    .open()
                        .node("li")
                        .open()
                            .text("Letter(s)")
                        .close()
                        .node("li")
                        .open()
                            .text("Number(s)")
                        .close()
                        .node("li")
                        .open()
                            .text("Special character(s) #?!@$%^&*-")
                        .close()
                    .close()
                    .node("i")
                .close()
                .node("input", "autocomplete=new-password", "id=passwordMatcherInputValueField", "type=password", "class=password-matcher-input-value-entry")
            .close()
            .build();
    }

    showValidationError() { this.component.get(this.errorElementId).setAttributeValue("class", "password-matcher-input-value-error password-matcher-input-value-error-visible"); }
    hideValidationError() { this.component.get(this.errorElementId).setAttributeValue("class", "password-matcher-input-value-error password-matcher-input-value-error-hidden"); }
}

mindi_v1.TypeConfigPack.instance().addTypeConfig("nuttin2c-ui", mindi_v1.PrototypeConfig.unnamed(PasswordMatcherInputValue));

new coreutil_v1.Logger("PasswordMatcherInputControl");

class PasswordMatcherInputControl extends CommonInput {

    static DEFAULT_PLACEHOLDER = "Confirm password";
    
    /**
     * 
     * @param {string} name
     * @param {object} model
     * @param {string} modelComparedPropertyName
     * @param {string} placeholder
     * @param {boolean} mandatory
     */
    constructor(name, model = null, modelComparedPropertyName = null, placeholder = TextInput.DEFAULT_PLACEHOLDER,
           mandatory = false) {

        super(PasswordMatcherInputControl,
            name,
            model,
            new nuttin2cCore_v1.EqualsPropertyValidator(mandatory, false, model, modelComparedPropertyName),
            placeholder,
            "passwordMatcherInputControlField",
            "passwordMatcherInputControlError");
    }

    /**
     * 
     * @param {StylesheetBuilder} stylesheetBuilder 
     * @returns {Stylesheet}
     */
    static buildStylesheet(stylesheetBuilder) {
        stylesheetBuilder
            .selector(".password-matcher-input-control-entry")
            .open()
                .style("display", "block")
                .style("width", "100%")
                .style("height", "calc(1.5em + 0.75rem + 2px)")
                .style("padding", "0.375rem 0.75rem")
                .style("font-size", "1rem")
                .style("font-weight", "400")
                .style("line-height", "1.5")
                .style("color", "#495057")
                .style("background-color", "#fff")
                .style("background-clip", "padding-box")
                .style("border", "1px solid #ced4da")
                .style("border-radius", "0.25rem")
                .style("transition", "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out")
            .close()

            .selector(".password-matcher-input-control-error")
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

            .selector(".password-matcher-input-control-error-hidden")
            .open()
                .style("transition", "max-height .3s .2s, padding .3s .2s, opacity .2s 0s, visibility 0s .2s")
                .style("opacity", "0")
                .style("padding", "0px 0px")
                .style("max-height", "0px")
                .style("display", "block")
                .style("visibility", "hidden")
            .close()

            .selector(".password-matcher-input-control-error-visible")
            .open()
                .style("transition", "max-height .3s, padding .2s, opacity .2s .2s")
                .style("opacity", "1")
                .style("padding", "10px 20px")
                .style("max-height", "50px")
                .style("display", "block")
                .style("visibility", "visible")
                .style("margin-top", "10px")
            .close()

            .selector(".password-matcher-input-control-error i")
            .open()
                .style("position", "absolute")
                .style("top", "100%")
                .style("left", "30%")
                .style("margin-left", "-15px")
                .style("width", "30px")
                .style("height", "15px")
                .style("overflow", "hidden")
            .close()

            .selector(".password-matcher-input-control-error i::after")
            .open()
                .style("content", "''")
                .style("position", "absolute")
                .style("width", "15px")
                .style("height", "15px")
                .style("left", "50%")
                .style("transform", "translate(-50%,-50%) rotate(45deg)")
                .style("background-color", "#FFFFE0")
                .style("box-shadow", "0 1px 8px rgba(0,0,0,0.5)")
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
            .root("div")
            .open()
                .node("div", "id=passwordMatcherInputControlError", "class=password-matcher-input-control-error password-matcher-input-control-error-hidden")
                .open()
                    .text("Passwords must match")
                    .node("i")
                .close()
                .node("input", "id=passwordMatcherInputControlField", "type=password", "autocomplete=new-password", "class=password-matcher-input-control-entry")
            .close()
            .build();
    }

    showValidationError() { this.component.get(this.errorElementId).setAttributeValue("class", "password-matcher-input-control-error password-matcher-input-control-error-visible"); }
    hideValidationError() { this.component.get(this.errorElementId).setAttributeValue("class", "password-matcher-input-control-error password-matcher-input-control-error-hidden"); }
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
            "phoneInput",
            "phoneError");
    }

    /**
     * 
     * @param {StylesheetBuilder} stylesheetBuilder 
     * @returns {Stylesheet}
     */
    static buildStylesheet(stylesheetBuilder) {
       stylesheetBuilder
            .selector(".phone-input-entry")
            .open()
                .style("display", "block")
                .style("width", "100%")
                .style("height", "calc(1.5em + 0.75rem + 2px)")
                .style("padding", "0.375rem 0.75rem")
                .style("font-size", "1rem")
                .style("font-weight", "400")
                .style("line-height", "1.5")
                .style("color", "#495057")
                .style("background-color", "#fff")
                .style("background-clip", "padding-box")
                .style("border", "1px solid #ced4da")
                .style("border-radius", "0.25rem")
                .style("transition", "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out")
                .style("margin-bottom", "1rem")
            .close()

            .selector(".phone-input-error")
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

            .selector(".phone-input-error-hidden")
            .open()
                .style("transition", "max-height .3s .2s, padding .3s .2s, opacity .2s 0s, visibility 0s .2s")
                .style("opacity", "0")
                .style("padding", "0px 0px")
                .style("max-height", "0px")
                .style("display", "block")
                .style("visibility", "hidden")
            .close()

            .selector(".phone-input-error-visible")
            .open()
                .style("transition", "max-height .3s, padding .2s, opacity .2s .2s")
                .style("opacity", "1")
                .style("padding", "10px 20px")
                .style("max-height", "150px")
                .style("display", "block")
                .style("visibility", "visible")
                .style("margin-top", "10px")
            .close()

            .selector(".phone-input-error i")
            .open()
                .style("position", "absolute")
                .style("top", "100%")
                .style("left", "30%")
                .style("margin-left", "-15px")
                .style("width", "30px")
                .style("height", "15px")
                .style("overflow", "hidden")
            .close()

            .selector(".phone-input-error i::after")
            .open()
                .style("content", "''")
                .style("position", "absolute")
                .style("width", "15px")
                .style("height", "15px")
                .style("left", "50%")
                .style("transform", "translate(-50%,-50%) rotate(45deg)")
                .style("background-color", "#FFFFE0")
                .style("box-shadow", "0 1px 8px rgba(0,0,0,0.5)")
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
                .node("div", "id=phoneError", "class=phone-input-error phone-input-error-hidden")
                .open()
                    .text("Invalid phone number")
                    .node("ul", "class=phone-matcher-input-value-crieria-list")
                    .open()
                        .node("li")
                        .open()
                            .text("Must start with + sign")
                        .close()
                        .node("li")
                        .open()
                            .text("followed by minimum 8 numbers")
                        .close()
                    .close()
                    .node("i")
                .close()
                .node("input", "id=phoneInput", "type=text", "class=phone-input-entry")
            .close();
        return componentBuilder.build();
    }

    showValidationError() { this.component.get(this.errorElementId).setAttributeValue("class", "phone-input-error phone-input-error-visible"); }
    hideValidationError() { this.component.get(this.errorElementId).setAttributeValue("class", "phone-input-error phone-input-error-hidden"); }
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

new coreutil_v1.Logger("Select");

class Select {

	static DEFAULT_PLACEHOLDER = "Select";

	static EVENT_CLICKED = CommonEvents.CLICKED;

    /**
     * 
     * @param {string} name 
     * @param {object} model
     * @param {Array<OptionElement>} options
     * @param {string} placeholder
     * @param {boolean} mandatory
     */
    constructor(name, model = null, options = [], placeholder = Select.DEFAULT_PLACEHOLDER, mandatory = false) {
        
        /** @type {InlineComponentFactory} */
        this.componentFactory = mindi_v1.InjectionPoint.instance(nuttin2cCore_v1.InlineComponentFactory);

        /** @type {EventManager} */
        this.events = new nuttin2cCore_v1.EventManager();

        /** @type {Component} */
        this.component = null;

        /** @type {string} */
        this.name = name;

        /** @type {Array<OptionElement>} */
        this.optionsArray = options;

        /** @type {string} */
        this.placeholder = placeholder;

        /** @type {boolean} */
        this.mandatory = mandatory;

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
            .selector(".select-entry")
            .open()
                .style("display", "block")
                .style("width", "100%")
                .style("height", "calc(1.5em + 0.75rem + 2px)")
                .style("padding", "0.375rem 0.75rem")
                .style("font-size", "1rem")
                .style("font-weight", "400")
                .style("line-height", "1.5")
                .style("color", "#495057")
                .style("background-color", "#fff")
                .style("background-clip", "padding-box")
                .style("border", "1pt solid #ced4da")
                .style("border-radius", "0.25rem")
                .style("transition", "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out")
                .style("margin-bottom", "1rem")
                .style("appearance", "none")
                .style("-webkit-appearance", "none")
                .style("-moz-appearance", "none")
                .style("background-image", "url(\"data:image/svg+xml;utf8,<svg fill='2196F3' height='20' viewBox='0 0 20 20' width='20' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>\")")
                .style("background-repeat", "no-repeat")
                .style("background-position", "right 0.75rem center")
                .style("background-size", "1.5em")
            .close()

            .selector(".select-error")
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
                .style("box-shadow", "0 1pt 8pt rgba(0,0,0,0.5)")
                .style("cursor", "pointer")
            .close()

            .selector(".select-error-hidden")
            .open()
                .style("transition", "max-height .3s .2s, padding .3s .2s, opacity .2s 0s, visibility 0s .2s")
                .style("opacity", "0")
                .style("padding", "0px 0px")
                .style("max-height", "0px")
                .style("display", "block")
                .style("visibility", "hidden")
            .close()

            .selector(".select-error-visible")
            .open()
                .style("transition", "max-height .3s, padding .2s, opacity .2s .2s")
                .style("opacity", "1")
                .style("padding", "10px 20px")
                .style("max-height", "50px")
                .style("display", "block")
                .style("visibility", "visible")
                .style("margin-top", "10px")
            .close()

            .selector(".select-error i")
            .open()
                .style("position", "absolute")
                .style("top", "100%")
                .style("left", "30%")
                .style("margin-left", "-15pt")
                .style("width", "30pt")
                .style("height", "15pt")
                .style("overflow", "hidden")
            .close()

            .selector(".select-error i::after")
            .open()
                .style("content", "''")
                .style("position", "absolute")
                .style("width", "15pt")
                .style("height", "15pt")
                .style("left", "50%")
                .style("transform", "translate(-50%,-50%) rotate(45deg)")
                .style("background-color", "#FFFFE0")
                .style("box-shadow", "0 1pt 8pt rgba(0,0,0,0.5)")
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
            .root("div")
            .open()
                .node("div", "id=selectError", "class=select-error select-error-hidden")
                .open()
                    .text("Invalid selection")
                    .node("i")
                .close()
                .node("select", "id=select", "class=select-entry")
            .close();
    }

    postConfig() {
        this.component = this.componentFactory.create(Select);
        nuttin2cCore_v1.CanvasStyles.enableStyle(Select.name);

		/** @type {SelectElement} */
		const select = this.component.get("select");

        select.name = this.name;

        if (this.model) {
            nuttin2cCore_v1.InputElementDataBinding.link(this.model).to(this.component.get("select"));
        }

		if (this.optionsArray && this.optionsArray.length > 0) {
			select.options = this.optionsArray;
		}

        select.listenTo("click", this.clicked, this);
    }

	/**
	 * @param {Array<OptionElement>} optionsArray
	 */
	set options(optionsArray) {
		this.optionsArray = optionsArray;
		if (this.component) {
			/** @type {SelectElement} */
			const select = this.component.get("select");
			if (select && this.optionsArray && this.optionsArray.length > 0) {
				select.options = this.optionsArray;
			}
		}
	}

    clicked(event) {
        this.events.trigger(Select.EVENT_CLICKED, [event]);
    }

}

mindi_v1.TypeConfigPack.instance().addTypeConfig("nuttin2c-ui", mindi_v1.PrototypeConfig.unnamed(Select));

new coreutil_v1.Logger("TextInput");

class TextInput$1 extends CommonInput {

    static DEFAULT_PLACEHOLDER = "Text";

    /**
     * 
     * @param {string} name
     * @param {object} model
     * @param {string} placeholder
     * @param {boolean} mandatory
     */
    constructor(name, model = null, placeholder = TextInput$1.DEFAULT_PLACEHOLDER, mandatory = false) {

        super(TextInput$1,
            name,
            model,
            new nuttin2cCore_v1.RequiredValidator(false, mandatory),
            placeholder,
            "textInput",
            "textError");
    }

    /**
     * 
     * @param {StylesheetBuilder} stylesheetBuilder 
     * @returns {Stylesheet}
     */
    static buildStylesheet(stylesheetBuilder) {
       stylesheetBuilder
            .selector(".text-input-entry")
            .open()
                .style("display", "block")
                .style("width", "100%")
                .style("height", "calc(1.5em + 0.75rem + 2px)")
                .style("padding", "0.375rem 0.75rem")
                .style("font-size", "1rem")
                .style("font-weight", "400")
                .style("line-height", "1.5")
                .style("color", "#495057")
                .style("background-color", "#fff")
                .style("background-clip", "padding-box")
                .style("border", "1px solid #ced4da")
                .style("border-radius", "0.25rem")
                .style("transition", "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out")
                .style("margin-bottom", "1rem")
            .close()

            .selector(".text-input-error")
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

            .selector(".text-input-error-hidden")
            .open()
                .style("transition", "max-height .3s .2s, padding .3s .2s, opacity .2s 0s, visibility 0s .2s")
                .style("opacity", "0")
                .style("padding", "0px 0px")
                .style("max-height", "0px")
                .style("display", "block")
                .style("visibility", "hidden")
            .close()

            .selector(".text-input-error-visible")
            .open()
                .style("transition", "max-height .3s, padding .2s, opacity .2s .2s")
                .style("opacity", "1")
                .style("padding", "10px 20px")
                .style("max-height", "50px")
                .style("display", "block")
                .style("visibility", "visible")
                .style("margin-top", "10px")
            .close()

            .selector(".text-input-error i")
            .open()
                .style("position", "absolute")
                .style("top", "100%")
                .style("left", "30%")
                .style("margin-left", "-15px")
                .style("width", "30px")
                .style("height", "15px")
                .style("overflow", "hidden")
            .close()

            .selector(".text-input-error i::after")
            .open()
                .style("content", "''")
                .style("position", "absolute")
                .style("width", "15px")
                .style("height", "15px")
                .style("left", "50%")
                .style("transform", "translate(-50%,-50%) rotate(45deg)")
                .style("background-color", "#FFFFE0")
                .style("box-shadow", "0 1px 8px rgba(0,0,0,0.5)")
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
            .root("div")
            .open()
                .node("div", "id=textError", "class=text-input-error text-input-error-hidden")
                .open()
                    .text("Invalid value")
                    .node("i")
                .close()
                .node("input", "id=textInput", "type=text", "class=text-input-entry")
            .close()
            .build();
    }

    showValidationError() { this.component.get(this.errorElementId).setAttributeValue("class", "text-input-error text-input-error-visible"); }
    hideValidationError() { this.component.get(this.errorElementId).setAttributeValue("class", "text-input-error text-input-error-hidden"); }
}

mindi_v1.TypeConfigPack.instance().addTypeConfig("nuttin2c-ui", mindi_v1.PrototypeConfig.unnamed(TextInput$1));

exports.BackShade = BackShade;
exports.BackShadeListeners = BackShadeListeners;
exports.Background = Background;
exports.BackgroundVideo = BackgroundVideo;
exports.BannerLabel = BannerLabel;
exports.BannerLabelMessage = BannerLabelMessage;
exports.BannerMessage = BannerMessage;
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
exports.Select = Select;
exports.SlideDeck = SlideDeck;
exports.SlideDeckEntry = SlideDeckEntry;
exports.TextInput = TextInput$1;
exports.ToggleIcon = ToggleIcon;
exports.ToolBar = ToolBar;
exports.TreePanel = TreePanel;
exports.TreePanelEntry = TreePanelEntry;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnV0dGluMmMtdWlfdjEuanMiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9udXR0aW4yYy9jb21wb25lbnQvY29sb3JQYWxldHRlLmpzIiwiLi4vLi4vc3JjL251dHRpbjJjL2NvbXBvbmVudC9jdXN0b21BcHBlYXJhbmNlLmpzIiwiLi4vLi4vc3JjL251dHRpbjJjL2NvbXBvbmVudC9kZXBlbmRlbmNpZXMuanMiLCIuLi8uLi9zcmMvbnV0dGluMmMvY29tcG9uZW50L2JhY2tTaGFkZS9iYWNrU2hhZGVMaXN0ZW5lcnMuanMiLCIuLi8uLi9zcmMvbnV0dGluMmMvY29tcG9uZW50L2JhY2tTaGFkZS9iYWNrU2hhZGUuanMiLCIuLi8uLi9zcmMvbnV0dGluMmMvY29tcG9uZW50L2JhY2tncm91bmQvYmFja2dyb3VuZC5qcyIsIi4uLy4uL3NyYy9udXR0aW4yYy9jb21wb25lbnQvYmFja2dyb3VuZFZpZGVvL2JhY2tncm91bmRWaWRlby5qcyIsIi4uLy4uL3NyYy9udXR0aW4yYy9jb21wb25lbnQvYmFubmVyTGFiZWwvYmFubmVyTGFiZWxNZXNzYWdlL2Jhbm5lckxhYmVsTWVzc2FnZS5qcyIsIi4uLy4uL3NyYy9udXR0aW4yYy9jb21wb25lbnQvYmFubmVyTGFiZWwvYmFubmVyTGFiZWwuanMiLCIuLi8uLi9zcmMvbnV0dGluMmMvY29tcG9uZW50L2Jhbm5lck1lc3NhZ2UvYmFubmVyTWVzc2FnZS5qcyIsIi4uLy4uL3NyYy9udXR0aW4yYy9jb21wb25lbnQvY29tbW9uL2NvbG9yQXBwbGljYXRvci5qcyIsIi4uLy4uL3NyYy9udXR0aW4yYy9jb21wb25lbnQvY29tbW9uL2NvbW1vbkV2ZW50cy5qcyIsIi4uLy4uL3NyYy9udXR0aW4yYy9jb21wb25lbnQvY29tbW9uL2VsZW1lbnRUaGVtZUFwcGxpY2F0b3IuanMiLCIuLi8uLi9zcmMvbnV0dGluMmMvY29tcG9uZW50L2RpYWxvZ0JveC9kaWFsb2dCb3guanMiLCIuLi8uLi9zcmMvbnV0dGluMmMvY29tcG9uZW50L2Ryb3BEb3duUGFuZWwvZHJvcERvd25QYW5lbC5qcyIsIi4uLy4uL3NyYy9udXR0aW4yYy9jb21wb25lbnQvZmlsbFBhbmVsL2ZpbGxQYW5lbC5qcyIsIi4uLy4uL3NyYy9udXR0aW4yYy9jb21wb25lbnQvaW5wdXQvY29tbW9uSW5wdXQuanMiLCIuLi8uLi9zcmMvbnV0dGluMmMvY29tcG9uZW50L3BhbmVsL3BhbmVsLmpzIiwiLi4vLi4vc3JjL251dHRpbjJjL2NvbXBvbmVudC9saW5lUGFuZWwvbGluZVBhbmVsRW50cnkvbGluZVBhbmVsRW50cnkuanMiLCIuLi8uLi9zcmMvbnV0dGluMmMvY29tcG9uZW50L2xpbmVQYW5lbC9saW5lUGFuZWwuanMiLCIuLi8uLi9zcmMvbnV0dGluMmMvY29tcG9uZW50L2xpbmtQYW5lbC9saW5rUGFuZWwuanMiLCIuLi8uLi9zcmMvbnV0dGluMmMvY29tcG9uZW50L3BvcFVwUGFuZWwvcG9wVXBQYW5lbC5qcyIsIi4uLy4uL3NyYy9udXR0aW4yYy9jb21wb25lbnQvc2xpZGVEZWNrL3NsaWRlRGVja0VudHJ5L3NsaWRlRGVja0VudHJ5LmpzIiwiLi4vLi4vc3JjL251dHRpbjJjL2NvbXBvbmVudC9zbGlkZURlY2svc2xpZGVEZWNrLmpzIiwiLi4vLi4vc3JjL251dHRpbjJjL2NvbXBvbmVudC9pbnB1dC9idXR0b24vYnV0dG9uLmpzIiwiLi4vLi4vc3JjL251dHRpbjJjL2NvbXBvbmVudC90b29sQmFyL3Rvb2xCYXIuanMiLCIuLi8uLi9zcmMvbnV0dGluMmMvY29tcG9uZW50L2lucHV0L3JhZGlvVG9nZ2xlSWNvbi9yYWRpb1RvZ2dsZUljb24uanMiLCIuLi8uLi9zcmMvbnV0dGluMmMvY29tcG9uZW50L2lucHV0L3RvZ2dsZUljb24vdG9nZ2xlSWNvbi5qcyIsIi4uLy4uL3NyYy9udXR0aW4yYy9jb21wb25lbnQvdHJlZVBhbmVsL3RyZWVQYW5lbEVudHJ5L3RyZWVQYW5lbEVudHJ5LmpzIiwiLi4vLi4vc3JjL251dHRpbjJjL2NvbXBvbmVudC90cmVlUGFuZWwvdHJlZVBhbmVsLmpzIiwiLi4vLi4vc3JjL251dHRpbjJjL2NvbXBvbmVudC9pbnB1dC9jaGVja0JveC9jaGVja0JveC5qcyIsIi4uLy4uL3NyYy9udXR0aW4yYy9jb21wb25lbnQvaW5wdXQvZW1haWxJbnB1dC9lbWFpbElucHV0LmpzIiwiLi4vLi4vc3JjL251dHRpbjJjL2NvbXBvbmVudC9pbnB1dC9maWxlVXBsb2FkL2ZpbGVVcGxvYWRFbnRyeS9maWxlVXBsb2FkRW50cnkuanMiLCIuLi8uLi9zcmMvbnV0dGluMmMvY29tcG9uZW50L2lucHV0L2ZpbGVVcGxvYWQvZmlsZVVwbG9hZC5qcyIsIi4uLy4uL3NyYy9udXR0aW4yYy9jb21wb25lbnQvaW5wdXQvaGlkZGVuSW5wdXQvaGlkZGVuSW5wdXQuanMiLCIuLi8uLi9zcmMvbnV0dGluMmMvY29tcG9uZW50L2lucHV0L251bWJlcklucHV0L251bWJlcklucHV0LmpzIiwiLi4vLi4vc3JjL251dHRpbjJjL2NvbXBvbmVudC9pbnB1dC9wYXNzd29yZElucHV0L3Bhc3N3b3JkSW5wdXQuanMiLCIuLi8uLi9zcmMvbnV0dGluMmMvY29tcG9uZW50L2lucHV0L3Bhc3N3b3JkTWF0Y2hlcklucHV0L3Bhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWUvcGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZS5qcyIsIi4uLy4uL3NyYy9udXR0aW4yYy9jb21wb25lbnQvaW5wdXQvcGFzc3dvcmRNYXRjaGVySW5wdXQvcGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sL3Bhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbC5qcyIsIi4uLy4uL3NyYy9udXR0aW4yYy9jb21wb25lbnQvaW5wdXQvcGFzc3dvcmRNYXRjaGVySW5wdXQvcGFzc3dvcmRNYXRjaGVyTW9kZWwuanMiLCIuLi8uLi9zcmMvbnV0dGluMmMvY29tcG9uZW50L2lucHV0L3Bhc3N3b3JkTWF0Y2hlcklucHV0L3Bhc3N3b3JkTWF0Y2hlcklucHV0LmpzIiwiLi4vLi4vc3JjL251dHRpbjJjL2NvbXBvbmVudC9pbnB1dC9waG9uZUlucHV0L3Bob25lSW5wdXQuanMiLCIuLi8uLi9zcmMvbnV0dGluMmMvY29tcG9uZW50L2lucHV0L3JhZGlvQnV0dG9uL3JhZGlvQnV0dG9uLmpzIiwiLi4vLi4vc3JjL251dHRpbjJjL2NvbXBvbmVudC9pbnB1dC9yYWRpb1RvZ2dsZVN3aXRjaC9yYWRpb1RvZ2dsZVN3aXRjaC5qcyIsIi4uLy4uL3NyYy9udXR0aW4yYy9jb21wb25lbnQvaW5wdXQvc2VsZWN0L3NlbGVjdC5qcyIsIi4uLy4uL3NyYy9udXR0aW4yYy9jb21wb25lbnQvaW5wdXQvdGV4dElucHV0L3RleHRJbnB1dC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBkZXNjcmlwdGlvbiBGb250IGNvbG9yLCBiYWNrZ3JvdW5kIGNvbG9yLCBhbmQgYm9yZGVyIGNvbG9yIHBhbGV0dGVzIGZvciB2YXJpb3VzIG1vZGVzLlxuICovXG5leHBvcnQgY2xhc3MgQ29sb3JQYWxldHRlIHtcblxuICAgIHN0YXRpYyBQUklNQVJZX0NPTE9SUyA9ICAgICAgICAgIFtcIiNmZmZcIixcIiMwMDdiZmZcIixcIiMwMDdiZmZcIl07XG4gICAgc3RhdGljIFBSSU1BUllfSE9WRVJfQ09MT1JTID0gICAgW1wiI2ZmZlwiLFwiIzAwNjlkOVwiLFwiIzAwNjJjY1wiXTtcbiAgICBzdGF0aWMgUFJJTUFSWV9ESVNBQkxFRF9DT0xPUlMgPSBbXCIjZmZmXCIsXCIjNWVhYmZkXCIsXCIjNWVhYmZkXCJdO1xuICAgIHN0YXRpYyBQUklNQVJZX0FDVElWRV9DT0xPUlMgPSAgIFtcIiNmZmZcIixcIiMwMDYyY2NcIixcIiMwMDVjYmZcIl07XG5cbiAgICBzdGF0aWMgU0VDT05EQVJZX0NPTE9SUyA9ICAgICAgICAgIFtcIiNmZmZcIixcIiM2Yzc1N2RcIixcIiM2Yzc1N2RcIl07XG4gICAgc3RhdGljIFNFQ09OREFSWV9IT1ZFUl9DT0xPUlMgPSAgICBbXCIjZmZmXCIsXCIjNWE2MjY4XCIsXCIjNTQ1YjYyXCJdO1xuICAgIHN0YXRpYyBTRUNPTkRBUllfRElTQUJMRURfQ09MT1JTID0gW1wiI2ZmZlwiLFwiIzZjNzU3ZFwiLFwiIzZjNzU3ZFwiXTtcbiAgICBzdGF0aWMgU0VDT05EQVJZX0FDVElWRV9DT0xPUlMgPSAgIFtcIiNmZmZcIixcIiM1NDViNjJcIixcIiM0ZTU1NWJcIl07XG5cbiAgICBzdGF0aWMgU1VDQ0VTU19DT0xPUlMgPSAgICAgICAgICBbXCIjZmZmXCIsXCIjMjhhNzQ1XCIsXCIjMjhhNzQ1XCJdO1xuICAgIHN0YXRpYyBTVUNDRVNTX0hPVkVSX0NPTE9SUyA9ICAgIFtcIiNmZmZcIixcIiMyMTg4MzhcIixcIiMxZTdlMzRcIl07XG4gICAgc3RhdGljIFNVQ0NFU1NfRElTQUJMRURfQ09MT1JTID0gW1wiI2ZmZlwiLFwiIzI4YTc0NVwiLFwiIzI4YTc0NVwiXTtcbiAgICBzdGF0aWMgU1VDQ0VTU19BQ1RJVkVfQ09MT1JTID0gICBbXCIjZmZmXCIsXCIjMWU3ZTM0XCIsXCIjMWM3NDMwXCJdO1xuXG4gICAgc3RhdGljIElORk9fQ09MT1JTID0gICAgICAgICAgW1wiI2ZmZlwiLFwiIzE3YTJiOFwiLFwiIzE3YTJiOFwiXTtcbiAgICBzdGF0aWMgSU5GT19IT1ZFUl9DT0xPUlMgPSAgICBbXCIjZmZmXCIsXCIjMTM4NDk2XCIsXCIjMTE3YThiXCJdO1xuICAgIHN0YXRpYyBJTkZPX0RJU0FCTEVEX0NPTE9SUyA9IFtcIiNmZmZcIixcIiMxN2EyYjhcIixcIiMxN2EyYjhcIl07XG4gICAgc3RhdGljIElORk9fQUNUSVZFX0NPTE9SUyA9ICAgW1wiI2ZmZlwiLFwiIzExN2E4YlwiLFwiIzEwNzA3ZlwiXTtcblxuICAgIHN0YXRpYyBXQVJOSU5HX0NPTE9SUyA9ICAgICAgICAgIFtcIiNmZmZcIixcIiNmZmMxMDdcIixcIiNmZmMxMDdcIl07XG4gICAgc3RhdGljIFdBUk5JTkdfSE9WRVJfQ09MT1JTID0gICAgW1wiI2ZmZlwiLFwiI2UwYTgwMFwiLFwiI2QzOWUwMFwiXTtcbiAgICBzdGF0aWMgV0FSTklOR19ESVNBQkxFRF9DT0xPUlMgPSBbXCIjZmZmXCIsXCIjZmZjMTA3XCIsXCIjZmZjMTA3XCJdO1xuICAgIHN0YXRpYyBXQVJOSU5HX0FDVElWRV9DT0xPUlMgPSAgIFtcIiNmZmZcIixcIiNkMzllMDBcIixcIiNjNjk1MDBcIl07XG5cbiAgICBzdGF0aWMgREFOR0VSX0NPTE9SUyA9ICAgICAgICAgIFtcIiNmZmZcIixcIiNkYzM1NDVcIixcIiNkYzM1NDVcIl07XG4gICAgc3RhdGljIERBTkdFUl9IT1ZFUl9DT0xPUlMgPSAgICBbXCIjZmZmXCIsXCIjYzgyMzMzXCIsXCIjYmQyMTMwXCJdO1xuICAgIHN0YXRpYyBEQU5HRVJfRElTQUJMRURfQ09MT1JTID0gW1wiI2ZmZlwiLFwiI2RjMzU0NVwiLFwiI2RjMzU0NVwiXTtcbiAgICBzdGF0aWMgREFOR0VSX0FDVElWRV9DT0xPUlMgPSAgIFtcIiNmZmZcIixcIiNiZDIxMzBcIixcIiNiMjFmMmRcIl07XG5cbiAgICBzdGF0aWMgTElHSFRfQ09MT1JTID0gICAgICAgICAgW1wiIzIxMjUyOVwiLFwiI2Y4ZjlmYVwiLFwiI2Y4ZjlmYVwiXTtcbiAgICBzdGF0aWMgTElHSFRfSE9WRVJfQ09MT1JTID0gICAgW1wiIzIxMjUyOVwiLFwiI2UyZTZlYVwiLFwiI2RhZTBlNVwiXTtcbiAgICBzdGF0aWMgTElHSFRfRElTQUJMRURfQ09MT1JTID0gW1wiIzIxMjUyOVwiLFwiI2Y4ZjlmYVwiLFwiI2Y4ZjlmYVwiXTtcbiAgICBzdGF0aWMgTElHSFRfQUNUSVZFX0NPTE9SUyA9ICAgW1wiIzIxMjUyOVwiLFwiI2RhZTBlNVwiLFwiI2QzZDlkZlwiXTtcblxuICAgIHN0YXRpYyBEQVJLX0NPTE9SUyA9ICAgICAgICAgIFtcIiNmZmZcIixcIiMzNDNhNDBcIixcIiMzNDNhNDBcIl07XG4gICAgc3RhdGljIERBUktfSE9WRVJfQ09MT1JTID0gICAgW1wiI2ZmZlwiLFwiIzIzMjcyYlwiLFwiIzFkMjEyNFwiXTtcbiAgICBzdGF0aWMgREFSS19ESVNBQkxFRF9DT0xPUlMgPSBbXCIjZmZmXCIsXCIjMzQzYTQwXCIsXCIjMzQzYTQwXCJdO1xuICAgIHN0YXRpYyBEQVJLX0FDVElWRV9DT0xPUlMgPSAgIFtcIiNmZmZcIixcIiMxZDIxMjRcIixcIiMxNzFhMWRcIl07XG59IiwiZXhwb3J0IGNsYXNzIEN1c3RvbUFwcGVhcmFuY2Uge1xuXG4gICAgc3RhdGljIFNJWkVfREVGQVVMID0gXCJzaXplLWRlZmF1bHRcIjtcbiAgICBzdGF0aWMgU0laRV9TTUFMTCA9IFwic2l6ZS1zbWFsbFwiO1xuICAgIHN0YXRpYyBTSVpFX01FRElVTSA9IFwic2l6ZS1tZWRpdW1cIjtcbiAgICBzdGF0aWMgU0laRV9MQVJHRSA9IFwic2l6ZS1sYXJnZVwiO1xuXG4gICAgc3RhdGljIFNIQVBFX0RFQUZVTFQgPSBcInNoYXBlLWRlZmF1bHRcIjtcbiAgICBzdGF0aWMgU0hBUEVfUk9VTkQgPSBcInNoYXBlLXJvdW5kXCI7XG4gICAgc3RhdGljIFNIQVBFX1NRVUFSRSA9IFwic2hhcGUtc3F1YXJlXCI7XG5cbiAgICBzdGF0aWMgVklTSUJJTElUWV9ERUFGVUxUID0gXCJ2aXNpYmlsaXR5LWRlZmF1bHRcIjtcbiAgICBzdGF0aWMgVklTSUJJTElUWV9WSVNJQkxFID0gXCJ2aXNpYmlsaXR5LXZpc2libGVcIjtcbiAgICBzdGF0aWMgVklTSUJJTElUWV9ISURERU4gPSBcInZpc2liaWxpdHktaGlkZGVuXCI7XG5cbiAgICBzdGF0aWMgU1BBQ0lOR19ERUZBVUxUID0gXCJzcGFjaW5nLWRlZmF1bHRcIjtcbiAgICBzdGF0aWMgU1BBQ0lOR19OT05FID0gXCJzcGFjaW5nLW5vbmVcIjtcbiAgICBzdGF0aWMgU1BBQ0lOR19BQk9WRSA9IFwic3BhY2luZy1hYm92ZVwiO1xuICAgIHN0YXRpYyBTUEFDSU5HX0JFTE9XID0gXCJzcGFjaW5nLWJlbG93XCI7XG4gICAgc3RhdGljIFNQQUNJTkdfQUJPVkVfQkVMT1cgPSBcInNwYWNpbmctYWJvdmUtYmVsb3dcIjtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnNpemUgPSBDdXN0b21BcHBlYXJhbmNlLlNJWkVfREVGQVVMVDtcbiAgICAgICAgdGhpcy5zaGFwZSA9IEN1c3RvbUFwcGVhcmFuY2UuU0hBUEVfREVBRlVMVDtcbiAgICAgICAgdGhpcy5zcGFjaW5nID0gQ3VzdG9tQXBwZWFyYW5jZS5TUEFDSU5HX0RFRkFVTFQ7XG4gICAgICAgIHRoaXMudmlzaWJpbGl0eSA9IEN1c3RvbUFwcGVhcmFuY2UuVklTSUJJTElUWV9ERUFGVUxUO1xuICAgICAgICB0aGlzLmxvY2tlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIHdpdGhTaXplKHNpemUpIHtcbiAgICAgICAgdGhpcy5zaXplID0gc2l6ZTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgd2l0aFNoYXBlKHNoYXBlKSB7XG4gICAgICAgIHRoaXMuc2hhcGUgPSBzaGFwZTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgd2l0aFNwYWNpbmcoc3BhY2luZykge1xuICAgICAgICB0aGlzLnNwYWNpbmcgPSBzcGFjaW5nO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICB3aXRoVmlzaWJpbGl0eSh2aXNpYmlsaXR5KSB7XG4gICAgICAgIHRoaXMudmlzaWJpbGl0eSA9IHZpc2liaWxpdHk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxufSIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCJudXR0aW4yYy1jb3JlX3YxXCI7XG5cbmV4cG9ydCBjbGFzcyBEZXBlbmRlbmNpZXMge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50Q2xhc3MgPSBDb21wb25lbnQ7XG4gICAgfVxuXG59IiwiaW1wb3J0IHsgQ29udGFpbmVyRXZlbnQgfSBmcm9tIFwiY29udGFpbmVyYnJpZGdlX3YxXCI7XG5pbXBvcnQgeyBNZXRob2QgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcbmltcG9ydCB7IFByb3RvdHlwZUNvbmZpZywgVHlwZUNvbmZpZ1BhY2sgfSBmcm9tIFwibWluZGlfdjFcIjtcblxuZXhwb3J0IGNsYXNzIEJhY2tTaGFkZUxpc3RlbmVycyB7XG5cbiAgICBjb25zdHJ1Y3RvcihleGlzdGluZ0xpc3RlbmVycyA9IG51bGwpIHtcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kQ2xpY2tlZExpc3RlbmVyID0gKGV4aXN0aW5nTGlzdGVuZXJzICYmIGV4aXN0aW5nTGlzdGVuZXJzLmdldEJhY2tncm91bmRDbGlja2VkKSA/IGV4aXN0aW5nTGlzdGVuZXJzLmdldEJhY2tncm91bmRDbGlja2VkKCkgOiBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7TWV0aG9kfSBiYWNrZ3JvdW5kQ2xpY2tlZExpc3RlbmVyIFxuICAgICAqL1xuICAgIHdpdGhCYWNrZ3JvdW5kQ2xpY2tlZChiYWNrZ3JvdW5kQ2xpY2tlZExpc3RlbmVyKSB7XG4gICAgICAgIHRoaXMuYmFja2dyb3VuZENsaWNrZWRMaXN0ZW5lciA9IGJhY2tncm91bmRDbGlja2VkTGlzdGVuZXI7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuXG4gICAgZ2V0QmFja2dyb3VuZENsaWNrZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJhY2tncm91bmRDbGlja2VkTGlzdGVuZXI7XG4gICAgfVxuXG4gICAgY2FsbEJhY2tncm91bmRDbGlja2VkKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuY2FsbExpc3RlbmVyKHRoaXMuYmFja2dyb3VuZENsaWNrZWRMaXN0ZW5lciwgZXZlbnQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7TWV0aG9kfSBsaXN0ZW5lciBcbiAgICAgKiBAcGFyYW0ge0NvbnRhaW5lckV2ZW50fSBldmVudCBcbiAgICAgKi9cbiAgICBjYWxsTGlzdGVuZXIobGlzdGVuZXIsIGV2ZW50KSB7XG4gICAgICAgIGlmIChudWxsICE9IGxpc3RlbmVyKSB7XG4gICAgICAgICAgICBsaXN0ZW5lci5jYWxsKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuXG5UeXBlQ29uZmlnUGFjay5pbnN0YW5jZSgpLmFkZFR5cGVDb25maWcoXCJudXR0aW4yYy11aVwiLCBQcm90b3R5cGVDb25maWcudW5uYW1lZChCYWNrU2hhZGVMaXN0ZW5lcnMpKTsiLCJpbXBvcnQge1xuICAgIENvbXBvbmVudCxcbiAgICBDYW52YXNTdHlsZXMsXG4gICAgQmFzZUVsZW1lbnQsXG4gICAgU3R5bGVzaGVldEJ1aWxkZXIsXG4gICAgSW5saW5lQ29tcG9uZW50RmFjdG9yeSxcbiAgICBDb21wb25lbnRCdWlsZGVyLFxuICAgIFN0eWxlc2hlZXRcbn0gZnJvbSBcIm51dHRpbjJjLWNvcmVfdjFcIjtcbmltcG9ydCB7IExvZ2dlciwgVGltZVByb21pc2UgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcbmltcG9ydCB7IEluamVjdGlvblBvaW50LCBQcm90b3R5cGVDb25maWcsIFR5cGVDb25maWdQYWNrIH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5pbXBvcnQgeyBCYWNrU2hhZGVMaXN0ZW5lcnMgfSBmcm9tIFwiLi9iYWNrU2hhZGVMaXN0ZW5lcnMuanNcIjtcblxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIkJhY2tTaGFkZVwiKTtcblxuZXhwb3J0IGNsYXNzIEJhY2tTaGFkZSB7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge0JhY2tTaGFkZUxpc3RlbmVyc30gYmFja1NoYWRlTGlzdGVuZXJzXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoYmFja1NoYWRlTGlzdGVuZXJzID0gbmV3IEJhY2tTaGFkZUxpc3RlbmVycygpKXtcblxuICAgICAgICAvKiogQHR5cGUge0lubGluZUNvbXBvbmVudEZhY3Rvcnl9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKElubGluZUNvbXBvbmVudEZhY3RvcnkpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IG51bGw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtCYXNlRWxlbWVudH0gKi9cbiAgICAgICAgdGhpcy5jb250YWluZXIgPSBudWxsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7QmFja1NoYWRlTGlzdGVuZXJzfSAqL1xuICAgICAgICB0aGlzLmJhY2tTaGFkZUxpc3RlbmVycyA9IGJhY2tTaGFkZUxpc3RlbmVycztcblxuICAgICAgICAvKiogQHR5cGUge2Jvb2xlYW59ICovXG4gICAgICAgIHRoaXMuaGlkZGVuID0gdHJ1ZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBcbiAgICAgKiBAcGFyYW0ge1N0eWxlc2hlZXRCdWlsZGVyfSBzdHlsZXNoZWV0QnVpbGRlclxuXHQgKiBAcmV0dXJucyB7U3R5bGVzaGVldH1cblx0ICovXG5cdHN0YXRpYyBidWlsZFN0eWxlc2hlZXQoc3R5bGVzaGVldEJ1aWxkZXIpIHtcblx0XHRyZXR1cm4gc3R5bGVzaGVldEJ1aWxkZXJcblx0XHRcdC5zZWxlY3RvcihcIi5iYWNrLXNoYWRlXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCBcIjBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLCBcImZpeGVkXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidG9wXCIsIFwiMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImxlZnRcIiwgXCIwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiei1pbmRleFwiLCBcIjEwNDBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLCBcIjEwMHZ3XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiaGVpZ2h0XCIsIFwiMTAwdmhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiIzAwMFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmJhY2stc2hhZGUuc2hvd1wiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwLjVcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5iYWNrLXNoYWRlLmZhZGVcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2l0aW9uXCIsIFwib3BhY2l0eSAwLjNzIGVhc2UtaW4tb3V0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiLW1vei10cmFuc2l0aW9uXCIsIFwib3BhY2l0eSAwLjNzIGVhc2UtaW4tb3V0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiLXdlYmtpdC10cmFuc2l0aW9uXCIsIFwib3BhY2l0eSAwLjNzIGVhc2UtaW4tb3V0XCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG5cdFx0XHQuYnVpbGQoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBcblx0ICogQHBhcmFtIHtDb21wb25lbnRCdWlsZGVyfSBjb21wb25lbnRCdWlsZGVyXG5cdCAqIEByZXR1cm5zIHtDb21wb25lbnR9XG5cdCAqL1xuXHRzdGF0aWMgYnVpbGRDb21wb25lbnQoY29tcG9uZW50QnVpbGRlcikge1xuXHRcdHJldHVybiBjb21wb25lbnRCdWlsZGVyXG5cdFx0XHQucm9vdChcImRpdlwiLCBcImlkPWJhY2tTaGFkZVwiLCBcInN0eWxlPXotaW5kZXg6MztkaXNwbGF5Om5vbmU7XCIsIFwiY2xhc3M9YmFjay1zaGFkZVwiKVxuXHRcdFx0LmJ1aWxkKCk7XG5cdH1cblxuICAgIHBvc3RDb25maWcoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZShCYWNrU2hhZGUpO1xuICAgIH1cblxuICAgIGhpZGVBZnRlcihtaWxsaVNlY29uZHMpIHtcbiAgICAgICAgaWYgKHRoaXMuaGlkZGVuKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge3Jlc29sdmUoKTt9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmhpZGRlbiA9IHRydWU7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJhY2tTaGFkZVwiKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImNsYXNzXCIsIFwiYmFjay1zaGFkZSBmYWRlXCIpO1xuICAgICAgICBjb25zdCBoaWRlUHJvbWlzZSA9IFRpbWVQcm9taXNlLmFzUHJvbWlzZShtaWxsaVNlY29uZHMsXG4gICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYmFja1NoYWRlXCIpLnNldFN0eWxlKFwiZGlzcGxheVwiLCBcIm5vbmVcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IGRpc2FibGVTdHlsZVByb21pc2UgPSBUaW1lUHJvbWlzZS5hc1Byb21pc2UobWlsbGlTZWNvbmRzICsgMSxcbiAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICBDYW52YXNTdHlsZXMuZGlzYWJsZVN0eWxlKEJhY2tTaGFkZS5uYW1lLCB0aGlzLmNvbXBvbmVudC5jb21wb25lbnRJbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbaGlkZVByb21pc2UsIGRpc2FibGVTdHlsZVByb21pc2VdKTtcbiAgICB9XG5cbiAgICBzaG93KCkge1xuICAgICAgICBpZiAoIXRoaXMuaGlkZGVuKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge3Jlc29sdmUoKTt9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmhpZGRlbiA9IGZhbHNlO1xuICAgICAgICBDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUoQmFja1NoYWRlLm5hbWUsIHRoaXMuY29tcG9uZW50LmNvbXBvbmVudEluZGV4KTtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYmFja1NoYWRlXCIpLnNldFN0eWxlKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpO1xuICAgICAgICByZXR1cm4gVGltZVByb21pc2UuYXNQcm9taXNlKDEwMCxcbiAgICAgICAgICAgICgpID0+IHsgXG4gICAgICAgICAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYmFja1NoYWRlXCIpLnNldEF0dHJpYnV0ZVZhbHVlKFwiY2xhc3NcIiwgXCJiYWNrLXNoYWRlIGZhZGUgc2hvd1wiKVxuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cbiAgICBcbn1cblxuVHlwZUNvbmZpZ1BhY2suaW5zdGFuY2UoKS5hZGRUeXBlQ29uZmlnKFwibnV0dGluMmMtdWlcIiwgUHJvdG90eXBlQ29uZmlnLnVubmFtZWQoQmFja1NoYWRlKSk7IiwiaW1wb3J0IHsgQ29tcG9uZW50LFxuXHRDYW52YXNTdHlsZXMsXG5cdFN0eWxlQWNjZXNzb3IsXG5cdFN0eWxlc2hlZXRCdWlsZGVyLFxuXHRDb21wb25lbnRCdWlsZGVyLFxuXHRJbmxpbmVDb21wb25lbnRGYWN0b3J5LFxuXHRTdHlsZXNoZWV0XG59IGZyb20gXCJudXR0aW4yYy1jb3JlX3YxXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcbmltcG9ydCB7IEluamVjdGlvblBvaW50LCBQcm90b3R5cGVDb25maWcsIFR5cGVDb25maWdQYWNrIH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5cbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJCYWNrZ3JvdW5kXCIpO1xuXG5leHBvcnQgY2xhc3MgQmFja2dyb3VuZCB7XG5cbiAgICBjb25zdHJ1Y3RvcihiYWNrZ3JvdW5kSW1hZ2VQYXRoKXtcblxuXHRcdC8qKiBAdHlwZSB7SW5saW5lQ29tcG9uZW50RmFjdG9yeX0gKi9cblx0XHR0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShJbmxpbmVDb21wb25lbnRGYWN0b3J5KTtcblxuXHRcdC8qKiBAdHlwZSB7Q29tcG9uZW50fSAqL1xuXHRcdHRoaXMuY29tcG9uZW50ID0gbnVsbDtcblxuXHRcdC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuXHRcdHRoaXMuYmFja2dyb3VuZEltYWdlUGF0aCA9IGJhY2tncm91bmRJbWFnZVBhdGg7XG5cdH1cblxuXHQvKipcblx0ICogQHBhcmFtIHtTdHlsZXNoZWV0QnVpbGRlcn0gc3R5bGVzaGVldEJ1aWxkZXJcblx0ICogQHJldHVybnMge1N0eWxlc2hlZXR9XG5cdCAqL1xuXHRzdGF0aWMgYnVpbGRTdHlsZXNoZWV0KHN0eWxlc2hlZXRCdWlsZGVyKSB7XG5cdFx0cmV0dXJuIHN0eWxlc2hlZXRCdWlsZGVyXG5cdFx0XHQuc2VsZWN0b3IoXCIuYmFja2dyb3VuZFwiKVxuXHRcdFx0Lm9wZW4oKVxuXHRcdFx0XHQuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwicmdiKDE1MCwgMTk3LCAyNTUpXCIpXG5cdFx0XHRcdC5zdHlsZShcImJhY2tncm91bmQtcmVwZWF0XCIsIFwibm8tcmVwZWF0XCIpXG5cdFx0XHRcdC5zdHlsZShcImJhY2tncm91bmQtcG9zaXRpb24teFwiLCBcImNlbnRlclwiKVxuXHRcdFx0XHQuc3R5bGUoXCJiYWNrZ3JvdW5kLXBvc2l0aW9uLXlcIiwgXCJjZW50ZXJcIilcblx0XHRcdFx0LnN0eWxlKFwiYmFja2dyb3VuZC1hdHRhY2htZW50XCIsIFwic2Nyb2xsXCIpXG5cdFx0XHRcdC5zdHlsZShcImJhY2tncm91bmQtc2l6ZVwiLCBcImNvdmVyXCIpXG5cdFx0XHRcdC5zdHlsZShcImZvbnQtZmFtaWx5XCIsIFwiU291cmNlIFNhbnMgUHJvXCIpXG5cdFx0XHRcdC5zdHlsZShcImZvbnQtd2VpZ2h0XCIsIFwiMzAwXCIpXG5cdFx0XHRcdC5zdHlsZShcImhlaWdodFwiLCBcIjEwMCVcIilcblx0XHRcdC5jbG9zZSgpXG5cdFx0XHQuYnVpbGQoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBcblx0ICogQHBhcmFtIHtDb21wb25lbnRCdWlsZGVyfSB1bmlxdWVJZFJlZ2lzdHJ5XG5cdCAqIEByZXR1cm5zIHtDb21wb25lbnR9XG5cdCAqL1xuXHRzdGF0aWMgYnVpbGRDb21wb25lbnQoY29tcG9uZW50QnVpbGRlcikge1xuXHRcdHJldHVybiBjb21wb25lbnRCdWlsZGVyXG5cdFx0XHQucm9vdChcImRpdlwiLCBcImlkPWJhY2tncm91bmRcIiwgXCJjbGFzcz1iYWNrZ3JvdW5kXCIpXG5cdFx0XHQuYnVpbGQoKTtcblx0fVxuXG5cdHNldChrZXksdmFsKSB7XG5cdFx0dGhpcy5jb21wb25lbnQuc2V0KGtleSx2YWwpO1xuXHR9XG5cblx0cG9zdENvbmZpZygpIHtcblx0XHR0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoQmFja2dyb3VuZCk7XG5cdFx0aWYgKHRoaXMuYmFja2dyb3VuZEltYWdlUGF0aCkge1xuICAgICAgICAgICAgU3R5bGVBY2Nlc3Nvci5mcm9tKHRoaXMuY29tcG9uZW50LmdldChcImJhY2tncm91bmRcIikpXG4gICAgICAgICAgICAgICAgLnNldChcImJhY2tncm91bmQtaW1hZ2VcIiwgXCJ1cmwoXFxcIlwiICsgdGhpcy5iYWNrZ3JvdW5kSW1hZ2VQYXRoICsgXCJcXFwiKVwiKTtcblx0XHR9XG5cdFx0Q2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKEJhY2tncm91bmQubmFtZSk7XG5cdH1cblxufVxuXG5UeXBlQ29uZmlnUGFjay5pbnN0YW5jZSgpLmFkZFR5cGVDb25maWcoXCJudXR0aW4yYy11aVwiLCBQcm90b3R5cGVDb25maWcudW5uYW1lZChCYWNrZ3JvdW5kKSk7IiwiaW1wb3J0IHsgVmlkZW9FbGVtZW50LFxuXHRDYW52YXNTdHlsZXMsXG5cdENvbXBvbmVudCxcblx0U3R5bGVzaGVldEJ1aWxkZXIsXG5cdENvbXBvbmVudEJ1aWxkZXIsXG5cdElubGluZUNvbXBvbmVudEZhY3RvcnksIFxuXHRTdHlsZXNoZWV0XG4gfSBmcm9tIFwibnV0dGluMmMtY29yZV92MVwiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5pbXBvcnQgeyBJbmplY3Rpb25Qb2ludCwgUHJvdG90eXBlQ29uZmlnLCBUeXBlQ29uZmlnUGFjayB9IGZyb20gXCJtaW5kaV92MVwiO1xuaW1wb3J0IHsgQ29udGFpbmVyQXN5bmMgfSBmcm9tIFwiY29udGFpbmVyYnJpZGdlX3YxXCJcblxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIkJhY2tncm91bmRWaWRlb1wiKTtcblxuZXhwb3J0IGNsYXNzIEJhY2tncm91bmRWaWRlbyB7XG5cbiAgICBjb25zdHJ1Y3Rvcih2aWRlb1NyYyl7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtJbmxpbmVDb21wb25lbnRGYWN0b3J5fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShJbmxpbmVDb21wb25lbnRGYWN0b3J5KTtcblxuXHRcdC8qKiBAdHlwZSB7Q29tcG9uZW50fSAqL1xuXHRcdHRoaXMuY29tcG9uZW50ID0gbnVsbDtcblxuICAgICAgICAvKiogQHR5cGUge1N0cmluZ30gKi9cbiAgICAgICAgdGhpcy52aWRlb1NyYyA9IHZpZGVvU3JjO1xuXHR9XG5cblx0LyoqXG5cdCAqIFxuICAgICAqIEBwYXJhbSB7U3R5bGVzaGVldEJ1aWxkZXJ9IHN0eWxlc2hlZXRCdWlsZGVyXG5cdCAqIEByZXR1cm5zIHtTdHlsZXNoZWV0fVxuXHQgKi9cblx0c3RhdGljIGJ1aWxkU3R5bGVzaGVldChzdHlsZXNoZWV0QnVpbGRlcikge1xuXHRcdHJldHVybiBzdHlsZXNoZWV0QnVpbGRlclxuXHRcdFx0LnNlbGVjdG9yKFwiLmJhY2tncm91bmQtdmlkZW9cIilcblx0XHRcdC5vcGVuKClcblx0XHRcdFx0LnN0eWxlKFwid2lkdGhcIiwgXCJhdXRvXCIpXG5cdFx0XHRcdC5zdHlsZShcImhlaWdodFwiLCBcImF1dG9cIilcblx0XHRcdC5jbG9zZSgpXG5cblx0XHRcdC5zZWxlY3RvcihcIi5iYWNrZ3JvdW5kLXZpZGVvLXBsYXllclwiKVxuXHRcdFx0Lm9wZW4oKVxuXHRcdFx0XHQuc3R5bGUoXCJwb3NpdGlvblwiLCBcImZpeGVkXCIpXG5cdFx0XHRcdC5zdHlsZShcInRvcFwiLCBcIjUwJVwiKVxuXHRcdFx0XHQuc3R5bGUoXCJsZWZ0XCIsIFwiNTAlXCIpXG5cdFx0XHRcdC5zdHlsZShcIm1pbi13aWR0aFwiLCBcIjEwMCVcIilcblx0XHRcdFx0LnN0eWxlKFwibWluLWhlaWdodFwiLCBcIjEwMCVcIilcblx0XHRcdFx0LnN0eWxlKFwid2lkdGhcIiwgXCJhdXRvXCIpXG5cdFx0XHRcdC5zdHlsZShcImhlaWdodFwiLCBcImF1dG9cIilcblx0XHRcdFx0LnN0eWxlKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlWCgtNTAlKSB0cmFuc2xhdGVZKC01MCUpXCIpXG5cdFx0XHRcdC5zdHlsZShcInotaW5kZXhcIiwgXCIwXCIpXG5cdFx0XHQuY2xvc2UoKVxuXG5cdFx0XHQuc2VsZWN0b3IoXCIuYmFja2dyb3VuZC12aWRlby1vdmVybGF5XCIpXG5cdFx0XHQub3BlbigpXG5cdFx0XHRcdC5zdHlsZShcInBvc2l0aW9uXCIsIFwiYWJzb2x1dGVcIilcblx0XHRcdFx0LnN0eWxlKFwibWluLXdpZHRoXCIsIFwiMTAwJVwiKVxuXHRcdFx0XHQuc3R5bGUoXCJtaW4taGVpZ2h0XCIsIFwiMTAwJVwiKVxuXHRcdFx0XHQuc3R5bGUoXCJ3aWR0aFwiLCBcImF1dG9cIilcblx0XHRcdFx0LnN0eWxlKFwiaGVpZ2h0XCIsIFwiYXV0b1wiKVxuXHRcdFx0XHQuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiIzExNDRhYVwiKVxuXHRcdFx0XHQuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMC4zXCIpXG5cdFx0XHRcdC5zdHlsZShcInotaW5kZXhcIiwgXCIxXCIpXG5cdFx0XHQuY2xvc2UoKVxuXHRcdFx0XHRcblx0XHRcdC5idWlsZCgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFxuXHQgKiBAcGFyYW0ge0NvbXBvbmVudEJ1aWxkZXJ9IGNvbXBvbmVudEJ1aWxkZXJcblx0ICogQHJldHVybnMge0NvbXBvbmVudH1cblx0ICovXG5cdHN0YXRpYyBidWlsZENvbXBvbmVudChjb21wb25lbnRCdWlsZGVyKSB7XG5cdFx0cmV0dXJuIGNvbXBvbmVudEJ1aWxkZXJcblx0XHRcdC5yb290KFwiZGl2XCIsIFwiaWQ9YmFja2dyb3VuZFZpZGVvXCIsIFwiY2xhc3M9YmFja2dyb3VuZC12aWRlb1wiKVxuXHRcdFx0Lm9wZW4oKVxuXHRcdFx0XHQubm9kZShcImRpdlwiLCBcImNsYXNzPWJhY2tncm91bmQtdmlkZW8tb3ZlcmxheVwiKVxuXHRcdFx0XHQubm9kZShcInZpZGVvXCIsIFwiaWQ9dmlkZW9cIiwgXCJjbGFzcz1iYWNrZ3JvdW5kLXZpZGVvLXBsYXllclwiLFxuXHRcdFx0XHQgICAgICAgIFwicGxheXNpbmxpbmU9cGxheXNpbmxpbmVcIixcblx0XHRcdFx0XHRcdFwiYXV0b3BsYXk9dHJ1ZVwiLFxuXHRcdFx0XHQgICAgICAgIFwibXV0ZWQ9dHJ1ZVwiLCBcImxvb3A9bG9vcFwiKVxuXHRcdFx0XHQub3BlbigpXG5cdFx0XHRcdFx0Lm5vZGUoXCJzb3VyY2VcIiwgXCJpZD1zb3VyY2VcIiwgXCJzcmM9XCIsIFwidHlwZT12aWRlby9tcDRcIilcblx0XHRcdFx0LmNsb3NlKClcblx0XHRcdC5jbG9zZSgpXG5cdFx0XHQuYnVpbGQoKTtcblx0fVxuXG5cdHNldChrZXksdmFsKSB7XG5cdFx0dGhpcy5jb21wb25lbnQuc2V0KGtleSx2YWwpO1xuXHR9XG5cblx0cG9zdENvbmZpZygpIHtcblx0XHR0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoQmFja2dyb3VuZFZpZGVvKTtcblx0XHRDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUoQmFja2dyb3VuZFZpZGVvLm5hbWUpO1xuXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcInNvdXJjZVwiKS5zZXRBdHRyaWJ1dGVWYWx1ZShcInNyY1wiLCB0aGlzLnZpZGVvU3JjKTtcblx0fVxuXG5cdGFzeW5jIHBsYXlNdXRlZCgpIHtcblx0XHRhd2FpdCBDb250YWluZXJBc3luYy5wYXVzZSgxMDApO1xuXHRcdC8qKiBAdHlwZSB7VmlkZW9FbGVtZW50fSAqL1xuXHRcdGNvbnN0IHZpZGVvID0gdGhpcy5jb21wb25lbnQuZ2V0KFwidmlkZW9cIik7XG5cdFx0dmlkZW8ucGxheU11dGVkKCk7XG5cdH1cblxufVxuXG5UeXBlQ29uZmlnUGFjay5pbnN0YW5jZSgpLmFkZFR5cGVDb25maWcoXCJudXR0aW4yYy11aVwiLCBQcm90b3R5cGVDb25maWcudW5uYW1lZChCYWNrZ3JvdW5kVmlkZW8pKTsiLCJpbXBvcnQgeyBUaW1lUHJvbWlzZSB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuaW1wb3J0IHtcbiAgICBDYW52YXNTdHlsZXMsXG4gICAgU3R5bGVTZWxlY3RvckFjY2Vzc29yLFxuICAgIEV2ZW50TWFuYWdlcixcbiAgICBTdHlsZUFjY2Vzc29yLFxuICAgIENvbXBvbmVudCxcbiAgICBJbmxpbmVDb21wb25lbnRGYWN0b3J5LFxuICAgIENvbXBvbmVudEJ1aWxkZXIsXG4gICAgU3R5bGVzaGVldEJ1aWxkZXJcbn0gZnJvbSBcIm51dHRpbjJjLWNvcmVfdjFcIjtcbmltcG9ydCB7IEluamVjdGlvblBvaW50LCBQcm90b3R5cGVDb25maWcsIFR5cGVDb25maWdQYWNrIH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5pbXBvcnQgeyBDdXN0b21BcHBlYXJhbmNlIH0gZnJvbSBcIi4uLy4uL2N1c3RvbUFwcGVhcmFuY2UuanNcIjtcblxuZXhwb3J0IGNsYXNzIEJhbm5lckxhYmVsTWVzc2FnZSB7XG5cbiAgICBzdGF0aWMgZ2V0IEVWRU5UX0NMT1NFX0NMSUNLRUQoKSB7IHJldHVybiBcImNsb3NlQ2xpY2tlZFwiOyB9XG5cbiAgICBzdGF0aWMgZ2V0IFRZUEVfQUxFUlQoKSB7IHJldHVybiBcInR5cGUtYWxlcnRcIjsgfVxuICAgIHN0YXRpYyBnZXQgVFlQRV9JTkZPKCkgeyByZXR1cm4gXCJ0eXBlLWluZm9cIjsgfVxuICAgIHN0YXRpYyBnZXQgVFlQRV9TVUNDRVNTKCkgeyByZXR1cm4gXCJ0eXBlLXN1Y2Nlc3NcIjsgfVxuICAgIHN0YXRpYyBnZXQgVFlQRV9XQVJOSU5HKCkgeyByZXR1cm4gXCJ0eXBlLXdhcm5pbmdcIjsgfVxuXG4gICAgY29uc3RydWN0b3IobWVzc2FnZSwgYmFubmVyVHlwZSA9IEJhbm5lckxhYmVsTWVzc2FnZS5UWVBFX0lORk8sIGN1c3RvbUFwcGVhcmFuY2UgPSBudWxsKSB7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtJbmxpbmVDb21wb25lbnRGYWN0b3J5fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShJbmxpbmVDb21wb25lbnRGYWN0b3J5KTtcblxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudH0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSBudWxsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7U3RyaW5nfSAqL1xuICAgICAgICB0aGlzLmhlYWRlciA9IG51bGw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtTdHJpbmd9ICovXG4gICAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMuYmFubmVyVHlwZSA9IGJhbm5lclR5cGU7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtDdXN0b21BcHBlYXJhbmNlfSAqL1xuICAgICAgICB0aGlzLmN1c3RvbUFwcGVhcmFuY2UgPSBjdXN0b21BcHBlYXJhbmNlO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7RXZlbnRNYW5hZ2VyfSAqL1xuICAgICAgICB0aGlzLmV2ZW50TWFuYWdlciA9IG5ldyBFdmVudE1hbmFnZXIoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0eWxlc2hlZXRCdWlsZGVyfSBzdHlsZXNoZWV0QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyBcbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRTdHlsZXNoZWV0KHN0eWxlc2hlZXRCdWlsZGVyKSB7XG4gICAgICAgIHJldHVybiBzdHlsZXNoZWV0QnVpbGRlclxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmJhbm5lci1sYWJlbC1tZXNzYWdlXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCJ3aGl0ZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIndpZHRoXCIsIFwiMTAwJVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmJhbm5lci1sYWJlbC1tZXNzYWdlLXZpc2libGVcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMC44XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNpdGlvblwiLCBcIm9wYWNpdHkgLjVzIC4xc1wiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmJhbm5lci1sYWJlbC1tZXNzYWdlLWhpZGRlblwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNpdGlvblwiLCBcIm9wYWNpdHkgLjVzIDBzXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYmFubmVyLWxhYmVsLW1lc3NhZ2UtY2xvc2UtYnV0dG9uXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luLWxlZnRcIiwgXCIxNXB0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCJ3aGl0ZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtd2VpZ2h0XCIsIFwiYm9sZFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZsb2F0XCIsIFwicmlnaHRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmb250LXNpemVcIiwgXCIyMnB0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibGluZS1oZWlnaHRcIiwgXCIxNHB0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY3Vyc29yXCIsIFwicG9pbnRlclwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zaXRpb25cIiwgXCIwLjNzXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYmFubmVyLWxhYmVsLW1lc3NhZ2UtaGVhZGVyXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCJ3aGl0ZVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmJhbm5lci1sYWJlbC1tZXNzYWdlLXRleHRcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tbGVmdFwiLCBcIjE1cHhcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5iYW5uZXItbGFiZWwtbWVzc2FnZS10eXBlLWFsZXJ0XCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiNmNDQzMzZcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5iYW5uZXItbGFiZWwtbWVzc2FnZS10eXBlLXN1Y2Nlc3NcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiIzRDQUY1MFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmJhbm5lci1sYWJlbC1tZXNzYWdlLXR5cGUtaW5mb1wiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIiwgXCIjMjE5NkYzXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYmFubmVyLWxhYmVsLW1lc3NhZ2UtdHlwZS13YXJuaW5nXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiNmZjk4MDBcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5iYW5uZXItbGFiZWwtbWVzc2FnZS1zaXplLWxhcmdlXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZ1wiLCBcIjE4cHRcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5iYW5uZXItbGFiZWwtbWVzc2FnZS1zaXplLWRlZmF1bHRcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwYWRkaW5nXCIsIFwiMTJwdFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmJhbm5lci1sYWJlbC1tZXNzYWdlLXNpemUtc21hbGxcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwYWRkaW5nLWxlZnRcIiwgXCIxMHB0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZy1yaWdodFwiLCBcIjEwcHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwYWRkaW5nLWJvdHRvbVwiLCBcIjhweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmctdG9wXCIsIFwiOHB4XCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYmFubmVyLWxhYmVsLW1lc3NhZ2Utc2hhcGUtc3F1YXJlXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyLXJhZGl1c1wiLCBcIjBweFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmJhbm5lci1sYWJlbC1tZXNzYWdlLXNoYXBlLXJvdW5kXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyLXJhZGl1c1wiLCBcIjNweFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmJhbm5lci1sYWJlbC1tZXNzYWdlLXNwYWNpbmctbm9uZVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpblwiLCBcIjBwdFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmJhbm5lci1sYWJlbC1tZXNzYWdlLXNwYWNpbmctYWJvdmVcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tdG9wXCIsIFwiMXJlbVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmJhbm5lci1sYWJlbC1tZXNzYWdlLXNwYWNpbmctYmVsb3dcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tYm90dG9tXCIsIFwiMXJlbVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmJhbm5lci1sYWJlbC1tZXNzYWdlLXNwYWNpbmctYWJvdmUtYmVsb3dcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tdG9wXCIsIFwiMXJlbVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpbi1ib3R0b21cIiwgXCIxcmVtXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuYnVpbGQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudEJ1aWxkZXJ9IGNvbXBvbmVudEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMgXG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkQ29tcG9uZW50KGNvbXBvbmVudEJ1aWxkZXIpIHtcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudEJ1aWxkZXJcbiAgICAgICAgICAgIC5yb290KFwiZGl2XCIsIFwiaWQ9YmFubmVyTGFiZWxNZXNzYWdlXCIsIFwic3R5bGU9ZGlzcGxheTpub25lO1wiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwiZGl2XCIsIFwiaWQ9YmFubmVyTGFiZWxNZXNzYWdlQ29udGVudFwiLCBcImNsYXNzPWJhbm5lci1sYWJlbC1tZXNzYWdlIGJhbm5lci1sYWJlbC1tZXNzYWdlLWhpZGRlblwiKVxuICAgICAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAgICAgLm5vZGUoXCJzcGFuXCIsIFwiaWQ9YmFubmVyTGFiZWxNZXNzYWdlQ2xvc2VCdXR0b25cIiwgXCJjbGFzcz1iYW5uZXItbGFiZWwtbWVzc2FnZS1jbG9zZS1idXR0b25cIilcbiAgICAgICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRleHQoXCLDl1wiKVxuICAgICAgICAgICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgICAgICAgICAubm9kZShcInNwYW5cIiwgXCJpZD1iYW5uZXJMYWJlbE1lc3NhZ2VIZWFkZXJcIiwgXCJjbGFzcz1iYW5uZXItbGFiZWwtbWVzc2FnZS1oZWFkZXJcIilcbiAgICAgICAgICAgICAgICAgICAgLm5vZGUoXCJzcGFuXCIsIFwiaWQ9YmFubmVyTGFiZWxNZXNzYWdlVGV4dFwiLCBcImNsYXNzPWJhbm5lci1sYWJlbC1tZXNzYWdlLXRleHRcIilcbiAgICAgICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgIC5idWlsZCgpO1xuICAgIH1cblxuICAgIGFzeW5jIHBvc3RDb25maWcoKSB7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnR9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZShCYW5uZXJMYWJlbE1lc3NhZ2UpO1xuICAgICAgICBDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUoQmFubmVyTGFiZWxNZXNzYWdlLm5hbWUpO1xuICAgICAgICBTdHlsZVNlbGVjdG9yQWNjZXNzb3IuZnJvbSh0aGlzLm1lc3NhZ2VDb250ZW50RWxlbWVudClcbiAgICAgICAgICAgIC5lbmFibGUoXCJiYW5uZXItbGFiZWwtbWVzc2FnZVwiKVxuICAgICAgICAgICAgLmVuYWJsZShcImJhbm5lci1sYWJlbC1tZXNzYWdlLVwiICsgdGhpcy5iYW5uZXJUeXBlKTtcblxuICAgICAgICBpZiAodGhpcy5jdXN0b21BcHBlYXJhbmNlICYmIHRoaXMuY3VzdG9tQXBwZWFyYW5jZS5zaGFwZSkge1xuICAgICAgICAgICAgU3R5bGVTZWxlY3RvckFjY2Vzc29yLmZyb20odGhpcy5tZXNzYWdlQ29udGVudEVsZW1lbnQpXG4gICAgICAgICAgICAgICAgLmVuYWJsZShcImJhbm5lci1sYWJlbC1tZXNzYWdlLVwiICsgdGhpcy5jdXN0b21BcHBlYXJhbmNlLnNoYXBlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5jdXN0b21BcHBlYXJhbmNlICYmIHRoaXMuY3VzdG9tQXBwZWFyYW5jZS5zaXplKSB7XG4gICAgICAgICAgICBTdHlsZVNlbGVjdG9yQWNjZXNzb3IuZnJvbSh0aGlzLm1lc3NhZ2VDb250ZW50RWxlbWVudClcbiAgICAgICAgICAgICAgICAuZW5hYmxlKFwiYmFubmVyLWxhYmVsLW1lc3NhZ2UtXCIgKyB0aGlzLmN1c3RvbUFwcGVhcmFuY2Uuc2l6ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuY3VzdG9tQXBwZWFyYW5jZSAmJiB0aGlzLmN1c3RvbUFwcGVhcmFuY2Uuc3BhY2luZykge1xuICAgICAgICAgICAgU3R5bGVTZWxlY3RvckFjY2Vzc29yLmZyb20odGhpcy5tZXNzYWdlQ29udGVudEVsZW1lbnQpXG4gICAgICAgICAgICAgICAgLmVuYWJsZShcImJhbm5lci1sYWJlbC1tZXNzYWdlLVwiICsgdGhpcy5jdXN0b21BcHBlYXJhbmNlLnNwYWNpbmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYmFubmVyTGFiZWxNZXNzYWdlQ2xvc2VCdXR0b25cIikubGlzdGVuVG8oXCJjbGlja1wiLCB0aGlzLmNsb3NlQ2xpY2tlZCwgdGhpcyk7XG4gICAgfVxuXG4gICAgY2xvc2VDbGlja2VkKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuZXZlbnRNYW5hZ2VyLnRyaWdnZXIoQmFubmVyTGFiZWxNZXNzYWdlLkVWRU5UX0NMT1NFX0NMSUNLRUQpO1xuICAgIH1cblxuICAgIGhpZGUoKSB7XG4gICAgICAgIFN0eWxlU2VsZWN0b3JBY2Nlc3Nvci5mcm9tKHRoaXMubWVzc2FnZUNvbnRlbnRFbGVtZW50KVxuICAgICAgICAgICAgLmRpc2FibGUoXCJiYW5uZXItbGFiZWwtbWVzc2FnZS12aXNpYmxlXCIpXG4gICAgICAgICAgICAuZW5hYmxlKFwiYmFubmVyLWxhYmVsLW1lc3NhZ2UtaGlkZGVuXCIpO1xuXG4gICAgICAgIHRoaXMuaXNWaXNpYmxlID0gZmFsc2U7XG4gICAgICAgIFxuICAgICAgICBUaW1lUHJvbWlzZS5hc1Byb21pc2UoNTAwLCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNWaXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgU3R5bGVBY2Nlc3Nvci5mcm9tKHRoaXMuY29tcG9uZW50LmdldChcImJhbm5lckxhYmVsTWVzc2FnZVwiKSlcbiAgICAgICAgICAgICAgICAgICAgLnNldChcImRpc3BsYXlcIiwgXCJub25lXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzaG93KCkge1xuICAgICAgICBTdHlsZUFjY2Vzc29yLmZyb20odGhpcy5jb21wb25lbnQuZ2V0KFwiYmFubmVyTGFiZWxNZXNzYWdlXCIpKVxuICAgICAgICAgICAgLnNldChcImRpc3BsYXlcIiwgXCJibG9ja1wiKTtcblxuICAgICAgICBUaW1lUHJvbWlzZS5hc1Byb21pc2UoNTAsICgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzVmlzaWJsZSkge1xuICAgICAgICAgICAgICAgIFN0eWxlU2VsZWN0b3JBY2Nlc3Nvci5mcm9tKHRoaXMubWVzc2FnZUNvbnRlbnRFbGVtZW50KVxuICAgICAgICAgICAgICAgICAgICAuZGlzYWJsZShcImJhbm5lci1sYWJlbC1tZXNzYWdlLWhpZGRlblwiKVxuICAgICAgICAgICAgICAgICAgICAuZW5hYmxlKFwiYmFubmVyLWxhYmVsLW1lc3NhZ2UtdmlzaWJsZVwiKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuaXNWaXNpYmxlID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBnZXQgbWVzc2FnZUNvbnRlbnRFbGVtZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb21wb25lbnQuZ2V0KFwiYmFubmVyTGFiZWxNZXNzYWdlQ29udGVudFwiKTtcbiAgICB9XG5cbiAgICBzZXRNZXNzYWdlKGhlYWRlciwgbWVzc2FnZSkge1xuICAgICAgICBpZiAoaGVhZGVyKSB7XG4gICAgICAgICAgICB0aGlzLmFwcGx5SGVhZGVyKGhlYWRlcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1lc3NhZ2UpIHtcbiAgICAgICAgICAgIHRoaXMuYXBwbHlNZXNzYWdlKG1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXBwbHlIZWFkZXIoaGVhZGVyKSB7XG4gICAgICAgIHRoaXMuaGVhZGVyID0gaGVhZGVyO1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJiYW5uZXJMYWJlbE1lc3NhZ2VIZWFkZXJcIikuc2V0Q2hpbGQodGhpcy5oZWFkZXIpO1xuICAgIH1cblxuICAgIGFwcGx5TWVzc2FnZShtZXNzYWdlKSB7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJhbm5lckxhYmVsTWVzc2FnZVRleHRcIikuc2V0Q2hpbGQodGhpcy5tZXNzYWdlKTtcbiAgICB9XG5cbn1cblxuVHlwZUNvbmZpZ1BhY2suaW5zdGFuY2UoKS5hZGRUeXBlQ29uZmlnKFwibnV0dGluMmMtdWlcIiwgUHJvdG90eXBlQ29uZmlnLnVubmFtZWQoQmFubmVyTGFiZWxNZXNzYWdlKSk7IiwiaW1wb3J0IHsgQ2FudmFzU3R5bGVzLCBDb21wb25lbnRCdWlsZGVyLCBFdmVudE1hbmFnZXIsIElubGluZUNvbXBvbmVudEZhY3RvcnksIFN0eWxlc2hlZXQsIFN0eWxlc2hlZXRCdWlsZGVyIH0gZnJvbSBcIm51dHRpbjJjLWNvcmVfdjFcIjtcbmltcG9ydCB7IEluamVjdGlvblBvaW50LCBQcm90b3R5cGVDb25maWcsIFR5cGVDb25maWdQYWNrIH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5pbXBvcnQgeyBDdXN0b21BcHBlYXJhbmNlIH0gZnJvbSBcIi4uL2N1c3RvbUFwcGVhcmFuY2UuanNcIjtcbmltcG9ydCB7IEJhbm5lckxhYmVsTWVzc2FnZSB9IGZyb20gXCIuL2Jhbm5lckxhYmVsTWVzc2FnZS9iYW5uZXJMYWJlbE1lc3NhZ2UuanNcIjtcbmltcG9ydCB7IENvbnRhaW5lckFzeW5jIH0gZnJvbSBcImNvbnRhaW5lcmJyaWRnZV92MVwiO1xuXG5leHBvcnQgY2xhc3MgQmFubmVyTGFiZWwge1xuXG4gICAgc3RhdGljIEVWRU5UX0hJRERFTiA9IFwiYmFubmVyTGFiZWxIaWRkZW5cIjtcbiAgICBzdGF0aWMgRVZFTlRfU0hPV04gPSBcImJhbm5lckxhYmVsU2hvd25cIjtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAvKiogQHR5cGUge0lubGluZUNvbXBvbmVudEZhY3Rvcnl9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKElubGluZUNvbXBvbmVudEZhY3RvcnkpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IG51bGw7XG5cblx0XHR0aGlzLmFwcGVhcmFuY2UgPSBuZXcgQ3VzdG9tQXBwZWFyYW5jZSgpXG5cdFx0XHQud2l0aFNpemUoQ3VzdG9tQXBwZWFyYW5jZS5TSVpFX1NNQUxMKVxuXHRcdFx0LndpdGhTaGFwZShDdXN0b21BcHBlYXJhbmNlLlNIQVBFX1JPVU5EKVxuXHRcdFx0LndpdGhTcGFjaW5nKEN1c3RvbUFwcGVhcmFuY2UuU1BBQ0lOR19CRUxPVyk7XG5cblx0XHQvKiogQHR5cGUge0Jhbm5lckxhYmVsTWVzc2FnZX0gKi9cblx0XHR0aGlzLnN1Y2Nlc3MgPSBJbmplY3Rpb25Qb2ludFxuXHRcdFx0Lmluc3RhbmNlKEJhbm5lckxhYmVsTWVzc2FnZSwgW1wiXCIsIEJhbm5lckxhYmVsTWVzc2FnZS5UWVBFX1NVQ0NFU1MsIHRoaXMuYXBwZWFyYW5jZV0pO1xuXG5cdFx0LyoqIEB0eXBlIHtCYW5uZXJMYWJlbE1lc3NhZ2V9ICovXG5cdFx0dGhpcy53YXJuaW5nID0gSW5qZWN0aW9uUG9pbnRcblx0XHRcdC5pbnN0YW5jZShCYW5uZXJMYWJlbE1lc3NhZ2UsIFtcIlwiLCBCYW5uZXJMYWJlbE1lc3NhZ2UuVFlQRV9XQVJOSU5HLCB0aGlzLmFwcGVhcmFuY2VdKTtcblxuXHRcdC8qKiBAdHlwZSB7QmFubmVyTGFiZWxNZXNzYWdlfSAqL1xuXHRcdHRoaXMuZXJyb3IgPSBJbmplY3Rpb25Qb2ludFxuXHRcdFx0Lmluc3RhbmNlKEJhbm5lckxhYmVsTWVzc2FnZSwgW1wiXCIsIEJhbm5lckxhYmVsTWVzc2FnZS5UWVBFX0FMRVJULCB0aGlzLmFwcGVhcmFuY2VdKTtcblxuICAgICAgICB0aGlzLmlzVmlzaWJsZSA9IGZhbHNlO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7RXZlbnRNYW5hZ2VyfSAqL1xuICAgICAgICB0aGlzLmV2ZW50cyA9IG5ldyBFdmVudE1hbmFnZXIoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge1N0eWxlc2hlZXRCdWlsZGVyfSBzdHlsZXNoZWV0QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyB7U3R5bGVzaGVldH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRTdHlsZXNoZWV0KHN0eWxlc2hlZXRCdWlsZGVyKSB7XG4gICAgICAgIHJldHVybiBzdHlsZXNoZWV0QnVpbGRlclxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmJhbm5lci1sYWJlbFwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbG9yXCIsIFwid2hpdGVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLCBcIjEwMCVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJvdmVyZmxvd1wiLCBcImhpZGRlblwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBvc2l0aW9uXCIsIFwicmVsYXRpdmVcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5iYW5uZXItbGFiZWwtdmlzaWJsZVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1heC1oZWlnaHRcIiwgXCI1MHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidmlzaWJpbGl0eVwiLCBcInZpc2libGVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2l0aW9uXCIsIFwibWF4LWhlaWdodCAuM3MsIHZpc2liaWxpdHkgMHNcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5iYW5uZXItbGFiZWwtaGlkZGVuXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWF4LWhlaWdodFwiLCBcIjBweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInZpc2liaWxpdHlcIiwgXCJoaWRkZW5cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2l0aW9uXCIsIFwibWF4LWhlaWdodCAuM3MgLjNzLCB2aXNpYmlsaXR5IDBzIC4zc1wiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDb21wb25lbnRCdWlsZGVyfSBjb21wb25lbnRCdWlsZGVyIFxuICAgICAqIEByZXR1cm5zIFxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZENvbXBvbmVudChjb21wb25lbnRCdWlsZGVyKSB7XG4gICAgICAgIHJldHVybiBjb21wb25lbnRCdWlsZGVyXG4gICAgICAgICAgICAucm9vdChcImRpdlwiLCBcImlkPWJhbm5lckxhYmVsXCIsIFwiY2xhc3M9YmFubmVyLWxhYmVsIGJhbm5lci1sYWJlbC1oaWRkZW5cIilcbiAgICAgICAgICAgIC5idWlsZCgpO1xuICAgIH1cblxuXG4gICAgYXN5bmMgcG9zdENvbmZpZygpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKEJhbm5lckxhYmVsKTtcbiAgICAgICAgQ2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKEJhbm5lckxhYmVsLm5hbWUpO1xuICAgICAgICB0aGlzLnN1Y2Nlc3MuaGlkZSgpO1xuICAgICAgICB0aGlzLndhcm5pbmcuaGlkZSgpO1xuICAgICAgICB0aGlzLmVycm9yLmhpZGUoKTtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYmFubmVyTGFiZWxcIikuYWRkQ2hpbGQodGhpcy5zdWNjZXNzLmNvbXBvbmVudCk7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJhbm5lckxhYmVsXCIpLmFkZENoaWxkKHRoaXMud2FybmluZy5jb21wb25lbnQpO1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJiYW5uZXJMYWJlbFwiKS5hZGRDaGlsZCh0aGlzLmVycm9yLmNvbXBvbmVudCk7XG4gICAgICAgIHRoaXMuc3VjY2Vzcy5ldmVudE1hbmFnZXIubGlzdGVuVG8oQmFubmVyTGFiZWxNZXNzYWdlLkVWRU5UX0NMT1NFX0NMSUNLRUQsIHRoaXMuaGlkZSwgdGhpcyk7XG4gICAgICAgIHRoaXMud2FybmluZy5ldmVudE1hbmFnZXIubGlzdGVuVG8oQmFubmVyTGFiZWxNZXNzYWdlLkVWRU5UX0NMT1NFX0NMSUNLRUQsIHRoaXMuaGlkZSwgdGhpcyk7XG4gICAgICAgIHRoaXMuZXJyb3IuZXZlbnRNYW5hZ2VyLmxpc3RlblRvKEJhbm5lckxhYmVsTWVzc2FnZS5FVkVOVF9DTE9TRV9DTElDS0VELCB0aGlzLmhpZGUsIHRoaXMpO1xuICAgICAgICB0aGlzLmFjdGl2ZSA9IHRoaXMuc3VjY2VzcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaGVhZGVyIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlIFxuICAgICAqL1xuICAgIHNob3dTdWNjZXNzKGhlYWRlciwgbWVzc2FnZSkge1xuICAgICAgICB0aGlzLnNob3dCYW5uZXIodGhpcy5zdWNjZXNzLCBoZWFkZXIsIG1lc3NhZ2UpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBoZWFkZXIgXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2UgXG4gICAgICovXG4gICAgc2hvd1dhcm5pbmcoaGVhZGVyLCBtZXNzYWdlKSB7XG4gICAgICAgIHRoaXMuc2hvd0Jhbm5lcih0aGlzLndhcm5pbmcsIGhlYWRlciwgbWVzc2FnZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGhlYWRlciBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZSBcbiAgICAgKi9cbiAgICBzaG93RXJyb3IoaGVhZGVyLCBtZXNzYWdlKSB7XG4gICAgICAgIHRoaXMuc2hvd0Jhbm5lcih0aGlzLmVycm9yLCBoZWFkZXIsIG1lc3NhZ2UpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBoZWFkZXIgXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2UgXG4gICAgICovXG4gICAgaGlkZSgpIHtcbiAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgICBDb250YWluZXJBc3luYy5kZWxheSg2MDAsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzLnRyaWdnZXIoQmFubmVyTGFiZWwuRVZFTlRfSElEREVOKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVzZXQoKSB7XG5cdFx0dGhpcy5jb21wb25lbnQuZ2V0KFwiYmFubmVyTGFiZWxcIikuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLCBcImJhbm5lci1sYWJlbCBiYW5uZXItbGFiZWwtaGlkZGVuXCIpO1xuICAgICAgICB0aGlzLmFjdGl2ZS5oaWRlKCk7XG4gICAgICAgIHRoaXMuaXNWaXNpYmxlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtCYW5uZXJMYWJlbE1lc3NhZ2V9IGJhbm5lclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBoZWFkZXJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgICAqL1xuICAgICBzaG93QmFubmVyKGJhbm5lciwgaGVhZGVyLCBtZXNzYWdlKSB7XG4gICAgICAgIHRoaXMucmVzZXQoKTtcblx0XHRiYW5uZXIuc2V0TWVzc2FnZShoZWFkZXIsIG1lc3NhZ2UpO1xuICAgICAgICBiYW5uZXIuc2hvdygpO1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJiYW5uZXJMYWJlbFwiKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImNsYXNzXCIsIFwiYmFubmVyLWxhYmVsIGJhbm5lci1sYWJlbC12aXNpYmxlXCIpO1xuICAgICAgICB0aGlzLmlzVmlzaWJsZSA9IHRydWU7XG5cdFx0dGhpcy5hY3RpdmUgPSBiYW5uZXI7XG4gICAgICAgIENvbnRhaW5lckFzeW5jLmRlbGF5KDYwMCwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5ldmVudHMudHJpZ2dlcihCYW5uZXJMYWJlbC5FVkVOVF9TSE9XTik7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuVHlwZUNvbmZpZ1BhY2suaW5zdGFuY2UoKS5hZGRUeXBlQ29uZmlnKFwibnV0dGluMmMtdWlcIiwgUHJvdG90eXBlQ29uZmlnLnVubmFtZWQoQmFubmVyTGFiZWwpKTsiLCJpbXBvcnQge1xuICAgIENhbnZhc1N0eWxlcyxcbiAgICBDb21wb25lbnQsXG4gICAgU3R5bGVzaGVldEJ1aWxkZXIsXG4gICAgQ29tcG9uZW50QnVpbGRlcixcbiAgICBJbmxpbmVDb21wb25lbnRGYWN0b3J5LFxuICAgIFN0eWxlc2hlZXRcbn0gZnJvbSBcIm51dHRpbjJjLWNvcmVfdjFcIjtcbmltcG9ydCB7IEluamVjdGlvblBvaW50LCBQcm90b3R5cGVDb25maWcsIFR5cGVDb25maWdQYWNrIH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5pbXBvcnQgeyBMb2dnZXIsIE1ldGhvZCwgVGltZVByb21pc2UgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcbmltcG9ydCB7IEN1c3RvbUFwcGVhcmFuY2UgfSBmcm9tIFwiLi4vY3VzdG9tQXBwZWFyYW5jZS5qc1wiO1xuXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiQmFubmVyTWVzc2FnZVwiKTtcblxuZXhwb3J0IGNsYXNzIEJhbm5lck1lc3NhZ2Uge1xuXG4gICAgc3RhdGljIFRZUEVfQUxFUlQgPSBcInR5cGUtYWxlcnRcIjtcbiAgICBzdGF0aWMgVFlQRV9JTkZPID0gXCJ0eXBlLWluZm9cIjtcbiAgICBzdGF0aWMgVFlQRV9TVUNDRVNTID0gXCJ0eXBlLXN1Y2Nlc3NcIjtcbiAgICBzdGF0aWMgVFlQRV9XQVJOSU5HID0gXCJ0eXBlLXdhcm5pbmdcIjtcblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBiYW5uZXJUeXBlIFxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gY2xvc2VhYmxlIFxuICAgICAqIEBwYXJhbSB7Q3VzdG9tQXBwZWFyYW5jZX0gY3VzdG9tQXBwZWFyYW5jZVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UsIGJhbm5lclR5cGUgPSBCYW5uZXJNZXNzYWdlLlRZUEVfSU5GTywgY2xvc2VhYmxlID0gZmFsc2UsIGN1c3RvbUFwcGVhcmFuY2UgPSBudWxsKSB7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtJbmxpbmVDb21wb25lbnRGYWN0b3J5fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShJbmxpbmVDb21wb25lbnRGYWN0b3J5KTtcblxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudH0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSBudWxsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Ym9vbGVhbn0gKi9cbiAgICAgICAgdGhpcy5jbG9zZWFibGUgPSBjbG9zZWFibGU7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMuYmFubmVyVHlwZSA9IGJhbm5lclR5cGU7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtNZXRob2R9ICovXG4gICAgICAgIHRoaXMub25IaWRlTGlzdGVuZXIgPSBudWxsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7TWV0aG9kfSAqL1xuICAgICAgICB0aGlzLm9uU2hvd0xpc3RlbmVyID0gbnVsbDtcblxuICAgICAgICAvKiogQHR5cGUge0N1c3RvbUFwcGVhcmFuY2V9ICovXG4gICAgICAgIHRoaXMuY3VzdG9tQXBwZWFyYW5jZSA9IGN1c3RvbUFwcGVhcmFuY2U7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0eWxlc2hlZXRCdWlsZGVyfSBzdHlsZXNoZWV0QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyB7U3R5bGVzaGVldH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRTdHlsZXNoZWV0KHN0eWxlc2hlZXRCdWlsZGVyKSB7XG4gICAgICAgIHJldHVybiBzdHlsZXNoZWV0QnVpbGRlclxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmJhbm5lci1tZXNzYWdlLXNpemUtbGFyZ2VcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwYWRkaW5nXCIsIFwiMThwdFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmJhbm5lci1tZXNzYWdlLXNpemUtZGVmYXVsdCwgLmJhbm5lci1tZXNzYWdlLXNpemUtbWVkaXVtXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZ1wiLCBcIjEycHRcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5iYW5uZXItbWVzc2FnZS1zaXplLXNtYWxsXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZy1sZWZ0XCIsIFwiMTBwdFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmctcmlnaHRcIiwgXCIxMHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZy1ib3R0b21cIiwgXCI4cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwYWRkaW5nLXRvcFwiLCBcIjhweFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmJhbm5lci1tZXNzYWdlLXNoYXBlLWRlZmF1bHQsIC5iYW5uZXItbWVzc2FnZS1zaGFwZS1zcXVhcmVcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItcmFkaXVzXCIsIFwiMHB4XCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYmFubmVyLW1lc3NhZ2Utc2hhcGUtcm91bmRcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItcmFkaXVzXCIsIFwiM3B4XCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYmFubmVyLW1lc3NhZ2Utc3BhY2luZy1kZWZhdWx0LCAuYmFubmVyLW1lc3NhZ2Utc3BhY2luZy1ub25lXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luXCIsIFwiMHB0XCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYmFubmVyLW1lc3NhZ2Utc3BhY2luZy1hYm92ZVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpbi10b3BcIiwgXCIxcmVtXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYmFubmVyLW1lc3NhZ2Utc3BhY2luZy1iZWxvd1wiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpbi1ib3R0b21cIiwgXCIxcmVtXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYmFubmVyLW1lc3NhZ2Utc3BhY2luZy1hYm92ZS1iZWxvd1wiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpbi10b3BcIiwgXCIxcmVtXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luLWJvdHRvbVwiLCBcIjFyZW1cIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5iYW5uZXItbWVzc2FnZVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbG9yXCIsIFwid2hpdGVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLCBcIjEwMCVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2l0aW9uXCIsIFwib3BhY2l0eSAwLjVzXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYmFubmVyLW1lc3NhZ2UuaGlkZVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYmFubmVyLW1lc3NhZ2Uuc2hvd1wiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwLjkwXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYmFubmVyLW1lc3NhZ2UtdHlwZS1hbGVydFwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIiwgXCIjZjQ0MzM2XCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYmFubmVyLW1lc3NhZ2UtdHlwZS1zdWNjZXNzXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiM0Q0FGNTBcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5iYW5uZXItbWVzc2FnZS10eXBlLWluZm9cIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiIzIxOTZGM1wiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmJhbm5lci1tZXNzYWdlLXR5cGUtd2FybmluZ1wiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIiwgXCIjZmY5ODAwXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYmFubmVyLW1lc3NhZ2UtY2xvc2UtYnV0dG9uXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luLWxlZnRcIiwgXCIxNXB0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCJ3aGl0ZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtd2VpZ2h0XCIsIFwiYm9sZFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZsb2F0XCIsIFwicmlnaHRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmb250LXNpemVcIiwgXCIyMnB0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibGluZS1oZWlnaHRcIiwgXCIxNHB0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY3Vyc29yXCIsIFwicG9pbnRlclwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zaXRpb25cIiwgXCIwLjNzXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYmFubmVyLW1lc3NhZ2UtY2xvc2UtYnV0dG9uOmhvdmVyXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCJibGFja1wiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmJhbm5lci1tZXNzYWdlLW1lc3NhZ2VcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tbGVmdFwiLCBcIjE1cHhcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5idWlsZCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Q29tcG9uZW50QnVpbGRlcn0gY29tcG9uZW50QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyB7Q29tcG9uZW50fVxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZENvbXBvbmVudChjb21wb25lbnRCdWlsZGVyKSB7XG4gICAgICAgIHJldHVybiBjb21wb25lbnRCdWlsZGVyXG4gICAgICAgICAgICAucm9vdChcImRpdlwiLCBcImlkPWJhbm5lck1lc3NhZ2VcIiwgXCJjbGFzcz1iYW5uZXItbWVzc2FnZVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwic3BhblwiLCBcImlkPWJhbm5lck1lc3NhZ2VDbG9zZUJ1dHRvblwiLCBcImNsYXNzPWJhbm5lci1tZXNzYWdlLWNsb3NlLWJ1dHRvblwiKVxuICAgICAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAgICAgLnRleHQoXCLDl1wiKVxuICAgICAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAgICAgLm5vZGUoXCJzcGFuXCIsIFwiaWQ9YmFubmVyTWVzc2FnZUhlYWRlclwiLCBcImNsYXNzPWJhbm5lci1tZXNzYWdlLWhlYWRlclwiKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwic3BhblwiLCBcImlkPWJhbm5lck1lc3NhZ2VNZXNzYWdlXCIsIFwiY2xhc3M9YmFubmVyLW1lc3NhZ2UtbWVzc2FnZVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgIC5idWlsZCgpO1xuICAgIH1cblxuICAgIHBvc3RDb25maWcoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZShCYW5uZXJNZXNzYWdlKTtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYmFubmVyTWVzc2FnZUhlYWRlclwiKS5zZXRDaGlsZChcIkFsZXJ0XCIpO1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJiYW5uZXJNZXNzYWdlTWVzc2FnZVwiKS5zZXRDaGlsZCh0aGlzLm1lc3NhZ2UpO1xuICAgICAgICB0aGlzLmFwcGx5Q2xhc3NlcyhcImJhbm5lci1tZXNzYWdlIGZhZGVcIik7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJhbm5lck1lc3NhZ2VDbG9zZUJ1dHRvblwiKS5saXN0ZW5UbyhcImNsaWNrXCIsIHRoaXMuaGlkZSwgdGhpcyk7XG4gICAgfVxuXG4gICAgYXBwbHlDbGFzc2VzKGJhc2VDbGFzc2VzKSB7XG4gICAgICAgIGxldCBjbGFzc2VzID0gYmFzZUNsYXNzZXM7XG4gICAgICAgIGNsYXNzZXMgPSBjbGFzc2VzICsgXCIgYmFubmVyLW1lc3NhZ2UtXCIgKyB0aGlzLmJhbm5lclR5cGU7XG4gICAgICAgIGlmICh0aGlzLmN1c3RvbUFwcGVhcmFuY2UpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmN1c3RvbUFwcGVhcmFuY2Uuc2hhcGUpIHtcbiAgICAgICAgICAgICAgICBjbGFzc2VzID0gY2xhc3NlcyArIFwiIGJhbm5lci1tZXNzYWdlLVwiICsgdGhpcy5jdXN0b21BcHBlYXJhbmNlLnNoYXBlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuY3VzdG9tQXBwZWFyYW5jZS5zaXplKSB7XG4gICAgICAgICAgICAgICAgY2xhc3NlcyA9IGNsYXNzZXMgKyBcIiBiYW5uZXItbWVzc2FnZS1cIiArIHRoaXMuY3VzdG9tQXBwZWFyYW5jZS5zaXplO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuY3VzdG9tQXBwZWFyYW5jZS5zcGFjaW5nKSB7XG4gICAgICAgICAgICAgICAgY2xhc3NlcyA9IGNsYXNzZXMgKyBcIiBiYW5uZXItbWVzc2FnZS1cIiArIHRoaXMuY3VzdG9tQXBwZWFyYW5jZS5zcGFjaW5nO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJhbm5lck1lc3NhZ2VcIikuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLGNsYXNzZXMpO1xuICAgIH1cbiAgICBcbiAgICBhcHBseUhlYWRlcihoZWFkZXIpIHtcbiAgICAgICAgdGhpcy5oZWFkZXIgPSBoZWFkZXI7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJhbm5lck1lc3NhZ2VIZWFkZXJcIikuc2V0Q2hpbGQodGhpcy5oZWFkZXIpO1xuICAgIH1cblxuICAgIGFwcGx5TWVzc2FnZShtZXNzYWdlKSB7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJhbm5lck1lc3NhZ2VNZXNzYWdlXCIpLnNldENoaWxkKHRoaXMubWVzc2FnZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtNZXRob2R9IGNsaWNrZWRMaXN0ZW5lciBcbiAgICAgKi9cbiAgICByZW1vdmUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbXBvbmVudC5yZW1vdmUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge01ldGhvZH0gb25IaWRlTGlzdGVuZXIgXG4gICAgICovXG4gICAgb25IaWRlKG9uSGlkZUxpc3RlbmVyKSB7XG4gICAgICAgIHRoaXMub25IaWRlTGlzdGVuZXIgPSBvbkhpZGVMaXN0ZW5lcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge01ldGhvZH0gb25TaG93TGlzdGVuZXIgXG4gICAgICovXG4gICAgb25TaG93KG9uU2hvd0xpc3RlbmVyKSB7XG4gICAgICAgIHRoaXMub25TaG93TGlzdGVuZXIgPSBvblNob3dMaXN0ZW5lcjtcbiAgICB9XG5cbiAgICBhc3luYyBoaWRlKCkge1xuICAgICAgICB0aGlzLmFwcGx5Q2xhc3NlcyhcImJhbm5lci1tZXNzYWdlIGhpZGVcIik7XG4gICAgICAgIGF3YWl0IFRpbWVQcm9taXNlLmFzUHJvbWlzZSg1MDAsICgpID0+IHsgXG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJiYW5uZXJNZXNzYWdlXCIpLnNldFN0eWxlKFwiZGlzcGxheVwiLFwibm9uZVwiKTtcbiAgICAgICAgICAgIENhbnZhc1N0eWxlcy5kaXNhYmxlU3R5bGUoQmFubmVyTWVzc2FnZS5uYW1lLCB0aGlzLmNvbXBvbmVudC5jb21wb25lbnRJbmRleCk7XG4gICAgICAgIH0pO1xuICAgICAgICBpZih0aGlzLm9uSGlkZUxpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLm9uSGlkZUxpc3RlbmVyLmNhbGwoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIHNob3cobmV3SGVhZGVyID0gbnVsbCwgbmV3TWVzc2FnZSA9IG51bGwpIHtcbiAgICAgICAgaWYgKG5ld0hlYWRlcikge1xuICAgICAgICAgICAgdGhpcy5hcHBseUhlYWRlcihuZXdIZWFkZXIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuZXdNZXNzYWdlKSB7XG4gICAgICAgICAgICB0aGlzLmFwcGx5TWVzc2FnZShuZXdNZXNzYWdlKTtcbiAgICAgICAgfVxuICAgICAgICBDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUoQmFubmVyTWVzc2FnZS5uYW1lLCB0aGlzLmNvbXBvbmVudC5jb21wb25lbnRJbmRleCk7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJhbm5lck1lc3NhZ2VcIikuc2V0U3R5bGUoXCJkaXNwbGF5XCIsXCJibG9ja1wiKTtcbiAgICAgICAgYXdhaXQgVGltZVByb21pc2UuYXNQcm9taXNlKDEwMCwoKSA9PiB7IFxuICAgICAgICAgICAgdGhpcy5hcHBseUNsYXNzZXMoXCJiYW5uZXItbWVzc2FnZSBzaG93XCIpO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYodGhpcy5vblNob3dMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5vblNob3dMaXN0ZW5lci5jYWxsKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cblxuVHlwZUNvbmZpZ1BhY2suaW5zdGFuY2UoKS5hZGRUeXBlQ29uZmlnKFwibnV0dGluMmMtdWlcIiwgUHJvdG90eXBlQ29uZmlnLnVubmFtZWQoQmFubmVyTWVzc2FnZSkpOyIsImV4cG9ydCBjbGFzcyBDb2xvckFwcGxpY2F0b3Ige1xuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHlsZXNoZWV0QnVpbGRlcn0gc3R5bGVzaGVldEJ1aWxkZXIgXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHNlbGVjdG9yIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBmb250Q29sb3IgXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGJhY2tncm91bmRDb2xvciBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gYm9yZGVyQ29sb3IgXG4gICAgICogQHJldHVybnMgXG4gICAgICovXG4gICAgc3RhdGljIGFwcGx5KHN0eWxlc2hlZXRCdWlsZGVyLCBzZWxlY3RvciwgZm9udENvbG9yLCBiYWNrZ3JvdW5kQ29sb3IsIGJvcmRlckNvbG9yKSB7XG4gICAgICAgIHJldHVybiBzdHlsZXNoZWV0QnVpbGRlci5zZWxlY3RvcihzZWxlY3RvcilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjb2xvclwiLCBmb250Q29sb3IpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBiYWNrZ3JvdW5kQ29sb3IpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyLWNvbG9yXCIsIGJvcmRlckNvbG9yKVxuICAgICAgICAgICAgLmNsb3NlKCk7XG4gICAgfVxuXG59IiwiZXhwb3J0IGNsYXNzIENvbW1vbkV2ZW50cyB7XG5cbiAgICBzdGF0aWMgSE9WRVJFRCA9IFwiaG92ZXJlZFwiO1xuICAgIHN0YXRpYyBVTkhPVkVSRUQgPSBcInVuaG92ZXJlZFwiO1xuICAgIHN0YXRpYyBDTElDS0VEID0gXCJjbGlja2VkXCI7XG4gICAgc3RhdGljIERPVUJMRV9DTElDS0VEID0gXCJkb3VibGVDbGlja2VkXCI7XG5cbiAgICBzdGF0aWMgRU5URVJFRCA9IFwiZW50ZXJlZFwiO1xuICAgIHN0YXRpYyBLRVlVUFBFRCA9IFwia2V5VXBwZWRcIjtcbiAgICBzdGF0aWMgRk9DVVNFRCA9IFwiZm9jdXNlZFwiO1xuICAgIHN0YXRpYyBCTFVSUkVEID0gXCJibHVycmVkXCI7XG5cbiAgICBzdGF0aWMgQ0hBTkdFRCA9IFwiY2hhbmdlZFwiO1xuICAgIHN0YXRpYyBFTkFCTEVEID0gXCJlbmFibGVkXCI7XG4gICAgc3RhdGljIERJU0FCTEVEID0gXCJkaXNhYmxlZFwiO1xuICAgIHN0YXRpYyBTRUxFQ1RFRCA9IFwic2VsZWN0ZWRcIjtcblxuICAgIHN0YXRpYyBEUkFHX1NUQVJURUQgPSBcImRyYWdTdGFydGVkXCI7XG4gICAgc3RhdGljIERSQUdfRU5ERUQgPSBcImRyYWdFbmRlZFwiO1xuICAgIHN0YXRpYyBEUk9QUEVEID0gXCJkcm9wcGVkXCI7XG4gICAgXG59IiwiaW1wb3J0IHsgU3R5bGVzaGVldEJ1aWxkZXIgfSBmcm9tIFwibnV0dGluMmMtY29yZV92MVwiO1xuaW1wb3J0IHsgQ29sb3JBcHBsaWNhdG9yIH0gZnJvbSBcIi4vY29sb3JBcHBsaWNhdG9yXCI7XG5cbmV4cG9ydCBjbGFzcyBFbGVtZW50VGhlbWVBcHBsaWNhdG9yIHtcbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0eWxlc2hlZXRCdWlsZGVyfSBzdHlsZXNoZWV0QnVpbGRlciBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gY2xhc3NQcmVmaXhcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbW9kZU5hbWUgXG4gICAgICogQHBhcmFtIHtTdHJpbmdbXX0gZGVmYXVsdENvbG9ycyBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ1tdfSBob3ZlckNvbG9ycyBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ1tdfSBkaXNhYmxlZENvbG9ycyBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ1tdfSBhY3RpdmVDb2xvcnMgXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGJveFNoYWRvd0ZvY3VzIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBib3hTaGFkb3dBY3RpdmVGb2N1cyBcbiAgICAgKiBAcmV0dXJuIHtTdHlsZXNoZWV0QnVpbGRlcn1cbiAgICAgKi9cbiAgICBzdGF0aWMgYXBwbHkoc3R5bGVzaGVldEJ1aWxkZXIsIGNsYXNzUHJlZml4LCBtb2RlTmFtZSxcbiAgICAgICAgICAgIGRlZmF1bHRDb2xvcnMsIGhvdmVyQ29sb3JzLCBkaXNhYmxlZENvbG9ycywgYWN0aXZlQ29sb3JzLFxuICAgICAgICAgICAgYm94U2hhZG93Rm9jdXMsIGJveFNoYWRvd0FjdGl2ZUZvY3VzKSB7XG5cbiAgICAgICAgQ29sb3JBcHBsaWNhdG9yLmFwcGx5KHN0eWxlc2hlZXRCdWlsZGVyLCBcbiAgICAgICAgICAgIGAuJHtjbGFzc1ByZWZpeH0tJHttb2RlTmFtZX1gLFxuICAgICAgICAgICAgZGVmYXVsdENvbG9yc1swXSwgZGVmYXVsdENvbG9yc1sxXSwgZGVmYXVsdENvbG9yc1syXSk7XG5cbiAgICAgICAgQ29sb3JBcHBsaWNhdG9yLmFwcGx5KHN0eWxlc2hlZXRCdWlsZGVyLFxuICAgICAgICAgICAgYC4ke2NsYXNzUHJlZml4fS0ke21vZGVOYW1lfTpob3ZlcmAsXG4gICAgICAgICAgICBob3ZlckNvbG9yc1swXSwgaG92ZXJDb2xvcnNbMV0sIGhvdmVyQ29sb3JzWzJdKTtcblxuICAgICAgICBDb2xvckFwcGxpY2F0b3IuYXBwbHkoc3R5bGVzaGVldEJ1aWxkZXIsXG4gICAgICAgICAgICBgLiR7Y2xhc3NQcmVmaXh9LSR7bW9kZU5hbWV9OmZvY3VzLCAuJHtjbGFzc1ByZWZpeH0tJHttb2RlTmFtZX0uZm9jdXNgLFxuICAgICAgICAgICAgaG92ZXJDb2xvcnNbMF0sIGhvdmVyQ29sb3JzWzFdLCBob3ZlckNvbG9yc1syXSk7XG5cbiAgICAgICAgQ29sb3JBcHBsaWNhdG9yLmFwcGx5KHN0eWxlc2hlZXRCdWlsZGVyLFxuICAgICAgICAgICAgYC4ke2NsYXNzUHJlZml4fS0ke21vZGVOYW1lfS5kaXNhYmxlZCwgLiR7Y2xhc3NQcmVmaXh9LSR7bW9kZU5hbWV9OmRpc2FibGVkYCxcbiAgICAgICAgICAgIGRpc2FibGVkQ29sb3JzWzBdLCBkaXNhYmxlZENvbG9yc1sxXSwgZGlzYWJsZWRDb2xvcnNbMl0pO1xuXG4gICAgICAgIENvbG9yQXBwbGljYXRvci5hcHBseShzdHlsZXNoZWV0QnVpbGRlcixcbiAgICAgICAgICAgIGAuJHtjbGFzc1ByZWZpeH0tJHttb2RlTmFtZX06bm90KDpkaXNhYmxlZCk6bm90KC5kaXNhYmxlZCk6YWN0aXZlLGAgK1xuICAgICAgICAgICAgICAgIGAuJHtjbGFzc1ByZWZpeH0tJHttb2RlTmFtZX06bm90KDpkaXNhYmxlZCk6bm90KC5kaXNhYmxlZCkuYWN0aXZlLGAgK1xuICAgICAgICAgICAgICAgIGAuc2hvdyA+IC4ke2NsYXNzUHJlZml4fS0ke21vZGVOYW1lfS5kcm9wZG93bi10b2dnbGVgLFxuICAgICAgICAgICAgYWN0aXZlQ29sb3JzWzBdLCBhY3RpdmVDb2xvcnNbMV0sIGFjdGl2ZUNvbG9yc1syXSk7XG5cbiAgICAgICAgQ29sb3JBcHBsaWNhdG9yLmFwcGx5KHN0eWxlc2hlZXRCdWlsZGVyLFxuICAgICAgICAgICAgYC4ke2NsYXNzUHJlZml4fS0ke21vZGVOYW1lfTpub3QoOmRpc2FibGVkKTpub3QoLmRpc2FibGVkKTphY3RpdmU6Zm9jdXMsYCArXG4gICAgICAgICAgICAgICAgYC4ke2NsYXNzUHJlZml4fS0ke21vZGVOYW1lfTpub3QoOmRpc2FibGVkKTpub3QoLmRpc2FibGVkKS5hY3RpdmU6Zm9jdXMsYCArXG4gICAgICAgICAgICAgICAgYC5zaG93ID4gLiR7Y2xhc3NQcmVmaXh9LSR7bW9kZU5hbWV9LmRyb3Bkb3duLXRvZ2dsZTpmb2N1c2AsXG4gICAgICAgICAgICBhY3RpdmVDb2xvcnNbMF0sIGFjdGl2ZUNvbG9yc1sxXSwgYWN0aXZlQ29sb3JzWzJdKTtcblxuXG4gICAgICAgIHJldHVybiBzdHlsZXNoZWV0QnVpbGRlclxuICAgICAgICAgICAgLnNlbGVjdG9yKGAuJHtjbGFzc1ByZWZpeH0tJHttb2RlTmFtZX06bm90KDpkaXNhYmxlZCk6bm90KC5kaXNhYmxlZCk6YWN0aXZlOmZvY3VzLGAgK1xuICAgICAgICAgICAgICAgICAgICAgICAgYC4ke2NsYXNzUHJlZml4fS0ke21vZGVOYW1lfTpub3QoOmRpc2FibGVkKTpub3QoLmRpc2FibGVkKS5hY3RpdmU6Zm9jdXMsYCArXG4gICAgICAgICAgICAgICAgICAgICAgICBgLnNob3cgPiAuJHtjbGFzc1ByZWZpeH0tJHttb2RlTmFtZX0uZHJvcGRvd24tdG9nZ2xlOmZvY3VzYClcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3gtc2hhZG93XCIsIGJveFNoYWRvd0FjdGl2ZUZvY3VzKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKGAuJHtjbGFzc1ByZWZpeH0tJHttb2RlTmFtZX06Zm9jdXMsYCArIFxuICAgICAgICAgICAgICAgICAgICAgICAgYCR7Y2xhc3NQcmVmaXh9LSR7bW9kZU5hbWV9LmZvY3VzYClcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3gtc2hhZG93XCIsIGJveFNoYWRvd0ZvY3VzKVxuICAgICAgICAgICAgLmNsb3NlKCk7XG4gICAgfVxufSIsImltcG9ydCB7XG4gICAgQ29tcG9uZW50LFxuICAgIENhbnZhc1N0eWxlcyxcbiAgICBDYW52YXNSb290LFxuICAgIE5hdmlnYXRpb24sXG4gICAgU3R5bGVzaGVldEJ1aWxkZXIsXG4gICAgU3R5bGVzaGVldCxcbiAgICBDb21wb25lbnRCdWlsZGVyLFxuICAgIElubGluZUNvbXBvbmVudEZhY3Rvcnlcbn0gZnJvbSBcIm51dHRpbjJjLWNvcmVfdjFcIjtcbmltcG9ydCB7IFRpbWVQcm9taXNlLCBMb2dnZXIsIE1ldGhvZCwgTGlzdCB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQsIFByb3RvdHlwZUNvbmZpZywgVHlwZUNvbmZpZ1BhY2sgfSBmcm9tIFwibWluZGlfdjFcIjtcbmltcG9ydCB7IEJhY2tTaGFkZSB9IGZyb20gXCIuLi9iYWNrU2hhZGUvYmFja1NoYWRlLmpzXCI7XG5pbXBvcnQgeyBCYWNrU2hhZGVMaXN0ZW5lcnMgfSBmcm9tIFwiLi4vYmFja1NoYWRlL2JhY2tTaGFkZUxpc3RlbmVycy5qc1wiO1xuaW1wb3J0IHsgQ29udGFpbmVyRWxlbWVudFV0aWxzLCBDb250YWluZXJFdmVudCB9IGZyb20gXCJjb250YWluZXJicmlkZ2VfdjFcIjtcblxuXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiRGlhbG9nQm94XCIpO1xuXG5leHBvcnQgY2xhc3MgRGlhbG9nQm94IHtcbiAgICBcbiAgICBzdGF0aWMgT1BUSU9OX0JBQ0tfT05fQ0xPU0UgPSAxO1xuXG4gICAgLyoqXG4gICAgICogXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoZGVmYXVsdE9wdGlvbnMgPSBbXSl7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtJbmxpbmVDb21wb25lbnRGYWN0b3J5fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShJbmxpbmVDb21wb25lbnRGYWN0b3J5KTtcblxuXHRcdC8qKiBAdHlwZSB7Q29tcG9uZW50fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IG51bGw7XG4gICAgICAgIFxuICAgICAgICAvKiogQHR5cGUge0JhY2tTaGFkZX0gKi9cbiAgICAgICAgdGhpcy5iYWNrU2hhZGUgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShCYWNrU2hhZGUsIFtcbiAgICAgICAgICAgIG5ldyBCYWNrU2hhZGVMaXN0ZW5lcnMoKVxuICAgICAgICAgICAgICAgIC53aXRoQmFja2dyb3VuZENsaWNrZWQobmV3IE1ldGhvZCh0aGlzLmhpZGUsIHRoaXMpKV0pO1xuXG4gICAgICAgIHRoaXMuaGlkZGVuID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLnN3YWxsb3dGb2N1c0VzY2FwZSA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMub3duaW5nVHJpZ2dlciA9IG51bGw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtMaXN0PHN0cmluZz59ICovXG4gICAgICAgIHRoaXMuZGVmYXVsdE9wdGlvbnMgPSBuZXcgTGlzdChkZWZhdWx0T3B0aW9ucyk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtMaXN0PHN0cmluZz59ICovXG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG5ldyBMaXN0KGRlZmF1bHRPcHRpb25zKTtcblxuICAgICAgICAvKiogQHR5cGUge0Z1bmN0aW9ufSAqL1xuICAgICAgICB0aGlzLmRlc3Ryb3lGb2N1c0VzY2FwZUxpc3RlbmVyID0gbnVsbDtcbiAgICB9XG4gICAgXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHlsZXNoZWV0QnVpbGRlcn0gc3R5bGVzaGVldEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMge1N0eWxlc2hlZXR9XG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkU3R5bGVzaGVldChzdHlsZXNoZWV0QnVpbGRlcikge1xuICAgICAgIHJldHVybiBzdHlsZXNoZWV0QnVpbGRlclxuICAgICAgICAgICAgLm1lZGlhKFwiQG1lZGlhIChtYXgtd2lkdGg6IDUxNnB4KVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zZWxlY3RvcihcIi5kaWFsb2dib3gtb3ZlcmxheVwiKVxuICAgICAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIiwgXCJmaXhlZFwiKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJsZWZ0XCIsIFwiMFwiKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLCBcIjEwMCVcIilcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwiaGVpZ2h0XCIsIFwiMTAwJVwiKVxuICAgICAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgICAgICAuc2VsZWN0b3IoXCIuZGlhbG9nYm94LWZyYW1lXCIpXG4gICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLCBcImFic29sdXRlXCIpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpblwiLCBcIjBcIilcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwid2lkdGhcIiwgXCIxMDAlXCIpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcImhlaWdodFwiLCBcIjEwMCVcIilcbiAgICAgICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRpYWxvZ2JveC1jb250ZW50XCIpXG4gICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLCBcInJlbGF0aXZlXCIpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcImhlaWdodFwiLCBcIjEwMCVcIilcbiAgICAgICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRpYWxvZ2JveC1ib2R5XCIpXG4gICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJvdmVyZmxvdy15XCIsIFwidmlzaWJsZVwiKVxuICAgICAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgLm1lZGlhKFwiQG1lZGlhIChtaW4td2lkdGg6IDUxN3B4KVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zZWxlY3RvcihcIi5kaWFsb2dib3gtb3ZlcmxheVwiKVxuICAgICAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIiwgXCJmaXhlZFwiKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tdG9wXCIsIFwiNTRwdFwiKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJwYWRkaW5nLXRvcFwiLCBcIjEuNXJlbVwiKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJsZWZ0XCIsIFwiNTAlXCIpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZSgtNTAlLDApXCIpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcIndpZHRoXCIsIFwiYXV0b1wiKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJoZWlnaHRcIiwgXCJhdXRvXCIpXG4gICAgICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgICAgIC5zZWxlY3RvcihcIi5kaWFsb2dib3gtZnJhbWVcIilcbiAgICAgICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcInBvc2l0aW9uXCIsIFwicmVsYXRpdmVcIilcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwid2lkdGhcIiwgXCJhdXRvXCIpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcImhlaWdodFwiLCBcImF1dG9cIilcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luXCIsIFwiMC41cmVtXCIpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcInBvaW50ZXItZXZlbnRzXCIsIFwibm9uZVwiKVxuICAgICAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgICAgICAuc2VsZWN0b3IoXCIuZGlhbG9nYm94LWNvbnRlbnRcIilcbiAgICAgICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcInBvc2l0aW9uXCIsIFwicmVsYXRpdmVcIilcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyXCIsIFwiMXB4IHNvbGlkIHJnYmEoMCwgMCwgMCwgMC4yKVwiKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItcmFkaXVzXCIsIFwiMC4zcmVtXCIpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcImhlaWdodFwiLCBcImF1dG9cIilcbiAgICAgICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRpYWxvZ2JveC1ib2R5XCIpXG4gICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJvdmVyZmxvdy15XCIsIFwidmlzaWJsZVwiKVxuICAgICAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgICAgICAuc2VsZWN0b3IoXCIuZGlhbG9nYm94LWhlYWRlclwiKVxuICAgICAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyLXRvcC1sZWZ0LXJhZGl1c1wiLCBcIjAuM3JlbVwiKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItdG9wLXJpZ2h0LXJhZGl1c1wiLCBcIjAuM3JlbVwiKVxuICAgICAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgLm1lZGlhKFwiQG1lZGlhIChwcmVmZXJzLXJlZHVjZWQtbW90aW9uOiByZWR1Y2UpXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRpYWxvZ2JveC1vdmVybGF5LmRpYWxvZ2JveC1mYWRlIC5kaWFsb2dib3gtZnJhbWVcIilcbiAgICAgICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zaXRpb25cIiwgXCJub25lXCIpXG4gICAgICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgICAgIC5zZWxlY3RvcihcIi5kaWFsb2dib3gtZmFkZVwiKVxuICAgICAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNpdGlvblwiLCBcIm5vbmVcIilcbiAgICAgICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5kaWFsb2dib3gtb3BlblwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm92ZXJmbG93XCIsIFwiaGlkZGVuXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuZGlhbG9nYm94LW9wZW4gLmRpYWxvZ2JveC1vdmVybGF5XCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwib3ZlcmZsb3cteFwiLCBcImhpZGRlblwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm92ZXJmbG93LXlcIiwgXCJhdXRvXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuZGlhbG9nYm94LW92ZXJsYXktZmFkZVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zaXRpb25cIiwgXCJvcGFjaXR5IDAuMTVzIGxpbmVhclwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRpYWxvZ2JveC1vdmVybGF5LWRpc3BsYXktYmxvY2tcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5kaWFsb2dib3gtb3ZlcmxheS1kaXNwbGF5LW5vbmVcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIFwibm9uZVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRpYWxvZ2JveC1vdmVybGF5LWZhZGU6bm90KC5kaWFsb2dib3gtb3ZlcmxheS1zaG93KVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuZGlhbG9nYm94LW92ZXJsYXkuZGlhbG9nYm94LW92ZXJsYXktZmFkZSAuZGlhbG9nYm94LWZyYW1lXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNpdGlvblwiLCBcIi13ZWJraXQtdHJhbnNmb3JtIDAuM3MgZWFzZS1vdXRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2l0aW9uXCIsIFwidHJhbnNmb3JtIDAuM3MgZWFzZS1vdXRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2l0aW9uXCIsIFwidHJhbnNmb3JtIDAuM3MgZWFzZS1vdXQsIC13ZWJraXQtdHJhbnNmb3JtIDAuM3MgZWFzZS1vdXRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCItd2Via2l0LXRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZSgwLCAtNTBweClcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoMCwgLTUwcHgpXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuZGlhbG9nYm94LW92ZXJsYXkuZGlhbG9nYm94LW92ZXJsYXktc2hvdyAuZGlhbG9nYm94LWZyYW1lXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiLXdlYmtpdC10cmFuc2Zvcm1cIiwgXCJub25lXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNmb3JtXCIsIFwibm9uZVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRpYWxvZ2JveC1oZWFkZXIgLmRpYWxvZ2JveC1jbG9zZS1idXR0b25cIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwYWRkaW5nXCIsIFwiMC43cmVtIDFyZW1cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW5cIiwgXCItMC43cmVtIC0xcmVtIC0wLjdyZW0gYXV0b1wiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRpYWxvZ2JveC10aXRsZVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpbi1ib3R0b21cIiwgXCIwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibGluZS1oZWlnaHRcIiwgXCIxLjVcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5kaWFsb2dib3gtYm9keVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBvc2l0aW9uXCIsIFwicmVsYXRpdmVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCItbXMtZmxleFwiLCBcIjEgMSBhdXRvXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZmxleFwiLCBcIjEgMSBhdXRvXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuZGlhbG9nYm94LWZvb3RlclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgXCItbXMtZmxleGJveFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgXCJmbGV4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiLW1zLWZsZXgtYWxpZ25cIiwgXCJjZW50ZXJcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJhbGlnbi1pdGVtc1wiLCBcImNlbnRlclwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIi1tcy1mbGV4LXBhY2tcIiwgXCJlbmRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJqdXN0aWZ5LWNvbnRlbnRcIiwgXCJmbGV4LWVuZFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmdcIiwgXCIxcmVtXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyLXRvcFwiLCBcIjFweCBzb2xpZCAjZGVlMmU2XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXNcIiwgXCIwLjNyZW1cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzXCIsIFwiMC4zcmVtXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuZGlhbG9nYm94LWZvb3RlciA+IDpub3QoOmZpcnN0LWNoaWxkKVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpbi1sZWZ0XCIsIFwiLjI1cmVtXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuZGlhbG9nYm94LWZvb3RlciA+IDpub3QoOmxhc3QtY2hpbGQpXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luLXJpZ2h0XCIsIFwiLjI1cmVtXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuZGlhbG9nYm94LW92ZXJsYXlcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0b3BcIiwgXCIwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiei1pbmRleFwiLCBcIjEwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwib3ZlcmZsb3dcIiwgXCJoaWRkZW5cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJvdXRsaW5lXCIsIFwiMFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRpYWxvZ2JveC1mcmFtZVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpblwiLCBcIjBcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5kaWFsb2dib3gtY29udGVudFwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgXCItbXMtZmxleGJveFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgXCJmbGV4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiLW1zLWZsZXgtZGlyZWN0aW9uXCIsIFwiY29sdW1uXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZmxleC1kaXJlY3Rpb25cIiwgXCJjb2x1bW5cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLCBcIjEwMCVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwb2ludGVyLWV2ZW50c1wiLCBcImF1dG9cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiI2ZmZlwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY2xpcFwiLCBcInBhZGRpbmctYm94XCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuZGlhbG9nYm94LWhlYWRlclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgXCItbXMtZmxleGJveFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgXCJmbGV4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiM5OTk5OTlcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjb2xvclwiLCBcIiNmZmZmZmZcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCItbXMtZmxleC1hbGlnblwiLCBcInN0YXJ0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYWxpZ24taXRlbXNcIiwgXCJmbGV4LXN0YXJ0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiLW1zLWZsZXgtcGFja1wiLCBcImp1c3RpZnlcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJqdXN0aWZ5LWNvbnRlbnRcIiwgXCJzcGFjZS1iZXR3ZWVuXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZ1wiLCBcIjAuN3JlbSAxcmVtXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyLWJvdHRvbVwiLCBcIjFweCBzb2xpZCAjZGVlMmU2XCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuZGlhbG9nYm94LWNsb3NlLWJ1dHRvblwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZsb2F0XCIsIFwicmlnaHRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmb250LXNpemVcIiwgXCIxLjVyZW1cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmb250LXdlaWdodFwiLCBcIjcwMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImxpbmUtaGVpZ2h0XCIsIFwiMVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbG9yXCIsIFwiIzAwMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRleHQtc2hhZG93XCIsIFwiMCAxcHggMCAjZmZmXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCBcIi41XCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuZGlhbG9nYm94LWNsb3NlLWJ1dHRvbjpob3ZlclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbG9yXCIsIFwiIzAwMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRleHQtZGVjb3JhdGlvblwiLCBcIm5vbmVcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5kaWFsb2dib3gtY2xvc2UtYnV0dG9uOm5vdCg6ZGlzYWJsZWQpOm5vdCguZGlzYWJsZWQpOmhvdmVyLCAuZGlhbG9nYm94LWNsb3NlLWJ1dHRvbjpub3QoOmRpc2FibGVkKTpub3QoLmRpc2FibGVkKTpmb2N1c1wiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIuNzVcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcImJ1dHRvbi5kaWFsb2dib3gtY2xvc2UtYnV0dG9uXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZ1wiLCBcIjBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwidHJhbnNwYXJlbnRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXJcIiwgXCIwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiLXdlYmtpdC1hcHBlYXJhbmNlXCIsIFwibm9uZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIi1tb3otYXBwZWFyYW5jZVwiLCBcIm5vbmVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJhcHBlYXJhbmNlXCIsIFwibm9uZVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDb21wb25lbnRCdWlsZGVyfSBjb21wb25lbnRCdWlsZGVyIFxuICAgICAqIEByZXR1cm5zIHtDb21wb25lbnR9XG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkQ29tcG9uZW50KGNvbXBvbmVudEJ1aWxkZXIpIHtcbiAgICAgICByZXR1cm4gY29tcG9uZW50QnVpbGRlclxuICAgICAgICAgICAgLnJvb3QoXCJkaXZcIiwgXCJpZD1kaWFsb2dCb3hcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic3R5bGU9ei1pbmRleDotMVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwiZGl2XCIsIFwiaWQ9YmFja1NoYWRlQ29udGFpbmVyXCIpXG4gICAgICAgICAgICAgICAgLm5vZGUoXCJkaXZcIiwgXCJpZD1kaWFsb2dCb3hPdmVybGF5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGFzcz1kaWFsb2dib3gtb3ZlcmxheSBkaWFsb2dib3gtb3ZlcmxheS1kaXNwbGF5LWJsb2NrIGRpYWxvZ2JveC1vdmVybGF5LWZhZGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRhYmluZGV4PS0xXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJyb2xlPWRpYWxvZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXJpYS1sYWJlbGxlZGJ5PWRpYWxvZ0xhYmVsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhcmlhLWRpYWxvZ2JveD10cnVlXCIpXG4gICAgICAgICAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5ub2RlKFwiZGl2XCIsIFwiY2xhc3M9ZGlhbG9nYm94LWZyYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInN0eWxlPXotaW5kZXg6MlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJyb2xlPWRvY3VtZW50XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubm9kZShcImRpdlwiLCBcImNsYXNzPWRpYWxvZ2JveC1jb250ZW50XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm5vZGUoXCJkaXZcIiwgXCJjbGFzcz1kaWFsb2dib3gtaGVhZGVyXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5ub2RlKFwiaDVcIiwgXCJpZD10aXRsZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzPWRpYWxvZ2JveC10aXRsZVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50ZXh0KFwiTWVzc2FnZVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5ub2RlKFwiYnV0dG9uXCIsIFwiaWQ9Y2xvc2VCdXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGU9YnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGFzcz1kaWFsb2dib3gtY2xvc2UtYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkYXRhLWRpc21pc3M9ZGlhbG9nYm94XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhcmlhLWxhYmVsPUNsb3NlXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubm9kZShcImlcIiwgXCJjbGFzcz1mYSBmYS13aW5kb3ctY2xvc2VcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhcmlhLWhpZGRlbj10cnVlXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubm9kZShcImRpdlwiLCBcImlkPWRpYWxvZ0JveENvbnRlbnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNsYXNzPWRpYWxvZ2JveC1ib2R5XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuYnVpbGQoKTtcbiAgICB9XG5cbiAgICBwb3N0Q29uZmlnKCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoRGlhbG9nQm94KTtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuc2V0KFwiYmFja1NoYWRlQ29udGFpbmVyXCIsIHRoaXMuYmFja1NoYWRlLmNvbXBvbmVudCk7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImNsb3NlQnV0dG9uXCIpLmxpc3RlblRvKFwiY2xpY2tcIiwgdGhpcy5jbG9zZSwgdGhpcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRleHQgXG4gICAgICovXG4gICAgc2V0VGl0bGUodGV4dCl7IHRoaXMuY29tcG9uZW50LnNldENoaWxkKFwidGl0bGVcIiwgdGV4dCk7IH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Q29tcG9uZW50fSBjb21wb25lbnQgXG4gICAgICovXG4gICAgc2V0Rm9vdGVyKGNvbXBvbmVudCl7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImRpYWxvZ0JveEZvb3RlclwiKS5zZXRTdHlsZShcImRpc3BsYXlcIiwgXCJibG9ja1wiKTtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuc2V0Q2hpbGQoXCJkaWFsb2dCb3hGb290ZXJcIiwgY29tcG9uZW50KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudH0gY29tcG9uZW50IFxuICAgICAqL1xuICAgIHNldENvbnRlbnQoY29tcG9uZW50KXsgdGhpcy5jb21wb25lbnQuc2V0Q2hpbGQoXCJkaWFsb2dCb3hDb250ZW50XCIsY29tcG9uZW50KTsgfVxuXG5cdHNldChrZXksdmFsKSB7IHRoaXMuY29tcG9uZW50LnNldChrZXksdmFsKTsgfVxuICAgIFxuICAgIGFzeW5jIGNsb3NlKCkge1xuICAgICAgICBjb25zdCBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xuICAgICAgICBhd2FpdCB0aGlzLmhpZGUoKTtcbiAgICAgICAgaWYgKG9wdGlvbnMuY29udGFpbnMoRGlhbG9nQm94Lk9QVElPTl9CQUNLX09OX0NMT1NFKSkge1xuICAgICAgICAgICAgTmF2aWdhdGlvbi5pbnN0YW5jZSgpLmJhY2soKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Q29udGFpbmVyRXZlbnR9IGV2ZW50IFxuICAgICAqIEByZXR1cm5zIFxuICAgICAqL1xuICAgIGhpZGUoZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuZGVzdHJveUZvY3VzRXNjYXBlTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZGVzdHJveUZvY3VzRXNjYXBlTGlzdGVuZXIoKTtcbiAgICAgICAgICAgIHRoaXMuZGVzdHJveUZvY3VzRXNjYXBlTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG4gICAgICAgIGlmICh0aGlzLmhpZGRlbikge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5nZXREaWFsb2dCb3hPdmVybGF5KCkuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLCBcImRpYWxvZ2JveC1vdmVybGF5IGRpYWxvZ2JveC1vdmVybGF5LWZhZGVcIik7XG4gICAgICAgIGNvbnN0IGhpZGVCYWNrU2hhZGVQcm9taXNlID0gdGhpcy5iYWNrU2hhZGUuaGlkZUFmdGVyKDMwMCk7XG4gICAgICAgIGNvbnN0IGhpZGVQcm9taXNlID0gVGltZVByb21pc2UuYXNQcm9taXNlKDIwMCwgKCkgPT4geyBcbiAgICAgICAgICAgICAgICB0aGlzLmdldERpYWxvZ0JveE92ZXJsYXkoKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImNsYXNzXCIsIFwiZGlhbG9nYm94LW92ZXJsYXkgZGlhbG9nYm94LW92ZXJsYXktZmFkZSBkaWFsb2dib3gtb3ZlcmxheS1kaXNwbGF5LW5vbmVcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IGRpc2FibGVTdHlsZVByb21pc2UgPSBUaW1lUHJvbWlzZS5hc1Byb21pc2UoMjAxLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXREaWFsb2dCb3goKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICBDYW52YXNTdHlsZXMuZGlzYWJsZVN0eWxlKERpYWxvZ0JveC5uYW1lLCB0aGlzLmNvbXBvbmVudC5jb21wb25lbnRJbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IHRoaXMuZGVmYXVsdE9wdGlvbnM7XG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbaGlkZVByb21pc2UsIGRpc2FibGVTdHlsZVByb21pc2UsIGhpZGVCYWNrU2hhZGVQcm9taXNlXSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDb250YWluZXJFdmVudH0gZXZlbnQgXG4gICAgICogQHBhcmFtIHtBcnJheTxzdHJpbmc+fSB0ZW1wb3JhcnlPcHRpb25zXG4gICAgICogQHJldHVybnMgXG4gICAgICovXG4gICAgc2hvdyhldmVudCwgdGVtcG9yYXJ5T3B0aW9ucykge1xuICAgICAgICBpZiAodGhpcy5kZXN0cm95Rm9jdXNFc2NhcGVMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5kZXN0cm95Rm9jdXNFc2NhcGVMaXN0ZW5lcigpO1xuICAgICAgICAgICAgdGhpcy5kZXN0cm95Rm9jdXNFc2NhcGVMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kZXN0cm95Rm9jdXNFc2NhcGVMaXN0ZW5lciA9IENhbnZhc1Jvb3QubGlzdGVuVG9Gb2N1c0VzY2FwZShcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImRpYWxvZ0JveE92ZXJsYXlcIiksIHRoaXMuY2xvc2UsIHRoaXMsIFxuICAgICAgICApO1xuXG4gICAgICAgIGlmICh0ZW1wb3JhcnlPcHRpb25zKSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMgPSBuZXcgTGlzdCh0ZW1wb3JhcnlPcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgICBDYW52YXNSb290LnN3YWxsb3dGb2N1c0VzY2FwZSg1MDApO1xuICAgICAgICBpZiAoIXRoaXMuaGlkZGVuKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge3Jlc29sdmUoKTt9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmhpZGRlbiA9IGZhbHNlO1xuICAgICAgICBDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUoRGlhbG9nQm94Lm5hbWUsIHRoaXMuY29tcG9uZW50LmNvbXBvbmVudEluZGV4KTtcbiAgICAgICAgdGhpcy5iYWNrU2hhZGUuc2hvdygpO1xuICAgICAgICB0aGlzLmdldERpYWxvZ0JveE92ZXJsYXkoKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImNsYXNzXCIsIFwiZGlhbG9nYm94LW92ZXJsYXkgZGlhbG9nYm94LW92ZXJsYXktZmFkZSBkaWFsb2dib3gtb3ZlcmxheS1kaXNwbGF5LWJsb2NrXCIpO1xuICAgICAgICBDYW52YXNSb290Lm1vdXNlRG93bkVsZW1lbnQgPSB0aGlzLmNvbXBvbmVudC5nZXQoXCJkaWFsb2dCb3hDb250ZW50XCIpLmNvbnRhaW5lckVsZW1lbnQ7XG4gICAgICAgIHJldHVybiBUaW1lUHJvbWlzZS5hc1Byb21pc2UoMTAwLCAgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0RGlhbG9nQm94T3ZlcmxheSgpLnNldEF0dHJpYnV0ZVZhbHVlKFwiY2xhc3NcIiwgXCJkaWFsb2dib3gtb3ZlcmxheSBkaWFsb2dib3gtb3ZlcmxheS1mYWRlIGRpYWxvZ2JveC1vdmVybGF5LWRpc3BsYXktYmxvY2sgZGlhbG9nYm94LW92ZXJsYXktc2hvd1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBnZXREaWFsb2dCb3hPdmVybGF5KCkgeyByZXR1cm4gdGhpcy5jb21wb25lbnQuZ2V0KFwiZGlhbG9nQm94T3ZlcmxheVwiKTsgfVxuXG4gICAgZ2V0RGlhbG9nQm94KCkgeyByZXR1cm4gdGhpcy5jb21wb25lbnQuZ2V0KFwiZGlhbG9nQm94XCIpOyB9XG5cbiAgICBzY3JvbGxMb2NrKCkge1xuICAgICAgICBDb250YWluZXJFbGVtZW50VXRpbHMuc2Nyb2xsTG9ja1RvKHRoaXMuY29tcG9uZW50LmdldChcImRpYWxvZ0JveENvbnRlbnRcIikuY29udGFpbmVyRWxlbWVudCwgMCwgMCwgMTAwMCk7XG4gICAgfVxufVxuXG5UeXBlQ29uZmlnUGFjay5pbnN0YW5jZSgpLmFkZFR5cGVDb25maWcoXCJudXR0aW4yYy11aVwiLCBQcm90b3R5cGVDb25maWcudW5uYW1lZChEaWFsb2dCb3gpKTsiLCJpbXBvcnQge1xuICAgIENhbnZhc1N0eWxlcyxcbiAgICBDb21wb25lbnQsXG4gICAgQ2FudmFzUm9vdCxcbiAgICBIVE1MLFxuICAgIFN0eWxlU2VsZWN0b3JBY2Nlc3NvcixcbiAgICBTdHlsZUFjY2Vzc29yLFxuICAgIFN0eWxlc2hlZXRCdWlsZGVyLFxuICAgIFN0eWxlc2hlZXQsXG4gICAgQ29tcG9uZW50QnVpbGRlcixcbiAgICBJbmxpbmVDb21wb25lbnRGYWN0b3J5XG59IGZyb20gXCJudXR0aW4yYy1jb3JlX3YxXCI7XG5pbXBvcnQgeyBJbmplY3Rpb25Qb2ludCwgUHJvdG90eXBlQ29uZmlnLCBUeXBlQ29uZmlnUGFjayB9IGZyb20gXCJtaW5kaV92MVwiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5pbXBvcnQgeyBDb250YWluZXJFdmVudCB9IGZyb20gXCJjb250YWluZXJicmlkZ2VfdjFcIjtcbmltcG9ydCB7IENvbG9yUGFsZXR0ZSB9IGZyb20gXCIuLi9jb2xvclBhbGV0dGVcIjtcbmltcG9ydCB7IEVsZW1lbnRUaGVtZUFwcGxpY2F0b3IgfSBmcm9tIFwiLi4vY29tbW9uL2VsZW1lbnRUaGVtZUFwcGxpY2F0b3JcIjtcblxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIkRyb3BEb3duUGFuZWxcIik7XG5cbmV4cG9ydCBjbGFzcyBEcm9wRG93blBhbmVsIHtcblxuICAgIHN0YXRpYyBUWVBFX1BSSU1BUlkgPSBcImRyb3AtZG93bi1wYW5lbC1idXR0b24tcHJpbWFyeVwiO1xuICAgIHN0YXRpYyBUWVBFX1NFQ09OREFSWSA9IFwiZHJvcC1kb3duLXBhbmVsLWJ1dHRvbi1zZWNvbmRhcnlcIjtcbiAgICBzdGF0aWMgVFlQRV9TVUNDRVNTID0gXCJkcm9wLWRvd24tcGFuZWwtYnV0dG9uLXN1Y2Nlc3NcIjtcbiAgICBzdGF0aWMgVFlQRV9JTkZPID0gXCJkcm9wLWRvd24tcGFuZWwtYnV0dG9uLWluZm9cIjtcbiAgICBzdGF0aWMgVFlQRV9XQVJOSU5HID0gXCJkcm9wLWRvd24tcGFuZWwtYnV0dG9uLXdhcm5pbmdcIjtcbiAgICBzdGF0aWMgVFlQRV9EQU5HRVIgPSBcImRyb3AtZG93bi1wYW5lbC1idXR0b24tZGFuZ2VyXCI7XG4gICAgc3RhdGljIFRZUEVfTElHSFQgPSBcImRyb3AtZG93bi1wYW5lbC1idXR0b24tbGlnaHRcIjtcbiAgICBzdGF0aWMgVFlQRV9EQVJLID0gXCJkcm9wLWRvd24tcGFuZWwtYnV0dG9uLWRhcmtcIjtcblxuICAgIHN0YXRpYyBTSVpFX01FRElVTSA9IFwiZHJvcC1kb3duLXBhbmVsLWJ1dHRvbi1tZWRpdW1cIjtcbiAgICBzdGF0aWMgU0laRV9MQVJHRSA9IFwiZHJvcC1kb3duLXBhbmVsLWJ1dHRvbi1sYXJnZVwiO1xuXG4gICAgc3RhdGljIE9SSUVOVEFUSU9OX0xFRlQgPSBcImRyb3AtZG93bi1wYW5lbC1sZWZ0XCI7XG4gICAgc3RhdGljIE9SSUVOVEFUSU9OX1JJR0hUID0gXCJkcm9wLWRvd24tcGFuZWwtcmlnaHRcIjtcblxuICAgIHN0YXRpYyBDT05URU5UX1ZJU0lCTEUgPSBcImRyb3AtZG93bi1wYW5lbC1jb250ZW50LXZpc2libGVcIjtcbiAgICBzdGF0aWMgQ09OVEVOVF9ISURERU4gPSBcImRyb3AtZG93bi1wYW5lbC1jb250ZW50LWhpZGRlblwiO1xuICAgIHN0YXRpYyBDT05URU5UX0VYUEFORCA9IFwiZHJvcC1kb3duLXBhbmVsLWNvbnRlbnQtZXhwYW5kXCI7XG4gICAgc3RhdGljIENPTlRFTlRfQ09MTEFQU0UgPSBcImRyb3AtZG93bi1wYW5lbC1jb250ZW50LWNvbGxhcHNlXCI7XG4gICAgc3RhdGljIENPTlRFTlQgPSBcImRyb3AtZG93bi1wYW5lbC1jb250ZW50XCI7XG4gICAgc3RhdGljIEJVVFRPTiA9IFwiZHJvcC1kb3duLXBhbmVsLWJ1dHRvblwiO1xuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGljb25DbGFzc1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG9yaWVudGF0aW9uXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoaWNvbkNsYXNzLCB0eXBlID0gRHJvcERvd25QYW5lbC5UWVBFX0RBUkssIHNpemUgPSBEcm9wRG93blBhbmVsLlNJWkVfTUVESVVNLCBvcmllbnRhdGlvbiA9IERyb3BEb3duUGFuZWwuT1JJRU5UQVRJT05fTEVGVCkge1xuXG4gICAgICAgIC8qKiBAdHlwZSB7SW5saW5lQ29tcG9uZW50RmFjdG9yeX0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoSW5saW5lQ29tcG9uZW50RmFjdG9yeSk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnR9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gbnVsbDtcblxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5pY29uQ2xhc3MgPSBpY29uQ2xhc3M7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMuc2l6ZSA9IHNpemU7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMub3JpZW50YXRpb24gPSBvcmllbnRhdGlvbjtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3R5bGVzaGVldEJ1aWxkZXJ9IHN0eWxlc2hlZXRCdWlsZGVyIFxuICAgICAqIEByZXR1cm5zIHtTdHlsZXNoZWV0fVxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZFN0eWxlc2hlZXQoc3R5bGVzaGVldEJ1aWxkZXIpIHtcbiAgICAgICAgc3R5bGVzaGVldEJ1aWxkZXJcbiAgICAgICAgICAgIC5tZWRpYShcIihwcmVmZXJzLXJlZHVjZWQtbW90aW9uOiByZWR1Y2UpXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRyb3AtZG93bi1wYW5lbC1idXR0b25cIilcbiAgICAgICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zaXRpb25cIiwgXCJub25lXCIpXG4gICAgICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5kcm9wLWRvd24tcGFuZWwtb3V0bGluZVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgXCJpbmxpbmUtYmxvY2tcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ2ZXJ0aWNhbC1hbGlnblwiLCBcIm1pZGRsZVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRyb3AtZG93bi1wYW5lbC1idXR0b25cIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtaW4td2lkdGhcIiwgXCIzNXB0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLCBcImlubGluZS1ibG9ja1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtd2VpZ2h0XCIsIFwiNDAwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCIjMjEyNTI5XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidGV4dC1hbGlnblwiLCBcImNlbnRlclwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInZlcnRpY2FsLWFsaWduXCIsIFwibWlkZGxlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiLXdlYmtpdC11c2VyLXNlbGVjdFwiLCBcIm5vbmVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCItbW96LXVzZXItc2VsZWN0XCIsIFwibm9uZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIi1tcy11c2VyLXNlbGVjdFwiLCBcIm5vbmVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ1c2VyLXNlbGVjdFwiLCBcIm5vbmVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwidHJhbnNwYXJlbnRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXJcIiwgXCIxcHggc29saWQgdHJhbnNwYXJlbnRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwYWRkaW5nXCIsIFwiMC4zNzVyZW0gMC43NXJlbVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImxpbmUtaGVpZ2h0XCIsIFwiMS41XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyLXJhZGl1c1wiLCBcIjAuMjVyZW1cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2l0aW9uXCIsIFwiY29sb3IgMC4xNXMgZWFzZS1pbi1vdXQsIGJhY2tncm91bmQtY29sb3IgMC4xNXMgZWFzZS1pbi1vdXQsIGJvcmRlci1jb2xvciAwLjE1cyBlYXNlLWluLW91dCwgYm94LXNoYWRvdyAwLjE1cyBlYXNlLWluLW91dFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRyb3AtZG93bi1wYW5lbC1idXR0b24tbWVkaXVtXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZm9udC1zaXplXCIsIFwiMXJlbVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRyb3AtZG93bi1wYW5lbC1idXR0b24tbGFyZ2VcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmb250LXNpemVcIiwgXCIxLjVyZW1cIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5kcm9wLWRvd24tcGFuZWwtY29udGVudFwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1pbi13aWR0aFwiLCBcIjE1MHB0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWF4LXdpZHRoXCIsIFwiNDUwcHRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwYWRkaW5nXCIsIFwiOHB0IDE0cHRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjb2xvclwiLCBcIiMzMzMzMzNcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiI2ZmZmZmZlwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1yYWRpdXNcIiwgXCI1cHRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLCBcImFic29sdXRlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiei1pbmRleFwiLCBcIjk5OTk5OTk3XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm94LXNpemluZ1wiLCBcImJvcmRlci1ib3hcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3gtc2hhZG93XCIsIFwiMCAxcHggOHB4IHJnYmEoMCwwLDAsMC41KVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm92ZXJmbG93XCIsIFwiaGlkZGVuXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuZHJvcC1kb3duLXBhbmVsLWNvbnRlbnQuZHJvcC1kb3duLXBhbmVsLWxlZnRcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoMCUsIDEwcHQpIHRyYW5zbGF0ZSgwJSwwcHgpXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuZHJvcC1kb3duLXBhbmVsLWNvbnRlbnQuZHJvcC1kb3duLXBhbmVsLXJpZ2h0XCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKC0xMDAlLCAxMHB0KSB0cmFuc2xhdGUoMzVwdCwwcHgpXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuZHJvcC1kb3duLXBhbmVsLWNvbnRlbnQtdmlzaWJsZVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIixcImJsb2NrXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRyb3AtZG93bi1wYW5lbC1jb250ZW50LWhpZGRlblwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIixcIm5vbmVcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5kcm9wLWRvd24tcGFuZWwtYXJyb3dcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwYWRkaW5nXCIsIFwiMTBweCAyMHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCIjMzMzMzMzXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZm9udC13ZWlnaHRcIiwgXCJub3JtYWxcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLCBcImFic29sdXRlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiei1pbmRleFwiLCBcIjk5OTk5OTk4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm94LXNpemluZ1wiLCBcImJvcmRlci1ib3hcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIFwibm9uZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZSgwJSwgNTAlKSB0cmFuc2xhdGUoMCUsLTNwdClcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5kcm9wLWRvd24tcGFuZWwtYXJyb3cgaVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBvc2l0aW9uXCIsIFwiYWJzb2x1dGVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tbGVmdFwiLCBcIi0xNXB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwid2lkdGhcIiwgXCI0MHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiaGVpZ2h0XCIsIFwiMTVweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm92ZXJmbG93XCIsIFwiaGlkZGVuXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidG9wXCIsIFwiLTIwJVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImxlZnRcIiwgXCIzMCVcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5kcm9wLWRvd24tcGFuZWwtYXJyb3cgaTo6YWZ0ZXJcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjb250ZW50XCIsIFwiJydcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLCBcImFic29sdXRlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwid2lkdGhcIiwgXCIxOHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiaGVpZ2h0XCIsIFwiMTVweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIiwgXCIjZmZmZmZmXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm94LXNoYWRvd1wiLCBcIjAgMXB4IDhweCByZ2JhKDAsMCwwLDAuNSlcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJsZWZ0XCIsIFwiMzAlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKDUwJSw1MCUpIHJvdGF0ZSg0NWRlZylcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5kcm9wLWRvd24tcGFuZWwtYnV0dG9uOmhvdmVyXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCIjMjEyNTI5XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidGV4dC1kZWNvcmF0aW9uXCIsIFwibm9uZVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRyb3AtZG93bi1wYW5lbC1idXR0b246Zm9jdXMsXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgXCIuZHJvcC1kb3duLXBhbmVsLWJ1dHRvbi5mb2N1c1wiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm91dGxpbmVcIiwgXCIwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm94LXNoYWRvd1wiLCBcIjAgMCAwIDAuMnJlbSByZ2JhKDAsIDEyMywgMjU1LCAwLjI1KVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRyb3AtZG93bi1wYW5lbC1idXR0b24uZGlzYWJsZWQsXCIrIFxuICAgICAgICAgICAgICAgICAgICAgICAgXCIuZHJvcC1kb3duLXBhbmVsLWJ1dHRvbjpkaXNhYmxlZFwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwLjY1XCIpXG4gICAgICAgICAgICAuY2xvc2UoKTtcblxuICAgICAgICBFbGVtZW50VGhlbWVBcHBsaWNhdG9yLmFwcGx5KHN0eWxlc2hlZXRCdWlsZGVyLCBcImRyb3AtZG93bi1wYW5lbC1idXR0b25cIiwgXCJwcmltYXJ5XCIsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuUFJJTUFSWV9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuUFJJTUFSWV9IT1ZFUl9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuUFJJTUFSWV9ESVNBQkxFRF9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuUFJJTUFSWV9BQ1RJVkVfQ09MT1JTLFxuICAgICAgICAgICAgXCIwIDAgMCAwLjJyZW0gcmdiYSgxMzAsIDEzOCwgMTQ1LCAwLjUpXCIsIC8vIGJveFNoYWRvd0ZvY3VzXG4gICAgICAgICAgICBcIjAgMCAwIDAuMnJlbSByZ2JhKDEzMCwgMTM4LCAxNDUsIDAuNSlcIik7IC8vIGJveFNoYWRvd0FjdGl2ZUZvY3VzXG5cblxuICAgICAgICBFbGVtZW50VGhlbWVBcHBsaWNhdG9yLmFwcGx5KHN0eWxlc2hlZXRCdWlsZGVyLCBcImRyb3AtZG93bi1wYW5lbC1idXR0b25cIiwgXCJzZWNvbmRhcnlcIixcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5TRUNPTkRBUllfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLlNFQ09OREFSWV9IT1ZFUl9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuU0VDT05EQVJZX0RJU0FCTEVEX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5TRUNPTkRBUllfQUNUSVZFX0NPTE9SUyxcbiAgICAgICAgICAgIFwiMCAwIDAgMC4ycmVtIHJnYmEoMTMwLCAxMzgsIDE0NSwgMC41KVwiLCAvLyBib3hTaGFkb3dGb2N1c1xuICAgICAgICAgICAgXCIwIDAgMCAwLjJyZW0gcmdiYSgxMzAsIDEzOCwgMTQ1LCAwLjUpXCIpOyAvLyBib3hTaGFkb3dBY3RpdmVGb2N1c1xuICAgICAgICBcbiAgICAgICAgRWxlbWVudFRoZW1lQXBwbGljYXRvci5hcHBseShzdHlsZXNoZWV0QnVpbGRlciwgXCJkcm9wLWRvd24tcGFuZWwtYnV0dG9uXCIsIFwic3VjY2Vzc1wiLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLlNVQ0NFU1NfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLlNVQ0NFU1NfSE9WRVJfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLlNVQ0NFU1NfRElTQUJMRURfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLlNVQ0NFU1NfQUNUSVZFX0NPTE9SUyxcbiAgICAgICAgICAgIFwiMCAwIDAgMC4ycmVtIHJnYmEoNzIsIDE4MCwgOTcsIDAuNSlcIiwgLy8gYm94U2hhZG93Rm9jdXNcbiAgICAgICAgICAgIFwiMCAwIDAgMC4ycmVtIHJnYmEoNzIsIDE4MCwgOTcsIDAuNSlcIik7IC8vIGJveFNoYWRvd0FjdGl2ZUZvY3VzXG5cbiAgICAgICAgRWxlbWVudFRoZW1lQXBwbGljYXRvci5hcHBseShzdHlsZXNoZWV0QnVpbGRlciwgXCJkcm9wLWRvd24tcGFuZWwtYnV0dG9uXCIsIFwiaW5mb1wiLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLklORk9fQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLklORk9fSE9WRVJfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLklORk9fRElTQUJMRURfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLklORk9fQUNUSVZFX0NPTE9SUyxcbiAgICAgICAgICAgIFwiMCAwIDAgMC4ycmVtIHJnYmEoNTgsIDE3NiwgMTk1LCAwLjUpXCIsIC8vIGJveFNoYWRvd0ZvY3VzXG4gICAgICAgICAgICBcIjAgMCAwIDAuMnJlbSByZ2JhKDU4LCAxNzYsIDE5NSwgMC41KVwiKTsgLy8gYm94U2hhZG93QWN0aXZlRm9jdXNcblxuICAgICAgICBFbGVtZW50VGhlbWVBcHBsaWNhdG9yLmFwcGx5KHN0eWxlc2hlZXRCdWlsZGVyLCBcImRyb3AtZG93bi1wYW5lbC1idXR0b25cIiwgXCJ3YXJuaW5nXCIsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuV0FSTklOR19DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuV0FSTklOR19IT1ZFUl9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuV0FSTklOR19ESVNBQkxFRF9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuV0FSTklOR19BQ1RJVkVfQ09MT1JTLFxuICAgICAgICAgICAgXCIwIDAgMCAwLjJyZW0gcmdiYSgyMjIsIDE3MCwgMTIsIDAuNSlcIiwgLy8gYm94U2hhZG93Rm9jdXNcbiAgICAgICAgICAgIFwiMCAwIDAgMC4ycmVtIHJnYmEoMjIyLCAxNzAsIDEyLCAwLjUpXCIpOyAvLyBib3hTaGFkb3dBY3RpdmVGb2N1c1xuXG4gICAgICAgIEVsZW1lbnRUaGVtZUFwcGxpY2F0b3IuYXBwbHkoc3R5bGVzaGVldEJ1aWxkZXIsIFwiZHJvcC1kb3duLXBhbmVsLWJ1dHRvblwiLCBcImRhbmdlclwiLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLkRBTkdFUl9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuREFOR0VSX0hPVkVSX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5EQU5HRVJfRElTQUJMRURfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLkRBTkdFUl9BQ1RJVkVfQ09MT1JTLFxuICAgICAgICAgICAgXCIwIDAgMCAwLjJyZW0gcmdiYSgyMjUsIDgzLCA5NywgMC41KVwiLCAvLyBib3hTaGFkb3dGb2N1c1xuICAgICAgICAgICAgXCIwIDAgMCAwLjJyZW0gcmdiYSgyMjUsIDgzLCA5NywgMC41KVwiKTsgLy8gYm94U2hhZG93QWN0aXZlRm9jdXNcblxuICAgICAgICBFbGVtZW50VGhlbWVBcHBsaWNhdG9yLmFwcGx5KHN0eWxlc2hlZXRCdWlsZGVyLCBcImRyb3AtZG93bi1wYW5lbC1idXR0b25cIiwgXCJsaWdodFwiLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLkxJR0hUX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5MSUdIVF9IT1ZFUl9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuTElHSFRfRElTQUJMRURfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLkxJR0hUX0FDVElWRV9DT0xPUlMsXG4gICAgICAgICAgICBcIjAgMCAwIDAuMnJlbSByZ2JhKDIxNiwgMjE3LCAyMTksIDAuNSlcIiwgLy8gYm94U2hhZG93Rm9jdXNcbiAgICAgICAgICAgIFwiMCAwIDAgMC4ycmVtIHJnYmEoMjE2LCAyMTcsIDIxOSwgMC41KVwiKTsgLy8gYm94U2hhZG93QWN0aXZlRm9jdXNcblxuICAgICAgICBFbGVtZW50VGhlbWVBcHBsaWNhdG9yLmFwcGx5KHN0eWxlc2hlZXRCdWlsZGVyLCBcImRyb3AtZG93bi1wYW5lbC1idXR0b25cIiwgXCJkYXJrXCIsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuREFSS19DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuREFSS19IT1ZFUl9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuREFSS19ESVNBQkxFRF9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuREFSS19BQ1RJVkVfQ09MT1JTLFxuICAgICAgICAgICAgXCIwIDAgMCAwLjJyZW0gcmdiYSg4MiwgODgsIDkzLCAwLjUpXCIsIC8vIGJveFNoYWRvd0ZvY3VzXG4gICAgICAgICAgICBcIjAgMCAwIDAuMnJlbSByZ2JhKDgyLCA4OCwgOTMsIDAuNSlcIik7IC8vIGJveFNoYWRvd0FjdGl2ZUZvY3VzXG5cbiAgICAgICAgcmV0dXJuIHN0eWxlc2hlZXRCdWlsZGVyLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDb21wb25lbnRCdWlsZGVyfSBjb21wb25lbnRCdWlsZGVyIFxuICAgICAqIEByZXR1cm5zIHtDb21wb25lbnR9XG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkQ29tcG9uZW50KGNvbXBvbmVudEJ1aWxkZXIpIHtcbiAgICAgICByZXR1cm4gY29tcG9uZW50QnVpbGRlclxuICAgICAgICAgICAgLnJvb3QoXCJkaXZcIiwgXCJpZD1kcm9wRG93blBhbmVsUm9vdFwiLCBcImNsYXNzPWRyb3AtZG93bi1wYW5lbC1vdXRsaW5lXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLm5vZGUoXCJidXR0b25cIiwgXCJpZD1idXR0b25cIiwgXCJjbGFzcz1kcm9wLWRvd24tcGFuZWwtYnV0dG9uXCIpXG4gICAgICAgICAgICAgICAgLm5vZGUoXCJkaXZcIiwgXCJpZD1hcnJvd1wiLCBcImNsYXNzPWRyb3AtZG93bi1wYW5lbC1hcnJvd1wiKVxuICAgICAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAgICAgLm5vZGUoXCJpXCIpXG4gICAgICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgICAgICAubm9kZShcImRpdlwiLCBcImlkPWNvbnRlbnRcIiwgXCJjbGFzcz1kcm9wLWRvd24tcGFuZWwtY29udGVudFwiLCBcInRhYmluZGV4PTBcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5idWlsZCgpO1xuICAgIH1cblxuICAgIHBvc3RDb25maWcoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZShEcm9wRG93blBhbmVsKTtcbiAgICAgICAgQ2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKERyb3BEb3duUGFuZWwubmFtZSk7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJ1dHRvblwiKS5zZXRDaGlsZChIVE1MLmkoXCJcIiwgdGhpcy5pY29uQ2xhc3MpKTtcblxuICAgICAgICBTdHlsZVNlbGVjdG9yQWNjZXNzb3IuZnJvbSh0aGlzLmNvbXBvbmVudC5nZXQoXCJidXR0b25cIikpXG4gICAgICAgICAgICAuZW5hYmxlKERyb3BEb3duUGFuZWwuQlVUVE9OKVxuICAgICAgICAgICAgLmVuYWJsZSh0aGlzLnR5cGUpO1xuXG4gICAgICAgIFN0eWxlU2VsZWN0b3JBY2Nlc3Nvci5mcm9tKHRoaXMuY29tcG9uZW50LmdldChcImNvbnRlbnRcIikpXG4gICAgICAgICAgICAuZW5hYmxlKERyb3BEb3duUGFuZWwuQ09OVEVOVClcbiAgICAgICAgICAgIC5kaXNhYmxlKERyb3BEb3duUGFuZWwuQ09OVEVOVF9WSVNJQkxFKVxuICAgICAgICAgICAgLmVuYWJsZShEcm9wRG93blBhbmVsLkNPTlRFTlRfSElEREVOKVxuICAgICAgICAgICAgLmVuYWJsZSh0aGlzLnNpemUpXG4gICAgICAgICAgICAuZW5hYmxlKHRoaXMub3JpZW50YXRpb24pO1xuXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJ1dHRvblwiKS5saXN0ZW5UbyhcImNsaWNrXCIsIHRoaXMuY2xpY2tlZCwgdGhpcyk7XG4gICAgICAgIENhbnZhc1Jvb3QubGlzdGVuVG9Gb2N1c0VzY2FwZSh0aGlzLmNvbXBvbmVudC5nZXQoXCJkcm9wRG93blBhbmVsUm9vdFwiKSwgdGhpcy5oaWRlLCB0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudH0gZHJvcERvd25QYW5lbENvbnRlbnQgXG4gICAgICovXG4gICAgc2V0UGFuZWxDb250ZW50KGRyb3BEb3duUGFuZWxDb250ZW50KSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImNvbnRlbnRcIikuc2V0Q2hpbGQoZHJvcERvd25QYW5lbENvbnRlbnQuY29tcG9uZW50KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDb250YWluZXJFdmVudH0gZXZlbnQgXG4gICAgICovXG4gICAgY2xpY2tlZChldmVudCkge1xuICAgICAgICB0aGlzLnRvZ2dsZUNvbnRlbnQoKTtcbiAgICB9XG5cbiAgICB0b2dnbGVDb250ZW50KCkge1xuICAgICAgICBpZiAoIVN0eWxlQWNjZXNzb3IuZnJvbSh0aGlzLmNvbXBvbmVudC5nZXQoXCJhcnJvd1wiKSkuaXMoXCJkaXNwbGF5XCIsXCJibG9ja1wiKSkge1xuICAgICAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNob3coKSB7XG4gICAgICAgIFN0eWxlU2VsZWN0b3JBY2Nlc3Nvci5mcm9tKHRoaXMuY29tcG9uZW50LmdldChcImNvbnRlbnRcIikpXG4gICAgICAgICAgICAuZGlzYWJsZShEcm9wRG93blBhbmVsLkNPTlRFTlRfSElEREVOKVxuICAgICAgICAgICAgLmVuYWJsZShEcm9wRG93blBhbmVsLkNPTlRFTlRfVklTSUJMRSk7XG4gICAgICAgIFN0eWxlQWNjZXNzb3IuZnJvbSh0aGlzLmNvbXBvbmVudC5nZXQoXCJhcnJvd1wiKSlcbiAgICAgICAgICAgIC5zZXQoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIik7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImNvbnRlbnRcIikuY29udGFpbmVyRWxlbWVudC5mb2N1cygpO1xuICAgIH1cblxuICAgIGhpZGUoKSB7XG4gICAgICAgIFN0eWxlU2VsZWN0b3JBY2Nlc3Nvci5mcm9tKHRoaXMuY29tcG9uZW50LmdldChcImNvbnRlbnRcIikpXG4gICAgICAgICAgICAuZGlzYWJsZShEcm9wRG93blBhbmVsLkNPTlRFTlRfVklTSUJMRSlcbiAgICAgICAgICAgIC5lbmFibGUoRHJvcERvd25QYW5lbC5DT05URU5UX0hJRERFTik7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImFycm93XCIpLnNldFN0eWxlKFwiZGlzcGxheVwiLCBcIm5vbmVcIik7XG4gICAgfVxuXG4gICAgZGlzYWJsZSgpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYnV0dG9uXCIpLnNldEF0dHJpYnV0ZVZhbHVlKFwiZGlzYWJsZWRcIiwgXCJ0cnVlXCIpO1xuICAgIH1cblxuICAgIGVuYWJsZSgpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYnV0dG9uXCIpLnJlbW92ZUF0dHJpYnV0ZShcImRpc2FibGVkXCIpO1xuICAgIH1cbn1cblxuVHlwZUNvbmZpZ1BhY2suaW5zdGFuY2UoKS5hZGRUeXBlQ29uZmlnKFwibnV0dGluMmMtdWlcIiwgUHJvdG90eXBlQ29uZmlnLnVubmFtZWQoRHJvcERvd25QYW5lbCkpOyIsImltcG9ydCB7IENvbXBvbmVudCxcbiAgICBDYW52YXNTdHlsZXMsXG4gICAgQ29tcG9uZW50QnVpbGRlcixcbiAgICBJbmxpbmVDb21wb25lbnRGYWN0b3J5XG59IGZyb20gXCJudXR0aW4yYy1jb3JlX3YxXCI7XG5pbXBvcnQgeyBJbmplY3Rpb25Qb2ludCwgUHJvdG90eXBlQ29uZmlnLCBUeXBlQ29uZmlnUGFjayB9IGZyb20gXCJtaW5kaV92MVwiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5cbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJGaWxsUGFuZWxcIik7XG5cbmV4cG9ydCBjbGFzcyBGaWxsUGFuZWwge1xuXG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcigpIHtcblxuICAgICAgICAvKiogQHR5cGUge0lubGluZUNvbXBvbmVudEZhY3Rvcnl9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKElubGluZUNvbXBvbmVudEZhY3RvcnkpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IG51bGw7XG5cbiAgICB9XG5cbiAgICBzZXRDb250ZW50KGNvbXBvbmVudCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5zZXRDaGlsZChcImNvbnRlbnRcIiwgY29tcG9uZW50KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudEJ1aWxkZXJ9IGNvbXBvbmVudEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMge0NvbXBvbmVudH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRDb21wb25lbnQoY29tcG9uZW50QnVpbGRlcikge1xuICAgICAgICByZXR1cm4gY29tcG9uZW50QnVpbGRlclxuICAgICAgICAgICAgLnJvb3QoXCJkaXZcIiwgXCJpZD1jb250ZW50XCIsIFwiY2xhc3M9Y250ciBjbnRyLXJvd3MgY250ci1ncm93LW9ubHkgd2lkdGgtZnVsbFwiKVxuICAgICAgICAgICAgLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgcG9zdENvbmZpZygpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKEZpbGxQYW5lbCk7XG4gICAgfVxuXG59XG5cblR5cGVDb25maWdQYWNrLmluc3RhbmNlKCkuYWRkVHlwZUNvbmZpZyhcIm51dHRpbjJjLXVpXCIsIFByb3RvdHlwZUNvbmZpZy51bm5hbWVkKEZpbGxQYW5lbCkpOyIsImltcG9ydCB7IE1ldGhvZCwgTG9nZ2VyIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5pbXBvcnQgeyBJbnB1dEVsZW1lbnREYXRhQmluZGluZywgQWJzdHJhY3RWYWxpZGF0b3IsIFRlbXBsYXRlQ29tcG9uZW50RmFjdG9yeSwgQ2FudmFzU3R5bGVzLCBDb21wb25lbnQsIEV2ZW50TWFuYWdlciwgSW5saW5lQ29tcG9uZW50RmFjdG9yeSB9IGZyb20gXCJudXR0aW4yYy1jb3JlX3YxXCI7XG5pbXBvcnQgeyBJbmplY3Rpb25Qb2ludCB9IGZyb20gXCJtaW5kaV92MVwiO1xuaW1wb3J0IHsgQ29tbW9uRXZlbnRzIH0gZnJvbSBcIi4uL2NvbW1vbi9jb21tb25FdmVudHNcIjtcbmltcG9ydCB7IENvbnRhaW5lckV2ZW50IH0gZnJvbSBcImNvbnRhaW5lcmJyaWRnZV92MVwiO1xuXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiQ29tbW9uSW5wdXRcIik7XG5cbmV4cG9ydCBjbGFzcyBDb21tb25JbnB1dCB7XG5cbiAgICBzdGF0aWMgRVZFTlRfQ0xJQ0tFRCA9IENvbW1vbkV2ZW50cy5DTElDS0VEO1xuICAgIHN0YXRpYyBFVkVOVF9FTlRFUkVEID0gQ29tbW9uRXZlbnRzLkVOVEVSRUQ7XG4gICAgc3RhdGljIEVWRU5UX0tFWVVQUEVEID0gQ29tbW9uRXZlbnRzLktFWVVQUEVEO1xuICAgIHN0YXRpYyBFVkVOVF9DSEFOR0VEID0gQ29tbW9uRXZlbnRzLkNIQU5HRUQ7XG4gICAgc3RhdGljIEVWRU5UX0JMVVJSRUQgPSBDb21tb25FdmVudHMuQkxVUlJFRDtcblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNvbXBvbmVudENsYXNzXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gbW9kZWxcbiAgICAgKiBAcGFyYW0ge0Fic3RyYWN0VmFsaWRhdG9yfSB2YWxpZGF0b3JcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGxhY2Vob2xkZXJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaW5wdXRFbGVtZW50SWRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZXJyb3JFbGVtZW50SWRcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihjb21wb25lbnRDbGFzcyxcbiAgICAgICAgbmFtZSxcbiAgICAgICAgbW9kZWwgPSBudWxsLFxuICAgICAgICB2YWxpZGF0b3IgPSBudWxsLCBcbiAgICAgICAgcGxhY2Vob2xkZXIgPSBudWxsLFxuICAgICAgICBpbnB1dEVsZW1lbnRJZCA9IG51bGwsXG4gICAgICAgIGVycm9yRWxlbWVudElkID0gbnVsbCkge1xuXG5cbiAgICAgICAgLyoqIEB0eXBlIHtJbmxpbmVDb21wb25lbnRGYWN0b3J5fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShJbmxpbmVDb21wb25lbnRGYWN0b3J5KTtcblxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudH0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSBudWxsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7QWJzdHJhY3RWYWxpZGF0b3J9ICovXG4gICAgICAgIHRoaXMudmFsaWRhdG9yID0gdmFsaWRhdG9yO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7RnVuY3Rpb259ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50Q2xhc3MgPSBjb21wb25lbnRDbGFzcztcblxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcblxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5wbGFjZWhvbGRlciA9IHBsYWNlaG9sZGVyO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLmlucHV0RWxlbWVudElkID0gaW5wdXRFbGVtZW50SWQ7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMuZXJyb3JFbGVtZW50SWQgPSBlcnJvckVsZW1lbnRJZDtcblxuICAgICAgICAvKiogQHR5cGUge29iamVjdH0gKi9cbiAgICAgICAgdGhpcy5tb2RlbCA9IG1vZGVsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Ym9vbGVhbn0gKi9cbiAgICAgICAgdGhpcy50YWludGVkID0gZmFsc2U7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtFdmVudE1hbmFnZXJ9ICovXG4gICAgICAgIHRoaXMuZXZlbnRNYW5hZ2VyID0gbmV3IEV2ZW50TWFuYWdlcigpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7SW5wdXRFbGVtZW50RGF0YUJpbmRpbmd9ICovXG4gICAgICAgIHRoaXMuZGF0YUJpbmRpbmcgPSBudWxsO1xuICAgIH1cblxuICAgIHBvc3RDb25maWcoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZSh0aGlzLmNvbXBvbmVudENsYXNzKTtcblxuICAgICAgICBDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUodGhpcy5jb21wb25lbnRDbGFzcy5uYW1lLCB0aGlzLmNvbXBvbmVudC5jb21wb25lbnRJbmRleCk7XG5cbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KHRoaXMuaW5wdXRFbGVtZW50SWQpLnNldEF0dHJpYnV0ZVZhbHVlKFwibmFtZVwiLCB0aGlzLm5hbWUpO1xuICAgICAgICBpZiAodGhpcy5wbGFjZWhvbGRlcikge1xuICAgICAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KHRoaXMuaW5wdXRFbGVtZW50SWQpLnNldEF0dHJpYnV0ZVZhbHVlKFwicGxhY2Vob2xkZXJcIiwgXCI6ICBcIiArICB0aGlzLnBsYWNlaG9sZGVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHRoaXMudmFsaWRhdG9yKSB7XG4gICAgICAgICAgICB0aGlzLnZhbGlkYXRvci53aXRoVmFsaWRMaXN0ZW5lcihuZXcgTWV0aG9kKHRoaXMuaGlkZVZhbGlkYXRpb25FcnJvciwgdGhpcykpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYodGhpcy5tb2RlbCkge1xuICAgICAgICAgICAgdGhpcy5kYXRhQmluZGluZyA9IElucHV0RWxlbWVudERhdGFCaW5kaW5nLmxpbmsodGhpcy5tb2RlbCwgdGhpcy52YWxpZGF0b3IpLnRvKHRoaXMuY29tcG9uZW50LmdldCh0aGlzLmlucHV0RWxlbWVudElkKSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQodGhpcy5pbnB1dEVsZW1lbnRJZClcbiAgICAgICAgICAgIC5saXN0ZW5UbyhcImtleXVwXCIsIHRoaXMua2V5dXBwZWQsIHRoaXMpXG4gICAgICAgICAgICAubGlzdGVuVG8oXCJjaGFuZ2VcIiwgdGhpcy5jaGFuZ2VkLCB0aGlzKVxuICAgICAgICAgICAgLmxpc3RlblRvKFwiYmx1clwiLCB0aGlzLmJsdXJyZWQsIHRoaXMpXG4gICAgICAgICAgICAubGlzdGVuVG8oXCJjbGlja1wiLCB0aGlzLmNsaWNrZWQsIHRoaXMpXG4gICAgICAgICAgICAubGlzdGVuVG8oXCJrZXl1cFwiLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQuaXNLZXlDb2RlKDEzKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVudGVyZWQoZXZlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIHRoaXMpO1xuXG4gICAgICAgIGlmICh0aGlzLmVycm9yRWxlbWVudElkKSB7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQodGhpcy5lcnJvckVsZW1lbnRJZClcbiAgICAgICAgICAgICAgICAubGlzdGVuVG8oXCJjbGlja1wiLCB0aGlzLmVycm9yQ2xpY2tlZCwgdGhpcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgZXZlbnRzKCkgeyByZXR1cm4gdGhpcy5ldmVudE1hbmFnZXI7IH1cblxuICAgIGdldCB2YWx1ZSgpIHsgXG4gICAgICAgIC8qKiBAdHlwZSB7SFRNTElucHV0RWxlbWVudH0gKi9cbiAgICAgICAgY29uc3QgaW5wdXQgPSB0aGlzLmNvbXBvbmVudC5nZXQodGhpcy5pbnB1dEVsZW1lbnRJZCk7XG4gICAgICAgIHJldHVybiBpbnB1dC52YWx1ZTtcbiAgICB9XG5cbiAgICBzZXQgdmFsdWUodmFsdWUpIHtcbiAgICAgICAgLyoqIEB0eXBlIHtIVE1MSW5wdXRFbGVtZW50fSAqL1xuICAgICAgICBjb25zdCBpbnB1dCA9IHRoaXMuY29tcG9uZW50LmdldCh0aGlzLmlucHV0RWxlbWVudElkKTtcbiAgICAgICAgaW5wdXQudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgaWYgKHRoaXMuZGF0YUJpbmRpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YUJpbmRpbmcucHVzaCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDb250YWluZXJFdmVudH0gZXZlbnQgXG4gICAgICovXG4gICAga2V5dXBwZWQoZXZlbnQpIHtcbiAgICAgICAgaWYgKCFldmVudC5pc0tleUNvZGUoMTMpICYmICFldmVudC5pc0tleUNvZGUoMTYpICYmICFldmVudC5pc0tleUNvZGUoOSkpIHtcbiAgICAgICAgICAgIHRoaXMudGFpbnRlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFwiXCIgPT09IGV2ZW50LnRhcmdldFZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnRhaW50ZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmV2ZW50cy50cmlnZ2VyKENvbW1vbklucHV0LkVWRU5UX0tFWVVQUEVELCBldmVudCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDb250YWluZXJFdmVudH0gZXZlbnQgXG4gICAgICovXG4gICAgY2hhbmdlZChldmVudCkge1xuICAgICAgICB0aGlzLnRhaW50ZWQgPSB0cnVlO1xuICAgICAgICBpZiAoXCJcIiA9PT0gZXZlbnQudGFyZ2V0VmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMudGFpbnRlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZXZlbnRzLnRyaWdnZXIoQ29tbW9uSW5wdXQuRVZFTlRfQ0hBTkdFRCwgZXZlbnQpO1xuICAgIH1cblxuICAgIGNsaWNrZWQoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5ldmVudHMudHJpZ2dlcihDb21tb25JbnB1dC5FVkVOVF9DTElDS0VELCBldmVudCk7XG4gICAgfVxuXG4gICAgZW50ZXJlZChldmVudCkge1xuICAgICAgICBpZiAoIXRoaXMudmFsaWRhdG9yLmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgdGhpcy5zaG93VmFsaWRhdGlvbkVycm9yKCk7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdEFsbCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZXZlbnRzLnRyaWdnZXIoQ29tbW9uSW5wdXQuRVZFTlRfRU5URVJFRCwgZXZlbnQpO1xuICAgIH1cblxuICAgIGJsdXJyZWQoZXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLnRhaW50ZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMudmFsaWRhdG9yLmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgdGhpcy5zaG93VmFsaWRhdGlvbkVycm9yKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5oaWRlVmFsaWRhdGlvbkVycm9yKCk7XG4gICAgICAgIHRoaXMuZXZlbnRzLnRyaWdnZXIoQ29tbW9uSW5wdXQuRVZFTlRfQkxVUlJFRCwgZXZlbnQpO1xuICAgIH1cblxuICAgIGVycm9yQ2xpY2tlZChldmVudCkge1xuICAgICAgICB0aGlzLmhpZGVWYWxpZGF0aW9uRXJyb3IoKTtcbiAgICB9XG5cbiAgICBmb2N1cygpIHsgdGhpcy5jb21wb25lbnQuZ2V0KHRoaXMuaW5wdXRFbGVtZW50SWQpLmZvY3VzKCk7IH1cbiAgICBzZWxlY3RBbGwoKSB7IHRoaXMuY29tcG9uZW50LmdldCh0aGlzLmlucHV0RWxlbWVudElkKS5zZWxlY3RBbGwoKTsgfVxuICAgIGVuYWJsZSgpIHsgdGhpcy5jb21wb25lbnQuZ2V0KHRoaXMuaW5wdXRFbGVtZW50SWQpLmVuYWJsZSgpOyB9XG4gICAgZGlzYWJsZSgpIHsgdGhpcy5jb21wb25lbnQuZ2V0KHRoaXMuaW5wdXRFbGVtZW50SWQpLmRpc2FibGUoKTsgfVxuICAgIGNsZWFyKCkgeyB0aGlzLmNvbXBvbmVudC5nZXQodGhpcy5pbnB1dEVsZW1lbnRJZCkudmFsdWUgPSBcIlwiOyB0aGlzLnRhaW50ZWQgPSBmYWxzZTsgdGhpcy5oaWRlVmFsaWRhdGlvbkVycm9yKCk7IH1cblxufSIsImltcG9ydCB7IENvbXBvbmVudCxcbiAgICBDYW52YXNTdHlsZXMsXG4gICAgU3R5bGVTZWxlY3RvckFjY2Vzc29yLFxuICAgIFN0eWxlc2hlZXRCdWlsZGVyLFxuICAgIFN0eWxlc2hlZXQsXG4gICAgQ29tcG9uZW50QnVpbGRlcixcbiAgICBJbmxpbmVDb21wb25lbnRGYWN0b3J5XG59IGZyb20gXCJudXR0aW4yYy1jb3JlX3YxXCI7XG5pbXBvcnQgeyBJbmplY3Rpb25Qb2ludCwgUHJvdG90eXBlQ29uZmlnLCBUeXBlQ29uZmlnUGFjayB9IGZyb20gXCJtaW5kaV92MVwiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5cbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJQYW5lbFwiKTtcblxuZXhwb3J0IGNsYXNzIFBhbmVsIHtcblxuICAgIHN0YXRpYyBQQVJBTUVURVJfU1RZTEVfVFlQRV9DT0xVTU5fUk9PVCA9IFwicGFuZWwtdHlwZS1jb2x1bW4tcm9vdFwiO1xuICAgIHN0YXRpYyBQQVJBTUVURVJfU1RZTEVfVFlQRV9DT0xVTU4gPSBcInBhbmVsLXR5cGUtY29sdW1uXCI7XG4gICAgc3RhdGljIFBBUkFNRVRFUl9TVFlMRV9UWVBFX1JPVyA9IFwicGFuZWwtdHlwZS1yb3dcIjtcblxuICAgIHN0YXRpYyBQQVJBTUVURVJfU1RZTEVfQ09OVEVOVF9BTElHTl9MRUZUID0gXCJwYW5lbC1jb250ZW50LWFsaWduLWxlZnRcIjtcbiAgICBzdGF0aWMgUEFSQU1FVEVSX1NUWUxFX0NPTlRFTlRfQUxJR05fUklHSFQgPSBcInBhbmVsLWNvbnRlbnQtYWxpZ24tcmlnaHRcIjtcbiAgICBzdGF0aWMgUEFSQU1FVEVSX1NUWUxFX0NPTlRFTlRfQUxJR05fQ0VOVEVSID0gXCJwYW5lbC1jb250ZW50LWFsaWduLWNlbnRlclwiO1xuICAgIHN0YXRpYyBQQVJBTUVURVJfU1RZTEVfQ09OVEVOVF9BTElHTl9KVVNUSUZZID0gXCJwYW5lbC1jb250ZW50LWFsaWduLWp1c3RpZnlcIjtcblxuICAgIHN0YXRpYyBQQVJBTUVURVJfU1RZTEVfU0laRV9BVVRPID0gXCJwYW5lbC1zaXplLWF1dG9cIjtcbiAgICBzdGF0aWMgUEFSQU1FVEVSX1NUWUxFX1NJWkVfTUlOSU1BTCA9IFwicGFuZWwtc2l6ZS1taW5pbWFsXCI7XG4gICAgc3RhdGljIFBBUkFNRVRFUl9TVFlMRV9TSVpFX1JFU1BPTlNJVkUgPSBcInBhbmVsLXNpemUtcmVzcG9uc2l2ZVwiO1xuXG4gICAgc3RhdGljIE9QVElPTl9TVFlMRV9DT05URU5UX1BBRERJTkdfU01BTEwgPSBcInBhbmVsLWNvbnRlbnQtcGFkZGluZy1zbWFsbFwiO1xuICAgIHN0YXRpYyBPUFRJT05fU1RZTEVfQ09OVEVOVF9QQURESU5HX0xBUkdFID0gXCJwYW5lbC1jb250ZW50LXBhZGRpbmctbGFyZ2VcIjtcblxuICAgIHN0YXRpYyBPUFRJT05fU1RZTEVfQk9SREVSX1NIQURPVyA9IFwicGFuZWwtYm9yZGVyLXNoYWRvd1wiO1xuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbnRlbnRBbGlnbiBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2l6ZSBcbiAgICAgKiBAcGFyYW0ge0FycmF5PHN0cmluZz59IG9wdGlvbnMgXG4gICAgICovXG4gICAgY29uc3RydWN0b3IodHlwZSA9IFBhbmVsLlBBUkFNRVRFUl9TVFlMRV9UWVBFX0NPTFVNTl9ST09ULFxuICAgICAgICBjb250ZW50QWxpZ24gPSBQYW5lbC5QQVJBTUVURVJfU1RZTEVfQ09OVEVOVF9BTElHTl9DRU5URVIsXG4gICAgICAgIHNpemUgPSBQYW5lbC5QQVJBTUVURVJfU1RZTEVfU0laRV9BVVRPLFxuICAgICAgICBvcHRpb25zID0gW10pIHtcblxuICAgICAgICAvKiogQHR5cGUge0lubGluZUNvbXBvbmVudEZhY3Rvcnl9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKElubGluZUNvbXBvbmVudEZhY3RvcnkpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IG51bGw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMuY29udGVudEFsaWduID0gY29udGVudEFsaWduO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLnNpemUgPSBzaXplO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7QXJyYXk8U3RyaW5nPn0gKi9cbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3R5bGVzaGVldEJ1aWxkZXJ9IHN0eWxlc2hlZXRCdWlsZGVyIFxuICAgICAqIEByZXR1cm5zIHtTdHlsZXNoZWV0fVxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZFN0eWxlc2hlZXQoc3R5bGVzaGVldEJ1aWxkZXIpIHtcbiAgICAgICAgcmV0dXJuIHN0eWxlc2hlZXRCdWlsZGVyXG4gICAgICAgICAgICAubWVkaWEoXCJAbWVkaWEgb25seSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDg1MHB0KVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zZWxlY3RvcihcIi5wYW5lbC1zaXplLXJlc3BvbnNpdmVcIilcbiAgICAgICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcImZsZXgtYmFzaXNcIiwgXCIxMDAlXCIpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcIm1pbi13aWR0aFwiLCBcIjgwMHB0XCIpXG4gICAgICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5tZWRpYShcIkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogODQ5cHQpXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBhbmVsLXNpemUtcmVzcG9uc2l2ZVwiKVxuICAgICAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwiZmxleC1iYXNpc1wiLCBcIjEwMCVcIilcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwibWluLXdpZHRoXCIsIFwiNTAwcHRcIilcbiAgICAgICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLm1lZGlhKFwiQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA1MDBwdClcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc2VsZWN0b3IoXCIucGFuZWwtc2l6ZS1yZXNwb25zaXZlXCIpXG4gICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJmbGV4LWJhc2lzXCIsIFwiMTAwJVwiKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJtaW4td2lkdGhcIiwgXCIxMDAlXCIpXG4gICAgICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5wYW5lbC10eXBlLWNvbHVtbi1yb290XCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLCBcImZsZXhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmbGV4LWRpcmVjdGlvblwiLCBcImNvbHVtblwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJveC1zaXppbmdcIiwgXCJib3JkZXItYm94XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiaGVpZ2h0XCIsIFwiMTAwJVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlclwiLCBcIjBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW5cIiwgXCIwXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucGFuZWwtdHlwZS1jb2x1bW5cIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIFwiZmxleFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZsZXgtZGlyZWN0aW9uXCIsIFwiY29sdW1uXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm94LXNpemluZ1wiLCBcImJvcmRlci1ib3hcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW5cIiwgXCIwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyXCIsIFwiMFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBhbmVsLXR5cGUtcm93XCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLCBcImZsZXhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmbGV4LWRpcmVjdGlvblwiLCBcInJvd1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJveC1zaXppbmdcIiwgXCJib3JkZXItYm94XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luXCIsIFwiMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlclwiLCBcIjBcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5wYW5lbC1jb250ZW50LWFsaWduLWxlZnRcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJqdXN0aWZ5LWNvbnRlbnRcIiwgXCJsZWZ0XCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucGFuZWwtY29udGVudC1hbGlnbi1yaWdodFwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImp1c3RpZnktY29udGVudFwiLCBcInJpZ2h0XCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucGFuZWwtY29udGVudC1hbGlnbi1jZW50ZXJcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJhbGlnbi1pdGVtc1wiLCBcImNlbnRlclwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImp1c3RpZnktY29udGVudFwiLCBcImNlbnRlclwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBhbmVsLWNvbnRlbnQtYWxpZ24tanVzdGlmeVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImp1c3RpZnktY29udGVudFwiLCBcInNwYWNlLWJldHdlZW5cIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5wYW5lbC1zaXplLWF1dG9cIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmbGV4LWdyb3dcIiwgXCIxXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZmxleC1zaHJpbmtcIiwgXCIwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZmxleC1iYXNpc1wiLCBcImF1dG9cIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5wYW5lbC1zaXplLW1pbmltYWxcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmbGV4LWdyb3dcIiwgXCIwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZmxleC1zaHJpbmtcIiwgXCIwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZmxleC1iYXNpc1wiLCBcImF1dG9cIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5wYW5lbC1jb250ZW50LXBhZGRpbmctc21hbGxcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwYWRkaW5nXCIsIFwiMnB0XCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucGFuZWwtY29udGVudC1wYWRkaW5nLWxhcmdlXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZ1wiLCBcIjZwdFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBhbmVsLWJvcmRlci1zaGFkb3dcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3gtc2hhZG93XCIsIFwiMCAxcHggOHB4IHJnYmEoMCwwLDAsMC41KVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDb21wb25lbnRCdWlsZGVyfSBjb21wb25lbnRCdWlsZGVyIFxuICAgICAqIEByZXR1cm5zIHtDb21wb25lbnR9XG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkQ29tcG9uZW50KGNvbXBvbmVudEJ1aWxkZXIpIHtcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudEJ1aWxkZXJcbiAgICAgICAgICAgIC5yb290KFwiZGl2XCIsIFwiaWQ9cGFuZWxcIilcbiAgICAgICAgICAgIC5idWlsZCgpO1xuICAgIH1cblxuICAgIHBvc3RDb25maWcoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZShQYW5lbCk7XG4gICAgICAgIENhbnZhc1N0eWxlcy5lbmFibGVTdHlsZShQYW5lbC5uYW1lKTtcblxuICAgICAgICBTdHlsZVNlbGVjdG9yQWNjZXNzb3IuZnJvbSh0aGlzLmNvbXBvbmVudC5nZXQoXCJwYW5lbFwiKSlcbiAgICAgICAgICAgIC5lbmFibGUodGhpcy50eXBlKVxuICAgICAgICAgICAgLmVuYWJsZSh0aGlzLmNvbnRlbnRBbGlnbilcbiAgICAgICAgICAgIC5lbmFibGUodGhpcy5zaXplKTtcbiAgICB9XG5cbn1cblxuVHlwZUNvbmZpZ1BhY2suaW5zdGFuY2UoKS5hZGRUeXBlQ29uZmlnKFwibnV0dGluMmMtdWlcIiwgUHJvdG90eXBlQ29uZmlnLnVubmFtZWQoUGFuZWwpKTsiLCJpbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcbmltcG9ydCB7IENvbXBvbmVudCwgQ29tcG9uZW50QnVpbGRlciwgSW5saW5lQ29tcG9uZW50RmFjdG9yeSB9IGZyb20gXCJudXR0aW4yYy1jb3JlX3YxXCI7XG5pbXBvcnQgeyBJbmplY3Rpb25Qb2ludCwgUHJvdG90eXBlQ29uZmlnLCBUeXBlQ29uZmlnUGFjayB9IGZyb20gXCJtaW5kaV92MVwiO1xuXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiTGluZVBhbmVsRW50cnlcIik7XG5cbmV4cG9ydCBjbGFzcyBMaW5lUGFuZWxFbnRyeSB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcblxuXHRcdC8qKiBAdHlwZSB7SW5saW5lQ29tcG9uZW50RmFjdG9yeX0gKi9cblx0XHR0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShJbmxpbmVDb21wb25lbnRGYWN0b3J5KTtcblxuXHRcdC8qKiBAdHlwZSB7Q29tcG9uZW50fSAqL1xuXHRcdHRoaXMuY29tcG9uZW50ID0gbnVsbDtcblxuICAgIH1cblxuXHQvKipcblx0ICogXG5cdCAqIEBwYXJhbSB7Q29tcG9uZW50QnVpbGRlcn0gY29tcG9uZW50QnVpbGRlciBcblx0ICogQHJldHVybnMge0NvbXBvbmVudH1cblx0ICovXG5cdHN0YXRpYyBidWlsZENvbXBvbmVudChjb21wb25lbnRCdWlsZGVyKSB7XG5cdFx0cmV0dXJuIGNvbXBvbmVudEJ1aWxkZXJcblx0XHRcdC5yb290KFwiZGl2XCIsIFwiaWQ9cmVjb3JkRWxlbWVudFwiLCBcImNsYXNzPWNudHIgY250ci1jb2x1bW5zIGNudHItZ2FwLXNtYWxsXCIpXG5cdFx0XHQuYnVpbGQoKTtcblx0fVxuXG4gICAgYXN5bmMgcG9zdENvbmZpZygpIHtcblx0XHR0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoTGluZVBhbmVsRW50cnkpO1xuICAgIH1cblxuXG59XG5cblR5cGVDb25maWdQYWNrLmluc3RhbmNlKCkuYWRkVHlwZUNvbmZpZyhcIm51dHRpbjJjLXVpXCIsIFByb3RvdHlwZUNvbmZpZy51bm5hbWVkKExpbmVQYW5lbEVudHJ5KSk7IiwiaW1wb3J0IHsgTG9nZ2VyLCBNZXRob2QgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcbmltcG9ydCB7IEluamVjdGlvblBvaW50LCBQcm90b3R5cGVDb25maWcsIFByb3ZpZGVyLCBUeXBlQ29uZmlnUGFjayB9IGZyb20gXCJtaW5kaV92MVwiO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudE1hbmFnZXIsIFN0YXRlTWFuYWdlciwgSW5saW5lQ29tcG9uZW50RmFjdG9yeSwgQ29tcG9uZW50QnVpbGRlciB9IGZyb20gXCJudXR0aW4yYy1jb3JlX3YxXCI7XG5pbXBvcnQgeyBQYW5lbCB9IGZyb20gXCIuLi9wYW5lbC9wYW5lbC5qc1wiO1xuaW1wb3J0IHsgTGluZVBhbmVsRW50cnkgfSBmcm9tIFwiLi9saW5lUGFuZWxFbnRyeS9saW5lUGFuZWxFbnRyeS5qc1wiO1xuaW1wb3J0IHsgQ29udGFpbmVyRXZlbnQgfSBmcm9tIFwiY29udGFpbmVyYnJpZGdlX3YxXCI7XG5cbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJMaW5lUGFuZWxcIik7XG5cbmV4cG9ydCBjbGFzcyBMaW5lUGFuZWwge1xuXG5cdHN0YXRpYyBFVkVOVF9SRUZSRVNIX0NMSUNLRUQgPSBcInJlZnJlc2hDbGlja2VkXCI7XG5cdHN0YXRpYyBSRUNPUkRfRUxFTUVOVF9SRVFVRVNURUQgPSBcInJlY29yZEVsZW1lbnRSZXF1ZXN0ZWRcIjtcblx0c3RhdGljIFJFQ09SRFNfU1RBVEVfVVBEQVRFX1JFUVVFU1RFRCA9IFwicmVjb3Jkc1N0YXRlVXBkYXRlUmVxdWVzdGVkXCI7XG5cblx0LyoqXG5cdCAqIFxuXHQgKiBAcGFyYW0ge1BhbmVsfSBidXR0b25QYW5lbCBcblx0ICovXG5cdGNvbnN0cnVjdG9yKGJ1dHRvblBhbmVsID0gbnVsbCkge1xuXG5cdFx0LyoqIEB0eXBlIHtJbmxpbmVDb21wb25lbnRGYWN0b3J5fSAqL1xuXHRcdHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKElubGluZUNvbXBvbmVudEZhY3RvcnkpO1xuXHRcdFxuXHRcdC8qKiBAdHlwZSB7Q29tcG9uZW50fSAqL1xuXHRcdHRoaXMuY29tcG9uZW50ID0gbnVsbDtcblxuXHRcdC8qKiBAdHlwZSB7RXZlbnRNYW5hZ2VyfSAqL1xuXHRcdHRoaXMuZXZlbnRNYW5hZ2VyID0gbmV3IEV2ZW50TWFuYWdlcigpO1xuXG5cdFx0LyoqIEB0eXBlIHtQcm92aWRlcjxMaW5lUGFuZWxFbnRyeT59ICovXG5cdFx0dGhpcy5saW5lUGFuZWxFbnRyeVByb3ZpZGVyID0gSW5qZWN0aW9uUG9pbnQucHJvdmlkZXIoTGluZVBhbmVsRW50cnkpO1xuXG5cdFx0LyoqIEB0eXBlIHtQcm92aWRlcjxQYW5lbD59ICovXG5cdFx0dGhpcy5wYW5lbFByb3ZpZGVyID0gSW5qZWN0aW9uUG9pbnQucHJvdmlkZXIoUGFuZWwpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7U3RhdGVNYW5hZ2VyPGFueVtdPn0gKi9cbiAgICAgICAgdGhpcy5hcnJheVN0YXRlID0gbmV3IFN0YXRlTWFuYWdlcigpO1xuXG5cdFx0LyoqIEB0eXBlIHtQYW5lbH0gKi9cblx0XHR0aGlzLmJ1dHRvblBhbmVsID0gYnV0dG9uUGFuZWw7XG5cblx0fVxuXG5cdC8qKlxuXHQgKiBAcGFyYW0ge0NvbXBvbmVudEJ1aWxkZXJ9IGNvbXBvbmVudEJ1aWxkZXIgXG5cdCAqIEByZXR1cm5zIHtDb21wb25lbnR9XG5cdCAqL1xuXHRzdGF0aWMgYnVpbGRDb21wb25lbnQoY29tcG9uZW50QnVpbGRlcikge1xuXHRcdHJldHVybiBjb21wb25lbnRCdWlsZGVyXG5cdFx0XHQucm9vdChcImRpdlwiLCBcImNsYXNzPWNudHIgY250ci1nYXAtbWVkaXVtIGNudHItcm93cyBjbnRyLXByZXZlbnQtc2l6ZS1jaGFuZ2UgcGFkZGluZy1zbWFsbFwiKVxuXHRcdFx0Lm9wZW4oKVxuXHRcdFx0XHQubm9kZShcImRpdlwiLCBcImlkPWJ1dHRvblBhbmVsXCIpXG5cdFx0XHRcdC5ub2RlKFwiZGl2XCIsIFwiaWQ9cmVjb3JkRWxlbWVudHNcIiwgXCJjbGFzcz1jbnRyLW92ZXJyaWRlLWdyb3ctb25seSBjbnRyIGNudHItcm93cyBjbnRyLWdhcC1zbWFsbFwiKVxuXHRcdFx0LmNsb3NlKClcblx0XHRcdC5idWlsZCgpO1xuXHR9XG5cblx0YXN5bmMgcG9zdENvbmZpZygpIHtcblx0XHR0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoTGluZVBhbmVsKTtcblxuXHRcdGlmICh0aGlzLmJ1dHRvblBhbmVsKSB7XG5cdFx0XHR0aGlzLmNvbXBvbmVudC5zZXRDaGlsZChcImJ1dHRvblBhbmVsXCIsIHRoaXMuYnV0dG9uUGFuZWwuY29tcG9uZW50KTtcblx0XHR9XG5cblx0XHR0aGlzLmFycmF5U3RhdGUucmVhY3QobmV3IE1ldGhvZCh0aGlzLmhhbmRsZUFycmF5U3RhdGUsIHRoaXMpKTtcblxuXHR9XG5cblx0LyoqXG5cdCAqIEB0eXBlIHsgRXZlbnRNYW5hZ2VyIH1cblx0ICovXG5cdGdldCBldmVudHMoKSB7IHJldHVybiB0aGlzLmV2ZW50TWFuYWdlcjsgfVxuXG5cdC8qKlxuXHQgKiBAdHlwZSB7IEV2ZW50TWFuYWdlciB9XG5cdCAqL1xuXHRnZXQgZXZlbnRzKCkgeyByZXR1cm4gdGhpcy5ldmVudE1hbmFnZXI7IH1cblxuXHQvKipcblx0ICogUmVzZXRcblx0ICogXG5cdCAqIEBwYXJhbSB7Q29udGFpbmVyRXZlbnR9IGV2ZW50IFxuXHQgKi9cblx0YXN5bmMgcmVzZXQoZXZlbnQpIHtcblx0XHR0aGlzLmV2ZW50cy50cmlnZ2VyKExpbmVQYW5lbC5SRUNPUkRTX1NUQVRFX1VQREFURV9SRVFVRVNURUQsIFtldmVudCwgdGhpcy5hcnJheVN0YXRlXSk7XG5cdH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFxuICAgICAqL1xuICAgIGFzeW5jIGhhbmRsZUFycmF5U3RhdGUoYXJyYXkpIHtcblx0XHR0aGlzLmNvbXBvbmVudC5jbGVhckNoaWxkcmVuKFwicmVjb3JkRWxlbWVudHNcIik7XG5cdFx0YXJyYXkuZm9yRWFjaChhc3luYyAocmVjb3JkKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudC5hZGRDaGlsZChcInJlY29yZEVsZW1lbnRzXCIsIGF3YWl0IHRoaXMucG9wdWxhdGVSZWNvcmQocmVjb3JkKSk7XG4gICAgICAgIH0pO1x0XHRcbiAgICB9XG5cblx0LyoqXG4gICAgICogQHBhcmFtIHthbnl9IHJlY29yZCBcbiAgICAgKi9cbiAgICBhc3luYyBwb3B1bGF0ZVJlY29yZChyZWNvcmQpIHtcbiAgICAgICAgY29uc3QgcmVjb3JkRWxlbWVudCA9IGF3YWl0IHRoaXMuZXZlbnRNYW5hZ2VyLnRyaWdnZXIoTGluZVBhbmVsLlJFQ09SRF9FTEVNRU5UX1JFUVVFU1RFRCwgW251bGwsIHJlY29yZF0pO1xuICAgICAgICBcblx0XHRpZiAoIXJlY29yZEVsZW1lbnQpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRjb25zdCBsaW5lUGFuZWxFbnRyeSA9IGF3YWl0IHRoaXMubGluZVBhbmVsRW50cnlQcm92aWRlci5nZXQoW3RydWUsIHJlY29yZF0pO1xuXHRcdGxpbmVQYW5lbEVudHJ5LmNvbXBvbmVudC5zZXRDaGlsZChcInJlY29yZEVsZW1lbnRcIiwgcmVjb3JkRWxlbWVudC5jb21wb25lbnQpO1xuXG5cdFx0cmV0dXJuIGxpbmVQYW5lbEVudHJ5LmNvbXBvbmVudDtcbiAgICB9XG59XG5cblR5cGVDb25maWdQYWNrLmluc3RhbmNlKCkuYWRkVHlwZUNvbmZpZyhcIm51dHRpbjJjLXVpXCIsIFByb3RvdHlwZUNvbmZpZy51bm5hbWVkKExpbmVQYW5lbCkpOyIsImltcG9ydCB7XG4gICAgQ2FudmFzU3R5bGVzLFxuICAgIENvbXBvbmVudCxcbiAgICBFdmVudE1hbmFnZXIsXG4gICAgU3R5bGVTZWxlY3RvckFjY2Vzc29yLFxuICAgIFN0eWxlc2hlZXRCdWlsZGVyLFxuICAgIENvbXBvbmVudEJ1aWxkZXIsXG4gICAgU3R5bGVzaGVldCxcbiAgICBJbmxpbmVDb21wb25lbnRGYWN0b3J5XG59IGZyb20gXCJudXR0aW4yYy1jb3JlX3YxXCI7XG5pbXBvcnQgeyBJbmplY3Rpb25Qb2ludCwgUHJvdG90eXBlQ29uZmlnLCBUeXBlQ29uZmlnUGFjayB9IGZyb20gXCJtaW5kaV92MVwiO1xuaW1wb3J0IHsgTG9nZ2VyLCBNZXRob2QgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcbmltcG9ydCB7IENvbW1vbkV2ZW50cyB9IGZyb20gXCIuLi9jb21tb24vY29tbW9uRXZlbnRzXCI7XG5cbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJMaW5rUGFuZWxcIik7XG5cbmV4cG9ydCBjbGFzcyBMaW5rUGFuZWwge1xuXG4gICAgc3RhdGljIEVWRU5UX0NMSUNLRUQgPSBDb21tb25FdmVudHMuQ0xJQ0tFRDtcblxuICAgIHN0YXRpYyBTSVpFX1NNQUxMID0gXCJsaW5rLXBhbmVsLXNtYWxsXCI7XG4gICAgc3RhdGljIFNJWkVfTUVESVVNID0gXCJsaW5rLXBhbmVsLW1lZGl1bVwiO1xuICAgIHN0YXRpYyBTSVpFX0xBUkdFID0gXCJsaW5rLXBhbmVsLWxhcmdlXCI7XG5cbiAgICBzdGF0aWMgT1JJRU5UQVRJT05fRkxBVCA9IFwibGluay1wYW5lbC1mbGF0XCI7XG4gICAgc3RhdGljIE9SSUVOVEFUSU9OX1NUQUNLRUQgPSBcImxpbmstcGFuZWwtc3RhY2tlZFwiO1xuXG4gICAgc3RhdGljIFRIRU1FX0RBUksgPSBcImxpbmstcGFuZWwtZGFya1wiO1xuICAgIHN0YXRpYyBUSEVNRV9MSUdIVCA9IFwibGluay1wYW5lbC1saWdodFwiO1xuICAgIHN0YXRpYyBUSEVNRV9EQU5HRVIgPSBcImxpbmstcGFuZWwtZGFuZ2VyXCI7XG4gICAgc3RhdGljIFRIRU1FX0lORk8gPSBcImxpbmstcGFuZWwtaW5mb1wiO1xuICAgIHN0YXRpYyBUSEVNRV9TVUNDRVNTID0gXCJsaW5rLXBhbmVsLXN1Y2Nlc3NcIjtcblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBsYWJlbFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpY29uXG4gICAgICovXG4gICAgY29uc3RydWN0b3IobGFiZWwsIGljb24sIHRoZW1lID0gTGlua1BhbmVsLlRIRU1FX0RBUkssIG9yaWVudGF0aW9uID0gTGlua1BhbmVsLk9SSUVOVEFUSU9OX0ZMQVQsIHNpemUgPSBMaW5rUGFuZWwuU0laRV9TTUFMTCkge1xuXG4gICAgICAgIC8qKiBAdHlwZSB7SW5saW5lQ29tcG9uZW50RmFjdG9yeX0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoSW5saW5lQ29tcG9uZW50RmFjdG9yeSk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnR9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gbnVsbDtcblxuICAgICAgICAvKiogQHR5cGUge1N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5sYWJlbCA9IGxhYmVsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7U3RyaW5nfSAqL1xuICAgICAgICB0aGlzLmljb24gPSBpY29uO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7U3RyaW5nfSAqL1xuICAgICAgICB0aGlzLm9yaWVudGF0aW9uID0gb3JpZW50YXRpb247XG5cbiAgICAgICAgLyoqIEB0eXBlIHtTdHJpbmd9ICovXG4gICAgICAgIHRoaXMuc2l6ZSA9IHNpemU7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtTdHJpbmd9ICovXG4gICAgICAgIHRoaXMudGhlbWUgPSB0aGVtZTtcblxuICAgICAgICAvKiogQHR5cGUge0V2ZW50TWFuYWdlcjxMaW5rUGFuZWw+fSAqL1xuICAgICAgICB0aGlzLmV2ZW50TWFuYWdlciA9IG5ldyBFdmVudE1hbmFnZXIoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0eWxlc2hlZXRCdWlsZGVyfSBzdHlsZXNoZWV0QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyB7U3R5bGVzaGVldH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRTdHlsZXNoZWV0KHN0eWxlc2hlZXRCdWlsZGVyKSB7XG4gICAgICAgIHJldHVybiBzdHlsZXNoZWV0QnVpbGRlclxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmxpbmstcGFuZWxcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIFwiZmxleFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImFsaWduLWl0ZW1zXCIsIFwic3RyZXRjaFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpblwiLCBcIjJwdFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1yYWRpdXNcIiwgXCI1cHRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjdXJzb3JcIiwgXCJwb2ludGVyXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZ1wiLCBcIjAuNzVyZW0gMC43NXJlbVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInVzZXItc2VsZWN0XCIsIFwibm9uZVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmxpbmstcGFuZWwtZmxhdFwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZsZXgtZGlyZWN0aW9uXCIsIFwicm93XCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIubGluay1wYW5lbC1mbGF0ID4gLmxpbmstcGFuZWwtaWNvblwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIndpZHRoXCIsIFwiMnJlbVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmxpbmstcGFuZWwtc3RhY2tlZFwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZsZXgtZGlyZWN0aW9uXCIsIFwiY29sdW1uXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIubGluay1wYW5lbC1zbWFsbFwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtc2l6ZVwiLCBcIjFyZW1cIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5saW5rLXBhbmVsLW1lZGl1bVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtc2l6ZVwiLCBcIjEuMnJlbVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmxpbmstcGFuZWwtbGFyZ2VcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmb250LXNpemVcIiwgXCIxLjVyZW1cIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5saW5rLXBhbmVsLWRhcmtcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjb2xvclwiLCBcIiMyMTI1MjlcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5saW5rLXBhbmVsLWRhcms6aG92ZXJcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiI2JmYmZiZlwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmxpbmstcGFuZWwtbGlnaHRcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjb2xvclwiLCBcIiNmZmZmZmZcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5saW5rLXBhbmVsLWxpZ2h0OmhvdmVyXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiM4ZjhmOGZcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5saW5rLXBhbmVsLWRhbmdlclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbG9yXCIsIFwiI2ZmMDAwMFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmxpbmstcGFuZWwtZGFuZ2VyOmhvdmVyXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiNiZmJmYmZcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5saW5rLXBhbmVsLWluZm9cIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjb2xvclwiLCBcIiMwMDAwZmZcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5saW5rLXBhbmVsLWluZm86aG92ZXJcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiI2JmYmZiZlwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmxpbmstcGFuZWwtc3VjY2Vzc1wiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbG9yXCIsIFwiIzAwZmYwMFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmxpbmstcGFuZWwtc3VjY2Vzczpob3ZlclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIiwgXCIjZmZmZmZmXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIubGluay1wYW5lbC1pY29uXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidGV4dC1hbGlnblwiLCBcImNlbnRlclwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInZlcnRpY2FsLWFsaWduXCIsIFwibWlkZGxlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidXNlci1zZWxlY3RcIiwgXCJub25lXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIubGluay1wYW5lbC1sYWJlbFwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtd2VpZ2h0XCIsIFwiNDAwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidGV4dC1hbGlnblwiLCBcImNlbnRlclwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInZlcnRpY2FsLWFsaWduXCIsIFwibWlkZGxlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZy1sZWZ0XCIsIFwiNXB0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZy1yaWdodFwiLCBcIjVwdFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInVzZXItc2VsZWN0XCIsIFwibm9uZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zaXRpb25cIiwgXCJjb2xvciAwLjE1cyBlYXNlLWluLW91dCwgXCIgK1xuICAgICAgICAgICAgICAgICAgICBcImJhY2tncm91bmQtY29sb3IgMC4xNXMgZWFzZS1pbi1vdXQsIFwiICtcbiAgICAgICAgICAgICAgICAgICAgXCJib3JkZXItY29sb3IgMC4xNXMgZWFzZS1pbi1vdXQsIFwiICtcbiAgICAgICAgICAgICAgICAgICAgXCJib3gtc2hhZG93IDAuMTVzIGVhc2UtaW4tb3V0XCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuYnVpbGQoKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Q29tcG9uZW50QnVpbGRlcn0gY29tcG9uZW50QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyB7Q29tcG9uZW50fVxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZENvbXBvbmVudChjb21wb25lbnRCdWlsZGVyKSB7XG4gICAgICAgIHJldHVybiBjb21wb25lbnRCdWlsZGVyXG4gICAgICAgICAgICAucm9vdChcImRpdlwiLCBcImlkPWxpbmtcIiwgXCJjbGFzcz1saW5rLXBhbmVsXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLm5vZGUoXCJkaXZcIiwgXCJjbGFzcz1saW5rLXBhbmVsLWljb25cIilcbiAgICAgICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgICAgIC5ub2RlKFwiaVwiLCBcImlkPWljb25cIilcbiAgICAgICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwiZGl2XCIsIFwiY2xhc3M9bGluay1wYW5lbC1sYWJlbFwiKVxuICAgICAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAgICAgLm5vZGUoXCJhXCIsIFwiaWQ9bGFiZWxcIilcbiAgICAgICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgIC5idWlsZCgpO1xuICAgIH1cblxuICAgIC8qKiBAdHlwZSB7RXZlbnRNYW5hZ2VyPExpbmtQYW5lbD59ICovXG4gICAgZ2V0IGV2ZW50cygpIHsgcmV0dXJuIHRoaXMuZXZlbnRNYW5hZ2VyOyB9XG5cbiAgICBwb3N0Q29uZmlnKCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoTGlua1BhbmVsKTtcbiAgICAgICAgQ2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKExpbmtQYW5lbC5uYW1lKTtcbiAgICAgICAgXG4gICAgICAgIFN0eWxlU2VsZWN0b3JBY2Nlc3Nvci5mcm9tKHRoaXMuY29tcG9uZW50LmdldChcImxpbmtcIikpXG4gICAgICAgICAgICAuZW5hYmxlKHRoaXMuc2l6ZSlcbiAgICAgICAgICAgIC5lbmFibGUodGhpcy5vcmllbnRhdGlvbilcbiAgICAgICAgICAgIC5lbmFibGUodGhpcy50aGVtZSk7XG5cbiAgICAgICAgaWYgKHRoaXMubGFiZWwpIHtcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImxhYmVsXCIpLnNldENoaWxkKHRoaXMubGFiZWwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwibGFiZWxcIikucmVtb3ZlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5pY29uKSB7XG4gICAgICAgICAgICBTdHlsZVNlbGVjdG9yQWNjZXNzb3IuZnJvbSh0aGlzLmNvbXBvbmVudC5nZXQoXCJpY29uXCIpKVxuICAgICAgICAgICAgICAgIC5jbGVhcigpXG4gICAgICAgICAgICAgICAgLmVuYWJsZSh0aGlzLmljb24pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiaWNvblwiKS5yZW1vdmUoKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwibGlua1wiKS5saXN0ZW5UbyhcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5ldmVudE1hbmFnZXIudHJpZ2dlcihMaW5rUGFuZWwuRVZFTlRfQ0xJQ0tFRCwgZXZlbnQpO1xuICAgICAgICB9LCB0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge01ldGhvZH0gbWV0aG9kIFxuICAgICAqL1xuICAgIHdpdGhDbGlja0xpc3RlbmVyKG1ldGhvZCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJsaW5rXCIpLmxpc3RlblRvKFwiY2xpY2tcIiwgbWV0aG9kKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG59XG5cblR5cGVDb25maWdQYWNrLmluc3RhbmNlKCkuYWRkVHlwZUNvbmZpZyhcIm51dHRpbjJjLXVpXCIsIFByb3RvdHlwZUNvbmZpZy51bm5hbWVkKExpbmtQYW5lbCkpOyIsImltcG9ydCB7XG4gICAgQ2FudmFzU3R5bGVzLFxuICAgIENvbXBvbmVudCxcbiAgICBDYW52YXNSb290LFxuICAgIEhUTUwsXG4gICAgU3R5bGVTZWxlY3RvckFjY2Vzc29yLFxuICAgIFN0eWxlQWNjZXNzb3IsXG4gICAgU3R5bGVzaGVldEJ1aWxkZXIsXG4gICAgU3R5bGVzaGVldCxcbiAgICBDb21wb25lbnRCdWlsZGVyLFxuICAgIElubGluZUNvbXBvbmVudEZhY3Rvcnlcbn0gZnJvbSBcIm51dHRpbjJjLWNvcmVfdjFcIjtcbmltcG9ydCB7IEluamVjdGlvblBvaW50LCBQcm90b3R5cGVDb25maWcsIFR5cGVDb25maWdQYWNrIH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcbmltcG9ydCB7IENvbnRhaW5lckV2ZW50IH0gZnJvbSBcImNvbnRhaW5lcmJyaWRnZV92MVwiO1xuaW1wb3J0IHsgQ29sb3JQYWxldHRlIH0gZnJvbSBcIi4uL2NvbG9yUGFsZXR0ZVwiO1xuaW1wb3J0IHsgRWxlbWVudFRoZW1lQXBwbGljYXRvciB9IGZyb20gXCIuLi9jb21tb24vZWxlbWVudFRoZW1lQXBwbGljYXRvclwiO1xuXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiUG9wVXBQYW5lbFwiKTtcblxuZXhwb3J0IGNsYXNzIFBvcFVwUGFuZWwge1xuXG4gICAgc3RhdGljIFRZUEVfUFJJTUFSWSA9IFwicG9wLXVwLXBhbmVsLWJ1dHRvbi1wcmltYXJ5XCI7XG4gICAgc3RhdGljIFRZUEVfU0VDT05EQVJZID0gXCJwb3AtdXAtcGFuZWwtYnV0dG9uLXNlY29uZGFyeVwiO1xuICAgIHN0YXRpYyBUWVBFX1NVQ0NFU1MgPSBcInBvcC11cC1wYW5lbC1idXR0b24tc3VjY2Vzc1wiO1xuICAgIHN0YXRpYyBUWVBFX0lORk8gPSBcInBvcC11cC1wYW5lbC1idXR0b24taW5mb1wiO1xuICAgIHN0YXRpYyBUWVBFX1dBUk5JTkcgPSBcInBvcC11cC1wYW5lbC1idXR0b24td2FybmluZ1wiO1xuICAgIHN0YXRpYyBUWVBFX0RBTkdFUiA9IFwicG9wLXVwLXBhbmVsLWJ1dHRvbi1kYW5nZXJcIjtcbiAgICBzdGF0aWMgVFlQRV9MSUdIVCA9IFwicG9wLXVwLXBhbmVsLWJ1dHRvbi1saWdodFwiO1xuICAgIHN0YXRpYyBUWVBFX0RBUksgPSBcInBvcC11cC1wYW5lbC1idXR0b24tZGFya1wiO1xuXG4gICAgc3RhdGljIFNJWkVfTUVESVVNID0gXCJwb3AtdXAtcGFuZWwtYnV0dG9uLW1lZGl1bVwiO1xuICAgIHN0YXRpYyBTSVpFX0xBUkdFID0gXCJwb3AtdXAtcGFuZWwtYnV0dG9uLWxhcmdlXCI7XG5cbiAgICBzdGF0aWMgT1JJRU5UQVRJT05fTEVGVCA9IFwicG9wLXVwLXBhbmVsLWxlZnRcIjtcbiAgICBzdGF0aWMgT1JJRU5UQVRJT05fUklHSFQgPSBcInBvcC11cC1wYW5lbC1yaWdodFwiO1xuXG4gICAgc3RhdGljIENPTlRFTlRfVklTSUJMRSA9IFwicG9wLXVwLXBhbmVsLWNvbnRlbnQtdmlzaWJsZVwiO1xuICAgIHN0YXRpYyBDT05URU5UX0hJRERFTiA9IFwicG9wLXVwLXBhbmVsLWNvbnRlbnQtaGlkZGVuXCI7XG4gICAgc3RhdGljIENPTlRFTlRfRVhQQU5EID0gXCJwb3AtdXAtcGFuZWwtY29udGVudC1leHBhbmRcIjtcbiAgICBzdGF0aWMgQ09OVEVOVF9DT0xMQVBTRSA9IFwicG9wLXVwLXBhbmVsLWNvbnRlbnQtY29sbGFwc2VcIjtcbiAgICBzdGF0aWMgQ09OVEVOVCA9IFwicG9wLXVwLXBhbmVsLWNvbnRlbnRcIjtcbiAgICBzdGF0aWMgQlVUVE9OID0gXCJwb3AtdXAtcGFuZWwtYnV0dG9uXCI7XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWNvbkNsYXNzXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gb3JpZW50YXRpb25cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihpY29uQ2xhc3MsIHR5cGUgPSBQb3BVcFBhbmVsLlRZUEVfREFSSywgc2l6ZSA9IFBvcFVwUGFuZWwuU0laRV9NRURJVU0sIG9yaWVudGF0aW9uID0gUG9wVXBQYW5lbC5PUklFTlRBVElPTl9MRUZUKSB7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtJbmxpbmVDb21wb25lbnRGYWN0b3J5fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShJbmxpbmVDb21wb25lbnRGYWN0b3J5KTtcblxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudH0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSBudWxsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLmljb25DbGFzcyA9IGljb25DbGFzcztcblxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcblxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5zaXplID0gc2l6ZTtcblxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5vcmllbnRhdGlvbiA9IG9yaWVudGF0aW9uO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHlsZXNoZWV0QnVpbGRlcn0gc3R5bGVzaGVldEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMge1N0eWxlc2hlZXR9XG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkU3R5bGVzaGVldChzdHlsZXNoZWV0QnVpbGRlcikge1xuICAgICAgICBzdHlsZXNoZWV0QnVpbGRlclxuICAgICAgICAgICAgLm1lZGlhKFwiQG1lZGlhIChwcmVmZXJzLXJlZHVjZWQtbW90aW9uOiByZWR1Y2UpXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBvcC11cC1wYW5lbC1idXR0b25cIilcbiAgICAgICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zaXRpb25cIiwgXCJub25lXCIpXG4gICAgICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5wb3AtdXAtcGFuZWwtb3V0bGluZVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgXCJpbmxpbmUtYmxvY2tcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ2ZXJ0aWNhbC1hbGlnblwiLCBcIm1pZGRsZVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBvcC11cC1wYW5lbC1idXR0b25cIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtaW4td2lkdGhcIiwgXCIzNXB0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLCBcImlubGluZS1ibG9ja1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtd2VpZ2h0XCIsIFwiNDAwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCIjMjEyNTI5XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidGV4dC1hbGlnblwiLCBcImNlbnRlclwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInZlcnRpY2FsLWFsaWduXCIsIFwibWlkZGxlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidXNlci1zZWxlY3RcIiwgXCJub25lXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcInRyYW5zcGFyZW50XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyXCIsIFwiMXB4IHNvbGlkIHRyYW5zcGFyZW50XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZ1wiLCBcIjAuMzc1cmVtIDAuNzVyZW1cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJsaW5lLWhlaWdodFwiLCBcIjEuNVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1yYWRpdXNcIiwgXCIwLjI1cmVtXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNpdGlvblwiLCBcImNvbG9yIDAuMTVzIGVhc2UtaW4tb3V0LCBiYWNrZ3JvdW5kLWNvbG9yIDAuMTVzIGVhc2UtaW4tb3V0LCBib3JkZXItY29sb3IgMC4xNXMgZWFzZS1pbi1vdXQsIGJveC1zaGFkb3cgMC4xNXMgZWFzZS1pbi1vdXRcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5wb3AtdXAtcGFuZWwtYnV0dG9uLW1lZGl1bVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtc2l6ZVwiLCBcIjFyZW1cIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5wb3AtdXAtcGFuZWwtYnV0dG9uLWxhcmdlXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZm9udC1zaXplXCIsIFwiMS41cmVtXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucG9wLXVwLXBhbmVsLWNvbnRlbnRcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtaW4td2lkdGhcIiwgXCIxNTBwdFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1heC13aWR0aFwiLCBcIjQ1MHB0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZ1wiLCBcIjhwdCAxNHB0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCIjMzMzMzMzXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiNmZmZmZmZcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItcmFkaXVzXCIsIFwiNXB0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIiwgXCJhYnNvbHV0ZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInotaW5kZXhcIiwgXCI5OTk5OTk5N1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJveC1zaXppbmdcIiwgXCJib3JkZXItYm94XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm94LXNoYWRvd1wiLCBcIjAgMXB4IDhweCByZ2JhKDAsMCwwLDAuNSlcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJvdmVyZmxvd1wiLCBcImhpZGRlblwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBvcC11cC1wYW5lbC1jb250ZW50LnBvcC11cC1wYW5lbC1sZWZ0XCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKDAlLCAtMTAwJSkgdHJhbnNsYXRlKDAlLCAtNDJwdClcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5wb3AtdXAtcGFuZWwtY29udGVudC5wb3AtdXAtcGFuZWwtcmlnaHRcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoLTEwMCUsIC0xMDAlKSB0cmFuc2xhdGUoMzVwdCwtNDJwdClcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5wb3AtdXAtcGFuZWwtY29udGVudC12aXNpYmxlXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLFwiYmxvY2tcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucG9wLXVwLXBhbmVsLWNvbnRlbnQtaGlkZGVuXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLFwibm9uZVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBvcC11cC1wYW5lbC1hcnJvd1wiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmdcIiwgXCIxMHB4IDIwcHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjb2xvclwiLCBcIiMzMzMzMzNcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmb250LXdlaWdodFwiLCBcIm5vcm1hbFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBvc2l0aW9uXCIsIFwiYWJzb2x1dGVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ6LWluZGV4XCIsIFwiOTk5OTk5OTZcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3gtc2l6aW5nXCIsIFwiYm9yZGVyLWJveFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgXCJub25lXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKDAlLCAtMTAwJSkgdHJhbnNsYXRlKDAlLC0zOHB0KVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBvcC11cC1wYW5lbC1hcnJvdyBpXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIiwgXCJhYnNvbHV0ZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpbi1sZWZ0XCIsIFwiLTE1cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLCBcIjQwcHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJoZWlnaHRcIiwgXCI0MHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwib3ZlcmZsb3dcIiwgXCJoaWRkZW5cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0b3BcIiwgXCItMjAlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibGVmdFwiLCBcIjMwJVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBvcC11cC1wYW5lbC1hcnJvdyBpOjphZnRlclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbnRlbnRcIiwgXCInJ1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBvc2l0aW9uXCIsIFwiYWJzb2x1dGVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLCBcIjE2cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJoZWlnaHRcIiwgXCIxNnB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiNmZmZmZmZcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3gtc2hhZG93XCIsIFwiMCAxcHggOHB4IHJnYmEoMCwwLDAsMC41KVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImxlZnRcIiwgXCIzMCVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoNTAlLDUwJSkgcm90YXRlKDQ1ZGVnKVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBvcC11cC1wYW5lbC1idXR0b246aG92ZXJcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjb2xvclwiLCBcIiMyMTI1MjlcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0ZXh0LWRlY29yYXRpb25cIiwgXCJub25lXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucG9wLXVwLXBhbmVsLWJ1dHRvbjpmb2N1cywgLnBvcC11cC1wYW5lbC1idXR0b24uZm9jdXNcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJvdXRsaW5lXCIsIFwiMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJveC1zaGFkb3dcIiwgXCIwIDAgMCAwLjJyZW0gcmdiYSgwLCAxMjMsIDI1NSwgMC4yNSlcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5wb3AtdXAtcGFuZWwtYnV0dG9uLmRpc2FibGVkLCAucG9wLXVwLXBhbmVsLWJ1dHRvbjpkaXNhYmxlZFwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwLjY1XCIpXG4gICAgICAgICAgICAuY2xvc2UoKTtcblxuICAgICAgICBFbGVtZW50VGhlbWVBcHBsaWNhdG9yLmFwcGx5KHN0eWxlc2hlZXRCdWlsZGVyLCBcInBvcC11cC1wYW5lbC1idXR0b25cIiwgXCJwcmltYXJ5XCIsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuUFJJTUFSWV9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuUFJJTUFSWV9IT1ZFUl9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuUFJJTUFSWV9ESVNBQkxFRF9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuUFJJTUFSWV9BQ1RJVkVfQ09MT1JTLFxuICAgICAgICAgICAgXCIwIDAgMCAwLjJyZW0gcmdiYSgxMzAsIDEzOCwgMTQ1LCAwLjUpXCIsIC8vIGJveFNoYWRvd0ZvY3VzXG4gICAgICAgICAgICBcIjAgMCAwIDAuMnJlbSByZ2JhKDEzMCwgMTM4LCAxNDUsIDAuNSlcIik7IC8vIGJveFNoYWRvd0FjdGl2ZUZvY3VzXG5cblxuICAgICAgICBFbGVtZW50VGhlbWVBcHBsaWNhdG9yLmFwcGx5KHN0eWxlc2hlZXRCdWlsZGVyLCBcInBvcC11cC1wYW5lbC1idXR0b25cIiwgXCJzZWNvbmRhcnlcIixcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5TRUNPTkRBUllfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLlNFQ09OREFSWV9IT1ZFUl9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuU0VDT05EQVJZX0RJU0FCTEVEX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5TRUNPTkRBUllfQUNUSVZFX0NPTE9SUyxcbiAgICAgICAgICAgIFwiMCAwIDAgMC4ycmVtIHJnYmEoMTMwLCAxMzgsIDE0NSwgMC41KVwiLCAvLyBib3hTaGFkb3dGb2N1c1xuICAgICAgICAgICAgXCIwIDAgMCAwLjJyZW0gcmdiYSgxMzAsIDEzOCwgMTQ1LCAwLjUpXCIpOyAvLyBib3hTaGFkb3dBY3RpdmVGb2N1c1xuICAgICAgICBcbiAgICAgICAgRWxlbWVudFRoZW1lQXBwbGljYXRvci5hcHBseShzdHlsZXNoZWV0QnVpbGRlciwgXCJwb3AtdXAtcGFuZWwtYnV0dG9uXCIsIFwic3VjY2Vzc1wiLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLlNVQ0NFU1NfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLlNVQ0NFU1NfSE9WRVJfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLlNVQ0NFU1NfRElTQUJMRURfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLlNVQ0NFU1NfQUNUSVZFX0NPTE9SUyxcbiAgICAgICAgICAgIFwiMCAwIDAgMC4ycmVtIHJnYmEoNzIsIDE4MCwgOTcsIDAuNSlcIiwgLy8gYm94U2hhZG93Rm9jdXNcbiAgICAgICAgICAgIFwiMCAwIDAgMC4ycmVtIHJnYmEoNzIsIDE4MCwgOTcsIDAuNSlcIik7IC8vIGJveFNoYWRvd0FjdGl2ZUZvY3VzXG5cbiAgICAgICAgRWxlbWVudFRoZW1lQXBwbGljYXRvci5hcHBseShzdHlsZXNoZWV0QnVpbGRlciwgXCJwb3AtdXAtcGFuZWwtYnV0dG9uXCIsIFwiaW5mb1wiLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLklORk9fQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLklORk9fSE9WRVJfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLklORk9fRElTQUJMRURfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLklORk9fQUNUSVZFX0NPTE9SUyxcbiAgICAgICAgICAgIFwiMCAwIDAgMC4ycmVtIHJnYmEoNTgsIDE3NiwgMTk1LCAwLjUpXCIsIC8vIGJveFNoYWRvd0ZvY3VzXG4gICAgICAgICAgICBcIjAgMCAwIDAuMnJlbSByZ2JhKDU4LCAxNzYsIDE5NSwgMC41KVwiKTsgLy8gYm94U2hhZG93QWN0aXZlRm9jdXNcblxuICAgICAgICBFbGVtZW50VGhlbWVBcHBsaWNhdG9yLmFwcGx5KHN0eWxlc2hlZXRCdWlsZGVyLCBcInBvcC11cC1wYW5lbC1idXR0b25cIiwgXCJ3YXJuaW5nXCIsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuV0FSTklOR19DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuV0FSTklOR19IT1ZFUl9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuV0FSTklOR19ESVNBQkxFRF9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuV0FSTklOR19BQ1RJVkVfQ09MT1JTLFxuICAgICAgICAgICAgXCIwIDAgMCAwLjJyZW0gcmdiYSgyMjIsIDE3MCwgMTIsIDAuNSlcIiwgLy8gYm94U2hhZG93Rm9jdXNcbiAgICAgICAgICAgIFwiMCAwIDAgMC4ycmVtIHJnYmEoMjIyLCAxNzAsIDEyLCAwLjUpXCIpOyAvLyBib3hTaGFkb3dBY3RpdmVGb2N1c1xuXG4gICAgICAgIEVsZW1lbnRUaGVtZUFwcGxpY2F0b3IuYXBwbHkoc3R5bGVzaGVldEJ1aWxkZXIsIFwicG9wLXVwLXBhbmVsLWJ1dHRvblwiLCBcImRhbmdlclwiLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLkRBTkdFUl9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuREFOR0VSX0hPVkVSX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5EQU5HRVJfRElTQUJMRURfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLkRBTkdFUl9BQ1RJVkVfQ09MT1JTLFxuICAgICAgICAgICAgXCIwIDAgMCAwLjJyZW0gcmdiYSgyMjUsIDgzLCA5NywgMC41KVwiLCAvLyBib3hTaGFkb3dGb2N1c1xuICAgICAgICAgICAgXCIwIDAgMCAwLjJyZW0gcmdiYSgyMjUsIDgzLCA5NywgMC41KVwiKTsgLy8gYm94U2hhZG93QWN0aXZlRm9jdXNcblxuICAgICAgICBFbGVtZW50VGhlbWVBcHBsaWNhdG9yLmFwcGx5KHN0eWxlc2hlZXRCdWlsZGVyLCBcInBvcC11cC1wYW5lbC1idXR0b25cIiwgXCJsaWdodFwiLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLkxJR0hUX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5MSUdIVF9IT1ZFUl9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuTElHSFRfRElTQUJMRURfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLkxJR0hUX0FDVElWRV9DT0xPUlMsXG4gICAgICAgICAgICBcIjAgMCAwIDAuMnJlbSByZ2JhKDIxNiwgMjE3LCAyMTksIDAuNSlcIiwgLy8gYm94U2hhZG93Rm9jdXNcbiAgICAgICAgICAgIFwiMCAwIDAgMC4ycmVtIHJnYmEoMjE2LCAyMTcsIDIxOSwgMC41KVwiKTsgLy8gYm94U2hhZG93QWN0aXZlRm9jdXNcblxuICAgICAgICBFbGVtZW50VGhlbWVBcHBsaWNhdG9yLmFwcGx5KHN0eWxlc2hlZXRCdWlsZGVyLCBcInBvcC11cC1wYW5lbC1idXR0b25cIiwgXCJkYXJrXCIsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuREFSS19DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuREFSS19IT1ZFUl9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuREFSS19ESVNBQkxFRF9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuREFSS19BQ1RJVkVfQ09MT1JTLFxuICAgICAgICAgICAgXCIwIDAgMCAwLjJyZW0gcmdiYSg4MiwgODgsIDkzLCAwLjUpXCIsIC8vIGJveFNoYWRvd0ZvY3VzXG4gICAgICAgICAgICBcIjAgMCAwIDAuMnJlbSByZ2JhKDgyLCA4OCwgOTMsIDAuNSlcIik7IC8vIGJveFNoYWRvd0FjdGl2ZUZvY3VzXG5cbiAgICAgICAgcmV0dXJuIHN0eWxlc2hlZXRCdWlsZGVyLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDb21wb25lbnRCdWlsZGVyfSBjb21wb25lbnRCdWlsZGVyIFxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZENvbXBvbmVudChjb21wb25lbnRCdWlsZGVyKSB7XG4gICAgICAgIHJldHVybiBjb21wb25lbnRCdWlsZGVyXG4gICAgICAgICAgICAucm9vdChcImRpdlwiLCBcImlkPXBvcFVwUGFuZWxSb290XCIsIFwiY2xhc3M9cG9wLXVwLXBhbmVsLW91dGxpbmVcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAubm9kZShcImJ1dHRvblwiLCBcImlkPWJ1dHRvblwiLCBcImNsYXNzPXBvcC11cC1wYW5lbC1idXR0b25cIilcbiAgICAgICAgICAgICAgICAubm9kZShcImRpdlwiLCBcImlkPWFycm93XCIsIFwiY2xhc3M9cG9wLXVwLXBhbmVsLWFycm93XCIpXG4gICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAubm9kZShcImlcIilcbiAgICAgICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwiZGl2XCIsIFwiaWQ9Y29udGVudFwiLCBcImNsYXNzPXBvcC11cC1wYW5lbC1jb250ZW50XCIsIFwidGFiaW5kZXg9MFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgIC5idWlsZCgpO1xuICAgIH1cblxuICAgIHBvc3RDb25maWcoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZShQb3BVcFBhbmVsKTtcbiAgICAgICAgQ2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKFBvcFVwUGFuZWwubmFtZSk7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJ1dHRvblwiKS5zZXRDaGlsZChIVE1MLmkoXCJcIiwgdGhpcy5pY29uQ2xhc3MpKTtcblxuICAgICAgICBTdHlsZVNlbGVjdG9yQWNjZXNzb3IuZnJvbSh0aGlzLmNvbXBvbmVudC5nZXQoXCJidXR0b25cIikpXG4gICAgICAgICAgICAuZW5hYmxlKFBvcFVwUGFuZWwuQlVUVE9OKVxuICAgICAgICAgICAgLmVuYWJsZSh0aGlzLnR5cGUpO1xuXG4gICAgICAgIFN0eWxlU2VsZWN0b3JBY2Nlc3Nvci5mcm9tKHRoaXMuY29tcG9uZW50LmdldChcImNvbnRlbnRcIikpXG4gICAgICAgICAgICAuZW5hYmxlKFBvcFVwUGFuZWwuQ09OVEVOVClcbiAgICAgICAgICAgIC5kaXNhYmxlKFBvcFVwUGFuZWwuQ09OVEVOVF9WSVNJQkxFKVxuICAgICAgICAgICAgLmVuYWJsZShQb3BVcFBhbmVsLkNPTlRFTlRfSElEREVOKVxuICAgICAgICAgICAgLmVuYWJsZSh0aGlzLnNpemUpXG4gICAgICAgICAgICAuZW5hYmxlKHRoaXMub3JpZW50YXRpb24pO1xuXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJ1dHRvblwiKS5saXN0ZW5UbyhcImNsaWNrXCIsIHRoaXMuY2xpY2tlZCwgdGhpcyk7XG4gICAgICAgIENhbnZhc1Jvb3QubGlzdGVuVG9Gb2N1c0VzY2FwZSh0aGlzLmNvbXBvbmVudC5nZXQoXCJwb3BVcFBhbmVsUm9vdFwiKSwgdGhpcy5oaWRlLCB0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudH0gcG9wVXBQYW5lbENvbnRlbnQgXG4gICAgICovXG4gICAgc2V0UGFuZWxDb250ZW50KHBvcFVwUGFuZWxDb250ZW50KSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImNvbnRlbnRcIikuc2V0Q2hpbGQocG9wVXBQYW5lbENvbnRlbnQuY29tcG9uZW50KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDb250YWluZXJFdmVudH0gZXZlbnQgXG4gICAgICovXG4gICAgY2xpY2tlZChldmVudCkge1xuICAgICAgICB0aGlzLnRvZ2dsZUNvbnRlbnQoKTtcbiAgICB9XG5cbiAgICB0b2dnbGVDb250ZW50KCkge1xuICAgICAgICBpZiAoIVN0eWxlQWNjZXNzb3IuZnJvbSh0aGlzLmNvbXBvbmVudC5nZXQoXCJhcnJvd1wiKSkuaXMoXCJkaXNwbGF5XCIsXCJibG9ja1wiKSkge1xuICAgICAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNob3coKSB7XG4gICAgICAgIFN0eWxlU2VsZWN0b3JBY2Nlc3Nvci5mcm9tKHRoaXMuY29tcG9uZW50LmdldChcImNvbnRlbnRcIikpXG4gICAgICAgICAgICAuZGlzYWJsZShQb3BVcFBhbmVsLkNPTlRFTlRfSElEREVOKVxuICAgICAgICAgICAgLmVuYWJsZShQb3BVcFBhbmVsLkNPTlRFTlRfVklTSUJMRSk7XG4gICAgICAgIFN0eWxlQWNjZXNzb3IuZnJvbSh0aGlzLmNvbXBvbmVudC5nZXQoXCJhcnJvd1wiKSlcbiAgICAgICAgICAgIC5zZXQoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIik7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImNvbnRlbnRcIikuY29udGFpbmVyRWxlbWVudC5mb2N1cygpO1xuICAgIH1cblxuICAgIGhpZGUoKSB7XG4gICAgICAgIFN0eWxlU2VsZWN0b3JBY2Nlc3Nvci5mcm9tKHRoaXMuY29tcG9uZW50LmdldChcImNvbnRlbnRcIikpXG4gICAgICAgICAgICAuZGlzYWJsZShQb3BVcFBhbmVsLkNPTlRFTlRfVklTSUJMRSlcbiAgICAgICAgICAgIC5lbmFibGUoUG9wVXBQYW5lbC5DT05URU5UX0hJRERFTik7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImFycm93XCIpLnNldFN0eWxlKFwiZGlzcGxheVwiLCBcIm5vbmVcIik7XG4gICAgfVxuXG4gICAgZGlzYWJsZSgpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYnV0dG9uXCIpLnNldEF0dHJpYnV0ZVZhbHVlKFwiZGlzYWJsZWRcIiwgXCJ0cnVlXCIpO1xuICAgIH1cblxuICAgIGVuYWJsZSgpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYnV0dG9uXCIpLnJlbW92ZUF0dHJpYnV0ZShcImRpc2FibGVkXCIpO1xuICAgIH1cbn1cblxuVHlwZUNvbmZpZ1BhY2suaW5zdGFuY2UoKS5hZGRUeXBlQ29uZmlnKFwibnV0dGluMmMtdWlcIiwgUHJvdG90eXBlQ29uZmlnLnVubmFtZWQoUG9wVXBQYW5lbCkpOyIsImltcG9ydCB7IFRpbWVQcm9taXNlIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5pbXBvcnQgeyBCYXNlRWxlbWVudCxcbiAgICBDYW52YXNTdHlsZXMsXG4gICAgQ29tcG9uZW50LFxuICAgIFN0eWxlU2VsZWN0b3JBY2Nlc3NvcixcbiAgICBTdHlsZXNoZWV0QnVpbGRlcixcbiAgICBDb21wb25lbnRCdWlsZGVyLFxuICAgIFN0eWxlc2hlZXQsXG4gICAgSW5saW5lQ29tcG9uZW50RmFjdG9yeSxcbiAgICBDc3MzU3R5bGVzaGVldEJ1aWxkZXJcbn0gZnJvbSBcIm51dHRpbjJjLWNvcmVfdjFcIjtcbmltcG9ydCB7IEluamVjdGlvblBvaW50LCBQcm90b3R5cGVDb25maWcsIFR5cGVDb25maWdQYWNrIH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5cbmV4cG9ydCBjbGFzcyBTbGlkZURlY2tFbnRyeSB7XG5cbiAgICBzdGF0aWMgREVGQVVMVF9DTEFTUyA9IFwic2xpZGUtZGVjay1lbnRyeVwiO1xuXG4gICAgc3RhdGljIEVOVFJZX1BPU0lUSU9OX0ZST05UID0gXCJwb3NpdGlvbi1mcm9udFwiO1xuICAgIHN0YXRpYyBFTlRSWV9QT1NJVElPTl9CRUhJTkQgPSBcInBvc2l0aW9uLWJlaGluZFwiO1xuICAgIHN0YXRpYyBFTlRSWV9QT1NJVElPTl9SSUdIVCA9IFwicG9zaXRpb24tcmlnaHRcIjtcblxuICAgIHN0YXRpYyBDT05URU5UX0VYSVNUQU5DRV9QUkVTRU5UID0gXCJleGlzdGFuY2UtcHJlc2VudFwiO1xuICAgIHN0YXRpYyBDT05URU5UX0VYSVNUQU5DRV9SRU1PVkVEID0gXCJleGlzdGFuY2UtcmVtb3ZlZFwiO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIC8qKiBAdHlwZSB7SW5saW5lQ29tcG9uZW50RmFjdG9yeX0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoSW5saW5lQ29tcG9uZW50RmFjdG9yeSk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnR9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gbnVsbDtcblxuICAgICAgICAvKiogQHR5cGUge051bWJlcn0gKi9cbiAgICAgICAgdGhpcy5pbmRleCA9IDA7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtTdHJpbmd9ICovXG4gICAgICAgIHRoaXMucG9zaXRpb24gPSBTbGlkZURlY2tFbnRyeS5FTlRSWV9QT1NJVElPTl9GUk9OVDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7U3R5bGVzaGVldH1cbiAgICAgKiBAcGFyYW0ge1N0eWxlc2hlZXRCdWlsZGVyfSBzdHlsZXNoZWV0QnVpbGRlciBcbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRTdHlsZXNoZWV0KHN0eWxlc2hlZXRCdWlsZGVyKSB7XG4gICAgICAgIHJldHVybiBDc3MzU3R5bGVzaGVldEJ1aWxkZXIuY3JlYXRlKHN0eWxlc2hlZXRCdWlsZGVyKVxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnNsaWRlLWRlY2stZW50cnlcIilcbiAgICAgICAgICAgICAgICAucG9zaXRpb24oXCJyZWxhdGl2ZVwiKVxuICAgICAgICAgICAgICAgIC5iYWNrZ3JvdW5kQ29sb3IoXCIjZmZmZmZmXCIpXG4gICAgICAgICAgICAgICAgLmdyaWRDb2x1bW4oXCIxXCIpXG4gICAgICAgICAgICAgICAgLmdyaWRSb3coXCIxXCIpXG4gICAgICAgICAgICAgICAgLndpZHRoKFwiMTAwJVwiKVxuICAgICAgICAgICAgICAgIC5oZWlnaHQoXCIxMDAlXCIpXG4gICAgICAgICAgICAgICAgLm1pbkhlaWdodChcIjBcIilcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnNsaWRlLWRlY2stZW50cnkucG9zaXRpb24tZnJvbnRcIilcbiAgICAgICAgICAgICAgICAudHJhbnNmb3JtKFwidHJhbnNsYXRlKDAlLCAwJSlcIilcbiAgICAgICAgICAgICAgICAudHJhbnNpdGlvbihcInRyYW5zZm9ybSAuNnNcIilcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnNsaWRlLWRlY2stZW50cnkucG9zaXRpb24tYmVoaW5kXCIpXG4gICAgICAgICAgICAgICAgLnRyYW5zZm9ybShcInRyYW5zbGF0ZSgwJSwgMCUpXCIpXG4gICAgICAgICAgICAgICAgLnRyYW5zaXRpb24oXCJ0cmFuc2Zvcm0gLjZzXCIpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5zbGlkZS1kZWNrLWVudHJ5LnBvc2l0aW9uLXJpZ2h0XCIpXG4gICAgICAgICAgICAgICAgLnRyYW5zZm9ybShcInRyYW5zbGF0ZSgrMTA1JSwgMCUpXCIpXG4gICAgICAgICAgICAgICAgLnRyYW5zaXRpb24oXCJ0cmFuc2Zvcm0gLjZzXCIpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5zbGlkZS1kZWNrLWVudHJ5LWNvbnRlbnQuZXhpc3RhbmNlLXJlbW92ZWRcIilcbiAgICAgICAgICAgICAgICAuZGlzcGxheShcIm5vbmVcIilcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnNsaWRlLWRlY2stZW50cnktY29udGVudC5leGlzdGFuY2UtcHJlc2VudFwiKVxuICAgICAgICAgICAgICAgIC5wb3NpdGlvbihcInJlbGF0aXZlXCIpXG4gICAgICAgICAgICAgICAgLmhlaWdodChcIjEwMCVcIilcblxuICAgICAgICAgICAgLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge0NvbXBvbmVudH1cbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudEJ1aWxkZXJ9IGNvbXBvbmVudEJ1aWxkZXIgXG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkQ29tcG9uZW50KGNvbXBvbmVudEJ1aWxkZXIpIHtcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudEJ1aWxkZXJcbiAgICAgICAgICAgIC5yb290KFwiZGl2XCIsIFwiaWQ9c2xpZGVEZWNrRW50cnlcIiwgXCJjbGFzcz1zbGlkZS1kZWNrLWVudHJ5XCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLm5vZGUoXCJkaXZcIiwgXCJpZD1zbGlkZURlY2tFbnRyeUNvbnRlbnRcIiwgXCJjbGFzcz1zbGlkZS1kZWNrLWVudHJ5LWNvbnRlbnRcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAuYnVpbGQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7QmFzZUVsZW1lbnR9XG4gICAgICovXG4gICAgZ2V0IGNvbnRlbnRFbGVtZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb21wb25lbnQuZ2V0KFwic2xpZGVEZWNrRW50cnlDb250ZW50XCIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHtCYXNlRWxlbWVudH1cbiAgICAgKi9cbiAgICBnZXQgZW50cnlFbGVtZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb21wb25lbnQuZ2V0KFwic2xpZGVEZWNrRW50cnlcIik7XG4gICAgfVxuXG4gICAgYXN5bmMgcG9zdENvbmZpZygpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKFNsaWRlRGVja0VudHJ5KTtcbiAgICAgICAgQ2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKFNsaWRlRGVja0VudHJ5Lm5hbWUpO1xuICAgIH1cblxuICAgIHNldEluZGV4KGluZGV4KSB7XG4gICAgICAgIHRoaXMuaW5kZXggPSBpbmRleDtcbiAgICB9XG5cbiAgICBzZXRDb250ZW50KGNvbXBvbmVudCkge1xuICAgICAgICB0aGlzLmNvbnRlbnRFbGVtZW50LnNldENoaWxkKGNvbXBvbmVudCk7XG4gICAgfVxuXG4gICAgc2hvdygpIHtcbiAgICAgICAgdGhpcy5zZXRDb250ZW50VmlzaWJpbGl0eShTbGlkZURlY2tFbnRyeS5DT05URU5UX0VYSVNUQU5DRV9QUkVTRU5UKTtcbiAgICAgICAgdGhpcy5zZXRTaGlmdChTbGlkZURlY2tFbnRyeS5FTlRSWV9QT1NJVElPTl9GUk9OVCk7XG4gICAgfVxuXG4gICAgaGlkZShuZXh0SW5kZXgpIHtcbiAgICAgICAgaWYgKG5leHRJbmRleCA+IHRoaXMuaW5kZXgpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U2hpZnQoU2xpZGVEZWNrRW50cnkuRU5UUllfUE9TSVRJT05fQkVISU5EKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U2hpZnQoU2xpZGVEZWNrRW50cnkuRU5UUllfUE9TSVRJT05fUklHSFQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYWRqdXN0V2hlbkhpZGRlbigpO1xuICAgIH1cblxuICAgIGFkanVzdFdoZW5IaWRkZW4oKSB7XG4gICAgICAgIFRpbWVQcm9taXNlLmFzUHJvbWlzZSg2MDAsICgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLnBvc2l0aW9uID09PSBTbGlkZURlY2tFbnRyeS5FTlRSWV9QT1NJVElPTl9GUk9OVCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc2V0Q29udGVudFZpc2liaWxpdHkoU2xpZGVEZWNrRW50cnkuQ09OVEVOVF9FWElTVEFOQ0VfUkVNT1ZFRCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNldENvbnRlbnRWaXNpYmlsaXR5KGNvbnRlbnRWaXNpYmlsaXR5KSB7XG4gICAgICAgIFN0eWxlU2VsZWN0b3JBY2Nlc3Nvci5mcm9tKHRoaXMuY29udGVudEVsZW1lbnQpLnJlcGxhY2UoXCJleGlzdGFuY2UtXCIsIGNvbnRlbnRWaXNpYmlsaXR5KTtcbiAgICB9XG5cbiAgICBzZXRTaGlmdChwb3NpdGlvbikge1xuICAgICAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XG4gICAgICAgIFN0eWxlU2VsZWN0b3JBY2Nlc3Nvci5mcm9tKHRoaXMuZW50cnlFbGVtZW50KS5yZXBsYWNlKFwicG9zaXRpb24tXCIsIHBvc2l0aW9uKTtcbiAgICB9XG5cbn1cblxuVHlwZUNvbmZpZ1BhY2suaW5zdGFuY2UoKS5hZGRUeXBlQ29uZmlnKFwibnV0dGluMmMtdWlcIiwgUHJvdG90eXBlQ29uZmlnLnVubmFtZWQoU2xpZGVEZWNrRW50cnkpKTsiLCJpbXBvcnQgeyBMaXN0LCBNYXAgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcbmltcG9ydCB7IENhbnZhc1N0eWxlcyxcbiAgICBDb21wb25lbnQsXG4gICAgRXZlbnRNYW5hZ2VyLFxuICAgIFN0eWxlc2hlZXRCdWlsZGVyLFxuICAgIElubGluZUNvbXBvbmVudEZhY3RvcnksXG4gICAgQ3NzM1N0eWxlc2hlZXRCdWlsZGVyXG59IGZyb20gXCJudXR0aW4yYy1jb3JlX3YxXCI7XG5pbXBvcnQgeyBJbmplY3Rpb25Qb2ludCwgUHJvdG90eXBlQ29uZmlnLCBQcm92aWRlciwgVHlwZUNvbmZpZ1BhY2sgfSBmcm9tIFwibWluZGlfdjFcIjtcbmltcG9ydCB7IFNsaWRlRGVja0VudHJ5IH0gZnJvbSBcIi4vc2xpZGVEZWNrRW50cnkvc2xpZGVEZWNrRW50cnkuanNcIjtcblxuZXhwb3J0IGNsYXNzIFNsaWRlRGVjayB7XG5cbiAgICBzdGF0aWMgRVZFTlRfRU5UUllfQ0hBTkdFRCA9IFwiZXZlbnRFbnRyeUNoYW5nZWRcIjtcblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7TWFwPENvbXBvbmVudD59IGNvbXBvbmVudE1hcCBcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihjb21wb25lbnRNYXApIHtcblxuICAgICAgICAvKiogQHR5cGUge0lubGluZUNvbXBvbmVudEZhY3Rvcnl9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKElubGluZUNvbXBvbmVudEZhY3RvcnkpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IG51bGw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtNYXA8Q29tcG9uZW50Pn0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnRNYXAgPSBjb21wb25lbnRNYXA7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtQcm92aWRlcjxTbGlkZURlY2tFbnRyeT59ICovXG4gICAgICAgIHRoaXMuc2xpZGVEZWNrRW50cnlQcm92aWRlciA9IEluamVjdGlvblBvaW50LnByb3ZpZGVyKFNsaWRlRGVja0VudHJ5KTtcblxuICAgICAgICAvKiogQHR5cGUge0xpc3Q8U2xpZGVEZWNrRW50cnk+fSAqL1xuICAgICAgICB0aGlzLnNsaWRlRGVja0VudHJ5TGlzdCA9IG5ldyBMaXN0KCk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtNYXA8U2xpZGVEZWNrRW50cnk+fSAqL1xuICAgICAgICB0aGlzLnNsaWRlRGVja0VudHJ5TWFwID0gbmV3IE1hcCgpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7TWFwPE51bWJlcj59ICovXG4gICAgICAgIHRoaXMuc2xpZGVEZWNrRW50cnlJbmRleE1hcCA9IG5ldyBNYXAoKTtcblxuICAgICAgICAvKiogQHR5cGUge1NsaWRlRGVja0VudHJ5fSAqL1xuICAgICAgICB0aGlzLmN1cnJlbnRFbnRyeSA9IG51bGw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtFdmVudE1hbmFnZXJ9ICovXG4gICAgICAgIHRoaXMuZXZlbnRzID0gbmV3IEV2ZW50TWFuYWdlcigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3R5bGVzaGVldEJ1aWxkZXJ9IHN0eWxlc2hlZXRCdWlsZGVyIFxuICAgICAqIEByZXR1cm5zIFxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZFN0eWxlc2hlZXQoc3R5bGVzaGVldEJ1aWxkZXIpIHtcbiAgICAgICAgcmV0dXJuIENzczNTdHlsZXNoZWV0QnVpbGRlci5jcmVhdGUoc3R5bGVzaGVldEJ1aWxkZXIpXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuc2xpZGUtZGVja1wiKVxuICAgICAgICAgICAgICAgIC5wb3NpdGlvbihcInJlbGF0aXZlXCIpXG4gICAgICAgICAgICAgICAgLmJhY2tncm91bmRDb2xvcihcIiNmMWYxZjFcIilcbiAgICAgICAgICAgICAgICAuZGlzcGxheShcImdyaWRcIilcbiAgICAgICAgICAgICAgICAuaGVpZ2h0KFwiMTAwJVwiKVxuXG4gICAgICAgICAgICAuYnVpbGQoKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgYnVpbGRDb21wb25lbnQoY29tcG9uZW50QnVpbGRlcikge1xuICAgICAgICByZXR1cm4gY29tcG9uZW50QnVpbGRlclxuICAgICAgICAgICAgLnJvb3QoXCJkaXZcIiwgXCJpZD1zbGlkZURlY2tFbnRyaWVzXCIsIFwiY2xhc3M9c2xpZGUtZGVja1wiKVxuICAgICAgICAgICAgLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgYXN5bmMgcG9zdENvbmZpZygpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKFNsaWRlRGVjayk7XG4gICAgICAgIENhbnZhc1N0eWxlcy5lbmFibGVTdHlsZShTbGlkZURlY2submFtZSk7XG5cbiAgICAgICAgaWYgKHRoaXMuY29tcG9uZW50TWFwKSB7XG4gICAgICAgICAgICB0aGlzLnByZXBhcmVFbnRyaWVzKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNjcm9sbGJhY2sgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJzbGlkZURlY2tFbnRyaWVzXCIpLmVsZW1lbnQucGFyZW50RWxlbWVudC5zY3JvbGxUbygwLDApO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIHByZXBhcmVFbnRyaWVzKCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudE1hcC5mb3JFYWNoKGFzeW5jIChrZXksIGNvbXBvbmVudCkgPT4ge1xuXG4gICAgICAgICAgICBjb25zdCBzbGlkZURlY2tFbnRyeSA9IGF3YWl0IHRoaXMuc2xpZGVEZWNrRW50cnlQcm92aWRlci5nZXQoKTtcblxuICAgICAgICAgICAgaWYgKG51bGwgPT0gdGhpcy5jdXJyZW50RW50cnkpIHtcbiAgICAgICAgICAgICAgICBzbGlkZURlY2tFbnRyeS5zaG93KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50RW50cnkgPSBzbGlkZURlY2tFbnRyeTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2xpZGVEZWNrRW50cnkuaGlkZSgwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zbGlkZURlY2tFbnRyeU1hcC5zZXQoa2V5LCBzbGlkZURlY2tFbnRyeSk7XG4gICAgICAgICAgICB0aGlzLnNsaWRlRGVja0VudHJ5TGlzdC5hZGQoc2xpZGVEZWNrRW50cnkpO1xuICAgICAgICAgICAgdGhpcy5zbGlkZURlY2tFbnRyeUluZGV4TWFwLnNldChrZXksIHRoaXMuc2xpZGVEZWNrRW50cnlMaXN0LnNpemUoKSAtMSk7XG5cbiAgICAgICAgICAgIHNsaWRlRGVja0VudHJ5LnNldENvbnRlbnQoY29tcG9uZW50KTtcbiAgICAgICAgICAgIHNsaWRlRGVja0VudHJ5LnNldEluZGV4KHRoaXMuc2xpZGVEZWNrRW50cnlMaXN0LnNpemUoKSAtIDEpO1xuXG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudC5hZGRDaGlsZChcInNsaWRlRGVja0VudHJpZXNcIiwgc2xpZGVEZWNrRW50cnkuY29tcG9uZW50KTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9LCB0aGlzKTtcbiAgICB9XG5cbiAgICBzbGlkZU5leHQoKSB7XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRFbnRyeS5pbmRleCArIDEgPj0gdGhpcy5zbGlkZURlY2tFbnRyeUxpc3Quc2l6ZSgpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbmV4dEVudHJ5ID0gdGhpcy5zbGlkZURlY2tFbnRyeUxpc3QuZ2V0KHRoaXMuY3VycmVudEVudHJ5LmluZGV4ICsgMSk7XG4gICAgICAgIHRoaXMuY3VycmVudEVudHJ5LmhpZGUobmV4dEVudHJ5LmluZGV4KTtcbiAgICAgICAgdGhpcy5jdXJyZW50RW50cnkgPSBuZXh0RW50cnk7XG4gICAgICAgIHRoaXMuY3VycmVudEVudHJ5LnNob3coKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZXZlbnRzLnRyaWdnZXIoU2xpZGVEZWNrLkVWRU5UX0VOVFJZX0NIQU5HRUQpO1xuICAgIH1cblxuICAgIHNsaWRlUHJldmlvdXMoKSB7XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRFbnRyeS5pbmRleCA8PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbmV4dEVudHJ5ID0gdGhpcy5zbGlkZURlY2tFbnRyeUxpc3QuZ2V0KHRoaXMuY3VycmVudEVudHJ5LmluZGV4IC0gMSk7XG4gICAgICAgIHRoaXMuY3VycmVudEVudHJ5LmhpZGUobmV4dEVudHJ5LmluZGV4KTtcbiAgICAgICAgdGhpcy5jdXJyZW50RW50cnkgPSBuZXh0RW50cnk7XG4gICAgICAgIHRoaXMuY3VycmVudEVudHJ5LnNob3coKTtcblxuICAgICAgICB0aGlzLmV2ZW50cy50cmlnZ2VyKFNsaWRlRGVjay5FVkVOVF9FTlRSWV9DSEFOR0VEKTtcbiAgICB9XG5cbiAgICBzbGlkZVRvKG5hbWUpIHtcbiAgICAgICAgY29uc3QgbmV4dEVudHJ5ID0gdGhpcy5zbGlkZURlY2tFbnRyeU1hcC5nZXQobmFtZSk7XG4gICAgICAgIHRoaXMuY3VycmVudEVudHJ5LmhpZGUobmV4dEVudHJ5LmluZGV4KTtcbiAgICAgICAgdGhpcy5jdXJyZW50RW50cnkgPSBuZXh0RW50cnk7XG4gICAgICAgIHRoaXMuY3VycmVudEVudHJ5LnNob3coKTtcblxuICAgICAgICB0aGlzLmV2ZW50cy50cmlnZ2VyKFNsaWRlRGVjay5FVkVOVF9FTlRSWV9DSEFOR0VEKTtcbiAgICB9XG5cbn1cblxuVHlwZUNvbmZpZ1BhY2suaW5zdGFuY2UoKS5hZGRUeXBlQ29uZmlnKFwibnV0dGluMmMtdWlcIiwgUHJvdG90eXBlQ29uZmlnLnVubmFtZWQoU2xpZGVEZWNrKSk7IiwiaW1wb3J0IHtcbiAgICBDYW52YXNTdHlsZXMsXG4gICAgQ29tcG9uZW50LFxuICAgIEV2ZW50TWFuYWdlcixcbiAgICBTdHlsZVNlbGVjdG9yQWNjZXNzb3IsXG4gICAgSFRNTCxcbiAgICBTdHlsZXNoZWV0QnVpbGRlcixcbiAgICBTdHlsZXNoZWV0LFxuICAgIENvbXBvbmVudEJ1aWxkZXIsXG4gICAgSW5saW5lQ29tcG9uZW50RmFjdG9yeVxufSBmcm9tIFwibnV0dGluMmMtY29yZV92MVwiO1xuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQsIFByb3RvdHlwZUNvbmZpZywgVHlwZUNvbmZpZ1BhY2sgfSBmcm9tIFwibWluZGlfdjFcIjtcbmltcG9ydCB7IExvZ2dlciwgTWV0aG9kIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5pbXBvcnQgeyBDb21tb25FdmVudHMgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbW1vbkV2ZW50c1wiO1xuaW1wb3J0IHsgRWxlbWVudFRoZW1lQXBwbGljYXRvciB9IGZyb20gXCIuLi8uLi9jb21tb24vZWxlbWVudFRoZW1lQXBwbGljYXRvclwiO1xuaW1wb3J0IHsgQ29sb3JQYWxldHRlIH0gZnJvbSBcIi4uLy4uL2NvbG9yUGFsZXR0ZVwiO1xuXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiQnV0dG9uXCIpO1xuXG5leHBvcnQgY2xhc3MgQnV0dG9uIHtcblxuICAgIHN0YXRpYyBUWVBFX1BSSU1BUlkgPSBcImJ1dHRvbi1wcmltYXJ5XCI7XG4gICAgc3RhdGljIFRZUEVfU0VDT05EQVJZID0gXCJidXR0b24tc2Vjb25kYXJ5XCI7XG4gICAgc3RhdGljIFRZUEVfU1VDQ0VTUyA9IFwiYnV0dG9uLXN1Y2Nlc3NcIjtcbiAgICBzdGF0aWMgVFlQRV9JTkZPID0gXCJidXR0b24taW5mb1wiO1xuICAgIHN0YXRpYyBUWVBFX1dBUk5JTkcgPSBcImJ1dHRvbi13YXJuaW5nXCI7XG4gICAgc3RhdGljIFRZUEVfREFOR0VSID0gXCJidXR0b24tZGFuZ2VyXCI7XG4gICAgc3RhdGljIFRZUEVfTElHSFQgPSBcImJ1dHRvbi1saWdodFwiO1xuICAgIHN0YXRpYyBUWVBFX0RBUksgPSBcImJ1dHRvbi1kYXJrXCI7XG5cbiAgICBzdGF0aWMgU0laRV9NRURJVU0gPSBcImJ1dHRvbi1tZWRpdW1cIjtcbiAgICBzdGF0aWMgU0laRV9MQVJHRSA9IFwiYnV0dG9uLWxhcmdlXCI7XG5cbiAgICBzdGF0aWMgU1BJTk5FUl9WSVNJQkxFID0gXCJzcGlubmVyLWNvbnRhaW5lci12aXNpYmxlXCI7XG4gICAgc3RhdGljIFNQSU5ORVJfSElEREVOID0gXCJzcGlubmVyLWNvbnRhaW5lci1oaWRkZW5cIjtcblxuICAgIHN0YXRpYyBFVkVOVF9DTElDS0VEID0gQ29tbW9uRXZlbnRzLkNMSUNLRUQ7XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbGFiZWxcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gYnV0dG9uVHlwZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpY29uQ2xhc3NcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihsYWJlbCwgYnV0dG9uVHlwZSA9IEJ1dHRvbi5UWVBFX1BSSU1BUlksIGJ1dHRvblNpemUgPSBCdXR0b24uU0laRV9NRURJVU0sIGljb25DbGFzcykge1xuXG4gICAgICAgIC8qKiBAdHlwZSB7SW5saW5lQ29tcG9uZW50RmFjdG9yeX0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoSW5saW5lQ29tcG9uZW50RmFjdG9yeSk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnR9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gbnVsbDtcblxuICAgICAgICAvKiogQHR5cGUge1N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5sYWJlbCA9IGxhYmVsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7U3RyaW5nfSAqL1xuICAgICAgICB0aGlzLmJ1dHRvblR5cGUgPSBidXR0b25UeXBlO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7U3RyaW5nfSAqL1xuICAgICAgICB0aGlzLmJ1dHRvblNpemUgPSBidXR0b25TaXplO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7U3RyaW5nfSAqL1xuICAgICAgICB0aGlzLmljb25DbGFzcyA9IGljb25DbGFzcztcblxuICAgICAgICAvKiogQHR5cGUge0V2ZW50TWFuYWdlcjxCdXR0b24+fSAqL1xuICAgICAgICB0aGlzLmV2ZW50TWFuYWdlciA9IG5ldyBFdmVudE1hbmFnZXIoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0eWxlc2hlZXRCdWlsZGVyfSBzdHlsZXNoZWV0QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyB7U3R5bGVzaGVldH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRTdHlsZXNoZWV0KHN0eWxlc2hlZXRCdWlsZGVyKSB7XG4gICAgICAgIHN0eWxlc2hlZXRCdWlsZGVyXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYnV0dG9uLW91dGxpbmVcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIFwiaW5saW5lLWJsb2NrXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidmVydGljYWwtYWxpZ25cIiwgXCJtaWRkbGVcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYnV0dG9uXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLCBcImlubGluZS1ibG9ja1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtd2VpZ2h0XCIsIFwiNDAwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCIjMjEyNTI5XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidGV4dC1hbGlnblwiLCBcImNlbnRlclwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInZlcnRpY2FsLWFsaWduXCIsIFwibWlkZGxlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiLXdlYmtpdC11c2VyLXNlbGVjdFwiLCBcIm5vbmVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCItbW96LXVzZXItc2VsZWN0XCIsIFwibm9uZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIi1tcy11c2VyLXNlbGVjdFwiLCBcIm5vbmVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ1c2VyLXNlbGVjdFwiLCBcIm5vbmVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwidHJhbnNwYXJlbnRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXJcIiwgXCIxcHggc29saWQgdHJhbnNwYXJlbnRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwYWRkaW5nXCIsIFwiMC4zNzVyZW0gMC43NXJlbVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImxpbmUtaGVpZ2h0XCIsIFwiMS41XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyLXJhZGl1c1wiLCBcIjAuMjVyZW1cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2l0aW9uXCIsIFwiY29sb3IgMC4xNXMgZWFzZS1pbi1vdXQsIGJhY2tncm91bmQtY29sb3IgMC4xNXMgZWFzZS1pbi1vdXQsIGJvcmRlci1jb2xvciAwLjE1cyBlYXNlLWluLW91dCwgYm94LXNoYWRvdyAwLjE1cyBlYXNlLWluLW91dFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmJ1dHRvbi1tZWRpdW1cIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmb250LXNpemVcIiwgXCIxcmVtXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYnV0dG9uLWxhcmdlXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZm9udC1zaXplXCIsIFwiMS41cmVtXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYnV0dG9uOmhvdmVyXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCIjMjEyNTI5XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidGV4dC1kZWNvcmF0aW9uXCIsIFwibm9uZVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmJ1dHRvbjpmb2N1cywgLmJ1dHRvbi5mb2N1c1wiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm91dGxpbmVcIiwgXCIwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm94LXNoYWRvd1wiLCBcIjAgMCAwIDAuMnJlbSByZ2JhKDAsIDEyMywgMjU1LCAwLjI1KVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmJ1dHRvbi5kaXNhYmxlZCwgLmJ1dHRvbjpkaXNhYmxlZFwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwLjY1XCIpXG4gICAgICAgICAgICAuY2xvc2UoKTtcblxuICAgICAgICBFbGVtZW50VGhlbWVBcHBsaWNhdG9yLmFwcGx5KHN0eWxlc2hlZXRCdWlsZGVyLCBcImJ1dHRvblwiLCBcInByaW1hcnlcIixcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5QUklNQVJZX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5QUklNQVJZX0hPVkVSX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5QUklNQVJZX0RJU0FCTEVEX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5QUklNQVJZX0FDVElWRV9DT0xPUlMsXG4gICAgICAgICAgICBcIjAgMCAwIDAuMnJlbSByZ2JhKDEzMCwgMTM4LCAxNDUsIDAuNSlcIiwgLy8gYm94U2hhZG93Rm9jdXNcbiAgICAgICAgICAgIFwiMCAwIDAgMC4ycmVtIHJnYmEoMTMwLCAxMzgsIDE0NSwgMC41KVwiKTsgLy8gYm94U2hhZG93QWN0aXZlRm9jdXNcblxuXG4gICAgICAgIEVsZW1lbnRUaGVtZUFwcGxpY2F0b3IuYXBwbHkoc3R5bGVzaGVldEJ1aWxkZXIsIFwiYnV0dG9uXCIsIFwic2Vjb25kYXJ5XCIsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuU0VDT05EQVJZX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5TRUNPTkRBUllfSE9WRVJfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLlNFQ09OREFSWV9ESVNBQkxFRF9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuU0VDT05EQVJZX0FDVElWRV9DT0xPUlMsXG4gICAgICAgICAgICBcIjAgMCAwIDAuMnJlbSByZ2JhKDEzMCwgMTM4LCAxNDUsIDAuNSlcIiwgLy8gYm94U2hhZG93Rm9jdXNcbiAgICAgICAgICAgIFwiMCAwIDAgMC4ycmVtIHJnYmEoMTMwLCAxMzgsIDE0NSwgMC41KVwiKTsgLy8gYm94U2hhZG93QWN0aXZlRm9jdXNcbiAgICAgICAgXG4gICAgICAgIEVsZW1lbnRUaGVtZUFwcGxpY2F0b3IuYXBwbHkoc3R5bGVzaGVldEJ1aWxkZXIsIFwiYnV0dG9uXCIsIFwic3VjY2Vzc1wiLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLlNVQ0NFU1NfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLlNVQ0NFU1NfSE9WRVJfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLlNVQ0NFU1NfRElTQUJMRURfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLlNVQ0NFU1NfQUNUSVZFX0NPTE9SUyxcbiAgICAgICAgICAgIFwiMCAwIDAgMC4ycmVtIHJnYmEoNzIsIDE4MCwgOTcsIDAuNSlcIiwgLy8gYm94U2hhZG93Rm9jdXNcbiAgICAgICAgICAgIFwiMCAwIDAgMC4ycmVtIHJnYmEoNzIsIDE4MCwgOTcsIDAuNSlcIik7IC8vIGJveFNoYWRvd0FjdGl2ZUZvY3VzXG5cbiAgICAgICAgRWxlbWVudFRoZW1lQXBwbGljYXRvci5hcHBseShzdHlsZXNoZWV0QnVpbGRlciwgXCJidXR0b25cIiwgXCJpbmZvXCIsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuSU5GT19DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuSU5GT19IT1ZFUl9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuSU5GT19ESVNBQkxFRF9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuSU5GT19BQ1RJVkVfQ09MT1JTLFxuICAgICAgICAgICAgXCIwIDAgMCAwLjJyZW0gcmdiYSg1OCwgMTc2LCAxOTUsIDAuNSlcIiwgLy8gYm94U2hhZG93Rm9jdXNcbiAgICAgICAgICAgIFwiMCAwIDAgMC4ycmVtIHJnYmEoNTgsIDE3NiwgMTk1LCAwLjUpXCIpOyAvLyBib3hTaGFkb3dBY3RpdmVGb2N1c1xuXG4gICAgICAgIEVsZW1lbnRUaGVtZUFwcGxpY2F0b3IuYXBwbHkoc3R5bGVzaGVldEJ1aWxkZXIsIFwiYnV0dG9uXCIsIFwid2FybmluZ1wiLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLldBUk5JTkdfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLldBUk5JTkdfSE9WRVJfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLldBUk5JTkdfRElTQUJMRURfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLldBUk5JTkdfQUNUSVZFX0NPTE9SUyxcbiAgICAgICAgICAgIFwiMCAwIDAgMC4ycmVtIHJnYmEoMjIyLCAxNzAsIDEyLCAwLjUpXCIsIC8vIGJveFNoYWRvd0ZvY3VzXG4gICAgICAgICAgICBcIjAgMCAwIDAuMnJlbSByZ2JhKDIyMiwgMTcwLCAxMiwgMC41KVwiKTsgLy8gYm94U2hhZG93QWN0aXZlRm9jdXNcblxuICAgICAgICBFbGVtZW50VGhlbWVBcHBsaWNhdG9yLmFwcGx5KHN0eWxlc2hlZXRCdWlsZGVyLCBcImJ1dHRvblwiLCBcImRhbmdlclwiLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLkRBTkdFUl9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuREFOR0VSX0hPVkVSX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5EQU5HRVJfRElTQUJMRURfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLkRBTkdFUl9BQ1RJVkVfQ09MT1JTLFxuICAgICAgICAgICAgXCIwIDAgMCAwLjJyZW0gcmdiYSgyMjUsIDgzLCA5NywgMC41KVwiLCAvLyBib3hTaGFkb3dGb2N1c1xuICAgICAgICAgICAgXCIwIDAgMCAwLjJyZW0gcmdiYSgyMjUsIDgzLCA5NywgMC41KVwiKTsgLy8gYm94U2hhZG93QWN0aXZlRm9jdXNcblxuICAgICAgICBFbGVtZW50VGhlbWVBcHBsaWNhdG9yLmFwcGx5KHN0eWxlc2hlZXRCdWlsZGVyLCBcImJ1dHRvblwiLCBcImxpZ2h0XCIsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuTElHSFRfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLkxJR0hUX0hPVkVSX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5MSUdIVF9ESVNBQkxFRF9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuTElHSFRfQUNUSVZFX0NPTE9SUyxcbiAgICAgICAgICAgIFwiMCAwIDAgMC4ycmVtIHJnYmEoMjE2LCAyMTcsIDIxOSwgMC41KVwiLCAvLyBib3hTaGFkb3dGb2N1c1xuICAgICAgICAgICAgXCIwIDAgMCAwLjJyZW0gcmdiYSgyMTYsIDIxNywgMjE5LCAwLjUpXCIpOyAvLyBib3hTaGFkb3dBY3RpdmVGb2N1c1xuXG4gICAgICAgIEVsZW1lbnRUaGVtZUFwcGxpY2F0b3IuYXBwbHkoc3R5bGVzaGVldEJ1aWxkZXIsIFwiYnV0dG9uXCIsIFwiZGFya1wiLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLkRBUktfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLkRBUktfSE9WRVJfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLkRBUktfRElTQUJMRURfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLkRBUktfQUNUSVZFX0NPTE9SUyxcbiAgICAgICAgICAgIFwiMCAwIDAgMC4ycmVtIHJnYmEoODIsIDg4LCA5MywgMC41KVwiLCAvLyBib3hTaGFkb3dGb2N1c1xuICAgICAgICAgICAgXCIwIDAgMCAwLjJyZW0gcmdiYSg4MiwgODgsIDkzLCAwLjUpXCIpOyAvLyBib3hTaGFkb3dBY3RpdmVGb2N1c1xuXG4gICAgICAgIHJldHVybiBzdHlsZXNoZWV0QnVpbGRlci5idWlsZCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Q29tcG9uZW50QnVpbGRlcn0gY29tcG9uZW50QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyB7Q29tcG9uZW50fVxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZENvbXBvbmVudChjb21wb25lbnRCdWlsZGVyKSB7XG4gICAgICAgIHJldHVybiBjb21wb25lbnRCdWlsZGVyXG4gICAgICAgICAgICAucm9vdChcImRpdlwiLCBcImNsYXNzPWJ1dHRvbi1vdXRsaW5lXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLm5vZGUoXCJidXR0b25cIiwgXCJjbGFzcz1idXR0b25cIiwgXCJpZD1idXR0b25cIiwgXCJ0eXBlPWJ1dHRvblwiKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwiZGl2XCIsIFwiY2xhc3M9c3Bpbm5lci1jb250YWluZXItaGlkZGVuXCIsIFwiaWQ9c3Bpbm5lckNvbnRhaW5lclwiKVxuICAgICAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAgICAgLm5vZGUoXCJkaXZcIiwgXCJjbGFzcz1zcGlubmVyXCIpXG4gICAgICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAuYnVpbGQoKTtcbiAgICB9XG5cbiAgICAvKiogQHR5cGUge0V2ZW50TWFuYWdlcjxCdXR0b24+fSAqL1xuICAgIGdldCBldmVudHMoKSB7IHJldHVybiB0aGlzLmV2ZW50TWFuYWdlcjsgfVxuXG4gICAgcG9zdENvbmZpZygpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKEJ1dHRvbik7XG4gICAgICAgIENhbnZhc1N0eWxlcy5lbmFibGVTdHlsZShCdXR0b24ubmFtZSk7XG4gICAgICAgIGlmICh0aGlzLmljb25DbGFzcykge1xuICAgICAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYnV0dG9uXCIpLmFkZENoaWxkKEhUTUwuaShcIlwiLCB0aGlzLmljb25DbGFzcykpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmxhYmVsKSB7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJidXR0b25cIikuYWRkQ2hpbGQodGhpcy5sYWJlbCk7XG4gICAgICAgIH1cblxuICAgICAgICBTdHlsZVNlbGVjdG9yQWNjZXNzb3IuZnJvbSh0aGlzLmNvbXBvbmVudC5nZXQoXCJidXR0b25cIikpXG4gICAgICAgICAgICAuZW5hYmxlKFwiYnV0dG9uXCIpXG4gICAgICAgICAgICAuZW5hYmxlKHRoaXMuYnV0dG9uU2l6ZSlcbiAgICAgICAgICAgIC5lbmFibGUodGhpcy5idXR0b25UeXBlKTtcblxuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJidXR0b25cIikubGlzdGVuVG8oXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRNYW5hZ2VyLnRyaWdnZXIoQnV0dG9uLkVWRU5UX0NMSUNLRUQsIGV2ZW50KTtcbiAgICAgICAgfSwgdGhpcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtNZXRob2R9IG1ldGhvZCBcbiAgICAgKi9cbiAgICB3aXRoQ2xpY2tMaXN0ZW5lcihtZXRob2QpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYnV0dG9uXCIpLmxpc3RlblRvKFwiY2xpY2tcIiwgbWV0aG9kKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZW5hYmxlTG9hZGluZygpIHtcbiAgICAgICAgU3R5bGVTZWxlY3RvckFjY2Vzc29yLmZyb20odGhpcy5jb21wb25lbnQuZ2V0KFwic3Bpbm5lckNvbnRhaW5lclwiKSlcbiAgICAgICAgICAgIC5kaXNhYmxlKEJ1dHRvbi5TUElOTkVSX0hJRERFTilcbiAgICAgICAgICAgIC5lbmFibGUoQnV0dG9uLlNQSU5ORVJfVklTSUJMRSk7XG4gICAgfVxuXG4gICAgZGlzYWJsZUxvYWRpbmcoKSB7XG4gICAgICAgIFN0eWxlU2VsZWN0b3JBY2Nlc3Nvci5mcm9tKHRoaXMuY29tcG9uZW50LmdldChcInNwaW5uZXJDb250YWluZXJcIikpXG4gICAgICAgICAgICAuZGlzYWJsZShCdXR0b24uU1BJTk5FUl9WSVNJQkxFKVxuICAgICAgICAgICAgLmVuYWJsZShCdXR0b24uU1BJTk5FUl9ISURERU4pO1xuICAgIH1cblxuICAgIGRpc2FibGUoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJ1dHRvblwiKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImRpc2FibGVkXCIsXCJ0cnVlXCIpO1xuICAgIH1cblxuICAgIGVuYWJsZSgpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYnV0dG9uXCIpLnJlbW92ZUF0dHJpYnV0ZShcImRpc2FibGVkXCIpO1xuICAgIH1cbn1cblxuVHlwZUNvbmZpZ1BhY2suaW5zdGFuY2UoKS5hZGRUeXBlQ29uZmlnKFwibnV0dGluMmMtdWlcIiwgUHJvdG90eXBlQ29uZmlnLnVubmFtZWQoQnV0dG9uKSk7IiwiaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQsIFByb3RvdHlwZUNvbmZpZywgVHlwZUNvbmZpZ1BhY2sgfSBmcm9tIFwibWluZGlfdjFcIjtcbmltcG9ydCB7IENhbnZhc1N0eWxlcyxcbiAgICBDb21wb25lbnQsXG4gICAgQ29tcG9uZW50QnVpbGRlcixcbiAgICBDc3MzU3R5bGVzaGVldEJ1aWxkZXIsXG4gICAgRXZlbnRNYW5hZ2VyLFxuICAgIEhUTUwsXG4gICAgSW5saW5lQ29tcG9uZW50RmFjdG9yeSxcbiAgICBTdHlsZXNoZWV0QnVpbGRlciB9IGZyb20gXCJudXR0aW4yYy1jb3JlX3YxXCI7XG5pbXBvcnQgeyBCdXR0b24gfSBmcm9tIFwiLi4vaW5wdXQvYnV0dG9uL2J1dHRvbi5qc1wiO1xuXG5leHBvcnQgY2xhc3MgVG9vbEJhciB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcblxuICAgICAgICAvKiogQHR5cGUge0lubGluZUNvbXBvbmVudEZhY3Rvcnl9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKElubGluZUNvbXBvbmVudEZhY3RvcnkpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IG51bGw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtFdmVudE1hbmFnZXJ9ICovXG4gICAgICAgIHRoaXMuZXZlbnRNYW5hZ2VyID0gbmV3IEV2ZW50TWFuYWdlcigpO1xuXG5cdFx0LyoqIEB0eXBlIHtCdXR0b259ICovXG5cdFx0dGhpcy5idXR0b25Qcm92aWRlciA9IEluamVjdGlvblBvaW50LnByb3ZpZGVyKEJ1dHRvbik7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtBcnJheTxCdXR0b24+fSAqL1xuICAgICAgICB0aGlzLmJ1dHRvbnMgPSBbXTtcbiAgICB9XG5cblx0YXN5bmMgcG9zdENvbmZpZygpIHtcblx0XHR0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoVG9vbEJhcik7XG5cdFx0Q2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKFRvb2xCYXIubmFtZSk7XG5cdH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBsYWJlbCBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdHlwZSBFLmcuIEJ1dHRvbi5UWVBFX1BSSU1BUllcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGZpbGwgUHVzaGVzIHRoZSBuZXh0IGJ1dHRvbnMgdG8gdGhlIG90aGVyIGVuZCBvZiB0aGUgdG9vbCBiYXJcbiAgICAgKiBAcmV0dXJucyB7QnV0dG9ufVxuICAgICAqL1xuICAgIGFzeW5jIGFkZEJ1dHRvbihsYWJlbCwgdHlwZSA9IEJ1dHRvbi5UWVBFX1BSSU1BUlksIGZpbGwgPSBmYWxzZSkge1xuICAgICAgICBjb25zdCBidXR0b24gPSBhd2FpdCB0aGlzLmJ1dHRvblByb3ZpZGVyLmdldChbbGFiZWwsIHR5cGVdKTtcblxuICAgICAgICBpZiAodGhpcy5idXR0b25zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIC8qKiBAdHlwZSB7U2ltcGxlRWxlbWVudH0gKi9cbiAgICAgICAgICAgIGNvbnN0IHNwYWNlckRpdiA9IEhUTUwuY3VzdG9tKFwiZGl2XCIpO1xuICAgICAgICAgICAgY29uc3Qgc3R5bGUgPSBmaWxsID8gXCJ0b29sLWJhci1maWxsXCIgOiBcInRvb2wtYmFyLXNwYWNlXCI7XG4gICAgICAgICAgICBzcGFjZXJEaXYuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLCBzdHlsZSk7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudC5hZGRDaGlsZChcImJ1dHRvbkNvbnRhaW5lclwiLCBzcGFjZXJEaXYpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqIEB0eXBlIHtTaW1wbGVFbGVtZW50fSAqL1xuICAgICAgICBjb25zdCBidXR0b25EaXYgPSBIVE1MLmN1c3RvbShcImRpdlwiKTtcbiAgICAgICAgYnV0dG9uRGl2LnNldEF0dHJpYnV0ZVZhbHVlKFwiY2xhc3NcIiwgXCJ0b29sLWJhci1idXR0b24tY29udGFpbmVyXCIpO1xuICAgICAgICBidXR0b25EaXYuYWRkQ2hpbGQoYnV0dG9uLmNvbXBvbmVudCk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmNvbXBvbmVudC5hZGRDaGlsZChcImJ1dHRvbkNvbnRhaW5lclwiLCBidXR0b25EaXYpO1xuXG4gICAgICAgIHRoaXMuYnV0dG9ucy5wdXNoKGJ1dHRvbik7XG5cbiAgICAgICAgcmV0dXJuIGJ1dHRvbjtcbiAgICB9XG5cbiAgICByZXZlcnNlQnV0dG9uTGF5b3V0KCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJidXR0b25Db250YWluZXJcIikuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLCBcInRvb2wtYmFyLXJldmVyc2VkXCIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7Q29tcG9uZW50QnVpbGRlcn0gY29tcG9uZW50QnVpbGRlclxuICAgICAqIEByZXR1cm5zIHtDb21wb25lbnR9XG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkQ29tcG9uZW50KGNvbXBvbmVudEJ1aWxkZXIpIHtcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudEJ1aWxkZXJcbiAgICAgICAgICAgIC5yb290KFwiZGl2XCIsIFwiY2xhc3M9dG9vbC1iYXJcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAubm9kZShcImRpdlwiLCBcImlkPWJ1dHRvbkNvbnRhaW5lclwiLCBcImNsYXNzPXRvb2wtYmFyLWNvbnRhaW5lclwiKVxuICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgIC5idWlsZCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHtTdHlsZXNoZWV0fVxuICAgICAqIEBwYXJhbSB7U3R5bGVzaGVldEJ1aWxkZXJ9IHN0eWxlc2hlZXRCdWlsZGVyIFxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZFN0eWxlc2hlZXQoc3R5bGVzaGVldEJ1aWxkZXIpIHtcbiAgICAgICAgcmV0dXJuIENzczNTdHlsZXNoZWV0QnVpbGRlci5jcmVhdGUoc3R5bGVzaGVldEJ1aWxkZXIpXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIudG9vbC1iYXJcIilcbiAgICAgICAgICAgICAgICAuZGlzcGxheShcImZsZXhcIilcbiAgICAgICAgICAgICAgICAuZmxleERpcmVjdGlvbihcInJvd1wiKVxuICAgICAgICAgICAgICAgIC53aWR0aChcIjEwMCVcIilcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnRvb2wtYmFyLXJldmVyc2VkXCIpXG4gICAgICAgICAgICAgICAgLmRpc3BsYXkoXCJmbGV4XCIpXG4gICAgICAgICAgICAgICAgLmZsZXhEaXJlY3Rpb24oXCJyb3ctcmV2ZXJzZVwiKVxuICAgICAgICAgICAgICAgIC53aWR0aChcIjEwMCVcIilcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnRvb2wtYmFyLWNvbnRhaW5lclwiKVxuICAgICAgICAgICAgICAgIC5mbGV4KFwiMFwiLCBcIjFcIiwgXCJhdXRvXCIpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi50b29sLWJhci1idXR0b24tY29udGFpbmVyXCIpXG4gICAgICAgICAgICAgICAgLmZsZXgoXCIwXCIsIFwiMVwiLCBcImF1dG9cIilcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnRvb2wtYmFyLWZpbGxcIilcbiAgICAgICAgICAgICAgICAuZmxleChcIjFcIiwgXCIwXCIsIFwiYXV0b1wiKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIudG9vbC1iYXItc3BhY2VcIilcbiAgICAgICAgICAgICAgICAuZmxleChcIjBcIiwgXCIwXCIsIFwiMC41cmVtXCIpXG5cbiAgICAgICAgICAgIC5idWlsZCgpO1xuICAgIH1cbn1cblxuVHlwZUNvbmZpZ1BhY2suaW5zdGFuY2UoKS5hZGRUeXBlQ29uZmlnKFwibnV0dGluMmMtdWlcIiwgUHJvdG90eXBlQ29uZmlnLnVubmFtZWQoVG9vbEJhcikpOyIsImltcG9ydCB7XG4gICAgVGVtcGxhdGVDb21wb25lbnRGYWN0b3J5LFxuICAgIENhbnZhc1N0eWxlcyxcbiAgICBDb21wb25lbnQsXG4gICAgRXZlbnRNYW5hZ2VyLFxuICAgIElucHV0RWxlbWVudERhdGFCaW5kaW5nLFxuICAgIFN0eWxlc2hlZXRCdWlsZGVyLFxuICAgIFN0eWxlc2hlZXQsXG4gICAgQ29tcG9uZW50QnVpbGRlcixcbiAgICBJbmxpbmVDb21wb25lbnRGYWN0b3J5LFxuICAgIFJhZGlvSW5wdXRFbGVtZW50XG59IGZyb20gXCJudXR0aW4yYy1jb3JlX3YxXCI7XG5pbXBvcnQgeyBJbmplY3Rpb25Qb2ludCwgUHJvdG90eXBlQ29uZmlnLCBUeXBlQ29uZmlnUGFjayB9IGZyb20gXCJtaW5kaV92MVwiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5pbXBvcnQgeyBDb21tb25FdmVudHMgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbW1vbkV2ZW50c1wiO1xuaW1wb3J0IHsgQ29udGFpbmVyRXZlbnQgfSBmcm9tIFwiY29udGFpbmVyYnJpZGdlX3YxXCI7XG5cbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJSYWRpb1RvZ2dsZUljb25cIik7XG5cbmV4cG9ydCBjbGFzcyBSYWRpb1RvZ2dsZUljb24ge1xuICAgIFxuICAgIHN0YXRpYyBFVkVOVF9FTkFCTEVEID0gQ29tbW9uRXZlbnRzLkVOQUJMRUQ7XG4gICAgc3RhdGljIEVWRU5UX0RJU0FCTEVEID0gQ29tbW9uRXZlbnRzLkRJU0FCTEVEO1xuICAgIHN0YXRpYyBFVkVOVF9DSEFOR0VEID0gQ29tbW9uRXZlbnRzLkNIQU5HRUQ7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gbW9kZWxcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihuYW1lID0gXCI/XCIsIG1vZGVsID0gbnVsbCwgaWNvbiA9IFwiZmFzIGZhLXF1ZXN0aW9uXCIsIGxhYmVsID0gbnVsbCkge1xuXG4gICAgICAgIC8qKiBAdHlwZSB7SW5saW5lQ29tcG9uZW50RmFjdG9yeX0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoSW5saW5lQ29tcG9uZW50RmFjdG9yeSk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtFdmVudE1hbmFnZXJ9ICovXG4gICAgICAgIHRoaXMuZXZlbnRzID0gbmV3IEV2ZW50TWFuYWdlcigpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IG51bGw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtvYmplY3R9ICovXG4gICAgICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcblxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcblxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5pY29uID0gaWNvbjtcblxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5sYWJlbCA9IGxhYmVsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Ym9vbGVhbn0gKi9cbiAgICAgICAgdGhpcy5jaGVja2VkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHlsZXNoZWV0QnVpbGRlcn0gc3R5bGVzaGVldEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMge1N0eWxlc2hlZXR9XG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkU3R5bGVzaGVldChzdHlsZXNoZWV0QnVpbGRlcikge1xuICAgICAgICBzdHlsZXNoZWV0QnVpbGRlclxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnJhZGlvLXRvZ2dsZS1pY29uLWNvbnRhaW5lclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgXCJpbmxpbmUtYmxvY2tcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItcmFkaXVzXCIsIFwiNTAlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcInRyYW5zcGFyZW50XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNpdGlvblwiLCBcImJhY2tncm91bmQtY29sb3IgMC4zc1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRleHQtYWxpZ25cIiwgXCJjZW50ZXJcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJhbGlnbi1pdGVtc1wiLCBcImNlbnRlclwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnJhZGlvLXRvZ2dsZS1pY29uLXJhZGlvXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCBcIjBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLCBcImFic29sdXRlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY3Vyc29yXCIsIFwicG9pbnRlclwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnJhZGlvLXRvZ2dsZS1pY29uLWxhYmVsXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY3Vyc29yXCIsIFwicG9pbnRlclwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1yYWRpdXNcIiwgXCI1cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2l0aW9uXCIsIFwiYWxsIDAuM3MgZWFzZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtc2l6ZVwiLCBcIjIwcHRcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5yYWRpby10b2dnbGUtaWNvbi1jb250YWluZXIgaW5wdXRbdHlwZT0ncmFkaW8nXTpub3QoOmlzKDpjaGVja2VkKSkgKyBsYWJlbFwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbG9yXCIsIFwibGlnaHRncmF5XCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucmFkaW8tdG9nZ2xlLWljb24tY29udGFpbmVyIGlucHV0W3R5cGU9J3JhZGlvJ106bm90KDppcyg6Y2hlY2tlZCkpICsgbGFiZWw6aG92ZXJcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjb2xvclwiLCBcImdyYXlcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5yYWRpby10b2dnbGUtaWNvbi1jb250YWluZXIgaW5wdXRbdHlwZT0ncmFkaW8nXTppcyg6Y2hlY2tlZCkgKyBsYWJlbFwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbG9yXCIsIFwiIzIxOTZGM1wiKVxuICAgICAgICAgICAgLmNsb3NlKCk7XG4gICAgICAgIHJldHVybiBzdHlsZXNoZWV0QnVpbGRlci5idWlsZCgpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDb21wb25lbnRCdWlsZGVyfSBjb21wb25lbnRCdWlsZGVyIFxuICAgICAqIEByZXR1cm5zIHtDb21wb25lbnR9XG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkQ29tcG9uZW50KGNvbXBvbmVudEJ1aWxkZXIpIHtcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudEJ1aWxkZXJcbiAgICAgICAgICAgIC5yb290KFwic3BhblwiLCBcImlkPWNvbnRhaW5lclwiLCBcImNsYXNzPXJhZGlvLXRvZ2dsZS1pY29uLWNvbnRhaW5lclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwiaW5wdXRcIiwgXCJpZD1yYWRpb1wiLCBcImNsYXNzPXJhZGlvLXRvZ2dsZS1pY29uLXJhZGlvXCIsIFwidHlwZT1yYWRpb1wiKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwibGFiZWxcIiwgXCJpZD1sYWJlbFwiLCBcImNsYXNzPXJhZGlvLXRvZ2dsZS1pY29uLWxhYmVsXCIpXG4gICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAubm9kZShcImlcIiwgXCJpZD1pY29uXCIsIFwidGl0bGU9XCIpXG4gICAgICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAuYnVpbGQoKTtcbiAgICB9XG5cbiAgICBwb3N0Q29uZmlnKCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoUmFkaW9Ub2dnbGVJY29uKTtcbiAgICAgICAgQ2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKFJhZGlvVG9nZ2xlSWNvbi5uYW1lKTtcblxuICAgICAgICBjb25zdCByYWRpbyA9IHRoaXMuZ2V0UmFkaW8oKTtcbiAgICAgICAgcmFkaW8uc2V0QXR0cmlidXRlVmFsdWUoXCJuYW1lXCIsIHRoaXMubmFtZSk7XG4gICAgICAgIHJhZGlvLmxpc3RlblRvKFwiY2xpY2tcIiwgdGhpcy5jbGlja2VkLCB0aGlzKTtcblxuICAgICAgICBjb25zdCBpZCA9IHJhZGlvLmdldEF0dHJpYnV0ZVZhbHVlKFwiaWRcIik7XG5cbiAgICAgICAgY29uc3QgbGFiZWwgPSB0aGlzLmNvbXBvbmVudC5nZXQoXCJsYWJlbFwiKTtcbiAgICAgICAgbGFiZWwuc2V0QXR0cmlidXRlVmFsdWUoXCJmb3JcIiwgaWQpO1xuXG4gICAgICAgIGNvbnN0IGljb24gPSB0aGlzLmNvbXBvbmVudC5nZXQoXCJpY29uXCIpO1xuICAgICAgICBpY29uLnNldEF0dHJpYnV0ZVZhbHVlKFwiY2xhc3NcIiwgdGhpcy5pY29uKTtcblxuICAgICAgICBpZiAodGhpcy5tb2RlbCkge1xuICAgICAgICAgICAgSW5wdXRFbGVtZW50RGF0YUJpbmRpbmcubGluayh0aGlzLm1vZGVsKS50byhyYWRpbyk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Q29udGFpbmVyRXZlbnR9IGV2ZW50IFxuICAgICAqL1xuICAgIGNsaWNrZWQoZXZlbnQpIHtcbiAgICAgICAgY29uc3Qgb2xkVmFsdWUgPSB0aGlzLmNoZWNrZWQ7XG4gICAgICAgIHRoaXMuY2hlY2tlZCA9IGV2ZW50LnRhcmdldC5jaGVja2VkO1xuXG4gICAgICAgIGlmIChvbGRWYWx1ZSAhPT0gdGhpcy5jaGVja2VkKSB7XG4gICAgICAgICAgICB0aGlzLmV2ZW50cy50cmlnZ2VyKFJhZGlvVG9nZ2xlSWNvbi5FVkVOVF9DSEFOR0VELCBbZXZlbnRdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmNoZWNrZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzLnRyaWdnZXIoUmFkaW9Ub2dnbGVJY29uLkVWRU5UX0VOQUJMRUQsIFtldmVudF0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5ldmVudHMudHJpZ2dlcihSYWRpb1RvZ2dsZUljb24uRVZFTlRfRElTQUJMRUQsIFtldmVudF0pO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgdG9nZ2xlIHN0YXRlIHByb2dyYW1tYXRpY2FsbHlcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGNoZWNrZWQgXG4gICAgICogQHBhcmFtIHtib29sZWFufSBzaWxlbnRcbiAgICAgKi9cbiAgICB0b2dnbGUoY2hlY2tlZCwgc2lsZW50ID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKHRoaXMuY2hlY2tlZCA9PT0gY2hlY2tlZCkge1xuICAgICAgICAgICAgcmV0dXJuOyAvLyBObyBjaGFuZ2VcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNoZWNrZWQgPSBjaGVja2VkO1xuICAgICAgICBpZiAoIXRoaXMuY29tcG9uZW50KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFzaWxlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0UmFkaW8oKS5jb250YWluZXJFbGVtZW50LmNsaWNrKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoZWNrZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0UmFkaW8oKS5jaGVja2VkID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0UmFkaW8oKS5jaGVja2VkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZWZyZXNoQ29sb3JzKCk7XG4gICAgfVxuXG4gICAgLyoqIEByZXR1cm5zIHtSYWRpb0lucHV0RWxlbWVudH0gKi9cbiAgICBnZXRSYWRpbygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tcG9uZW50LmdldChcInJhZGlvXCIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgY3VycmVudCB0b2dnbGUgc3RhdGVcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBpc0NoZWNrZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNoZWNrZWQ7XG4gICAgfVxufVxuXG5UeXBlQ29uZmlnUGFjay5pbnN0YW5jZSgpLmFkZFR5cGVDb25maWcoXCJudXR0aW4yYy11aVwiLCBQcm90b3R5cGVDb25maWcudW5uYW1lZChSYWRpb1RvZ2dsZUljb24pKTsiLCJpbXBvcnQge1xuICAgIENhbnZhc1N0eWxlcyxcbiAgICBDb21wb25lbnQsXG4gICAgRXZlbnRNYW5hZ2VyLFxuICAgIFN0eWxlc2hlZXRCdWlsZGVyLFxuICAgIFN0eWxlc2hlZXQsXG4gICAgQ29tcG9uZW50QnVpbGRlcixcbiAgICBJbmxpbmVDb21wb25lbnRGYWN0b3J5LFxuICAgIENoZWNrYm94SW5wdXRFbGVtZW50XG59IGZyb20gXCJudXR0aW4yYy1jb3JlX3YxXCI7XG5pbXBvcnQgeyBJbmplY3Rpb25Qb2ludCwgUHJvdG90eXBlQ29uZmlnLCBUeXBlQ29uZmlnUGFjayB9IGZyb20gXCJtaW5kaV92MVwiO1xuaW1wb3J0IHsgTG9nZ2VyLCBNZXRob2QgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcbmltcG9ydCB7IENvbW1vbkV2ZW50cyB9IGZyb20gXCIuLi8uLi9jb21tb24vY29tbW9uRXZlbnRzXCI7XG5pbXBvcnQgeyBDb250YWluZXJFdmVudCB9IGZyb20gXCJjb250YWluZXJicmlkZ2VfdjFcIjtcblxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIlRvZ2dsZUljb25cIik7XG5cbmV4cG9ydCBjbGFzcyBUb2dnbGVJY29uIHtcblxuICAgIHN0YXRpYyBUWVBFX1BSSU1BUlkgPSBcInRvZ2dsZUljb24tcHJpbWFyeVwiO1xuICAgIHN0YXRpYyBUWVBFX1NFQ09OREFSWSA9IFwidG9nZ2xlSWNvbi1zZWNvbmRhcnlcIjtcbiAgICBzdGF0aWMgVFlQRV9TVUNDRVNTID0gXCJ0b2dnbGVJY29uLXN1Y2Nlc3NcIjtcbiAgICBzdGF0aWMgVFlQRV9JTkZPID0gXCJ0b2dnbGVJY29uLWluZm9cIjtcbiAgICBzdGF0aWMgVFlQRV9XQVJOSU5HID0gXCJ0b2dnbGVJY29uLXdhcm5pbmdcIjtcbiAgICBzdGF0aWMgVFlQRV9EQU5HRVIgPSBcInRvZ2dsZUljb24tZGFuZ2VyXCI7XG4gICAgc3RhdGljIFRZUEVfTElHSFQgPSBcInRvZ2dsZUljb24tbGlnaHRcIjtcbiAgICBzdGF0aWMgVFlQRV9EQVJLID0gXCJ0b2dnbGVJY29uLWRhcmtcIjtcblxuICAgIHN0YXRpYyBTSVpFX01FRElVTSA9IFwidG9nZ2xlSWNvbi1tZWRpdW1cIjtcbiAgICBzdGF0aWMgU0laRV9MQVJHRSA9IFwidG9nZ2xlSWNvbi1sYXJnZVwiO1xuXG4gICAgc3RhdGljIFNQSU5ORVJfVklTSUJMRSA9IFwidG9nZ2xlSWNvbi1zcGlubmVyLWNvbnRhaW5lci12aXNpYmxlXCI7XG4gICAgc3RhdGljIFNQSU5ORVJfSElEREVOID0gXCJ0b2dnbGVJY29uLXNwaW5uZXItY29udGFpbmVyLWhpZGRlblwiO1xuXG4gICAgc3RhdGljIEVWRU5UX0VOQUJMRUQgPSBDb21tb25FdmVudHMuRU5BQkxFRDtcbiAgICBzdGF0aWMgRVZFTlRfRElTQUJMRUQgPSBDb21tb25FdmVudHMuRElTQUJMRURcblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG1vZGVsXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGxhYmVsXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBjaGVja2VkXG4gICAgICovXG4gICAgY29uc3RydWN0b3IobmFtZSA9IFwiP1wiLCBtb2RlbCA9IG51bGwsIGxhYmVsID0gbnVsbCwgY2hlY2tlZCA9IGZhbHNlKSB7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtJbmxpbmVDb21wb25lbnRGYWN0b3J5fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShJbmxpbmVDb21wb25lbnRGYWN0b3J5KTtcblxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudH0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSBudWxsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7b2JqZWN0fSAqL1xuICAgICAgICB0aGlzLm1vZGVsID0gbW9kZWw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtib29sZWFufSAqL1xuICAgICAgICB0aGlzLmNoZWNrZWQgPSBjaGVja2VkO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7U3RyaW5nfSAqL1xuICAgICAgICB0aGlzLmxhYmVsID0gbGFiZWw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMuZW5hYmxlZEljb24gPSBcImZhcyBmYS1jaXJjbGUtY2hlY2tcIjtcblxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5kaXNhYmxlZEljb24gPSBcImZhcyBmYS1jaXJjbGVcIjtcblxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5kaXNhYmxlZENvbG9yID0gXCJsaWdodGdyYXlcIjtcblxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5lbmFibGVkQ29sb3IgPSBcIiMyMTk2RjNcIjtcblxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5ob3ZlckNvbG9yID0gXCJncmF5XCI7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtFdmVudE1hbmFnZXJ9ICovXG4gICAgICAgIHRoaXMuZXZlbnRzID0gbmV3IEV2ZW50TWFuYWdlcigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3R5bGVzaGVldEJ1aWxkZXJ9IHN0eWxlc2hlZXRCdWlsZGVyIFxuICAgICAqIEByZXR1cm5zIHtTdHlsZXNoZWV0fVxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZFN0eWxlc2hlZXQoc3R5bGVzaGVldEJ1aWxkZXIpIHtcbiAgICAgICAgc3R5bGVzaGVldEJ1aWxkZXJcbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi50b2dnbGUtaWNvbi1jb250YWluZXJcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIFwiaW5saW5lLWJsb2NrXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyLXJhZGl1c1wiLCBcIjUwJVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIiwgXCJ0cmFuc3BhcmVudFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zaXRpb25cIiwgXCJiYWNrZ3JvdW5kLWNvbG9yIDAuM3NcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0ZXh0LWFsaWduXCIsIFwiY2VudGVyXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYWxpZ24taXRlbXNcIiwgXCJjZW50ZXJcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi50b2dnbGUtaWNvbi1yYWRpb1wiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIiwgXCJhYnNvbHV0ZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImN1cnNvclwiLCBcInBvaW50ZXJcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi50b2dnbGUtaWNvbi1sYWJlbFwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImN1cnNvclwiLCBcInBvaW50ZXJcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItcmFkaXVzXCIsIFwiNXB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNpdGlvblwiLCBcImFsbCAwLjNzIGVhc2VcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmb250LXNpemVcIiwgXCIyMHB0XCIpXG4gICAgICAgICAgICAuY2xvc2UoKTtcblxuICAgICAgICByZXR1cm4gc3R5bGVzaGVldEJ1aWxkZXIuYnVpbGQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudEJ1aWxkZXJ9IGNvbXBvbmVudEJ1aWxkZXIgXG4gICAgICogQHJldHVybiB7Q29tcG9uZW50fVxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZENvbXBvbmVudChjb21wb25lbnRCdWlsZGVyKSB7XG4gICAgICAgIHJldHVybiBjb21wb25lbnRCdWlsZGVyXG4gICAgICAgICAgICAucm9vdChcInNwYW5cIiwgXCJpZD1jb250YWluZXJcIiwgXCJjbGFzcz10b2dnbGUtaWNvbi1jb250YWluZXJcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAubm9kZShcImlucHV0XCIsIFwiaWQ9Y2hlY2tib3hcIiwgXCJjbGFzcz10b2dnbGUtaWNvbi1yYWRpb1wiLCBcInR5cGU9Y2hlY2tib3hcIilcbiAgICAgICAgICAgICAgICAubm9kZShcImxhYmVsXCIsIFwiaWQ9bGFiZWxcIiwgXCJjbGFzcz10b2dnbGUtaWNvbi1sYWJlbFwiKVxuICAgICAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAgICAgLm5vZGUoXCJpXCIsIFwiaWQ9aWNvblwiLCBcInRpdGxlPVwiKVxuICAgICAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgcG9zdENvbmZpZygpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKFRvZ2dsZUljb24pO1xuICAgICAgICBDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUoVG9nZ2xlSWNvbi5uYW1lKTtcblxuICAgICAgICBjb25zdCBjaGVja2JveCA9IHRoaXMuZ2V0Q2hlY2tib3goKTtcbiAgICAgICAgY2hlY2tib3guc2V0QXR0cmlidXRlVmFsdWUoXCJuYW1lXCIsIHRoaXMubmFtZSk7XG4gICAgICAgIGNoZWNrYm94Lmxpc3RlblRvKFwiY2hhbmdlXCIsIHRoaXMuY2hhbmdlZCwgdGhpcyk7XG4gICAgICAgIGlmICh0aGlzLmNoZWNrZWQpIHtcbiAgICAgICAgICAgIGNoZWNrYm94LnNldEF0dHJpYnV0ZVZhbHVlKFwiY2hlY2tlZFwiLCBcImNoZWNrZWRcIik7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLmNvbXBvbmVudC5nZXQoXCJjb250YWluZXJcIik7XG4gICAgICAgIGNvbnRhaW5lci5saXN0ZW5UbyhcIm1vdXNlb3ZlclwiLCB0aGlzLmVuYWJsZUhvdmVyLCB0aGlzKTtcbiAgICAgICAgY29udGFpbmVyLmxpc3RlblRvKFwibW91c2VvdXRcIiwgdGhpcy5kaXNhYmxlSG92ZXIsIHRoaXMpO1xuXG4gICAgICAgIGNvbnN0IGlkID0gY2hlY2tib3guZ2V0QXR0cmlidXRlVmFsdWUoXCJpZFwiKTtcblxuICAgICAgICBjb25zdCBsYWJlbCA9IHRoaXMuY29tcG9uZW50LmdldChcImxhYmVsXCIpO1xuICAgICAgICBsYWJlbC5zZXRBdHRyaWJ1dGVWYWx1ZShcImZvclwiLCBpZCk7XG5cbiAgICAgICAgdGhpcy5yZWZyZXNoQ29sb3JzKCk7XG5cbiAgICB9XG5cbiAgICBhc3luYyByZWZyZXNoQ29sb3JzKCkge1xuICAgICAgICBpZiAodGhpcy5jaGVja2VkKSB7XG4gICAgICAgICAgICB0aGlzLmFwcGx5SWNvbih0aGlzLmVuYWJsZWRJY29uKTtcbiAgICAgICAgICAgIHRoaXMuYXBwbHlDb2xvcih0aGlzLmVuYWJsZWRDb2xvcik7XG4gICAgICAgICAgICBcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYXBwbHlJY29uKHRoaXMuZGlzYWJsZWRJY29uKTtcbiAgICAgICAgICAgIHRoaXMuYXBwbHlDb2xvcih0aGlzLmRpc2FibGVkQ29sb3IpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbG9hZEljb25zKGRpc2FibGVkSWNvbiwgZW5hYmxlZEljb24pIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlZEljb24gPSBkaXNhYmxlZEljb247XG4gICAgICAgIHRoaXMuZW5hYmxlZEljb24gPSBlbmFibGVkSWNvbjtcbiAgICAgICAgdGhpcy5jaGVja2VkID8gdGhpcy5hcHBseUljb24odGhpcy5lbmFibGVkSWNvbikgOiB0aGlzLmFwcGx5SWNvbih0aGlzLmRpc2FibGVkSWNvbik7XG4gICAgfVxuXG4gICAgbG9hZENvbG9ycyhkaXNhYmxlZCwgY2hlY2tlZCwgaG92ZXIpIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlZENvbG9yID0gZGlzYWJsZWQ7XG4gICAgICAgIHRoaXMuZW5hYmxlZENvbG9yID0gY2hlY2tlZDtcbiAgICAgICAgdGhpcy5ob3ZlckNvbG9yID0gaG92ZXI7XG4gICAgICAgIHRoaXMuY2hlY2tlZCA/IHRoaXMuYXBwbHlDb2xvcih0aGlzLmVuYWJsZWRDb2xvcikgOiB0aGlzLmFwcGx5Q29sb3IodGhpcy5kaXNhYmxlZENvbG9yKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge01ldGhvZH0gbWV0aG9kIFxuICAgICAqL1xuICAgIHdpdGhDbGlja0xpc3RlbmVyKG1ldGhvZCkge1xuICAgICAgICB0aGlzLmdldENoZWNrYm94KCkubGlzdGVuVG8oXCJjbGlja1wiLCBtZXRob2QpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIHRvZ2dsZSBzdGF0ZSBwcm9ncmFtbWF0aWNhbGx5XG4gICAgICogQHBhcmFtIHtib29sZWFufSBjaGVja2VkIFxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gc2lsZW50XG4gICAgICovXG4gICAgdG9nZ2xlKGNoZWNrZWQsIHNpbGVudCA9IGZhbHNlKSB7XG4gICAgICAgIGlmICh0aGlzLmNoZWNrZWQgPT09IGNoZWNrZWQpIHtcbiAgICAgICAgICAgIHJldHVybjsgLy8gTm8gY2hhbmdlXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jaGVja2VkID0gY2hlY2tlZDtcbiAgICAgICAgaWYgKCF0aGlzLmNvbXBvbmVudCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICghc2lsZW50KSB7XG4gICAgICAgICAgICB0aGlzLmdldENoZWNrYm94KCkuY29udGFpbmVyRWxlbWVudC5jbGljaygpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjaGVja2VkKSB7XG4gICAgICAgICAgICB0aGlzLmdldENoZWNrYm94KCkuY2hlY2tlZCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmdldENoZWNrYm94KCkuY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVmcmVzaENvbG9ycygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEByZXR1cm5zIHtDaGVja2JveElucHV0RWxlbWVudH1cbiAgICAgKi9cbiAgICBnZXRDaGVja2JveCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tcG9uZW50LmdldChcImNoZWNrYm94XCIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7Q29udGFpbmVyRXZlbnR9IGV2ZW50IFxuICAgICAqIEByZXR1cm5zIFxuICAgICAqL1xuICAgIGNoYW5nZWQoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5jaGVja2VkID0gZXZlbnQudGFyZ2V0LmNoZWNrZWQ7XG5cbiAgICAgICAgdGhpcy5yZWZyZXNoQ29sb3JzKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuY2hlY2tlZCkge1xuICAgICAgICAgICAgdGhpcy5ldmVudHMudHJpZ2dlcihUb2dnbGVJY29uLkVWRU5UX0VOQUJMRUQsIGV2ZW50KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5ldmVudHMudHJpZ2dlcihUb2dnbGVJY29uLkVWRU5UX0RJU0FCTEVELCBldmVudCk7XG4gICAgfVxuXG4gICAgYXBwbHlDb2xvcihjb2xvcikge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLmNvbXBvbmVudC5nZXQoXCJjb250YWluZXJcIik7XG4gICAgICAgIGNvbnRhaW5lci5zZXRBdHRyaWJ1dGVWYWx1ZShcInN0eWxlXCIsIFwiY29sb3I6IFwiICsgY29sb3IpO1xuICAgIH1cblxuICAgIGFwcGx5SWNvbihpY29uKSB7XG4gICAgICAgIGNvbnN0IGljb25FbGVtZW50ID0gdGhpcy5jb21wb25lbnQuZ2V0KFwiaWNvblwiKTtcbiAgICAgICAgaWNvbkVsZW1lbnQuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLCBpY29uKTtcbiAgICB9XG5cbiAgICBlbmFibGVIb3ZlcigpIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5jb21wb25lbnQuZ2V0KFwiY29udGFpbmVyXCIpO1xuICAgICAgICBpZiAoIXRoaXMuY2hlY2tlZCkge1xuICAgICAgICAgICAgY29udGFpbmVyLnNldEF0dHJpYnV0ZVZhbHVlKFwic3R5bGVcIiwgXCJjb2xvcjogXCIgKyB0aGlzLmhvdmVyQ29sb3IpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGlzYWJsZUhvdmVyKCkge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLmNvbXBvbmVudC5nZXQoXCJjb250YWluZXJcIik7XG4gICAgICAgIGlmICh0aGlzLmNoZWNrZWQpIHtcbiAgICAgICAgICAgIGNvbnRhaW5lci5zZXRBdHRyaWJ1dGVWYWx1ZShcInN0eWxlXCIsIFwiY29sb3I6IFwiICsgdGhpcy5lbmFibGVkQ29sb3IpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29udGFpbmVyLnNldEF0dHJpYnV0ZVZhbHVlKFwic3R5bGVcIiwgXCJjb2xvcjogXCIgKyB0aGlzLmRpc2FibGVkQ29sb3IpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5UeXBlQ29uZmlnUGFjay5pbnN0YW5jZSgpLmFkZFR5cGVDb25maWcoXCJudXR0aW4yYy11aVwiLCBQcm90b3R5cGVDb25maWcudW5uYW1lZChUb2dnbGVJY29uKSk7IiwiaW1wb3J0IHsgTG9nZ2VyLCBNZXRob2QgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcbmltcG9ydCB7IENvbXBvbmVudCxcblx0RXZlbnRNYW5hZ2VyLFxuXHRTaW1wbGVFbGVtZW50LFxuXHRTdGF0ZU1hbmFnZXIsXG5cdENvbXBvbmVudEJ1aWxkZXIsXG5cdElubGluZUNvbXBvbmVudEZhY3RvcnksXG5cdFN0eWxlU2VsZWN0b3JBY2Nlc3NvclxufSBmcm9tIFwibnV0dGluMmMtY29yZV92MVwiO1xuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQsIFByb3RvdHlwZUNvbmZpZywgUHJvdmlkZXIsIFR5cGVDb25maWdQYWNrIH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5pbXBvcnQgeyBQYW5lbCB9IGZyb20gXCIuLi8uLi9wYW5lbC9wYW5lbC5qc1wiO1xuaW1wb3J0IHsgUmFkaW9Ub2dnbGVJY29uIH0gZnJvbSBcIi4uLy4uL2lucHV0L3JhZGlvVG9nZ2xlSWNvbi9yYWRpb1RvZ2dsZUljb24uanNcIjtcbmltcG9ydCB7IENvbnRhaW5lckV2ZW50IH0gZnJvbSBcImNvbnRhaW5lcmJyaWRnZV92MVwiO1xuaW1wb3J0IHsgVG9nZ2xlSWNvbiB9IGZyb20gXCIuLi8uLi9pbnB1dC90b2dnbGVJY29uL3RvZ2dsZUljb24uanNcIjtcbmltcG9ydCB7IEJhbm5lckxhYmVsIH0gZnJvbSBcIi4uLy4uL2Jhbm5lckxhYmVsL2Jhbm5lckxhYmVsLmpzXCI7XG5cbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJUcmVlUGFuZWxFbnRyeVwiKTtcblxuZXhwb3J0IGNsYXNzIFRyZWVQYW5lbEVudHJ5IHtcblxuXHRzdGF0aWMgUkVDT1JEX0VMRU1FTlRfUkVRVUVTVEVEID0gXCJyZWNvcmRFbGVtZW50UmVxdWVzdGVkXCI7XG5cdHN0YXRpYyBCRUZPUkVfTE9BRF9FTEVNRU5UX1JFUVVFU1RFRCA9IFwiYmVmb3JlTG9hZEVsZW1lbnRSZXF1ZXN0ZWRcIjtcblx0c3RhdGljIFNVQl9SRUNPUkRTX1NUQVRFX1VQREFURV9SRVFVRVNURUQgPSBcInN1YlJlY29yZHNTdGF0ZVVwZGF0ZVJlcXVlc3RlZFwiO1xuXHRzdGF0aWMgRVZFTlRfRVhQQU5EX1RPR0dMRV9PVkVSUklERSA9IFwiZXhwYW5kVG9nZ2xlT3ZlcnJpZGVcIjtcblxuICAgIGNvbnN0cnVjdG9yKHJlY29yZCA9IG51bGwpIHtcblxuXHRcdC8qKiBAdHlwZSB7SW5saW5lQ29tcG9uZW50RmFjdG9yeX0gKi9cblx0XHR0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShJbmxpbmVDb21wb25lbnRGYWN0b3J5KTtcblxuXHRcdC8qKiBAdHlwZSB7Q29tcG9uZW50fSAqL1xuXHRcdHRoaXMuY29tcG9uZW50ID0gbnVsbDtcblxuXHRcdC8qKiBAdHlwZSB7UHJvdmlkZXI8UGFuZWw+fSAqL1xuXHRcdHRoaXMucGFuZWxQcm92aWRlciA9IEluamVjdGlvblBvaW50LnByb3ZpZGVyKFBhbmVsKTtcblxuXHRcdC8qKiBAdHlwZSB7RXZlbnRNYW5hZ2VyfSAqL1xuXHRcdHRoaXMuZXZlbnRNYW5hZ2VyID0gbmV3IEV2ZW50TWFuYWdlcigpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7U3RhdGVNYW5hZ2VyPGFueVtdPn0gKi9cbiAgICAgICAgdGhpcy5hcnJheVN0YXRlID0gbmV3IFN0YXRlTWFuYWdlcigpO1xuXG5cdFx0LyoqIEB0eXBlIHtQcm92aWRlcjxUcmVlUGFuZWxFbnRyeT59ICovXG5cdFx0dGhpcy50cmVlUGFuZWxFbnRyeVByb3ZpZGVyID0gSW5qZWN0aW9uUG9pbnQucHJvdmlkZXIoVHJlZVBhbmVsRW50cnkpO1xuXG5cdFx0LyoqIEB0eXBlIHtUb2dnbGVJY29ufSAqL1xuXHRcdHRoaXMuZXhwYW5kVG9nZ2xlID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoVG9nZ2xlSWNvbik7XG5cblx0XHQvKiogQHR5cGUge0Jhbm5lckxhYmVsfSAqL1xuXHRcdHRoaXMuYmFubmVyTGFiZWwgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShCYW5uZXJMYWJlbCk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHthbnl9ICovXG4gICAgICAgIHRoaXMucmVjb3JkID0gcmVjb3JkO1xuICAgIH1cblxuXHQvKipcblx0ICogXG5cdCAqIEBwYXJhbSB7Q29tcG9uZW50QnVpbGRlcn0gY29tcG9uZW50QnVpbGRlciBcblx0ICogQHJldHVybnMge0NvbXBvbmVudH1cblx0ICovXG5cdHN0YXRpYyBidWlsZENvbXBvbmVudChjb21wb25lbnRCdWlsZGVyKSB7XG5cdFx0cmV0dXJuIGNvbXBvbmVudEJ1aWxkZXJcblx0XHRcdC5yb290KFwiZGl2XCIsIFwiaWQ9cm9vdFwiLCBcInN0eWxlPS0td2lkdGgtMToxMHB0XCIsIFwiY2xhc3M9Y250ciBjbnRyLXJvd3MgY250ci1wcmV2ZW50LXNpemUtY2hhbmdlIGNudHItZ2FwLXNtYWxsXCIpXG5cdFx0XHQub3BlbigpXG5cdFx0XHRcdC5ub2RlKFwiZGl2XCIsIFwiaWQ9cmVjb3JkRWxlbWVudENvbnRhaW5lclwiLCBcImNsYXNzPWNudHIgY250ci1jb2x1bW5zIGNudHItZ3Jvdy1vbmx5IGNudHItZ2FwLXNtYWxsIGNudHItY2VudGVyZWRcIilcblx0XHRcdFx0Lm9wZW4oKVxuXHRcdFx0XHRcdC5ub2RlKFwiZGl2XCIsIFwiaWQ9ZXhwYW5kQnV0dG9uXCIsIFwiY2xhc3M9Y250ci1vdmVycmlkZS1wcmV2ZW50LXNpemUtY2hhbmdlXCIpXG5cdFx0XHRcdFx0Lm5vZGUoXCJkaXZcIiwgXCJjbGFzcz1jbnRyLW92ZXJyaWRlLXNocmluay1vbmx5IHNwaW5uZXItY29udGFpbmVyLWhpZGRlblwiLCBcImlkPXNwaW5uZXJcIilcblx0XHRcdFx0XHQub3BlbigpXG5cdFx0XHRcdFx0XHQubm9kZShcImRpdlwiLCBcImNsYXNzPXNwaW5uZXJcIilcblx0XHRcdFx0XHQuY2xvc2UoKVxuXHRcdFx0XHRcdC5ub2RlKFwiZGl2XCIsIFwiaWQ9cmVjb3JkRWxlbWVudFwiKVxuXHRcdFx0XHQuY2xvc2UoKVxuXG5cdFx0XHRcdC5ub2RlKFwiZGl2XCIsIFwiaWQ9bWVzc2FnZUNvbnRhaW5lclwiLCBcImNsYXNzPWNudHIgY250ci1jb2x1bW5zIGNudHItZ3Jvdy1vbmx5IGNudHItZ2FwLXNtYWxsIGNudHItY2VudGVyZWQgaGlkZGVuXCIpXG5cdFx0XHRcdC5vcGVuKClcblx0XHRcdFx0XHQubm9kZShcImRpdlwiLCBcImlkPW1lc3NhZ2VJbmRlbnRcIiwgXCJjbGFzcz1jbnRyLW92ZXJyaWRlLXByZXZlbnQtc2l6ZS1jaGFuZ2Ugd2lkdGgtMVwiKVxuXHRcdFx0XHRcdC5ub2RlKFwiZGl2XCIsIFwiaWQ9bWVzc2FnZVwiLCBcImNsYXNzPWNudHItZ2FwLXNtYWxsXCIpXG5cdFx0XHRcdC5jbG9zZSgpXG5cblx0XHRcdFx0Lm5vZGUoXCJkaXZcIiwgXCJpZD1idXR0b25zQ29udGFpbmVyXCIsIFwiY2xhc3M9Y250ciBjbnRyLWNvbHVtbnMgY250ci1ncm93LW9ubHkgY250ci1nYXAtc21hbGwgY250ci1jZW50ZXJlZCBoaWRkZW5cIilcblx0XHRcdFx0Lm9wZW4oKVxuXHRcdFx0XHRcdC5ub2RlKFwiZGl2XCIsIFwiaWQ9YnV0dG9uc0luZGVudFwiLCBcImNsYXNzPWNudHItb3ZlcnJpZGUtcHJldmVudC1zaXplLWNoYW5nZSB3aWR0aC0xXCIpXG5cdFx0XHRcdFx0Lm5vZGUoXCJkaXZcIiwgXCJpZD1idXR0b25zXCIsIFwiY2xhc3M9Y250ci1nYXAtc21hbGxcIilcblx0XHRcdFx0LmNsb3NlKClcblxuXHRcdFx0XHQubm9kZShcImRpdlwiLCBcImlkPXN1YnJlY29yZEVsZW1lbnRzQ29udGFpbmVyXCIsIFwiY2xhc3M9Y250ciBjbnRyLWNvbHVtbnMgY250ci1ncm93LW9ubHkgY250ci1nYXAtc21hbGwgY250ci1jZW50ZXJlZCBoaWRkZW5cIilcblx0XHRcdFx0Lm9wZW4oKVxuXHRcdFx0XHRcdC5ub2RlKFwiZGl2XCIsIFwiaWQ9c3VicmVjb3JkSW5kZW50XCIsIFwiY2xhc3M9Y250ci1vdmVycmlkZS1wcmV2ZW50LXNpemUtY2hhbmdlIHdpZHRoLTFcIilcblx0XHRcdFx0XHQubm9kZShcImRpdlwiLCBcImlkPXN1YnJlY29yZEVsZW1lbnRzXCIsIFwiY2xhc3M9Y250ciBjbnRyLXJvd3MgY250ci1nYXAtc21hbGxcIilcblx0XHRcdFx0LmNsb3NlKClcblx0XHRcdC5jbG9zZSgpXG5cdFx0XHQuYnVpbGQoKTtcblx0fVxuXG4gICAgYXN5bmMgcG9zdENvbmZpZygpIHtcblx0XHR0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoVHJlZVBhbmVsRW50cnkpO1xuXG5cdFx0dGhpcy5leHBhbmRUb2dnbGUuZXZlbnRzLmxpc3RlblRvKFJhZGlvVG9nZ2xlSWNvbi5FVkVOVF9FTkFCTEVELCB0aGlzLmxvYWRTdWJSZWNvcmRzQ2xpY2tlZCwgdGhpcyk7XG5cdFx0dGhpcy5leHBhbmRUb2dnbGUuZXZlbnRzLmxpc3RlblRvKFJhZGlvVG9nZ2xlSWNvbi5FVkVOVF9ESVNBQkxFRCwgdGhpcy5oaWRlU3ViUmVjb3Jkc0NsaWNrZWQsIHRoaXMpO1xuXG5cdFx0dGhpcy5jb21wb25lbnQuc2V0Q2hpbGQoXCJleHBhbmRCdXR0b25cIiwgdGhpcy5leHBhbmRUb2dnbGUuY29tcG9uZW50KTtcblxuXHRcdHRoaXMuYmFubmVyTGFiZWwuZXZlbnRzLmxpc3RlblRvKEJhbm5lckxhYmVsLkVWRU5UX0hJRERFTiwgdGhpcy5oaWRlTWVzc2FnZSwgdGhpcyk7XG5cblx0XHR0aGlzLmNvbXBvbmVudC5zZXRDaGlsZChcIm1lc3NhZ2VcIiwgdGhpcy5iYW5uZXJMYWJlbC5jb21wb25lbnQpO1xuXG4gICAgICAgIHRoaXMuYXJyYXlTdGF0ZS5yZWFjdChcblx0XHRcdG5ldyBNZXRob2QodGhpcy5oYW5kbGVEb21haW5DaGFuZ2UsIHRoaXMpLFxuXHRcdFx0bmV3IE1ldGhvZCh0aGlzLmhhbmRsZUVycm9yQ2hhbmdlLHRoaXMpKTtcblxuICAgIH1cblxuXHRhc3luYyBlbmFibGVCb3JkZXIoKSB7XG5cdFx0U3R5bGVTZWxlY3RvckFjY2Vzc29yLmZyb20odGhpcy5jb21wb25lbnQuZ2V0KFwicm9vdFwiKSkuZW5hYmxlKFwiY250ci1yb3VuZC1ib3JkZXJlZFwiKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAcmV0dXJucyB7IEV2ZW50TWFuYWdlciB9XG5cdCAqL1xuXHRnZXQgZXZlbnRzKCkgeyByZXR1cm4gdGhpcy5ldmVudE1hbmFnZXI7IH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgXG4gICAgICovXG4gICAgYXN5bmMgaGFuZGxlRG9tYWluQ2hhbmdlKG9iamVjdCkge1xuXHRcdGlmIChvYmplY3QgaW5zdGFuY2VvZiBBcnJheSkge1xuXG5cdFx0XHR0aGlzLmNvbXBvbmVudC5jbGVhckNoaWxkcmVuKFwic3VicmVjb3JkRWxlbWVudHNcIik7XG5cdFx0XHR0aGlzLnRvZ2dsZUNoaWxkRWxlbWVudHModHJ1ZSk7XG5cdFx0XHR0aGlzLnRvZ2dsZVNwaW5uZXIodHJ1ZSk7XG5cdFx0XHRvYmplY3QuZm9yRWFjaChhc3luYyAocmVjb3JkKSA9PiB7XG5cdFx0XHRcdHRoaXMuY29tcG9uZW50LmFkZENoaWxkKFwic3VicmVjb3JkRWxlbWVudHNcIiwgYXdhaXQgdGhpcy5jcmVhdGVTdWJFbnRyeShyZWNvcmQpKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0XHR0aGlzLnRvZ2dsZVNwaW5uZXIoZmFsc2UpO1xuICAgIH1cblxuXHRoYW5kbGVFcnJvckNoYW5nZShlcnJvcikge1xuXHRcdHRoaXMudG9nZ2xlRXJyb3JNb2RlKGVycm9yKTtcblx0fVxuXG5cdGFzeW5jIHRvZ2dsZUVycm9yTW9kZShlcnJvcikge1xuXHRcdGlmIChlcnJvcikge1xuXHRcdFx0dGhpcy5iYW5uZXJMYWJlbC5zaG93RXJyb3IoZXJyb3IubWVzc2FnZSk7XG5cdFx0XHRTdHlsZVNlbGVjdG9yQWNjZXNzb3IuZnJvbSh0aGlzLmNvbXBvbmVudC5nZXQoXCJtZXNzYWdlQ29udGFpbmVyXCIpKS5kaXNhYmxlKFwiaGlkZGVuXCIpO1xuXHRcdFx0YXdhaXQgdGhpcy50b2dnbGVTcGlubmVyKGZhbHNlKTtcblx0XHRcdGF3YWl0IHRoaXMuaGlkZVN1YlJlY29yZHMoKTtcblx0XHRcdHRoaXMuZXhwYW5kVG9nZ2xlLnRvZ2dsZShmYWxzZSwgdHJ1ZSk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdHRoaXMuYmFubmVyTGFiZWwuaGlkZSgpO1xuXHRcdGF3YWl0IHRoaXMuaGlkZU1lc3NhZ2UoKTtcblx0fVxuXG5cdGFzeW5jIGhpZGVNZXNzYWdlKCkge1xuXHRcdFN0eWxlU2VsZWN0b3JBY2Nlc3Nvci5mcm9tKHRoaXMuY29tcG9uZW50LmdldChcIm1lc3NhZ2VDb250YWluZXJcIikpLmVuYWJsZShcImhpZGRlblwiKTtcblx0fVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHthbnl9IHJlY29yZCBcblx0ICogQHJldHVybnMge1NpbXBsZUVsZW1lbnR9XG4gICAgICovXG4gICAgYXN5bmMgY3JlYXRlU3ViRW50cnkocmVjb3JkKSB7XG5cdFx0Y29uc3QgdHJlZVBhbmVsU3ViRW50cnkgPSBhd2FpdCB0aGlzLnRyZWVQYW5lbEVudHJ5UHJvdmlkZXIuZ2V0KFtyZWNvcmRdKTtcblx0XHRjb25zdCByZWNvcmRFbGVtZW50ID0gYXdhaXQgdGhpcy5ldmVudE1hbmFnZXIudHJpZ2dlcihUcmVlUGFuZWxFbnRyeS5SRUNPUkRfRUxFTUVOVF9SRVFVRVNURUQsIFtudWxsLCByZWNvcmQsIHRyZWVQYW5lbFN1YkVudHJ5LCB0aGlzXSk7XG4gICAgICAgIFxuXHRcdGlmICghcmVjb3JkRWxlbWVudCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdHRyZWVQYW5lbFN1YkVudHJ5LmNvbXBvbmVudC5zZXRDaGlsZChcInJlY29yZEVsZW1lbnRcIiwgcmVjb3JkRWxlbWVudC5jb21wb25lbnQpO1xuXG5cdFx0YXdhaXQgdGhpcy5ldmVudE1hbmFnZXJcblx0XHRcdC50cmlnZ2VyKFRyZWVQYW5lbEVudHJ5LkVWRU5UX0VYUEFORF9UT0dHTEVfT1ZFUlJJREUsIFtudWxsLCB0cmVlUGFuZWxTdWJFbnRyeSwgcmVjb3JkXSk7XG5cblx0XHR0cmVlUGFuZWxTdWJFbnRyeS5ldmVudHNcblx0XHRcdC5saXN0ZW5UbyhUcmVlUGFuZWxFbnRyeS5SRUNPUkRfRUxFTUVOVF9SRVFVRVNURUQsIHRoaXMuZW50cnlSZXF1ZXN0ZWQsIHRoaXMpO1xuXG5cdFx0dHJlZVBhbmVsU3ViRW50cnkuZXZlbnRzXG5cdFx0XHQubGlzdGVuVG8oVHJlZVBhbmVsRW50cnkuRVZFTlRfRVhQQU5EX1RPR0dMRV9PVkVSUklERSwgdGhpcy5leHBhbmRUb2dnbGVPdmVycmlkZSwgdGhpcyk7XG5cblx0XHR0cmVlUGFuZWxTdWJFbnRyeS5ldmVudHNcblx0XHRcdC5saXN0ZW5UbyhUcmVlUGFuZWxFbnRyeS5TVUJfUkVDT1JEU19TVEFURV9VUERBVEVfUkVRVUVTVEVELCB0aGlzLnN1YlJlY29yZHNVcGRhdGVSZXF1ZXN0ZWQsIHRoaXMpO1xuXG5cdFx0cmV0dXJuIHRyZWVQYW5lbFN1YkVudHJ5LmNvbXBvbmVudDtcbiAgICB9XG5cblx0LyoqXG5cdCAqIEBwYXJhbSB7Q29udGFpbmVyRXZlbnR9IGV2ZW50IFxuXHQgKiBAcGFyYW0ge1RyZWVQYW5lbEVudHJ5fSB0cmVlUGFuZWxFbnRyeVxuXHQgKiBAcGFyYW0ge2FueX0gcmVjb3JkXG5cdCAqL1xuXHRhc3luYyBlbnRyeVJlcXVlc3RlZChldmVudCwgcmVjb3JkLCB0cmVlUGFuZWxFbnRyeSwgcGFyZW50VHJlZVBhbmVsRW50cnkpIHtcblx0XHR0cnkge1xuXHRcdFx0cmV0dXJuIGF3YWl0IHRoaXMuZXZlbnRzLnRyaWdnZXIoVHJlZVBhbmVsRW50cnkuUkVDT1JEX0VMRU1FTlRfUkVRVUVTVEVELCBbZXZlbnQsIHJlY29yZCwgdHJlZVBhbmVsRW50cnksIHBhcmVudFRyZWVQYW5lbEVudHJ5XSk7XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdExPRy5lcnJvcihlcnJvcik7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEBwYXJhbSB7Q29udGFpbmVyRXZlbnR9IGV2ZW50IFxuXHQgKiBAcGFyYW0ge1RyZWVQYW5lbEVudHJ5fSB0cmVlUGFuZWxFbnRyeVxuXHQgKiBAcGFyYW0ge2FueX0gcmVjb3JkXG5cdCAqL1xuXHRhc3luYyBleHBhbmRUb2dnbGVPdmVycmlkZShldmVudCwgdHJlZVBhbmVsRW50cnksIHJlY29yZCkge1xuXHRcdHRyeSB7XG5cdFx0XHRyZXR1cm4gYXdhaXQgdGhpcy5ldmVudHMudHJpZ2dlcihUcmVlUGFuZWxFbnRyeS5FVkVOVF9FWFBBTkRfVE9HR0xFX09WRVJSSURFLCBbZXZlbnQsIHRyZWVQYW5lbEVudHJ5LCByZWNvcmRdKTtcblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0TE9HLmVycm9yKGVycm9yKTtcblx0XHR9XG5cdH1cblxuXHRhc3luYyByZWxvYWRTdWJSZWNvcmRzKCkge1xuXHRcdGNvbnN0IGVsZW1lbnRCdXR0b25zQ29udGFpbmVyID0gYXdhaXQgdGhpcy5jb21wb25lbnQuZ2V0KFwiYnV0dG9uc1wiKTtcblx0XHRhd2FpdCB0aGlzLnN1YlJlY29yZHNVcGRhdGVSZXF1ZXN0ZWQobnVsbCwgdGhpcy5yZWNvcmQsIHRoaXMuYXJyYXlTdGF0ZSwgZWxlbWVudEJ1dHRvbnNDb250YWluZXIpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBwYXJhbSB7Q29udGFpbmVyRXZlbnR9IGV2ZW50IFxuXHQgKiBAcGFyYW0ge2FueX0gcmVjb3JkXG5cdCAqIEBwYXJhbSB7U3RhdGVNYW5hZ2VyPGFueVtdPn0gc3RhdGVNYW5hZ2VyXG5cdCAqIEBwYXJhbSB7U2ltcGxlRWxlbWVudH0gZWxlbWVudEJ1dHRvbnNDb250YWluZXJcblx0ICovXG5cdGFzeW5jIHN1YlJlY29yZHNVcGRhdGVSZXF1ZXN0ZWQoZXZlbnQsIHJlY29yZCwgc3RhdGVNYW5hZ2VyLCBlbGVtZW50QnV0dG9uc0NvbnRhaW5lcikge1xuXHRcdGF3YWl0IHRoaXMuZXZlbnRzXG5cdFx0XHQudHJpZ2dlcihUcmVlUGFuZWxFbnRyeS5TVUJfUkVDT1JEU19TVEFURV9VUERBVEVfUkVRVUVTVEVELCBbZXZlbnQsIHJlY29yZCwgc3RhdGVNYW5hZ2VyLCBlbGVtZW50QnV0dG9uc0NvbnRhaW5lcl0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gdmlzaWJsZSBcblx0ICovXG5cdGFzeW5jIHRvZ2dsZVNwaW5uZXIodmlzaWJsZSkge1xuXHRcdGlmICh2aXNpYmxlKSB7XG5cdFx0XHRTdHlsZVNlbGVjdG9yQWNjZXNzb3IuZnJvbSh0aGlzLmNvbXBvbmVudC5nZXQoXCJzcGlubmVyXCIpKS5kaXNhYmxlKFwic3Bpbm5lci1jb250YWluZXItaGlkZGVuXCIpO1xuXHRcdFx0U3R5bGVTZWxlY3RvckFjY2Vzc29yLmZyb20odGhpcy5jb21wb25lbnQuZ2V0KFwic3Bpbm5lclwiKSkuZW5hYmxlKFwic3Bpbm5lci1jb250YWluZXItdmlzaWJsZVwiKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0U3R5bGVTZWxlY3RvckFjY2Vzc29yLmZyb20odGhpcy5jb21wb25lbnQuZ2V0KFwic3Bpbm5lclwiKSkuZW5hYmxlKFwic3Bpbm5lci1jb250YWluZXItaGlkZGVuXCIpO1xuXHRcdFN0eWxlU2VsZWN0b3JBY2Nlc3Nvci5mcm9tKHRoaXMuY29tcG9uZW50LmdldChcInNwaW5uZXJcIikpLmRpc2FibGUoXCJzcGlubmVyLWNvbnRhaW5lci12aXNpYmxlXCIpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gdmlzaWJsZSBcblx0ICovXG5cdGFzeW5jIHRvZ2dsZUNoaWxkRWxlbWVudHModmlzaWJsZSkge1xuXHRcdGlmICh2aXNpYmxlKSB7XG5cdFx0XHRTdHlsZVNlbGVjdG9yQWNjZXNzb3IuZnJvbSh0aGlzLmNvbXBvbmVudC5nZXQoXCJzdWJyZWNvcmRFbGVtZW50c0NvbnRhaW5lclwiKSkuZGlzYWJsZShcImhpZGRlblwiKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0U3R5bGVTZWxlY3RvckFjY2Vzc29yLmZyb20odGhpcy5jb21wb25lbnQuZ2V0KFwic3VicmVjb3JkRWxlbWVudHNDb250YWluZXJcIikpLmVuYWJsZShcImhpZGRlblwiKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBcblx0ICogQHBhcmFtIHtCb29sZWFufSB2aXNpYmxlIFxuXHQgKi9cblx0YXN5bmMgdG9nZ2xlQnV0dG9ucyh2aXNpYmxlKSB7XG5cdFx0aWYgKHZpc2libGUpIHtcblx0XHRcdFN0eWxlU2VsZWN0b3JBY2Nlc3Nvci5mcm9tKHRoaXMuY29tcG9uZW50LmdldChcImJ1dHRvbnNDb250YWluZXJcIikpLmRpc2FibGUoXCJoaWRkZW5cIik7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdFN0eWxlU2VsZWN0b3JBY2Nlc3Nvci5mcm9tKHRoaXMuY29tcG9uZW50LmdldChcImJ1dHRvbnNDb250YWluZXJcIikpLmVuYWJsZShcImhpZGRlblwiKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAcGFyYW0ge0NvbnRhaW5lckV2ZW50fSBldmVudCBcblx0ICovXG4gICAgYXN5bmMgbG9hZFN1YlJlY29yZHNDbGlja2VkKGV2ZW50KSB7XG5cdFx0dGhpcy50b2dnbGVDaGlsZEVsZW1lbnRzKHRydWUpO1xuXHRcdHRoaXMudG9nZ2xlU3Bpbm5lcih0cnVlKTtcblxuXHRcdGNvbnN0IGVsZW1lbnRCdXR0b25zQ29udGFpbmVyID0gYXdhaXQgdGhpcy5jb21wb25lbnQuZ2V0KFwiYnV0dG9uc1wiKTtcblxuXHRcdGF3YWl0IHRoaXMuZXZlbnRNYW5hZ2VyXG5cdFx0XHQudHJpZ2dlcihUcmVlUGFuZWxFbnRyeS5TVUJfUkVDT1JEU19TVEFURV9VUERBVEVfUkVRVUVTVEVELCBbZXZlbnQsIHRoaXMucmVjb3JkLCB0aGlzLmFycmF5U3RhdGUsIGVsZW1lbnRCdXR0b25zQ29udGFpbmVyXSk7XG5cblx0XHRpZiAoZWxlbWVudEJ1dHRvbnNDb250YWluZXIuY29udGFpbmVyRWxlbWVudC5maXJzdENoaWxkKSB7XG5cdFx0XHRhd2FpdCB0aGlzLnRvZ2dsZUJ1dHRvbnModHJ1ZSk7XG5cdFx0fVxuICAgIH1cblxuXHQvKipcblx0ICogQHBhcmFtIHtDb250YWluZXJFdmVudH0gZXZlbnQgXG5cdCAqL1xuICAgIGFzeW5jIGhpZGVTdWJSZWNvcmRzQ2xpY2tlZChldmVudCkge1xuXHRcdGF3YWl0IHRoaXMuaGlkZVN1YlJlY29yZHMoKTtcbiAgICB9XG5cblx0YXN5bmMgaGlkZVN1YlJlY29yZHMoKSB7XG5cdFx0YXdhaXQgdGhpcy50b2dnbGVDaGlsZEVsZW1lbnRzKGZhbHNlKTtcblx0XHRhd2FpdCB0aGlzLnRvZ2dsZVNwaW5uZXIoZmFsc2UpO1xuXHRcdGF3YWl0IHRoaXMudG9nZ2xlQnV0dG9ucyhmYWxzZSk7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcInN1YnJlY29yZEVsZW1lbnRzXCIpLmNsZWFyKCk7XG5cdFx0dGhpcy5jb21wb25lbnQuZ2V0KFwiYnV0dG9uc1wiKS5jbGVhcigpO1xuXHR9XG5cbn1cblxuVHlwZUNvbmZpZ1BhY2suaW5zdGFuY2UoKS5hZGRUeXBlQ29uZmlnKFwibnV0dGluMmMtdWlcIiwgUHJvdG90eXBlQ29uZmlnLnVubmFtZWQoVHJlZVBhbmVsRW50cnkpKTsiLCJpbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcbmltcG9ydCB7IENvbnRhaW5lckV2ZW50IH0gZnJvbSBcImNvbnRhaW5lcmJyaWRnZV92MVwiO1xuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQsIFByb3RvdHlwZUNvbmZpZywgUHJvdmlkZXIsIFR5cGVDb25maWdQYWNrIH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5pbXBvcnQgeyBDb21wb25lbnQsXG5cdEV2ZW50TWFuYWdlcixcblx0U2ltcGxlRWxlbWVudCxcblx0Q29tcG9uZW50QnVpbGRlcixcblx0SW5saW5lQ29tcG9uZW50RmFjdG9yeSB9IGZyb20gXCJudXR0aW4yYy1jb3JlX3YxXCI7XG5cbmltcG9ydCB7IFRyZWVQYW5lbEVudHJ5IH0gZnJvbSBcIi4vdHJlZVBhbmVsRW50cnkvdHJlZVBhbmVsRW50cnkuanNcIjtcbmltcG9ydCB7IFBhbmVsIH0gZnJvbSBcIi4uL3BhbmVsL3BhbmVsLmpzXCI7XG5cblxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIlRyZWVQYW5lbFwiKTtcblxuZXhwb3J0IGNsYXNzIFRyZWVQYW5lbCB7XG5cblx0c3RhdGljIEVWRU5UX1JFRlJFU0hfQ0xJQ0tFRCA9IFwicmVmcmVzaENsaWNrZWRcIjtcblx0c3RhdGljIFJFQ09SRF9FTEVNRU5UX1JFUVVFU1RFRCA9IFwicmVjb3JkRWxlbWVudFJlcXVlc3RlZFwiO1xuXHRzdGF0aWMgQkVGT1JFX0xPQURfRUxFTUVOVF9SRVFVRVNURUQgPSBcImJlZm9yZUxvYWRFbGVtZW50UmVxdWVzdGVkXCI7XG5cdHN0YXRpYyBTVUJfUkVDT1JEU19TVEFURV9VUERBVEVfUkVRVUVTVEVEID0gXCJzdWJSZWNvcmRzU3RhdGVVcGRhdGVSZXF1ZXN0ZWRcIjtcblx0c3RhdGljIEVWRU5UX0VYUEFORF9UT0dHTEVfT1ZFUlJJREUgPSBcImV4cGFuZFRvZ2dsZU92ZXJyaWRlXCI7XG5cblx0LyoqXG5cdCAqIFxuXHQgKiBAcGFyYW0ge1BhbmVsfSBidXR0b25QYW5lbCBcblx0ICovXG5cdGNvbnN0cnVjdG9yKGJ1dHRvblBhbmVsID0gbnVsbCkge1xuXG5cdFx0LyoqIEB0eXBlIHtJbmxpbmVDb21wb25lbnRGYWN0b3J5fSAqL1xuXHRcdHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKElubGluZUNvbXBvbmVudEZhY3RvcnkpO1xuXHRcdFxuXHRcdC8qKiBAdHlwZSB7Q29tcG9uZW50fSAqL1xuXHRcdHRoaXMuY29tcG9uZW50ID0gbnVsbDtcblxuXHRcdC8qKiBAdHlwZSB7RXZlbnRNYW5hZ2VyfSAqL1xuXHRcdHRoaXMuZXZlbnRNYW5hZ2VyID0gbmV3IEV2ZW50TWFuYWdlcigpO1xuXG5cdFx0LyoqIEB0eXBlIHtQcm92aWRlcjxUcmVlUGFuZWxFbnRyeT59ICovXG5cdFx0dGhpcy50cmVlUGFuZWxFbnRyeVByb3ZpZXIgPSBJbmplY3Rpb25Qb2ludC5wcm92aWRlcihUcmVlUGFuZWxFbnRyeSk7XG5cblx0XHQvKiogQHR5cGUge1RyZWVQYW5lbEVudHJ5fSAqL1xuXHRcdHRoaXMudHJlZVBhbmVsRW50cnkgPSBudWxsO1xuXG5cdFx0LyoqIEB0eXBlIHtQYW5lbH0gKi9cblx0XHR0aGlzLmJ1dHRvblBhbmVsID0gYnV0dG9uUGFuZWw7XG5cblx0fVxuXG5cdC8qKlxuXHQgKiBcblx0ICogQHBhcmFtIHtDb21wb25lbnRCdWlsZGVyfSBjb21wb25lbnRCdWlsZGVyIFxuXHQgKiBAcmV0dXJucyB7Q29tcG9uZW50fVxuXHQgKi9cblx0c3RhdGljIGJ1aWxkQ29tcG9uZW50KGNvbXBvbmVudEJ1aWxkZXIpIHtcblx0XHRyZXR1cm4gY29tcG9uZW50QnVpbGRlclxuXHRcdFx0LnJvb3QoXCJkaXZcIiwgXCJjbGFzcz1jbnRyIGNudHItZ2FwLW1lZGl1bSBjbnRyLXJvd3MgY250ci1wcmV2ZW50LXNpemUtY2hhbmdlIHBhZGRpbmctc21hbGxcIilcblx0XHRcdC5vcGVuKClcblx0XHRcdFx0Lm5vZGUoXCJkaXZcIiwgXCJpZD1idXR0b25QYW5lbFwiKVxuXHRcdFx0XHQubm9kZShcImRpdlwiLCBcImlkPXJvb3RFbGVtZW50XCIsIFwiY2xhc3M9Y250ci1vdmVycmlkZS1ncm93LW9ubHkgY250ciBjbnRyLXJvd3MgY250ci1nYXAtc21hbGxcIilcblx0XHRcdC5jbG9zZSgpXG5cdFx0XHQuYnVpbGQoKTtcblx0fVxuXG5cdGFzeW5jIHBvc3RDb25maWcoKSB7XG5cdFx0dGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKFRyZWVQYW5lbCk7XG5cblx0XHRpZiAodGhpcy5idXR0b25QYW5lbCkge1xuXHRcdFx0dGhpcy5jb21wb25lbnQuc2V0Q2hpbGQoXCJidXR0b25QYW5lbFwiLCB0aGlzLmJ1dHRvblBhbmVsLmNvbXBvbmVudCk7XG5cdFx0fVxuXG5cdFx0dGhpcy50cmVlUGFuZWxFbnRyeSA9IGF3YWl0IHRoaXMudHJlZVBhbmVsRW50cnlQcm92aWVyLmdldCgpO1xuXHRcdHRoaXMudHJlZVBhbmVsRW50cnkuZXZlbnRzXG5cdFx0XHQubGlzdGVuVG8oVHJlZVBhbmVsRW50cnkuUkVDT1JEX0VMRU1FTlRfUkVRVUVTVEVELCB0aGlzLmVudHJ5UmVxdWVzdGVkLCB0aGlzKVxuXHRcdFx0Lmxpc3RlblRvKFRyZWVQYW5lbEVudHJ5LkVWRU5UX0VYUEFORF9UT0dHTEVfT1ZFUlJJREUsIHRoaXMuZXhwYW5kVG9nZ2xlT3ZlcnJpZGUsIHRoaXMpXG5cdFx0XHQubGlzdGVuVG8oVHJlZVBhbmVsRW50cnkuU1VCX1JFQ09SRFNfU1RBVEVfVVBEQVRFX1JFUVVFU1RFRCwgdGhpcy5zdWJSZWNvcmRzVXBkYXRlUmVxdWVzdGVkLCB0aGlzKTtcblx0XHR0aGlzLnRyZWVQYW5lbEVudHJ5LnRvZ2dsZVNwaW5uZXIodHJ1ZSk7XG5cdFx0Ly8gUm9vdCBlbGVtZW50IGhhcyBubyByZWNvcmRcblx0XHR0aGlzLnRyZWVQYW5lbEVudHJ5LmNvbXBvbmVudC5nZXQoXCJzdWJyZWNvcmRJbmRlbnRcIikucmVtb3ZlKCk7XG5cdFx0dGhpcy50cmVlUGFuZWxFbnRyeS5jb21wb25lbnQuZ2V0KFwibWVzc2FnZUluZGVudFwiKS5yZW1vdmUoKTtcblx0XHR0aGlzLnRyZWVQYW5lbEVudHJ5LmNvbXBvbmVudC5nZXQoXCJyZWNvcmRFbGVtZW50Q29udGFpbmVyXCIpLnJlbW92ZSgpO1xuXG5cdH1cblxuXHQvKipcblx0ICogQHR5cGUgeyBFdmVudE1hbmFnZXIgfVxuXHQgKi9cblx0Z2V0IGV2ZW50cygpIHsgcmV0dXJuIHRoaXMuZXZlbnRNYW5hZ2VyOyB9XG5cblx0LyoqXG5cdCAqIENhbGxlZCBieSB0aGUgcm9vdCBUcmVlUGFuZWxFbnRyeSB3aGVuIGl0J3Mgb3Igb25lIG9mIGl0J3Mgc3Vib3JkaW5hdGUgZWxlbWVudHMgbmVlZCB0byBiZSByZW5kZXJlZFxuXHQgKiBcblx0ICogQHBhcmFtIHtDb250YWluZXJFdmVudH0gZXZlbnQgXG5cdCAqIEBwYXJhbSB7VHJlZVBhbmVsRW50cnl9IHRyZWVQYW5lbEVudHJ5XG5cdCAqIEBwYXJhbSB7YW55fSByZWNvcmRcblx0ICovXG5cdGFzeW5jIGVudHJ5UmVxdWVzdGVkKGV2ZW50LCByZWNvcmQsIHRyZWVQYW5lbEVudHJ5LCBwYXJlbnRUcmVlUGFuZWxFbnRyeSkge1xuXHRcdHRyeSB7XG5cblx0XHRcdC8qKiBAdHlwZSB7YW55fSAqL1xuXHRcdFx0Y29uc3QgcGFuZWwgPSBhd2FpdCB0aGlzLmV2ZW50c1xuXHRcdFx0XHQudHJpZ2dlcihUcmVlUGFuZWwuUkVDT1JEX0VMRU1FTlRfUkVRVUVTVEVELCBbZXZlbnQsIHJlY29yZCwgdHJlZVBhbmVsRW50cnksIHBhcmVudFRyZWVQYW5lbEVudHJ5XSk7XG5cblx0XHRcdHJldHVybiBwYW5lbDtcblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0TE9HLmVycm9yKGVycm9yKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogQ2FsbGVkIGJ5IHRoZSByb290IFRyZWVQYW5lbEVudHJ5IGl0IGFza3MgZm9yIHRoZSBleHBhbmQgdG9nZ2xlIHRvIGJlIG92ZXJyaWRkZW5cblx0ICogXG5cdCAqIEBwYXJhbSB7Q29udGFpbmVyRXZlbnR9IGV2ZW50IFxuXHQgKiBAcGFyYW0ge1RyZWVQYW5lbEVudHJ5fSB0cmVlUGFuZWxFbnRyeVxuXHQgKiBAcGFyYW0ge2FueX0gcmVjb3JkXG5cdCAqL1xuXHRhc3luYyBleHBhbmRUb2dnbGVPdmVycmlkZShldmVudCwgdHJlZVBhbmVsRW50cnksIHJlY29yZCkge1xuXHRcdHRyeSB7XG5cdFx0XHRhd2FpdCB0aGlzLmV2ZW50c1xuXHRcdFx0XHQudHJpZ2dlcihUcmVlUGFuZWwuRVZFTlRfRVhQQU5EX1RPR0dMRV9PVkVSUklERSwgW3RyZWVQYW5lbEVudHJ5LmV4cGFuZFRvZ2dsZSwgcmVjb3JkXSk7XG5cblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0TE9HLmVycm9yKGVycm9yKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogQ2FsbGVkIGJ5IHRoZSByb290IFRyZWVQYW5lbEVudHJ5IHdoZW4gaXQncyBvciBvbmUgb2YgaXQncyBzdWJvcmRpbmF0ZSBlbGVtZW50cyBuZWVkIHRoZSBzdGF0ZSBvZiB0aGUgc3VicmVjb3JkcyB0byBiZSB1cGRhdGVkLFxuXHQgKiBmb3IgZXhhbXBsZSB3aGVuIHRoZSBleHBhbmQgYnV0dG9uIGlzIGNsaWNrZWRcblx0ICogXG5cdCAqIEBwYXJhbSB7Q29udGFpbmVyRXZlbnR9IGV2ZW50IFxuXHQgKiBAcGFyYW0ge2FueX0gcmVjb3JkXG5cdCAqIEBwYXJhbSB7U3RhdGVNYW5hZ2VyPGFueVtdPn0gc3RhdGVNYW5hZ2VyXG5cdCAqIEBwYXJhbSB7U2ltcGxlRWxlbWVudH0gZWxlbWVudEJ1dHRvbnNDb250YWluZXJcblx0ICogQHJldHVybnMge1Byb21pc2U8VHJlZVBhbmVsRW50cnlbXT59XG5cdCAqL1xuXHRhc3luYyBzdWJSZWNvcmRzVXBkYXRlUmVxdWVzdGVkKGV2ZW50LCByZWNvcmQsIHN0YXRlTWFuYWdlciwgZWxlbWVudEJ1dHRvbnNDb250YWluZXIpIHtcblx0XHR0aGlzLnRyZWVQYW5lbEVudHJ5LnRvZ2dsZUNoaWxkRWxlbWVudHModHJ1ZSk7XG5cdFx0YXdhaXQgdGhpcy5ldmVudHNcblx0XHRcdC50cmlnZ2VyKFRyZWVQYW5lbC5TVUJfUkVDT1JEU19TVEFURV9VUERBVEVfUkVRVUVTVEVELCBbZXZlbnQsIHJlY29yZCwgc3RhdGVNYW5hZ2VyLCBlbGVtZW50QnV0dG9uc0NvbnRhaW5lcl0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJlc2V0XG5cdCAqIFxuXHQgKiBAcGFyYW0ge0NvbnRhaW5lckV2ZW50fSBldmVudCBcblx0ICovXG5cdGFzeW5jIHJlc2V0KGV2ZW50KSB7XG5cdFx0dGhpcy5zdWJSZWNvcmRzVXBkYXRlUmVxdWVzdGVkKGV2ZW50LCBudWxsLCB0aGlzLnRyZWVQYW5lbEVudHJ5LmFycmF5U3RhdGUpO1xuXHRcdHRoaXMuY29tcG9uZW50LnNldENoaWxkKFwicm9vdEVsZW1lbnRcIiwgdGhpcy50cmVlUGFuZWxFbnRyeS5jb21wb25lbnQpO1xuXHR9XG59XG5cblR5cGVDb25maWdQYWNrLmluc3RhbmNlKCkuYWRkVHlwZUNvbmZpZyhcIm51dHRpbjJjLXVpXCIsIFByb3RvdHlwZUNvbmZpZy51bm5hbWVkKFRyZWVQYW5lbCkpOyIsImltcG9ydCB7XG4gICAgQ2FudmFzU3R5bGVzLFxuICAgIENvbXBvbmVudCxcbiAgICBJbnB1dEVsZW1lbnREYXRhQmluZGluZyxcbiAgICBTdHlsZXNoZWV0QnVpbGRlcixcbiAgICBTdHlsZXNoZWV0LFxuICAgIENvbXBvbmVudEJ1aWxkZXIsXG4gICAgSW5saW5lQ29tcG9uZW50RmFjdG9yeVxufSBmcm9tIFwibnV0dGluMmMtY29yZV92MVwiO1xuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQsIFByb3RvdHlwZUNvbmZpZywgVHlwZUNvbmZpZ1BhY2sgfSBmcm9tIFwibWluZGlfdjFcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiQ2hlY2tCb3hcIik7XG5cbmV4cG9ydCBjbGFzcyBDaGVja0JveCB7XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gbW9kZWxcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBtb2RlbCA9IG51bGwpIHtcbiAgICAgICAgXG4gICAgICAgIC8qKiBAdHlwZSB7SW5saW5lQ29tcG9uZW50RmFjdG9yeX0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoSW5saW5lQ29tcG9uZW50RmFjdG9yeSk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnR9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gbnVsbDtcblxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcblxuICAgICAgICAvKiogQHR5cGUge29iamVjdH0gKi9cbiAgICAgICAgdGhpcy5tb2RlbCA9IG1vZGVsO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHlsZXNoZWV0QnVpbGRlcn0gc3R5bGVzaGVldEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMge1N0eWxlc2hlZXR9XG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkU3R5bGVzaGVldChzdHlsZXNoZWV0QnVpbGRlcikge1xuICAgICAgICBzdHlsZXNoZWV0QnVpbGRlclxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmNoZWNrLWJveFwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIixcImJsb2NrXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIixcInJlbGF0aXZlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZy1sZWZ0XCIsXCIyZW1cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tYm90dG9tXCIsXCIwLjVlbVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImN1cnNvclwiLFwicG9pbnRlclwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIi13ZWJraXQtdXNlci1zZWxlY3RcIixcIm5vbmVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCItbW96LXVzZXItc2VsZWN0XCIsXCJub25lXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiLW1zLXVzZXItc2VsZWN0XCIsXCJub25lXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidXNlci1zZWxlY3RcIixcIm5vbmVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tYm90dG9tXCIsXCIxcmVtXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuY2hlY2stYm94IGlucHV0XCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIixcImFic29sdXRlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLFwiMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImN1cnNvclwiLFwicG9pbnRlclwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImhlaWdodFwiLFwiMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIndpZHRoXCIsXCIwXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuY2hlY2stYm94LW1hcmtcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLFwiYWJzb2x1dGVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0b3BcIixcIjBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJsZWZ0XCIsXCIwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwid2lkdGhcIixcImNhbGMoMWVtICsgMC41cmVtICsgMnB4KVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImhlaWdodFwiLFwiY2FsYygxZW0gKyAwLjVyZW0gKyAycHgpXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLFwiI2VlZVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmNoZWNrLWJveDpob3ZlciBpbnB1dCB+IC5jaGVjay1ib3gtbWFya1wiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIixcIiNjY2NcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5jaGVjay1ib3ggaW5wdXQ6Y2hlY2tlZCB+IC5jaGVjay1ib3gtbWFya1wiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIixcIiMyMTk2RjNcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5jaGVjay1ib3gtbWFyazphZnRlclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbnRlbnRcIixcIlxcXCJcXFwiXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIixcImFic29sdXRlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLFwibm9uZVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmNoZWNrLWJveCBpbnB1dDpjaGVja2VkIH4gLmNoZWNrLWJveC1tYXJrOmFmdGVyXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLFwiYmxvY2tcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5jaGVjay1ib3ggLmNoZWNrLWJveC1tYXJrOmFmdGVyXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibGVmdFwiLFwiMC41ZW1cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0b3BcIixcIjAuNGVtXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwid2lkdGhcIixcIjAuNmVtXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiaGVpZ2h0XCIsXCIwLjZlbVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlclwiLFwic29saWQgd2hpdGVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItd2lkdGhcIixcIjAgM3B4IDNweCAwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiLXdlYmtpdC10cmFuc2Zvcm1cIixcInJvdGF0ZSg0NWRlZylcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCItbXMtdHJhbnNmb3JtXCIsXCJyb3RhdGUoNDVkZWcpXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNmb3JtXCIsXCJyb3RhdGUoNDVkZWcpXCIpXG4gICAgICAgICAgICAuY2xvc2UoKTtcblxuICAgICAgICByZXR1cm4gc3R5bGVzaGVldEJ1aWxkZXIuYnVpbGQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudEJ1aWxkZXJ9IGNvbXBvbmVudEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMge0NvbXBvbmVudH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRDb21wb25lbnQoY29tcG9uZW50QnVpbGRlcikge1xuICAgICAgIGNvbXBvbmVudEJ1aWxkZXJcbiAgICAgICAgICAgIC5yb290KFwibGFiZWxcIiwgXCJpZD1jaGVjay1ib3hcIiwgXCJjbGFzcz1jaGVjay1ib3hcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAubm9kZShcImlucHV0XCIsIFwiaWQ9Y2hlY2tCb3hcIiwgXCJ0eXBlPWNoZWNrYm94XCIpXG4gICAgICAgICAgICAgICAgLm5vZGUoXCJzcGFuXCIsIFwiY2xhc3M9Y2hlY2stYm94LW1hcmtcIilcbiAgICAgICAgICAgICAgICAudGV4dChcIiBTdGF5IGxvZ2dlZCBpblwiKVxuICAgICAgICAgICAgLmNsb3NlKCk7XG4gICAgICAgIHJldHVybiBjb21wb25lbnRCdWlsZGVyLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgcG9zdENvbmZpZygpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKENoZWNrQm94KTtcbiAgICAgICAgQ2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKENoZWNrQm94Lm5hbWUpO1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJjaGVja0JveFwiKS5zZXRBdHRyaWJ1dGVWYWx1ZShcIm5hbWVcIix0aGlzLm5hbWUpO1xuXG4gICAgICAgIGlmKHRoaXMubW9kZWwpIHtcbiAgICAgICAgICAgIElucHV0RWxlbWVudERhdGFCaW5kaW5nLmxpbmsodGhpcy5tb2RlbCkudG8odGhpcy5jb21wb25lbnQuZ2V0KFwiY2hlY2tCb3hcIikpO1xuICAgICAgICB9XG4gICAgfVxuXG59XG5cblR5cGVDb25maWdQYWNrLmluc3RhbmNlKCkuYWRkVHlwZUNvbmZpZyhcIm51dHRpbjJjLXVpXCIsIFByb3RvdHlwZUNvbmZpZy51bm5hbWVkKENoZWNrQm94KSk7IiwiaW1wb3J0IHsgQ29tcG9uZW50LCBDb21wb25lbnRCdWlsZGVyLCBFbWFpbFZhbGlkYXRvciwgU3R5bGVzaGVldCwgU3R5bGVzaGVldEJ1aWxkZXIgfSBmcm9tIFwibnV0dGluMmMtY29yZV92MVwiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5pbXBvcnQgeyBDb21tb25JbnB1dCB9IGZyb20gXCIuLi9jb21tb25JbnB1dC5qc1wiO1xuaW1wb3J0IHsgUHJvdG90eXBlQ29uZmlnLCBUeXBlQ29uZmlnUGFjayB9IGZyb20gXCJtaW5kaV92MVwiO1xuXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiRW1haWxJbnB1dFwiKTtcblxuZXhwb3J0IGNsYXNzIEVtYWlsSW5wdXQgZXh0ZW5kcyBDb21tb25JbnB1dCB7XG5cbiAgICBzdGF0aWMgREVGQVVMVF9QTEFDRUhPTERFUiA9IFwiRW1haWxcIjtcblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG1vZGVsXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBsYWNlaG9sZGVyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBtYW5kYXRvcnlcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBtb2RlbCA9IG51bGwsIHBsYWNlaG9sZGVyID0gVGV4dElucHV0LkRFRkFVTFRfUExBQ0VIT0xERVIsIG1hbmRhdG9yeSA9IGZhbHNlKSB7XG5cbiAgICAgICAgc3VwZXIoRW1haWxJbnB1dCxcbiAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICBtb2RlbCxcbiAgICAgICAgICAgIG5ldyBFbWFpbFZhbGlkYXRvcihtYW5kYXRvcnksICFtYW5kYXRvcnkpLFxuICAgICAgICAgICAgcGxhY2Vob2xkZXIsXG4gICAgICAgICAgICBcImVtYWlsSW5wdXRcIixcbiAgICAgICAgICAgIFwiZW1haWxFcnJvclwiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0eWxlc2hlZXRCdWlsZGVyfSBzdHlsZXNoZWV0QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyB7U3R5bGVzaGVldH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRTdHlsZXNoZWV0KHN0eWxlc2hlZXRCdWlsZGVyKSB7XG4gICAgICAgc3R5bGVzaGVldEJ1aWxkZXJcbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5lbWFpbC1pbnB1dC1lbnRyeVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIixcImJsb2NrXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwid2lkdGhcIixcIjEwMCVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJoZWlnaHRcIixcImNhbGMoMS41ZW0gKyAwLjc1cmVtICsgMnB4KVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmdcIixcIjAuMzc1cmVtIDAuNzVyZW1cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmb250LXNpemVcIixcIjFyZW1cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmb250LXdlaWdodFwiLFwiNDAwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibGluZS1oZWlnaHRcIixcIjEuNVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbG9yXCIsXCIjNDk1MDU3XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLFwiI2ZmZlwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY2xpcFwiLFwicGFkZGluZy1ib3hcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXJcIixcIjFweCBzb2xpZCAjY2VkNGRhXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyLXJhZGl1c1wiLFwiMC4yNXJlbVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zaXRpb25cIixcImJvcmRlci1jb2xvciAwLjE1cyBlYXNlLWluLW91dCwgYm94LXNoYWRvdyAwLjE1cyBlYXNlLWluLW91dFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpbi1ib3R0b21cIixcIjFyZW1cIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5lbWFpbC1pbnB1dC1lcnJvclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIndpZHRoXCIsXCJmaXQtY29udGVudFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbG9yXCIsXCIjMzMzMzMzXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNmb3JtXCIsXCJ0cmFuc2xhdGUoKzVweCwtNXB4KVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIixcIiNGRkZGRTBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmb250LXdlaWdodFwiLFwibm9ybWFsXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZm9udC1zaXplXCIsXCIxNHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyLXJhZGl1c1wiLFwiOHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIixcInJlbGF0aXZlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiei1pbmRleFwiLFwiOTk5OTk5OThcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3gtc2l6aW5nXCIsXCJib3JkZXItYm94XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm94LXNoYWRvd1wiLFwiMCAxcHggOHB4IHJnYmEoMCwwLDAsMC41KVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImN1cnNvclwiLFwicG9pbnRlclwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmVtYWlsLWlucHV0LWVycm9yLWhpZGRlblwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zaXRpb25cIixcIm1heC1oZWlnaHQgLjNzIC4ycywgcGFkZGluZyAuM3MgLjJzLCBvcGFjaXR5IC4ycyAwcywgdmlzaWJpbGl0eSAwcyAuMnNcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsXCIwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZ1wiLFwiMHB4IDBweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1heC1oZWlnaHRcIixcIjBweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIixcImJsb2NrXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidmlzaWJpbGl0eVwiLFwiaGlkZGVuXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuZW1haWwtaW5wdXQtZXJyb3ItdmlzaWJsZVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zaXRpb25cIixcIm1heC1oZWlnaHQgLjNzLCBwYWRkaW5nIC4ycywgb3BhY2l0eSAuMnMgLjJzXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLFwiMVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmdcIixcIjEwcHggMjBweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1heC1oZWlnaHRcIixcIjUwcHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsXCJibG9ja1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInZpc2liaWxpdHlcIixcInZpc2libGVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tdG9wXCIsXCIxMHB4XCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuZW1haWwtaW5wdXQtZXJyb3IgaVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBvc2l0aW9uXCIsXCJhYnNvbHV0ZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRvcFwiLFwiMTAwJVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImxlZnRcIixcIjMwJVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpbi1sZWZ0XCIsXCItMTVweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIndpZHRoXCIsXCIzMHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiaGVpZ2h0XCIsXCIxNXB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwib3ZlcmZsb3dcIixcImhpZGRlblwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmVtYWlsLWlucHV0LWVycm9yIGk6OmFmdGVyXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29udGVudFwiLFwiJydcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLFwiYWJzb2x1dGVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLFwiMTVweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImhlaWdodFwiLFwiMTVweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImxlZnRcIixcIjUwJVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zZm9ybVwiLFwidHJhbnNsYXRlKC01MCUsLTUwJSkgcm90YXRlKDQ1ZGVnKVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIixcIiNGRkZGRTBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3gtc2hhZG93XCIsXCIwIDFweCA4cHggcmdiYSgwLDAsMCwwLjUpXCIpXG4gICAgICAgICAgICAuY2xvc2UoKTtcblxuICAgICAgICByZXR1cm4gc3R5bGVzaGVldEJ1aWxkZXIuYnVpbGQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudEJ1aWxkZXJ9IGNvbXBvbmVudEJ1aWxkZXIgXG4gICAgICogQHJldHVybiB7Q29tcG9uZW50fVxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZENvbXBvbmVudChjb21wb25lbnRCdWlsZGVyKSB7XG4gICAgICAgY29tcG9uZW50QnVpbGRlclxuICAgICAgICAgICAgLnJvb3QoXCJkaXZcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAubm9kZShcImRpdlwiLCBcImlkPWVtYWlsRXJyb3JcIiwgXCJjbGFzcz1lbWFpbC1pbnB1dC1lcnJvciBlbWFpbC1pbnB1dC1lcnJvci1oaWRkZW5cIilcbiAgICAgICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgICAgIC50ZXh0KFwiSW52YWxpZCBlbWFpbCBhZGRyZXNzXCIpXG4gICAgICAgICAgICAgICAgICAgIC5ub2RlKFwiaVwiKVxuICAgICAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAgICAgLm5vZGUoXCJpbnB1dFwiLCBcImlkPWVtYWlsSW5wdXRcIiwgXCJ0eXBlPXRleHRcIiwgXCJjbGFzcz1lbWFpbC1pbnB1dC1lbnRyeVwiKVxuICAgICAgICAgICAgLmNsb3NlKCk7XG4gICAgICAgIHJldHVybiBjb21wb25lbnRCdWlsZGVyLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgc2hvd1ZhbGlkYXRpb25FcnJvcigpIHsgdGhpcy5jb21wb25lbnQuZ2V0KHRoaXMuZXJyb3JFbGVtZW50SWQpLnNldEF0dHJpYnV0ZVZhbHVlKFwiY2xhc3NcIiwgXCJlbWFpbC1pbnB1dC1lcnJvciBlbWFpbC1pbnB1dC1lcnJvci12aXNpYmxlXCIpOyB9XG4gICAgaGlkZVZhbGlkYXRpb25FcnJvcigpIHsgdGhpcy5jb21wb25lbnQuZ2V0KHRoaXMuZXJyb3JFbGVtZW50SWQpLnNldEF0dHJpYnV0ZVZhbHVlKFwiY2xhc3NcIiwgXCJlbWFpbC1pbnB1dC1lcnJvciBlbWFpbC1pbnB1dC1lcnJvci1oaWRkZW5cIik7IH1cblxufVxuXG5UeXBlQ29uZmlnUGFjay5pbnN0YW5jZSgpLmFkZFR5cGVDb25maWcoXCJudXR0aW4yYy11aVwiLCBQcm90b3R5cGVDb25maWcudW5uYW1lZChFbWFpbElucHV0KSk7IiwiaW1wb3J0IHsgQ29udGFpbmVyRXZlbnQsIENvbnRhaW5lckZpbGVEYXRhIH0gZnJvbSBcImNvbnRhaW5lcmJyaWRnZV92MVwiO1xuaW1wb3J0IHsgQ2FudmFzU3R5bGVzLFxuICAgIENvbXBvbmVudCxcbiAgICBFdmVudE1hbmFnZXIsXG4gICAgU3R5bGVzaGVldEJ1aWxkZXIsXG4gICAgU3R5bGVzaGVldCxcbiAgICBDb21wb25lbnRCdWlsZGVyLFxuICAgIElubGluZUNvbXBvbmVudEZhY3Rvcnlcbn0gZnJvbSBcIm51dHRpbjJjLWNvcmVfdjFcIjtcbmltcG9ydCB7IEluamVjdGlvblBvaW50LCBQcm90b3R5cGVDb25maWcsIFR5cGVDb25maWdQYWNrIH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5cbmV4cG9ydCBjbGFzcyBGaWxlVXBsb2FkRW50cnkge1xuICAgIFxuICAgIHN0YXRpYyBFVkVOVF9SRU1PVkVfQ0xJQ0tFRCA9IFwicmVtb3ZlQ2xpY2tlZFwiO1xuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDb250YWluZXJGaWxlRGF0YX0gZmlsZSBcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihmaWxlKSB7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtJbmxpbmVDb21wb25lbnRGYWN0b3J5fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShJbmxpbmVDb21wb25lbnRGYWN0b3J5KTtcbiAgICAgICAgXG4gICAgICAgIC8qKiBAdHlwZSB7RXZlbnRNYW5hZ2VyfSAqL1xuICAgICAgICB0aGlzLmV2ZW50cyA9IG5ldyBFdmVudE1hbmFnZXIoKTtcbiAgICAgICAgXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IG51bGw7XG4gICAgICAgIFxuICAgICAgICAvKiogQHR5cGUge0NvbnRhaW5lckZpbGVEYXRhfSAqL1xuICAgICAgICB0aGlzLmZpbGUgPSBmaWxlO1xuICAgICAgICBcbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMuZmlsZU5hbWUgPSBmaWxlLm5hbWU7XG4gICAgICAgIFxuICAgICAgICAvKiogQHR5cGUge251bWJlcn0gKi9cbiAgICAgICAgdGhpcy5maWxlU2l6ZSA9IGZpbGUuc2l6ZTtcbiAgICAgICAgXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLmZpbGVUeXBlID0gZmlsZS50eXBlO1xuICAgIH1cbiAgICBcbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0eWxlc2hlZXRCdWlsZGVyfSBzdHlsZXNoZWV0QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyB7U3R5bGVzaGVldH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRTdHlsZXNoZWV0KHN0eWxlc2hlZXRCdWlsZGVyKSB7XG4gICAgICAgc3R5bGVzaGVldEJ1aWxkZXJcbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5maWxlLXVwbG9hZC1lbnRyeVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci10b3BcIiwgXCIxcHggc29saWQgI2RkZFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmctdG9wXCIsIFwiNXB0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luLXRvcFwiLCBcIjEwcHRcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5maWxlLXVwbG9hZC1lbnRyeS1kZXRhaWxzXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLCBcImZsZXhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmbGV4LWRpcmVjdGlvblwiLCBcInJvd1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImFsaWduLWl0ZW1zXCIsIFwiY2VudGVyXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luLWJvdHRvbVwiLCBcIjhweFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmZpbGUtdXBsb2FkLWVudHJ5LWRldGFpbHMtbmFtZVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZsZXhcIiwgXCIxXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZm9udC13ZWlnaHRcIiwgXCI1MDBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tcmlnaHRcIiwgXCIxMnB4XCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuZmlsZS11cGxvYWQtZW50cnktZGV0YWlscy10eXBlXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZmxleFwiLCBcIjAgMCBhdXRvXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCIjNjY2XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZm9udC1zaXplXCIsIFwiMC45ZW1cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tcmlnaHRcIiwgXCIxMnB4XCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuZmlsZS11cGxvYWQtZW50cnktcmVtb3ZlXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZmxleFwiLCBcIjAgMCBhdXRvXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luLWxlZnRcIiwgXCJhdXRvXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY3Vyc29yXCIsIFwicG9pbnRlclwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbG9yXCIsIFwiZ3JheVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmdcIiwgXCI0cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItcmFkaXVzXCIsIFwiNHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNpdGlvblwiLCBcImJhY2tncm91bmQtY29sb3IgMC4yc1wiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmZpbGUtdXBsb2FkLWVudHJ5LXJlbW92ZTpob3ZlclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIiwgXCIjZjhmOWZhXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuZmlsZS11cGxvYWQtZW50cnktcHJvZ3Jlc3NcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIFwiZmxleFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZsZXgtZGlyZWN0aW9uXCIsIFwicm93XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYWxpZ24taXRlbXNcIiwgXCJjZW50ZXJcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJnYXBcIiwgXCIxMnB4XCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuZmlsZS11cGxvYWQtZW50cnktcHJvZ3Jlc3Mtc2l6ZVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZsZXhcIiwgXCIwIDAgYXV0b1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtc2l6ZVwiLCBcIjAuOWVtXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCIjNjY2XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWluLXdpZHRoXCIsIFwiODBweFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmZpbGUtdXBsb2FkLWVudHJ5LXByb2dyZXNzLWJhclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZsZXhcIiwgXCIxXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiaGVpZ2h0XCIsIFwiOHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiNlOWVjZWZcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItcmFkaXVzXCIsIFwiNHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwib3ZlcmZsb3dcIiwgXCJoaWRkZW5cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLCBcInJlbGF0aXZlXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuZmlsZS11cGxvYWQtZW50cnktcHJvZ3Jlc3MtYmFyLWZpbGxcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJoZWlnaHRcIiwgXCIxMDAlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiMyOGE3NDVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItcmFkaXVzXCIsIFwiNHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNpdGlvblwiLCBcIndpZHRoIDAuM3MgZWFzZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIndpZHRoXCIsIFwiMCVcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5maWxlLXVwbG9hZC1lbnRyeS1wcm9ncmVzcy1zdGF0dXNcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmbGV4XCIsIFwiMCAwIGF1dG9cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmb250LXNpemVcIiwgXCIwLjllbVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbG9yXCIsIFwiIzY2NlwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1pbi13aWR0aFwiLCBcIjgwcHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0ZXh0LWFsaWduXCIsIFwicmlnaHRcIilcbiAgICAgICAgICAgIC5jbG9zZSgpO1xuXG4gICAgICAgIHJldHVybiBzdHlsZXNoZWV0QnVpbGRlci5idWlsZCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Q29tcG9uZW50QnVpbGRlcn0gY29tcG9uZW50QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyB7Q29tcG9uZW50fVxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZENvbXBvbmVudChjb21wb25lbnRCdWlsZGVyKSB7XG4gICAgICAgIGNvbXBvbmVudEJ1aWxkZXJcbiAgICAgICAgICAgIC5yb290KFwiZGl2XCIsIFwiY2xhc3M9ZmlsZS11cGxvYWQtZW50cnlcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAubm9kZShcImRpdlwiLCBcImNsYXNzPWZpbGUtdXBsb2FkLWVudHJ5LWRldGFpbHNcIilcbiAgICAgICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgICAgIC5ub2RlKFwiZGl2XCIsIFwiaWQ9ZmlsZU5hbWVcIiwgXCJjbGFzcz1maWxlLXVwbG9hZC1lbnRyeS1kZXRhaWxzLW5hbWVcIilcbiAgICAgICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRleHQoXCJGaWxlbmFtZVwiKVxuICAgICAgICAgICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgICAgICAgICAubm9kZShcImRpdlwiLCBcImlkPWZpbGVUeXBlXCIsIFwiY2xhc3M9ZmlsZS11cGxvYWQtZW50cnktZGV0YWlscy10eXBlXCIpXG4gICAgICAgICAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC50ZXh0KFwiRmlsZSBUeXBlXCIpXG4gICAgICAgICAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAgICAgICAgIC5ub2RlKFwiZGl2XCIsIFwiaWQ9cmVtb3ZlQnV0dG9uXCIsIFwiY2xhc3M9ZmlsZS11cGxvYWQtZW50cnktcmVtb3ZlXCIpXG4gICAgICAgICAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5ub2RlKFwiaVwiLCBcImNsYXNzPWZhcyBmYS10cmFzaFwiKVxuICAgICAgICAgICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAgICAgLm5vZGUoXCJkaXZcIiwgXCJjbGFzcz1maWxlLXVwbG9hZC1lbnRyeS1wcm9ncmVzc1wiKVxuICAgICAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAgICAgLm5vZGUoXCJkaXZcIiwgXCJpZD1maWxlU2l6ZVwiLCBcImNsYXNzPWZpbGUtdXBsb2FkLWVudHJ5LXByb2dyZXNzLXNpemVcIilcbiAgICAgICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRleHQoXCJGaWxlIFNpemVcIilcbiAgICAgICAgICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgICAgICAgICAgLm5vZGUoXCJkaXZcIiwgXCJjbGFzcz1maWxlLXVwbG9hZC1lbnRyeS1wcm9ncmVzcy1iYXJcIiwgXCJpZD1maWxlUHJvZ3Jlc3NcIilcbiAgICAgICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm5vZGUoXCJkaXZcIiwgXCJjbGFzcz1maWxlLXVwbG9hZC1lbnRyeS1wcm9ncmVzcy1iYXItZmlsbFwiLCBcImlkPWZpbGVQcm9ncmVzc0JhclwiKVxuICAgICAgICAgICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgICAgICAgICAubm9kZShcImRpdlwiLCBcImlkPWZpbGVTdGF0dXNcIiwgXCJjbGFzcz1maWxlLXVwbG9hZC1lbnRyeS1wcm9ncmVzcy1zdGF0dXNcIilcbiAgICAgICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgLmNsb3NlKCk7XG4gICAgICAgIHJldHVybiBjb21wb25lbnRCdWlsZGVyLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgYXN5bmMgcG9zdENvbmZpZygpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKEZpbGVVcGxvYWRFbnRyeSk7XG4gICAgICAgIENhbnZhc1N0eWxlcy5lbmFibGVTdHlsZShGaWxlVXBsb2FkRW50cnkubmFtZSk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBmaWxlTmFtZUVsZW1lbnQgPSB0aGlzLmNvbXBvbmVudC5nZXQoXCJmaWxlTmFtZVwiKTtcbiAgICAgICAgZmlsZU5hbWVFbGVtZW50LnNldENoaWxkKHRoaXMuZmlsZU5hbWUpO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgZmlsZVNpemVFbGVtZW50ID0gdGhpcy5jb21wb25lbnQuZ2V0KFwiZmlsZVNpemVcIik7XG4gICAgICAgIGZpbGVTaXplRWxlbWVudC5zZXRDaGlsZCgodGhpcy5maWxlU2l6ZSAvIDEwMjQpLnRvRml4ZWQoMikgKyBcIiBLQlwiKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGZpbGVUeXBlRWxlbWVudCA9IHRoaXMuY29tcG9uZW50LmdldChcImZpbGVUeXBlXCIpO1xuICAgICAgICBmaWxlVHlwZUVsZW1lbnQuc2V0Q2hpbGQodGhpcy5maWxlVHlwZSA/IHRoaXMuZmlsZVR5cGUgOiBcIlVua25vd25cIik7XG5cbiAgICAgICAgY29uc3QgcmVtb3ZlQnV0dG9uID0gdGhpcy5jb21wb25lbnQuZ2V0KFwicmVtb3ZlQnV0dG9uXCIpO1xuICAgICAgICByZW1vdmVCdXR0b24ubGlzdGVuVG8oXCJjbGlja1wiLCB0aGlzLnJlbW92ZUNsaWtlZCwgdGhpcyk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVQcm9ncmVzcyh0aGlzLmZpbGUsIHRoaXMuZmlsZS5uYW1lKTtcblxuICAgICAgICBcbiAgICB9XG4gICAgXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDb250YWluZXJFdmVudH0gZXZlbnQgXG4gICAgICovXG4gICAgcmVtb3ZlQ2xpa2VkKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuZXZlbnRzLnRyaWdnZXIoRmlsZVVwbG9hZEVudHJ5LkVWRU5UX1JFTU9WRV9DTElDS0VELCBbZXZlbnQsIHRoaXMuZmlsZV0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Q29udGFpbmVyRmlsZURhdGF9IGZpbGUgXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleSBcbiAgICAgKi9cbiAgICB1cGRhdGVQcm9ncmVzcyhmaWxlLCBrZXkpIHtcbiAgICAgICAgaWYgKGZpbGUpIHtcbiAgICAgICAgICAgIGNvbnN0IHByb2dyZXNzQmFyID0gdGhpcy5jb21wb25lbnQuZ2V0KFwiZmlsZVByb2dyZXNzQmFyXCIpO1xuICAgICAgICAgICAgcHJvZ3Jlc3NCYXIuc2V0U3R5bGUoXCJ3aWR0aFwiLCBmaWxlLnVwbG9hZFBlcmNlbnRhZ2UgKyBcIiVcIik7XG4gICAgICAgICAgICBpZiAoZmlsZS51cGxvYWRQZXJjZW50YWdlID49IDEwMCkge1xuICAgICAgICAgICAgICAgIGZpbGUudXBsb2FkQ29tcGxldGUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5UeXBlQ29uZmlnUGFjay5pbnN0YW5jZSgpLmFkZFR5cGVDb25maWcoXCJudXR0aW4yYy11aVwiLCBQcm90b3R5cGVDb25maWcudW5uYW1lZChGaWxlVXBsb2FkRW50cnkpKTsiLCJpbXBvcnQgeyBDb250YWluZXJFdmVudCwgQ29udGFpbmVyRmlsZURhdGEgfSBmcm9tIFwiY29udGFpbmVyYnJpZGdlX3YxXCI7XG5pbXBvcnQgeyBMb2dnZXIsIE1ldGhvZCB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuaW1wb3J0IHsgQ2FudmFzU3R5bGVzLFxuICAgIENvbXBvbmVudCxcbiAgICBFdmVudE1hbmFnZXIsXG4gICAgU2ltcGxlRWxlbWVudCxcbiAgICBTdHlsZVNlbGVjdG9yQWNjZXNzb3IsXG4gICAgSFRNTCxcbiAgICBTdGF0ZU1hbmFnZXIsXG4gICAgU3R5bGVzaGVldEJ1aWxkZXIsXG4gICAgU3R5bGVzaGVldCxcbiAgICBDb21wb25lbnRCdWlsZGVyLFxuICAgIElubGluZUNvbXBvbmVudEZhY3Rvcnlcbn0gZnJvbSBcIm51dHRpbjJjLWNvcmVfdjFcIjtcbmltcG9ydCB7IEluamVjdGlvblBvaW50LCBQcm90b3R5cGVDb25maWcsIFByb3ZpZGVyLCBUeXBlQ29uZmlnUGFjayB9IGZyb20gXCJtaW5kaV92MVwiO1xuaW1wb3J0IHsgRmlsZVVwbG9hZEVudHJ5IH0gZnJvbSBcIi4vZmlsZVVwbG9hZEVudHJ5L2ZpbGVVcGxvYWRFbnRyeS5qc1wiO1xuaW1wb3J0IHsgQ29tbW9uRXZlbnRzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21tb25FdmVudHMuanNcIjtcblxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIkZpbGVVcGxvYWRcIik7XG5cbmV4cG9ydCBjbGFzcyBGaWxlVXBsb2FkIHtcblxuXHRzdGF0aWMgREVGQVVMVF9QTEFDRUhPTERFUiA9IFwiRmlsZVVwbG9hZFwiO1xuXG5cdHN0YXRpYyBFVkVOVF9DTElDS0VEID0gQ29tbW9uRXZlbnRzLkNMSUNLRUQ7XG4gICAgc3RhdGljIEVWRU5UX0ZJTEVfQURERUQgPSBcImZpbGVBZGRlZFwiO1xuICAgIHN0YXRpYyBFVkVOVF9GSUxFX1JFTU9WRUQgPSBcImZpbGVSZW1vdmVkXCI7XG4gICAgc3RhdGljIEVWRU5UX1VQTE9BRF9DT01QTEVURSA9IFwidXBsb2FkQ29tcGxldGVcIjtcbiAgICBzdGF0aWMgRVZFTlRfVVBMT0FEX1JFU0VUID0gXCJ1cGxvYWRSZXNldFwiO1xuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgXG4gICAgICogQHBhcmFtIHtib29sZWFufSBtdWx0aXBsZVxuICAgICAqIEBwYXJhbSB7QXJyYXk8c3RyaW5nPn0gZmlsZVR5cGVBcnJheVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIG11bHRpcGxlID0gZmFsc2UsIGZpbGVUeXBlQXJyYXkgPSBbXSkge1xuICAgICAgICBcbiAgICAgICAgLyoqIEB0eXBlIHtJbmxpbmVDb21wb25lbnRGYWN0b3J5fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShJbmxpbmVDb21wb25lbnRGYWN0b3J5KTtcblxuICAgICAgICAvKiogQHR5cGUge0V2ZW50TWFuYWdlcn0gKi9cbiAgICAgICAgdGhpcy5ldmVudHMgPSBuZXcgRXZlbnRNYW5hZ2VyKCk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnR9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gbnVsbDtcblxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcblxuICAgICAgICAvKiogQHR5cGUge2Jvb2xlYW59ICovXG4gICAgICAgIHRoaXMubXVsdGlwbGUgPSBtdWx0aXBsZTtcbiAgICAgICAgXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nW119ICovXG4gICAgICAgIHRoaXMuZmlsZVR5cGVBcnJheSA9IGZpbGVUeXBlQXJyYXk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtTdGF0ZU1hbmFnZXI8Q29udGFpbmVyRmlsZURhdGE+fSAgKi9cbiAgICAgICAgdGhpcy5maWxlQXJyYXlTdGF0ZSA9IG5ldyBTdGF0ZU1hbmFnZXIoKTtcblxuICAgICAgICAvKiogQHR5cGUge1Byb3ZpZGVyPEZpbGVVcGxvYWRFbnRyeT59ICovXG4gICAgICAgIHRoaXMuZmlsZVVwbG9hZEVudHJ5UHJvdmlkZXIgPSBJbmplY3Rpb25Qb2ludC5wcm92aWRlcihGaWxlVXBsb2FkRW50cnkpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHlsZXNoZWV0QnVpbGRlcn0gc3R5bGVzaGVldEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMge1N0eWxlc2hlZXR9XG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkU3R5bGVzaGVldChzdHlsZXNoZWV0QnVpbGRlcikge1xuICAgICAgIHN0eWxlc2hlZXRCdWlsZGVyXG4gICAgICAgICAgIC5zZWxlY3RvcihcIi5maWxlLXVwbG9hZC1lcnJvclwiKVxuICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwid2lkdGhcIiwgXCJmaXQtY29udGVudFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbG9yXCIsIFwiIzMzMzMzM1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZSgrNXB4LC01cHgpXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiNGRkZGRTBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmb250LXdlaWdodFwiLCBcIm5vcm1hbFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtc2l6ZVwiLCBcIjE0cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItcmFkaXVzXCIsIFwiOHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIiwgXCJyZWxhdGl2ZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInotaW5kZXhcIiwgXCI5OTk5OTk5OFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJveC1zaXppbmdcIiwgXCJib3JkZXItYm94XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm94LXNoYWRvd1wiLCBcIjAgMXB4IDhweCByZ2JhKDAsMCwwLDAuNSlcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjdXJzb3JcIiwgXCJwb2ludGVyXCIpXG4gICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgLnNlbGVjdG9yKFwiLmZpbGUtdXBsb2FkLWVycm9yLWhpZGRlblwiKVxuICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNpdGlvblwiLCBcIm1heC1oZWlnaHQgLjNzIC4ycywgcGFkZGluZyAuM3MgLjJzLCBvcGFjaXR5IC4ycyAwcywgdmlzaWJpbGl0eSAwcyAuMnNcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmdcIiwgXCIwcHggMHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWF4LWhlaWdodFwiLCBcIjBweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgXCJibG9ja1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInZpc2liaWxpdHlcIiwgXCJoaWRkZW5cIilcbiAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAuc2VsZWN0b3IoXCIuZmlsZS11cGxvYWQtZXJyb3ItdmlzaWJsZVwiKVxuICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNpdGlvblwiLCBcIm1heC1oZWlnaHQgLjNzLCBwYWRkaW5nIC4ycywgb3BhY2l0eSAuMnMgLjJzXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCBcIjFcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwYWRkaW5nXCIsIFwiMTBweCAyMHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWF4LWhlaWdodFwiLCBcIjUwcHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ2aXNpYmlsaXR5XCIsIFwidmlzaWJsZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpbi10b3BcIiwgXCIxMHB4XCIpXG4gICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgLnNlbGVjdG9yKFwiLmZpbGUtdXBsb2FkLWVycm9yIGlcIilcbiAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBvc2l0aW9uXCIsIFwiYWJzb2x1dGVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0b3BcIiwgXCIxMDAlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibGVmdFwiLCBcIjMwJVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpbi1sZWZ0XCIsIFwiLTE1cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLCBcIjMwcHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJoZWlnaHRcIiwgXCIxNXB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwib3ZlcmZsb3dcIiwgXCJoaWRkZW5cIilcbiAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAuc2VsZWN0b3IoXCIuZmlsZS11cGxvYWQtYm94XCIpXG4gICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXJcIiwgXCIycHggZGFzaGVkICNjZWQ0ZGFcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItcmFkaXVzXCIsIFwiMC4yNXJlbVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmdcIiwgXCIxcmVtXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY3Vyc29yXCIsIFwicG9pbnRlclwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zaXRpb25cIiwgXCJiYWNrZ3JvdW5kLWNvbG9yIDAuMTVzIGVhc2UtaW4tb3V0LCBib3JkZXItY29sb3IgMC4xNXMgZWFzZS1pbi1vdXRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tYm90dG9tXCIsIFwiMTVwdFwiKVxuICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgIC5zZWxlY3RvcihcIi5maWxlLXVwbG9hZC1ib3gtaW5zdHJ1Y3Rpb25zXCIpXG4gICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0ZXh0LWFsaWduXCIsIFwiY2VudGVyXCIpXG4gICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgLnNlbGVjdG9yKFwiLmZpbGUtdXBsb2FkLWJveC1pbnN0cnVjdGlvbnMtaWNvblwiKVxuICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwid2lkdGhcIiwgXCI0OHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiaGVpZ2h0XCIsIFwiNDhweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpblwiLCBcIjAgYXV0byAwIGF1dG9cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLXNpemVcIiwgXCJjb250YWluXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1yZXBlYXRcIiwgXCJuby1yZXBlYXRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLXBvc2l0aW9uXCIsIFwiY2VudGVyXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCIjZTFlMWUxXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZm9udC1zaXplXCIsIFwiM3JlbVwiKVxuICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgIC5zZWxlY3RvcihcIi5maWxlLXVwbG9hZC1ib3gtaW5zdHJ1Y3Rpb25zLXRleHRcIilcbiAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtc2l6ZVwiLCBcIjFyZW1cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjb2xvclwiLCBcIiM2Yzc1N2RcIilcbiAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAuc2VsZWN0b3IoXCIuZmlsZS11cGxvYWQtYm94LWRyYWdvdmVyXCIpXG4gICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiI2U5ZWNlZlwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1jb2xvclwiLCBcIiM4MGJkZmZcIilcbiAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAuc2VsZWN0b3IoXCIuZmlsZS11cGxvYWQtaW5wdXRcIilcbiAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgXCJub25lXCIpXG4gICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgLnNlbGVjdG9yKFwiLmZpbGUtdXBsb2FkLXVuc3VwcG9ydGVkLWZpbGVcIilcbiAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbG9yXCIsIFwiI2RjMzU0NVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtc2l6ZVwiLCBcIjAuODc1cmVtXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZ1wiLCBcIjAuMjVyZW0gMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1sZWZ0XCIsIFwiM3B4IHNvbGlkICNkYzM1NDVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwYWRkaW5nLWxlZnRcIiwgXCIwLjVyZW1cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tdG9wXCIsIFwiMC41MHJlbVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIiwgXCIjZjhkN2RhXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyLXJhZGl1c1wiLCBcIjAuMjVyZW1cIilcbiAgICAgICAgICAgLmNsb3NlKCk7XG4gICAgICAgICByZXR1cm4gc3R5bGVzaGVldEJ1aWxkZXIuYnVpbGQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudEJ1aWxkZXJ9IGNvbXBvbmVudEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMge0NvbXBvbmVudH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRDb21wb25lbnQoY29tcG9uZW50QnVpbGRlcikge1xuICAgICAgICBjb21wb25lbnRCdWlsZGVyXG4gICAgICAgICAgICAucm9vdChcImRpdlwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwiZGl2XCIsIFwiaWQ9ZmlsZVVwbG9hZEVycm9yXCIsIFwiY2xhc3M9ZmlsZS11cGxvYWQtZXJyb3IgZmlsZS11cGxvYWQtZXJyb3ItaGlkZGVuXCIpXG4gICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAudGV4dChcIkludmFsaWQgZmlsZS11cGxvYWRcIilcbiAgICAgICAgICAgICAgICAgICAgLm5vZGUoXCJpXCIpXG4gICAgICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgICAgICAubm9kZShcImRpdlwiLCBcImlkPXVwbG9hZEJveFwiLCBcImNsYXNzPWZpbGUtdXBsb2FkLWJveFwiKVxuICAgICAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAgICAgLm5vZGUoXCJkaXZcIiwgXCJpZD1pbnN0cnVjdGlvbnNcIiwgXCJjbGFzcz1maWxlLXVwbG9hZC1ib3gtaW5zdHJ1Y3Rpb25zXCIpXG4gICAgICAgICAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5ub2RlKFwiaW5wdXRcIiwgXCJpZD1maWxlSW5wdXRcIiwgXCJ0eXBlPWZpbGVcIiwgXCJjbGFzcz1maWxlLXVwbG9hZC1pbnB1dFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm5vZGUoXCJkaXZcIiwgXCJpZD11cGxvYWRCb3hJY29uXCIsIFwiY2xhc3M9ZmFzIGZhLXVwbG9hZCBmaWxlLXVwbG9hZC1ib3gtaW5zdHJ1Y3Rpb25zLWljb25cIilcbiAgICAgICAgICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgICAgICAgICAgLm5vZGUoXCJkaXZcIiwgXCJpZD11bnN1cHBvcnRlZFwiKVxuICAgICAgICAgICAgICAgICAgICAubm9kZShcImRpdlwiLCBcImlkPWZpbGVMaXN0XCIpXG4gICAgICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgIC5jbG9zZSgpO1xuICAgICAgICByZXR1cm4gY29tcG9uZW50QnVpbGRlci5idWlsZCgpO1xuICAgIH1cblxuICAgIHBvc3RDb25maWcoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZShGaWxlVXBsb2FkKTtcbiAgICAgICAgQ2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKEZpbGVVcGxvYWQubmFtZSk7XG5cbiAgICAgICAgXG4gICAgICAgIC8qKiBAdHlwZSB7U2ltcGxlRWxlbWVudH0gKi9cbiAgICAgICAgY29uc3QgdXBsb2FkQm94ID0gdGhpcy5jb21wb25lbnQuZ2V0KFwidXBsb2FkQm94XCIpO1xuICAgICAgICB1cGxvYWRCb3gubGlzdGVuVG8oXCJkcmFnb3ZlclwiLCB0aGlzLmRyYWdPdmVyLCB0aGlzKTtcbiAgICAgICAgdXBsb2FkQm94Lmxpc3RlblRvKFwiZHJhZ2xlYXZlXCIsIHRoaXMuZHJhZ0xlYXZlLCB0aGlzKTtcbiAgICAgICAgdXBsb2FkQm94Lmxpc3RlblRvKFwiZHJvcFwiLCB0aGlzLmZpbGVEcm9wcGVkLCB0aGlzKTtcbiAgICAgICAgdXBsb2FkQm94Lmxpc3RlblRvKFwiY2xpY2tcIiwgdGhpcy5maWxlSW5wdXRDbGlja2VkLCB0aGlzKTtcblxuICAgICAgICBpZiAodGhpcy5tdWx0aXBsZSkge1xuICAgICAgICAgICAgY29uc3QgZmlsZUlucHV0ID0gdGhpcy5jb21wb25lbnQuZ2V0KFwiZmlsZUlucHV0XCIpO1xuICAgICAgICAgICAgZmlsZUlucHV0LmNvbnRhaW5lckVsZW1lbnQuc2V0QXR0cmlidXRlVmFsdWUoXCJtdWx0aXBsZVwiLCBcIm11bHRpcGxlXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZmlsZUlucHV0ID0gdGhpcy5jb21wb25lbnQuZ2V0KFwiZmlsZUlucHV0XCIpO1xuICAgICAgICBmaWxlSW5wdXQubGlzdGVuVG8oXCJjaGFuZ2VcIiwgdGhpcy5maWxlSW5wdXRDaGFuZ2VkLCB0aGlzKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Q29udGFpbmVyRXZlbnR9IGV2ZW50IFxuICAgICAqL1xuICAgIGZpbGVJbnB1dENsaWNrZWQoZXZlbnQpIHtcbiAgICAgICAgY29uc3QgZmlsZUlucHV0ID0gdGhpcy5jb21wb25lbnQuZ2V0KFwiZmlsZUlucHV0XCIpO1xuICAgICAgICBmaWxlSW5wdXQuY29udGFpbmVyRWxlbWVudC52YWx1ZSA9IG51bGw7XG4gICAgICAgIGZpbGVJbnB1dC5jb250YWluZXJFbGVtZW50LmNsaWNrKCk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge0NvbnRhaW5lckV2ZW50fSBldmVudFxuICAgICAqL1xuICAgIGZpbGVJbnB1dENoYW5nZWQoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5wcm9jZXNzRmlsZXMoZXZlbnQuZmlsZXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFByb2Nlc3MgdXBsb2FkZWQgZmlsZXMgYW5kIHZhbGlkYXRlIGFnYWluc3QgZmlsZSB0eXBlIGFycmF5XG4gICAgICogQHBhcmFtIHtDb250YWluZXJGaWxlRGF0YVtdfSBmaWxlc1xuICAgICAqL1xuICAgIGFzeW5jIHByb2Nlc3NGaWxlcyhmaWxlcykge1xuICAgICAgICBjb25zdCBzdXBwb3J0ZWRGaWxlcyA9IFtdO1xuICAgICAgICBjb25zdCB1bnN1cHBvcnRlZEZpbGVzID0gW107XG4gICAgICAgIGNvbnN0IGFkZGVkRmlsZXMgPSBbXTtcblxuICAgICAgICBmb3IgKGNvbnN0IGZpbGUgb2YgZmlsZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IHN1cHBvcnRlZEZpbGUgPSB0aGlzLmlzRmlsZVR5cGVTdXBwb3J0ZWQoZmlsZSk7XG4gICAgICAgICAgICBjb25zdCBmaWxlQWxyZWFkeVNlbGV0ZWQgPSB0aGlzLmZpbGVBbHJlYWR5U2VsZXRlZChmaWxlKTtcbiAgICAgICAgICAgIGlmIChzdXBwb3J0ZWRGaWxlICYmICFmaWxlQWxyZWFkeVNlbGV0ZWQpIHtcbiAgICAgICAgICAgICAgICBzdXBwb3J0ZWRGaWxlcy5wdXNoKGZpbGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFzdXBwb3J0ZWRGaWxlKSB7XG4gICAgICAgICAgICAgICAgdW5zdXBwb3J0ZWRGaWxlcy5wdXNoKGZpbGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gSGFuZGxlIHN1cHBvcnRlZCBmaWxlc1xuICAgICAgICBpZiAoc3VwcG9ydGVkRmlsZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgaWYgKHRoaXMubXVsdGlwbGUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maWxlQXJyYXlTdGF0ZS5jbGVhcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChjb25zdCBmaWxlIG9mIHN1cHBvcnRlZEZpbGVzKSB7XG4gICAgICAgICAgICAgICAgYWRkZWRGaWxlcy5wdXNoKGF3YWl0IHRoaXMuZmlsZUFycmF5U3RhdGUudXBkYXRlRG9tYWluKGZpbGUsIGZpbGUubmFtZSkpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm11bHRpcGxlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTaG93IHVuc3VwcG9ydGVkIGZpbGVzXG4gICAgICAgIHRoaXMuc2hvd1Vuc3VwcG9ydGVkRmlsZXModW5zdXBwb3J0ZWRGaWxlcyk7XG4gICAgICAgIGF3YWl0IHRoaXMudXBkYXRlRmlsZUxpc3QoKTtcblxuICAgICAgICAvLyBUcmlnZ2VyIGZpbGUgYWRkZWQgZXZlbnQgZm9yIGVhY2ggc3VwcG9ydGVkIGZpbGVcbiAgICAgICAgZm9yIChjb25zdCBmaWxlIG9mIGFkZGVkRmlsZXMpIHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzLnRyaWdnZXIoRmlsZVVwbG9hZC5FVkVOVF9GSUxFX0FEREVELCBbZmlsZV0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZmlsZUFscmVhZHlTZWxldGVkKGZpbGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmlsZUFycmF5U3RhdGUuZG9tYWluTWFwLmhhcyhmaWxlLm5hbWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIGZpbGUgdHlwZSBpcyBzdXBwb3J0ZWRcbiAgICAgKiBAcGFyYW0ge0NvbnRhaW5lckZpbGVEYXRhfSBmaWxlXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgaXNGaWxlVHlwZVN1cHBvcnRlZChmaWxlKSB7XG4gICAgICAgIC8vIElmIGZpbGVUeXBlQXJyYXkgaXMgZW1wdHksIGFjY2VwdCBhbGwgZmlsZXNcbiAgICAgICAgaWYgKHRoaXMuZmlsZVR5cGVBcnJheS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ2hlY2sgaWYgZmlsZSdzIE1JTUUgdHlwZSBtYXRjaGVzIGFueSBpbiB0aGUgZmlsZVR5cGVBcnJheVxuICAgICAgICByZXR1cm4gdGhpcy5maWxlVHlwZUFycmF5LmluY2x1ZGVzKGZpbGUudHlwZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGlzcGxheSB1bnN1cHBvcnRlZCBmaWxlcyBpbiB0aGUgdW5zdXBwb3J0ZWQgZGl2XG4gICAgICogQHBhcmFtIHtBcnJheTxGaWxlPn0gdW5zdXBwb3J0ZWRGaWxlc1xuICAgICAqL1xuICAgIHNob3dVbnN1cHBvcnRlZEZpbGVzKHVuc3VwcG9ydGVkRmlsZXMpIHtcbiAgICAgICAgY29uc3QgdW5zdXBwb3J0ZWREaXYgPSB0aGlzLmNvbXBvbmVudC5nZXQoXCJ1bnN1cHBvcnRlZFwiKTtcbiAgICAgICAgdW5zdXBwb3J0ZWREaXYuY2xlYXIoKTtcblxuICAgICAgICBpZiAodW5zdXBwb3J0ZWRGaWxlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB1bnN1cHBvcnRlZERpdi5jbGVhcigpO1xuICAgICAgICAgICAgZm9yIChjb25zdCBmaWxlIG9mIHVuc3VwcG9ydGVkRmlsZXMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBtZXNzYWdlRWxlbWVudCA9IEhUTUwuY3VzdG9tKFwiZGl2XCIpO1xuICAgICAgICAgICAgICAgIG1lc3NhZ2VFbGVtZW50LnNldEF0dHJpYnV0ZVZhbHVlKFwiY2xhc3NcIixcImZpbGUtdXBsb2FkLXVuc3VwcG9ydGVkLWZpbGVcIik7XG4gICAgICAgICAgICAgICAgbWVzc2FnZUVsZW1lbnQuc2V0Q2hpbGQoYEZpbGUgXCIke2ZpbGUubmFtZX1cIiBpcyBub3Qgc3VwcG9ydGVkLmApO1xuICAgICAgICAgICAgICAgIHVuc3VwcG9ydGVkRGl2LmFkZENoaWxkKG1lc3NhZ2VFbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7Q29udGFpbmVyRXZlbnR9IGV2ZW50XG4gICAgICovXG4gICAgZHJhZ092ZXIoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgY29uc3QgdXBsb2FkQm94ID0gdGhpcy5jb21wb25lbnQuZ2V0KFwidXBsb2FkQm94XCIpO1xuICAgICAgICBTdHlsZVNlbGVjdG9yQWNjZXNzb3IuZnJvbSh1cGxvYWRCb3gpLmVuYWJsZShcImZpbGUtdXBsb2FkLWJveC1kcmFnb3ZlclwiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge0NvbnRhaW5lckV2ZW50fSBldmVudFxuICAgICAqL1xuICAgIGRyYWdMZWF2ZShldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICBjb25zdCB1cGxvYWRCb3ggPSB0aGlzLmNvbXBvbmVudC5nZXQoXCJ1cGxvYWRCb3hcIik7XG4gICAgICAgIFN0eWxlU2VsZWN0b3JBY2Nlc3Nvci5mcm9tKHVwbG9hZEJveCkuZGlzYWJsZShcImZpbGUtdXBsb2FkLWJveC1kcmFnb3ZlclwiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAgQHBhcmFtIHtDb250YWluZXJFdmVudH0gZXZlbnRcbiAgICAgKi9cbiAgICBmaWxlRHJvcHBlZChldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICBjb25zdCB1cGxvYWRCb3ggPSB0aGlzLmNvbXBvbmVudC5nZXQoXCJ1cGxvYWRCb3hcIik7XG4gICAgICAgIFN0eWxlU2VsZWN0b3JBY2Nlc3Nvci5mcm9tKHVwbG9hZEJveCkuZGlzYWJsZShcImZpbGUtdXBsb2FkLWJveC1kcmFnb3ZlclwiKTtcblxuICAgICAgICB0aGlzLnByb2Nlc3NGaWxlcyhldmVudC5maWxlcyk7XG4gICAgfVxuXG4gICAgYXN5bmMgdXBkYXRlRmlsZUxpc3QoKSB7XG4gICAgICAgIGNvbnN0IGZpbGVMaXN0ID0gdGhpcy5jb21wb25lbnQuZ2V0KFwiZmlsZUxpc3RcIik7XG4gICAgICAgIGZpbGVMaXN0LmNsZWFyKCk7XG4gICAgICAgIHRoaXMuZXZlbnRzLnRyaWdnZXIoRmlsZVVwbG9hZC5FVkVOVF9VUExPQURfUkVTRVQpO1xuICAgICAgICBmb3IgKGNvbnN0IGZpbGUgb2YgdGhpcy5maWxlQXJyYXlTdGF0ZS5kb21haW5NYXAudmFsdWVzKCkpIHtcbiAgICAgICAgICAgIGNvbnN0IGZpbGVFbnRyeSA9IGF3YWl0IHRoaXMuZmlsZVVwbG9hZEVudHJ5UHJvdmlkZXIuZ2V0KFtmaWxlXSk7XG4gICAgICAgICAgICBmaWxlRW50cnkuZXZlbnRzLmxpc3RlblRvKEZpbGVVcGxvYWRFbnRyeS5FVkVOVF9SRU1PVkVfQ0xJQ0tFRCwgdGhpcy5yZW1vdmVGaWxlRW50cnksIHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5maWxlQXJyYXlTdGF0ZS5yZWFjdFRvKGZpbGUubmFtZSwgbmV3IE1ldGhvZChmaWxlRW50cnkudXBkYXRlUHJvZ3Jlc3MsIGZpbGVFbnRyeSkpO1xuICAgICAgICAgICAgZmlsZUxpc3QuYWRkQ2hpbGQoZmlsZUVudHJ5LmNvbXBvbmVudCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5maWxlQXJyYXlTdGF0ZS5yZWFjdChuZXcgTWV0aG9kKHRoaXMuY2hlY2tGaWxlVXBsb2FkQ29tcGxldGUsIHRoaXMpKTtcbiAgICB9XG5cbiAgICBjaGVja0ZpbGVVcGxvYWRDb21wbGV0ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuZmlsZUFycmF5U3RhdGUuZG9tYWluTWFwLnNpemUgPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzLnRyaWdnZXIoRmlsZVVwbG9hZC5FVkVOVF9VUExPQURfUkVTRVQpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgZmlsZSBvZiB0aGlzLmZpbGVBcnJheVN0YXRlLmRvbWFpbk1hcC52YWx1ZXMoKSkge1xuICAgICAgICAgICAgaWYgKCFmaWxlLnVwbG9hZENvbXBsZXRlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuZXZlbnRzLnRyaWdnZXIoRmlsZVVwbG9hZC5FVkVOVF9VUExPQURfQ09NUExFVEUsIFt0aGlzLmZpbGVBcnJheVN0YXRlLm9iamVjdEFycmF5XSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDb250YWluZXJFdmVudH0gZXZlbnRcbiAgICAgKiBAcGFyYW0ge0ZpbGV9IGZpbGVcbiAgICAgKiBAcGFyYW0ge2FueX0gYXJnc1xuICAgICAqL1xuICAgIGFzeW5jIHJlbW92ZUZpbGVFbnRyeShldmVudCwgZmlsZSwgYXJncykge1xuICAgICAgICB0aGlzLmZpbGVBcnJheVN0YXRlLmRlbGV0ZShmaWxlLm5hbWUpO1xuICAgICAgICAvLyBDbGVhciB1bnN1cHBvcnRlZCBmaWxlcyB3aGVuIHVwZGF0aW5nIGZpbGUgbGlzdFxuICAgICAgICBjb25zdCB1bnN1cHBvcnRlZERpdiA9IHRoaXMuY29tcG9uZW50LmdldChcInVuc3VwcG9ydGVkXCIpO1xuICAgICAgICB1bnN1cHBvcnRlZERpdi5jbGVhcigpO1xuICAgICAgICBhd2FpdCB0aGlzLnVwZGF0ZUZpbGVMaXN0KCk7XG4gICAgICAgIC8vIFByZXZlbnQgdGhlIGNsaWNrIGV2ZW50IGZyb20gYnViYmxpbmcgdXAgdG8gdGhlIHVwbG9hZCBib3hcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHRoaXMuY2hlY2tGaWxlVXBsb2FkQ29tcGxldGUoKTtcbiAgICB9XG5cbiAgICBjbGlja2VkKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuZXZlbnRzLnRyaWdnZXIoRmlsZVVwbG9hZC5FVkVOVF9DTElDS0VELCBbZXZlbnRdKTtcbiAgICB9XG5cbiAgICBmb2N1cygpIHtcblxuICAgIH1cbn1cblxuVHlwZUNvbmZpZ1BhY2suaW5zdGFuY2UoKS5hZGRUeXBlQ29uZmlnKFwibnV0dGluMmMtdWlcIiwgUHJvdG90eXBlQ29uZmlnLnVubmFtZWQoRmlsZVVwbG9hZCkpOyIsImltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuaW1wb3J0IHsgQ29tbW9uSW5wdXQgfSBmcm9tIFwiLi4vY29tbW9uSW5wdXRcIjtcbmltcG9ydCB7IENvbXBvbmVudCwgQ29tcG9uZW50QnVpbGRlciwgU3R5bGVzaGVldCwgU3R5bGVzaGVldEJ1aWxkZXIgfSBmcm9tIFwibnV0dGluMmMtY29yZV92MVwiO1xuaW1wb3J0IHsgUHJvdG90eXBlQ29uZmlnLCBUeXBlQ29uZmlnUGFjayB9IGZyb20gXCJtaW5kaV92MVwiO1xuXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiSGlkZGVuSW5wdXRcIik7XG5cbmV4cG9ydCBjbGFzcyBIaWRkZW5JbnB1dCBleHRlbmRzIENvbW1vbklucHV0IHtcblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG1vZGVsXG4gICAgICovXG4gICAgY29uc3RydWN0b3IobmFtZSwgbW9kZWwgPSBudWxsKSB7XG5cbiAgICAgICAgc3VwZXIoSGlkZGVuSW5wdXQsXG4gICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgbW9kZWwsXG4gICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgIFwiaGlkZGVuSW5wdXRcIik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHlsZXNoZWV0QnVpbGRlcn0gc3R5bGVzaGVldEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMge1N0eWxlc2hlZXR9XG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkU3R5bGVzaGVldChzdHlsZXNoZWV0QnVpbGRlcikge1xuICAgICAgICByZXR1cm4gc3R5bGVzaGVldEJ1aWxkZXJcbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5oaWRkZW4taW5wdXQtZW50cnlcIilcbiAgICAgICAgICAgIC5idWlsZCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Q29tcG9uZW50QnVpbGRlcn0gY29tcG9uZW50QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyB7Q29tcG9uZW50fVxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZENvbXBvbmVudChjb21wb25lbnRCdWlsZGVyKSB7XG4gICAgICAgIHJldHVybiBjb21wb25lbnRCdWlsZGVyXG4gICAgICAgICAgICAucm9vdChcImlucHV0XCIsIFwiaWQ9aGlkZGVuSW5wdXRcIiwgXCJ0eXBlPWhpZGRlblwiLCBcImNsYXNzPWhpZGRlbi1pbnB1dC1lbnRyeVwiKVxuICAgICAgICAgICAgLmJ1aWxkKCk7XG4gICAgfVxuXG59XG5cblR5cGVDb25maWdQYWNrLmluc3RhbmNlKCkuYWRkVHlwZUNvbmZpZyhcIm51dHRpbjJjLXVpXCIsIFByb3RvdHlwZUNvbmZpZy51bm5hbWVkKEhpZGRlbklucHV0KSk7IiwiaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5pbXBvcnQgeyBDb21wb25lbnQsIENvbXBvbmVudEJ1aWxkZXIsIE51bWJlclZhbGlkYXRvciwgU3R5bGVzaGVldCwgU3R5bGVzaGVldEJ1aWxkZXIgfSBmcm9tIFwibnV0dGluMmMtY29yZV92MVwiO1xuaW1wb3J0IHsgQ29tbW9uSW5wdXQgfSBmcm9tIFwiLi4vY29tbW9uSW5wdXQuanNcIjtcbmltcG9ydCB7IFByb3RvdHlwZUNvbmZpZywgVHlwZUNvbmZpZ1BhY2sgfSBmcm9tIFwibWluZGlfdjFcIjtcblxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIlRleHRJbnB1dFwiKTtcblxuZXhwb3J0IGNsYXNzIE51bWJlcklucHV0IGV4dGVuZHMgQ29tbW9uSW5wdXQge1xuXG4gICAgc3RhdGljIERFRkFVTFRfUExBQ0VIT0xERVIgPSBcIk51bWJlclwiO1xuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gbW9kZWxcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGxhY2Vob2xkZXJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IG1hbmRhdG9yeVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIG1vZGVsID0gbnVsbCwgcGxhY2Vob2xkZXIgPSBOdW1iZXJJbnB1dC5ERUZBVUxUX1BMQUNFSE9MREVSLCBtYW5kYXRvcnkgPSBmYWxzZSkge1xuXG4gICAgICAgIHN1cGVyKE51bWJlcklucHV0LFxuICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgIG1vZGVsLFxuICAgICAgICAgICAgbmV3IE51bWJlclZhbGlkYXRvcihtYW5kYXRvcnksICFtYW5kYXRvcnkpLFxuICAgICAgICAgICAgcGxhY2Vob2xkZXIsXG4gICAgICAgICAgICBcIm51bWJlcklucHV0XCIsXG4gICAgICAgICAgICBcIm51bWJlckVycm9yXCIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3R5bGVzaGVldEJ1aWxkZXJ9IHN0eWxlc2hlZXRCdWlsZGVyIFxuICAgICAqIEByZXR1cm5zIHtTdHlsZXNoZWV0fVxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZFN0eWxlc2hlZXQoc3R5bGVzaGVldEJ1aWxkZXIpIHtcbiAgICAgICAgc3R5bGVzaGVldEJ1aWxkZXJcbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5udW1iZXItaW5wdXQtZW50cnlcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLCBcIjEwMCVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJoZWlnaHRcIiwgXCJjYWxjKDEuNWVtICsgMC43NXJlbSArIDJweClcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwYWRkaW5nXCIsIFwiMC4zNzVyZW0gMC43NXJlbVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtc2l6ZVwiLCBcIjFyZW1cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmb250LXdlaWdodFwiLCBcIjQwMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImxpbmUtaGVpZ2h0XCIsIFwiMS41XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCIjNDk1MDU3XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiNmZmZcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNsaXBcIiwgXCJwYWRkaW5nLWJveFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlclwiLCBcIjFweCBzb2xpZCAjY2VkNGRhXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyLXJhZGl1c1wiLCBcIjAuMjVyZW1cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2l0aW9uXCIsIFwiYm9yZGVyLWNvbG9yIDAuMTVzIGVhc2UtaW4tb3V0LCBib3gtc2hhZG93IDAuMTVzIGVhc2UtaW4tb3V0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luLWJvdHRvbVwiLCBcIjFyZW1cIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5udW1iZXItaW5wdXQtZXJyb3JcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLCBcImZpdC1jb250ZW50XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCIjMzMzMzMzXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKCs1cHgsLTVweClcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiI0ZGRkZFMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtd2VpZ2h0XCIsIFwibm9ybWFsXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZm9udC1zaXplXCIsIFwiMTRweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1yYWRpdXNcIiwgXCI4cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLCBcInJlbGF0aXZlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiei1pbmRleFwiLCBcIjk5OTk5OTk4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm94LXNpemluZ1wiLCBcImJvcmRlci1ib3hcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3gtc2hhZG93XCIsIFwiMCAxcHggOHB4IHJnYmEoMCwwLDAsMC41KVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImN1cnNvclwiLCBcInBvaW50ZXJcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5udW1iZXItaW5wdXQtZXJyb3ItaGlkZGVuXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNpdGlvblwiLCBcIm1heC1oZWlnaHQgLjNzIC4ycywgcGFkZGluZyAuM3MgLjJzLCBvcGFjaXR5IC4ycyAwcywgdmlzaWJpbGl0eSAwcyAuMnNcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmdcIiwgXCIwcHggMHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWF4LWhlaWdodFwiLCBcIjBweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgXCJibG9ja1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInZpc2liaWxpdHlcIiwgXCJoaWRkZW5cIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5udW1iZXItaW5wdXQtZXJyb3ItdmlzaWJsZVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zaXRpb25cIiwgXCJtYXgtaGVpZ2h0IC4zcywgcGFkZGluZyAuMnMsIG9wYWNpdHkgLjJzIC4yc1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIxXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZ1wiLCBcIjEwcHggMjBweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1heC1oZWlnaHRcIiwgXCI1MHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidmlzaWJpbGl0eVwiLCBcInZpc2libGVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tdG9wXCIsIFwiMTBweFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLm51bWJlci1pbnB1dC1lcnJvciBpXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIiwgXCJhYnNvbHV0ZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRvcFwiLCBcIjEwMCVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJsZWZ0XCIsIFwiMzAlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luLWxlZnRcIiwgXCItMTVweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIndpZHRoXCIsIFwiMzBweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImhlaWdodFwiLCBcIjE1cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJvdmVyZmxvd1wiLCBcImhpZGRlblwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLm51bWJlci1pbnB1dC1lcnJvciBpOjphZnRlclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbnRlbnRcIiwgXCInJ1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBvc2l0aW9uXCIsIFwiYWJzb2x1dGVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLCBcIjE1cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJoZWlnaHRcIiwgXCIxNXB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibGVmdFwiLCBcIjUwJVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZSgtNTAlLC01MCUpIHJvdGF0ZSg0NWRlZylcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiI0ZGRkZFMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJveC1zaGFkb3dcIiwgXCIwIDFweCA4cHggcmdiYSgwLDAsMCwwLjUpXCIpXG4gICAgICAgICAgICAuY2xvc2UoKTtcblxuICAgICAgICByZXR1cm4gc3R5bGVzaGVldEJ1aWxkZXIuYnVpbGQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudEJ1aWxkZXJ9IGNvbXBvbmVudEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMge0NvbXBvbmVudH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRDb21wb25lbnQoY29tcG9uZW50QnVpbGRlcikge1xuICAgICAgICByZXR1cm4gY29tcG9uZW50QnVpbGRlclxuICAgICAgICAgICAgLnJvb3QoXCJkaXZcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAubm9kZShcImRpdlwiLCBcImlkPW51bWJlckVycm9yXCIsIFwiY2xhc3M9bnVtYmVyLWlucHV0LWVycm9yIG51bWJlci1pbnB1dC1lcnJvci1oaWRkZW5cIilcbiAgICAgICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgICAgIC50ZXh0KFwiSW52YWxpZCB2YWx1ZVwiKVxuICAgICAgICAgICAgICAgICAgICAubm9kZShcImlcIilcbiAgICAgICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwiaW5wdXRcIiwgXCJpZD1udW1iZXJJbnB1dFwiLCBcInR5cGU9bnVtYmVyXCIsIFwicGF0dGVybj1bMC05XSpcIiwgXCJpbnB1dG1vZGU9bnVtZXJpY1wiLCBcImNsYXNzPW51bWJlci1pbnB1dC1lbnRyeVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgIC5idWlsZCgpO1xuICAgIH1cblxuICAgIHNob3dWYWxpZGF0aW9uRXJyb3IoKSB7IHRoaXMuY29tcG9uZW50LmdldCh0aGlzLmVycm9yRWxlbWVudElkKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImNsYXNzXCIsIFwibnVtYmVyLWlucHV0LWVycm9yIG51bWJlci1pbnB1dC1lcnJvci12aXNpYmxlXCIpOyB9XG4gICAgaGlkZVZhbGlkYXRpb25FcnJvcigpIHsgdGhpcy5jb21wb25lbnQuZ2V0KHRoaXMuZXJyb3JFbGVtZW50SWQpLnNldEF0dHJpYnV0ZVZhbHVlKFwiY2xhc3NcIiwgXCJudW1iZXItaW5wdXQtZXJyb3IgbnVtYmVyLWlucHV0LWVycm9yLWhpZGRlblwiKTsgfVxufVxuXG5UeXBlQ29uZmlnUGFjay5pbnN0YW5jZSgpLmFkZFR5cGVDb25maWcoXCJudXR0aW4yYy11aVwiLCBQcm90b3R5cGVDb25maWcudW5uYW1lZChOdW1iZXJJbnB1dCkpOyIsImltcG9ydCB7IENvbXBvbmVudCwgQ29tcG9uZW50QnVpbGRlciwgUmVxdWlyZWRWYWxpZGF0b3IsIFN0eWxlc2hlZXQsIFN0eWxlc2hlZXRCdWlsZGVyIH0gZnJvbSBcIm51dHRpbjJjLWNvcmVfdjFcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuaW1wb3J0IHsgQ29tbW9uSW5wdXQgfSBmcm9tIFwiLi4vY29tbW9uSW5wdXQuanNcIjtcbmltcG9ydCB7IFByb3RvdHlwZUNvbmZpZywgVHlwZUNvbmZpZ1BhY2sgfSBmcm9tIFwibWluZGlfdjFcIjtcblxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIlBhc3N3b3JkSW5wdXRcIik7XG5cbmV4cG9ydCBjbGFzcyBQYXNzd29yZElucHV0IGV4dGVuZHMgQ29tbW9uSW5wdXQge1xuXG4gICAgc3RhdGljIERFRkFVTFRfUExBQ0VIT0xERVIgPSBcIlBhc3N3b3JkXCI7XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBtb2RlbFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwbGFjZWhvbGRlclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gbWFuZGF0b3J5XG4gICAgICovXG4gICAgY29uc3RydWN0b3IobmFtZSwgbW9kZWwgPSBudWxsLCBwbGFjZWhvbGRlciA9IFRleHRJbnB1dC5ERUZBVUxUX1BMQUNFSE9MREVSLCBtYW5kYXRvcnkgPSBmYWxzZSkge1xuXG4gICAgICAgIHN1cGVyKFBhc3N3b3JkSW5wdXQsXG4gICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgbW9kZWwsXG4gICAgICAgICAgICBuZXcgUmVxdWlyZWRWYWxpZGF0b3IoIW1hbmRhdG9yeSksXG4gICAgICAgICAgICBwbGFjZWhvbGRlcixcbiAgICAgICAgICAgIFwicGFzc3dvcmRJbnB1dFwiLFxuICAgICAgICAgICAgXCJwYXNzd29yZEVycm9yXCIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3R5bGVzaGVldEJ1aWxkZXJ9IHN0eWxlc2hlZXRCdWlsZGVyIFxuICAgICAqIEByZXR1cm5zIHtTdHlsZXNoZWV0fVxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZFN0eWxlc2hlZXQoc3R5bGVzaGVldEJ1aWxkZXIpIHtcbiAgICAgICAgc3R5bGVzaGVldEJ1aWxkZXJcbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5wYXNzd29yZC1pbnB1dC1lbnRyeVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgXCJibG9ja1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIndpZHRoXCIsIFwiMTAwJVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImhlaWdodFwiLCBcImNhbGMoMS41ZW0gKyAwLjc1cmVtICsgMnB4KVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmdcIiwgXCIwLjM3NXJlbSAwLjc1cmVtXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZm9udC1zaXplXCIsIFwiMXJlbVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtd2VpZ2h0XCIsIFwiNDAwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibGluZS1oZWlnaHRcIiwgXCIxLjVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjb2xvclwiLCBcIiM0OTUwNTdcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiI2ZmZlwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY2xpcFwiLCBcInBhZGRpbmctYm94XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyXCIsIFwiMXB4IHNvbGlkICNjZWQ0ZGFcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItcmFkaXVzXCIsIFwiMC4yNXJlbVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zaXRpb25cIiwgXCJib3JkZXItY29sb3IgMC4xNXMgZWFzZS1pbi1vdXQsIGJveC1zaGFkb3cgMC4xNXMgZWFzZS1pbi1vdXRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tYm90dG9tXCIsIFwiMXJlbVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBhc3N3b3JkLWlucHV0LWVycm9yXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwid2lkdGhcIiwgXCJmaXQtY29udGVudFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbG9yXCIsIFwiIzMzMzMzM1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZSgrNXB4LC01cHgpXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiNGRkZGRTBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmb250LXdlaWdodFwiLCBcIm5vcm1hbFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtc2l6ZVwiLCBcIjE0cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItcmFkaXVzXCIsIFwiOHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIiwgXCJyZWxhdGl2ZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInotaW5kZXhcIiwgXCI5OTk5OTk5OFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJveC1zaXppbmdcIiwgXCJib3JkZXItYm94XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm94LXNoYWRvd1wiLCBcIjAgMXB4IDhweCByZ2JhKDAsMCwwLDAuNSlcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjdXJzb3JcIiwgXCJwb2ludGVyXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucGFzc3dvcmQtaW5wdXQtZXJyb3ItaGlkZGVuXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNpdGlvblwiLCBcIm1heC1oZWlnaHQgLjNzIC4ycywgcGFkZGluZyAuM3MgLjJzLCBvcGFjaXR5IC4ycyAwcywgdmlzaWJpbGl0eSAwcyAuMnNcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmdcIiwgXCIwcHggMHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWF4LWhlaWdodFwiLCBcIjBweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgXCJibG9ja1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInZpc2liaWxpdHlcIiwgXCJoaWRkZW5cIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5wYXNzd29yZC1pbnB1dC1lcnJvci12aXNpYmxlXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNpdGlvblwiLCBcIm1heC1oZWlnaHQgLjNzLCBwYWRkaW5nIC4ycywgb3BhY2l0eSAuMnMgLjJzXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCBcIjFcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwYWRkaW5nXCIsIFwiMTBweCAyMHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWF4LWhlaWdodFwiLCBcIjUwcHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ2aXNpYmlsaXR5XCIsIFwidmlzaWJsZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpbi10b3BcIiwgXCIxMHB4XCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucGFzc3dvcmQtaW5wdXQtZXJyb3IgaVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBvc2l0aW9uXCIsIFwiYWJzb2x1dGVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0b3BcIiwgXCIxMDAlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibGVmdFwiLCBcIjMwJVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpbi1sZWZ0XCIsIFwiLTE1cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLCBcIjMwcHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJoZWlnaHRcIiwgXCIxNXB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwib3ZlcmZsb3dcIiwgXCJoaWRkZW5cIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5wYXNzd29yZC1pbnB1dC1lcnJvciBpOjphZnRlclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbnRlbnRcIiwgXCInJ1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBvc2l0aW9uXCIsIFwiYWJzb2x1dGVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLCBcIjE1cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJoZWlnaHRcIiwgXCIxNXB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibGVmdFwiLCBcIjUwJVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZSgtNTAlLC01MCUpIHJvdGF0ZSg0NWRlZylcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiI0ZGRkZFMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJveC1zaGFkb3dcIiwgXCIwIDFweCA4cHggcmdiYSgwLDAsMCwwLjUpXCIpXG4gICAgICAgICAgICAuY2xvc2UoKTtcblxuICAgICAgICByZXR1cm4gc3R5bGVzaGVldEJ1aWxkZXIuYnVpbGQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudEJ1aWxkZXJ9IGNvbXBvbmVudEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMge0NvbXBvbmVudH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRDb21wb25lbnQoY29tcG9uZW50QnVpbGRlcikge1xuICAgICAgICByZXR1cm4gY29tcG9uZW50QnVpbGRlclxuICAgICAgICAgICAgLnJvb3QoXCJkaXZcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAubm9kZShcImRpdlwiLCBcImlkPXBhc3N3b3JkRXJyb3JcIiwgXCJjbGFzcz1wYXNzd29yZC1pbnB1dC1lcnJvciBwYXNzd29yZC1pbnB1dC1lcnJvci1oaWRkZW5cIilcbiAgICAgICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgICAgIC50ZXh0KFwiUGFzc3dvcmQgcmVxdWlyZWRcIilcbiAgICAgICAgICAgICAgICAgICAgLm5vZGUoXCJpXCIpXG4gICAgICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgICAgICAubm9kZShcImlucHV0XCIsIFwiaWQ9cGFzc3dvcmRJbnB1dFwiLCBcInR5cGU9cGFzc3dvcmRcIiwgXCJjbGFzcz1wYXNzd29yZC1pbnB1dC1lbnRyeVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgIC5idWlsZCgpO1xuICAgIH1cblxuICAgIHNob3dWYWxpZGF0aW9uRXJyb3IoKSB7IHRoaXMuY29tcG9uZW50LmdldCh0aGlzLmVycm9yRWxlbWVudElkKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImNsYXNzXCIsIFwiZW1haWwtaW5wdXQtZXJyb3IgZW1haWwtaW5wdXQtZXJyb3ItdmlzaWJsZVwiKTsgfVxuICAgIGhpZGVWYWxpZGF0aW9uRXJyb3IoKSB7IHRoaXMuY29tcG9uZW50LmdldCh0aGlzLmVycm9yRWxlbWVudElkKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImNsYXNzXCIsIFwiZW1haWwtaW5wdXQtZXJyb3IgZW1haWwtaW5wdXQtZXJyb3ItaGlkZGVuXCIpOyB9XG59XG5cblR5cGVDb25maWdQYWNrLmluc3RhbmNlKCkuYWRkVHlwZUNvbmZpZyhcIm51dHRpbjJjLXVpXCIsIFByb3RvdHlwZUNvbmZpZy51bm5hbWVkKFBhc3N3b3JkSW5wdXQpKTsiLCJpbXBvcnQgeyBDb21wb25lbnQsIENvbXBvbmVudEJ1aWxkZXIsIFBhc3N3b3JkVmFsaWRhdG9yLCBTdHlsZXNoZWV0LCBTdHlsZXNoZWV0QnVpbGRlciB9IGZyb20gXCJudXR0aW4yYy1jb3JlX3YxXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcbmltcG9ydCB7IENvbW1vbklucHV0IH0gZnJvbSBcIi4uLy4uL2NvbW1vbklucHV0LmpzXCI7XG5pbXBvcnQgeyBQcm90b3R5cGVDb25maWcsIFR5cGVDb25maWdQYWNrIH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5cbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJQYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlXCIpO1xuXG5leHBvcnQgY2xhc3MgUGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZSBleHRlbmRzIENvbW1vbklucHV0IHtcblxuICAgIHN0YXRpYyBERUZBVUxUX1BMQUNFSE9MREVSID0gXCJOZXcgcGFzc3dvcmRcIjtcblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG1vZGVsXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBsYWNlaG9sZGVyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBtYW5kYXRvcnlcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBtb2RlbCA9IG51bGwsIHBsYWNlaG9sZGVyID0gVGV4dElucHV0LkRFRkFVTFRfUExBQ0VIT0xERVIsIG1hbmRhdG9yeSA9IGZhbHNlKSB7XG5cbiAgICAgICAgc3VwZXIoUGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZSxcbiAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICBtb2RlbCxcbiAgICAgICAgICAgIG5ldyBQYXNzd29yZFZhbGlkYXRvcihtYW5kYXRvcnkpLFxuICAgICAgICAgICAgcGxhY2Vob2xkZXIsXG4gICAgICAgICAgICBcInBhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWVGaWVsZFwiLFxuICAgICAgICAgICAgXCJwYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlRXJyb3JcIik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHlsZXNoZWV0QnVpbGRlcn0gc3R5bGVzaGVldEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMge1N0eWxlc2hlZXR9XG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkU3R5bGVzaGVldChzdHlsZXNoZWV0QnVpbGRlcikge1xuICAgICAgICBzdHlsZXNoZWV0QnVpbGRlclxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBhc3N3b3JkLW1hdGNoZXItaW5wdXQtdmFsdWUtZW50cnlcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLCBcIjEwMCVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJoZWlnaHRcIiwgXCJjYWxjKDEuNWVtICsgMC43NXJlbSArIDJweClcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwYWRkaW5nXCIsIFwiMC4zNzVyZW0gMC43NXJlbVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtc2l6ZVwiLCBcIjFyZW1cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmb250LXdlaWdodFwiLCBcIjQwMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImxpbmUtaGVpZ2h0XCIsIFwiMS41XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCIjNDk1MDU3XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiNmZmZcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNsaXBcIiwgXCJwYWRkaW5nLWJveFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlclwiLCBcIjFweCBzb2xpZCAjY2VkNGRhXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyLXJhZGl1c1wiLCBcIjAuMjVyZW1cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2l0aW9uXCIsIFwiYm9yZGVyLWNvbG9yIDAuMTVzIGVhc2UtaW4tb3V0LCBib3gtc2hhZG93IDAuMTVzIGVhc2UtaW4tb3V0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luLWJvdHRvbVwiLCBcIjFyZW1cIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5wYXNzd29yZC1tYXRjaGVyLWlucHV0LXZhbHVlLWVycm9yXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwid2lkdGhcIiwgXCJmaXQtY29udGVudFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbG9yXCIsIFwiIzMzMzMzM1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZSgrNXB4LC01cHgpXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiNGRkZGRTBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmb250LXdlaWdodFwiLCBcIm5vcm1hbFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtc2l6ZVwiLCBcIjE0cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItcmFkaXVzXCIsIFwiOHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIiwgXCJyZWxhdGl2ZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInotaW5kZXhcIiwgXCI5OTk5OTk5OFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJveC1zaXppbmdcIiwgXCJib3JkZXItYm94XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm94LXNoYWRvd1wiLCBcIjAgMXB4IDhweCByZ2JhKDAsMCwwLDAuNSlcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjdXJzb3JcIiwgXCJwb2ludGVyXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucGFzc3dvcmQtbWF0Y2hlci1pbnB1dC12YWx1ZS1lcnJvci1oaWRkZW5cIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2l0aW9uXCIsIFwibWF4LWhlaWdodCAuM3MgLjJzLCBwYWRkaW5nIC4zcyAuMnMsIG9wYWNpdHkgLjJzIDBzLCB2aXNpYmlsaXR5IDBzIC4yc1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZ1wiLCBcIjBweCAwcHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXgtaGVpZ2h0XCIsIFwiMHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidmlzaWJpbGl0eVwiLCBcImhpZGRlblwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBhc3N3b3JkLW1hdGNoZXItaW5wdXQtdmFsdWUtZXJyb3ItdmlzaWJsZVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zaXRpb25cIiwgXCJtYXgtaGVpZ2h0IC4zcywgcGFkZGluZyAuMnMsIG9wYWNpdHkgLjJzIC4yc1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIxXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZ1wiLCBcIjEwcHggMjBweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1heC1oZWlnaHRcIiwgXCIyNTBweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgXCJibG9ja1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInZpc2liaWxpdHlcIiwgXCJ2aXNpYmxlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luLXRvcFwiLCBcIjEwcHhcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5wYXNzd29yZC1tYXRjaGVyLWlucHV0LXZhbHVlLWVycm9yIGlcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLCBcImFic29sdXRlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidG9wXCIsIFwiMTAwJVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImxlZnRcIiwgXCIzMCVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tbGVmdFwiLCBcIi0xNXB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwid2lkdGhcIiwgXCIzMHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiaGVpZ2h0XCIsIFwiMTVweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm92ZXJmbG93XCIsIFwiaGlkZGVuXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucGFzc3dvcmQtbWF0Y2hlci1pbnB1dC12YWx1ZS1lcnJvciBpOjphZnRlclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbnRlbnRcIiwgXCInJ1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBvc2l0aW9uXCIsIFwiYWJzb2x1dGVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLCBcIjE1cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJoZWlnaHRcIiwgXCIxNXB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibGVmdFwiLCBcIjUwJVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZSgtNTAlLC01MCUpIHJvdGF0ZSg0NWRlZylcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiI0ZGRkZFMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJveC1zaGFkb3dcIiwgXCIwIDFweCA4cHggcmdiYSgwLDAsMCwwLjUpXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucGFzc3dvcmQtbWF0Y2hlci1pbnB1dC12YWx1ZS1jcmllcmlhLWxpc3RcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tdG9wXCIsIFwiMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpbi1ib3R0b21cIiwgXCIwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZy1pbmxpbmUtc3RhcnRcIiwgXCIyZW1cIilcbiAgICAgICAgICAgIC5jbG9zZSgpO1xuXG4gICAgICAgIHJldHVybiBzdHlsZXNoZWV0QnVpbGRlci5idWlsZCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Q29tcG9uZW50QnVpbGRlcn0gY29tcG9uZW50QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyB7Q29tcG9uZW50fVxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZENvbXBvbmVudChjb21wb25lbnRCdWlsZGVyKSB7XG4gICAgICAgIHJldHVybiBjb21wb25lbnRCdWlsZGVyXG4gICAgICAgICAgICAucm9vdChcImRpdlwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwiZGl2XCIsIFwiaWQ9cGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZUVycm9yXCIsIFwiY2xhc3M9cGFzc3dvcmQtbWF0Y2hlci1pbnB1dC12YWx1ZS1lcnJvciBwYXNzd29yZC1tYXRjaGVyLWlucHV0LXZhbHVlLWVycm9yLWhpZGRlblwiKVxuICAgICAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAgICAgLnRleHQoXCJNaW5pbXVtIDggY2hhcmFjdGVycyBjb250YWluaW5nOlwiKVxuICAgICAgICAgICAgICAgICAgICAubm9kZShcInVsXCIsIFwiY2xhc3M9cGFzc3dvcmQtbWF0Y2hlci1pbnB1dC12YWx1ZS1jcmllcmlhLWxpc3RcIilcbiAgICAgICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm5vZGUoXCJsaVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50ZXh0KFwiTGV0dGVyKHMpXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm5vZGUoXCJsaVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50ZXh0KFwiTnVtYmVyKHMpXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm5vZGUoXCJsaVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50ZXh0KFwiU3BlY2lhbCBjaGFyYWN0ZXIocykgIz8hQCQlXiYqLVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgICAgICAgICAgLm5vZGUoXCJpXCIpXG4gICAgICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgICAgICAubm9kZShcImlucHV0XCIsIFwiYXV0b2NvbXBsZXRlPW5ldy1wYXNzd29yZFwiLCBcImlkPXBhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWVGaWVsZFwiLCBcInR5cGU9cGFzc3dvcmRcIiwgXCJjbGFzcz1wYXNzd29yZC1tYXRjaGVyLWlucHV0LXZhbHVlLWVudHJ5XCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgc2hvd1ZhbGlkYXRpb25FcnJvcigpIHsgdGhpcy5jb21wb25lbnQuZ2V0KHRoaXMuZXJyb3JFbGVtZW50SWQpLnNldEF0dHJpYnV0ZVZhbHVlKFwiY2xhc3NcIiwgXCJwYXNzd29yZC1tYXRjaGVyLWlucHV0LXZhbHVlLWVycm9yIHBhc3N3b3JkLW1hdGNoZXItaW5wdXQtdmFsdWUtZXJyb3ItdmlzaWJsZVwiKTsgfVxuICAgIGhpZGVWYWxpZGF0aW9uRXJyb3IoKSB7IHRoaXMuY29tcG9uZW50LmdldCh0aGlzLmVycm9yRWxlbWVudElkKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImNsYXNzXCIsIFwicGFzc3dvcmQtbWF0Y2hlci1pbnB1dC12YWx1ZS1lcnJvciBwYXNzd29yZC1tYXRjaGVyLWlucHV0LXZhbHVlLWVycm9yLWhpZGRlblwiKTsgfVxufVxuXG5UeXBlQ29uZmlnUGFjay5pbnN0YW5jZSgpLmFkZFR5cGVDb25maWcoXCJudXR0aW4yYy11aVwiLCBQcm90b3R5cGVDb25maWcudW5uYW1lZChQYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlKSk7IiwiaW1wb3J0IHsgQ29tcG9uZW50LCBDb21wb25lbnRCdWlsZGVyLCBFcXVhbHNQcm9wZXJ0eVZhbGlkYXRvciwgU3R5bGVzaGVldCwgU3R5bGVzaGVldEJ1aWxkZXIgfSBmcm9tIFwibnV0dGluMmMtY29yZV92MVwiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5pbXBvcnQgeyBDb21tb25JbnB1dCB9IGZyb20gXCIuLi8uLi9jb21tb25JbnB1dC5qc1wiO1xuaW1wb3J0IHsgUHJvdG90eXBlQ29uZmlnLCBUeXBlQ29uZmlnUGFjayB9IGZyb20gXCJtaW5kaV92MVwiO1xuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIlBhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbFwiKTtcblxuZXhwb3J0IGNsYXNzIFBhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbCBleHRlbmRzIENvbW1vbklucHV0IHtcblxuICAgIHN0YXRpYyBERUZBVUxUX1BMQUNFSE9MREVSID0gXCJDb25maXJtIHBhc3N3b3JkXCI7XG4gICAgXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gbW9kZWxcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbW9kZWxDb21wYXJlZFByb3BlcnR5TmFtZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwbGFjZWhvbGRlclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gbWFuZGF0b3J5XG4gICAgICovXG4gICAgY29uc3RydWN0b3IobmFtZSwgbW9kZWwgPSBudWxsLCBtb2RlbENvbXBhcmVkUHJvcGVydHlOYW1lID0gbnVsbCwgcGxhY2Vob2xkZXIgPSBUZXh0SW5wdXQuREVGQVVMVF9QTEFDRUhPTERFUixcbiAgICAgICAgICAgbWFuZGF0b3J5ID0gZmFsc2UpIHtcblxuICAgICAgICBzdXBlcihQYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2wsXG4gICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgbW9kZWwsXG4gICAgICAgICAgICBuZXcgRXF1YWxzUHJvcGVydHlWYWxpZGF0b3IobWFuZGF0b3J5LCBmYWxzZSwgbW9kZWwsIG1vZGVsQ29tcGFyZWRQcm9wZXJ0eU5hbWUpLFxuICAgICAgICAgICAgcGxhY2Vob2xkZXIsXG4gICAgICAgICAgICBcInBhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbEZpZWxkXCIsXG4gICAgICAgICAgICBcInBhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbEVycm9yXCIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3R5bGVzaGVldEJ1aWxkZXJ9IHN0eWxlc2hlZXRCdWlsZGVyIFxuICAgICAqIEByZXR1cm5zIHtTdHlsZXNoZWV0fVxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZFN0eWxlc2hlZXQoc3R5bGVzaGVldEJ1aWxkZXIpIHtcbiAgICAgICAgc3R5bGVzaGVldEJ1aWxkZXJcbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5wYXNzd29yZC1tYXRjaGVyLWlucHV0LWNvbnRyb2wtZW50cnlcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLCBcIjEwMCVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJoZWlnaHRcIiwgXCJjYWxjKDEuNWVtICsgMC43NXJlbSArIDJweClcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwYWRkaW5nXCIsIFwiMC4zNzVyZW0gMC43NXJlbVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtc2l6ZVwiLCBcIjFyZW1cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmb250LXdlaWdodFwiLCBcIjQwMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImxpbmUtaGVpZ2h0XCIsIFwiMS41XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCIjNDk1MDU3XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiNmZmZcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNsaXBcIiwgXCJwYWRkaW5nLWJveFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlclwiLCBcIjFweCBzb2xpZCAjY2VkNGRhXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyLXJhZGl1c1wiLCBcIjAuMjVyZW1cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2l0aW9uXCIsIFwiYm9yZGVyLWNvbG9yIDAuMTVzIGVhc2UtaW4tb3V0LCBib3gtc2hhZG93IDAuMTVzIGVhc2UtaW4tb3V0XCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucGFzc3dvcmQtbWF0Y2hlci1pbnB1dC1jb250cm9sLWVycm9yXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwid2lkdGhcIiwgXCJmaXQtY29udGVudFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbG9yXCIsIFwiIzMzMzMzM1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZSgrNXB4LC01cHgpXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiNGRkZGRTBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmb250LXdlaWdodFwiLCBcIm5vcm1hbFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtc2l6ZVwiLCBcIjE0cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItcmFkaXVzXCIsIFwiOHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIiwgXCJyZWxhdGl2ZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInotaW5kZXhcIiwgXCI5OTk5OTk5OFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJveC1zaXppbmdcIiwgXCJib3JkZXItYm94XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm94LXNoYWRvd1wiLCBcIjAgMXB4IDhweCByZ2JhKDAsMCwwLDAuNSlcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjdXJzb3JcIiwgXCJwb2ludGVyXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucGFzc3dvcmQtbWF0Y2hlci1pbnB1dC1jb250cm9sLWVycm9yLWhpZGRlblwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zaXRpb25cIiwgXCJtYXgtaGVpZ2h0IC4zcyAuMnMsIHBhZGRpbmcgLjNzIC4ycywgb3BhY2l0eSAuMnMgMHMsIHZpc2liaWxpdHkgMHMgLjJzXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCBcIjBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwYWRkaW5nXCIsIFwiMHB4IDBweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1heC1oZWlnaHRcIiwgXCIwcHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ2aXNpYmlsaXR5XCIsIFwiaGlkZGVuXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucGFzc3dvcmQtbWF0Y2hlci1pbnB1dC1jb250cm9sLWVycm9yLXZpc2libGVcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2l0aW9uXCIsIFwibWF4LWhlaWdodCAuM3MsIHBhZGRpbmcgLjJzLCBvcGFjaXR5IC4ycyAuMnNcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmdcIiwgXCIxMHB4IDIwcHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXgtaGVpZ2h0XCIsIFwiNTBweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgXCJibG9ja1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInZpc2liaWxpdHlcIiwgXCJ2aXNpYmxlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luLXRvcFwiLCBcIjEwcHhcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5wYXNzd29yZC1tYXRjaGVyLWlucHV0LWNvbnRyb2wtZXJyb3IgaVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBvc2l0aW9uXCIsIFwiYWJzb2x1dGVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0b3BcIiwgXCIxMDAlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibGVmdFwiLCBcIjMwJVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpbi1sZWZ0XCIsIFwiLTE1cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLCBcIjMwcHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJoZWlnaHRcIiwgXCIxNXB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwib3ZlcmZsb3dcIiwgXCJoaWRkZW5cIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5wYXNzd29yZC1tYXRjaGVyLWlucHV0LWNvbnRyb2wtZXJyb3IgaTo6YWZ0ZXJcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjb250ZW50XCIsIFwiJydcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLCBcImFic29sdXRlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwid2lkdGhcIiwgXCIxNXB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiaGVpZ2h0XCIsIFwiMTVweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImxlZnRcIiwgXCI1MCVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoLTUwJSwtNTAlKSByb3RhdGUoNDVkZWcpXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiNGRkZGRTBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3gtc2hhZG93XCIsIFwiMCAxcHggOHB4IHJnYmEoMCwwLDAsMC41KVwiKVxuICAgICAgICAgICAgLmNsb3NlKCk7XG5cbiAgICAgICAgcmV0dXJuIHN0eWxlc2hlZXRCdWlsZGVyLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDb21wb25lbnRCdWlsZGVyfSBjb21wb25lbnRCdWlsZGVyIFxuICAgICAqIEByZXR1cm5zIHtDb21wb25lbnR9XG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkQ29tcG9uZW50KGNvbXBvbmVudEJ1aWxkZXIpIHtcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudEJ1aWxkZXJcbiAgICAgICAgICAgIC5yb290KFwiZGl2XCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLm5vZGUoXCJkaXZcIiwgXCJpZD1wYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2xFcnJvclwiLCBcImNsYXNzPXBhc3N3b3JkLW1hdGNoZXItaW5wdXQtY29udHJvbC1lcnJvciBwYXNzd29yZC1tYXRjaGVyLWlucHV0LWNvbnRyb2wtZXJyb3ItaGlkZGVuXCIpXG4gICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAudGV4dChcIlBhc3N3b3JkcyBtdXN0IG1hdGNoXCIpXG4gICAgICAgICAgICAgICAgICAgIC5ub2RlKFwiaVwiKVxuICAgICAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAgICAgLm5vZGUoXCJpbnB1dFwiLCBcImlkPXBhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbEZpZWxkXCIsIFwidHlwZT1wYXNzd29yZFwiLCBcImF1dG9jb21wbGV0ZT1uZXctcGFzc3dvcmRcIiwgXCJjbGFzcz1wYXNzd29yZC1tYXRjaGVyLWlucHV0LWNvbnRyb2wtZW50cnlcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAuYnVpbGQoKTtcbiAgICB9XG5cbiAgICBzaG93VmFsaWRhdGlvbkVycm9yKCkgeyB0aGlzLmNvbXBvbmVudC5nZXQodGhpcy5lcnJvckVsZW1lbnRJZCkuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLCBcInBhc3N3b3JkLW1hdGNoZXItaW5wdXQtY29udHJvbC1lcnJvciBwYXNzd29yZC1tYXRjaGVyLWlucHV0LWNvbnRyb2wtZXJyb3ItdmlzaWJsZVwiKTsgfVxuICAgIGhpZGVWYWxpZGF0aW9uRXJyb3IoKSB7IHRoaXMuY29tcG9uZW50LmdldCh0aGlzLmVycm9yRWxlbWVudElkKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImNsYXNzXCIsIFwicGFzc3dvcmQtbWF0Y2hlci1pbnB1dC1jb250cm9sLWVycm9yIHBhc3N3b3JkLW1hdGNoZXItaW5wdXQtY29udHJvbC1lcnJvci1oaWRkZW5cIik7IH1cbn1cblxuVHlwZUNvbmZpZ1BhY2suaW5zdGFuY2UoKS5hZGRUeXBlQ29uZmlnKFwibnV0dGluMmMtdWlcIiwgUHJvdG90eXBlQ29uZmlnLnVubmFtZWQoUGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sKSk7IiwiaW1wb3J0IHsgUHJvdG90eXBlQ29uZmlnLCBUeXBlQ29uZmlnUGFjayB9IGZyb20gXCJtaW5kaV92MVwiO1xuXG5leHBvcnQgY2xhc3MgUGFzc3dvcmRNYXRjaGVyTW9kZWwge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMubmV3UGFzc3dvcmQgPSBudWxsO1xuICAgICAgICB0aGlzLmNvbnRyb2xQYXNzd29yZCA9IG51bGw7XG4gICAgfVxuXG4gICAgc2V0TmV3UGFzc3dvcmQobmV3UGFzc3dvcmQpIHtcbiAgICAgICAgdGhpcy5uZXdQYXNzd29yZCA9IG5ld1Bhc3N3b3JkO1xuICAgIH1cblxuICAgIGdldE5ld1Bhc3N3b3JkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5uZXdQYXNzd29yZDtcbiAgICB9XG5cbiAgICBzZXRDb250cm9sUGFzc3dvcmQoY29udHJvbFBhc3N3b3JkKSB7XG4gICAgICAgIHRoaXMuY29udHJvbFBhc3N3b3JkID0gY29udHJvbFBhc3N3b3JkO1xuICAgIH1cblxuICAgIGdldENvbnRyb2xQYXNzd29yZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udHJvbFBhc3N3b3JkO1xuICAgIH1cblxufVxuXG5UeXBlQ29uZmlnUGFjay5pbnN0YW5jZSgpLmFkZFR5cGVDb25maWcoXCJudXR0aW4yYy11aVwiLCBQcm90b3R5cGVDb25maWcudW5uYW1lZChQYXNzd29yZE1hdGNoZXJNb2RlbCkpOyIsImltcG9ydCB7IFxuICAgIENhbnZhc1N0eWxlcyxcbiAgICBBbmRWYWxpZGF0b3JTZXQsXG4gICAgQ29tcG9uZW50LFxuICAgIEV2ZW50TWFuYWdlcixcbiAgICBTdHlsZXNoZWV0QnVpbGRlcixcbiAgICBTdHlsZXNoZWV0LFxuICAgIENvbXBvbmVudEJ1aWxkZXIsXG4gICAgSW5saW5lQ29tcG9uZW50RmFjdG9yeVxufSBmcm9tIFwibnV0dGluMmMtY29yZV92MVwiO1xuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQsIFByb3RvdHlwZUNvbmZpZywgVHlwZUNvbmZpZ1BhY2sgfSBmcm9tIFwibWluZGlfdjFcIjtcbmltcG9ydCB7IExvZ2dlciwgUHJvcGVydHlBY2Nlc3NvciwgTWV0aG9kIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5pbXBvcnQgeyBQYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlIH0gZnJvbSBcIi4vcGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZS9wYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlLmpzXCI7XG5pbXBvcnQgeyBQYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2wgfSBmcm9tIFwiLi9wYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2wvcGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sLmpzXCI7XG5pbXBvcnQgeyBQYXNzd29yZE1hdGNoZXJNb2RlbCB9IGZyb20gXCIuL3Bhc3N3b3JkTWF0Y2hlck1vZGVsLmpzXCI7XG5pbXBvcnQgeyBDb21tb25JbnB1dCB9IGZyb20gXCIuLi9jb21tb25JbnB1dC5qc1wiO1xuXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiUGFzc3dvcmRNYXRjaGVySW5wdXRcIik7XG5cbmV4cG9ydCBjbGFzcyBQYXNzd29yZE1hdGNoZXJJbnB1dCB7XG5cblx0c3RhdGljIEVWRU5UX1ZBTElEQVRFRF9FTlRFUkVEID0gXCJ2YWxpZGF0ZWRFbnRlcmVkXCI7XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBtb2RlbFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwbGFjZWhvbGRlclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb250cm9sUGxhY2Vob2xkZXJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IG1hbmRhdG9yeVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsXG4gICAgICAgIG1vZGVsID0gbnVsbCxcbiAgICAgICAgcGxhY2Vob2xkZXIgPSBQYXNzd29yZE1hdGNoZXJJbnB1dC5ERUZBVUxUX1BMQUNFSE9MREVSLCBcbiAgICAgICAgY29udHJvbFBsYWNlaG9sZGVyID0gUGFzc3dvcmRNYXRjaGVySW5wdXQuREVGQVVMVF9DT05UUk9MX1BMQUNFSE9MREVSLFxuICAgICAgICBtYW5kYXRvcnkgPSBmYWxzZSkge1xuXG4gICAgICAgIC8qKiBAdHlwZSB7SW5saW5lQ29tcG9uZW50RmFjdG9yeX0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoSW5saW5lQ29tcG9uZW50RmFjdG9yeSk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnR9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gbnVsbDtcblxuICAgICAgICAvKiogQHR5cGUge0FuZFZhbGlkYXRvclNldH0gKi9cbiAgICAgICAgdGhpcy52YWxpZGF0b3IgPSBudWxsO1xuXG4gICAgICAgIHRoaXMucGFzc3dvcmRNYXRjaGVyTW9kZWwgPSBuZXcgUGFzc3dvcmRNYXRjaGVyTW9kZWwoKTtcblxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLm1vZGVsID0gbW9kZWw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtQYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlfSAqL1xuXHRcdHRoaXMucGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKFBhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWUsXG4gICAgICAgICAgICBbXCJuZXdQYXNzd29yZFwiLCB0aGlzLnBhc3N3b3JkTWF0Y2hlck1vZGVsLCBwbGFjZWhvbGRlciwgbWFuZGF0b3J5XVxuXHRcdCk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtQYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2x9ICovXG5cdFx0dGhpcy5wYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2wgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShQYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2wsXG4gICAgICAgICAgICBbXCJjb250cm9sUGFzc3dvcmRcIiwgdGhpcy5wYXNzd29yZE1hdGNoZXJNb2RlbCwgXCJuZXdQYXNzd29yZFwiLCBjb250cm9sUGxhY2Vob2xkZXIsIG1hbmRhdG9yeV1cblx0XHQpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7RXZlbnRNYW5hZ2VyfSAqL1xuICAgICAgICB0aGlzLmV2ZW50TWFuYWdlciA9IG5ldyBFdmVudE1hbmFnZXIoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0eWxlc2hlZXRCdWlsZGVyfSBzdHlsZXNoZWV0QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyB7U3R5bGVzaGVldH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRTdHlsZXNoZWV0KHN0eWxlc2hlZXRCdWlsZGVyKSB7XG4gICAgICAgc3R5bGVzaGVldEJ1aWxkZXJcbiAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBhc3N3b3JkLW1hdGNoZXItaW5wdXQtaGludFwiKVxuICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAuc3R5bGUoXCJjb2xvclwiLCBcIiM4ODg4ODhcIilcbiAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtc2l6ZVwiLCBcIjAuOGVtXCIpXG4gICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tYm90dG9tXCIsIFwiMXJlbVwiKVxuICAgICAgICAgICAgICAgLnN0eWxlKFwid2hpdGUtc3BhY2VcIiwgXCJub3dyYXBcIilcbiAgICAgICAgICAgLmNsb3NlKCk7XG5cbiAgICAgICByZXR1cm4gc3R5bGVzaGVldEJ1aWxkZXIuYnVpbGQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudEJ1aWxkZXJ9IGNvbXBvbmVudEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMge0NvbXBvbmVudH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRDb21wb25lbnQoY29tcG9uZW50QnVpbGRlcikge1xuICAgICAgICByZXR1cm4gY29tcG9uZW50QnVpbGRlclxuICAgICAgICAgICAgLnJvb3QoXCJkaXZcIiwgXCJjbGFzcz1wYXNzd29yZC1tYXRjaGVyLWlucHV0LXJvb3RcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAubm9kZShcImRpdlwiLCBcImlkPXBhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWVcIilcbiAgICAgICAgICAgICAgICAubm9kZShcImRpdlwiLCBcImlkPXBhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbFwiKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwiZGl2XCIsIFwiY2xhc3M9cGFzc3dvcmQtbWF0Y2hlci1pbnB1dC1oaW50XCIpXG4gICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAudGV4dChcIiogTXVzdCBjb250YWluIGxldHRlcnMsIG51bWJlcnMgYW5kIHNwZWNpYWwgY2hhcmFjdGVyc1wiKVxuICAgICAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgYXN5bmMgcG9zdENvbmZpZygpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKFBhc3N3b3JkTWF0Y2hlcklucHV0KTtcblxuICAgICAgICBDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUoUGFzc3dvcmRNYXRjaGVySW5wdXQubmFtZSk7XG5cbiAgICAgICAgdGhpcy5jb21wb25lbnQuc2V0Q2hpbGQoXCJwYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlXCIsdGhpcy5wYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlLmNvbXBvbmVudCk7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LnNldENoaWxkKFwicGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sXCIsdGhpcy5wYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2wuY29tcG9uZW50KTtcblxuICAgICAgICB0aGlzLnBhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWUuZXZlbnRzXG4gICAgICAgICAgICAubGlzdGVuVG8oQ29tbW9uSW5wdXQuRVZFTlRfRU5URVJFRCwgdGhpcy5wYXNzd29yZFZhbHVlRW50ZXJlZCwgdGhpcylcbiAgICAgICAgICAgIC5saXN0ZW5UbyhDb21tb25JbnB1dC5FVkVOVF9LRVlVUFBFRCwgdGhpcy5wYXNzd29yZFZhbHVlQ2hhbmdlZCwgdGhpcyk7XG5cbiAgICAgICAgdGhpcy5wYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2wuZXZlbnRzXG4gICAgICAgICAgICAubGlzdGVuVG8oQ29tbW9uSW5wdXQuRVZFTlRfRU5URVJFRCwgdGhpcy5wYXNzd29yZENvbnRyb2xFbnRlcmVkLCB0aGlzKTtcblxuICAgICAgICAvKiogQHR5cGUge0FuZFZhbGlkYXRvclNldH0gKi9cbiAgICAgICAgdGhpcy52YWxpZGF0b3IgPSBuZXcgQW5kVmFsaWRhdG9yU2V0KClcbiAgICAgICAgICAgIC53aXRoVmFsaWRhdG9yKHRoaXMucGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZS52YWxpZGF0b3IpXG4gICAgICAgICAgICAud2l0aFZhbGlkYXRvcih0aGlzLnBhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbC52YWxpZGF0b3IpXG4gICAgICAgICAgICAud2l0aFZhbGlkTGlzdGVuZXIobmV3IE1ldGhvZCh0aGlzLnBhc3N3b3JkTWF0Y2hlclZhbGlkT2NjdXJlZCwgdGhpcykpO1xuXG4gICAgfVxuXG4gICAgZ2V0IGV2ZW50cygpIHsgcmV0dXJuIHRoaXMuZXZlbnRNYW5hZ2VyOyB9XG5cbiAgICBwYXNzd29yZE1hdGNoZXJWYWxpZE9jY3VyZWQoKSB7XG4gICAgICAgIFByb3BlcnR5QWNjZXNzb3Iuc2V0VmFsdWUodGhpcy5tb2RlbCwgdGhpcy5uYW1lLCB0aGlzLnBhc3N3b3JkTWF0Y2hlck1vZGVsLmdldE5ld1Bhc3N3b3JkKCkpXG4gICAgfVxuXG4gICAgcGFzc3dvcmRWYWx1ZUVudGVyZWQoZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMucGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZS52YWxpZGF0b3IuaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICB0aGlzLnBhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbC5mb2N1cygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcGFzc3dvcmRWYWx1ZUNoYW5nZWQoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5wYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2wuY2xlYXIoKTtcbiAgICB9XG5cbiAgICBwYXNzd29yZENvbnRyb2xFbnRlcmVkKGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLnZhbGlkYXRvci5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzLnRyaWdnZXIoUGFzc3dvcmRNYXRjaGVySW5wdXQuRVZFTlRfVkFMSURBVEVEX0VOVEVSRUQsIGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZvY3VzKCkgeyB0aGlzLnBhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWUuZm9jdXMoKTsgfVxuICAgIHNlbGVjdEFsbCgpIHsgdGhpcy5wYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlLnNlbGVjdEFsbCgpOyB9XG4gICAgZW5hYmxlKCkgeyB0aGlzLnBhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWUuZW5hYmxlKCk7IHRoaXMucGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sLmVuYWJsZSgpOyB9XG4gICAgZGlzYWJsZSgpIHsgdGhpcy5wYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlLmRpc2FibGUoKTsgdGhpcy5wYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2wuZGlzYWJsZSgpOyB9XG4gICAgY2xlYXIoKSB7IHRoaXMucGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZS5jbGVhcigpOyB0aGlzLnBhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbC5jbGVhcigpOyB9XG59XG5cblR5cGVDb25maWdQYWNrLmluc3RhbmNlKCkuYWRkVHlwZUNvbmZpZyhcIm51dHRpbjJjLXVpXCIsIFByb3RvdHlwZUNvbmZpZy51bm5hbWVkKFBhc3N3b3JkTWF0Y2hlcklucHV0KSk7IiwiaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5pbXBvcnQgeyBDb21tb25JbnB1dCB9IGZyb20gXCIuLi9jb21tb25JbnB1dC5qc1wiO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBDb21wb25lbnRCdWlsZGVyLCBQaG9uZVZhbGlkYXRvciwgU3R5bGVzaGVldCwgU3R5bGVzaGVldEJ1aWxkZXIgfSBmcm9tIFwibnV0dGluMmMtY29yZV92MVwiO1xuaW1wb3J0IHsgUHJvdG90eXBlQ29uZmlnLCBUeXBlQ29uZmlnUGFjayB9IGZyb20gXCJtaW5kaV92MVwiO1xuXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiUGhvbmVJbnB1dFwiKTtcblxuZXhwb3J0IGNsYXNzIFBob25lSW5wdXQgZXh0ZW5kcyBDb21tb25JbnB1dCB7XG5cbiAgICBzdGF0aWMgREVGQVVMVF9QTEFDRUhPTERFUiA9IFwiUGhvbmVcIjtcbiAgICBcbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBtb2RlbFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwbGFjZWhvbGRlclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gbWFuZGF0b3J5XG4gICAgICovXG4gICAgY29uc3RydWN0b3IobmFtZSwgbW9kZWwgPSBudWxsLCBwbGFjZWhvbGRlciA9IFRleHRJbnB1dC5ERUZBVUxUX1BMQUNFSE9MREVSLCBtYW5kYXRvcnkgPSBmYWxzZSkge1xuXG4gICAgICAgIHN1cGVyKFBob25lSW5wdXQsXG4gICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgbW9kZWwsXG4gICAgICAgICAgICBuZXcgUGhvbmVWYWxpZGF0b3IobWFuZGF0b3J5LCAhbWFuZGF0b3J5KSxcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyLFxuICAgICAgICAgICAgXCJwaG9uZUlucHV0XCIsXG4gICAgICAgICAgICBcInBob25lRXJyb3JcIik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHlsZXNoZWV0QnVpbGRlcn0gc3R5bGVzaGVldEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMge1N0eWxlc2hlZXR9XG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkU3R5bGVzaGVldChzdHlsZXNoZWV0QnVpbGRlcikge1xuICAgICAgIHN0eWxlc2hlZXRCdWlsZGVyXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucGhvbmUtaW5wdXQtZW50cnlcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLCBcIjEwMCVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJoZWlnaHRcIiwgXCJjYWxjKDEuNWVtICsgMC43NXJlbSArIDJweClcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwYWRkaW5nXCIsIFwiMC4zNzVyZW0gMC43NXJlbVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtc2l6ZVwiLCBcIjFyZW1cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmb250LXdlaWdodFwiLCBcIjQwMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImxpbmUtaGVpZ2h0XCIsIFwiMS41XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCIjNDk1MDU3XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiNmZmZcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNsaXBcIiwgXCJwYWRkaW5nLWJveFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlclwiLCBcIjFweCBzb2xpZCAjY2VkNGRhXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyLXJhZGl1c1wiLCBcIjAuMjVyZW1cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2l0aW9uXCIsIFwiYm9yZGVyLWNvbG9yIDAuMTVzIGVhc2UtaW4tb3V0LCBib3gtc2hhZG93IDAuMTVzIGVhc2UtaW4tb3V0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luLWJvdHRvbVwiLCBcIjFyZW1cIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5waG9uZS1pbnB1dC1lcnJvclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIndpZHRoXCIsIFwiZml0LWNvbnRlbnRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjb2xvclwiLCBcIiMzMzMzMzNcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoKzVweCwtNXB4KVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIiwgXCIjRkZGRkUwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZm9udC13ZWlnaHRcIiwgXCJub3JtYWxcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmb250LXNpemVcIiwgXCIxNHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyLXJhZGl1c1wiLCBcIjhweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBvc2l0aW9uXCIsIFwicmVsYXRpdmVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ6LWluZGV4XCIsIFwiOTk5OTk5OThcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3gtc2l6aW5nXCIsIFwiYm9yZGVyLWJveFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJveC1zaGFkb3dcIiwgXCIwIDFweCA4cHggcmdiYSgwLDAsMCwwLjUpXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY3Vyc29yXCIsIFwicG9pbnRlclwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBob25lLWlucHV0LWVycm9yLWhpZGRlblwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zaXRpb25cIiwgXCJtYXgtaGVpZ2h0IC4zcyAuMnMsIHBhZGRpbmcgLjNzIC4ycywgb3BhY2l0eSAuMnMgMHMsIHZpc2liaWxpdHkgMHMgLjJzXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCBcIjBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwYWRkaW5nXCIsIFwiMHB4IDBweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1heC1oZWlnaHRcIiwgXCIwcHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ2aXNpYmlsaXR5XCIsIFwiaGlkZGVuXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucGhvbmUtaW5wdXQtZXJyb3ItdmlzaWJsZVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zaXRpb25cIiwgXCJtYXgtaGVpZ2h0IC4zcywgcGFkZGluZyAuMnMsIG9wYWNpdHkgLjJzIC4yc1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIxXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZ1wiLCBcIjEwcHggMjBweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1heC1oZWlnaHRcIiwgXCIxNTBweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgXCJibG9ja1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInZpc2liaWxpdHlcIiwgXCJ2aXNpYmxlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luLXRvcFwiLCBcIjEwcHhcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5waG9uZS1pbnB1dC1lcnJvciBpXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIiwgXCJhYnNvbHV0ZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRvcFwiLCBcIjEwMCVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJsZWZ0XCIsIFwiMzAlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luLWxlZnRcIiwgXCItMTVweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIndpZHRoXCIsIFwiMzBweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImhlaWdodFwiLCBcIjE1cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJvdmVyZmxvd1wiLCBcImhpZGRlblwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBob25lLWlucHV0LWVycm9yIGk6OmFmdGVyXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29udGVudFwiLCBcIicnXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIiwgXCJhYnNvbHV0ZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIndpZHRoXCIsIFwiMTVweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImhlaWdodFwiLCBcIjE1cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJsZWZ0XCIsIFwiNTAlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKC01MCUsLTUwJSkgcm90YXRlKDQ1ZGVnKVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIiwgXCIjRkZGRkUwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm94LXNoYWRvd1wiLCBcIjAgMXB4IDhweCByZ2JhKDAsMCwwLDAuNSlcIilcbiAgICAgICAgICAgIC5jbG9zZSgpO1xuXG4gICAgICAgIHJldHVybiBzdHlsZXNoZWV0QnVpbGRlci5idWlsZCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Q29tcG9uZW50QnVpbGRlcn0gY29tcG9uZW50QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyB7Q29tcG9uZW50fVxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZENvbXBvbmVudChjb21wb25lbnRCdWlsZGVyKSB7XG4gICAgICAgIGNvbXBvbmVudEJ1aWxkZXJcbiAgICAgICAgICAgIC5yb290KFwiZGl2XCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLm5vZGUoXCJkaXZcIiwgXCJpZD1waG9uZUVycm9yXCIsIFwiY2xhc3M9cGhvbmUtaW5wdXQtZXJyb3IgcGhvbmUtaW5wdXQtZXJyb3ItaGlkZGVuXCIpXG4gICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAudGV4dChcIkludmFsaWQgcGhvbmUgbnVtYmVyXCIpXG4gICAgICAgICAgICAgICAgICAgIC5ub2RlKFwidWxcIiwgXCJjbGFzcz1waG9uZS1tYXRjaGVyLWlucHV0LXZhbHVlLWNyaWVyaWEtbGlzdFwiKVxuICAgICAgICAgICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgICAgICAgICAubm9kZShcImxpXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRleHQoXCJNdXN0IHN0YXJ0IHdpdGggKyBzaWduXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm5vZGUoXCJsaVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50ZXh0KFwiZm9sbG93ZWQgYnkgbWluaW11bSA4IG51bWJlcnNcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAgICAgICAgIC5ub2RlKFwiaVwiKVxuICAgICAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAgICAgLm5vZGUoXCJpbnB1dFwiLCBcImlkPXBob25lSW5wdXRcIiwgXCJ0eXBlPXRleHRcIiwgXCJjbGFzcz1waG9uZS1pbnB1dC1lbnRyeVwiKVxuICAgICAgICAgICAgLmNsb3NlKCk7XG4gICAgICAgIHJldHVybiBjb21wb25lbnRCdWlsZGVyLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgc2hvd1ZhbGlkYXRpb25FcnJvcigpIHsgdGhpcy5jb21wb25lbnQuZ2V0KHRoaXMuZXJyb3JFbGVtZW50SWQpLnNldEF0dHJpYnV0ZVZhbHVlKFwiY2xhc3NcIiwgXCJwaG9uZS1pbnB1dC1lcnJvciBwaG9uZS1pbnB1dC1lcnJvci12aXNpYmxlXCIpOyB9XG4gICAgaGlkZVZhbGlkYXRpb25FcnJvcigpIHsgdGhpcy5jb21wb25lbnQuZ2V0KHRoaXMuZXJyb3JFbGVtZW50SWQpLnNldEF0dHJpYnV0ZVZhbHVlKFwiY2xhc3NcIiwgXCJwaG9uZS1pbnB1dC1lcnJvciBwaG9uZS1pbnB1dC1lcnJvci1oaWRkZW5cIik7IH1cbn1cblxuVHlwZUNvbmZpZ1BhY2suaW5zdGFuY2UoKS5hZGRUeXBlQ29uZmlnKFwibnV0dGluMmMtdWlcIiwgUHJvdG90eXBlQ29uZmlnLnVubmFtZWQoUGhvbmVJbnB1dCkpOyIsImltcG9ydCB7XG4gICAgQ2FudmFzU3R5bGVzLFxuICAgIENvbXBvbmVudCxcbiAgICBJbnB1dEVsZW1lbnREYXRhQmluZGluZyxcbiAgICBFdmVudE1hbmFnZXIsXG4gICAgU3R5bGVzaGVldEJ1aWxkZXIsXG4gICAgU3R5bGVzaGVldCxcbiAgICBDb21wb25lbnRCdWlsZGVyLFxuICAgIElubGluZUNvbXBvbmVudEZhY3Rvcnlcbn0gZnJvbSBcIm51dHRpbjJjLWNvcmVfdjFcIjtcbmltcG9ydCB7IEluamVjdGlvblBvaW50LCBQcm90b3R5cGVDb25maWcsIFR5cGVDb25maWdQYWNrIH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcbmltcG9ydCB7IENvbW1vbkV2ZW50cyB9IGZyb20gXCIuLi8uLi9jb21tb24vY29tbW9uRXZlbnRzXCI7XG5cbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJSYWRpb0J1dHRvblwiKTtcblxuZXhwb3J0IGNsYXNzIFJhZGlvQnV0dG9uIHtcbiAgICBcbiAgICBzdGF0aWMgRVZFTlRfQ0xJQ0tFRCA9IENvbW1vbkV2ZW50cy5DTElDS0VEO1xuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG1vZGVsXG4gICAgICovXG4gICAgY29uc3RydWN0b3IobmFtZSwgbW9kZWwgPSBudWxsKSB7XG4gICAgICAgIFxuICAgICAgICAvKiogQHR5cGUge0lubGluZUNvbXBvbmVudEZhY3Rvcnl9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKElubGluZUNvbXBvbmVudEZhY3RvcnkpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7RXZlbnRNYW5hZ2VyfSAqL1xuICAgICAgICB0aGlzLmV2ZW50cyA9IG5ldyBFdmVudE1hbmFnZXIoKTtcblxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudH0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSBudWxsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7b2JqZWN0fSAqL1xuICAgICAgICB0aGlzLm1vZGVsID0gbW9kZWw7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0eWxlc2hlZXRCdWlsZGVyfSBzdHlsZXNoZWV0QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyB7U3R5bGVzaGVldH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRTdHlsZXNoZWV0KHN0eWxlc2hlZXRCdWlsZGVyKSB7XG4gICAgICAgIHN0eWxlc2hlZXRCdWlsZGVyXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucmFkaW8tYnV0dG9uXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIiwgXCJyZWxhdGl2ZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmctbGVmdFwiLCBcIjJlbVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpbi1ib3R0b21cIiwgXCIwLjVlbVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImN1cnNvclwiLCBcInBvaW50ZXJcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCItd2Via2l0LXVzZXItc2VsZWN0XCIsIFwibm9uZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIi1tb3otdXNlci1zZWxlY3RcIiwgXCJub25lXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiLW1zLXVzZXItc2VsZWN0XCIsIFwibm9uZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInVzZXItc2VsZWN0XCIsIFwibm9uZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpbi1ib3R0b21cIiwgXCIxcmVtXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucmFkaW8tYnV0dG9uIGlucHV0XCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIiwgXCJhYnNvbHV0ZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY3Vyc29yXCIsIFwicG9pbnRlclwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImhlaWdodFwiLCBcIjBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLCBcIjBcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5yYWRpby1idXR0b24tbWFya1wiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBvc2l0aW9uXCIsIFwiYWJzb2x1dGVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0b3BcIiwgXCIwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibGVmdFwiLCBcIjBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLCBcIjIwcHRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJoZWlnaHRcIiwgXCIyMHB0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiNkZGRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItcmFkaXVzXCIsIFwiNTAlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyLXdpZHRoXCIsIFwiMXB0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyLXN0eWxlXCIsIFwic29saWRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItY29sb3JcIiwgXCIjYmJiXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucmFkaW8tYnV0dG9uOmhvdmVyIGlucHV0IH4gLmNoZWNrLWJveC1tYXJrXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiMyMTk2RjNcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5yYWRpby1idXR0b24gaW5wdXQ6Y2hlY2tlZCB+IC5yYWRpby1idXR0b24tbWFya1wiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIiwgXCIjZGRkXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucmFkaW8tYnV0dG9uLW1hcms6YWZ0ZXJcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjb250ZW50XCIsIFwiXFxcIlxcXCJcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLCBcImFic29sdXRlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLCBcIm5vbmVcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5yYWRpby1idXR0b24gaW5wdXQ6Y2hlY2tlZCB+IC5yYWRpby1idXR0b24tbWFyazphZnRlclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgXCJibG9ja1wiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnJhZGlvLWJ1dHRvbiAucmFkaW8tYnV0dG9uLW1hcms6YWZ0ZXJcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJsZWZ0XCIsIFwiNTAlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidG9wXCIsIFwiNTAlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKC01MCUsIC01MCUpXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwid2lkdGhcIiwgXCIxNHB0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiaGVpZ2h0XCIsIFwiMTRwdFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIiwgXCIjMjE5NkYzXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyLXJhZGl1c1wiLCBcIjUwJVwiKVxuICAgICAgICAgICAgLmNsb3NlKCk7XG4gICAgICAgIHJldHVybiBzdHlsZXNoZWV0QnVpbGRlci5idWlsZCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Q29tcG9uZW50QnVpbGRlcn0gY29tcG9uZW50QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyB7Q29tcG9uZW50fVxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZENvbXBvbmVudChjb21wb25lbnRCdWlsZGVyKSB7XG4gICAgICAgIHJldHVybiBjb21wb25lbnRCdWlsZGVyXG4gICAgICAgICAgICAucm9vdChcImxhYmVsXCIsIFwiY2xhc3M9cmFkaW8tYnV0dG9uXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLm5vZGUoXCJpbnB1dFwiLCBcImlkPXJhZGlvXCIsIFwidHlwZT1yYWRpb1wiKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwic3BhblwiLCBcImNsYXNzPXJhZGlvLWJ1dHRvbi1tYXJrXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgcG9zdENvbmZpZygpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKFJhZGlvQnV0dG9uKTtcbiAgICAgICAgQ2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKFJhZGlvQnV0dG9uLm5hbWUpO1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJyYWRpb1wiKS5zZXRBdHRyaWJ1dGVWYWx1ZShcIm5hbWVcIix0aGlzLm5hbWUpO1xuXG4gICAgICAgIGlmICh0aGlzLm1vZGVsKSB7XG4gICAgICAgICAgICBJbnB1dEVsZW1lbnREYXRhQmluZGluZy5saW5rKHRoaXMubW9kZWwpLnRvKHRoaXMuY29tcG9uZW50LmdldChcInJhZGlvXCIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcInJhZGlvXCIpLmxpc3RlblRvKFwiY2xpY2tcIiwgdGhpcy5jbGlja2VkLCB0aGlzKTtcbiAgICB9XG5cbiAgICBjbGlja2VkKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuZXZlbnRzLnRyaWdnZXIoUmFkaW9CdXR0b24uRVZFTlRfQ0xJQ0tFRCwgW2V2ZW50XSk7XG4gICAgfVxuXG59XG5cblR5cGVDb25maWdQYWNrLmluc3RhbmNlKCkuYWRkVHlwZUNvbmZpZyhcIm51dHRpbjJjLXVpXCIsIFByb3RvdHlwZUNvbmZpZy51bm5hbWVkKFJhZGlvQnV0dG9uKSk7IiwiaW1wb3J0IHtcbiAgICBDYW52YXNTdHlsZXMsXG4gICAgQ29tcG9uZW50LFxuICAgIElucHV0RWxlbWVudERhdGFCaW5kaW5nLFxuICAgIEV2ZW50TWFuYWdlcixcbiAgICBTdHlsZXNoZWV0QnVpbGRlcixcbiAgICBTdHlsZXNoZWV0LFxuICAgIENvbXBvbmVudEJ1aWxkZXIsXG4gICAgSW5saW5lQ29tcG9uZW50RmFjdG9yeVxufSBmcm9tIFwibnV0dGluMmMtY29yZV92MVwiO1xuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQsIFByb3RvdHlwZUNvbmZpZywgVHlwZUNvbmZpZ1BhY2sgfSBmcm9tIFwibWluZGlfdjFcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuaW1wb3J0IHsgQ29tbW9uRXZlbnRzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21tb25FdmVudHNcIjtcbmltcG9ydCB7IENvbnRhaW5lckV2ZW50IH0gZnJvbSBcImNvbnRhaW5lcmJyaWRnZV92MVwiO1xuXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiUmFkaW9Ub2dnbGVTd2l0Y2hcIik7XG5cbmV4cG9ydCBjbGFzcyBSYWRpb1RvZ2dsZVN3aXRjaCB7XG4gICAgXG4gICAgc3RhdGljIEVWRU5UX0VOQUJMRUQgPSBDb21tb25FdmVudHMuRU5BQkxFRDtcbiAgICBzdGF0aWMgRVZFTlRfRElTQUJMRUQgPSBDb21tb25FdmVudHMuRElTQUJMRUQ7XG4gICAgc3RhdGljIEVWRU5UX0NIQU5HRUQgPSBDb21tb25FdmVudHMuQ0hBTkdFRDtcblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBtb2RlbFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG1vZGVsID0gbnVsbCkge1xuICAgICAgICBcbiAgICAgICAgLyoqIEB0eXBlIHtJbmxpbmVDb21wb25lbnRGYWN0b3J5fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShJbmxpbmVDb21wb25lbnRGYWN0b3J5KTtcblxuICAgICAgICAvKiogQHR5cGUge0V2ZW50TWFuYWdlcn0gKi9cbiAgICAgICAgdGhpcy5ldmVudHMgPSBuZXcgRXZlbnRNYW5hZ2VyKCk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnR9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gbnVsbDtcblxuICAgICAgICAvKiogQHR5cGUge29iamVjdH0gKi9cbiAgICAgICAgdGhpcy5tb2RlbCA9IG1vZGVsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Ym9vbGVhbn0gKi9cbiAgICAgICAgdGhpcy5jaGVja2VkID0gZmFsc2U7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0eWxlc2hlZXRCdWlsZGVyfSBzdHlsZXNoZWV0QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyB7U3R5bGVzaGVldH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRTdHlsZXNoZWV0KHN0eWxlc2hlZXRCdWlsZGVyKSB7XG4gICAgICAgc3R5bGVzaGVldEJ1aWxkZXJcbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5yYWRpby10b2dnbGUtc3dpdGNoXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIiwgXCJyZWxhdGl2ZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgXCJpbmxpbmUtYmxvY2tcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLCBcIjQxcHRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJoZWlnaHRcIiwgXCIyNHB0XCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucmFkaW8tdG9nZ2xlLXN3aXRjaCBpbnB1dFwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwid2lkdGhcIiwgXCIwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiaGVpZ2h0XCIsIFwiMFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnJhZGlvLXRvZ2dsZS1zd2l0Y2gtc2xpZGVyXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIiwgXCJhYnNvbHV0ZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImN1cnNvclwiLCBcInBvaW50ZXJcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0b3BcIiwgXCIwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibGVmdFwiLCBcIjBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJyaWdodFwiLCBcIjBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3R0b21cIiwgXCIwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiNjY2NcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItcmFkaXVzXCIsIFwiMjRwdFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zaXRpb25cIiwgXCIuNHNcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItd2lkdGhcIiwgXCIxcHRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItc3R5bGVcIiwgXCJzb2xpZFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1jb2xvclwiLCBcIiNiYmJcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5yYWRpby10b2dnbGUtc3dpdGNoLXNsaWRlcjpiZWZvcmVcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLCBcImFic29sdXRlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29udGVudFwiLCBcIlxcXCJcXFwiXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiaGVpZ2h0XCIsIFwiMTdwdFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIndpZHRoXCIsIFwiMTdwdFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImxlZnRcIiwgXCIzLjVwdFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvdHRvbVwiLCBcIjMuNXB0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIndoaXRlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyLXJhZGl1c1wiLCBcIjUwJVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zaXRpb25cIiwgXCIuNHNcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGVYKDApXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucmFkaW8tdG9nZ2xlLXN3aXRjaDpob3ZlciAucmFkaW8tdG9nZ2xlLXN3aXRjaC1zbGlkZXJcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiI2JiYlwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnJhZGlvLXRvZ2dsZS1zd2l0Y2ggaW5wdXQ6Y2hlY2tlZCArIC5yYWRpby10b2dnbGUtc3dpdGNoLXNsaWRlclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIiwgXCIjMjE5NkYzXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyLWNvbG9yXCIsIFwiIzE5NzZEMlwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnJhZGlvLXRvZ2dsZS1zd2l0Y2ggaW5wdXQ6Y2hlY2tlZCArIC5yYWRpby10b2dnbGUtc3dpdGNoLXNsaWRlcjpiZWZvcmVcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGVYKDE3cHQpXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucmFkaW8tdG9nZ2xlLXN3aXRjaCBpbnB1dDpmb2N1cyArIC5yYWRpby10b2dnbGUtc3dpdGNoLXNsaWRlclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJveC1zaGFkb3dcIiwgXCIwIDAgMXB0ICMyMTk2RjNcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5yYWRpby10b2dnbGUtc3dpdGNoIGlucHV0OmRpc2FibGVkICsgLnJhZGlvLXRvZ2dsZS1zd2l0Y2gtc2xpZGVyXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCBcIjAuNlwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImN1cnNvclwiLCBcIm5vdC1hbGxvd2VkXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucmFkaW8tdG9nZ2xlLXN3aXRjaCBpbnB1dDpkaXNhYmxlZDpob3ZlciArIC5yYWRpby10b2dnbGUtc3dpdGNoLXNsaWRlclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIiwgXCIjY2NjXCIpXG4gICAgICAgICAgICAuY2xvc2UoKTtcblxuICAgICAgICByZXR1cm4gc3R5bGVzaGVldEJ1aWxkZXIuYnVpbGQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudEJ1aWxkZXJ9IGNvbm1wb25lbnRCdWlsZGVyIFxuICAgICAqIEByZXR1cm5zIHtDb21wb25lbnR9XG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkQ29tcG9uZW50KGNvbm1wb25lbnRCdWlsZGVyKSB7XG4gICAgICAgIHJldHVybiBjb25tcG9uZW50QnVpbGRlclxuICAgICAgICAgICAgLnJvb3QoXCJsYWJlbFwiLCBcImNsYXNzPXJhZGlvLXRvZ2dsZS1zd2l0Y2hcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAubm9kZShcImlucHV0XCIsIFwiaWQ9Y2hlY2tib3hcIiwgXCJ0eXBlPWNoZWNrYm94XCIpXG4gICAgICAgICAgICAgICAgLm5vZGUoXCJzcGFuXCIsIFwiY2xhc3M9cmFkaW8tdG9nZ2xlLXN3aXRjaC1zbGlkZXJcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAuYnVpbGQoKTtcbiAgICB9XG5cbiAgICBwb3N0Q29uZmlnKCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoUmFkaW9Ub2dnbGVTd2l0Y2gpO1xuICAgICAgICBDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUoUmFkaW9Ub2dnbGVTd2l0Y2gubmFtZSk7XG5cbiAgICAgICAgaWYgKHRoaXMubW9kZWwpIHtcbiAgICAgICAgICAgIElucHV0RWxlbWVudERhdGFCaW5kaW5nLmxpbmsodGhpcy5tb2RlbCkudG8odGhpcy5jb21wb25lbnQuZ2V0KFwiY2hlY2tib3hcIikpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiY2hlY2tib3hcIikubGlzdGVuVG8oXCJjaGFuZ2VcIiwgdGhpcy5jbGlja2VkLCB0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbnRhaW5lckV2ZW50fSBldmVudCBcbiAgICAgKi9cbiAgICBjbGlja2VkKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IG9sZFZhbHVlID0gdGhpcy5jaGVja2VkO1xuICAgICAgICB0aGlzLmNoZWNrZWQgPSBldmVudC50YXJnZXQuY2hlY2tlZDtcblxuICAgICAgICBpZiAob2xkVmFsdWUgIT09IHRoaXMuY2hlY2tlZCkge1xuICAgICAgICAgICAgdGhpcy5ldmVudHMudHJpZ2dlcihSYWRpb1RvZ2dsZVN3aXRjaC5FVkVOVF9DSEFOR0VELCBbZXZlbnQsIHRoaXMuY2hlY2tlZF0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuY2hlY2tlZCkge1xuICAgICAgICAgICAgdGhpcy5ldmVudHMudHJpZ2dlcihSYWRpb1RvZ2dsZVN3aXRjaC5FVkVOVF9FTkFCTEVELCBbZXZlbnRdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzLnRyaWdnZXIoUmFkaW9Ub2dnbGVTd2l0Y2guRVZFTlRfRElTQUJMRUQsIFtldmVudF0pO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgdG9nZ2xlIHN0YXRlIHByb2dyYW1tYXRpY2FsbHlcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGNoZWNrZWQgXG4gICAgICovXG4gICAgdG9nZ2xlKGNoZWNrZWQpIHtcbiAgICAgICAgaWYgKHRoaXMuY2hlY2tlZCA9PT0gY2hlY2tlZCkge1xuICAgICAgICAgICAgcmV0dXJuOyAvLyBObyBjaGFuZ2VcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNoZWNrZWQgPSBjaGVja2VkO1xuICAgICAgICBpZiAodGhpcy5jb21wb25lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImNoZWNrYm94XCIpLmNvbnRhaW5lckVsZW1lbnQuY2xpY2soKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgY3VycmVudCB0b2dnbGUgc3RhdGVcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBpc0NoZWNrZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNoZWNrZWQ7XG4gICAgfVxuXG59XG5cblR5cGVDb25maWdQYWNrLmluc3RhbmNlKCkuYWRkVHlwZUNvbmZpZyhcIm51dHRpbjJjLXVpXCIsIFByb3RvdHlwZUNvbmZpZy51bm5hbWVkKFJhZGlvVG9nZ2xlU3dpdGNoKSk7IiwiaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5pbXBvcnQgeyBDYW52YXNTdHlsZXMsXG4gICAgQ29tcG9uZW50LFxuICAgIEV2ZW50TWFuYWdlcixcbiAgICBJbnB1dEVsZW1lbnREYXRhQmluZGluZyxcbiAgICBPcHRpb25FbGVtZW50LFxuICAgIFNlbGVjdEVsZW1lbnQsIFxuICAgIFN0eWxlc2hlZXQsXG4gICAgU3R5bGVzaGVldEJ1aWxkZXIsXG4gICAgQ29tcG9uZW50QnVpbGRlcixcbiAgICBJbmxpbmVDb21wb25lbnRGYWN0b3J5XG59IGZyb20gXCJudXR0aW4yYy1jb3JlX3YxXCI7XG5pbXBvcnQgeyBJbmplY3Rpb25Qb2ludCwgUHJvdG90eXBlQ29uZmlnLCBUeXBlQ29uZmlnUGFjayB9IGZyb20gXCJtaW5kaV92MVwiO1xuaW1wb3J0IHsgQ29tbW9uRXZlbnRzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21tb25FdmVudHNcIjtcblxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIlNlbGVjdFwiKTtcblxuZXhwb3J0IGNsYXNzIFNlbGVjdCB7XG5cblx0c3RhdGljIERFRkFVTFRfUExBQ0VIT0xERVIgPSBcIlNlbGVjdFwiO1xuXG5cdHN0YXRpYyBFVkVOVF9DTElDS0VEID0gQ29tbW9uRXZlbnRzLkNMSUNLRUQ7XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gbW9kZWxcbiAgICAgKiBAcGFyYW0ge0FycmF5PE9wdGlvbkVsZW1lbnQ+fSBvcHRpb25zXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBsYWNlaG9sZGVyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBtYW5kYXRvcnlcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBtb2RlbCA9IG51bGwsIG9wdGlvbnMgPSBbXSwgcGxhY2Vob2xkZXIgPSBTZWxlY3QuREVGQVVMVF9QTEFDRUhPTERFUiwgbWFuZGF0b3J5ID0gZmFsc2UpIHtcbiAgICAgICAgXG4gICAgICAgIC8qKiBAdHlwZSB7SW5saW5lQ29tcG9uZW50RmFjdG9yeX0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoSW5saW5lQ29tcG9uZW50RmFjdG9yeSk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtFdmVudE1hbmFnZXJ9ICovXG4gICAgICAgIHRoaXMuZXZlbnRzID0gbmV3IEV2ZW50TWFuYWdlcigpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IG51bGw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtBcnJheTxPcHRpb25FbGVtZW50Pn0gKi9cbiAgICAgICAgdGhpcy5vcHRpb25zQXJyYXkgPSBvcHRpb25zO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLnBsYWNlaG9sZGVyID0gcGxhY2Vob2xkZXI7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtib29sZWFufSAqL1xuICAgICAgICB0aGlzLm1hbmRhdG9yeSA9IG1hbmRhdG9yeTtcblxuICAgICAgICAvKiogQHR5cGUge29iamVjdH0gKi9cbiAgICAgICAgdGhpcy5tb2RlbCA9IG1vZGVsO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHlsZXNoZWV0QnVpbGRlcn0gc3R5bGVzaGVldEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMge1N0eWxlc2hlZXR9XG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkU3R5bGVzaGVldChzdHlsZXNoZWV0QnVpbGRlcikge1xuICAgICAgIHN0eWxlc2hlZXRCdWlsZGVyXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuc2VsZWN0LWVudHJ5XCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwid2lkdGhcIiwgXCIxMDAlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiaGVpZ2h0XCIsIFwiY2FsYygxLjVlbSArIDAuNzVyZW0gKyAycHgpXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZ1wiLCBcIjAuMzc1cmVtIDAuNzVyZW1cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmb250LXNpemVcIiwgXCIxcmVtXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZm9udC13ZWlnaHRcIiwgXCI0MDBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJsaW5lLWhlaWdodFwiLCBcIjEuNVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbG9yXCIsIFwiIzQ5NTA1N1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIiwgXCIjZmZmXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jbGlwXCIsIFwicGFkZGluZy1ib3hcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXJcIiwgXCIxcHQgc29saWQgI2NlZDRkYVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1yYWRpdXNcIiwgXCIwLjI1cmVtXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNpdGlvblwiLCBcImJvcmRlci1jb2xvciAwLjE1cyBlYXNlLWluLW91dCwgYm94LXNoYWRvdyAwLjE1cyBlYXNlLWluLW91dFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpbi1ib3R0b21cIiwgXCIxcmVtXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYXBwZWFyYW5jZVwiLCBcIm5vbmVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCItd2Via2l0LWFwcGVhcmFuY2VcIiwgXCJub25lXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiLW1vei1hcHBlYXJhbmNlXCIsIFwibm9uZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtaW1hZ2VcIiwgXCJ1cmwoXFxcImRhdGE6aW1hZ2Uvc3ZnK3htbDt1dGY4LDxzdmcgZmlsbD0nMjE5NkYzJyBoZWlnaHQ9JzIwJyB2aWV3Qm94PScwIDAgMjAgMjAnIHdpZHRoPScyMCcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48cGF0aCBkPSdNNyAxMGw1IDUgNS01eicvPjwvc3ZnPlxcXCIpXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1yZXBlYXRcIiwgXCJuby1yZXBlYXRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLXBvc2l0aW9uXCIsIFwicmlnaHQgMC43NXJlbSBjZW50ZXJcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLXNpemVcIiwgXCIxLjVlbVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnNlbGVjdC1lcnJvclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIndpZHRoXCIsIFwiZml0LWNvbnRlbnRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjb2xvclwiLCBcIiMzMzMzMzNcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoKzVweCwtNXB4KVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIiwgXCIjRkZGRkUwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZm9udC13ZWlnaHRcIiwgXCJub3JtYWxcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmb250LXNpemVcIiwgXCIxNHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyLXJhZGl1c1wiLCBcIjhweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBvc2l0aW9uXCIsIFwicmVsYXRpdmVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ6LWluZGV4XCIsIFwiOTk5OTk5OThcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3gtc2l6aW5nXCIsIFwiYm9yZGVyLWJveFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJveC1zaGFkb3dcIiwgXCIwIDFwdCA4cHQgcmdiYSgwLDAsMCwwLjUpXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY3Vyc29yXCIsIFwicG9pbnRlclwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnNlbGVjdC1lcnJvci1oaWRkZW5cIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2l0aW9uXCIsIFwibWF4LWhlaWdodCAuM3MgLjJzLCBwYWRkaW5nIC4zcyAuMnMsIG9wYWNpdHkgLjJzIDBzLCB2aXNpYmlsaXR5IDBzIC4yc1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZ1wiLCBcIjBweCAwcHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXgtaGVpZ2h0XCIsIFwiMHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidmlzaWJpbGl0eVwiLCBcImhpZGRlblwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnNlbGVjdC1lcnJvci12aXNpYmxlXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNpdGlvblwiLCBcIm1heC1oZWlnaHQgLjNzLCBwYWRkaW5nIC4ycywgb3BhY2l0eSAuMnMgLjJzXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCBcIjFcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwYWRkaW5nXCIsIFwiMTBweCAyMHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWF4LWhlaWdodFwiLCBcIjUwcHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ2aXNpYmlsaXR5XCIsIFwidmlzaWJsZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpbi10b3BcIiwgXCIxMHB4XCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuc2VsZWN0LWVycm9yIGlcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLCBcImFic29sdXRlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidG9wXCIsIFwiMTAwJVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImxlZnRcIiwgXCIzMCVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tbGVmdFwiLCBcIi0xNXB0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwid2lkdGhcIiwgXCIzMHB0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiaGVpZ2h0XCIsIFwiMTVwdFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm92ZXJmbG93XCIsIFwiaGlkZGVuXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuc2VsZWN0LWVycm9yIGk6OmFmdGVyXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29udGVudFwiLCBcIicnXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIiwgXCJhYnNvbHV0ZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIndpZHRoXCIsIFwiMTVwdFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImhlaWdodFwiLCBcIjE1cHRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJsZWZ0XCIsIFwiNTAlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKC01MCUsLTUwJSkgcm90YXRlKDQ1ZGVnKVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIiwgXCIjRkZGRkUwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm94LXNoYWRvd1wiLCBcIjAgMXB0IDhwdCByZ2JhKDAsMCwwLDAuNSlcIilcbiAgICAgICAgICAgIC5jbG9zZSgpO1xuXG4gICAgICAgIHJldHVybiBzdHlsZXNoZWV0QnVpbGRlci5idWlsZCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Q29tcG9uZW50QnVpbGRlcn0gY29tcG9uZW50QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyB7Q29tcG9uZW50fVxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZENvbXBvbmVudChjb21wb25lbnRCdWlsZGVyKSB7XG4gICAgICAgIHJldHVybiBjb21wb25lbnRCdWlsZGVyXG4gICAgICAgICAgICAucm9vdChcImRpdlwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwiZGl2XCIsIFwiaWQ9c2VsZWN0RXJyb3JcIiwgXCJjbGFzcz1zZWxlY3QtZXJyb3Igc2VsZWN0LWVycm9yLWhpZGRlblwiKVxuICAgICAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAgICAgLnRleHQoXCJJbnZhbGlkIHNlbGVjdGlvblwiKVxuICAgICAgICAgICAgICAgICAgICAubm9kZShcImlcIilcbiAgICAgICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwic2VsZWN0XCIsIFwiaWQ9c2VsZWN0XCIsIFwiY2xhc3M9c2VsZWN0LWVudHJ5XCIpXG4gICAgICAgICAgICAuY2xvc2UoKTtcbiAgICB9XG5cbiAgICBwb3N0Q29uZmlnKCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoU2VsZWN0KTtcbiAgICAgICAgQ2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKFNlbGVjdC5uYW1lKTtcblxuXHRcdC8qKiBAdHlwZSB7U2VsZWN0RWxlbWVudH0gKi9cblx0XHRjb25zdCBzZWxlY3QgPSB0aGlzLmNvbXBvbmVudC5nZXQoXCJzZWxlY3RcIik7XG5cbiAgICAgICAgc2VsZWN0Lm5hbWUgPSB0aGlzLm5hbWU7XG5cbiAgICAgICAgaWYgKHRoaXMubW9kZWwpIHtcbiAgICAgICAgICAgIElucHV0RWxlbWVudERhdGFCaW5kaW5nLmxpbmsodGhpcy5tb2RlbCkudG8odGhpcy5jb21wb25lbnQuZ2V0KFwic2VsZWN0XCIpKTtcbiAgICAgICAgfVxuXG5cdFx0aWYgKHRoaXMub3B0aW9uc0FycmF5ICYmIHRoaXMub3B0aW9uc0FycmF5Lmxlbmd0aCA+IDApIHtcblx0XHRcdHNlbGVjdC5vcHRpb25zID0gdGhpcy5vcHRpb25zQXJyYXk7XG5cdFx0fVxuXG4gICAgICAgIHNlbGVjdC5saXN0ZW5UbyhcImNsaWNrXCIsIHRoaXMuY2xpY2tlZCwgdGhpcyk7XG4gICAgfVxuXG5cdC8qKlxuXHQgKiBAcGFyYW0ge0FycmF5PE9wdGlvbkVsZW1lbnQ+fSBvcHRpb25zQXJyYXlcblx0ICovXG5cdHNldCBvcHRpb25zKG9wdGlvbnNBcnJheSkge1xuXHRcdHRoaXMub3B0aW9uc0FycmF5ID0gb3B0aW9uc0FycmF5O1xuXHRcdGlmICh0aGlzLmNvbXBvbmVudCkge1xuXHRcdFx0LyoqIEB0eXBlIHtTZWxlY3RFbGVtZW50fSAqL1xuXHRcdFx0Y29uc3Qgc2VsZWN0ID0gdGhpcy5jb21wb25lbnQuZ2V0KFwic2VsZWN0XCIpO1xuXHRcdFx0aWYgKHNlbGVjdCAmJiB0aGlzLm9wdGlvbnNBcnJheSAmJiB0aGlzLm9wdGlvbnNBcnJheS5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdHNlbGVjdC5vcHRpb25zID0gdGhpcy5vcHRpb25zQXJyYXk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cbiAgICBjbGlja2VkKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuZXZlbnRzLnRyaWdnZXIoU2VsZWN0LkVWRU5UX0NMSUNLRUQsIFtldmVudF0pO1xuICAgIH1cblxufVxuXG5UeXBlQ29uZmlnUGFjay5pbnN0YW5jZSgpLmFkZFR5cGVDb25maWcoXCJudXR0aW4yYy11aVwiLCBQcm90b3R5cGVDb25maWcudW5uYW1lZChTZWxlY3QpKTsiLCJpbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcbmltcG9ydCB7IENvbW1vbklucHV0IH0gZnJvbSBcIi4uL2NvbW1vbklucHV0XCI7XG5pbXBvcnQgeyBDb21wb25lbnQsIENvbXBvbmVudEJ1aWxkZXIsIFJlcXVpcmVkVmFsaWRhdG9yLCBTdHlsZXNoZWV0LCBTdHlsZXNoZWV0QnVpbGRlciB9IGZyb20gXCJudXR0aW4yYy1jb3JlX3YxXCI7XG5pbXBvcnQgeyBQcm90b3R5cGVDb25maWcsIFR5cGVDb25maWdQYWNrIH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5cbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJUZXh0SW5wdXRcIik7XG5cbmV4cG9ydCBjbGFzcyBUZXh0SW5wdXQgZXh0ZW5kcyBDb21tb25JbnB1dCB7XG5cbiAgICBzdGF0aWMgREVGQVVMVF9QTEFDRUhPTERFUiA9IFwiVGV4dFwiO1xuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gbW9kZWxcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGxhY2Vob2xkZXJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IG1hbmRhdG9yeVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIG1vZGVsID0gbnVsbCwgcGxhY2Vob2xkZXIgPSBUZXh0SW5wdXQuREVGQVVMVF9QTEFDRUhPTERFUiwgbWFuZGF0b3J5ID0gZmFsc2UpIHtcblxuICAgICAgICBzdXBlcihUZXh0SW5wdXQsXG4gICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgbW9kZWwsXG4gICAgICAgICAgICBuZXcgUmVxdWlyZWRWYWxpZGF0b3IoZmFsc2UsIG1hbmRhdG9yeSksXG4gICAgICAgICAgICBwbGFjZWhvbGRlcixcbiAgICAgICAgICAgIFwidGV4dElucHV0XCIsXG4gICAgICAgICAgICBcInRleHRFcnJvclwiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0eWxlc2hlZXRCdWlsZGVyfSBzdHlsZXNoZWV0QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyB7U3R5bGVzaGVldH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRTdHlsZXNoZWV0KHN0eWxlc2hlZXRCdWlsZGVyKSB7XG4gICAgICAgc3R5bGVzaGVldEJ1aWxkZXJcbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi50ZXh0LWlucHV0LWVudHJ5XCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwid2lkdGhcIiwgXCIxMDAlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiaGVpZ2h0XCIsIFwiY2FsYygxLjVlbSArIDAuNzVyZW0gKyAycHgpXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZ1wiLCBcIjAuMzc1cmVtIDAuNzVyZW1cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmb250LXNpemVcIiwgXCIxcmVtXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZm9udC13ZWlnaHRcIiwgXCI0MDBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJsaW5lLWhlaWdodFwiLCBcIjEuNVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbG9yXCIsIFwiIzQ5NTA1N1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIiwgXCIjZmZmXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jbGlwXCIsIFwicGFkZGluZy1ib3hcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXJcIiwgXCIxcHggc29saWQgI2NlZDRkYVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1yYWRpdXNcIiwgXCIwLjI1cmVtXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNpdGlvblwiLCBcImJvcmRlci1jb2xvciAwLjE1cyBlYXNlLWluLW91dCwgYm94LXNoYWRvdyAwLjE1cyBlYXNlLWluLW91dFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpbi1ib3R0b21cIiwgXCIxcmVtXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIudGV4dC1pbnB1dC1lcnJvclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIndpZHRoXCIsIFwiZml0LWNvbnRlbnRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjb2xvclwiLCBcIiMzMzMzMzNcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoKzVweCwtNXB4KVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIiwgXCIjRkZGRkUwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZm9udC13ZWlnaHRcIiwgXCJub3JtYWxcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmb250LXNpemVcIiwgXCIxNHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyLXJhZGl1c1wiLCBcIjhweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBvc2l0aW9uXCIsIFwicmVsYXRpdmVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ6LWluZGV4XCIsIFwiOTk5OTk5OThcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3gtc2l6aW5nXCIsIFwiYm9yZGVyLWJveFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJveC1zaGFkb3dcIiwgXCIwIDFweCA4cHggcmdiYSgwLDAsMCwwLjUpXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY3Vyc29yXCIsIFwicG9pbnRlclwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnRleHQtaW5wdXQtZXJyb3ItaGlkZGVuXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNpdGlvblwiLCBcIm1heC1oZWlnaHQgLjNzIC4ycywgcGFkZGluZyAuM3MgLjJzLCBvcGFjaXR5IC4ycyAwcywgdmlzaWJpbGl0eSAwcyAuMnNcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmdcIiwgXCIwcHggMHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWF4LWhlaWdodFwiLCBcIjBweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgXCJibG9ja1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInZpc2liaWxpdHlcIiwgXCJoaWRkZW5cIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi50ZXh0LWlucHV0LWVycm9yLXZpc2libGVcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2l0aW9uXCIsIFwibWF4LWhlaWdodCAuM3MsIHBhZGRpbmcgLjJzLCBvcGFjaXR5IC4ycyAuMnNcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmdcIiwgXCIxMHB4IDIwcHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXgtaGVpZ2h0XCIsIFwiNTBweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgXCJibG9ja1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInZpc2liaWxpdHlcIiwgXCJ2aXNpYmxlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luLXRvcFwiLCBcIjEwcHhcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi50ZXh0LWlucHV0LWVycm9yIGlcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLCBcImFic29sdXRlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidG9wXCIsIFwiMTAwJVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImxlZnRcIiwgXCIzMCVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tbGVmdFwiLCBcIi0xNXB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwid2lkdGhcIiwgXCIzMHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiaGVpZ2h0XCIsIFwiMTVweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm92ZXJmbG93XCIsIFwiaGlkZGVuXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIudGV4dC1pbnB1dC1lcnJvciBpOjphZnRlclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbnRlbnRcIiwgXCInJ1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBvc2l0aW9uXCIsIFwiYWJzb2x1dGVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLCBcIjE1cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJoZWlnaHRcIiwgXCIxNXB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibGVmdFwiLCBcIjUwJVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZSgtNTAlLC01MCUpIHJvdGF0ZSg0NWRlZylcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiI0ZGRkZFMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJveC1zaGFkb3dcIiwgXCIwIDFweCA4cHggcmdiYSgwLDAsMCwwLjUpXCIpXG4gICAgICAgICAgICAuY2xvc2UoKTtcblxuICAgICAgICByZXR1cm4gc3R5bGVzaGVldEJ1aWxkZXIuYnVpbGQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudEJ1aWxkZXJ9IGNvbXBvbmVudEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMge0NvbXBvbmVudH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRDb21wb25lbnQoY29tcG9uZW50QnVpbGRlcikge1xuICAgICAgICByZXR1cm4gY29tcG9uZW50QnVpbGRlclxuICAgICAgICAgICAgLnJvb3QoXCJkaXZcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAubm9kZShcImRpdlwiLCBcImlkPXRleHRFcnJvclwiLCBcImNsYXNzPXRleHQtaW5wdXQtZXJyb3IgdGV4dC1pbnB1dC1lcnJvci1oaWRkZW5cIilcbiAgICAgICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgICAgIC50ZXh0KFwiSW52YWxpZCB2YWx1ZVwiKVxuICAgICAgICAgICAgICAgICAgICAubm9kZShcImlcIilcbiAgICAgICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwiaW5wdXRcIiwgXCJpZD10ZXh0SW5wdXRcIiwgXCJ0eXBlPXRleHRcIiwgXCJjbGFzcz10ZXh0LWlucHV0LWVudHJ5XCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgc2hvd1ZhbGlkYXRpb25FcnJvcigpIHsgdGhpcy5jb21wb25lbnQuZ2V0KHRoaXMuZXJyb3JFbGVtZW50SWQpLnNldEF0dHJpYnV0ZVZhbHVlKFwiY2xhc3NcIiwgXCJ0ZXh0LWlucHV0LWVycm9yIHRleHQtaW5wdXQtZXJyb3ItdmlzaWJsZVwiKTsgfVxuICAgIGhpZGVWYWxpZGF0aW9uRXJyb3IoKSB7IHRoaXMuY29tcG9uZW50LmdldCh0aGlzLmVycm9yRWxlbWVudElkKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImNsYXNzXCIsIFwidGV4dC1pbnB1dC1lcnJvciB0ZXh0LWlucHV0LWVycm9yLWhpZGRlblwiKTsgfVxufVxuXG5UeXBlQ29uZmlnUGFjay5pbnN0YW5jZSgpLmFkZFR5cGVDb25maWcoXCJudXR0aW4yYy11aVwiLCBQcm90b3R5cGVDb25maWcudW5uYW1lZChUZXh0SW5wdXQpKTsiXSwibmFtZXMiOlsiQ29tcG9uZW50IiwiVHlwZUNvbmZpZ1BhY2siLCJQcm90b3R5cGVDb25maWciLCJMb2dnZXIiLCJJbmplY3Rpb25Qb2ludCIsIklubGluZUNvbXBvbmVudEZhY3RvcnkiLCJUaW1lUHJvbWlzZSIsIkNhbnZhc1N0eWxlcyIsIlN0eWxlQWNjZXNzb3IiLCJDb250YWluZXJBc3luYyIsIkV2ZW50TWFuYWdlciIsIlN0eWxlU2VsZWN0b3JBY2Nlc3NvciIsIk1ldGhvZCIsIkxpc3QiLCJOYXZpZ2F0aW9uIiwiQ2FudmFzUm9vdCIsIkNvbnRhaW5lckVsZW1lbnRVdGlscyIsIkhUTUwiLCJJbnB1dEVsZW1lbnREYXRhQmluZGluZyIsIlN0YXRlTWFuYWdlciIsIkNzczNTdHlsZXNoZWV0QnVpbGRlciIsIk1hcCIsIkxPRyIsIkVtYWlsVmFsaWRhdG9yIiwiTnVtYmVyVmFsaWRhdG9yIiwiUmVxdWlyZWRWYWxpZGF0b3IiLCJQYXNzd29yZFZhbGlkYXRvciIsIkVxdWFsc1Byb3BlcnR5VmFsaWRhdG9yIiwiQW5kVmFsaWRhdG9yU2V0IiwiUHJvcGVydHlBY2Nlc3NvciIsIlBob25lVmFsaWRhdG9yIiwiVGV4dElucHV0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDTyxNQUFNLFlBQVksQ0FBQztBQUMxQjtBQUNBLElBQUksT0FBTyxjQUFjLFlBQVksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ2xFLElBQUksT0FBTyxvQkFBb0IsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDbEUsSUFBSSxPQUFPLHVCQUF1QixHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNsRSxJQUFJLE9BQU8scUJBQXFCLEtBQUssQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ2xFO0FBQ0EsSUFBSSxPQUFP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
