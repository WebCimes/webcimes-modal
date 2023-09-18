// Import webcimes-modal
import {WebcimesModal} from "../dist/js/webcimes-modal.esm.js";

// Wait for dom content loaded
document.addEventListener("DOMContentLoaded", function()
{
    let modal1 = new WebcimesModal({
        titleHtml: "My title",
        bodyHtml: "My Body",
        afterDestroy: () => {
            console.log("destroy modal 1");
        },
    });

    document.querySelector(".modalBody")?.addEventListener("click", (e) => {
        // modal1.options.moveFromBody = false;
        new WebcimesModal({
            titleHtml: "My title 2",
            bodyHtml: "My Body 2",
            afterDestroy: () => {
                console.log("after destroy modal 2");
            },
        });
    });
});