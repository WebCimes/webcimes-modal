// Wait for dom content loaded
document.addEventListener('DOMContentLoaded', function () {
    // Example 1: Full options with string content
    const myModal = createWebcimesModal({
        setId: null, // set specific id to the modal, default "null"
        setClass: null, // set specific class to the modal, default "null"
        width: 'auto', // width (specify the unit), default "auto"
        height: 'auto', // height (specify the unit), default "auto"
        headerHtml: null, // html for header (overrides titleHtml), default "null"
        titleHtml: 'My title', // html for title, default "null"
        bodyHtml: 'My Body', // html for body, default "null"
        footerHtml: null, // html for footer (overrides buttonCancelHtml and buttonConfirmHtml), default "null"
        buttonCancelHtml: 'Cancel', // html for cancel button, default "null"
        buttonConfirmHtml: 'Confirm', // html for confirm button, default "null"
        buttonCancelClass: ['my-custom-class'], // add extra css classes to cancel button, default "[]"
        buttonConfirmClass: ['my-custom-class'], // add extra css classes to confirm button, default "[]"
        closeOnCancelButton: true, // close the modal after trigger cancel button, default "true"
        closeOnConfirmButton: true, // close the modal after trigger confirm button, default "true"
        showCloseButton: true, // show the close button, default "true"
        allowCloseOutside: false, // allow to close modal when click outside, default "true"
        allowMovement: true, // possibility to move the modal, default "true"
        moveFromHeader: true, // if allowMovement is set to "true", ability to move modal from header, default "true"
        moveFromBody: false, // if allowMovement is set to "true", ability to move modal from body, default "false"
        moveFromFooter: true, // if allowMovement is set to "true", ability to move modal from footer, default "true"
        style: null, // add extra style css to the modal, default null
        animationOnShow: 'animDropDown', // "animDropDown" or "animFadeIn" for enter animation, default "animDropDown"
        animationOnDestroy: 'animDropUp', // "animDropUp" or "animFadeOut" for end animation, default "animDropUp"
        animationDuration: 500, // anim duration in ms, default "500"
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
        }, // callback after trigger cancel button
        onConfirmButton: () => {
            console.log('on confirm button');
        }, // callback after trigger confirm button
    });

    // Example 2: Modal with HTMLElement from DOM
    const myModal2 = createWebcimesModal({
        titleHtml: 'My title', // html for title, default "null"
        bodyHtml: document.querySelector('.test'), // pass HTMLElement directly
        buttonCancelHtml: 'Cancel', // html for cancel button, default "null"
        buttonConfirmHtml: 'Confirm', // html for confirm button, default "null"
        closeOnConfirmButton: false, // close the modal after trigger confirm button, default "true"
        afterShow: () => {
            console.log(myModal2.modals);
            console.log(myModal2.modal);
        }, // callback before show modal
        onConfirmButton: () => {
            myModal2.destroy();
        }, // callback after trigger confirm button
    });

    // Example 3: Modal with custom header and footer using functions
    createWebcimesModal({
        headerHtml: () => {
            const header = document.createElement('div');
            header.innerHTML =
                '<h2 style="margin: 0; color: #333;">Custom Header</h2><p style="margin: 5px 0 0; font-size: 14px; color: #666;">With dynamic content</p>';
            return header;
        },
        bodyHtml: () => {
            const body = document.createElement('div');
            body.innerHTML =
                '<p>This modal demonstrates custom header and footer.</p><p>The close button is automatically added after the header content.</p>';
            return body;
        },
        footerHtml: () => {
            const footer = document.createElement('div');
            footer.style.display = 'flex';
            footer.style.gap = '10px';
            footer.style.justifyContent = 'flex-end';

            const cancelBtn = document.createElement('button');
            cancelBtn.textContent = 'Custom Cancel';
            cancelBtn.className = 'webcimes-modal__close';
            cancelBtn.style.padding = '8px 16px';
            cancelBtn.style.cursor = 'pointer';

            const confirmBtn = document.createElement('button');
            confirmBtn.textContent = 'Custom Confirm';
            confirmBtn.className = 'webcimes-modal__close';
            confirmBtn.style.padding = '8px 16px';
            confirmBtn.style.cursor = 'pointer';
            confirmBtn.style.background = '#007bff';
            confirmBtn.style.color = 'white';
            confirmBtn.style.border = 'none';
            confirmBtn.style.borderRadius = '4px';

            footer.appendChild(cancelBtn);
            footer.appendChild(confirmBtn);
            return footer;
        },
        showCloseButton: true, // Close button will be added after headerHtml content
        allowCloseOutside: true,
    });
});
