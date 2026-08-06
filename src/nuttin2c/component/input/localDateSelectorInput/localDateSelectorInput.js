import { Logger } from "coreutil_v1";
import { CanvasStyles,
    Component,
    EventManager,
    InputElementDataBinding,
    OptionElement,
    SelectElement, 
    Stylesheet,
    StylesheetBuilder,
    ComponentBuilder,
    InlineComponentFactory,
    Css3StylesheetBuilder,
    RequiredValidator,
    StyleSelectorAccessor,
    TextInputElement
} from "nuttin2c-core_v1";
import { InjectionPoint,
    PrototypeConfig,
    TypeConfigPack } from "mindi_v1";
import { CommonEvents } from "../../common/commonEvents.js";
import { SelectInputOptionsSource } from "../selectInputOptionsSource.js";

const LOG = new Logger("LocalDateSelectorInput");

export class LocalDateSelectorInput {

	static DEFAULT_PLACEHOLDER = "LocalDateSelector";

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
     */
    constructor(name, model = null, label = LocalDateSelectorInput.DEFAULT_PLACEHOLDER, mandatory = false, startYear = 1970, endYear = 2050) {
        
        /** @type {InlineComponentFactory} */
        this.componentFactory = InjectionPoint.instance(InlineComponentFactory);

        /** @type {EventManager} */
        this.events = new EventManager();

        /** @type {Component} */
        this.component = null;

        /** @type {string} */
        this.name = name;

        /** @type {SelectInputOptionsSource} */
        this.yearSource = new SelectInputOptionsSource();
        this.yearSource.update(this.buildYearOptions(startYear, endYear));

        this.monthSource = new SelectInputOptionsSource();
        this.monthSource.update(this.buildMonthOptions());

        this.daySource = new SelectInputOptionsSource();

        /** @type {string} */
        this.label = label;

        /** @type {boolean} */
        this.mandatory = mandatory;

        /** @type {object} */
        this.model = model;

        /** @type {RequiredValidator} */
        this.validator = new RequiredValidator(false, mandatory);

    }

    buildMonthOptions() {
        const monthOptions = new Map();
        monthOptions.set("01", "Jan");
        monthOptions.set("02", "Feb");
        monthOptions.set("03", "Mar");
        monthOptions.set("04", "Apr");
        monthOptions.set("05", "May");
        monthOptions.set("06", "Jun");
        monthOptions.set("07", "Jul");
        monthOptions.set("08", "Aug");
        monthOptions.set("09", "Sep");
        monthOptions.set("10", "Oct");
        monthOptions.set("11", "Nov");
        monthOptions.set("12", "Dec");
        return monthOptions;
    }

    buildYearOptions(startYear, endYear) {
        const yearOptions = new Map();
        for (let year = startYear; year <= endYear; year++) {
            yearOptions.set(year.toString(), year.toString());
        }
        return yearOptions;
    }

    /**
     * @param {StylesheetBuilder} stylesheetBuilder 
     * @returns {Stylesheet}
     */
    static buildStylesheet(stylesheetBuilder) {
        Css3StylesheetBuilder.create(stylesheetBuilder)
            .selector(".local-date-container")
                .position("relative")
                .padding("0.5rem")

            .selector(".local-date-entry-border")
                .display("block")
                .width("100%")
                .height("calc(1.5em + 1rem + 2px)")
                .padding("1pt", "1pt", "1pt", "1pt")
                .fontSize("1rem")
                .fontWeight("400")
                .lineHeight("1.5")
                .color("#495057")
                .backgroundColor("#fff")
                .backgroundClip("padding-box")
                .border("1pt", "solid", "#ced4da")
                .borderRadius("0.25rem")
                .margin(null, null, "1rem", null)

            .selector(".local-date-entry")
                .display("inline-block")
                .height("calc(1.5em + 1rem - 2px)")
                .padding("0.6rem", "2.5rem", "0.3rem", "0.75rem")
                .fontSize("1rem")
                .fontWeight("400")
                .lineHeight("1.5")
                .color("#495057")
                .backgroundColor("#fff")
                .border("0pt", "solid", "#ffffff")
                .appearance("none")
                .margin(null, "2pt", null, null)
                .backgroundImage("url(\"data:image/svg+xml;utf8,<svg fill='2196F3' height='20' viewBox='0 0 20 20' width='20' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>\")")
                .backgroundRepeat("no-repeat")
                .backgroundPosition("right 0.75rem top 0.3rem")
                .backgroundSize("1.5em")
            
            .selector(".local-date-error")
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

            .selector(".local-date-error-hidden")
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

            .selector(".local-date-error-visible")
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

            .selector(".local-date-error i")
                .position("absolute")
                .top("100%")
                .left("30%")
                .margin(null, null, null, "-15pt")
                .width("30pt")
                .height("15pt")
                .overflow("hidden")

            .selector(".local-date-error i::after")
                .content("''")
                .position("absolute")
                .width("15pt")
                .height("15pt")
                .left("50%")
                .transform("translate(-50%,-50%) rotate(45deg)")
                .backgroundColor("#FFFFE0")
                .boxShadow("0", "1pt", "8pt", null, "rgba(0,0,0,0.5)")
                
            .selector(".local-date-label")
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
            .root("div", "class=local-date-container")
            .open()
                .node("div", "id=bubbleMessage")
                .node("label", "id=label", "class=local-date-label hidden")
                .node("div", "id=frame", "class=local-date-entry-border")
                .open()
                    .node("select", "id=year", "class=local-date-entry")
                    .node("select", "id=month", "class=local-date-entry")
                    .node("select", "id=day", "class=local-date-entry")
                    .node("input", "id=hiddenInput", "type=hidden")
                .close()
            .close()
        .build();
    }

