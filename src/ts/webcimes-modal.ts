/**
 * Copyright (c) 2023 WebCimes - RICHARD Florian (https://webcimes.com)
 * MIT License - https://choosealicense.com/licenses/mit/
 * Date: 2023-03-25
 */

"use strict";

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
export class WebcimesModal
{
	/** Get the dom element containing all modals */
	public modals: HTMLElement;

	/** Get the dom element of the current modal */
	public modal: HTMLElement;

	/** Options of the current modal */
	private options: Options;

	private eventCancelButton: () => void = () => {
		// Callback on cancel button
		this.modal.dispatchEvent(new CustomEvent("onCancelButton"));
		if(typeof this.options.onCancelButton === 'function')
		{
			this.options.onCancelButton();
		}
	};

	private eventConfirmButton: () => void = () => {
		// Callback on confirm button
		this.modal.dispatchEvent(new CustomEvent("onConfirmButton"));
		if(typeof this.options.onConfirmButton === 'function')
		{
			this.options.onConfirmButton();
		}
	};

	private eventClickOutside: (e: Event) => void = (e) => {
		if(e.target == this.modals)
		{
			if(this.options.allowCloseOutside)
			{
				// Destroy modal
				this.destroy();
			}
			else
			{
				// Add animation for show modal who can't be close
				this.modal.classList.add("animGrowShrink");

				// Delete animation after the animation delay
				setTimeout(() => {
					this.modal.classList.remove("animGrowShrink");
				}, this.options.animationDuration);
			}
		}
	};

	private eventClickCloseButton: () => void = () => {
		// Destroy modal
		this.destroy();
	};

	private eventDragModalOnTop: (e: Event) => void = (e) => {
		// Only if target is not close button (for bug in chrome)
		if(!(<HTMLElement>e.target).closest(".webcimes-modal__close"))
		{
			// If multiple modal, and modal not already on top (no next sibling), we place the current modal on the top
			if(document.querySelectorAll(".webcimes-modal").length > 1 && this.modal.nextElementSibling !== null)
			{
				let oldScrollTop = this.modal.scrollTop;
				this.modals.insertAdjacentElement("beforeend", this.modal);
				this.modal.scrollTop = oldScrollTop;
			}
		}
	};

	private position: {x: number, y: number};

	private offset: {x: number, y: number};

	private isDragging: boolean = false;

	private moveFromElements: HTMLElement[] = [];

	private eventDragStart: (e: Event) => void = (e) => {
		// Start drag only if it's not a button
		if(!(<HTMLElement>e.target).closest(".webcimes-modal__button"))
		{
			this.isDragging = true;

			// Mouse
			if((<MouseEvent>e).clientX)
			{
				this.offset = {
					x: this.modal.offsetLeft - (<MouseEvent>e).clientX,
					y: this.modal.offsetTop - (<MouseEvent>e).clientY
				};
			}
			// Touch device (use the first touch only)
			else if((<TouchEvent>e).touches)
			{
				this.offset = {
					x: this.modal.offsetLeft - (<TouchEvent>e).touches[0].clientX,
					y: this.modal.offsetTop - (<TouchEvent>e).touches[0].clientY
				};
			}
		}
	};

	private eventMove: (e: Event) => void = (e) => {
		if(this.isDragging)
		{
			// Mouse
			if((<MouseEvent>e).clientX)
			{
				this.position = {
					x: (<MouseEvent>e).clientX,
					y: (<MouseEvent>e).clientY
				};
			}
			// Touch device (use the first touch only)
			else if((<TouchEvent>e).touches)
			{
				this.position = {
					x: (<TouchEvent>e).touches[0].clientX,
					y: (<TouchEvent>e).touches[0].clientY
				};
			}
			this.modal.style.left = (this.position.x + this.offset.x)+'px';
			this.modal.style.top  = (this.position.y + this.offset.y)+'px';
		}
	};

	private eventDragStop: () => void = () => {
		this.isDragging = false;
	};
	
	private eventPreventSelectText: (e: Event) => void = (e) => {
		if(this.isDragging)
		{
			e.preventDefault();
		}
	};

	private eventResize: () => void = () => {
		this.modal.style.removeProperty("left");
		this.modal.style.removeProperty("top");
		
	};

	/**
	 * Create modal
	 */
	constructor(options: Partial<Options>)
	{
		// Defaults
		const defaults: Options = {
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
			beforeShow: () => {},
			afterShow: () => {},
			beforeDestroy: () => {},
			afterDestroy: () => {},
			onCancelButton: () => {},
			onConfirmButton: () => {},
		}
		this.options = {...defaults, ...options};
		
		// Call init method
		this.init();
	}

