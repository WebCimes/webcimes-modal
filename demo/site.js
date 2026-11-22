import { createWebcimesModal } from '../dist/js/webcimes-modal.esm.js';

const result = document.querySelector('#demo-result');

document.querySelector('#open-demo').addEventListener('click', () => {
    result.textContent = '';
    createWebcimesModal({
        setClass: 'site-modal',
        titleHtml: 'Save changes?',
        bodyHtml: 'This is a demo dialog. Press Tab to move between controls or Escape to close.',
        buttonCancelHtml: 'Cancel',
        buttonConfirmHtml: 'Save',
        onConfirmButton: () => {
            result.textContent = 'Changes saved in the demo.';
        },
    });
});
