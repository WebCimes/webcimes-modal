/**
 * Copyright (c) 2023 WebCimes - RICHARD Florian (https://webcimes.com)
 * MIT License - https://choosealicense.com/licenses/mit/
 * Date: 2023-03-25
 */
/**
 * Global
 */
declare global {
    /** Events */
    interface GlobalEventHandlersEventMap {
        beforeShow: CustomEvent;
        afterShow: CustomEvent;
        beforeDestroy: CustomEvent;
        afterDestroy: CustomEvent;
        onCancelButton: CustomEvent;
        onConfirmButton: CustomEvent;
    }
}
/**
 * Options
 */
export interface Options {
    /** set a specific id on the modal. default "null" */
    setId: string | null;
    /** set a specific class on the modal, default "null" */
    setClass: string | null;
    /** width (specify unit), default "auto" */
    width: string;
    /** height (specify unit), default "auto" */
    height: string;
    /** html for header (overrides titleHtml), default "null" */
    headerHtml: string | HTMLElement | (() => HTMLElement) | null;
    /** html for title, default "null" */
    titleHtml: string | HTMLElement | (() => HTMLElement) | null;
    /** html for body, default "null" */
    bodyHtml: string | HTMLElement | (() => HTMLElement) | null;
    /** html for footer (overrides buttonCancelHtml and buttonConfirmHtml), default "null" */
    footerHtml: string | HTMLElement | (() => HTMLElement) | null;
    /** html for cancel button, default "null" */
    buttonCancelHtml: string | HTMLElement | (() => HTMLElement) | null;
    /** html for confirm button, default "null" */
    buttonConfirmHtml: string | HTMLElement | (() => HTMLElement) | null;
    /** add extra css classes to cancel button, default "[]" */
    buttonCancelClass: string[];
    /** add extra css classes to confirm button, default "[]" */
    buttonConfirmClass: string[];
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
    /** add extra css style to modal, default null */
    style: string | null;
    /** "animDropDown" or "animFadeIn" for show animation, default "animDropDown" */
    animationOnShow: 'animDropDown' | 'animFadeIn';
    /** "animDropUp" or "animFadeOut" for destroy animation, default "animDropUp" */
    animationOnDestroy: 'animDropUp' | 'animFadeOut';
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
 * Public interface for WebcimesModal instances
 * This represents the actual accessible members of the instance
 */
export interface WebcimesModal {
    /** Get the dom element containing all modals */
    modals: HTMLElement;
    /** Get the dom element of the current modal */
    modal: HTMLElement;
    /** Destroy the current modal */
    destroy(): void;
}
/**
 * Factory function to create a WebcimesModal instance with proper typing
 */
export declare function createWebcimesModal(options: Partial<Options>): WebcimesModal;
//# sourceMappingURL=webcimes-modal.d.ts.map