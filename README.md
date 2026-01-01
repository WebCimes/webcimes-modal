# webcimes-modal

Create and animate modals simply, you can use multiple modals at the same time, create alert or confirm modal with buttons, move modals, set title, set body, etc.. It works with vanilla javascript + html + css, no dependencies are required and the module is built in a very lightweight size.

Once the `webcimes-modal` javascript is defined, we can simply call the WebcimesModal class with the desired options.

## Installation

Use the npm package manager to install webcimes-modal.

```bash
npm install webcimes-modal
```

### ESM

Compared to JS bundlers (like Webpack), using ESM in the browser requires you to use the full path and filename instead of the module name.
You can use an importmap to resolve the arbitrary module names to complete paths (not needed if you use JS bundlers):

```html
<html>
    <head>
        ...
        <script type="importmap">
            {
                "imports": {
                    "webcimes-modal": "./node_modules/webcimes-modal/dist/js/webcimes-modal.esm.js"
                }
            }
        </script>
    </head>
    ...
</html>
```

Then import javascript module:

```javascript
import { createWebcimesModal } from 'webcimes-modal';
```

Or you can also set the full path directly in the import:

```html
<html>
    <head>
        ...
        <script type="module">
            // Import webcimes-modal
            import { createWebcimesModal } from "./node_modules/webcimes-modal/dist/js/webcimes-modal.esm.js";
            ...
        </script>
    </head>
    ...
</html>
```

Or with JS bundlers (like Webpack) you can call directly the module :

```javascript
import { createWebcimesModal } from 'webcimes-modal';
```

### UDM

You can directly load the udm module in the script tag:

```html
<html>
    <head>
        ...
        <script
            src="./node_modules/webcimes-modal/dist/js/webcimes-modal.udm.js"
            type="text/javascript"
        ></script>
    </head>
    ...
</html>
```

### Import stylesheet:

```html
<link rel="stylesheet" href="./node_modules/webcimes-modal/dist/css/webcimes-modal.css" />
```

## Usage

### Call `createWebcimesModal()` to create modal:

```javascript
// Wait for dom content loaded or call createWebcimesModal before the end of body
document.addEventListener('DOMContentLoaded', function () {
    // Create modal
    const myModal = createWebcimesModal({
        setId: null, // set a specific id on the modal. default "null"
        setClass: null, // set a specific class on the modal, default "null"
        width: 'auto', // width (specify unit), default "auto"
        height: 'auto', // height (specify unit), default "auto"
        headerHtml: null, // html for header (overrides titleHtml), default "null"
        titleHtml: 'My title', // html for title, default "null"
        bodyHtml: 'My Body', // html for body, default "null"
        footerHtml: null, // html for footer (overrides buttonCancelHtml and buttonConfirmHtml), default "null"
        buttonCancelHtml: 'Cancel', // html for cancel button, default "null"
        buttonConfirmHtml: 'Confirm', // html for confirm button, default "null"
        buttonCancelClass: [], // add extra css classes to cancel button, default "[]"
        buttonConfirmClass: [], // add extra css classes to confirm button, default "[]"
        closeOnCancelButton: false, // close modal after trigger cancel button, default "true"
        closeOnConfirmButton: true, // close modal after trigger confirm button, default "true"
        showCloseButton: true, // show close button, default "true"
        allowCloseOutside: false, // allow the modal to close when clicked outside, default "true"
        allowMovement: true, // ability to move modal, default "true"
        moveFromHeader: true, // if allowMovement is set to "true", ability to move modal from header, default "true"
        moveFromBody: false, // if allowMovement is set to "true", ability to move modal from body, default "false"
        moveFromFooter: true, // if allowMovement is set to "true", ability to move modal from footer, default "true"
        style: null, // add extra css style to modal, default null
        animationOnShow: 'animDropDown', // "animDropDown" or "animFadeIn" for show animation, default "animDropDown"
        animationOnDestroy: 'animDropUp', // "animDropUp" or "animFadeOut" for destroy animation, default "animDropUp"
        animationDuration: 500, // animation duration in ms, default "500"
        beforeShow: () => {
            console.log('before show');
        }, // callback before show modal
        afterShow: () => {
            console.log('after show');
        }, // callback after show modal
        beforeDestroy: () => {
            console.log('before destroy');
        }, // callback before destroy modal
        afterDestroy: () => {
            console.log('after destroy');
        }, // callback after destroy modal
        onCancelButton: () => {
            console.log('on cancel button');
        }, // callback after triggering cancel button
        onConfirmButton: () => {
            console.log('on confirm button');
        }, // callback after triggering confirm button
    });
});
```

