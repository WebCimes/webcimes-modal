// Import webcimes-modal
import { createWebcimesModal } from '../dist/js/webcimes-modal.esm.js';

// Wait for dom content loaded
document.addEventListener('DOMContentLoaded', function () {
    // Example 1: Simple modal with string content
    let modal1 = createWebcimesModal({
        titleHtml: 'My title',
        bodyHtml: 'My Body - Click on body to open modal 2',
        afterDestroy: () => {
            console.log('destroy modal 1');
        },
    });

    document.querySelector('.webcimes-modal__body')?.addEventListener('click', (e) => {
        modal1.modal.addEventListener('afterDestroy', () => {
            console.log('event');
        });

        // Example 2: Modal with HTMLElement
        const bodyElement = document.createElement('div');
        bodyElement.innerHTML = '<strong>My Body 2</strong><br>This uses an HTMLElement';

        createWebcimesModal({
            titleHtml: 'My title 2',
            bodyHtml: bodyElement,
            buttonCancelHtml: 'Cancel',
            buttonConfirmHtml: 'Confirm',
            afterDestroy: () => {
                console.log('after destroy modal 2');
            },
        });
    });

    // Example 3: Modal with custom header and footer
    createWebcimesModal({
        headerHtml: () => {
            const header = document.createElement('div');
            header.innerHTML =
                '<h2>Custom Header</h2><p style="font-size: 12px;">With subtitle</p>';
            return header;
        },
        bodyHtml: 'Body with custom header and footer',
        footerHtml: () => {
            const footer = document.createElement('div');
            footer.style.textAlign = 'center';
            footer.innerHTML =
                '<button class="webcimes-modal__close" style="padding: 10px 20px;">Close Me</button>';
            return footer;
        },
        showCloseButton: true, // Close button still appears
    });
    createWebcimesModal({
        bodyHtml: 'This modal has no header and footer, only body content.',
    });
});
