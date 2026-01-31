import { Logger, Method } from "coreutil_v1";
import { Component,
	EventManager,
	SimpleElement,
	StateManager,
	ComponentBuilder,
	InlineComponentFactory,
	StyleSelectorAccessor
} from "nuttin2c-core_v1";
import { InjectionPoint, PrototypeConfig, Provider, TypeConfigPack } from "mindi_v1";
import { Panel } from "../../panel/panel.js";
import { RadioToggleIcon } from "../../input/radioToggleIcon/radioToggleIcon.js";
import { ContainerEvent } from "containerbridge_v1";
import { ToggleIcon } from "../../input/toggleIcon/toggleIcon.js";
import { BannerLabel } from "../../bannerLabel/bannerLabel.js";

const LOG = new Logger("TreePanelEntry");

export class TreePanelEntry {

	static RECORD_ELEMENT_REQUESTED = "recordElementRequested";
	static BEFORE_LOAD_ELEMENT_REQUESTED = "beforeLoadElementRequested";
	static SUB_RECORDS_STATE_UPDATE_REQUESTED = "subRecordsStateUpdateRequested";
	static EVENT_EXPAND_TOGGLE_OVERRIDE = "expandToggleOverride";

    constructor(record = null) {

		/** @type {InlineComponentFactory} */
		this.componentFactory = InjectionPoint.instance(InlineComponentFactory);

		/** @type {Component} */
		this.component = null;

		/** @type {Provider<Panel>} */
		this.panelProvider = InjectionPoint.provider(Panel);

		/** @type {EventManager} */
		this.eventManager = new EventManager();

        /** @type {StateManager<any[]>} */
        this.arrayState = new StateManager();

		/** @type {Provider<TreePanelEntry>} */
		this.treePanelEntryProvider = InjectionPoint.provider(TreePanelEntry);

		/** @type {ToggleIcon} */
		this.expandToggle = InjectionPoint.instance(ToggleIcon);

		/** @type {BannerLabel} */
		this.bannerLabel = InjectionPoint.instance(BannerLabel);

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
			new Method(this.handleDomainChange, this),
			new Method(this.handleErrorChange,this));

    }

	async enableBorder() {
		StyleSelectorAccessor.from(this.component.get("root")).enable("cntr-round-bordered");
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
			StyleSelectorAccessor.from(this.component.get("messageContainer")).disable("hidden");
			await this.toggleSpinner(false);
			await this.hideSubRecords();
			this.expandToggle.toggle(false, true);
			return;
		}
		this.bannerLabel.hide();
		await this.hideMessage();
	}

	async hideMessage() {
		StyleSelectorAccessor.from(this.component.get("messageContainer")).enable("hidden");
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
			LOG.error(error);
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
			LOG.error(error);
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
			StyleSelectorAccessor.from(this.component.get("spinner")).disable("spinner-container-hidden");
			StyleSelectorAccessor.from(this.component.get("spinner")).enable("spinner-container-visible");
			return;
		}
		StyleSelectorAccessor.from(this.component.get("spinner")).enable("spinner-container-hidden");
		StyleSelectorAccessor.from(this.component.get("spinner")).disable("spinner-container-visible");
	}

	/**
	 * @param {Boolean} visible 
	 */
	async toggleChildElements(visible) {
		if (visible) {
			StyleSelectorAccessor.from(this.component.get("subrecordElementsContainer")).disable("hidden");
			return;
		}
		StyleSelectorAccessor.from(this.component.get("subrecordElementsContainer")).enable("hidden");
	}

	/**
	 * 
	 * @param {Boolean} visible 
	 */
	async toggleButtons(visible) {
		if (visible) {
			StyleSelectorAccessor.from(this.component.get("buttonsContainer")).disable("hidden");
			return;
		}
		StyleSelectorAccessor.from(this.component.get("buttonsContainer")).enable("hidden");
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

TypeConfigPack.instance().addTypeConfig("nuttin2c-ui", PrototypeConfig.unnamed(TreePanelEntry));