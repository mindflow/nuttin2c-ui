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
        this.events = new nuttin2cCore_v1.EventManager();
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
        this.events.trigger(BannerLabelMessage.EVENT_CLOSE_CLICKED);
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
    static INPUT = "input";
    static LOADED = "loaded";

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
		this.events = new nuttin2cCore_v1.EventManager();

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
        const recordElement = await this.events.trigger(LinePanel.RECORD_ELEMENT_REQUESTED, [null, record]);
        
		if (!recordElement) {
			return;
		}

		const linePanelEntry = await this.linePanelEntryProvider.get([true, record]);
		linePanelEntry.component.setChild("recordElement", recordElement.component);

		return linePanelEntry.component;
    }
}

mindi_v1.TypeConfigPack.instance().addTypeConfig("nuttin2c-ui", mindi_v1.PrototypeConfig.unnamed(LinePanel));

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
        this.events = new nuttin2cCore_v1.EventManager();

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

        /** @type {EventManager} */
        this.events = new nuttin2cCore_v1.EventManager();
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
            this.events.trigger(LinkPanel.EVENT_CLICKED, event);
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

class CardDeckEntry {

    static DEFAULT_CLASS = "card-deck-entry";

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
        this.position = CardDeckEntry.ENTRY_POSITION_FRONT;
    }

    /**
     * @returns {Stylesheet}
     * @param {StylesheetBuilder} stylesheetBuilder 
     */
    static buildStylesheet(stylesheetBuilder) {
        return nuttin2cCore_v1.Css3StylesheetBuilder.create(stylesheetBuilder)
            .selector(".card-deck-entry")
                .position("relative")
                .backgroundColor("var(--default-panel-color)")
                .gridColumn("1")
                .gridRow("1")
                .width("100%")
                .height("100%")
                .minHeight("0")

            .selector(".card-deck-entry.position-front")
                .transform("translate(0%, 0%)")
                .transition(["transform", ".6s"])

            .selector(".card-deck-entry.position-behind")
                .transform("translate(0%, 0%)")
                .transition(["transform", ".6s"])

            .selector(".card-deck-entry.position-right")
                .transform("translate(+105%, 0%)")
                .transition(["transform", ".6s"])

            .selector(".card-deck-entry-content.existance-removed")
                .display("none")

            .selector(".card-deck-entry-content.existance-present")
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
            .root("div", "id=cardDeckEntry", "class=card-deck-entry")
            .open()
                .node("div", "id=cardDeckEntryContent", "class=card-deck-entry-content")
            .close()
            .build();
    }

    /**
     * @returns {BaseElement}
     */
    get contentElement() {
        return this.component.get("cardDeckEntryContent");
    }

    /**
     * @returns {BaseElement}
     */
    get entryElement() {
        return this.component.get("cardDeckEntry");
    }

    async postConfig() {
        this.component = this.componentFactory.create(CardDeckEntry);
        nuttin2cCore_v1.CanvasStyles.enableStyle(CardDeckEntry.name);
    }

    setIndex(index) {
        this.index = index;
    }

    setContent(component) {
        this.contentElement.setChild(component);
    }

    show() {
        this.setContentVisibility(CardDeckEntry.CONTENT_EXISTANCE_PRESENT);
        this.setShift(CardDeckEntry.ENTRY_POSITION_FRONT);
    }

    hide(nextIndex) {
        if (nextIndex > this.index) {
            this.setShift(CardDeckEntry.ENTRY_POSITION_BEHIND);
        } else {
            this.setShift(CardDeckEntry.ENTRY_POSITION_RIGHT);
        }
        this.adjustWhenHidden();
    }

    adjustWhenHidden() {
        coreutil_v1.TimePromise.asPromise(600, () => {
            if (this.position === CardDeckEntry.ENTRY_POSITION_FRONT) {
                return;
            }
            this.setContentVisibility(CardDeckEntry.CONTENT_EXISTANCE_REMOVED);
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

mindi_v1.TypeConfigPack.instance().addTypeConfig("nuttin2c-ui", mindi_v1.PrototypeConfig.unnamed(CardDeckEntry));

class CardDeck {

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

        /** @type {Provider<CardDeckEntry>} */
        this.cardDeckEntryProvider = mindi_v1.InjectionPoint.provider(CardDeckEntry);

        /** @type {List<CardDeckEntry>} */
        this.cardDeckEntryList = new coreutil_v1.List();

        /** @type {Map<CardDeckEntry>} */
        this.cardDeckEntryMap = new coreutil_v1.Map();

        /** @type {Map<Number>} */
        this.cardDeckEntryIndexMap = new coreutil_v1.Map();

        /** @type {CardDeckEntry} */
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
            .selector(".card-deck")
                .position("relative")
                .backgroundColor("#f1f1f1")
                .display("grid")
                .height("100%")

            .build();
    }

    static buildComponent(componentBuilder) {
        return componentBuilder
            .root("div", "id=cardDeckEntries", "class=card-deck")
            .build();
    }

    async postConfig() {
        this.component = this.componentFactory.create(CardDeck);
        nuttin2cCore_v1.CanvasStyles.enableStyle(CardDeck.name);

        if (this.componentMap) {
            this.prepareEntries();
        }

        this.scrollback = () => {
            this.component.get("cardDeckEntries").element.parentElement.scrollTo(0,0);
        };
    }

    prepareEntries() {
        this.componentMap.forEach(async (key, component) => {

            const cardDeckEntry = await this.cardDeckEntryProvider.get();

            if (null == this.currentEntry) {
                cardDeckEntry.show();
                this.currentEntry = cardDeckEntry;
            } else {
                cardDeckEntry.hide(0);
            }

            this.cardDeckEntryMap.set(key, cardDeckEntry);
            this.cardDeckEntryList.add(cardDeckEntry);
            this.cardDeckEntryIndexMap.set(key, this.cardDeckEntryList.size() -1);

            cardDeckEntry.setContent(component);
            cardDeckEntry.setIndex(this.cardDeckEntryList.size() - 1);

            this.component.addChild("cardDeckEntries", cardDeckEntry.component);
            return true;
        }, this);
    }

    slideNext() {
        if (this.currentEntry.index + 1 >= this.cardDeckEntryList.size()) {
            return;
        }
        const nextEntry = this.cardDeckEntryList.get(this.currentEntry.index + 1);
        this.currentEntry.hide(nextEntry.index);
        this.currentEntry = nextEntry;
        this.currentEntry.show();
        
        this.events.trigger(CardDeck.EVENT_ENTRY_CHANGED);
    }

    slidePrevious() {
        if (this.currentEntry.index <= 0) {
            return;
        }
        const nextEntry = this.cardDeckEntryList.get(this.currentEntry.index - 1);
        this.currentEntry.hide(nextEntry.index);
        this.currentEntry = nextEntry;
        this.currentEntry.show();

        this.events.trigger(CardDeck.EVENT_ENTRY_CHANGED);
    }

    slideTo(name) {
        const nextEntry = this.cardDeckEntryMap.get(name);
        this.currentEntry.hide(nextEntry.index);
        this.currentEntry = nextEntry;
        this.currentEntry.show();

        this.events.trigger(CardDeck.EVENT_ENTRY_CHANGED);
    }

}

mindi_v1.TypeConfigPack.instance().addTypeConfig("nuttin2c-ui", mindi_v1.PrototypeConfig.unnamed(CardDeck));

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
            this.events.trigger(Button.EVENT_CLICKED, event);
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
        this.events = new nuttin2cCore_v1.EventManager();

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
     * @param {String} buttonSize E.g. Button.SIZE_MEDIUM
     * @param {String} buttonIconClasses E.g. "fas fa-calendar-plus"
     * @returns {Button}
     */
    async addButton(label, type = Button.TYPE_PRIMARY, buttonSize = Button.SIZE_MEDIUM, buttonIconClasses = null) {
        const button = await this.buttonProvider.get([label, type, buttonSize, buttonIconClasses]);

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
		this.events = new nuttin2cCore_v1.EventManager();

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
		const recordElement = await this.events.trigger(TreePanelEntry.RECORD_ELEMENT_REQUESTED, [null, record, treePanelSubEntry, this]);
        
		if (!recordElement) {
			return;
		}

		treePanelSubEntry.component.setChild("recordElement", recordElement.component);

		await this.events
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

		await this.events
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
		this.events = new nuttin2cCore_v1.EventManager();

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
        this.events = new nuttin2cCore_v1.EventManager();
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
exports.CardDeck = CardDeck;
exports.CardDeckEntry = CardDeckEntry;
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
exports.TextInput = TextInput$1;
exports.ToggleIcon = ToggleIcon;
exports.ToolBar = ToolBar;
exports.TreePanel = TreePanel;
exports.TreePanelEntry = TreePanelEntry;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnV0dGluMmMtdWlfdjEuanMiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9udXR0aW4yYy9jb21wb25lbnQvY29sb3JQYWxldHRlLmpzIiwiLi4vLi4vc3JjL251dHRpbjJjL2NvbXBvbmVudC9jdXN0b21BcHBlYXJhbmNlLmpzIiwiLi4vLi4vc3JjL251dHRpbjJjL2NvbXBvbmVudC9kZXBlbmRlbmNpZXMuanMiLCIuLi8uLi9zcmMvbnV0dGluMmMvY29tcG9uZW50L2JhY2tTaGFkZS9iYWNrU2hhZGVMaXN0ZW5lcnMuanMiLCIuLi8uLi9zcmMvbnV0dGluMmMvY29tcG9uZW50L2JhY2tTaGFkZS9iYWNrU2hhZGUuanMiLCIuLi8uLi9zcmMvbnV0dGluMmMvY29tcG9uZW50L2JhY2tncm91bmQvYmFja2dyb3VuZC5qcyIsIi4uLy4uL3NyYy9udXR0aW4yYy9jb21wb25lbnQvYmFubmVyTWVzc2FnZS9iYW5uZXJNZXNzYWdlLmpzIiwiLi4vLi4vc3JjL251dHRpbjJjL2NvbXBvbmVudC9iYWNrZ3JvdW5kVmlkZW8vYmFja2dyb3VuZFZpZGVvLmpzIiwiLi4vLi4vc3JjL251dHRpbjJjL2NvbXBvbmVudC9idWJibGVNZXNzYWdlL2J1YmJsZU1lc3NhZ2UuanMiLCIuLi8uLi9zcmMvbnV0dGluMmMvY29tcG9uZW50L2Jhbm5lckxhYmVsL2Jhbm5lckxhYmVsTWVzc2FnZS9iYW5uZXJMYWJlbE1lc3NhZ2UuanMiLCIuLi8uLi9zcmMvbnV0dGluMmMvY29tcG9uZW50L2Jhbm5lckxhYmVsL2Jhbm5lckxhYmVsLmpzIiwiLi4vLi4vc3JjL251dHRpbjJjL2NvbXBvbmVudC9jb21tb24vY29sb3JBcHBsaWNhdG9yLmpzIiwiLi4vLi4vc3JjL251dHRpbjJjL2NvbXBvbmVudC9jb21tb24vY29tbW9uRXZlbnRzLmpzIiwiLi4vLi4vc3JjL251dHRpbjJjL2NvbXBvbmVudC9jb21tb24vZWxlbWVudFRoZW1lQXBwbGljYXRvci5qcyIsIi4uLy4uL3NyYy9udXR0aW4yYy9jb21wb25lbnQvZmlsbFBhbmVsL2ZpbGxQYW5lbC5qcyIsIi4uLy4uL3NyYy9udXR0aW4yYy9jb21wb25lbnQvZHJvcERvd25QYW5lbC9kcm9wRG93blBhbmVsLmpzIiwiLi4vLi4vc3JjL251dHRpbjJjL2NvbXBvbmVudC9kaWFsb2dCb3gvZGlhbG9nQm94LmpzIiwiLi4vLi4vc3JjL251dHRpbjJjL2NvbXBvbmVudC9wYW5lbC9wYW5lbC5qcyIsIi4uLy4uL3NyYy9udXR0aW4yYy9jb21wb25lbnQvbGluZVBhbmVsL2xpbmVQYW5lbEVudHJ5L2xpbmVQYW5lbEVudHJ5LmpzIiwiLi4vLi4vc3JjL251dHRpbjJjL2NvbXBvbmVudC9saW5lUGFuZWwvbGluZVBhbmVsLmpzIiwiLi4vLi4vc3JjL251dHRpbjJjL2NvbXBvbmVudC9pbnB1dC9jb21tb25JbnB1dC5qcyIsIi4uLy4uL3NyYy9udXR0aW4yYy9jb21wb25lbnQvbGlua1BhbmVsL2xpbmtQYW5lbC5qcyIsIi4uLy4uL3NyYy9udXR0aW4yYy9jb21wb25lbnQvcG9wVXBQYW5lbC9wb3BVcFBhbmVsLmpzIiwiLi4vLi4vc3JjL251dHRpbjJjL2NvbXBvbmVudC9zbGlkZURlY2svY2FyZERlY2tFbnRyeS9jYXJkRGVja0VudHJ5LmpzIiwiLi4vLi4vc3JjL251dHRpbjJjL2NvbXBvbmVudC9zbGlkZURlY2svY2FyZERlY2suanMiLCIuLi8uLi9zcmMvbnV0dGluMmMvY29tcG9uZW50L2lucHV0L2J1dHRvbi9idXR0b24uanMiLCIuLi8uLi9zcmMvbnV0dGluMmMvY29tcG9uZW50L3Rvb2xCYXIvdG9vbEJhci5qcyIsIi4uLy4uL3NyYy9udXR0aW4yYy9jb21wb25lbnQvaW5wdXQvcmFkaW9Ub2dnbGVJY29uL3JhZGlvVG9nZ2xlSWNvbi5qcyIsIi4uLy4uL3NyYy9udXR0aW4yYy9jb21wb25lbnQvaW5wdXQvdG9nZ2xlSWNvbi90b2dnbGVJY29uLmpzIiwiLi4vLi4vc3JjL251dHRpbjJjL2NvbXBvbmVudC90cmVlUGFuZWwvdHJlZVBhbmVsRW50cnkvdHJlZVBhbmVsRW50cnkuanMiLCIuLi8uLi9zcmMvbnV0dGluMmMvY29tcG9uZW50L3RyZWVQYW5lbC90cmVlUGFuZWwuanMiLCIuLi8uLi9zcmMvbnV0dGluMmMvY29tcG9uZW50L2lucHV0L2NoZWNrQm94L2NoZWNrQm94LmpzIiwiLi4vLi4vc3JjL251dHRpbjJjL2NvbXBvbmVudC9pbnB1dC9lbWFpbElucHV0L2VtYWlsSW5wdXQuanMiLCIuLi8uLi9zcmMvbnV0dGluMmMvY29tcG9uZW50L2lucHV0L2V4cGFuZENoZXZyb24vZXhwYW5kQ2hldnJvbi5qcyIsIi4uLy4uL3NyYy9udXR0aW4yYy9jb21wb25lbnQvaW5wdXQvZmlsZVVwbG9hZC9maWxlVXBsb2FkRW50cnkvZmlsZVVwbG9hZEVudHJ5LmpzIiwiLi4vLi4vc3JjL251dHRpbjJjL2NvbXBvbmVudC9pbnB1dC9maWxlVXBsb2FkL2ZpbGVVcGxvYWQuanMiLCIuLi8uLi9zcmMvbnV0dGluMmMvY29tcG9uZW50L2lucHV0L2hpZGRlbklucHV0L2hpZGRlbklucHV0LmpzIiwiLi4vLi4vc3JjL251dHRpbjJjL2NvbXBvbmVudC9pbnB1dC9udW1iZXJJbnB1dC9udW1iZXJJbnB1dC5qcyIsIi4uLy4uL3NyYy9udXR0aW4yYy9jb21wb25lbnQvaW5wdXQvcGFzc3dvcmRJbnB1dC9wYXNzd29yZElucHV0LmpzIiwiLi4vLi4vc3JjL251dHRpbjJjL2NvbXBvbmVudC9pbnB1dC9wYXNzd29yZE1hdGNoZXJJbnB1dC9wYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlL3Bhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWUuanMiLCIuLi8uLi9zcmMvbnV0dGluMmMvY29tcG9uZW50L2lucHV0L3Bhc3N3b3JkTWF0Y2hlcklucHV0L3Bhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbC9wYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2wuanMiLCIuLi8uLi9zcmMvbnV0dGluMmMvY29tcG9uZW50L2lucHV0L3Bhc3N3b3JkTWF0Y2hlcklucHV0L3Bhc3N3b3JkTWF0Y2hlck1vZGVsLmpzIiwiLi4vLi4vc3JjL251dHRpbjJjL2NvbXBvbmVudC9pbnB1dC9wYXNzd29yZE1hdGNoZXJJbnB1dC9wYXNzd29yZE1hdGNoZXJJbnB1dC5qcyIsIi4uLy4uL3NyYy9udXR0aW4yYy9jb21wb25lbnQvaW5wdXQvcGhvbmVJbnB1dC9waG9uZUlucHV0LmpzIiwiLi4vLi4vc3JjL251dHRpbjJjL2NvbXBvbmVudC9pbnB1dC9yYWRpb0J1dHRvbi9yYWRpb0J1dHRvbi5qcyIsIi4uLy4uL3NyYy9udXR0aW4yYy9jb21wb25lbnQvaW5wdXQvcmFkaW9Ub2dnbGVTd2l0Y2gvcmFkaW9Ub2dnbGVTd2l0Y2guanMiLCIuLi8uLi9zcmMvbnV0dGluMmMvY29tcG9uZW50L2lucHV0L3NlbGVjdElucHV0L3NlbGVjdElucHV0T3B0aW9uc1NvdXJjZS5qcyIsIi4uLy4uL3NyYy9udXR0aW4yYy9jb21wb25lbnQvaW5wdXQvc2VsZWN0SW5wdXQvc2VsZWN0SW5wdXQuanMiLCIuLi8uLi9zcmMvbnV0dGluMmMvY29tcG9uZW50L2lucHV0L3RleHRJbnB1dC90ZXh0SW5wdXQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAZGVzY3JpcHRpb24gRm9udCBjb2xvciwgYmFja2dyb3VuZCBjb2xvciwgYW5kIGJvcmRlciBjb2xvciBwYWxldHRlcyBmb3IgdmFyaW91cyBtb2Rlcy5cbiAqL1xuZXhwb3J0IGNsYXNzIENvbG9yUGFsZXR0ZSB7XG5cbiAgICBzdGF0aWMgUFJJTUFSWV9DT0xPUlMgPSAgICAgICAgICBbXCIjZmZmXCIsXCIjMDA3YmZmXCIsXCIjMDA3YmZmXCJdO1xuICAgIHN0YXRpYyBQUklNQVJZX0hPVkVSX0NPTE9SUyA9ICAgIFtcIiNmZmZcIixcIiMwMDY5ZDlcIixcIiMwMDYyY2NcIl07XG4gICAgc3RhdGljIFBSSU1BUllfRElTQUJMRURfQ09MT1JTID0gW1wiI2ZmZlwiLFwiIzVlYWJmZFwiLFwiIzVlYWJmZFwiXTtcbiAgICBzdGF0aWMgUFJJTUFSWV9BQ1RJVkVfQ09MT1JTID0gICBbXCIjZmZmXCIsXCIjMDA2MmNjXCIsXCIjMDA1Y2JmXCJdO1xuXG4gICAgc3RhdGljIFNFQ09OREFSWV9DT0xPUlMgPSAgICAgICAgICBbXCIjZmZmXCIsXCIjNmM3NTdkXCIsXCIjNmM3NTdkXCJdO1xuICAgIHN0YXRpYyBTRUNPTkRBUllfSE9WRVJfQ09MT1JTID0gICAgW1wiI2ZmZlwiLFwiIzVhNjI2OFwiLFwiIzU0NWI2MlwiXTtcbiAgICBzdGF0aWMgU0VDT05EQVJZX0RJU0FCTEVEX0NPTE9SUyA9IFtcIiNmZmZcIixcIiM2Yzc1N2RcIixcIiM2Yzc1N2RcIl07XG4gICAgc3RhdGljIFNFQ09OREFSWV9BQ1RJVkVfQ09MT1JTID0gICBbXCIjZmZmXCIsXCIjNTQ1YjYyXCIsXCIjNGU1NTViXCJdO1xuXG4gICAgc3RhdGljIFNVQ0NFU1NfQ09MT1JTID0gICAgICAgICAgW1wiI2ZmZlwiLFwiIzI4YTc0NVwiLFwiIzI4YTc0NVwiXTtcbiAgICBzdGF0aWMgU1VDQ0VTU19IT1ZFUl9DT0xPUlMgPSAgICBbXCIjZmZmXCIsXCIjMjE4ODM4XCIsXCIjMWU3ZTM0XCJdO1xuICAgIHN0YXRpYyBTVUNDRVNTX0RJU0FCTEVEX0NPTE9SUyA9IFtcIiNmZmZcIixcIiMyOGE3NDVcIixcIiMyOGE3NDVcIl07XG4gICAgc3RhdGljIFNVQ0NFU1NfQUNUSVZFX0NPTE9SUyA9ICAgW1wiI2ZmZlwiLFwiIzFlN2UzNFwiLFwiIzFjNzQzMFwiXTtcblxuICAgIHN0YXRpYyBJTkZPX0NPTE9SUyA9ICAgICAgICAgIFtcIiNmZmZcIixcIiMxN2EyYjhcIixcIiMxN2EyYjhcIl07XG4gICAgc3RhdGljIElORk9fSE9WRVJfQ09MT1JTID0gICAgW1wiI2ZmZlwiLFwiIzEzODQ5NlwiLFwiIzExN2E4YlwiXTtcbiAgICBzdGF0aWMgSU5GT19ESVNBQkxFRF9DT0xPUlMgPSBbXCIjZmZmXCIsXCIjMTdhMmI4XCIsXCIjMTdhMmI4XCJdO1xuICAgIHN0YXRpYyBJTkZPX0FDVElWRV9DT0xPUlMgPSAgIFtcIiNmZmZcIixcIiMxMTdhOGJcIixcIiMxMDcwN2ZcIl07XG5cbiAgICBzdGF0aWMgV0FSTklOR19DT0xPUlMgPSAgICAgICAgICBbXCIjZmZmXCIsXCIjZmZjMTA3XCIsXCIjZmZjMTA3XCJdO1xuICAgIHN0YXRpYyBXQVJOSU5HX0hPVkVSX0NPTE9SUyA9ICAgIFtcIiNmZmZcIixcIiNlMGE4MDBcIixcIiNkMzllMDBcIl07XG4gICAgc3RhdGljIFdBUk5JTkdfRElTQUJMRURfQ09MT1JTID0gW1wiI2ZmZlwiLFwiI2ZmYzEwN1wiLFwiI2ZmYzEwN1wiXTtcbiAgICBzdGF0aWMgV0FSTklOR19BQ1RJVkVfQ09MT1JTID0gICBbXCIjZmZmXCIsXCIjZDM5ZTAwXCIsXCIjYzY5NTAwXCJdO1xuXG4gICAgc3RhdGljIERBTkdFUl9DT0xPUlMgPSAgICAgICAgICBbXCIjZmZmXCIsXCIjZGMzNTQ1XCIsXCIjZGMzNTQ1XCJdO1xuICAgIHN0YXRpYyBEQU5HRVJfSE9WRVJfQ09MT1JTID0gICAgW1wiI2ZmZlwiLFwiI2M4MjMzM1wiLFwiI2JkMjEzMFwiXTtcbiAgICBzdGF0aWMgREFOR0VSX0RJU0FCTEVEX0NPTE9SUyA9IFtcIiNmZmZcIixcIiNkYzM1NDVcIixcIiNkYzM1NDVcIl07XG4gICAgc3RhdGljIERBTkdFUl9BQ1RJVkVfQ09MT1JTID0gICBbXCIjZmZmXCIsXCIjYmQyMTMwXCIsXCIjYjIxZjJkXCJdO1xuXG4gICAgc3RhdGljIExJR0hUX0NPTE9SUyA9ICAgICAgICAgIFtcIiMyMTI1MjlcIixcIiNmOGY5ZmFcIixcIiNmOGY5ZmFcIl07XG4gICAgc3RhdGljIExJR0hUX0hPVkVSX0NPTE9SUyA9ICAgIFtcIiMyMTI1MjlcIixcIiNlMmU2ZWFcIixcIiNkYWUwZTVcIl07XG4gICAgc3RhdGljIExJR0hUX0RJU0FCTEVEX0NPTE9SUyA9IFtcIiMyMTI1MjlcIixcIiNmOGY5ZmFcIixcIiNmOGY5ZmFcIl07XG4gICAgc3RhdGljIExJR0hUX0FDVElWRV9DT0xPUlMgPSAgIFtcIiMyMTI1MjlcIixcIiNkYWUwZTVcIixcIiNkM2Q5ZGZcIl07XG5cbiAgICBzdGF0aWMgREFSS19DT0xPUlMgPSAgICAgICAgICBbXCIjZmZmXCIsXCIjMzQzYTQwXCIsXCIjMzQzYTQwXCJdO1xuICAgIHN0YXRpYyBEQVJLX0hPVkVSX0NPTE9SUyA9ICAgIFtcIiNmZmZcIixcIiMyMzI3MmJcIixcIiMxZDIxMjRcIl07XG4gICAgc3RhdGljIERBUktfRElTQUJMRURfQ09MT1JTID0gW1wiI2ZmZlwiLFwiIzM0M2E0MFwiLFwiIzM0M2E0MFwiXTtcbiAgICBzdGF0aWMgREFSS19BQ1RJVkVfQ09MT1JTID0gICBbXCIjZmZmXCIsXCIjMWQyMTI0XCIsXCIjMTcxYTFkXCJdO1xufSIsImV4cG9ydCBjbGFzcyBDdXN0b21BcHBlYXJhbmNlIHtcblxuICAgIHN0YXRpYyBTSVpFX0RFRkFVTCA9IFwic2l6ZS1kZWZhdWx0XCI7XG4gICAgc3RhdGljIFNJWkVfU01BTEwgPSBcInNpemUtc21hbGxcIjtcbiAgICBzdGF0aWMgU0laRV9NRURJVU0gPSBcInNpemUtbWVkaXVtXCI7XG4gICAgc3RhdGljIFNJWkVfTEFSR0UgPSBcInNpemUtbGFyZ2VcIjtcblxuICAgIHN0YXRpYyBTSEFQRV9ERUFGVUxUID0gXCJzaGFwZS1kZWZhdWx0XCI7XG4gICAgc3RhdGljIFNIQVBFX1JPVU5EID0gXCJzaGFwZS1yb3VuZFwiO1xuICAgIHN0YXRpYyBTSEFQRV9TUVVBUkUgPSBcInNoYXBlLXNxdWFyZVwiO1xuXG4gICAgc3RhdGljIFZJU0lCSUxJVFlfREVBRlVMVCA9IFwidmlzaWJpbGl0eS1kZWZhdWx0XCI7XG4gICAgc3RhdGljIFZJU0lCSUxJVFlfVklTSUJMRSA9IFwidmlzaWJpbGl0eS12aXNpYmxlXCI7XG4gICAgc3RhdGljIFZJU0lCSUxJVFlfSElEREVOID0gXCJ2aXNpYmlsaXR5LWhpZGRlblwiO1xuXG4gICAgc3RhdGljIFNQQUNJTkdfREVGQVVMVCA9IFwic3BhY2luZy1kZWZhdWx0XCI7XG4gICAgc3RhdGljIFNQQUNJTkdfTk9ORSA9IFwic3BhY2luZy1ub25lXCI7XG4gICAgc3RhdGljIFNQQUNJTkdfQUJPVkUgPSBcInNwYWNpbmctYWJvdmVcIjtcbiAgICBzdGF0aWMgU1BBQ0lOR19CRUxPVyA9IFwic3BhY2luZy1iZWxvd1wiO1xuICAgIHN0YXRpYyBTUEFDSU5HX0FCT1ZFX0JFTE9XID0gXCJzcGFjaW5nLWFib3ZlLWJlbG93XCI7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5zaXplID0gQ3VzdG9tQXBwZWFyYW5jZS5TSVpFX0RFRkFVTFQ7XG4gICAgICAgIHRoaXMuc2hhcGUgPSBDdXN0b21BcHBlYXJhbmNlLlNIQVBFX0RFQUZVTFQ7XG4gICAgICAgIHRoaXMuc3BhY2luZyA9IEN1c3RvbUFwcGVhcmFuY2UuU1BBQ0lOR19ERUZBVUxUO1xuICAgICAgICB0aGlzLnZpc2liaWxpdHkgPSBDdXN0b21BcHBlYXJhbmNlLlZJU0lCSUxJVFlfREVBRlVMVDtcbiAgICAgICAgdGhpcy5sb2NrZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICB3aXRoU2l6ZShzaXplKSB7XG4gICAgICAgIHRoaXMuc2l6ZSA9IHNpemU7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHdpdGhTaGFwZShzaGFwZSkge1xuICAgICAgICB0aGlzLnNoYXBlID0gc2hhcGU7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHdpdGhTcGFjaW5nKHNwYWNpbmcpIHtcbiAgICAgICAgdGhpcy5zcGFjaW5nID0gc3BhY2luZztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgd2l0aFZpc2liaWxpdHkodmlzaWJpbGl0eSkge1xuICAgICAgICB0aGlzLnZpc2liaWxpdHkgPSB2aXNpYmlsaXR5O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbn0iLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwibnV0dGluMmMtY29yZV92MVwiO1xuXG5leHBvcnQgY2xhc3MgRGVwZW5kZW5jaWVzIHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudENsYXNzID0gQ29tcG9uZW50O1xuICAgIH1cblxufSIsImltcG9ydCB7IENvbnRhaW5lckV2ZW50IH0gZnJvbSBcImNvbnRhaW5lcmJyaWRnZV92MVwiO1xuaW1wb3J0IHsgTWV0aG9kIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5pbXBvcnQgeyBQcm90b3R5cGVDb25maWcsIFR5cGVDb25maWdQYWNrIH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5cbmV4cG9ydCBjbGFzcyBCYWNrU2hhZGVMaXN0ZW5lcnMge1xuXG4gICAgY29uc3RydWN0b3IoZXhpc3RpbmdMaXN0ZW5lcnMgPSBudWxsKSB7XG4gICAgICAgIHRoaXMuYmFja2dyb3VuZENsaWNrZWRMaXN0ZW5lciA9IChleGlzdGluZ0xpc3RlbmVycyAmJiBleGlzdGluZ0xpc3RlbmVycy5nZXRCYWNrZ3JvdW5kQ2xpY2tlZCkgPyBleGlzdGluZ0xpc3RlbmVycy5nZXRCYWNrZ3JvdW5kQ2xpY2tlZCgpIDogbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge01ldGhvZH0gYmFja2dyb3VuZENsaWNrZWRMaXN0ZW5lciBcbiAgICAgKi9cbiAgICB3aXRoQmFja2dyb3VuZENsaWNrZWQoYmFja2dyb3VuZENsaWNrZWRMaXN0ZW5lcikge1xuICAgICAgICB0aGlzLmJhY2tncm91bmRDbGlja2VkTGlzdGVuZXIgPSBiYWNrZ3JvdW5kQ2xpY2tlZExpc3RlbmVyO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cblxuICAgIGdldEJhY2tncm91bmRDbGlja2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5iYWNrZ3JvdW5kQ2xpY2tlZExpc3RlbmVyO1xuICAgIH1cblxuICAgIGNhbGxCYWNrZ3JvdW5kQ2xpY2tlZChldmVudCkge1xuICAgICAgICB0aGlzLmNhbGxMaXN0ZW5lcih0aGlzLmJhY2tncm91bmRDbGlja2VkTGlzdGVuZXIsIGV2ZW50KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge01ldGhvZH0gbGlzdGVuZXIgXG4gICAgICogQHBhcmFtIHtDb250YWluZXJFdmVudH0gZXZlbnQgXG4gICAgICovXG4gICAgY2FsbExpc3RlbmVyKGxpc3RlbmVyLCBldmVudCkge1xuICAgICAgICBpZiAobnVsbCAhPSBsaXN0ZW5lcikge1xuICAgICAgICAgICAgbGlzdGVuZXIuY2FsbChldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cblxuVHlwZUNvbmZpZ1BhY2suaW5zdGFuY2UoKS5hZGRUeXBlQ29uZmlnKFwibnV0dGluMmMtdWlcIiwgUHJvdG90eXBlQ29uZmlnLnVubmFtZWQoQmFja1NoYWRlTGlzdGVuZXJzKSk7IiwiaW1wb3J0IHtcbiAgICBDb21wb25lbnQsXG4gICAgQ2FudmFzU3R5bGVzLFxuICAgIEJhc2VFbGVtZW50LFxuICAgIFN0eWxlc2hlZXRCdWlsZGVyLFxuICAgIElubGluZUNvbXBvbmVudEZhY3RvcnksXG4gICAgQ29tcG9uZW50QnVpbGRlcixcbiAgICBTdHlsZXNoZWV0XG59IGZyb20gXCJudXR0aW4yYy1jb3JlX3YxXCI7XG5pbXBvcnQgeyBMb2dnZXIsIFRpbWVQcm9taXNlIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5pbXBvcnQgeyBJbmplY3Rpb25Qb2ludCwgUHJvdG90eXBlQ29uZmlnLCBUeXBlQ29uZmlnUGFjayB9IGZyb20gXCJtaW5kaV92MVwiO1xuaW1wb3J0IHsgQmFja1NoYWRlTGlzdGVuZXJzIH0gZnJvbSBcIi4vYmFja1NoYWRlTGlzdGVuZXJzLmpzXCI7XG5cbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJCYWNrU2hhZGVcIik7XG5cbmV4cG9ydCBjbGFzcyBCYWNrU2hhZGUge1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtCYWNrU2hhZGVMaXN0ZW5lcnN9IGJhY2tTaGFkZUxpc3RlbmVyc1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGJhY2tTaGFkZUxpc3RlbmVycyA9IG5ldyBCYWNrU2hhZGVMaXN0ZW5lcnMoKSl7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtJbmxpbmVDb21wb25lbnRGYWN0b3J5fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShJbmxpbmVDb21wb25lbnRGYWN0b3J5KTtcblxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudH0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSBudWxsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7QmFzZUVsZW1lbnR9ICovXG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gbnVsbDtcblxuICAgICAgICAvKiogQHR5cGUge0JhY2tTaGFkZUxpc3RlbmVyc30gKi9cbiAgICAgICAgdGhpcy5iYWNrU2hhZGVMaXN0ZW5lcnMgPSBiYWNrU2hhZGVMaXN0ZW5lcnM7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtib29sZWFufSAqL1xuICAgICAgICB0aGlzLmhpZGRlbiA9IHRydWU7XG5cdH1cblxuXHQvKipcblx0ICogXG4gICAgICogQHBhcmFtIHtTdHlsZXNoZWV0QnVpbGRlcn0gc3R5bGVzaGVldEJ1aWxkZXJcblx0ICogQHJldHVybnMge1N0eWxlc2hlZXR9XG5cdCAqL1xuXHRzdGF0aWMgYnVpbGRTdHlsZXNoZWV0KHN0eWxlc2hlZXRCdWlsZGVyKSB7XG5cdFx0cmV0dXJuIHN0eWxlc2hlZXRCdWlsZGVyXG5cdFx0XHQuc2VsZWN0b3IoXCIuYmFjay1zaGFkZVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIiwgXCJmaXhlZFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRvcFwiLCBcIjBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJsZWZ0XCIsIFwiMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInotaW5kZXhcIiwgXCIxMDQwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwid2lkdGhcIiwgXCIxMDB2d1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImhlaWdodFwiLCBcIjEwMHZoXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiMwMDBcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5iYWNrLXNoYWRlLnNob3dcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMC41XCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYmFjay1zaGFkZS5mYWRlXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNpdGlvblwiLCBcIm9wYWNpdHkgMC4zcyBlYXNlLWluLW91dFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIi1tb3otdHJhbnNpdGlvblwiLCBcIm9wYWNpdHkgMC4zcyBlYXNlLWluLW91dFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIi13ZWJraXQtdHJhbnNpdGlvblwiLCBcIm9wYWNpdHkgMC4zcyBlYXNlLWluLW91dFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuXHRcdFx0LmJ1aWxkKCk7XG5cdH1cblxuXHQvKipcblx0ICogXG5cdCAqIEBwYXJhbSB7Q29tcG9uZW50QnVpbGRlcn0gY29tcG9uZW50QnVpbGRlclxuXHQgKiBAcmV0dXJucyB7Q29tcG9uZW50fVxuXHQgKi9cblx0c3RhdGljIGJ1aWxkQ29tcG9uZW50KGNvbXBvbmVudEJ1aWxkZXIpIHtcblx0XHRyZXR1cm4gY29tcG9uZW50QnVpbGRlclxuXHRcdFx0LnJvb3QoXCJkaXZcIiwgXCJpZD1iYWNrU2hhZGVcIiwgXCJzdHlsZT16LWluZGV4OjM7ZGlzcGxheTpub25lO1wiLCBcImNsYXNzPWJhY2stc2hhZGVcIilcblx0XHRcdC5idWlsZCgpO1xuXHR9XG5cbiAgICBwb3N0Q29uZmlnKCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoQmFja1NoYWRlKTtcbiAgICB9XG5cbiAgICBoaWRlQWZ0ZXIobWlsbGlTZWNvbmRzKSB7XG4gICAgICAgIGlmICh0aGlzLmhpZGRlbikge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtyZXNvbHZlKCk7fSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5oaWRkZW4gPSB0cnVlO1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJiYWNrU2hhZGVcIikuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLCBcImJhY2stc2hhZGUgZmFkZVwiKTtcbiAgICAgICAgY29uc3QgaGlkZVByb21pc2UgPSBUaW1lUHJvbWlzZS5hc1Byb21pc2UobWlsbGlTZWNvbmRzLFxuICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJhY2tTaGFkZVwiKS5zZXRTdHlsZShcImRpc3BsYXlcIiwgXCJub25lXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgICBjb25zdCBkaXNhYmxlU3R5bGVQcm9taXNlID0gVGltZVByb21pc2UuYXNQcm9taXNlKG1pbGxpU2Vjb25kcyArIDEsXG4gICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgQ2FudmFzU3R5bGVzLmRpc2FibGVTdHlsZShCYWNrU2hhZGUubmFtZSwgdGhpcy5jb21wb25lbnQuY29tcG9uZW50SW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW2hpZGVQcm9taXNlLCBkaXNhYmxlU3R5bGVQcm9taXNlXSk7XG4gICAgfVxuXG4gICAgc2hvdygpIHtcbiAgICAgICAgaWYgKCF0aGlzLmhpZGRlbikge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtyZXNvbHZlKCk7fSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5oaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgQ2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKEJhY2tTaGFkZS5uYW1lLCB0aGlzLmNvbXBvbmVudC5jb21wb25lbnRJbmRleCk7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJhY2tTaGFkZVwiKS5zZXRTdHlsZShcImRpc3BsYXlcIiwgXCJibG9ja1wiKTtcbiAgICAgICAgcmV0dXJuIFRpbWVQcm9taXNlLmFzUHJvbWlzZSgxMDAsXG4gICAgICAgICAgICAoKSA9PiB7IFxuICAgICAgICAgICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJhY2tTaGFkZVwiKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImNsYXNzXCIsIFwiYmFjay1zaGFkZSBmYWRlIHNob3dcIilcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG4gICAgXG59XG5cblR5cGVDb25maWdQYWNrLmluc3RhbmNlKCkuYWRkVHlwZUNvbmZpZyhcIm51dHRpbjJjLXVpXCIsIFByb3RvdHlwZUNvbmZpZy51bm5hbWVkKEJhY2tTaGFkZSkpOyIsImltcG9ydCB7IENvbXBvbmVudCxcblx0Q2FudmFzU3R5bGVzLFxuXHRTdHlsZUFjY2Vzc29yLFxuXHRTdHlsZXNoZWV0QnVpbGRlcixcblx0Q29tcG9uZW50QnVpbGRlcixcblx0SW5saW5lQ29tcG9uZW50RmFjdG9yeSxcblx0U3R5bGVzaGVldFxufSBmcm9tIFwibnV0dGluMmMtY29yZV92MVwiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5pbXBvcnQgeyBJbmplY3Rpb25Qb2ludCwgUHJvdG90eXBlQ29uZmlnLCBUeXBlQ29uZmlnUGFjayB9IGZyb20gXCJtaW5kaV92MVwiO1xuXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiQmFja2dyb3VuZFwiKTtcblxuZXhwb3J0IGNsYXNzIEJhY2tncm91bmQge1xuXG4gICAgY29uc3RydWN0b3IoYmFja2dyb3VuZEltYWdlUGF0aCl7XG5cblx0XHQvKiogQHR5cGUge0lubGluZUNvbXBvbmVudEZhY3Rvcnl9ICovXG5cdFx0dGhpcy5jb21wb25lbnRGYWN0b3J5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoSW5saW5lQ29tcG9uZW50RmFjdG9yeSk7XG5cblx0XHQvKiogQHR5cGUge0NvbXBvbmVudH0gKi9cblx0XHR0aGlzLmNvbXBvbmVudCA9IG51bGw7XG5cblx0XHQvKiogQHR5cGUge3N0cmluZ30gKi9cblx0XHR0aGlzLmJhY2tncm91bmRJbWFnZVBhdGggPSBiYWNrZ3JvdW5kSW1hZ2VQYXRoO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBwYXJhbSB7U3R5bGVzaGVldEJ1aWxkZXJ9IHN0eWxlc2hlZXRCdWlsZGVyXG5cdCAqIEByZXR1cm5zIHtTdHlsZXNoZWV0fVxuXHQgKi9cblx0c3RhdGljIGJ1aWxkU3R5bGVzaGVldChzdHlsZXNoZWV0QnVpbGRlcikge1xuXHRcdHJldHVybiBzdHlsZXNoZWV0QnVpbGRlclxuXHRcdFx0LnNlbGVjdG9yKFwiLmJhY2tncm91bmRcIilcblx0XHRcdC5vcGVuKClcblx0XHRcdFx0LnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcInJnYigxNTAsIDE5NywgMjU1KVwiKVxuXHRcdFx0XHQuc3R5bGUoXCJiYWNrZ3JvdW5kLXJlcGVhdFwiLCBcIm5vLXJlcGVhdFwiKVxuXHRcdFx0XHQuc3R5bGUoXCJiYWNrZ3JvdW5kLXBvc2l0aW9uLXhcIiwgXCJjZW50ZXJcIilcblx0XHRcdFx0LnN0eWxlKFwiYmFja2dyb3VuZC1wb3NpdGlvbi15XCIsIFwiY2VudGVyXCIpXG5cdFx0XHRcdC5zdHlsZShcImJhY2tncm91bmQtYXR0YWNobWVudFwiLCBcInNjcm9sbFwiKVxuXHRcdFx0XHQuc3R5bGUoXCJiYWNrZ3JvdW5kLXNpemVcIiwgXCJjb3ZlclwiKVxuXHRcdFx0XHQuc3R5bGUoXCJmb250LWZhbWlseVwiLCBcIlNvdXJjZSBTYW5zIFByb1wiKVxuXHRcdFx0XHQuc3R5bGUoXCJmb250LXdlaWdodFwiLCBcIjMwMFwiKVxuXHRcdFx0XHQuc3R5bGUoXCJoZWlnaHRcIiwgXCIxMDAlXCIpXG5cdFx0XHQuY2xvc2UoKVxuXHRcdFx0LmJ1aWxkKCk7XG5cdH1cblxuXHQvKipcblx0ICogXG5cdCAqIEBwYXJhbSB7Q29tcG9uZW50QnVpbGRlcn0gdW5pcXVlSWRSZWdpc3RyeVxuXHQgKiBAcmV0dXJucyB7Q29tcG9uZW50fVxuXHQgKi9cblx0c3RhdGljIGJ1aWxkQ29tcG9uZW50KGNvbXBvbmVudEJ1aWxkZXIpIHtcblx0XHRyZXR1cm4gY29tcG9uZW50QnVpbGRlclxuXHRcdFx0LnJvb3QoXCJkaXZcIiwgXCJpZD1iYWNrZ3JvdW5kXCIsIFwiY2xhc3M9YmFja2dyb3VuZFwiKVxuXHRcdFx0LmJ1aWxkKCk7XG5cdH1cblxuXHRzZXQoa2V5LHZhbCkge1xuXHRcdHRoaXMuY29tcG9uZW50LnNldChrZXksdmFsKTtcblx0fVxuXG5cdHBvc3RDb25maWcoKSB7XG5cdFx0dGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKEJhY2tncm91bmQpO1xuXHRcdGlmICh0aGlzLmJhY2tncm91bmRJbWFnZVBhdGgpIHtcbiAgICAgICAgICAgIFN0eWxlQWNjZXNzb3IuZnJvbSh0aGlzLmNvbXBvbmVudC5nZXQoXCJiYWNrZ3JvdW5kXCIpKVxuICAgICAgICAgICAgICAgIC5zZXQoXCJiYWNrZ3JvdW5kLWltYWdlXCIsIFwidXJsKFxcXCJcIiArIHRoaXMuYmFja2dyb3VuZEltYWdlUGF0aCArIFwiXFxcIilcIik7XG5cdFx0fVxuXHRcdENhbnZhc1N0eWxlcy5lbmFibGVTdHlsZShCYWNrZ3JvdW5kLm5hbWUpO1xuXHR9XG5cbn1cblxuVHlwZUNvbmZpZ1BhY2suaW5zdGFuY2UoKS5hZGRUeXBlQ29uZmlnKFwibnV0dGluMmMtdWlcIiwgUHJvdG90eXBlQ29uZmlnLnVubmFtZWQoQmFja2dyb3VuZCkpOyIsImltcG9ydCB7XG4gICAgQ2FudmFzU3R5bGVzLFxuICAgIENvbXBvbmVudCxcbiAgICBTdHlsZXNoZWV0QnVpbGRlcixcbiAgICBDb21wb25lbnRCdWlsZGVyLFxuICAgIElubGluZUNvbXBvbmVudEZhY3RvcnksXG4gICAgU3R5bGVzaGVldFxufSBmcm9tIFwibnV0dGluMmMtY29yZV92MVwiO1xuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQsIFByb3RvdHlwZUNvbmZpZywgVHlwZUNvbmZpZ1BhY2sgfSBmcm9tIFwibWluZGlfdjFcIjtcbmltcG9ydCB7IExvZ2dlciwgTWV0aG9kLCBUaW1lUHJvbWlzZSB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuaW1wb3J0IHsgQ3VzdG9tQXBwZWFyYW5jZSB9IGZyb20gXCIuLi9jdXN0b21BcHBlYXJhbmNlLmpzXCI7XG5cbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJCYW5uZXJNZXNzYWdlXCIpO1xuXG5leHBvcnQgY2xhc3MgQmFubmVyTWVzc2FnZSB7XG5cbiAgICBzdGF0aWMgVFlQRV9BTEVSVCA9IFwidHlwZS1hbGVydFwiO1xuICAgIHN0YXRpYyBUWVBFX0lORk8gPSBcInR5cGUtaW5mb1wiO1xuICAgIHN0YXRpYyBUWVBFX1NVQ0NFU1MgPSBcInR5cGUtc3VjY2Vzc1wiO1xuICAgIHN0YXRpYyBUWVBFX1dBUk5JTkcgPSBcInR5cGUtd2FybmluZ1wiO1xuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGJhbm5lclR5cGUgXG4gICAgICogQHBhcmFtIHtib29sZWFufSBjbG9zZWFibGUgXG4gICAgICogQHBhcmFtIHtDdXN0b21BcHBlYXJhbmNlfSBjdXN0b21BcHBlYXJhbmNlXG4gICAgICovXG4gICAgY29uc3RydWN0b3IobWVzc2FnZSwgYmFubmVyVHlwZSA9IEJhbm5lck1lc3NhZ2UuVFlQRV9JTkZPLCBjbG9zZWFibGUgPSBmYWxzZSwgY3VzdG9tQXBwZWFyYW5jZSA9IG51bGwpIHtcblxuICAgICAgICAvKiogQHR5cGUge0lubGluZUNvbXBvbmVudEZhY3Rvcnl9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKElubGluZUNvbXBvbmVudEZhY3RvcnkpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IG51bGw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtib29sZWFufSAqL1xuICAgICAgICB0aGlzLmNsb3NlYWJsZSA9IGNsb3NlYWJsZTtcblxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5iYW5uZXJUeXBlID0gYmFubmVyVHlwZTtcblxuICAgICAgICAvKiogQHR5cGUge01ldGhvZH0gKi9cbiAgICAgICAgdGhpcy5vbkhpZGVMaXN0ZW5lciA9IG51bGw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtNZXRob2R9ICovXG4gICAgICAgIHRoaXMub25TaG93TGlzdGVuZXIgPSBudWxsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Q3VzdG9tQXBwZWFyYW5jZX0gKi9cbiAgICAgICAgdGhpcy5jdXN0b21BcHBlYXJhbmNlID0gY3VzdG9tQXBwZWFyYW5jZTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3R5bGVzaGVldEJ1aWxkZXJ9IHN0eWxlc2hlZXRCdWlsZGVyIFxuICAgICAqIEByZXR1cm5zIHtTdHlsZXNoZWV0fVxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZFN0eWxlc2hlZXQoc3R5bGVzaGVldEJ1aWxkZXIpIHtcbiAgICAgICAgcmV0dXJuIHN0eWxlc2hlZXRCdWlsZGVyXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYmFubmVyLW1lc3NhZ2Utc2l6ZS1sYXJnZVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmdcIiwgXCIxOHB0XCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYmFubmVyLW1lc3NhZ2Utc2l6ZS1kZWZhdWx0LCAuYmFubmVyLW1lc3NhZ2Utc2l6ZS1tZWRpdW1cIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwYWRkaW5nXCIsIFwiMTJwdFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmJhbm5lci1tZXNzYWdlLXNpemUtc21hbGxcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwYWRkaW5nLWxlZnRcIiwgXCIxMHB0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZy1yaWdodFwiLCBcIjEwcHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwYWRkaW5nLWJvdHRvbVwiLCBcIjhweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmctdG9wXCIsIFwiOHB4XCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYmFubmVyLW1lc3NhZ2Utc2hhcGUtZGVmYXVsdCwgLmJhbm5lci1tZXNzYWdlLXNoYXBlLXNxdWFyZVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1yYWRpdXNcIiwgXCIwcHhcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5iYW5uZXItbWVzc2FnZS1zaGFwZS1yb3VuZFwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1yYWRpdXNcIiwgXCIzcHhcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5iYW5uZXItbWVzc2FnZS1zcGFjaW5nLWRlZmF1bHQsIC5iYW5uZXItbWVzc2FnZS1zcGFjaW5nLW5vbmVcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW5cIiwgXCIwcHRcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5iYW5uZXItbWVzc2FnZS1zcGFjaW5nLWFib3ZlXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luLXRvcFwiLCBcIjFyZW1cIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5iYW5uZXItbWVzc2FnZS1zcGFjaW5nLWJlbG93XCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luLWJvdHRvbVwiLCBcIjFyZW1cIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5iYW5uZXItbWVzc2FnZS1zcGFjaW5nLWFib3ZlLWJlbG93XCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luLXRvcFwiLCBcIjFyZW1cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tYm90dG9tXCIsIFwiMXJlbVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmJhbm5lci1tZXNzYWdlXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCJ3aGl0ZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIndpZHRoXCIsIFwiMTAwJVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zaXRpb25cIiwgXCJvcGFjaXR5IDAuNXNcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5iYW5uZXItbWVzc2FnZS5oaWRlXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCBcIjBcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5iYW5uZXItbWVzc2FnZS5zaG93XCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCBcIjAuOTBcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5iYW5uZXItbWVzc2FnZS10eXBlLWFsZXJ0XCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiNmNDQzMzZcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5iYW5uZXItbWVzc2FnZS10eXBlLXN1Y2Nlc3NcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiIzRDQUY1MFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmJhbm5lci1tZXNzYWdlLXR5cGUtaW5mb1wiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIiwgXCIjMjE5NkYzXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYmFubmVyLW1lc3NhZ2UtdHlwZS13YXJuaW5nXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiNmZjk4MDBcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5iYW5uZXItbWVzc2FnZS1jbG9zZS1idXR0b25cIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tbGVmdFwiLCBcIjE1cHRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjb2xvclwiLCBcIndoaXRlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZm9udC13ZWlnaHRcIiwgXCJib2xkXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZmxvYXRcIiwgXCJyaWdodFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtc2l6ZVwiLCBcIjIycHRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJsaW5lLWhlaWdodFwiLCBcIjE0cHRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjdXJzb3JcIiwgXCJwb2ludGVyXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNpdGlvblwiLCBcIjAuM3NcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5iYW5uZXItbWVzc2FnZS1jbG9zZS1idXR0b246aG92ZXJcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjb2xvclwiLCBcImJsYWNrXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYmFubmVyLW1lc3NhZ2UtbWVzc2FnZVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpbi1sZWZ0XCIsIFwiMTVweFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDb21wb25lbnRCdWlsZGVyfSBjb21wb25lbnRCdWlsZGVyIFxuICAgICAqIEByZXR1cm5zIHtDb21wb25lbnR9XG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkQ29tcG9uZW50KGNvbXBvbmVudEJ1aWxkZXIpIHtcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudEJ1aWxkZXJcbiAgICAgICAgICAgIC5yb290KFwiZGl2XCIsIFwiaWQ9YmFubmVyTWVzc2FnZVwiLCBcImNsYXNzPWJhbm5lci1tZXNzYWdlXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLm5vZGUoXCJzcGFuXCIsIFwiaWQ9YmFubmVyTWVzc2FnZUNsb3NlQnV0dG9uXCIsIFwiY2xhc3M9YmFubmVyLW1lc3NhZ2UtY2xvc2UtYnV0dG9uXCIpXG4gICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAudGV4dChcIsOXXCIpXG4gICAgICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgICAgICAubm9kZShcInNwYW5cIiwgXCJpZD1iYW5uZXJNZXNzYWdlSGVhZGVyXCIsIFwiY2xhc3M9YmFubmVyLW1lc3NhZ2UtaGVhZGVyXCIpXG4gICAgICAgICAgICAgICAgLm5vZGUoXCJzcGFuXCIsIFwiaWQ9YmFubmVyTWVzc2FnZU1lc3NhZ2VcIiwgXCJjbGFzcz1iYW5uZXItbWVzc2FnZS1tZXNzYWdlXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgcG9zdENvbmZpZygpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKEJhbm5lck1lc3NhZ2UpO1xuICAgICAgICBDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUoQmFubmVyTWVzc2FnZS5uYW1lKTtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYmFubmVyTWVzc2FnZUhlYWRlclwiKS5zZXRDaGlsZChcIkFsZXJ0XCIpO1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJiYW5uZXJNZXNzYWdlTWVzc2FnZVwiKS5zZXRDaGlsZCh0aGlzLm1lc3NhZ2UpO1xuICAgICAgICB0aGlzLmFwcGx5Q2xhc3NlcyhcImJhbm5lci1tZXNzYWdlIGZhZGVcIik7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJhbm5lck1lc3NhZ2VDbG9zZUJ1dHRvblwiKS5saXN0ZW5UbyhcImNsaWNrXCIsIHRoaXMuaGlkZSwgdGhpcyk7XG4gICAgfVxuXG4gICAgYXBwbHlDbGFzc2VzKGJhc2VDbGFzc2VzKSB7XG4gICAgICAgIGxldCBjbGFzc2VzID0gYmFzZUNsYXNzZXM7XG4gICAgICAgIGNsYXNzZXMgPSBjbGFzc2VzICsgXCIgYmFubmVyLW1lc3NhZ2UtXCIgKyB0aGlzLmJhbm5lclR5cGU7XG4gICAgICAgIGlmICh0aGlzLmN1c3RvbUFwcGVhcmFuY2UpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmN1c3RvbUFwcGVhcmFuY2Uuc2hhcGUpIHtcbiAgICAgICAgICAgICAgICBjbGFzc2VzID0gY2xhc3NlcyArIFwiIGJhbm5lci1tZXNzYWdlLVwiICsgdGhpcy5jdXN0b21BcHBlYXJhbmNlLnNoYXBlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuY3VzdG9tQXBwZWFyYW5jZS5zaXplKSB7XG4gICAgICAgICAgICAgICAgY2xhc3NlcyA9IGNsYXNzZXMgKyBcIiBiYW5uZXItbWVzc2FnZS1cIiArIHRoaXMuY3VzdG9tQXBwZWFyYW5jZS5zaXplO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuY3VzdG9tQXBwZWFyYW5jZS5zcGFjaW5nKSB7XG4gICAgICAgICAgICAgICAgY2xhc3NlcyA9IGNsYXNzZXMgKyBcIiBiYW5uZXItbWVzc2FnZS1cIiArIHRoaXMuY3VzdG9tQXBwZWFyYW5jZS5zcGFjaW5nO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJhbm5lck1lc3NhZ2VcIikuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLGNsYXNzZXMpO1xuICAgIH1cbiAgICBcbiAgICBhcHBseUhlYWRlcihoZWFkZXIpIHtcbiAgICAgICAgdGhpcy5oZWFkZXIgPSBoZWFkZXI7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJhbm5lck1lc3NhZ2VIZWFkZXJcIikuc2V0Q2hpbGQodGhpcy5oZWFkZXIpO1xuICAgIH1cblxuICAgIGFwcGx5TWVzc2FnZShtZXNzYWdlKSB7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJhbm5lck1lc3NhZ2VNZXNzYWdlXCIpLnNldENoaWxkKHRoaXMubWVzc2FnZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtNZXRob2R9IGNsaWNrZWRMaXN0ZW5lciBcbiAgICAgKi9cbiAgICByZW1vdmUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbXBvbmVudC5yZW1vdmUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge01ldGhvZH0gb25IaWRlTGlzdGVuZXIgXG4gICAgICovXG4gICAgb25IaWRlKG9uSGlkZUxpc3RlbmVyKSB7XG4gICAgICAgIHRoaXMub25IaWRlTGlzdGVuZXIgPSBvbkhpZGVMaXN0ZW5lcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge01ldGhvZH0gb25TaG93TGlzdGVuZXIgXG4gICAgICovXG4gICAgb25TaG93KG9uU2hvd0xpc3RlbmVyKSB7XG4gICAgICAgIHRoaXMub25TaG93TGlzdGVuZXIgPSBvblNob3dMaXN0ZW5lcjtcbiAgICB9XG5cbiAgICBhc3luYyBoaWRlKCkge1xuICAgICAgICB0aGlzLmFwcGx5Q2xhc3NlcyhcImJhbm5lci1tZXNzYWdlIGhpZGVcIik7XG4gICAgICAgIGF3YWl0IFRpbWVQcm9taXNlLmFzUHJvbWlzZSg1MDAsICgpID0+IHsgXG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJiYW5uZXJNZXNzYWdlXCIpLnNldFN0eWxlKFwiZGlzcGxheVwiLFwibm9uZVwiKTtcbiAgICAgICAgICAgIENhbnZhc1N0eWxlcy5kaXNhYmxlU3R5bGUoQmFubmVyTWVzc2FnZS5uYW1lLCB0aGlzLmNvbXBvbmVudC5jb21wb25lbnRJbmRleCk7XG4gICAgICAgIH0pO1xuICAgICAgICBpZih0aGlzLm9uSGlkZUxpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLm9uSGlkZUxpc3RlbmVyLmNhbGwoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIHNob3cobmV3SGVhZGVyID0gbnVsbCwgbmV3TWVzc2FnZSA9IG51bGwpIHtcbiAgICAgICAgaWYgKG5ld0hlYWRlcikge1xuICAgICAgICAgICAgdGhpcy5hcHBseUhlYWRlcihuZXdIZWFkZXIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuZXdNZXNzYWdlKSB7XG4gICAgICAgICAgICB0aGlzLmFwcGx5TWVzc2FnZShuZXdNZXNzYWdlKTtcbiAgICAgICAgfVxuICAgICAgICBDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUoQmFubmVyTWVzc2FnZS5uYW1lLCB0aGlzLmNvbXBvbmVudC5jb21wb25lbnRJbmRleCk7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJhbm5lck1lc3NhZ2VcIikuc2V0U3R5bGUoXCJkaXNwbGF5XCIsXCJibG9ja1wiKTtcbiAgICAgICAgYXdhaXQgVGltZVByb21pc2UuYXNQcm9taXNlKDEwMCwoKSA9PiB7IFxuICAgICAgICAgICAgdGhpcy5hcHBseUNsYXNzZXMoXCJiYW5uZXItbWVzc2FnZSBzaG93XCIpO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYodGhpcy5vblNob3dMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5vblNob3dMaXN0ZW5lci5jYWxsKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cblxuVHlwZUNvbmZpZ1BhY2suaW5zdGFuY2UoKS5hZGRUeXBlQ29uZmlnKFwibnV0dGluMmMtdWlcIiwgUHJvdG90eXBlQ29uZmlnLnVubmFtZWQoQmFubmVyTWVzc2FnZSkpOyIsImltcG9ydCB7IFZpZGVvRWxlbWVudCxcblx0Q2FudmFzU3R5bGVzLFxuXHRDb21wb25lbnQsXG5cdFN0eWxlc2hlZXRCdWlsZGVyLFxuXHRDb21wb25lbnRCdWlsZGVyLFxuXHRJbmxpbmVDb21wb25lbnRGYWN0b3J5LCBcblx0U3R5bGVzaGVldFxuIH0gZnJvbSBcIm51dHRpbjJjLWNvcmVfdjFcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQsIFByb3RvdHlwZUNvbmZpZywgVHlwZUNvbmZpZ1BhY2sgfSBmcm9tIFwibWluZGlfdjFcIjtcbmltcG9ydCB7IENvbnRhaW5lckFzeW5jIH0gZnJvbSBcImNvbnRhaW5lcmJyaWRnZV92MVwiXG5cbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJCYWNrZ3JvdW5kVmlkZW9cIik7XG5cbmV4cG9ydCBjbGFzcyBCYWNrZ3JvdW5kVmlkZW8ge1xuXG4gICAgY29uc3RydWN0b3IodmlkZW9TcmMpe1xuXG4gICAgICAgIC8qKiBAdHlwZSB7SW5saW5lQ29tcG9uZW50RmFjdG9yeX0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoSW5saW5lQ29tcG9uZW50RmFjdG9yeSk7XG5cblx0XHQvKiogQHR5cGUge0NvbXBvbmVudH0gKi9cblx0XHR0aGlzLmNvbXBvbmVudCA9IG51bGw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtTdHJpbmd9ICovXG4gICAgICAgIHRoaXMudmlkZW9TcmMgPSB2aWRlb1NyYztcblx0fVxuXG5cdC8qKlxuXHQgKiBcbiAgICAgKiBAcGFyYW0ge1N0eWxlc2hlZXRCdWlsZGVyfSBzdHlsZXNoZWV0QnVpbGRlclxuXHQgKiBAcmV0dXJucyB7U3R5bGVzaGVldH1cblx0ICovXG5cdHN0YXRpYyBidWlsZFN0eWxlc2hlZXQoc3R5bGVzaGVldEJ1aWxkZXIpIHtcblx0XHRyZXR1cm4gc3R5bGVzaGVldEJ1aWxkZXJcblx0XHRcdC5zZWxlY3RvcihcIi5iYWNrZ3JvdW5kLXZpZGVvXCIpXG5cdFx0XHQub3BlbigpXG5cdFx0XHRcdC5zdHlsZShcIndpZHRoXCIsIFwiYXV0b1wiKVxuXHRcdFx0XHQuc3R5bGUoXCJoZWlnaHRcIiwgXCJhdXRvXCIpXG5cdFx0XHQuY2xvc2UoKVxuXG5cdFx0XHQuc2VsZWN0b3IoXCIuYmFja2dyb3VuZC12aWRlby1wbGF5ZXJcIilcblx0XHRcdC5vcGVuKClcblx0XHRcdFx0LnN0eWxlKFwicG9zaXRpb25cIiwgXCJmaXhlZFwiKVxuXHRcdFx0XHQuc3R5bGUoXCJ0b3BcIiwgXCI1MCVcIilcblx0XHRcdFx0LnN0eWxlKFwibGVmdFwiLCBcIjUwJVwiKVxuXHRcdFx0XHQuc3R5bGUoXCJtaW4td2lkdGhcIiwgXCIxMDAlXCIpXG5cdFx0XHRcdC5zdHlsZShcIm1pbi1oZWlnaHRcIiwgXCIxMDAlXCIpXG5cdFx0XHRcdC5zdHlsZShcIndpZHRoXCIsIFwiYXV0b1wiKVxuXHRcdFx0XHQuc3R5bGUoXCJoZWlnaHRcIiwgXCJhdXRvXCIpXG5cdFx0XHRcdC5zdHlsZShcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZVgoLTUwJSkgdHJhbnNsYXRlWSgtNTAlKVwiKVxuXHRcdFx0XHQuc3R5bGUoXCJ6LWluZGV4XCIsIFwiMFwiKVxuXHRcdFx0LmNsb3NlKClcblxuXHRcdFx0LnNlbGVjdG9yKFwiLmJhY2tncm91bmQtdmlkZW8tb3ZlcmxheVwiKVxuXHRcdFx0Lm9wZW4oKVxuXHRcdFx0XHQuc3R5bGUoXCJwb3NpdGlvblwiLCBcImFic29sdXRlXCIpXG5cdFx0XHRcdC5zdHlsZShcIm1pbi13aWR0aFwiLCBcIjEwMCVcIilcblx0XHRcdFx0LnN0eWxlKFwibWluLWhlaWdodFwiLCBcIjEwMCVcIilcblx0XHRcdFx0LnN0eWxlKFwid2lkdGhcIiwgXCJhdXRvXCIpXG5cdFx0XHRcdC5zdHlsZShcImhlaWdodFwiLCBcImF1dG9cIilcblx0XHRcdFx0LnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiMxMTQ0YWFcIilcblx0XHRcdFx0LnN0eWxlKFwib3BhY2l0eVwiLCBcIjAuM1wiKVxuXHRcdFx0XHQuc3R5bGUoXCJ6LWluZGV4XCIsIFwiMVwiKVxuXHRcdFx0LmNsb3NlKClcblx0XHRcdFx0XG5cdFx0XHQuYnVpbGQoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBcblx0ICogQHBhcmFtIHtDb21wb25lbnRCdWlsZGVyfSBjb21wb25lbnRCdWlsZGVyXG5cdCAqIEByZXR1cm5zIHtDb21wb25lbnR9XG5cdCAqL1xuXHRzdGF0aWMgYnVpbGRDb21wb25lbnQoY29tcG9uZW50QnVpbGRlcikge1xuXHRcdHJldHVybiBjb21wb25lbnRCdWlsZGVyXG5cdFx0XHQucm9vdChcImRpdlwiLCBcImlkPWJhY2tncm91bmRWaWRlb1wiLCBcImNsYXNzPWJhY2tncm91bmQtdmlkZW9cIilcblx0XHRcdC5vcGVuKClcblx0XHRcdFx0Lm5vZGUoXCJkaXZcIiwgXCJjbGFzcz1iYWNrZ3JvdW5kLXZpZGVvLW92ZXJsYXlcIilcblx0XHRcdFx0Lm5vZGUoXCJ2aWRlb1wiLCBcImlkPXZpZGVvXCIsIFwiY2xhc3M9YmFja2dyb3VuZC12aWRlby1wbGF5ZXJcIixcblx0XHRcdFx0ICAgICAgICBcInBsYXlzaW5saW5lPXBsYXlzaW5saW5lXCIsXG5cdFx0XHRcdFx0XHRcImF1dG9wbGF5PXRydWVcIixcblx0XHRcdFx0ICAgICAgICBcIm11dGVkPXRydWVcIiwgXCJsb29wPWxvb3BcIilcblx0XHRcdFx0Lm9wZW4oKVxuXHRcdFx0XHRcdC5ub2RlKFwic291cmNlXCIsIFwiaWQ9c291cmNlXCIsIFwic3JjPVwiLCBcInR5cGU9dmlkZW8vbXA0XCIpXG5cdFx0XHRcdC5jbG9zZSgpXG5cdFx0XHQuY2xvc2UoKVxuXHRcdFx0LmJ1aWxkKCk7XG5cdH1cblxuXHRzZXQoa2V5LHZhbCkge1xuXHRcdHRoaXMuY29tcG9uZW50LnNldChrZXksdmFsKTtcblx0fVxuXG5cdHBvc3RDb25maWcoKSB7XG5cdFx0dGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKEJhY2tncm91bmRWaWRlbyk7XG5cdFx0Q2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKEJhY2tncm91bmRWaWRlby5uYW1lKTtcblxuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJzb3VyY2VcIikuc2V0QXR0cmlidXRlVmFsdWUoXCJzcmNcIiwgdGhpcy52aWRlb1NyYyk7XG5cdH1cblxuXHRhc3luYyBwbGF5TXV0ZWQoKSB7XG5cdFx0YXdhaXQgQ29udGFpbmVyQXN5bmMucGF1c2UoMTAwKTtcblx0XHQvKiogQHR5cGUge1ZpZGVvRWxlbWVudH0gKi9cblx0XHRjb25zdCB2aWRlbyA9IHRoaXMuY29tcG9uZW50LmdldChcInZpZGVvXCIpO1xuXHRcdHZpZGVvLnBsYXlNdXRlZCgpO1xuXHR9XG5cbn1cblxuVHlwZUNvbmZpZ1BhY2suaW5zdGFuY2UoKS5hZGRUeXBlQ29uZmlnKFwibnV0dGluMmMtdWlcIiwgUHJvdG90eXBlQ29uZmlnLnVubmFtZWQoQmFja2dyb3VuZFZpZGVvKSk7IiwiaW1wb3J0IHtcbiAgICBDYW52YXNTdHlsZXMsXG4gICAgQ29tcG9uZW50LFxuICAgIFN0eWxlc2hlZXRCdWlsZGVyLFxuICAgIENvbXBvbmVudEJ1aWxkZXIsXG4gICAgSW5saW5lQ29tcG9uZW50RmFjdG9yeSxcbiAgICBTdHlsZXNoZWV0LFxuICAgIENzczNTdHlsZXNoZWV0QnVpbGRlcixcbiAgICBIVE1MLFxuICAgIFNpbXBsZUVsZW1lbnRcbn0gZnJvbSBcIm51dHRpbjJjLWNvcmVfdjFcIjtcbmltcG9ydCB7IEluamVjdGlvblBvaW50LCBQcm90b3R5cGVDb25maWcsIFR5cGVDb25maWdQYWNrIH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcblxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIkJ1YmJsZU1lc3NhZ2VcIik7XG5cbmV4cG9ydCBjbGFzcyBCdWJibGVNZXNzYWdlIHtcblxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2UgXG4gICAgICogQHBhcmFtIHtTdHJpbmdbXX0gbGlzdEl0ZW1zXG4gICAgICovXG4gICAgY29uc3RydWN0b3IobWVzc2FnZSwgbGlzdEl0ZW1zID0gW10pIHtcblxuICAgICAgICAvKiogQHR5cGUge0lubGluZUNvbXBvbmVudEZhY3Rvcnl9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKElubGluZUNvbXBvbmVudEZhY3RvcnkpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7U3RyaW5nfSAqL1xuICAgICAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7U3RyaW5nW119ICovXG4gICAgICAgIHRoaXMubGlzdEl0ZW1zID0gbGlzdEl0ZW1zO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IG51bGw7XG5cbiAgICB9XG5cbiAgICBwb3N0Q29uZmlnKCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoQnViYmxlTWVzc2FnZSk7XG4gICAgICAgIENhbnZhc1N0eWxlcy5lbmFibGVTdHlsZShCdWJibGVNZXNzYWdlLm5hbWUpO1xuXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJ1YmJsZU1lc3NhZ2VcIikuYWRkQ2hpbGQodGhpcy5tZXNzYWdlKTtcblxuICAgICAgICBpZiAodGhpcy5saXN0SXRlbXMubGVuZ3RoID4gMCkge1xuXG4gICAgICAgICAgICAvKiogQHR5cGUge1NpbXBsZUVsZW1lbnR9ICovXG4gICAgICAgICAgICBjb25zdCBsaXN0ID0gSFRNTC5jdXN0b20oXCJ1bFwiKTtcbiAgICAgICAgICAgIGxpc3Quc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLCBcImJ1YmJsZS1tZXNzYWdlLWlucHV0LXZhbHVlLWNyaWVyaWEtbGlzdFwiKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZm9yIChjb25zdCBsaXN0SXRlbSBvZiB0aGlzLmxpc3RJdGVtcykge1xuICAgICAgICAgICAgICAgIC8qKiBAdHlwZSB7U2ltcGxlRWxlbWVudH0gKi9cbiAgICAgICAgICAgICAgICBjb25zdCBsaXN0RW50cnkgPSBIVE1MLmN1c3RvbShcImxpXCIpO1xuICAgICAgICAgICAgICAgIGxpc3RFbnRyeS5hZGRDaGlsZChsaXN0SXRlbSk7XG4gICAgICAgICAgICAgICAgbGlzdC5hZGRDaGlsZChsaXN0RW50cnkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYnViYmxlTWVzc2FnZVwiKS5hZGRDaGlsZChsaXN0KTtcblxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgaSA9IEhUTUwuY3VzdG9tKFwiaVwiKTtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYnViYmxlTWVzc2FnZVwiKS5hZGRDaGlsZChpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge1N0eWxlc2hlZXRCdWlsZGVyfSBzdHlsZXNoZWV0QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyB7U3R5bGVzaGVldH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRTdHlsZXNoZWV0KHN0eWxlc2hlZXRCdWlsZGVyKSB7XG4gICAgICAgIENzczNTdHlsZXNoZWV0QnVpbGRlci5jcmVhdGUoc3R5bGVzaGVldEJ1aWxkZXIpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5idWJibGUtbWVzc2FnZVwiKVxuICAgICAgICAgICAgICAgIC53aWR0aChcImZpdC1jb250ZW50XCIpXG4gICAgICAgICAgICAgICAgLmNvbG9yKFwiIzMzMzMzM1wiKVxuICAgICAgICAgICAgICAgIC50cmFuc2Zvcm0oXCJ0cmFuc2xhdGUoKzVweCwtNXB4KVwiKVxuICAgICAgICAgICAgICAgIC5iYWNrZ3JvdW5kQ29sb3IoXCIjRkZGRkUwXCIpXG4gICAgICAgICAgICAgICAgLmZvbnRXZWlnaHQoXCJub3JtYWxcIilcbiAgICAgICAgICAgICAgICAuZm9udFNpemUoXCIxNHB4XCIpXG4gICAgICAgICAgICAgICAgLmJvcmRlclJhZGl1cyhcIjhweFwiKVxuICAgICAgICAgICAgICAgIC5wb3NpdGlvbihcInJlbGF0aXZlXCIpXG4gICAgICAgICAgICAgICAgLnpJbmRleChcIjk5OTk5OTk4XCIpXG4gICAgICAgICAgICAgICAgLmJveFNpemluZyhcImJvcmRlci1ib3hcIilcbiAgICAgICAgICAgICAgICAuYm94U2hhZG93KFwiMFwiLCBcIjFweFwiLCBcIjhweFwiLCBudWxsLCBcInJnYmEoMCwwLDAsMC41KVwiKVxuICAgICAgICAgICAgICAgIC5jdXJzb3IoXCJwb2ludGVyXCIpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5idWJibGUtbWVzc2FnZS1oaWRkZW5cIilcbiAgICAgICAgICAgICAgICAudHJhbnNpdGlvbihbXCJtYXgtaGVpZ2h0XCIsIFwiLjNzXCIsIFwiLjJzXCJdLCBbXCJwYWRkaW5nXCIsIFwiLjNzXCIsIFwiLjJzXCJdLCBbXCJvcGFjaXR5XCIsIFwiLjJzXCIsIFwiMHNcIl0sIFtcInZpc2liaWxpdHlcIiwgXCIwc1wiLCBcIi4yc1wiXSlcbiAgICAgICAgICAgICAgICAub3BhY2l0eShcIjBcIilcbiAgICAgICAgICAgICAgICAucGFkZGluZyhcIjBweFwiLFwiMHB4XCIsIG51bGwsIG51bGwpXG4gICAgICAgICAgICAgICAgLm1heEhlaWdodChcIjBweFwiKVxuICAgICAgICAgICAgICAgIC5kaXNwbGF5KFwiYmxvY2tcIilcbiAgICAgICAgICAgICAgICAudmlzaWJpbGl0eShcImhpZGRlblwiKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYnViYmxlLW1lc3NhZ2UtdmlzaWJsZVwiKVxuICAgICAgICAgICAgICAgIC50cmFuc2l0aW9uKFtcIm1heC1oZWlnaHRcIiwgXCIuM3NcIiwgXCIwc1wiXSwgW1wicGFkZGluZ1wiLCBcIi4yc1wiLCBcIjBzXCJdLCBbXCJvcGFjaXR5XCIsIFwiLjJzXCIsIFwiLjJzXCJdKVxuICAgICAgICAgICAgICAgIC5vcGFjaXR5KFwiMVwiKVxuICAgICAgICAgICAgICAgIC5wYWRkaW5nKFwiMTBweFwiLCBcIjIwcHhcIiwgXCIxMHB4XCIsIFwiMjBweFwiKVxuICAgICAgICAgICAgICAgIC5kaXNwbGF5KFwiYmxvY2tcIilcbiAgICAgICAgICAgICAgICAudmlzaWJpbGl0eShcInZpc2libGVcIilcbiAgICAgICAgICAgICAgICAubWFyZ2luKFwiMTBweFwiLCBudWxsLCBudWxsLCBudWxsKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYnViYmxlLW1lc3NhZ2UgaVwiKVxuICAgICAgICAgICAgICAgIC5wb3NpdGlvbihcImFic29sdXRlXCIpXG4gICAgICAgICAgICAgICAgLnRvcChcIjEwMCVcIilcbiAgICAgICAgICAgICAgICAubGVmdChcIjMwJVwiKVxuICAgICAgICAgICAgICAgIC5tYXJnaW4obnVsbCwgbnVsbCwgbnVsbCwgXCItMTVweFwiKVxuICAgICAgICAgICAgICAgIC53aWR0aChcIjMwcHhcIilcbiAgICAgICAgICAgICAgICAuaGVpZ2h0KFwiMTVweFwiKVxuICAgICAgICAgICAgICAgIC5vdmVyZmxvdyhcImhpZGRlblwiKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYnViYmxlLW1lc3NhZ2UgaTo6YWZ0ZXJcIilcbiAgICAgICAgICAgICAgICAuY29udGVudChcIicnXCIpXG4gICAgICAgICAgICAgICAgLnBvc2l0aW9uKFwiYWJzb2x1dGVcIilcbiAgICAgICAgICAgICAgICAud2lkdGgoXCIxNXB4XCIpXG4gICAgICAgICAgICAgICAgLmhlaWdodChcIjE1cHhcIilcbiAgICAgICAgICAgICAgICAubGVmdChcIjUwJVwiKVxuICAgICAgICAgICAgICAgIC50cmFuc2Zvcm0oXCJ0cmFuc2xhdGUoLTUwJSwtNTAlKSByb3RhdGUoNDVkZWcpXCIpXG4gICAgICAgICAgICAgICAgLmJhY2tncm91bmRDb2xvcihcIiNGRkZGRTBcIilcbiAgICAgICAgICAgICAgICAuYm94U2hhZG93KFwiMFwiLCBcIjFweFwiLCBcIjhweFwiLCBudWxsLCBcInJnYmEoMCwwLDAsMC41KVwiKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYnViYmxlLW1lc3NhZ2UtaW5wdXQtdmFsdWUtY3JpZXJpYS1saXN0XCIpXG4gICAgICAgICAgICAgICAgLm1hcmdpbihcIjBcIiwgbnVsbCwgXCIwXCIsIG51bGwpO1xuXG4gICAgICAgIHJldHVybiBzdHlsZXNoZWV0QnVpbGRlci5idWlsZCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Q29tcG9uZW50QnVpbGRlcn0gY29tcG9uZW50QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyB7Q29tcG9uZW50fVxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZENvbXBvbmVudChjb21wb25lbnRCdWlsZGVyKSB7XG4gICAgICAgIGNvbXBvbmVudEJ1aWxkZXJcbiAgICAgICAgICAgIC5yb290KFwiZGl2XCIsIFwiaWQ9YnViYmxlTWVzc2FnZVwiLCBcImNsYXNzPWJ1YmJsZS1tZXNzYWdlIGJ1YmJsZS1tZXNzYWdlLWhpZGRlblwiKTtcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudEJ1aWxkZXIuYnVpbGQoKTtcbiAgICB9XG5cbiAgICBzaG93KCkgeyB0aGlzLmNvbXBvbmVudC5nZXQoXCJidWJibGVNZXNzYWdlXCIpLnNldEF0dHJpYnV0ZVZhbHVlKFwiY2xhc3NcIiwgXCJidWJibGUtbWVzc2FnZSBidWJibGUtbWVzc2FnZS12aXNpYmxlXCIpOyB9XG4gICAgaGlkZSgpIHsgdGhpcy5jb21wb25lbnQuZ2V0KFwiYnViYmxlTWVzc2FnZVwiKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImNsYXNzXCIsIFwiYnViYmxlLW1lc3NhZ2UgYnViYmxlLW1lc3NhZ2UtaGlkZGVuXCIpOyB9XG59XG5cblR5cGVDb25maWdQYWNrLmluc3RhbmNlKCkuYWRkVHlwZUNvbmZpZyhcIm51dHRpbjJjLXVpXCIsIFByb3RvdHlwZUNvbmZpZy51bm5hbWVkKEJ1YmJsZU1lc3NhZ2UpKTsiLCJpbXBvcnQgeyBUaW1lUHJvbWlzZSB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuaW1wb3J0IHtcbiAgICBDYW52YXNTdHlsZXMsXG4gICAgU3R5bGVTZWxlY3RvckFjY2Vzc29yLFxuICAgIEV2ZW50TWFuYWdlcixcbiAgICBTdHlsZUFjY2Vzc29yLFxuICAgIENvbXBvbmVudCxcbiAgICBJbmxpbmVDb21wb25lbnRGYWN0b3J5LFxuICAgIENvbXBvbmVudEJ1aWxkZXIsXG4gICAgU3R5bGVzaGVldEJ1aWxkZXJcbn0gZnJvbSBcIm51dHRpbjJjLWNvcmVfdjFcIjtcbmltcG9ydCB7IEluamVjdGlvblBvaW50LCBQcm90b3R5cGVDb25maWcsIFR5cGVDb25maWdQYWNrIH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5pbXBvcnQgeyBDdXN0b21BcHBlYXJhbmNlIH0gZnJvbSBcIi4uLy4uL2N1c3RvbUFwcGVhcmFuY2UuanNcIjtcblxuZXhwb3J0IGNsYXNzIEJhbm5lckxhYmVsTWVzc2FnZSB7XG5cbiAgICBzdGF0aWMgZ2V0IEVWRU5UX0NMT1NFX0NMSUNLRUQoKSB7IHJldHVybiBcImNsb3NlQ2xpY2tlZFwiOyB9XG5cbiAgICBzdGF0aWMgZ2V0IFRZUEVfQUxFUlQoKSB7IHJldHVybiBcInR5cGUtYWxlcnRcIjsgfVxuICAgIHN0YXRpYyBnZXQgVFlQRV9JTkZPKCkgeyByZXR1cm4gXCJ0eXBlLWluZm9cIjsgfVxuICAgIHN0YXRpYyBnZXQgVFlQRV9TVUNDRVNTKCkgeyByZXR1cm4gXCJ0eXBlLXN1Y2Nlc3NcIjsgfVxuICAgIHN0YXRpYyBnZXQgVFlQRV9XQVJOSU5HKCkgeyByZXR1cm4gXCJ0eXBlLXdhcm5pbmdcIjsgfVxuXG4gICAgY29uc3RydWN0b3IobWVzc2FnZSwgYmFubmVyVHlwZSA9IEJhbm5lckxhYmVsTWVzc2FnZS5UWVBFX0lORk8sIGN1c3RvbUFwcGVhcmFuY2UgPSBudWxsKSB7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtJbmxpbmVDb21wb25lbnRGYWN0b3J5fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShJbmxpbmVDb21wb25lbnRGYWN0b3J5KTtcblxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudH0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSBudWxsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7U3RyaW5nfSAqL1xuICAgICAgICB0aGlzLmhlYWRlciA9IG51bGw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtTdHJpbmd9ICovXG4gICAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMuYmFubmVyVHlwZSA9IGJhbm5lclR5cGU7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtDdXN0b21BcHBlYXJhbmNlfSAqL1xuICAgICAgICB0aGlzLmN1c3RvbUFwcGVhcmFuY2UgPSBjdXN0b21BcHBlYXJhbmNlO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7RXZlbnRNYW5hZ2VyfSAqL1xuICAgICAgICB0aGlzLmV2ZW50cyA9IG5ldyBFdmVudE1hbmFnZXIoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0eWxlc2hlZXRCdWlsZGVyfSBzdHlsZXNoZWV0QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyBcbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRTdHlsZXNoZWV0KHN0eWxlc2hlZXRCdWlsZGVyKSB7XG4gICAgICAgIHJldHVybiBzdHlsZXNoZWV0QnVpbGRlclxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmJhbm5lci1sYWJlbC1tZXNzYWdlXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCJ3aGl0ZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIndpZHRoXCIsIFwiMTAwJVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmJhbm5lci1sYWJlbC1tZXNzYWdlLXZpc2libGVcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMC44XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNpdGlvblwiLCBcIm9wYWNpdHkgLjVzIC4xc1wiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmJhbm5lci1sYWJlbC1tZXNzYWdlLWhpZGRlblwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNpdGlvblwiLCBcIm9wYWNpdHkgLjVzIDBzXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYmFubmVyLWxhYmVsLW1lc3NhZ2UtY2xvc2UtYnV0dG9uXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luLWxlZnRcIiwgXCIxNXB0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCJ3aGl0ZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtd2VpZ2h0XCIsIFwiYm9sZFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZsb2F0XCIsIFwicmlnaHRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmb250LXNpemVcIiwgXCIyMnB0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibGluZS1oZWlnaHRcIiwgXCIxNHB0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY3Vyc29yXCIsIFwicG9pbnRlclwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zaXRpb25cIiwgXCIwLjNzXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYmFubmVyLWxhYmVsLW1lc3NhZ2UtaGVhZGVyXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCJ3aGl0ZVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmJhbm5lci1sYWJlbC1tZXNzYWdlLXRleHRcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tbGVmdFwiLCBcIjE1cHhcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5iYW5uZXItbGFiZWwtbWVzc2FnZS10eXBlLWFsZXJ0XCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiNmNDQzMzZcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5iYW5uZXItbGFiZWwtbWVzc2FnZS10eXBlLXN1Y2Nlc3NcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiIzRDQUY1MFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmJhbm5lci1sYWJlbC1tZXNzYWdlLXR5cGUtaW5mb1wiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIiwgXCIjMjE5NkYzXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYmFubmVyLWxhYmVsLW1lc3NhZ2UtdHlwZS13YXJuaW5nXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiNmZjk4MDBcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5iYW5uZXItbGFiZWwtbWVzc2FnZS1zaXplLWxhcmdlXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZ1wiLCBcIjE4cHRcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5iYW5uZXItbGFiZWwtbWVzc2FnZS1zaXplLWRlZmF1bHRcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwYWRkaW5nXCIsIFwiMTJwdFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmJhbm5lci1sYWJlbC1tZXNzYWdlLXNpemUtc21hbGxcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwYWRkaW5nLWxlZnRcIiwgXCIxMHB0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZy1yaWdodFwiLCBcIjEwcHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwYWRkaW5nLWJvdHRvbVwiLCBcIjhweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmctdG9wXCIsIFwiOHB4XCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYmFubmVyLWxhYmVsLW1lc3NhZ2Utc2hhcGUtc3F1YXJlXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyLXJhZGl1c1wiLCBcIjBweFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmJhbm5lci1sYWJlbC1tZXNzYWdlLXNoYXBlLXJvdW5kXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyLXJhZGl1c1wiLCBcIjNweFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmJhbm5lci1sYWJlbC1tZXNzYWdlLXNwYWNpbmctbm9uZVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpblwiLCBcIjBwdFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmJhbm5lci1sYWJlbC1tZXNzYWdlLXNwYWNpbmctYWJvdmVcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tdG9wXCIsIFwiMXJlbVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmJhbm5lci1sYWJlbC1tZXNzYWdlLXNwYWNpbmctYmVsb3dcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tYm90dG9tXCIsIFwiMXJlbVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmJhbm5lci1sYWJlbC1tZXNzYWdlLXNwYWNpbmctYWJvdmUtYmVsb3dcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tdG9wXCIsIFwiMXJlbVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpbi1ib3R0b21cIiwgXCIxcmVtXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuYnVpbGQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudEJ1aWxkZXJ9IGNvbXBvbmVudEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMgXG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkQ29tcG9uZW50KGNvbXBvbmVudEJ1aWxkZXIpIHtcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudEJ1aWxkZXJcbiAgICAgICAgICAgIC5yb290KFwiZGl2XCIsIFwiaWQ9YmFubmVyTGFiZWxNZXNzYWdlXCIsIFwic3R5bGU9ZGlzcGxheTpub25lO1wiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwiZGl2XCIsIFwiaWQ9YmFubmVyTGFiZWxNZXNzYWdlQ29udGVudFwiLCBcImNsYXNzPWJhbm5lci1sYWJlbC1tZXNzYWdlIGJhbm5lci1sYWJlbC1tZXNzYWdlLWhpZGRlblwiKVxuICAgICAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAgICAgLm5vZGUoXCJzcGFuXCIsIFwiaWQ9YmFubmVyTGFiZWxNZXNzYWdlQ2xvc2VCdXR0b25cIiwgXCJjbGFzcz1iYW5uZXItbGFiZWwtbWVzc2FnZS1jbG9zZS1idXR0b25cIilcbiAgICAgICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRleHQoXCLDl1wiKVxuICAgICAgICAgICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgICAgICAgICAubm9kZShcInNwYW5cIiwgXCJpZD1iYW5uZXJMYWJlbE1lc3NhZ2VIZWFkZXJcIiwgXCJjbGFzcz1iYW5uZXItbGFiZWwtbWVzc2FnZS1oZWFkZXJcIilcbiAgICAgICAgICAgICAgICAgICAgLm5vZGUoXCJzcGFuXCIsIFwiaWQ9YmFubmVyTGFiZWxNZXNzYWdlVGV4dFwiLCBcImNsYXNzPWJhbm5lci1sYWJlbC1tZXNzYWdlLXRleHRcIilcbiAgICAgICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgIC5idWlsZCgpO1xuICAgIH1cblxuICAgIGFzeW5jIHBvc3RDb25maWcoKSB7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnR9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZShCYW5uZXJMYWJlbE1lc3NhZ2UpO1xuICAgICAgICBDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUoQmFubmVyTGFiZWxNZXNzYWdlLm5hbWUpO1xuICAgICAgICBTdHlsZVNlbGVjdG9yQWNjZXNzb3IuZnJvbSh0aGlzLm1lc3NhZ2VDb250ZW50RWxlbWVudClcbiAgICAgICAgICAgIC5lbmFibGUoXCJiYW5uZXItbGFiZWwtbWVzc2FnZVwiKVxuICAgICAgICAgICAgLmVuYWJsZShcImJhbm5lci1sYWJlbC1tZXNzYWdlLVwiICsgdGhpcy5iYW5uZXJUeXBlKTtcblxuICAgICAgICBpZiAodGhpcy5jdXN0b21BcHBlYXJhbmNlICYmIHRoaXMuY3VzdG9tQXBwZWFyYW5jZS5zaGFwZSkge1xuICAgICAgICAgICAgU3R5bGVTZWxlY3RvckFjY2Vzc29yLmZyb20odGhpcy5tZXNzYWdlQ29udGVudEVsZW1lbnQpXG4gICAgICAgICAgICAgICAgLmVuYWJsZShcImJhbm5lci1sYWJlbC1tZXNzYWdlLVwiICsgdGhpcy5jdXN0b21BcHBlYXJhbmNlLnNoYXBlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5jdXN0b21BcHBlYXJhbmNlICYmIHRoaXMuY3VzdG9tQXBwZWFyYW5jZS5zaXplKSB7XG4gICAgICAgICAgICBTdHlsZVNlbGVjdG9yQWNjZXNzb3IuZnJvbSh0aGlzLm1lc3NhZ2VDb250ZW50RWxlbWVudClcbiAgICAgICAgICAgICAgICAuZW5hYmxlKFwiYmFubmVyLWxhYmVsLW1lc3NhZ2UtXCIgKyB0aGlzLmN1c3RvbUFwcGVhcmFuY2Uuc2l6ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuY3VzdG9tQXBwZWFyYW5jZSAmJiB0aGlzLmN1c3RvbUFwcGVhcmFuY2Uuc3BhY2luZykge1xuICAgICAgICAgICAgU3R5bGVTZWxlY3RvckFjY2Vzc29yLmZyb20odGhpcy5tZXNzYWdlQ29udGVudEVsZW1lbnQpXG4gICAgICAgICAgICAgICAgLmVuYWJsZShcImJhbm5lci1sYWJlbC1tZXNzYWdlLVwiICsgdGhpcy5jdXN0b21BcHBlYXJhbmNlLnNwYWNpbmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYmFubmVyTGFiZWxNZXNzYWdlQ2xvc2VCdXR0b25cIikubGlzdGVuVG8oXCJjbGlja1wiLCB0aGlzLmNsb3NlQ2xpY2tlZCwgdGhpcyk7XG4gICAgfVxuXG4gICAgY2xvc2VDbGlja2VkKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuZXZlbnRzLnRyaWdnZXIoQmFubmVyTGFiZWxNZXNzYWdlLkVWRU5UX0NMT1NFX0NMSUNLRUQpO1xuICAgIH1cblxuICAgIGhpZGUoKSB7XG4gICAgICAgIFN0eWxlU2VsZWN0b3JBY2Nlc3Nvci5mcm9tKHRoaXMubWVzc2FnZUNvbnRlbnRFbGVtZW50KVxuICAgICAgICAgICAgLmRpc2FibGUoXCJiYW5uZXItbGFiZWwtbWVzc2FnZS12aXNpYmxlXCIpXG4gICAgICAgICAgICAuZW5hYmxlKFwiYmFubmVyLWxhYmVsLW1lc3NhZ2UtaGlkZGVuXCIpO1xuXG4gICAgICAgIHRoaXMuaXNWaXNpYmxlID0gZmFsc2U7XG4gICAgICAgIFxuICAgICAgICBUaW1lUHJvbWlzZS5hc1Byb21pc2UoNTAwLCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNWaXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgU3R5bGVBY2Nlc3Nvci5mcm9tKHRoaXMuY29tcG9uZW50LmdldChcImJhbm5lckxhYmVsTWVzc2FnZVwiKSlcbiAgICAgICAgICAgICAgICAgICAgLnNldChcImRpc3BsYXlcIiwgXCJub25lXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzaG93KCkge1xuICAgICAgICBTdHlsZUFjY2Vzc29yLmZyb20odGhpcy5jb21wb25lbnQuZ2V0KFwiYmFubmVyTGFiZWxNZXNzYWdlXCIpKVxuICAgICAgICAgICAgLnNldChcImRpc3BsYXlcIiwgXCJibG9ja1wiKTtcblxuICAgICAgICBUaW1lUHJvbWlzZS5hc1Byb21pc2UoNTAsICgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzVmlzaWJsZSkge1xuICAgICAgICAgICAgICAgIFN0eWxlU2VsZWN0b3JBY2Nlc3Nvci5mcm9tKHRoaXMubWVzc2FnZUNvbnRlbnRFbGVtZW50KVxuICAgICAgICAgICAgICAgICAgICAuZGlzYWJsZShcImJhbm5lci1sYWJlbC1tZXNzYWdlLWhpZGRlblwiKVxuICAgICAgICAgICAgICAgICAgICAuZW5hYmxlKFwiYmFubmVyLWxhYmVsLW1lc3NhZ2UtdmlzaWJsZVwiKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuaXNWaXNpYmxlID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBnZXQgbWVzc2FnZUNvbnRlbnRFbGVtZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb21wb25lbnQuZ2V0KFwiYmFubmVyTGFiZWxNZXNzYWdlQ29udGVudFwiKTtcbiAgICB9XG5cbiAgICBzZXRNZXNzYWdlKGhlYWRlciwgbWVzc2FnZSkge1xuICAgICAgICBpZiAoaGVhZGVyKSB7XG4gICAgICAgICAgICB0aGlzLmFwcGx5SGVhZGVyKGhlYWRlcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1lc3NhZ2UpIHtcbiAgICAgICAgICAgIHRoaXMuYXBwbHlNZXNzYWdlKG1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXBwbHlIZWFkZXIoaGVhZGVyKSB7XG4gICAgICAgIHRoaXMuaGVhZGVyID0gaGVhZGVyO1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJiYW5uZXJMYWJlbE1lc3NhZ2VIZWFkZXJcIikuc2V0Q2hpbGQodGhpcy5oZWFkZXIpO1xuICAgIH1cblxuICAgIGFwcGx5TWVzc2FnZShtZXNzYWdlKSB7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJhbm5lckxhYmVsTWVzc2FnZVRleHRcIikuc2V0Q2hpbGQodGhpcy5tZXNzYWdlKTtcbiAgICB9XG5cbn1cblxuVHlwZUNvbmZpZ1BhY2suaW5zdGFuY2UoKS5hZGRUeXBlQ29uZmlnKFwibnV0dGluMmMtdWlcIiwgUHJvdG90eXBlQ29uZmlnLnVubmFtZWQoQmFubmVyTGFiZWxNZXNzYWdlKSk7IiwiaW1wb3J0IHsgQ2FudmFzU3R5bGVzLCBDb21wb25lbnRCdWlsZGVyLCBFdmVudE1hbmFnZXIsIElubGluZUNvbXBvbmVudEZhY3RvcnksIFN0eWxlc2hlZXQsIFN0eWxlc2hlZXRCdWlsZGVyIH0gZnJvbSBcIm51dHRpbjJjLWNvcmVfdjFcIjtcbmltcG9ydCB7IEluamVjdGlvblBvaW50LCBQcm90b3R5cGVDb25maWcsIFR5cGVDb25maWdQYWNrIH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5pbXBvcnQgeyBDdXN0b21BcHBlYXJhbmNlIH0gZnJvbSBcIi4uL2N1c3RvbUFwcGVhcmFuY2UuanNcIjtcbmltcG9ydCB7IEJhbm5lckxhYmVsTWVzc2FnZSB9IGZyb20gXCIuL2Jhbm5lckxhYmVsTWVzc2FnZS9iYW5uZXJMYWJlbE1lc3NhZ2UuanNcIjtcbmltcG9ydCB7IENvbnRhaW5lckFzeW5jIH0gZnJvbSBcImNvbnRhaW5lcmJyaWRnZV92MVwiO1xuXG5leHBvcnQgY2xhc3MgQmFubmVyTGFiZWwge1xuXG4gICAgc3RhdGljIEVWRU5UX0hJRERFTiA9IFwiYmFubmVyTGFiZWxIaWRkZW5cIjtcbiAgICBzdGF0aWMgRVZFTlRfU0hPV04gPSBcImJhbm5lckxhYmVsU2hvd25cIjtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAvKiogQHR5cGUge0lubGluZUNvbXBvbmVudEZhY3Rvcnl9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKElubGluZUNvbXBvbmVudEZhY3RvcnkpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IG51bGw7XG5cblx0XHR0aGlzLmFwcGVhcmFuY2UgPSBuZXcgQ3VzdG9tQXBwZWFyYW5jZSgpXG5cdFx0XHQud2l0aFNpemUoQ3VzdG9tQXBwZWFyYW5jZS5TSVpFX1NNQUxMKVxuXHRcdFx0LndpdGhTaGFwZShDdXN0b21BcHBlYXJhbmNlLlNIQVBFX1JPVU5EKVxuXHRcdFx0LndpdGhTcGFjaW5nKEN1c3RvbUFwcGVhcmFuY2UuU1BBQ0lOR19CRUxPVyk7XG5cblx0XHQvKiogQHR5cGUge0Jhbm5lckxhYmVsTWVzc2FnZX0gKi9cblx0XHR0aGlzLnN1Y2Nlc3MgPSBJbmplY3Rpb25Qb2ludFxuXHRcdFx0Lmluc3RhbmNlKEJhbm5lckxhYmVsTWVzc2FnZSwgW1wiXCIsIEJhbm5lckxhYmVsTWVzc2FnZS5UWVBFX1NVQ0NFU1MsIHRoaXMuYXBwZWFyYW5jZV0pO1xuXG5cdFx0LyoqIEB0eXBlIHtCYW5uZXJMYWJlbE1lc3NhZ2V9ICovXG5cdFx0dGhpcy53YXJuaW5nID0gSW5qZWN0aW9uUG9pbnRcblx0XHRcdC5pbnN0YW5jZShCYW5uZXJMYWJlbE1lc3NhZ2UsIFtcIlwiLCBCYW5uZXJMYWJlbE1lc3NhZ2UuVFlQRV9XQVJOSU5HLCB0aGlzLmFwcGVhcmFuY2VdKTtcblxuXHRcdC8qKiBAdHlwZSB7QmFubmVyTGFiZWxNZXNzYWdlfSAqL1xuXHRcdHRoaXMuZXJyb3IgPSBJbmplY3Rpb25Qb2ludFxuXHRcdFx0Lmluc3RhbmNlKEJhbm5lckxhYmVsTWVzc2FnZSwgW1wiXCIsIEJhbm5lckxhYmVsTWVzc2FnZS5UWVBFX0FMRVJULCB0aGlzLmFwcGVhcmFuY2VdKTtcblxuICAgICAgICB0aGlzLmlzVmlzaWJsZSA9IGZhbHNlO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7RXZlbnRNYW5hZ2VyfSAqL1xuICAgICAgICB0aGlzLmV2ZW50cyA9IG5ldyBFdmVudE1hbmFnZXIoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge1N0eWxlc2hlZXRCdWlsZGVyfSBzdHlsZXNoZWV0QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyB7U3R5bGVzaGVldH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRTdHlsZXNoZWV0KHN0eWxlc2hlZXRCdWlsZGVyKSB7XG4gICAgICAgIHJldHVybiBzdHlsZXNoZWV0QnVpbGRlclxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmJhbm5lci1sYWJlbFwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbG9yXCIsIFwid2hpdGVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLCBcIjEwMCVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJvdmVyZmxvd1wiLCBcImhpZGRlblwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBvc2l0aW9uXCIsIFwicmVsYXRpdmVcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5iYW5uZXItbGFiZWwtdmlzaWJsZVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1heC1oZWlnaHRcIiwgXCI1MHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidmlzaWJpbGl0eVwiLCBcInZpc2libGVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2l0aW9uXCIsIFwibWF4LWhlaWdodCAuM3MsIHZpc2liaWxpdHkgMHNcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5iYW5uZXItbGFiZWwtaGlkZGVuXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWF4LWhlaWdodFwiLCBcIjBweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInZpc2liaWxpdHlcIiwgXCJoaWRkZW5cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2l0aW9uXCIsIFwibWF4LWhlaWdodCAuM3MgLjNzLCB2aXNpYmlsaXR5IDBzIC4zc1wiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDb21wb25lbnRCdWlsZGVyfSBjb21wb25lbnRCdWlsZGVyIFxuICAgICAqIEByZXR1cm5zIFxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZENvbXBvbmVudChjb21wb25lbnRCdWlsZGVyKSB7XG4gICAgICAgIHJldHVybiBjb21wb25lbnRCdWlsZGVyXG4gICAgICAgICAgICAucm9vdChcImRpdlwiLCBcImlkPWJhbm5lckxhYmVsXCIsIFwiY2xhc3M9YmFubmVyLWxhYmVsIGJhbm5lci1sYWJlbC1oaWRkZW5cIilcbiAgICAgICAgICAgIC5idWlsZCgpO1xuICAgIH1cblxuXG4gICAgYXN5bmMgcG9zdENvbmZpZygpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKEJhbm5lckxhYmVsKTtcbiAgICAgICAgQ2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKEJhbm5lckxhYmVsLm5hbWUpO1xuICAgICAgICB0aGlzLnN1Y2Nlc3MuaGlkZSgpO1xuICAgICAgICB0aGlzLndhcm5pbmcuaGlkZSgpO1xuICAgICAgICB0aGlzLmVycm9yLmhpZGUoKTtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYmFubmVyTGFiZWxcIikuYWRkQ2hpbGQodGhpcy5zdWNjZXNzLmNvbXBvbmVudCk7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJhbm5lckxhYmVsXCIpLmFkZENoaWxkKHRoaXMud2FybmluZy5jb21wb25lbnQpO1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJiYW5uZXJMYWJlbFwiKS5hZGRDaGlsZCh0aGlzLmVycm9yLmNvbXBvbmVudCk7XG4gICAgICAgIHRoaXMuc3VjY2Vzcy5ldmVudHMubGlzdGVuVG8oQmFubmVyTGFiZWxNZXNzYWdlLkVWRU5UX0NMT1NFX0NMSUNLRUQsIHRoaXMuaGlkZSwgdGhpcyk7XG4gICAgICAgIHRoaXMud2FybmluZy5ldmVudHMubGlzdGVuVG8oQmFubmVyTGFiZWxNZXNzYWdlLkVWRU5UX0NMT1NFX0NMSUNLRUQsIHRoaXMuaGlkZSwgdGhpcyk7XG4gICAgICAgIHRoaXMuZXJyb3IuZXZlbnRzLmxpc3RlblRvKEJhbm5lckxhYmVsTWVzc2FnZS5FVkVOVF9DTE9TRV9DTElDS0VELCB0aGlzLmhpZGUsIHRoaXMpO1xuICAgICAgICB0aGlzLmFjdGl2ZSA9IHRoaXMuc3VjY2VzcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaGVhZGVyIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlIFxuICAgICAqL1xuICAgIHNob3dTdWNjZXNzKGhlYWRlciwgbWVzc2FnZSkge1xuICAgICAgICB0aGlzLnNob3dCYW5uZXIodGhpcy5zdWNjZXNzLCBoZWFkZXIsIG1lc3NhZ2UpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBoZWFkZXIgXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2UgXG4gICAgICovXG4gICAgc2hvd1dhcm5pbmcoaGVhZGVyLCBtZXNzYWdlKSB7XG4gICAgICAgIHRoaXMuc2hvd0Jhbm5lcih0aGlzLndhcm5pbmcsIGhlYWRlciwgbWVzc2FnZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGhlYWRlciBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZSBcbiAgICAgKi9cbiAgICBzaG93RXJyb3IoaGVhZGVyLCBtZXNzYWdlKSB7XG4gICAgICAgIHRoaXMuc2hvd0Jhbm5lcih0aGlzLmVycm9yLCBoZWFkZXIsIG1lc3NhZ2UpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBoZWFkZXIgXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2UgXG4gICAgICovXG4gICAgaGlkZSgpIHtcbiAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgICBDb250YWluZXJBc3luYy5kZWxheSg2MDAsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzLnRyaWdnZXIoQmFubmVyTGFiZWwuRVZFTlRfSElEREVOKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVzZXQoKSB7XG5cdFx0dGhpcy5jb21wb25lbnQuZ2V0KFwiYmFubmVyTGFiZWxcIikuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLCBcImJhbm5lci1sYWJlbCBiYW5uZXItbGFiZWwtaGlkZGVuXCIpO1xuICAgICAgICB0aGlzLmFjdGl2ZS5oaWRlKCk7XG4gICAgICAgIHRoaXMuaXNWaXNpYmxlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtCYW5uZXJMYWJlbE1lc3NhZ2V9IGJhbm5lclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBoZWFkZXJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgICAqL1xuICAgICBzaG93QmFubmVyKGJhbm5lciwgaGVhZGVyLCBtZXNzYWdlKSB7XG4gICAgICAgIHRoaXMucmVzZXQoKTtcblx0XHRiYW5uZXIuc2V0TWVzc2FnZShoZWFkZXIsIG1lc3NhZ2UpO1xuICAgICAgICBiYW5uZXIuc2hvdygpO1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJiYW5uZXJMYWJlbFwiKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImNsYXNzXCIsIFwiYmFubmVyLWxhYmVsIGJhbm5lci1sYWJlbC12aXNpYmxlXCIpO1xuICAgICAgICB0aGlzLmlzVmlzaWJsZSA9IHRydWU7XG5cdFx0dGhpcy5hY3RpdmUgPSBiYW5uZXI7XG4gICAgICAgIENvbnRhaW5lckFzeW5jLmRlbGF5KDYwMCwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5ldmVudHMudHJpZ2dlcihCYW5uZXJMYWJlbC5FVkVOVF9TSE9XTik7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuVHlwZUNvbmZpZ1BhY2suaW5zdGFuY2UoKS5hZGRUeXBlQ29uZmlnKFwibnV0dGluMmMtdWlcIiwgUHJvdG90eXBlQ29uZmlnLnVubmFtZWQoQmFubmVyTGFiZWwpKTsiLCJleHBvcnQgY2xhc3MgQ29sb3JBcHBsaWNhdG9yIHtcblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3R5bGVzaGVldEJ1aWxkZXJ9IHN0eWxlc2hlZXRCdWlsZGVyIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvciBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZm9udENvbG9yIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBiYWNrZ3JvdW5kQ29sb3IgXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGJvcmRlckNvbG9yIFxuICAgICAqIEByZXR1cm5zIFxuICAgICAqL1xuICAgIHN0YXRpYyBhcHBseShzdHlsZXNoZWV0QnVpbGRlciwgc2VsZWN0b3IsIGZvbnRDb2xvciwgYmFja2dyb3VuZENvbG9yLCBib3JkZXJDb2xvcikge1xuICAgICAgICByZXR1cm4gc3R5bGVzaGVldEJ1aWxkZXIuc2VsZWN0b3Ioc2VsZWN0b3IpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgZm9udENvbG9yKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIiwgYmFja2dyb3VuZENvbG9yKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1jb2xvclwiLCBib3JkZXJDb2xvcilcbiAgICAgICAgICAgIC5jbG9zZSgpO1xuICAgIH1cblxufSIsImV4cG9ydCBjbGFzcyBDb21tb25FdmVudHMge1xuXG4gICAgc3RhdGljIEhPVkVSRUQgPSBcImhvdmVyZWRcIjtcbiAgICBzdGF0aWMgVU5IT1ZFUkVEID0gXCJ1bmhvdmVyZWRcIjtcbiAgICBzdGF0aWMgQ0xJQ0tFRCA9IFwiY2xpY2tlZFwiO1xuICAgIHN0YXRpYyBET1VCTEVfQ0xJQ0tFRCA9IFwiZG91YmxlQ2xpY2tlZFwiO1xuXG4gICAgc3RhdGljIEVOVEVSRUQgPSBcImVudGVyZWRcIjtcbiAgICBzdGF0aWMgS0VZVVBQRUQgPSBcImtleVVwcGVkXCI7XG4gICAgc3RhdGljIEZPQ1VTRUQgPSBcImZvY3VzZWRcIjtcbiAgICBzdGF0aWMgQkxVUlJFRCA9IFwiYmx1cnJlZFwiO1xuXG4gICAgc3RhdGljIENIQU5HRUQgPSBcImNoYW5nZWRcIjtcbiAgICBzdGF0aWMgRU5BQkxFRCA9IFwiZW5hYmxlZFwiO1xuICAgIHN0YXRpYyBESVNBQkxFRCA9IFwiZGlzYWJsZWRcIjtcbiAgICBzdGF0aWMgU0VMRUNURUQgPSBcInNlbGVjdGVkXCI7XG4gICAgc3RhdGljIElOUFVUID0gXCJpbnB1dFwiO1xuICAgIHN0YXRpYyBMT0FERUQgPSBcImxvYWRlZFwiO1xuXG4gICAgc3RhdGljIERSQUdfU1RBUlRFRCA9IFwiZHJhZ1N0YXJ0ZWRcIjtcbiAgICBzdGF0aWMgRFJBR19FTkRFRCA9IFwiZHJhZ0VuZGVkXCI7XG4gICAgc3RhdGljIERST1BQRUQgPSBcImRyb3BwZWRcIjtcbiAgICBcbn0iLCJpbXBvcnQgeyBTdHlsZXNoZWV0QnVpbGRlciB9IGZyb20gXCJudXR0aW4yYy1jb3JlX3YxXCI7XG5pbXBvcnQgeyBDb2xvckFwcGxpY2F0b3IgfSBmcm9tIFwiLi9jb2xvckFwcGxpY2F0b3JcIjtcblxuZXhwb3J0IGNsYXNzIEVsZW1lbnRUaGVtZUFwcGxpY2F0b3Ige1xuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3R5bGVzaGVldEJ1aWxkZXJ9IHN0eWxlc2hlZXRCdWlsZGVyIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBjbGFzc1ByZWZpeFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBtb2RlTmFtZSBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ1tdfSBkZWZhdWx0Q29sb3JzIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nW119IGhvdmVyQ29sb3JzIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nW119IGRpc2FibGVkQ29sb3JzIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nW119IGFjdGl2ZUNvbG9ycyBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gYm94U2hhZG93Rm9jdXMgXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGJveFNoYWRvd0FjdGl2ZUZvY3VzIFxuICAgICAqIEByZXR1cm4ge1N0eWxlc2hlZXRCdWlsZGVyfVxuICAgICAqL1xuICAgIHN0YXRpYyBhcHBseShzdHlsZXNoZWV0QnVpbGRlciwgY2xhc3NQcmVmaXgsIG1vZGVOYW1lLFxuICAgICAgICAgICAgZGVmYXVsdENvbG9ycywgaG92ZXJDb2xvcnMsIGRpc2FibGVkQ29sb3JzLCBhY3RpdmVDb2xvcnMsXG4gICAgICAgICAgICBib3hTaGFkb3dGb2N1cywgYm94U2hhZG93QWN0aXZlRm9jdXMpIHtcblxuICAgICAgICBDb2xvckFwcGxpY2F0b3IuYXBwbHkoc3R5bGVzaGVldEJ1aWxkZXIsIFxuICAgICAgICAgICAgYC4ke2NsYXNzUHJlZml4fS0ke21vZGVOYW1lfWAsXG4gICAgICAgICAgICBkZWZhdWx0Q29sb3JzWzBdLCBkZWZhdWx0Q29sb3JzWzFdLCBkZWZhdWx0Q29sb3JzWzJdKTtcblxuICAgICAgICBDb2xvckFwcGxpY2F0b3IuYXBwbHkoc3R5bGVzaGVldEJ1aWxkZXIsXG4gICAgICAgICAgICBgLiR7Y2xhc3NQcmVmaXh9LSR7bW9kZU5hbWV9OmhvdmVyYCxcbiAgICAgICAgICAgIGhvdmVyQ29sb3JzWzBdLCBob3ZlckNvbG9yc1sxXSwgaG92ZXJDb2xvcnNbMl0pO1xuXG4gICAgICAgIENvbG9yQXBwbGljYXRvci5hcHBseShzdHlsZXNoZWV0QnVpbGRlcixcbiAgICAgICAgICAgIGAuJHtjbGFzc1ByZWZpeH0tJHttb2RlTmFtZX06Zm9jdXMsIC4ke2NsYXNzUHJlZml4fS0ke21vZGVOYW1lfS5mb2N1c2AsXG4gICAgICAgICAgICBob3ZlckNvbG9yc1swXSwgaG92ZXJDb2xvcnNbMV0sIGhvdmVyQ29sb3JzWzJdKTtcblxuICAgICAgICBDb2xvckFwcGxpY2F0b3IuYXBwbHkoc3R5bGVzaGVldEJ1aWxkZXIsXG4gICAgICAgICAgICBgLiR7Y2xhc3NQcmVmaXh9LSR7bW9kZU5hbWV9LmRpc2FibGVkLCAuJHtjbGFzc1ByZWZpeH0tJHttb2RlTmFtZX06ZGlzYWJsZWRgLFxuICAgICAgICAgICAgZGlzYWJsZWRDb2xvcnNbMF0sIGRpc2FibGVkQ29sb3JzWzFdLCBkaXNhYmxlZENvbG9yc1syXSk7XG5cbiAgICAgICAgQ29sb3JBcHBsaWNhdG9yLmFwcGx5KHN0eWxlc2hlZXRCdWlsZGVyLFxuICAgICAgICAgICAgYC4ke2NsYXNzUHJlZml4fS0ke21vZGVOYW1lfTpub3QoOmRpc2FibGVkKTpub3QoLmRpc2FibGVkKTphY3RpdmUsYCArXG4gICAgICAgICAgICAgICAgYC4ke2NsYXNzUHJlZml4fS0ke21vZGVOYW1lfTpub3QoOmRpc2FibGVkKTpub3QoLmRpc2FibGVkKS5hY3RpdmUsYCArXG4gICAgICAgICAgICAgICAgYC5zaG93ID4gLiR7Y2xhc3NQcmVmaXh9LSR7bW9kZU5hbWV9LmRyb3Bkb3duLXRvZ2dsZWAsXG4gICAgICAgICAgICBhY3RpdmVDb2xvcnNbMF0sIGFjdGl2ZUNvbG9yc1sxXSwgYWN0aXZlQ29sb3JzWzJdKTtcblxuICAgICAgICBDb2xvckFwcGxpY2F0b3IuYXBwbHkoc3R5bGVzaGVldEJ1aWxkZXIsXG4gICAgICAgICAgICBgLiR7Y2xhc3NQcmVmaXh9LSR7bW9kZU5hbWV9Om5vdCg6ZGlzYWJsZWQpOm5vdCguZGlzYWJsZWQpOmFjdGl2ZTpmb2N1cyxgICtcbiAgICAgICAgICAgICAgICBgLiR7Y2xhc3NQcmVmaXh9LSR7bW9kZU5hbWV9Om5vdCg6ZGlzYWJsZWQpOm5vdCguZGlzYWJsZWQpLmFjdGl2ZTpmb2N1cyxgICtcbiAgICAgICAgICAgICAgICBgLnNob3cgPiAuJHtjbGFzc1ByZWZpeH0tJHttb2RlTmFtZX0uZHJvcGRvd24tdG9nZ2xlOmZvY3VzYCxcbiAgICAgICAgICAgIGFjdGl2ZUNvbG9yc1swXSwgYWN0aXZlQ29sb3JzWzFdLCBhY3RpdmVDb2xvcnNbMl0pO1xuXG5cbiAgICAgICAgcmV0dXJuIHN0eWxlc2hlZXRCdWlsZGVyXG4gICAgICAgICAgICAuc2VsZWN0b3IoYC4ke2NsYXNzUHJlZml4fS0ke21vZGVOYW1lfTpub3QoOmRpc2FibGVkKTpub3QoLmRpc2FibGVkKTphY3RpdmU6Zm9jdXMsYCArXG4gICAgICAgICAgICAgICAgICAgICAgICBgLiR7Y2xhc3NQcmVmaXh9LSR7bW9kZU5hbWV9Om5vdCg6ZGlzYWJsZWQpOm5vdCguZGlzYWJsZWQpLmFjdGl2ZTpmb2N1cyxgICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGAuc2hvdyA+IC4ke2NsYXNzUHJlZml4fS0ke21vZGVOYW1lfS5kcm9wZG93bi10b2dnbGU6Zm9jdXNgKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJveC1zaGFkb3dcIiwgYm94U2hhZG93QWN0aXZlRm9jdXMpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoYC4ke2NsYXNzUHJlZml4fS0ke21vZGVOYW1lfTpmb2N1cyxgICsgXG4gICAgICAgICAgICAgICAgICAgICAgICBgJHtjbGFzc1ByZWZpeH0tJHttb2RlTmFtZX0uZm9jdXNgKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJveC1zaGFkb3dcIiwgYm94U2hhZG93Rm9jdXMpXG4gICAgICAgICAgICAuY2xvc2UoKTtcbiAgICB9XG59IiwiaW1wb3J0IHsgQ29tcG9uZW50LFxuICAgIENhbnZhc1N0eWxlcyxcbiAgICBDb21wb25lbnRCdWlsZGVyLFxuICAgIElubGluZUNvbXBvbmVudEZhY3Rvcnlcbn0gZnJvbSBcIm51dHRpbjJjLWNvcmVfdjFcIjtcbmltcG9ydCB7IEluamVjdGlvblBvaW50LCBQcm90b3R5cGVDb25maWcsIFR5cGVDb25maWdQYWNrIH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcblxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIkZpbGxQYW5lbFwiKTtcblxuZXhwb3J0IGNsYXNzIEZpbGxQYW5lbCB7XG5cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgICAgIC8qKiBAdHlwZSB7SW5saW5lQ29tcG9uZW50RmFjdG9yeX0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoSW5saW5lQ29tcG9uZW50RmFjdG9yeSk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnR9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gbnVsbDtcblxuICAgIH1cblxuICAgIHNldENvbnRlbnQoY29tcG9uZW50KSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LnNldENoaWxkKFwiY29udGVudFwiLCBjb21wb25lbnQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Q29tcG9uZW50QnVpbGRlcn0gY29tcG9uZW50QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyB7Q29tcG9uZW50fVxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZENvbXBvbmVudChjb21wb25lbnRCdWlsZGVyKSB7XG4gICAgICAgIHJldHVybiBjb21wb25lbnRCdWlsZGVyXG4gICAgICAgICAgICAucm9vdChcImRpdlwiLCBcImlkPWNvbnRlbnRcIiwgXCJjbGFzcz1jbnRyIGNudHItcm93cyBjbnRyLWdyb3ctb25seSB3aWR0aC1mdWxsXCIpXG4gICAgICAgICAgICAuYnVpbGQoKTtcbiAgICB9XG5cbiAgICBwb3N0Q29uZmlnKCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoRmlsbFBhbmVsKTtcbiAgICB9XG5cbn1cblxuVHlwZUNvbmZpZ1BhY2suaW5zdGFuY2UoKS5hZGRUeXBlQ29uZmlnKFwibnV0dGluMmMtdWlcIiwgUHJvdG90eXBlQ29uZmlnLnVubmFtZWQoRmlsbFBhbmVsKSk7IiwiaW1wb3J0IHtcbiAgICBDYW52YXNTdHlsZXMsXG4gICAgQ29tcG9uZW50LFxuICAgIENhbnZhc1Jvb3QsXG4gICAgSFRNTCxcbiAgICBTdHlsZVNlbGVjdG9yQWNjZXNzb3IsXG4gICAgU3R5bGVBY2Nlc3NvcixcbiAgICBTdHlsZXNoZWV0QnVpbGRlcixcbiAgICBTdHlsZXNoZWV0LFxuICAgIENvbXBvbmVudEJ1aWxkZXIsXG4gICAgSW5saW5lQ29tcG9uZW50RmFjdG9yeVxufSBmcm9tIFwibnV0dGluMmMtY29yZV92MVwiO1xuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQsIFByb3RvdHlwZUNvbmZpZywgVHlwZUNvbmZpZ1BhY2sgfSBmcm9tIFwibWluZGlfdjFcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuaW1wb3J0IHsgQ29udGFpbmVyRXZlbnQgfSBmcm9tIFwiY29udGFpbmVyYnJpZGdlX3YxXCI7XG5pbXBvcnQgeyBDb2xvclBhbGV0dGUgfSBmcm9tIFwiLi4vY29sb3JQYWxldHRlXCI7XG5pbXBvcnQgeyBFbGVtZW50VGhlbWVBcHBsaWNhdG9yIH0gZnJvbSBcIi4uL2NvbW1vbi9lbGVtZW50VGhlbWVBcHBsaWNhdG9yXCI7XG5cbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJEcm9wRG93blBhbmVsXCIpO1xuXG5leHBvcnQgY2xhc3MgRHJvcERvd25QYW5lbCB7XG5cbiAgICBzdGF0aWMgVFlQRV9QUklNQVJZID0gXCJkcm9wLWRvd24tcGFuZWwtYnV0dG9uLXByaW1hcnlcIjtcbiAgICBzdGF0aWMgVFlQRV9TRUNPTkRBUlkgPSBcImRyb3AtZG93bi1wYW5lbC1idXR0b24tc2Vjb25kYXJ5XCI7XG4gICAgc3RhdGljIFRZUEVfU1VDQ0VTUyA9IFwiZHJvcC1kb3duLXBhbmVsLWJ1dHRvbi1zdWNjZXNzXCI7XG4gICAgc3RhdGljIFRZUEVfSU5GTyA9IFwiZHJvcC1kb3duLXBhbmVsLWJ1dHRvbi1pbmZvXCI7XG4gICAgc3RhdGljIFRZUEVfV0FSTklORyA9IFwiZHJvcC1kb3duLXBhbmVsLWJ1dHRvbi13YXJuaW5nXCI7XG4gICAgc3RhdGljIFRZUEVfREFOR0VSID0gXCJkcm9wLWRvd24tcGFuZWwtYnV0dG9uLWRhbmdlclwiO1xuICAgIHN0YXRpYyBUWVBFX0xJR0hUID0gXCJkcm9wLWRvd24tcGFuZWwtYnV0dG9uLWxpZ2h0XCI7XG4gICAgc3RhdGljIFRZUEVfREFSSyA9IFwiZHJvcC1kb3duLXBhbmVsLWJ1dHRvbi1kYXJrXCI7XG5cbiAgICBzdGF0aWMgU0laRV9NRURJVU0gPSBcImRyb3AtZG93bi1wYW5lbC1idXR0b24tbWVkaXVtXCI7XG4gICAgc3RhdGljIFNJWkVfTEFSR0UgPSBcImRyb3AtZG93bi1wYW5lbC1idXR0b24tbGFyZ2VcIjtcblxuICAgIHN0YXRpYyBPUklFTlRBVElPTl9MRUZUID0gXCJkcm9wLWRvd24tcGFuZWwtbGVmdFwiO1xuICAgIHN0YXRpYyBPUklFTlRBVElPTl9SSUdIVCA9IFwiZHJvcC1kb3duLXBhbmVsLXJpZ2h0XCI7XG5cbiAgICBzdGF0aWMgQ09OVEVOVF9WSVNJQkxFID0gXCJkcm9wLWRvd24tcGFuZWwtY29udGVudC12aXNpYmxlXCI7XG4gICAgc3RhdGljIENPTlRFTlRfSElEREVOID0gXCJkcm9wLWRvd24tcGFuZWwtY29udGVudC1oaWRkZW5cIjtcbiAgICBzdGF0aWMgQ09OVEVOVF9FWFBBTkQgPSBcImRyb3AtZG93bi1wYW5lbC1jb250ZW50LWV4cGFuZFwiO1xuICAgIHN0YXRpYyBDT05URU5UX0NPTExBUFNFID0gXCJkcm9wLWRvd24tcGFuZWwtY29udGVudC1jb2xsYXBzZVwiO1xuICAgIHN0YXRpYyBDT05URU5UID0gXCJkcm9wLWRvd24tcGFuZWwtY29udGVudFwiO1xuICAgIHN0YXRpYyBCVVRUT04gPSBcImRyb3AtZG93bi1wYW5lbC1idXR0b25cIjtcblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpY29uQ2xhc3NcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBvcmllbnRhdGlvblxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGljb25DbGFzcywgdHlwZSA9IERyb3BEb3duUGFuZWwuVFlQRV9EQVJLLCBzaXplID0gRHJvcERvd25QYW5lbC5TSVpFX01FRElVTSwgb3JpZW50YXRpb24gPSBEcm9wRG93blBhbmVsLk9SSUVOVEFUSU9OX0xFRlQpIHtcblxuICAgICAgICAvKiogQHR5cGUge0lubGluZUNvbXBvbmVudEZhY3Rvcnl9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKElubGluZUNvbXBvbmVudEZhY3RvcnkpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IG51bGw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMuaWNvbkNsYXNzID0gaWNvbkNsYXNzO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLnNpemUgPSBzaXplO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLm9yaWVudGF0aW9uID0gb3JpZW50YXRpb247XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0eWxlc2hlZXRCdWlsZGVyfSBzdHlsZXNoZWV0QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyB7U3R5bGVzaGVldH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRTdHlsZXNoZWV0KHN0eWxlc2hlZXRCdWlsZGVyKSB7XG4gICAgICAgIHN0eWxlc2hlZXRCdWlsZGVyXG4gICAgICAgICAgICAubWVkaWEoXCIocHJlZmVycy1yZWR1Y2VkLW1vdGlvbjogcmVkdWNlKVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zZWxlY3RvcihcIi5kcm9wLWRvd24tcGFuZWwtYnV0dG9uXCIpXG4gICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2l0aW9uXCIsIFwibm9uZVwiKVxuICAgICAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuZHJvcC1kb3duLXBhbmVsLW91dGxpbmVcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIFwiaW5saW5lLWJsb2NrXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidmVydGljYWwtYWxpZ25cIiwgXCJtaWRkbGVcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5kcm9wLWRvd24tcGFuZWwtYnV0dG9uXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWluLXdpZHRoXCIsIFwiMzVwdFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgXCJpbmxpbmUtYmxvY2tcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmb250LXdlaWdodFwiLCBcIjQwMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbG9yXCIsIFwiIzIxMjUyOVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRleHQtYWxpZ25cIiwgXCJjZW50ZXJcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ2ZXJ0aWNhbC1hbGlnblwiLCBcIm1pZGRsZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIi13ZWJraXQtdXNlci1zZWxlY3RcIiwgXCJub25lXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiLW1vei11c2VyLXNlbGVjdFwiLCBcIm5vbmVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCItbXMtdXNlci1zZWxlY3RcIiwgXCJub25lXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidXNlci1zZWxlY3RcIiwgXCJub25lXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcInRyYW5zcGFyZW50XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyXCIsIFwiMXB4IHNvbGlkIHRyYW5zcGFyZW50XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZ1wiLCBcIjAuMzc1cmVtIDAuNzVyZW1cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJsaW5lLWhlaWdodFwiLCBcIjEuNVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1yYWRpdXNcIiwgXCIwLjI1cmVtXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNpdGlvblwiLCBcImNvbG9yIDAuMTVzIGVhc2UtaW4tb3V0LCBiYWNrZ3JvdW5kLWNvbG9yIDAuMTVzIGVhc2UtaW4tb3V0LCBib3JkZXItY29sb3IgMC4xNXMgZWFzZS1pbi1vdXQsIGJveC1zaGFkb3cgMC4xNXMgZWFzZS1pbi1vdXRcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5kcm9wLWRvd24tcGFuZWwtYnV0dG9uLW1lZGl1bVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtc2l6ZVwiLCBcIjFyZW1cIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5kcm9wLWRvd24tcGFuZWwtYnV0dG9uLWxhcmdlXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZm9udC1zaXplXCIsIFwiMS41cmVtXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuZHJvcC1kb3duLXBhbmVsLWNvbnRlbnRcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtaW4td2lkdGhcIiwgXCIxNTBwdFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1heC13aWR0aFwiLCBcIjQ1MHB0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZ1wiLCBcIjhwdCAxNHB0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCIjMzMzMzMzXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcInZhcigtLWRlZmF1bHQtcGFuZWwtY29sb3IpXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyLXJhZGl1c1wiLCBcIjVwdFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBvc2l0aW9uXCIsIFwiYWJzb2x1dGVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ6LWluZGV4XCIsIFwiOTk5OTk5OTdcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3gtc2l6aW5nXCIsIFwiYm9yZGVyLWJveFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJveC1zaGFkb3dcIiwgXCIwIDFweCA4cHggcmdiYSgwLDAsMCwwLjUpXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwib3ZlcmZsb3dcIiwgXCJoaWRkZW5cIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5kcm9wLWRvd24tcGFuZWwtY29udGVudC5kcm9wLWRvd24tcGFuZWwtbGVmdFwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZSgwJSwgMTBwdCkgdHJhbnNsYXRlKDAlLDBweClcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5kcm9wLWRvd24tcGFuZWwtY29udGVudC5kcm9wLWRvd24tcGFuZWwtcmlnaHRcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoLTEwMCUsIDEwcHQpIHRyYW5zbGF0ZSgzNXB0LDBweClcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5kcm9wLWRvd24tcGFuZWwtY29udGVudC12aXNpYmxlXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLFwiYmxvY2tcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuZHJvcC1kb3duLXBhbmVsLWNvbnRlbnQtaGlkZGVuXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLFwibm9uZVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRyb3AtZG93bi1wYW5lbC1hcnJvd1wiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmdcIiwgXCIxMHB4IDIwcHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjb2xvclwiLCBcIiMzMzMzMzNcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmb250LXdlaWdodFwiLCBcIm5vcm1hbFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBvc2l0aW9uXCIsIFwiYWJzb2x1dGVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ6LWluZGV4XCIsIFwiOTk5OTk5OThcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3gtc2l6aW5nXCIsIFwiYm9yZGVyLWJveFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgXCJub25lXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKDAlLCA1MCUpIHRyYW5zbGF0ZSgwJSwtM3B0KVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRyb3AtZG93bi1wYW5lbC1hcnJvdyBpXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIiwgXCJhYnNvbHV0ZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpbi1sZWZ0XCIsIFwiLTE1cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLCBcIjQwcHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJoZWlnaHRcIiwgXCIxNXB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwib3ZlcmZsb3dcIiwgXCJoaWRkZW5cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0b3BcIiwgXCItMjAlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibGVmdFwiLCBcIjMwJVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRyb3AtZG93bi1wYW5lbC1hcnJvdyBpOjphZnRlclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbnRlbnRcIiwgXCInJ1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBvc2l0aW9uXCIsIFwiYWJzb2x1dGVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLCBcIjE4cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJoZWlnaHRcIiwgXCIxNXB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcInZhcigtLWRlZmF1bHQtcGFuZWwtY29sb3IpXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm94LXNoYWRvd1wiLCBcIjAgMXB4IDhweCByZ2JhKDAsMCwwLDAuNSlcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJsZWZ0XCIsIFwiMzAlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKDUwJSw1MCUpIHJvdGF0ZSg0NWRlZylcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5kcm9wLWRvd24tcGFuZWwtYnV0dG9uOmhvdmVyXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCIjMjEyNTI5XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidGV4dC1kZWNvcmF0aW9uXCIsIFwibm9uZVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRyb3AtZG93bi1wYW5lbC1idXR0b246Zm9jdXMsXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgXCIuZHJvcC1kb3duLXBhbmVsLWJ1dHRvbi5mb2N1c1wiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm91dGxpbmVcIiwgXCIwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm94LXNoYWRvd1wiLCBcIjAgMCAwIDAuMnJlbSByZ2JhKDAsIDEyMywgMjU1LCAwLjI1KVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRyb3AtZG93bi1wYW5lbC1idXR0b24uZGlzYWJsZWQsXCIrIFxuICAgICAgICAgICAgICAgICAgICAgICAgXCIuZHJvcC1kb3duLXBhbmVsLWJ1dHRvbjpkaXNhYmxlZFwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwLjY1XCIpXG4gICAgICAgICAgICAuY2xvc2UoKTtcblxuICAgICAgICBFbGVtZW50VGhlbWVBcHBsaWNhdG9yLmFwcGx5KHN0eWxlc2hlZXRCdWlsZGVyLCBcImRyb3AtZG93bi1wYW5lbC1idXR0b25cIiwgXCJwcmltYXJ5XCIsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuUFJJTUFSWV9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuUFJJTUFSWV9IT1ZFUl9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuUFJJTUFSWV9ESVNBQkxFRF9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuUFJJTUFSWV9BQ1RJVkVfQ09MT1JTLFxuICAgICAgICAgICAgXCIwIDAgMCAwLjJyZW0gcmdiYSgxMzAsIDEzOCwgMTQ1LCAwLjUpXCIsIC8vIGJveFNoYWRvd0ZvY3VzXG4gICAgICAgICAgICBcIjAgMCAwIDAuMnJlbSByZ2JhKDEzMCwgMTM4LCAxNDUsIDAuNSlcIik7IC8vIGJveFNoYWRvd0FjdGl2ZUZvY3VzXG5cblxuICAgICAgICBFbGVtZW50VGhlbWVBcHBsaWNhdG9yLmFwcGx5KHN0eWxlc2hlZXRCdWlsZGVyLCBcImRyb3AtZG93bi1wYW5lbC1idXR0b25cIiwgXCJzZWNvbmRhcnlcIixcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5TRUNPTkRBUllfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLlNFQ09OREFSWV9IT1ZFUl9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuU0VDT05EQVJZX0RJU0FCTEVEX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5TRUNPTkRBUllfQUNUSVZFX0NPTE9SUyxcbiAgICAgICAgICAgIFwiMCAwIDAgMC4ycmVtIHJnYmEoMTMwLCAxMzgsIDE0NSwgMC41KVwiLCAvLyBib3hTaGFkb3dGb2N1c1xuICAgICAgICAgICAgXCIwIDAgMCAwLjJyZW0gcmdiYSgxMzAsIDEzOCwgMTQ1LCAwLjUpXCIpOyAvLyBib3hTaGFkb3dBY3RpdmVGb2N1c1xuICAgICAgICBcbiAgICAgICAgRWxlbWVudFRoZW1lQXBwbGljYXRvci5hcHBseShzdHlsZXNoZWV0QnVpbGRlciwgXCJkcm9wLWRvd24tcGFuZWwtYnV0dG9uXCIsIFwic3VjY2Vzc1wiLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLlNVQ0NFU1NfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLlNVQ0NFU1NfSE9WRVJfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLlNVQ0NFU1NfRElTQUJMRURfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLlNVQ0NFU1NfQUNUSVZFX0NPTE9SUyxcbiAgICAgICAgICAgIFwiMCAwIDAgMC4ycmVtIHJnYmEoNzIsIDE4MCwgOTcsIDAuNSlcIiwgLy8gYm94U2hhZG93Rm9jdXNcbiAgICAgICAgICAgIFwiMCAwIDAgMC4ycmVtIHJnYmEoNzIsIDE4MCwgOTcsIDAuNSlcIik7IC8vIGJveFNoYWRvd0FjdGl2ZUZvY3VzXG5cbiAgICAgICAgRWxlbWVudFRoZW1lQXBwbGljYXRvci5hcHBseShzdHlsZXNoZWV0QnVpbGRlciwgXCJkcm9wLWRvd24tcGFuZWwtYnV0dG9uXCIsIFwiaW5mb1wiLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLklORk9fQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLklORk9fSE9WRVJfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLklORk9fRElTQUJMRURfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLklORk9fQUNUSVZFX0NPTE9SUyxcbiAgICAgICAgICAgIFwiMCAwIDAgMC4ycmVtIHJnYmEoNTgsIDE3NiwgMTk1LCAwLjUpXCIsIC8vIGJveFNoYWRvd0ZvY3VzXG4gICAgICAgICAgICBcIjAgMCAwIDAuMnJlbSByZ2JhKDU4LCAxNzYsIDE5NSwgMC41KVwiKTsgLy8gYm94U2hhZG93QWN0aXZlRm9jdXNcblxuICAgICAgICBFbGVtZW50VGhlbWVBcHBsaWNhdG9yLmFwcGx5KHN0eWxlc2hlZXRCdWlsZGVyLCBcImRyb3AtZG93bi1wYW5lbC1idXR0b25cIiwgXCJ3YXJuaW5nXCIsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuV0FSTklOR19DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuV0FSTklOR19IT1ZFUl9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuV0FSTklOR19ESVNBQkxFRF9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuV0FSTklOR19BQ1RJVkVfQ09MT1JTLFxuICAgICAgICAgICAgXCIwIDAgMCAwLjJyZW0gcmdiYSgyMjIsIDE3MCwgMTIsIDAuNSlcIiwgLy8gYm94U2hhZG93Rm9jdXNcbiAgICAgICAgICAgIFwiMCAwIDAgMC4ycmVtIHJnYmEoMjIyLCAxNzAsIDEyLCAwLjUpXCIpOyAvLyBib3hTaGFkb3dBY3RpdmVGb2N1c1xuXG4gICAgICAgIEVsZW1lbnRUaGVtZUFwcGxpY2F0b3IuYXBwbHkoc3R5bGVzaGVldEJ1aWxkZXIsIFwiZHJvcC1kb3duLXBhbmVsLWJ1dHRvblwiLCBcImRhbmdlclwiLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLkRBTkdFUl9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuREFOR0VSX0hPVkVSX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5EQU5HRVJfRElTQUJMRURfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLkRBTkdFUl9BQ1RJVkVfQ09MT1JTLFxuICAgICAgICAgICAgXCIwIDAgMCAwLjJyZW0gcmdiYSgyMjUsIDgzLCA5NywgMC41KVwiLCAvLyBib3hTaGFkb3dGb2N1c1xuICAgICAgICAgICAgXCIwIDAgMCAwLjJyZW0gcmdiYSgyMjUsIDgzLCA5NywgMC41KVwiKTsgLy8gYm94U2hhZG93QWN0aXZlRm9jdXNcblxuICAgICAgICBFbGVtZW50VGhlbWVBcHBsaWNhdG9yLmFwcGx5KHN0eWxlc2hlZXRCdWlsZGVyLCBcImRyb3AtZG93bi1wYW5lbC1idXR0b25cIiwgXCJsaWdodFwiLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLkxJR0hUX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5MSUdIVF9IT1ZFUl9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuTElHSFRfRElTQUJMRURfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLkxJR0hUX0FDVElWRV9DT0xPUlMsXG4gICAgICAgICAgICBcIjAgMCAwIDAuMnJlbSByZ2JhKDIxNiwgMjE3LCAyMTksIDAuNSlcIiwgLy8gYm94U2hhZG93Rm9jdXNcbiAgICAgICAgICAgIFwiMCAwIDAgMC4ycmVtIHJnYmEoMjE2LCAyMTcsIDIxOSwgMC41KVwiKTsgLy8gYm94U2hhZG93QWN0aXZlRm9jdXNcblxuICAgICAgICBFbGVtZW50VGhlbWVBcHBsaWNhdG9yLmFwcGx5KHN0eWxlc2hlZXRCdWlsZGVyLCBcImRyb3AtZG93bi1wYW5lbC1idXR0b25cIiwgXCJkYXJrXCIsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuREFSS19DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuREFSS19IT1ZFUl9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuREFSS19ESVNBQkxFRF9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuREFSS19BQ1RJVkVfQ09MT1JTLFxuICAgICAgICAgICAgXCIwIDAgMCAwLjJyZW0gcmdiYSg4MiwgODgsIDkzLCAwLjUpXCIsIC8vIGJveFNoYWRvd0ZvY3VzXG4gICAgICAgICAgICBcIjAgMCAwIDAuMnJlbSByZ2JhKDgyLCA4OCwgOTMsIDAuNSlcIik7IC8vIGJveFNoYWRvd0FjdGl2ZUZvY3VzXG5cbiAgICAgICAgcmV0dXJuIHN0eWxlc2hlZXRCdWlsZGVyLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDb21wb25lbnRCdWlsZGVyfSBjb21wb25lbnRCdWlsZGVyIFxuICAgICAqIEByZXR1cm5zIHtDb21wb25lbnR9XG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkQ29tcG9uZW50KGNvbXBvbmVudEJ1aWxkZXIpIHtcbiAgICAgICByZXR1cm4gY29tcG9uZW50QnVpbGRlclxuICAgICAgICAgICAgLnJvb3QoXCJkaXZcIiwgXCJpZD1kcm9wRG93blBhbmVsUm9vdFwiLCBcImNsYXNzPWRyb3AtZG93bi1wYW5lbC1vdXRsaW5lXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLm5vZGUoXCJidXR0b25cIiwgXCJpZD1idXR0b25cIiwgXCJjbGFzcz1kcm9wLWRvd24tcGFuZWwtYnV0dG9uXCIpXG4gICAgICAgICAgICAgICAgLm5vZGUoXCJkaXZcIiwgXCJpZD1hcnJvd1wiLCBcImNsYXNzPWRyb3AtZG93bi1wYW5lbC1hcnJvd1wiKVxuICAgICAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAgICAgLm5vZGUoXCJpXCIpXG4gICAgICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgICAgICAubm9kZShcImRpdlwiLCBcImlkPWNvbnRlbnRcIiwgXCJjbGFzcz1kcm9wLWRvd24tcGFuZWwtY29udGVudFwiLCBcInRhYmluZGV4PTBcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5idWlsZCgpO1xuICAgIH1cblxuICAgIHBvc3RDb25maWcoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZShEcm9wRG93blBhbmVsKTtcbiAgICAgICAgQ2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKERyb3BEb3duUGFuZWwubmFtZSk7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJ1dHRvblwiKS5zZXRDaGlsZChIVE1MLmkoXCJcIiwgdGhpcy5pY29uQ2xhc3MpKTtcblxuICAgICAgICBTdHlsZVNlbGVjdG9yQWNjZXNzb3IuZnJvbSh0aGlzLmNvbXBvbmVudC5nZXQoXCJidXR0b25cIikpXG4gICAgICAgICAgICAuZW5hYmxlKERyb3BEb3duUGFuZWwuQlVUVE9OKVxuICAgICAgICAgICAgLmVuYWJsZSh0aGlzLnR5cGUpO1xuXG4gICAgICAgIFN0eWxlU2VsZWN0b3JBY2Nlc3Nvci5mcm9tKHRoaXMuY29tcG9uZW50LmdldChcImNvbnRlbnRcIikpXG4gICAgICAgICAgICAuZW5hYmxlKERyb3BEb3duUGFuZWwuQ09OVEVOVClcbiAgICAgICAgICAgIC5kaXNhYmxlKERyb3BEb3duUGFuZWwuQ09OVEVOVF9WSVNJQkxFKVxuICAgICAgICAgICAgLmVuYWJsZShEcm9wRG93blBhbmVsLkNPTlRFTlRfSElEREVOKVxuICAgICAgICAgICAgLmVuYWJsZSh0aGlzLnNpemUpXG4gICAgICAgICAgICAuZW5hYmxlKHRoaXMub3JpZW50YXRpb24pO1xuXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJ1dHRvblwiKS5saXN0ZW5UbyhcImNsaWNrXCIsIHRoaXMuY2xpY2tlZCwgdGhpcyk7XG4gICAgICAgIENhbnZhc1Jvb3QubGlzdGVuVG9Gb2N1c0VzY2FwZSh0aGlzLmNvbXBvbmVudC5nZXQoXCJkcm9wRG93blBhbmVsUm9vdFwiKSwgdGhpcy5oaWRlLCB0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudH0gZHJvcERvd25QYW5lbENvbnRlbnQgXG4gICAgICovXG4gICAgc2V0UGFuZWxDb250ZW50KGRyb3BEb3duUGFuZWxDb250ZW50KSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImNvbnRlbnRcIikuc2V0Q2hpbGQoZHJvcERvd25QYW5lbENvbnRlbnQuY29tcG9uZW50KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDb250YWluZXJFdmVudH0gZXZlbnQgXG4gICAgICovXG4gICAgY2xpY2tlZChldmVudCkge1xuICAgICAgICB0aGlzLnRvZ2dsZUNvbnRlbnQoKTtcbiAgICB9XG5cbiAgICB0b2dnbGVDb250ZW50KCkge1xuICAgICAgICBpZiAoIVN0eWxlQWNjZXNzb3IuZnJvbSh0aGlzLmNvbXBvbmVudC5nZXQoXCJhcnJvd1wiKSkuaXMoXCJkaXNwbGF5XCIsXCJibG9ja1wiKSkge1xuICAgICAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNob3coKSB7XG4gICAgICAgIFN0eWxlU2VsZWN0b3JBY2Nlc3Nvci5mcm9tKHRoaXMuY29tcG9uZW50LmdldChcImNvbnRlbnRcIikpXG4gICAgICAgICAgICAuZGlzYWJsZShEcm9wRG93blBhbmVsLkNPTlRFTlRfSElEREVOKVxuICAgICAgICAgICAgLmVuYWJsZShEcm9wRG93blBhbmVsLkNPTlRFTlRfVklTSUJMRSk7XG4gICAgICAgIFN0eWxlQWNjZXNzb3IuZnJvbSh0aGlzLmNvbXBvbmVudC5nZXQoXCJhcnJvd1wiKSlcbiAgICAgICAgICAgIC5zZXQoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIik7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImNvbnRlbnRcIikuY29udGFpbmVyRWxlbWVudC5mb2N1cygpO1xuICAgIH1cblxuICAgIGhpZGUoKSB7XG4gICAgICAgIFN0eWxlU2VsZWN0b3JBY2Nlc3Nvci5mcm9tKHRoaXMuY29tcG9uZW50LmdldChcImNvbnRlbnRcIikpXG4gICAgICAgICAgICAuZGlzYWJsZShEcm9wRG93blBhbmVsLkNPTlRFTlRfVklTSUJMRSlcbiAgICAgICAgICAgIC5lbmFibGUoRHJvcERvd25QYW5lbC5DT05URU5UX0hJRERFTik7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImFycm93XCIpLnNldFN0eWxlKFwiZGlzcGxheVwiLCBcIm5vbmVcIik7XG4gICAgfVxuXG4gICAgZGlzYWJsZSgpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYnV0dG9uXCIpLnNldEF0dHJpYnV0ZVZhbHVlKFwiZGlzYWJsZWRcIiwgXCJ0cnVlXCIpO1xuICAgIH1cblxuICAgIGVuYWJsZSgpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYnV0dG9uXCIpLnJlbW92ZUF0dHJpYnV0ZShcImRpc2FibGVkXCIpO1xuICAgIH1cbn1cblxuVHlwZUNvbmZpZ1BhY2suaW5zdGFuY2UoKS5hZGRUeXBlQ29uZmlnKFwibnV0dGluMmMtdWlcIiwgUHJvdG90eXBlQ29uZmlnLnVubmFtZWQoRHJvcERvd25QYW5lbCkpOyIsImltcG9ydCB7XG4gICAgQ29tcG9uZW50LFxuICAgIENhbnZhc1N0eWxlcyxcbiAgICBDYW52YXNSb290LFxuICAgIE5hdmlnYXRpb24sXG4gICAgU3R5bGVzaGVldEJ1aWxkZXIsXG4gICAgU3R5bGVzaGVldCxcbiAgICBDb21wb25lbnRCdWlsZGVyLFxuICAgIElubGluZUNvbXBvbmVudEZhY3Rvcnlcbn0gZnJvbSBcIm51dHRpbjJjLWNvcmVfdjFcIjtcbmltcG9ydCB7IFRpbWVQcm9taXNlLCBMb2dnZXIsIE1ldGhvZCwgTGlzdCB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQsIFByb3RvdHlwZUNvbmZpZywgVHlwZUNvbmZpZ1BhY2sgfSBmcm9tIFwibWluZGlfdjFcIjtcbmltcG9ydCB7IEJhY2tTaGFkZSB9IGZyb20gXCIuLi9iYWNrU2hhZGUvYmFja1NoYWRlLmpzXCI7XG5pbXBvcnQgeyBCYWNrU2hhZGVMaXN0ZW5lcnMgfSBmcm9tIFwiLi4vYmFja1NoYWRlL2JhY2tTaGFkZUxpc3RlbmVycy5qc1wiO1xuaW1wb3J0IHsgQ29udGFpbmVyRWxlbWVudFV0aWxzLCBDb250YWluZXJFdmVudCB9IGZyb20gXCJjb250YWluZXJicmlkZ2VfdjFcIjtcblxuXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiRGlhbG9nQm94XCIpO1xuXG5leHBvcnQgY2xhc3MgRGlhbG9nQm94IHtcbiAgICBcbiAgICBzdGF0aWMgT1BUSU9OX0JBQ0tfT05fQ0xPU0UgPSAxO1xuXG4gICAgLyoqXG4gICAgICogXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoZGVmYXVsdE9wdGlvbnMgPSBbXSl7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtJbmxpbmVDb21wb25lbnRGYWN0b3J5fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShJbmxpbmVDb21wb25lbnRGYWN0b3J5KTtcblxuXHRcdC8qKiBAdHlwZSB7Q29tcG9uZW50fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IG51bGw7XG4gICAgICAgIFxuICAgICAgICAvKiogQHR5cGUge0JhY2tTaGFkZX0gKi9cbiAgICAgICAgdGhpcy5iYWNrU2hhZGUgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShCYWNrU2hhZGUsIFtcbiAgICAgICAgICAgIG5ldyBCYWNrU2hhZGVMaXN0ZW5lcnMoKVxuICAgICAgICAgICAgICAgIC53aXRoQmFja2dyb3VuZENsaWNrZWQobmV3IE1ldGhvZCh0aGlzLmhpZGUsIHRoaXMpKV0pO1xuXG4gICAgICAgIHRoaXMuaGlkZGVuID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLnN3YWxsb3dGb2N1c0VzY2FwZSA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMub3duaW5nVHJpZ2dlciA9IG51bGw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtMaXN0PHN0cmluZz59ICovXG4gICAgICAgIHRoaXMuZGVmYXVsdE9wdGlvbnMgPSBuZXcgTGlzdChkZWZhdWx0T3B0aW9ucyk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtMaXN0PHN0cmluZz59ICovXG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG5ldyBMaXN0KGRlZmF1bHRPcHRpb25zKTtcblxuICAgICAgICAvKiogQHR5cGUge0Z1bmN0aW9ufSAqL1xuICAgICAgICB0aGlzLmRlc3Ryb3lGb2N1c0VzY2FwZUxpc3RlbmVyID0gbnVsbDtcbiAgICB9XG4gICAgXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHlsZXNoZWV0QnVpbGRlcn0gc3R5bGVzaGVldEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMge1N0eWxlc2hlZXR9XG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkU3R5bGVzaGVldChzdHlsZXNoZWV0QnVpbGRlcikge1xuICAgICAgIHJldHVybiBzdHlsZXNoZWV0QnVpbGRlclxuICAgICAgICAgICAgLm1lZGlhKFwiQG1lZGlhIChtYXgtd2lkdGg6IDUxNnB4KVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zZWxlY3RvcihcIi5kaWFsb2dib3gtb3ZlcmxheVwiKVxuICAgICAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIiwgXCJmaXhlZFwiKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJsZWZ0XCIsIFwiMFwiKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLCBcIjEwMCVcIilcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwiaGVpZ2h0XCIsIFwiMTAwJVwiKVxuICAgICAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgICAgICAuc2VsZWN0b3IoXCIuZGlhbG9nYm94LWZyYW1lXCIpXG4gICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLCBcImFic29sdXRlXCIpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpblwiLCBcIjBcIilcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwid2lkdGhcIiwgXCIxMDAlXCIpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcImhlaWdodFwiLCBcIjEwMCVcIilcbiAgICAgICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRpYWxvZ2JveC1jb250ZW50XCIpXG4gICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLCBcInJlbGF0aXZlXCIpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcImhlaWdodFwiLCBcIjEwMCVcIilcbiAgICAgICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRpYWxvZ2JveC1ib2R5XCIpXG4gICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJvdmVyZmxvdy15XCIsIFwidmlzaWJsZVwiKVxuICAgICAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgLm1lZGlhKFwiQG1lZGlhIChtaW4td2lkdGg6IDUxN3B4KVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zZWxlY3RvcihcIi5kaWFsb2dib3gtb3ZlcmxheVwiKVxuICAgICAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIiwgXCJmaXhlZFwiKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tdG9wXCIsIFwiNTRwdFwiKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJwYWRkaW5nLXRvcFwiLCBcIjEuNXJlbVwiKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJsZWZ0XCIsIFwiNTAlXCIpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZSgtNTAlLDApXCIpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcIndpZHRoXCIsIFwiYXV0b1wiKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJoZWlnaHRcIiwgXCJhdXRvXCIpXG4gICAgICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgICAgIC5zZWxlY3RvcihcIi5kaWFsb2dib3gtZnJhbWVcIilcbiAgICAgICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcInBvc2l0aW9uXCIsIFwicmVsYXRpdmVcIilcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwid2lkdGhcIiwgXCJhdXRvXCIpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcImhlaWdodFwiLCBcImF1dG9cIilcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luXCIsIFwiMC41cmVtXCIpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcInBvaW50ZXItZXZlbnRzXCIsIFwibm9uZVwiKVxuICAgICAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgICAgICAuc2VsZWN0b3IoXCIuZGlhbG9nYm94LWNvbnRlbnRcIilcbiAgICAgICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcInBvc2l0aW9uXCIsIFwicmVsYXRpdmVcIilcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyXCIsIFwiMXB4IHNvbGlkIHJnYmEoMCwgMCwgMCwgMC4yKVwiKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItcmFkaXVzXCIsIFwiMC4zcmVtXCIpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcImhlaWdodFwiLCBcImF1dG9cIilcbiAgICAgICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRpYWxvZ2JveC1ib2R5XCIpXG4gICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJvdmVyZmxvdy15XCIsIFwidmlzaWJsZVwiKVxuICAgICAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgICAgICAuc2VsZWN0b3IoXCIuZGlhbG9nYm94LWhlYWRlclwiKVxuICAgICAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyLXRvcC1sZWZ0LXJhZGl1c1wiLCBcIjAuM3JlbVwiKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItdG9wLXJpZ2h0LXJhZGl1c1wiLCBcIjAuM3JlbVwiKVxuICAgICAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgLm1lZGlhKFwiQG1lZGlhIChwcmVmZXJzLXJlZHVjZWQtbW90aW9uOiByZWR1Y2UpXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRpYWxvZ2JveC1vdmVybGF5LmRpYWxvZ2JveC1mYWRlIC5kaWFsb2dib3gtZnJhbWVcIilcbiAgICAgICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zaXRpb25cIiwgXCJub25lXCIpXG4gICAgICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgICAgIC5zZWxlY3RvcihcIi5kaWFsb2dib3gtZmFkZVwiKVxuICAgICAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNpdGlvblwiLCBcIm5vbmVcIilcbiAgICAgICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5kaWFsb2dib3gtb3BlblwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm92ZXJmbG93XCIsIFwiaGlkZGVuXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuZGlhbG9nYm94LW9wZW4gLmRpYWxvZ2JveC1vdmVybGF5XCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwib3ZlcmZsb3cteFwiLCBcImhpZGRlblwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm92ZXJmbG93LXlcIiwgXCJhdXRvXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuZGlhbG9nYm94LW92ZXJsYXktZmFkZVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zaXRpb25cIiwgXCJvcGFjaXR5IDAuMTVzIGxpbmVhclwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRpYWxvZ2JveC1vdmVybGF5LWRpc3BsYXktYmxvY2tcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5kaWFsb2dib3gtb3ZlcmxheS1kaXNwbGF5LW5vbmVcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIFwibm9uZVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRpYWxvZ2JveC1vdmVybGF5LWZhZGU6bm90KC5kaWFsb2dib3gtb3ZlcmxheS1zaG93KVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuZGlhbG9nYm94LW92ZXJsYXkuZGlhbG9nYm94LW92ZXJsYXktZmFkZSAuZGlhbG9nYm94LWZyYW1lXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNpdGlvblwiLCBcIi13ZWJraXQtdHJhbnNmb3JtIDAuM3MgZWFzZS1vdXRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2l0aW9uXCIsIFwidHJhbnNmb3JtIDAuM3MgZWFzZS1vdXRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2l0aW9uXCIsIFwidHJhbnNmb3JtIDAuM3MgZWFzZS1vdXQsIC13ZWJraXQtdHJhbnNmb3JtIDAuM3MgZWFzZS1vdXRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCItd2Via2l0LXRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZSgwLCAtNTBweClcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoMCwgLTUwcHgpXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuZGlhbG9nYm94LW92ZXJsYXkuZGlhbG9nYm94LW92ZXJsYXktc2hvdyAuZGlhbG9nYm94LWZyYW1lXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiLXdlYmtpdC10cmFuc2Zvcm1cIiwgXCJub25lXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNmb3JtXCIsIFwibm9uZVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRpYWxvZ2JveC1oZWFkZXIgLmRpYWxvZ2JveC1jbG9zZS1idXR0b25cIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwYWRkaW5nXCIsIFwiMC43cmVtIDFyZW1cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW5cIiwgXCItMC43cmVtIC0xcmVtIC0wLjdyZW0gYXV0b1wiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRpYWxvZ2JveC10aXRsZVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpbi1ib3R0b21cIiwgXCIwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibGluZS1oZWlnaHRcIiwgXCIxLjVcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5kaWFsb2dib3gtYm9keVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBvc2l0aW9uXCIsIFwicmVsYXRpdmVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCItbXMtZmxleFwiLCBcIjEgMSBhdXRvXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZmxleFwiLCBcIjEgMSBhdXRvXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuZGlhbG9nYm94LWZvb3RlclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgXCItbXMtZmxleGJveFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgXCJmbGV4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiLW1zLWZsZXgtYWxpZ25cIiwgXCJjZW50ZXJcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJhbGlnbi1pdGVtc1wiLCBcImNlbnRlclwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIi1tcy1mbGV4LXBhY2tcIiwgXCJlbmRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJqdXN0aWZ5LWNvbnRlbnRcIiwgXCJmbGV4LWVuZFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmdcIiwgXCIxcmVtXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyLXRvcFwiLCBcIjFweCBzb2xpZCAjZGVlMmU2XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXNcIiwgXCIwLjNyZW1cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzXCIsIFwiMC4zcmVtXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuZGlhbG9nYm94LWZvb3RlciA+IDpub3QoOmZpcnN0LWNoaWxkKVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpbi1sZWZ0XCIsIFwiLjI1cmVtXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuZGlhbG9nYm94LWZvb3RlciA+IDpub3QoOmxhc3QtY2hpbGQpXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luLXJpZ2h0XCIsIFwiLjI1cmVtXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuZGlhbG9nYm94LW92ZXJsYXlcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0b3BcIiwgXCIwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiei1pbmRleFwiLCBcIjEwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwib3ZlcmZsb3dcIiwgXCJoaWRkZW5cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJvdXRsaW5lXCIsIFwiMFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRpYWxvZ2JveC1mcmFtZVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpblwiLCBcIjBcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5kaWFsb2dib3gtY29udGVudFwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgXCItbXMtZmxleGJveFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgXCJmbGV4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiLW1zLWZsZXgtZGlyZWN0aW9uXCIsIFwiY29sdW1uXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZmxleC1kaXJlY3Rpb25cIiwgXCJjb2x1bW5cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLCBcIjEwMCVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwb2ludGVyLWV2ZW50c1wiLCBcImF1dG9cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiI2ZmZlwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY2xpcFwiLCBcInBhZGRpbmctYm94XCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuZGlhbG9nYm94LWhlYWRlclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgXCItbXMtZmxleGJveFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgXCJmbGV4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiM5OTk5OTlcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjb2xvclwiLCBcInZhcigtLWRlZmF1bHQtcGFuZWwtY29sb3IpXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiLW1zLWZsZXgtYWxpZ25cIiwgXCJzdGFydFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImFsaWduLWl0ZW1zXCIsIFwiZmxleC1zdGFydFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIi1tcy1mbGV4LXBhY2tcIiwgXCJqdXN0aWZ5XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwianVzdGlmeS1jb250ZW50XCIsIFwic3BhY2UtYmV0d2VlblwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmdcIiwgXCIwLjdyZW0gMXJlbVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1ib3R0b21cIiwgXCIxcHggc29saWQgI2RlZTJlNlwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRpYWxvZ2JveC1jbG9zZS1idXR0b25cIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmbG9hdFwiLCBcInJpZ2h0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZm9udC1zaXplXCIsIFwiMS41cmVtXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZm9udC13ZWlnaHRcIiwgXCI3MDBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJsaW5lLWhlaWdodFwiLCBcIjFcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjb2xvclwiLCBcIiMwMDBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0ZXh0LXNoYWRvd1wiLCBcIjAgMXB4IDAgI2ZmZlwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIuNVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmRpYWxvZ2JveC1jbG9zZS1idXR0b246aG92ZXJcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjb2xvclwiLCBcIiMwMDBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0ZXh0LWRlY29yYXRpb25cIiwgXCJub25lXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuZGlhbG9nYm94LWNsb3NlLWJ1dHRvbjpub3QoOmRpc2FibGVkKTpub3QoLmRpc2FibGVkKTpob3ZlciwgLmRpYWxvZ2JveC1jbG9zZS1idXR0b246bm90KDpkaXNhYmxlZCk6bm90KC5kaXNhYmxlZCk6Zm9jdXNcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiLjc1XCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCJidXR0b24uZGlhbG9nYm94LWNsb3NlLWJ1dHRvblwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmdcIiwgXCIwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcInRyYW5zcGFyZW50XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyXCIsIFwiMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIi13ZWJraXQtYXBwZWFyYW5jZVwiLCBcIm5vbmVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCItbW96LWFwcGVhcmFuY2VcIiwgXCJub25lXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYXBwZWFyYW5jZVwiLCBcIm5vbmVcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC5idWlsZCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Q29tcG9uZW50QnVpbGRlcn0gY29tcG9uZW50QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyB7Q29tcG9uZW50fVxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZENvbXBvbmVudChjb21wb25lbnRCdWlsZGVyKSB7XG4gICAgICAgcmV0dXJuIGNvbXBvbmVudEJ1aWxkZXJcbiAgICAgICAgICAgIC5yb290KFwiZGl2XCIsIFwiaWQ9ZGlhbG9nQm94XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInN0eWxlPXotaW5kZXg6LTFcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAubm9kZShcImRpdlwiLCBcImlkPWJhY2tTaGFkZUNvbnRhaW5lclwiKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwiZGl2XCIsIFwiaWQ9ZGlhbG9nQm94T3ZlcmxheVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3M9ZGlhbG9nYm94LW92ZXJsYXkgZGlhbG9nYm94LW92ZXJsYXktZGlzcGxheS1ibG9jayBkaWFsb2dib3gtb3ZlcmxheS1mYWRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0YWJpbmRleD0tMVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicm9sZT1kaWFsb2dcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFyaWEtbGFiZWxsZWRieT1kaWFsb2dMYWJlbFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXJpYS1kaWFsb2dib3g9dHJ1ZVwiKVxuICAgICAgICAgICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgICAgICAgICAubm9kZShcImRpdlwiLCBcImNsYXNzPWRpYWxvZ2JveC1mcmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzdHlsZT16LWluZGV4OjJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicm9sZT1kb2N1bWVudFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm5vZGUoXCJkaXZcIiwgXCJjbGFzcz1kaWFsb2dib3gtY29udGVudFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5ub2RlKFwiZGl2XCIsIFwiY2xhc3M9ZGlhbG9nYm94LWhlYWRlclwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubm9kZShcImg1XCIsIFwiaWQ9dGl0bGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGFzcz1kaWFsb2dib3gtdGl0bGVcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGV4dChcIk1lc3NhZ2VcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubm9kZShcImJ1dHRvblwiLCBcImlkPWNsb3NlQnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlPWJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2xhc3M9ZGlhbG9nYm94LWNsb3NlLWJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGF0YS1kaXNtaXNzPWRpYWxvZ2JveFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXJpYS1sYWJlbD1DbG9zZVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm5vZGUoXCJpXCIsIFwiY2xhc3M9ZmEgZmEtd2luZG93LWNsb3NlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXJpYS1oaWRkZW49dHJ1ZVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm5vZGUoXCJkaXZcIiwgXCJpZD1kaWFsb2dCb3hDb250ZW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjbGFzcz1kaWFsb2dib3gtYm9keVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgcG9zdENvbmZpZygpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKERpYWxvZ0JveCk7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LnNldChcImJhY2tTaGFkZUNvbnRhaW5lclwiLCB0aGlzLmJhY2tTaGFkZS5jb21wb25lbnQpO1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJjbG9zZUJ1dHRvblwiKS5saXN0ZW5UbyhcImNsaWNrXCIsIHRoaXMuY2xvc2UsIHRoaXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0IFxuICAgICAqL1xuICAgIHNldFRpdGxlKHRleHQpeyB0aGlzLmNvbXBvbmVudC5zZXRDaGlsZChcInRpdGxlXCIsIHRleHQpOyB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudH0gY29tcG9uZW50IFxuICAgICAqL1xuICAgIHNldEZvb3Rlcihjb21wb25lbnQpe1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJkaWFsb2dCb3hGb290ZXJcIikuc2V0U3R5bGUoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIik7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LnNldENoaWxkKFwiZGlhbG9nQm94Rm9vdGVyXCIsIGNvbXBvbmVudCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDb21wb25lbnR9IGNvbXBvbmVudCBcbiAgICAgKi9cbiAgICBzZXRDb250ZW50KGNvbXBvbmVudCl7IHRoaXMuY29tcG9uZW50LnNldENoaWxkKFwiZGlhbG9nQm94Q29udGVudFwiLGNvbXBvbmVudCk7IH1cblxuXHRzZXQoa2V5LHZhbCkgeyB0aGlzLmNvbXBvbmVudC5zZXQoa2V5LHZhbCk7IH1cbiAgICBcbiAgICBhc3luYyBjbG9zZSgpIHtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcbiAgICAgICAgYXdhaXQgdGhpcy5oaWRlKCk7XG4gICAgICAgIGlmIChvcHRpb25zLmNvbnRhaW5zKERpYWxvZ0JveC5PUFRJT05fQkFDS19PTl9DTE9TRSkpIHtcbiAgICAgICAgICAgIE5hdmlnYXRpb24uaW5zdGFuY2UoKS5iYWNrKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbnRhaW5lckV2ZW50fSBldmVudCBcbiAgICAgKiBAcmV0dXJucyBcbiAgICAgKi9cbiAgICBoaWRlKGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmRlc3Ryb3lGb2N1c0VzY2FwZUxpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3lGb2N1c0VzY2FwZUxpc3RlbmVyKCk7XG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3lGb2N1c0VzY2FwZUxpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xuICAgICAgICBpZiAodGhpcy5oaWRkZW4pIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmhpZGRlbiA9IHRydWU7XG4gICAgICAgIHRoaXMuZ2V0RGlhbG9nQm94T3ZlcmxheSgpLnNldEF0dHJpYnV0ZVZhbHVlKFwiY2xhc3NcIiwgXCJkaWFsb2dib3gtb3ZlcmxheSBkaWFsb2dib3gtb3ZlcmxheS1mYWRlXCIpO1xuICAgICAgICBjb25zdCBoaWRlQmFja1NoYWRlUHJvbWlzZSA9IHRoaXMuYmFja1NoYWRlLmhpZGVBZnRlcigzMDApO1xuICAgICAgICBjb25zdCBoaWRlUHJvbWlzZSA9IFRpbWVQcm9taXNlLmFzUHJvbWlzZSgyMDAsICgpID0+IHsgXG4gICAgICAgICAgICAgICAgdGhpcy5nZXREaWFsb2dCb3hPdmVybGF5KCkuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLCBcImRpYWxvZ2JveC1vdmVybGF5IGRpYWxvZ2JveC1vdmVybGF5LWZhZGUgZGlhbG9nYm94LW92ZXJsYXktZGlzcGxheS1ub25lXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgICBjb25zdCBkaXNhYmxlU3R5bGVQcm9taXNlID0gVGltZVByb21pc2UuYXNQcm9taXNlKDIwMSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0RGlhbG9nQm94KCkucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgQ2FudmFzU3R5bGVzLmRpc2FibGVTdHlsZShEaWFsb2dCb3gubmFtZSwgdGhpcy5jb21wb25lbnQuY29tcG9uZW50SW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSB0aGlzLmRlZmF1bHRPcHRpb25zO1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW2hpZGVQcm9taXNlLCBkaXNhYmxlU3R5bGVQcm9taXNlLCBoaWRlQmFja1NoYWRlUHJvbWlzZV0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Q29udGFpbmVyRXZlbnR9IGV2ZW50IFxuICAgICAqIEBwYXJhbSB7QXJyYXk8c3RyaW5nPn0gdGVtcG9yYXJ5T3B0aW9uc1xuICAgICAqIEByZXR1cm5zIFxuICAgICAqL1xuICAgIHNob3coZXZlbnQsIHRlbXBvcmFyeU9wdGlvbnMpIHtcbiAgICAgICAgaWYgKHRoaXMuZGVzdHJveUZvY3VzRXNjYXBlTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZGVzdHJveUZvY3VzRXNjYXBlTGlzdGVuZXIoKTtcbiAgICAgICAgICAgIHRoaXMuZGVzdHJveUZvY3VzRXNjYXBlTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGVzdHJveUZvY3VzRXNjYXBlTGlzdGVuZXIgPSBDYW52YXNSb290Lmxpc3RlblRvRm9jdXNFc2NhcGUoXG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJkaWFsb2dCb3hPdmVybGF5XCIpLCB0aGlzLmNsb3NlLCB0aGlzLCBcbiAgICAgICAgKTtcblxuICAgICAgICBpZiAodGVtcG9yYXJ5T3B0aW9ucykge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zID0gbmV3IExpc3QodGVtcG9yYXJ5T3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgQ2FudmFzUm9vdC5zd2FsbG93Rm9jdXNFc2NhcGUoNTAwKTtcbiAgICAgICAgaWYgKCF0aGlzLmhpZGRlbikge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtyZXNvbHZlKCk7fSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5oaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgQ2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKERpYWxvZ0JveC5uYW1lLCB0aGlzLmNvbXBvbmVudC5jb21wb25lbnRJbmRleCk7XG4gICAgICAgIHRoaXMuYmFja1NoYWRlLnNob3coKTtcbiAgICAgICAgdGhpcy5nZXREaWFsb2dCb3hPdmVybGF5KCkuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLCBcImRpYWxvZ2JveC1vdmVybGF5IGRpYWxvZ2JveC1vdmVybGF5LWZhZGUgZGlhbG9nYm94LW92ZXJsYXktZGlzcGxheS1ibG9ja1wiKTtcbiAgICAgICAgQ2FudmFzUm9vdC5tb3VzZURvd25FbGVtZW50ID0gdGhpcy5jb21wb25lbnQuZ2V0KFwiZGlhbG9nQm94Q29udGVudFwiKS5jb250YWluZXJFbGVtZW50O1xuICAgICAgICByZXR1cm4gVGltZVByb21pc2UuYXNQcm9taXNlKDEwMCwgICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmdldERpYWxvZ0JveE92ZXJsYXkoKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImNsYXNzXCIsIFwiZGlhbG9nYm94LW92ZXJsYXkgZGlhbG9nYm94LW92ZXJsYXktZmFkZSBkaWFsb2dib3gtb3ZlcmxheS1kaXNwbGF5LWJsb2NrIGRpYWxvZ2JveC1vdmVybGF5LXNob3dcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZ2V0RGlhbG9nQm94T3ZlcmxheSgpIHsgcmV0dXJuIHRoaXMuY29tcG9uZW50LmdldChcImRpYWxvZ0JveE92ZXJsYXlcIik7IH1cblxuICAgIGdldERpYWxvZ0JveCgpIHsgcmV0dXJuIHRoaXMuY29tcG9uZW50LmdldChcImRpYWxvZ0JveFwiKTsgfVxuXG4gICAgc2Nyb2xsTG9jaygpIHtcbiAgICAgICAgQ29udGFpbmVyRWxlbWVudFV0aWxzLnNjcm9sbExvY2tUbyh0aGlzLmNvbXBvbmVudC5nZXQoXCJkaWFsb2dCb3hDb250ZW50XCIpLmNvbnRhaW5lckVsZW1lbnQsIDAsIDAsIDEwMDApO1xuICAgIH1cbn1cblxuVHlwZUNvbmZpZ1BhY2suaW5zdGFuY2UoKS5hZGRUeXBlQ29uZmlnKFwibnV0dGluMmMtdWlcIiwgUHJvdG90eXBlQ29uZmlnLnVubmFtZWQoRGlhbG9nQm94KSk7IiwiaW1wb3J0IHsgQ29tcG9uZW50LFxuICAgIENhbnZhc1N0eWxlcyxcbiAgICBTdHlsZVNlbGVjdG9yQWNjZXNzb3IsXG4gICAgU3R5bGVzaGVldEJ1aWxkZXIsXG4gICAgU3R5bGVzaGVldCxcbiAgICBDb21wb25lbnRCdWlsZGVyLFxuICAgIElubGluZUNvbXBvbmVudEZhY3Rvcnlcbn0gZnJvbSBcIm51dHRpbjJjLWNvcmVfdjFcIjtcbmltcG9ydCB7IEluamVjdGlvblBvaW50LCBQcm90b3R5cGVDb25maWcsIFR5cGVDb25maWdQYWNrIH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcblxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIlBhbmVsXCIpO1xuXG5leHBvcnQgY2xhc3MgUGFuZWwge1xuXG4gICAgc3RhdGljIFBBUkFNRVRFUl9TVFlMRV9UWVBFX0NPTFVNTl9ST09UID0gXCJwYW5lbC10eXBlLWNvbHVtbi1yb290XCI7XG4gICAgc3RhdGljIFBBUkFNRVRFUl9TVFlMRV9UWVBFX0NPTFVNTiA9IFwicGFuZWwtdHlwZS1jb2x1bW5cIjtcbiAgICBzdGF0aWMgUEFSQU1FVEVSX1NUWUxFX1RZUEVfUk9XID0gXCJwYW5lbC10eXBlLXJvd1wiO1xuXG4gICAgc3RhdGljIFBBUkFNRVRFUl9TVFlMRV9DT05URU5UX0FMSUdOX0xFRlQgPSBcInBhbmVsLWNvbnRlbnQtYWxpZ24tbGVmdFwiO1xuICAgIHN0YXRpYyBQQVJBTUVURVJfU1RZTEVfQ09OVEVOVF9BTElHTl9SSUdIVCA9IFwicGFuZWwtY29udGVudC1hbGlnbi1yaWdodFwiO1xuICAgIHN0YXRpYyBQQVJBTUVURVJfU1RZTEVfQ09OVEVOVF9BTElHTl9DRU5URVIgPSBcInBhbmVsLWNvbnRlbnQtYWxpZ24tY2VudGVyXCI7XG4gICAgc3RhdGljIFBBUkFNRVRFUl9TVFlMRV9DT05URU5UX0FMSUdOX0pVU1RJRlkgPSBcInBhbmVsLWNvbnRlbnQtYWxpZ24tanVzdGlmeVwiO1xuXG4gICAgc3RhdGljIFBBUkFNRVRFUl9TVFlMRV9TSVpFX0FVVE8gPSBcInBhbmVsLXNpemUtYXV0b1wiO1xuICAgIHN0YXRpYyBQQVJBTUVURVJfU1RZTEVfU0laRV9NSU5JTUFMID0gXCJwYW5lbC1zaXplLW1pbmltYWxcIjtcbiAgICBzdGF0aWMgUEFSQU1FVEVSX1NUWUxFX1NJWkVfUkVTUE9OU0lWRSA9IFwicGFuZWwtc2l6ZS1yZXNwb25zaXZlXCI7XG5cbiAgICBzdGF0aWMgT1BUSU9OX1NUWUxFX0NPTlRFTlRfUEFERElOR19TTUFMTCA9IFwicGFuZWwtY29udGVudC1wYWRkaW5nLXNtYWxsXCI7XG4gICAgc3RhdGljIE9QVElPTl9TVFlMRV9DT05URU5UX1BBRERJTkdfTEFSR0UgPSBcInBhbmVsLWNvbnRlbnQtcGFkZGluZy1sYXJnZVwiO1xuXG4gICAgc3RhdGljIE9QVElPTl9TVFlMRV9CT1JERVJfU0hBRE9XID0gXCJwYW5lbC1ib3JkZXItc2hhZG93XCI7XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZSBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29udGVudEFsaWduIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzaXplIFxuICAgICAqIEBwYXJhbSB7QXJyYXk8c3RyaW5nPn0gb3B0aW9ucyBcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih0eXBlID0gUGFuZWwuUEFSQU1FVEVSX1NUWUxFX1RZUEVfQ09MVU1OX1JPT1QsXG4gICAgICAgIGNvbnRlbnRBbGlnbiA9IFBhbmVsLlBBUkFNRVRFUl9TVFlMRV9DT05URU5UX0FMSUdOX0NFTlRFUixcbiAgICAgICAgc2l6ZSA9IFBhbmVsLlBBUkFNRVRFUl9TVFlMRV9TSVpFX0FVVE8sXG4gICAgICAgIG9wdGlvbnMgPSBbXSkge1xuXG4gICAgICAgIC8qKiBAdHlwZSB7SW5saW5lQ29tcG9uZW50RmFjdG9yeX0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoSW5saW5lQ29tcG9uZW50RmFjdG9yeSk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnR9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gbnVsbDtcblxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcblxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5jb250ZW50QWxpZ24gPSBjb250ZW50QWxpZ247XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMuc2l6ZSA9IHNpemU7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtBcnJheTxTdHJpbmc+fSAqL1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHlsZXNoZWV0QnVpbGRlcn0gc3R5bGVzaGVldEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMge1N0eWxlc2hlZXR9XG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkU3R5bGVzaGVldChzdHlsZXNoZWV0QnVpbGRlcikge1xuICAgICAgICByZXR1cm4gc3R5bGVzaGVldEJ1aWxkZXJcbiAgICAgICAgICAgIC5tZWRpYShcIkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1pbi13aWR0aDogODUwcHQpXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBhbmVsLXNpemUtcmVzcG9uc2l2ZVwiKVxuICAgICAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwiZmxleC1iYXNpc1wiLCBcIjEwMCVcIilcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwibWluLXdpZHRoXCIsIFwiODAwcHRcIilcbiAgICAgICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLm1lZGlhKFwiQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA4NDlwdClcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc2VsZWN0b3IoXCIucGFuZWwtc2l6ZS1yZXNwb25zaXZlXCIpXG4gICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJmbGV4LWJhc2lzXCIsIFwiMTAwJVwiKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoXCJtaW4td2lkdGhcIiwgXCI1MDBwdFwiKVxuICAgICAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAubWVkaWEoXCJAbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDUwMHB0KVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zZWxlY3RvcihcIi5wYW5lbC1zaXplLXJlc3BvbnNpdmVcIilcbiAgICAgICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcImZsZXgtYmFzaXNcIiwgXCIxMDAlXCIpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcIm1pbi13aWR0aFwiLCBcIjEwMCVcIilcbiAgICAgICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBhbmVsLXR5cGUtY29sdW1uLXJvb3RcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIFwiZmxleFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZsZXgtZGlyZWN0aW9uXCIsIFwiY29sdW1uXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm94LXNpemluZ1wiLCBcImJvcmRlci1ib3hcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJoZWlnaHRcIiwgXCIxMDAlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyXCIsIFwiMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpblwiLCBcIjBcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5wYW5lbC10eXBlLWNvbHVtblwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgXCJmbGV4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZmxleC1kaXJlY3Rpb25cIiwgXCJjb2x1bW5cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3gtc2l6aW5nXCIsIFwiYm9yZGVyLWJveFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpblwiLCBcIjBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXJcIiwgXCIwXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucGFuZWwtdHlwZS1yb3dcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIFwiZmxleFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZsZXgtZGlyZWN0aW9uXCIsIFwicm93XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm94LXNpemluZ1wiLCBcImJvcmRlci1ib3hcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW5cIiwgXCIwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyXCIsIFwiMFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBhbmVsLWNvbnRlbnQtYWxpZ24tbGVmdFwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImp1c3RpZnktY29udGVudFwiLCBcImxlZnRcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5wYW5lbC1jb250ZW50LWFsaWduLXJpZ2h0XCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwianVzdGlmeS1jb250ZW50XCIsIFwicmlnaHRcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5wYW5lbC1jb250ZW50LWFsaWduLWNlbnRlclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImFsaWduLWl0ZW1zXCIsIFwiY2VudGVyXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwianVzdGlmeS1jb250ZW50XCIsIFwiY2VudGVyXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucGFuZWwtY29udGVudC1hbGlnbi1qdXN0aWZ5XCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwianVzdGlmeS1jb250ZW50XCIsIFwic3BhY2UtYmV0d2VlblwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBhbmVsLXNpemUtYXV0b1wiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZsZXgtZ3Jvd1wiLCBcIjFcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmbGV4LXNocmlua1wiLCBcIjBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmbGV4LWJhc2lzXCIsIFwiYXV0b1wiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBhbmVsLXNpemUtbWluaW1hbFwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZsZXgtZ3Jvd1wiLCBcIjBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmbGV4LXNocmlua1wiLCBcIjBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmbGV4LWJhc2lzXCIsIFwiYXV0b1wiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBhbmVsLWNvbnRlbnQtcGFkZGluZy1zbWFsbFwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmdcIiwgXCIycHRcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5wYW5lbC1jb250ZW50LXBhZGRpbmctbGFyZ2VcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwYWRkaW5nXCIsIFwiNnB0XCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucGFuZWwtYm9yZGVyLXNoYWRvd1wiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJveC1zaGFkb3dcIiwgXCIwIDFweCA4cHggcmdiYSgwLDAsMCwwLjUpXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuYnVpbGQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudEJ1aWxkZXJ9IGNvbXBvbmVudEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMge0NvbXBvbmVudH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRDb21wb25lbnQoY29tcG9uZW50QnVpbGRlcikge1xuICAgICAgICByZXR1cm4gY29tcG9uZW50QnVpbGRlclxuICAgICAgICAgICAgLnJvb3QoXCJkaXZcIiwgXCJpZD1wYW5lbFwiKVxuICAgICAgICAgICAgLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgcG9zdENvbmZpZygpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKFBhbmVsKTtcbiAgICAgICAgQ2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKFBhbmVsLm5hbWUpO1xuXG4gICAgICAgIFN0eWxlU2VsZWN0b3JBY2Nlc3Nvci5mcm9tKHRoaXMuY29tcG9uZW50LmdldChcInBhbmVsXCIpKVxuICAgICAgICAgICAgLmVuYWJsZSh0aGlzLnR5cGUpXG4gICAgICAgICAgICAuZW5hYmxlKHRoaXMuY29udGVudEFsaWduKVxuICAgICAgICAgICAgLmVuYWJsZSh0aGlzLnNpemUpO1xuICAgIH1cblxufVxuXG5UeXBlQ29uZmlnUGFjay5pbnN0YW5jZSgpLmFkZFR5cGVDb25maWcoXCJudXR0aW4yYy11aVwiLCBQcm90b3R5cGVDb25maWcudW5uYW1lZChQYW5lbCkpOyIsImltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBDb21wb25lbnRCdWlsZGVyLCBJbmxpbmVDb21wb25lbnRGYWN0b3J5IH0gZnJvbSBcIm51dHRpbjJjLWNvcmVfdjFcIjtcbmltcG9ydCB7IEluamVjdGlvblBvaW50LCBQcm90b3R5cGVDb25maWcsIFR5cGVDb25maWdQYWNrIH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5cbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJMaW5lUGFuZWxFbnRyeVwiKTtcblxuZXhwb3J0IGNsYXNzIExpbmVQYW5lbEVudHJ5IHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuXG5cdFx0LyoqIEB0eXBlIHtJbmxpbmVDb21wb25lbnRGYWN0b3J5fSAqL1xuXHRcdHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKElubGluZUNvbXBvbmVudEZhY3RvcnkpO1xuXG5cdFx0LyoqIEB0eXBlIHtDb21wb25lbnR9ICovXG5cdFx0dGhpcy5jb21wb25lbnQgPSBudWxsO1xuXG4gICAgfVxuXG5cdC8qKlxuXHQgKiBcblx0ICogQHBhcmFtIHtDb21wb25lbnRCdWlsZGVyfSBjb21wb25lbnRCdWlsZGVyIFxuXHQgKiBAcmV0dXJucyB7Q29tcG9uZW50fVxuXHQgKi9cblx0c3RhdGljIGJ1aWxkQ29tcG9uZW50KGNvbXBvbmVudEJ1aWxkZXIpIHtcblx0XHRyZXR1cm4gY29tcG9uZW50QnVpbGRlclxuXHRcdFx0LnJvb3QoXCJkaXZcIiwgXCJpZD1yZWNvcmRFbGVtZW50XCIsIFwiY2xhc3M9Y250ciBjbnRyLWNvbHVtbnMgY250ci1nYXAtc21hbGxcIilcblx0XHRcdC5idWlsZCgpO1xuXHR9XG5cbiAgICBhc3luYyBwb3N0Q29uZmlnKCkge1xuXHRcdHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZShMaW5lUGFuZWxFbnRyeSk7XG4gICAgfVxuXG5cbn1cblxuVHlwZUNvbmZpZ1BhY2suaW5zdGFuY2UoKS5hZGRUeXBlQ29uZmlnKFwibnV0dGluMmMtdWlcIiwgUHJvdG90eXBlQ29uZmlnLnVubmFtZWQoTGluZVBhbmVsRW50cnkpKTsiLCJpbXBvcnQgeyBMb2dnZXIsIE1ldGhvZCB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQsIFByb3RvdHlwZUNvbmZpZywgUHJvdmlkZXIsIFR5cGVDb25maWdQYWNrIH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5pbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50TWFuYWdlciwgU3RhdGVNYW5hZ2VyLCBJbmxpbmVDb21wb25lbnRGYWN0b3J5LCBDb21wb25lbnRCdWlsZGVyIH0gZnJvbSBcIm51dHRpbjJjLWNvcmVfdjFcIjtcbmltcG9ydCB7IFBhbmVsIH0gZnJvbSBcIi4uL3BhbmVsL3BhbmVsLmpzXCI7XG5pbXBvcnQgeyBMaW5lUGFuZWxFbnRyeSB9IGZyb20gXCIuL2xpbmVQYW5lbEVudHJ5L2xpbmVQYW5lbEVudHJ5LmpzXCI7XG5pbXBvcnQgeyBDb250YWluZXJFdmVudCB9IGZyb20gXCJjb250YWluZXJicmlkZ2VfdjFcIjtcblxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIkxpbmVQYW5lbFwiKTtcblxuZXhwb3J0IGNsYXNzIExpbmVQYW5lbCB7XG5cblx0c3RhdGljIEVWRU5UX1JFRlJFU0hfQ0xJQ0tFRCA9IFwicmVmcmVzaENsaWNrZWRcIjtcblx0c3RhdGljIFJFQ09SRF9FTEVNRU5UX1JFUVVFU1RFRCA9IFwicmVjb3JkRWxlbWVudFJlcXVlc3RlZFwiO1xuXHRzdGF0aWMgUkVDT1JEU19TVEFURV9VUERBVEVfUkVRVUVTVEVEID0gXCJyZWNvcmRzU3RhdGVVcGRhdGVSZXF1ZXN0ZWRcIjtcblxuXHQvKipcblx0ICogXG5cdCAqIEBwYXJhbSB7UGFuZWx9IGJ1dHRvblBhbmVsIFxuXHQgKi9cblx0Y29uc3RydWN0b3IoYnV0dG9uUGFuZWwgPSBudWxsKSB7XG5cblx0XHQvKiogQHR5cGUge0lubGluZUNvbXBvbmVudEZhY3Rvcnl9ICovXG5cdFx0dGhpcy5jb21wb25lbnRGYWN0b3J5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoSW5saW5lQ29tcG9uZW50RmFjdG9yeSk7XG5cdFx0XG5cdFx0LyoqIEB0eXBlIHtDb21wb25lbnR9ICovXG5cdFx0dGhpcy5jb21wb25lbnQgPSBudWxsO1xuXG5cdFx0LyoqIEB0eXBlIHtFdmVudE1hbmFnZXJ9ICovXG5cdFx0dGhpcy5ldmVudHMgPSBuZXcgRXZlbnRNYW5hZ2VyKCk7XG5cblx0XHQvKiogQHR5cGUge1Byb3ZpZGVyPExpbmVQYW5lbEVudHJ5Pn0gKi9cblx0XHR0aGlzLmxpbmVQYW5lbEVudHJ5UHJvdmlkZXIgPSBJbmplY3Rpb25Qb2ludC5wcm92aWRlcihMaW5lUGFuZWxFbnRyeSk7XG5cblx0XHQvKiogQHR5cGUge1Byb3ZpZGVyPFBhbmVsPn0gKi9cblx0XHR0aGlzLnBhbmVsUHJvdmlkZXIgPSBJbmplY3Rpb25Qb2ludC5wcm92aWRlcihQYW5lbCk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtTdGF0ZU1hbmFnZXI8YW55W10+fSAqL1xuICAgICAgICB0aGlzLmFycmF5U3RhdGUgPSBuZXcgU3RhdGVNYW5hZ2VyKCk7XG5cblx0XHQvKiogQHR5cGUge1BhbmVsfSAqL1xuXHRcdHRoaXMuYnV0dG9uUGFuZWwgPSBidXR0b25QYW5lbDtcblxuXHR9XG5cblx0LyoqXG5cdCAqIEBwYXJhbSB7Q29tcG9uZW50QnVpbGRlcn0gY29tcG9uZW50QnVpbGRlciBcblx0ICogQHJldHVybnMge0NvbXBvbmVudH1cblx0ICovXG5cdHN0YXRpYyBidWlsZENvbXBvbmVudChjb21wb25lbnRCdWlsZGVyKSB7XG5cdFx0cmV0dXJuIGNvbXBvbmVudEJ1aWxkZXJcblx0XHRcdC5yb290KFwiZGl2XCIsIFwiY2xhc3M9Y250ciBjbnRyLWdhcC1tZWRpdW0gY250ci1yb3dzIGNudHItcHJldmVudC1zaXplLWNoYW5nZSBwYWRkaW5nLXNtYWxsXCIpXG5cdFx0XHQub3BlbigpXG5cdFx0XHRcdC5ub2RlKFwiZGl2XCIsIFwiaWQ9YnV0dG9uUGFuZWxcIilcblx0XHRcdFx0Lm5vZGUoXCJkaXZcIiwgXCJpZD1yZWNvcmRFbGVtZW50c1wiLCBcImNsYXNzPWNudHItb3ZlcnJpZGUtZ3Jvdy1vbmx5IGNudHIgY250ci1yb3dzIGNudHItZ2FwLXNtYWxsXCIpXG5cdFx0XHQuY2xvc2UoKVxuXHRcdFx0LmJ1aWxkKCk7XG5cdH1cblxuXHRhc3luYyBwb3N0Q29uZmlnKCkge1xuXHRcdHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZShMaW5lUGFuZWwpO1xuXG5cdFx0aWYgKHRoaXMuYnV0dG9uUGFuZWwpIHtcblx0XHRcdHRoaXMuY29tcG9uZW50LnNldENoaWxkKFwiYnV0dG9uUGFuZWxcIiwgdGhpcy5idXR0b25QYW5lbC5jb21wb25lbnQpO1xuXHRcdH1cblxuXHRcdHRoaXMuYXJyYXlTdGF0ZS5yZWFjdChuZXcgTWV0aG9kKHRoaXMuaGFuZGxlQXJyYXlTdGF0ZSwgdGhpcykpO1xuXG5cdH1cblxuXHQvKipcblx0ICogUmVzZXRcblx0ICogXG5cdCAqIEBwYXJhbSB7Q29udGFpbmVyRXZlbnR9IGV2ZW50IFxuXHQgKi9cblx0YXN5bmMgcmVzZXQoZXZlbnQpIHtcblx0XHR0aGlzLmV2ZW50cy50cmlnZ2VyKExpbmVQYW5lbC5SRUNPUkRTX1NUQVRFX1VQREFURV9SRVFVRVNURUQsIFtldmVudCwgdGhpcy5hcnJheVN0YXRlXSk7XG5cdH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFxuICAgICAqL1xuICAgIGFzeW5jIGhhbmRsZUFycmF5U3RhdGUoYXJyYXkpIHtcblx0XHR0aGlzLmNvbXBvbmVudC5jbGVhckNoaWxkcmVuKFwicmVjb3JkRWxlbWVudHNcIik7XG5cdFx0YXJyYXkuZm9yRWFjaChhc3luYyAocmVjb3JkKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudC5hZGRDaGlsZChcInJlY29yZEVsZW1lbnRzXCIsIGF3YWl0IHRoaXMucG9wdWxhdGVSZWNvcmQocmVjb3JkKSk7XG4gICAgICAgIH0pO1x0XHRcbiAgICB9XG5cblx0LyoqXG4gICAgICogQHBhcmFtIHthbnl9IHJlY29yZCBcbiAgICAgKi9cbiAgICBhc3luYyBwb3B1bGF0ZVJlY29yZChyZWNvcmQpIHtcbiAgICAgICAgY29uc3QgcmVjb3JkRWxlbWVudCA9IGF3YWl0IHRoaXMuZXZlbnRzLnRyaWdnZXIoTGluZVBhbmVsLlJFQ09SRF9FTEVNRU5UX1JFUVVFU1RFRCwgW251bGwsIHJlY29yZF0pO1xuICAgICAgICBcblx0XHRpZiAoIXJlY29yZEVsZW1lbnQpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRjb25zdCBsaW5lUGFuZWxFbnRyeSA9IGF3YWl0IHRoaXMubGluZVBhbmVsRW50cnlQcm92aWRlci5nZXQoW3RydWUsIHJlY29yZF0pO1xuXHRcdGxpbmVQYW5lbEVudHJ5LmNvbXBvbmVudC5zZXRDaGlsZChcInJlY29yZEVsZW1lbnRcIiwgcmVjb3JkRWxlbWVudC5jb21wb25lbnQpO1xuXG5cdFx0cmV0dXJuIGxpbmVQYW5lbEVudHJ5LmNvbXBvbmVudDtcbiAgICB9XG59XG5cblR5cGVDb25maWdQYWNrLmluc3RhbmNlKCkuYWRkVHlwZUNvbmZpZyhcIm51dHRpbjJjLXVpXCIsIFByb3RvdHlwZUNvbmZpZy51bm5hbWVkKExpbmVQYW5lbCkpOyIsImltcG9ydCB7IE1ldGhvZCwgTG9nZ2VyIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5pbXBvcnQgeyBJbnB1dEVsZW1lbnREYXRhQmluZGluZywgQWJzdHJhY3RWYWxpZGF0b3IsIFRlbXBsYXRlQ29tcG9uZW50RmFjdG9yeSwgQ2FudmFzU3R5bGVzLCBDb21wb25lbnQsIEV2ZW50TWFuYWdlciwgSW5saW5lQ29tcG9uZW50RmFjdG9yeSwgU3R5bGVBY2Nlc3NvciwgU3R5bGVTZWxlY3RvckFjY2Vzc29yIH0gZnJvbSBcIm51dHRpbjJjLWNvcmVfdjFcIjtcbmltcG9ydCB7IEluamVjdGlvblBvaW50IH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5pbXBvcnQgeyBDb21tb25FdmVudHMgfSBmcm9tIFwiLi4vY29tbW9uL2NvbW1vbkV2ZW50c1wiO1xuaW1wb3J0IHsgQ29udGFpbmVyRXZlbnQgfSBmcm9tIFwiY29udGFpbmVyYnJpZGdlX3YxXCI7XG5pbXBvcnQgeyBCYW5uZXJNZXNzYWdlIH0gZnJvbSBcIi4uL2Jhbm5lck1lc3NhZ2UvYmFubmVyTWVzc2FnZS5qc1wiO1xuaW1wb3J0IHsgQnViYmxlTWVzc2FnZSB9IGZyb20gXCIuLi9idWJibGVNZXNzYWdlL2J1YmJsZU1lc3NhZ2UuanNcIjtcblxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIkNvbW1vbklucHV0XCIpO1xuXG5leHBvcnQgY2xhc3MgQ29tbW9uSW5wdXQge1xuXG4gICAgc3RhdGljIEVWRU5UX0NMSUNLRUQgPSBDb21tb25FdmVudHMuQ0xJQ0tFRDtcbiAgICBzdGF0aWMgRVZFTlRfRU5URVJFRCA9IENvbW1vbkV2ZW50cy5FTlRFUkVEO1xuICAgIHN0YXRpYyBFVkVOVF9LRVlVUFBFRCA9IENvbW1vbkV2ZW50cy5LRVlVUFBFRDtcbiAgICBzdGF0aWMgRVZFTlRfQ0hBTkdFRCA9IENvbW1vbkV2ZW50cy5DSEFOR0VEO1xuICAgIHN0YXRpYyBFVkVOVF9CTFVSUkVEID0gQ29tbW9uRXZlbnRzLkJMVVJSRUQ7XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjb21wb25lbnRDbGFzc1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG1vZGVsXG4gICAgICogQHBhcmFtIHtBYnN0cmFjdFZhbGlkYXRvcn0gdmFsaWRhdG9yXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBsYWNlaG9sZGVyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlucHV0RWxlbWVudElkXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGVycm9yRWxlbWVudElkXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY29tcG9uZW50Q2xhc3MsXG4gICAgICAgIG5hbWUsXG4gICAgICAgIG1vZGVsID0gbnVsbCxcbiAgICAgICAgdmFsaWRhdG9yID0gbnVsbCwgXG4gICAgICAgIGxhYmVsID0gbnVsbCxcbiAgICAgICAgZXJyb3JNZXNzYWdlID0gXCJJbnZhbGlkIHZhbHVlXCIsXG4gICAgICAgIGVycm9yTWVzc2FnZUxpc3RJdGVtcyA9IFtdKSB7XG5cblxuICAgICAgICAvKiogQHR5cGUge0lubGluZUNvbXBvbmVudEZhY3Rvcnl9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKElubGluZUNvbXBvbmVudEZhY3RvcnkpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IG51bGw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtBYnN0cmFjdFZhbGlkYXRvcn0gKi9cbiAgICAgICAgdGhpcy52YWxpZGF0b3IgPSB2YWxpZGF0b3I7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtGdW5jdGlvbn0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnRDbGFzcyA9IGNvbXBvbmVudENsYXNzO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLmxhYmVsID0gbGFiZWw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtvYmplY3R9ICovXG4gICAgICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcblxuICAgICAgICAvKiogQHR5cGUge2Jvb2xlYW59ICovXG4gICAgICAgIHRoaXMudGFpbnRlZCA9IGZhbHNlO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7RXZlbnRNYW5hZ2VyfSAqL1xuICAgICAgICB0aGlzLmV2ZW50cyA9IG5ldyBFdmVudE1hbmFnZXIoKTtcblxuICAgICAgICAvKiogQHR5cGUge0lucHV0RWxlbWVudERhdGFCaW5kaW5nfSAqL1xuICAgICAgICB0aGlzLmRhdGFCaW5kaW5nID0gbnVsbDtcblxuICAgICAgICAvKiogQHR5cGUge0J1YmJsZU1lc3NhZ2V9ICovXG4gICAgICAgIHRoaXMuYnViYmxlTWVzc2FnZSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKEJ1YmJsZU1lc3NhZ2UsIFtlcnJvck1lc3NhZ2UsIGVycm9yTWVzc2FnZUxpc3RJdGVtc10pO1xuICAgIH1cblxuICAgIHBvc3RDb25maWcoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZSh0aGlzLmNvbXBvbmVudENsYXNzKTtcblxuICAgICAgICBDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUodGhpcy5jb21wb25lbnRDbGFzcy5uYW1lLCB0aGlzLmNvbXBvbmVudC5jb21wb25lbnRJbmRleCk7XG5cbiAgICAgICAgdGhpcy5idWJibGVNZXNzYWdlLmhpZGUoKTtcblxuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJpbnB1dFwiKS5zZXRBdHRyaWJ1dGVWYWx1ZShcIm5hbWVcIiwgdGhpcy5uYW1lKTtcbiAgICAgICAgaWYgKHRoaXMuY29tcG9uZW50LmdldChcImJ1YmJsZU1lc3NhZ2VcIikpIHtcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50LnNldChcImJ1YmJsZU1lc3NhZ2VcIiwgdGhpcy5idWJibGVNZXNzYWdlLmNvbXBvbmVudCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBsYWJlbCA9IHRoaXMuY29tcG9uZW50LmdldChcImxhYmVsXCIpO1xuICAgICAgICBjb25zdCBpbnB1dCA9IHRoaXMuY29tcG9uZW50LmdldChcImlucHV0XCIpO1xuXG4gICAgICAgIGlmICh0aGlzLmxhYmVsICYmIGxhYmVsKSB7XG4gICAgICAgICAgICBsYWJlbC5zZXRBdHRyaWJ1dGVWYWx1ZShcImZvclwiLCBpbnB1dC5nZXRBdHRyaWJ1dGVWYWx1ZShcImlkXCIpKTtcbiAgICAgICAgICAgIGxhYmVsLnNldENoaWxkKHRoaXMubGFiZWwpO1xuICAgICAgICAgICAgU3R5bGVTZWxlY3RvckFjY2Vzc29yLmZyb20obGFiZWwpLmRpc2FibGUoXCJoaWRkZW5cIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy52YWxpZGF0b3IpIHtcbiAgICAgICAgICAgIHRoaXMudmFsaWRhdG9yLndpdGhWYWxpZExpc3RlbmVyKG5ldyBNZXRob2QodGhpcy5idWJibGVNZXNzYWdlLmhpZGUsIHRoaXMuYnViYmxlTWVzc2FnZSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYodGhpcy5tb2RlbCkge1xuICAgICAgICAgICAgdGhpcy5kYXRhQmluZGluZyA9IElucHV0RWxlbWVudERhdGFCaW5kaW5nLmxpbmsodGhpcy5tb2RlbCwgdGhpcy52YWxpZGF0b3IpLnRvKGlucHV0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlucHV0XG4gICAgICAgICAgICAubGlzdGVuVG8oXCJrZXl1cFwiLCB0aGlzLmtleXVwcGVkLCB0aGlzKVxuICAgICAgICAgICAgLmxpc3RlblRvKFwiY2hhbmdlXCIsIHRoaXMuY2hhbmdlZCwgdGhpcylcbiAgICAgICAgICAgIC5saXN0ZW5UbyhcImJsdXJcIiwgdGhpcy5ibHVycmVkLCB0aGlzKVxuICAgICAgICAgICAgLmxpc3RlblRvKFwiY2xpY2tcIiwgdGhpcy5jbGlja2VkLCB0aGlzKVxuICAgICAgICAgICAgLmxpc3RlblRvKFwia2V5dXBcIiwgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LmlzS2V5Q29kZSgxMykpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbnRlcmVkKGV2ZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCB0aGlzKTtcblxuICAgICAgICBpZiAodGhpcy5jb21wb25lbnQuZ2V0KFwiYnViYmxlTWVzc2FnZVwiKSkge1xuICAgICAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYnViYmxlTWVzc2FnZVwiKS5saXN0ZW5UbyhcImNsaWNrXCIsIHRoaXMuZXJyb3JDbGlja2VkLCB0aGlzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCB2YWx1ZSgpIHsgXG4gICAgICAgIC8qKiBAdHlwZSB7SFRNTElucHV0RWxlbWVudH0gKi9cbiAgICAgICAgY29uc3QgaW5wdXQgPSB0aGlzLmNvbXBvbmVudC5nZXQoXCJpbnB1dFwiKTtcbiAgICAgICAgcmV0dXJuIGlucHV0LnZhbHVlO1xuICAgIH1cblxuICAgIHNldCB2YWx1ZSh2YWx1ZSkge1xuICAgICAgICAvKiogQHR5cGUge0hUTUxJbnB1dEVsZW1lbnR9ICovXG4gICAgICAgIGNvbnN0IGlucHV0ID0gdGhpcy5jb21wb25lbnQuZ2V0KFwiaW5wdXRcIik7XG4gICAgICAgIGlucHV0LnZhbHVlID0gdmFsdWU7XG4gICAgICAgIGlmICh0aGlzLmRhdGFCaW5kaW5nKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGFCaW5kaW5nLnB1c2goKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Q29udGFpbmVyRXZlbnR9IGV2ZW50IFxuICAgICAqL1xuICAgIGtleXVwcGVkKGV2ZW50KSB7XG4gICAgICAgIGlmICghZXZlbnQuaXNLZXlDb2RlKDEzKSAmJiAhZXZlbnQuaXNLZXlDb2RlKDE2KSAmJiAhZXZlbnQuaXNLZXlDb2RlKDkpKSB7XG4gICAgICAgICAgICB0aGlzLnRhaW50ZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChcIlwiID09PSBldmVudC50YXJnZXRWYWx1ZSkge1xuICAgICAgICAgICAgdGhpcy50YWludGVkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5ldmVudHMudHJpZ2dlcihDb21tb25JbnB1dC5FVkVOVF9LRVlVUFBFRCwgZXZlbnQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Q29udGFpbmVyRXZlbnR9IGV2ZW50IFxuICAgICAqL1xuICAgIGNoYW5nZWQoZXZlbnQpIHtcbiAgICAgICAgdGhpcy50YWludGVkID0gdHJ1ZTtcbiAgICAgICAgaWYgKFwiXCIgPT09IGV2ZW50LnRhcmdldFZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnRhaW50ZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmV2ZW50cy50cmlnZ2VyKENvbW1vbklucHV0LkVWRU5UX0NIQU5HRUQsIGV2ZW50KTtcbiAgICB9XG5cbiAgICBjbGlja2VkKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuZXZlbnRzLnRyaWdnZXIoQ29tbW9uSW5wdXQuRVZFTlRfQ0xJQ0tFRCwgZXZlbnQpO1xuICAgIH1cblxuICAgIGVudGVyZWQoZXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLnZhbGlkYXRvci5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgIHRoaXMuYnViYmxlTWVzc2FnZS5zaG93KCk7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdEFsbCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZXZlbnRzLnRyaWdnZXIoQ29tbW9uSW5wdXQuRVZFTlRfRU5URVJFRCwgZXZlbnQpO1xuICAgIH1cblxuICAgIGJsdXJyZWQoZXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLnRhaW50ZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMudmFsaWRhdG9yLmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgdGhpcy5idWJibGVNZXNzYWdlLnNob3coKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmJ1YmJsZU1lc3NhZ2UuaGlkZSgpO1xuICAgICAgICB0aGlzLmV2ZW50cy50cmlnZ2VyKENvbW1vbklucHV0LkVWRU5UX0JMVVJSRUQsIGV2ZW50KTtcbiAgICB9XG5cbiAgICBlcnJvckNsaWNrZWQoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5idWJibGVNZXNzYWdlLmhpZGUoKTtcbiAgICB9XG5cbiAgICBmb2N1cygpIHsgdGhpcy5jb21wb25lbnQuZ2V0KFwiaW5wdXRcIikuZm9jdXMoKTsgfVxuICAgIHNlbGVjdEFsbCgpIHsgdGhpcy5jb21wb25lbnQuZ2V0KFwiaW5wdXRcIikuc2VsZWN0QWxsKCk7IH1cbiAgICBlbmFibGUoKSB7IHRoaXMuY29tcG9uZW50LmdldChcImlucHV0XCIpLmVuYWJsZSgpOyB9XG4gICAgZGlzYWJsZSgpIHsgdGhpcy5jb21wb25lbnQuZ2V0KFwiaW5wdXRcIikuZGlzYWJsZSgpOyB9XG4gICAgY2xlYXIoKSB7IHRoaXMuY29tcG9uZW50LmdldChcImlucHV0XCIpLnZhbHVlID0gXCJcIjsgdGhpcy50YWludGVkID0gZmFsc2U7IHRoaXMuYnViYmxlTWVzc2FnZS5oaWRlKCk7IH1cblxufSIsImltcG9ydCB7XG4gICAgQ2FudmFzU3R5bGVzLFxuICAgIENvbXBvbmVudCxcbiAgICBFdmVudE1hbmFnZXIsXG4gICAgU3R5bGVTZWxlY3RvckFjY2Vzc29yLFxuICAgIFN0eWxlc2hlZXRCdWlsZGVyLFxuICAgIENvbXBvbmVudEJ1aWxkZXIsXG4gICAgU3R5bGVzaGVldCxcbiAgICBJbmxpbmVDb21wb25lbnRGYWN0b3J5XG59IGZyb20gXCJudXR0aW4yYy1jb3JlX3YxXCI7XG5pbXBvcnQgeyBJbmplY3Rpb25Qb2ludCwgUHJvdG90eXBlQ29uZmlnLCBUeXBlQ29uZmlnUGFjayB9IGZyb20gXCJtaW5kaV92MVwiO1xuaW1wb3J0IHsgTG9nZ2VyLCBNZXRob2QgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcbmltcG9ydCB7IENvbW1vbkV2ZW50cyB9IGZyb20gXCIuLi9jb21tb24vY29tbW9uRXZlbnRzXCI7XG5cbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJMaW5rUGFuZWxcIik7XG5cbmV4cG9ydCBjbGFzcyBMaW5rUGFuZWwge1xuXG4gICAgc3RhdGljIEVWRU5UX0NMSUNLRUQgPSBDb21tb25FdmVudHMuQ0xJQ0tFRDtcblxuICAgIHN0YXRpYyBTSVpFX1NNQUxMID0gXCJsaW5rLXBhbmVsLXNtYWxsXCI7XG4gICAgc3RhdGljIFNJWkVfTUVESVVNID0gXCJsaW5rLXBhbmVsLW1lZGl1bVwiO1xuICAgIHN0YXRpYyBTSVpFX0xBUkdFID0gXCJsaW5rLXBhbmVsLWxhcmdlXCI7XG5cbiAgICBzdGF0aWMgT1JJRU5UQVRJT05fRkxBVCA9IFwibGluay1wYW5lbC1mbGF0XCI7XG4gICAgc3RhdGljIE9SSUVOVEFUSU9OX1NUQUNLRUQgPSBcImxpbmstcGFuZWwtc3RhY2tlZFwiO1xuXG4gICAgc3RhdGljIFRIRU1FX0RBUksgPSBcImxpbmstcGFuZWwtZGFya1wiO1xuICAgIHN0YXRpYyBUSEVNRV9MSUdIVCA9IFwibGluay1wYW5lbC1saWdodFwiO1xuICAgIHN0YXRpYyBUSEVNRV9EQU5HRVIgPSBcImxpbmstcGFuZWwtZGFuZ2VyXCI7XG4gICAgc3RhdGljIFRIRU1FX0lORk8gPSBcImxpbmstcGFuZWwtaW5mb1wiO1xuICAgIHN0YXRpYyBUSEVNRV9TVUNDRVNTID0gXCJsaW5rLXBhbmVsLXN1Y2Nlc3NcIjtcblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBsYWJlbFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpY29uXG4gICAgICovXG4gICAgY29uc3RydWN0b3IobGFiZWwsIGljb24sIHRoZW1lID0gTGlua1BhbmVsLlRIRU1FX0RBUkssIG9yaWVudGF0aW9uID0gTGlua1BhbmVsLk9SSUVOVEFUSU9OX0ZMQVQsIHNpemUgPSBMaW5rUGFuZWwuU0laRV9TTUFMTCkge1xuXG4gICAgICAgIC8qKiBAdHlwZSB7SW5saW5lQ29tcG9uZW50RmFjdG9yeX0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoSW5saW5lQ29tcG9uZW50RmFjdG9yeSk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnR9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gbnVsbDtcblxuICAgICAgICAvKiogQHR5cGUge1N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5sYWJlbCA9IGxhYmVsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7U3RyaW5nfSAqL1xuICAgICAgICB0aGlzLmljb24gPSBpY29uO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7U3RyaW5nfSAqL1xuICAgICAgICB0aGlzLm9yaWVudGF0aW9uID0gb3JpZW50YXRpb247XG5cbiAgICAgICAgLyoqIEB0eXBlIHtTdHJpbmd9ICovXG4gICAgICAgIHRoaXMuc2l6ZSA9IHNpemU7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtTdHJpbmd9ICovXG4gICAgICAgIHRoaXMudGhlbWUgPSB0aGVtZTtcblxuICAgICAgICAvKiogQHR5cGUge0V2ZW50TWFuYWdlcn0gKi9cbiAgICAgICAgdGhpcy5ldmVudHMgPSBuZXcgRXZlbnRNYW5hZ2VyKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHlsZXNoZWV0QnVpbGRlcn0gc3R5bGVzaGVldEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMge1N0eWxlc2hlZXR9XG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkU3R5bGVzaGVldChzdHlsZXNoZWV0QnVpbGRlcikge1xuICAgICAgICByZXR1cm4gc3R5bGVzaGVldEJ1aWxkZXJcbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5saW5rLXBhbmVsXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLCBcImZsZXhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJhbGlnbi1pdGVtc1wiLCBcInN0cmV0Y2hcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW5cIiwgXCIycHRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItcmFkaXVzXCIsIFwiNXB0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY3Vyc29yXCIsIFwicG9pbnRlclwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmdcIiwgXCIwLjc1cmVtIDAuNzVyZW1cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ1c2VyLXNlbGVjdFwiLCBcIm5vbmVcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5saW5rLXBhbmVsLWZsYXRcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmbGV4LWRpcmVjdGlvblwiLCBcInJvd1wiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmxpbmstcGFuZWwtZmxhdCA+IC5saW5rLXBhbmVsLWljb25cIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLCBcIjJyZW1cIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5saW5rLXBhbmVsLXN0YWNrZWRcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmbGV4LWRpcmVjdGlvblwiLCBcImNvbHVtblwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmxpbmstcGFuZWwtc21hbGxcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmb250LXNpemVcIiwgXCIxcmVtXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIubGluay1wYW5lbC1tZWRpdW1cIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmb250LXNpemVcIiwgXCIxLjJyZW1cIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5saW5rLXBhbmVsLWxhcmdlXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZm9udC1zaXplXCIsIFwiMS41cmVtXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIubGluay1wYW5lbC1kYXJrXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCIjMjEyNTI5XCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIubGluay1wYW5lbC1kYXJrOmhvdmVyXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiNiZmJmYmZcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5saW5rLXBhbmVsLWxpZ2h0XCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCIjZmZmZmZmXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIubGluay1wYW5lbC1saWdodDpob3ZlclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIiwgXCIjOGY4ZjhmXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIubGluay1wYW5lbC1kYW5nZXJcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjb2xvclwiLCBcIiNmZjAwMDBcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5saW5rLXBhbmVsLWRhbmdlcjpob3ZlclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIiwgXCIjYmZiZmJmXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIubGluay1wYW5lbC1pbmZvXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCIjMDAwMGZmXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIubGluay1wYW5lbC1pbmZvOmhvdmVyXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiNiZmJmYmZcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5saW5rLXBhbmVsLXN1Y2Nlc3NcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjb2xvclwiLCBcIiMwMGZmMDBcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5saW5rLXBhbmVsLXN1Y2Nlc3M6aG92ZXJcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiI2ZmZmZmZlwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmxpbmstcGFuZWwtaWNvblwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRleHQtYWxpZ25cIiwgXCJjZW50ZXJcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ2ZXJ0aWNhbC1hbGlnblwiLCBcIm1pZGRsZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInVzZXItc2VsZWN0XCIsIFwibm9uZVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmxpbmstcGFuZWwtbGFiZWxcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmb250LXdlaWdodFwiLCBcIjQwMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRleHQtYWxpZ25cIiwgXCJjZW50ZXJcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ2ZXJ0aWNhbC1hbGlnblwiLCBcIm1pZGRsZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmctbGVmdFwiLCBcIjVwdFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmctcmlnaHRcIiwgXCI1cHRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ1c2VyLXNlbGVjdFwiLCBcIm5vbmVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2l0aW9uXCIsIFwiY29sb3IgMC4xNXMgZWFzZS1pbi1vdXQsIFwiICtcbiAgICAgICAgICAgICAgICAgICAgXCJiYWNrZ3JvdW5kLWNvbG9yIDAuMTVzIGVhc2UtaW4tb3V0LCBcIiArXG4gICAgICAgICAgICAgICAgICAgIFwiYm9yZGVyLWNvbG9yIDAuMTVzIGVhc2UtaW4tb3V0LCBcIiArXG4gICAgICAgICAgICAgICAgICAgIFwiYm94LXNoYWRvdyAwLjE1cyBlYXNlLWluLW91dFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLmJ1aWxkKCk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudEJ1aWxkZXJ9IGNvbXBvbmVudEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMge0NvbXBvbmVudH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRDb21wb25lbnQoY29tcG9uZW50QnVpbGRlcikge1xuICAgICAgICByZXR1cm4gY29tcG9uZW50QnVpbGRlclxuICAgICAgICAgICAgLnJvb3QoXCJkaXZcIiwgXCJpZD1saW5rXCIsIFwiY2xhc3M9bGluay1wYW5lbFwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwiZGl2XCIsIFwiY2xhc3M9bGluay1wYW5lbC1pY29uXCIpXG4gICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAubm9kZShcImlcIiwgXCJpZD1pY29uXCIpXG4gICAgICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgICAgICAubm9kZShcImRpdlwiLCBcImNsYXNzPWxpbmstcGFuZWwtbGFiZWxcIilcbiAgICAgICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgICAgIC5ub2RlKFwiYVwiLCBcImlkPWxhYmVsXCIpXG4gICAgICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAuYnVpbGQoKTtcbiAgICB9XG5cbiAgICBwb3N0Q29uZmlnKCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoTGlua1BhbmVsKTtcbiAgICAgICAgQ2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKExpbmtQYW5lbC5uYW1lKTtcbiAgICAgICAgXG4gICAgICAgIFN0eWxlU2VsZWN0b3JBY2Nlc3Nvci5mcm9tKHRoaXMuY29tcG9uZW50LmdldChcImxpbmtcIikpXG4gICAgICAgICAgICAuZW5hYmxlKHRoaXMuc2l6ZSlcbiAgICAgICAgICAgIC5lbmFibGUodGhpcy5vcmllbnRhdGlvbilcbiAgICAgICAgICAgIC5lbmFibGUodGhpcy50aGVtZSk7XG5cbiAgICAgICAgaWYgKHRoaXMubGFiZWwpIHtcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImxhYmVsXCIpLnNldENoaWxkKHRoaXMubGFiZWwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwibGFiZWxcIikucmVtb3ZlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5pY29uKSB7XG4gICAgICAgICAgICBTdHlsZVNlbGVjdG9yQWNjZXNzb3IuZnJvbSh0aGlzLmNvbXBvbmVudC5nZXQoXCJpY29uXCIpKVxuICAgICAgICAgICAgICAgIC5jbGVhcigpXG4gICAgICAgICAgICAgICAgLmVuYWJsZSh0aGlzLmljb24pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiaWNvblwiKS5yZW1vdmUoKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwibGlua1wiKS5saXN0ZW5UbyhcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5ldmVudHMudHJpZ2dlcihMaW5rUGFuZWwuRVZFTlRfQ0xJQ0tFRCwgZXZlbnQpO1xuICAgICAgICB9LCB0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge01ldGhvZH0gbWV0aG9kIFxuICAgICAqL1xuICAgIHdpdGhDbGlja0xpc3RlbmVyKG1ldGhvZCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJsaW5rXCIpLmxpc3RlblRvKFwiY2xpY2tcIiwgbWV0aG9kKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG59XG5cblR5cGVDb25maWdQYWNrLmluc3RhbmNlKCkuYWRkVHlwZUNvbmZpZyhcIm51dHRpbjJjLXVpXCIsIFByb3RvdHlwZUNvbmZpZy51bm5hbWVkKExpbmtQYW5lbCkpOyIsImltcG9ydCB7XG4gICAgQ2FudmFzU3R5bGVzLFxuICAgIENvbXBvbmVudCxcbiAgICBDYW52YXNSb290LFxuICAgIEhUTUwsXG4gICAgU3R5bGVTZWxlY3RvckFjY2Vzc29yLFxuICAgIFN0eWxlQWNjZXNzb3IsXG4gICAgU3R5bGVzaGVldEJ1aWxkZXIsXG4gICAgU3R5bGVzaGVldCxcbiAgICBDb21wb25lbnRCdWlsZGVyLFxuICAgIElubGluZUNvbXBvbmVudEZhY3Rvcnlcbn0gZnJvbSBcIm51dHRpbjJjLWNvcmVfdjFcIjtcbmltcG9ydCB7IEluamVjdGlvblBvaW50LCBQcm90b3R5cGVDb25maWcsIFR5cGVDb25maWdQYWNrIH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcbmltcG9ydCB7IENvbnRhaW5lckV2ZW50IH0gZnJvbSBcImNvbnRhaW5lcmJyaWRnZV92MVwiO1xuaW1wb3J0IHsgQ29sb3JQYWxldHRlIH0gZnJvbSBcIi4uL2NvbG9yUGFsZXR0ZVwiO1xuaW1wb3J0IHsgRWxlbWVudFRoZW1lQXBwbGljYXRvciB9IGZyb20gXCIuLi9jb21tb24vZWxlbWVudFRoZW1lQXBwbGljYXRvclwiO1xuXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiUG9wVXBQYW5lbFwiKTtcblxuZXhwb3J0IGNsYXNzIFBvcFVwUGFuZWwge1xuXG4gICAgc3RhdGljIFRZUEVfUFJJTUFSWSA9IFwicG9wLXVwLXBhbmVsLWJ1dHRvbi1wcmltYXJ5XCI7XG4gICAgc3RhdGljIFRZUEVfU0VDT05EQVJZID0gXCJwb3AtdXAtcGFuZWwtYnV0dG9uLXNlY29uZGFyeVwiO1xuICAgIHN0YXRpYyBUWVBFX1NVQ0NFU1MgPSBcInBvcC11cC1wYW5lbC1idXR0b24tc3VjY2Vzc1wiO1xuICAgIHN0YXRpYyBUWVBFX0lORk8gPSBcInBvcC11cC1wYW5lbC1idXR0b24taW5mb1wiO1xuICAgIHN0YXRpYyBUWVBFX1dBUk5JTkcgPSBcInBvcC11cC1wYW5lbC1idXR0b24td2FybmluZ1wiO1xuICAgIHN0YXRpYyBUWVBFX0RBTkdFUiA9IFwicG9wLXVwLXBhbmVsLWJ1dHRvbi1kYW5nZXJcIjtcbiAgICBzdGF0aWMgVFlQRV9MSUdIVCA9IFwicG9wLXVwLXBhbmVsLWJ1dHRvbi1saWdodFwiO1xuICAgIHN0YXRpYyBUWVBFX0RBUksgPSBcInBvcC11cC1wYW5lbC1idXR0b24tZGFya1wiO1xuXG4gICAgc3RhdGljIFNJWkVfTUVESVVNID0gXCJwb3AtdXAtcGFuZWwtYnV0dG9uLW1lZGl1bVwiO1xuICAgIHN0YXRpYyBTSVpFX0xBUkdFID0gXCJwb3AtdXAtcGFuZWwtYnV0dG9uLWxhcmdlXCI7XG5cbiAgICBzdGF0aWMgT1JJRU5UQVRJT05fTEVGVCA9IFwicG9wLXVwLXBhbmVsLWxlZnRcIjtcbiAgICBzdGF0aWMgT1JJRU5UQVRJT05fUklHSFQgPSBcInBvcC11cC1wYW5lbC1yaWdodFwiO1xuXG4gICAgc3RhdGljIENPTlRFTlRfVklTSUJMRSA9IFwicG9wLXVwLXBhbmVsLWNvbnRlbnQtdmlzaWJsZVwiO1xuICAgIHN0YXRpYyBDT05URU5UX0hJRERFTiA9IFwicG9wLXVwLXBhbmVsLWNvbnRlbnQtaGlkZGVuXCI7XG4gICAgc3RhdGljIENPTlRFTlRfRVhQQU5EID0gXCJwb3AtdXAtcGFuZWwtY29udGVudC1leHBhbmRcIjtcbiAgICBzdGF0aWMgQ09OVEVOVF9DT0xMQVBTRSA9IFwicG9wLXVwLXBhbmVsLWNvbnRlbnQtY29sbGFwc2VcIjtcbiAgICBzdGF0aWMgQ09OVEVOVCA9IFwicG9wLXVwLXBhbmVsLWNvbnRlbnRcIjtcbiAgICBzdGF0aWMgQlVUVE9OID0gXCJwb3AtdXAtcGFuZWwtYnV0dG9uXCI7XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWNvbkNsYXNzXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gb3JpZW50YXRpb25cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihpY29uQ2xhc3MsIHR5cGUgPSBQb3BVcFBhbmVsLlRZUEVfREFSSywgc2l6ZSA9IFBvcFVwUGFuZWwuU0laRV9NRURJVU0sIG9yaWVudGF0aW9uID0gUG9wVXBQYW5lbC5PUklFTlRBVElPTl9MRUZUKSB7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtJbmxpbmVDb21wb25lbnRGYWN0b3J5fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShJbmxpbmVDb21wb25lbnRGYWN0b3J5KTtcblxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudH0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSBudWxsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLmljb25DbGFzcyA9IGljb25DbGFzcztcblxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcblxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5zaXplID0gc2l6ZTtcblxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5vcmllbnRhdGlvbiA9IG9yaWVudGF0aW9uO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHlsZXNoZWV0QnVpbGRlcn0gc3R5bGVzaGVldEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMge1N0eWxlc2hlZXR9XG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkU3R5bGVzaGVldChzdHlsZXNoZWV0QnVpbGRlcikge1xuICAgICAgICBzdHlsZXNoZWV0QnVpbGRlclxuICAgICAgICAgICAgLm1lZGlhKFwiQG1lZGlhIChwcmVmZXJzLXJlZHVjZWQtbW90aW9uOiByZWR1Y2UpXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBvcC11cC1wYW5lbC1idXR0b25cIilcbiAgICAgICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zaXRpb25cIiwgXCJub25lXCIpXG4gICAgICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5wb3AtdXAtcGFuZWwtb3V0bGluZVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgXCJpbmxpbmUtYmxvY2tcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ2ZXJ0aWNhbC1hbGlnblwiLCBcIm1pZGRsZVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBvcC11cC1wYW5lbC1idXR0b25cIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtaW4td2lkdGhcIiwgXCIzNXB0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLCBcImlubGluZS1ibG9ja1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtd2VpZ2h0XCIsIFwiNDAwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCIjMjEyNTI5XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidGV4dC1hbGlnblwiLCBcImNlbnRlclwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInZlcnRpY2FsLWFsaWduXCIsIFwibWlkZGxlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidXNlci1zZWxlY3RcIiwgXCJub25lXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcInRyYW5zcGFyZW50XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyXCIsIFwiMXB4IHNvbGlkIHRyYW5zcGFyZW50XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZ1wiLCBcIjAuMzc1cmVtIDAuNzVyZW1cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJsaW5lLWhlaWdodFwiLCBcIjEuNVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1yYWRpdXNcIiwgXCIwLjI1cmVtXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNpdGlvblwiLCBcImNvbG9yIDAuMTVzIGVhc2UtaW4tb3V0LCBiYWNrZ3JvdW5kLWNvbG9yIDAuMTVzIGVhc2UtaW4tb3V0LCBib3JkZXItY29sb3IgMC4xNXMgZWFzZS1pbi1vdXQsIGJveC1zaGFkb3cgMC4xNXMgZWFzZS1pbi1vdXRcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5wb3AtdXAtcGFuZWwtYnV0dG9uLW1lZGl1bVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtc2l6ZVwiLCBcIjFyZW1cIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5wb3AtdXAtcGFuZWwtYnV0dG9uLWxhcmdlXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZm9udC1zaXplXCIsIFwiMS41cmVtXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucG9wLXVwLXBhbmVsLWNvbnRlbnRcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtaW4td2lkdGhcIiwgXCIxNTBwdFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1heC13aWR0aFwiLCBcIjQ1MHB0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZ1wiLCBcIjhwdCAxNHB0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCIjMzMzMzMzXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcInZhcigtLWRlZmF1bHQtcGFuZWwtY29sb3IpXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyLXJhZGl1c1wiLCBcIjVwdFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBvc2l0aW9uXCIsIFwiYWJzb2x1dGVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ6LWluZGV4XCIsIFwiOTk5OTk5OTdcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3gtc2l6aW5nXCIsIFwiYm9yZGVyLWJveFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJveC1zaGFkb3dcIiwgXCIwIDFweCA4cHggcmdiYSgwLDAsMCwwLjUpXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwib3ZlcmZsb3dcIiwgXCJoaWRkZW5cIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5wb3AtdXAtcGFuZWwtY29udGVudC5wb3AtdXAtcGFuZWwtbGVmdFwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZSgwJSwgLTEwMCUpIHRyYW5zbGF0ZSgwJSwgLTQycHQpXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucG9wLXVwLXBhbmVsLWNvbnRlbnQucG9wLXVwLXBhbmVsLXJpZ2h0XCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKC0xMDAlLCAtMTAwJSkgdHJhbnNsYXRlKDM1cHQsLTQycHQpXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucG9wLXVwLXBhbmVsLWNvbnRlbnQtdmlzaWJsZVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIixcImJsb2NrXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBvcC11cC1wYW5lbC1jb250ZW50LWhpZGRlblwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIixcIm5vbmVcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5wb3AtdXAtcGFuZWwtYXJyb3dcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwYWRkaW5nXCIsIFwiMTBweCAyMHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCIjMzMzMzMzXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZm9udC13ZWlnaHRcIiwgXCJub3JtYWxcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLCBcImFic29sdXRlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiei1pbmRleFwiLCBcIjk5OTk5OTk2XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm94LXNpemluZ1wiLCBcImJvcmRlci1ib3hcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIFwibm9uZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZSgwJSwgLTEwMCUpIHRyYW5zbGF0ZSgwJSwtMzhwdClcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5wb3AtdXAtcGFuZWwtYXJyb3cgaVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBvc2l0aW9uXCIsIFwiYWJzb2x1dGVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tbGVmdFwiLCBcIi0xNXB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwid2lkdGhcIiwgXCI0MHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiaGVpZ2h0XCIsIFwiNDBweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm92ZXJmbG93XCIsIFwiaGlkZGVuXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidG9wXCIsIFwiLTIwJVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImxlZnRcIiwgXCIzMCVcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5wb3AtdXAtcGFuZWwtYXJyb3cgaTo6YWZ0ZXJcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjb250ZW50XCIsIFwiJydcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLCBcImFic29sdXRlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwid2lkdGhcIiwgXCIxNnB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiaGVpZ2h0XCIsIFwiMTZweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIiwgXCJ2YXIoLS1kZWZhdWx0LXBhbmVsLWNvbG9yKVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJveC1zaGFkb3dcIiwgXCIwIDFweCA4cHggcmdiYSgwLDAsMCwwLjUpXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibGVmdFwiLCBcIjMwJVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZSg1MCUsNTAlKSByb3RhdGUoNDVkZWcpXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucG9wLXVwLXBhbmVsLWJ1dHRvbjpob3ZlclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbG9yXCIsIFwiIzIxMjUyOVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRleHQtZGVjb3JhdGlvblwiLCBcIm5vbmVcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5wb3AtdXAtcGFuZWwtYnV0dG9uOmZvY3VzLCAucG9wLXVwLXBhbmVsLWJ1dHRvbi5mb2N1c1wiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm91dGxpbmVcIiwgXCIwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm94LXNoYWRvd1wiLCBcIjAgMCAwIDAuMnJlbSByZ2JhKDAsIDEyMywgMjU1LCAwLjI1KVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBvcC11cC1wYW5lbC1idXR0b24uZGlzYWJsZWQsIC5wb3AtdXAtcGFuZWwtYnV0dG9uOmRpc2FibGVkXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCBcIjAuNjVcIilcbiAgICAgICAgICAgIC5jbG9zZSgpO1xuXG4gICAgICAgIEVsZW1lbnRUaGVtZUFwcGxpY2F0b3IuYXBwbHkoc3R5bGVzaGVldEJ1aWxkZXIsIFwicG9wLXVwLXBhbmVsLWJ1dHRvblwiLCBcInByaW1hcnlcIixcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5QUklNQVJZX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5QUklNQVJZX0hPVkVSX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5QUklNQVJZX0RJU0FCTEVEX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5QUklNQVJZX0FDVElWRV9DT0xPUlMsXG4gICAgICAgICAgICBcIjAgMCAwIDAuMnJlbSByZ2JhKDEzMCwgMTM4LCAxNDUsIDAuNSlcIiwgLy8gYm94U2hhZG93Rm9jdXNcbiAgICAgICAgICAgIFwiMCAwIDAgMC4ycmVtIHJnYmEoMTMwLCAxMzgsIDE0NSwgMC41KVwiKTsgLy8gYm94U2hhZG93QWN0aXZlRm9jdXNcblxuXG4gICAgICAgIEVsZW1lbnRUaGVtZUFwcGxpY2F0b3IuYXBwbHkoc3R5bGVzaGVldEJ1aWxkZXIsIFwicG9wLXVwLXBhbmVsLWJ1dHRvblwiLCBcInNlY29uZGFyeVwiLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLlNFQ09OREFSWV9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuU0VDT05EQVJZX0hPVkVSX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5TRUNPTkRBUllfRElTQUJMRURfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLlNFQ09OREFSWV9BQ1RJVkVfQ09MT1JTLFxuICAgICAgICAgICAgXCIwIDAgMCAwLjJyZW0gcmdiYSgxMzAsIDEzOCwgMTQ1LCAwLjUpXCIsIC8vIGJveFNoYWRvd0ZvY3VzXG4gICAgICAgICAgICBcIjAgMCAwIDAuMnJlbSByZ2JhKDEzMCwgMTM4LCAxNDUsIDAuNSlcIik7IC8vIGJveFNoYWRvd0FjdGl2ZUZvY3VzXG4gICAgICAgIFxuICAgICAgICBFbGVtZW50VGhlbWVBcHBsaWNhdG9yLmFwcGx5KHN0eWxlc2hlZXRCdWlsZGVyLCBcInBvcC11cC1wYW5lbC1idXR0b25cIiwgXCJzdWNjZXNzXCIsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuU1VDQ0VTU19DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuU1VDQ0VTU19IT1ZFUl9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuU1VDQ0VTU19ESVNBQkxFRF9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuU1VDQ0VTU19BQ1RJVkVfQ09MT1JTLFxuICAgICAgICAgICAgXCIwIDAgMCAwLjJyZW0gcmdiYSg3MiwgMTgwLCA5NywgMC41KVwiLCAvLyBib3hTaGFkb3dGb2N1c1xuICAgICAgICAgICAgXCIwIDAgMCAwLjJyZW0gcmdiYSg3MiwgMTgwLCA5NywgMC41KVwiKTsgLy8gYm94U2hhZG93QWN0aXZlRm9jdXNcblxuICAgICAgICBFbGVtZW50VGhlbWVBcHBsaWNhdG9yLmFwcGx5KHN0eWxlc2hlZXRCdWlsZGVyLCBcInBvcC11cC1wYW5lbC1idXR0b25cIiwgXCJpbmZvXCIsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuSU5GT19DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuSU5GT19IT1ZFUl9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuSU5GT19ESVNBQkxFRF9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuSU5GT19BQ1RJVkVfQ09MT1JTLFxuICAgICAgICAgICAgXCIwIDAgMCAwLjJyZW0gcmdiYSg1OCwgMTc2LCAxOTUsIDAuNSlcIiwgLy8gYm94U2hhZG93Rm9jdXNcbiAgICAgICAgICAgIFwiMCAwIDAgMC4ycmVtIHJnYmEoNTgsIDE3NiwgMTk1LCAwLjUpXCIpOyAvLyBib3hTaGFkb3dBY3RpdmVGb2N1c1xuXG4gICAgICAgIEVsZW1lbnRUaGVtZUFwcGxpY2F0b3IuYXBwbHkoc3R5bGVzaGVldEJ1aWxkZXIsIFwicG9wLXVwLXBhbmVsLWJ1dHRvblwiLCBcIndhcm5pbmdcIixcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5XQVJOSU5HX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5XQVJOSU5HX0hPVkVSX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5XQVJOSU5HX0RJU0FCTEVEX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5XQVJOSU5HX0FDVElWRV9DT0xPUlMsXG4gICAgICAgICAgICBcIjAgMCAwIDAuMnJlbSByZ2JhKDIyMiwgMTcwLCAxMiwgMC41KVwiLCAvLyBib3hTaGFkb3dGb2N1c1xuICAgICAgICAgICAgXCIwIDAgMCAwLjJyZW0gcmdiYSgyMjIsIDE3MCwgMTIsIDAuNSlcIik7IC8vIGJveFNoYWRvd0FjdGl2ZUZvY3VzXG5cbiAgICAgICAgRWxlbWVudFRoZW1lQXBwbGljYXRvci5hcHBseShzdHlsZXNoZWV0QnVpbGRlciwgXCJwb3AtdXAtcGFuZWwtYnV0dG9uXCIsIFwiZGFuZ2VyXCIsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuREFOR0VSX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5EQU5HRVJfSE9WRVJfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLkRBTkdFUl9ESVNBQkxFRF9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuREFOR0VSX0FDVElWRV9DT0xPUlMsXG4gICAgICAgICAgICBcIjAgMCAwIDAuMnJlbSByZ2JhKDIyNSwgODMsIDk3LCAwLjUpXCIsIC8vIGJveFNoYWRvd0ZvY3VzXG4gICAgICAgICAgICBcIjAgMCAwIDAuMnJlbSByZ2JhKDIyNSwgODMsIDk3LCAwLjUpXCIpOyAvLyBib3hTaGFkb3dBY3RpdmVGb2N1c1xuXG4gICAgICAgIEVsZW1lbnRUaGVtZUFwcGxpY2F0b3IuYXBwbHkoc3R5bGVzaGVldEJ1aWxkZXIsIFwicG9wLXVwLXBhbmVsLWJ1dHRvblwiLCBcImxpZ2h0XCIsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuTElHSFRfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLkxJR0hUX0hPVkVSX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5MSUdIVF9ESVNBQkxFRF9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuTElHSFRfQUNUSVZFX0NPTE9SUyxcbiAgICAgICAgICAgIFwiMCAwIDAgMC4ycmVtIHJnYmEoMjE2LCAyMTcsIDIxOSwgMC41KVwiLCAvLyBib3hTaGFkb3dGb2N1c1xuICAgICAgICAgICAgXCIwIDAgMCAwLjJyZW0gcmdiYSgyMTYsIDIxNywgMjE5LCAwLjUpXCIpOyAvLyBib3hTaGFkb3dBY3RpdmVGb2N1c1xuXG4gICAgICAgIEVsZW1lbnRUaGVtZUFwcGxpY2F0b3IuYXBwbHkoc3R5bGVzaGVldEJ1aWxkZXIsIFwicG9wLXVwLXBhbmVsLWJ1dHRvblwiLCBcImRhcmtcIixcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5EQVJLX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5EQVJLX0hPVkVSX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5EQVJLX0RJU0FCTEVEX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5EQVJLX0FDVElWRV9DT0xPUlMsXG4gICAgICAgICAgICBcIjAgMCAwIDAuMnJlbSByZ2JhKDgyLCA4OCwgOTMsIDAuNSlcIiwgLy8gYm94U2hhZG93Rm9jdXNcbiAgICAgICAgICAgIFwiMCAwIDAgMC4ycmVtIHJnYmEoODIsIDg4LCA5MywgMC41KVwiKTsgLy8gYm94U2hhZG93QWN0aXZlRm9jdXNcblxuICAgICAgICByZXR1cm4gc3R5bGVzaGVldEJ1aWxkZXIuYnVpbGQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudEJ1aWxkZXJ9IGNvbXBvbmVudEJ1aWxkZXIgXG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkQ29tcG9uZW50KGNvbXBvbmVudEJ1aWxkZXIpIHtcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudEJ1aWxkZXJcbiAgICAgICAgICAgIC5yb290KFwiZGl2XCIsIFwiaWQ9cG9wVXBQYW5lbFJvb3RcIiwgXCJjbGFzcz1wb3AtdXAtcGFuZWwtb3V0bGluZVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwiYnV0dG9uXCIsIFwiaWQ9YnV0dG9uXCIsIFwiY2xhc3M9cG9wLXVwLXBhbmVsLWJ1dHRvblwiKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwiZGl2XCIsIFwiaWQ9YXJyb3dcIiwgXCJjbGFzcz1wb3AtdXAtcGFuZWwtYXJyb3dcIilcbiAgICAgICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgICAgIC5ub2RlKFwiaVwiKVxuICAgICAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAgICAgLm5vZGUoXCJkaXZcIiwgXCJpZD1jb250ZW50XCIsIFwiY2xhc3M9cG9wLXVwLXBhbmVsLWNvbnRlbnRcIiwgXCJ0YWJpbmRleD0wXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgcG9zdENvbmZpZygpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKFBvcFVwUGFuZWwpO1xuICAgICAgICBDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUoUG9wVXBQYW5lbC5uYW1lKTtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYnV0dG9uXCIpLnNldENoaWxkKEhUTUwuaShcIlwiLCB0aGlzLmljb25DbGFzcykpO1xuXG4gICAgICAgIFN0eWxlU2VsZWN0b3JBY2Nlc3Nvci5mcm9tKHRoaXMuY29tcG9uZW50LmdldChcImJ1dHRvblwiKSlcbiAgICAgICAgICAgIC5lbmFibGUoUG9wVXBQYW5lbC5CVVRUT04pXG4gICAgICAgICAgICAuZW5hYmxlKHRoaXMudHlwZSk7XG5cbiAgICAgICAgU3R5bGVTZWxlY3RvckFjY2Vzc29yLmZyb20odGhpcy5jb21wb25lbnQuZ2V0KFwiY29udGVudFwiKSlcbiAgICAgICAgICAgIC5lbmFibGUoUG9wVXBQYW5lbC5DT05URU5UKVxuICAgICAgICAgICAgLmRpc2FibGUoUG9wVXBQYW5lbC5DT05URU5UX1ZJU0lCTEUpXG4gICAgICAgICAgICAuZW5hYmxlKFBvcFVwUGFuZWwuQ09OVEVOVF9ISURERU4pXG4gICAgICAgICAgICAuZW5hYmxlKHRoaXMuc2l6ZSlcbiAgICAgICAgICAgIC5lbmFibGUodGhpcy5vcmllbnRhdGlvbik7XG5cbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYnV0dG9uXCIpLmxpc3RlblRvKFwiY2xpY2tcIiwgdGhpcy5jbGlja2VkLCB0aGlzKTtcbiAgICAgICAgQ2FudmFzUm9vdC5saXN0ZW5Ub0ZvY3VzRXNjYXBlKHRoaXMuY29tcG9uZW50LmdldChcInBvcFVwUGFuZWxSb290XCIpLCB0aGlzLmhpZGUsIHRoaXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Q29tcG9uZW50fSBwb3BVcFBhbmVsQ29udGVudCBcbiAgICAgKi9cbiAgICBzZXRQYW5lbENvbnRlbnQocG9wVXBQYW5lbENvbnRlbnQpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiY29udGVudFwiKS5zZXRDaGlsZChwb3BVcFBhbmVsQ29udGVudC5jb21wb25lbnQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbnRhaW5lckV2ZW50fSBldmVudCBcbiAgICAgKi9cbiAgICBjbGlja2VkKGV2ZW50KSB7XG4gICAgICAgIHRoaXMudG9nZ2xlQ29udGVudCgpO1xuICAgIH1cblxuICAgIHRvZ2dsZUNvbnRlbnQoKSB7XG4gICAgICAgIGlmICghU3R5bGVBY2Nlc3Nvci5mcm9tKHRoaXMuY29tcG9uZW50LmdldChcImFycm93XCIpKS5pcyhcImRpc3BsYXlcIixcImJsb2NrXCIpKSB7XG4gICAgICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2hvdygpIHtcbiAgICAgICAgU3R5bGVTZWxlY3RvckFjY2Vzc29yLmZyb20odGhpcy5jb21wb25lbnQuZ2V0KFwiY29udGVudFwiKSlcbiAgICAgICAgICAgIC5kaXNhYmxlKFBvcFVwUGFuZWwuQ09OVEVOVF9ISURERU4pXG4gICAgICAgICAgICAuZW5hYmxlKFBvcFVwUGFuZWwuQ09OVEVOVF9WSVNJQkxFKTtcbiAgICAgICAgU3R5bGVBY2Nlc3Nvci5mcm9tKHRoaXMuY29tcG9uZW50LmdldChcImFycm93XCIpKVxuICAgICAgICAgICAgLnNldChcImRpc3BsYXlcIiwgXCJibG9ja1wiKTtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiY29udGVudFwiKS5jb250YWluZXJFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuXG4gICAgaGlkZSgpIHtcbiAgICAgICAgU3R5bGVTZWxlY3RvckFjY2Vzc29yLmZyb20odGhpcy5jb21wb25lbnQuZ2V0KFwiY29udGVudFwiKSlcbiAgICAgICAgICAgIC5kaXNhYmxlKFBvcFVwUGFuZWwuQ09OVEVOVF9WSVNJQkxFKVxuICAgICAgICAgICAgLmVuYWJsZShQb3BVcFBhbmVsLkNPTlRFTlRfSElEREVOKTtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYXJyb3dcIikuc2V0U3R5bGUoXCJkaXNwbGF5XCIsIFwibm9uZVwiKTtcbiAgICB9XG5cbiAgICBkaXNhYmxlKCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJidXR0b25cIikuc2V0QXR0cmlidXRlVmFsdWUoXCJkaXNhYmxlZFwiLCBcInRydWVcIik7XG4gICAgfVxuXG4gICAgZW5hYmxlKCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJidXR0b25cIikucmVtb3ZlQXR0cmlidXRlKFwiZGlzYWJsZWRcIik7XG4gICAgfVxufVxuXG5UeXBlQ29uZmlnUGFjay5pbnN0YW5jZSgpLmFkZFR5cGVDb25maWcoXCJudXR0aW4yYy11aVwiLCBQcm90b3R5cGVDb25maWcudW5uYW1lZChQb3BVcFBhbmVsKSk7IiwiaW1wb3J0IHsgVGltZVByb21pc2UgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcbmltcG9ydCB7IEJhc2VFbGVtZW50LFxuICAgIENhbnZhc1N0eWxlcyxcbiAgICBDb21wb25lbnQsXG4gICAgU3R5bGVTZWxlY3RvckFjY2Vzc29yLFxuICAgIFN0eWxlc2hlZXRCdWlsZGVyLFxuICAgIENvbXBvbmVudEJ1aWxkZXIsXG4gICAgU3R5bGVzaGVldCxcbiAgICBJbmxpbmVDb21wb25lbnRGYWN0b3J5LFxuICAgIENzczNTdHlsZXNoZWV0QnVpbGRlclxufSBmcm9tIFwibnV0dGluMmMtY29yZV92MVwiO1xuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQsIFByb3RvdHlwZUNvbmZpZywgVHlwZUNvbmZpZ1BhY2sgfSBmcm9tIFwibWluZGlfdjFcIjtcblxuZXhwb3J0IGNsYXNzIENhcmREZWNrRW50cnkge1xuXG4gICAgc3RhdGljIERFRkFVTFRfQ0xBU1MgPSBcImNhcmQtZGVjay1lbnRyeVwiO1xuXG4gICAgc3RhdGljIEVOVFJZX1BPU0lUSU9OX0ZST05UID0gXCJwb3NpdGlvbi1mcm9udFwiO1xuICAgIHN0YXRpYyBFTlRSWV9QT1NJVElPTl9CRUhJTkQgPSBcInBvc2l0aW9uLWJlaGluZFwiO1xuICAgIHN0YXRpYyBFTlRSWV9QT1NJVElPTl9SSUdIVCA9IFwicG9zaXRpb24tcmlnaHRcIjtcblxuICAgIHN0YXRpYyBDT05URU5UX0VYSVNUQU5DRV9QUkVTRU5UID0gXCJleGlzdGFuY2UtcHJlc2VudFwiO1xuICAgIHN0YXRpYyBDT05URU5UX0VYSVNUQU5DRV9SRU1PVkVEID0gXCJleGlzdGFuY2UtcmVtb3ZlZFwiO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIC8qKiBAdHlwZSB7SW5saW5lQ29tcG9uZW50RmFjdG9yeX0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoSW5saW5lQ29tcG9uZW50RmFjdG9yeSk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnR9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gbnVsbDtcblxuICAgICAgICAvKiogQHR5cGUge051bWJlcn0gKi9cbiAgICAgICAgdGhpcy5pbmRleCA9IDA7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtTdHJpbmd9ICovXG4gICAgICAgIHRoaXMucG9zaXRpb24gPSBDYXJkRGVja0VudHJ5LkVOVFJZX1BPU0lUSU9OX0ZST05UO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHtTdHlsZXNoZWV0fVxuICAgICAqIEBwYXJhbSB7U3R5bGVzaGVldEJ1aWxkZXJ9IHN0eWxlc2hlZXRCdWlsZGVyIFxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZFN0eWxlc2hlZXQoc3R5bGVzaGVldEJ1aWxkZXIpIHtcbiAgICAgICAgcmV0dXJuIENzczNTdHlsZXNoZWV0QnVpbGRlci5jcmVhdGUoc3R5bGVzaGVldEJ1aWxkZXIpXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuY2FyZC1kZWNrLWVudHJ5XCIpXG4gICAgICAgICAgICAgICAgLnBvc2l0aW9uKFwicmVsYXRpdmVcIilcbiAgICAgICAgICAgICAgICAuYmFja2dyb3VuZENvbG9yKFwidmFyKC0tZGVmYXVsdC1wYW5lbC1jb2xvcilcIilcbiAgICAgICAgICAgICAgICAuZ3JpZENvbHVtbihcIjFcIilcbiAgICAgICAgICAgICAgICAuZ3JpZFJvdyhcIjFcIilcbiAgICAgICAgICAgICAgICAud2lkdGgoXCIxMDAlXCIpXG4gICAgICAgICAgICAgICAgLmhlaWdodChcIjEwMCVcIilcbiAgICAgICAgICAgICAgICAubWluSGVpZ2h0KFwiMFwiKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuY2FyZC1kZWNrLWVudHJ5LnBvc2l0aW9uLWZyb250XCIpXG4gICAgICAgICAgICAgICAgLnRyYW5zZm9ybShcInRyYW5zbGF0ZSgwJSwgMCUpXCIpXG4gICAgICAgICAgICAgICAgLnRyYW5zaXRpb24oW1widHJhbnNmb3JtXCIsIFwiLjZzXCJdKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuY2FyZC1kZWNrLWVudHJ5LnBvc2l0aW9uLWJlaGluZFwiKVxuICAgICAgICAgICAgICAgIC50cmFuc2Zvcm0oXCJ0cmFuc2xhdGUoMCUsIDAlKVwiKVxuICAgICAgICAgICAgICAgIC50cmFuc2l0aW9uKFtcInRyYW5zZm9ybVwiLCBcIi42c1wiXSlcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmNhcmQtZGVjay1lbnRyeS5wb3NpdGlvbi1yaWdodFwiKVxuICAgICAgICAgICAgICAgIC50cmFuc2Zvcm0oXCJ0cmFuc2xhdGUoKzEwNSUsIDAlKVwiKVxuICAgICAgICAgICAgICAgIC50cmFuc2l0aW9uKFtcInRyYW5zZm9ybVwiLCBcIi42c1wiXSlcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmNhcmQtZGVjay1lbnRyeS1jb250ZW50LmV4aXN0YW5jZS1yZW1vdmVkXCIpXG4gICAgICAgICAgICAgICAgLmRpc3BsYXkoXCJub25lXCIpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5jYXJkLWRlY2stZW50cnktY29udGVudC5leGlzdGFuY2UtcHJlc2VudFwiKVxuICAgICAgICAgICAgICAgIC5wb3NpdGlvbihcInJlbGF0aXZlXCIpXG4gICAgICAgICAgICAgICAgLmhlaWdodChcIjEwMCVcIilcblxuICAgICAgICAgICAgLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge0NvbXBvbmVudH1cbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudEJ1aWxkZXJ9IGNvbXBvbmVudEJ1aWxkZXIgXG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkQ29tcG9uZW50KGNvbXBvbmVudEJ1aWxkZXIpIHtcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudEJ1aWxkZXJcbiAgICAgICAgICAgIC5yb290KFwiZGl2XCIsIFwiaWQ9Y2FyZERlY2tFbnRyeVwiLCBcImNsYXNzPWNhcmQtZGVjay1lbnRyeVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwiZGl2XCIsIFwiaWQ9Y2FyZERlY2tFbnRyeUNvbnRlbnRcIiwgXCJjbGFzcz1jYXJkLWRlY2stZW50cnktY29udGVudFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgIC5idWlsZCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHtCYXNlRWxlbWVudH1cbiAgICAgKi9cbiAgICBnZXQgY29udGVudEVsZW1lbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbXBvbmVudC5nZXQoXCJjYXJkRGVja0VudHJ5Q29udGVudFwiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7QmFzZUVsZW1lbnR9XG4gICAgICovXG4gICAgZ2V0IGVudHJ5RWxlbWVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tcG9uZW50LmdldChcImNhcmREZWNrRW50cnlcIik7XG4gICAgfVxuXG4gICAgYXN5bmMgcG9zdENvbmZpZygpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKENhcmREZWNrRW50cnkpO1xuICAgICAgICBDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUoQ2FyZERlY2tFbnRyeS5uYW1lKTtcbiAgICB9XG5cbiAgICBzZXRJbmRleChpbmRleCkge1xuICAgICAgICB0aGlzLmluZGV4ID0gaW5kZXg7XG4gICAgfVxuXG4gICAgc2V0Q29udGVudChjb21wb25lbnQpIHtcbiAgICAgICAgdGhpcy5jb250ZW50RWxlbWVudC5zZXRDaGlsZChjb21wb25lbnQpO1xuICAgIH1cblxuICAgIHNob3coKSB7XG4gICAgICAgIHRoaXMuc2V0Q29udGVudFZpc2liaWxpdHkoQ2FyZERlY2tFbnRyeS5DT05URU5UX0VYSVNUQU5DRV9QUkVTRU5UKTtcbiAgICAgICAgdGhpcy5zZXRTaGlmdChDYXJkRGVja0VudHJ5LkVOVFJZX1BPU0lUSU9OX0ZST05UKTtcbiAgICB9XG5cbiAgICBoaWRlKG5leHRJbmRleCkge1xuICAgICAgICBpZiAobmV4dEluZGV4ID4gdGhpcy5pbmRleCkge1xuICAgICAgICAgICAgdGhpcy5zZXRTaGlmdChDYXJkRGVja0VudHJ5LkVOVFJZX1BPU0lUSU9OX0JFSElORCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNldFNoaWZ0KENhcmREZWNrRW50cnkuRU5UUllfUE9TSVRJT05fUklHSFQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYWRqdXN0V2hlbkhpZGRlbigpO1xuICAgIH1cblxuICAgIGFkanVzdFdoZW5IaWRkZW4oKSB7XG4gICAgICAgIFRpbWVQcm9taXNlLmFzUHJvbWlzZSg2MDAsICgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLnBvc2l0aW9uID09PSBDYXJkRGVja0VudHJ5LkVOVFJZX1BPU0lUSU9OX0ZST05UKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zZXRDb250ZW50VmlzaWJpbGl0eShDYXJkRGVja0VudHJ5LkNPTlRFTlRfRVhJU1RBTkNFX1JFTU9WRUQpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzZXRDb250ZW50VmlzaWJpbGl0eShjb250ZW50VmlzaWJpbGl0eSkge1xuICAgICAgICBTdHlsZVNlbGVjdG9yQWNjZXNzb3IuZnJvbSh0aGlzLmNvbnRlbnRFbGVtZW50KS5yZXBsYWNlKFwiZXhpc3RhbmNlLVwiLCBjb250ZW50VmlzaWJpbGl0eSk7XG4gICAgfVxuXG4gICAgc2V0U2hpZnQocG9zaXRpb24pIHtcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uO1xuICAgICAgICBTdHlsZVNlbGVjdG9yQWNjZXNzb3IuZnJvbSh0aGlzLmVudHJ5RWxlbWVudCkucmVwbGFjZShcInBvc2l0aW9uLVwiLCBwb3NpdGlvbik7XG4gICAgfVxuXG59XG5cblR5cGVDb25maWdQYWNrLmluc3RhbmNlKCkuYWRkVHlwZUNvbmZpZyhcIm51dHRpbjJjLXVpXCIsIFByb3RvdHlwZUNvbmZpZy51bm5hbWVkKENhcmREZWNrRW50cnkpKTsiLCJpbXBvcnQgeyBMaXN0LCBNYXAgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcbmltcG9ydCB7IENhbnZhc1N0eWxlcyxcbiAgICBDb21wb25lbnQsXG4gICAgRXZlbnRNYW5hZ2VyLFxuICAgIFN0eWxlc2hlZXRCdWlsZGVyLFxuICAgIElubGluZUNvbXBvbmVudEZhY3RvcnksXG4gICAgQ3NzM1N0eWxlc2hlZXRCdWlsZGVyXG59IGZyb20gXCJudXR0aW4yYy1jb3JlX3YxXCI7XG5pbXBvcnQgeyBJbmplY3Rpb25Qb2ludCwgUHJvdG90eXBlQ29uZmlnLCBQcm92aWRlciwgVHlwZUNvbmZpZ1BhY2sgfSBmcm9tIFwibWluZGlfdjFcIjtcbmltcG9ydCB7IENhcmREZWNrRW50cnkgfSBmcm9tIFwiLi9jYXJkRGVja0VudHJ5L2NhcmREZWNrRW50cnkuanNcIjtcblxuZXhwb3J0IGNsYXNzIENhcmREZWNrIHtcblxuICAgIHN0YXRpYyBFVkVOVF9FTlRSWV9DSEFOR0VEID0gXCJldmVudEVudHJ5Q2hhbmdlZFwiO1xuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtNYXA8Q29tcG9uZW50Pn0gY29tcG9uZW50TWFwIFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGNvbXBvbmVudE1hcCkge1xuXG4gICAgICAgIC8qKiBAdHlwZSB7SW5saW5lQ29tcG9uZW50RmFjdG9yeX0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoSW5saW5lQ29tcG9uZW50RmFjdG9yeSk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnR9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gbnVsbDtcblxuICAgICAgICAvKiogQHR5cGUge01hcDxDb21wb25lbnQ+fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudE1hcCA9IGNvbXBvbmVudE1hcDtcblxuICAgICAgICAvKiogQHR5cGUge1Byb3ZpZGVyPENhcmREZWNrRW50cnk+fSAqL1xuICAgICAgICB0aGlzLmNhcmREZWNrRW50cnlQcm92aWRlciA9IEluamVjdGlvblBvaW50LnByb3ZpZGVyKENhcmREZWNrRW50cnkpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7TGlzdDxDYXJkRGVja0VudHJ5Pn0gKi9cbiAgICAgICAgdGhpcy5jYXJkRGVja0VudHJ5TGlzdCA9IG5ldyBMaXN0KCk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtNYXA8Q2FyZERlY2tFbnRyeT59ICovXG4gICAgICAgIHRoaXMuY2FyZERlY2tFbnRyeU1hcCA9IG5ldyBNYXAoKTtcblxuICAgICAgICAvKiogQHR5cGUge01hcDxOdW1iZXI+fSAqL1xuICAgICAgICB0aGlzLmNhcmREZWNrRW50cnlJbmRleE1hcCA9IG5ldyBNYXAoKTtcblxuICAgICAgICAvKiogQHR5cGUge0NhcmREZWNrRW50cnl9ICovXG4gICAgICAgIHRoaXMuY3VycmVudEVudHJ5ID0gbnVsbDtcblxuICAgICAgICAvKiogQHR5cGUge0V2ZW50TWFuYWdlcn0gKi9cbiAgICAgICAgdGhpcy5ldmVudHMgPSBuZXcgRXZlbnRNYW5hZ2VyKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHlsZXNoZWV0QnVpbGRlcn0gc3R5bGVzaGVldEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMgXG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkU3R5bGVzaGVldChzdHlsZXNoZWV0QnVpbGRlcikge1xuICAgICAgICByZXR1cm4gQ3NzM1N0eWxlc2hlZXRCdWlsZGVyLmNyZWF0ZShzdHlsZXNoZWV0QnVpbGRlcilcbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5jYXJkLWRlY2tcIilcbiAgICAgICAgICAgICAgICAucG9zaXRpb24oXCJyZWxhdGl2ZVwiKVxuICAgICAgICAgICAgICAgIC5iYWNrZ3JvdW5kQ29sb3IoXCIjZjFmMWYxXCIpXG4gICAgICAgICAgICAgICAgLmRpc3BsYXkoXCJncmlkXCIpXG4gICAgICAgICAgICAgICAgLmhlaWdodChcIjEwMCVcIilcblxuICAgICAgICAgICAgLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGJ1aWxkQ29tcG9uZW50KGNvbXBvbmVudEJ1aWxkZXIpIHtcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudEJ1aWxkZXJcbiAgICAgICAgICAgIC5yb290KFwiZGl2XCIsIFwiaWQ9Y2FyZERlY2tFbnRyaWVzXCIsIFwiY2xhc3M9Y2FyZC1kZWNrXCIpXG4gICAgICAgICAgICAuYnVpbGQoKTtcbiAgICB9XG5cbiAgICBhc3luYyBwb3N0Q29uZmlnKCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoQ2FyZERlY2spO1xuICAgICAgICBDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUoQ2FyZERlY2submFtZSk7XG5cbiAgICAgICAgaWYgKHRoaXMuY29tcG9uZW50TWFwKSB7XG4gICAgICAgICAgICB0aGlzLnByZXBhcmVFbnRyaWVzKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNjcm9sbGJhY2sgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJjYXJkRGVja0VudHJpZXNcIikuZWxlbWVudC5wYXJlbnRFbGVtZW50LnNjcm9sbFRvKDAsMCk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcHJlcGFyZUVudHJpZXMoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50TWFwLmZvckVhY2goYXN5bmMgKGtleSwgY29tcG9uZW50KSA9PiB7XG5cbiAgICAgICAgICAgIGNvbnN0IGNhcmREZWNrRW50cnkgPSBhd2FpdCB0aGlzLmNhcmREZWNrRW50cnlQcm92aWRlci5nZXQoKTtcblxuICAgICAgICAgICAgaWYgKG51bGwgPT0gdGhpcy5jdXJyZW50RW50cnkpIHtcbiAgICAgICAgICAgICAgICBjYXJkRGVja0VudHJ5LnNob3coKTtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRFbnRyeSA9IGNhcmREZWNrRW50cnk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNhcmREZWNrRW50cnkuaGlkZSgwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5jYXJkRGVja0VudHJ5TWFwLnNldChrZXksIGNhcmREZWNrRW50cnkpO1xuICAgICAgICAgICAgdGhpcy5jYXJkRGVja0VudHJ5TGlzdC5hZGQoY2FyZERlY2tFbnRyeSk7XG4gICAgICAgICAgICB0aGlzLmNhcmREZWNrRW50cnlJbmRleE1hcC5zZXQoa2V5LCB0aGlzLmNhcmREZWNrRW50cnlMaXN0LnNpemUoKSAtMSk7XG5cbiAgICAgICAgICAgIGNhcmREZWNrRW50cnkuc2V0Q29udGVudChjb21wb25lbnQpO1xuICAgICAgICAgICAgY2FyZERlY2tFbnRyeS5zZXRJbmRleCh0aGlzLmNhcmREZWNrRW50cnlMaXN0LnNpemUoKSAtIDEpO1xuXG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudC5hZGRDaGlsZChcImNhcmREZWNrRW50cmllc1wiLCBjYXJkRGVja0VudHJ5LmNvbXBvbmVudCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSwgdGhpcyk7XG4gICAgfVxuXG4gICAgc2xpZGVOZXh0KCkge1xuICAgICAgICBpZiAodGhpcy5jdXJyZW50RW50cnkuaW5kZXggKyAxID49IHRoaXMuY2FyZERlY2tFbnRyeUxpc3Quc2l6ZSgpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbmV4dEVudHJ5ID0gdGhpcy5jYXJkRGVja0VudHJ5TGlzdC5nZXQodGhpcy5jdXJyZW50RW50cnkuaW5kZXggKyAxKTtcbiAgICAgICAgdGhpcy5jdXJyZW50RW50cnkuaGlkZShuZXh0RW50cnkuaW5kZXgpO1xuICAgICAgICB0aGlzLmN1cnJlbnRFbnRyeSA9IG5leHRFbnRyeTtcbiAgICAgICAgdGhpcy5jdXJyZW50RW50cnkuc2hvdygpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5ldmVudHMudHJpZ2dlcihDYXJkRGVjay5FVkVOVF9FTlRSWV9DSEFOR0VEKTtcbiAgICB9XG5cbiAgICBzbGlkZVByZXZpb3VzKCkge1xuICAgICAgICBpZiAodGhpcy5jdXJyZW50RW50cnkuaW5kZXggPD0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG5leHRFbnRyeSA9IHRoaXMuY2FyZERlY2tFbnRyeUxpc3QuZ2V0KHRoaXMuY3VycmVudEVudHJ5LmluZGV4IC0gMSk7XG4gICAgICAgIHRoaXMuY3VycmVudEVudHJ5LmhpZGUobmV4dEVudHJ5LmluZGV4KTtcbiAgICAgICAgdGhpcy5jdXJyZW50RW50cnkgPSBuZXh0RW50cnk7XG4gICAgICAgIHRoaXMuY3VycmVudEVudHJ5LnNob3coKTtcblxuICAgICAgICB0aGlzLmV2ZW50cy50cmlnZ2VyKENhcmREZWNrLkVWRU5UX0VOVFJZX0NIQU5HRUQpO1xuICAgIH1cblxuICAgIHNsaWRlVG8obmFtZSkge1xuICAgICAgICBjb25zdCBuZXh0RW50cnkgPSB0aGlzLmNhcmREZWNrRW50cnlNYXAuZ2V0KG5hbWUpO1xuICAgICAgICB0aGlzLmN1cnJlbnRFbnRyeS5oaWRlKG5leHRFbnRyeS5pbmRleCk7XG4gICAgICAgIHRoaXMuY3VycmVudEVudHJ5ID0gbmV4dEVudHJ5O1xuICAgICAgICB0aGlzLmN1cnJlbnRFbnRyeS5zaG93KCk7XG5cbiAgICAgICAgdGhpcy5ldmVudHMudHJpZ2dlcihDYXJkRGVjay5FVkVOVF9FTlRSWV9DSEFOR0VEKTtcbiAgICB9XG5cbn1cblxuVHlwZUNvbmZpZ1BhY2suaW5zdGFuY2UoKS5hZGRUeXBlQ29uZmlnKFwibnV0dGluMmMtdWlcIiwgUHJvdG90eXBlQ29uZmlnLnVubmFtZWQoQ2FyZERlY2spKTsiLCJpbXBvcnQge1xuICAgIENhbnZhc1N0eWxlcyxcbiAgICBDb21wb25lbnQsXG4gICAgRXZlbnRNYW5hZ2VyLFxuICAgIFN0eWxlU2VsZWN0b3JBY2Nlc3NvcixcbiAgICBIVE1MLFxuICAgIFN0eWxlc2hlZXRCdWlsZGVyLFxuICAgIFN0eWxlc2hlZXQsXG4gICAgQ29tcG9uZW50QnVpbGRlcixcbiAgICBJbmxpbmVDb21wb25lbnRGYWN0b3J5XG59IGZyb20gXCJudXR0aW4yYy1jb3JlX3YxXCI7XG5pbXBvcnQgeyBJbmplY3Rpb25Qb2ludCwgUHJvdG90eXBlQ29uZmlnLCBUeXBlQ29uZmlnUGFjayB9IGZyb20gXCJtaW5kaV92MVwiO1xuaW1wb3J0IHsgTG9nZ2VyLCBNZXRob2QgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcbmltcG9ydCB7IENvbW1vbkV2ZW50cyB9IGZyb20gXCIuLi8uLi9jb21tb24vY29tbW9uRXZlbnRzXCI7XG5pbXBvcnQgeyBFbGVtZW50VGhlbWVBcHBsaWNhdG9yIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9lbGVtZW50VGhlbWVBcHBsaWNhdG9yXCI7XG5pbXBvcnQgeyBDb2xvclBhbGV0dGUgfSBmcm9tIFwiLi4vLi4vY29sb3JQYWxldHRlXCI7XG5cbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJCdXR0b25cIik7XG5cbmV4cG9ydCBjbGFzcyBCdXR0b24ge1xuXG4gICAgc3RhdGljIFRZUEVfUFJJTUFSWSA9IFwiYnV0dG9uLXByaW1hcnlcIjtcbiAgICBzdGF0aWMgVFlQRV9TRUNPTkRBUlkgPSBcImJ1dHRvbi1zZWNvbmRhcnlcIjtcbiAgICBzdGF0aWMgVFlQRV9TVUNDRVNTID0gXCJidXR0b24tc3VjY2Vzc1wiO1xuICAgIHN0YXRpYyBUWVBFX0lORk8gPSBcImJ1dHRvbi1pbmZvXCI7XG4gICAgc3RhdGljIFRZUEVfV0FSTklORyA9IFwiYnV0dG9uLXdhcm5pbmdcIjtcbiAgICBzdGF0aWMgVFlQRV9EQU5HRVIgPSBcImJ1dHRvbi1kYW5nZXJcIjtcbiAgICBzdGF0aWMgVFlQRV9MSUdIVCA9IFwiYnV0dG9uLWxpZ2h0XCI7XG4gICAgc3RhdGljIFRZUEVfREFSSyA9IFwiYnV0dG9uLWRhcmtcIjtcblxuICAgIHN0YXRpYyBTSVpFX01FRElVTSA9IFwiYnV0dG9uLW1lZGl1bVwiO1xuICAgIHN0YXRpYyBTSVpFX0xBUkdFID0gXCJidXR0b24tbGFyZ2VcIjtcblxuICAgIHN0YXRpYyBTUElOTkVSX1ZJU0lCTEUgPSBcInNwaW5uZXItY29udGFpbmVyLXZpc2libGVcIjtcbiAgICBzdGF0aWMgU1BJTk5FUl9ISURERU4gPSBcInNwaW5uZXItY29udGFpbmVyLWhpZGRlblwiO1xuXG4gICAgc3RhdGljIEVWRU5UX0NMSUNLRUQgPSBDb21tb25FdmVudHMuQ0xJQ0tFRDtcblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBsYWJlbFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBidXR0b25UeXBlXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGljb25DbGFzc1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGxhYmVsLCBidXR0b25UeXBlID0gQnV0dG9uLlRZUEVfUFJJTUFSWSwgYnV0dG9uU2l6ZSA9IEJ1dHRvbi5TSVpFX01FRElVTSwgaWNvbkNsYXNzKSB7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtJbmxpbmVDb21wb25lbnRGYWN0b3J5fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShJbmxpbmVDb21wb25lbnRGYWN0b3J5KTtcblxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudH0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSBudWxsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7U3RyaW5nfSAqL1xuICAgICAgICB0aGlzLmxhYmVsID0gbGFiZWw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtTdHJpbmd9ICovXG4gICAgICAgIHRoaXMuYnV0dG9uVHlwZSA9IGJ1dHRvblR5cGU7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtTdHJpbmd9ICovXG4gICAgICAgIHRoaXMuYnV0dG9uU2l6ZSA9IGJ1dHRvblNpemU7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtTdHJpbmd9ICovXG4gICAgICAgIHRoaXMuaWNvbkNsYXNzID0gaWNvbkNsYXNzO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7RXZlbnRNYW5hZ2VyfSAqL1xuICAgICAgICB0aGlzLmV2ZW50cyA9IG5ldyBFdmVudE1hbmFnZXIoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0eWxlc2hlZXRCdWlsZGVyfSBzdHlsZXNoZWV0QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyB7U3R5bGVzaGVldH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRTdHlsZXNoZWV0KHN0eWxlc2hlZXRCdWlsZGVyKSB7XG4gICAgICAgIHN0eWxlc2hlZXRCdWlsZGVyXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuYnV0dG9uLW91dGxpbmVcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIFwiZmxleFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInZlcnRpY2FsLWFsaWduXCIsIFwibWlkZGxlXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmJ1dHRvblwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgXCJpbmxpbmUtYmxvY2tcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmb250LXdlaWdodFwiLCBcIjQwMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbG9yXCIsIFwiIzIxMjUyOVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRleHQtYWxpZ25cIiwgXCJjZW50ZXJcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ2ZXJ0aWNhbC1hbGlnblwiLCBcIm1pZGRsZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIi13ZWJraXQtdXNlci1zZWxlY3RcIiwgXCJub25lXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiLW1vei11c2VyLXNlbGVjdFwiLCBcIm5vbmVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCItbXMtdXNlci1zZWxlY3RcIiwgXCJub25lXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidXNlci1zZWxlY3RcIiwgXCJub25lXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcInRyYW5zcGFyZW50XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyXCIsIFwiMXB4IHNvbGlkIHRyYW5zcGFyZW50XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZ1wiLCBcIjAuMzc1cmVtIDAuNzVyZW1cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJsaW5lLWhlaWdodFwiLCBcIjEuNVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1yYWRpdXNcIiwgXCIwLjI1cmVtXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNpdGlvblwiLCBcImNvbG9yIDAuMTVzIGVhc2UtaW4tb3V0LCBiYWNrZ3JvdW5kLWNvbG9yIDAuMTVzIGVhc2UtaW4tb3V0LCBib3JkZXItY29sb3IgMC4xNXMgZWFzZS1pbi1vdXQsIGJveC1zaGFkb3cgMC4xNXMgZWFzZS1pbi1vdXRcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5idXR0b24tbWVkaXVtXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZm9udC1zaXplXCIsIFwiMXJlbVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmJ1dHRvbi1sYXJnZVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtc2l6ZVwiLCBcIjEuNXJlbVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmJ1dHRvbjpob3ZlclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbG9yXCIsIFwiIzIxMjUyOVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRleHQtZGVjb3JhdGlvblwiLCBcIm5vbmVcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5idXR0b246Zm9jdXMsIC5idXR0b24uZm9jdXNcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJvdXRsaW5lXCIsIFwiMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJveC1zaGFkb3dcIiwgXCIwIDAgMCAwLjJyZW0gcmdiYSgwLCAxMjMsIDI1NSwgMC4yNSlcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5idXR0b24uZGlzYWJsZWQsIC5idXR0b246ZGlzYWJsZWRcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMC42NVwiKVxuICAgICAgICAgICAgLmNsb3NlKCk7XG5cbiAgICAgICAgRWxlbWVudFRoZW1lQXBwbGljYXRvci5hcHBseShzdHlsZXNoZWV0QnVpbGRlciwgXCJidXR0b25cIiwgXCJwcmltYXJ5XCIsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuUFJJTUFSWV9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuUFJJTUFSWV9IT1ZFUl9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuUFJJTUFSWV9ESVNBQkxFRF9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuUFJJTUFSWV9BQ1RJVkVfQ09MT1JTLFxuICAgICAgICAgICAgXCIwIDAgMCAwLjJyZW0gcmdiYSgxMzAsIDEzOCwgMTQ1LCAwLjUpXCIsIC8vIGJveFNoYWRvd0ZvY3VzXG4gICAgICAgICAgICBcIjAgMCAwIDAuMnJlbSByZ2JhKDEzMCwgMTM4LCAxNDUsIDAuNSlcIik7IC8vIGJveFNoYWRvd0FjdGl2ZUZvY3VzXG5cblxuICAgICAgICBFbGVtZW50VGhlbWVBcHBsaWNhdG9yLmFwcGx5KHN0eWxlc2hlZXRCdWlsZGVyLCBcImJ1dHRvblwiLCBcInNlY29uZGFyeVwiLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLlNFQ09OREFSWV9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuU0VDT05EQVJZX0hPVkVSX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5TRUNPTkRBUllfRElTQUJMRURfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLlNFQ09OREFSWV9BQ1RJVkVfQ09MT1JTLFxuICAgICAgICAgICAgXCIwIDAgMCAwLjJyZW0gcmdiYSgxMzAsIDEzOCwgMTQ1LCAwLjUpXCIsIC8vIGJveFNoYWRvd0ZvY3VzXG4gICAgICAgICAgICBcIjAgMCAwIDAuMnJlbSByZ2JhKDEzMCwgMTM4LCAxNDUsIDAuNSlcIik7IC8vIGJveFNoYWRvd0FjdGl2ZUZvY3VzXG4gICAgICAgIFxuICAgICAgICBFbGVtZW50VGhlbWVBcHBsaWNhdG9yLmFwcGx5KHN0eWxlc2hlZXRCdWlsZGVyLCBcImJ1dHRvblwiLCBcInN1Y2Nlc3NcIixcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5TVUNDRVNTX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5TVUNDRVNTX0hPVkVSX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5TVUNDRVNTX0RJU0FCTEVEX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5TVUNDRVNTX0FDVElWRV9DT0xPUlMsXG4gICAgICAgICAgICBcIjAgMCAwIDAuMnJlbSByZ2JhKDcyLCAxODAsIDk3LCAwLjUpXCIsIC8vIGJveFNoYWRvd0ZvY3VzXG4gICAgICAgICAgICBcIjAgMCAwIDAuMnJlbSByZ2JhKDcyLCAxODAsIDk3LCAwLjUpXCIpOyAvLyBib3hTaGFkb3dBY3RpdmVGb2N1c1xuXG4gICAgICAgIEVsZW1lbnRUaGVtZUFwcGxpY2F0b3IuYXBwbHkoc3R5bGVzaGVldEJ1aWxkZXIsIFwiYnV0dG9uXCIsIFwiaW5mb1wiLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLklORk9fQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLklORk9fSE9WRVJfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLklORk9fRElTQUJMRURfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLklORk9fQUNUSVZFX0NPTE9SUyxcbiAgICAgICAgICAgIFwiMCAwIDAgMC4ycmVtIHJnYmEoNTgsIDE3NiwgMTk1LCAwLjUpXCIsIC8vIGJveFNoYWRvd0ZvY3VzXG4gICAgICAgICAgICBcIjAgMCAwIDAuMnJlbSByZ2JhKDU4LCAxNzYsIDE5NSwgMC41KVwiKTsgLy8gYm94U2hhZG93QWN0aXZlRm9jdXNcblxuICAgICAgICBFbGVtZW50VGhlbWVBcHBsaWNhdG9yLmFwcGx5KHN0eWxlc2hlZXRCdWlsZGVyLCBcImJ1dHRvblwiLCBcIndhcm5pbmdcIixcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5XQVJOSU5HX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5XQVJOSU5HX0hPVkVSX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5XQVJOSU5HX0RJU0FCTEVEX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5XQVJOSU5HX0FDVElWRV9DT0xPUlMsXG4gICAgICAgICAgICBcIjAgMCAwIDAuMnJlbSByZ2JhKDIyMiwgMTcwLCAxMiwgMC41KVwiLCAvLyBib3hTaGFkb3dGb2N1c1xuICAgICAgICAgICAgXCIwIDAgMCAwLjJyZW0gcmdiYSgyMjIsIDE3MCwgMTIsIDAuNSlcIik7IC8vIGJveFNoYWRvd0FjdGl2ZUZvY3VzXG5cbiAgICAgICAgRWxlbWVudFRoZW1lQXBwbGljYXRvci5hcHBseShzdHlsZXNoZWV0QnVpbGRlciwgXCJidXR0b25cIiwgXCJkYW5nZXJcIixcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5EQU5HRVJfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLkRBTkdFUl9IT1ZFUl9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuREFOR0VSX0RJU0FCTEVEX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5EQU5HRVJfQUNUSVZFX0NPTE9SUyxcbiAgICAgICAgICAgIFwiMCAwIDAgMC4ycmVtIHJnYmEoMjI1LCA4MywgOTcsIDAuNSlcIiwgLy8gYm94U2hhZG93Rm9jdXNcbiAgICAgICAgICAgIFwiMCAwIDAgMC4ycmVtIHJnYmEoMjI1LCA4MywgOTcsIDAuNSlcIik7IC8vIGJveFNoYWRvd0FjdGl2ZUZvY3VzXG5cbiAgICAgICAgRWxlbWVudFRoZW1lQXBwbGljYXRvci5hcHBseShzdHlsZXNoZWV0QnVpbGRlciwgXCJidXR0b25cIiwgXCJsaWdodFwiLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLkxJR0hUX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5MSUdIVF9IT1ZFUl9DT0xPUlMsXG4gICAgICAgICAgICBDb2xvclBhbGV0dGUuTElHSFRfRElTQUJMRURfQ09MT1JTLFxuICAgICAgICAgICAgQ29sb3JQYWxldHRlLkxJR0hUX0FDVElWRV9DT0xPUlMsXG4gICAgICAgICAgICBcIjAgMCAwIDAuMnJlbSByZ2JhKDIxNiwgMjE3LCAyMTksIDAuNSlcIiwgLy8gYm94U2hhZG93Rm9jdXNcbiAgICAgICAgICAgIFwiMCAwIDAgMC4ycmVtIHJnYmEoMjE2LCAyMTcsIDIxOSwgMC41KVwiKTsgLy8gYm94U2hhZG93QWN0aXZlRm9jdXNcblxuICAgICAgICBFbGVtZW50VGhlbWVBcHBsaWNhdG9yLmFwcGx5KHN0eWxlc2hlZXRCdWlsZGVyLCBcImJ1dHRvblwiLCBcImRhcmtcIixcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5EQVJLX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5EQVJLX0hPVkVSX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5EQVJLX0RJU0FCTEVEX0NPTE9SUyxcbiAgICAgICAgICAgIENvbG9yUGFsZXR0ZS5EQVJLX0FDVElWRV9DT0xPUlMsXG4gICAgICAgICAgICBcIjAgMCAwIDAuMnJlbSByZ2JhKDgyLCA4OCwgOTMsIDAuNSlcIiwgLy8gYm94U2hhZG93Rm9jdXNcbiAgICAgICAgICAgIFwiMCAwIDAgMC4ycmVtIHJnYmEoODIsIDg4LCA5MywgMC41KVwiKTsgLy8gYm94U2hhZG93QWN0aXZlRm9jdXNcblxuICAgICAgICByZXR1cm4gc3R5bGVzaGVldEJ1aWxkZXIuYnVpbGQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudEJ1aWxkZXJ9IGNvbXBvbmVudEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMge0NvbXBvbmVudH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRDb21wb25lbnQoY29tcG9uZW50QnVpbGRlcikge1xuICAgICAgICByZXR1cm4gY29tcG9uZW50QnVpbGRlclxuICAgICAgICAgICAgLnJvb3QoXCJkaXZcIiwgXCJjbGFzcz1idXR0b24tb3V0bGluZVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwiYnV0dG9uXCIsIFwiY2xhc3M9YnV0dG9uXCIsIFwiaWQ9YnV0dG9uXCIsIFwidHlwZT1idXR0b25cIilcbiAgICAgICAgICAgICAgICAubm9kZShcImRpdlwiLCBcImNsYXNzPXNwaW5uZXItY29udGFpbmVyLWhpZGRlblwiLCBcImlkPXNwaW5uZXJDb250YWluZXJcIilcbiAgICAgICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgICAgIC5ub2RlKFwiZGl2XCIsIFwiY2xhc3M9c3Bpbm5lclwiKVxuICAgICAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgcG9zdENvbmZpZygpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKEJ1dHRvbik7XG4gICAgICAgIENhbnZhc1N0eWxlcy5lbmFibGVTdHlsZShCdXR0b24ubmFtZSk7XG4gICAgICAgIGlmICh0aGlzLmljb25DbGFzcykge1xuICAgICAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYnV0dG9uXCIpLmFkZENoaWxkKEhUTUwuaShcIlwiLCB0aGlzLmljb25DbGFzcykpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmxhYmVsKSB7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJidXR0b25cIikuYWRkQ2hpbGQodGhpcy5sYWJlbCk7XG4gICAgICAgIH1cblxuICAgICAgICBTdHlsZVNlbGVjdG9yQWNjZXNzb3IuZnJvbSh0aGlzLmNvbXBvbmVudC5nZXQoXCJidXR0b25cIikpXG4gICAgICAgICAgICAuZW5hYmxlKFwiYnV0dG9uXCIpXG4gICAgICAgICAgICAuZW5hYmxlKHRoaXMuYnV0dG9uU2l6ZSlcbiAgICAgICAgICAgIC5lbmFibGUodGhpcy5idXR0b25UeXBlKTtcblxuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJidXR0b25cIikubGlzdGVuVG8oXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzLnRyaWdnZXIoQnV0dG9uLkVWRU5UX0NMSUNLRUQsIGV2ZW50KTtcbiAgICAgICAgfSwgdGhpcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtNZXRob2R9IG1ldGhvZCBcbiAgICAgKi9cbiAgICB3aXRoQ2xpY2tMaXN0ZW5lcihtZXRob2QpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYnV0dG9uXCIpLmxpc3RlblRvKFwiY2xpY2tcIiwgbWV0aG9kKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZW5hYmxlTG9hZGluZygpIHtcbiAgICAgICAgU3R5bGVTZWxlY3RvckFjY2Vzc29yLmZyb20odGhpcy5jb21wb25lbnQuZ2V0KFwic3Bpbm5lckNvbnRhaW5lclwiKSlcbiAgICAgICAgICAgIC5kaXNhYmxlKEJ1dHRvbi5TUElOTkVSX0hJRERFTilcbiAgICAgICAgICAgIC5lbmFibGUoQnV0dG9uLlNQSU5ORVJfVklTSUJMRSk7XG4gICAgfVxuXG4gICAgZGlzYWJsZUxvYWRpbmcoKSB7XG4gICAgICAgIFN0eWxlU2VsZWN0b3JBY2Nlc3Nvci5mcm9tKHRoaXMuY29tcG9uZW50LmdldChcInNwaW5uZXJDb250YWluZXJcIikpXG4gICAgICAgICAgICAuZGlzYWJsZShCdXR0b24uU1BJTk5FUl9WSVNJQkxFKVxuICAgICAgICAgICAgLmVuYWJsZShCdXR0b24uU1BJTk5FUl9ISURERU4pO1xuICAgIH1cblxuICAgIGRpc2FibGUoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImJ1dHRvblwiKS5zZXRBdHRyaWJ1dGVWYWx1ZShcImRpc2FibGVkXCIsXCJ0cnVlXCIpO1xuICAgIH1cblxuICAgIGVuYWJsZSgpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiYnV0dG9uXCIpLnJlbW92ZUF0dHJpYnV0ZShcImRpc2FibGVkXCIpO1xuICAgIH1cbn1cblxuVHlwZUNvbmZpZ1BhY2suaW5zdGFuY2UoKS5hZGRUeXBlQ29uZmlnKFwibnV0dGluMmMtdWlcIiwgUHJvdG90eXBlQ29uZmlnLnVubmFtZWQoQnV0dG9uKSk7IiwiaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQsIFByb3RvdHlwZUNvbmZpZywgUHJvdmlkZXIsIFR5cGVDb25maWdQYWNrIH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5pbXBvcnQgeyBDYW52YXNTdHlsZXMsXG4gICAgQ29tcG9uZW50LFxuICAgIENvbXBvbmVudEJ1aWxkZXIsXG4gICAgQ3NzM1N0eWxlc2hlZXRCdWlsZGVyLFxuICAgIEV2ZW50TWFuYWdlcixcbiAgICBIVE1MLFxuICAgIElubGluZUNvbXBvbmVudEZhY3RvcnksXG4gICAgU3R5bGVzaGVldEJ1aWxkZXIgfSBmcm9tIFwibnV0dGluMmMtY29yZV92MVwiO1xuaW1wb3J0IHsgQnV0dG9uIH0gZnJvbSBcIi4uL2lucHV0L2J1dHRvbi9idXR0b24uanNcIjtcblxuZXhwb3J0IGNsYXNzIFRvb2xCYXIge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtJbmxpbmVDb21wb25lbnRGYWN0b3J5fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShJbmxpbmVDb21wb25lbnRGYWN0b3J5KTtcblxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudH0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSBudWxsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7RXZlbnRNYW5hZ2VyfSAqL1xuICAgICAgICB0aGlzLmV2ZW50cyA9IG5ldyBFdmVudE1hbmFnZXIoKTtcblxuXHRcdC8qKiBAdHlwZSB7UHJvdmlkZXI8QnV0dG9uPn0gKi9cblx0XHR0aGlzLmJ1dHRvblByb3ZpZGVyID0gSW5qZWN0aW9uUG9pbnQucHJvdmlkZXIoQnV0dG9uKTtcblxuICAgICAgICAvKiogQHR5cGUge0FycmF5PEJ1dHRvbj59ICovXG4gICAgICAgIHRoaXMuYnV0dG9ucyA9IFtdO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7TnVtYmVyfSAqL1xuICAgICAgICB0aGlzLmZpbGxJbmRleCA9IG51bGw7XG4gICAgfVxuXG5cdGFzeW5jIHBvc3RDb25maWcoKSB7XG5cdFx0dGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKFRvb2xCYXIpO1xuXHRcdENhbnZhc1N0eWxlcy5lbmFibGVTdHlsZShUb29sQmFyLm5hbWUpO1xuXHR9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gZmlsbEluZGV4IFRoZSBpbmRleCBvZiB0aGUgYnV0dG9uIHRoYXQgc2hvdWxkIGJlIGZvbGxvd2VkIGJ5IGEgZmlsbCBlbGVtZW50LiBTdGFydGluZyB3aXRoIDBcbiAgICAgKi9cbiAgICBzZXRGaWxsSW5kZXgoZmlsbEluZGV4KSB7XG4gICAgICAgIHRoaXMuZmlsbEluZGV4ID0gZmlsbEluZGV4O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBsYWJlbCBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdHlwZSBFLmcuIEJ1dHRvbi5UWVBFX1BSSU1BUllcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gYnV0dG9uU2l6ZSBFLmcuIEJ1dHRvbi5TSVpFX01FRElVTVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBidXR0b25JY29uQ2xhc3NlcyBFLmcuIFwiZmFzIGZhLWNhbGVuZGFyLXBsdXNcIlxuICAgICAqIEByZXR1cm5zIHtCdXR0b259XG4gICAgICovXG4gICAgYXN5bmMgYWRkQnV0dG9uKGxhYmVsLCB0eXBlID0gQnV0dG9uLlRZUEVfUFJJTUFSWSwgYnV0dG9uU2l6ZSA9IEJ1dHRvbi5TSVpFX01FRElVTSwgYnV0dG9uSWNvbkNsYXNzZXMgPSBudWxsKSB7XG4gICAgICAgIGNvbnN0IGJ1dHRvbiA9IGF3YWl0IHRoaXMuYnV0dG9uUHJvdmlkZXIuZ2V0KFtsYWJlbCwgdHlwZSwgYnV0dG9uU2l6ZSwgYnV0dG9uSWNvbkNsYXNzZXNdKTtcblxuICAgICAgICBpZiAodGhpcy5idXR0b25zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIC8qKiBAdHlwZSB7U2ltcGxlRWxlbWVudH0gKi9cbiAgICAgICAgICAgIGNvbnN0IHNwYWNlckRpdiA9IEhUTUwuY3VzdG9tKFwiZGl2XCIpO1xuICAgICAgICAgICAgY29uc3Qgc3R5bGUgPSB0aGlzLmJ1dHRvbnMubGVuZ3RoLTEgPT09IHRoaXMuZmlsbEluZGV4ID8gXCJ0b29sLWJhci1maWxsXCIgOiBcInRvb2wtYmFyLXNwYWNlXCI7XG4gICAgICAgICAgICBzcGFjZXJEaXYuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLCBzdHlsZSk7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudC5hZGRDaGlsZChcImJ1dHRvbkNvbnRhaW5lclwiLCBzcGFjZXJEaXYpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqIEB0eXBlIHtTaW1wbGVFbGVtZW50fSAqL1xuICAgICAgICBjb25zdCBidXR0b25EaXYgPSBIVE1MLmN1c3RvbShcImRpdlwiKTtcbiAgICAgICAgYnV0dG9uRGl2LnNldEF0dHJpYnV0ZVZhbHVlKFwiY2xhc3NcIiwgXCJ0b29sLWJhci1idXR0b24tY29udGFpbmVyXCIpO1xuICAgICAgICBidXR0b25EaXYuYWRkQ2hpbGQoYnV0dG9uLmNvbXBvbmVudCk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmNvbXBvbmVudC5hZGRDaGlsZChcImJ1dHRvbkNvbnRhaW5lclwiLCBidXR0b25EaXYpO1xuXG4gICAgICAgIHRoaXMuYnV0dG9ucy5wdXNoKGJ1dHRvbik7XG5cbiAgICAgICAgcmV0dXJuIGJ1dHRvbjtcbiAgICB9XG5cbiAgICByZXZlcnNlQnV0dG9uTGF5b3V0KCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJidXR0b25Db250YWluZXJcIikuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLCBcInRvb2wtYmFyLXJldmVyc2VkXCIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7Q29tcG9uZW50QnVpbGRlcn0gY29tcG9uZW50QnVpbGRlclxuICAgICAqIEByZXR1cm5zIHtDb21wb25lbnR9XG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkQ29tcG9uZW50KGNvbXBvbmVudEJ1aWxkZXIpIHtcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudEJ1aWxkZXJcbiAgICAgICAgICAgIC5yb290KFwiZGl2XCIsIFwiY2xhc3M9dG9vbC1iYXJcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAubm9kZShcImRpdlwiLCBcImlkPWJ1dHRvbkNvbnRhaW5lclwiLCBcImNsYXNzPXRvb2wtYmFyLWNvbnRhaW5lclwiKVxuICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgIC5idWlsZCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHtTdHlsZXNoZWV0fVxuICAgICAqIEBwYXJhbSB7U3R5bGVzaGVldEJ1aWxkZXJ9IHN0eWxlc2hlZXRCdWlsZGVyIFxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZFN0eWxlc2hlZXQoc3R5bGVzaGVldEJ1aWxkZXIpIHtcbiAgICAgICAgcmV0dXJuIENzczNTdHlsZXNoZWV0QnVpbGRlci5jcmVhdGUoc3R5bGVzaGVldEJ1aWxkZXIpXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIudG9vbC1iYXJcIilcbiAgICAgICAgICAgICAgICAuZGlzcGxheShcImZsZXhcIilcbiAgICAgICAgICAgICAgICAuZmxleERpcmVjdGlvbihcInJvd1wiKVxuICAgICAgICAgICAgICAgIC53aWR0aChcIjEwMCVcIilcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnRvb2wtYmFyLXJldmVyc2VkXCIpXG4gICAgICAgICAgICAgICAgLmRpc3BsYXkoXCJmbGV4XCIpXG4gICAgICAgICAgICAgICAgLmZsZXhEaXJlY3Rpb24oXCJyb3ctcmV2ZXJzZVwiKVxuICAgICAgICAgICAgICAgIC53aWR0aChcIjEwMCVcIilcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnRvb2wtYmFyLWNvbnRhaW5lclwiKVxuICAgICAgICAgICAgICAgIC5mbGV4KFwiMFwiLCBcIjFcIiwgXCJhdXRvXCIpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi50b29sLWJhci1idXR0b24tY29udGFpbmVyXCIpXG4gICAgICAgICAgICAgICAgLmZsZXgoXCIwXCIsIFwiMVwiLCBcImF1dG9cIilcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnRvb2wtYmFyLWZpbGxcIilcbiAgICAgICAgICAgICAgICAuZmxleChcIjFcIiwgXCIwXCIsIFwiYXV0b1wiKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIudG9vbC1iYXItc3BhY2VcIilcbiAgICAgICAgICAgICAgICAuZmxleChcIjBcIiwgXCIwXCIsIFwiMC41cmVtXCIpXG5cbiAgICAgICAgICAgIC5idWlsZCgpO1xuICAgIH1cbn1cblxuVHlwZUNvbmZpZ1BhY2suaW5zdGFuY2UoKS5hZGRUeXBlQ29uZmlnKFwibnV0dGluMmMtdWlcIiwgUHJvdG90eXBlQ29uZmlnLnVubmFtZWQoVG9vbEJhcikpOyIsImltcG9ydCB7XG4gICAgVGVtcGxhdGVDb21wb25lbnRGYWN0b3J5LFxuICAgIENhbnZhc1N0eWxlcyxcbiAgICBDb21wb25lbnQsXG4gICAgRXZlbnRNYW5hZ2VyLFxuICAgIElucHV0RWxlbWVudERhdGFCaW5kaW5nLFxuICAgIFN0eWxlc2hlZXRCdWlsZGVyLFxuICAgIFN0eWxlc2hlZXQsXG4gICAgQ29tcG9uZW50QnVpbGRlcixcbiAgICBJbmxpbmVDb21wb25lbnRGYWN0b3J5LFxuICAgIFJhZGlvSW5wdXRFbGVtZW50XG59IGZyb20gXCJudXR0aW4yYy1jb3JlX3YxXCI7XG5pbXBvcnQgeyBJbmplY3Rpb25Qb2ludCwgUHJvdG90eXBlQ29uZmlnLCBUeXBlQ29uZmlnUGFjayB9IGZyb20gXCJtaW5kaV92MVwiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5pbXBvcnQgeyBDb21tb25FdmVudHMgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbW1vbkV2ZW50c1wiO1xuaW1wb3J0IHsgQ29udGFpbmVyRXZlbnQgfSBmcm9tIFwiY29udGFpbmVyYnJpZGdlX3YxXCI7XG5cbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJSYWRpb1RvZ2dsZUljb25cIik7XG5cbmV4cG9ydCBjbGFzcyBSYWRpb1RvZ2dsZUljb24ge1xuICAgIFxuICAgIHN0YXRpYyBFVkVOVF9FTkFCTEVEID0gQ29tbW9uRXZlbnRzLkVOQUJMRUQ7XG4gICAgc3RhdGljIEVWRU5UX0RJU0FCTEVEID0gQ29tbW9uRXZlbnRzLkRJU0FCTEVEO1xuICAgIHN0YXRpYyBFVkVOVF9DSEFOR0VEID0gQ29tbW9uRXZlbnRzLkNIQU5HRUQ7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gbW9kZWxcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihuYW1lID0gXCI/XCIsIG1vZGVsID0gbnVsbCwgaWNvbiA9IFwiZmFzIGZhLXF1ZXN0aW9uXCIsIGxhYmVsID0gbnVsbCkge1xuXG4gICAgICAgIC8qKiBAdHlwZSB7SW5saW5lQ29tcG9uZW50RmFjdG9yeX0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoSW5saW5lQ29tcG9uZW50RmFjdG9yeSk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtFdmVudE1hbmFnZXJ9ICovXG4gICAgICAgIHRoaXMuZXZlbnRzID0gbmV3IEV2ZW50TWFuYWdlcigpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IG51bGw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtvYmplY3R9ICovXG4gICAgICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcblxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcblxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5pY29uID0gaWNvbjtcblxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5sYWJlbCA9IGxhYmVsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Ym9vbGVhbn0gKi9cbiAgICAgICAgdGhpcy5jaGVja2VkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHlsZXNoZWV0QnVpbGRlcn0gc3R5bGVzaGVldEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMge1N0eWxlc2hlZXR9XG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkU3R5bGVzaGVldChzdHlsZXNoZWV0QnVpbGRlcikge1xuICAgICAgICBzdHlsZXNoZWV0QnVpbGRlclxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnJhZGlvLXRvZ2dsZS1pY29uLWNvbnRhaW5lclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgXCJpbmxpbmUtYmxvY2tcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItcmFkaXVzXCIsIFwiNTAlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcInRyYW5zcGFyZW50XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNpdGlvblwiLCBcImJhY2tncm91bmQtY29sb3IgMC4zc1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRleHQtYWxpZ25cIiwgXCJjZW50ZXJcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJhbGlnbi1pdGVtc1wiLCBcImNlbnRlclwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnJhZGlvLXRvZ2dsZS1pY29uLXJhZGlvXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCBcIjBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLCBcImFic29sdXRlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY3Vyc29yXCIsIFwicG9pbnRlclwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnJhZGlvLXRvZ2dsZS1pY29uLWxhYmVsXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY3Vyc29yXCIsIFwicG9pbnRlclwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1yYWRpdXNcIiwgXCI1cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2l0aW9uXCIsIFwiYWxsIDAuM3MgZWFzZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtc2l6ZVwiLCBcIjIwcHRcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5yYWRpby10b2dnbGUtaWNvbi1jb250YWluZXIgaW5wdXRbdHlwZT0ncmFkaW8nXTpub3QoOmlzKDpjaGVja2VkKSkgKyBsYWJlbFwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbG9yXCIsIFwibGlnaHRncmF5XCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucmFkaW8tdG9nZ2xlLWljb24tY29udGFpbmVyIGlucHV0W3R5cGU9J3JhZGlvJ106bm90KDppcyg6Y2hlY2tlZCkpICsgbGFiZWw6aG92ZXJcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjb2xvclwiLCBcImdyYXlcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5yYWRpby10b2dnbGUtaWNvbi1jb250YWluZXIgaW5wdXRbdHlwZT0ncmFkaW8nXTppcyg6Y2hlY2tlZCkgKyBsYWJlbFwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbG9yXCIsIFwiIzIxOTZGM1wiKVxuICAgICAgICAgICAgLmNsb3NlKCk7XG4gICAgICAgIHJldHVybiBzdHlsZXNoZWV0QnVpbGRlci5idWlsZCgpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDb21wb25lbnRCdWlsZGVyfSBjb21wb25lbnRCdWlsZGVyIFxuICAgICAqIEByZXR1cm5zIHtDb21wb25lbnR9XG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkQ29tcG9uZW50KGNvbXBvbmVudEJ1aWxkZXIpIHtcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudEJ1aWxkZXJcbiAgICAgICAgICAgIC5yb290KFwic3BhblwiLCBcImlkPWNvbnRhaW5lclwiLCBcImNsYXNzPXJhZGlvLXRvZ2dsZS1pY29uLWNvbnRhaW5lclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwiaW5wdXRcIiwgXCJpZD1yYWRpb1wiLCBcImNsYXNzPXJhZGlvLXRvZ2dsZS1pY29uLXJhZGlvXCIsIFwidHlwZT1yYWRpb1wiKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwibGFiZWxcIiwgXCJpZD1sYWJlbFwiLCBcImNsYXNzPXJhZGlvLXRvZ2dsZS1pY29uLWxhYmVsXCIpXG4gICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAubm9kZShcImlcIiwgXCJpZD1pY29uXCIsIFwidGl0bGU9XCIpXG4gICAgICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAuYnVpbGQoKTtcbiAgICB9XG5cbiAgICBwb3N0Q29uZmlnKCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoUmFkaW9Ub2dnbGVJY29uKTtcbiAgICAgICAgQ2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKFJhZGlvVG9nZ2xlSWNvbi5uYW1lKTtcblxuICAgICAgICBjb25zdCByYWRpbyA9IHRoaXMuZ2V0UmFkaW8oKTtcbiAgICAgICAgcmFkaW8uc2V0QXR0cmlidXRlVmFsdWUoXCJuYW1lXCIsIHRoaXMubmFtZSk7XG4gICAgICAgIHJhZGlvLmxpc3RlblRvKFwiY2xpY2tcIiwgdGhpcy5jbGlja2VkLCB0aGlzKTtcblxuICAgICAgICBjb25zdCBpZCA9IHJhZGlvLmdldEF0dHJpYnV0ZVZhbHVlKFwiaWRcIik7XG5cbiAgICAgICAgY29uc3QgbGFiZWwgPSB0aGlzLmNvbXBvbmVudC5nZXQoXCJsYWJlbFwiKTtcbiAgICAgICAgbGFiZWwuc2V0QXR0cmlidXRlVmFsdWUoXCJmb3JcIiwgaWQpO1xuXG4gICAgICAgIGNvbnN0IGljb24gPSB0aGlzLmNvbXBvbmVudC5nZXQoXCJpY29uXCIpO1xuICAgICAgICBpY29uLnNldEF0dHJpYnV0ZVZhbHVlKFwiY2xhc3NcIiwgdGhpcy5pY29uKTtcblxuICAgICAgICBpZiAodGhpcy5tb2RlbCkge1xuICAgICAgICAgICAgSW5wdXRFbGVtZW50RGF0YUJpbmRpbmcubGluayh0aGlzLm1vZGVsKS50byhyYWRpbyk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Q29udGFpbmVyRXZlbnR9IGV2ZW50IFxuICAgICAqL1xuICAgIGNsaWNrZWQoZXZlbnQpIHtcbiAgICAgICAgY29uc3Qgb2xkVmFsdWUgPSB0aGlzLmNoZWNrZWQ7XG4gICAgICAgIHRoaXMuY2hlY2tlZCA9IGV2ZW50LnRhcmdldC5jaGVja2VkO1xuXG4gICAgICAgIGlmIChvbGRWYWx1ZSAhPT0gdGhpcy5jaGVja2VkKSB7XG4gICAgICAgICAgICB0aGlzLmV2ZW50cy50cmlnZ2VyKFJhZGlvVG9nZ2xlSWNvbi5FVkVOVF9DSEFOR0VELCBbZXZlbnRdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmNoZWNrZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzLnRyaWdnZXIoUmFkaW9Ub2dnbGVJY29uLkVWRU5UX0VOQUJMRUQsIFtldmVudF0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5ldmVudHMudHJpZ2dlcihSYWRpb1RvZ2dsZUljb24uRVZFTlRfRElTQUJMRUQsIFtldmVudF0pO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgdG9nZ2xlIHN0YXRlIHByb2dyYW1tYXRpY2FsbHlcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGNoZWNrZWQgXG4gICAgICogQHBhcmFtIHtib29sZWFufSBzaWxlbnRcbiAgICAgKi9cbiAgICB0b2dnbGUoY2hlY2tlZCwgc2lsZW50ID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKHRoaXMuY2hlY2tlZCA9PT0gY2hlY2tlZCkge1xuICAgICAgICAgICAgcmV0dXJuOyAvLyBObyBjaGFuZ2VcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNoZWNrZWQgPSBjaGVja2VkO1xuICAgICAgICBpZiAoIXRoaXMuY29tcG9uZW50KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFzaWxlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0UmFkaW8oKS5jb250YWluZXJFbGVtZW50LmNsaWNrKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoZWNrZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0UmFkaW8oKS5jaGVja2VkID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0UmFkaW8oKS5jaGVja2VkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZWZyZXNoQ29sb3JzKCk7XG4gICAgfVxuXG4gICAgLyoqIEByZXR1cm5zIHtSYWRpb0lucHV0RWxlbWVudH0gKi9cbiAgICBnZXRSYWRpbygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tcG9uZW50LmdldChcInJhZGlvXCIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgY3VycmVudCB0b2dnbGUgc3RhdGVcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBpc0NoZWNrZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNoZWNrZWQ7XG4gICAgfVxufVxuXG5UeXBlQ29uZmlnUGFjay5pbnN0YW5jZSgpLmFkZFR5cGVDb25maWcoXCJudXR0aW4yYy11aVwiLCBQcm90b3R5cGVDb25maWcudW5uYW1lZChSYWRpb1RvZ2dsZUljb24pKTsiLCJpbXBvcnQge1xuICAgIENhbnZhc1N0eWxlcyxcbiAgICBDb21wb25lbnQsXG4gICAgRXZlbnRNYW5hZ2VyLFxuICAgIFN0eWxlc2hlZXRCdWlsZGVyLFxuICAgIFN0eWxlc2hlZXQsXG4gICAgQ29tcG9uZW50QnVpbGRlcixcbiAgICBJbmxpbmVDb21wb25lbnRGYWN0b3J5LFxuICAgIENoZWNrYm94SW5wdXRFbGVtZW50XG59IGZyb20gXCJudXR0aW4yYy1jb3JlX3YxXCI7XG5pbXBvcnQgeyBJbmplY3Rpb25Qb2ludCwgUHJvdG90eXBlQ29uZmlnLCBUeXBlQ29uZmlnUGFjayB9IGZyb20gXCJtaW5kaV92MVwiO1xuaW1wb3J0IHsgTG9nZ2VyLCBNZXRob2QgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcbmltcG9ydCB7IENvbW1vbkV2ZW50cyB9IGZyb20gXCIuLi8uLi9jb21tb24vY29tbW9uRXZlbnRzXCI7XG5pbXBvcnQgeyBDb250YWluZXJFdmVudCB9IGZyb20gXCJjb250YWluZXJicmlkZ2VfdjFcIjtcblxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIlRvZ2dsZUljb25cIik7XG5cbmV4cG9ydCBjbGFzcyBUb2dnbGVJY29uIHtcblxuICAgIHN0YXRpYyBUWVBFX1BSSU1BUlkgPSBcInRvZ2dsZUljb24tcHJpbWFyeVwiO1xuICAgIHN0YXRpYyBUWVBFX1NFQ09OREFSWSA9IFwidG9nZ2xlSWNvbi1zZWNvbmRhcnlcIjtcbiAgICBzdGF0aWMgVFlQRV9TVUNDRVNTID0gXCJ0b2dnbGVJY29uLXN1Y2Nlc3NcIjtcbiAgICBzdGF0aWMgVFlQRV9JTkZPID0gXCJ0b2dnbGVJY29uLWluZm9cIjtcbiAgICBzdGF0aWMgVFlQRV9XQVJOSU5HID0gXCJ0b2dnbGVJY29uLXdhcm5pbmdcIjtcbiAgICBzdGF0aWMgVFlQRV9EQU5HRVIgPSBcInRvZ2dsZUljb24tZGFuZ2VyXCI7XG4gICAgc3RhdGljIFRZUEVfTElHSFQgPSBcInRvZ2dsZUljb24tbGlnaHRcIjtcbiAgICBzdGF0aWMgVFlQRV9EQVJLID0gXCJ0b2dnbGVJY29uLWRhcmtcIjtcblxuICAgIHN0YXRpYyBTSVpFX01FRElVTSA9IFwidG9nZ2xlSWNvbi1tZWRpdW1cIjtcbiAgICBzdGF0aWMgU0laRV9MQVJHRSA9IFwidG9nZ2xlSWNvbi1sYXJnZVwiO1xuXG4gICAgc3RhdGljIFNQSU5ORVJfVklTSUJMRSA9IFwidG9nZ2xlSWNvbi1zcGlubmVyLWNvbnRhaW5lci12aXNpYmxlXCI7XG4gICAgc3RhdGljIFNQSU5ORVJfSElEREVOID0gXCJ0b2dnbGVJY29uLXNwaW5uZXItY29udGFpbmVyLWhpZGRlblwiO1xuXG4gICAgc3RhdGljIEVWRU5UX0VOQUJMRUQgPSBDb21tb25FdmVudHMuRU5BQkxFRDtcbiAgICBzdGF0aWMgRVZFTlRfRElTQUJMRUQgPSBDb21tb25FdmVudHMuRElTQUJMRURcblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG1vZGVsXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGxhYmVsXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBjaGVja2VkXG4gICAgICovXG4gICAgY29uc3RydWN0b3IobmFtZSA9IFwiP1wiLCBtb2RlbCA9IG51bGwsIGxhYmVsID0gbnVsbCwgY2hlY2tlZCA9IGZhbHNlKSB7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtJbmxpbmVDb21wb25lbnRGYWN0b3J5fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShJbmxpbmVDb21wb25lbnRGYWN0b3J5KTtcblxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudH0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSBudWxsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7b2JqZWN0fSAqL1xuICAgICAgICB0aGlzLm1vZGVsID0gbW9kZWw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtib29sZWFufSAqL1xuICAgICAgICB0aGlzLmNoZWNrZWQgPSBjaGVja2VkO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7U3RyaW5nfSAqL1xuICAgICAgICB0aGlzLmxhYmVsID0gbGFiZWw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMuZW5hYmxlZEljb24gPSBcImZhcyBmYS1jaXJjbGUtY2hlY2tcIjtcblxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5kaXNhYmxlZEljb24gPSBcImZhcyBmYS1jaXJjbGVcIjtcblxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5kaXNhYmxlZENvbG9yID0gXCJsaWdodGdyYXlcIjtcblxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5lbmFibGVkQ29sb3IgPSBcIiMyMTk2RjNcIjtcblxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5ob3ZlckNvbG9yID0gXCJncmF5XCI7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtFdmVudE1hbmFnZXJ9ICovXG4gICAgICAgIHRoaXMuZXZlbnRzID0gbmV3IEV2ZW50TWFuYWdlcigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3R5bGVzaGVldEJ1aWxkZXJ9IHN0eWxlc2hlZXRCdWlsZGVyIFxuICAgICAqIEByZXR1cm5zIHtTdHlsZXNoZWV0fVxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZFN0eWxlc2hlZXQoc3R5bGVzaGVldEJ1aWxkZXIpIHtcbiAgICAgICAgc3R5bGVzaGVldEJ1aWxkZXJcbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi50b2dnbGUtaWNvbi1jb250YWluZXJcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIFwiaW5saW5lLWJsb2NrXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyLXJhZGl1c1wiLCBcIjUwJVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIiwgXCJ0cmFuc3BhcmVudFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zaXRpb25cIiwgXCJiYWNrZ3JvdW5kLWNvbG9yIDAuM3NcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0ZXh0LWFsaWduXCIsIFwiY2VudGVyXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYWxpZ24taXRlbXNcIiwgXCJjZW50ZXJcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi50b2dnbGUtaWNvbi1yYWRpb1wiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIiwgXCJhYnNvbHV0ZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImN1cnNvclwiLCBcInBvaW50ZXJcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi50b2dnbGUtaWNvbi1sYWJlbFwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImN1cnNvclwiLCBcInBvaW50ZXJcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItcmFkaXVzXCIsIFwiNXB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNpdGlvblwiLCBcImFsbCAwLjNzIGVhc2VcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmb250LXNpemVcIiwgXCIyMHB0XCIpXG4gICAgICAgICAgICAuY2xvc2UoKTtcblxuICAgICAgICByZXR1cm4gc3R5bGVzaGVldEJ1aWxkZXIuYnVpbGQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudEJ1aWxkZXJ9IGNvbXBvbmVudEJ1aWxkZXIgXG4gICAgICogQHJldHVybiB7Q29tcG9uZW50fVxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZENvbXBvbmVudChjb21wb25lbnRCdWlsZGVyKSB7XG4gICAgICAgIHJldHVybiBjb21wb25lbnRCdWlsZGVyXG4gICAgICAgICAgICAucm9vdChcInNwYW5cIiwgXCJpZD1jb250YWluZXJcIiwgXCJjbGFzcz10b2dnbGUtaWNvbi1jb250YWluZXJcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAubm9kZShcImlucHV0XCIsIFwiaWQ9Y2hlY2tib3hcIiwgXCJjbGFzcz10b2dnbGUtaWNvbi1yYWRpb1wiLCBcInR5cGU9Y2hlY2tib3hcIilcbiAgICAgICAgICAgICAgICAubm9kZShcImxhYmVsXCIsIFwiaWQ9bGFiZWxcIiwgXCJjbGFzcz10b2dnbGUtaWNvbi1sYWJlbFwiKVxuICAgICAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAgICAgLm5vZGUoXCJpXCIsIFwiaWQ9aWNvblwiLCBcInRpdGxlPVwiKVxuICAgICAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgcG9zdENvbmZpZygpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKFRvZ2dsZUljb24pO1xuICAgICAgICBDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUoVG9nZ2xlSWNvbi5uYW1lKTtcblxuICAgICAgICBjb25zdCBjaGVja2JveCA9IHRoaXMuZ2V0Q2hlY2tib3goKTtcbiAgICAgICAgY2hlY2tib3guc2V0QXR0cmlidXRlVmFsdWUoXCJuYW1lXCIsIHRoaXMubmFtZSk7XG4gICAgICAgIGNoZWNrYm94Lmxpc3RlblRvKFwiY2hhbmdlXCIsIHRoaXMuY2hhbmdlZCwgdGhpcyk7XG4gICAgICAgIGlmICh0aGlzLmNoZWNrZWQpIHtcbiAgICAgICAgICAgIGNoZWNrYm94LnNldEF0dHJpYnV0ZVZhbHVlKFwiY2hlY2tlZFwiLCBcImNoZWNrZWRcIik7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLmNvbXBvbmVudC5nZXQoXCJjb250YWluZXJcIik7XG4gICAgICAgIGNvbnRhaW5lci5saXN0ZW5UbyhcIm1vdXNlb3ZlclwiLCB0aGlzLmVuYWJsZUhvdmVyLCB0aGlzKTtcbiAgICAgICAgY29udGFpbmVyLmxpc3RlblRvKFwibW91c2VvdXRcIiwgdGhpcy5kaXNhYmxlSG92ZXIsIHRoaXMpO1xuXG4gICAgICAgIGNvbnN0IGlkID0gY2hlY2tib3guZ2V0QXR0cmlidXRlVmFsdWUoXCJpZFwiKTtcblxuICAgICAgICBjb25zdCBsYWJlbCA9IHRoaXMuY29tcG9uZW50LmdldChcImxhYmVsXCIpO1xuICAgICAgICBsYWJlbC5zZXRBdHRyaWJ1dGVWYWx1ZShcImZvclwiLCBpZCk7XG5cbiAgICAgICAgdGhpcy5yZWZyZXNoQ29sb3JzKCk7XG5cbiAgICB9XG5cbiAgICBhc3luYyByZWZyZXNoQ29sb3JzKCkge1xuICAgICAgICBpZiAodGhpcy5jaGVja2VkKSB7XG4gICAgICAgICAgICB0aGlzLmFwcGx5SWNvbih0aGlzLmVuYWJsZWRJY29uKTtcbiAgICAgICAgICAgIHRoaXMuYXBwbHlDb2xvcih0aGlzLmVuYWJsZWRDb2xvcik7XG4gICAgICAgICAgICBcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYXBwbHlJY29uKHRoaXMuZGlzYWJsZWRJY29uKTtcbiAgICAgICAgICAgIHRoaXMuYXBwbHlDb2xvcih0aGlzLmRpc2FibGVkQ29sb3IpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbG9hZEljb25zKGRpc2FibGVkSWNvbiwgZW5hYmxlZEljb24pIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlZEljb24gPSBkaXNhYmxlZEljb247XG4gICAgICAgIHRoaXMuZW5hYmxlZEljb24gPSBlbmFibGVkSWNvbjtcbiAgICAgICAgdGhpcy5jaGVja2VkID8gdGhpcy5hcHBseUljb24odGhpcy5lbmFibGVkSWNvbikgOiB0aGlzLmFwcGx5SWNvbih0aGlzLmRpc2FibGVkSWNvbik7XG4gICAgfVxuXG4gICAgbG9hZENvbG9ycyhkaXNhYmxlZCwgY2hlY2tlZCwgaG92ZXIpIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlZENvbG9yID0gZGlzYWJsZWQ7XG4gICAgICAgIHRoaXMuZW5hYmxlZENvbG9yID0gY2hlY2tlZDtcbiAgICAgICAgdGhpcy5ob3ZlckNvbG9yID0gaG92ZXI7XG4gICAgICAgIHRoaXMuY2hlY2tlZCA/IHRoaXMuYXBwbHlDb2xvcih0aGlzLmVuYWJsZWRDb2xvcikgOiB0aGlzLmFwcGx5Q29sb3IodGhpcy5kaXNhYmxlZENvbG9yKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge01ldGhvZH0gbWV0aG9kIFxuICAgICAqL1xuICAgIHdpdGhDbGlja0xpc3RlbmVyKG1ldGhvZCkge1xuICAgICAgICB0aGlzLmdldENoZWNrYm94KCkubGlzdGVuVG8oXCJjbGlja1wiLCBtZXRob2QpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIHRvZ2dsZSBzdGF0ZSBwcm9ncmFtbWF0aWNhbGx5XG4gICAgICogQHBhcmFtIHtib29sZWFufSBjaGVja2VkIFxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gc2lsZW50XG4gICAgICovXG4gICAgdG9nZ2xlKGNoZWNrZWQsIHNpbGVudCA9IGZhbHNlKSB7XG4gICAgICAgIGlmICh0aGlzLmNoZWNrZWQgPT09IGNoZWNrZWQpIHtcbiAgICAgICAgICAgIHJldHVybjsgLy8gTm8gY2hhbmdlXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jaGVja2VkID0gY2hlY2tlZDtcbiAgICAgICAgaWYgKCF0aGlzLmNvbXBvbmVudCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICghc2lsZW50KSB7XG4gICAgICAgICAgICB0aGlzLmdldENoZWNrYm94KCkuY29udGFpbmVyRWxlbWVudC5jbGljaygpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjaGVja2VkKSB7XG4gICAgICAgICAgICB0aGlzLmdldENoZWNrYm94KCkuY2hlY2tlZCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmdldENoZWNrYm94KCkuY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVmcmVzaENvbG9ycygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEByZXR1cm5zIHtDaGVja2JveElucHV0RWxlbWVudH1cbiAgICAgKi9cbiAgICBnZXRDaGVja2JveCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tcG9uZW50LmdldChcImNoZWNrYm94XCIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7Q29udGFpbmVyRXZlbnR9IGV2ZW50IFxuICAgICAqIEByZXR1cm5zIFxuICAgICAqL1xuICAgIGNoYW5nZWQoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5jaGVja2VkID0gZXZlbnQudGFyZ2V0LmNoZWNrZWQ7XG5cbiAgICAgICAgdGhpcy5yZWZyZXNoQ29sb3JzKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuY2hlY2tlZCkge1xuICAgICAgICAgICAgdGhpcy5ldmVudHMudHJpZ2dlcihUb2dnbGVJY29uLkVWRU5UX0VOQUJMRUQsIGV2ZW50KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5ldmVudHMudHJpZ2dlcihUb2dnbGVJY29uLkVWRU5UX0RJU0FCTEVELCBldmVudCk7XG4gICAgfVxuXG4gICAgYXBwbHlDb2xvcihjb2xvcikge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLmNvbXBvbmVudC5nZXQoXCJjb250YWluZXJcIik7XG4gICAgICAgIGNvbnRhaW5lci5zZXRBdHRyaWJ1dGVWYWx1ZShcInN0eWxlXCIsIFwiY29sb3I6IFwiICsgY29sb3IpO1xuICAgIH1cblxuICAgIGFwcGx5SWNvbihpY29uKSB7XG4gICAgICAgIGNvbnN0IGljb25FbGVtZW50ID0gdGhpcy5jb21wb25lbnQuZ2V0KFwiaWNvblwiKTtcbiAgICAgICAgaWNvbkVsZW1lbnQuc2V0QXR0cmlidXRlVmFsdWUoXCJjbGFzc1wiLCBpY29uKTtcbiAgICB9XG5cbiAgICBlbmFibGVIb3ZlcigpIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5jb21wb25lbnQuZ2V0KFwiY29udGFpbmVyXCIpO1xuICAgICAgICBpZiAoIXRoaXMuY2hlY2tlZCkge1xuICAgICAgICAgICAgY29udGFpbmVyLnNldEF0dHJpYnV0ZVZhbHVlKFwic3R5bGVcIiwgXCJjb2xvcjogXCIgKyB0aGlzLmhvdmVyQ29sb3IpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGlzYWJsZUhvdmVyKCkge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLmNvbXBvbmVudC5nZXQoXCJjb250YWluZXJcIik7XG4gICAgICAgIGlmICh0aGlzLmNoZWNrZWQpIHtcbiAgICAgICAgICAgIGNvbnRhaW5lci5zZXRBdHRyaWJ1dGVWYWx1ZShcInN0eWxlXCIsIFwiY29sb3I6IFwiICsgdGhpcy5lbmFibGVkQ29sb3IpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29udGFpbmVyLnNldEF0dHJpYnV0ZVZhbHVlKFwic3R5bGVcIiwgXCJjb2xvcjogXCIgKyB0aGlzLmRpc2FibGVkQ29sb3IpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5UeXBlQ29uZmlnUGFjay5pbnN0YW5jZSgpLmFkZFR5cGVDb25maWcoXCJudXR0aW4yYy11aVwiLCBQcm90b3R5cGVDb25maWcudW5uYW1lZChUb2dnbGVJY29uKSk7IiwiaW1wb3J0IHsgTG9nZ2VyLCBNZXRob2QgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcbmltcG9ydCB7IENvbXBvbmVudCxcblx0RXZlbnRNYW5hZ2VyLFxuXHRTaW1wbGVFbGVtZW50LFxuXHRTdGF0ZU1hbmFnZXIsXG5cdENvbXBvbmVudEJ1aWxkZXIsXG5cdElubGluZUNvbXBvbmVudEZhY3RvcnksXG5cdFN0eWxlU2VsZWN0b3JBY2Nlc3NvclxufSBmcm9tIFwibnV0dGluMmMtY29yZV92MVwiO1xuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQsIFByb3RvdHlwZUNvbmZpZywgUHJvdmlkZXIsIFR5cGVDb25maWdQYWNrIH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5pbXBvcnQgeyBQYW5lbCB9IGZyb20gXCIuLi8uLi9wYW5lbC9wYW5lbC5qc1wiO1xuaW1wb3J0IHsgUmFkaW9Ub2dnbGVJY29uIH0gZnJvbSBcIi4uLy4uL2lucHV0L3JhZGlvVG9nZ2xlSWNvbi9yYWRpb1RvZ2dsZUljb24uanNcIjtcbmltcG9ydCB7IENvbnRhaW5lckV2ZW50IH0gZnJvbSBcImNvbnRhaW5lcmJyaWRnZV92MVwiO1xuaW1wb3J0IHsgVG9nZ2xlSWNvbiB9IGZyb20gXCIuLi8uLi9pbnB1dC90b2dnbGVJY29uL3RvZ2dsZUljb24uanNcIjtcbmltcG9ydCB7IEJhbm5lckxhYmVsIH0gZnJvbSBcIi4uLy4uL2Jhbm5lckxhYmVsL2Jhbm5lckxhYmVsLmpzXCI7XG5cbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJUcmVlUGFuZWxFbnRyeVwiKTtcblxuZXhwb3J0IGNsYXNzIFRyZWVQYW5lbEVudHJ5IHtcblxuXHRzdGF0aWMgUkVDT1JEX0VMRU1FTlRfUkVRVUVTVEVEID0gXCJyZWNvcmRFbGVtZW50UmVxdWVzdGVkXCI7XG5cdHN0YXRpYyBCRUZPUkVfTE9BRF9FTEVNRU5UX1JFUVVFU1RFRCA9IFwiYmVmb3JlTG9hZEVsZW1lbnRSZXF1ZXN0ZWRcIjtcblx0c3RhdGljIFNVQl9SRUNPUkRTX1NUQVRFX1VQREFURV9SRVFVRVNURUQgPSBcInN1YlJlY29yZHNTdGF0ZVVwZGF0ZVJlcXVlc3RlZFwiO1xuXHRzdGF0aWMgRVZFTlRfRVhQQU5EX1RPR0dMRV9PVkVSUklERSA9IFwiZXhwYW5kVG9nZ2xlT3ZlcnJpZGVcIjtcblxuICAgIGNvbnN0cnVjdG9yKHJlY29yZCA9IG51bGwpIHtcblxuXHRcdC8qKiBAdHlwZSB7SW5saW5lQ29tcG9uZW50RmFjdG9yeX0gKi9cblx0XHR0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShJbmxpbmVDb21wb25lbnRGYWN0b3J5KTtcblxuXHRcdC8qKiBAdHlwZSB7Q29tcG9uZW50fSAqL1xuXHRcdHRoaXMuY29tcG9uZW50ID0gbnVsbDtcblxuXHRcdC8qKiBAdHlwZSB7UHJvdmlkZXI8UGFuZWw+fSAqL1xuXHRcdHRoaXMucGFuZWxQcm92aWRlciA9IEluamVjdGlvblBvaW50LnByb3ZpZGVyKFBhbmVsKTtcblxuXHRcdC8qKiBAdHlwZSB7RXZlbnRNYW5hZ2VyfSAqL1xuXHRcdHRoaXMuZXZlbnRzID0gbmV3IEV2ZW50TWFuYWdlcigpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7U3RhdGVNYW5hZ2VyPGFueVtdPn0gKi9cbiAgICAgICAgdGhpcy5hcnJheVN0YXRlID0gbmV3IFN0YXRlTWFuYWdlcigpO1xuXG5cdFx0LyoqIEB0eXBlIHtQcm92aWRlcjxUcmVlUGFuZWxFbnRyeT59ICovXG5cdFx0dGhpcy50cmVlUGFuZWxFbnRyeVByb3ZpZGVyID0gSW5qZWN0aW9uUG9pbnQucHJvdmlkZXIoVHJlZVBhbmVsRW50cnkpO1xuXG5cdFx0LyoqIEB0eXBlIHtUb2dnbGVJY29ufSAqL1xuXHRcdHRoaXMuZXhwYW5kVG9nZ2xlID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoVG9nZ2xlSWNvbik7XG5cblx0XHQvKiogQHR5cGUge0Jhbm5lckxhYmVsfSAqL1xuXHRcdHRoaXMuYmFubmVyTGFiZWwgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShCYW5uZXJMYWJlbCk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHthbnl9ICovXG4gICAgICAgIHRoaXMucmVjb3JkID0gcmVjb3JkO1xuICAgIH1cblxuXHQvKipcblx0ICogXG5cdCAqIEBwYXJhbSB7Q29tcG9uZW50QnVpbGRlcn0gY29tcG9uZW50QnVpbGRlciBcblx0ICogQHJldHVybnMge0NvbXBvbmVudH1cblx0ICovXG5cdHN0YXRpYyBidWlsZENvbXBvbmVudChjb21wb25lbnRCdWlsZGVyKSB7XG5cdFx0cmV0dXJuIGNvbXBvbmVudEJ1aWxkZXJcblx0XHRcdC5yb290KFwiZGl2XCIsIFwiaWQ9cm9vdFwiLCBcInN0eWxlPS0td2lkdGgtMToxMHB0XCIsIFwiY2xhc3M9Y250ciBjbnRyLXJvd3MgY250ci1wcmV2ZW50LXNpemUtY2hhbmdlIGNudHItZ2FwLXNtYWxsXCIpXG5cdFx0XHQub3BlbigpXG5cdFx0XHRcdC5ub2RlKFwiZGl2XCIsIFwiaWQ9cmVjb3JkRWxlbWVudENvbnRhaW5lclwiLCBcImNsYXNzPWNudHIgY250ci1jb2x1bW5zIGNudHItZ3Jvdy1vbmx5IGNudHItZ2FwLXNtYWxsIGNudHItY2VudGVyZWRcIilcblx0XHRcdFx0Lm9wZW4oKVxuXHRcdFx0XHRcdC5ub2RlKFwiZGl2XCIsIFwiaWQ9ZXhwYW5kQnV0dG9uXCIsIFwiY2xhc3M9Y250ci1vdmVycmlkZS1wcmV2ZW50LXNpemUtY2hhbmdlXCIpXG5cdFx0XHRcdFx0Lm5vZGUoXCJkaXZcIiwgXCJjbGFzcz1jbnRyLW92ZXJyaWRlLXNocmluay1vbmx5IHNwaW5uZXItY29udGFpbmVyLWhpZGRlblwiLCBcImlkPXNwaW5uZXJcIilcblx0XHRcdFx0XHQub3BlbigpXG5cdFx0XHRcdFx0XHQubm9kZShcImRpdlwiLCBcImNsYXNzPXNwaW5uZXJcIilcblx0XHRcdFx0XHQuY2xvc2UoKVxuXHRcdFx0XHRcdC5ub2RlKFwiZGl2XCIsIFwiaWQ9cmVjb3JkRWxlbWVudFwiKVxuXHRcdFx0XHQuY2xvc2UoKVxuXG5cdFx0XHRcdC5ub2RlKFwiZGl2XCIsIFwiaWQ9bWVzc2FnZUNvbnRhaW5lclwiLCBcImNsYXNzPWNudHIgY250ci1jb2x1bW5zIGNudHItZ3Jvdy1vbmx5IGNudHItZ2FwLXNtYWxsIGNudHItY2VudGVyZWQgaGlkZGVuXCIpXG5cdFx0XHRcdC5vcGVuKClcblx0XHRcdFx0XHQubm9kZShcImRpdlwiLCBcImlkPW1lc3NhZ2VJbmRlbnRcIiwgXCJjbGFzcz1jbnRyLW92ZXJyaWRlLXByZXZlbnQtc2l6ZS1jaGFuZ2Ugd2lkdGgtMVwiKVxuXHRcdFx0XHRcdC5ub2RlKFwiZGl2XCIsIFwiaWQ9bWVzc2FnZVwiLCBcImNsYXNzPWNudHItZ2FwLXNtYWxsXCIpXG5cdFx0XHRcdC5jbG9zZSgpXG5cblx0XHRcdFx0Lm5vZGUoXCJkaXZcIiwgXCJpZD1idXR0b25zQ29udGFpbmVyXCIsIFwiY2xhc3M9Y250ciBjbnRyLWNvbHVtbnMgY250ci1ncm93LW9ubHkgY250ci1nYXAtc21hbGwgY250ci1jZW50ZXJlZCBoaWRkZW5cIilcblx0XHRcdFx0Lm9wZW4oKVxuXHRcdFx0XHRcdC5ub2RlKFwiZGl2XCIsIFwiaWQ9YnV0dG9uc0luZGVudFwiLCBcImNsYXNzPWNudHItb3ZlcnJpZGUtcHJldmVudC1zaXplLWNoYW5nZSB3aWR0aC0xXCIpXG5cdFx0XHRcdFx0Lm5vZGUoXCJkaXZcIiwgXCJpZD1idXR0b25zXCIsIFwiY2xhc3M9Y250ci1nYXAtc21hbGxcIilcblx0XHRcdFx0LmNsb3NlKClcblxuXHRcdFx0XHQubm9kZShcImRpdlwiLCBcImlkPXN1YnJlY29yZEVsZW1lbnRzQ29udGFpbmVyXCIsIFwiY2xhc3M9Y250ciBjbnRyLWNvbHVtbnMgY250ci1ncm93LW9ubHkgY250ci1nYXAtc21hbGwgY250ci1jZW50ZXJlZCBoaWRkZW5cIilcblx0XHRcdFx0Lm9wZW4oKVxuXHRcdFx0XHRcdC5ub2RlKFwiZGl2XCIsIFwiaWQ9c3VicmVjb3JkSW5kZW50XCIsIFwiY2xhc3M9Y250ci1vdmVycmlkZS1wcmV2ZW50LXNpemUtY2hhbmdlIHdpZHRoLTFcIilcblx0XHRcdFx0XHQubm9kZShcImRpdlwiLCBcImlkPXN1YnJlY29yZEVsZW1lbnRzXCIsIFwiY2xhc3M9Y250ciBjbnRyLXJvd3MgY250ci1nYXAtc21hbGxcIilcblx0XHRcdFx0LmNsb3NlKClcblx0XHRcdC5jbG9zZSgpXG5cdFx0XHQuYnVpbGQoKTtcblx0fVxuXG4gICAgYXN5bmMgcG9zdENvbmZpZygpIHtcblx0XHR0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoVHJlZVBhbmVsRW50cnkpO1xuXG5cdFx0dGhpcy5leHBhbmRUb2dnbGUuZXZlbnRzLmxpc3RlblRvKFJhZGlvVG9nZ2xlSWNvbi5FVkVOVF9FTkFCTEVELCB0aGlzLmxvYWRTdWJSZWNvcmRzQ2xpY2tlZCwgdGhpcyk7XG5cdFx0dGhpcy5leHBhbmRUb2dnbGUuZXZlbnRzLmxpc3RlblRvKFJhZGlvVG9nZ2xlSWNvbi5FVkVOVF9ESVNBQkxFRCwgdGhpcy5oaWRlU3ViUmVjb3Jkc0NsaWNrZWQsIHRoaXMpO1xuXG5cdFx0dGhpcy5jb21wb25lbnQuc2V0Q2hpbGQoXCJleHBhbmRCdXR0b25cIiwgdGhpcy5leHBhbmRUb2dnbGUuY29tcG9uZW50KTtcblxuXHRcdHRoaXMuYmFubmVyTGFiZWwuZXZlbnRzLmxpc3RlblRvKEJhbm5lckxhYmVsLkVWRU5UX0hJRERFTiwgdGhpcy5oaWRlTWVzc2FnZSwgdGhpcyk7XG5cblx0XHR0aGlzLmNvbXBvbmVudC5zZXRDaGlsZChcIm1lc3NhZ2VcIiwgdGhpcy5iYW5uZXJMYWJlbC5jb21wb25lbnQpO1xuXG4gICAgICAgIHRoaXMuYXJyYXlTdGF0ZS5yZWFjdChcblx0XHRcdG5ldyBNZXRob2QodGhpcy5oYW5kbGVEb21haW5DaGFuZ2UsIHRoaXMpLFxuXHRcdFx0bmV3IE1ldGhvZCh0aGlzLmhhbmRsZUVycm9yQ2hhbmdlLHRoaXMpKTtcblxuICAgIH1cblxuXHRhc3luYyBlbmFibGVCb3JkZXIoKSB7XG5cdFx0U3R5bGVTZWxlY3RvckFjY2Vzc29yLmZyb20odGhpcy5jb21wb25lbnQuZ2V0KFwicm9vdFwiKSkuZW5hYmxlKFwiY250ci1yb3VuZC1ib3JkZXJlZFwiKTtcblx0fVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBcbiAgICAgKi9cbiAgICBhc3luYyBoYW5kbGVEb21haW5DaGFuZ2Uob2JqZWN0KSB7XG5cdFx0aWYgKG9iamVjdCBpbnN0YW5jZW9mIEFycmF5KSB7XG5cblx0XHRcdHRoaXMuY29tcG9uZW50LmNsZWFyQ2hpbGRyZW4oXCJzdWJyZWNvcmRFbGVtZW50c1wiKTtcblx0XHRcdHRoaXMudG9nZ2xlQ2hpbGRFbGVtZW50cyh0cnVlKTtcblx0XHRcdHRoaXMudG9nZ2xlU3Bpbm5lcih0cnVlKTtcblx0XHRcdG9iamVjdC5mb3JFYWNoKGFzeW5jIChyZWNvcmQpID0+IHtcblx0XHRcdFx0dGhpcy5jb21wb25lbnQuYWRkQ2hpbGQoXCJzdWJyZWNvcmRFbGVtZW50c1wiLCBhd2FpdCB0aGlzLmNyZWF0ZVN1YkVudHJ5KHJlY29yZCkpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdHRoaXMudG9nZ2xlU3Bpbm5lcihmYWxzZSk7XG4gICAgfVxuXG5cdGhhbmRsZUVycm9yQ2hhbmdlKGVycm9yKSB7XG5cdFx0dGhpcy50b2dnbGVFcnJvck1vZGUoZXJyb3IpO1xuXHR9XG5cblx0YXN5bmMgdG9nZ2xlRXJyb3JNb2RlKGVycm9yKSB7XG5cdFx0aWYgKGVycm9yKSB7XG5cdFx0XHR0aGlzLmJhbm5lckxhYmVsLnNob3dFcnJvcihlcnJvci5tZXNzYWdlKTtcblx0XHRcdFN0eWxlU2VsZWN0b3JBY2Nlc3Nvci5mcm9tKHRoaXMuY29tcG9uZW50LmdldChcIm1lc3NhZ2VDb250YWluZXJcIikpLmRpc2FibGUoXCJoaWRkZW5cIik7XG5cdFx0XHRhd2FpdCB0aGlzLnRvZ2dsZVNwaW5uZXIoZmFsc2UpO1xuXHRcdFx0YXdhaXQgdGhpcy5oaWRlU3ViUmVjb3JkcygpO1xuXHRcdFx0dGhpcy5leHBhbmRUb2dnbGUudG9nZ2xlKGZhbHNlLCB0cnVlKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0dGhpcy5iYW5uZXJMYWJlbC5oaWRlKCk7XG5cdFx0YXdhaXQgdGhpcy5oaWRlTWVzc2FnZSgpO1xuXHR9XG5cblx0YXN5bmMgaGlkZU1lc3NhZ2UoKSB7XG5cdFx0U3R5bGVTZWxlY3RvckFjY2Vzc29yLmZyb20odGhpcy5jb21wb25lbnQuZ2V0KFwibWVzc2FnZUNvbnRhaW5lclwiKSkuZW5hYmxlKFwiaGlkZGVuXCIpO1xuXHR9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge2FueX0gcmVjb3JkIFxuXHQgKiBAcmV0dXJucyB7U2ltcGxlRWxlbWVudH1cbiAgICAgKi9cbiAgICBhc3luYyBjcmVhdGVTdWJFbnRyeShyZWNvcmQpIHtcblx0XHRjb25zdCB0cmVlUGFuZWxTdWJFbnRyeSA9IGF3YWl0IHRoaXMudHJlZVBhbmVsRW50cnlQcm92aWRlci5nZXQoW3JlY29yZF0pO1xuXHRcdGNvbnN0IHJlY29yZEVsZW1lbnQgPSBhd2FpdCB0aGlzLmV2ZW50cy50cmlnZ2VyKFRyZWVQYW5lbEVudHJ5LlJFQ09SRF9FTEVNRU5UX1JFUVVFU1RFRCwgW251bGwsIHJlY29yZCwgdHJlZVBhbmVsU3ViRW50cnksIHRoaXNdKTtcbiAgICAgICAgXG5cdFx0aWYgKCFyZWNvcmRFbGVtZW50KSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0dHJlZVBhbmVsU3ViRW50cnkuY29tcG9uZW50LnNldENoaWxkKFwicmVjb3JkRWxlbWVudFwiLCByZWNvcmRFbGVtZW50LmNvbXBvbmVudCk7XG5cblx0XHRhd2FpdCB0aGlzLmV2ZW50c1xuXHRcdFx0LnRyaWdnZXIoVHJlZVBhbmVsRW50cnkuRVZFTlRfRVhQQU5EX1RPR0dMRV9PVkVSUklERSwgW251bGwsIHRyZWVQYW5lbFN1YkVudHJ5LCByZWNvcmRdKTtcblxuXHRcdHRyZWVQYW5lbFN1YkVudHJ5LmV2ZW50c1xuXHRcdFx0Lmxpc3RlblRvKFRyZWVQYW5lbEVudHJ5LlJFQ09SRF9FTEVNRU5UX1JFUVVFU1RFRCwgdGhpcy5lbnRyeVJlcXVlc3RlZCwgdGhpcyk7XG5cblx0XHR0cmVlUGFuZWxTdWJFbnRyeS5ldmVudHNcblx0XHRcdC5saXN0ZW5UbyhUcmVlUGFuZWxFbnRyeS5FVkVOVF9FWFBBTkRfVE9HR0xFX09WRVJSSURFLCB0aGlzLmV4cGFuZFRvZ2dsZU92ZXJyaWRlLCB0aGlzKTtcblxuXHRcdHRyZWVQYW5lbFN1YkVudHJ5LmV2ZW50c1xuXHRcdFx0Lmxpc3RlblRvKFRyZWVQYW5lbEVudHJ5LlNVQl9SRUNPUkRTX1NUQVRFX1VQREFURV9SRVFVRVNURUQsIHRoaXMuc3ViUmVjb3Jkc1VwZGF0ZVJlcXVlc3RlZCwgdGhpcyk7XG5cblx0XHRyZXR1cm4gdHJlZVBhbmVsU3ViRW50cnkuY29tcG9uZW50O1xuICAgIH1cblxuXHQvKipcblx0ICogQHBhcmFtIHtDb250YWluZXJFdmVudH0gZXZlbnQgXG5cdCAqIEBwYXJhbSB7VHJlZVBhbmVsRW50cnl9IHRyZWVQYW5lbEVudHJ5XG5cdCAqIEBwYXJhbSB7YW55fSByZWNvcmRcblx0ICovXG5cdGFzeW5jIGVudHJ5UmVxdWVzdGVkKGV2ZW50LCByZWNvcmQsIHRyZWVQYW5lbEVudHJ5LCBwYXJlbnRUcmVlUGFuZWxFbnRyeSkge1xuXHRcdHRyeSB7XG5cdFx0XHRyZXR1cm4gYXdhaXQgdGhpcy5ldmVudHMudHJpZ2dlcihUcmVlUGFuZWxFbnRyeS5SRUNPUkRfRUxFTUVOVF9SRVFVRVNURUQsIFtldmVudCwgcmVjb3JkLCB0cmVlUGFuZWxFbnRyeSwgcGFyZW50VHJlZVBhbmVsRW50cnldKTtcblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0TE9HLmVycm9yKGVycm9yKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogQHBhcmFtIHtDb250YWluZXJFdmVudH0gZXZlbnQgXG5cdCAqIEBwYXJhbSB7VHJlZVBhbmVsRW50cnl9IHRyZWVQYW5lbEVudHJ5XG5cdCAqIEBwYXJhbSB7YW55fSByZWNvcmRcblx0ICovXG5cdGFzeW5jIGV4cGFuZFRvZ2dsZU92ZXJyaWRlKGV2ZW50LCB0cmVlUGFuZWxFbnRyeSwgcmVjb3JkKSB7XG5cdFx0dHJ5IHtcblx0XHRcdHJldHVybiBhd2FpdCB0aGlzLmV2ZW50cy50cmlnZ2VyKFRyZWVQYW5lbEVudHJ5LkVWRU5UX0VYUEFORF9UT0dHTEVfT1ZFUlJJREUsIFtldmVudCwgdHJlZVBhbmVsRW50cnksIHJlY29yZF0pO1xuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRMT0cuZXJyb3IoZXJyb3IpO1xuXHRcdH1cblx0fVxuXG5cdGFzeW5jIHJlbG9hZFN1YlJlY29yZHMoKSB7XG5cdFx0Y29uc3QgZWxlbWVudEJ1dHRvbnNDb250YWluZXIgPSBhd2FpdCB0aGlzLmNvbXBvbmVudC5nZXQoXCJidXR0b25zXCIpO1xuXHRcdGF3YWl0IHRoaXMuc3ViUmVjb3Jkc1VwZGF0ZVJlcXVlc3RlZChudWxsLCB0aGlzLnJlY29yZCwgdGhpcy5hcnJheVN0YXRlLCBlbGVtZW50QnV0dG9uc0NvbnRhaW5lcik7XG5cdH1cblxuXHQvKipcblx0ICogQHBhcmFtIHtDb250YWluZXJFdmVudH0gZXZlbnQgXG5cdCAqIEBwYXJhbSB7YW55fSByZWNvcmRcblx0ICogQHBhcmFtIHtTdGF0ZU1hbmFnZXI8YW55W10+fSBzdGF0ZU1hbmFnZXJcblx0ICogQHBhcmFtIHtTaW1wbGVFbGVtZW50fSBlbGVtZW50QnV0dG9uc0NvbnRhaW5lclxuXHQgKi9cblx0YXN5bmMgc3ViUmVjb3Jkc1VwZGF0ZVJlcXVlc3RlZChldmVudCwgcmVjb3JkLCBzdGF0ZU1hbmFnZXIsIGVsZW1lbnRCdXR0b25zQ29udGFpbmVyKSB7XG5cdFx0YXdhaXQgdGhpcy5ldmVudHNcblx0XHRcdC50cmlnZ2VyKFRyZWVQYW5lbEVudHJ5LlNVQl9SRUNPUkRTX1NUQVRFX1VQREFURV9SRVFVRVNURUQsIFtldmVudCwgcmVjb3JkLCBzdGF0ZU1hbmFnZXIsIGVsZW1lbnRCdXR0b25zQ29udGFpbmVyXSk7XG5cdH1cblxuXHQvKipcblx0ICogQHBhcmFtIHtCb29sZWFufSB2aXNpYmxlIFxuXHQgKi9cblx0YXN5bmMgdG9nZ2xlU3Bpbm5lcih2aXNpYmxlKSB7XG5cdFx0aWYgKHZpc2libGUpIHtcblx0XHRcdFN0eWxlU2VsZWN0b3JBY2Nlc3Nvci5mcm9tKHRoaXMuY29tcG9uZW50LmdldChcInNwaW5uZXJcIikpLmRpc2FibGUoXCJzcGlubmVyLWNvbnRhaW5lci1oaWRkZW5cIik7XG5cdFx0XHRTdHlsZVNlbGVjdG9yQWNjZXNzb3IuZnJvbSh0aGlzLmNvbXBvbmVudC5nZXQoXCJzcGlubmVyXCIpKS5lbmFibGUoXCJzcGlubmVyLWNvbnRhaW5lci12aXNpYmxlXCIpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRTdHlsZVNlbGVjdG9yQWNjZXNzb3IuZnJvbSh0aGlzLmNvbXBvbmVudC5nZXQoXCJzcGlubmVyXCIpKS5lbmFibGUoXCJzcGlubmVyLWNvbnRhaW5lci1oaWRkZW5cIik7XG5cdFx0U3R5bGVTZWxlY3RvckFjY2Vzc29yLmZyb20odGhpcy5jb21wb25lbnQuZ2V0KFwic3Bpbm5lclwiKSkuZGlzYWJsZShcInNwaW5uZXItY29udGFpbmVyLXZpc2libGVcIik7XG5cdH1cblxuXHQvKipcblx0ICogQHBhcmFtIHtCb29sZWFufSB2aXNpYmxlIFxuXHQgKi9cblx0YXN5bmMgdG9nZ2xlQ2hpbGRFbGVtZW50cyh2aXNpYmxlKSB7XG5cdFx0aWYgKHZpc2libGUpIHtcblx0XHRcdFN0eWxlU2VsZWN0b3JBY2Nlc3Nvci5mcm9tKHRoaXMuY29tcG9uZW50LmdldChcInN1YnJlY29yZEVsZW1lbnRzQ29udGFpbmVyXCIpKS5kaXNhYmxlKFwiaGlkZGVuXCIpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRTdHlsZVNlbGVjdG9yQWNjZXNzb3IuZnJvbSh0aGlzLmNvbXBvbmVudC5nZXQoXCJzdWJyZWNvcmRFbGVtZW50c0NvbnRhaW5lclwiKSkuZW5hYmxlKFwiaGlkZGVuXCIpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IHZpc2libGUgXG5cdCAqL1xuXHRhc3luYyB0b2dnbGVCdXR0b25zKHZpc2libGUpIHtcblx0XHRpZiAodmlzaWJsZSkge1xuXHRcdFx0U3R5bGVTZWxlY3RvckFjY2Vzc29yLmZyb20odGhpcy5jb21wb25lbnQuZ2V0KFwiYnV0dG9uc0NvbnRhaW5lclwiKSkuZGlzYWJsZShcImhpZGRlblwiKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0U3R5bGVTZWxlY3RvckFjY2Vzc29yLmZyb20odGhpcy5jb21wb25lbnQuZ2V0KFwiYnV0dG9uc0NvbnRhaW5lclwiKSkuZW5hYmxlKFwiaGlkZGVuXCIpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBwYXJhbSB7Q29udGFpbmVyRXZlbnR9IGV2ZW50IFxuXHQgKi9cbiAgICBhc3luYyBsb2FkU3ViUmVjb3Jkc0NsaWNrZWQoZXZlbnQpIHtcblx0XHR0aGlzLnRvZ2dsZUNoaWxkRWxlbWVudHModHJ1ZSk7XG5cdFx0dGhpcy50b2dnbGVTcGlubmVyKHRydWUpO1xuXG5cdFx0Y29uc3QgZWxlbWVudEJ1dHRvbnNDb250YWluZXIgPSBhd2FpdCB0aGlzLmNvbXBvbmVudC5nZXQoXCJidXR0b25zXCIpO1xuXG5cdFx0YXdhaXQgdGhpcy5ldmVudHNcblx0XHRcdC50cmlnZ2VyKFRyZWVQYW5lbEVudHJ5LlNVQl9SRUNPUkRTX1NUQVRFX1VQREFURV9SRVFVRVNURUQsIFtldmVudCwgdGhpcy5yZWNvcmQsIHRoaXMuYXJyYXlTdGF0ZSwgZWxlbWVudEJ1dHRvbnNDb250YWluZXJdKTtcblxuXHRcdGlmIChlbGVtZW50QnV0dG9uc0NvbnRhaW5lci5jb250YWluZXJFbGVtZW50LmZpcnN0Q2hpbGQpIHtcblx0XHRcdGF3YWl0IHRoaXMudG9nZ2xlQnV0dG9ucyh0cnVlKTtcblx0XHR9XG4gICAgfVxuXG5cdC8qKlxuXHQgKiBAcGFyYW0ge0NvbnRhaW5lckV2ZW50fSBldmVudCBcblx0ICovXG4gICAgYXN5bmMgaGlkZVN1YlJlY29yZHNDbGlja2VkKGV2ZW50KSB7XG5cdFx0YXdhaXQgdGhpcy5oaWRlU3ViUmVjb3JkcygpO1xuICAgIH1cblxuXHRhc3luYyBoaWRlU3ViUmVjb3JkcygpIHtcblx0XHRhd2FpdCB0aGlzLnRvZ2dsZUNoaWxkRWxlbWVudHMoZmFsc2UpO1xuXHRcdGF3YWl0IHRoaXMudG9nZ2xlU3Bpbm5lcihmYWxzZSk7XG5cdFx0YXdhaXQgdGhpcy50b2dnbGVCdXR0b25zKGZhbHNlKTtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwic3VicmVjb3JkRWxlbWVudHNcIikuY2xlYXIoKTtcblx0XHR0aGlzLmNvbXBvbmVudC5nZXQoXCJidXR0b25zXCIpLmNsZWFyKCk7XG5cdH1cblxufVxuXG5UeXBlQ29uZmlnUGFjay5pbnN0YW5jZSgpLmFkZFR5cGVDb25maWcoXCJudXR0aW4yYy11aVwiLCBQcm90b3R5cGVDb25maWcudW5uYW1lZChUcmVlUGFuZWxFbnRyeSkpOyIsImltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuaW1wb3J0IHsgQ29udGFpbmVyRXZlbnQgfSBmcm9tIFwiY29udGFpbmVyYnJpZGdlX3YxXCI7XG5pbXBvcnQgeyBJbmplY3Rpb25Qb2ludCwgUHJvdG90eXBlQ29uZmlnLCBQcm92aWRlciwgVHlwZUNvbmZpZ1BhY2sgfSBmcm9tIFwibWluZGlfdjFcIjtcbmltcG9ydCB7IENvbXBvbmVudCxcblx0RXZlbnRNYW5hZ2VyLFxuXHRTaW1wbGVFbGVtZW50LFxuXHRDb21wb25lbnRCdWlsZGVyLFxuXHRJbmxpbmVDb21wb25lbnRGYWN0b3J5IH0gZnJvbSBcIm51dHRpbjJjLWNvcmVfdjFcIjtcblxuaW1wb3J0IHsgVHJlZVBhbmVsRW50cnkgfSBmcm9tIFwiLi90cmVlUGFuZWxFbnRyeS90cmVlUGFuZWxFbnRyeS5qc1wiO1xuaW1wb3J0IHsgUGFuZWwgfSBmcm9tIFwiLi4vcGFuZWwvcGFuZWwuanNcIjtcblxuXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiVHJlZVBhbmVsXCIpO1xuXG5leHBvcnQgY2xhc3MgVHJlZVBhbmVsIHtcblxuXHRzdGF0aWMgRVZFTlRfUkVGUkVTSF9DTElDS0VEID0gXCJyZWZyZXNoQ2xpY2tlZFwiO1xuXHRzdGF0aWMgUkVDT1JEX0VMRU1FTlRfUkVRVUVTVEVEID0gXCJyZWNvcmRFbGVtZW50UmVxdWVzdGVkXCI7XG5cdHN0YXRpYyBCRUZPUkVfTE9BRF9FTEVNRU5UX1JFUVVFU1RFRCA9IFwiYmVmb3JlTG9hZEVsZW1lbnRSZXF1ZXN0ZWRcIjtcblx0c3RhdGljIFNVQl9SRUNPUkRTX1NUQVRFX1VQREFURV9SRVFVRVNURUQgPSBcInN1YlJlY29yZHNTdGF0ZVVwZGF0ZVJlcXVlc3RlZFwiO1xuXHRzdGF0aWMgRVZFTlRfRVhQQU5EX1RPR0dMRV9PVkVSUklERSA9IFwiZXhwYW5kVG9nZ2xlT3ZlcnJpZGVcIjtcblxuXHQvKipcblx0ICogXG5cdCAqIEBwYXJhbSB7UGFuZWx9IGJ1dHRvblBhbmVsIFxuXHQgKi9cblx0Y29uc3RydWN0b3IoYnV0dG9uUGFuZWwgPSBudWxsKSB7XG5cblx0XHQvKiogQHR5cGUge0lubGluZUNvbXBvbmVudEZhY3Rvcnl9ICovXG5cdFx0dGhpcy5jb21wb25lbnRGYWN0b3J5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoSW5saW5lQ29tcG9uZW50RmFjdG9yeSk7XG5cdFx0XG5cdFx0LyoqIEB0eXBlIHtDb21wb25lbnR9ICovXG5cdFx0dGhpcy5jb21wb25lbnQgPSBudWxsO1xuXG5cdFx0LyoqIEB0eXBlIHtFdmVudE1hbmFnZXJ9ICovXG5cdFx0dGhpcy5ldmVudHMgPSBuZXcgRXZlbnRNYW5hZ2VyKCk7XG5cblx0XHQvKiogQHR5cGUge1Byb3ZpZGVyPFRyZWVQYW5lbEVudHJ5Pn0gKi9cblx0XHR0aGlzLnRyZWVQYW5lbEVudHJ5UHJvdmllciA9IEluamVjdGlvblBvaW50LnByb3ZpZGVyKFRyZWVQYW5lbEVudHJ5KTtcblxuXHRcdC8qKiBAdHlwZSB7VHJlZVBhbmVsRW50cnl9ICovXG5cdFx0dGhpcy50cmVlUGFuZWxFbnRyeSA9IG51bGw7XG5cblx0XHQvKiogQHR5cGUge1BhbmVsfSAqL1xuXHRcdHRoaXMuYnV0dG9uUGFuZWwgPSBidXR0b25QYW5lbDtcblxuXHR9XG5cblx0LyoqXG5cdCAqIFxuXHQgKiBAcGFyYW0ge0NvbXBvbmVudEJ1aWxkZXJ9IGNvbXBvbmVudEJ1aWxkZXIgXG5cdCAqIEByZXR1cm5zIHtDb21wb25lbnR9XG5cdCAqL1xuXHRzdGF0aWMgYnVpbGRDb21wb25lbnQoY29tcG9uZW50QnVpbGRlcikge1xuXHRcdHJldHVybiBjb21wb25lbnRCdWlsZGVyXG5cdFx0XHQucm9vdChcImRpdlwiLCBcImNsYXNzPWNudHIgY250ci1nYXAtbWVkaXVtIGNudHItcm93cyBjbnRyLXByZXZlbnQtc2l6ZS1jaGFuZ2UgcGFkZGluZy1zbWFsbFwiKVxuXHRcdFx0Lm9wZW4oKVxuXHRcdFx0XHQubm9kZShcImRpdlwiLCBcImlkPWJ1dHRvblBhbmVsXCIpXG5cdFx0XHRcdC5ub2RlKFwiZGl2XCIsIFwiaWQ9cm9vdEVsZW1lbnRcIiwgXCJjbGFzcz1jbnRyLW92ZXJyaWRlLWdyb3ctb25seSBjbnRyIGNudHItcm93cyBjbnRyLWdhcC1zbWFsbFwiKVxuXHRcdFx0LmNsb3NlKClcblx0XHRcdC5idWlsZCgpO1xuXHR9XG5cblx0YXN5bmMgcG9zdENvbmZpZygpIHtcblx0XHR0aGlzLmNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoVHJlZVBhbmVsKTtcblxuXHRcdGlmICh0aGlzLmJ1dHRvblBhbmVsKSB7XG5cdFx0XHR0aGlzLmNvbXBvbmVudC5zZXRDaGlsZChcImJ1dHRvblBhbmVsXCIsIHRoaXMuYnV0dG9uUGFuZWwuY29tcG9uZW50KTtcblx0XHR9XG5cblx0XHR0aGlzLnRyZWVQYW5lbEVudHJ5ID0gYXdhaXQgdGhpcy50cmVlUGFuZWxFbnRyeVByb3ZpZXIuZ2V0KCk7XG5cdFx0dGhpcy50cmVlUGFuZWxFbnRyeS5ldmVudHNcblx0XHRcdC5saXN0ZW5UbyhUcmVlUGFuZWxFbnRyeS5SRUNPUkRfRUxFTUVOVF9SRVFVRVNURUQsIHRoaXMuZW50cnlSZXF1ZXN0ZWQsIHRoaXMpXG5cdFx0XHQubGlzdGVuVG8oVHJlZVBhbmVsRW50cnkuRVZFTlRfRVhQQU5EX1RPR0dMRV9PVkVSUklERSwgdGhpcy5leHBhbmRUb2dnbGVPdmVycmlkZSwgdGhpcylcblx0XHRcdC5saXN0ZW5UbyhUcmVlUGFuZWxFbnRyeS5TVUJfUkVDT1JEU19TVEFURV9VUERBVEVfUkVRVUVTVEVELCB0aGlzLnN1YlJlY29yZHNVcGRhdGVSZXF1ZXN0ZWQsIHRoaXMpO1xuXHRcdHRoaXMudHJlZVBhbmVsRW50cnkudG9nZ2xlU3Bpbm5lcih0cnVlKTtcblx0XHQvLyBSb290IGVsZW1lbnQgaGFzIG5vIHJlY29yZFxuXHRcdHRoaXMudHJlZVBhbmVsRW50cnkuY29tcG9uZW50LmdldChcInN1YnJlY29yZEluZGVudFwiKS5yZW1vdmUoKTtcblx0XHR0aGlzLnRyZWVQYW5lbEVudHJ5LmNvbXBvbmVudC5nZXQoXCJtZXNzYWdlSW5kZW50XCIpLnJlbW92ZSgpO1xuXHRcdHRoaXMudHJlZVBhbmVsRW50cnkuY29tcG9uZW50LmdldChcInJlY29yZEVsZW1lbnRDb250YWluZXJcIikucmVtb3ZlKCk7XG5cblx0fVxuXG5cdC8qKlxuXHQgKiBDYWxsZWQgYnkgdGhlIHJvb3QgVHJlZVBhbmVsRW50cnkgd2hlbiBpdCdzIG9yIG9uZSBvZiBpdCdzIHN1Ym9yZGluYXRlIGVsZW1lbnRzIG5lZWQgdG8gYmUgcmVuZGVyZWRcblx0ICogXG5cdCAqIEBwYXJhbSB7Q29udGFpbmVyRXZlbnR9IGV2ZW50IFxuXHQgKiBAcGFyYW0ge1RyZWVQYW5lbEVudHJ5fSB0cmVlUGFuZWxFbnRyeVxuXHQgKiBAcGFyYW0ge2FueX0gcmVjb3JkXG5cdCAqL1xuXHRhc3luYyBlbnRyeVJlcXVlc3RlZChldmVudCwgcmVjb3JkLCB0cmVlUGFuZWxFbnRyeSwgcGFyZW50VHJlZVBhbmVsRW50cnkpIHtcblx0XHR0cnkge1xuXG5cdFx0XHQvKiogQHR5cGUge2FueX0gKi9cblx0XHRcdGNvbnN0IHBhbmVsID0gYXdhaXQgdGhpcy5ldmVudHNcblx0XHRcdFx0LnRyaWdnZXIoVHJlZVBhbmVsLlJFQ09SRF9FTEVNRU5UX1JFUVVFU1RFRCwgW2V2ZW50LCByZWNvcmQsIHRyZWVQYW5lbEVudHJ5LCBwYXJlbnRUcmVlUGFuZWxFbnRyeV0pO1xuXG5cdFx0XHRyZXR1cm4gcGFuZWw7XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdExPRy5lcnJvcihlcnJvcik7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIENhbGxlZCBieSB0aGUgcm9vdCBUcmVlUGFuZWxFbnRyeSBpdCBhc2tzIGZvciB0aGUgZXhwYW5kIHRvZ2dsZSB0byBiZSBvdmVycmlkZGVuXG5cdCAqIFxuXHQgKiBAcGFyYW0ge0NvbnRhaW5lckV2ZW50fSBldmVudCBcblx0ICogQHBhcmFtIHtUcmVlUGFuZWxFbnRyeX0gdHJlZVBhbmVsRW50cnlcblx0ICogQHBhcmFtIHthbnl9IHJlY29yZFxuXHQgKi9cblx0YXN5bmMgZXhwYW5kVG9nZ2xlT3ZlcnJpZGUoZXZlbnQsIHRyZWVQYW5lbEVudHJ5LCByZWNvcmQpIHtcblx0XHR0cnkge1xuXHRcdFx0YXdhaXQgdGhpcy5ldmVudHNcblx0XHRcdFx0LnRyaWdnZXIoVHJlZVBhbmVsLkVWRU5UX0VYUEFORF9UT0dHTEVfT1ZFUlJJREUsIFt0cmVlUGFuZWxFbnRyeS5leHBhbmRUb2dnbGUsIHJlY29yZF0pO1xuXG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdExPRy5lcnJvcihlcnJvcik7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIENhbGxlZCBieSB0aGUgcm9vdCBUcmVlUGFuZWxFbnRyeSB3aGVuIGl0J3Mgb3Igb25lIG9mIGl0J3Mgc3Vib3JkaW5hdGUgZWxlbWVudHMgbmVlZCB0aGUgc3RhdGUgb2YgdGhlIHN1YnJlY29yZHMgdG8gYmUgdXBkYXRlZCxcblx0ICogZm9yIGV4YW1wbGUgd2hlbiB0aGUgZXhwYW5kIGJ1dHRvbiBpcyBjbGlja2VkXG5cdCAqIFxuXHQgKiBAcGFyYW0ge0NvbnRhaW5lckV2ZW50fSBldmVudCBcblx0ICogQHBhcmFtIHthbnl9IHJlY29yZFxuXHQgKiBAcGFyYW0ge1N0YXRlTWFuYWdlcjxhbnlbXT59IHN0YXRlTWFuYWdlclxuXHQgKiBAcGFyYW0ge1NpbXBsZUVsZW1lbnR9IGVsZW1lbnRCdXR0b25zQ29udGFpbmVyXG5cdCAqIEByZXR1cm5zIHtQcm9taXNlPFRyZWVQYW5lbEVudHJ5W10+fVxuXHQgKi9cblx0YXN5bmMgc3ViUmVjb3Jkc1VwZGF0ZVJlcXVlc3RlZChldmVudCwgcmVjb3JkLCBzdGF0ZU1hbmFnZXIsIGVsZW1lbnRCdXR0b25zQ29udGFpbmVyKSB7XG5cdFx0dGhpcy50cmVlUGFuZWxFbnRyeS50b2dnbGVDaGlsZEVsZW1lbnRzKHRydWUpO1xuXHRcdGF3YWl0IHRoaXMuZXZlbnRzXG5cdFx0XHQudHJpZ2dlcihUcmVlUGFuZWwuU1VCX1JFQ09SRFNfU1RBVEVfVVBEQVRFX1JFUVVFU1RFRCwgW2V2ZW50LCByZWNvcmQsIHN0YXRlTWFuYWdlciwgZWxlbWVudEJ1dHRvbnNDb250YWluZXJdKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXNldFxuXHQgKiBcblx0ICogQHBhcmFtIHtDb250YWluZXJFdmVudH0gZXZlbnQgXG5cdCAqL1xuXHRhc3luYyByZXNldChldmVudCkge1xuXHRcdHRoaXMuc3ViUmVjb3Jkc1VwZGF0ZVJlcXVlc3RlZChldmVudCwgbnVsbCwgdGhpcy50cmVlUGFuZWxFbnRyeS5hcnJheVN0YXRlKTtcblx0XHR0aGlzLmNvbXBvbmVudC5zZXRDaGlsZChcInJvb3RFbGVtZW50XCIsIHRoaXMudHJlZVBhbmVsRW50cnkuY29tcG9uZW50KTtcblx0fVxufVxuXG5UeXBlQ29uZmlnUGFjay5pbnN0YW5jZSgpLmFkZFR5cGVDb25maWcoXCJudXR0aW4yYy11aVwiLCBQcm90b3R5cGVDb25maWcudW5uYW1lZChUcmVlUGFuZWwpKTsiLCJpbXBvcnQge1xuICAgIENhbnZhc1N0eWxlcyxcbiAgICBDb21wb25lbnQsXG4gICAgSW5wdXRFbGVtZW50RGF0YUJpbmRpbmcsXG4gICAgU3R5bGVzaGVldEJ1aWxkZXIsXG4gICAgU3R5bGVzaGVldCxcbiAgICBDb21wb25lbnRCdWlsZGVyLFxuICAgIElubGluZUNvbXBvbmVudEZhY3Rvcnlcbn0gZnJvbSBcIm51dHRpbjJjLWNvcmVfdjFcIjtcbmltcG9ydCB7IEluamVjdGlvblBvaW50LCBQcm90b3R5cGVDb25maWcsIFR5cGVDb25maWdQYWNrIH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcblxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIkNoZWNrQm94XCIpO1xuXG5leHBvcnQgY2xhc3MgQ2hlY2tCb3gge1xuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG1vZGVsXG4gICAgICovXG4gICAgY29uc3RydWN0b3IobmFtZSwgbW9kZWwgPSBudWxsKSB7XG4gICAgICAgIFxuICAgICAgICAvKiogQHR5cGUge0lubGluZUNvbXBvbmVudEZhY3Rvcnl9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKElubGluZUNvbXBvbmVudEZhY3RvcnkpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IG51bGw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtvYmplY3R9ICovXG4gICAgICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3R5bGVzaGVldEJ1aWxkZXJ9IHN0eWxlc2hlZXRCdWlsZGVyIFxuICAgICAqIEByZXR1cm5zIHtTdHlsZXNoZWV0fVxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZFN0eWxlc2hlZXQoc3R5bGVzaGVldEJ1aWxkZXIpIHtcbiAgICAgICAgc3R5bGVzaGVldEJ1aWxkZXJcbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5jaGVjay1ib3hcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsXCJibG9ja1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBvc2l0aW9uXCIsXCJyZWxhdGl2ZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmctbGVmdFwiLFwiMmVtXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luLWJvdHRvbVwiLFwiMC41ZW1cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjdXJzb3JcIixcInBvaW50ZXJcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCItd2Via2l0LXVzZXItc2VsZWN0XCIsXCJub25lXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiLW1vei11c2VyLXNlbGVjdFwiLFwibm9uZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIi1tcy11c2VyLXNlbGVjdFwiLFwibm9uZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInVzZXItc2VsZWN0XCIsXCJub25lXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luLWJvdHRvbVwiLFwiMXJlbVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmNoZWNrLWJveCBpbnB1dFwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBvc2l0aW9uXCIsXCJhYnNvbHV0ZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIixcIjBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjdXJzb3JcIixcInBvaW50ZXJcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJoZWlnaHRcIixcIjBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLFwiMFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmNoZWNrLWJveC1tYXJrXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIixcImFic29sdXRlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidG9wXCIsXCIwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibGVmdFwiLFwiMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIndpZHRoXCIsXCJjYWxjKDFlbSArIDAuNXJlbSArIDJweClcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJoZWlnaHRcIixcImNhbGMoMWVtICsgMC41cmVtICsgMnB4KVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIixcIiNlZWVcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5jaGVjay1ib3g6aG92ZXIgaW5wdXQgfiAuY2hlY2stYm94LW1hcmtcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsXCIjY2NjXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuY2hlY2stYm94IGlucHV0OmNoZWNrZWQgfiAuY2hlY2stYm94LW1hcmtcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsXCIjMjE5NkYzXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuY2hlY2stYm94LW1hcms6YWZ0ZXJcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjb250ZW50XCIsXCJcXFwiXFxcIlwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBvc2l0aW9uXCIsXCJhYnNvbHV0ZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIixcIm5vbmVcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5jaGVjay1ib3ggaW5wdXQ6Y2hlY2tlZCB+IC5jaGVjay1ib3gtbWFyazphZnRlclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIixcImJsb2NrXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuY2hlY2stYm94IC5jaGVjay1ib3gtbWFyazphZnRlclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImxlZnRcIixcIjAuNWVtXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidG9wXCIsXCIwLjRlbVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIndpZHRoXCIsXCIwLjZlbVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImhlaWdodFwiLFwiMC42ZW1cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXJcIixcInNvbGlkIHdoaXRlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyLXdpZHRoXCIsXCIwIDNweCAzcHggMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIi13ZWJraXQtdHJhbnNmb3JtXCIsXCJyb3RhdGUoNDVkZWcpXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiLW1zLXRyYW5zZm9ybVwiLFwicm90YXRlKDQ1ZGVnKVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zZm9ybVwiLFwicm90YXRlKDQ1ZGVnKVwiKVxuICAgICAgICAgICAgLmNsb3NlKCk7XG5cbiAgICAgICAgcmV0dXJuIHN0eWxlc2hlZXRCdWlsZGVyLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDb21wb25lbnRCdWlsZGVyfSBjb21wb25lbnRCdWlsZGVyIFxuICAgICAqIEByZXR1cm5zIHtDb21wb25lbnR9XG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkQ29tcG9uZW50KGNvbXBvbmVudEJ1aWxkZXIpIHtcbiAgICAgICBjb21wb25lbnRCdWlsZGVyXG4gICAgICAgICAgICAucm9vdChcImxhYmVsXCIsIFwiaWQ9Y2hlY2stYm94XCIsIFwiY2xhc3M9Y2hlY2stYm94XCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLm5vZGUoXCJpbnB1dFwiLCBcImlkPWNoZWNrQm94XCIsIFwidHlwZT1jaGVja2JveFwiKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwic3BhblwiLCBcImNsYXNzPWNoZWNrLWJveC1tYXJrXCIpXG4gICAgICAgICAgICAgICAgLnRleHQoXCIgU3RheSBsb2dnZWQgaW5cIilcbiAgICAgICAgICAgIC5jbG9zZSgpO1xuICAgICAgICByZXR1cm4gY29tcG9uZW50QnVpbGRlci5idWlsZCgpO1xuICAgIH1cblxuICAgIHBvc3RDb25maWcoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZShDaGVja0JveCk7XG4gICAgICAgIENhbnZhc1N0eWxlcy5lbmFibGVTdHlsZShDaGVja0JveC5uYW1lKTtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiY2hlY2tCb3hcIikuc2V0QXR0cmlidXRlVmFsdWUoXCJuYW1lXCIsdGhpcy5uYW1lKTtcblxuICAgICAgICBpZih0aGlzLm1vZGVsKSB7XG4gICAgICAgICAgICBJbnB1dEVsZW1lbnREYXRhQmluZGluZy5saW5rKHRoaXMubW9kZWwpLnRvKHRoaXMuY29tcG9uZW50LmdldChcImNoZWNrQm94XCIpKTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuXG5UeXBlQ29uZmlnUGFjay5pbnN0YW5jZSgpLmFkZFR5cGVDb25maWcoXCJudXR0aW4yYy11aVwiLCBQcm90b3R5cGVDb25maWcudW5uYW1lZChDaGVja0JveCkpOyIsImltcG9ydCB7IENvbXBvbmVudCwgQ29tcG9uZW50QnVpbGRlciwgQ3NzM1N0eWxlc2hlZXRCdWlsZGVyLCBFbWFpbFZhbGlkYXRvciwgU3R5bGVzaGVldCwgU3R5bGVzaGVldEJ1aWxkZXIgfSBmcm9tIFwibnV0dGluMmMtY29yZV92MVwiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5pbXBvcnQgeyBDb21tb25JbnB1dCB9IGZyb20gXCIuLi9jb21tb25JbnB1dC5qc1wiO1xuaW1wb3J0IHsgUHJvdG90eXBlQ29uZmlnLCBUeXBlQ29uZmlnUGFjayB9IGZyb20gXCJtaW5kaV92MVwiO1xuXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiRW1haWxJbnB1dFwiKTtcblxuZXhwb3J0IGNsYXNzIEVtYWlsSW5wdXQgZXh0ZW5kcyBDb21tb25JbnB1dCB7XG5cbiAgICBzdGF0aWMgREVGQVVMVF9MQUJFTCA9IFwiRW1haWxcIjtcblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG1vZGVsXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxhYmVsXG4gICAgICogQHBhcmFtIHtib29sZWFufSBtYW5kYXRvcnlcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBtb2RlbCA9IG51bGwsIGxhYmVsID0gRW1haWxJbnB1dC5ERUZBVUxUX0xBQkVMLCBtYW5kYXRvcnkgPSBmYWxzZSkge1xuXG4gICAgICAgIHN1cGVyKEVtYWlsSW5wdXQsXG4gICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgbW9kZWwsXG4gICAgICAgICAgICBuZXcgRW1haWxWYWxpZGF0b3IobWFuZGF0b3J5LCAhbWFuZGF0b3J5KSxcbiAgICAgICAgICAgIGxhYmVsLFxuICAgICAgICAgICAgXCJJbnZhbGlkIGVtYWlsIGFkZHJlc3NcIik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtTdHlsZXNoZWV0QnVpbGRlcn0gc3R5bGVzaGVldEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMge1N0eWxlc2hlZXR9XG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkU3R5bGVzaGVldChzdHlsZXNoZWV0QnVpbGRlcikge1xuICAgICAgICBDc3MzU3R5bGVzaGVldEJ1aWxkZXIuY3JlYXRlKHN0eWxlc2hlZXRCdWlsZGVyKVxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmVtYWlsLWlucHV0LWNvbnRhaW5lclwiKVxuICAgICAgICAgICAgICAgIC5wb3NpdGlvbihcInJlbGF0aXZlXCIpXG4gICAgICAgICAgICAgICAgLnBhZGRpbmcoXCIwLjVyZW1cIilcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmVtYWlsLWlucHV0LWVudHJ5XCIpXG4gICAgICAgICAgICAgICAgLmRpc3BsYXkoXCJibG9ja1wiKVxuICAgICAgICAgICAgICAgIC53aWR0aChcIjEwMCVcIilcbiAgICAgICAgICAgICAgICAuaGVpZ2h0KFwiY2FsYygxLjVlbSArIDFyZW0gKyAycHgpXCIpXG4gICAgICAgICAgICAgICAgLnBhZGRpbmcoXCIwLjdyZW1cIiwgXCIwLjc1cmVtXCIsIFwiMC4zcmVtXCIsIFwiMC43NXJlbVwiKVxuICAgICAgICAgICAgICAgIC5mb250U2l6ZShcIjFyZW1cIilcbiAgICAgICAgICAgICAgICAuZm9udFdlaWdodChcIjQwMFwiKVxuICAgICAgICAgICAgICAgIC5saW5lSGVpZ2h0KFwiMS41XCIpXG4gICAgICAgICAgICAgICAgLmNvbG9yKFwiIzQ5NTA1N1wiKVxuICAgICAgICAgICAgICAgIC5iYWNrZ3JvdW5kQ29sb3IoXCIjZmZmXCIpXG4gICAgICAgICAgICAgICAgLmJhY2tncm91bmRDbGlwKFwicGFkZGluZy1ib3hcIilcbiAgICAgICAgICAgICAgICAuYm9yZGVyKFwiMXB4XCIsIFwic29saWRcIiwgXCIjY2VkNGRhXCIpXG4gICAgICAgICAgICAgICAgLmJvcmRlclJhZGl1cyhcIjAuMjVyZW1cIilcbiAgICAgICAgICAgICAgICAudHJhbnNpdGlvbihcbiAgICAgICAgICAgICAgICAgICAgW1wiYm9yZGVyLWNvbG9yXCIsIFwiMC4xNXNcIiwgbnVsbCwgXCJlYXNlLWluLW91dFwiXSxcbiAgICAgICAgICAgICAgICAgICAgW1wiYm94LXNoYWRvd1wiLCBcIjAuMTVzXCIsIG51bGwsIFwiZWFzZS1pbi1vdXRcIl0pXG4gICAgICAgICAgICAgICAgLm1hcmdpbihudWxsLG51bGwsXCIxcmVtXCIsbnVsbClcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5lbWFpbC1sYWJlbFwiKVxuICAgICAgICAgICAgICAgIC5iYWNrZ3JvdW5kQ29sb3IoXCIjZmZmXCIpXG4gICAgICAgICAgICAgICAgLnBvc2l0aW9uKFwiYWJzb2x1dGVcIilcbiAgICAgICAgICAgICAgICAucGFkZGluZyhcIjBcIiwgXCIwLjI1cmVtXCIsIFwiMFwiLCBcIjAuMjVyZW1cIilcbiAgICAgICAgICAgICAgICAuYm9yZGVyUmFkaXVzKFwiMC41cmVtXCIpXG4gICAgICAgICAgICAgICAgLnRvcChcIi0wLjFyZW1cIilcbiAgICAgICAgICAgICAgICAubGVmdChcIjAuNHJlbVwiKVxuICAgICAgICAgICAgICAgIC5tYXJnaW4oXCIwXCIsIG51bGwsIFwiMC41cmVtXCIsIG51bGwpXG4gICAgICAgICAgICAgICAgLmZvbnRTaXplKFwiMC45cmVtXCIpXG4gICAgICAgICAgICAgICAgLmZvbnRXZWlnaHQoXCJib2xkXCIpXG4gICAgICAgICAgICAgICAgLmNvbG9yKFwiIzhhOGE4YVwiKTtcblxuICAgICAgICByZXR1cm4gc3R5bGVzaGVldEJ1aWxkZXIuYnVpbGQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudEJ1aWxkZXJ9IGNvbXBvbmVudEJ1aWxkZXIgXG4gICAgICogQHJldHVybiB7Q29tcG9uZW50fVxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZENvbXBvbmVudChjb21wb25lbnRCdWlsZGVyKSB7XG4gICAgICAgY29tcG9uZW50QnVpbGRlclxuICAgICAgICAgICAgLnJvb3QoXCJkaXZcIiwgXCJjbGFzcz1lbWFpbC1pbnB1dC1jb250YWluZXJcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAubm9kZShcImRpdlwiLCBcImlkPWJ1YmJsZU1lc3NhZ2VcIilcbiAgICAgICAgICAgICAgICAubm9kZShcImxhYmVsXCIsIFwiaWQ9bGFiZWxcIiwgXCJjbGFzcz1lbWFpbC1sYWJlbCBoaWRkZW5cIilcbiAgICAgICAgICAgICAgICAubm9kZShcImlucHV0XCIsIFwiaWQ9aW5wdXRcIiwgXCJ0eXBlPXRleHRcIiwgXCJjbGFzcz1lbWFpbC1pbnB1dC1lbnRyeVwiKVxuICAgICAgICAgICAgLmNsb3NlKCk7XG4gICAgICAgIHJldHVybiBjb21wb25lbnRCdWlsZGVyLmJ1aWxkKCk7XG4gICAgfVxuXG59XG5cblR5cGVDb25maWdQYWNrLmluc3RhbmNlKCkuYWRkVHlwZUNvbmZpZyhcIm51dHRpbjJjLXVpXCIsIFByb3RvdHlwZUNvbmZpZy51bm5hbWVkKEVtYWlsSW5wdXQpKTsiLCJpbXBvcnQge1xuICAgIENhbnZhc1N0eWxlcyxcbiAgICBDb21wb25lbnQsXG4gICAgSW5wdXRFbGVtZW50RGF0YUJpbmRpbmcsXG4gICAgRXZlbnRNYW5hZ2VyLFxuICAgIFN0eWxlc2hlZXRCdWlsZGVyLFxuICAgIFN0eWxlc2hlZXQsXG4gICAgQ29tcG9uZW50QnVpbGRlcixcbiAgICBJbmxpbmVDb21wb25lbnRGYWN0b3J5LFxuICAgIENzczNTdHlsZXNoZWV0QnVpbGRlcixcbiAgICBTdHlsZVNlbGVjdG9yQWNjZXNzb3Jcbn0gZnJvbSBcIm51dHRpbjJjLWNvcmVfdjFcIjtcbmltcG9ydCB7IEluamVjdGlvblBvaW50LCBQcm90b3R5cGVDb25maWcsIFR5cGVDb25maWdQYWNrIH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcbmltcG9ydCB7IENvbW1vbkV2ZW50cyB9IGZyb20gXCIuLi8uLi9jb21tb24vY29tbW9uRXZlbnRzXCI7XG5pbXBvcnQgeyBDb250YWluZXJFdmVudCB9IGZyb20gXCJjb250YWluZXJicmlkZ2VfdjFcIjtcblxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIkV4cGFuZENoZXZyb25cIik7XG5cbmV4cG9ydCBjbGFzcyBFeHBhbmRDaGV2cm9uIHtcbiAgICBcbiAgICBzdGF0aWMgRVZFTlRfRU5BQkxFRCA9IENvbW1vbkV2ZW50cy5FTkFCTEVEO1xuICAgIHN0YXRpYyBFVkVOVF9ESVNBQkxFRCA9IENvbW1vbkV2ZW50cy5ESVNBQkxFRDtcbiAgICBzdGF0aWMgRVZFTlRfQ0hBTkdFRCA9IENvbW1vbkV2ZW50cy5DSEFOR0VEO1xuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG1vZGVsXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNpemVcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihtb2RlbCA9IG51bGwsIHNpemUgPSBcIm1lZGl1bVwiKSB7XG4gICAgICAgIFxuICAgICAgICAvKiogQHR5cGUge0lubGluZUNvbXBvbmVudEZhY3Rvcnl9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKElubGluZUNvbXBvbmVudEZhY3RvcnkpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7RXZlbnRNYW5hZ2VyfSAqL1xuICAgICAgICB0aGlzLmV2ZW50cyA9IG5ldyBFdmVudE1hbmFnZXIoKTtcblxuICAgICAgICAvKiogQHR5cGUge0NvbXBvbmVudH0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSBudWxsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7b2JqZWN0fSAqL1xuICAgICAgICB0aGlzLm1vZGVsID0gbW9kZWw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtib29sZWFufSAqL1xuICAgICAgICB0aGlzLmV4cGFuZGVkID0gZmFsc2U7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMuc2l6ZSA9IHNpemU7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0eWxlc2hlZXRCdWlsZGVyfSBzdHlsZXNoZWV0QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyB7U3R5bGVzaGVldH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRTdHlsZXNoZWV0KHN0eWxlc2hlZXRCdWlsZGVyKSB7XG4gICAgICAgIGNvbnN0IGNzczNTdHlsZXNoZWV0QnVpbGRlciA9IENzczNTdHlsZXNoZWV0QnVpbGRlci5jcmVhdGUoc3R5bGVzaGVldEJ1aWxkZXIpO1xuICAgICAgICBjc3MzU3R5bGVzaGVldEJ1aWxkZXJcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmV4cGFuZC1jaGV2cm9uXCIpXG4gICAgICAgICAgICAgICAgLmN1cnNvcihcInBvaW50ZXJcIilcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmV4cGFuZC1jaGV2cm9uIGlucHV0XCIpXG4gICAgICAgICAgICAgICAgLm9wYWNpdHkoXCIwXCIpXG4gICAgICAgICAgICAgICAgLndpZHRoKFwiMFwiKVxuICAgICAgICAgICAgICAgIC5oZWlnaHQoXCIwXCIpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5leHBhbmQtY2hldnJvbi1pY29uXCIpXG4gICAgICAgICAgICAgICAgLnRyYW5zaXRpb24oW1widHJhbnNmb3JtXCIsIFwiLjRzXCJdKVxuICAgICAgICAgICAgICAgIC50cmFuc2Zvcm0oXCJyb3RhdGUoMGRlZykgdHJhbnNsYXRlWCgwKVwiKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuZXhwYW5kLWNoZXZyb24taWNvbi1zbWFsbFwiKVxuICAgICAgICAgICAgICAgIC5mb250U2l6ZShcIjFlbVwiKVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmV4cGFuZC1jaGV2cm9uLWljb24tbWVkaXVtXCIpXG4gICAgICAgICAgICAgICAgLmZvbnRTaXplKFwiMS40ZW1cIilcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmV4cGFuZC1jaGV2cm9uLWljb24tbGFyZ2VcIilcbiAgICAgICAgICAgICAgICAuZm9udFNpemUoXCIyZW1cIilcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmV4cGFuZC1jaGV2cm9uIGlucHV0OmNoZWNrZWQgKyAuZXhwYW5kLWNoZXZyb24taWNvblwiKVxuICAgICAgICAgICAgICAgIC50cmFuc2l0aW9uKFtcInRyYW5zZm9ybVwiLCBcIi40c1wiXSlcbiAgICAgICAgICAgICAgICAudHJhbnNmb3JtKFwicm90YXRlKDkwZGVnKSB0cmFuc2xhdGVYKDApXCIpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5leHBhbmQtY2hldnJvbiBpbnB1dDpkaXNhYmxlZCArIC5leHBhbmQtY2hldnJvbi1pY29uXCIpXG4gICAgICAgICAgICAgICAgLm9wYWNpdHkoXCIwLjZcIilcblxuICAgICAgICByZXR1cm4gY3NzM1N0eWxlc2hlZXRCdWlsZGVyLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDb21wb25lbnRCdWlsZGVyfSBjb25tcG9uZW50QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyB7Q29tcG9uZW50fVxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZENvbXBvbmVudChjb25tcG9uZW50QnVpbGRlcikge1xuICAgICAgICByZXR1cm4gY29ubXBvbmVudEJ1aWxkZXJcbiAgICAgICAgICAgIC5yb290KFwibGFiZWxcIiwgXCJjbGFzcz1jbnRyIGNudHItY29sdW1ucyBjbnRyLWNlbnRlcmVkIGV4cGFuZC1jaGV2cm9uXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLm5vZGUoXCJpbnB1dFwiLCBcImlkPWNoZWNrYm94XCIsIFwidHlwZT1jaGVja2JveFwiKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwiaVwiLCBcImlkPWljb25cIiwgXCJjbGFzcz1leHBhbmQtY2hldnJvbi1pY29uIGZhcyBmYS1jaGV2cm9uLXJpZ2h0XCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgcG9zdENvbmZpZygpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKEV4cGFuZENoZXZyb24pO1xuICAgICAgICBDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUoRXhwYW5kQ2hldnJvbi5uYW1lKTtcblxuICAgICAgICBpZiAodGhpcy5tb2RlbCkge1xuICAgICAgICAgICAgSW5wdXRFbGVtZW50RGF0YUJpbmRpbmcubGluayh0aGlzLm1vZGVsKS50byh0aGlzLmNvbXBvbmVudC5nZXQoXCJjaGVja2JveFwiKSk7XG4gICAgICAgIH1cblxuICAgICAgICBTdHlsZVNlbGVjdG9yQWNjZXNzb3IuZnJvbSh0aGlzLmNvbXBvbmVudC5nZXQoXCJpY29uXCIpKS5lbmFibGUoYGV4cGFuZC1jaGV2cm9uLWljb24tJHt0aGlzLnNpemV9YCk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJjaGVja2JveFwiKS5saXN0ZW5UbyhcImNoYW5nZVwiLCB0aGlzLmNsaWNrZWQsIHRoaXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Q29udGFpbmVyRXZlbnR9IGV2ZW50IFxuICAgICAqL1xuICAgIGNsaWNrZWQoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGNvbnN0IG9sZFZhbHVlID0gdGhpcy5leHBhbmRlZDtcbiAgICAgICAgdGhpcy5leHBhbmRlZCA9IGV2ZW50LnRhcmdldC5jaGVja2VkO1xuXG4gICAgICAgIGlmIChvbGRWYWx1ZSAhPT0gdGhpcy5leHBhbmRlZCkge1xuICAgICAgICAgICAgdGhpcy5ldmVudHMudHJpZ2dlcihFeHBhbmRDaGV2cm9uLkVWRU5UX0NIQU5HRUQsIFtldmVudCwgdGhpcy5leHBhbmRlZF0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZXhwYW5kZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzLnRyaWdnZXIoRXhwYW5kQ2hldnJvbi5FVkVOVF9FTkFCTEVELCBbZXZlbnRdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzLnRyaWdnZXIoRXhwYW5kQ2hldnJvbi5FVkVOVF9ESVNBQkxFRCwgW2V2ZW50XSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSB0b2dnbGUgc3RhdGUgcHJvZ3JhbW1hdGljYWxseVxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gZXhwYW5kZWQgXG4gICAgICovXG4gICAgdG9nZ2xlKGV4cGFuZGVkKSB7XG4gICAgICAgIGlmICh0aGlzLmV4cGFuZGVkID09PSBleHBhbmRlZCkge1xuICAgICAgICAgICAgcmV0dXJuOyAvLyBObyBjaGFuZ2VcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmV4cGFuZGVkID0gZXhwYW5kZWQ7XG4gICAgICAgIGlmICh0aGlzLmNvbXBvbmVudCkge1xuICAgICAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwiY2hlY2tib3hcIikuY29udGFpbmVyRWxlbWVudC5jbGljaygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBjdXJyZW50IHRvZ2dsZSBzdGF0ZVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGlzRXhwYW5kZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmV4cGFuZGVkO1xuICAgIH1cblxufVxuXG5UeXBlQ29uZmlnUGFjay5pbnN0YW5jZSgpLmFkZFR5cGVDb25maWcoXCJudXR0aW4yYy11aVwiLCBQcm90b3R5cGVDb25maWcudW5uYW1lZChFeHBhbmRDaGV2cm9uKSk7IiwiaW1wb3J0IHsgQ29udGFpbmVyRXZlbnQsIENvbnRhaW5lckZpbGVEYXRhIH0gZnJvbSBcImNvbnRhaW5lcmJyaWRnZV92MVwiO1xuaW1wb3J0IHsgQ2FudmFzU3R5bGVzLFxuICAgIENvbXBvbmVudCxcbiAgICBFdmVudE1hbmFnZXIsXG4gICAgU3R5bGVzaGVldEJ1aWxkZXIsXG4gICAgU3R5bGVzaGVldCxcbiAgICBDb21wb25lbnRCdWlsZGVyLFxuICAgIElubGluZUNvbXBvbmVudEZhY3Rvcnlcbn0gZnJvbSBcIm51dHRpbjJjLWNvcmVfdjFcIjtcbmltcG9ydCB7IEluamVjdGlvblBvaW50LCBQcm90b3R5cGVDb25maWcsIFR5cGVDb25maWdQYWNrIH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5cbmV4cG9ydCBjbGFzcyBGaWxlVXBsb2FkRW50cnkge1xuICAgIFxuICAgIHN0YXRpYyBFVkVOVF9SRU1PVkVfQ0xJQ0tFRCA9IFwicmVtb3ZlQ2xpY2tlZFwiO1xuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDb250YWluZXJGaWxlRGF0YX0gZmlsZSBcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihmaWxlKSB7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtJbmxpbmVDb21wb25lbnRGYWN0b3J5fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShJbmxpbmVDb21wb25lbnRGYWN0b3J5KTtcbiAgICAgICAgXG4gICAgICAgIC8qKiBAdHlwZSB7RXZlbnRNYW5hZ2VyfSAqL1xuICAgICAgICB0aGlzLmV2ZW50cyA9IG5ldyBFdmVudE1hbmFnZXIoKTtcbiAgICAgICAgXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IG51bGw7XG4gICAgICAgIFxuICAgICAgICAvKiogQHR5cGUge0NvbnRhaW5lckZpbGVEYXRhfSAqL1xuICAgICAgICB0aGlzLmZpbGUgPSBmaWxlO1xuICAgICAgICBcbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMuZmlsZU5hbWUgPSBmaWxlLm5hbWU7XG4gICAgICAgIFxuICAgICAgICAvKiogQHR5cGUge251bWJlcn0gKi9cbiAgICAgICAgdGhpcy5maWxlU2l6ZSA9IGZpbGUuc2l6ZTtcbiAgICAgICAgXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLmZpbGVUeXBlID0gZmlsZS50eXBlO1xuICAgIH1cbiAgICBcbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0eWxlc2hlZXRCdWlsZGVyfSBzdHlsZXNoZWV0QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyB7U3R5bGVzaGVldH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRTdHlsZXNoZWV0KHN0eWxlc2hlZXRCdWlsZGVyKSB7XG4gICAgICAgc3R5bGVzaGVldEJ1aWxkZXJcbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5maWxlLXVwbG9hZC1lbnRyeVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci10b3BcIiwgXCIxcHggc29saWQgI2RkZFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmctdG9wXCIsIFwiNXB0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luLXRvcFwiLCBcIjEwcHRcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5maWxlLXVwbG9hZC1lbnRyeS1kZXRhaWxzXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZGlzcGxheVwiLCBcImZsZXhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmbGV4LWRpcmVjdGlvblwiLCBcInJvd1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImFsaWduLWl0ZW1zXCIsIFwiY2VudGVyXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luLWJvdHRvbVwiLCBcIjhweFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmZpbGUtdXBsb2FkLWVudHJ5LWRldGFpbHMtbmFtZVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZsZXhcIiwgXCIxXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZm9udC13ZWlnaHRcIiwgXCI1MDBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tcmlnaHRcIiwgXCIxMnB4XCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuZmlsZS11cGxvYWQtZW50cnktZGV0YWlscy10eXBlXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZmxleFwiLCBcIjAgMCBhdXRvXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCIjNjY2XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZm9udC1zaXplXCIsIFwiMC45ZW1cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tcmlnaHRcIiwgXCIxMnB4XCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuZmlsZS11cGxvYWQtZW50cnktcmVtb3ZlXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZmxleFwiLCBcIjAgMCBhdXRvXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWFyZ2luLWxlZnRcIiwgXCJhdXRvXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY3Vyc29yXCIsIFwicG9pbnRlclwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbG9yXCIsIFwiZ3JheVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmdcIiwgXCI0cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItcmFkaXVzXCIsIFwiNHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNpdGlvblwiLCBcImJhY2tncm91bmQtY29sb3IgMC4yc1wiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmZpbGUtdXBsb2FkLWVudHJ5LXJlbW92ZTpob3ZlclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIiwgXCIjZjhmOWZhXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuZmlsZS11cGxvYWQtZW50cnktcHJvZ3Jlc3NcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIFwiZmxleFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZsZXgtZGlyZWN0aW9uXCIsIFwicm93XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYWxpZ24taXRlbXNcIiwgXCJjZW50ZXJcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJnYXBcIiwgXCIxMnB4XCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuZmlsZS11cGxvYWQtZW50cnktcHJvZ3Jlc3Mtc2l6ZVwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZsZXhcIiwgXCIwIDAgYXV0b1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtc2l6ZVwiLCBcIjAuOWVtXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCIjNjY2XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWluLXdpZHRoXCIsIFwiODBweFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmZpbGUtdXBsb2FkLWVudHJ5LXByb2dyZXNzLWJhclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZsZXhcIiwgXCIxXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiaGVpZ2h0XCIsIFwiOHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiNlOWVjZWZcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItcmFkaXVzXCIsIFwiNHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwib3ZlcmZsb3dcIiwgXCJoaWRkZW5cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLCBcInJlbGF0aXZlXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuZmlsZS11cGxvYWQtZW50cnktcHJvZ3Jlc3MtYmFyLWZpbGxcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJoZWlnaHRcIiwgXCIxMDAlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiMyOGE3NDVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItcmFkaXVzXCIsIFwiNHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNpdGlvblwiLCBcIndpZHRoIDAuM3MgZWFzZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIndpZHRoXCIsIFwiMCVcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5maWxlLXVwbG9hZC1lbnRyeS1wcm9ncmVzcy1zdGF0dXNcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmbGV4XCIsIFwiMCAwIGF1dG9cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmb250LXNpemVcIiwgXCIwLjllbVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbG9yXCIsIFwiIzY2NlwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1pbi13aWR0aFwiLCBcIjgwcHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0ZXh0LWFsaWduXCIsIFwicmlnaHRcIilcbiAgICAgICAgICAgIC5jbG9zZSgpO1xuXG4gICAgICAgIHJldHVybiBzdHlsZXNoZWV0QnVpbGRlci5idWlsZCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Q29tcG9uZW50QnVpbGRlcn0gY29tcG9uZW50QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyB7Q29tcG9uZW50fVxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZENvbXBvbmVudChjb21wb25lbnRCdWlsZGVyKSB7XG4gICAgICAgIGNvbXBvbmVudEJ1aWxkZXJcbiAgICAgICAgICAgIC5yb290KFwiZGl2XCIsIFwiY2xhc3M9ZmlsZS11cGxvYWQtZW50cnlcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAubm9kZShcImRpdlwiLCBcImNsYXNzPWZpbGUtdXBsb2FkLWVudHJ5LWRldGFpbHNcIilcbiAgICAgICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgICAgIC5ub2RlKFwiZGl2XCIsIFwiaWQ9ZmlsZU5hbWVcIiwgXCJjbGFzcz1maWxlLXVwbG9hZC1lbnRyeS1kZXRhaWxzLW5hbWVcIilcbiAgICAgICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRleHQoXCJGaWxlbmFtZVwiKVxuICAgICAgICAgICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgICAgICAgICAubm9kZShcImRpdlwiLCBcImlkPWZpbGVUeXBlXCIsIFwiY2xhc3M9ZmlsZS11cGxvYWQtZW50cnktZGV0YWlscy10eXBlXCIpXG4gICAgICAgICAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC50ZXh0KFwiRmlsZSBUeXBlXCIpXG4gICAgICAgICAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAgICAgICAgIC5ub2RlKFwiZGl2XCIsIFwiaWQ9cmVtb3ZlQnV0dG9uXCIsIFwiY2xhc3M9ZmlsZS11cGxvYWQtZW50cnktcmVtb3ZlXCIpXG4gICAgICAgICAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5ub2RlKFwiaVwiLCBcImNsYXNzPWZhcyBmYS10cmFzaFwiKVxuICAgICAgICAgICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAgICAgLm5vZGUoXCJkaXZcIiwgXCJjbGFzcz1maWxlLXVwbG9hZC1lbnRyeS1wcm9ncmVzc1wiKVxuICAgICAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAgICAgLm5vZGUoXCJkaXZcIiwgXCJpZD1maWxlU2l6ZVwiLCBcImNsYXNzPWZpbGUtdXBsb2FkLWVudHJ5LXByb2dyZXNzLXNpemVcIilcbiAgICAgICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRleHQoXCJGaWxlIFNpemVcIilcbiAgICAgICAgICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgICAgICAgICAgLm5vZGUoXCJkaXZcIiwgXCJjbGFzcz1maWxlLXVwbG9hZC1lbnRyeS1wcm9ncmVzcy1iYXJcIiwgXCJpZD1maWxlUHJvZ3Jlc3NcIilcbiAgICAgICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm5vZGUoXCJkaXZcIiwgXCJjbGFzcz1maWxlLXVwbG9hZC1lbnRyeS1wcm9ncmVzcy1iYXItZmlsbFwiLCBcImlkPWZpbGVQcm9ncmVzc0JhclwiKVxuICAgICAgICAgICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgICAgICAgICAubm9kZShcImRpdlwiLCBcImlkPWZpbGVTdGF0dXNcIiwgXCJjbGFzcz1maWxlLXVwbG9hZC1lbnRyeS1wcm9ncmVzcy1zdGF0dXNcIilcbiAgICAgICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgLmNsb3NlKCk7XG4gICAgICAgIHJldHVybiBjb21wb25lbnRCdWlsZGVyLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgYXN5bmMgcG9zdENvbmZpZygpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKEZpbGVVcGxvYWRFbnRyeSk7XG4gICAgICAgIENhbnZhc1N0eWxlcy5lbmFibGVTdHlsZShGaWxlVXBsb2FkRW50cnkubmFtZSk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBmaWxlTmFtZUVsZW1lbnQgPSB0aGlzLmNvbXBvbmVudC5nZXQoXCJmaWxlTmFtZVwiKTtcbiAgICAgICAgZmlsZU5hbWVFbGVtZW50LnNldENoaWxkKHRoaXMuZmlsZU5hbWUpO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgZmlsZVNpemVFbGVtZW50ID0gdGhpcy5jb21wb25lbnQuZ2V0KFwiZmlsZVNpemVcIik7XG4gICAgICAgIGZpbGVTaXplRWxlbWVudC5zZXRDaGlsZCgodGhpcy5maWxlU2l6ZSAvIDEwMjQpLnRvRml4ZWQoMikgKyBcIiBLQlwiKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGZpbGVUeXBlRWxlbWVudCA9IHRoaXMuY29tcG9uZW50LmdldChcImZpbGVUeXBlXCIpO1xuICAgICAgICBmaWxlVHlwZUVsZW1lbnQuc2V0Q2hpbGQodGhpcy5maWxlVHlwZSA/IHRoaXMuZmlsZVR5cGUgOiBcIlVua25vd25cIik7XG5cbiAgICAgICAgY29uc3QgcmVtb3ZlQnV0dG9uID0gdGhpcy5jb21wb25lbnQuZ2V0KFwicmVtb3ZlQnV0dG9uXCIpO1xuICAgICAgICByZW1vdmVCdXR0b24ubGlzdGVuVG8oXCJjbGlja1wiLCB0aGlzLnJlbW92ZUNsaWtlZCwgdGhpcyk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVQcm9ncmVzcyh0aGlzLmZpbGUsIHRoaXMuZmlsZS5uYW1lKTtcblxuICAgICAgICBcbiAgICB9XG4gICAgXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDb250YWluZXJFdmVudH0gZXZlbnQgXG4gICAgICovXG4gICAgcmVtb3ZlQ2xpa2VkKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuZXZlbnRzLnRyaWdnZXIoRmlsZVVwbG9hZEVudHJ5LkVWRU5UX1JFTU9WRV9DTElDS0VELCBbZXZlbnQsIHRoaXMuZmlsZV0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Q29udGFpbmVyRmlsZURhdGF9IGZpbGUgXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleSBcbiAgICAgKi9cbiAgICB1cGRhdGVQcm9ncmVzcyhmaWxlLCBrZXkpIHtcbiAgICAgICAgaWYgKGZpbGUpIHtcbiAgICAgICAgICAgIGNvbnN0IHByb2dyZXNzQmFyID0gdGhpcy5jb21wb25lbnQuZ2V0KFwiZmlsZVByb2dyZXNzQmFyXCIpO1xuICAgICAgICAgICAgcHJvZ3Jlc3NCYXIuc2V0U3R5bGUoXCJ3aWR0aFwiLCBmaWxlLnVwbG9hZFBlcmNlbnRhZ2UgKyBcIiVcIik7XG4gICAgICAgICAgICBpZiAoZmlsZS51cGxvYWRQZXJjZW50YWdlID49IDEwMCkge1xuICAgICAgICAgICAgICAgIGZpbGUudXBsb2FkQ29tcGxldGUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5UeXBlQ29uZmlnUGFjay5pbnN0YW5jZSgpLmFkZFR5cGVDb25maWcoXCJudXR0aW4yYy11aVwiLCBQcm90b3R5cGVDb25maWcudW5uYW1lZChGaWxlVXBsb2FkRW50cnkpKTsiLCJpbXBvcnQgeyBDb250YWluZXJFdmVudCwgQ29udGFpbmVyRmlsZURhdGEgfSBmcm9tIFwiY29udGFpbmVyYnJpZGdlX3YxXCI7XG5pbXBvcnQgeyBMb2dnZXIsIE1ldGhvZCB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuaW1wb3J0IHsgQ2FudmFzU3R5bGVzLFxuICAgIENvbXBvbmVudCxcbiAgICBFdmVudE1hbmFnZXIsXG4gICAgU2ltcGxlRWxlbWVudCxcbiAgICBTdHlsZVNlbGVjdG9yQWNjZXNzb3IsXG4gICAgSFRNTCxcbiAgICBTdGF0ZU1hbmFnZXIsXG4gICAgU3R5bGVzaGVldEJ1aWxkZXIsXG4gICAgU3R5bGVzaGVldCxcbiAgICBDb21wb25lbnRCdWlsZGVyLFxuICAgIElubGluZUNvbXBvbmVudEZhY3Rvcnlcbn0gZnJvbSBcIm51dHRpbjJjLWNvcmVfdjFcIjtcbmltcG9ydCB7IEluamVjdGlvblBvaW50LCBQcm90b3R5cGVDb25maWcsIFByb3ZpZGVyLCBUeXBlQ29uZmlnUGFjayB9IGZyb20gXCJtaW5kaV92MVwiO1xuaW1wb3J0IHsgRmlsZVVwbG9hZEVudHJ5IH0gZnJvbSBcIi4vZmlsZVVwbG9hZEVudHJ5L2ZpbGVVcGxvYWRFbnRyeS5qc1wiO1xuaW1wb3J0IHsgQ29tbW9uRXZlbnRzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb21tb25FdmVudHMuanNcIjtcblxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIkZpbGVVcGxvYWRcIik7XG5cbmV4cG9ydCBjbGFzcyBGaWxlVXBsb2FkIHtcblxuXHRzdGF0aWMgREVGQVVMVF9QTEFDRUhPTERFUiA9IFwiRmlsZVVwbG9hZFwiO1xuXG5cdHN0YXRpYyBFVkVOVF9DTElDS0VEID0gQ29tbW9uRXZlbnRzLkNMSUNLRUQ7XG4gICAgc3RhdGljIEVWRU5UX0ZJTEVfQURERUQgPSBcImZpbGVBZGRlZFwiO1xuICAgIHN0YXRpYyBFVkVOVF9GSUxFX1JFTU9WRUQgPSBcImZpbGVSZW1vdmVkXCI7XG4gICAgc3RhdGljIEVWRU5UX1VQTE9BRF9DT01QTEVURSA9IFwidXBsb2FkQ29tcGxldGVcIjtcbiAgICBzdGF0aWMgRVZFTlRfVVBMT0FEX1JFU0VUID0gXCJ1cGxvYWRSZXNldFwiO1xuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgXG4gICAgICogQHBhcmFtIHtib29sZWFufSBtdWx0aXBsZVxuICAgICAqIEBwYXJhbSB7QXJyYXk8c3RyaW5nPn0gZmlsZVR5cGVBcnJheVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIG11bHRpcGxlID0gZmFsc2UsIGZpbGVUeXBlQXJyYXkgPSBbXSkge1xuICAgICAgICBcbiAgICAgICAgLyoqIEB0eXBlIHtJbmxpbmVDb21wb25lbnRGYWN0b3J5fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShJbmxpbmVDb21wb25lbnRGYWN0b3J5KTtcblxuICAgICAgICAvKiogQHR5cGUge0V2ZW50TWFuYWdlcn0gKi9cbiAgICAgICAgdGhpcy5ldmVudHMgPSBuZXcgRXZlbnRNYW5hZ2VyKCk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnR9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gbnVsbDtcblxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcblxuICAgICAgICAvKiogQHR5cGUge2Jvb2xlYW59ICovXG4gICAgICAgIHRoaXMubXVsdGlwbGUgPSBtdWx0aXBsZTtcbiAgICAgICAgXG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nW119ICovXG4gICAgICAgIHRoaXMuZmlsZVR5cGVBcnJheSA9IGZpbGVUeXBlQXJyYXk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtTdGF0ZU1hbmFnZXI8Q29udGFpbmVyRmlsZURhdGE+fSAgKi9cbiAgICAgICAgdGhpcy5maWxlQXJyYXlTdGF0ZSA9IG5ldyBTdGF0ZU1hbmFnZXIoKTtcblxuICAgICAgICAvKiogQHR5cGUge1Byb3ZpZGVyPEZpbGVVcGxvYWRFbnRyeT59ICovXG4gICAgICAgIHRoaXMuZmlsZVVwbG9hZEVudHJ5UHJvdmlkZXIgPSBJbmplY3Rpb25Qb2ludC5wcm92aWRlcihGaWxlVXBsb2FkRW50cnkpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHlsZXNoZWV0QnVpbGRlcn0gc3R5bGVzaGVldEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMge1N0eWxlc2hlZXR9XG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkU3R5bGVzaGVldChzdHlsZXNoZWV0QnVpbGRlcikge1xuICAgICAgIHN0eWxlc2hlZXRCdWlsZGVyXG4gICAgICAgICAgIC5zZWxlY3RvcihcIi5maWxlLXVwbG9hZC1lcnJvclwiKVxuICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwid2lkdGhcIiwgXCJmaXQtY29udGVudFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbG9yXCIsIFwiIzMzMzMzM1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZSgrNXB4LC01cHgpXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiNGRkZGRTBcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJmb250LXdlaWdodFwiLCBcIm5vcm1hbFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtc2l6ZVwiLCBcIjE0cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItcmFkaXVzXCIsIFwiOHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIiwgXCJyZWxhdGl2ZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInotaW5kZXhcIiwgXCI5OTk5OTk5OFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJveC1zaXppbmdcIiwgXCJib3JkZXItYm94XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm94LXNoYWRvd1wiLCBcIjAgMXB4IDhweCByZ2JhKDAsMCwwLDAuNSlcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjdXJzb3JcIiwgXCJwb2ludGVyXCIpXG4gICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgLnNlbGVjdG9yKFwiLmZpbGUtdXBsb2FkLWVycm9yLWhpZGRlblwiKVxuICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNpdGlvblwiLCBcIm1heC1oZWlnaHQgLjNzIC4ycywgcGFkZGluZyAuM3MgLjJzLCBvcGFjaXR5IC4ycyAwcywgdmlzaWJpbGl0eSAwcyAuMnNcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmdcIiwgXCIwcHggMHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWF4LWhlaWdodFwiLCBcIjBweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgXCJibG9ja1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInZpc2liaWxpdHlcIiwgXCJoaWRkZW5cIilcbiAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAuc2VsZWN0b3IoXCIuZmlsZS11cGxvYWQtZXJyb3ItdmlzaWJsZVwiKVxuICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNpdGlvblwiLCBcIm1heC1oZWlnaHQgLjNzLCBwYWRkaW5nIC4ycywgb3BhY2l0eSAuMnMgLjJzXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCBcIjFcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwYWRkaW5nXCIsIFwiMTBweCAyMHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibWF4LWhlaWdodFwiLCBcIjUwcHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ2aXNpYmlsaXR5XCIsIFwidmlzaWJsZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpbi10b3BcIiwgXCIxMHB4XCIpXG4gICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgLnNlbGVjdG9yKFwiLmZpbGUtdXBsb2FkLWVycm9yIGlcIilcbiAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBvc2l0aW9uXCIsIFwiYWJzb2x1dGVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0b3BcIiwgXCIxMDAlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibGVmdFwiLCBcIjMwJVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpbi1sZWZ0XCIsIFwiLTE1cHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLCBcIjMwcHhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJoZWlnaHRcIiwgXCIxNXB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwib3ZlcmZsb3dcIiwgXCJoaWRkZW5cIilcbiAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAuc2VsZWN0b3IoXCIuZmlsZS11cGxvYWQtYm94XCIpXG4gICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXJcIiwgXCIycHggZGFzaGVkICNjZWQ0ZGFcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItcmFkaXVzXCIsIFwiMC4yNXJlbVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBhZGRpbmdcIiwgXCIxcmVtXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY3Vyc29yXCIsIFwicG9pbnRlclwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zaXRpb25cIiwgXCJiYWNrZ3JvdW5kLWNvbG9yIDAuMTVzIGVhc2UtaW4tb3V0LCBib3JkZXItY29sb3IgMC4xNXMgZWFzZS1pbi1vdXRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tYm90dG9tXCIsIFwiMTVwdFwiKVxuICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgIC5zZWxlY3RvcihcIi5maWxlLXVwbG9hZC1ib3gtaW5zdHJ1Y3Rpb25zXCIpXG4gICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0ZXh0LWFsaWduXCIsIFwiY2VudGVyXCIpXG4gICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgLnNlbGVjdG9yKFwiLmZpbGUtdXBsb2FkLWJveC1pbnN0cnVjdGlvbnMtaWNvblwiKVxuICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwid2lkdGhcIiwgXCI0OHB4XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiaGVpZ2h0XCIsIFwiNDhweFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm1hcmdpblwiLCBcIjAgYXV0byAwIGF1dG9cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLXNpemVcIiwgXCJjb250YWluXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1yZXBlYXRcIiwgXCJuby1yZXBlYXRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLXBvc2l0aW9uXCIsIFwiY2VudGVyXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCIjZTFlMWUxXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiZm9udC1zaXplXCIsIFwiM3JlbVwiKVxuICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgIC5zZWxlY3RvcihcIi5maWxlLXVwbG9hZC1ib3gtaW5zdHJ1Y3Rpb25zLXRleHRcIilcbiAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtc2l6ZVwiLCBcIjFyZW1cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjb2xvclwiLCBcIiM2Yzc1N2RcIilcbiAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAuc2VsZWN0b3IoXCIuZmlsZS11cGxvYWQtYm94LWRyYWdvdmVyXCIpXG4gICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiI2U5ZWNlZlwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1jb2xvclwiLCBcIiM4MGJkZmZcIilcbiAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAuc2VsZWN0b3IoXCIuZmlsZS11cGxvYWQtaW5wdXRcIilcbiAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgXCJub25lXCIpXG4gICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgLnNlbGVjdG9yKFwiLmZpbGUtdXBsb2FkLXVuc3VwcG9ydGVkLWZpbGVcIilcbiAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbG9yXCIsIFwiI2RjMzU0NVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtc2l6ZVwiLCBcIjAuODc1cmVtXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicGFkZGluZ1wiLCBcIjAuMjVyZW0gMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1sZWZ0XCIsIFwiM3B4IHNvbGlkICNkYzM1NDVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwYWRkaW5nLWxlZnRcIiwgXCIwLjVyZW1cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tdG9wXCIsIFwiMC41MHJlbVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIiwgXCIjZjhkN2RhXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyLXJhZGl1c1wiLCBcIjAuMjVyZW1cIilcbiAgICAgICAgICAgLmNsb3NlKCk7XG4gICAgICAgICByZXR1cm4gc3R5bGVzaGVldEJ1aWxkZXIuYnVpbGQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudEJ1aWxkZXJ9IGNvbXBvbmVudEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMge0NvbXBvbmVudH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRDb21wb25lbnQoY29tcG9uZW50QnVpbGRlcikge1xuICAgICAgICBjb21wb25lbnRCdWlsZGVyXG4gICAgICAgICAgICAucm9vdChcImRpdlwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwiZGl2XCIsIFwiaWQ9ZmlsZVVwbG9hZEVycm9yXCIsIFwiY2xhc3M9ZmlsZS11cGxvYWQtZXJyb3IgZmlsZS11cGxvYWQtZXJyb3ItaGlkZGVuXCIpXG4gICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAudGV4dChcIkludmFsaWQgZmlsZS11cGxvYWRcIilcbiAgICAgICAgICAgICAgICAgICAgLm5vZGUoXCJpXCIpXG4gICAgICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgICAgICAubm9kZShcImRpdlwiLCBcImlkPXVwbG9hZEJveFwiLCBcImNsYXNzPWZpbGUtdXBsb2FkLWJveFwiKVxuICAgICAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAgICAgLm5vZGUoXCJkaXZcIiwgXCJpZD1pbnN0cnVjdGlvbnNcIiwgXCJjbGFzcz1maWxlLXVwbG9hZC1ib3gtaW5zdHJ1Y3Rpb25zXCIpXG4gICAgICAgICAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5ub2RlKFwiaW5wdXRcIiwgXCJpZD1maWxlSW5wdXRcIiwgXCJ0eXBlPWZpbGVcIiwgXCJjbGFzcz1maWxlLXVwbG9hZC1pbnB1dFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm5vZGUoXCJkaXZcIiwgXCJpZD11cGxvYWRCb3hJY29uXCIsIFwiY2xhc3M9ZmFzIGZhLXVwbG9hZCBmaWxlLXVwbG9hZC1ib3gtaW5zdHJ1Y3Rpb25zLWljb25cIilcbiAgICAgICAgICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgICAgICAgICAgLm5vZGUoXCJkaXZcIiwgXCJpZD11bnN1cHBvcnRlZFwiKVxuICAgICAgICAgICAgICAgICAgICAubm9kZShcImRpdlwiLCBcImlkPWZpbGVMaXN0XCIpXG4gICAgICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgIC5jbG9zZSgpO1xuICAgICAgICByZXR1cm4gY29tcG9uZW50QnVpbGRlci5idWlsZCgpO1xuICAgIH1cblxuICAgIHBvc3RDb25maWcoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZShGaWxlVXBsb2FkKTtcbiAgICAgICAgQ2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKEZpbGVVcGxvYWQubmFtZSk7XG5cbiAgICAgICAgXG4gICAgICAgIC8qKiBAdHlwZSB7U2ltcGxlRWxlbWVudH0gKi9cbiAgICAgICAgY29uc3QgdXBsb2FkQm94ID0gdGhpcy5jb21wb25lbnQuZ2V0KFwidXBsb2FkQm94XCIpO1xuICAgICAgICB1cGxvYWRCb3gubGlzdGVuVG8oXCJkcmFnb3ZlclwiLCB0aGlzLmRyYWdPdmVyLCB0aGlzKTtcbiAgICAgICAgdXBsb2FkQm94Lmxpc3RlblRvKFwiZHJhZ2xlYXZlXCIsIHRoaXMuZHJhZ0xlYXZlLCB0aGlzKTtcbiAgICAgICAgdXBsb2FkQm94Lmxpc3RlblRvKFwiZHJvcFwiLCB0aGlzLmZpbGVEcm9wcGVkLCB0aGlzKTtcbiAgICAgICAgdXBsb2FkQm94Lmxpc3RlblRvKFwiY2xpY2tcIiwgdGhpcy5maWxlSW5wdXRDbGlja2VkLCB0aGlzKTtcblxuICAgICAgICBpZiAodGhpcy5tdWx0aXBsZSkge1xuICAgICAgICAgICAgY29uc3QgZmlsZUlucHV0ID0gdGhpcy5jb21wb25lbnQuZ2V0KFwiZmlsZUlucHV0XCIpO1xuICAgICAgICAgICAgZmlsZUlucHV0LmNvbnRhaW5lckVsZW1lbnQuc2V0QXR0cmlidXRlVmFsdWUoXCJtdWx0aXBsZVwiLCBcIm11bHRpcGxlXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZmlsZUlucHV0ID0gdGhpcy5jb21wb25lbnQuZ2V0KFwiZmlsZUlucHV0XCIpO1xuICAgICAgICBmaWxlSW5wdXQubGlzdGVuVG8oXCJjaGFuZ2VcIiwgdGhpcy5maWxlSW5wdXRDaGFuZ2VkLCB0aGlzKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Q29udGFpbmVyRXZlbnR9IGV2ZW50IFxuICAgICAqL1xuICAgIGZpbGVJbnB1dENsaWNrZWQoZXZlbnQpIHtcbiAgICAgICAgY29uc3QgZmlsZUlucHV0ID0gdGhpcy5jb21wb25lbnQuZ2V0KFwiZmlsZUlucHV0XCIpO1xuICAgICAgICBmaWxlSW5wdXQuY29udGFpbmVyRWxlbWVudC52YWx1ZSA9IG51bGw7XG4gICAgICAgIGZpbGVJbnB1dC5jb250YWluZXJFbGVtZW50LmNsaWNrKCk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge0NvbnRhaW5lckV2ZW50fSBldmVudFxuICAgICAqL1xuICAgIGZpbGVJbnB1dENoYW5nZWQoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5wcm9jZXNzRmlsZXMoZXZlbnQuZmlsZXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFByb2Nlc3MgdXBsb2FkZWQgZmlsZXMgYW5kIHZhbGlkYXRlIGFnYWluc3QgZmlsZSB0eXBlIGFycmF5XG4gICAgICogQHBhcmFtIHtDb250YWluZXJGaWxlRGF0YVtdfSBmaWxlc1xuICAgICAqL1xuICAgIGFzeW5jIHByb2Nlc3NGaWxlcyhmaWxlcykge1xuICAgICAgICBjb25zdCBzdXBwb3J0ZWRGaWxlcyA9IFtdO1xuICAgICAgICBjb25zdCB1bnN1cHBvcnRlZEZpbGVzID0gW107XG4gICAgICAgIGNvbnN0IGFkZGVkRmlsZXMgPSBbXTtcblxuICAgICAgICBmb3IgKGNvbnN0IGZpbGUgb2YgZmlsZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IHN1cHBvcnRlZEZpbGUgPSB0aGlzLmlzRmlsZVR5cGVTdXBwb3J0ZWQoZmlsZSk7XG4gICAgICAgICAgICBjb25zdCBmaWxlQWxyZWFkeVNlbGV0ZWQgPSB0aGlzLmZpbGVBbHJlYWR5U2VsZXRlZChmaWxlKTtcbiAgICAgICAgICAgIGlmIChzdXBwb3J0ZWRGaWxlICYmICFmaWxlQWxyZWFkeVNlbGV0ZWQpIHtcbiAgICAgICAgICAgICAgICBzdXBwb3J0ZWRGaWxlcy5wdXNoKGZpbGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFzdXBwb3J0ZWRGaWxlKSB7XG4gICAgICAgICAgICAgICAgdW5zdXBwb3J0ZWRGaWxlcy5wdXNoKGZpbGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gSGFuZGxlIHN1cHBvcnRlZCBmaWxlc1xuICAgICAgICBpZiAoc3VwcG9ydGVkRmlsZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgaWYgKHRoaXMubXVsdGlwbGUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maWxlQXJyYXlTdGF0ZS5jbGVhcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChjb25zdCBmaWxlIG9mIHN1cHBvcnRlZEZpbGVzKSB7XG4gICAgICAgICAgICAgICAgYWRkZWRGaWxlcy5wdXNoKGF3YWl0IHRoaXMuZmlsZUFycmF5U3RhdGUudXBkYXRlRG9tYWluKGZpbGUsIGZpbGUubmFtZSkpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm11bHRpcGxlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTaG93IHVuc3VwcG9ydGVkIGZpbGVzXG4gICAgICAgIHRoaXMuc2hvd1Vuc3VwcG9ydGVkRmlsZXModW5zdXBwb3J0ZWRGaWxlcyk7XG4gICAgICAgIGF3YWl0IHRoaXMudXBkYXRlRmlsZUxpc3QoKTtcblxuICAgICAgICAvLyBUcmlnZ2VyIGZpbGUgYWRkZWQgZXZlbnQgZm9yIGVhY2ggc3VwcG9ydGVkIGZpbGVcbiAgICAgICAgZm9yIChjb25zdCBmaWxlIG9mIGFkZGVkRmlsZXMpIHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzLnRyaWdnZXIoRmlsZVVwbG9hZC5FVkVOVF9GSUxFX0FEREVELCBbZmlsZV0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZmlsZUFscmVhZHlTZWxldGVkKGZpbGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmlsZUFycmF5U3RhdGUuZG9tYWluTWFwLmhhcyhmaWxlLm5hbWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIGZpbGUgdHlwZSBpcyBzdXBwb3J0ZWRcbiAgICAgKiBAcGFyYW0ge0NvbnRhaW5lckZpbGVEYXRhfSBmaWxlXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgaXNGaWxlVHlwZVN1cHBvcnRlZChmaWxlKSB7XG4gICAgICAgIC8vIElmIGZpbGVUeXBlQXJyYXkgaXMgZW1wdHksIGFjY2VwdCBhbGwgZmlsZXNcbiAgICAgICAgaWYgKHRoaXMuZmlsZVR5cGVBcnJheS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ2hlY2sgaWYgZmlsZSdzIE1JTUUgdHlwZSBtYXRjaGVzIGFueSBpbiB0aGUgZmlsZVR5cGVBcnJheVxuICAgICAgICByZXR1cm4gdGhpcy5maWxlVHlwZUFycmF5LmluY2x1ZGVzKGZpbGUudHlwZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGlzcGxheSB1bnN1cHBvcnRlZCBmaWxlcyBpbiB0aGUgdW5zdXBwb3J0ZWQgZGl2XG4gICAgICogQHBhcmFtIHtBcnJheTxGaWxlPn0gdW5zdXBwb3J0ZWRGaWxlc1xuICAgICAqL1xuICAgIHNob3dVbnN1cHBvcnRlZEZpbGVzKHVuc3VwcG9ydGVkRmlsZXMpIHtcbiAgICAgICAgY29uc3QgdW5zdXBwb3J0ZWREaXYgPSB0aGlzLmNvbXBvbmVudC5nZXQoXCJ1bnN1cHBvcnRlZFwiKTtcbiAgICAgICAgdW5zdXBwb3J0ZWREaXYuY2xlYXIoKTtcblxuICAgICAgICBpZiAodW5zdXBwb3J0ZWRGaWxlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB1bnN1cHBvcnRlZERpdi5jbGVhcigpO1xuICAgICAgICAgICAgZm9yIChjb25zdCBmaWxlIG9mIHVuc3VwcG9ydGVkRmlsZXMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBtZXNzYWdlRWxlbWVudCA9IEhUTUwuY3VzdG9tKFwiZGl2XCIpO1xuICAgICAgICAgICAgICAgIG1lc3NhZ2VFbGVtZW50LnNldEF0dHJpYnV0ZVZhbHVlKFwiY2xhc3NcIixcImZpbGUtdXBsb2FkLXVuc3VwcG9ydGVkLWZpbGVcIik7XG4gICAgICAgICAgICAgICAgbWVzc2FnZUVsZW1lbnQuc2V0Q2hpbGQoYEZpbGUgXCIke2ZpbGUubmFtZX1cIiBpcyBub3Qgc3VwcG9ydGVkLmApO1xuICAgICAgICAgICAgICAgIHVuc3VwcG9ydGVkRGl2LmFkZENoaWxkKG1lc3NhZ2VFbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7Q29udGFpbmVyRXZlbnR9IGV2ZW50XG4gICAgICovXG4gICAgZHJhZ092ZXIoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgY29uc3QgdXBsb2FkQm94ID0gdGhpcy5jb21wb25lbnQuZ2V0KFwidXBsb2FkQm94XCIpO1xuICAgICAgICBTdHlsZVNlbGVjdG9yQWNjZXNzb3IuZnJvbSh1cGxvYWRCb3gpLmVuYWJsZShcImZpbGUtdXBsb2FkLWJveC1kcmFnb3ZlclwiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge0NvbnRhaW5lckV2ZW50fSBldmVudFxuICAgICAqL1xuICAgIGRyYWdMZWF2ZShldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICBjb25zdCB1cGxvYWRCb3ggPSB0aGlzLmNvbXBvbmVudC5nZXQoXCJ1cGxvYWRCb3hcIik7XG4gICAgICAgIFN0eWxlU2VsZWN0b3JBY2Nlc3Nvci5mcm9tKHVwbG9hZEJveCkuZGlzYWJsZShcImZpbGUtdXBsb2FkLWJveC1kcmFnb3ZlclwiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAgQHBhcmFtIHtDb250YWluZXJFdmVudH0gZXZlbnRcbiAgICAgKi9cbiAgICBmaWxlRHJvcHBlZChldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICBjb25zdCB1cGxvYWRCb3ggPSB0aGlzLmNvbXBvbmVudC5nZXQoXCJ1cGxvYWRCb3hcIik7XG4gICAgICAgIFN0eWxlU2VsZWN0b3JBY2Nlc3Nvci5mcm9tKHVwbG9hZEJveCkuZGlzYWJsZShcImZpbGUtdXBsb2FkLWJveC1kcmFnb3ZlclwiKTtcblxuICAgICAgICB0aGlzLnByb2Nlc3NGaWxlcyhldmVudC5maWxlcyk7XG4gICAgfVxuXG4gICAgYXN5bmMgdXBkYXRlRmlsZUxpc3QoKSB7XG4gICAgICAgIGNvbnN0IGZpbGVMaXN0ID0gdGhpcy5jb21wb25lbnQuZ2V0KFwiZmlsZUxpc3RcIik7XG4gICAgICAgIGZpbGVMaXN0LmNsZWFyKCk7XG4gICAgICAgIHRoaXMuZXZlbnRzLnRyaWdnZXIoRmlsZVVwbG9hZC5FVkVOVF9VUExPQURfUkVTRVQpO1xuICAgICAgICBmb3IgKGNvbnN0IGZpbGUgb2YgdGhpcy5maWxlQXJyYXlTdGF0ZS5kb21haW5NYXAudmFsdWVzKCkpIHtcbiAgICAgICAgICAgIGNvbnN0IGZpbGVFbnRyeSA9IGF3YWl0IHRoaXMuZmlsZVVwbG9hZEVudHJ5UHJvdmlkZXIuZ2V0KFtmaWxlXSk7XG4gICAgICAgICAgICBmaWxlRW50cnkuZXZlbnRzLmxpc3RlblRvKEZpbGVVcGxvYWRFbnRyeS5FVkVOVF9SRU1PVkVfQ0xJQ0tFRCwgdGhpcy5yZW1vdmVGaWxlRW50cnksIHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5maWxlQXJyYXlTdGF0ZS5yZWFjdFRvKGZpbGUubmFtZSwgbmV3IE1ldGhvZChmaWxlRW50cnkudXBkYXRlUHJvZ3Jlc3MsIGZpbGVFbnRyeSkpO1xuICAgICAgICAgICAgZmlsZUxpc3QuYWRkQ2hpbGQoZmlsZUVudHJ5LmNvbXBvbmVudCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5maWxlQXJyYXlTdGF0ZS5yZWFjdChuZXcgTWV0aG9kKHRoaXMuY2hlY2tGaWxlVXBsb2FkQ29tcGxldGUsIHRoaXMpKTtcbiAgICB9XG5cbiAgICBjaGVja0ZpbGVVcGxvYWRDb21wbGV0ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuZmlsZUFycmF5U3RhdGUuZG9tYWluTWFwLnNpemUgPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzLnRyaWdnZXIoRmlsZVVwbG9hZC5FVkVOVF9VUExPQURfUkVTRVQpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgZmlsZSBvZiB0aGlzLmZpbGVBcnJheVN0YXRlLmRvbWFpbk1hcC52YWx1ZXMoKSkge1xuICAgICAgICAgICAgaWYgKCFmaWxlLnVwbG9hZENvbXBsZXRlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuZXZlbnRzLnRyaWdnZXIoRmlsZVVwbG9hZC5FVkVOVF9VUExPQURfQ09NUExFVEUsIFt0aGlzLmZpbGVBcnJheVN0YXRlLm9iamVjdEFycmF5XSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDb250YWluZXJFdmVudH0gZXZlbnRcbiAgICAgKiBAcGFyYW0ge0ZpbGV9IGZpbGVcbiAgICAgKiBAcGFyYW0ge2FueX0gYXJnc1xuICAgICAqL1xuICAgIGFzeW5jIHJlbW92ZUZpbGVFbnRyeShldmVudCwgZmlsZSwgYXJncykge1xuICAgICAgICB0aGlzLmZpbGVBcnJheVN0YXRlLmRlbGV0ZShmaWxlLm5hbWUpO1xuICAgICAgICAvLyBDbGVhciB1bnN1cHBvcnRlZCBmaWxlcyB3aGVuIHVwZGF0aW5nIGZpbGUgbGlzdFxuICAgICAgICBjb25zdCB1bnN1cHBvcnRlZERpdiA9IHRoaXMuY29tcG9uZW50LmdldChcInVuc3VwcG9ydGVkXCIpO1xuICAgICAgICB1bnN1cHBvcnRlZERpdi5jbGVhcigpO1xuICAgICAgICBhd2FpdCB0aGlzLnVwZGF0ZUZpbGVMaXN0KCk7XG4gICAgICAgIC8vIFByZXZlbnQgdGhlIGNsaWNrIGV2ZW50IGZyb20gYnViYmxpbmcgdXAgdG8gdGhlIHVwbG9hZCBib3hcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHRoaXMuY2hlY2tGaWxlVXBsb2FkQ29tcGxldGUoKTtcbiAgICB9XG5cbiAgICBjbGlja2VkKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuZXZlbnRzLnRyaWdnZXIoRmlsZVVwbG9hZC5FVkVOVF9DTElDS0VELCBbZXZlbnRdKTtcbiAgICB9XG5cbiAgICBmb2N1cygpIHtcblxuICAgIH1cbn1cblxuVHlwZUNvbmZpZ1BhY2suaW5zdGFuY2UoKS5hZGRUeXBlQ29uZmlnKFwibnV0dGluMmMtdWlcIiwgUHJvdG90eXBlQ29uZmlnLnVubmFtZWQoRmlsZVVwbG9hZCkpOyIsImltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuaW1wb3J0IHsgQ29tbW9uSW5wdXQgfSBmcm9tIFwiLi4vY29tbW9uSW5wdXRcIjtcbmltcG9ydCB7IENvbXBvbmVudCwgQ29tcG9uZW50QnVpbGRlciwgQ3NzM1N0eWxlc2hlZXRCdWlsZGVyLCBTdHlsZXNoZWV0LCBTdHlsZXNoZWV0QnVpbGRlciB9IGZyb20gXCJudXR0aW4yYy1jb3JlX3YxXCI7XG5pbXBvcnQgeyBQcm90b3R5cGVDb25maWcsIFR5cGVDb25maWdQYWNrIH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5cbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJIaWRkZW5JbnB1dFwiKTtcblxuZXhwb3J0IGNsYXNzIEhpZGRlbklucHV0IGV4dGVuZHMgQ29tbW9uSW5wdXQge1xuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gbW9kZWxcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBtb2RlbCA9IG51bGwpIHtcblxuICAgICAgICBzdXBlcihIaWRkZW5JbnB1dCxcbiAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICBtb2RlbCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHlsZXNoZWV0QnVpbGRlcn0gc3R5bGVzaGVldEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMge1N0eWxlc2hlZXR9XG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkU3R5bGVzaGVldChzdHlsZXNoZWV0QnVpbGRlcikge1xuICAgICAgICBDc3MzU3R5bGVzaGVldEJ1aWxkZXIuY3JlYXRlKHN0eWxlc2hlZXRCdWlsZGVyKVxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLmhpZGRlbi1pbnB1dC1lbnRyeVwiKTtcblxuICAgICAgICByZXR1cm4gc3R5bGVzaGVldEJ1aWxkZXIuYnVpbGQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudEJ1aWxkZXJ9IGNvbXBvbmVudEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMge0NvbXBvbmVudH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRDb21wb25lbnQoY29tcG9uZW50QnVpbGRlcikge1xuICAgICAgICByZXR1cm4gY29tcG9uZW50QnVpbGRlclxuICAgICAgICAgICAgLnJvb3QoXCJpbnB1dFwiLCBcImlkPWlucHV0XCIsIFwidHlwZT1oaWRkZW5cIiwgXCJjbGFzcz1oaWRkZW4taW5wdXQtZW50cnlcIilcbiAgICAgICAgICAgIC5idWlsZCgpO1xuICAgIH1cblxufVxuXG5UeXBlQ29uZmlnUGFjay5pbnN0YW5jZSgpLmFkZFR5cGVDb25maWcoXCJudXR0aW4yYy11aVwiLCBQcm90b3R5cGVDb25maWcudW5uYW1lZChIaWRkZW5JbnB1dCkpOyIsImltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBDb21wb25lbnRCdWlsZGVyLCBDc3MzU3R5bGVzaGVldEJ1aWxkZXIsIE51bWJlclZhbGlkYXRvciwgU3R5bGVzaGVldCwgU3R5bGVzaGVldEJ1aWxkZXIgfSBmcm9tIFwibnV0dGluMmMtY29yZV92MVwiO1xuaW1wb3J0IHsgQ29tbW9uSW5wdXQgfSBmcm9tIFwiLi4vY29tbW9uSW5wdXQuanNcIjtcbmltcG9ydCB7IFByb3RvdHlwZUNvbmZpZywgVHlwZUNvbmZpZ1BhY2sgfSBmcm9tIFwibWluZGlfdjFcIjtcblxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIlRleHRJbnB1dFwiKTtcblxuZXhwb3J0IGNsYXNzIE51bWJlcklucHV0IGV4dGVuZHMgQ29tbW9uSW5wdXQge1xuXG4gICAgc3RhdGljIERFRkFVTFRfTEFCRUwgPSBcIk51bWJlclwiO1xuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gbW9kZWxcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGFiZWxcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IG1hbmRhdG9yeVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIG1vZGVsID0gbnVsbCwgbGFiZWwgPSBOdW1iZXJJbnB1dC5ERUZBVUxUX0xBQkVMLCBtYW5kYXRvcnkgPSBmYWxzZSkge1xuXG4gICAgICAgIHN1cGVyKE51bWJlcklucHV0LFxuICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgIG1vZGVsLFxuICAgICAgICAgICAgbmV3IE51bWJlclZhbGlkYXRvcihtYW5kYXRvcnksICFtYW5kYXRvcnkpLFxuICAgICAgICAgICAgbGFiZWwsXG4gICAgICAgICAgICBcIkludmFsaWQgdmFsdWVcIik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHlsZXNoZWV0QnVpbGRlcn0gc3R5bGVzaGVldEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMge1N0eWxlc2hlZXR9XG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkU3R5bGVzaGVldChzdHlsZXNoZWV0QnVpbGRlcikge1xuICAgICAgICBDc3MzU3R5bGVzaGVldEJ1aWxkZXIuY3JlYXRlKHN0eWxlc2hlZXRCdWlsZGVyKVxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLm51bWJlci1pbnB1dC1jb250YWluZXJcIilcbiAgICAgICAgICAgICAgICAucG9zaXRpb24oXCJyZWxhdGl2ZVwiKVxuICAgICAgICAgICAgICAgIC5wYWRkaW5nKFwiMC41cmVtXCIpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5udW1iZXItaW5wdXQtZW50cnlcIilcbiAgICAgICAgICAgICAgICAuZGlzcGxheShcImJsb2NrXCIpXG4gICAgICAgICAgICAgICAgLndpZHRoKFwiMTAwJVwiKVxuICAgICAgICAgICAgICAgIC5oZWlnaHQoXCJjYWxjKDEuNWVtICsgMXJlbSArIDJweClcIilcbiAgICAgICAgICAgICAgICAucGFkZGluZyhcIjAuN3JlbVwiLCBcIjAuNzVyZW1cIiwgXCIwLjNyZW1cIiwgXCIwLjc1cmVtXCIpXG4gICAgICAgICAgICAgICAgLmZvbnRTaXplKFwiMXJlbVwiKVxuICAgICAgICAgICAgICAgIC5mb250V2VpZ2h0KFwiNDAwXCIpXG4gICAgICAgICAgICAgICAgLmxpbmVIZWlnaHQoXCIxLjVcIilcbiAgICAgICAgICAgICAgICAuY29sb3IoXCIjNDk1MDU3XCIpXG4gICAgICAgICAgICAgICAgLmJhY2tncm91bmRDb2xvcihcIiNmZmZcIilcbiAgICAgICAgICAgICAgICAuYmFja2dyb3VuZENsaXAoXCJwYWRkaW5nLWJveFwiKVxuICAgICAgICAgICAgICAgIC5ib3JkZXIoXCIxcHhcIiwgXCJzb2xpZFwiLCBcIiNjZWQ0ZGFcIilcbiAgICAgICAgICAgICAgICAuYm9yZGVyUmFkaXVzKFwiMC4yNXJlbVwiKVxuICAgICAgICAgICAgICAgIC50cmFuc2l0aW9uKFxuICAgICAgICAgICAgICAgICAgICBbXCJib3JkZXItY29sb3JcIiwgXCIwLjE1c1wiLCBudWxsLCBcImVhc2UtaW4tb3V0XCJdLFxuICAgICAgICAgICAgICAgICAgICBbXCJib3gtc2hhZG93XCIsIFwiMC4xNXNcIiwgbnVsbCwgXCJlYXNlLWluLW91dFwiXSlcbiAgICAgICAgICAgICAgICAubWFyZ2luKG51bGwsbnVsbCxcIjFyZW1cIixudWxsKVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLm51bWJlci1sYWJlbFwiKVxuICAgICAgICAgICAgICAgIC5iYWNrZ3JvdW5kQ29sb3IoXCIjZmZmXCIpXG4gICAgICAgICAgICAgICAgLnBvc2l0aW9uKFwiYWJzb2x1dGVcIilcbiAgICAgICAgICAgICAgICAucGFkZGluZyhcIjBcIiwgXCIwLjI1cmVtXCIsIFwiMFwiLCBcIjAuMjVyZW1cIilcbiAgICAgICAgICAgICAgICAuYm9yZGVyUmFkaXVzKFwiMC41cmVtXCIpXG4gICAgICAgICAgICAgICAgLnRvcChcIi0wLjFyZW1cIilcbiAgICAgICAgICAgICAgICAubGVmdChcIjAuNHJlbVwiKVxuICAgICAgICAgICAgICAgIC5tYXJnaW4oXCIwXCIsIG51bGwsIFwiMC41cmVtXCIsIG51bGwpXG4gICAgICAgICAgICAgICAgLmZvbnRTaXplKFwiMC45cmVtXCIpXG4gICAgICAgICAgICAgICAgLmZvbnRXZWlnaHQoXCJib2xkXCIpXG4gICAgICAgICAgICAgICAgLmNvbG9yKFwiIzhhOGE4YVwiKTtcblxuICAgICAgICByZXR1cm4gc3R5bGVzaGVldEJ1aWxkZXIuYnVpbGQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudEJ1aWxkZXJ9IGNvbXBvbmVudEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMge0NvbXBvbmVudH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRDb21wb25lbnQoY29tcG9uZW50QnVpbGRlcikge1xuICAgICAgICByZXR1cm4gY29tcG9uZW50QnVpbGRlclxuICAgICAgICAgICAgLnJvb3QoXCJkaXZcIiwgXCJjbGFzcz1udW1iZXItaW5wdXQtY29udGFpbmVyXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLm5vZGUoXCJkaXZcIiwgXCJpZD1idWJibGVNZXNzYWdlXCIpXG4gICAgICAgICAgICAgICAgLm5vZGUoXCJsYWJlbFwiLCBcImlkPWxhYmVsXCIsIFwiY2xhc3M9bnVtYmVyLWxhYmVsIGhpZGRlblwiKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwiaW5wdXRcIiwgXCJpZD1pbnB1dFwiLCBcInR5cGU9bnVtYmVyXCIsIFwicGF0dGVybj1bMC05XSpcIiwgXCJpbnB1dG1vZGU9bnVtZXJpY1wiLCBcImNsYXNzPW51bWJlci1pbnB1dC1lbnRyeVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgIC5idWlsZCgpO1xuICAgIH1cbn1cblxuVHlwZUNvbmZpZ1BhY2suaW5zdGFuY2UoKS5hZGRUeXBlQ29uZmlnKFwibnV0dGluMmMtdWlcIiwgUHJvdG90eXBlQ29uZmlnLnVubmFtZWQoTnVtYmVySW5wdXQpKTsiLCJpbXBvcnQgeyBDb21wb25lbnQsIENvbXBvbmVudEJ1aWxkZXIsIENzczNTdHlsZXNoZWV0QnVpbGRlciwgUmVxdWlyZWRWYWxpZGF0b3IsIFN0eWxlc2hlZXQsIFN0eWxlc2hlZXRCdWlsZGVyIH0gZnJvbSBcIm51dHRpbjJjLWNvcmVfdjFcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuaW1wb3J0IHsgQ29tbW9uSW5wdXQgfSBmcm9tIFwiLi4vY29tbW9uSW5wdXQuanNcIjtcbmltcG9ydCB7IFByb3RvdHlwZUNvbmZpZywgVHlwZUNvbmZpZ1BhY2sgfSBmcm9tIFwibWluZGlfdjFcIjtcblxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIlBhc3N3b3JkSW5wdXRcIik7XG5cbmV4cG9ydCBjbGFzcyBQYXNzd29yZElucHV0IGV4dGVuZHMgQ29tbW9uSW5wdXQge1xuXG4gICAgc3RhdGljIERFRkFVTFRfTEFCRUwgPSBcIlBhc3N3b3JkXCI7XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBtb2RlbFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsYWJlbFxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gbWFuZGF0b3J5XG4gICAgICovXG4gICAgY29uc3RydWN0b3IobmFtZSwgbW9kZWwgPSBudWxsLCBsYWJlbCA9IFBhc3N3b3JkSW5wdXQuREVGQVVMVF9MQUJFTCwgbWFuZGF0b3J5ID0gZmFsc2UpIHtcblxuICAgICAgICBzdXBlcihQYXNzd29yZElucHV0LFxuICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgIG1vZGVsLFxuICAgICAgICAgICAgbmV3IFJlcXVpcmVkVmFsaWRhdG9yKCFtYW5kYXRvcnkpLFxuICAgICAgICAgICAgbGFiZWwsXG4gICAgICAgICAgICBcIlBhc3N3b3JkIHJlcXVpcmVkXCIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7U3R5bGVzaGVldEJ1aWxkZXJ9IHN0eWxlc2hlZXRCdWlsZGVyIFxuICAgICAqIEByZXR1cm5zIHtTdHlsZXNoZWV0fVxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZFN0eWxlc2hlZXQoc3R5bGVzaGVldEJ1aWxkZXIpIHtcbiAgICAgICAgQ3NzM1N0eWxlc2hlZXRCdWlsZGVyLmNyZWF0ZShzdHlsZXNoZWV0QnVpbGRlcilcbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5wYXNzd29yZC1pbnB1dC1jb250YWluZXJcIilcbiAgICAgICAgICAgICAgICAucG9zaXRpb24oXCJyZWxhdGl2ZVwiKVxuICAgICAgICAgICAgICAgIC5wYWRkaW5nKFwiMC41cmVtXCIpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5wYXNzd29yZC1pbnB1dC1lbnRyeVwiKVxuICAgICAgICAgICAgICAgIC5kaXNwbGF5KFwiYmxvY2tcIilcbiAgICAgICAgICAgICAgICAud2lkdGgoXCIxMDAlXCIpXG4gICAgICAgICAgICAgICAgLmhlaWdodChcImNhbGMoMS41ZW0gKyAxcmVtICsgMnB4KVwiKVxuICAgICAgICAgICAgICAgIC5wYWRkaW5nKFwiMC43cmVtXCIsIFwiMC43NXJlbVwiLCBcIjAuM3JlbVwiLCBcIjAuNzVyZW1cIilcbiAgICAgICAgICAgICAgICAuZm9udFNpemUoXCIxcmVtXCIpXG4gICAgICAgICAgICAgICAgLmZvbnRXZWlnaHQoXCI0MDBcIilcbiAgICAgICAgICAgICAgICAubGluZUhlaWdodChcIjEuNVwiKVxuICAgICAgICAgICAgICAgIC5jb2xvcihcIiM0OTUwNTdcIilcbiAgICAgICAgICAgICAgICAuYmFja2dyb3VuZENvbG9yKFwiI2ZmZlwiKVxuICAgICAgICAgICAgICAgIC5iYWNrZ3JvdW5kQ2xpcChcInBhZGRpbmctYm94XCIpXG4gICAgICAgICAgICAgICAgLmJvcmRlcihcIjFweFwiLCBcInNvbGlkXCIsIFwiI2NlZDRkYVwiKVxuICAgICAgICAgICAgICAgIC5ib3JkZXJSYWRpdXMoXCIwLjI1cmVtXCIpXG4gICAgICAgICAgICAgICAgLnRyYW5zaXRpb24oW1wiYm9yZGVyLWNvbG9yXCIsIFwiMC4xNXNcIiwgbnVsbCwgXCJlYXNlLWluLW91dFwiXSwgW1wiYm94LXNoYWRvd1wiLCBcIjAuMTVzXCIsIG51bGwsIFwiZWFzZS1pbi1vdXRcIl0pXG4gICAgICAgICAgICAgICAgLm1hcmdpbihudWxsLG51bGwsXCIxcmVtXCIsbnVsbClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBhc3N3b3JkLWlucHV0LWVycm9yXCIpXG4gICAgICAgICAgICAgICAgLndpZHRoKFwiZml0LWNvbnRlbnRcIilcbiAgICAgICAgICAgICAgICAuY29sb3IoXCIjMzMzMzMzXCIpXG4gICAgICAgICAgICAgICAgLnRyYW5zZm9ybShcInRyYW5zbGF0ZSgrNXB4LC01cHgpXCIpXG4gICAgICAgICAgICAgICAgLmJhY2tncm91bmRDb2xvcihcIiNGRkZGRTBcIilcbiAgICAgICAgICAgICAgICAuZm9udFdlaWdodChcIm5vcm1hbFwiKVxuICAgICAgICAgICAgICAgIC5mb250U2l6ZShcIjE0cHhcIilcbiAgICAgICAgICAgICAgICAuYm9yZGVyUmFkaXVzKFwiOHB4XCIpXG4gICAgICAgICAgICAgICAgLnBvc2l0aW9uKFwicmVsYXRpdmVcIilcbiAgICAgICAgICAgICAgICAuekluZGV4KFwiOTk5OTk5OThcIilcbiAgICAgICAgICAgICAgICAuYm94U2l6aW5nKFwiYm9yZGVyLWJveFwiKVxuICAgICAgICAgICAgICAgIC5ib3hTaGFkb3coXCIwXCIsIFwiMXB4XCIsIFwiOHB4XCIsIG51bGwsIFwicmdiYSgwLDAsMCwwLjUpXCIpXG4gICAgICAgICAgICAgICAgLmN1cnNvcihcInBvaW50ZXJcIilcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBhc3N3b3JkLWlucHV0LWVycm9yLWhpZGRlblwiKVxuICAgICAgICAgICAgICAgIC50cmFuc2l0aW9uKFtcIm1heC1oZWlnaHRcIiwgXCIuM3NcIiwgXCIuMnNcIl0sIFtcInBhZGRpbmdcIiwgXCIuM3NcIiwgXCIuMnNcIl0sIFtcIm9wYWNpdHlcIiwgXCIuMnNcIiwgXCIwc1wiXSwgW1widmlzaWJpbGl0eVwiLCBcIjBzXCIsIFwiLjJzXCJdKVxuICAgICAgICAgICAgICAgIC5vcGFjaXR5KFwiMFwiKVxuICAgICAgICAgICAgICAgIC5wYWRkaW5nKFwiMHB4XCIsXCIwcHhcIiwgbnVsbCwgbnVsbClcbiAgICAgICAgICAgICAgICAubWF4SGVpZ2h0KFwiMHB4XCIpXG4gICAgICAgICAgICAgICAgLmRpc3BsYXkoXCJibG9ja1wiKVxuICAgICAgICAgICAgICAgIC52aXNpYmlsaXR5KFwiaGlkZGVuXCIpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5wYXNzd29yZC1pbnB1dC1lcnJvci12aXNpYmxlXCIpXG4gICAgICAgICAgICAgICAgLnRyYW5zaXRpb24oW1wibWF4LWhlaWdodFwiLCBcIi4zc1wiLCBcIjBzXCJdLCBbXCJwYWRkaW5nXCIsIFwiLjJzXCIsIFwiMHNcIl0sIFtcIm9wYWNpdHlcIiwgXCIuMnNcIiwgXCIuMnNcIl0pXG4gICAgICAgICAgICAgICAgLm9wYWNpdHkoXCIxXCIpXG4gICAgICAgICAgICAgICAgLnBhZGRpbmcoXCIxMHB4XCIsIFwiMjBweFwiLCBcIjEwcHhcIiwgXCIyMHB4XCIpXG4gICAgICAgICAgICAgICAgLm1heEhlaWdodChcIjUwcHhcIilcbiAgICAgICAgICAgICAgICAuZGlzcGxheShcImJsb2NrXCIpXG4gICAgICAgICAgICAgICAgLnZpc2liaWxpdHkoXCJ2aXNpYmxlXCIpXG4gICAgICAgICAgICAgICAgLm1hcmdpbihcIjEwcHhcIiwgbnVsbCwgbnVsbCwgbnVsbClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBhc3N3b3JkLWlucHV0LWVycm9yIGlcIilcbiAgICAgICAgICAgICAgICAucG9zaXRpb24oXCJhYnNvbHV0ZVwiKVxuICAgICAgICAgICAgICAgIC50b3AoXCIxMDAlXCIpXG4gICAgICAgICAgICAgICAgLmxlZnQoXCIzMCVcIilcbiAgICAgICAgICAgICAgICAubWFyZ2luKG51bGwsIG51bGwsIG51bGwsIFwiLTE1cHhcIilcbiAgICAgICAgICAgICAgICAud2lkdGgoXCIzMHB4XCIpXG4gICAgICAgICAgICAgICAgLmhlaWdodChcIjE1cHhcIilcbiAgICAgICAgICAgICAgICAub3ZlcmZsb3coXCJoaWRkZW5cIilcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBhc3N3b3JkLWlucHV0LWVycm9yIGk6OmFmdGVyXCIpXG4gICAgICAgICAgICAgICAgLmNvbnRlbnQoXCInJ1wiKVxuICAgICAgICAgICAgICAgIC5wb3NpdGlvbihcImFic29sdXRlXCIpXG4gICAgICAgICAgICAgICAgLndpZHRoKFwiMTVweFwiKVxuICAgICAgICAgICAgICAgIC5oZWlnaHQoXCIxNXB4XCIpXG4gICAgICAgICAgICAgICAgLmxlZnQoXCI1MCVcIilcbiAgICAgICAgICAgICAgICAudHJhbnNmb3JtKFwidHJhbnNsYXRlKC01MCUsLTUwJSkgcm90YXRlKDQ1ZGVnKVwiKVxuICAgICAgICAgICAgICAgIC5iYWNrZ3JvdW5kQ29sb3IoXCIjRkZGRkUwXCIpXG4gICAgICAgICAgICAgICAgLmJveFNoYWRvdyhcIjBcIiwgXCIxcHhcIiwgXCI4cHhcIiwgbnVsbCwgXCJyZ2JhKDAsMCwwLDAuNSlcIilcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5wYXNzd29yZC1sYWJlbFwiKVxuICAgICAgICAgICAgICAgIC5iYWNrZ3JvdW5kQ29sb3IoXCIjZmZmXCIpXG4gICAgICAgICAgICAgICAgLnBvc2l0aW9uKFwiYWJzb2x1dGVcIilcbiAgICAgICAgICAgICAgICAucGFkZGluZyhcIjBcIiwgXCIwLjI1cmVtXCIsIFwiMFwiLCBcIjAuMjVyZW1cIilcbiAgICAgICAgICAgICAgICAuYm9yZGVyUmFkaXVzKFwiMC41cmVtXCIpXG4gICAgICAgICAgICAgICAgLnRvcChcIi0wLjFyZW1cIilcbiAgICAgICAgICAgICAgICAubGVmdChcIjAuNHJlbVwiKVxuICAgICAgICAgICAgICAgIC5tYXJnaW4oXCIwXCIsIG51bGwsIFwiMC41cmVtXCIsIG51bGwpXG4gICAgICAgICAgICAgICAgLmZvbnRTaXplKFwiMC45cmVtXCIpXG4gICAgICAgICAgICAgICAgLmZvbnRXZWlnaHQoXCJib2xkXCIpXG4gICAgICAgICAgICAgICAgLmNvbG9yKFwiIzhhOGE4YVwiKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgcmV0dXJuIHN0eWxlc2hlZXRCdWlsZGVyLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDb21wb25lbnRCdWlsZGVyfSBjb21wb25lbnRCdWlsZGVyIFxuICAgICAqIEByZXR1cm5zIHtDb21wb25lbnR9XG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkQ29tcG9uZW50KGNvbXBvbmVudEJ1aWxkZXIpIHtcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudEJ1aWxkZXJcbiAgICAgICAgICAgIC5yb290KFwiZGl2XCIsIFwiY2xhc3M9cGFzc3dvcmQtaW5wdXQtY29udGFpbmVyXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLm5vZGUoXCJkaXZcIiwgXCJpZD1idWJibGVNZXNzYWdlXCIpXG4gICAgICAgICAgICAgICAgLm5vZGUoXCJsYWJlbFwiLCBcImlkPWxhYmVsXCIsIFwiY2xhc3M9cGFzc3dvcmQtbGFiZWwgaGlkZGVuXCIpXG4gICAgICAgICAgICAgICAgLm5vZGUoXCJpbnB1dFwiLCBcImlkPWlucHV0XCIsIFwidHlwZT1wYXNzd29yZFwiLCBcImNsYXNzPXBhc3N3b3JkLWlucHV0LWVudHJ5XCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgLmJ1aWxkKCk7XG4gICAgfVxuXG59XG5cblR5cGVDb25maWdQYWNrLmluc3RhbmNlKCkuYWRkVHlwZUNvbmZpZyhcIm51dHRpbjJjLXVpXCIsIFByb3RvdHlwZUNvbmZpZy51bm5hbWVkKFBhc3N3b3JkSW5wdXQpKTsiLCJpbXBvcnQgeyBDb21wb25lbnQsIENvbXBvbmVudEJ1aWxkZXIsIENzczNTdHlsZXNoZWV0QnVpbGRlciwgUGFzc3dvcmRWYWxpZGF0b3IsIFN0eWxlc2hlZXQsIFN0eWxlc2hlZXRCdWlsZGVyIH0gZnJvbSBcIm51dHRpbjJjLWNvcmVfdjFcIjtcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuaW1wb3J0IHsgQ29tbW9uSW5wdXQgfSBmcm9tIFwiLi4vLi4vY29tbW9uSW5wdXQuanNcIjtcbmltcG9ydCB7IFByb3RvdHlwZUNvbmZpZywgVHlwZUNvbmZpZ1BhY2sgfSBmcm9tIFwibWluZGlfdjFcIjtcblxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIlBhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWVcIik7XG5cbmV4cG9ydCBjbGFzcyBQYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlIGV4dGVuZHMgQ29tbW9uSW5wdXQge1xuXG4gICAgc3RhdGljIERFRkFVTFRfTEFCRUwgPSBcIk5ldyBwYXNzd29yZFwiO1xuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gbW9kZWxcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGFiZWxcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IG1hbmRhdG9yeVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIG1vZGVsID0gbnVsbCwgbGFiZWwgPSBQYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlLkRFRkFVTFRfTEFCRUwsIG1hbmRhdG9yeSA9IGZhbHNlKSB7XG5cbiAgICAgICAgc3VwZXIoUGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZSxcbiAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICBtb2RlbCxcbiAgICAgICAgICAgIG5ldyBQYXNzd29yZFZhbGlkYXRvcihtYW5kYXRvcnkpLFxuICAgICAgICAgICAgbGFiZWwsXG4gICAgICAgICAgICBcIk1pbmltdW0gOCBjaGFyYWN0ZXJzIGNvbnRhaW5pbmc6XCIsXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgXCJMZXR0ZXIocylcIixcbiAgICAgICAgICAgICAgICBcIk51bWJlcihzKVwiLFxuICAgICAgICAgICAgICAgIFwiU3BlY2lhbCBjaGFyYWN0ZXIocykgIz8hQCQlXiYqLVwiXG4gICAgICAgICAgICBdKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0eWxlc2hlZXRCdWlsZGVyfSBzdHlsZXNoZWV0QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyB7U3R5bGVzaGVldH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRTdHlsZXNoZWV0KHN0eWxlc2hlZXRCdWlsZGVyKSB7XG4gICAgICAgIENzczNTdHlsZXNoZWV0QnVpbGRlci5jcmVhdGUoc3R5bGVzaGVldEJ1aWxkZXIpXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucGFzc3dvcmQtbWF0Y2hlci1pbnB1dC12YWx1ZS1jb250YWluZXJcIilcbiAgICAgICAgICAgICAgICAucG9zaXRpb24oXCJyZWxhdGl2ZVwiKVxuICAgICAgICAgICAgICAgIC5wYWRkaW5nKFwiMC41cmVtXCIpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5wYXNzd29yZC1tYXRjaGVyLWlucHV0LXZhbHVlLWVudHJ5XCIpXG4gICAgICAgICAgICAgICAgLmRpc3BsYXkoXCJibG9ja1wiKVxuICAgICAgICAgICAgICAgIC53aWR0aChcIjEwMCVcIilcbiAgICAgICAgICAgICAgICAuaGVpZ2h0KFwiY2FsYygxLjVlbSArIDFyZW0gKyAycHgpXCIpXG4gICAgICAgICAgICAgICAgLnBhZGRpbmcoXCIwLjdyZW1cIiwgXCIwLjc1cmVtXCIsIFwiMC4zcmVtXCIsIFwiMC43NXJlbVwiKVxuICAgICAgICAgICAgICAgIC5mb250U2l6ZShcIjFyZW1cIilcbiAgICAgICAgICAgICAgICAuZm9udFdlaWdodChcIjQwMFwiKVxuICAgICAgICAgICAgICAgIC5saW5lSGVpZ2h0KFwiMS41XCIpXG4gICAgICAgICAgICAgICAgLmNvbG9yKFwiIzQ5NTA1N1wiKVxuICAgICAgICAgICAgICAgIC5iYWNrZ3JvdW5kQ29sb3IoXCIjZmZmXCIpXG4gICAgICAgICAgICAgICAgLmJhY2tncm91bmRDbGlwKFwicGFkZGluZy1ib3hcIilcbiAgICAgICAgICAgICAgICAuYm9yZGVyKFwiMXB4XCIsIFwic29saWRcIiwgXCIjY2VkNGRhXCIpXG4gICAgICAgICAgICAgICAgLmJvcmRlclJhZGl1cyhcIjAuMjVyZW1cIilcbiAgICAgICAgICAgICAgICAudHJhbnNpdGlvbihbXCJib3JkZXItY29sb3JcIiwgXCIwLjE1c1wiLCBudWxsLCBcImVhc2UtaW4tb3V0XCJdLCBbXCJib3gtc2hhZG93XCIsIFwiMC4xNXNcIiwgbnVsbCwgXCJlYXNlLWluLW91dFwiXSlcbiAgICAgICAgICAgICAgICAubWFyZ2luKG51bGwsbnVsbCxcIjFyZW1cIixudWxsKVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBhc3N3b3JkLW1hdGNoZXItaW5wdXQtdmFsdWUtbGFiZWxcIilcbiAgICAgICAgICAgICAgICAuYmFja2dyb3VuZENvbG9yKFwiI2ZmZlwiKVxuICAgICAgICAgICAgICAgIC5wb3NpdGlvbihcImFic29sdXRlXCIpXG4gICAgICAgICAgICAgICAgLnBhZGRpbmcoXCIwXCIsIFwiMC4yNXJlbVwiLCBcIjBcIiwgXCIwLjI1cmVtXCIpXG4gICAgICAgICAgICAgICAgLmJvcmRlclJhZGl1cyhcIjAuNXJlbVwiKVxuICAgICAgICAgICAgICAgIC50b3AoXCItMC4xcmVtXCIpXG4gICAgICAgICAgICAgICAgLmxlZnQoXCIwLjRyZW1cIilcbiAgICAgICAgICAgICAgICAubWFyZ2luKFwiMFwiLCBudWxsLCBcIjAuNXJlbVwiLCBudWxsKVxuICAgICAgICAgICAgICAgIC5mb250U2l6ZShcIjAuOXJlbVwiKVxuICAgICAgICAgICAgICAgIC5mb250V2VpZ2h0KFwiYm9sZFwiKVxuICAgICAgICAgICAgICAgIC5jb2xvcihcIiM4YThhOGFcIik7XG5cbiAgICAgICAgcmV0dXJuIHN0eWxlc2hlZXRCdWlsZGVyLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDb21wb25lbnRCdWlsZGVyfSBjb21wb25lbnRCdWlsZGVyIFxuICAgICAqIEByZXR1cm5zIHtDb21wb25lbnR9XG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkQ29tcG9uZW50KGNvbXBvbmVudEJ1aWxkZXIpIHtcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudEJ1aWxkZXJcbiAgICAgICAgICAgIC5yb290KFwiZGl2XCIsIFwiY2xhc3M9cGFzc3dvcmQtbWF0Y2hlci1pbnB1dC12YWx1ZS1jb250YWluZXJcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAubm9kZShcImRpdlwiLCBcImlkPWJ1YmJsZU1lc3NhZ2VcIilcbiAgICAgICAgICAgICAgICAubm9kZShcImxhYmVsXCIsIFwiaWQ9bGFiZWxcIiwgXCJjbGFzcz1wYXNzd29yZC1tYXRjaGVyLWlucHV0LXZhbHVlLWxhYmVsIGhpZGRlblwiKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwiaW5wdXRcIiwgXCJpZD1pbnB1dFwiLCBcImF1dG9jb21wbGV0ZT1uZXctcGFzc3dvcmRcIiwgXCJ0eXBlPXBhc3N3b3JkXCIsIFwiY2xhc3M9cGFzc3dvcmQtbWF0Y2hlci1pbnB1dC12YWx1ZS1lbnRyeVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgIC5idWlsZCgpO1xuICAgIH1cblxufVxuXG5UeXBlQ29uZmlnUGFjay5pbnN0YW5jZSgpLmFkZFR5cGVDb25maWcoXCJudXR0aW4yYy11aVwiLCBQcm90b3R5cGVDb25maWcudW5uYW1lZChQYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlKSk7IiwiaW1wb3J0IHsgQ29tcG9uZW50LCBDb21wb25lbnRCdWlsZGVyLCBDc3MzU3R5bGVzaGVldEJ1aWxkZXIsIEVxdWFsc1Byb3BlcnR5VmFsaWRhdG9yLCBTdHlsZXNoZWV0LCBTdHlsZXNoZWV0QnVpbGRlciB9IGZyb20gXCJudXR0aW4yYy1jb3JlX3YxXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcbmltcG9ydCB7IENvbW1vbklucHV0IH0gZnJvbSBcIi4uLy4uL2NvbW1vbklucHV0LmpzXCI7XG5pbXBvcnQgeyBQcm90b3R5cGVDb25maWcsIFR5cGVDb25maWdQYWNrIH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiUGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sXCIpO1xuXG5leHBvcnQgY2xhc3MgUGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sIGV4dGVuZHMgQ29tbW9uSW5wdXQge1xuXG4gICAgc3RhdGljIERFRkFVTFRfTEFCRUwgPSBcIkNvbmZpcm0gcGFzc3dvcmRcIjtcbiAgICBcbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBtb2RlbFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtb2RlbENvbXBhcmVkUHJvcGVydHlOYW1lXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxhYmVsXG4gICAgICogQHBhcmFtIHtib29sZWFufSBtYW5kYXRvcnlcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBtb2RlbCA9IG51bGwsIG1vZGVsQ29tcGFyZWRQcm9wZXJ0eU5hbWUgPSBudWxsLCBsYWJlbCA9IFBhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbC5ERUZBVUxUX0xBQkVMLFxuICAgICAgICAgICBtYW5kYXRvcnkgPSBmYWxzZSkge1xuXG4gICAgICAgIHN1cGVyKFBhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbCxcbiAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICBtb2RlbCxcbiAgICAgICAgICAgIG5ldyBFcXVhbHNQcm9wZXJ0eVZhbGlkYXRvcihtYW5kYXRvcnksIGZhbHNlLCBtb2RlbCwgbW9kZWxDb21wYXJlZFByb3BlcnR5TmFtZSksXG4gICAgICAgICAgICBsYWJlbCxcbiAgICAgICAgICAgIFwiUGFzc3dvcmRzIG11c3QgbWF0Y2hcIik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtTdHlsZXNoZWV0QnVpbGRlcn0gc3R5bGVzaGVldEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMge1N0eWxlc2hlZXR9XG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkU3R5bGVzaGVldChzdHlsZXNoZWV0QnVpbGRlcikge1xuICAgICAgICBDc3MzU3R5bGVzaGVldEJ1aWxkZXIuY3JlYXRlKHN0eWxlc2hlZXRCdWlsZGVyKVxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBhc3N3b3JkLW1hdGNoZXItaW5wdXQtY29udHJvbC1jb250YWluZXJcIilcbiAgICAgICAgICAgICAgICAucG9zaXRpb24oXCJyZWxhdGl2ZVwiKVxuICAgICAgICAgICAgICAgIC5wYWRkaW5nKFwiMC41cmVtXCIpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5wYXNzd29yZC1tYXRjaGVyLWlucHV0LWNvbnRyb2wtZW50cnlcIilcbiAgICAgICAgICAgICAgICAuZGlzcGxheShcImJsb2NrXCIpXG4gICAgICAgICAgICAgICAgLndpZHRoKFwiMTAwJVwiKVxuICAgICAgICAgICAgICAgIC5oZWlnaHQoXCJjYWxjKDEuNWVtICsgMXJlbSArIDJweClcIilcbiAgICAgICAgICAgICAgICAucGFkZGluZyhcIjAuN3JlbVwiLCBcIjAuNzVyZW1cIiwgXCIwLjNyZW1cIiwgXCIwLjc1cmVtXCIpXG4gICAgICAgICAgICAgICAgLmZvbnRTaXplKFwiMXJlbVwiKVxuICAgICAgICAgICAgICAgIC5mb250V2VpZ2h0KFwiNDAwXCIpXG4gICAgICAgICAgICAgICAgLmxpbmVIZWlnaHQoXCIxLjVcIilcbiAgICAgICAgICAgICAgICAuY29sb3IoXCIjNDk1MDU3XCIpXG4gICAgICAgICAgICAgICAgLmJhY2tncm91bmRDb2xvcihcIiNmZmZcIilcbiAgICAgICAgICAgICAgICAuYmFja2dyb3VuZENsaXAoXCJwYWRkaW5nLWJveFwiKVxuICAgICAgICAgICAgICAgIC5ib3JkZXIoXCIxcHhcIiwgXCJzb2xpZFwiLCBcIiNjZWQ0ZGFcIilcbiAgICAgICAgICAgICAgICAuYm9yZGVyUmFkaXVzKFwiMC4yNXJlbVwiKVxuICAgICAgICAgICAgICAgIC50cmFuc2l0aW9uKFtcImJvcmRlci1jb2xvclwiLCBcIjAuMTVzXCIsIG51bGwsIFwiZWFzZS1pbi1vdXRcIl0sIFtcImJveC1zaGFkb3dcIiwgXCIwLjE1c1wiLCBudWxsLCBcImVhc2UtaW4tb3V0XCJdKVxuICAgICAgICAgICAgICAgIC5tYXJnaW4obnVsbCxudWxsLFwiMXJlbVwiLG51bGwpXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucGFzc3dvcmQtbWF0Y2hlci1pbnB1dC1jb250cm9sLWxhYmVsXCIpXG4gICAgICAgICAgICAgICAgLmJhY2tncm91bmRDb2xvcihcIiNmZmZcIilcbiAgICAgICAgICAgICAgICAucG9zaXRpb24oXCJhYnNvbHV0ZVwiKVxuICAgICAgICAgICAgICAgIC5wYWRkaW5nKFwiMFwiLCBcIjAuMjVyZW1cIiwgXCIwXCIsIFwiMC4yNXJlbVwiKVxuICAgICAgICAgICAgICAgIC5ib3JkZXJSYWRpdXMoXCIwLjVyZW1cIilcbiAgICAgICAgICAgICAgICAudG9wKFwiLTAuMXJlbVwiKVxuICAgICAgICAgICAgICAgIC5sZWZ0KFwiMC40cmVtXCIpXG4gICAgICAgICAgICAgICAgLm1hcmdpbihcIjBcIiwgbnVsbCwgXCIwLjVyZW1cIiwgbnVsbClcbiAgICAgICAgICAgICAgICAuZm9udFNpemUoXCIwLjlyZW1cIilcbiAgICAgICAgICAgICAgICAuZm9udFdlaWdodChcImJvbGRcIilcbiAgICAgICAgICAgICAgICAuY29sb3IoXCIjOGE4YThhXCIpO1xuXG4gICAgICAgIHJldHVybiBzdHlsZXNoZWV0QnVpbGRlci5idWlsZCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Q29tcG9uZW50QnVpbGRlcn0gY29tcG9uZW50QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyB7Q29tcG9uZW50fVxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZENvbXBvbmVudChjb21wb25lbnRCdWlsZGVyKSB7XG4gICAgICAgIHJldHVybiBjb21wb25lbnRCdWlsZGVyXG4gICAgICAgICAgICAucm9vdChcImRpdlwiLCBcImNsYXNzPXBhc3N3b3JkLW1hdGNoZXItaW5wdXQtY29udHJvbC1jb250YWluZXJcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAubm9kZShcImRpdlwiLCBcImlkPWJ1YmJsZU1lc3NhZ2VcIilcbiAgICAgICAgICAgICAgICAubm9kZShcImxhYmVsXCIsIFwiaWQ9bGFiZWxcIiwgXCJjbGFzcz1wYXNzd29yZC1tYXRjaGVyLWlucHV0LWNvbnRyb2wtbGFiZWwgaGlkZGVuXCIpXG4gICAgICAgICAgICAgICAgLm5vZGUoXCJpbnB1dFwiLCBcImlkPWlucHV0XCIsIFwidHlwZT1wYXNzd29yZFwiLCBcImF1dG9jb21wbGV0ZT1uZXctcGFzc3dvcmRcIiwgXCJjbGFzcz1wYXNzd29yZC1tYXRjaGVyLWlucHV0LWNvbnRyb2wtZW50cnlcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAuYnVpbGQoKTtcbiAgICB9XG5cbn1cblxuVHlwZUNvbmZpZ1BhY2suaW5zdGFuY2UoKS5hZGRUeXBlQ29uZmlnKFwibnV0dGluMmMtdWlcIiwgUHJvdG90eXBlQ29uZmlnLnVubmFtZWQoUGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sKSk7IiwiaW1wb3J0IHsgUHJvdG90eXBlQ29uZmlnLCBUeXBlQ29uZmlnUGFjayB9IGZyb20gXCJtaW5kaV92MVwiO1xuXG5leHBvcnQgY2xhc3MgUGFzc3dvcmRNYXRjaGVyTW9kZWwge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMubmV3UGFzc3dvcmQgPSBudWxsO1xuICAgICAgICB0aGlzLmNvbnRyb2xQYXNzd29yZCA9IG51bGw7XG4gICAgfVxuXG4gICAgc2V0TmV3UGFzc3dvcmQobmV3UGFzc3dvcmQpIHtcbiAgICAgICAgdGhpcy5uZXdQYXNzd29yZCA9IG5ld1Bhc3N3b3JkO1xuICAgIH1cblxuICAgIGdldE5ld1Bhc3N3b3JkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5uZXdQYXNzd29yZDtcbiAgICB9XG5cbiAgICBzZXRDb250cm9sUGFzc3dvcmQoY29udHJvbFBhc3N3b3JkKSB7XG4gICAgICAgIHRoaXMuY29udHJvbFBhc3N3b3JkID0gY29udHJvbFBhc3N3b3JkO1xuICAgIH1cblxuICAgIGdldENvbnRyb2xQYXNzd29yZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udHJvbFBhc3N3b3JkO1xuICAgIH1cblxufVxuXG5UeXBlQ29uZmlnUGFjay5pbnN0YW5jZSgpLmFkZFR5cGVDb25maWcoXCJudXR0aW4yYy11aVwiLCBQcm90b3R5cGVDb25maWcudW5uYW1lZChQYXNzd29yZE1hdGNoZXJNb2RlbCkpOyIsImltcG9ydCB7IFxuICAgIENhbnZhc1N0eWxlcyxcbiAgICBBbmRWYWxpZGF0b3JTZXQsXG4gICAgQ29tcG9uZW50LFxuICAgIEV2ZW50TWFuYWdlcixcbiAgICBTdHlsZXNoZWV0QnVpbGRlcixcbiAgICBTdHlsZXNoZWV0LFxuICAgIENvbXBvbmVudEJ1aWxkZXIsXG4gICAgSW5saW5lQ29tcG9uZW50RmFjdG9yeVxufSBmcm9tIFwibnV0dGluMmMtY29yZV92MVwiO1xuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQsIFByb3RvdHlwZUNvbmZpZywgVHlwZUNvbmZpZ1BhY2sgfSBmcm9tIFwibWluZGlfdjFcIjtcbmltcG9ydCB7IExvZ2dlciwgUHJvcGVydHlBY2Nlc3NvciwgTWV0aG9kIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5pbXBvcnQgeyBQYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlIH0gZnJvbSBcIi4vcGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZS9wYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlLmpzXCI7XG5pbXBvcnQgeyBQYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2wgfSBmcm9tIFwiLi9wYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2wvcGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sLmpzXCI7XG5pbXBvcnQgeyBQYXNzd29yZE1hdGNoZXJNb2RlbCB9IGZyb20gXCIuL3Bhc3N3b3JkTWF0Y2hlck1vZGVsLmpzXCI7XG5pbXBvcnQgeyBDb21tb25JbnB1dCB9IGZyb20gXCIuLi9jb21tb25JbnB1dC5qc1wiO1xuXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiUGFzc3dvcmRNYXRjaGVySW5wdXRcIik7XG5cbmV4cG9ydCBjbGFzcyBQYXNzd29yZE1hdGNoZXJJbnB1dCB7XG5cblx0c3RhdGljIEVWRU5UX1ZBTElEQVRFRF9FTlRFUkVEID0gXCJ2YWxpZGF0ZWRFbnRlcmVkXCI7XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBtb2RlbFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwbGFjZWhvbGRlclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb250cm9sUGxhY2Vob2xkZXJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IG1hbmRhdG9yeVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsXG4gICAgICAgIG1vZGVsID0gbnVsbCxcbiAgICAgICAgcGxhY2Vob2xkZXIgPSBQYXNzd29yZE1hdGNoZXJJbnB1dC5ERUZBVUxUX1BMQUNFSE9MREVSLCBcbiAgICAgICAgY29udHJvbFBsYWNlaG9sZGVyID0gUGFzc3dvcmRNYXRjaGVySW5wdXQuREVGQVVMVF9DT05UUk9MX1BMQUNFSE9MREVSLFxuICAgICAgICBtYW5kYXRvcnkgPSBmYWxzZSkge1xuXG4gICAgICAgIC8qKiBAdHlwZSB7SW5saW5lQ29tcG9uZW50RmFjdG9yeX0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoSW5saW5lQ29tcG9uZW50RmFjdG9yeSk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnR9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gbnVsbDtcblxuICAgICAgICAvKiogQHR5cGUge0FuZFZhbGlkYXRvclNldH0gKi9cbiAgICAgICAgdGhpcy52YWxpZGF0b3IgPSBudWxsO1xuXG4gICAgICAgIHRoaXMucGFzc3dvcmRNYXRjaGVyTW9kZWwgPSBuZXcgUGFzc3dvcmRNYXRjaGVyTW9kZWwoKTtcblxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLm1vZGVsID0gbW9kZWw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtQYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlfSAqL1xuXHRcdHRoaXMucGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZSA9IEluamVjdGlvblBvaW50Lmluc3RhbmNlKFBhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWUsXG4gICAgICAgICAgICBbXCJuZXdQYXNzd29yZFwiLCB0aGlzLnBhc3N3b3JkTWF0Y2hlck1vZGVsLCBwbGFjZWhvbGRlciwgbWFuZGF0b3J5XVxuXHRcdCk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtQYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2x9ICovXG5cdFx0dGhpcy5wYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2wgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShQYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2wsXG4gICAgICAgICAgICBbXCJjb250cm9sUGFzc3dvcmRcIiwgdGhpcy5wYXNzd29yZE1hdGNoZXJNb2RlbCwgXCJuZXdQYXNzd29yZFwiLCBjb250cm9sUGxhY2Vob2xkZXIsIG1hbmRhdG9yeV1cblx0XHQpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7RXZlbnRNYW5hZ2VyfSAqL1xuICAgICAgICB0aGlzLmV2ZW50cyA9IG5ldyBFdmVudE1hbmFnZXIoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0eWxlc2hlZXRCdWlsZGVyfSBzdHlsZXNoZWV0QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyB7U3R5bGVzaGVldH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRTdHlsZXNoZWV0KHN0eWxlc2hlZXRCdWlsZGVyKSB7XG4gICAgICAgc3R5bGVzaGVldEJ1aWxkZXJcbiAgICAgICAgICAgLnNlbGVjdG9yKFwiLnBhc3N3b3JkLW1hdGNoZXItaW5wdXQtaGludFwiKVxuICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAuc3R5bGUoXCJjb2xvclwiLCBcIiM4ODg4ODhcIilcbiAgICAgICAgICAgICAgIC5zdHlsZShcImZvbnQtc2l6ZVwiLCBcIjAuOGVtXCIpXG4gICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tYm90dG9tXCIsIFwiMXJlbVwiKVxuICAgICAgICAgICAgICAgLnN0eWxlKFwid2hpdGUtc3BhY2VcIiwgXCJub3dyYXBcIilcbiAgICAgICAgICAgLmNsb3NlKCk7XG5cbiAgICAgICByZXR1cm4gc3R5bGVzaGVldEJ1aWxkZXIuYnVpbGQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudEJ1aWxkZXJ9IGNvbXBvbmVudEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMge0NvbXBvbmVudH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRDb21wb25lbnQoY29tcG9uZW50QnVpbGRlcikge1xuICAgICAgICByZXR1cm4gY29tcG9uZW50QnVpbGRlclxuICAgICAgICAgICAgLnJvb3QoXCJkaXZcIiwgXCJjbGFzcz1wYXNzd29yZC1tYXRjaGVyLWlucHV0LXJvb3RcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAubm9kZShcImRpdlwiLCBcImlkPXBhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWVcIilcbiAgICAgICAgICAgICAgICAubm9kZShcImRpdlwiLCBcImlkPXBhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbFwiKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwiZGl2XCIsIFwiY2xhc3M9cGFzc3dvcmQtbWF0Y2hlci1pbnB1dC1oaW50XCIpXG4gICAgICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgICAgICAudGV4dChcIiogTXVzdCBjb250YWluIGxldHRlcnMsIG51bWJlcnMgYW5kIHNwZWNpYWwgY2hhcmFjdGVyc1wiKVxuICAgICAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgYXN5bmMgcG9zdENvbmZpZygpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKFBhc3N3b3JkTWF0Y2hlcklucHV0KTtcblxuICAgICAgICBDYW52YXNTdHlsZXMuZW5hYmxlU3R5bGUoUGFzc3dvcmRNYXRjaGVySW5wdXQubmFtZSk7XG5cbiAgICAgICAgdGhpcy5jb21wb25lbnQuc2V0Q2hpbGQoXCJwYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlXCIsdGhpcy5wYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlLmNvbXBvbmVudCk7XG4gICAgICAgIHRoaXMuY29tcG9uZW50LnNldENoaWxkKFwicGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sXCIsdGhpcy5wYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2wuY29tcG9uZW50KTtcblxuICAgICAgICB0aGlzLnBhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWUuZXZlbnRzXG4gICAgICAgICAgICAubGlzdGVuVG8oQ29tbW9uSW5wdXQuRVZFTlRfRU5URVJFRCwgdGhpcy5wYXNzd29yZFZhbHVlRW50ZXJlZCwgdGhpcylcbiAgICAgICAgICAgIC5saXN0ZW5UbyhDb21tb25JbnB1dC5FVkVOVF9LRVlVUFBFRCwgdGhpcy5wYXNzd29yZFZhbHVlQ2hhbmdlZCwgdGhpcyk7XG5cbiAgICAgICAgdGhpcy5wYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2wuZXZlbnRzXG4gICAgICAgICAgICAubGlzdGVuVG8oQ29tbW9uSW5wdXQuRVZFTlRfRU5URVJFRCwgdGhpcy5wYXNzd29yZENvbnRyb2xFbnRlcmVkLCB0aGlzKTtcblxuICAgICAgICAvKiogQHR5cGUge0FuZFZhbGlkYXRvclNldH0gKi9cbiAgICAgICAgdGhpcy52YWxpZGF0b3IgPSBuZXcgQW5kVmFsaWRhdG9yU2V0KClcbiAgICAgICAgICAgIC53aXRoVmFsaWRhdG9yKHRoaXMucGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZS52YWxpZGF0b3IpXG4gICAgICAgICAgICAud2l0aFZhbGlkYXRvcih0aGlzLnBhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbC52YWxpZGF0b3IpXG4gICAgICAgICAgICAud2l0aFZhbGlkTGlzdGVuZXIobmV3IE1ldGhvZCh0aGlzLnBhc3N3b3JkTWF0Y2hlclZhbGlkT2NjdXJlZCwgdGhpcykpO1xuXG4gICAgfVxuXG4gICAgcGFzc3dvcmRNYXRjaGVyVmFsaWRPY2N1cmVkKCkge1xuICAgICAgICBQcm9wZXJ0eUFjY2Vzc29yLnNldFZhbHVlKHRoaXMubW9kZWwsIHRoaXMubmFtZSwgdGhpcy5wYXNzd29yZE1hdGNoZXJNb2RlbC5nZXROZXdQYXNzd29yZCgpKVxuICAgIH1cblxuICAgIHBhc3N3b3JkVmFsdWVFbnRlcmVkKGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLnBhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWUudmFsaWRhdG9yLmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgdGhpcy5wYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2wuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHBhc3N3b3JkVmFsdWVDaGFuZ2VkKGV2ZW50KSB7XG4gICAgICAgIHRoaXMucGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sLmNsZWFyKCk7XG4gICAgfVxuXG4gICAgcGFzc3dvcmRDb250cm9sRW50ZXJlZChldmVudCkge1xuICAgICAgICBpZiAodGhpcy52YWxpZGF0b3IuaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICB0aGlzLmV2ZW50cy50cmlnZ2VyKFBhc3N3b3JkTWF0Y2hlcklucHV0LkVWRU5UX1ZBTElEQVRFRF9FTlRFUkVELCBldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmb2N1cygpIHsgdGhpcy5wYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlLmZvY3VzKCk7IH1cbiAgICBzZWxlY3RBbGwoKSB7IHRoaXMucGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZS5zZWxlY3RBbGwoKTsgfVxuICAgIGVuYWJsZSgpIHsgdGhpcy5wYXNzd29yZE1hdGNoZXJJbnB1dFZhbHVlLmVuYWJsZSgpOyB0aGlzLnBhc3N3b3JkTWF0Y2hlcklucHV0Q29udHJvbC5lbmFibGUoKTsgfVxuICAgIGRpc2FibGUoKSB7IHRoaXMucGFzc3dvcmRNYXRjaGVySW5wdXRWYWx1ZS5kaXNhYmxlKCk7IHRoaXMucGFzc3dvcmRNYXRjaGVySW5wdXRDb250cm9sLmRpc2FibGUoKTsgfVxuICAgIGNsZWFyKCkgeyB0aGlzLnBhc3N3b3JkTWF0Y2hlcklucHV0VmFsdWUuY2xlYXIoKTsgdGhpcy5wYXNzd29yZE1hdGNoZXJJbnB1dENvbnRyb2wuY2xlYXIoKTsgfVxufVxuXG5UeXBlQ29uZmlnUGFjay5pbnN0YW5jZSgpLmFkZFR5cGVDb25maWcoXCJudXR0aW4yYy11aVwiLCBQcm90b3R5cGVDb25maWcudW5uYW1lZChQYXNzd29yZE1hdGNoZXJJbnB1dCkpOyIsImltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJjb3JldXRpbF92MVwiO1xuaW1wb3J0IHsgQ29tbW9uSW5wdXQgfSBmcm9tIFwiLi4vY29tbW9uSW5wdXQuanNcIjtcbmltcG9ydCB7IENvbXBvbmVudCwgQ29tcG9uZW50QnVpbGRlciwgQ3NzM1N0eWxlc2hlZXRCdWlsZGVyLCBQaG9uZVZhbGlkYXRvciwgU3R5bGVzaGVldCwgU3R5bGVzaGVldEJ1aWxkZXIgfSBmcm9tIFwibnV0dGluMmMtY29yZV92MVwiO1xuaW1wb3J0IHsgUHJvdG90eXBlQ29uZmlnLCBUeXBlQ29uZmlnUGFjayB9IGZyb20gXCJtaW5kaV92MVwiO1xuXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiUGhvbmVJbnB1dFwiKTtcblxuZXhwb3J0IGNsYXNzIFBob25lSW5wdXQgZXh0ZW5kcyBDb21tb25JbnB1dCB7XG5cbiAgICBzdGF0aWMgREVGQVVMVF9QTEFDRUhPTERFUiA9IFwiUGhvbmVcIjtcbiAgICBcbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBtb2RlbFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwbGFjZWhvbGRlclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gbWFuZGF0b3J5XG4gICAgICovXG4gICAgY29uc3RydWN0b3IobmFtZSwgbW9kZWwgPSBudWxsLCBwbGFjZWhvbGRlciA9IFRleHRJbnB1dC5ERUZBVUxUX1BMQUNFSE9MREVSLCBtYW5kYXRvcnkgPSBmYWxzZSkge1xuXG4gICAgICAgIHN1cGVyKFBob25lSW5wdXQsXG4gICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgbW9kZWwsXG4gICAgICAgICAgICBuZXcgUGhvbmVWYWxpZGF0b3IobWFuZGF0b3J5LCAhbWFuZGF0b3J5KSxcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyLFxuICAgICAgICAgICAgXCJJbnZhbGlkIHBob25lIG51bWJlclwiLFxuICAgICAgICAgICAgW1wiTXVzdCBzdGFydCB3aXRoICsgc2lnblwiLCBcImZvbGxvd2VkIGJ5IG1pbmltdW0gOCBudW1iZXJzXCJdKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0eWxlc2hlZXRCdWlsZGVyfSBzdHlsZXNoZWV0QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyB7U3R5bGVzaGVldH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRTdHlsZXNoZWV0KHN0eWxlc2hlZXRCdWlsZGVyKSB7XG4gICAgICAgIENzczNTdHlsZXNoZWV0QnVpbGRlci5jcmVhdGUoc3R5bGVzaGVldEJ1aWxkZXIpXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucGhvbmUtaW5wdXQtY29udGFpbmVyXCIpXG4gICAgICAgICAgICAgICAgLnBvc2l0aW9uKFwicmVsYXRpdmVcIilcbiAgICAgICAgICAgICAgICAucGFkZGluZyhcIjAuNXJlbVwiKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucGhvbmUtaW5wdXQtZW50cnlcIilcbiAgICAgICAgICAgICAgICAuZGlzcGxheShcImJsb2NrXCIpXG4gICAgICAgICAgICAgICAgLndpZHRoKFwiMTAwJVwiKVxuICAgICAgICAgICAgICAgIC5oZWlnaHQoXCJjYWxjKDEuNWVtICsgMXJlbSArIDJweClcIilcbiAgICAgICAgICAgICAgICAucGFkZGluZyhcIjAuN3JlbVwiLCBcIjAuNzVyZW1cIiwgXCIwLjNyZW1cIiwgXCIwLjc1cmVtXCIpXG4gICAgICAgICAgICAgICAgLmZvbnRTaXplKFwiMXJlbVwiKVxuICAgICAgICAgICAgICAgIC5mb250V2VpZ2h0KFwiNDAwXCIpXG4gICAgICAgICAgICAgICAgLmxpbmVIZWlnaHQoXCIxLjVcIilcbiAgICAgICAgICAgICAgICAuY29sb3IoXCIjNDk1MDU3XCIpXG4gICAgICAgICAgICAgICAgLmJhY2tncm91bmRDb2xvcihcIiNmZmZcIilcbiAgICAgICAgICAgICAgICAuYmFja2dyb3VuZENsaXAoXCJwYWRkaW5nLWJveFwiKVxuICAgICAgICAgICAgICAgIC5ib3JkZXIoXCIxcHhcIiwgXCJzb2xpZFwiLCBcIiNjZWQ0ZGFcIilcbiAgICAgICAgICAgICAgICAuYm9yZGVyUmFkaXVzKFwiMC4yNXJlbVwiKVxuICAgICAgICAgICAgICAgIC50cmFuc2l0aW9uKFtcImJvcmRlci1jb2xvclwiLCBcIjAuMTVzXCIsIG51bGwsIFwiZWFzZS1pbi1vdXRcIl0sIFtcImJveC1zaGFkb3dcIiwgXCIwLjE1c1wiLCBudWxsLCBcImVhc2UtaW4tb3V0XCJdKVxuICAgICAgICAgICAgICAgIC5tYXJnaW4obnVsbCxudWxsLFwiMXJlbVwiLG51bGwpXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucGhvbmUtbGFiZWxcIilcbiAgICAgICAgICAgICAgICAuYmFja2dyb3VuZENvbG9yKFwiI2ZmZlwiKVxuICAgICAgICAgICAgICAgIC5wb3NpdGlvbihcImFic29sdXRlXCIpXG4gICAgICAgICAgICAgICAgLnBhZGRpbmcoXCIwXCIsIFwiMC4yNXJlbVwiLCBcIjBcIiwgXCIwLjI1cmVtXCIpXG4gICAgICAgICAgICAgICAgLmJvcmRlclJhZGl1cyhcIjAuNXJlbVwiKVxuICAgICAgICAgICAgICAgIC50b3AoXCItMC4xcmVtXCIpXG4gICAgICAgICAgICAgICAgLmxlZnQoXCIwLjRyZW1cIilcbiAgICAgICAgICAgICAgICAubWFyZ2luKFwiMFwiLCBudWxsLCBcIjAuNXJlbVwiLCBudWxsKVxuICAgICAgICAgICAgICAgIC5mb250U2l6ZShcIjAuOXJlbVwiKVxuICAgICAgICAgICAgICAgIC5mb250V2VpZ2h0KFwiYm9sZFwiKVxuICAgICAgICAgICAgICAgIC5jb2xvcihcIiM4YThhOGFcIik7XG5cbiAgICAgICAgcmV0dXJuIHN0eWxlc2hlZXRCdWlsZGVyLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDb21wb25lbnRCdWlsZGVyfSBjb21wb25lbnRCdWlsZGVyIFxuICAgICAqIEByZXR1cm5zIHtDb21wb25lbnR9XG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkQ29tcG9uZW50KGNvbXBvbmVudEJ1aWxkZXIpIHtcbiAgICAgICAgY29tcG9uZW50QnVpbGRlclxuICAgICAgICAgICAgLnJvb3QoXCJkaXZcIiwgXCJjbGFzcz1waG9uZS1pbnB1dC1jb250YWluZXJcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAubm9kZShcImRpdlwiLCBcImlkPWJ1YmJsZU1lc3NhZ2VcIilcbiAgICAgICAgICAgICAgICAubm9kZShcImxhYmVsXCIsIFwiaWQ9bGFiZWxcIiwgXCJjbGFzcz1waG9uZS1sYWJlbCBoaWRkZW5cIilcbiAgICAgICAgICAgICAgICAubm9kZShcImlucHV0XCIsIFwiaWQ9aW5wdXRcIiwgXCJ0eXBlPXRleHRcIiwgXCJjbGFzcz1waG9uZS1pbnB1dC1lbnRyeVwiKVxuICAgICAgICAgICAgLmNsb3NlKCk7XG4gICAgICAgIHJldHVybiBjb21wb25lbnRCdWlsZGVyLmJ1aWxkKCk7XG4gICAgfVxuXG59XG5cblR5cGVDb25maWdQYWNrLmluc3RhbmNlKCkuYWRkVHlwZUNvbmZpZyhcIm51dHRpbjJjLXVpXCIsIFByb3RvdHlwZUNvbmZpZy51bm5hbWVkKFBob25lSW5wdXQpKTsiLCJpbXBvcnQge1xuICAgIENhbnZhc1N0eWxlcyxcbiAgICBDb21wb25lbnQsXG4gICAgSW5wdXRFbGVtZW50RGF0YUJpbmRpbmcsXG4gICAgRXZlbnRNYW5hZ2VyLFxuICAgIFN0eWxlc2hlZXRCdWlsZGVyLFxuICAgIFN0eWxlc2hlZXQsXG4gICAgQ29tcG9uZW50QnVpbGRlcixcbiAgICBJbmxpbmVDb21wb25lbnRGYWN0b3J5XG59IGZyb20gXCJudXR0aW4yYy1jb3JlX3YxXCI7XG5pbXBvcnQgeyBJbmplY3Rpb25Qb2ludCwgUHJvdG90eXBlQ29uZmlnLCBUeXBlQ29uZmlnUGFjayB9IGZyb20gXCJtaW5kaV92MVwiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcImNvcmV1dGlsX3YxXCI7XG5pbXBvcnQgeyBDb21tb25FdmVudHMgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbW1vbkV2ZW50c1wiO1xuXG5jb25zdCBMT0cgPSBuZXcgTG9nZ2VyKFwiUmFkaW9CdXR0b25cIik7XG5cbmV4cG9ydCBjbGFzcyBSYWRpb0J1dHRvbiB7XG4gICAgXG4gICAgc3RhdGljIEVWRU5UX0NMSUNLRUQgPSBDb21tb25FdmVudHMuQ0xJQ0tFRDtcblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBtb2RlbFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIG1vZGVsID0gbnVsbCkge1xuICAgICAgICBcbiAgICAgICAgLyoqIEB0eXBlIHtJbmxpbmVDb21wb25lbnRGYWN0b3J5fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnkgPSBJbmplY3Rpb25Qb2ludC5pbnN0YW5jZShJbmxpbmVDb21wb25lbnRGYWN0b3J5KTtcblxuICAgICAgICAvKiogQHR5cGUge0V2ZW50TWFuYWdlcn0gKi9cbiAgICAgICAgdGhpcy5ldmVudHMgPSBuZXcgRXZlbnRNYW5hZ2VyKCk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtDb21wb25lbnR9ICovXG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gbnVsbDtcblxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcblxuICAgICAgICAvKiogQHR5cGUge29iamVjdH0gKi9cbiAgICAgICAgdGhpcy5tb2RlbCA9IG1vZGVsO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHlsZXNoZWV0QnVpbGRlcn0gc3R5bGVzaGVldEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMge1N0eWxlc2hlZXR9XG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkU3R5bGVzaGVldChzdHlsZXNoZWV0QnVpbGRlcikge1xuICAgICAgICBzdHlsZXNoZWV0QnVpbGRlclxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnJhZGlvLWJ1dHRvblwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgXCJibG9ja1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBvc2l0aW9uXCIsIFwicmVsYXRpdmVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwYWRkaW5nLWxlZnRcIiwgXCIyZW1cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tYm90dG9tXCIsIFwiMC41ZW1cIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjdXJzb3JcIiwgXCJwb2ludGVyXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiLXdlYmtpdC11c2VyLXNlbGVjdFwiLCBcIm5vbmVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCItbW96LXVzZXItc2VsZWN0XCIsIFwibm9uZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIi1tcy11c2VyLXNlbGVjdFwiLCBcIm5vbmVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ1c2VyLXNlbGVjdFwiLCBcIm5vbmVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJtYXJnaW4tYm90dG9tXCIsIFwiMXJlbVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnJhZGlvLWJ1dHRvbiBpbnB1dFwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBvc2l0aW9uXCIsIFwiYWJzb2x1dGVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImN1cnNvclwiLCBcInBvaW50ZXJcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJoZWlnaHRcIiwgXCIwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwid2lkdGhcIiwgXCIwXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucmFkaW8tYnV0dG9uLW1hcmtcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLCBcImFic29sdXRlXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidG9wXCIsIFwiMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImxlZnRcIiwgXCIwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwid2lkdGhcIiwgXCIyMHB0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiaGVpZ2h0XCIsIFwiMjBwdFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIiwgXCIjZGRkXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyLXJhZGl1c1wiLCBcIjUwJVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci13aWR0aFwiLCBcIjFwdFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1zdHlsZVwiLCBcInNvbGlkXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyLWNvbG9yXCIsIFwiI2JiYlwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnJhZGlvLWJ1dHRvbjpob3ZlciBpbnB1dCB+IC5jaGVjay1ib3gtbWFya1wiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIiwgXCIjMjE5NkYzXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucmFkaW8tYnV0dG9uIGlucHV0OmNoZWNrZWQgfiAucmFkaW8tYnV0dG9uLW1hcmtcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiI2RkZFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnJhZGlvLWJ1dHRvbi1tYXJrOmFmdGVyXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiY29udGVudFwiLCBcIlxcXCJcXFwiXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIiwgXCJhYnNvbHV0ZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImRpc3BsYXlcIiwgXCJub25lXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucmFkaW8tYnV0dG9uIGlucHV0OmNoZWNrZWQgfiAucmFkaW8tYnV0dG9uLW1hcms6YWZ0ZXJcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5yYWRpby1idXR0b24gLnJhZGlvLWJ1dHRvbi1tYXJrOmFmdGVyXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwibGVmdFwiLCBcIjUwJVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRvcFwiLCBcIjUwJVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZSgtNTAlLCAtNTAlKVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIndpZHRoXCIsIFwiMTRwdFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImhlaWdodFwiLCBcIjE0cHRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiIzIxOTZGM1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1yYWRpdXNcIiwgXCI1MCVcIilcbiAgICAgICAgICAgIC5jbG9zZSgpO1xuICAgICAgICByZXR1cm4gc3R5bGVzaGVldEJ1aWxkZXIuYnVpbGQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudEJ1aWxkZXJ9IGNvbXBvbmVudEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMge0NvbXBvbmVudH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRDb21wb25lbnQoY29tcG9uZW50QnVpbGRlcikge1xuICAgICAgICByZXR1cm4gY29tcG9uZW50QnVpbGRlclxuICAgICAgICAgICAgLnJvb3QoXCJsYWJlbFwiLCBcImNsYXNzPXJhZGlvLWJ1dHRvblwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwiaW5wdXRcIiwgXCJpZD1yYWRpb1wiLCBcInR5cGU9cmFkaW9cIilcbiAgICAgICAgICAgICAgICAubm9kZShcInNwYW5cIiwgXCJjbGFzcz1yYWRpby1idXR0b24tbWFya1wiKVxuICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgICAgIC5idWlsZCgpO1xuICAgIH1cblxuICAgIHBvc3RDb25maWcoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5LmNyZWF0ZShSYWRpb0J1dHRvbik7XG4gICAgICAgIENhbnZhc1N0eWxlcy5lbmFibGVTdHlsZShSYWRpb0J1dHRvbi5uYW1lKTtcbiAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0KFwicmFkaW9cIikuc2V0QXR0cmlidXRlVmFsdWUoXCJuYW1lXCIsdGhpcy5uYW1lKTtcblxuICAgICAgICBpZiAodGhpcy5tb2RlbCkge1xuICAgICAgICAgICAgSW5wdXRFbGVtZW50RGF0YUJpbmRpbmcubGluayh0aGlzLm1vZGVsKS50byh0aGlzLmNvbXBvbmVudC5nZXQoXCJyYWRpb1wiKSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJyYWRpb1wiKS5saXN0ZW5UbyhcImNsaWNrXCIsIHRoaXMuY2xpY2tlZCwgdGhpcyk7XG4gICAgfVxuXG4gICAgY2xpY2tlZChldmVudCkge1xuICAgICAgICB0aGlzLmV2ZW50cy50cmlnZ2VyKFJhZGlvQnV0dG9uLkVWRU5UX0NMSUNLRUQsIFtldmVudF0pO1xuICAgIH1cblxufVxuXG5UeXBlQ29uZmlnUGFjay5pbnN0YW5jZSgpLmFkZFR5cGVDb25maWcoXCJudXR0aW4yYy11aVwiLCBQcm90b3R5cGVDb25maWcudW5uYW1lZChSYWRpb0J1dHRvbikpOyIsImltcG9ydCB7XG4gICAgQ2FudmFzU3R5bGVzLFxuICAgIENvbXBvbmVudCxcbiAgICBJbnB1dEVsZW1lbnREYXRhQmluZGluZyxcbiAgICBFdmVudE1hbmFnZXIsXG4gICAgU3R5bGVzaGVldEJ1aWxkZXIsXG4gICAgU3R5bGVzaGVldCxcbiAgICBDb21wb25lbnRCdWlsZGVyLFxuICAgIElubGluZUNvbXBvbmVudEZhY3Rvcnlcbn0gZnJvbSBcIm51dHRpbjJjLWNvcmVfdjFcIjtcbmltcG9ydCB7IEluamVjdGlvblBvaW50LCBQcm90b3R5cGVDb25maWcsIFR5cGVDb25maWdQYWNrIH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcbmltcG9ydCB7IENvbW1vbkV2ZW50cyB9IGZyb20gXCIuLi8uLi9jb21tb24vY29tbW9uRXZlbnRzXCI7XG5pbXBvcnQgeyBDb250YWluZXJFdmVudCB9IGZyb20gXCJjb250YWluZXJicmlkZ2VfdjFcIjtcblxuY29uc3QgTE9HID0gbmV3IExvZ2dlcihcIlJhZGlvVG9nZ2xlU3dpdGNoXCIpO1xuXG5leHBvcnQgY2xhc3MgUmFkaW9Ub2dnbGVTd2l0Y2gge1xuICAgIFxuICAgIHN0YXRpYyBFVkVOVF9FTkFCTEVEID0gQ29tbW9uRXZlbnRzLkVOQUJMRUQ7XG4gICAgc3RhdGljIEVWRU5UX0RJU0FCTEVEID0gQ29tbW9uRXZlbnRzLkRJU0FCTEVEO1xuICAgIHN0YXRpYyBFVkVOVF9DSEFOR0VEID0gQ29tbW9uRXZlbnRzLkNIQU5HRUQ7XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gbW9kZWxcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihtb2RlbCA9IG51bGwpIHtcbiAgICAgICAgXG4gICAgICAgIC8qKiBAdHlwZSB7SW5saW5lQ29tcG9uZW50RmFjdG9yeX0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoSW5saW5lQ29tcG9uZW50RmFjdG9yeSk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtFdmVudE1hbmFnZXJ9ICovXG4gICAgICAgIHRoaXMuZXZlbnRzID0gbmV3IEV2ZW50TWFuYWdlcigpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IG51bGw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtvYmplY3R9ICovXG4gICAgICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcblxuICAgICAgICAvKiogQHR5cGUge2Jvb2xlYW59ICovXG4gICAgICAgIHRoaXMuY2hlY2tlZCA9IGZhbHNlO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHlsZXNoZWV0QnVpbGRlcn0gc3R5bGVzaGVldEJ1aWxkZXIgXG4gICAgICogQHJldHVybnMge1N0eWxlc2hlZXR9XG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkU3R5bGVzaGVldChzdHlsZXNoZWV0QnVpbGRlcikge1xuICAgICAgIHN0eWxlc2hlZXRCdWlsZGVyXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucmFkaW8tdG9nZ2xlLXN3aXRjaFwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBvc2l0aW9uXCIsIFwicmVsYXRpdmVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIFwiaW5saW5lLWJsb2NrXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwid2lkdGhcIiwgXCI0MXB0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiaGVpZ2h0XCIsIFwiMjRwdFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnJhZGlvLXRvZ2dsZS1zd2l0Y2ggaW5wdXRcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIndpZHRoXCIsIFwiMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImhlaWdodFwiLCBcIjBcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5yYWRpby10b2dnbGUtc3dpdGNoLXNsaWRlclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcInBvc2l0aW9uXCIsIFwiYWJzb2x1dGVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjdXJzb3JcIiwgXCJwb2ludGVyXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidG9wXCIsIFwiMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImxlZnRcIiwgXCIwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicmlnaHRcIiwgXCIwXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm90dG9tXCIsIFwiMFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIiwgXCIjY2NjXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyLXJhZGl1c1wiLCBcIjI0cHRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2l0aW9uXCIsIFwiLjRzXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyLXdpZHRoXCIsIFwiMXB0XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYm9yZGVyLXN0eWxlXCIsIFwic29saWRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3JkZXItY29sb3JcIiwgXCIjYmJiXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucmFkaW8tdG9nZ2xlLXN3aXRjaC1zbGlkZXI6YmVmb3JlXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIiwgXCJhYnNvbHV0ZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImNvbnRlbnRcIiwgXCJcXFwiXFxcIlwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImhlaWdodFwiLCBcIjE3cHRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLCBcIjE3cHRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJsZWZ0XCIsIFwiMy41cHRcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3R0b21cIiwgXCIzLjVwdFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJhY2tncm91bmQtY29sb3JcIiwgXCJ3aGl0ZVwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1yYWRpdXNcIiwgXCI1MCVcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJ0cmFuc2l0aW9uXCIsIFwiLjRzXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlWCgwKVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnJhZGlvLXRvZ2dsZS1zd2l0Y2g6aG92ZXIgLnJhZGlvLXRvZ2dsZS1zd2l0Y2gtc2xpZGVyXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiNiYmJcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5yYWRpby10b2dnbGUtc3dpdGNoIGlucHV0OmNoZWNrZWQgKyAucmFkaW8tdG9nZ2xlLXN3aXRjaC1zbGlkZXJcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiIzIxOTZGM1wiKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcImJvcmRlci1jb2xvclwiLCBcIiMxOTc2RDJcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5yYWRpby10b2dnbGUtc3dpdGNoIGlucHV0OmNoZWNrZWQgKyAucmFkaW8tdG9nZ2xlLXN3aXRjaC1zbGlkZXI6YmVmb3JlXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlWCgxN3B0KVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnJhZGlvLXRvZ2dsZS1zd2l0Y2ggaW5wdXQ6Zm9jdXMgKyAucmFkaW8tdG9nZ2xlLXN3aXRjaC1zbGlkZXJcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJib3gtc2hhZG93XCIsIFwiMCAwIDFwdCAjMjE5NkYzXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIucmFkaW8tdG9nZ2xlLXN3aXRjaCBpbnB1dDpkaXNhYmxlZCArIC5yYWRpby10b2dnbGUtc3dpdGNoLXNsaWRlclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwLjZcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJjdXJzb3JcIiwgXCJub3QtYWxsb3dlZFwiKVxuICAgICAgICAgICAgLmNsb3NlKClcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnJhZGlvLXRvZ2dsZS1zd2l0Y2ggaW5wdXQ6ZGlzYWJsZWQ6aG92ZXIgKyAucmFkaW8tdG9nZ2xlLXN3aXRjaC1zbGlkZXJcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAuc3R5bGUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiI2NjY1wiKVxuICAgICAgICAgICAgLmNsb3NlKCk7XG5cbiAgICAgICAgcmV0dXJuIHN0eWxlc2hlZXRCdWlsZGVyLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDb21wb25lbnRCdWlsZGVyfSBjb25tcG9uZW50QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyB7Q29tcG9uZW50fVxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZENvbXBvbmVudChjb25tcG9uZW50QnVpbGRlcikge1xuICAgICAgICByZXR1cm4gY29ubXBvbmVudEJ1aWxkZXJcbiAgICAgICAgICAgIC5yb290KFwibGFiZWxcIiwgXCJjbGFzcz1yYWRpby10b2dnbGUtc3dpdGNoXCIpXG4gICAgICAgICAgICAub3BlbigpXG4gICAgICAgICAgICAgICAgLm5vZGUoXCJpbnB1dFwiLCBcImlkPWNoZWNrYm94XCIsIFwidHlwZT1jaGVja2JveFwiKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwic3BhblwiLCBcImNsYXNzPXJhZGlvLXRvZ2dsZS1zd2l0Y2gtc2xpZGVyXCIpXG4gICAgICAgICAgICAuY2xvc2UoKVxuICAgICAgICAgICAgLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgcG9zdENvbmZpZygpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKFJhZGlvVG9nZ2xlU3dpdGNoKTtcbiAgICAgICAgQ2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKFJhZGlvVG9nZ2xlU3dpdGNoLm5hbWUpO1xuXG4gICAgICAgIGlmICh0aGlzLm1vZGVsKSB7XG4gICAgICAgICAgICBJbnB1dEVsZW1lbnREYXRhQmluZGluZy5saW5rKHRoaXMubW9kZWwpLnRvKHRoaXMuY29tcG9uZW50LmdldChcImNoZWNrYm94XCIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY29tcG9uZW50LmdldChcImNoZWNrYm94XCIpLmxpc3RlblRvKFwiY2hhbmdlXCIsIHRoaXMuY2xpY2tlZCwgdGhpcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDb250YWluZXJFdmVudH0gZXZlbnQgXG4gICAgICovXG4gICAgY2xpY2tlZChldmVudCkge1xuICAgICAgICBjb25zdCBvbGRWYWx1ZSA9IHRoaXMuY2hlY2tlZDtcbiAgICAgICAgdGhpcy5jaGVja2VkID0gZXZlbnQudGFyZ2V0LmNoZWNrZWQ7XG5cbiAgICAgICAgaWYgKG9sZFZhbHVlICE9PSB0aGlzLmNoZWNrZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzLnRyaWdnZXIoUmFkaW9Ub2dnbGVTd2l0Y2guRVZFTlRfQ0hBTkdFRCwgW2V2ZW50LCB0aGlzLmNoZWNrZWRdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmNoZWNrZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzLnRyaWdnZXIoUmFkaW9Ub2dnbGVTd2l0Y2guRVZFTlRfRU5BQkxFRCwgW2V2ZW50XSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmV2ZW50cy50cmlnZ2VyKFJhZGlvVG9nZ2xlU3dpdGNoLkVWRU5UX0RJU0FCTEVELCBbZXZlbnRdKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIHRvZ2dsZSBzdGF0ZSBwcm9ncmFtbWF0aWNhbGx5XG4gICAgICogQHBhcmFtIHtib29sZWFufSBjaGVja2VkIFxuICAgICAqL1xuICAgIHRvZ2dsZShjaGVja2VkKSB7XG4gICAgICAgIGlmICh0aGlzLmNoZWNrZWQgPT09IGNoZWNrZWQpIHtcbiAgICAgICAgICAgIHJldHVybjsgLy8gTm8gY2hhbmdlXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jaGVja2VkID0gY2hlY2tlZDtcbiAgICAgICAgaWYgKHRoaXMuY29tcG9uZW50KSB7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXQoXCJjaGVja2JveFwiKS5jb250YWluZXJFbGVtZW50LmNsaWNrKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGN1cnJlbnQgdG9nZ2xlIHN0YXRlXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgaXNDaGVja2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jaGVja2VkO1xuICAgIH1cblxufVxuXG5UeXBlQ29uZmlnUGFjay5pbnN0YW5jZSgpLmFkZFR5cGVDb25maWcoXCJudXR0aW4yYy11aVwiLCBQcm90b3R5cGVDb25maWcudW5uYW1lZChSYWRpb1RvZ2dsZVN3aXRjaCkpOyIsImltcG9ydCB7IEV2ZW50TWFuYWdlciwgT3B0aW9uRWxlbWVudCB9IGZyb20gXCJudXR0aW4yYy1jb3JlX3YxXCI7XG5cbmV4cG9ydCBjbGFzcyBTZWxlY3RJbnB1dE9wdGlvbnNTb3VyY2Uge1xuICAgIFxuICAgIHN0YXRpYyBFVkVOVF9PUFRJT05TX0NIQU5HRUQgPSBcIm9wdGlvbnNDaGFuZ2VkXCI7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge01hcDxTdHJpbmcsIFN0cmluZz59IGtleVZhbHVlT3B0aW9ucyBcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihrZXlWYWx1ZU9wdGlvbnMgPSBuZXcgTWFwKCkpIHtcblxuICAgICAgICBjb25zdCBvcHRpb25zQXJyYXkgPSBbXTtcbiAgICAgICAga2V5VmFsdWVPcHRpb25zLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgICAgIG9wdGlvbnNBcnJheS5wdXNoKHtcImxhYmVsXCI6IHZhbHVlLCBcInZhbHVlXCI6IGtleSB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtPYmplY3R9ICovXG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnNBcnJheTtcblxuICAgICAgICAvKiogQHR5cGUge0V2ZW50TWFuYWdlcn0gKi9cbiAgICAgICAgdGhpcy5ldmVudHMgPSBuZXcgRXZlbnRNYW5hZ2VyKCk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge01hcDxTdHJpbmcsIFN0cmluZz59IGtleVZhbHVlT3B0aW9ucyBcbiAgICAgKiBAcmV0dXJucyBcbiAgICAgKi9cbiAgICB1cGRhdGUoa2V5VmFsdWVPcHRpb25zKSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnNBcnJheSA9IFtdO1xuICAgICAgICBrZXlWYWx1ZU9wdGlvbnMuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICAgICAgb3B0aW9uc0FycmF5LnB1c2goe1wibGFiZWxcIjogdmFsdWUsIFwidmFsdWVcIjoga2V5IH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9uc0FycmF5O1xuICAgICAgICB0aGlzLmV2ZW50cy50cmlnZ2VyKFNlbGVjdElucHV0T3B0aW9uc1NvdXJjZS5FVkVOVF9PUFRJT05TX0NIQU5HRUQsIFt0aGlzLm9wdGlvbnNdKTtcbiAgICB9XG5cbiAgICByZWZyZXNoKCkge1xuICAgICAgICB0aGlzLmV2ZW50cy50cmlnZ2VyKFNlbGVjdElucHV0T3B0aW9uc1NvdXJjZS5FVkVOVF9PUFRJT05TX0NIQU5HRUQsIFt0aGlzLm9wdGlvbnNdKTtcbiAgICB9XG5cbn0iLCJpbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcbmltcG9ydCB7IENhbnZhc1N0eWxlcyxcbiAgICBDb21wb25lbnQsXG4gICAgRXZlbnRNYW5hZ2VyLFxuICAgIElucHV0RWxlbWVudERhdGFCaW5kaW5nLFxuICAgIE9wdGlvbkVsZW1lbnQsXG4gICAgU2VsZWN0RWxlbWVudCwgXG4gICAgU3R5bGVzaGVldCxcbiAgICBTdHlsZXNoZWV0QnVpbGRlcixcbiAgICBDb21wb25lbnRCdWlsZGVyLFxuICAgIElubGluZUNvbXBvbmVudEZhY3RvcnksXG4gICAgQ3NzM1N0eWxlc2hlZXRCdWlsZGVyLFxuICAgIFJlcXVpcmVkVmFsaWRhdG9yLFxuICAgIFN0eWxlU2VsZWN0b3JBY2Nlc3NvclxufSBmcm9tIFwibnV0dGluMmMtY29yZV92MVwiO1xuaW1wb3J0IHsgSW5qZWN0aW9uUG9pbnQsXG4gICAgUHJvdG90eXBlQ29uZmlnLFxuICAgIFR5cGVDb25maWdQYWNrIH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5pbXBvcnQgeyBDb21tb25FdmVudHMgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbW1vbkV2ZW50c1wiO1xuaW1wb3J0IHsgU2VsZWN0SW5wdXRPcHRpb25zU291cmNlIH0gZnJvbSBcIi4vc2VsZWN0SW5wdXRPcHRpb25zU291cmNlXCI7XG5cbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJTZWxlY3RJbnB1dFwiKTtcblxuZXhwb3J0IGNsYXNzIFNlbGVjdElucHV0IHtcblxuXHRzdGF0aWMgREVGQVVMVF9QTEFDRUhPTERFUiA9IFwiU2VsZWN0XCI7XG5cblx0c3RhdGljIEVWRU5UX0NMSUNLRUQgPSBDb21tb25FdmVudHMuQ0xJQ0tFRDtcbiAgICBzdGF0aWMgRVZFTlRfQ0hBTkdFRCA9IENvbW1vbkV2ZW50cy5DSEFOR0VEO1xuICAgIHN0YXRpYyBFVkVOVF9MT0FERUQgPSBDb21tb25FdmVudHMuSU5QVVQ7XG4gICAgc3RhdGljIEVWRU5UX0JMVVJSRUQgPSBDb21tb25FdmVudHMuQkxVUlJFRDtcblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBtb2RlbFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsYWJlbFxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gbWFuZGF0b3J5XG4gICAgICogQHBhcmFtIHtTZWxlY3RJbnB1dE9wdGlvbnNTb3VyY2V9IG9wdGlvbnNTb3VyY2VcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBtb2RlbCA9IG51bGwsIGxhYmVsID0gU2VsZWN0SW5wdXQuREVGQVVMVF9QTEFDRUhPTERFUiwgbWFuZGF0b3J5ID0gZmFsc2UsIG9wdGlvbnNTb3VyY2UgPSBuZXcgU2VsZWN0SW5wdXRPcHRpb25zU291cmNlKCkpIHtcbiAgICAgICAgXG4gICAgICAgIC8qKiBAdHlwZSB7SW5saW5lQ29tcG9uZW50RmFjdG9yeX0gKi9cbiAgICAgICAgdGhpcy5jb21wb25lbnRGYWN0b3J5ID0gSW5qZWN0aW9uUG9pbnQuaW5zdGFuY2UoSW5saW5lQ29tcG9uZW50RmFjdG9yeSk7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtFdmVudE1hbmFnZXJ9ICovXG4gICAgICAgIHRoaXMuZXZlbnRzID0gbmV3IEV2ZW50TWFuYWdlcigpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7Q29tcG9uZW50fSAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudCA9IG51bGw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtTZWxlY3RJbnB1dE9wdGlvbnNTb3VyY2V9ICovXG4gICAgICAgIHRoaXMub3B0aW9uc1NvdXJjZSA9IG9wdGlvbnNTb3VyY2U7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMubGFiZWwgPSBsYWJlbDtcblxuICAgICAgICAvKiogQHR5cGUge2Jvb2xlYW59ICovXG4gICAgICAgIHRoaXMubWFuZGF0b3J5ID0gbWFuZGF0b3J5O1xuXG4gICAgICAgIC8qKiBAdHlwZSB7b2JqZWN0fSAqL1xuICAgICAgICB0aGlzLm1vZGVsID0gbW9kZWw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtSZXF1aXJlZFZhbGlkYXRvcn0gKi9cbiAgICAgICAgdGhpcy52YWxpZGF0b3IgPSBuZXcgUmVxdWlyZWRWYWxpZGF0b3IoZmFsc2UsIG1hbmRhdG9yeSk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge1N0eWxlc2hlZXRCdWlsZGVyfSBzdHlsZXNoZWV0QnVpbGRlciBcbiAgICAgKiBAcmV0dXJucyB7U3R5bGVzaGVldH1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnVpbGRTdHlsZXNoZWV0KHN0eWxlc2hlZXRCdWlsZGVyKSB7XG4gICAgICAgIENzczNTdHlsZXNoZWV0QnVpbGRlci5jcmVhdGUoc3R5bGVzaGVldEJ1aWxkZXIpXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuc2VsZWN0LWNvbnRhaW5lclwiKVxuICAgICAgICAgICAgICAgIC5wb3NpdGlvbihcInJlbGF0aXZlXCIpXG4gICAgICAgICAgICAgICAgLnBhZGRpbmcoXCIwLjVyZW1cIilcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnNlbGVjdC1lbnRyeVwiKVxuICAgICAgICAgICAgICAgIC5kaXNwbGF5KFwiYmxvY2tcIilcbiAgICAgICAgICAgICAgICAud2lkdGgoXCIxMDAlXCIpXG4gICAgICAgICAgICAgICAgLmhlaWdodChcImNhbGMoMS41ZW0gKyAxcmVtICsgMnB4KVwiKVxuICAgICAgICAgICAgICAgIC5wYWRkaW5nKFwiMC43cmVtXCIsIFwiMC43NXJlbVwiLCBcIjAuM3JlbVwiLCBcIjAuNzVyZW1cIilcbiAgICAgICAgICAgICAgICAuZm9udFNpemUoXCIxcmVtXCIpXG4gICAgICAgICAgICAgICAgLmZvbnRXZWlnaHQoXCI0MDBcIilcbiAgICAgICAgICAgICAgICAubGluZUhlaWdodChcIjEuNVwiKVxuICAgICAgICAgICAgICAgIC5jb2xvcihcIiM0OTUwNTdcIilcbiAgICAgICAgICAgICAgICAuYmFja2dyb3VuZENvbG9yKFwiI2ZmZlwiKVxuICAgICAgICAgICAgICAgIC5iYWNrZ3JvdW5kQ2xpcChcInBhZGRpbmctYm94XCIpXG4gICAgICAgICAgICAgICAgLmJvcmRlcihcIjFwdFwiLCBcInNvbGlkXCIsIFwiI2NlZDRkYVwiKVxuICAgICAgICAgICAgICAgIC5ib3JkZXJSYWRpdXMoXCIwLjI1cmVtXCIpXG4gICAgICAgICAgICAgICAgLnRyYW5zaXRpb24oXG4gICAgICAgICAgICAgICAgICAgIFtcImJvcmRlci1jb2xvclwiLCBcIjAuMTVzXCIsIG51bGwsIFwiZWFzZS1pbi1vdXRcIl0sXG4gICAgICAgICAgICAgICAgICAgIFtcImJveC1zaGFkb3dcIiwgXCIwLjE1c1wiLCBudWxsLCBcImVhc2UtaW4tb3V0XCJdKVxuICAgICAgICAgICAgICAgIC5tYXJnaW4obnVsbCwgbnVsbCwgXCIxcmVtXCIsIG51bGwpXG4gICAgICAgICAgICAgICAgLmFwcGVhcmFuY2UoXCJub25lXCIpXG4gICAgICAgICAgICAgICAgLmJhY2tncm91bmRJbWFnZShcInVybChcXFwiZGF0YTppbWFnZS9zdmcreG1sO3V0ZjgsPHN2ZyBmaWxsPScyMTk2RjMnIGhlaWdodD0nMjAnIHZpZXdCb3g9JzAgMCAyMCAyMCcgd2lkdGg9JzIwJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPjxwYXRoIGQ9J003IDEwbDUgNSA1LTV6Jy8+PC9zdmc+XFxcIilcIilcbiAgICAgICAgICAgICAgICAuYmFja2dyb3VuZFJlcGVhdChcIm5vLXJlcGVhdFwiKVxuICAgICAgICAgICAgICAgIC5iYWNrZ3JvdW5kUG9zaXRpb24oXCJyaWdodCAwLjc1cmVtIHRvcCAwLjNyZW1cIilcbiAgICAgICAgICAgICAgICAuYmFja2dyb3VuZFNpemUoXCIxLjVlbVwiKVxuICAgICAgICAgICAgXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuc2VsZWN0LWVycm9yXCIpXG4gICAgICAgICAgICAgICAgLndpZHRoKFwiZml0LWNvbnRlbnRcIilcbiAgICAgICAgICAgICAgICAuY29sb3IoXCIjMzMzMzMzXCIpXG4gICAgICAgICAgICAgICAgLnRyYW5zZm9ybShcInRyYW5zbGF0ZSgrNXB4LC01cHgpXCIpXG4gICAgICAgICAgICAgICAgLmJhY2tncm91bmRDb2xvcihcIiNGRkZGRTBcIilcbiAgICAgICAgICAgICAgICAuZm9udFdlaWdodChcIm5vcm1hbFwiKVxuICAgICAgICAgICAgICAgIC5mb250U2l6ZShcIjE0cHhcIilcbiAgICAgICAgICAgICAgICAuYm9yZGVyUmFkaXVzKFwiOHB4XCIpXG4gICAgICAgICAgICAgICAgLnBvc2l0aW9uKFwicmVsYXRpdmVcIilcbiAgICAgICAgICAgICAgICAuekluZGV4KFwiOTk5OTk5OThcIilcbiAgICAgICAgICAgICAgICAuYm94U2l6aW5nKFwiYm9yZGVyLWJveFwiKVxuICAgICAgICAgICAgICAgIC5ib3hTaGFkb3coXCIwXCIsIFwiMXB0XCIsIFwiOHB0XCIsIG51bGwsIFwicmdiYSgwLDAsMCwwLjUpXCIpXG4gICAgICAgICAgICAgICAgLmN1cnNvcihcInBvaW50ZXJcIilcblxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnNlbGVjdC1lcnJvci1oaWRkZW5cIilcbiAgICAgICAgICAgICAgICAudHJhbnNpdGlvbihcbiAgICAgICAgICAgICAgICAgICAgW1wibWF4LWhlaWdodFwiLCBcIi4zc1wiLCBcIi4yc1wiXSxcbiAgICAgICAgICAgICAgICAgICAgW1wicGFkZGluZ1wiLCBcIi4zc1wiLCBcIi4yc1wiXSxcbiAgICAgICAgICAgICAgICAgICAgW1wib3BhY2l0eVwiLCBcIi4yc1wiLCBcIjBzXCJdLFxuICAgICAgICAgICAgICAgICAgICBbXCJ2aXNpYmlsaXR5XCIsIFwiMHNcIiwgXCIuMnNcIl0pXG4gICAgICAgICAgICAgICAgLm9wYWNpdHkoXCIwXCIpXG4gICAgICAgICAgICAgICAgLnBhZGRpbmcoXCIwcHhcIiwgXCIwcHhcIiwgXCIwcHhcIiwgXCIwcHhcIilcbiAgICAgICAgICAgICAgICAubWF4SGVpZ2h0KFwiMHB4XCIpXG4gICAgICAgICAgICAgICAgLmRpc3BsYXkoXCJibG9ja1wiKVxuICAgICAgICAgICAgICAgIC52aXNpYmlsaXR5KFwiaGlkZGVuXCIpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5zZWxlY3QtZXJyb3ItdmlzaWJsZVwiKVxuICAgICAgICAgICAgICAgIC50cmFuc2l0aW9uKFxuICAgICAgICAgICAgICAgICAgICBbXCJtYXgtaGVpZ2h0XCIsIFwiLjNzXCIsIG51bGxdLFxuICAgICAgICAgICAgICAgICAgICBbXCJwYWRkaW5nXCIsIFwiLjJzXCIsIG51bGxdLFxuICAgICAgICAgICAgICAgICAgICBbXCJvcGFjaXR5XCIsIFwiLjJzXCIsIFwiLjJzXCJdKVxuICAgICAgICAgICAgICAgIC5vcGFjaXR5KFwiMVwiKVxuICAgICAgICAgICAgICAgIC5wYWRkaW5nKFwiMTBweFwiLCBcIjIwcHhcIiwgXCIxMHB4XCIsIFwiMjBweFwiKVxuICAgICAgICAgICAgICAgIC5tYXhIZWlnaHQoXCI1MHB4XCIpXG4gICAgICAgICAgICAgICAgLmRpc3BsYXkoXCJibG9ja1wiKVxuICAgICAgICAgICAgICAgIC52aXNpYmlsaXR5KFwidmlzaWJsZVwiKVxuICAgICAgICAgICAgICAgIC5tYXJnaW4oXCIxMHB4XCIsIG51bGwsIG51bGwsIG51bGwpXG5cbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5zZWxlY3QtZXJyb3IgaVwiKVxuICAgICAgICAgICAgICAgIC5wb3NpdGlvbihcImFic29sdXRlXCIpXG4gICAgICAgICAgICAgICAgLnRvcChcIjEwMCVcIilcbiAgICAgICAgICAgICAgICAubGVmdChcIjMwJVwiKVxuICAgICAgICAgICAgICAgIC5tYXJnaW4obnVsbCwgbnVsbCwgbnVsbCwgXCItMTVwdFwiKVxuICAgICAgICAgICAgICAgIC53aWR0aChcIjMwcHRcIilcbiAgICAgICAgICAgICAgICAuaGVpZ2h0KFwiMTVwdFwiKVxuICAgICAgICAgICAgICAgIC5vdmVyZmxvdyhcImhpZGRlblwiKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIuc2VsZWN0LWVycm9yIGk6OmFmdGVyXCIpXG4gICAgICAgICAgICAgICAgLmNvbnRlbnQoXCInJ1wiKVxuICAgICAgICAgICAgICAgIC5wb3NpdGlvbihcImFic29sdXRlXCIpXG4gICAgICAgICAgICAgICAgLndpZHRoKFwiMTVwdFwiKVxuICAgICAgICAgICAgICAgIC5oZWlnaHQoXCIxNXB0XCIpXG4gICAgICAgICAgICAgICAgLmxlZnQoXCI1MCVcIilcbiAgICAgICAgICAgICAgICAudHJhbnNmb3JtKFwidHJhbnNsYXRlKC01MCUsLTUwJSkgcm90YXRlKDQ1ZGVnKVwiKVxuICAgICAgICAgICAgICAgIC5iYWNrZ3JvdW5kQ29sb3IoXCIjRkZGRkUwXCIpXG4gICAgICAgICAgICAgICAgLmJveFNoYWRvdyhcIjBcIiwgXCIxcHRcIiwgXCI4cHRcIiwgbnVsbCwgXCJyZ2JhKDAsMCwwLDAuNSlcIilcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIC5zZWxlY3RvcihcIi5zZWxlY3QtbGFiZWxcIilcbiAgICAgICAgICAgICAgICAuYmFja2dyb3VuZENvbG9yKFwiI2ZmZlwiKVxuICAgICAgICAgICAgICAgIC5wb3NpdGlvbihcImFic29sdXRlXCIpXG4gICAgICAgICAgICAgICAgLnBhZGRpbmcoXCIwXCIsIFwiMC4yNXJlbVwiLCBcIjBcIiwgXCIwLjI1cmVtXCIpXG4gICAgICAgICAgICAgICAgLmJvcmRlclJhZGl1cyhcIjAuNXJlbVwiKVxuICAgICAgICAgICAgICAgIC50b3AoXCItMC4xcmVtXCIpXG4gICAgICAgICAgICAgICAgLmxlZnQoXCIwLjRyZW1cIilcbiAgICAgICAgICAgICAgICAubWFyZ2luKFwiMFwiLCBudWxsLCBcIjAuNXJlbVwiLCBudWxsKVxuICAgICAgICAgICAgICAgIC5mb250U2l6ZShcIjAuOXJlbVwiKVxuICAgICAgICAgICAgICAgIC5mb250V2VpZ2h0KFwiYm9sZFwiKVxuICAgICAgICAgICAgICAgIC5jb2xvcihcIiM4YThhOGFcIik7XG5cbiAgICAgICAgcmV0dXJuIHN0eWxlc2hlZXRCdWlsZGVyLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDb21wb25lbnRCdWlsZGVyfSBjb21wb25lbnRCdWlsZGVyIFxuICAgICAqIEByZXR1cm5zIHtDb21wb25lbnR9XG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkQ29tcG9uZW50KGNvbXBvbmVudEJ1aWxkZXIpIHtcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudEJ1aWxkZXJcbiAgICAgICAgICAgIC5yb290KFwiZGl2XCIsIFwiY2xhc3M9c2VsZWN0LWNvbnRhaW5lclwiKVxuICAgICAgICAgICAgLm9wZW4oKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwiZGl2XCIsIFwiaWQ9YnViYmxlTWVzc2FnZVwiKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwibGFiZWxcIiwgXCJpZD1sYWJlbFwiLCBcImNsYXNzPXNlbGVjdC1sYWJlbCBoaWRkZW5cIilcbiAgICAgICAgICAgICAgICAubm9kZShcInNlbGVjdFwiLCBcImlkPXNlbGVjdFwiLCBcImNsYXNzPXNlbGVjdC1lbnRyeVwiKVxuICAgICAgICAgICAgLmNsb3NlKClcbiAgICAgICAgLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgcG9zdENvbmZpZygpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKFNlbGVjdElucHV0KTtcbiAgICAgICAgQ2FudmFzU3R5bGVzLmVuYWJsZVN0eWxlKFNlbGVjdElucHV0Lm5hbWUpO1xuXG4gICAgICAgIFxuICAgICAgICBjb25zdCBsYWJlbCA9IHRoaXMuY29tcG9uZW50LmdldChcImxhYmVsXCIpO1xuXG5cdFx0LyoqIEB0eXBlIHtTZWxlY3RFbGVtZW50fSAqL1xuXHRcdGNvbnN0IHNlbGVjdCA9IHRoaXMuY29tcG9uZW50LmdldChcInNlbGVjdFwiKTtcbiAgICAgICAgc2VsZWN0Lm5hbWUgPSB0aGlzLm5hbWU7XG4gICAgICAgIHNlbGVjdC5saXN0ZW5UbyhcImNsaWNrXCIsIHRoaXMuY2xpY2tlZCwgdGhpcyk7XG4gICAgICAgIHNlbGVjdC5saXN0ZW5UbyhcImNoYW5nZVwiLCB0aGlzLmNoYW5nZWQsIHRoaXMpO1xuICAgICAgICBzZWxlY3QubGlzdGVuVG8oXCJibHVyXCIsIHRoaXMuYmx1cnJlZCwgdGhpcyk7XG5cbiAgICAgICAgaWYgKHRoaXMubGFiZWwgJiYgbGFiZWwpIHtcbiAgICAgICAgICAgIGxhYmVsLnNldEF0dHJpYnV0ZVZhbHVlKFwiZm9yXCIsIHNlbGVjdC5nZXRBdHRyaWJ1dGVWYWx1ZShcImlkXCIpKTtcbiAgICAgICAgICAgIGxhYmVsLnNldENoaWxkKHRoaXMubGFiZWwpO1xuICAgICAgICAgICAgU3R5bGVTZWxlY3RvckFjY2Vzc29yLmZyb20obGFiZWwpLmRpc2FibGUoXCJoaWRkZW5cIik7XG4gICAgICAgIH1cblxuXHRcdHRoaXMub3B0aW9uc1NvdXJjZS5ldmVudHMubGlzdGVuVG8oU2VsZWN0SW5wdXRPcHRpb25zU291cmNlLkVWRU5UX09QVElPTlNfQ0hBTkdFRCwgdGhpcy5oYW5kbGVPcHRpb25zQ2hhbmdlLCB0aGlzKTtcbiAgICAgICAgdGhpcy5vcHRpb25zU291cmNlLnJlZnJlc2goKTtcblxuICAgICAgICBpZih0aGlzLm1vZGVsKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGFCaW5kaW5nID0gSW5wdXRFbGVtZW50RGF0YUJpbmRpbmcubGluayh0aGlzLm1vZGVsLCB0aGlzLnZhbGlkYXRvcikudG8odGhpcy5jb21wb25lbnQuZ2V0KFwic2VsZWN0XCIpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7QXJyYXk8T3B0aW9uRWxlbWVudD59IG9wdGlvbnNBcnJheSBcbiAgICAgKi9cbiAgICBoYW5kbGVPcHRpb25zQ2hhbmdlKG9wdGlvbnNBcnJheSkge1xuICAgICAgICAvKiogQHR5cGUge1NlbGVjdEVsZW1lbnR9ICovXG4gICAgICAgIGNvbnN0IHNlbGVjdCA9IHRoaXMuY29tcG9uZW50LmdldChcInNlbGVjdFwiKTtcbiAgICAgICAgc2VsZWN0Lm9wdGlvbnMgPSBvcHRpb25zQXJyYXk7XG4gICAgICAgIGlmICh0aGlzLmRhdGFCaW5kaW5nKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGFCaW5kaW5nLnB1c2goKTtcbiAgICAgICAgfVxuICAgIH1cblxuXHQvKipcblx0ICogQHBhcmFtIHtNYXA8U3RyaW5nLCBTdHJpbmc+fSBrZXlWYWx1ZU9wdGlvbnNcblx0ICovXG5cdHNldCBvcHRpb25zKGtleVZhbHVlT3B0aW9ucykge1xuXHRcdHRoaXMub3B0aW9uc1NvdXJjZS51cGRhdGUoa2V5VmFsdWVPcHRpb25zKTtcbiAgICAgICAgaWYgKHRoaXMuZGF0YUJpbmRpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YUJpbmRpbmcucHVzaCgpO1xuICAgICAgICB9XG5cdH1cblxuICAgIGNsaWNrZWQoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5ldmVudHMudHJpZ2dlcihTZWxlY3RJbnB1dC5FVkVOVF9DTElDS0VELCBbZXZlbnRdKTtcbiAgICB9XG5cbiAgICBjaGFuZ2VkKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuZXZlbnRzLnRyaWdnZXIoU2VsZWN0SW5wdXQuRVZFTlRfQ0hBTkdFRCwgW2V2ZW50XSk7XG4gICAgfVxuXG4gICAgYmx1cnJlZChldmVudCkge1xuICAgICAgICB0aGlzLmV2ZW50cy50cmlnZ2VyKFNlbGVjdElucHV0LkVWRU5UX0JMVVJSRUQsIFtldmVudF0pO1xuICAgIH1cblxuICAgIGZvY3VzKCkgeyB0aGlzLmNvbXBvbmVudC5nZXQoXCJzZWxlY3RcIikuZm9jdXMoKTsgfVxuICAgIGVuYWJsZSgpIHsgdGhpcy5jb21wb25lbnQuZ2V0KFwic2VsZWN0XCIpLmVuYWJsZSgpOyB9XG4gICAgZGlzYWJsZSgpIHsgdGhpcy5jb21wb25lbnQuZ2V0KFwic2VsZWN0XCIpLmRpc2FibGUoKTsgfVxuICAgIGNsZWFyKCkgeyB0aGlzLmNvbXBvbmVudC5nZXQoXCJzZWxlY3RcIikudmFsdWUgPSBcIlwiOyB9XG5cbn1cblxuVHlwZUNvbmZpZ1BhY2suaW5zdGFuY2UoKS5hZGRUeXBlQ29uZmlnKFwibnV0dGluMmMtdWlcIiwgUHJvdG90eXBlQ29uZmlnLnVubmFtZWQoU2VsZWN0SW5wdXQpKTsiLCJpbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiY29yZXV0aWxfdjFcIjtcbmltcG9ydCB7IENvbW1vbklucHV0IH0gZnJvbSBcIi4uL2NvbW1vbklucHV0XCI7XG5pbXBvcnQgeyBDb21wb25lbnQsIENvbXBvbmVudEJ1aWxkZXIsIENzczNTdHlsZXNoZWV0QnVpbGRlciwgUmVxdWlyZWRWYWxpZGF0b3IsIFN0eWxlc2hlZXQsIFN0eWxlc2hlZXRCdWlsZGVyIH0gZnJvbSBcIm51dHRpbjJjLWNvcmVfdjFcIjtcbmltcG9ydCB7IEluamVjdGlvblBvaW50LCBQcm90b3R5cGVDb25maWcsIFR5cGVDb25maWdQYWNrIH0gZnJvbSBcIm1pbmRpX3YxXCI7XG5cbmNvbnN0IExPRyA9IG5ldyBMb2dnZXIoXCJUZXh0SW5wdXRcIik7XG5cbmV4cG9ydCBjbGFzcyBUZXh0SW5wdXQgZXh0ZW5kcyBDb21tb25JbnB1dCB7XG5cbiAgICBzdGF0aWMgREVGQVVMVF9MQUJFTCA9IFwiVGV4dFwiO1xuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gbW9kZWxcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGFiZWxcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IG1hbmRhdG9yeVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIG1vZGVsID0gbnVsbCwgbGFiZWwgPSBUZXh0SW5wdXQuREVGQVVMVF9MQUJFTCwgbWFuZGF0b3J5ID0gZmFsc2UpIHtcblxuICAgICAgICBzdXBlcihUZXh0SW5wdXQsXG4gICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgbW9kZWwsXG4gICAgICAgICAgICBuZXcgUmVxdWlyZWRWYWxpZGF0b3IoZmFsc2UsIG1hbmRhdG9yeSksXG4gICAgICAgICAgICBsYWJlbCxcbiAgICAgICAgICAgIFwiSW52YWxpZCB2YWx1ZVwiKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7U3R5bGVzaGVldEJ1aWxkZXJ9IHN0eWxlc2hlZXRCdWlsZGVyIFxuICAgICAqIEByZXR1cm5zIHtTdHlsZXNoZWV0fVxuICAgICAqL1xuICAgIHN0YXRpYyBidWlsZFN0eWxlc2hlZXQoc3R5bGVzaGVldEJ1aWxkZXIpIHtcbiAgICAgICBDc3MzU3R5bGVzaGVldEJ1aWxkZXIuY3JlYXRlKHN0eWxlc2hlZXRCdWlsZGVyKVxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnRleHQtaW5wdXQtY29udGFpbmVyXCIpXG4gICAgICAgICAgICAgICAgLnBvc2l0aW9uKFwicmVsYXRpdmVcIilcbiAgICAgICAgICAgICAgICAucGFkZGluZyhcIjAuNXJlbVwiKVxuXG4gICAgICAgICAgICAuc2VsZWN0b3IoXCIudGV4dC1pbnB1dC1lbnRyeVwiKVxuICAgICAgICAgICAgICAgIC5kaXNwbGF5KFwiYmxvY2tcIilcbiAgICAgICAgICAgICAgICAud2lkdGgoXCIxMDAlXCIpXG4gICAgICAgICAgICAgICAgLmhlaWdodChcImNhbGMoMS41ZW0gKyAxcmVtICsgMnB4KVwiKVxuICAgICAgICAgICAgICAgIC5wYWRkaW5nKFwiMC43cmVtXCIsIFwiMC43NXJlbVwiLCBcIjAuM3JlbVwiLCBcIjAuNzVyZW1cIilcbiAgICAgICAgICAgICAgICAuZm9udFNpemUoXCIxcmVtXCIpXG4gICAgICAgICAgICAgICAgLmZvbnRXZWlnaHQoXCI0MDBcIilcbiAgICAgICAgICAgICAgICAubGluZUhlaWdodChcIjEuNVwiKVxuICAgICAgICAgICAgICAgIC5jb2xvcihcIiM0OTUwNTdcIilcbiAgICAgICAgICAgICAgICAuYmFja2dyb3VuZENvbG9yKFwiI2ZmZlwiKVxuICAgICAgICAgICAgICAgIC5iYWNrZ3JvdW5kQ2xpcChcInBhZGRpbmctYm94XCIpXG4gICAgICAgICAgICAgICAgLmJvcmRlcihcIjFweFwiLCBcInNvbGlkXCIsIFwiI2NlZDRkYVwiKVxuICAgICAgICAgICAgICAgIC5ib3JkZXJSYWRpdXMoXCIwLjI1cmVtXCIpXG4gICAgICAgICAgICAgICAgLnRyYW5zaXRpb24oXG4gICAgICAgICAgICAgICAgICAgIFtcImJvcmRlci1jb2xvclwiLCBcIjAuMTVzXCIsIG51bGwsIFwiZWFzZS1pbi1vdXRcIl0sIFxuICAgICAgICAgICAgICAgICAgICBbXCJib3gtc2hhZG93XCIsIFwiMC4xNXNcIiwgbnVsbCwgXCJlYXNlLWluLW91dFwiXSlcbiAgICAgICAgICAgICAgICAubWFyZ2luKG51bGwsbnVsbCxcIjFyZW1cIixudWxsKVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgLnNlbGVjdG9yKFwiLnRleHQtbGFiZWxcIilcbiAgICAgICAgICAgICAgICAuYmFja2dyb3VuZENvbG9yKFwiI2ZmZlwiKVxuICAgICAgICAgICAgICAgIC5wb3NpdGlvbihcImFic29sdXRlXCIpXG4gICAgICAgICAgICAgICAgLnBhZGRpbmcoXCIwXCIsIFwiMC4yNXJlbVwiLCBcIjBcIiwgXCIwLjI1cmVtXCIpXG4gICAgICAgICAgICAgICAgLmJvcmRlclJhZGl1cyhcIjAuNXJlbVwiKVxuICAgICAgICAgICAgICAgIC50b3AoXCItMC4xcmVtXCIpXG4gICAgICAgICAgICAgICAgLmxlZnQoXCIwLjRyZW1cIilcbiAgICAgICAgICAgICAgICAubWFyZ2luKFwiMFwiLCBudWxsLCBcIjAuNXJlbVwiLCBudWxsKVxuICAgICAgICAgICAgICAgIC5mb250U2l6ZShcIjAuOXJlbVwiKVxuICAgICAgICAgICAgICAgIC5mb250V2VpZ2h0KFwiYm9sZFwiKVxuICAgICAgICAgICAgICAgIC5jb2xvcihcIiM4YThhOGFcIik7XG5cbiAgICAgICAgcmV0dXJuIHN0eWxlc2hlZXRCdWlsZGVyLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDb21wb25lbnRCdWlsZGVyfSBjb21wb25lbnRCdWlsZGVyIFxuICAgICAqIEByZXR1cm5zIHtDb21wb25lbnR9XG4gICAgICovXG4gICAgc3RhdGljIGJ1aWxkQ29tcG9uZW50KGNvbXBvbmVudEJ1aWxkZXIpIHtcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudEJ1aWxkZXJcbiAgICAgICAgICAgIC5yb290KFwiZGl2XCIsIFwiY2xhc3M9dGV4dC1pbnB1dC1jb250YWluZXJcIilcbiAgICAgICAgICAgIC5vcGVuKClcbiAgICAgICAgICAgICAgICAubm9kZShcImRpdlwiLCBcImlkPWJ1YmJsZU1lc3NhZ2VcIilcbiAgICAgICAgICAgICAgICAubm9kZShcImxhYmVsXCIsIFwiaWQ9bGFiZWxcIiwgXCJjbGFzcz10ZXh0LWxhYmVsIGhpZGRlblwiKVxuICAgICAgICAgICAgICAgIC5ub2RlKFwiaW5wdXRcIiwgXCJpZD1pbnB1dFwiLCBcInR5cGU9dGV4dFwiLCBcImNsYXNzPXRleHQtaW5wdXQtZW50cnlcIilcbiAgICAgICAgICAgIC5jbG9zZSgpXG4gICAgICAgICAgICAuYnVpbGQoKTtcbiAgICB9XG5cbn1cblxuVHlwZUNvbmZpZ1BhY2suaW5zdGFuY2UoKS5hZGRUeXBlQ29uZmlnKFwibnV0dGluMmMtdWlcIiwgUHJvdG90eXBlQ29uZmlnLnVubmFtZWQoVGV4dElucHV0KSk7Il0sIm5hbWVzIjpbIkNvbXBvbmVudCIsIlR5cGVDb25maWdQYWNrIiwiUHJvdG90eXBlQ29uZmlnIiwiTG9nZ2VyIiwiSW5qZWN0aW9uUG9pbnQiLCJJbmxpbmVDb21wb25lbnRGYWN0b3J5IiwiVGltZVByb21pc2UiLCJDYW52YXNTdHlsZXMiLCJTdHlsZUFjY2Vzc29yIiwiQ29udGFpbmVyQXN5bmMiLCJIVE1MIiwiQ3NzM1N0eWxlc2hlZXRCdWlsZGVyIiwiRXZlbnRNYW5hZ2VyIiwiU3R5bGVTZWxlY3RvckFjY2Vzc29yIiwiQ2FudmFzUm9vdCIsIk1ldGhvZCIsIkxpc3QiLCJOYXZpZ2F0aW9uIiwiQ29udGFpbmVyRWxlbWVudFV0aWxzIiwiU3RhdGVNYW5hZ2VyIiwiSW5wdXRFbGVtZW50RGF0YUJpbmRpbmciLCJNYXAiLCJMT0ciLCJFbWFpbFZhbGlkYXRvciIsIk51bWJlclZhbGlkYXRvciIsIlJlcXVpcmVkVmFsaWRhdG9yIiwiUGFzc3dvcmRWYWxpZGF0b3IiLCJFcXVhbHNQcm9wZXJ0eVZhbGlkYXRvciIsIkFuZFZhbGlkYXRvclNldCIsIlByb3BlcnR5QWNjZXNzb3IiLCJQaG9uZVZhbGlkYXRvciIsIlRleHRJbnB1dCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ08sTUFBTSxZQUFZLENBQUM7QUFDMUI7QUFDQSxJQUFJLE9BQU8sY0FBYyxZQUFZLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNsRSxJQUFJLE9BQU8sb0JBQW9CLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ2xFLElBQUksT0FBTyx1QkFBdUIsR0FBRyxDQUFDLE1BQU0s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
