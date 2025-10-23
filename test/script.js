// Import webcimes-modal
import { createWebcimesModal } from '../dist/js/webcimes-modal.esm.js';

// Wait for dom content loaded
document.addEventListener('DOMContentLoaded', function () {
    let modal1 = createWebcimesModal({
        titleHtml: 'My title',
        bodyHtml: 'My Body',
        afterDestroy: () => {
            console.log('destroy modal 1');
        },
    });

    document.querySelector('.webcimes-modal__body')?.addEventListener('click', (e) => {
        modal1.modal.addEventListener('afterDestroy', () => {
            console.log('event');
        });

        createWebcimesModal({
            titleHtml: 'My title 2',
            bodyHtml: 'My Body 2',
            afterDestroy: () => {
                console.log('after destroy modal 2');
            },
        });
    });
});
