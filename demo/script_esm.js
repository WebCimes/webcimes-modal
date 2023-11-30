// Import webcimes-modal
import { WebcimesModal } from "../dist/js/webcimes-modal.esm.js";

// Wait for dom content loaded
document.addEventListener("DOMContentLoaded", function()
{
    const myModal = new WebcimesModal({
        setId: null, // set specific id to the modal, default "null"
        setClass: null, // set specific class to the modal, default "null"
        width: 'auto', // width (specify the unit), default "auto"
        height: 'auto', // height (specify the unit), default "auto"
        titleHtml: "My title", // html for title, default "null"
        bodyHtml: "My Body", // html for body, default "null"
        buttonCancelHtml: "Cancel", // html for cancel button, default "null"
        buttonConfirmHtml: "Confirm", // html for confirm button, default "null"
        closeOnCancelButton: true, // close the modal after trigger cancel button, default "true"
        closeOnConfirmButton: true, // close the modal after trigger confirm button, default "true"
        showCloseButton: true, // show the close button, default "true"
        allowCloseOutside: false, // allow to close modal when click outside, default "true"
        allowMovement: true, // possibility to move the modal, default "true"
        moveFromHeader: true, // if allowMovement is set to "true", ability to move modal from header, default "true"
        moveFromBody: false, // if allowMovement is set to "true", ability to move modal from body, default "false"
        moveFromFooter: true, // if allowMovement is set to "true", ability to move modal from footer, default "true"
        stickyHeader: true, // keep sticky (visible) the header when scrolling, default "true"
        stickyFooter: true, // keep sticky (visible) the footer when scrolling, default "true"
        style: null, // add extra style css to the modal, default null
        animationOnShow: 'animDropDown', // "animDropDown" or "animFadeIn" for enter animation, default "animDropDown"
        animationOnDestroy: 'animDropUp', // "animDropUp" or "animFadeOut" for end animation, default "animDropUp"
        animationDuration: 500, // anim duration in ms, default "500"
        beforeShow: () => {console.log("before show");}, // callback before show modal
        afterShow: () => {console.log("after show");}, // callback after show modal
        beforeDestroy: () => {console.log("before destroy");}, // callback before destroy modal
        afterDestroy: () => {console.log("after destroy");}, // callback after destroy modal
        onCancelButton: () => {console.log("on cancel button");}, // callback after trigger cancel button
        onConfirmButton: () => {console.log("on confirm button");}, // callback after trigger confirm button
    });

    const myModal2 = new WebcimesModal({
        titleHtml: "My title", // html for title, default "null"
        bodyHtml: document.querySelector(".test").outerHTML, // html for body, default "null"
        buttonCancelHtml: "Cancel", // html for cancel button, default "null"
        buttonConfirmHtml: "Confirm", // html for confirm button, default "null"
        closeOnConfirmButton: false, // close the modal after trigger confirm button, default "true"
        afterShow: () => {console.log(myModal2.modals); console.log(myModal2.modal);}, // callback before show modal
        onConfirmButton: () => {myModal2.destroy();}, // callback after trigger confirm button
    });
});