    postConfig() {
        this.component = this.componentFactory.create(LocalDateSelectorInput);
        CanvasStyles.enableStyle(LocalDateSelectorInput.name);

        
        const label = this.component.get("label");

		/** @type {SelectElement} */
		const yearSelect = this.component.get("year");
        yearSelect.listenTo("change", this.yearChanged, this);

        const monthSelect = this.component.get("month");
        monthSelect.listenTo("change", this.monthChanged, this);

        const daySelect = this.component.get("day");
        daySelect.listenTo("change", this.dayChanged, this);

        if (this.label && label) {
            label.setAttributeValue("for", yearSelect.getAttributeValue("id"));
            label.setChild(this.label);
            StyleSelectorAccessor.from(label).disable("hidden");
        }

		this.yearSource.events.listenTo(SelectInputOptionsSource.EVENT_OPTIONS_CHANGED, this.handleYearChange, this);
        this.monthSource.events.listenTo(SelectInputOptionsSource.EVENT_OPTIONS_CHANGED, this.handleMonthChange, this);
        this.daySource.events.listenTo(SelectInputOptionsSource.EVENT_OPTIONS_CHANGED, this.handleDayChange, this);

        this.yearSource.refresh();
        this.monthSource.refresh();
        this.daySource.refresh();

        /** @type {TextInputElement} */
        const hiddenInput = this.component.get("hiddenInput");
        hiddenInput.name = this.name;
        hiddenInput.listenTo("change", this.updateInputs, this);

        if(this.model) {
            this.localDateBinding = InputElementDataBinding.link(this.model, this.validator).to(this.component.get("hiddenInput"));
        }
        this.updateLocalDate();
    }

    handleYearChange(optionsArray) {
        this.component.get("year").options = optionsArray;
        this.updateDayOfMonthOptions();
    }

    handleMonthChange(optionsArray) {
        this.component.get("month").options = optionsArray;
        this.updateDayOfMonthOptions();
    }

    handleDayChange(optionsArray) {
        this.component.get("day").options = optionsArray;
    }

    updateDayOfMonthOptions() {
        const yearSelect = this.component.get("year");
        const monthSelect = this.component.get("month");
        const daySelect = this.component.get("day");

        const selectedYear = parseInt(yearSelect.value);
        const selectedMonth = parseInt(monthSelect.value);

        if (!isNaN(selectedYear) && !isNaN(selectedMonth)) {
            const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
            const dayOptions = new Map();
            for (let day = 1; day <= daysInMonth; day++) {
                dayOptions.set(this.nullPrefix(day.toString()), day.toString());
            }
            this.daySource.update(dayOptions);
        } else {
            this.daySource.update(new Map());
        }
    }

    nullPrefix(value) {
        return value.length === 1 ? "0" + value : value;
    }

    yearChanged(event) {
        this.updateDayOfMonthOptions();
        this.updateLocalDate();
    }

    monthChanged(event) {
        this.updateDayOfMonthOptions();
        this.updateLocalDate();
    }

    dayChanged(event) {
        this.updateLocalDate();
    }

    updateInputs() {
        const localDateInput = this.component.get("hiddenInput");
        const localDateValue = localDateInput.value;
        if (localDateValue) {
            const [year, month, day] = localDateValue.split("-");
            if (this.component.get("year").value !== year) {
                this.component.get("year").value = year;
            }
            if (this.component.get("month").value !== month) {
                this.component.get("month").value = month;
            }
            if (this.component.get("day").value !== day) {
                this.component.get("day").value = day;
            }
        }
    }

    updateLocalDate() {
        const localDateInput = this.component.get("hiddenInput");
        const yearSelect = this.component.get("year");
        const monthSelect = this.component.get("month");
        const daySelect = this.component.get("day");

        const selectedYear = yearSelect.value;
        const selectedMonth = monthSelect.value;
        const selectedDay = daySelect.value;

        if (selectedYear && selectedMonth && selectedDay) {
            const newValue = `${selectedYear}-${selectedMonth}-${selectedDay}`
            if (localDateInput.value !== newValue) {
                localDateInput.value = newValue;
            }
        }

        if (this.localDateBinding) {
            this.localDateBinding.pull();
        }
    }

    get value() {
        /** @type {TextInputElement} */
        const localDate = this.component.get("hiddenInput");
        return localDate.value;
    }

    clicked(event) {
        this.events.trigger(LocalDateSelectorInput.EVENT_CLICKED, [event]);
    }

    blurred(event) {
        this.events.trigger(LocalDateSelectorInput.EVENT_BLURRED, [event]);
    }

    changed(event) {
        this.events.trigger(LocalDateSelectorInput.EVENT_CHANGED, [event]);
    }

    focus() { this.component.get("year").focus(); }
    enable() { this.component.get("year").enable(); }
    disable() { this.component.get("year").disable(); }
    clear() { this.component.get("year").value = ""; }

}

TypeConfigPack.instance().addTypeConfig("nuttin2c-ui", PrototypeConfig.unnamed(LocalDateSelectorInput));