/**
 * Copyright (c) 2023 WebCimes - RICHARD Florian (https://webcimes.com)
 * MIT License - https://choosealicense.com/licenses/mit/
 * Date: 2023-03-25
 */
/**
 * Options
 */
interface Options {
    /** set a specific id on the modal. default "null" */
    setId: string | null;
    /** set a specific class on the modal, default "null" */
    setClass: string | null;
    /** width (specify unit), default "auto" */
    width: string;
    /** height (specify unit), default "auto" */
    height: string;
    /** html for title, default "null" */
    titleHtml: string | null;
    /** html for body, default "null" */
    bodyHtml: string | null;
    /** html for cancel button, default "null" */
    buttonCancelHtml: string | null;
    /** html for confirm button, default "null" */
    buttonConfirmHtml: string | null;
    /** close modal after trigger cancel button, default "true" */
    closeOnCancelButton: boolean;
    /** close modal after trigger confirm button, default "true" */
    closeOnConfirmButton: boolean;
    /** show close button, default "true" */
    showCloseButton: boolean;
    /** allow the modal to close when clicked outside, default "true" */
    allowCloseOutside: boolean;
    /** ability to move modal, default "true" */
    allowMovement: boolean;
    /** if allowMovement is set to "true", ability to move modal from header, default "true" */
    moveFromHeader: boolean;
    /** if allowMovement is set to "true", ability to move modal from body, default "false" */
    moveFromBody: boolean;
    /** if allowMovement is set to "true", ability to move modal from footer, default "true" */
    moveFromFooter: boolean;
    /** keep header sticky (visible) when scrolling, default "true" */
    stickyHeader: boolean;
    /** keep footer sticky (visible) when scrolling, default "true" */
    stickyFooter: boolean;
    /** add extra css style to modal, default null */
    style: string | null;
    /** "animDropDown" or "animFadeIn" for show animation, default "animDropDown" */
    animationOnShow: "animDropDown" | "animFadeIn";
    /** "animDropUp" or "animFadeOut" for destroy animation, default "animDropUp" */
    animationOnDestroy: "animDropUp" | "animFadeOut";
    /** animation duration in ms, default "500" */
    animationDuration: number;
    /** callback before show modal */
    beforeShow: () => void;
    /** callback after show modal */
    afterShow: () => void;
    /** callback before destroy modal */
    beforeDestroy: () => void;
    /** callback after destroy modal */
    afterDestroy: () => void;
    /** callback after triggering cancel button */
    onCancelButton: () => void;
    /** callback after triggering confirm button */
    onConfirmButton: () => void;
}
/**
 * Class WebcimesModal
 */
export declare class WebcimesModal {
    webcimesModals: HTMLElement;
    modal: HTMLElement;
    private options;
    private eventCancelButton;
    private eventConfirmButton;
    private eventClickOutside;
    private eventClickCloseButton;
    private eventDragModalOnTop;
    private position;
    private offset;
    private isDragging;
    private moveFromElements;
    private eventDragStart;
    private eventMove;
    private eventDragStop;
    private eventPreventSelectText;
    private eventResize;
    /**
     * Create modal
     */
    constructor(options: Options);
    /**
     * Init modal
     */
    init(): void;
    /**
     * Destroy modal
     */
    destroy(): void;
}
export {};

