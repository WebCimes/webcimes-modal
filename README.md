# webcimes-modal

<img src="./demo/webcimes-modal-logo.png" width="96" height="96" alt="WebCimes Modal logo" />

[Live demo](https://webcimes.github.io/webcimes-modal/)

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
        ariaLabel: undefined, // optional accessible name that overrides the visible title
        bodyHtml: 'My Body', // html for body, default "null"
        footerHtml: null, // html for footer (overrides buttonCancelHtml and buttonConfirmHtml), default "null"
        buttonCancelHtml: 'Cancel', // html for cancel button, default "null"
        buttonConfirmHtml: 'Confirm', // html for confirm button, default "null"
        buttonCancelClass: [], // add extra css classes to cancel button, default "[]"
        buttonConfirmClass: [], // add extra css classes to confirm button, default "[]"
        closeOnCancelButton: false, // close modal after trigger cancel button, default "true"
        closeOnConfirmButton: true, // close modal after trigger confirm button, default "true"
        showCloseButton: true, // show close button, default "true"
        allowCloseOutside: false, // allow dismissal by clicking outside, default true
        closeOnEscape: true, // allow dismissal with Escape when allowCloseOutside is true, default true
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
<div class="webcimes-modal" role="dialog" aria-modal="true" aria-labelledby="webcimes-modal-title-1" tabindex="-1">
    <div class="webcimes-modal__header">
        <div class="webcimes-modal__title" id="webcimes-modal-title-1">My title</div>
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
    allowCloseOutside: false, // allow dismissal by clicking outside, default true
    closeOnEscape: true, // allow dismissal with Escape when allowCloseOutside is true, default true
    allowMovement: true, // ability to move modal, default "true"
    moveFromHeader: true, // if allowMovement is set to "true", ability to move modal from header, default "true"
    moveFromBody: false, // if allowMovement is set to "true", ability to move modal from body, default "false"
    moveFromFooter: true, // if allowMovement is set to "true", ability to move modal from footer, default "true"
});
```

### Dismissal and required actions

`allowCloseOutside: false` blocks both outside clicks and Escape, even when `closeOnEscape` is `true`. To keep outside clicks enabled while disabling Escape, set `closeOnEscape: false`.

Use `showCloseButton: false` to hide the built-in close button. The footer buttons still follow their own `closeOnCancelButton` and `closeOnConfirmButton` settings. A custom element marked with `webcimes-modal__close` still dismisses the modal.

For a modal that stays open until the user completes a required action, provide a clear action and call `destroy()` when it is complete.

```javascript
const modal = createWebcimesModal({
    titleHtml: 'Acknowledge the notice',
    bodyHtml: 'Read this notice before continuing.',
    allowCloseOutside: false,
    showCloseButton: false,
    buttonConfirmHtml: 'Acknowledge',
    closeOnConfirmButton: false,
    onConfirmButton: () => modal.destroy(),
});
```

### Keyboard and accessible name

Use `titleHtml` or a heading inside `headerHtml` to give the dialog an accessible name. Use `ariaLabel` for a dialog without a visible title or to override the name derived from the header.

On open, the library focuses a focusable element with `autofocus`, including a heading with `tabindex="-1"`. Otherwise, it focuses the first keyboard-focusable element or the dialog itself. Tab and Shift+Tab stay in the topmost Webcimes dialog. Escape dismisses that dialog when enabled. When the dialog closes, focus returns to its opener if it is still available.

When several Webcimes dialogs are stacked, a backdrop click acts on the topmost dialog. Keyboard events inside an iframe stay in its document. For embedded content, include an explicit close control in the surrounding dialog.

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

- Click outside when `allowCloseOutside` is enabled, or press Escape when both `allowCloseOutside` and `closeOnEscape` are enabled.

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

## Other WebCimes projects

- [WebCimes Cookies](https://github.com/WebCimes/webcimes-cookies) — Cookie consent
- [WebCimes Select](https://github.com/WebCimes/webcimes-select) — Searchable select fields
- [WebCimes Tooltip](https://github.com/WebCimes/webcimes-tooltip) — Tooltips and popovers
- [Laravel MediaForge](https://github.com/WebCimes/laravel-mediaforge) — File and image processing
- [WebCimes Dark Theme](https://github.com/WebCimes/webcimes-dark-theme) — VS Code color theme

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Local development

Use Node.js 20.19+ on the 20.x line, or Node.js 22.12 or later.

- Run `npm install` and `npm run dev`.
- Open the URL printed by Vite to find the test pages and demos. The keyboard and general tests and the ESM demo load the TypeScript and CSS sources and update when you save.
- Run `npm run build` to generate the ESM and UMD bundles, CSS, declarations and source maps. Then open `/demo/demo_udm.html` to test the generated UMD bundle.
- Run `npm run watch` to rebuild the distribution files when a source file changes.
- Run `npm run build` before committing changes that affect the generated files or publishing the package. The development server serves source files and leaves `dist/` unchanged.

Run `make release` from a clean `main` after committing the new version and generated files. It previews the package, checks the npm session with `npm whoami`, and runs `npm login` if needed. It then pushes `main`, publishes to npm, and pushes the version tag. When npm prompts for two-factor authentication, approve the publication in your browser.
