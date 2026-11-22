import { createWebcimesModal } from '../dist/js/webcimes-modal.esm.js';

const result = document.querySelector('#demo-result');

document.querySelector('#open-demo').addEventListener('click', () => {
    result.textContent = '';
    const firstModal = createWebcimesModal({
        setClass: 'site-modal',
        titleHtml: 'Save changes?',
        bodyHtml: `
            <p class="site-modal-message">Open a second dialog while keeping this one open.</p>
            <button type="button" class="site-modal-secondary" data-open-second>Open second modal</button>
        `,
        buttonCancelHtml: 'Cancel',
        buttonConfirmHtml: 'Save',
        onConfirmButton: () => {
            result.textContent = 'Changes saved in the demo.';
        },
    });

    firstModal.modal.querySelector('[data-open-second]').addEventListener('click', () => {
        createWebcimesModal({
            setClass: 'site-modal--nested',
            width: '21rem',
            titleHtml: 'Second modal',
            bodyHtml: 'Close this dialog to return to the first one.',
            buttonConfirmHtml: 'Back to first modal',
        });
    });
});