	/**
	 * Initialization of the current modal
	 */
    private init()
	{
		// Create modals
		if(!document.querySelector(".webcimes-modals"))
		{
			// Create modals
			document.body.insertAdjacentHTML("beforeend", '<div class="webcimes-modals animFadeIn"></div>');
			this.modals = <HTMLElement>document.querySelector(".webcimes-modals");
			
			// Set animation duration for modals
			this.modals.style.setProperty("animation-duration", this.options.animationDuration+"ms");
	
			// Delete enter animation after animation delay
			setTimeout(() => {
				this.modals.classList.remove("animFadeIn");
			}, this.options.animationDuration);
		}
		else
		{
			// Get modals
			this.modals = <HTMLElement>document.querySelector(".webcimes-modals");

			// Remove animFadeOut in case of create new modal after destroy the last one before (during animation duration)
			this.modals.classList.remove("animFadeOut");
		}
	
		// Create modal
		this.modals.insertAdjacentHTML("beforeend", 
			`<div class="webcimes-modal `+(this.options.setClass?this.options.setClass:'')+` `+this.options.animationOnShow+`" `+(this.options.setId?'id="'+this.options.setId+'"':'')+`>
				`+(this.options.titleHtml||this.options.showCloseButton?
					`<div class="webcimes-modal__header `+(this.options.stickyHeader?'webcimes-modal__header--is-sticky':'')+` `+(this.options.moveFromHeader?'webcimes-modal__header--is-movable':'')+`">
						`+(this.options.titleHtml?'<div class="webcimes-modal__title">'+this.options.titleHtml+'</div>':'')+`
						`+(this.options.showCloseButton?'<button class="webcimes-modal__button webcimes-modal__header-close webcimes-modal__close"></button>':'')+`
					</div>`
				:'')+`
				`+(this.options.bodyHtml?
					`<div class="webcimes-modal__body `+(this.options.moveFromBody?'.webcimes-modal__body--is-movable':'')+`">
						`+this.options.bodyHtml+`
					</div>`
				:'')+`
				`+(this.options.buttonCancelHtml||this.options.buttonConfirmHtml?
					`<div class="webcimes-modal__footer `+(this.options.stickyFooter?'.webcimes-modal__footer--is-sticky':'')+` `+(this.options.moveFromFooter?'webcimes-modal__footer--is-movable':'')+`">
						`+(this.options.buttonCancelHtml?'<button class="webcimes-modal__button webcimes-modal__footer-button webcimes-modal__footer-button--cancel '+(this.options.closeOnCancelButton?'webcimes-modal__close':'')+'">'+this.options.buttonCancelHtml+'</button>':'')+`
						`+(this.options.buttonConfirmHtml?'<button class="webcimes-modal__button webcimes-modal__footer-button webcimes-modal__footer-button--confirm '+(this.options.closeOnConfirmButton?'webcimes-modal__close':'')+'">'+this.options.buttonConfirmHtml+'</button>':'')+`
					</div>`
				:'')+`
			</div>`
		);
		this.modal = <HTMLElement>this.modals.lastElementChild;
		
		// Callback before show modal (set a timeout of zero, to wait for some dom to load)
		setTimeout(() => {
			this.modal.dispatchEvent(new CustomEvent("beforeShow"));
			if(typeof this.options.beforeShow === 'function')
			{
				this.options.beforeShow();
			}
		}, 0);
		
		// Set animation duration for modal
		this.modal.style.setProperty("animation-duration", this.options.animationDuration+"ms");
		
		// Delete animation of enter after the animation delay
		setTimeout(() => {
			this.modal.classList.remove(this.options.animationOnShow);
	
			// Callback after show modal
			this.modal.dispatchEvent(new CustomEvent("afterShow"));
			if(typeof this.options.afterShow === 'function')
			{
				this.options.afterShow();
			}
		}, this.options.animationDuration);
	
		// Width of modal
		this.modal.style.setProperty("max-width", "90%");
		if(this.options.width != "auto" && this.options.width)
		{
			this.modal.style.setProperty("width", this.options.width);
		}
		else
		{
			// "max-content" is for keep size in "auto" and for maximum to max-width
			this.modal.style.setProperty("width", "max-content");
		}
	
		// Height of modal
		this.modal.style.setProperty("max-height", "90%");
		if(this.options.height != "auto" && this.options.height)
		{
			this.modal.style.setProperty("height", this.options.height);
		}
		else
		{
			// "max-content" is for keep size in "auto" and for maximum to max-height
			this.modal.style.setProperty("height", "max-content");
		}
	
		// Style
		if(this.options.style)
		{
			let oldStyle = this.modal.getAttribute("style")??"";
			this.modal.setAttribute("style", oldStyle+this.options.style);
		}
	
		// Event on cancel button
		if(this.options.buttonCancelHtml)
		{
			this.modal.querySelector(".webcimes-modal__footer-button--cancel")?.addEventListener("click", this.eventCancelButton);
		}
	
		// Event on confirm button
		if(this.options.buttonConfirmHtml)
		{
			this.modal.querySelector(".webcimes-modal__footer-button--confirm")?.addEventListener("click", this.eventConfirmButton);
		}
		
		// Event click outside (on modals)
		this.modals.addEventListener("click", this.eventClickOutside);
	
		// Event close modal when click on close button
		this.modal.querySelectorAll(".webcimes-modal__close").forEach((el) => {
			el.addEventListener("click", this.eventClickCloseButton);
		});
	
		// Place selected modal on top
		['mousedown', 'touchstart'].forEach((typeEvent) => {
			this.modal.addEventListener(typeEvent, this.eventDragModalOnTop);
		});
		
		// Move modal
		if(this.options.allowMovement && (this.options.moveFromHeader || this.options.moveFromBody || this.options.moveFromFooter))
		{
			if(this.options.moveFromHeader && this.modal.querySelector(".webcimes-modal__header"))
			{
				this.moveFromElements.push(<HTMLElement>this.modal.querySelector(".webcimes-modal__header"));
			}
			if(this.options.moveFromBody && this.modal.querySelector(".webcimes-modal__body"))
			{
				this.moveFromElements.push(<HTMLElement>this.modal.querySelector(".webcimes-modal__body"));
			}
			if(this.options.moveFromFooter && this.modal.querySelector(".webcimes-modal__footer"))
			{
				this.moveFromElements.push(<HTMLElement>this.modal.querySelector(".webcimes-modal__footer"));
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
	 * Destroy current modal
	 */
	public destroy()
	{
		// If modal is not already destroying
		if(!this.modal.getAttribute("data-destroying"))
		{
			// Callback before destroy modal
			this.modal.dispatchEvent(new CustomEvent("beforeDestroy"));
			if(typeof this.options.beforeDestroy === 'function')
			{
				this.options.beforeDestroy();
			}

			// Close modals (according the number of modal not already destroying)
			if(document.querySelectorAll(".webcimes-modal:not([data-destroying])").length == 1)
			{
				this.modals.classList.add("animFadeOut");
			}

			// Close modal
			this.modal.setAttribute("data-destroying", "1");
			this.modal.classList.add(this.options.animationOnDestroy);

			// Destroy all events from modal and remove modals or modal after animation duration
			setTimeout(() => {
				if(typeof this.modal !== 'undefined')
				{
					// Destroy all events from modal

					if(this.options.buttonCancelHtml)
					{
						this.modal.querySelector(".webcimes-modal__footer-button--cancel")?.removeEventListener("click", this.eventCancelButton);
					}

					if(this.options.buttonConfirmHtml)
					{
						this.modal.querySelector(".webcimes-modal__footer-button--confirm")?.removeEventListener("click", this.eventConfirmButton);
					}

					this.modals.removeEventListener("click", this.eventClickOutside);

					this.modal.querySelectorAll(".webcimes-modal__close").forEach((el) => {
						el.removeEventListener("click", this.eventClickCloseButton);
					});

					['mousedown', 'touchstart'].forEach((typeEvent) => {
						this.modal.removeEventListener(typeEvent, this.eventDragModalOnTop);
					});

					if(this.options.allowMovement && (this.options.moveFromHeader || this.options.moveFromBody || this.options.moveFromFooter))
					{
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
					
					// Remove modals or modal according the number of modal
					(document.querySelectorAll(".webcimes-modal").length>1?this.modal:this.modals).remove();
				}

				// Callback after destroy modal
				this.modal.dispatchEvent(new CustomEvent("afterDestroy"));
				if(typeof this.options.afterDestroy === 'function')
				{
					this.options.afterDestroy();
				}
			}, this.options.animationDuration);
		}
	}
}