### Modal html structure:

After a creating a modal, the basic html structure look like this:

```html
<div class="webcimes-modal">
    <button
        class="webcimes-modal__button webcimes-modal__close-button webcimes-modal__close"
        aria-label="Close modal"
    >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path
                d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"
            />
        </svg>
    </button>
    <div class="webcimes-modal__header">
        <div class="webcimes-modal__title">My title</div>
    </div>
    <div class="webcimes-modal__body">My body</div>
    <div class="webcimes-modal__footer">
        <div class="webcimes-modal__footer-buttons">
            <button
                class="webcimes-modal__button webcimes-modal__footer-button webcimes-modal__footer-button--cancel"
            >
                Cancel
            </button>
            <button
                class="webcimes-modal__button webcimes-modal__footer-button webcimes-modal__footer-button--confirm"
            >
                Confirm
            </button>
        </div>
    </div>
</div>
```

### Set basic parameter on the modal:

All parameters are optionnal, but to set the base message on the modal you can use `titleHtml` to create the title, `bodyHtml` contain the main message of the modal, and `buttonCancelHtml` & `buttonConfirmHtml` contain the html for each button.

For these fields you can provide:

- **String**: Plain text or HTML tags
- **HTMLElement**: A DOM element
- **Function**: A function that returns an HTMLElement (useful for dynamic content or lazy loading)

```javascript
const myModal = createWebcimesModal({
    titleHtml: "My title <span style='color:red'>with red color</span>", // directly put an html tag or attribute like span and style
    bodyHtml: document.querySelector('#myID'), // set HTMLElement directly
    buttonCancelHtml: () => {
        const btn = document.createElement('span');
        btn.textContent = 'Cancel';
        btn.style.fontWeight = 'bold';
        return btn;
    }, // use a function that returns an HTMLElement
    buttonConfirmHtml: 'Confirm', // or just text
});
```

### Advanced: Full control with headerHtml and footerHtml

For complete customization, you can use `headerHtml` and `footerHtml` which override their respective simple options:

- `headerHtml` overrides `titleHtml`
- `footerHtml` overrides `buttonCancelHtml` and `buttonConfirmHtml`

```javascript
const myModal = createWebcimesModal({
    headerHtml: () => {
        const header = document.createElement('div');
        header.innerHTML = '<h2>Custom Header</h2><p>Subtitle here</p>';
        return header;
    },
    footerHtml: () => {
        const footer = document.createElement('div');
        footer.innerHTML = '<button class="webcimes-modal__close">Custom Close</button>';
        return footer;
    },
});
```

**Note**: Any element with the class `webcimes-modal__close` will automatically close the modal when clicked.

if any of these fields is set to null (the default), it will not appear on the modal

### Remove specific structure of the modal:

Modal sections are automatically hidden when all their content properties are empty or disabled:

**To remove `webcimes-modal__header`:** set `headerHtml` to `null` and `titleHtml` to `null`

**To remove `webcimes-modal__body`:** set `bodyHtml` to `null`

**To remove `webcimes-modal__footer`:** set `footerHtml` to `null`, `buttonCancelHtml` to `null` and `buttonConfirmHtml` to `null`

Example:

```javascript
const myModal = createWebcimesModal({
    bodyHtml: 'My message', // Only body will be displayed
    // header is removed (all null/false)
    // footer is removed (all null)
});
```

### Scale the modal:

By default the `height` and `width` are set to `auto`, the modal will also be sized according to the html content.

You can also set the determined `height` or `width` by indicating the value with a number and a unit.

```javascript
const myModal = createWebcimesModal({
    width: '80vm',
    height: '200px',
});
```

### Modal behavior:

Below are the different options for customize the modal behavior.

```javascript
const myModal = createWebcimesModal({
    buttonCancelClass: ['btn-secondary', 'btn-lg'], // add extra css classes to cancel button, default "[]"
    buttonConfirmClass: ['btn-danger', 'btn-lg'], // add extra css classes to confirm button, default "[]"
    closeOnCancelButton: false, // close modal after triggering cancel button, default "true"
    closeOnConfirmButton: false, // close modal after triggering confirm button, default "true"
    showCloseButton: true, // show close button, default "true"
    allowCloseOutside: false, // allows the modal to close when clicked outside, default "true"
    allowMovement: true, // ability to move modal, default "true"
    moveFromHeader: true, // if allowMovement is set to "true", ability to move modal from header, default "true"
    moveFromBody: false, // if allowMovement is set to "true", ability to move modal from body, default "false"
    moveFromFooter: true, // if allowMovement is set to "true", ability to move modal from footer, default "true"
});
```

