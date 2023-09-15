(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WebcimesModal: () => (/* binding */ WebcimesModal)
/* harmony export */ });
/**
 * Copyright (c) 2023 WebCimes - RICHARD Florian (https://webcimes.com)
 * MIT License - https://choosealicense.com/licenses/mit/
 * Date: 2023-03-25
 */

/**
 * Class WebcimesModal
 */
class WebcimesModal {
    webcimesModals;
    modal;
    options;
    eventCancelButton = () => {
        // Callback on cancel button
        if (typeof this.options.onCancelButton === 'function') {
            this.options.onCancelButton();
        }
    };
    eventConfirmButton = () => {
        // Callback on confirm button
        if (typeof this.options.onConfirmButton === 'function') {
            this.options.onConfirmButton();
        }
    };
    eventClickOutside = (e) => {
        if (e.target == this.webcimesModals) {
            if (this.options.allowCloseOutside) {
                // Destroy modal
                this.destroy();
            }
            else {
                // Add animation for show modal who can't be close
                this.modal.classList.add("animGrowShrink");
                // Delete animation after the animation delay
                setTimeout(() => {
                    this.modal.classList.remove("animGrowShrink");
                }, this.options.animationDuration);
            }
        }
    };
    eventClickCloseButton = () => {
        // Destroy modal
        this.destroy();
    };
    eventDragModalOnTop = (e) => {
        // Only if target is not close button (for bug in chrome)
        if (!e.target.closest(".close")) {
            // If multiple modal, and modal not already on top (no next sibling), we place the current modal on the top
            if (document.querySelectorAll(".modal").length > 1 && this.modal.nextElementSibling !== null) {
                let oldScrollTop = this.modal.scrollTop;
                this.webcimesModals.insertAdjacentElement("beforeend", this.modal);
                this.modal.scrollTop = oldScrollTop;
            }
        }
    };
    position;
    offset;
    isDragging = false;
    moveFromElements = [];
    eventDragStart = (e) => {
        // Start drag only if it's not a button
        if (!e.target.closest("button")) {
            this.isDragging = true;
            // Mouse
            if (e.clientX) {
                this.offset = {
                    x: this.modal.offsetLeft - e.clientX,
                    y: this.modal.offsetTop - e.clientY
                };
            }
            // Touch device (use the first touch only)
            else if (e.touches) {
                this.offset = {
                    x: this.modal.offsetLeft - e.touches[0].clientX,
                    y: this.modal.offsetTop - e.touches[0].clientY
                };
            }
        }
    };
    eventMove = (e) => {
        if (this.isDragging) {
            // Mouse
            if (e.clientX) {
                this.position = {
                    x: e.clientX,
                    y: e.clientY
                };
            }
            // Touch device (use the first touch only)
            else if (e.touches) {
                this.position = {
                    x: e.touches[0].clientX,
                    y: e.touches[0].clientY
                };
            }
            this.modal.style.left = (this.position.x + this.offset.x) + 'px';
            this.modal.style.top = (this.position.y + this.offset.y) + 'px';
        }
    };
    eventDragStop = () => {
        this.isDragging = false;
    };
    eventPreventSelectText = (e) => {
        if (this.isDragging) {
            e.preventDefault();
        }
    };
    eventResize = () => {
        this.modal.style.removeProperty("left");
        this.modal.style.removeProperty("top");
    };
    /**
     * Create modal
     * @param {Object} options
     * @param {string | null} options.setId - set a specific id on the modal. default "null"
     * @param {string | null} options.setClass - set a specific class on the modal, default "null"
     * @param {string} options.width - width (specify unit), default "auto"
     * @param {string} options.height - height (specify unit), default "auto"
     * @param {string | null} options.titleHtml - html for title, default "null"
     * @param {string | null} options.bodyHtml - html for body, default "null"
     * @param {string | null} options.buttonCancelHtml - html for cancel button, default "null"
     * @param {string | null} options.buttonConfirmHtml - html for confirm button, default "null"
     * @param {boolean} options.closeOnCancelButton - close modal after trigger cancel button, default "true"
     * @param {boolean} options.closeOnConfirmButton - close modal after trigger confirm button, default "true"
     * @param {boolean} options.showCloseButton - show close button, default "true"
     * @param {boolean} options.allowCloseOutside - allow the modal to close when clicked outside, default "true"
     * @param {boolean} options.allowMovement - ability to move modal, default "true"
     * @param {boolean} options.moveFromHeader - if allowMovement is set to "true", ability to move modal from header, default "true"
     * @param {boolean} options.moveFromBody - if allowMovement is set to "true", ability to move modal from body, default "false"
     * @param {boolean} options.moveFromFooter - if allowMovement is set to "true", ability to move modal from footer, default "true"
     * @param {boolean} options.stickyHeader - keep header sticky (visible) when scrolling, default "true"
     * @param {boolean} options.stickyFooter - keep footer sticky (visible) when scrolling, default "true"
     * @param {string | null} options.style - add extra css style to modal, default null
     * @param {"animDropDown" | "animFadeIn"} options.animationOnShow - "animDropDown" or "animFadeIn" for show animation, default "animDropDown"
     * @param {"animDropUp" | "animFadeOut"} options.animationOnDestroy - "animDropUp" or "animFadeOut" for destroy animation, default "animDropUp"
     * @param {number} options.animationDuration - animation duration in ms, default "500"
     * @param {() => void} options.beforeShow - callback before show modal
     * @param {() => void} options.afterShow - callback after show modal
     * @param {() => void} options.beforeDestroy - callback before destroy modal
     * @param {() => void} options.afterDestroy - callback after destroy modal
     * @param {() => void} options.onCancelButton - callback after triggering cancel button
     * @param {() => void} options.onConfirmButton - callback after triggering confirm button
     */
    constructor(options) {
        // Defaults
        const defaults = {
            setId: null,
            setClass: null,
            width: 'auto',
            height: 'auto',
            titleHtml: null,
            bodyHtml: null,
            buttonCancelHtml: null,
            buttonConfirmHtml: null,
            closeOnCancelButton: true,
            closeOnConfirmButton: true,
            showCloseButton: true,
            allowCloseOutside: true,
            allowMovement: true,
            moveFromHeader: true,
            moveFromBody: false,
            moveFromFooter: true,
            stickyHeader: true,
            stickyFooter: true,
            style: null,
            animationOnShow: 'animDropDown',
            animationOnDestroy: 'animDropUp',
            animationDuration: 500,
            beforeShow: () => { },
            afterShow: () => { },
            beforeDestroy: () => { },
            afterDestroy: () => { },
            onCancelButton: () => { },
            onConfirmButton: () => { },
        };
        this.options = { ...defaults, ...options };
        // Call init method
        this.init();
    }
    /**
     * Init modal
     */
    init() {
        // Create webcimesModals
        if (!document.querySelector(".webcimesModals")) {
            // Create webcimesModals
            document.body.insertAdjacentHTML("beforeend", '<div class="webcimesModals animFadeIn"></div>');
            this.webcimesModals = document.querySelector(".webcimesModals");
            // Set animation duration for webcimesModals
            this.webcimesModals.style.setProperty("animation-duration", this.options.animationDuration + "ms");
            // Delete enter animation after animation delay
            setTimeout(() => {
                this.webcimesModals.classList.remove("animFadeIn");
            }, this.options.animationDuration);
        }
        else {
            this.webcimesModals = document.querySelector(".webcimesModals");
        }
        // Create modal
        this.webcimesModals.insertAdjacentHTML("beforeend", `<div class="modal ` + (this.options.setClass ? this.options.setClass : '') + ` ` + this.options.animationOnShow + `" ` + (this.options.setId ? 'id="' + this.options.setId + '"' : '') + `>
				` + (this.options.titleHtml || this.options.showCloseButton ?
            `<div class="modalHeader ` + (this.options.stickyHeader ? 'sticky' : '') + ` ` + (this.options.moveFromHeader ? 'movable' : '') + `">
						` + (this.options.titleHtml ? '<div class="title">' + this.options.titleHtml + '</div>' : '') + `
						` + (this.options.showCloseButton ? '<button class="close"></button>' : '') + `
					</div>`
            : '') + `
				` + (this.options.bodyHtml ?
            `<div class="modalBody ` + (this.options.moveFromBody ? 'movable' : '') + `">
						` + this.options.bodyHtml + `
					</div>`
            : '') + `
				` + (this.options.buttonCancelHtml || this.options.buttonConfirmHtml ?
            `<div class="modalFooter ` + (this.options.stickyFooter ? 'sticky' : '') + ` ` + (this.options.moveFromFooter ? 'movable' : '') + `">
						` + (this.options.buttonCancelHtml ? '<button class="cancel ' + (this.options.closeOnCancelButton ? 'close' : '') + '">' + this.options.buttonCancelHtml + '</button>' : '') + `
						` + (this.options.buttonConfirmHtml ? '<button class="confirm ' + (this.options.closeOnConfirmButton ? 'close' : '') + '">' + this.options.buttonConfirmHtml + '</button>' : '') + `
					</div>`
            : '') + `
			</div>`);
        this.modal = this.webcimesModals.lastElementChild;
        // Callback before show modal
        if (typeof this.options.beforeShow === 'function') {
            // Set a timeout of zero, to wait for some dom to load
            setTimeout(() => {
                this.options.beforeShow();
            }, 0);
        }
        // Set animation duration for modal
        this.modal.style.setProperty("animation-duration", this.options.animationDuration + "ms");
        // Delete animation of enter after the animation delay
        setTimeout(() => {
            this.modal.classList.remove(this.options.animationOnShow);
            // Callback after show modal
            if (typeof this.options.afterShow === 'function') {
                this.options.afterShow();
            }
        }, this.options.animationDuration);
        // Width of modal
        this.modal.style.setProperty("max-width", "90%");
        if (this.options.width != "auto" && this.options.width) {
            this.modal.style.setProperty("width", this.options.width);
        }
        else {
            // "max-content" is for keep size in "auto" and for maximum to max-width
            this.modal.style.setProperty("width", "max-content");
        }
        // Height of modal
        this.modal.style.setProperty("max-height", "90%");
        if (this.options.height != "auto" && this.options.height) {
            this.modal.style.setProperty("height", this.options.height);
        }
        else {
            // "max-content" is for keep size in "auto" and for maximum to max-height
            this.modal.style.setProperty("height", "max-content");
        }
        // Style
        if (this.options.style) {
            let oldStyle = this.modal.getAttribute("style");
            this.modal.setAttribute("style", oldStyle + this.options.style);
        }
        // Event on cancel button
        if (this.options.buttonCancelHtml) {
            this.modal.querySelector(".cancel")?.addEventListener("click", this.eventCancelButton);
        }
        // Event on confirm button
        if (this.options.buttonConfirmHtml) {
            this.modal.querySelector(".confirm")?.addEventListener("click", this.eventConfirmButton);
        }
        // Event click outside (on webcimesModals)
        this.webcimesModals.addEventListener("click", this.eventClickOutside);
        // Event close modal when click on close button
        this.modal.querySelectorAll(".close").forEach((el) => {
            el.addEventListener("click", this.eventClickCloseButton);
        });
        // Place selected modal on top
        ['mousedown', 'touchstart'].forEach((typeEvent) => {
            this.modal.addEventListener(typeEvent, this.eventDragModalOnTop);
        });
        // Move modal
        if (this.options.allowMovement && (this.options.moveFromHeader || this.options.moveFromBody || this.options.moveFromFooter)) {
            if (this.options.moveFromHeader && this.modal.querySelector(".modalHeader")) {
                this.moveFromElements.push(this.modal.querySelector(".modalHeader"));
            }
            if (this.options.moveFromBody && this.modal.querySelector(".modalBody")) {
                this.moveFromElements.push(this.modal.querySelector(".modalBody"));
            }
            if (this.options.moveFromFooter && this.modal.querySelector(".modalFooter")) {
                this.moveFromElements.push(this.modal.querySelector(".modalFooter"));
            }
            ['mousedown', 'touchstart'].forEach((typeEvent) => {
                this.moveFromElements.forEach((el) => {
                    el.addEventListener(typeEvent, this.eventDragStart);
                });
            });
            ['mousemove', 'touchmove'].forEach((typeEvent) => {
                document.addEventListener(typeEvent, this.eventMove);
            });
            ['mouseup', 'touchend'].forEach((typeEvent) => {
                document.addEventListener(typeEvent, this.eventDragStop);
            });
            document.addEventListener("selectstart", this.eventPreventSelectText);
        }
        // When resizing window, reset modal position to center
        window.addEventListener("resize", this.eventResize);
    }
    /**
     * Destroy modal
     */
    destroy() {
        // If modal is not already destroying
        if (!this.modal.getAttribute("data-destroying")) {
            // Callback before destroy modal
            if (typeof this.options.beforeDestroy === 'function') {
                this.options.beforeDestroy();
            }
            // Close webcimesModals (according the number of modal not already destroying)
            if (document.querySelectorAll(".modal:not([data-destroying])").length == 1) {
                this.webcimesModals.classList.add("animFadeOut");
            }
            // Close modal
            this.modal.setAttribute("data-destroying", "1");
            this.modal.classList.add(this.options.animationOnDestroy);
            // Destroy all events from modal and remove webcimesModals or modal after animation duration
            setTimeout(() => {
                if (typeof this.modal !== 'undefined') {
                    // Destroy all events from modal
                    if (this.options.buttonCancelHtml) {
                        this.modal.querySelector(".cancel")?.removeEventListener("click", this.eventCancelButton);
                    }
                    if (this.options.buttonConfirmHtml) {
                        this.modal.querySelector(".confirm")?.removeEventListener("click", this.eventConfirmButton);
                    }
                    this.webcimesModals.removeEventListener("click", this.eventClickOutside);
                    this.modal.querySelectorAll(".close").forEach((el) => {
                        el.removeEventListener("click", this.eventClickCloseButton);
                    });
                    ['mousedown', 'touchstart'].forEach((typeEvent) => {
                        this.modal.removeEventListener(typeEvent, this.eventDragModalOnTop);
                    });
                    if (this.options.allowMovement && (this.options.moveFromHeader || this.options.moveFromBody || this.options.moveFromFooter)) {
                        ['mousedown', 'touchstart'].forEach((typeEvent) => {
                            this.moveFromElements.forEach((el) => {
                                el.removeEventListener(typeEvent, this.eventDragStart);
                            });
                        });
                        ['mousemove', 'touchmove'].forEach((typeEvent) => {
                            document.removeEventListener(typeEvent, this.eventMove);
                        });
                        ['mouseup', 'touchend'].forEach((typeEvent) => {
                            document.removeEventListener(typeEvent, this.eventDragStop);
                        });
                        document.removeEventListener("selectstart", this.eventPreventSelectText);
                    }
                    window.removeEventListener("resize", this.eventResize);
                    // Remove webcimesModals or modal according the number of modal
                    (document.querySelectorAll(".modal").length > 1 ? this.modal : this.webcimesModals).remove();
                }
                // Callback after destroy modal
                if (typeof this.options.afterDestroy === 'function') {
                    this.options.afterDestroy();
                }
            }, this.options.animationDuration);
        }
    }
}

/******/ 	return __webpack_exports__;
/******/ })()
;
});