### Add extra style to the modal:

You can define the style of the modal with `css`, but you can also use the style property which allows to directly add an additional style to the modal.

```javascript
const myModal = createWebcimesModal({
    style: 'background:black; color:#fff; text-align:center;',
});
```

### Animation:

Once the modal is created, it will be shown and hidden with an animation, you can choose between two animations for each case:

For `animationOnShow` you can choose between `animDropDown` or `animFadeIn`

For `animationOnDestroy` you can choose between `animDropUp` or `animFadeOut`

And you can set the duration of all animation by setting `animationDuration` with a number in ms.

```javascript
const myModal = createWebcimesModal({
    animationOnShow: 'animDropDown', // "animDropDown" or "animFadeIn" for show animation, default "animDropDown"
    animationOnDestroy: 'animDropUp', // "animDropUp" or "animFadeOut" for destroy animation, default "animDropUp"
    animationDuration: 500, // anim duration in ms, default "500"
});
```

### Get dom element

You can get the dom element of the current modal like this:

```javascript
// Get the instance
const myModal = createWebcimesModal(...);

// Things

// Then get the dom element of the current modal
myModal.modal;
```

Or you can get the global container of all modals like this:

```javascript
// Get the instance
const myModal = createWebcimesModal(...);

// Things

// Then get the dom element containing all modals
myModal.modals;
```

### Events:

Multiple events exist, which allow to interact with the modal at each step. You can use all events below:

```javascript
const myModal = createWebcimesModal({
    beforeShow: () => {
        console.log('before show');
    }, // callback before show modal
    afterShow: () => {
        console.log('after show');
    }, // callback after show modal
    beforeDestroy: () => {
        console.log('before destroy');
    }, // callback before destroy modal
    afterDestroy: () => {
        console.log('after destroy');
    }, // callback after destroy modal
    onCancelButton: () => {
        console.log('on cancel button');
    }, // callback after triggering cancel button
    onConfirmButton: () => {
        console.log('on confirm button');
    }, // callback after triggering confirm button
});
```

You can also use `addEventListener` for get the events from the instance like this:

```javascript
// Get the instance
const myModal = createWebcimesModal(...);

// Create an event on the current modal
myModal.modal.addEventListener("afterDestroy", () => {
	console.log("after destroy");
});
```

### Destroy

To destroy the modal, you have several ways:

- You can use basic close button with `showCloseButton` property set to `true`

- Use `webcimes-modal__footer-button--cancel` or `webcimes-modal__footer-button--confirm` button with `closeOnCancelButton` or `closeOnConfirmButton` property set to `true`

- Add a custom button, and set its class to `webcimes-modal__close`

- Destroy the modal manually with the `destroy` method, like this:

```javascript
// Get the instance
const myModal = createWebcimesModal(...);

// Things

// Then call the destroy method:
myModal.destroy();
```

### Style modals:

You can style modal with the following field applying to the class of `.webcimes-modals` (for background and z-index behind the modal) and `.webcimes-modal` (for modal):

```css
.webcimes-modals {
    --webcimes-modals-background: rgba(0, 0, 0, 0.8);
    --webcimes-modals-z-index: 5;
}
.webcimes-modal {
    --modal-color: inherit;
    --modal-background: #fff;
    --modal-border-color: #ddd;
    --modal-box-shadow: 1px 1px 3px 0px #444;
    --modal-header-padding: 1.25rem 2.5rem;
    --modal-body-padding: 1.25rem 2.5rem;
    --modal-footer-padding: 1.25rem 2.5rem;
    --modal-title-font-size: 1.25rem;
    --modal-title-font-weight: 600;
    --modal-button-cancel-background: #e5e5e5;
    --modal-button-cancel-background-hover: #d0d0d0;
    --modal-button-cancel-color: #333;
    --modal-button-cancel-color-hover: #000;
    --modal-button-confirm-background: #1e88e5;
    --modal-button-confirm-background-hover: #1565c0;
    --modal-button-confirm-color: #fff;
    --modal-button-confirm-color-hover: #fff;
}
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
